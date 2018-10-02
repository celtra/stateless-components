<template>
    <div :class="{'toast-element--hidden' : !isShown, 'toast-element--dark': theme === 'dark'}" class="toast-element">
        <div class="toast-element__label">
            <slot></slot>
        </div>
        <div class="toast-element__action-label" @click="$emit('action')">
            <slot name="action"></slot>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        theme: { type: String, default: 'dark' },
    },
    data () {
        return {
            isShown: false,
        }
    },
    beforeDestroy () {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId)
        }
    },
    methods: {
        show (timeout = 5000) {
            this.isShown = true
            if (!this.timeoutId) {
                clearTimeout(this.timeoutId)
            }
            this.timeoutId = setTimeout(this.hide, timeout)
        },
        hide () {
            this.isShown = false
        },
    },
}
</script>

<style lang="less" scoped>
@import (reference) './common';
@import './typography';

@slide-in-out-animation-time: 0.4s;

.toast-element {
    font-family: @regular-text-font;
    width: 320px;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    position: fixed;
    padding: 0 30px;
    bottom: 70px;
    box-shadow: 0 1px 10px 0 rgba(0,0,0,0.05);
    z-index: @z-lowest;
    transition: transform @slide-in-out-animation-time ease;
    transform: translateY(0);

    &--hidden {
        transform: translateY(135px);
    }

    &__label {
        font-size: 14px;
        color: @pale-gray;
        font-family: @regular-text-font;
        user-select: none;
    }

    &__action-label {
        font-size: 12px;
        color: @gunpowder;
        font-family: @regular-text-font;
        user-select: none;
        text-transform: uppercase;
        cursor: pointer;
    }

    &--dark {
        background-color: @gunpowder;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,0.25);

        .toast-element__label {
            color: white;
        }

        .toast-element__action-label {
            color: @very-light-gray;
        }
    }
}
</style>
