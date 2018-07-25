<template>
    <div class="multiselect">
        <div v-if="isSearchable" class="multiselect__search-with-icon">
            <input-element
                v-model="searchQuery"
                :label="label"
                icon="/img/icons/search.svg"
                size="phat">
            </input-element>
        </div>

        <div class="multiselect__change-multiple">
            <checkbox-element v-if="clearAllLength === 0" :value="false" size="condensed" class="multiselect__select-all" @input="selectAll">
                <span class="multiselect__select-all-label">SELECT ALL</span>
            </checkbox-element>
            <div v-else class="multiselect__clear-all" @click="clearAll">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8" class="multiselect__clear-all-icon">
                    <polygon points="6.4 0 4 2.4 1.6 0 0 1.6 2.4 4 0 6.4 1.6 8 4 5.6 6.4 8 8 6.4 5.6 4 8 1.6"/>
                </svg>
                <span class="multiselect__clear-all-text">CLEAR ALL ({{ clearAllLength }})</span>
            </div>
        </div>

        <div ref="multiselectOptions" class="multiselect__options">
            <transition-group name="multiselect__item" tag="div">
                <div v-for="option in displayOptions" :key="option.id" :title="option.disabledText" class="multiselect__option">
                    <checkbox-element
                        :disabled="option.disabled"
                        :disabled-text="option.disabledText"
                        :value="isChecked(option.id)"
                        :size="size"
                        :style="{ width: `${option.checkboxWidth}px` }"
                        class="multiselect__checkbox"
                        @input="setChecked(option.id, $event)">
                        {{ option.label }}
                    </checkbox-element>

                    <p v-if="option.metadata" :style="{ width: `${option.metadataWidth}px` }" class="multiselect__metadata">{{ option.metadata | middleEllipsis(option.metadataLength) }}</p>
                </div>
            </transition-group>
        </div>

        <div class="multiselect__options" style="visibility: hidden; position: absolute;">
            <div v-for="option in displayOptions" ref="options" :key="option.id" class="multiselect__option">
                <checkbox-element
                    :value="false"
                    :size="size"
                    class="multiselect__checkbox">
                    {{ option.label }}
                </checkbox-element>

                <p v-if="option.metadata" class="multiselect__metadata">{{ option.metadata }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import Input from './input.vue'
import Checkbox from './checkbox.vue'
import debounce from 'lodash.debounce'

export default {
    components: {
        inputElement: Input,
        checkboxElement: Checkbox,
    },
    props: {
        value: { type: Array, required: true },
        options: { type: Array, required: true },
        isSearchable: { type: Boolean, default: false },
        label: { type: String, default: 'Search' },
        size: { type: String, default: 'normal' },
    },
    data () {
        return {
            searchQuery: null,
            checked: this.value,
            checkedForSorting: [],
            checkboxWidthByIndex: {},
            totalWidth: 500,
        }
    },
    computed: {
        filteredOptions () {
            let query = (this.searchQuery || '').trim(' ').toLowerCase()
            let options = this.options.filter(option => {
                return query.length === 0 ||
                    this.checked.includes(option.id) ||
                    option.label.toLowerCase().indexOf(query) >= 0 ||
                    (option.metadata && option.metadata.toLowerCase().indexOf(query) >= 0)
            })
            options.sort((x, y) => {
                let checkedDiff = (this.checkedForSorting.includes(y.id) && ! y.disabled) - (this.checkedForSorting.includes(x.id) && ! x.disabled)
                if (checkedDiff === 0) {
                    if (x.label === y.label) {
                        return x.id > y.id ? 1 : -1
                    }
                    return x.label > y.label ? 1 : -1
                }
                return checkedDiff
            })
            return options
        },
        displayOptions () {
            return this.filteredOptions.map((option, index) => {
                let checkboxWidth = this.checkboxWidthByIndex[index]
                let metadataWidth = this.totalWidth - checkboxWidth
                return {
                    ...option,
                    checkboxWidth: checkboxWidth,
                    metadataWidth: metadataWidth,
                    metadataLength: Math.floor(metadataWidth / 7),
                }
            })
        },
        clearAllLength () {
            return this.options.filter(o => this.checked.includes(o.id) && !o.disabled).length
        },
    },
    watch: {
        filteredOptions () {
            this.$nextTick(this.updateWidths)
        },
        checked () {
            this.$emit('input', this.checked)
        },
    },
    created () {
        this.updateOptionsOrder()
    },
    mounted () {
        window.addEventListener('resize', () => this.updateWidths())
        this.$refs.multiselectOptions.style.height = this.$refs.multiselectOptions.clientHeight + 'px'

        this.$nextTick(this.updateWidths)
    },
    beforeDestroy () {
        window.removeEventListener('resize', () => this.resize())
    },
    methods: {
        updateWidths () {
            const THRESHOLD = 0.1
            let totalWidth = this.$el.getElementsByClassName('multiselect__options')[0].clientWidth

            let widthsByIndex = {}
            this.$refs.options.forEach((el, index) => {
                let children = Array.from(el.childNodes).filter(node => node.nodeType == Node.ELEMENT_NODE)
                if (children.length === 2) {
                    let checkboxWidth = children[0].clientWidth
                    let metadataWidth = children[1].clientWidth

                    if (checkboxWidth + metadataWidth > totalWidth) {
                        let finalCheckboxWidth
                        if (checkboxWidth > metadataWidth) {
                            if (checkboxWidth <= (0.5 + THRESHOLD) * totalWidth) {
                                finalCheckboxWidth = checkboxWidth
                            } else {
                                finalCheckboxWidth = Math.floor(0.5 * totalWidth)
                            }
                        } else {
                            if (metadataWidth <= (0.5 + THRESHOLD) * totalWidth) {
                                finalCheckboxWidth = totalWidth - metadataWidth
                            } else {
                                finalCheckboxWidth = Math.floor(0.5 * totalWidth)
                            }
                        }

                        widthsByIndex[index] = finalCheckboxWidth
                    }
                }
            })

            this.totalWidth = totalWidth
            this.checkboxWidthByIndex = widthsByIndex
        },
        isChecked (optionId) {
            return this.checked.includes(optionId)
        },
        setChecked (optionId, isChecked) {
            if (!this.options.find(o => o.id === optionId).disabled) {
                if (isChecked) {
                    this.checked.push(optionId)
                } else {
                    let index = this.checked.indexOf(optionId)
                    if (index >= 0){
                        this.checked.splice(index, 1)
                    }
                }
            }
            this.updateOptionsOrder()
        },
        selectAll () {
            this.filteredOptions.forEach(option => {
                this.setChecked(option.id, true)
            })
        },
        clearAll () {
            this.options.forEach(option => {
                this.setChecked(option.id, false)
            })
        },
        updateOptionsOrder: debounce(function () {
            this.checkedForSorting = this.checked.slice().filter(optionId => !this.options.find(o => o.id === optionId).disabled)
        }, 350),
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

    &__search-icon {
        margin-right: 12px;
    }

    &__options {
        padding-bottom: 10px;
        flex:auto;
        max-height: 370px;
        overflow-y: auto;
        margin-top: 5px;
        padding-right: 5px;
    }

    &__change-multiple {
        flex: none;
    }

    &__select-all {
        margin-left: 5px;
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
        padding-left: 7px;
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

    &__option {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 10px;
        width: 100%;
    }

    &__metadata {
        white-space: nowrap;
        font-size: 11px;
        margin: 0;
        text-align: right;
        overflow: hidden;
    }
}

.multiselect__option > .multiselect__checkbox {
    margin-top: 0px;
}

.multiselect__item-move {
    transition : all 0.3s ease-in;
}

.multiselect__item-enter, .multiselect__item-leave-to {
    opacity : 0;
}
.multiselect__item-leave-active {
    position : absolute;
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
</style>
