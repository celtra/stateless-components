<template>
    <div>
        <a v-if="href" class="dialog-button__link" :href="href" @click="click">
            <dialog-button :disabled="disabled" :loading="loading" :error="error">
                <slot></slot>
            </dialog-button>
        </a>
        <div v-else class="dialog-button" :class="{ 'disabled': disabled, 'loading': loading, 'error': error } | prefix('dialog-button--')" @click="click" @keyup.enter.prevent.stop="click" :tabindex="disabled ? -1 : 0">
            <svg viewBox="0 0 30 30" v-if="loading">
                <path d="M15,30C6.7,30,0,23.3,0,15c0-4.7,2.3-9.2,6-12l2.4,3.2C5.6,8.2,4,11.5,4,15C4,21,8.9,26,15,26c6.1,0,11-4.9,11-11c0-5.7-4.4-10.5-10-11l0.3-4C24,0.7,30,7.2,30,15C30,23.3,23.3,30,15,30z"/>
            </svg>
            <div class="dialog-button__text" :style="loading ? { visibility: 'hidden' } : {}">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
import DialogButton from './dialog_button.vue'

export default {
    name: 'dialog-button',
    components: { dialogButton: DialogButton },
    props: {
        disabled: { type: Boolean, default: false },
        loading: { type: Boolean, default: false },
        error: { type: Boolean, default: false },
        href: { type: String },
    },
    methods: {
        click () {
            this.$root.$emit('tracking-event', { type: 'button', label: this.$attrs.trackName || (this.$slots && this.$slots.default) ? this.$slots.default[0].text : 'dialog-button', trigger: 'click' })
            this.$emit('click')
        },
    },
}
</script>

<style lang="less" scoped>
@import (reference) '../../shared/components/variables';

.dialog-button {
    position: relative;
    width: fit-content;
    margin: auto;
    padding: 22px 75px;
    background-color: @very-light-green;
    font-size: 14px;
    font-family: @medium-text-font;
    line-height: 16px;
    text-transform: uppercase;
    cursor: pointer;
    user-select: none;

    &:hover, &:focus { background-color : @light-green; }

    &:focus { outline: none; }
}

.dialog-button__link {
    text-decoration: none;
}

.dialog-button--disabled {
    background-color: @extremly-light-green;
    cursor: default;
    pointer-events: none;

    .dialog-button__text {
        opacity: 0.4;
    }
}

.dialog-button--error {
    color: white;
    background-color: @pink-red;
    opacity: 0.8;

    &:hover, &:focus {
        background-color: @pink-red;
        opacity: 1;
    }

    &:focus { outline: none; }
}

.dialog-button--loading {
    background-color: @extremly-light-green;
    cursor: default;
    min-height: 16px;
    min-width: 36px;
    pointer-events: none;

    &:hover, &:focus { background-color : @extremly-light-green; }

    &:focus { outline: none; }

    svg {
        position: absolute;
        top: 20px;
        width: 20px;
        height: 20px;
        left: 0;
        right: 0;
        margin: auto;
        fill: @white;
        animation: BUTTON_LOADER 1s ease-out infinite;
    }
}

@keyframes BUTTON_LOADER {
    0%   { transform: rotate(0); }
    100% { transform: rotate(720deg); }
}
</style>
