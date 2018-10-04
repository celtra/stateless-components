<template>
    <div ref="tooltip" :style="transform ? { transform: transform } : {}" :class="{ visible: show, hoverable: isRelative } | prefix('hover-tooltip--')" class="hover-tooltip" @animationstart="onAnimationStart">
        <p v-if="title" class="hover-tooltip__title">{{ title }}</p>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'tooltip',
    props: {
        theme: { type: String, default: 'dark' },
        title: { type: String, required: false },
        show: { type: Boolean, default: false },
        isRelative: { type: Boolean, default: true },
    },
    hasAbsolutePosition: true,
    setup () {
        // Wait for tooltip animation to finish
        return new Promise(resolve => setTimeout(resolve, 1200))
    },
    slot (h) {
        return 'Something'
    },
    variations: {
        theme: ['dark', 'light'],
    },
    usecases: [
        {
            title: 'Some',
            show: true,
        },
    ],
    data () {
        return {
            translateX: null,
            translateY: null,
        }
    },
    computed: {
        transform () {
            if (this.translateX || this.translateY) {
                return `translate(${this.translateX || 0}px, ${this.translateY || 0}px)`
            }
        },
    },
    methods: {
        onAnimationStart () {
            if (this.isRelative) {
                this.translateX = null
                this.translateY = null
                this.$nextTick(() => {
                    if (this.$refs.tooltip) {
                        const tooltip = this.$refs.tooltip.getBoundingClientRect()
                        if (tooltip.x + tooltip.width > window.innerWidth) {
                            this.translateX = window.innerWidth - tooltip.x - tooltip.width - 10
                        }
                    }
                })
            }
        },
    },
}
</script>

<style lang="less" scoped>
@import (reference) './common';
@import './typography';

.hover-tooltip {
    position: absolute;
    visibility: hidden;
    opacity: 0;
    top: 100%;
    left: 0px;
    color: @white;
    background-color: @gunpowder;
    border-radius: 3px;
    font-size: 11px;
    text-align: left;
    padding: 10px 15px;
    z-index: @z-highest;
    max-width: 460px;
    word-wrap: break-word;
    font-family: @regular-text-font;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: transform 200ms ease;

    &__title {
        font-weight: bold;
        margin: 0;
        margin-bottom: 5px;
    }
}

.hover-tooltip:hover, :hover > .hover-tooltip--hoverable, .hover-tooltip--visible {
    animation: 0.2s fadeIn;
    animation-delay: 0.8s;
    animation-fill-mode: forwards;
}

@keyframes fadeIn {
    0% {
        visibility: hidden;
        opacity: 0;
    }
    100% {
        visibility: visible;
        opacity: 1;
    }
}
</style>
