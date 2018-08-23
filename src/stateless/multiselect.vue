<template>
    <div :class="[theme] | prefix('multiselect--')" class="multiselect" @keyup="$emit('keyup', $event)">
        <div v-if="isSearchable" class="multiselect__search-with-icon">
            <input-element v-model="searchQuery" :label="label" :theme="theme" :size="size" @keyup.down="$refs.list && $refs.list.focus()" @keyup="$emit('keyup', $event)">
                <icon slot="before" name="search" />
                <icon v-if="isLoading" slot="right" name="loading" class="spin" />
            </input-element>
        </div>

        <div class="multiselect__options">
            <div v-if="listItems.length === 0" class="multiselect__no-items">
                No items
            </div>
            <div v-else>
                <scrollable-list ref="list" :items="listItems" :num-items="numItems" :theme="theme" :transition-sorting="true" :no-group-rendering="areGroupsSelectable" :enable-scroll-top="true" :show-overlay="true || showListOverlay" class="multiselect__default-list">
                    <div v-if="canSelectAll || canClearAll" slot="before" class="multiselect__change-multiple">
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
                    <div slot-scope="{ item }" style="width: 100%; height: 45px;">
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
                    <div slot="after" class="multiselect__after-list"></div>
                </scrollable-list>
            </div>
        </div>
    </div>
</template>

<script>
import Icon from './icon.vue'
import Input from './input.vue'
import Checkbox from './checkbox.vue'
import ScrollableList from './ScrollableList.vue'
import DefaultListItem from './DefaultListItem.vue'
import * as itemsUtils from './items_utils.js'
import debounce from 'lodash.debounce'

export default {
    components: {
        Icon,
        inputElement: Input,
        checkboxElement: Checkbox,
        ScrollableList,
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
        numItems: { type: Number, default: 10 },
        loadAsyncDebounce: { type: Number, default: 0 },
    },
    data () {
        return {
            isLoading: false,
            searchQuery: null,
            queryOptions: [],
        }
    },
    computed: {
        allOptions () {
            let result = this.options
            for (let queryOption of this.queryOptions) {
                if (!result.map(x => x.id).includes(queryOption.id)) {
                    result.push(queryOption)
                }
            }
            return result
        },
        allPossibleIds () {
            return itemsUtils.getLeafIds(this.listItems)
        },
        listItems () {
            let result = this.allOptions

            result = itemsUtils.search(result, this.searchQuery)

            if (this.autoReorder) {
                if (!this.areGroupsSelectable) {
                    const selectedItems = this.value.map(itemId => {
                        let item = itemsUtils.find(this.allOptions, x => !x.items && x.id === itemId)
                        return {
                            ...item,
                            key: `selected_${item.key || item.id}`,
                        }
                    })
                    const unselectedItems = itemsUtils.filter(result, item => {
                        return !item.items && !this.value.includes(item.id)
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
        selectAll () {
            this.$emit('input', this.allPossibleIds)
        },
        clearAll () {
            this.$emit('input', [])
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

    &__options {
        flex: auto;
        overflow-x: hidden;
        margin-top: 5px;
        padding-left: 5px;
        padding-right: 5px;
        clip-path: inset(0px 0px 0px 0px);
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

    &__after-list {
        height: 60px;
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

        &:hover:not(.default-list__item--active) {
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
