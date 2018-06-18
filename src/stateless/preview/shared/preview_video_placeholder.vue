<template>
    <g>
        <rect v-bind="rect" v-for="(rect, index) in rects" :key="index" />
        <rect fill="#000" opacity=".6" x="0" y="0" :width="width" :height="height" />

        <template v-if="text">
            <rect fill="#000" x="0" :y="(height - barHeight) / 2" :width="width" :height="barHeight" />

            <path :style="iconTransform" stroke="#fff" fill="none" fill-rule="evenodd" :d="paths.hourglass.d" />
            <text :x="width / 2" :y="height / 2 + barOffset * 1.5" font-family="SF UI Text Regular" :font-size="fontSize" fill="white" text-anchor="middle">{{ text }}</text>
        </template>
    </g>
</template>

<script>
export default {
    props: {
        width: { type: Number, default: 100 },
        height: { type: Number, default: 100 },
        fontSize: { type: Number, default: 2 },
        text: { type: String, required: false },
    },
    computed: {
        rects () {
            var colors = ['#ffffff', '#ffff00', '#00ffff', '#00ff00', '#ff00ff', '#ff0000', '#0000ff']

            let halfHeight = 0.5 * this.height
            let barWidth = this.width / colors.length

            return colors.map((color, index) => {
                return { fill: color, x: barWidth * index, y: 0, width: barWidth, height: halfHeight }
            }).concat(colors.slice().reverse().map((color, index) => {
                return { fill: color, x: barWidth * index, y: halfHeight, width: barWidth, height: halfHeight }
            }))
        },
        barHeight () {
            return 0.3 * this.height
        },
        barOffset () {
            return 0.05 * this.height
        },
        iconTransform () {
            return {
                'transform-box': 'fill-box',
                'transform-origin': `center`,
                'transform': `translate(${(this.width - this.paths.hourglass.width) / 2}px, ${(this.height - this.paths.hourglass.height) / 2 - this.barOffset}px) scale(${0.05 * this.width / this.paths.hourglass.width})`,
            }
        },
    },
    created () {
        this.paths = {
            hourglass: {
                d: 'M 2 22.5 L 2 21.5 C 2 17.1 3.7 13.2 6.1 11.5 C 3.7 9.8 2 5.9 2 1.5 L 2 0.5 M 16 0.5 L 16 1.5 C 16 5.9 14.3 9.8 11.9 11.5 C 14.3 13.2 16 17.1 16 21.5 L 16 22.5 M 15.2 16.5 L 2.8 16.5 M 18 22.5 L 0 22.5 M 18 0.5 L 0 0.5',
                width: 18,
                height: 23,
            },
        }
    },
}
</script>
