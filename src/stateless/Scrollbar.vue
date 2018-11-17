<template>
    <div class="scrollbar" @click="click">
        <div
            v-if="isVisible"
            :style="{ transform: `translateY(${handleY}px)`, height: `${handleHeight}px` }"
            :class="[theme] | prefix('scrollbar__handle--')"
            class="scrollbar__handle"
            @mousedown="startDrag">
        </div>
    </div>
</template>

<script>
export default {
    props: {
        theme: { type: String, default: 'dark' },
        container: { type: HTMLElement },
    },
    data () {
        return {
            height: 0,
            totalHeight: 0,
            scrollTop: 0,
        }
    },
    computed: {
        isVisible () {
            return this.height < this.totalHeight
        },
        handleY () {
            return this.scrollTop * this.height / this.totalHeight
        },
        handleHeight () {
            return this.height * this.height / this.totalHeight
        },
    },
    watch: {
        container () {
            this.setupContainer()
        },
    },
    beforeCreate () {
        this.isDragging = false
        this.handleDragRatio = 0.5
        this.canClick = true
    },
    created () {
        this.setupContainer()

        window.addEventListener('mousemove', this.onDrag)
        window.addEventListener('mouseup', this.stopDrag)

        const update = () => {
            if (this.container) {
                const height = Math.max(parseInt(this.container.style.maxHeight, 10), this.container.clientHeight)
                if (height !== this.height) {
                    this.height = height
                }

                const totalHeight = this.container.scrollHeight
                if (totalHeight !== this.totalHeight) {
                    this.totalHeight = totalHeight
                }
            }

            if (!this._isDestroyed) {
                requestAnimationFrame(update)
            }
        }

        update()
    },
    beforeDestroy () {
        window.removeEventListener('mousemove', this.onDrag)
        window.removeEventListener('mouseup', this.stopDrag)
    },
    methods: {
        setupContainer () {
            if (this.container) {
                this.container.addEventListener('wheel', (ev) => {
                    this.set(this.scrollTop + ev.deltaY)
                    ev.preventDefault()
                    ev.stopPropagation()
                })
            }
        },
        click (ev) {
            if (this.canClick) {
                const elementBox = this.$el.getBoundingClientRect()
                this.setHandle((ev.pageY - elementBox.top) / elementBox.height, 0.5)
            }
        },
        startDrag (ev) {
            this.isDragging = true
            this.canClick = false

            const elementBox = this.$el.getBoundingClientRect()
            this.handleDragRatio = (ev.pageY - (elementBox.top + this.handleY)) / this.handleHeight
        },
        onDrag (ev) {
            if (this.isDragging) {
                const elementBox = this.$el.getBoundingClientRect()
                this.setHandle((ev.pageY - elementBox.top) / elementBox.height, this.handleDragRatio)
            }
        },
        stopDrag (ev) {
            this.isDragging = false
            this.$nextTick(() => {
                this.canClick = true
            })
        },
        setHandle (ratio, handleRatio) {
            this.set(ratio * this.totalHeight - handleRatio * this.height)
        },
        set (value) {
            this.scrollTop = Math.max(0, Math.min(this.totalHeight - this.height, value))
            this.container.scrollTop = this.scrollTop
        },
    },
}
</script>

<style lang="less" scoped>
@import (reference) './common';

.scrollbar {
    position: absolute;
    right: 5px;
    top: 0;
    width: 5px;
    height: 100%;
    user-select: none;

    &__handle {
        border-radius: 5px;

        &--dark {
            background-color: @gunpowder;
        }

        &--light {
            background-color: @very-light-gray;
        }
    }
}
</style>
