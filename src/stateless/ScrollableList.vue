<template>
    <div class="scrollable-list" @keydown.up.prevent @keydown.down.prevent>
        <div v-if="enableScrollTop && items.length > 0" :style="!canScrollTop ? { visibility: 'hidden' } : {}" class="scrollable-list__scroll-top" @click="scrollTop">SCROLL TO TOP</div>

        <div ref="scrollable" :style="{ maxHeight: `${maxHeight}px` }" class="scrollable-list__list" @scroll="onScroll">
            <slot name="before"></slot>

            <default-list
                ref="list"
                :items="items"
                :value="value"
                :highlight-query="highlightQuery"
                :transition-sorting="transitionSorting"
                :no-group-rendering="noGroupRendering"
                :size="size"
                :style="bottomPadding > 0 ? { marginBottom: `${bottomPadding}px` } : {}"
                :list-container="$refs.scrollable"
                class="scrollable-list__default-list"
                @select="$emit('select', $event)"
                @activate="onActivate"
                @before-update="onBeforeUpdate">
                <template v-if="$scopedSlots.default" slot-scope="{ item }">
                    <slot :item="item"></slot>
                </template>
            </default-list>

            <slot name="after"></slot>
        </div>
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
        enableScrollTop: { type: Boolean, default: false },
    },
    data () {
        return {
            isListReady: false,
            canScrollTop: false,
        }
    },
    computed: {
        itemHeight () {
            return this.isListReady ? this.$refs.list.assumedItemHeight : 0
        },
        maxHeight () {
            return this.numItems * this.itemHeight + this.bottomPadding
        },
    },
    mounted () {
        this.$nextTick(() => {
            window.addEventListener('resize', () => this.positionSelectList)
            this.positionSelectList()
            this.isListReady = true
        })
    },
    beforeDestroy () {
        window.removeEventListener('resize', () => this.positionSelectList)
    },
    methods: {
        onBeforeUpdate () {
            const scrollTop = this.$refs.scrollable.scrollTop
            this.$nextTick(() => {
                //this.$refs.scrollable.scrollTop = scrollTop
            })
        },
        onScroll (e) {
            const canScrollTop = e.target.scrollTop > 0
            if (this.canScrollTop !== canScrollTop) {
                this.canScrollTop = canScrollTop
            }
        },
        scrollTop () {
            this.canScrollTop = false
            this.$refs.scrollable.scrollTop = 0
        },
        positionSelectList () {
            if (this.value) {
                this.scrollTo(this.value)
            }
        },
        scrollTo (itemId) {
            const rootY = this.$el.getBoundingClientRect().top + document.documentElement.scrollTop
            const itemY = this.$el.querySelector(`[data-item-id="${itemId}"]`).getBoundingClientRect().top + this.$refs.scrollable.scrollTop

            const scrollY = itemY - rootY - (this.maxHeight - this.itemHeight) / 2
            this.$refs.scrollable.scrollTop = scrollY

            this.$nextTick(() => {
                const rootY = this.$el.getBoundingClientRect().top
                const itemY = this.$el.querySelector(`[data-item-id="${itemId}"]`).getBoundingClientRect().top
                const shownY = itemY - rootY + this.itemHeight / 2

                this.$emit('scroll', shownY)
            })
        },
        onActivate (itemId) {
            const currentScroll = this.$refs.scrollable.scrollTop
            const rootY = this.$el.getBoundingClientRect().top + document.documentElement.scrollTop
            const itemY = this.$el.querySelector(`[data-item-id="${itemId}"]`).getBoundingClientRect().top

            const upTarget = currentScroll + itemY - rootY
            const downTarget = currentScroll + itemY - rootY - this.maxHeight + this.itemHeight + this.bottomPadding

            if (currentScroll > upTarget) {
                this.$refs.scrollable.scrollTop = upTarget
            } else if (currentScroll < downTarget) {
                this.$refs.scrollable.scrollTop = downTarget
            }

            this.$emit('activate', itemId)
        },
        focus () {
            let scrollTop = this.$refs.scrollable.scrollTop
            this.$refs.list.focus()
            this.$refs.scrollable.scrollTop = scrollTop
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
    width: 100%;

    &__list {
        overflow-y: auto;
        overscroll-behavior: contain;
    }

    &__scroll-top {
        font-size: 11px;
        color: @bluish-gray;
        cursor: pointer;
        width: 100%;
        text-align: right;
    }
}

::-webkit-scrollbar {
    width : 5px;
}

::-webkit-scrollbar-track {
    background-color : transparent;
}

::-webkit-scrollbar-thumb {
    border-radius    : 5px;
    background-color : @very-light-gray;
}

::-webkit-scrollbar-corner {
    background-color : transparent;
}
</style>
