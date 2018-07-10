<template>
    <div :class="[theme, size, { active: isActive }] | prefix('chip--')" class="chip" @click="$emit('click')">
        <div class="chip__label">{{ label }}</div>
        <div v-if="metadata" class="chip__metadata">{{ metadata }}</div>
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
        isActive: { type: Boolean, default: false },
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
    padding-right: 5px;
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
    }

    &.chip--active {
        color: @very-light-gray;
        background-color: fade(@very-light-gray, 40%);

        .chip__remove-btn {
            color: fade(@very-light-gray, 40%);
        }

        &:hover .chip__remove-btn:hover {
            color: @very-light-gray;
        }
    }

    &:hover {
        color: @white;
        background-color: @gunpowder;

        &.chip--active {
            color: @white;
        }

        .chip__remove-btn {
            color: fade(@very-light-gray, 40%);
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
        background-color: fade(@very-light-gray, 40%);

        .chip__remove-btn {
            color: fade(@gunpowder, 60%);
        }

        &:hover .chip__remove-btn {
            color: fade(@gunpowder, 40%);

            &:hover {
                color: @gunpowder;
            }
        }
    }

    &:hover {
        color: @black;
        background-color: @very-light-gray;

        &.chip--active {
            color: @black;
            background-color: @very-light-gray;
        }

        .chip__remove-btn {
            color: fade(@gunpowder, 60%);
        }
    }
}
</style>
