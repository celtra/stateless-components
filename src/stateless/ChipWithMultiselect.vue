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
import debounce from 'lodash.debounce'

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
        searchChange: debounce(function (searchQuery) {
            this.searchQuery = searchQuery
        }, 300),
    },
}
</script>

<style lang="less" scoped>
.inline-dialog {
    margin-top: 10px;
    padding: 15px;
}
</style>
