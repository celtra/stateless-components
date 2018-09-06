<template>
    <div :class="['checkbox-element--' + size, 'checkbox-element--' + theme]" :title="actualTitleText" :data-id="actualTitleText | slugify" class="checkbox-element" tabindex="0" @click="toggle" @keyup.enter.stop="toggle" @keyup.space.prevent.stop="toggle" @focus="setFocus(true)" @blur="setFocus(false)" @keyup.esc.stop="blur">
        <div v-if="!isToggle" :class="states | prefix('checkbox-element__check-row--')" class="checkbox-element__check-row">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" class="checkbox-element__check-wrapper">
                <rect :class="states | prefix('checkbox-element__square--')" class="checkbox-element__square" transform-origin="center" x="7" y="7" width="18" height="18" stroke-width="1" fill="none" rx="2" ry="2" />
                <path :class="states | prefix('checkbox-element__check--')" class="checkbox-element__check" transform-origin="center" d="M 22.905 7 L 13.5 16.741 L 9.095 12.521 L 6 15.651 L 13.5 23 L 26 10.128 Z"/>
                <rect :class="states | prefix('checkbox-element__check-some--')" class="checkbox-element__check-some" transform-origin="center" x="9" y="14" width="14" height="4"/>
            </svg>

            <div :class="states | prefix('checkbox-element__label-text--')" class="checkbox-element__label-text">
                <slot></slot>
            </div>
        </div>
        <div v-else :class="states | prefix('checkbox-element__toggle--')" class="checkbox-element__toggle">
            <div :class="states | prefix('checkbox-element__toggle-wrapper--')" class="checkbox-element__toggle-wrapper">
                <div :class="states | prefix('checkbox-element__toggle-circle--')" class="checkbox-element__toggle-circle"></div>
            </div>

            <div :class="states | prefix('checkbox-element__label-text--')" class="checkbox-element__label-text">
                <slot></slot>
            </div>
        </div>
        <div v-if="infoText.length > 0" :class="states | prefix('checkbox-element__helper-text--')" class="checkbox-element__helper-text" @click.stop>
            {{ infoText }}
        </div>
    </div>
</template>

<script>
import Icon from './icon.vue'

export default {
    components: { Icon },
    props: {
        value: { type: Boolean, default: false },
        disabled: { type: Boolean, default: false },
        size: { type: String, required: false, default: 'normal' },
        isToggle: { type: Boolean, required: false, default: false },
        helperText: { type: String, required: false, default: '' },
        titleText: { type: String, required: false, default: '' },
        disabledText: { type: String, required: false, default: '' },
        warningText: { type: String, required: false, default: '' },
        errorText: { type: String, required: false, default: '' },
        theme: { type: String, required: false, default: 'dark' },
    },
    data () {
        return {
            focused: false,
        }
    },
    computed: {
        actualTitleText () {
            if (this.titleText.length > 0) {
                return this.titleText
            }

            if (this.disabled && this.disabledText.length > 0) {
                return this.disabledText
            }

            if (this.$slots.default && this.$slots.default.length === 1 && this.$slots.default[0].text) {
                return this.$slots.default[0].text.replace(/^\s+|\s+$/g, '')
            }

            return ''
        },
        infoText () {
            if (this.errorText) {
                return this.errorText
            } else if (this.warningText) {
                return this.warningText
            } else {
                return this.helperText ? this.helperText : ''
            }
        },
        states () {
            return {
                error: !!this.errorText,
                warning: !!this.warningText && !this.errorText,
                some: this.value === null,
                checked: this.value === true,
                disabled: this.disabled,
                focused: this.focused,
            }
        },
    },
    methods: {
        setFocus (isFocused) {
            this.focused = isFocused
            if (isFocused) {
                this.$emit('focus')
            }
        },
        blur () {
            this.$el.blur()
        },
        toggle (ev) {
            if (!this.disabled) {
                this.$emit('focus')
                this.$emit('input', !this.value)
                this.focused = false
            }
        },
    },
}
</script>

<style lang="less" scoped>
@import (reference) './common';

* {
    box-sizing: border-box
}

.checkbox-element {
    height: 26px + 12px;
    margin-top: 7px;
    font-family: @regular-text-font;
    cursor: pointer;

    .checkbox-element--focused, &:hover {
        .checkbox-element__square:not(.checkbox-element__square--disabled) {
            transform: scale3d(1.25, 1.25, 1);
            border-color: @very-light-gray;
        }

        .checkbox-element__check:not(.checkbox-element__check--disabled) {
            transform: scale3d(1.375, 1.375, 1);
        }

        .checkbox-element__check-some:not(.checkbox-element__check-some--disabled) {
            transform: scale3d(1.375, 1.375, 1);
        }

        .checkbox-element__label-text:not(.checkbox-element__label-text--disabled) {
            color: @white;
        }
    }

    .checkbox-element__check-row {
        width: 100%;
        height: 26px;
        display: flex;
        align-items: center;

        &--disabled {
            cursor: auto;
        }
    }

    .checkbox-element__check-wrapper {
        flex: none;
        width: 26px;
        height: 26px;
        margin-top: 2px;
    }

    .checkbox-element__square {
        stroke: @bluish-gray;
        transition: transform @default-transition-time ease-out, opacity @default-transition-time ease-out;
        opacity: 1;

        &--checked {
            transform: scale3d(0, 0, 1);
            opacity: 0;
        }

        &--disabled {
            border-color: @gunpowder;
        }
    }

    .checkbox-element__check {
        fill: @royal-blue;
        transition: transform @default-transition-time ease-out, opacity @default-transition-time ease-out;
        transform: scale3d(0, 0, 1);
        opacity: 0;

        &--checked {
            transform: scale3d(1, 1, 1);
            opacity: 1;
        }

        &--disabled {
            fill: @gunpowder;
        }
    }

    .checkbox-element__check-some {
        fill: @royal-blue;
        transition: transform @default-transition-time ease-out, opacity @default-transition-time ease-out;
        transform: scale3d(0, 0, 1);
        opacity: 0;

        &--some {
            transform: scale3d(1, 1, 1);
            opacity: 1;
        }

        &--disabled {
            fill: @gunpowder;
        }
    }

    .checkbox-element__label-text {
        width: 100%;
        color: @very-light-gray;
        padding: 0 15px 0 10px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 18px;
        font-family: @regular-text-font;
        transition: color @default-transition-time ease-out;
        display: flex;
        align-items: center;

        &--disabled {
            color: @gunpowder;
        }

        &--error {
            color: @pink-red;
        }
    }

    .checkbox-element__helper-text {
        height: 12px;
        padding-left: 37px;
        display: flex;
        align-items: flex-start;
        font-size: 11px;
        letter-spacing: 0.5px;
        color: @dolphin;
        cursor: default;

        &--warning {
            color: @pale-yellow;
        }

        &--disabled {
            color: @gunpowder;
        }

        &--error {
            color: @pink-red;
        }
    }

    &:focus {
        outline: none;
    }

    .checkbox-element__toggle {
        height: 26px;
        display: flex;
        align-items: center;
        cursor: pointer;

        &--focused, &:hover {
            .checkbox-element__toggle-circle {
                background-color: white;
            }
        }

        &--disabled {
            cursor: auto;
            opacity: 0.4;
        }
    }

    .checkbox-element__toggle-wrapper {
        height: 15px;
        width: 25px;
        min-width: 25px;
        border-radius: 8px;
        background-color: @very-light-gray;
        transition: all @default-transition-time ease-out;

        &--checked {
            background-color: @light-green;
        }
    }

    .checkbox-element__toggle-circle {
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: @extremely-light-gray;
        transition: all @default-transition-time ease-out;

        &--checked {
            margin-left: 10px;
        }
    }
}

.checkbox-element--phat {
    height: 34px + 17px;
    margin-top: 9px;

    .checkbox-element--focused, &:hover {
        .checkbox-element__square:not(.checkbox-element__square--disabled) {
            transform: scale3d(1.2, 1.2, 1);
        }
    }

    .checkbox-element__check-row {
        height: 34px;
    }

    .checkbox-element__check-wrapper {
        width: 30px;
        height: 30px;
    }

    .checkbox-element__label-text {
        padding: 0 15px 0 9px;
        font-size: 22px;
    }

    .checkbox-element__helper-text {
        height: 17px;
        padding-left: 39px;
        align-items: center;
        font-size: 12px;
    }

    .checkbox-element__toggle {
        height: 34px;
    }

    .checkbox-element__toggle-wrapper {
        width: 30px;
        min-width: 30px;
        height: 18px;
        border-radius: 9px;
    }

    .checkbox-element__toggle-circle {
        width: 18px;
        height: 18px;

        &--checked {
            margin-left: 12px;
        }
    }
}

.checkbox-element--condensed {
    height: 20px;
    margin-top: 10px;

    .checkbox-element--focused, &:hover {
        .checkbox-element__square:not(.checkbox-element__square--disabled) {
            transform: scale3d(1.286, 1.286, 1);
        }

        .checkbox-element__check:not(.checkbox-element__check--disabled) {
            transform: scale3d(1.25, 1.25, 1);
        }

        .checkbox-element__check-some:not(.checkbox-element__check-some--disabled) {
            transform: scale3d(1.25, 1.25, 1);
        }
    }

    .checkbox-element__check-row {
        height: 20px;
    }

    .checkbox-element__check-wrapper {
        width: 24px;
        height: 24px;
        margin-top: 0;
    }

    .checkbox-element__label-text {
        padding: 0 10px 0 5px;
        font-size: 14px;
    }

    .checkbox-element__helper-text {
        height: 15px;
        padding-left: 29px;
        align-items: flex-end;
        font-size: 10px;
        letter-spacing: 0.5px;
    }

    .checkbox-element__toggle {
        height: 20px;
    }

    .checkbox-element__toggle-wrapper {
        width: 20px;
        min-width: 20px;
        height: 12px;
        border-radius: 6px;
    }

    .checkbox-element__toggle-circle {
        width: 12px;
        height: 12px;

        &--checked {
            margin-left: 8px;
        }
    }
}

.checkbox-element--light {
    .checkbox-element__label-text {
        color: @gunpowder;

        &--disabled {
          color: @very-light-gray;
        }
    }

    .checkbox-element__square--disabled {
        border-color: @very-light-gray;
    }

    .checkbox-element--focused, &:hover {
        .checkbox-element__square:not(.checkbox-element__square--disabled) {
            border-color: @gunpowder;
        }

        .checkbox-element__label-text:not(.checkbox-element__label-text--disabled) {
            color: black;
        }
    }
}

.checkbox-element--white {
    .checkbox-element__check {
        fill: @white;
    }

    .checkbox-element__label-text {
        color: @gunpowder;
    }

    .checkbox-element--focused, &:hover {
        .checkbox-element__square:not(.checkbox-element__square--disabled) {
            border-color: @gunpowder;
        }

        .checkbox-element__label-text:not(.checkbox-element__label-text--disabled) {
            color: @gunpowder;
        }
    }
}
</style>
