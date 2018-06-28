<template>
    <div v-click-outside="close">
        <filter-chip
            :is-open="isOpen"
            :is-active="value.length > 0"
            :selected-count="value.length"
            :total-count="options.length"
            :label="label"
            @click="chipClick">
        </filter-chip>
        <inline-dialog v-if="isOpen">
            <multiselect
                :value="value"
                :auto-reorder="false"
                :is-searchable="options.length > searchableWhenOptionsLengthIsMoreThan"
                :show-select-clear-all="options.length > searchableWhenOptionsLengthIsMoreThan"
                :options="options"
                @input="selectionChange">
            </multiselect>
        </inline-dialog>
    </div>
</template>

<script>
import FilterChip from './FilterChip'
import InlineDialog from './InlineDialog'
import Multiselect from './multiselect'

export default {
    components: {
        FilterChip,
        InlineDialog,
        Multiselect,
    },
    props: {
        value: { type: Array, required: true },
        options: { type: Array, required: true },
        label: { type: String, required: true },
        searchableWhenOptionsLengthIsMoreThan: { type: Number, default: 6 },
    },
    data () {
        return {
            isOpen: false,
        }
    },
    methods: {
        chipClick () {
            this.isOpen = !this.isOpen
        },
        close () {
            this.isOpen = false
        },
        selectionChange (selected) {
            this.$emit('input', selected)
        },
    },
}
</script>

<style lang="less" scoped>
.inline-dialog {
    margin-top: 5px;
}
</style>
