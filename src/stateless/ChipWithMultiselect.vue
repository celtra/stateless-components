<template>
    <div v-click-outside="close">
        <chip
            :is-active="value.length > 0"
            :label="chipLabel"
            :metadata="`${value.length}/${options.length}`"
            theme="dark"
            @click="chipClick">
        </chip>
        <inline-dialog v-if="isOpen">
            <multiselect
                :value="value"
                :label="searchLabel"
                :auto-reorder="false"
                :is-searchable="isSearchable"
                :init-search-query="searchQuery"
                :can-select-and-clear-all="canSelectAndClearAll"
                :can-clear-all="canClearAll"
                :options="options"
                :size="size"
                theme="light"
                @search="searchChange"
                @input="selectionChange">
                <div slot-scope="{ item }" style="width: 100%;">
                    <slot :item="item">
                        <middle-ellipsis-list-item
                            :label="item.label"
                            :metadata="item.metadata"
                            :size="size"
                            theme="light" />
                    </slot>
                </div>
            </multiselect>
        </inline-dialog>
    </div>
</template>

<script>
import Chip from './Chip'
import InlineDialog from './InlineDialog'
import Multiselect from './multiselect'
import MiddleEllipsisListItem from './MiddleEllipsisListItem.vue'

export default {
    components: {
        Chip,
        InlineDialog,
        Multiselect,
        MiddleEllipsisListItem,
    },
    props: {
        size: { type: String, default: 'normal' }, // condensed | normal
        value: { type: Array, required: true },
        options: { type: Array, required: true },
        chipLabel: { type: String, required: true },
        searchLabel: { type: String, required: true },
        isSearchable: { type: Boolean, default: false },
        canSelectAndClearAll: { type: Boolean, default: false },
        canClearAll: { type: Boolean, default: false },
    },
    usecases: [
        {
            options: [
                { id: '1', label: 'This is really long creative name that needs to work well', metadata: '100000' },
                { id: '2', label: '2', metadata: 'zan.kusterle@gmail.com' },
                { id: '3', label: 'zan.kusterle@gmail.com', metadata: '3' },
                { id: '4', label: 'zan.kusterle@gmail.com', metadata: 'zan.kusterle@gmail.com' },
                { id: '5', label: '5', metadata: '5' },
                {
                    id: '6',
                    label: 'This is really long creative name that needs to work well',
                    metadata: '700',
                },
            ],
            value: [ '1', '2' ],
            isSearchable: true,
            canSelectAndClearAll: true,
            canClearAll: true,
            chipLabel: 'Chip Label',
            searchLabel: 'Search Label',
        },
    ],
    data () {
        return {
            isOpen: false,
            searchQuery: '',
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
        searchChange (searchQuery) {
            this.searchQuery = searchQuery
            this.$emit('search', searchQuery)
        },
    },
}
</script>

<style lang="less" scoped>
.inline-dialog {
    margin-top: 10px;
    padding: 15px;
}
</style>
