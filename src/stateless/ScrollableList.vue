<template>
    <div :class="[theme] | prefix('scrollable-list--')" class="scrollable-list" @keydown.up.prevent @keydown.down.prevent>
        <div class="scrollable-list__list-wrap">
            <div v-if="showOverlay" class="scrollable-list__overlay scrollable-list__overlay--top">
                <div v-if="enableScrollTop && items.length > 0 && canScrollTop" class="scrollable-list__scroll-top" tabindex="0" @click="scrollTop" @keyup.enter.stop="scrollTop" @keyup.space.prevent.stop="scrollTop">SCROLL TO TOP</div>
            </div>
            <div v-if="showOverlay" class="scrollable-list__overlay scrollable-list__overlay--bottom"></div>

            <div ref="scrollable" :style="{ maxHeight: `${maxHeight}px` }" class="scrollable-list__list" @scroll="onScroll" @keydown.space.prevent>
                <slot name="before"></slot>

                <default-list
                    ref="list"
                    :items="items"
                    :value="value"
                    :highlight-query="highlightQuery"
                    :transition-sorting="transitionSorting"
                    :no-group-rendering="noGroupRendering"
                    :size="size"
                    :theme="theme"
                    :style="bottomPadding > 0 ? { marginBottom: `${bottomPadding}px` } : {}"
                    :list-container="$refs.scrollable"
                    class="scrollable-list__default-list"
                    @select="$emit('select', $event)"
                    @blur="$emit('blur', $event)"
                    @activate="onActivate"
                    @before-update="onBeforeUpdate">
                    <template v-if="$scopedSlots.default" slot-scope="{ item }">
                        <slot :item="item"></slot>
                    </template>
                </default-list>

                <slot name="after"></slot>
            </div>
        </div>
    </div>
</template>

<script>
import { find } from './items_utils'
import DefaultList from './DefaultList.vue'

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
        bottomPadding: { type: Number, default: 0 },
        enableScrollTop: { type: Boolean, default: false },
        showOverlay: { type: Boolean, default: false },
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
            const rootY = this.$el.getBoundingClientRect().top + document.documentElement.scrollTop
            const itemY = this.$el.querySelector(`[data-item-id="${itemId}"]`).getBoundingClientRect().top

            const overlayHeight = this.showOverlay ? 15 : 0
            const upTarget = currentScroll + itemY - rootY - overlayHeight * 2
            const downTarget = currentScroll + itemY - rootY - this.maxHeight + this.itemHeight + this.bottomPadding - overlayHeight

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

    &__list-wrap {
        position: relative;
        overflow: hidden;
    }

    &__list {
        overflow-y: auto;
        overflow: -moz-scrollbars-none;
        overscroll-behavior: contain;
        padding-top: 10px;
    }

    &__scroll-top {
        font-size: 11px;
        color: @bluish-gray;
        cursor: pointer;
        pointer-events: all;
        padding: 1px 3px;
        margin-right: 5px;

        &:focus {
            outline: none;
            color: black;
        }
    }

    &__overlay {
        position: absolute;
        height: 15px;
        width: calc(100% - 6px);
        pointer-events: none;
        z-index: 10;

        &--top {
            top: 0;
            display: flex;
            justify-content: flex-end;
            align-items: flex-start;
        }

        &--bottom {
            bottom: 0;
        }
    }
}

.scrollable-list--dark {
    .scrollable-list__scroll-top {
        background-color: @extremely-dark-gray;
    }

    .scrollable-list__overlay {
        &--top {
            background: linear-gradient(180deg, @extremely-dark-gray, fade(@extremely-dark-gray, 0%));
        }

        &--bottom {
            background: linear-gradient(0deg, @extremely-dark-gray, fade(@extremely-dark-gray, 0%));
        }
    }
}

.scrollable-list--light {
    .scrollable-list__scroll-top {
        background-color: @white;
    }

    .scrollable-list__overlay {
        &--top {
            background: linear-gradient(180deg, @white, fade(@white, 0%));
        }

        &--bottom {
            background: linear-gradient(0deg, @white, fade(@white, 0%));
        }
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
