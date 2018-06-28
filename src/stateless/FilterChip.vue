<template>
    <div :class="{ active: isActive, open: isOpen } | prefix('filter-chip--')" class="filter-chip" @click="$emit('click')">
        <div class="label">
            <slot>{{ label }}</slot>
        </div>
        <div v-if="totalCount > 0" class="selection-counter">
            {{ selectedCount }}/{{ totalCount }}
        </div>
    </div>
</template>

<script>
export default {
    props: {
        label: { type: String, default: '' },
        selectedCount: { type: Number, default: 0 },
        totalCount: { type: Number, default: 0 },
        isActive: { type: Boolean, default: false },
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

    &:active, &.filter-chip--open {
        background-color: @bluish-gray;
        color: @white;

        svg {
            fill: @white;
        }
    }

    &.filter-chip--active {
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
