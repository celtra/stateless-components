<template>
    <div :class="[theme, size, cssModifiers] | prefix('default-list-item--')" class="default-list-item">
        <div :class="cssModifiers | prefix('default-list-item__label--')" class="default-list-item__label">
            <template v-if="highlightQuery">
                <span v-for="(part, index) in getParts(label)" :key="index" :style="part.bold ? { fontWeight: 'bold' } : {}">{{ part.text }}</span>
            </template>
            <template v-else>
                <middle-ellipsis :text="label"></middle-ellipsis>
            </template>
        </div>
        <div v-if="metadata" :class="cssModifiers | prefix('default-list-item__metadata--')" class="default-list-item__metadata">
            <template v-if="highlightQuery">
                <span v-for="(part, index) in getParts(metadata)" :key="index" :style="part.bold ? { fontWeight: 'bold' } : {}">{{ part.text }}</span>
            </template>
            <template v-else>
                <middle-ellipsis :text="metadata"></middle-ellipsis>
            </template>
            <icon v-if="icon" :name="icon" class="default-list-item__icon" />
        </div>
    </div>
</template>

<script>
import { getTextHighlightParts } from './string_utils.js'
import Icon from './icon.vue'
import MiddleEllipsis from './MiddleEllipsis.vue'

export default {
    components: {
        Icon,
        MiddleEllipsis,
    },
    props: {
        size: { type: String, required: false, default: 'normal' },
        theme: { type: String, required: false, default: 'dark' },
        label: { type: String, required: true },
        metadata: { type: String },
        icon: { type: String },
        selected: { type: Boolean },
        disabled: { type: Boolean },
        highlightQuery: { type: String },
    },
    computed: {
        cssModifiers () {
            return {
                selected: this.selected,
                disabled: this.disabled,
                'with-metadata': !!this.metadata,
            }
        },
    },
    methods: {
        getParts (label) {
            return getTextHighlightParts(label, this.highlightQuery)
        },
    },
}
</script>

<style lang="less">
@import (reference) './common';

.default-list-item {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;

    &--disabled {
        cursor: auto;

        .default-list-item__icon {
            color: @gray-blue;
        }
    }

    &__label {
        margin: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-family: @regular-text-font;
        color: @very-light-gray;
        display: inline-block;
        transition: color @default-transition-time ease-out;

        &--error { color: @pink-red; }
        &--with-metadata { padding-right: 5px; }
    }

    &__metadata {
        display: flex;
        align-items: center;
        margin: 0;
        white-space: nowrap;
        justify-content: flex-end;
        overflow: hidden;
        font-family: @regular-text-font;
        color: @gray-blue;
    }

    &__icon {
        margin-left: 10px;
        color: @gunpowder;
    }
}

.default-list-item--dark {
    .default-list-item {
        &__label {
            color: @very-light-gray;
            &--selected { color: @black; }
            &--disabled { color: @gunpowder; }
            &:hover {
                &:not(.default-list-item--disabled)&:not(.default-list-item--selected) {
                    .default-list-item__label { color: @white; }
                }
            }
        }
    }
}

.default-list-item--light {
    .default-list-item {
        &__label {
            color: @gunpowder;
            &--selected { color: @royal-blue; }
            &--disabled { color: @gray-blue; }
            &:hover {
                &:not(.default-list-item--disabled)&:not(.default-list-item--selected) {
                    .default-list-item__label { color: @black; }
                }
            }
        }
    }
}

.default-list-item--condensed {
    height: 20px;

    .default-list-item {
        &__label {
            font-size: 14px;
        }

        &__metadata {
            font-size: 11px;
            letter-spacing: 0.5px;
        }
    }
}

.default-list-item--normal {
    height: 30px;

    .default-list-item {
        &__label {
            font-size: 18px;
        }

        &__metadata {
            font-size: 12px;
        }
    }
}

.default-list-item--phat {
    height: 45px;

    .default-list-item {
        &__label {
            font-size: 22px;
        }

        &__metadata {
            font-size: 14px;
        }
    }
}
</style>
