<template>
    <div :class="[theme, size] | prefix('slider--')" class="slider">
        <div class="slider__row">
            <div class="slider__label">
                {{ label }}
            </div>
        </div>

        <div class="slider__row">
            <div ref="bar" :class="{disabled: disabled, changed: isChanged, dragging: isDragging, 'dragging--left': draggingSide === 'left', 'dragging--right': draggingSide === 'right'} | prefix('slider-bar--')" class="slider-bar" tabindex="0" @keyup.left.stop @keyup.right.stop>
                <div class="slider-bar__container">
                    <div class="slider-ruler">
                        <div ref="min" :class="labelsActiveClass.min | prefix('slider-ruler__label--')" class="slider-ruler__label">{{ minLabelValue }}</div>

                        <div class="slider-ruler__ticks">
                            <div v-for="n in ticksCount" :class="tickClass(n) | prefix('slider-ruler__tick--')" :key="n" class="slider-ruler__tick"></div>
                        </div>

                        <div ref="max" :class="labelsActiveClass.max | prefix('slider-ruler__label--')" class="slider-ruler__label">{{ maxLabelValue }}</div>
                    </div>

                    <div class="slider-bar__rail">
                        <div class="slider-rail slider-rail--passive"></div>
                        <div :class="{'slider-rail--exceeds': limit && value > limitValue}" :style="railStyle" class="slider-rail slider-rail--active"></div>
                        <div :style="{left: `${position}px`}" class="slider-rail__handle slider-rail__handle--left" @mousedown="startDrag($event, 'left')">
                            <div class="slider-rail__handle-dot"></div>
                        </div>
                        <div v-if="valueRight" :style="{left: `${positionRight}px`}" class="slider-rail__handle slider-rail__handle--right" @mousedown="startDrag($event, 'right')">
                            <div class="slider-rail__handle-dot"></div>
                        </div>
                    </div>
                </div>

                <div class="slider-helper-text"></div>
            </div>
        </div>
    </div>
</template>

<script>
import Input from './input.vue'

export default {
    components: {
        inputElement: Input,
    },
    props: {
        min: { type: Number },
        max: { type: Number },
        step: { type: Number },
        valueArray: { type: Array },
        label: { type: String },
        theme: { type: String, default: 'dark' },
        size: { type: String, default: 'normal' },
        alignment: { type: String, default: 'left' },
        locale: { type: String, default: 'en-US' },
        limit: { type: Number, required: false },
        minLabel: { type: String, required: false },
        maxLabel: { type: String, required: false },
        unit: { type: String, required: false },
        disabled: { type: Boolean, default: false },
        trackName: { type: String, required: false },
    },
    data () {
        return {
            isDomReady: false,
            isChanged: false,
            isDragging: false,
            draggingSide: null,
        }
    },
    computed: {
        limitValue () {
            return this.limit || this.max
        },
        minLabelValue () {
            return this.minLabel || this.min.toLocaleString(this.locale)
        },
        maxLabelValue () {
            return this.maxLabel || this.limitValue.toString().toLocaleString(this.locale)
        },
        stepsCount () {
            return (this.limitValue - this.min) / this.step
        },
        railStyle () {
            if (this.valueRight) {
                return {
                    width: `${this.positionRight - this.position}px`,
                    left:  `${this.position}px`,
                }
            } else {
                return {
                    width: `${this.position}px`,
                }
            }
        },
        position () {
            const index = (this.value - this.min) / this.step
            return Math.max(0, Math.min(index, this.stepsCount)) / this.stepsCount * this.sliderWidth
        },
        positionRight () {
            if (this.valueRight) {
                const index = (this.valueRight - this.min) / this.step
                return Math.max(0, Math.min(index, this.stepsCount)) / this.stepsCount * this.sliderWidth
            }
            return null
        },
        sliderWidth () {
            return this.isDomReady ? this.$refs.bar.clientWidth : 0
        },
        decimalPlacesCount () {
            const decimals = this.step.toString().split('.')[1]
            return decimals ? decimals.length : 0
        },
        isWholeNumber () {
            return this.decimalPlacesCount === 0
        },
        lastActiveIndex () {
            const valueRatio = (this.value - this.min) / (this.limitValue - this.min)
            return valueRatio * (this.ticksCount - 1)
        },
        lastLastActiveIndex () {
            const valueRatio = (this.valueRight - this.min) / (this.limitValue - this.min)
            return valueRatio * (this.ticksCount - 1)
        },
        labelsActiveClass () {
            const isNormalSize = this.size === 'normal'
            return {
                min: { active: this.lastActiveIndex === 0 && isNormalSize },
                max: { active: this.lastLastActiveIndex >= this.ticksCount - 1 && isNormalSize },
            }
        },
        value () {
            return this.valueArray[0]
        },
        valueRight () {
            return this.valueArray[1]
        },
    },
    beforeCreate () {
        this.ticksCount = 20
    },
    created () {
        if (this.decimalPlacesCount > 1) {
            throw new Error('Max one decimal place is supported.')
        }

        const isStepValid = (this.max - this.min) / this.step % 1 === 0
        if (!isStepValid) {
            throw new Error('Difference between max and min is not divisible by step.')
        }

        const isValueValid = ((this.value - this.min) % this.step).toFixed(0) === '0'
        if (!isValueValid) {
            throw new Error('Value is not a valid step.')
        }

        if (this.value < this.min || this.value > this.max) {
            throw new Error('Value must be between min and max.')
        }

        this.decimalPrecision = 1
    },
    mounted () {
        this.isDomReady = true
    },
    methods: {
        startDrag (e, side) {
            if (this.disabled) {
                return
            }

            this.isChanged = true
            this.isDragging = true
            this.draggingSide = side

            this.setPosition(e)
            window.addEventListener('mouseup', this.stopDrag)
            window.addEventListener('mousemove', this.setPosition)
            this.$refs.bar.focus()
        },
        setPosition (e) {
            const sliderOffset = this.$refs.bar.getBoundingClientRect().x
            let ratio = (e.clientX - sliderOffset) / this.sliderWidth
            ratio = Math.min(Math.max(0, ratio), 1)
            const edgeStepOffset = 0.5 / this.stepsCount

            const value = (Math.floor((ratio - edgeStepOffset) * this.stepsCount) + 1) * this.step + this.min

            const roundingFactor = Math.pow(10, this.decimalPlacesCount)
            const roundedValue = Math.round(value * roundingFactor) / roundingFactor
            if (this.draggingSide === 'right') {
                this.$emit('input', [this.value, roundedValue])
            } else {
                this.$emit('input', [roundedValue, this.valueRight])
            }

            e.preventDefault()
        },
        stopDrag () {
            this.draggingSide = null
            this.isDragging = false
            window.removeEventListener('mouseup', this.stopDrag)
            window.removeEventListener('mousemove', this.setPosition)
        },
        handleStepIncrease () {
            if (this.value < this.max) {
                this.isChanged = true
                let incrementedNumber
                if (this.value < this.min) {
                    incrementedNumber = this.min
                } else {
                    incrementedNumber = Math.round((this.value + this.step) * Math.pow(10, this.decimalPrecision)) / Math.pow(10, this.decimalPrecision)
                }
                this.handleInput(incrementedNumber)
            }
        },
        handleStepDecrease () {
            if (this.value > this.min) {
                this.isChanged = true
                let decrementedNumber
                if (this.value > this.maxValue) {
                    decrementedNumber = this.maxValue
                } else {
                    decrementedNumber = Math.round((this.value - this.step) * Math.pow(10, this.decimalPrecision)) / Math.pow(10, this.decimalPrecision)
                }
                this.handleInput(decrementedNumber)
            }
        },
        handleInput (value) {
            this.$emit('input', value)
        },
        isValidInput (value) {
            return (value === undefined || value === null  || value < this.min || value > this.max) ? '' : null
        },
        tickClass (index) {
            let hidden = false
            if (this.isDomReady) {
                const labelPadding = 6
                const position = (index - 1) / (this.ticksCount - 1) * this.sliderWidth
                // threshold for ticks disappearing under labels
                const minThreshold = this.$refs.min.clientWidth + labelPadding
                const maxThreshold = this.sliderWidth - this.$refs.max.clientWidth - labelPadding
                hidden = position <= minThreshold || position >= maxThreshold
            }

            return {
                'active': index - 1 >= this.lastActiveIndex && index-1 <= this.lastLastActiveIndex,
                'hidden': hidden,
            }
        },
    },
}
</script>

<style lang="less">
    @import (reference) './common';
    @import './typography';

    @opening-animation-time-content: 0.2s;

    .slider {
        font-family: @regular-text-font;
        margin-bottom: 15px;
        height: 60px;

        &__row {
            display: flex;
        }

        &__label {
            height: 13px;
            font-size: 11px;
            color: @dolphin;
            font-family: @regular-text-font;
        }

        &__input {
            width: 50px;
            margin-right: 10px;
        }
    }

    .slider-helper-text {
        height: 17px;
    }

    .slider-ruler {
        position: relative;
        display: flex;
        justify-content: space-between;
        padding-top: 8px;

        &__tick {
            width: 1px;
            height: 7px;
            margin-top: 3px;
            background-color: @gunpowder;
            transition: background-color @default-transition-time ease-out;

            &--hidden {
                visibility: hidden;
            }
        }

        &__label {
            color: @dolphin;
            font-size: 10px;
            font-family: @regular-text-font;
            transition: color @default-transition-time ease-out;
        }

        &__ticks {
            position: absolute;
            width: 100%;
            display: flex;
            justify-content: space-between;
        }
    }

    .slider-rail {
        height: 2px;
        position: absolute;

        &--active {
            background-color: @royal-blue;
            width: 0;
        }

        &--passive {
            background-color: @gunpowder;
            width: 100%;
            transition: background-color @default-transition-time ease-out;
        }

        &--exceeds {
            background: linear-gradient(90deg, @royal-blue 0%, @progress-blue 100%);
        }

        &__handle {
            position: absolute;
            bottom: -1px;
            left: 0;
            transform: translateX(-50%) translateY(50%);
            width: 14px;
            height: 14px;
            box-sizing: border-box;
            border-radius: 50%;
            background-color: @very-light-gray;
            border: 2px solid @extremely-dark-gray;
            transition: transform @opening-animation-time-content ease-out;

            &-dot {
                width: 2px;
                height: 2px;
                border-radius: 50%;
                background-color: @extremely-dark-gray;
                position: absolute;
                bottom: 0;
                top: 0;
                right: 0;
                left: 0;
                margin: auto;
                opacity: 0;
                transition: opacity @opening-animation-time-content ease-out;
            }
        }
    }

    .slider-bar {
        flex-grow: 1;
        max-width: 370px;
        min-width: 170px;
        height: 47px;
        outline: none;
        cursor: pointer;

        &__container {
            position: relative;
            height: 29px;
        }

        &__rail {
            width: 100%;
            position: absolute;
            bottom: 0;
        }

        &--changed .slider-rail__handle {
            background-color: @white;
        }

        &:not(.slider-bar--disabled):hover {
            .slider-ruler__tick {
                background-color: @dolphin;
            }

            .slider-rail--passive {
                background-color: @bluish-gray;
            }
        }

        &--dragging:not(.slider-bar--disabled):focus {
            .slider-ruler__tick--active {
                background-color: @royal-blue;
            }

            .slider-ruler__label--active {
                color: @royal-blue;
            }

            .slider-rail {
                &--passive {
                    background-color: @gunpowder;
                }

                &__handle {

                    &-dot {
                        opacity: 1;
                    }
                }
            }
        }

        &--dragging--left:not(.slider-bar--disabled):focus {
            .slider-rail__handle--left {
                transform: scale(2, 2) translate(-3.5px, 3.5px);
            }
        }

        &--dragging--right:not(.slider-bar--disabled):focus {
            .slider-rail__handle--right {
                transform: scale(2, 2) translate(-3.5px, 3.5px);
            }
        }

        &--disabled {
            cursor: default;

            .slider-ruler__label {
                color: @gunpowder;
            }

            .slider-rail {
                &--active {
                    background-color: @bluish-gray;
                }

                &__handle {
                    background-color: @very-light-gray;
                }

                &--exceeds {
                    background: linear-gradient(90deg, @bluish-gray 0%, @very-light-gray 100%);
                }
            }
        }
    }

    // sizes
    .slider--condensed {
        height: 46px;

        .slider {
            &__label {
                font-size: 10px;
            }

            &__input {
                order: 1;
                margin-right: 0;
                margin-left: 10px;
            }
        }

        .slider-bar {
            height: 33px;
            max-width: 320px;
            min-width: 140px;

            &__container {
                height: 20px;
            }
        }

        .slider-ruler {
            padding-top: 4px;

            &__ticks {
                display: none;
            }
        }

        .slider-helper-text {
            height: 12px;
        }
    }

    // themes
    .slider--light {
        .slider-rail {
            &--passive {
                background-color: @very-light-gray;
            }

            &__handle {
                background-color: @black;
                border-color: @white;

                &-dot {
                    background-color: @white;
                }
            }
        }

        .slider-ruler {
            &__label {
                color: @bluish-gray;
            }

            &__tick {
                background-color: @very-light-gray;
            }
        }

        .slider-bar {
            &:not(.slider-bar--disabled):hover {
                .slider-ruler {
                    &__label {
                        color: @bluish-gray;
                    }

                    &__tick {
                        background-color: @bluish-gray;
                    }
                }
            }

            &--dragging:not(.slider-bar--disabled):focus {
                .slider-ruler__tick--active {
                    background-color: @royal-blue;
                }

                .slider-ruler__label--active {
                    color: @royal-blue;
                }

                .slider-rail {
                    &--passive {
                        background-color: @bluish-gray;
                    }
                }
            }

            &--disabled {
                .slider-ruler__label {
                    color: @very-light-gray;
                }

                .slider-rail {
                    &--active {
                        background-color: @bluish-gray;
                    }

                    &__handle {
                        background-color: @very-light-gray;
                    }
                }
            }
        }
    }
</style>
