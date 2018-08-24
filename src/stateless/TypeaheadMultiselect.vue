<template>
    <div class="typeahead-multiselect">
        <typeahead ref="typeahead" v-model="text" :get-suggestions="getAvailableSuggestions" :no-items-text="noItemsText" :label="label" :is-valid="isValid" :theme="theme" @select="selectItem"></typeahead>

        <div :style="{ maxHeight: `${numItems * 35}px` }" class="typeahead-multiselect__item-list">
            <div v-for="item in value" :key="item.id" class="typeahead-multiselect__item">
                <div class="typeahead-multiselect__item-label">{{ item.label }}</div>
                <div class="typeahead-multiselect__item-metadata">
                    <span class="typeahead-multiselect__item-metadata-text">{{ item.metadata }}</span>
                    <icon name="remove" class="typeahead-multiselect__item-remove" @click="removeItem(item)" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Icon from './icon.vue'
import Typeahead from './Typeahead.vue'

export default {
    components: {
        Icon,
        Typeahead,
    },
    props: {
        label: { type: String, required: true },
        value: { type: Array, required: true },
        getSuggestions: { type: Function, required: true },
        noItemsText: { type: String, default: 'No items' },
        theme: { type: String, default: 'dark' },
        isValid: { type: Function, required: false },
        numItems: { type: Number, default: 8 },
    },
    data () {
        return {
            text: '',
        }
    },
    methods: {
        selectItem (item) {
            this.$emit('input', this.value.concat([item]))
            this.text = ''
            this.$refs.typeahead.focus()
        },
        removeItem (item) {
            this.$emit('input', this.value.filter(x => x.id !== item.id))
        },
        getAvailableSuggestions (v) {
            const suggestions = this.getSuggestions(v)
            const ids = this.value.map(x => x.id)
            return suggestions.filter(x => !ids.includes(x.id))
        },
    },
}
</script>

<style lang="less" scoped>
@import (reference) './variables';
.typeahead-multiselect {
    &__item-list {
        overflow-y: auto;
    }

    &__item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 15px;
        height: 20px;
    }

    &__item-label {
        font-size: 14px;
        color: @gunpowder;
    }

    &__item-metadata {
        display: flex;
        align-items: center;
    }

    &__item-metadata-text {
        font-size: 14px;
        color: @bluish-gray;
    }

    &__item-remove {
        margin-left: 5px;
        cursor: pointer;
        color: @gunpowder;
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
