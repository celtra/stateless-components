<template>
    <svg class="pie-chart" viewBox="-1 -1 2 2">
        <circle :class="{'pie-chart__background--disabled' : disabled}" cx="0" cy="0" r="1" class="pie-chart__background"/>
        <path :d="sharePath" class="pie-chart__share"></path>
    </svg>
</template>

<script>

export default {
    props: {
        ratio: { type: Number },
    },
    computed: {
        value () {
            return Math.max(0, Math.min(1, this.ratio))
        },
        slicePath () {
            return `M 1 0
                    A 1 1 0 ${this.largeArcFlag} 1 ${this.x} ${this.y}
                    L 0,0`
        },
        x () {
            return Math.cos(2 * Math.PI * this.value)
        },
        y () {
            return Math.sin(2 * Math.PI * this.value)
        },
        largeArcFlag () {
            return this.value > 0.5 ? 1 : 0
        },
        disabled () {
            return this.value === 0
        },
    },
}
</script>

<style lang="less" scoped>
@import (reference) 'variables';

.pie-chart {
  height: 18px;
  width: 18px;
  transform: rotate(-0.25turn);

  &__background {
    fill: @extremly-light-green;

    &--disabled {
       fill: @very-light-gray;
    }
  }

  &__share {
    fill: @light-green;
  }
}
</style>
