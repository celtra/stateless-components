<template>
    <input-element ref="input" :value="value" :label="label" :theme="theme" :size="size" class="search-input" @keyup="$emit('keyup', $event)" @input="$emit('input', $event)">
        <icon slot="before" name="search" />
        <icon v-if="isLoading" slot="right" name="loading" class="spin" />
        <icon v-if="value && value.length > 0" slot="right" name="clear" class="search-input__clear-icon" @click="$emit('input', null)" />
    </input-element>
</template>

<script>
import InputElement from './input.vue'
import Icon from './icon.vue'

export default {
    components: {
        InputElement,
        Icon,
    },
    props: {
        value: { type: String, default: '' },
        label: { type: String, default: 'Search' },
        isLoading: { type: Boolean, default: false },
        size: { type: String, default: 'normal' },
        theme: { type: String, default: 'dark' },
    },
    methods: {
        focus () {
            this.$refs.input.focus()
        },
    },
}
</script>

<style lang="less" scoped>
.search-input {
    &__clear-icon {
        cursor: pointer;
        margin-left: 6px;
    }
}
</style>

<style lang="less">
.search-input.search-input {
    .input-field__message-wrap {
        display: none;
    }
}
</style>
