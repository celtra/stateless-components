<template>
    <div ref="tooltip" :style="{transform: transform}" :class="{ 'hover-tooltip--visible': show }" class="hover-tooltip" @animationstart="handleAnimationStart">
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        show: { type: Boolean, default: false },
        boundaryElement: { type: [HTMLElement, String], default: null },
    },
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
        handleAnimationStart () {
            this.resetPosition()
            this.$nextTick(this.positionTooltip)
        },
        positionTooltip () {
            if (this.$refs.tooltip) {
                if (this.boundaryElement === 'viewport') {
                    const tooltip = this.$refs.tooltip.getBoundingClientRect()
                    if (tooltip.x + tooltip.width > window.innerWidth) {
                        this.translateX = window.innerWidth - tooltip.x - tooltip.width - 10
                    }
                } else if (this.boundaryElement instanceof HTMLElement) {
                    const tooltip = this.$refs.tooltip.getBoundingClientRect()
                    const boundary = this.boundaryElement.getBoundingClientRect()

                    if (tooltip.x + tooltip.width > boundary.x + boundary.width) {
                        this.translateX = boundary.x + boundary.width - tooltip.x - tooltip.width - 10
                    }

                    if (tooltip.y + tooltip.height > boundary.y + boundary.height) {
                        this.translateY = boundary.y + boundary.height - tooltip.y - tooltip.height - 10
                    }
                }
            }
        },
        resetPosition () {
            this.translateX = null
            this.translateY = null
        },
    },
}
</script>

<style lang="less" scoped>
@import (reference) './common';

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
    text-align: center;
    padding: 6px 20px;
    z-index: @z-highest;
    max-width: 200px;
    word-wrap: break-word;
}

:hover > .hover-tooltip,
.hover-tooltip--visible {
    animation: 0.2s fadeIn;
    animation-delay: 0.4s;
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
