<template>
    <div :class="$style.row">
        <div
            v-for="(column, columnIndex) in columns"
            :key="columnIndex"
            :class="{ [$style.columnContainer]: true, [$style.columnContainer_first]: columnIndex === 0 }"
            :style="column.themeCss">
            <div :class="$style.columnTitle">{{ column.title || '' }}</div>
            <div v-for="(item, itemIndex) in column.content" :key="itemIndex">
                <div
                    :class="[$style.columnItem, { [$style.columnItem_active]: hoverUsecaseIndex === itemIndex }]"
                    @mousemove="hoverUsecaseIndex = itemIndex"
                    @mouseleave="hoverUsecaseIndex = null">
                    <span v-if="typeof item === 'string'" :class="$style.flatName" :style="heightByIndex[itemIndex] ? { height: `${Math.round(heightByIndex[itemIndex])}px` } : {}">{{ item }}</span>
                    <slot v-else :item="item" @height="(v) => columnIndex === 1 && setHeight(`${columnIndex}-${itemIndex}`, v)"></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        columns: { type: Array, required: true },
    },
    data () {
        return {
            hoverUsecaseIndex: null,
            heightByIndex: {},
        }
    },
}
</script>

<style lang="less" module>
@column-padding: 15px;
.row {
    display: flex;
    margin-bottom: 30px;
    background-color: #eee;
    border-radius: 5px;
}

.columnContainer {
    flex: 1;
    padding-top: @column-padding;
}

.columnTitle {
    padding: 0 @column-padding;
    margin-bottom: 10px;
    min-height: 25px;
}

.columnContainer_first {
    width: fit-content;
    min-width: 180px;
    flex: initial;
    font-weight: bold;

    .columnTitle {
        text-align: right;
    }

    .columnItem {
        justify-content: flex-end;
        padding: @column-padding;
    }
}

.columnItem {
    cursor: pointer;
    padding: @column-padding;
    display: flex;

    &_active {
        background-color: rgba(122, 122, 122, 0.15);
    }
}

.columnItemBoundingContainer {
    background-color: rgba(59, 172, 255, 0.25);
    width: 100%;
}

.component {
    width: 100%;

    &.component.component {
        margin: 0;
    }
}

.flatName {
    font-size: 14px;
    display: flex;
    align-items: center;
    height: 20px;
    transition: height 400ms ease-in;
}
</style>
