<template>
    <div class="default-list" tabindex="0" @keydown.up.prevent @keydown.down.prevent @keyup.up.prevent.stop="move(-1)" @keyup.down.prevent.stop="move(1)" @keyup.enter.stop="selectItem(activeId)">
        <transition-group v-if="transitionSorting && canTransition" name="default-list__item" tag="div">
            <div v-for="item in shownItemsWithData" :key="item.key" :data-item-id="item.id" :style="item.css" :class="item.modifiers | prefix('default-list__item--')" class="default-list__item" @click="selectItem(item.id)">
                <div v-if="item.isLeaf || noGroupRendering" class="default-list__item-content">
                    <slot :item="item">
                        <default-list-item
                            :label="item.label"
                            :metadata="item.metadata"
                            :icon="item.icon"
                            :disabled="item.disabled"
                            :selected="item.id === value"
                            :highlight-query="highlightQuery"
                            :size="size"
                            theme="light" />
                    </slot>
                    <tooltip v-if="item.tooltip" :boundary-element="listContainer">{{ item.tooltip }}</tooltip>
                </div>
                <div v-else class="default-list__item-content">
                    <slot :item="item" name="group">
                        <div v-if="item.label" class="default-list__group">{{ item.label }}</div>
                    </slot>
                </div>
            </div>
        </transition-group>
        <template v-else>
            <div v-for="item in shownItemsWithData" :key="item.key" :data-item-id="item.id" :style="item.css" :class="item.modifiers | prefix('default-list__item--')" class="default-list__item" @click="selectItem(item.id)">
                <div v-if="item.isLeaf || noGroupRendering" class="default-list__item-content">
                    <slot :item="item">
                        <default-list-item
                            :label="item.label"
                            :metadata="item.metadata"
                            :icon="item.icon"
                            :disabled="item.disabled"
                            :selected="item.id === value"
                            :highlight-query="highlightQuery"
                            :size="size"
                            theme="light" />
                    </slot>
                    <tooltip v-if="item.tooltip" :boundary-element="listContainer">{{ item.tooltip }}</tooltip>
                </div>
                <div v-else class="default-list__item-content">
                    <slot :item="item" name="group">
                        <div v-if="item.label" class="default-list__group">{{ item.label }}</div>
                    </slot>
                </div>
            </div>
        </template>

        <div v-if="hiddenHeight > 0" :style="{ height: `${hiddenHeight}px` }"></div>
    </div>
</template>

<script>
import DefaultListItem from './DefaultListItem.vue'
import Tooltip from './Tooltip.vue'
import { flatten } from './items_utils'

export default {
    components: {
        DefaultListItem,
        Tooltip,
    },
    props: {
        size: { type: String, default: 'normal' },
        items: { type: Array, required: true },
        value: { type: String },
        highlightQuery: { type: String },
        transitionSorting: { type: Boolean, default: false },
        noGroupRendering: { type: Boolean, default: false },
        listContainer: { type: HTMLElement, default: null },
        renderAllItems: { type: Boolean, default: true },
    },
    data () {
        return {
            activeId: null,
            renderAllItemsTimeout: false,
            canTransition: false,
            transitionItems: this.items,
        }
    },
    computed: {
        flatItems () {
            return flatten(this.transitionItems)
        },
        shownItems () {
            if (this.renderAllItems && this.renderAllItemsTimeout || this.flatItems.length <= this.minItemsCount) {
                return this.flatItems
            }
            return this.flatItems.slice(0, this.minItemsCount)
        },
        shownItemsWithData () {
            return this.shownItems.map(item => {
                let css = { marginLeft: `${this.getOffset(item)}px` }
                if (this.transitionSorting) {
                    css.height = `${item.isLeaf || this.noGroupRendering ? this.assumedItemHeight : this.assumedGroupHeight}px`
                }

                return {
                    ...item,
                    css: css,
                    modifiers: { leaf: item.isLeaf || this.noGroupRendering, active: item.id === this.activeId },
                }
            })
        },
        assumedItemHeight () {
            return this.size === 'condensed' ? 30 : 45
        },
        assumedGroupHeight () {
            return 30
        },
        hiddenHeight () {
            let total = 0
            for (let hiddenItem of this.flatItems.slice(this.shownItems.length)) {
                total += hiddenItem.isLeaf ? this.assumedItemHeight : this.assumedGroupHeight
            }

            return total
        },
    },
    watch: {
        items (v, ov) {
            const getCount = (items) => {
                let count = items.length
                for (let item of items) {
                    if (item.items)
                        count += getCount(item.items)
                }
                return count
            }

            const getDeltaCount = (a, b) => {
                const aKeys = a.map(x => x.key || x.id)
                const bKeys = b.map(x => x.key || x.id)
                const onlyA = a.filter(x => !bKeys.includes(x.key || x.id))
                const onlyB = b.filter(x => !aKeys.includes(x.key || x.id))
                const intersection = a.filter(x => bKeys.includes(x.key || x.id))

                let count = getCount(onlyA) + getCount(onlyB)
                for (let aItem of intersection) {
                    const bItem = b.find(item => (item.key || item.id) === (aItem.key || aItem.id))

                    if (aItem.items && bItem.items) {
                        count += getDeltaCount(aItem.items, bItem.items)
                    } else if (aItem.items) {
                        count += getCount(aItem.items)
                    } else if (bItem.items) {
                        count += getCount(bItem.items)
                    }
                }

                return count
            }

            this.canTransition = getDeltaCount(v, ov) <= 5
            this.$nextTick(() => {
                this.$emit('before-update')
                this.transitionItems = v
            })
        },
    },
    mounted () {
        setTimeout(() => {
            this.renderAllItemsTimeout = true
        }, 100)
    },
    beforeCreate () {
        this.minItemsCount = 50
    },
    methods: {
        selectItem (itemId) {
            if (itemId) {
                const item = this.flatItems.find(x => x.id == itemId)
                if (item && !item.disabled && item.isLeaf) {
                    this.$emit('select', item)
                }
            }
        },
        move (direction) {
            const flatLeafItems = this.flatItems.filter(x => x.isLeaf)
            if (flatLeafItems.length === 0) {
                return
            }

            const findId = this.activeId || this.value
            let activeIndex = flatLeafItems.indexOf(flatLeafItems.find(x => x.id === findId))
            activeIndex += direction
            if (activeIndex > flatLeafItems.length - 1) {
                activeIndex = 0
            } else if (activeIndex < 0) {
                activeIndex = flatLeafItems.length - 1
            }

            this.activeId = flatLeafItems[activeIndex].id

            this.$emit('activate', this.activeId)
            this.$el.focus()
        },
        getOffset ({ depth, isLeaf }) {
            if (depth === 0) {
                return 0
            }

            const offset = 20
            if (this.areGroupsSelectable) {
                return depth * offset
            } else {
                if (isLeaf && !this.noGroupRendering) {
                    return (depth - 1) * offset
                } else {
                    return depth * offset
                }
            }
        },
    },
}
</script>

<style lang="less" scoped>
@import (reference) './variables';

* {
    box-sizing: border-box;
}

.default-list {
    outline: none;
    width: 100%;

    &__item {
        padding: 0px 15px;
        width: 100%;
        display: flex;
        align-items: center;

        &:hover {
            position: relative;
        }

        &--active, &--leaf:hover {
            background-color: @very-light-gray;
        }

        &-enter-active, &-leave-active, &-move {
            transition: all 250ms ease-out;
            pointer-events: none;
        }

        &-enter, &-leave-to {
            height: 0 !important;
            opacity: 0;
        }
    }

    &__item-content {
        width: 100%;
        height: 100%;
    }

    &__group {
        height: 30px;
        padding-top: 10px;
        display: flex;
        align-items: center;
        font-size: 11px;
        letter-spacing: 0.5px;
        font-family: @regular-text-font;
        color: @gray-blue;
    }
}
</style>
