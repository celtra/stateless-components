<template>
    <div :class="{ 'filter-chip__active': active, 'filter-chip__open': isOpen }" class="filter-chip" @click="click()">
        <div class="label">
            <slot>{{ label }}</slot>
        </div>
        <div v-if="selectionCounter.all > 0" class="selection-counter">
            {{ selectionCounter.selected }}/{{ selectionCounter.all }}
        </div>
    </div>
</template>

<script>
export default {
    props: {
        click: { type: Function, required: true },
        label: { type: String, default: '' },
        selectionCounter: { type: Object, default: () => { return { selected: 0, all: 0 } } },
        active: { type: Boolean, default: false },
        isOpen: { type: Boolean, default: false },
    },
}
</script>

<style lang="less" scoped>
@import (reference) './variables';

.filter-chip {
    font-size: 12px;
    color: @very-light-gray;
    user-select: none;
    background-color: fade(@gunpowder, 60);

    display: inline-flex;
    align-items: center;

    height: 20px;
    padding: 0 10px;
    border-radius: 3px;

    &:hover {
        cursor: pointer;
        background-color: @gunpowder;
        color: @white;

        svg {
            fill: @white;
        }
    }

    // active === pressed
    &:active, &.filter-chip__open {
        background-color: @bluish-gray;
        color: @white;

        svg {
            fill: @white;
        }
    }

    &.filter-chip__active {
        background-color: fade(@royal-blue, 80);

        &:hover {
            background-color: @royal-blue;
        }
    }

    .label {
        padding-right: 5px;
    }
}
</style>
