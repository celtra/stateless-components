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

                const scrollTop = this.container.scrollTop
                if (scrollTop !== this.scrollTop) {
                    this.scrollTop = scrollTop
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
                this.container.addEventListener('wheel', (e) => {
                    const newScrollTop = this.container.scrollTop + e.deltaY
                    this.container.scrollTop = newScrollTop
                    this.scrollTop = newScrollTop

                    e.preventDefault()
                    e.stopPropagation()
                })
            }
        },
        click (ev) {
            if (this.canClick) {
                const elementBox = this.$el.getBoundingClientRect()
                this.set((ev.pageY - elementBox.top) / elementBox.height, 0.5)
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
                this.set((ev.pageY - elementBox.top) / elementBox.height, this.handleDragRatio)
            }
        },
        stopDrag (ev) {
            this.isDragging = false
            this.$nextTick(() => {
                this.canClick = true
            })
        },
        set (ratio, handleRatio) {
            this.$emit('set', Math.max(0, Math.min(this.totalHeight - this.height, ratio * this.totalHeight - handleRatio * this.height)))
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
        transition: transform 20ms linear, height 100ms ease;

        &--dark {
            background-color: @gunpowder;
        }

        &--light {
            background-color: @very-light-gray;
        }
    }
}
</style>
