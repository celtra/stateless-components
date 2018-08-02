<template>
    <div class="typeahead-multiselect">
        <typeahead v-model="text" :get-suggestions="getAvailableSuggestions" :no-items-text="noItemsText" :label="label" :close-on-select="false" :is-valid="isValid" :theme="theme" @select="selectItem"></typeahead>

        <div v-for="item in value" :key="item.id" class="typeahead-multiselect__item">
            <div class="typeahead-multiselect__item-label">{{ item.label }}</div>
            <div class="typeahead-multiselect__item-metadata">
                <span>{{ item.metadata }}</span>
                <icon name="remove" class="typeahead-multiselect__item-remove" @click="removeItem(item)" />
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
        theme: { type: String, default: 'light' },
        isValid: { type: Function, required: false },
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
        },
        removeItem (item) {
            this.$emit('input', this.value.filter(x => x.id !== item.id))
        },
        getAvailableSuggestions (v) {
            let suggestions = this.getSuggestions(v)
            let ids = this.value.map(x => x.id)
            return suggestions.filter(x => !ids.includes(x.id))
        },
    },
}
</script>

<style lang="less" scoped>
.typeahead-multiselect {
    &__item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 15px;
    }

    &__item-label {
        font-size: 15px;
    }

    &__item-metadata {
        display: flex;
        align-items: center;

        > span {
            font-size: 12px;
            color: #aaa;
        }
    }

    &__item-remove {
        margin-left: 10px;
        cursor: pointer;
    }
}
</style>
