<template>
    <div :class="[theme] | prefix('scrollable-list--')" class="scrollable-list" @keydown.up.prevent @keydown.down.prevent @click="$emit('click', $event)">
        <div class="scrollable-list__sticky">
            <div :style="{ marginLeft: `${initialOffset}px` }" class="scrollable-list__sticky-slot">
                <slot name="sticky"></slot>
            </div>
            <div v-if="enableScrollTop && items.length > 0 && scrollTop > 0" class="scrollable-list__scroll-top" tabindex="0" @click="scrollToTop" @keyup.enter.stop="scrollToTop" @keyup.space.prevent.stop="scrollToTop">SCROLL UP</div>
        </div>

        <div class="scrollable-list__list-wrap">
            <div ref="scrollable" :style="{ maxHeight: `${maxHeight}px`, width: `calc(100% + ${scrollbarWidth}px)` }" :class="{ 'with-overlay': showOverlay, 'with-bottom-slot': !!$slots['sticky-bottom'] } | prefix('scrollable-list__list--')" class="scrollable-list__list" @scroll="onScroll" @keydown.space.prevent>
                <default-list
                    v-show="items.length > 0"
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
                    :class="{ 'with-overlay': showOverlay, 'with-bottom-slot': !!$slots['sticky-bottom'] } | prefix('scrollable-list__default-list--')"
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

            <scrollbar
                :offset="scrollTop"
                :height="maxHeight"
                :total-height="scrollHeight"
                @set="$refs.scrollable.scrollTop = $event">
            </scrollbar>
        </div>

        <div class="scrollable-list__sticky-bottom">
            <slot name="sticky-bottom"></slot>
        </div>
    </div>
</template>

<script>
import { find } from './items_utils'
import DefaultList from './DefaultList.vue'
import Scrollbar from './Scrollbar.vue'

export default {
    components: {
        DefaultList,
        Scrollbar,
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
    data () {
        return {
            isListReady: false,
            scrollTop: 0,
            scrollHeight: 0,
            scrollbarWidth: 5,
        }
    },
    computed: {
        overlayHeight () {
            return this.showOverlay ? 10 : 0
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

            this.scrollbarWidth = this.$refs.scrollable.offsetWidth - this.$refs.scrollable.clientWidth
        })
    },
    beforeDestroy () {
        window.removeEventListener('resize', () => this.positionSelectList)
    },
    methods: {
        onScroll (e) {
            this.scrollTop = e.target.scrollTop
            this.scrollHeight = e.target.scrollHeight
            if (e.target.scrollTop + e.target.clientHeight >= e.target.scrollHeight) {
                this.$emit('load-more')
            }
        },
        scrollToTop () {
            this.scrollTop = 0
            this.$refs.scrollable.scrollTop = 0
        },
        positionSelectList () {
            if (this.value) {
                let item = find(this.items, x => x.id === this.value)
                this.scrollTo(item ? item.key || item.id : this.value)
            }
        },
        scrollTo (itemId) {
            const rootY = this.$refs.scrollable.getBoundingClientRect().top + document.documentElement.scrollTop
            const itemY = this.$el.querySelector(`[data-item-id="${itemId}"]`).getBoundingClientRect().top + this.$refs.scrollable.scrollTop

            const scrollY = itemY - rootY - (this.maxHeight - this.itemHeight) / 2
            this.$refs.scrollable.scrollTop = scrollY

            this.$nextTick(() => {
                const rootY = this.$refs.scrollable.getBoundingClientRect().top
                const itemY = this.$el.querySelector(`[data-item-id="${itemId}"]`).getBoundingClientRect().top
                const shownY = itemY - rootY + this.itemHeight / 2

                this.$emit('scroll', shownY)
            })
        },
        onActivate (itemId) {
            const currentScroll = this.$refs.scrollable.scrollTop
            const computedScrollableStyle = getComputedStyle(this.$refs.scrollable)
            const verticalPadding = parseFloat(computedScrollableStyle.paddingTop) + parseFloat(computedScrollableStyle.paddingBottom)
            const rootY = this.$refs.scrollable.getBoundingClientRect().top + document.documentElement.scrollTop
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

@overlay-height: 10px;
@scrollbar-width: 5px;
@sticky-bottom-height: 50px;

.scrollable-list {
    font-family: @regular-text-font;
    width: 100%;

    &__list-wrap {
        position: relative;
        overflow: hidden;
    }

    &__sticky {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: calc(100% - @scrollbar-width - 1px);
    }

    &__sticky-bottom {
        position: absolute;
        bottom: 0;
        width: 100%;
    }

    &__list {
        overflow-x: hidden;
        overflow-y: auto;
        overscroll-behavior: contain;
        box-sizing: content-box;
        width: 100%;

        &--with-overlay {
            mask-image: linear-gradient(transparent 0%, black @overlay-height, black calc(100% - @overlay-height), transparent 100%);
        }

        &--with-bottom-slot {
            min-height: @sticky-bottom-height;
            mask-image: linear-gradient(transparent 0%, black @overlay-height, black calc(100% - @sticky-bottom-height - @overlay-height), transparent calc(100% - @sticky-bottom-height), transparent 100%);
        }
    }

    &__default-list {
        &--with-overlay {
            padding: @overlay-height 0;
        }

        &--with-bottom-slot {
            padding: @overlay-height 0 @sticky-bottom-height 0;
        }
    }

    &__scroll-top {
        font-size: 11px;
        color: @bluish-gray;
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
