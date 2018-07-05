<template>
    <div class="default-list" tabindex="0" @keyup.up.prevent.stop="move(-1)" @keyup.down.prevent.stop="move(1)" @keyup.enter.stop="selectItem(activeId)">
        <transition-group v-if="transitionSorting" name="default-list__item" tag="div">
            <div v-for="item in flatItems" :key="item.key" :data-item-id="item.id" :style="{ marginLeft: `${getOffset(item)}px` }" :class="{ leaf: item.isLeaf || noGroupRendering, active: item.id === activeId } | prefix('default-list__item--')" class="default-list__item" @click="selectItem(item.id)">
                <template v-if="item.isLeaf || noGroupRendering">
                    <slot :item="item">
                        <default-list-item v-bind="item" :selected="item.id === value" :highlight-query="highlightQuery" :size="size" theme="light" />
                    </slot>
                </template>
                <template v-else>
                    <slot :item="item" name="group">
                        <div v-if="item.label" class="default-list__group">{{ item.label }}</div>
                    </slot>
                </template>
            </div>
        </transition-group>
        <template v-else>
            <div v-for="item in flatItems" :key="item.key" :data-item-id="item.id" :style="{ marginLeft: `${getOffset(item)}px` }" :class="{ leaf: item.isLeaf || noGroupRendering, active: item.id === activeId } | prefix('default-list__item--')" class="default-list__item" @click="selectItem(item.id)">
                <template v-if="item.isLeaf || noGroupRendering">
                    <slot :item="item">
                        <default-list-item v-bind="item" :selected="item.id === value" :highlight-query="highlightQuery" :size="size" theme="light" />
                    </slot>
                </template>
                <template v-else>
                    <slot :item="item" name="group">
                        <div v-if="item.label" class="default-list__group">{{ item.label }}</div>
                    </slot>
                </template>
            </div>
        </template>
    </div>
</template>

<script>
import DefaultListItem from './DefaultListItem.vue'
import { flatten } from './items_utils'

export default {
    components: {
        DefaultListItem,
    },
    props: {
        size: { type: String, default: 'normal' },
        items: { type: Array, required: true },
        value: { type: String },
        highlightQuery: { type: String },
        transitionSorting: { type: Boolean, default: false },
        noGroupRendering: { type: Boolean, default: false },
    },
    data () {
        return {
            activeId: null,
        }
    },
    computed: {
        flatItems () {
            return flatten(this.items)
        },
    },
    methods: {
        selectItem (itemId) {
            if (itemId) {
                let item = this.flatItems.find(x => x.id == itemId)
                if (item && !item.disabled && item.isLeaf) {
                    this.$emit('select', item)
                }
            }
        },
        move (direction) {
            let flatLeafItems = this.flatItems.filter(x => x.isLeaf)
            if (flatLeafItems.length === 0){
                return
            }

            let findId = this.activeId || this.value
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

            let offset = 20
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
        transition: transform 0.3s ease-in, background-color @form-element-transition-time ease-in-out;

        &--active {
            background-color: @very-light-gray;
        }

        &--leaf {
            &:hover {
                background-color: @very-light-gray;
            }
        }

        &-enter-active, &-leave-active, &-enter, &-leave-to {
            display: none;
        }
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
