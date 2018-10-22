<template>
    <div :class="$style.row">
        <div
            v-for="(column, columnIndex) in columns"
            :key="columnIndex"
            :class="[$style.columnContainer, { [$style.columnContainer_first]: column.first }]"
            :style="column.themeCss">
            <div :class="{ [$style.columnWrap]: true}">
                <div v-if="!noTitles" :class="[$style.columnItem, $style.columnTitle]">{{ column.title || '' }}</div>
                <div v-for="(item, rowIndex) in column.content" :key="rowIndex">
                    <div
                        v-if="item"
                        :class="[$style.columnItem, { [$style.columnItem_active]: hoverIndex === rowIndex }]"
                        :style="heightByIndex[rowIndex] ? { height: `${2 + Math.round(heightByIndex[rowIndex])}px` } : {}"
                        @mousemove="hoverIndex = rowIndex"
                        @mouseleave="hoverIndex = null">
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
            hoverIndex: null,
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

.columnTitle {
    padding: @column-padding;
    min-height: 16px;
    font-size: 18px;
    line-height: 16px;
}

.columnContainer:not(.columnContainer_first) {
    flex: 1;
    .columnWrap {
        &:hover {
            .columnItem {
                background-color: rgba(122, 122, 122, 0.15);
            }
        }
    }
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
    cursor: pointer;
    padding: @column-padding;
    display: flex;
    transition: background-color 0ms ease;
    transition-delay: 5ms;
    &:hover {
        z-index: 1000;
    }

    &_active {
        background-color: rgba(122, 122, 122, 0.15);
    }
}

.columnItemBoundingContainer {
    background-color: rgba(59, 172, 255, 0.25);
    width: 100%;
}
</style>
