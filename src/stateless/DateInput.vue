<template>
    <input-element
        :theme="theme"
        :size="size"
        :value="formattedValue"
        :label="label || 'Enter date'"
        :error="errorText"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur">
    </input-element>
</template>

<script>
import moment from 'moment'
import Input from './input.vue'
import { compareDate } from './date_utils'

export default {
    components: {
        inputElement: Input,
    },
    props: {
        theme: { type: String, default: 'normal' },
        size: { type: String, default: 'normal' },
        label: { type: String },
        value: { type: Date },
        minDate: { type: Date },
        maxDate: { type: Date },
    },
    data () {
        return {
            inFocus: false,
            textValue: null,
        }
    },
    computed: {
        formattedValue () {
            if (this.textValue)
                return this.textValue
            if (!this.value)
                return null
            if (this.inFocus)
                return moment(this.value).format('YYYY/MM/DD')
            return moment(this.value).format('MMMM Do, YYYY')
        },
        momentDate () {
            if (!this.textValue)
                return null
            return moment(this.textValue, 'YYYY/MM/DD')
        },
        errorText () {
            if (this.momentDate && this.inFocus) {
                if (!this.momentDate.isValid()) {
                    return 'Date is not valid'
                } else if (!this.isDateValid(this.momentDate.toDate())) {
                    return 'Date is not in specified range'
                }
            }
            return null
        },
    },
    methods: {
        isDateValid (date) {
            return (!this.minDate || compareDate(date, this.minDate) >= 0) && (!this.maxDate || compareDate(date, this.maxDate) <= 0)
        },
        onInput (value) {
            this.textValue = value

            if (this.momentDate && this.momentDate.isValid()) {
                let date = this.momentDate.toDate()
                if (this.isDateValid(date)) {
                    this.$emit('input', date)
                }
            } else {
                this.$emit('input', null)
            }
        },
        onFocus () {
            this.textValue = null
            this.inFocus = true
        },
        onBlur () {
            this.textValue = null
            this.inFocus = false
        },
    },
}
</script>

<style lang="less" scoped>

</style>
