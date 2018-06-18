<template>
    <div v-click-outside="onBlur" class="typeahead" @keyup.up="move(-1)" @keyup.down="move(1)">
        <input-element v-bind="inputData" class="typeahead__input" @focus="onFocus" @input="onInput"></input-element>

        <template v-if="isOpen">
            <default-list v-if="suggestions.length > 0" ref="list" :items="suggestions" :highlight-query="value" class="typeahead__suggestions" @select="onSelect" />
            <div v-else-if="noItemsText" class="typeahead__no-items-text">{{ noItemsText }}</div>
        </template>
    </div>
</template>

<script>
import Input from './input.vue'
import DefaultList from './DefaultList.vue'

export default {
    components: {
        inputElement: Input,
        DefaultList,
    },
    props: {
        value: { type: [String, Number], default: '' },
        getSuggestions: { type: Function, required: true },
        noItemsText: { type: String },
    },
    data () {
        return {
            isOpen: false,
        }
    },
    computed: {
        inputData () {
            return {
                ...this.$props,
                ...this.$attrs,
            }
        },
        suggestions () {
            return this.getSuggestions(this.value)
        },
    },
    methods: {
        onFocus () {
            this.isOpen = true
            this.$emit('focus')
        },
        onBlur () {
            this.isOpen = false
            this.$emit('blur')
        },
        onInput (v) {
            this.isOpen = true
            this.$emit('input', v)
        },
        onSelect (suggestion) {
            this.isOpen = false
            this.$emit('input', suggestion.label)
            this.$emit('select', suggestion)
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

<style lang="less">
.typeahead {
    &__input {
        .input-field__message-wrap.input-field__message-wrap {
            display: none;
        }
    }
}
</style>

<style lang="less" scoped>
@import (reference) './variables';

.typeahead {
    position: relative;

    &__suggestions {
        position: absolute;
        margin-top: 10px;
        background-color: #FFFFFF;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
        padding: 15px 0px;
    }

    &__no-items-text {
        position: absolute;
        margin-top: 10px;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
        padding: 20px;
        width: calc(~'100% - 2 * 20px');
        background: #FFFFFF;
        font-size: 16px;
    }
}
</style>
