<template>
    <div :class="[theme, { active: isActive, disabled: isDisabled }] | prefix('chip--')" class="chip" tabindex="0" @click="$emit('click')">
        <div class="chip__label">{{ label }}</div>
        <div v-if="metadata" class="chip__metadata">{{ metadata }}</div>
        <span v-if="isRemovable" @click.stop="$emit('remove')">
            <icon style="width: 8px; height: 8px" class="chip__remove-btn" name="x-bold"></icon>
        </span>
    </div>
</template>

<script>
import Icon from './icon.vue'

export default {
    name: 'chip',
    components: {
        Icon,
    },
    props: {
        theme: { type: String, default: 'dark' }, // dark | light
        label: { type: String, required: true },
        metadata: { type: String, default: '' },
        isActive: { type: Boolean, default: false },
        isRemovable: { type: Boolean, default: false },
        isDisabled: { type: Boolean, default: false },
    },
    variations: {
        theme: ['dark', 'light'],
        isActive: [false, true],
        isRemovable: [false, true],
        isDisabled: [false, true],
    },
    usecases: [
        {
            label: 'Label',
        },
        {
            label: 'Label',
            metadata: '3/9',
        },
    ],
}
</script>

<style lang="less" scoped>
@import (reference) './common';
@import './typography';

.chip {
    height: 20px;
    font-size: 12px;
    font-family: @semibold-text-font;
    border-radius: 3px;
    display: inline-flex;
    align-items: center;
    user-select: none;
    cursor: pointer;
    transition: all @default-transition-time;
    outline: none;
    padding: 0 5px;

    &--disabled {
        cursor: default;
    }
}

.chip__label {
    padding: 0 5px;
}

.chip__metadata {
    font-family: @regular-text-font;
    padding-right: 5px;
}

.chip__remove-btn {
    transition: all @default-transition-time;
    padding: 0 0 0 5px;
}

/* DARK THEME */
.chip--dark {
    color: @very-light-gray;

    .chip__remove-btn {
        color: @gunpowder;
    }

    &.chip--active {
        color: @very-light-gray;
        background-color: fade(@gunpowder, 60%);

        .chip__remove-btn {
            color: fade(@very-light-gray, 60%);
        }

        &:hover .chip__remove-btn:hover {
            color: @very-light-gray;
        }
    }

    &.chip--disabled {
        color: @gray-blue;
    }

    &:not(.chip--disabled) {
        &:hover, &:focus {
            color: @white;
            background-color: @gunpowder;

            .chip__remove-btn {
                color: fade(@very-light-gray, 60%);
            }
        }
    }
}

/* LIGHT THEME */
.chip--light {
    color: @gunpowder;

    .chip__remove-btn {
        color: fade(@gunpowder, 20%);
    }

    &.chip--active {
        color: @black;
        background-color: fade(@very-light-gray, 60%);

        .chip__remove-btn {
            color: fade(@gunpowder, 60%);
        }

        &:hover .chip__remove-btn:hover {
            color: @gunpowder;
        }
    }

    &.chip--disabled {
        color: @gray-blue;
    }

    &:not(.chip--disabled) {
        &:hover, &:focus {
            color: @black;
            background-color: @very-light-gray;

            .chip__remove-btn {
                color: fade(@gunpowder, 60%);
            }
        }
    }
}
</style>
