<template>
    <div :class="[theme, size, { open: isOpen, highlight: isHighlight, active: isActive }] | prefix('chip--')" class="chip" @click="$emit('click')">
        <div class="chip__label">{{ label }}</div>
        <div class="chip__metadata">{{ metadata }}</div>
        <span v-if="isRemovable" @click.stop="$emit('remove')">
            <icon :style-override="{ width: '8px', height: '8px'}" class="chip__remove-btn" name="x-bold"></icon>
        </span>
    </div>
</template>

<script>
import Icon from './icon.vue'

export default {
    components: {
        Icon,
    },
    props: {
        theme: { type: String, default: 'dark' }, // dark | light
        size: { type: String, default: 'normal' }, // condensed | normal
        label: { type: String, default: '' },
        metadata: { type: String, default: '' },
        isOpen: { type: Boolean, default: false },
        isActive: { type: Boolean, default: false },
        isHighlight: { type: Boolean, default: false },
        isRemovable: { type: Boolean, default: false },
    },
}
</script>

<style lang="less" scoped>
@import (reference) './variables';

.chip {
    height: 20px;
    font-size: 12px;
    font-family: @semibold-text-font;
    border-radius: 3px;
    display: inline-flex;
    align-items: center;
    user-select: none;
    cursor: pointer;
    transition: all @icon-hover-transition-time;
}

.chip__label {
    padding: 0 5px;
}

.chip__metadata {
    font-family: @regular-text-font;
}

.chip__remove-btn {
    transition: all @icon-hover-transition-time;
    padding: 0 0 0 5px;
}

/* SIZES */
.chip--condensed {
    padding: 0;

    .chip__remove-btn {
        padding: 0 5px 0 0;
    }
}

.chip--normal {
    padding: 0 5px;
}

/* DARK THEME */
.chip--dark {
    color: @very-light-gray;

    .chip__remove-btn {
        color: @gunpowder;
        :hover { color: @white; }

        .chip--active& {
            color: fade(@white, 40%);
            :hover { color: @white; }
        }
    }

    &.chip--highlight {
        background-color: fade(@gunpowder, 60%);
        .chip__remove-btn { color: fade(@very-light-gray, 40%); }

        &.chip--active {
            background-color: fade(@royal-blue, 80%);
            .chip__remove-btn { color: fade(@white, 80%); }
        }
    }

    &:hover {
        color: @white;
        background-color: @gunpowder;
        .chip__remove-btn { color: fade(@very-light-gray, 40%); }

        &.chip--active {
            color: @white;
            background-color: @royal-blue;
            .chip__remove-btn { color: fade(@white, 80%); }
        }
    }

    &:active,
    &.chip--open {
        color: @white;
        background-color: fade(@bluish-gray, 60%);
        .chip__remove-btn { color: fade(@very-light-gray, 40%); }

        &.chip--active {
            color: @white;
            background-color: @royal-blue;
            .chip__remove-btn { color: fade(@white, 80%); }
        }
    }
}

/* LIGHT THEME */
.chip--light {
    color: @gunpowder;

    &.chip--active {
        color: @royal-blue;
    }

    .chip__remove-btn {
        color: fade(@gunpowder, 20%);
        :hover { color: @black; }

        .chip--active& {
            :hover { color: @white; }
        }
    }

    &.chip--highlight {
        background-color: fade(@very-light-gray, 60%);
        .chip__remove-btn { color: fade(@gunpowder, 80%) }

        &.chip--active {
            color: @white;
            background-color: fade(@royal-blue, 80%);
            .chip__remove-btn { color: fade(@white, 80%) }
        }
    }

    &:hover {
        color: @black;
        background-color: @very-light-gray;
        .chip__remove-btn { color: fade(@gunpowder, 80%) }

        &.chip--active {
            color: @white;
            background-color: @royal-blue;
            .chip__remove-btn { color: fade(@white, 80%) }
        }
    }

    &:active,
    &.chip--open {
        color: @black;
        background-color: fade(@bluish-gray, 60%);
        .chip__remove-btn { color: fade(@gunpowder, 80%) }

        &.chip--active {
            color: @white;
            background-color: @royal-blue;
            .chip__remove-btn { color: fade(@white, 80%) }
        }
    }
}
</style>
