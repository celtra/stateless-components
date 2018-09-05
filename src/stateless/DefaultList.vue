<template>
    <div :class="[theme, size] | prefix('default-list--')" class="default-list" tabindex="0" @focus="onFocus" @blur="onBlur" @keydown.up.prevent.stop="move(-1)" @keydown.down.prevent.stop="move(1)" @keyup.enter.stop="selectItem(activeId)" @keyup.space.stop="selectItem(activeId)" @keyup.esc.stop="blur" @mouseenter="isHovered = true" @mouseleave="isHovered = false">
        <transition-group :name="transitionSorting && canTransition ? 'default-list__item' : 'no-transition'" tag="div">
            <div v-for="item in shownItemsWithData" :key="item.key" :data-item-id="item.key || item.id" :style="item.css" :class="item.modifiers | prefix('default-list__item--')" class="default-list__item" @click="selectItem(item.id)" @mouseenter="onItemHover($event, item)">
                <div v-if="item.isLeaf || noGroupRendering" :class="item.modifiers | prefix('default-list__item-content--')" class="default-list__item-content">
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

        <div class="default-list__hidden-slots">
            <div ref="hiddenSlot">
                <slot :item="assumedItem">
                    <default-list-item :size="size" v-bind="assumedItem" />
                </slot>
            </div>
            <div ref="hiddenGroupSlot">
                <slot :item="assumedItem" name="group">
                    <div class="default-list__group">{{ assumedItem.label }}</div>
                </slot>
            </div>
        </div>

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
        theme: { type: String, default: 'dark' },
        items: { type: Array, required: true },
        value: { type: String },
        highlightQuery: { type: String },
        transitionSorting: { type: Boolean, default: false },
        noGroupRendering: { type: Boolean, default: false },
        listContainer: { type: HTMLElement, default: null },
        renderAllItems: { type: Boolean, default: true },
        setActiveOnHover: { type: Boolean, default: true },
    },
    data () {
        return {
            isFocused: false,
            isHovered: false,
            activeId: null,
            renderAllItemsTimeout: false,
            canTransition: false,
            transitionItems: this.items,
            itemHeight: null,
            groupHeight: null,
        }
    },
    computed: {
        flatItems () {
            return flatten(this.transitionItems)
        },
        flatSelectableItems () {
            return this.flatItems.filter(x => x.isLeaf && !x.disabled)
        },
        shownItems () {
            if (this.renderAllItems && this.renderAllItemsTimeout || this.flatItems.length <= this.minItemsCount) {
                return this.flatItems
            }
            return this.flatItems.slice(0, this.minItemsCount)
        },
        shownItemsWithData () {
            let activeId = this.isFocused || (this.setActiveOnHover && this.isHovered) ? this.activeId : null

            return this.shownItems.map(item => {
                let css = { marginLeft: `${this.getOffset(item)}px` }
                if (this.transitionSorting) {
                    css.height = `${item.isLeaf || this.noGroupRendering ? this.assumedItemHeight : this.assumedGroupHeight}px`
                }

                return {
                    ...item,
                    css: css,
                    modifiers: { leaf: item.isLeaf || this.noGroupRendering, active: (item.key || item.id) === activeId, 'with-tooltip': !!item.tooltip },
                }
            })
        },
        assumedItemHeight () {
            return this.itemHeight || 30
        },
        assumedGroupHeight () {
            return this.groupHeight || 30
        },
        hiddenHeight () {
            let total = 0
            for (let hiddenItem of this.flatItems.slice(this.shownItems.length)) {
                total += hiddenItem.isLeaf ? this.assumedItemHeight : this.assumedGroupHeight
            }
            return total
        },
        maxHeight () {
            let total = 0
            for (let item of this.flatItems) {
                total += item.isLeaf ? this.assumedItemHeight : this.assumedGroupHeight
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
        this.$nextTick(() => {
            this.itemHeight = this.$refs.hiddenSlot.clientHeight
            this.groupHeight = this.$refs.hiddenGroupSlot.clientHeight
        })
    },
    beforeCreate () {
        this.minItemsCount = 50
        this.assumedItem = { label: 'A', metadata: 'A' }
    },
    methods: {
        onFocus (ev) {
            if (!this.isFocused) {
                this.isFocused = true
                if (this.flatSelectableItems.length > 0) {
                    let activeItem = this.flatSelectableItems[0]
                    if (this.value) {
                        let currentItem = this.flatSelectableItems.find(x => x.id === this.value)
                        if (currentItem) {
                            activeItem = currentItem
                        }
                    }
                    this.activeId = activeItem.key || activeItem.id
                }
            }
        },
        onBlur (ev) {
            if (!this.$el.contains(ev.relatedTarget)) {
                this.isFocused = false
                this.$emit('blur', ev)
            }
        },
        blur () {
            this.$el.blur()
        },
        selectItem (itemId) {
            if (itemId) {
                const item = this.flatItems.find(x => x.key === itemId || x.id === itemId)
                if (item && !item.disabled && item.isLeaf) {
                    this.isFocused = true
                    this.activeId = item.key || item.id
                    this.$emit('select', item)
                }
            }
        },
        onItemHover (ev, item) {
            if (this.setActiveOnHover && item.isLeaf && (ev.movementX !== 0 || ev.movementY !== 0)) {
                this.activeId = item.key || item.id
            }
        },
        focus () {
            this.$el.focus()
        },
        move (direction) {
            if (this.flatSelectableItems.length === 0) {
                return
            }

            const findId = this.activeId || this.value
            let activeIndex = this.flatSelectableItems.findIndex(x => x.key === findId || x.key === 'S_' + findId || x.id === findId)
            activeIndex += direction
            if (activeIndex > this.flatSelectableItems.length - 1) {
                activeIndex = 0
            } else if (activeIndex < 0) {
                activeIndex = this.flatSelectableItems.length - 1
            }
            let nextItem = this.flatSelectableItems[activeIndex]

            this.activeId = (nextItem.key || nextItem.id)

            this.$emit('activate', nextItem.key || nextItem.id)
        },
        highlightItem (index) {
            // This is only used in Typeahead to fake highlight first item and select it on enter
            this.isFocused = true
            let item = this.flatItems[index]
            if (item) {
                this.activeId = (item.key || item.id)
                this.$emit('activate', item.key || item.id)
            }
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
@import (reference) './common';

* {
    box-sizing: border-box;
}

.default-list {
    outline: none;
    width: 100%;

    &__hidden-slots {
        visibility: hidden;
        position: absolute;
    }

    &__item {
        padding: 0px 15px;
        width: 100%;
        display: flex;
        align-items: center;
        transition: background-color 100ms ease;

        &-enter-active, &-leave-active, &-move {
            transition: background-color 100ms ease, height 250ms ease-out, opacity 250ms ease-out;
            transition-delay: 350ms;
            pointer-events: none;
        }

        &-enter, &-leave-to {
            height: 0 !important;
            opacity: 0;
        }

        &:first-child {
            .default-list__group {
                padding-top: 0;
            }
        }
    }

    &__item-content {
        width: 100%;
        height: 100%;
        display: flex;

        &--with-tooltip:hover {
            // position: relative;
        }
    }

    &__group {
        padding-top: 10px;
        display: flex;
        align-items: center;
        font-size: 11px;
        letter-spacing: 0.5px;
        font-family: @regular-text-font;
        color: @gray-blue;
    }
}

.default-list--dark {
    .default-list__item--active {
        background-color: @very-dark-gray;
    }
}

.default-list--light {
    .default-list__item--active {
        background-color: @very-light-gray;
    }
}

.default-list--condensed {
    .default-list__group {
        height: 20px;
    }
}

.default-list--normal {
    .default-list__group {
        height: 30px;
    }
}

.default-list--phat {
    .default-list__group {
        height: 30px;
    }
}
</style>
