<template>
    <div class="date-range-input">
        <date-input
            :theme="theme"
            :size="size"
            :value="value && value.from"
            :min-date="minDate"
            :max-date="maxDate"
            :date-format="dateFormat"
            :date-format-focus="dateFormatFocus"
            label="Start date"
            @input="onFromInput"
            @keyup="$emit('keyup', $event)">
        </date-input>

        <div class="date-range-input__dash">―</div>

        <date-input
            :theme="theme"
            :size="size"
            :value="value && value.to"
            :min-date="minDate"
            :max-date="maxDate"
            :date-format="dateFormat"
            :date-format-focus="dateFormatFocus"
            label="End date"
            @input="onToInput"
            @keyup="$emit('keyup', $event)">
        </date-input>
    </div>
</template>

<script>
import DateInput from './DateInput.vue'

export default {
    components: {
        DateInput,
    },
    props: {
        theme: { type: String, default: 'dark' },
        size: { type: String, default: 'normal' },
        value: { type: Object },
        minDate: { type: Date },
        maxDate: { type: Date },
        dateFormat: { type: String },
        dateFormatFocus: { type: String, required: false },
    },
    methods: {
        onFromInput (value) {
            this.$emit('input', { from: value, to: this.value && this.value.to })
        },
        onToInput (value) {
            this.$emit('input', { from: this.value && this.value.from, to: value })
        },
    },
}
</script>

<style lang="less" scoped>
.date-range-input {
    display: flex;
    min-width: 475px;

    &__dash {
        margin: 17px 20px 0px 20px;
    }
}
</style>
