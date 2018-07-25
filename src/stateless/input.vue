<template>
    <div :class="['input--' + size, 'input--' + theme]" :id="label | slugify" class="input">
        <div v-if="icon" class="input__icon-prepend">
            <img :src="icon" class="input__icon"/>
        </div>

        <div ref="inputWrap" :class="{ 'input-field--with-icon': !!icon }" :title="mappedDisabledText" class="input-field">
            <div v-if="!disabled" ref="labelOverlay" :class="cssStates | prefix('input-field__overlay--')" class="input-field__overlay">
                {{ label }}
            </div>
            <div :class="cssStates | prefix('input-field__label-text--')" class="input-field__label-text">
                {{ mappedLabelText }}
            </div>

            <div :class="cssStates | prefix('input-row--')" class="input-row">
                <div v-if="hasLeftUnit" :class="cssStates | prefix('input-row__unit--')" class="input-row__unit input-row__unit--left">
                    {{ unit.label }}
                </div>

                <div class="input-row__input-flex">
                    <textarea v-if="autogrow" ref="inputHiddenOneLine"
                              class="input-row__placeholder-text input-row__textarea"
                              style="height: 0px; position: absolute; visibility: hidden;">
                    </textarea>
                    <textarea v-if="autogrow" ref="inputHidden"
                              :value="maxLengthNumber === null ? text : text.substring(0, maxLengthNumber)"
                              class="input-row__placeholder-text input-row__textarea"
                              style="height: 0px; position: absolute; visibility: hidden;">
                    </textarea>

                    <textarea v-if="autogrow" ref="input" :class="textareaClasses" :value="text"
                              :placeholder="mappedPlaceholderText" :disabled="disabled" class="input-row__placeholder-text input-row__textarea" @keyup.delete.stop @keyup.left.stop @keyup.right.stop
                              @keyup.esc.stop="blur" @keyup="$emit('keyup', $event)" @paste="$emit('paste', $event)" @input="onInput" @focus="setFocus" @blur="removeFocus"></textarea>
                    <input v-else-if="inputType === 'password'" ref="input" :class="cssStates | prefix('input-row__placeholder-text--')"
                           :value="text" :placeholder="mappedPlaceholderText"
                           :disabled="disabled" class="input-row__placeholder-text" type="password" @keyup.delete.stop @keyup.left.stop @keyup.right.stop
                           @keyup.esc.stop="blur" @keyup="$emit('keyup', $event)" @paste="$emit('paste', $event)" @input="onInput" @focus="setFocus" @blur="removeFocus"/>
                    <input v-else ref="input" :class="cssStates | prefix('input-row__placeholder-text--')"
                           :value="text" :placeholder="mappedPlaceholderText" :disabled="disabled" class="input-row__placeholder-text" type="text" @keyup.delete.stop
                           @keyup.left.stop @keyup.right.stop @keyup.esc.stop="blur" @keyup="$emit('keyup', $event)" @paste="$emit('paste', $event)" @input="onInput" @focus="setFocus" @blur="removeFocus"/>
                </div>

                <div v-if="hasRightUnit" :class="cssStates | prefix('input-row__unit--')" class="input-row__unit input-row__unit--right">
                    {{ unit.label }}
                </div>

                <div v-if="type==='password'" :class="cssStates | prefix('input-row__unit--')" class="input-row__unit input-row__unit--right"
                     @click="togglePasswordVisibility">
                    <svg v-show="passwordVisible" xmlns="http://www.w3.org/2000/svg" class="input-row__unit__password-icon">
                        <symbol viewBox="0 0 16 16">
                            <g fill-rule="nonzero" ><path d="M14.6 5.6l-8.2 8.2c.5.1 1.1.2 1.6.2 3.6 0 6.4-3.1 7.6-4.9.5-.7.5-1.6 0-2.3-.2-.3-.6-.7-1-1.2zM14.3.3L11.6 3C10.5 2.4 9.3 2 8 2 4.4 2 1.6 5.1.4 6.9c-.5.7-.5 1.6 0 2.2.5.8 1.4 1.8 2.4 2.7L.3 14.3c-.4.4-.4 1 0 1.4.2.2.4.3.7.3.3 0 .5-.1.7-.3l14-14c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0zm-9 9C5.1 8.9 5 8.5 5 8c0-1.7 1.3-3 3-3 .5 0 .9.1 1.3.3l-4 4z"/></g>
                        </symbol>
                    </svg>
                    <svg v-show="!passwordVisible" xmlns="http://www.w3.org/2000/svg" class="input-row__unit__password-icon">
                        <symbol viewBox="0 0 16 12">
                            <path d="M7.975 12c3.6 0 6.4-3.1 7.6-4.9.5-.7.5-1.6 0-2.3-1.2-1.7-4-4.8-7.6-4.8-3.6 0-6.4 3.1-7.6 4.9-.5.7-.5 1.6 0 2.2 1.2 1.8 4 4.9 7.6 4.9zm0-9c1.7 0 3 1.3 3 3s-1.3 3-3 3-3-1.3-3-3 1.3-3 3-3z" fill-rule="nonzero" />
                        </symbol>
                    </svg>
                </div>
            </div>

            <div :class="cssStates | prefix('input-field__border-overlay--')" class="input-field__border-overlay"></div>

            <div class="input-field__message-wrap">
                <div :class="cssStates | prefix('input-field__helper-text--')" class="input-field__helper-text">
                    <template v-if="maxLengthNumber > 0 && currentLength > maxLengthNumber">
                        <span class="input-row__unit--warning">{{ mappedHelperText }}</span>
                    </template>
                    <template v-else>
                        {{ mappedHelperText }}
                    </template>
                </div>

                <div v-if="maxLengthNumber > 0" :class="cssStates | prefix('input-row__unit--')" class="input-row__unit input-row__unit--right input-row__unit input-row__unit--max-length">
                    <template v-if="currentLength > maxLengthNumber">
                        <span class="input-row__unit--warning">{{ currentLength }}</span>/{{ maxLengthNumber }}
                    </template>
                    <template v-else>
                        {{ currentLength }}/{{ maxLengthNumber }}
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { formElementTransitionTime } from './form_element_constants'

export default {
    props: {
        value: { type: [String, Number], default: '' },
        label: { type: String, required: true },
        disabled: { type: Boolean, required: false, default: false },
        hasWarning: { type: Function, required: false },
        isValid: { type: Function, required: false },
        getCount: { type: Function, required: false },
        error: { type: String, required: false },
        placeholder: { type: String, required: false, default: '' },
        icon: { type: String, required: false, default: '' },
        unit: { type: Object, required: false },
        helperText: { type: String, required: false, default: '' },
        disabledText: { type: String, required: false, default: '' },
        type: { type: String, required: false, default: 'text' },
        size: { type: String, required: false, default: 'normal' },
        theme: { type: String, required: false, default: 'dark' },
        recommendedMaxLength: { type: Number, required: false },
        maxLength: { type: Number, required: false },
        autogrow: { type: Boolean, default: false },
        maxHeight: { type: Number, default: 200 },
    },
    data () {
        return {
            warningMessage: null,
            errorMessage: null,
            focused: false,
            text: '',
            passwordVisible: false,
            textareaOverflow: false,
            overlay: {
                open: false,
                close: false,
            },
        }
    },
    computed: {
        states () {
            let isError = this.errorMessage !== null && this.errorMessage !== true
            let isWarning = this.warningMessage !== null && this.warningMessage !== true

            return {
                focused: this.focused,
                error: isError,
                warning: isWarning,
                valid: (this.errorMessage === true && !isWarning || this.warningMessage === true && !isError) && this.text.length > 0,
                disabled: this.disabled,
            }
        },
        cssStates () {
            return {
                ...this.states,
                'overlay-open': this.overlay.open,
                'overlay-close': this.overlay.close,
                'autogrow': this.autogrow,
            }
        },
        inputType () {
            return this.type === 'password' && !this.passwordVisible ? 'password' : 'text'
        },
        mappedLabelText () {
            return (this.states.focused || this.text) ? this.label : ''
        },
        mappedPlaceholderText () {
            if (this.states.focused) {
                return this.placeholder
            } else {
                return this.text ? this.text : this.label
            }
        },
        mappedHelperText () {
            if (this.states.disabled)
                return ''
            if (this.states.error) {
                return this.errorMessage
            } else if (this.states.warning) {
                return this.warningMessage
            } else {
                return this.helperText ? this.helperText : ''
            }
        },
        mappedDisabledText () {
            return this.states.disabled ? this.disabledText : ''
        },
        hasLeftUnit () {
            return !!this.unit && this.unit.position === 'left'
        },
        hasRightUnit () {
            return !!this.unit && this.unit.position === 'right'
        },
        maxLengthNumber () {
            return this.recommendedMaxLength || this.maxLength ? parseInt(this.recommendedMaxLength || this.maxLength, 10) : null
        },
        maxLengthCap () {
            return this.maxLength ? parseInt(this.maxLength, 10) : null
        },
        currentLength () {
            if (!this.text) {
                return 0
            }
            return this.getCount ? this.getCount(this.text) : this.text.length
        },
        textareaClasses (){
            // Apparently you can't use a filter within array class binding in template
            return [this.$options.filters.prefix(this.cssStates, 'input-row__placeholder-text--'), { 'input-row__textarea--overflow': this.textareaOverflow }]
        },
    },
    watch: {
        value (v) {
            if (this.disabled) {
                this.text = this.value && this.value.toString() || ''
            }
        },
        disabled (v) {
            if (v) {
                this.overlay.open = false
            }
        },
        error (v) {
            this.errorMessage = v === null ? true : v
        },
    },
    created () {
        this.text = this.value && this.value.toString() || ''
    },
    mounted () {
        this.$nextTick(() => {
            if (this.autogrow) {
                this.textareaLineHeight = this.$refs.inputHiddenOneLine.scrollHeight
            }
            this.updateHeight()
            window.addEventListener('resize', this.positionOverlay)
            this.positionOverlay()
        })
    },
    beforeDestroy () {
        window.removeEventListener('resize', this.positionOverlay)
    },
    methods: {
        runValidations (value) {
            let self = this
            let onError = (e) => self.errorMessage = e
            let onWarning = (w) => self.warningMessage = w

            if (this.isValid)
                this.errorMessage = this.isValid(value, onError)

            if (this.errorMessage && this.errorMessage !== true) {
                return false
            } else {
                if (this.hasWarning)
                    this.warningMessage = this.hasWarning(value, onWarning)

                if (this.warningMessage && this.warningMessage !== true) {
                    return false
                }
            }

            return true
        },
        onInput (event) {
            let value = event.target.value

            if (this.autogrow) {
                value = value.replace(/\n{2,}/g, '\n')
            } else {
                value = value.replace(/\n/g, '')
            }

            if (this.maxLengthCap > 0) {
                if (this.getCount) {
                    while (this.getCount(value) > this.maxLengthCap) {
                        value = value.substring(0, value.length - 1)
                    }
                } else {
                    value = value.substring(0, this.maxLengthCap)
                }
            }

            if (this.type === 'number') {
                let isNumeric = value.split('').map((c) => c >= '0' && c <= '9').every(v => !!v)

                if (isNumeric) {
                    this.text = value

                    let numberValue = parseInt(value)
                    if (!isNaN(numberValue)) {
                        this.runValidations(numberValue)

                        this.$emit('input', numberValue)
                    } else {
                        this.$emit('input', null)
                    }
                }
            } else {
                this.text = value

                this.runValidations(value)

                this.$emit('input', value || null)
            }

            if (this.$refs.input && this.$refs.input.value !== this.text) {
                this.$refs.input.value = this.text
            }

            this.$nextTick(() => {
                this.updateHeight()
            })
        },
        updateHeight () {
            if (this.autogrow) {
                let newValue = `${Math.min(this.maxHeight, this.$refs.inputHidden.scrollHeight)}px`
                if (newValue !== this.$refs.input.style.height) {
                    this.$refs.input.style.height = newValue
                }
                this.textareaOverflow = this.currentLength > this.maxLengthNumber && newValue === `${this.textareaLineHeight}px`
            }
        },
        positionOverlay () {
            if (this.hasLeftUnit) {
                this.$refs.labelOverlay.style['margin-left'] = `${this.$refs.input.getBoundingClientRect().left - this.$refs.inputWrap.getBoundingClientRect().left}px`
            }
        },
        setFocus () {
            this.focused = true
            this.$root.$emit('tracking-event', { type: 'input', label: this.$attrs.trackName || this.label, trigger: 'focus' })
            this.$emit('focus')

            if (this.text === '' || !this.text ) {
                let translateX = this.$refs.inputWrap.getBoundingClientRect().left - this.$refs.input.getBoundingClientRect().left
                let translateY = -18.5
                let scale = 0.63

                if (this.size === 'condensed') {
                    translateY = -13.5
                    scale = 0.73
                } else if (this.size === 'phat') {
                    translateY = -27
                    scale = 0.65
                }

                this.$refs.labelOverlay.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) scale3d(${scale}, ${scale}, 1)`

                this.overlay.open = true
            }
        },
        blur () {
            this.$refs.input.blur()
        },
        removeFocus () {
            this.focused = false

            if (this.text === '') {
                this.$refs.labelOverlay.style.transform = ''

                this.overlay.open = false
                this.overlay.close = true
                setTimeout(() => {
                    this.overlay.close = false
                }, formElementTransitionTime * 1000)
            }
        },
        togglePasswordVisibility () {
            this.passwordVisible = !this.passwordVisible
        },
    },
}
</script>

<style lang="less" scoped>
@import (reference) './variables';

* { box-sizing: border-box }

.input {
    width: 100%;
    display: flex;
    justify-content: flex-end;

    &__icon-prepend {
        margin-right: 15px;
        vertical-align: top;
        margin-top: 18px;
        width: 16px;
        text-align: right;
    }

    &__icon {
        height: 16px;
        width: 16px;
    }
}

.input-field {
    position: relative;
    width: 100%;
    font-family: @regular-text-font;
}

.input-field__overlay {
    position: absolute;
    width: 100%;
    height: calc(~'13px + 30px');
    padding-top: 16px;
    transform-origin: left center;
    font-size: 18px;
    font-family: @regular-text-font;
    white-space: nowrap;
    color: @white;
    overflow: hidden;
    text-overflow: ellipsis;
    visibility: hidden;
    z-index: -1;
    user-select: none;
    transition: transform @form-element-transition-time ease-out,
                color @form-element-transition-time ease-out,
                letter-spacing @form-element-transition-time ease-out;

    &--overlay-open {
        color: @royal-blue;
        letter-spacing: 0.5px;
        animation: overlay-fade-open @form-element-transition-time ease-out;

        @keyframes overlay-fade-open {
            from {
                visibility: hidden;
                z-index: 1;
            }
            to {
                visibility: visible;
                z-index: 1;
            }
        }
    }

    &--overlay-close {
        visibility: visible;
        z-index: 1;
        color: @gunpowder;
        letter-spacing: normal;
    }

}

.input-field__label-text {
    height: 13px;
    color: @dolphin;
    display: flex;
    align-items: center;
    font-size: 11px;
    letter-spacing: 0.5px;

    &--overlay-open {
        // animation duration must be greater than 0, otherwise safari ignores delay
        animation: label-fade 0.1ms ease-out @form-element-transition-time;
        animation-fill-mode: both;

        @keyframes label-fade {
            from { visibility: hidden; }
            to { visibility: visible; }
        }
    }

    &--focused { color: @royal-blue; }

}

.input-row {
    display: flex;
    align-items: center;
    border-width: 0 0 2px 0;
    border-style: solid;
    border-color: @gunpowder;
    transition: border-color @form-element-transition-time ease-out;

    &__input-flex {
        /* Need an extra div container, setting flex on <input> doesn't work */
        flex: auto;
    }

    &__textarea {
        resize: none;
        overflow-x: hidden;
        transition: height 0.2s ease-out;

        &--overflow {
            white-space: pre;
            overflow-wrap: normal;
        }
    }

    &__textarea::-webkit-scrollbar {
        display: none;
    }

    &__placeholder-text {
        width: 100%;
        padding: 0;
        font-size: 18px;
        font-family: @regular-text-font;
        background-color: transparent;
        border: 0;
        outline: none;
        color: white;
        margin: 4px 0px;

        &.input-row__textarea {
            // we get 2 extra px because some weird textarea styling
            margin: 4px 0 2px 0;
        }

        &::placeholder {
            white-space: nowrap;
            color: @very-light-gray;
            overflow: hidden;
            text-overflow: ellipsis !important;
        }

        &--overlay-open {
            animation: text-fade-open (@form-element-transition-time / 2) ease-out (@form-element-transition-time / 2);
            animation-fill-mode: backwards;

            @keyframes text-fade-open {
                from { opacity: 0; }
                to { opacity: 1; }
            }
        }

        &--overlay-close {
            animation: text-fade-close @form-element-transition-time ease-out;
            animation-fill-mode: backwards;

            @keyframes text-fade-close {
                from { opacity: 0; }
                99% { opacity: 0; }
                to { opacity: 1; }
            }
        }

        &--error { color: @pink-red; }

        &--focused { color: @white }
        &--focused::placeholder { color: @gunpowder }

        &--disabled { color: @gunpowder }
        &--disabled::placeholder { color: @gunpowder }
    }

    &--focused { border-color: @royal-blue; }

    &--disabled {
        border-style: dashed;
        border-color: @gunpowder;
    }

    &:hover:not(&--valid):not(&--error):not(&--focused):not(&--disabled) { border-color: @bluish-gray; }

    &--warning {
        border-style: solid;
        border-color: @pale-yellow;
    }

    &:hover:not(&--focused):not(&--disabled) {
        border-color: @gray-blue;
        .input-row__placeholder-text::placeholder { color: @white; }
    }
}

.input-row__unit {
    flex: none;
    font-size: 18px;
    color: @dolphin;

    &__password-icon {
        width: 16px;
        height: 16px;
        fill: @very-light-gray;
    }

    &--left { margin-right: 5px; }

    &--right { margin-left: 5px; }

    &--max-length {
        font-size: 11px !important;
        letter-spacing: 0.5px;
    }

    &--disabled {
        color: @gunpowder;
    }

    &--warning {
        color: @pale-yellow;
    }
}

.input-field__border-overlay {
    position: relative;
    top: -2px;
    margin-bottom: 1px;
    width: 0;
    height: 2px;
    transition: width 250ms ease-out;

    &--valid {
        width: 100%;
        background-color: @light-green;
    }

    &--warning {
        width: 100%;
        background-color: @orange-yellow;
    }

    &--error {
        width: 100%;
        background-color: @pink-red;
    }

    &--disabled {
        opacity: 0;
        width: 100%;
        background-color: @gunpowder;
    }
}

.input-field__message-wrap {
    display: flex;
}

.input-field__helper-text {
    color: @dolphin;
    min-height: 17px;
    flex: 1 0 0;
    font-size: 11px;
    letter-spacing: 0.5px;

    &--warning { color: @pale-yellow; }

    &--disabled { color: @gunpowder; }

    &--error { color: @pink-red; }

}

.input--light.input--light {
    .input-row {
        border-color: @very-light-gray;

        &__placeholder-text {
            color: @black;
            &::placeholder {
                color: @gunpowder;
            }
        }

        &:hover {
            .input-row__placeholder-text::placeholder { color: @black; }
        }

        &--focused { border-color: @royal-blue; }
    }

    .input-field__label-text {
        color: @bluish-gray;
    }

    .input-field__helper-text {
        color: @bluish-gray;

        &--error { color: @pink-red; }

        &--warning { color: @orange-yellow; }
    }
    .input-row__unit {
        color: @bluish-gray;

        &--warning {
            color: @orange-yellow;
        }
    }
}

.input--phat {
    .input__icon-prepend { margin-top: 34px; }

    .input-field__overlay {
        height: calc(~'13px + 45px');
        padding-top: 29px;
        font-size: 22px;
    }

    .input-field__label-text {
        height: 21px;
        font-size: 14px;
    }

    .input-row__placeholder-text {
        margin: 9px 0px;
        font-size: 22px;

        &.input-row__textarea {
            // we get 2 extra px because some weird textarea styling
            margin: 9px 0 7px 0;
        }
    }

    .input-row__unit {
        font-size: 22px;

        &--left { margin-right: 10px }

        &--right { margin-left: 10px }
    }

    .input-field__helper-text {
        min-height: 18px;
        font-size: 12px;
        padding-top: 4px;
    }
}

.input--condensed {
    .input-field--with-icon { width: ~"calc(100% - 30px)" }

    .input-field__border-overlay {
        margin-bottom: -2px;
    }

    .input__icon-prepend {
        margin-top: 13px;
        margin-right: 10px;
    }

    .input-field__overlay {
        height: calc(~'13px + 20px');
        padding-top: 15px;
        font-size: 14px;
    }

    .input-field__label-text {
        font-size: 10px;
        letter-spacing: 0.5px;
    }

    .input-row__placeholder-text {
        margin: 2px 0px;
        font-size: 14px;
        border-width: 0 0 1px 0;

        &.input-row__textarea {
            // we get 2 extra px because some weird textarea styling
            margin: 2px 0 0 0;
        }
    }

    .input-row__unit { font-size: 14px; }

    .input-field__helper-text {
        min-height: 16px;
        font-size: 10px;
    }

    .input-row__unit--max-length {
        font-size: 10px !important;
    }
}
</style>
