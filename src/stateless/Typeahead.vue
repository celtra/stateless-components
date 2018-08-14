<template>
    <div v-click-outside="close" class="typeahead" @keyup.up="move(-1)" @keyup.down="move(1)">
        <input-element v-bind="inputData" :error="inputError" class="typeahead__input" @focus="open" @input="onInput" @blur="close"></input-element>

        <template v-if="isOpen && (isValueValid || suggestions.length > 0)">
            <default-list v-if="suggestions.length > 0" ref="list" :items="suggestions" :highlight-query="value" class="typeahead__suggestions" @select="onSelect"/>
            <div v-else-if="noItemsText" class="typeahead__no-items-text">{{ noItemsText }}</div>
        </template>
    </div>
</template>

<script>
import Input from './input.vue'
import DefaultList from './DefaultList.vue'
import DefaultListItem from './DefaultListItem.vue'

export default {
    components: {
        inputElement: Input,
        DefaultList,
        DefaultListItem,
    },
    props: {
        value: { type: [String, Number], default: '' },
        getSuggestions: { type: Function, required: true },
        noItemsText: { type: String, default: 'No items' },
        isValid: { type: Function, required: false },
    },
    data () {
        return {
            isOpen: false,
        }
    },
    computed: {
        inputData () {
            return {
                ...this.$attrs,
                value: this.value,
                error: null,
            }
        },
        suggestions () {
            return this.getSuggestions(this.value)
        },
        inputError () {
            if (this.isOpen || !this.isValid) {
                return null
            }
            return this.isValid(this.value)
        },
        isValueValid () {
            return this.isValid ? this.isValid(this.value) === null : true
        },
    },
    methods: {
        open () {
            this.isOpen = true
            this.$emit('focus')
        },
        close () {
            this.isOpen = false
            this.$emit('blur')
        },
        onInput (v) {
            this.isOpen = true
            this.$emit('input', v)
        },
        onSelect (suggestion) {
            this.$emit('input', suggestion.label)
            this.$emit('select', suggestion)
            this.close()
        },
        move (delta) {
            if (!this.isOpen) {
                this.isOpen = true
            } else {
                this.$refs.list.$el.focus()
                this.$refs.list.move(delta)
            }
        },
    },
}
</script>

<style lang="less" scoped>
@import (reference) './variables';
.typeahead {
    position: relative;

    &__suggestions {
        position: absolute;
        margin-top: -7px;
        background-color: #FFFFFF;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
        padding: 15px 0px;
    }

    &__no-items-text {
        position: absolute;
        margin-top: -7px;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
        padding: 20px;
        width: calc(~'100% - 2 * 20px');
        background: #FFFFFF;
        font-size: 16px;
    }
}
</style>
