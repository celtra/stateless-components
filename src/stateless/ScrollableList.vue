<template>
    <div :style="{ maxHeight: `${maxHeight}px` }" class="scrollable-list" @keydown.up.prevent @keydown.down.prevent>
        <default-list
            ref="list"
            :items="items"
            :value="value"
            :highlight-query="highlightQuery"
            :transition-sorting="transitionSorting"
            :no-group-rendering="noGroupRendering"
            :size="size"
            :style="bottomPadding > 0 ? { marginBottom: `${bottomPadding}px` } : {}"
            class="scrollable-list__default-list"
            @select="$emit('select', $event)"
            @activate="onActivate" />
    </div>
</template>

<script>
import DefaultList from './DefaultList.vue'

export default {
    components: {
        DefaultList,
    },
    props: {
        size: { type: String, required: false, default: 'normal' },
        numItems: { type: Number, required: true },
        items: { type: Array, required: true },
        value: { type: String },
        highlightQuery: { type: String },
        transitionSorting: { type: Boolean, default: false },
        noGroupRendering: { type: Boolean, default: false },
        bottomPadding: { type: Number, default: 0 },
    },
    computed: {
        itemHeight () {
            if (this.size === 'condensed') {
                return 20
            } else if (this.size === 'normal') {
                return 30
            } else if (this.size === 'phat') {
                return 45
            }
        },
        maxHeight () {
            return this.numItems * this.itemHeight + this.bottomPadding
        },
    },
    mounted () {
        this.$nextTick(() => {
            window.addEventListener('resize', () => this.positionSelectList)
            this.positionSelectList()
        })
    },
    beforeDestroy () {
        window.removeEventListener('resize', () => this.positionSelectList)
    },
    methods: {
        positionSelectList () {
            if (this.value) {
                this.scrollTo(this.value)
            }
        },
        scrollTo (itemId) {
            const rootY = this.$el.getBoundingClientRect().top + document.documentElement.scrollTop
            const itemY = this.$el.querySelector(`[data-item-id="${itemId}"]`).getBoundingClientRect().top + this.$el.scrollTop

            const scrollY = itemY - rootY - (this.maxHeight - this.itemHeight) / 2
            this.$el.scrollTop = scrollY

            this.$nextTick(() => {
                const rootY = this.$el.getBoundingClientRect().top
                const itemY = this.$el.querySelector(`[data-item-id="${itemId}"]`).getBoundingClientRect().top
                const shownY = itemY - rootY + this.itemHeight / 2

                this.$emit('scroll', shownY)
            })
        },
        onActivate (itemId) {
            const currentScroll = this.$el.scrollTop
            const rootY = this.$el.getBoundingClientRect().top + document.documentElement.scrollTop
            const itemY = this.$el.querySelector(`[data-item-id="${itemId}"]`).getBoundingClientRect().top

            const upTarget = currentScroll + itemY - rootY
            const downTarget = currentScroll + itemY - rootY - this.maxHeight + this.itemHeight + this.bottomPadding

            if (currentScroll > upTarget) {
                this.$el.scrollTop = upTarget
            } else if (currentScroll < downTarget) {
                this.$el.scrollTop = downTarget
            }

            this.$emit('activate', itemId)
        },
        move (direction) {
            this.$refs.list.move(direction)
        },
    },
}
</script>

<style lang="less" scoped>
@import (reference) './variables';

.scrollable-list {
    overflow-y: scroll;

    &::-webkit-scrollbar { display: none; }
}
</style>
