<template>
    <div :class="[theme] | prefix('scrollable-list--')" class="scrollable-list" @keydown.up.prevent @keydown.down.prevent @click="$emit('click', $event)">
        <div class="scrollable-list__list-wrap">
            <div v-if="enableScrollTop && items.length > 0 && canScrollTop" class="scrollable-list__scroll-top" tabindex="0" @click="scrollTop" @keyup.enter.stop="scrollTop" @keyup.space.prevent.stop="scrollTop">SCROLL TO TOP</div>

            <div ref="scrollable" :style="{ maxHeight: `${maxHeight}px` }" :class="{ 'with-overlay': showOverlay } | prefix('scrollable-list__list--')" class="scrollable-list__list" @scroll="onScroll" @keydown.space.prevent>
                <default-list
                    ref="list"
                    :items="items"
                    :value="value"
                    :highlight-query="highlightQuery"
                    :transition-sorting="transitionSorting"
                    :no-group-rendering="noGroupRendering"
                    :set-active-on-hover="setActiveOnHover"
                    :initial-offset="initialOffset"
                    :size="size"
                    :theme="theme"
                    :list-container="$refs.scrollable"
                    :class="{ 'with-overlay': showOverlay } | prefix('scrollable-list__default-list--')"
                    class="scrollable-list__default-list"
                    @select="$emit('select', $event)"
                    @blur="$emit('blur', $event)"
                    @activate="onActivate">

                    <template v-if="$scopedSlots.default" slot-scope="{ item }">
                        <slot :item="item"></slot>
                    </template>

                    <slot slot="before" name="before"></slot>
                    <slot slot="after" name="after"></slot>
                </default-list>
            </div>
        </div>
    </div>
</template>

<script>
import { find } from './items_utils'
import DefaultList from './DefaultList.vue'
import { largeItems } from './demo_data'

export default {
    components: {
        DefaultList,
    },
    props: {
        size: { type: String, default: 'normal' },
        theme: { type: String, default: 'dark' },
        numItems: { type: Number, required: true },
        items: { type: Array, required: true },
        value: { type: String },
        highlightQuery: { type: String },
        transitionSorting: { type: Boolean, default: false },
        noGroupRendering: { type: Boolean, default: false },
        setActiveOnHover: { type: Boolean, default: true },
        enableScrollTop: { type: Boolean, default: false },
        showOverlay: { type: Boolean, default: false },
        initialOffset: { type: Number, default: 0 },
    },
    usecases: [
        {
            items: largeItems,
            numItems: 10,
            label: 'Something',
            showOverlay: true,
            setup () {
                // Wait for large items to render
                return new Promise(resolve => setTimeout(resolve, 200))
            },
        },
    ],
    data () {
        return {
            isListReady: false,
            canScrollTop: false,
        }
    },
    computed: {
        overlayHeight () {
            return this.showOverlay ? 15 : 0
        },
        itemHeight () {
            return this.isListReady ? this.$refs.list.assumedItemHeight : 0
        },
        maxHeight () {
            return this.numItems * this.itemHeight + 2 * this.overlayHeight
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
        onScroll (e) {
            const canScrollTop = e.target.scrollTop > 0
            if (this.canScrollTop !== canScrollTop) {
                this.canScrollTop = canScrollTop
            }
            if (e.target.scrollTop + e.target.clientHeight >= e.target.scrollHeight) {
                this.$emit('load-more')
            }
        },
        scrollTop () {
            this.canScrollTop = false
            this.$refs.scrollable.scrollTop = 0
        },
        positionSelectList () {
            if (this.value) {
                let item = find(this.items, x => x.id === this.value)
                this.scrollTo(item ? item.key || item.id : this.value)
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
            const computedScrollableStyle = getComputedStyle(this.$refs.scrollable)
            const verticalPadding = parseFloat(computedScrollableStyle.paddingTop) + parseFloat(computedScrollableStyle.paddingBottom)
            const rootY = this.$el.getBoundingClientRect().top + document.documentElement.scrollTop
            const itemY = this.$el.querySelector(`[data-item-id="${itemId}"]`).getBoundingClientRect().top

            const upTarget = currentScroll + itemY - rootY - this.overlayHeight
            const downTarget = currentScroll + itemY - rootY - this.maxHeight + this.itemHeight - verticalPadding + this.overlayHeight

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
        highlightItem (index) {
            this.$refs.list.highlightItem(index)
        },
    },
}
</script>

<style lang="less" scoped>
@import (reference) './common';
@import './typography';

@overlay-height: 15px;
@scrollbar-width: 5px;

.scrollable-list {
    width: 100%;

    &__list-wrap {
        position: relative;
        overflow: hidden;
    }

    &__list {
        overflow-y: auto;
        overscroll-behavior: contain;

        &--with-overlay {
            mask-image: linear-gradient(transparent 0%, black @overlay-height, black calc(100% - @overlay-height), transparent 100%);
        }
    }

    &__default-list {
        &--with-overlay {
            padding: @overlay-height 0;
        }
    }

    &__scroll-top {
        position: absolute;
        top: 0;
        right: @scrollbar-width + 1;
        padding: 1px 3px;
        font-size: 11px;
        line-height: 12px;
        border-radius: 0 0 5px 5px;
        color: @bluish-gray;
        z-index: @z-middle;
        cursor: pointer;

        &:focus {
            outline: none;
            color: black;
        }
    }
}

::-webkit-scrollbar {
    width: @scrollbar-width;
}

::-webkit-scrollbar-track {
    background-color: transparent;
}

.scrollable-list--light .scrollable-list__list::-webkit-scrollbar-thumb {
    background-color: @very-light-gray;
    border-radius: 5px;
}

.scrollable-list--dark .scrollable-list__list::-webkit-scrollbar-thumb {
    background-color: @gunpowder;
    border-radius: 5px;
}

::-webkit-scrollbar-corner {
    background-color: transparent;
}
</style>
