<template>
    <div :class="[theme, size] | prefix('slider-container--')" class="slider-container">
        <div class="slider__header">
            {{ label }}
        </div>

        <div class="slider-unit">
            <div class="slider__input">
                <input-element
                    :type="inputType"
                    :size="size"
                    :disabled="disabled"
                    :value="value"
                    :step="step"
                    :min-value="0"
                    :max-value="999"
                    :is-valid="isValidInput"
                    :theme="theme"
                    :alignment="alignment"
                    @input="handleInput"
                ><span v-if="unit === '%'" slot="right">%</span></input-element>
            </div>

            <div ref="slider" :class="stateClass() | prefix('slider-wrapper--')" class="slider-wrapper" tabindex="0" @mousedown="startDrag" @keydown="onKeyboardInput">
                <div class="slider-content">
                    <div class="slider__label">
                        <div ref="min" :class="labelClass(0) | prefix('slider__label-unit--')" class="slider__label-unit">{{ minLabelValue }}</div>

                        <div class="slider__label-unit__tick-container">
                            <div class="slider__label-unit slider__label-unit__tick"></div>
                            <div v-for="n in ticksCount" :class="tickClass(n) | prefix('slider__label-unit--')" :key="n" class="slider__label-unit slider__label-unit__tick">|</div>
                            <div class="slider__label-unit slider__label-unit__tick"></div>
                        </div>

                        <div ref="max" :class="labelClass(19) | prefix('slider__label-unit--')" class="slider__label-unit">{{ maxLabelValue }}</div>
                    </div>

                    <div class="slider">
                        <div class="bar bar--passive"></div>
                        <div :class="{'bar--exceeds': limit && value > limitValue}" :style="{width: `${position}px`}" class="bar bar--active"></div>
                        <div :style="{left: `${position}px`}" class="bar__handle">
                            <div class="bar__handle-dot"></div>
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
        percentage () {
            return (this.value - this.min) / (this.max - this.min)
        },
        position () {
            return this.isDomReady ? Math.min(this.index, this.stepsCount) * this.stepPercentage * this.sliderWidth : 0
        },
        sliderWidth () {
            return this.isDomReady ? this.$refs.slider.clientWidth : 0
        },
        sliderOffset () {
            return this.isDomReady ? this.$refs.slider.offsetLeft : 0
        },
        decimalPlacesCount () {
            let decimals = this.step.toString().split('.')[1]
            return decimals ? decimals.length : 0
        },
        inputType () {
            return this.decimalPlacesCount === 0 ? 'number' : 'float'
        },
    },
    created () {
        let isStepValid = (this.max - this.min) / this.step % 1 === 0
        if (!isStepValid)
            throw new Error('Difference between max and min is not divisible by step')

        let isValueValid = ((this.value - this.min) % this.step).toFixed(0) === '0'
        if (!isValueValid)
            throw new Error('Value is not a valid step')

        if (this.min < 0 || this.min > 998)
            throw new Error('Min must be between 0 and 998')

        if (this.max > 999 || this.max <= this.min)
            throw new Error('Max must be between min+1 and 999')

        if (this.value < this.min || this.value > this.max)
            throw new Error('Value must be between min and max')

        this.ticksCount = 18
        this.labelPadding = 5
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
            this.$refs.slider.focus()
        },
        setPosition (e) {
            let percent = (e.clientX - this.sliderOffset) / this.sliderWidth
            percent = Math.min(Math.max(0, percent), 0.999999)
            let edgeStepOffset = this.stepPercentage / 2

            let value = (Math.floor((percent - edgeStepOffset) / this.stepPercentage) + 1) * this.step + this.min
            this.$emit('input', value)

            e.preventDefault()
        },
        stopDrag () {
            this.isDragging = false
            window.removeEventListener('mouseup', this.stopDrag)
            window.removeEventListener('mousemove', this.setPosition)
        },
        onKeyboardInput (e) {
            if (this.disabled) return
            this.isChanged = true

            let key = e.keyCode

            if ((key === 38 || key === 39) && this.index < this.stepsCount)
                this.$emit('input', this.value + this.step)
            else if ((key === 37 || key === 40) && this.index > 0)
                this.$emit('input', this.value - this.step)

            e.preventDefault()
        },
        handleInput (value) {
            let number = parseFloat(value)
            this.$emit('input', isNaN(number) ? null : number)
        },
        isUnitActive (index) {
            return index / (this.ticksCount + 1) <= this.percentage
        },
        isValidInput (value, onError) {
            return (value < this.min || this.max < value) ? '' : null
        },
        tickClass (index) {
            let hidden = false
            if (this.isDomReady) {
                let position = index / (this.ticksCount + 1) * this.sliderWidth
                hidden = position <= this.minThreshold || position >= this.maxThreshold
            }

            return {
                'active': this.isUnitActive(index),
                'hidden': hidden,
            }
        },
        labelClass (index) {
            return {
                'active': this.isUnitActive(index) && this.size === 'normal',
            }
        },
        stateClass () {
            return {
                'disabled': this.disabled,
                'changed': this.isChanged,
                'dragging': this.isDragging,
            }
        },
    },
}
</script>

<style lang="less" scoped>
@import (reference) 'variables';

.slider {

  &-container {
    margin-bottom: 15px;
    height: 60px;
  }

  &__header {
    height: 13px;
    font-size: 11px;
    color: @dolphin;
    font-family: @regular-text-font;
  }

  &-unit {
    display: flex;
  }

  &__input {
    width: 50px;
    margin-right: 10px;
  }

  &-wrapper {
    flex-grow: 1;
    max-width: 370px;
    min-width: 190px;
    height: 47px;
    outline: none;
    cursor: pointer;

    &:hover:not(&--disabled) {
      .slider__label-unit {
        color: @dolphin;
      }

      .bar {
        &--passive {
          background-color: @bluish-gray;
        }
      }
    }

    &--changed {
      .bar__handle {
        background-color: @white;
      }
    }

    &--dragging {
      .slider__label-unit {
        color: @dolphin;
        transition: color 0s;

        &--active {
          color: @royal-blue;
        }
      }

      &:hover:not(&--disabled) {
        .slider__label-unit--active {
          color: @royal-blue;
        }
      }

      .bar {
        &--passive {
          background-color: @bluish-gray;
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

      .slider__label-unit {
        color: @gunpowder;
      }

      .bar {
        background-color: @gunpowder;
      }

      .bar__handle {
        background-color: @gunpowder;
      }
    }
  }

  &-content {
    position: relative;
    height: 29px;
  }

  &__label {
    position: relative;
    display: flex;
    justify-content: space-between;

    &-unit {
      color: @dolphin;
      font-size: 10px;
      padding-top: 8px;
      font-family: @regular-text-font;
      transition: color @form-element-transition-time ease-out;

      &__tick {
        &-container {
          position: absolute;
          width: 100%;
          display: flex;
          justify-content: space-between;
        }

        & {
          text-align: center;
          color: @gunpowder;
          width: 1px;
          font-size: 9px;
        }
      }

      &--hidden {
        visibility: hidden;
      }
    }
  }

  & {
    width: 100%;
    position: absolute;
    bottom: 0;
  }

  &-helper-text {
    height: 17px;
  }
}

.bar {
  & {
    height: 2px;
    position: absolute;
  }

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

// sizes
.slider-container--condensed {
  height: 46px;

  .slider {

    &__header {
      font-size: 10px;
    }

    &__input {
      order: 1;
      margin-right: 0;
      margin-left: 10px;
    }

    &-wrapper {
      height: 33px;
      max-width: 320px;
      min-width: 140px;
    }

    &-content {
      height: 20px;
    }

    &__label-unit {
      padding-top: 4px;

      &__tick-container {
        display: none;
      }
    }

    &-helper-text {
      height: 12px;
    }
  }
}

// themes
.slider-container--light {
  .slider {
    &-wrapper {
      &:hover:not(&--disabled) {
        .slider__label-unit {
          color: @bluish-gray;

          &__tick {
            color: @bluish-gray;
          }
        }
      }

      &--dragging {
        .slider__label-unit {
          &__tick {
            color: @bluish-gray;
          }

          &--active {
            color: @royal-blue;
          }
        }

        .bar--passive {
          background-color: @bluish-gray;
        }

        &:hover:not(&--disabled) {
          .slider__label-unit--active {
            color: @royal-blue;
          }
        }
      }

      &--disabled {
        cursor: default;

        .slider__label-unit {
          color: @very-light-gray;
        }

        .bar {
          background-color: @very-light-gray;
        }

        .bar__handle {
          background-color: @very-light-gray;
        }
      }
    }

    &__label-unit {
      color: @bluish-gray;

      &__tick {
        color: @very-light-gray;
      }
    }
  }

  .bar {
    &--passive {
      background-color: @very-light-gray;
    }

    &__handle {
      background-color: @black;
      border-color: @white;

      &-bar {
        background-color: @white;
      }
    }
  }
}

</style>
