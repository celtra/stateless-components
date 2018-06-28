<template>
    <div class="column-filter">
        <div v-if="currentColumnId === null" class="column-filter__select-column">
            <div class="column-filter__search">
                <input-element v-model="searchText" label="Search" theme="light">
                    <icon slot="before" name="search" />
                </input-element>
            </div>

            <default-list :items="listColumns" @select="selectColumn"></default-list>
        </div>
        <template v-else>
            <div class="column-filter__column-header">
                <div class="column-filter__column-header-left">
                    <icon name="back" class="column-filter__back" @click="resetState()" />
                    <p class="column-filter__column-header-label">{{ currentColumn.label }}</p>
                </div>

                <icon name="close" class="column-filter__close" @click="$emit('close')" />
            </div>

            <div class="column-filter__set-filter">
                <template v-if="currentColumn.type === 'Multiselect'">
                    <multiselect v-model="value" v-bind="currentColumn.props" :is-searchable="!!currentColumn.props.getOptions">
                        <multiline-list-item slot-scope="{ item }" :label="item.label" :metadata="item.metadata" theme="light">
                            <div v-if="item.ratio" slot="right">
                                <pie-chart :ratio="item.ratio" />
                            </div>
                        </multiline-list-item>
                    </multiselect>
                </template>
                <template v-if="currentColumn.type === 'Number'">
                    <div class="column-filter__number">
                        <div class="column-filter__operator-wrap">
                            <selectbox v-model="numberOperator" :options="operators" theme="light"></selectbox>
                        </div>
                        <input-element v-model="value" v-bind="currentColumn.props" type="number" label="Enter value" theme="light"></input-element>
                    </div>
                </template>
                <template v-if="currentColumn.type === 'String'">
                    <input-element v-model="value" v-bind="currentColumn.props" label="Enter value" theme="light"></input-element>
                </template>
            </div>

            <dialog-button class="column-filter__apply-button" @click="apply">Apply</dialog-button>
        </template>
    </div>
</template>

<script>
import Icon from './icon.vue'
import Input from './input.vue'
import DefaultList from './DefaultList.vue'
import Multiselect from './multiselect.vue'
import MultilineListItem from './MultilineListItem.vue'
import Selectbox from './selectbox.vue'
import DialogButton from './dialog_button.vue'
import PieChart from './PieChart.vue'
import * as itemsUtils from './items_utils'

export default {
    components: {
        Icon,
        inputElement: Input,
        DefaultList,
        MultilineListItem,
        Multiselect,
        Selectbox,
        DialogButton,
        PieChart,
    },
    props: {
        columns: { type: Array, required: true },
    },
    data () {
        return {
            searchText: '',
            currentColumnId: null,
            stringValue: '',
            numberValue: null,
            numberOperator: 'eq',
            multiselectValue: [],
        }
    },
    computed: {
        value: {
            get () {
                if (!this.currentColumnId) {
                    return null
                }
                if (this.currentColumn.type === 'Multiselect') {
                    return this.multiselectValue
                } else if (this.currentColumn.type === 'Number') {
                    return this.numberValue
                } else if (this.currentColumn.type === 'String') {
                    return this.stringValue
                }
            },
            set (v) {
                if (this.currentColumn.type === 'Multiselect') {
                    this.multiselectValue = v
                } else if (this.currentColumn.type === 'Number') {
                    this.numberValue = v
                } else if (this.currentColumn.type === 'String') {
                    this.stringValue = v
                }
            },
        },
        listColumns () {
            let cleanQuery = (this.searchText || '').trim(' ').toLowerCase()
            if (cleanQuery.length > 0) {
                return itemsUtils.filter(this.columns, item => {
                    return item.label && item.label.toLowerCase().indexOf(cleanQuery) >= 0
                })
            } else {
                return this.columns
            }
        },
        currentColumn () {
            if (!this.currentColumnId) {
                return null
            }
            return itemsUtils.find(this.columns, x => x.id === this.currentColumnId)
        },
    },
    created () {
        this.operators = [
            { id: 'eq', label: '=' },
            { id: 'lt', label: '<' },
            { id: 'lte', label: '≤' },
            { id: 'gt', label: '>' },
            { id: 'gte', label: '≥' },
        ]
    },
    methods: {
        resetState () {
            this.searchText = ''
            this.currentColumnId = null
            this.stringValue = ''
            this.numberValue = null
            this.numberOperator = 'eq'
            this.multiselectValue = []
        },
        selectColumn (item) {
            this.currentColumnId = item.id
        },
        apply () {
            let extraData = {}
            if (this.currentColumn.type === 'Number') {
                extraData.operator = this.numberOperator
            }
            this.$emit('apply', {
                columnId: this.currentColumnId,
                value: this.value,
                ...extraData,
            })
        },
    },
}
</script>

<style lang="less" scoped>
@import (reference) './variables';

.column-filter {
    width: 100%;

    &__select-column {
        padding-bottom: 10px;
    }

    &__search {
        margin: 10px 15px 0px 15px;
    }

    &__set-filter {
        padding: 10px 20px;
    }

    &__number {
        display: flex;
    }

    &__operator-wrap {
        width: 50px;
        margin-right: 15px;
    }

    &__column-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #F5F5F5;
        padding: 10px 20px;
    }

    &__column-header-left {
        display: flex;
        align-items: center;
    }

    &__column-header-label {
        font-size: 18px;
        margin: 0;
    }

    &__back {
        cursor: pointer;
        margin-right: 15px;
    }

    &__close {
        cursor: pointer;
        color: @gray-blue;
    }

    &__apply-button {
        width: 100%;
    }
}
</style>

<style lang="less">
.dialog-button.dialog-button.dialog-button {
    padding-left: 0;
    padding-right: 0;
    width: 100%;
    text-align: center;
}

.checkbox-element__check-row.checkbox-element__check-row.checkbox-element__check-row.checkbox-element__check-row {
    align-items: flex-start;
}
</style>
