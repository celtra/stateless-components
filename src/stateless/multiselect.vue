<template>
    <div :class="[theme] | prefix('multiselect--')" class="multiselect" @keyup="$emit('keyup', $event)">
        <div v-if="isSearchable" class="multiselect__search-with-icon">
            <input-element v-model="searchQuery" :label="label" :theme="theme" :size="size" @keyup="$emit('keyup', $event)">
                <icon slot="before" name="search" />
                <icon v-if="isLoading" slot="right" name="loading" class="spin" />
            </input-element>
        </div>

        <div v-if="hasScrollTop && listItems.length > 0" :style="!canScrollTop ? { visibility: 'hidden' } : {}" class="multiselect__scroll-top" @click="scrollTop">SCROLL TO TOP</div>

        <div class="multiselect__options-wrap">
            <div v-if="showListOverlay" class="multiselect__options-overlay multiselect__options-overlay--top"></div>
            <div v-if="showListOverlay" class="multiselect__options-overlay multiselect__options-overlay--bottom"></div>

            <div ref="multiselectOptions" :style="{maxHeight: optionsMaxHeight}" class="multiselect__options" @scroll="onScroll">
                <div v-if="listItems.length === 0" class="multiselect__no-items">
                    No items
                </div>
                <template v-else>
                    <div v-if="canSelectAll || canClearAll" class="multiselect__change-multiple">
                        <checkbox-element v-if="canSelectAll && value.length === 0" :value="false" :size="size" class="multiselect__select-all" @input="selectAll">
                            <span class="multiselect__select-all-label">SELECT ALL</span>
                        </checkbox-element>

                        <div v-if="canClearAll && value.length > 0" class="multiselect__clear-all" @click="clearAll">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8" class="multiselect__clear-all-icon">
                                <polygon points="6.4 0 4 2.4 1.6 0 0 1.6 2.4 4 0 6.4 1.6 8 4 5.6 6.4 8 8 6.4 5.6 4 8 1.6"/>
                            </svg>
                            <span class="multiselect__clear-all-text">CLEAR ALL ({{ value.length }})</span>
                        </div>
                    </div>

                    <div>
                        <default-list :items="listItems" :transition-sorting="true" :no-group-rendering="areGroupsSelectable" :list-container="$refs.multiselectOptions" :render-all-items="canScrollTop" class="multiselect__default-list" @before-update="onBeforeUpdate">
                            <div slot-scope="{ item }" style="width: 100%; height: 100%">
                                <checkbox-element
                                    :disabled="item.disabled"
                                    :title-text="item.label"
                                    :disabled-text="item.disabledText"
                                    :value="isChecked(item)"
                                    :size="size"
                                    :theme="theme"
                                    class="multiselect__checkbox"
                                    @input="setChecked(item, $event)">

                                    <slot :item="item">
                                        <default-list-item :label="item.label" :metadata="item.metadata" :disabled="item.disabled" :size="size" :theme="theme" class="multiselect__default-list-item" />
                                    </slot>
                                </checkbox-element>
                            </div>
                        </default-list>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import Icon from './icon.vue'
import Input from './input.vue'
import Checkbox from './checkbox.vue'
import DefaultList from './DefaultList.vue'
import DefaultListItem from './DefaultListItem.vue'
import * as itemsUtils from './items_utils.js'
import throttle from 'lodash.throttle'
import debounce from 'lodash.debounce'

export default {
    components: {
        Icon,
        inputElement: Input,
        checkboxElement: Checkbox,
        DefaultList,
        DefaultListItem,
    },
    props: {
        value: { type: Array },
        options: { type: Array },
        autoReorder: { type: Boolean, default: true },
        isSearchable: { type: Boolean, default: false },
        hasScrollTop: { type: Boolean, default: true },
        canSelectAll: { type: Boolean, default: true },
        canClearAll: { type: Boolean, default: true },
        showListOverlay: { type: Boolean, default: false },
        areGroupsSelectable: { type: Boolean, default: false },
        getOptions: { type: Function, required: false },
        label: { type: String, default: 'Search' },
        size: { type: String, default: 'normal' },
        theme: { type: String, default: 'dark' },
        optionsMaxHeight: { type: String, default: '370px' },
        loadAsyncDebounce: { type: Number, default: 0 },
    },
    data () {
        return {
            isLoading: false,
            searchQuery: null,
            queryOptions: [],
            canScrollTop: false,
        }
    },
    computed: {
        allOptions () {
            return this.options.concat(this.queryOptions)
        },
        allPossibleIds () {
            return itemsUtils.getLeafIds(this.listItems)
        },
        listItems () {
            let result = this.allOptions

            const cleanQuery = (this.searchQuery || '').trim(' ').toLowerCase()
            if (cleanQuery.length > 0) {
                const getMatchingPriority = (value) => {
                    if (!value)
                        return 0
                    const cleanValue = value.trim().toLowerCase()
                    if (cleanValue === cleanQuery)
                        return 3
                    const index = value.toLowerCase().indexOf(cleanQuery)
                    if (index >= 0) {
                        return index === 0 ? 2 : 1
                    }
                    return 0
                }

                const searchFn = option => {
                    if (option.items) {
                        let priority = getMatchingPriority(option.label)
                        if (priority > 0)
                            return 50 + priority
                    } else {
                        const labelPriority = getMatchingPriority(option.label)
                        if (labelPriority > 0)
                            return 100 + labelPriority

                        const metadataPriority = getMatchingPriority(option.metadata)
                        if (metadataPriority > 0)
                            return 90 + metadataPriority

                        const tooltipPriority = getMatchingPriority(option.tooltip)
                        if (tooltipPriority > 0)
                            return 80 + tooltipPriority
                    }
                    return 0
                }

                result = itemsUtils.filter(result, x => searchFn(x) > 0)
                result = itemsUtils.sortBy(result, searchFn)
            }

            if (this.autoReorder) {
                if (!this.areGroupsSelectable) {
                    const selectedItems = this.value.map(itemId => {
                        const item = itemsUtils.find(this.allOptions, x => !x.items && x.id === itemId)
                        let prefixKey = this.previousTopUnselectedKey !== this.value[this.value.length - 1].key
                        return {
                            ...item,
                            key: (prefixKey ? 'selected_' : '') + (item.key || item.id),
                        }
                    })
                    const unselectedItems = itemsUtils.filter(result, item => {
                        return !item.items && !this.value.includes(item.id)
                    })
                    // TODO: Find a better solution in the future
                    /* eslint-disable-next-line */
                    this.previousTopUnselectedKey = unselectedItems[0].key

                    result = selectedItems.concat(unselectedItems)
                }

                result = itemsUtils.sortBy(result, item => {
                    if (!this.areGroupsSelectable && item.items) {
                        return 0
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
    watch: {
        searchQuery (v) {
            this.debouncedLoadAsyncOptions()
        },
    },
    created () {
        this.debouncedLoadAsyncOptions = debounce(this.loadAsyncOptions, this.loadAsyncDebounce)
    },
    mounted () {
        this.loadAsyncOptions()
    },
    methods: {
        onBeforeUpdate () {
            const scrollTop = this.$refs.multiselectOptions.scrollTop
            this.$nextTick(() => {
                this.$refs.multiselectOptions.scrollTop = scrollTop
            })
        },
        selectAll () {
            this.$emit('input', this.allPossibleIds)
        },
        clearAll () {
            this.$emit('input', [])
        },
        onScroll: throttle(function (e) {
            const canScrollTop = e.target.scrollTop > 0
            if (this.canScrollTop !== canScrollTop) {
                this.canScrollTop = canScrollTop
            }
        }, 250),
        scrollTop () {
            this.canScrollTop = false
            this.$refs.multiselectOptions.scrollTop = 0
        },
        loadAsyncOptions () {
            if (this.getOptions) {
                this.isLoading = true
                this.getOptions(this.searchQuery).then(result => {
                    this.queryOptions = result
                    this.isLoading = false
                })
            }
        },
        setChecked (option, isChecked) {
            if (!option.disabled) {
                if (option.isLeaf) {
                    const valueWithout = this.value.filter(id => id !== option.id)
                    if (isChecked) {
                        this.$emit('input', valueWithout.concat([option.id]))
                    } else {
                        this.$emit('input', valueWithout)
                    }
                } else {
                    const valueWithout = this.value.filter(id => !option.leafIds.includes(id))
                    if (isChecked) {
                        this.$emit('input', valueWithout.concat(option.leafIds))
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
                const leafIds = option.leafIds || itemsUtils.getLeafIds(option)
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
@import (reference) './variables';

.multiselect {
    height: fit-content;
    display: flex;
    flex-direction: column;

    &__search-with-icon {
        flex: none;
        display: flex;
    }

    &__scroll-top {
        display: inline;
        margin: 0 0 0 auto;
        font-size: 11px;
        color: @bluish-gray;
        cursor: pointer;
    }

    &__options-wrap {
        position: relative;
    }

    &__options {
        padding-bottom: 50px;
        flex: auto;
        overflow-y: auto;
        overflow-x: hidden;
        margin-top: 5px;
        padding-left: 5px;
        padding-right: 5px;
        clip-path: inset(0px 0px 0px 0px);
        overscroll-behavior: contain;
    }

    &__options-overlay {
        position: absolute;
        height: 15px;
        width: 100%;
        pointer-events: none;
        z-index: 10;

        &--top {
            top: 0;
        }

        &--bottom {
            bottom: 0;
        }
    }

    &__change-multiple {
        flex: none;
        z-index: 5;
        position: relative;
        height: 24px;
        padding-bottom: 10px;
        display: flex;
        align-items: center;
    }

    .multiselect__select-all.multiselect__select-all {
        margin-top: 0;
        display: flex;
        align-items: center;
    }

    &__select-all-label {
        color: @bluish-gray;
        font-size: 11px;
    }

    &__clear-all {
        color: @bluish-gray;
        font-size: 11px;
        cursor: pointer;
        display: flex;
        align-items: center;
        margin-left: 10px;
    }

    &__clear-all-text {
        margin-top: 3px;
        margin-left: 6px;
    }

    &__clear-all-icon {
        width: 7px;
        height: 7px;
        margin-top: 3px;
        fill: @bluish-gray;
    }

    &__no-items {
        text-align: center;
        font-size: 18px;
    }

    &__checkbox {
        width: 100%;
    }
}

.multiselect--dark {
    .multiselect__options-overlay {
        &--top {
            background: linear-gradient(180deg, @extremely-dark-gray, fade(@extremely-dark-gray, 0%));
        }

        &--bottom {
            background: linear-gradient(0deg, @extremely-dark-gray, fade(@extremely-dark-gray, 0%));
        }
    }
}

.multiselect--light {
    .multiselect__options-overlay {
        &--top {
            background: linear-gradient(180deg, @white, fade(@white, 0%));
        }

        &--bottom {
            background: linear-gradient(0deg, @white, fade(@white, 0%));
        }
    }
}

.multiselect__option > .multiselect__checkbox {
    margin-top: 0px;
    margin-left: -5px;
}

::-webkit-scrollbar {
    width : 5px;
}

::-webkit-scrollbar-track {
    background-color : transparent;
}

::-webkit-scrollbar-thumb {
    border-radius    : 5px;
    background-color : @very-light-gray;
}

::-webkit-scrollbar-corner {
    background-color : transparent;
}
</style>

<style lang="less">
.multiselect__default-list {
    .default-list__item.default-list__item.default-list__item {
        padding: 0;

        &:hover {
            background-color: inherit;
        }
    }

    .multiselect__checkbox.multiselect__checkbox {
        margin-top: 0;
        height: auto;

        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
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
