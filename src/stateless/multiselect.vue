<template>
    <div :class="[theme] | prefix('multiselect--')" class="multiselect" @keyup="$emit('keyup', $event)" @click="$refs.list && $refs.list.focus()">
        <div v-if="isSearchable" class="multiselect__search-with-icon" @click.stop>
            <search-input
                v-model="searchQuery"
                :label="label"
                :theme="theme"
                :size="searchSize || size"
                @keyup.down="$refs.list && $refs.list.focus()"
                @keyup="$emit('keyup', $event)" />
        </div>

        <div v-if="listItems.length > 0" class="multiselect__options">
            <scrollable-list
                ref="list"
                :items="listItems"
                :num-items="numItems"
                :theme="theme"
                :transition-sorting="transitionSorting && !disableTransition"
                :no-group-rendering="areGroupsSelectable"
                :initial-offset="initialOffset"
                :set-active-on-hover="false"
                :enable-scroll-top="true"
                :show-overlay="true || showListOverlay"
                class="multiselect__default-list"
                @select="onSelect"
                @load-more="loadAsyncOptions">

                <checkbox-element
                    v-if="canSelectAndClearAll || canClearAll"
                    slot="sticky"
                    :value="enabledValueLength === 0 ? false : enabledValueLength === allPossibleIds.length ? true : null"
                    :disabled="!canSelectAndClearAll && enabledValueLength === 0"
                    :size="size"
                    :theme="theme"
                    class="multiselect__select-all"
                    @input="setMultiple">

                    <span v-if="enabledValueLength === 0" class="multiselect__change-multiple-label">Select all</span>
                    <span v-else class="multiselect__change-multiple-label">Clear all ({{ enabledValueLength }})</span>
                </checkbox-element>

                <div slot-scope="{ item }" style="width: 100%;">
                    <checkbox-element
                        :disabled="item.disabled"
                        :title-text="item.tooltipTitle ? '' : item.label"
                        :disabled-text="item.disabledText"
                        :value="isChecked(item)"
                        :size="size"
                        :theme="theme"
                        tabindex="-1"
                        class="multiselect__checkbox">

                        <slot :item="item">
                            <default-list-item :label="item.label" :metadata="item.metadata" :disabled="item.disabled" :size="size" :theme="theme" class="multiselect__default-list-item" />
                        </slot>
                    </checkbox-element>
                </div>
            </scrollable-list>
        </div>

        <search-status :theme="theme" :is-loading="isLoading" :is-empty="listItems.length === 0" />
    </div>
</template>

<script>
import SearchInput from './SearchInput.vue'
import SearchStatus from './SearchStatus.vue'
import Checkbox from './checkbox.vue'
import ScrollableList from './ScrollableList.vue'
import DefaultListItem from './DefaultListItem.vue'
import * as itemsUtils from './items_utils.js'
import debounce from 'lodash.debounce'

export default {
    components: {
        SearchInput,
        SearchStatus,
        checkboxElement: Checkbox,
        ScrollableList,
        DefaultListItem,
    },
    props: {
        value: { type: Array },
        options: { type: Array },
        autoReorder: { type: Boolean, default: true },
        isSearchable: { type: Boolean, default: false },
        initSearchQuery: { type: String, default: '' },
        hasScrollTop: { type: Boolean, default: true },
        canSelectAndClearAll: { type: Boolean, default: false },
        canClearAll: { type: Boolean, default: false },
        showListOverlay: { type: Boolean, default: false },
        areGroupsSelectable: { type: Boolean, default: false },
        transitionSorting: { type: Boolean, default: true },
        initialOffset: { type: Number, default: 0 },
        getOptions: { type: Function, required: false },
        label: { type: String, default: 'Search' },
        theme: { type: String, default: 'dark' },
        size: { type: String, default: 'normal' },
        searchSize: { type: String, required: false },
        numItems: { type: Number, default: 10 },
        loadAsyncDebounce: { type: Number, default: 0 },
    },
    data () {
        return {
            disableTransition: false,
            isLoading: false,
            searchQueryData: this.initSearchQuery,
            queryOptions: [],
        }
    },
    computed: {
        searchQuery: {
            get () {
                return this.searchQueryData
            },
            set (v) {
                const canDisableTransition = this.allOptions.length > this.numItems
                if (canDisableTransition) {
                    this.disableTransition = true
                }
                this.searchQueryData = v
                this.getOptionsPage = 0
                this.gotAllOptions = false
                this.isLoading = false
                this.$emit('search', v)
                this.debouncedLoadAsyncOptions()

                if (canDisableTransition) {
                    this.$nextTick(() => {
                        this.disableTransition = false
                    })
                }
            },
        },
        allOptions () {
            let result = itemsUtils.search(this.options, this.searchQuery)

            for (let queryItem of this.queryOptions) {
                if (!result.find(x => x.id === queryItem.id)) {
                    result.push(queryItem)
                }
            }

            return result
        },
        flatOptions () {
            return itemsUtils.flatten(this.allOptions)
        },
        allPossibleIds () {
            return this.flatOptions.filter(item => item.isLeaf && !item.disabled).map(item => item.id)
        },
        disabledValueIds () {
            return this.value.filter(id => {
                const item = this.flatOptions.find(x => x.id === id)
                return item && item.disabled
            })
        },
        enabledValueLength () {
            return this.value.length - this.disabledValueIds.length
        },
        listItems () {
            let result = this.allOptions

            if (this.autoReorder) {
                if (!this.areGroupsSelectable) {
                    const selectedItems = this.value.map(itemId => {
                        let item = itemsUtils.find(result, x => !x.items && x.id === itemId)
                        if (!item) {
                            return null
                        }
                        return {
                            ...item,
                            key: this.noTransitionKeys[item.id] || `S_${item.key || item.id}`,
                        }
                    }).filter(x => x)
                    const unselectedItems = itemsUtils.map(itemsUtils.filter(result, item => {
                        return !item.items && !this.value.includes(item.id)
                    }), item => {
                        if (this.noTransitionKeys[item.id]) {
                            return {
                                ...item,
                                key: this.noTransitionKeys[item.id],
                            }
                        } else {
                            return item
                        }
                    })

                    result = selectedItems.concat(unselectedItems)
                }

                result = itemsUtils.sortBy(result, item => {
                    if (item.items) {
                        if (item.items.every(x => x.disabled)) {
                            return -1
                        }
                        if (!this.areGroupsSelectable) {
                            return 0
                        }
                    }

                    const isChecked = this.isChecked(item)
                    if (isChecked === true) {
                        return 2
                    } else if (isChecked === null) {
                        return 1
                    }
                    return 0
                })
            }

            return result
        },
    },
    created () {
        this.noTransitionKeys = {}
        this.getOptionsPage = 0
        this.gotAllOptions = false
        this.debouncedLoadAsyncOptions = debounce(this.loadAsyncOptions, this.loadAsyncDebounce)
    },
    mounted () {
        this.loadAsyncOptions()
    },
    methods: {
        onSelect (item) {
            this.setChecked(item, this.isChecked(item) ? false : true)
            this.$refs.list.focus()
        },
        setMultiple (value) {
            const ids = value ? this.disabledValueIds.concat(this.allPossibleIds) : this.disabledValueIds
            this.disableTransition = true
            this.$emit('input', ids)
            this.$refs.list.focus()
            this.$nextTick(() => {
                this.disableTransition = false
            })
        },
        loadAsyncOptions () {
            if (this.getOptions && !this.isLoading && !this.gotAllOptions) {
                this.isLoading = true
                const query = this.searchQuery
                this.getOptions(query, this.getOptionsPage).then(result => {
                    if (this.searchQuery === query) {
                        this.disableTransition = true

                        if (this.getOptionsPage === 0) {
                            this.queryOptions = []
                        }

                        if (result.length === 0) {
                            this.gotAllOptions = true
                        } else {
                            for (let item of result) {
                                if (!this.queryOptions.find(x => x.id === item.id)) {
                                    this.queryOptions.push(item)
                                }
                            }
                            this.getOptionsPage += 1
                        }

                        this.isLoading = false

                        this.$nextTick(() => {
                            this.disableTransition = false
                        })
                    }
                })
            }
        },
        setChecked (option, isChecked) {
            if (!option.disabled) {
                if (option.isLeaf !== false) {
                    const valueWithout = this.value.filter(id => id !== option.id)

                    if (this.autoReorder) {
                        const firstUnselectedItem = this.flatOptions.find(x => !valueWithout.includes(x.id))
                        let disableTransition = false
                        if (isChecked) {
                            disableTransition = firstUnselectedItem && firstUnselectedItem.id === option.id
                        } else {
                            disableTransition = this.value.length > 0 && this.value[this.value.length - 1] === option.id && firstUnselectedItem && firstUnselectedItem.id === option.id
                        }

                        if (disableTransition) {
                            this.noTransitionKeys[option.id] = this.noTransitionKeys[option.id] || (option.key || option.id)
                        } else {
                            if (this.noTransitionKeys[option.id]) {
                                this.noTransitionKeys[option.id] = this.noTransitionKeys[option.id].startsWith('S_') ? option.id : 'S_' + option.id
                            }
                        }
                    }

                    if (isChecked) {
                        this.$emit('input', valueWithout.concat([option.id]))
                    } else {
                        this.$emit('input', valueWithout)
                    }
                } else {
                    const leafIds = option.leafItems.filter(item => !item.disabled).map(item => item.id)
                    const valueWithout = this.value.filter(id => !leafIds.includes(id))
                    if (isChecked) {
                        this.$emit('input', valueWithout.concat(leafIds))
                    } else {
                        this.$emit('input', valueWithout)
                    }
                }
            }
        },
        isChecked (option) {
            if (!option.items && option.isLeaf !== false) {
                return this.value.includes(option.id)
            } else {
                let allChecked = true
                let someChecked = false
                const leafItems = option.leafItems || itemsUtils.getLeafItems(option)
                const leafIds = leafItems.filter(item => !item.disabled).map(item => item.id)
                for (let id of leafIds) {
                    if (!this.value.includes(id)) {
                        allChecked = false
                    } else {
                        someChecked = true
                    }
                }
                return allChecked ? true : (!someChecked ? false : null)
            }
        },
    },
}
</script>

<style lang="less" scoped>
@import (reference) './common';
@import './typography';

.multiselect {
    font-family: @regular-text-font;
    height: fit-content;
    display: flex;
    flex-direction: column;

    &__search-with-icon {
        flex: none;
        display: flex;
    }

    &__options {
        flex: auto;
        overflow-x: hidden;
        margin-top: 5px;
        padding-left: 5px;
        padding-right: 5px;
        clip-path: inset(0px 0px 0px 0px);
    }

    .multiselect__change-multiple.multiselect__change-multiple {
        height: 24px;
        margin-top: 0;
        display: flex;
        align-items: center;
    }

    &__change-multiple-label {
        color: @bluish-gray;
        font-size: 12px;
    }

    &__checkbox {
        width: 100%;
    }
}

.multiselect__option > .multiselect__checkbox {
    margin-top: 0px;
    margin-left: -5px;
}
</style>

<style lang="less">
.multiselect__default-list {
    .default-list__item.default-list__item.default-list__item {
        padding: 0;
    }

    .multiselect__checkbox.multiselect__checkbox {
        margin-top: 0;
        height: auto;

        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;

        .checkbox-element__check-row {
            height: auto;
        }
    }

    .multiselect__checkbox:hover {

        &.checkbox-element--light .default-list-item__label:not(.default-list-item__label--disabled) {
            color: black;
        }

        &.checkbox-element--light .multiline-list-item__label:not(.multiline-list-item__label--disabled) {
            color: black;
        }

        &.checkbox-element--dark .default-list-item__label:not(.default-list-item__label--disabled) {
            color: white;
        }

        &.checkbox-element--dark .multiline-list-item__label:not(.multiline-list-item__label--disabled) {
            color: white;
        }
    }
}
</style>
