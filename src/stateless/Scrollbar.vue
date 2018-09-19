<template>
    <div class="scrollbar" @click="click">
        <div
            :style="{ transform: `translateY(${handleY}px)`, height: `${handleHeight}px` }"
            class="scrollbar__handle"
            @mousedown="startDrag">
        </div>
    </div>
</template>

<script>
export default {
    props: {
        height: { type: Number },
        totalHeight: { type: Number },
        offset: { type: Number },
    },
    computed: {
        handleY () {
            return this.offset * this.height / this.totalHeight
        },
        handleHeight () {
            return this.height * this.height / this.totalHeight
        },
    },
    created () {
        window.addEventListener('mousemove', this.onDrag)
        window.addEventListener('mouseup', this.stopDrag)
    },
    beforeDestroy () {
        window.removeEventListener('mousemove', this.onDrag)
        window.removeEventListener('mouseup', this.stopDrag)
    },
    methods: {
        click (ev) {
            const elementBox = this.$el.getBoundingClientRect()
            const currentRatio = (ev.pageY - elementBox.top) / elementBox.height

            this.$emit('set', Math.max(0, Math.min(this.totalHeight - this.height, this.totalHeight * currentRatio - this.height / 2)))
        },
        startDrag (ev) {
            this.isDragging = true

            const elementBox = this.$el.getBoundingClientRect()
            this.handleDragRatio = (ev.pageY - (elementBox.top + this.handleY)) / this.handleHeight
        },
        onDrag (ev) {
            if (this.isDragging) {
                const elementBox = this.$el.getBoundingClientRect()
                const currentRatio = (ev.pageY - elementBox.top) / elementBox.height

                this.$emit('set', Math.max(0, Math.min(this.totalHeight - this.height, this.totalHeight * currentRatio - this.handleDragRatio * this.height)))
            }
        },
        stopDrag () {
            this.isDragging = false
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
        background-color: @very-light-gray;
        border-radius: 5px;
        transition: transform 0ms linear;
    }
}
</style>
