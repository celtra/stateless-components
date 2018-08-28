<template>
    <div v-click-outside="close" class="typeahead">
        <input-element ref="input" v-bind="inputData" :error="inputError" class="typeahead__input" @keyup.down="$refs.list && $refs.list.focus()" @focus="onInputFocus" @input="onInput" @blur="onBlur"></input-element>

        <template v-if="isOpen && (isValueValid || suggestions.length > 0) && !(value === null || typeof value === 'string' && value.length <= 2)">
            <scrollable-list v-if="suggestions.length > 0" ref="list" :items="suggestions" :num-items="10" :highlight-query="value" class="typeahead__suggestions" theme="light" @select="onSelect" @blur="onBlur"/>
            <div v-else-if="noItemsText" class="typeahead__no-items-text">{{ noItemsText }}</div>
        </template>
    </div>
</template>

<script>
import Input from './input.vue'
import ScrollableList from './ScrollableList.vue'

export default {
    components: {
        inputElement: Input,
        ScrollableList,
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
        focus () {
            this.$refs.input.focus()
        },
        onInputFocus () {
            this.isOpen = true
            this.$emit('focus')
        },
        close () {
            this.isOpen = false
            this.$emit('blur')
        },
        onBlur (ev) {
            if (!this.$el.contains(ev.relatedTarget)) {
                this.close()
            }
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
@import (reference) './common';
.typeahead {
    position: relative;

    &__suggestions {
        position: absolute;
        margin-top: -7px;
        background-color: white;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
        padding: 15px 0px;
        z-index: @z-heaven;
    }

    &__no-items-text {
        position: absolute;
        margin-top: -7px;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
        padding: 20px;
        width: 100%;
        box-sizing: border-box;
        background: white;
        font-size: 16px;
    }
}
</style>
