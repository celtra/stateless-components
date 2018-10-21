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
                        @mousemove="hoverIndex = rowIndex"
                        @mouseleave="hoverIndex = null">
                        <text-line v-if="typeof item === 'string'" :class="$style.flatName" :style="heightByIndex[rowIndex] ? { height: `${Math.round(heightByIndex[rowIndex])}px` } : {}" :text="item" theme="light" />
                        <slot v-else v-bind="item" :row-index="rowIndex" :column-index="columnIndex"></slot>
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

.columnContainer {
    flex: 1;
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

.columnContainer_first {
    // max-width: 300px;
    // min-width: 140px;
    // width: fit-content;
    // flex: initial;
    // // font-weight: bold;

    .columnTitle {
        text-align: right;
    }

    .columnItem {
        justify-content: flex-end;

        > div {
            justify-content: flex-end;
        }
    }
}

.columnWrap {
    transition: background-color 250ms ease;
    transition-delay: 20ms;
    &:hover {
        .columnItem {
            background-color: rgba(122, 122, 122, 0.15);
        }
        // background-color: rgba(122, 122, 122, 0.15);
    }
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

    &_active {
        background-color: rgba(122, 122, 122, 0.15);
    }
}

.columnItemBoundingContainer {
    background-color: rgba(59, 172, 255, 0.25);
    width: 100%;
}

.flatName {
    font-size: 14px;
    display: flex;
    align-items: center;
    height: 20px;
}
</style>
