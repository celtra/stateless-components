<template>
    <div :class="['checkbox-element--' + size, 'checkbox-element--' + theme]" :title="actualTitleText" :data-id="actualTitleText | slugify" class="checkbox-element" tabindex="0" @keyup.enter.stop="toggle" @keyup.space.prevent.stop="toggle" @focus="setFocus(true)" @blur="setFocus(false)" @keyup.esc.stop="blur">
        <div v-if="!isToggle" :class="states | prefix('checkbox-element__check-row--')" :title="actualTitleText" class="checkbox-element__check-row" @click="toggle">
            <div :class="states | prefix('checkbox-element__check-wrapper--')" class="checkbox-element__check-wrapper">
                <div :class="states | prefix('checkbox-element__square--')" class="checkbox-element__square"></div>
                <div :class="states | prefix('checkbox-element__check--')" class="checkbox-element__check"></div>
            </div>

            <div :class="states | prefix('checkbox-element__label-text--')" class="checkbox-element__label-text">
                <slot></slot>
            </div>
        </div>
        <div v-else :class="states | prefix('checkbox-element__toggle--')" :title="actualTitleText" class="checkbox-element__toggle" @click="toggle">
            <div :class="states | prefix('checkbox-element__toggle-wrapper--')" class="checkbox-element__toggle-wrapper">
                <div :class="states | prefix('checkbox-element__toggle-circle--')" class="checkbox-element__toggle-circle"></div>
            </div>

            <div :class="states | prefix('checkbox-element__label-text--')" class="checkbox-element__label-text">
                <slot></slot>
            </div>
        </div>
        <div v-if="infoText.length > 0" :class="states | prefix('checkbox-element__helper-text--')" class="checkbox-element__helper-text">
            {{ infoText }}
        </div>
    </div>
</template>

<script>
export default {
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
                this.$emit('input', !this.value, ev)
                this.focused = false
            }
        },
    },
}
</script>

<style lang="less" scoped>
@import (reference) './variables';

* {
    box-sizing: border-box
}

.checkbox-element {
    height: 26px + 12px;
    margin-top: 7px;
    font-family: @regular-text-font;

    .checkbox-element__check-row {
        height: 26px;
        display: flex;
        align-items: center;
        cursor: pointer;

        .checkbox-element__check {
            transform: scale3d(1, 1, 1);
        }

        &--focused, &:hover {
            .checkbox-element__square:not(.checkbox-element__square--disabled) {
                transform: scale3d(1.25, 1.25, 1);
                border-color: @very-light-gray;
            }

            .checkbox-element__check:not(.checkbox-element__check--disabled) {
                transform: scale3d(1.375, 1.375, 1);
            }

            .checkbox-element__label-text:not(.checkbox-element__label-text--disabled) {
                color: @white;
            }
        }

        &--disabled {
            cursor: auto;
        }
    }

    .checkbox-element__check-wrapper {
        position: relative;
        width: 26px;
        height: 26px;
        display: flex;
        flex: none;
        align-items: center;
        justify-content: center;
    }

    .checkbox-element__square {
        width: 16px;
        height: 16px;
        border-width: 1px;
        border-style: solid;
        border-radius: 2px;
        border-color: @bluish-gray;
        transition: all @form-element-transition-time ease-out;
        transform: scale3d(1, 1, 1);
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
        position: absolute;
        left: 0;
        width: 100%;
        height: 100%;
        padding-top: 3px;
        display: flex;
        justify-content: center;
        transition: all @form-element-transition-time ease-out;
        opacity: 0;
        transform: scale3d(0, 0, 1);

        &--checked {
            &:after {
                content: '';
                width: 5px;
                height: 11px;
                display: block;
                border: solid @royal-blue;
                border-width: 0 3.5px 3.5px 0;
                transform: rotate(45deg);
            }

            transform: scale3d(1, 1, 1);
            opacity: 1;
        }

        &--some {
            &:after {
                content: '';
                width: 10px;
                height: 11px;
                display: block;
                border-bottom: 2px solid @royal-blue;
            }

            transform: scale3d(1, 1, 1);
            opacity: 1;
        }

        &--disabled:after {
            border-color: @gunpowder;
        }
    }

    .checkbox-element__label-text {
        width: 100%;
        color: @very-light-gray;
        padding: 0 15px 0 11px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 18px;
        font-family: @regular-text-font;
        transition: color @form-element-transition-time ease-out;

        &--disabled {
            color: @gunpowder;
        }

        &--error {
            color: @pink-red;
        }
    }

    .checkbox-element__helper-text {
        height: 12px;
        padding-left: 35px;
        display: flex;
        align-items: flex-start;
        font-size: 11px;
        letter-spacing: 0.5px;
        color: @dolphin;

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
        opacity: 0.8;

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
        transition: all @form-element-transition-time ease-out;

        &--checked {
            background-color: @light-green;
        }
    }

    .checkbox-element__toggle-circle {
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: @extremely-light-gray;
        transition: all @form-element-transition-time ease-out;

        &--checked {
            margin-left: 10px;
        }
    }
}

.checkbox-element--phat {
    height: 34px + 17px;
    margin-top: 9px;

    .checkbox-element__check-row {
        height: 34px;

        &--focused, &:hover {
            .checkbox-element__square:not(.checkbox-element__square--disabled) {
                transform: scale3d(1.2, 1.2, 1);
            }
        }
    }

    .checkbox-element__check-wrapper {
        width: 30px;
        height: 30px;
    }

    .checkbox-element__square {
        width: 18px;
        height: 18px;
    }

    .checkbox-element__check:after {
        width: 6px;
        height: 14px;
        border-width: 0 4.5px 5px 0;
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

    .checkbox-element__check-row {
        height: 20px;

        &--focused, &:hover {
            .checkbox-element__square:not(.checkbox-element__square--disabled) {
                transform: scale3d(1.286, 1.286, 1);
            }

            .checkbox-element__check:not(.checkbox-element__check--disabled) {
                transform: scale3d(1.25, 1.25, 1);
            }
        }
    }

    .checkbox-element__check-wrapper {
        width: 24px;
        height: 24px;
    }

    .checkbox-element__square {
        width: 14px;
        height: 14px;
    }

    .checkbox-element__check {
        padding-top: 0;
    }

    .checkbox-element__label-text {
        padding: 0 10px 0 7px;
        font-size: 14px;
    }

    .checkbox-element__helper-text {
        height: 15px;
        padding-left: 27px;
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

    .checkbox-element__check-row {
        &--focused, &:hover {
            .checkbox-element__square:not(.checkbox-element__square--disabled) {
                border-color: @gunpowder;
            }

            .checkbox-element__label-text:not(.checkbox-element__label-text--disabled) {
                color: @gunpowder;
            }
        }
    }
}

.checkbox-element--white {
    .checkbox-element__check:after {
        border: solid white;
        border-width: 0 3.5px 3.5px 0;
    }

    .checkbox-element__label-text {
        color: @gunpowder;
    }

    .checkbox-element__check-row {
        &--focused, &:hover {
            .checkbox-element__square:not(.checkbox-element__square--disabled) {
              border-color: @gunpowder;
            }

            .checkbox-element__label-text:not(.checkbox-element__label-text--disabled) {
              color: @gunpowder;
            }
        }
    }
}
</style>
