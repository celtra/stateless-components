<template>
    <div class="multiselect">
        <div v-if="isSearchable" class="multiselect__search-with-icon">
            <input-element
                v-model="searchQuery"
                :label="label"
                icon="/img/icons/search.svg"
                size="phat"
                theme="light">
            </input-element>
        </div>

        <div :style="!canScrollTop ? { visibility: 'hidden' } : {}" class="multiselect__scroll-top" @click="scrollTop">SCROLL TO TOP</div>

        <div ref="multiselectOptions" class="multiselect__options" @scroll="onScroll">
            <div class="multiselect__change-multiple">
                <checkbox-element v-if="value.length === 0" :value="false" size="condensed" class="multiselect__select-all" @input="selectAll">
                    <span class="multiselect__select-all-label">SELECT ALL</span>
                </checkbox-element>
                <div v-else class="multiselect__clear-all" @click="clearAll">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8" class="multiselect__clear-all-icon">
                        <polygon points="6.4 0 4 2.4 1.6 0 0 1.6 2.4 4 0 6.4 1.6 8 4 5.6 6.4 8 8 6.4 5.6 4 8 1.6"/>
                    </svg>
                    <span class="multiselect__clear-all-text">CLEAR ALL ({{ value.length }})</span>
                </div>
            </div>

            <div>
                <default-list :items="listItems" :transition-sorting="true" :no-group-rendering="areGroupsSelectable" class="multiselect__default-list">
                    <div slot-scope="{ item }" @mouseenter="hoveringOptionId = item.id" @mouseleave="hoveringOptionId = null">
                        <checkbox-element
                            :disabled="item.disabled"
                            :title-text="item.label"
                            :disabled-text="item.disabledText"
                            :value="isChecked(item)"
                            :size="size"
                            theme="light"
                            class="multiselect__checkbox"
                            @input="setChecked(item, $event)">

                            <slot :item="item">
                                <default-list-item :label="item.label" :metadata="item.metadata" :size="size" theme="light" class="multiselect__default-list-item" />
                            </slot>
                        </checkbox-element>

                        <div v-if="hoveringOptionId === item.id && item.tooltip" class="multiselect__tooltip">
                            {{ item.tooltip }}
                        </div>
                    </div>
                </default-list>
            </div>
        </div>
    </div>
</template>

<script>
import Input from './input.vue'
import Checkbox from './checkbox.vue'
import DefaultList from './DefaultList.vue'
import DefaultListItem from './DefaultListItem.vue'
import * as itemsUtils from './items_utils.js'

export default {
    components: {
        inputElement: Input,
        checkboxElement: Checkbox,
        DefaultList,
        DefaultListItem,
    },
    props: {
        value: { type: Array, required: true },
        options: { type: Array, required: true },
        autoReorder: { type: Boolean, default: true },
        isSearchable: { type: Boolean, default: false },
        areGroupsSelectable: { type: Boolean, default: false },
        getOptions: { type: Function },
        label: { type: String, default: 'Search' },
        size: { type: String, default: 'normal' },
    },
    data () {
        return {
            searchQuery: null,
            queryOptions: [],
            currentScrollTop: 0,
            hoveringOptionId: null,
        }
    },
    computed: {
        allOptions () {
            return this.options.concat(this.queryOptions)
        },
        allIds () {
            return []
        },
        canScrollTop () {
            return this.currentScrollTop > 0
        },
        listItems () {
            let result = this.allOptions

            if (!this.areGroupsSelectable) {
                let removedOptions = []
                const removeSelected = (options) => {
                    return options.map(option => {
                        if (option.options) {
                            let newOptions = removeSelected(option.options)
                            if (newOptions.length === 0) {
                                return null
                            }
                            return {
                                ...option,
                                options: newOptions,
                            }
                        } else {
                            if (this.value.includes(option.id)) {
                                removedOptions.push(option)
                                return null
                            }
                            return option
                        }
                    }).filter(x => x)
                }

                let unselectedOptions = removeSelected(this.allOptions)
                result = removedOptions.concat(unselectedOptions)
            }

            let cleanQuery = (this.searchQuery || '').trim(' ').toLowerCase()
            if (cleanQuery.length > 0) {
                result = itemsUtils.filter(result, (option) => {
                    return (option.label && option.label.toLowerCase().indexOf(cleanQuery) >= 0) ||
                        (option.metadata && option.metadata.toLowerCase().indexOf(cleanQuery) >= 0)
                })
            }

            result = itemsUtils.sort(result, (x, y) => {
                if (!this.areGroupsSelectable && (x.options || y.options)) {
                    return 0
                }

                let isCheckedX = this.isChecked(x)
                let isCheckedY = this.isChecked(y)

                if (!this.autoReorder || isCheckedX === isCheckedY) {
                    return 0
                } else if (isCheckedX === true) {
                    return -1
                } else if (isCheckedY === true) {
                    return 1
                } else if (isCheckedX === null) {
                    return -1
                } else if (isCheckedY === null) {
                    return 1
                }
                return 0
            })

            return result
        },
    },
    watch: {
        searchQuery (v) {
            if (this.getOptions) {
                this.getOptions(v).then(result => {
                    this.queryOptions = result
                })
            }
        },
    },
    mounted () {
        this.$refs.multiselectOptions.style.height = this.$refs.multiselectOptions.clientHeight + 'px'
    },
    methods: {
        selectAll () {
            this.$emit('input', this.allIds)
        },
        clearAll () {
            this.$emit('input', [])
        },
        onScroll (e) {
            this.currentScrollTop = e.target.scrollTop
        },
        scrollTop () {
            this.$refs.multiselectOptions.scrollTop = 0
        },
        setChecked (option, isChecked) {
            if (!option.disabled) {
                if (option.isLeaf) {
                    let valueWithout = this.value.filter(id => id !== option.id)
                    if (isChecked) {
                        this.$emit('input', valueWithout.concat([option.id]))
                    } else {
                        this.$emit('input', valueWithout)
                    }
                } else {
                    let valueWithout = this.value.filter(id => !option.leafIds.includes(id))
                    if (isChecked) {
                        this.$emit('input', valueWithout.concat(option.leafIds))
                    } else {
                        this.$emit('input', valueWithout)
                    }
                }
            }
        },
        isChecked (option) {
            if (!option.options) {
                return this.value.includes(option.id)
            } else {
                let allChecked = true
                let someChecked = false
                for (let id of itemsUtils.getLeafIds(option)) {
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
    height: 100%;
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

    &__options {
        padding-bottom: 10px;
        flex: auto;
        max-height: 370px;
        overflow-y: auto;
        overflow-x: hidden;
        margin-top: 5px;
        padding-left: 5px;
        padding-right: 5px;
        clip-path: inset(0px 0px 0px 0px);
    }

    &__change-multiple {
        flex: none;
    }

    &__select-all-label {
        color: @bluish-gray;
        font-size: 11px;
    }

    &__clear-all {
        color: @bluish-gray;
        font-size: 11px;
        margin-top: 10px;
        height: 20px;
        cursor: pointer;
        display: flex;
        align-items: center;
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

    &__checkbox {
        width: 100%;
    }

    &__tooltip {
        position: absolute;
        top: 12px;
        left: -4px;
        color: white;
        background-color: @gunpowder;
        border-radius: 3px;
        font-size: 11px;
        text-align: center;
        padding: 6px 20px;
        z-index: @z-index-new-dialog + 25;
        max-width: 200px;
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
// custom code to override checkbox styles since the size here is ultra small
.multiselect__select-all.checkbox-element.checkbox-element--condensed .checkbox-element__check-wrapper {
    width: 10px;
    height: 10px;
}

.multiselect__select-all.checkbox-element.checkbox-element--condensed .checkbox-element__square {
    width: 7px;
    height: 7px;
    margin-top: 3px;
}

.multiselect__default-list {
    .default-list__item.default-list__item.default-list__item {
        &:hover {
            background-color: inherit;
        }
    }
}
</style>
