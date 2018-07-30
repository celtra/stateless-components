<template>
    <div :class="[theme, size] | prefix('slider--')" class="slider">
        <div class="slider__row">
            <div class="slider__label">
                {{ label }}
            </div>
        </div>

        <div class="slider__row">
            <div class="slider__input">
                <input-element
                    :type="isWholeNumber ? 'number' : 'float'"
                    :size="size"
                    :disabled="disabled"
                    :value="value.toFixed(decimalPlacesCount)"
                    :step="step"
                    :min-value="min"
                    :max-value="max"
                    :is-valid="isValidInput"
                    :theme="theme"
                    :alignment="alignment"
                    @input="handleInput"
                ><span v-if="unit" slot="right">{{ unit }}</span></input-element>
            </div>

            <div ref="bar" :class="stateClass | prefix('bar--')" class="bar" tabindex="0" @mousedown="startDrag" @keydown.left.stop="decreaseValue" @keydown.down.stop="decreaseValue" @keydown.right.stop="increaseValue" @keydown.up.stop="increaseValue">
                <div class="bar__container">
                    <div class="ruler">
                        <div ref="min" :class="labelsClass.min | prefix('ruler__label--')" class="ruler__label">{{ minLabelValue }}</div>

                        <div class="ruler__ticks">
                            <div v-for="n in ticksCount" :class="tickClass(n) | prefix('ruler__tick--')" :key="n" class="ruler__tick"></div>
                        </div>

                        <div ref="max" :class="labelsClass.max | prefix('ruler__label--')" class="ruler__label">{{ maxLabelValue }}</div>
                    </div>

                    <div class="bar__rail">
                        <div class="rail rail--passive"></div>
                        <div :class="{'rail--exceeds': limit && value > limitValue}" :style="{width: `${position}px`}" class="rail rail--active"></div>
                        <div :style="{left: `${position}px`}" class="rail__handle">
                            <div class="rail__handle-dot"></div>
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
        min: { type: Number, required: true },
        max: { type: Number, required: true },
        limit: { type: Number, required: false },
        minLabel: { type: String, required: false },
        maxLabel: { type: String, required: false },
        label: { type: String },
        step: { type: Number },
        value: { type: Number },
        unit: { type: String, required: false },
        disabled: { type: Boolean, default: false },
        disabledText: { type: String, required: false },
        theme: { type: String, default: 'dark' },
        size: { type: String, default: 'normal' },
        alignment: { type: String, default: 'left' },
        isValid: { type: Function, required: false },
    },
    data () {
        return {
            isDomReady: false,
            isChanged: false,
            isDragging: false,
        }
    },
    computed: {
        limitValue () {
            return this.limit || this.max
        },
        minLabelValue () {
            return this.minLabel || this.min.toString()
        },
        maxLabelValue () {
            return this.maxLabel || this.limitValue.toString()
        },
        index () {
            return (this.value - this.min) / this.step
        },
        stepsCount () {
            return (this.limitValue - this.min) / this.step
        },
        stepPercentage () {
            return 1 / this.stepsCount
        },
        position () {
            return this.isDomReady ? Math.max(0, Math.min(this.index, this.stepsCount)) * this.stepPercentage * this.sliderWidth : 0
        },
        sliderWidth () {
            return this.isDomReady ? this.$refs.bar.clientWidth : 0
        },
        sliderOffset () {
            return this.isDomReady ? this.$refs.bar.getBoundingClientRect().x : 0
        },
        decimalPlacesCount () {
            let decimals = this.step.toString().split('.')[1]
            return decimals ? decimals.length : 0
        },
        isWholeNumber () {
            return this.decimalPlacesCount === 0
        },
        lastActiveIndex () {
            let valueRatio = (this.value - this.min) / (this.limitValue - this.min)
            return valueRatio * (this.ticksCount - 1)
        },
        stateClass () {
            return {
                'disabled': this.disabled,
                'changed': this.isChanged,
                'dragging': this.isDragging,
            }
        },
        labelsClass () {
            let isNormalSize = this.size === 'normal'
            return {
                min: { active: this.lastActiveIndex >= 0 && isNormalSize },
                max: { active: this.lastActiveIndex >= 19 && isNormalSize },
            }
        },
    },
    beforeCreate () {
        this.ticksCount = 20
        this.labelPadding = 7
    },
    created () {
        if (this.decimalPlacesCount > 1)
            throw new Error('Max one decimal place is supported.')

        let isStepValid = (this.max - this.min) / this.step % 1 === 0
        if (!isStepValid)
            throw new Error('Difference between max and min is not divisible by step.')

        let isValueValid = ((this.value - this.min) % this.step).toFixed(0) === '0'
        if (!isValueValid)
            throw new Error('Value is not a valid step.')

        if (this.min < 0 || this.min > 998)
            throw new Error('Min must be between 0 and 998.')

        if (this.max > 999 || this.max <= this.min)
            throw new Error('Max must be between min+1 and 999.')

        if (this.value < this.min || this.value > this.max)
            throw new Error('Value must be between min and max.')
    },
    mounted () {
        this.isDomReady = true

        // threshold for ticks disappearing under labels
        this.minThreshold = this.$refs.min.clientWidth + this.labelPadding
        this.maxThreshold = this.sliderWidth - this.$refs.max.clientWidth - this.labelPadding
    },
    methods: {
        startDrag (e) {
            if (this.disabled) return

            this.isChanged = true
            this.isDragging = true

            this.setPosition(e)
            window.addEventListener('mouseup', this.stopDrag)
            window.addEventListener('mousemove', this.setPosition)
            this.$refs.bar.focus()
        },
        setPosition (e) {
            let percent = (e.clientX - this.sliderOffset) / this.sliderWidth
            percent = Math.min(Math.max(0, percent), 0.999999)
            let edgeStepOffset = this.stepPercentage / 2

            let value = (Math.floor((percent - edgeStepOffset) / this.stepPercentage) + 1) * this.step + this.min

            let roundingFactor = 1
            let decimalsPart = this.step.toString().split('.')[1]
            if (decimalsPart) {
                roundingFactor = parseInt('1' + '0'.repeat(decimalsPart.length), 10)
            }
            let roundedValue = Math.round(value * roundingFactor) / roundingFactor

            this.$emit('input', roundedValue)

            e.preventDefault()
        },
        stopDrag () {
            this.isDragging = false
            window.removeEventListener('mouseup', this.stopDrag)
            window.removeEventListener('mousemove', this.setPosition)
        },
        decreaseValue () {
            if (!this.disabled && this.index > 0) {
                this.isChanged = true
                this.$emit('input', this.value - this.step)
            }
        },
        increaseValue () {
            if (!this.disabled && this.index < this.stepsCount) {
                this.isChanged = true
                this.$emit('input', this.value + this.step)
            }
        },
        handleInput (value) {
            let number = parseFloat(value)
            this.$emit('input', isNaN(number) ? null : number)
        },
        isValidInput (value, onError) {
            return (value < this.min || this.max < value) ? '' : null
        },
        tickClass (index) {
            let hidden = false
            if (this.isDomReady) {
                let position = (index - 1) / (this.ticksCount - 1) * this.sliderWidth
                hidden = position <= this.minThreshold || position >= this.maxThreshold
            }

            return {
                'active': index - 1 <= this.lastActiveIndex,
                'hidden': hidden,
            }
        },
    },
}
</script>

<style lang="less" scoped>
@import (reference) 'variables';

.slider {
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

.ruler {
    position: relative;
    display: flex;
    justify-content: space-between;
    padding-top: 8px;

    &__tick {
        width: 1px;
        height: 7px;
        margin-top: 3px;
        background-color: @gunpowder;
        transition: background-color @form-element-transition-time ease-out;

        &--hidden {
            visibility: hidden;
        }
    }

    &__label {
        color: @dolphin;
        font-size: 10px;
        font-family: @regular-text-font;
    }

    &__ticks {
        position: absolute;
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
}

.rail {
    height: 2px;
    position: absolute;

    &--active {
        background-color: @royal-blue;
        width: 0;
    }

    &--passive {
        background-color: @gunpowder;
        width: 100%;
        transition: background-color @form-element-transition-time ease-out;
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
            top: 0px;
            right: 0px;
            left: 0px;
            margin: auto;
            opacity: 0;
            transition: opacity @opening-animation-time-content ease-out;
        }
    }
}

.bar {
    flex-grow: 1;
    max-width: 370px;
    min-width: 190px;
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

    &--changed .rail__handle {
        background-color: @white;
    }

    &:not(.bar--disabled):hover {
        .ruler__tick {
            background-color: @dolphin;
        }

        .rail--passive {
            background-color: @bluish-gray;
        }
    }

    &--dragging:not(.bar--disabled):focus {
        .ruler__tick {
            transition: color 0s;

            &--active {
                background-color: @royal-blue;
            }
        }

        .ruler__label--active {
            color: @royal-blue;
        }

        .rail {
            &--passive {
                background-color: @gunpowder;
            }

            &__handle {
                transform: scale(2, 2) translate(-3.5px, 3.5px);

                &-dot {
                    opacity: 1;
                }
            }
        }
    }

    &--disabled {
        cursor: default;

        .ruler__label {
            color: @gunpowder;
        }

        .rail {
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

    .bar {
        height: 33px;
        max-width: 320px;
        min-width: 140px;

        &__container {
            height: 20px;
        }
    }

    .ruler {
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
    .rail {
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

    .ruler {
        &__label {
            color: @bluish-gray;
        }

        &__tick {
            background-color: @very-light-gray;
        }
    }

    .bar {
        &:not(.bar--disabled):hover {
            .ruler {
                &__label {
                    color: @bluish-gray;
                }

                &__tick {
                    background-color: @bluish-gray;
                }
            }
        }

        &--dragging:not(.bar--disabled):focus {
            .ruler__tick--active {
                background-color: @royal-blue;
            }

            .ruler__label--active {
                color: @royal-blue;
            }

            .rail {
                &--passive {
                    background-color: @bluish-gray;
                }
            }
        }

        &--disabled {
            .ruler__label {
                color: @very-light-gray;
            }

            .rail {
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
