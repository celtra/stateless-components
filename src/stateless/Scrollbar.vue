<template>
    <div class="scrollbar" @click="click">
        <div
            :style="{ transform: `translateY(${offset * height / totalHeight}px)`, height: `${height / totalHeight * 100}%` }"
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
    created () {
        window.addEventListener('mousemove', this.onDrag)
        window.addEventListener('mouseup', this.stopDrag)
    },
    beforeDestroy () {
        window.removeEventListener('mousemove', this.onDrag)
        window.removeEventListener('mouseup', this.stopDrag)
    },
    methods: {
        click () {

        },
        startDrag () {
            this.isDragging = true
        },
        onDrag (ev) {
            if (this.isDragging) {
                const elementBox = this.$el.getBoundingClientRect()
                const currentRatio = (ev.pageY - elementBox.top) / elementBox.height

                this.$emit('set', Math.max(0, Math.min(this.totalHeight - this.height, this.totalHeight * currentRatio - this.height / 2)))
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
    width: 5px;
    position: absolute;
    right: 5px;
    top: 0;
    height: 100%;

    &__handle {
        background-color: @very-light-gray;
        border-radius: 5px;
        transition: transform 0ms linear;
    }
}
</style>
