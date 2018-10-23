<template>
    <div :class="$style.row">
        <div
            v-for="(column, columnIndex) in columns"
            :key="columnIndex"
            :class="[$style.columnContainer, { [$style.columnContainer_first]: column.first }]"
            :style="column.themeCss">
            <div :class="{ [$style.columnWrap]: true}">
                <div
                    v-if="!noTitles"
                    :class="[$style.columnItem, $style.columnItem_firstRow, { [$style.columnItem_active]: isCellActive(0, columnIndex), [$style.columnItem_title]: hoverRowIndex !== 0 }]"
                    @mousemove="hoverRowIndex = 0; hoverColumnIndex = columnIndex;"
                    @mouseleave="hoverRowIndex = null; hoverColumnIndex = null;"
                    @click="$emit('click', { rowIndex: 0, columnIndex, value: column.value })">
                    {{ column.title || '' }}
                </div>
                <div v-for="(item, rowIndex) in column.content" :key="rowIndex">
                    <div
                        v-if="item"
                        :class="[$style.columnItem, { [$style.columnItem_active]: isCellActive(rowIndex + 1, columnIndex), [$style.columnItem_title]: columnIndex === 0 && hoverColumnIndex !== 0 }]"
                        :style="column.first && heightByIndex[rowIndex] ? { height: `${2 + Math.round(heightByIndex[rowIndex])}px` } : {}"
                        @mousemove="hoverRowIndex = rowIndex + 1; hoverColumnIndex = columnIndex;"
                        @mouseleave="hoverRowIndex = null; hoverColumnIndex = null;"
                        @click="$emit('click', { rowIndex: rowIndex + 1, columnIndex, value: null })">
                        <slot :item="item" :row-index="rowIndex" :column-index="columnIndex"></slot>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TextLine from '../stateless/TextLine.vue'

export default {
    components: {
        TextLine,
    },
    props: {
        columns: { type: Array, required: true },
    },
    data () {
        return {
            hoverRowIndex: null,
            hoverColumnIndex: null,
            heightByIndex: {},
        }
    },
    computed: {
        noTitles () {
            return this.columns.every(column => !column.title)
        },
    },
    created () {
        this.$on('height', ({ rowIndex, height }) => {
            this.$set(this.heightByIndex, rowIndex, height)
        })
    },
    methods: {
        isCellActive (rowIndex, columnIndex) {
            if (this.hoverRowIndex === null || this.hoverColumnIndex === null) {
                return false
            }
            if (rowIndex === 0 && columnIndex === 0 || this.hoverRowIndex === 0 && this.hoverColumnIndex === 0) {
                return false
            }

            const isRowActive = this.hoverRowIndex === rowIndex && (this.columns[this.hoverColumnIndex].first || this.columns[columnIndex].first)
            const isColumnActive = this.hoverColumnIndex === columnIndex && (this.hoverRowIndex === 0 || rowIndex === 0)
            return isRowActive || isColumnActive
        },
    },
}
</script>

<style lang="less" module>
@column-padding: 15px;
.row {
    display: flex;
    margin-bottom: 30px;
    background-color: #eee;
}

.columnItem {
    padding: @column-padding;
    font-size: 12px;

    animation: fadeIn 350ms ease-in;
    animation-delay: 50ms;
    animation-fill-mode: forwards;
    opacity: 0;
}

.columnContainer:not(.columnContainer_first) {
    flex: 1;
}

.columnWrap {
    transition: background-color 250ms ease;
    transition-delay: 20ms;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

.columnItem {
    padding: @column-padding;
    display: flex;
    transition: background-color 0ms ease;
    transition-delay: 5ms;

    &_active {
        background-color: rgba(122, 122, 122, 0.15);

    }

    &_firstRow {
        padding: @column-padding;
        min-height: 16px;
        font-size: 18px;
        line-height: 16px;
        cursor: pointer;

        &:hover {
            text-decoration: underline;
        }
    }

    &_active&_title {
        background-color: rgba(200, 100, 100, 0.3);
        text-decoration: underline;
    }
}
</style>
