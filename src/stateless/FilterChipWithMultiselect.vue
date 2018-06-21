<template>
    <div v-click-outside="close">
        <filter-chip
            :click="chipClick"
            :is-open="open"
            :active="value.length > 0"
            :selection-counter="{ selected: value.length, all: options.length }"
            :label="label">
        </filter-chip>
        <inline-dialog v-if="open">
            <multiselect
                :value="value"
                :auto-reorder="false"
                :is-searchable="options.length > searchableWhenOptionsLengthIsMoreThan"
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
            open: false,
        }
    },
    methods: {
        chipClick () {
            this.open = !this.open
        },
        close () {
            this.open = false
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
