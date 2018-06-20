<template>
    <div v-click-outside="clickOutside" class="date-picker">
        <div v-if="label" class="date-picker__label">{{ isEmpty ? '' : label }}</div>
        <div class="date-picker__date" @click="isOpen = true">{{ formattedDate }}</div>

        <div v-if="isOpen" class="date-picker__popup">
            <template v-if="hasInput">
                <date-range-input
                    v-if="isRange"
                    :theme="theme"
                    :size="size"
                    :value="value"
                    :min-date="minDate"
                    :max-date="maxDate"
                    class="date-picker__date-input"
                    @input="setValue">
                </date-range-input>
                <date-input
                    v-else
                    :theme="theme"
                    :size="size"
                    :value="value"
                    :min-date="minDate"
                    :max-date="maxDate"
                    :label="label"
                    class="date-picker__date-input"
                    @input="setValue">
                </date-input>
            </template>

            <calendar
                :theme="theme"
                :size="size"
                :value="value"
                :is-range="isRange"
                :min-date="minDate"
                :max-date="maxDate"
                class="date-picker__calendar"
                @input="setValue"
            ></calendar>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import Calendar from './Calendar.vue'
import DateInput from './DateInput.vue'
import DateRangeInput from './DateRangeInput.vue'

export default {
    components: {
        Calendar,
        DateInput,
        DateRangeInput,
    },
    props: {
        theme: { type: String, default: 'normal' },
        size: { type: String, default: 'normal' },
        label: { type: String },
        value: { type: [Date, Object] },
        isRange: { type: Boolean, default: false },
        minDate: { type: Date },
        maxDate: { type: Date },
        hasInput: { type: Boolean, default: true },
    },
    data () {
        return {
            isOpen: false,
        }
    },
    computed: {
        isEmpty () {
            if (this.isRange) {
                return !(this.value && this.value.from && this.value.to)
            }
            return !this.value
        },
        formattedDate () {
            if (this.isEmpty) {
                return this.label || (this.isRange ? 'Set date range' : 'Set date')
            }

            if (this.isRange) {
                let from = this.value && this.value.from ? moment(this.value.from).format('MMMM Do, YYYY') : '?'
                let to = this.value && this.value.to ? moment(this.value.to).format('MMMM Do, YYYY') : '?'
                return `${from} - ${to}`
            }

            return this.value ? moment(this.value).format('MMMM Do, YYYY') : '?'
        },
    },
    methods: {
        setValue (v) {
            this.$emit('input', v)
        },
        clickOutside () {
            this.isOpen = false
        },
    },
}
</script>

<style lang="less">
.date-picker {
    &__popup {
        .input-field__overlay {
            display: none;
        }

        .input-field__label-text {
            visibility: hidden;
        }
    }
}
</style>

<style lang="less" scoped>
@import (reference) './variables';

.date-picker {
    width: 100%;
    position: relative;
    font-family: @regular-text-font;

    &__label {
        color: @bluish-gray;
        font-size: 11px;
        letter-spacing: 0.5px;
        margin-bottom: 4px;
        min-height: 13px;
    }

    &__date {
        width: 100%;
        font-size: 18px;
        color: @gunpowder;
        border-bottom: 2px solid @very-light-gray;
        padding-bottom: 4px;
        cursor: pointer;
    }

    &__popup {
        position: absolute;
        top: -200px;
        left: -80px;
        background-color: white;
        padding: 30px 15px;
        box-shadow: 1px 2px 5px 0 rgba(0, 0, 0, 0.25);
    }

    &__date-input {
        margin-bottom: 30px;
    }

    &__calendar {
        margin: 0 auto;
    }
}
</style>
