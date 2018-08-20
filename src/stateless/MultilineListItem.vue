<template>
    <div :class="[theme, size, cssModifiers] | prefix('multiline-list-item--')" class="multiline-list-item">
        <div class="multiline-list-item__content">
            <p :class="cssModifiers | prefix('multiline-list-item__label--')" class="multiline-list-item__label">
                <template v-if="highlightQuery">
                    <span v-for="(part, index) in getParts(label)" :key="index" :style="part.bold ? { fontWeight: 'bold' } : {}">{{ part.text }}</span>
                </template>
                <template v-else>
                    {{ label }}
                </template>
            </p>
            <p v-if="metadata" :class="cssModifiers | prefix('multiline-list-item__metadata--')" class="multiline-list-item__metadata">
                <template v-if="highlightQuery">
                    <span v-for="(part, index) in getParts(metadata)" :key="index" :style="part.bold ? { fontWeight: 'bold' } : {}">{{ part.text }}</span>
                </template>
                <template v-else>
                    {{ metadata }}
                </template>
            </p>
        </div>

        <div class="multiline-list-item__slot">
            <slot name="right"></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        size: { type: String, required: false, default: 'normal' },
        theme: { type: String, required: false, default: 'dark' },
        label: { type: String, required: true },
        metadata: { type: String },
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
            let index = this.highlightQuery && this.highlightQuery.length > 0 ? label.toLowerCase().indexOf(this.highlightQuery.toLowerCase()) : -1
            if (index === -1) {
                return [
                    { text: label, bold: false },
                ]
            }
            let beforeIndex = label.substring(0, index)
            let atIndex = label.substring(index, index + this.highlightQuery.length)
            let afterIndex = label.substring(index + this.highlightQuery.length)

            let parts = []
            if (beforeIndex.length > 0) {
                parts.push({
                    text: beforeIndex,
                    bold: false,
                })
            }

            parts.push({
                text: atIndex,
                bold: true,
            })

            if (afterIndex.length > 0) {
                parts.push({
                    text: afterIndex,
                    bold: false,
                })
            }

            return parts
        },
    },
}
</script>

<style lang="less" scoped>
@import (reference) './variables';

.multiline-list-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;

    &--disabled {
        cursor: auto;
    }

    &__content {
        display: flex;
        align-items: center;
    }

    &__label {
        margin: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-family: @regular-text-font;
        color: @very-light-gray;
        display: inline-block;

        &--error { color: @pink-red; }
        &--disabled { color: @gray-blue; }
        &--with-metadata { padding-right: 5px; }
    }

    &__metadata {
        display: flex;
        align-items: center;
        margin: 0;
        white-space: nowrap;
        text-align: right;
        overflow: hidden;
        font-family: @regular-text-font;
        color: @gray-blue;
    }

    &__icon {
        margin-left: 10px;
    }

    &__hidden-widths {
        visibility: hidden;
        position: absolute;
    }
}

.multiline-list-item--dark {
    .multiline-list-item {
        &__label {
            color: @very-light-gray;
            &--selected { color: @black; }
            &:hover {
                &:not(.multiline-list-item--disabled)&:not(.multiline-list-item--selected) {
                    .multiline-list-item__label { color: @white; }
                }
            }
        }
    }
}

.multiline-list-item--light {
    .multiline-list-item {
        &__label {
            color: @gunpowder;
            &--selected { color: @royal-blue; }
            &:hover {
                &:not(.multiline-list-item--disabled)&:not(.multiline-list-item--selected) {
                    .multiline-list-item__label { color: @black; }
                }
            }
        }
    }
}

.multiline-list-item--condensed {
    height: 20px;

    .multiline-list-item {
        &__label {
            font-size: 14px;
        }

        &__metadata {
            font-size: 11px;
            letter-spacing: 0.5px;
        }
    }
}

.multiline-list-item--normal {
    .multiline-list-item {
        &__label {
            font-size: 18px;
        }

        &__metadata {
            font-size: 12px;
        }
    }
}

.multiline-list-item--phat {
    height: 45px;

    .multiline-list-item {
        &__label {
            font-size: 22px;
        }

        &__metadata {
            font-size: 14px;
        }
    }
}
</style>
