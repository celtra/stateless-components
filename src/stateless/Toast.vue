<template>
    <div :class="{'toast-element--leave' : leaving, 'toast-element--dark': theme === 'dark'}" class="toast-element" @animationend="close">
        <div class="toast-element__label">
            <slot name="label">{{ label }}</slot>
        </div>
        <div class="toast-element__action-label" @click="action">
            <slot name="action-label">{{ actionLabel }}</slot>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        label: { type: String },
        actionLabel: { type: String },
        theme: { type: String, default: 'dark' },
        timeout: { type: Number, default: 5000 },
    },
    data () {
        return {
            leaving: false,
        }
    },
    mounted () {
        this.timeoutId = setTimeout(this.leave, this.timeout)
    },
    beforeDestroy () {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId)
        }
    },
    methods: {
        leave () {
            if (this.timeoutId) {
                clearTimeout(this.timeoutId)
            }
            this.leaving = true
        },
        close () {
            if (this.leaving) {
                this.$emit('close')
            }
        },
        action () {
            this.$emit('action')
            this.leave()
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
    box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.05);
    animation: slide-in @slide-in-out-animation-time ease-out;
    z-index: @z-lowest;

    &--leave {
        animation: slide-out @slide-in-out-animation-time ease-in forwards;
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
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25);

        .toast-element__label {
            color: white;
        }

        .toast-element__action-label {
            color: @very-light-gray;
        }
    }
}

@keyframes slide-in {
    from {
        transform: translateY(120px);
    }
}

@keyframes slide-out {
    to {
        transform: translateY(120px);
    }
}
</style>
