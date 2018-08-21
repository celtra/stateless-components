<template>
    <div class="calendar" tabindex="0" @click="focus" @focus="focus">
        <div class="calendar__header">
            <icon name="left-arrow" class="calendar__navigation-icon" @click="previousMonth()"></icon>
            <div class="calendar__current">{{ monthNames[month - 1] }} {{ year }}</div>
            <icon name="right-arrow" class="calendar__navigation-icon" @click="nextMonth()"></icon>
        </div>

        <div class="calendar__wrap">
            <div class="calendar__week-header">
                <div v-for="name in dayNames" :key="name" class="calendar__day-header">{{ name }}</div>
            </div>
            <div class="calendar__month-wrap">
                <transition :name="transitionName" @before-leave="isAnimating = true" @after-enter="animationDone()">
                    <div :key="`${year}-${month}`" class="calendar__month">
                        <div v-for="(week, index) in weeks" :key="index" class="calendar__week">
                            <div
                                v-for="(day, index) in week"
                                :class="getDayModifiers(day) | prefix('calendar__day--')"
                                :key="index"
                                class="calendar__day"
                                @mouseover="hoverDay(day)"
                                @mouseout="hoverDate = null"
                                @click="day && !day.isDisabled && select(day)">
                                <template v-if="day">{{ day.number }}</template>
                                <template v-else>&nbsp;</template>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import Icon from './icon.vue'
import { compareDate } from './date_utils'

export default {
    components: { Icon },
    props: {
        theme: { type: String, default: 'normal' },
        size: { type: String, default: 'normal' },
        value: { type: [Date, Object] },
        isRange: { type: Boolean, default: false },
        minDate: { type: Date },
        maxDate: { type: Date },
        selectAllTime: { type: Boolean, default: false },
    },
    data () {
        return {
            year: 0,
            month: 1,
            hoverDate: null,
            transitionName: 'next-month',
            isAnimating: false,
        }
    },
    computed: {
        days () {
            let numDaysInMonth = new Date(this.year, this.month, 0).getDate()

            let dates = []

            let firstDay = new Date(this.year, this.month - 1, 1)
            let numPreviousMonth = firstDay.getDay()

            for (let i = -numPreviousMonth; i < 6 * 7; i++) {
                dates.push(new Date(this.year, this.month - 1, i + 1))
            }

            return dates.map(date => {
                let isCurrent = false
                let isInRange = false
                if (this.value) {
                    if (this.isRange) {
                        isCurrent = this.value.from && compareDate(this.value.from, date) === 0 || this.value.to && compareDate(this.value.to, date) === 0

                        if (this.value.from && (this.value.to || this.hoverDate)) {
                            let fromDate = this.value.from
                            let toDate = this.value.to ? this.value.to : this.hoverDate
                            if (fromDate > toDate) {
                                [fromDate, toDate] = [toDate, fromDate]
                            }
                            isInRange = compareDate(fromDate, date) < 0 && compareDate(toDate, date) > 0
                        }
                    } else {
                        isCurrent = compareDate(this.value, date) === 0
                    }
                }

                return {
                    date: date,
                    number: date.getDate(),
                    isCurrent: this.selectAllTime ? false : isCurrent,
                    isInRange: this.selectAllTime ? true : isInRange,
                    isDisabled: !this.isDateValid(date),
                    isDifferentMonth: date.getMonth() !== this.month - 1,
                }
            })
        },
        weeks () {
            let weeks = []
            for (let i = 0; i < 6; i++) {
                weeks.push(this.days.slice(i * 7, (i + 1) * 7))
            }
            return weeks
        },
    },
    watch: {
        value () {
            this.goToCurrentValue()
        },
    },
    created () {
        this.dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        this.monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

        this.goToCurrentValue()
    },
    mounted () {
        this.$el.addEventListener('keyup', this.onKeyUp)
        this.$el.addEventListener('keydown', this.onKeyDown)
    },
    beforeDestroy () {
        this.$el.removeEventListener('keyup', this.onKeyUp)
        this.$el.removeEventListener('keydown', this.onKeyDown)
    },
    methods: {
        isDateValid (date) {
            return (!this.minDate || compareDate(date, this.minDate) >= 0) && (!this.maxDate || compareDate(date, this.maxDate) <= 0)
        },
        getDayModifiers (day) {
            return {
                hover: this.hoverDate && compareDate(day.date, this.hoverDate) === 0,
                current: day.isCurrent,
                disabled: day.isDisabled,
                'different-month': day.isDifferentMonth,
                'in-range': day.isInRange,
            }
        },
        hoverDay (day) {
            if (!day.isDisabled && !this.isAnimating) {
                this.hoverDate = day.date
            }
        },
        animationDone () {
            if (this.animationDoneTimeoutId) {
                clearTimeout(this.animationDoneTimeoutId)
            }

            this.animationDoneTimeoutId = setTimeout(() => {
                this.isAnimating = false
            }, 100)
        },
        focus () {
            this.$root.$emit('tracking-event', { type: 'action', label: 'calendar', trigger: 'click' })
            this.$emit('focus')
        },
        select (day) {
            if (this.isRange) {
                if (!this.value || !this.value.from || this.value.to) {
                    this.$emit('input', { from: day.date })
                } else {
                    if (compareDate(day.date, this.value.from) > 0) {
                        this.$emit('input', { from: this.value.from, to: day.date })
                    } else {
                        this.$emit('input', { from: day.date, to: this.value.from })
                    }
                }
            } else {
                this.$emit('input', day.date)
            }
        },
        previousMonth () {
            this.transitionName = 'previous-month'
            this.month--
            if (this.month === 0) {
                this.year -= 1
                this.month = 12
            }
        },
        nextMonth (direction) {
            this.transitionName = 'next-month'
            this.month ++
            if (this.month === 13) {
                this.year += 1
                this.month = 1
            }
        },
        goToCurrentValue () {
            let date = this.isRange ? this.value && (this.value.to || this.value.from) : this.value
            if (!date) {
                date = new Date()
            }

            let targetYear = date.getFullYear()
            let targetMonth = date.getMonth() + 1

            if (this.year < targetYear) {
                this.transitionName = 'next-month'
            } else if (this.year > targetYear) {
                this.transitionName = 'previous-month'
            } else {
                if (this.month < targetMonth) {
                    this.transitionName = 'next-month'
                } else {
                    this.transitionName = 'previous-month'
                }
            }

            this.year = targetYear
            this.month = targetMonth
        },
        onKeyDown (e) {
            let deltaByKeyCode = {
                37: -1,
                38: -7,
                39: 1,
                40: 7,
            }
            let delta = deltaByKeyCode[e.keyCode]
            let addDaysToDate = (date) => {
                return new Date(date.getFullYear(), date.getMonth(), date.getDate() + delta)
            }

            if (this.isRange) {
                if (delta) {
                    if (!this.value || !this.value.from) {
                        this.setValue({ from: new Date() })
                    } else if (!this.value.to) {
                        let date = addDaysToDate(this.value.from, delta)
                        if (this.isDateValid(date)) {
                            this.setValue({ from: date })
                        }
                    } else {
                        let date = addDaysToDate(this.value.to)
                        if (this.isDateValid(date)) {
                            this.setValue({ from: this.value.from, to: date })
                        }
                    }
                }
            } else {
                if (delta) {
                    let date = this.value ? addDaysToDate(this.value) : new Date()
                    if (this.isDateValid(date)) {
                        this.setValue(date)
                    }
                }
            }
        },
        onKeyUp (e) {
            if (this.isRange) {
                if (e.keyCode == 13) {
                    if (this.value && this.value.from && !this.value.to) {
                        this.setValue({ from: this.value.from, to: this.value.from })
                        e.preventDefault()
                        e.stopPropagation()
                    }
                } else if (e.keyCode === 27) {
                    if (this.value && this.value.from) {
                        this.setValue(this.value && this.value.from && this.value.to ? { from: this.value.from } : null)
                        e.preventDefault()
                        e.stopPropagation()
                    }
                }
            } else {
                if (e.keyCode === 27) {
                    if (this.value) {
                        this.setValue(null)
                        e.preventDefault()
                        e.stopPropagation()
                    }
                }
            }
        },
        setValue (value) {
            this.hoverDate = null
            this.$emit('input', value)
            this.$nextTick(this.goToCurrentValue)
        },
    },
}
</script>

<style lang="less" scoped>
@import (reference) './variables';

@day-size: 46px;
@width: @day-size * 7;

.calendar {
    width: @width;
    background-color: white;
    outline: none;
    font-family: @regular-text-font;

    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 290px;
        margin: 0 auto;
        margin-bottom: 18px;
    }

    &__current {
        font-family: @medium-text-font;
        font-size: 18px;
        user-select: none;
        color: @gunpowder;
    }

    &__navigation-icon {
        color: @gunpowder;
        cursor: pointer;
    }

    &__wrap {
        display: flex;
        flex-direction: column;
    }

    &__week-header {
        width: 100%;
    }

    &__day-header {
        width: @day-size;
        display: inline-block;
        text-align: center;
        height: 26px;
        line-height: 26px;
        color: @bluish-gray;
        user-select: none;
        font-size: 12px;
    }

    &__month-wrap {
        clip-path: inset(0px 0px 0px 0px);
        position: relative;
        height: @day-size * 6;
    }

    &__month {
        position: absolute;
        top: 0;
    }

    &__week {
        width: 100%;
    }

    &__day {
        cursor: pointer;
        width: @day-size;
        height: @day-size;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        font-size: 15px;
        color: @gunpowder;
        background-color: white;
        text-align: center;
        transition: all 150ms ease;
        user-select: none;
        border: 2px solid transparent;
        box-sizing: border-box;

        &--different-month {
            color: fade(@gunpowder, 60%);
        }

        &--in-range {
            color: white;
            background-color: fade(@royal-blue, 60%);
        }

        &--hover {
            border-color: @royal-blue;
        }

        &--current {
            color: white;
            background-color: @royal-blue;
        }

        &--disabled {
            color: fade(@gunpowder, 20%);
            cursor: not-allowed;
        }

        &--disabled&&--current {
            color: fade(@white, 80%);
             background-color: fade(@royal-blue, 80%);
        }
    }
}

@step-animation-time: 500ms;

.next-month-leave-active     { animation: next-month-leave-animation @step-animation-time ease; }
.next-month-enter-active     { animation: next-month-enter-animation @step-animation-time ease; }
.previous-month-leave-active { animation: previous-month-leave-animation @step-animation-time ease; }
.previous-month-enter-active { animation: previous-month-enter-animation @step-animation-time ease; }

@keyframes next-month-leave-animation {
    0% {
        transform: translate3d(0, 0, 0);
        opacity: 1;
    }
    100% {
        transform: translate3d(-@width, 0, 0);
        opacity: 0;
    }
}

@keyframes next-month-enter-animation {
    0% {
        transform: translate3d(@width, 0, 0);
        opacity: 0;
    }

    100% {
        transform: translate3d(0, 0, 0);
        opacity: 1;
    }
}

@keyframes previous-month-leave-animation {
    from {
        transform: translate3d(0, 0, 0);
        opacity: 1;
    }
    to {
        transform: translate3d(@width, 0, 0);
        opacity: 0;
    }
}

@keyframes previous-month-enter-animation {
    from {
        transform: translate3d(-@width, 0, 0);
        opacity: 0;
    }
    to {
        transform: translate3d(0, 0, 0);
        opacity: 1;
    }
}
</style>
