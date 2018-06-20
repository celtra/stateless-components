<template>
    <div :class="{'toast-element--leave' : leaving}" class="toast-element" @animationend="close">
        <div class="toast-element__label">{{ label }}</div>
        <div class="toast-element__action-label">{{ actionLabel }}</div>
        <div class="toast-element__icon" @click="action">
            <svg xmlns="http://www.w3.org/2000/svg" class="toast-element__icon-svg" viewBox="0 0 24 24">
                <path d="M13.4 12L23.7 1.7c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0L12 10.6 1.7.3C1.3-.1.7-.1.3.3c-.4.4-.4 1 0 1.4L10.6 12 .3 22.3c-.4.4-.4 1 0 1.4.2.2.4.3.7.3.3 0 .5-.1.7-.3L12 13.4l10.3 10.3c.2.2.5.3.7.3.2 0 .5-.1.7-.3.4-.4.4-1 0-1.4L13.4 12z" fill-rule="nonzero"/>
            </svg>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        label: { type: String },
        actionLabel: { type: String },
        timeout: { type: Number, default: 5000 },
    },
    data () {
        return {
            leaving: false,
        }
    },
    mounted () {
        this.timeoutSet = setTimeout(() => {
            this.leave()
        }, this.timeout)
    },
    methods: {
        leave () {
            this.leaving = true
        },
        close () {
            if (this.leaving)
                this.$emit('close')
        },
        action () {
            this.$emit('action')
            clearTimeout(this.timeoutSet)
            this.leave()
        },
    },
}
</script>

<style lang="less" scoped>
@import (reference) './variables';

.toast-element {
  width: 318px;
  height: 60px;
  display: flex;
  background-color: white;
  position: fixed;
  bottom: 60px;
  box-shadow: 0 1px 10px 0 rgba(0,0,0,0.05);
  animation: slide-in @toast-slide-in-out-animation-time ease-out;

  &--leave {
    animation: slide-out @toast-slide-in-out-animation-time ease-in forwards;
  }

  &__label {
    padding: 22px;
    width: fit-content;
    flex-grow: 1;
    font-size: 14px;
    color: @pale-gray;
    font-family: @regular-text-font;
    user-select: none;
  }

  &__action-label {
    width: 36px;
    padding: 22px 0;
    font-size: 14px;
    color: @gunpowder;
    font-family: @regular-text-font;
    user-select: none;
  }

  &__icon {
    width: 60px;
    height: 60px;
    cursor: pointer;

    &-svg {
      fill: @gunpowder;
      width: 14px;
      padding: 23px;
    }
  }
}

@keyframes slide-in {
  from {
    transform: translateY(120px)
  }
}

@keyframes slide-out {
  to {
    transform: translateY(120px)
  }
}
</style>
