<template>
    <g>
        <clipPath :id="maskId">
            <rect v-bind="fullRect" fill="#fff"></rect>
        </clipPath>
        <clipPath :id="`${maskId}-box`">
            <rect v-bind="currentRect" fill="#fff"></rect>
        </clipPath>
        <clipPath :id="`${maskId}-top`">
            <rect v-bind="fullRect" :height="currentRect.y - y + vars.epsilon" fill="#fff"></rect>
        </clipPath>

        <rect v-bind="fullRect" fill="#fff" />

        <preview-text
            :clip-path="`url(#${maskId})`"
            v-if="isStaticText"
            v-bind="verticalTextRect"
            :scale="scale"
            :color="previewTextColor"
            :rows="textBelow || textAbove"
            :line-height="vars.textLineHeight"
            :box-width="vars.textBoxWidth">
        </preview-text>

        <template v-else>
            <preview-text
                :clip-path="`url(#${maskId})`"
                v-if="textAbove"
                v-bind="topTextRect"
                :grow-down="false"
                :scale="scale"
                :color="previewTextColor"
                :rows="textAbove"
                :line-height="vars.textLineHeight"
                :box-width="vars.textBoxWidth">
            </preview-text>

            <preview-text
                :clip-path="`url(#${maskId})`"
                v-if="textBelow"
                v-bind="bottomTextRect"
                :scale="scale"
                :color="previewTextColor"
                :rows="textBelow"
                :line-height="vars.textLineHeight"
                :box-width="vars.textBoxWidth">
            </preview-text>

            <preview-text
                :clip-path="`url(#${maskId})`"
                v-if="textRight && horizontalAlign === 'left'"
                v-bind="rightTextRect"
                :scale="scale"
                :color="previewTextColor"
                :rows="textRight"
                :line-height="vars.textLineHeight"
                :box-width="vars.textBoxWidth">
            </preview-text>

            <preview-text
                :clip-path="`url(#${maskId})`"
                v-if="textLeft && horizontalAlign === 'right'"
                v-bind="leftTextRect"
                :scale="scale"
                :color="previewTextColor"
                :rows="textLeft"
                :line-height="vars.textLineHeight"
                :box-width="vars.textBoxWidth">
            </preview-text>
        </template>

        <rect v-bind="currentRect" :fill="color"></rect>
        <path v-if="boxIcon === 'play' && currentRect.width > 0 && currentRect.height > 0" :style="iconTransform" :d="paths.playButton.d" fill="#fff"/>

        <rect v-if="headerHeight > 0" :x="fullRect.x" :y="fullRect.y" :width="fullRect.width"
              :height="vars.headerHeight" :fill="'#E7E7E7'"></rect>

        <template v-if="humanHeight > 0">
            <g v-if="humanPosition === 'standing'" :clip-path="`url(#${maskId}-top)`">
                <path :style="humanTransform" :fill="color" :opacity="humanOpacity" :d="paths.human.d" />
            </g>
            <g v-else-if="humanPosition === 'inside'" :clip-path="`url(#${maskId}-box)`">
                <path :style="humanTransform" fill="#fff" :opacity="humanOpacity" :d="paths.human.d" />
            </g>
        </template>

        <rect v-if="hasOverlay" v-bind="fullRect" opacity=".5" :fill="color"></rect>
    </g>
</template>

<script>
import PreviewText from '../shared/preview_text.vue'

export default {
    components: {
        previewText: PreviewText,
    },
    props: {
        // view box
        x: { type: Number, required: true },
        y: { type: Number, required: true },
        maxWidth: { type: Number, required: true },
        maxHeight: { type: Number, required: true },
        scale: { type: Number, default: 1 },
        horizontalPadding: { type: Number, default: 15 },
        verticalPadding: { type: Number, default: 20 },

        // box
        // Value for the following can be a number or 'max', so we can not set type
        width: { required: true }, // eslint-disable-line vue/require-prop-types
        height: { required: false }, // eslint-disable-line vue/require-prop-types
        heightRatio: { required: false }, // eslint-disable-line vue/require-prop-types
        offsetX: { type: Number, default: 0 },
        offsetY: { type: Number, default: 0 },
        horizontalAlign: { type: String, default: 'center' },
        verticalAlign: { type: String, default: 'top' },
        boxPadding: { type: String, default: null }, // both, horizontal, vertical
        color: { type: String, required: false, default: '#c00' },
        boxIcon: { type: String, required: false },

        // texts
        isStaticText: { type: Boolean, required: false, default: false },
        textAbove: { type: Array, required: false },
        textBelow: { type: Array, required: false },
        textLeft: { type: Array, required: false },
        textRight: { type: Array, required: false },

        // human
        humanPosition: { type: String, required: false },
        humanOffsetX: { type: Number, default: 0 },
        humanOffsetY: { type: Number, default: 0 },
        humanHorizontalAlign: { type: String, required: false, default: 'center' },
        humanVerticalAlign: { type: String, required: false, default: 'bottom' },
        humanHeight: { type: Number, required: false },
        humanOpacity: { type: Number, required: false, default: 0.5 },

        // misc
        hasOverlay: { type: Boolean, default: false },
        headerHeight: { type: Number, required: false, default: 0 },
    },
    computed: {
        vars () {
            let physicalWidth = this.maxWidth / this.scale
            let boxWidthFactor, lineHeight
            if (physicalWidth < 400) {
                boxWidthFactor = 0.35
                lineHeight = 12
            } else if (physicalWidth < 800) {
                boxWidthFactor = 0.35
                lineHeight = 15.7
            } else {
                boxWidthFactor = 0.15
                lineHeight = 14.7
            }

            let width = this.width === 'max' ? this.maxWidth : this.scale * this.width
            let height = this.height === 'max' ? this.maxHeight : this.scale * this.height

            return {
                padding: { h: this.horizontalPadding * this.scale, v: this.verticalPadding * this.scale },
                width: width,
                height: this.heightRatio ? width * this.heightRatio : height,
                offset: { x: this.offsetX * this.scale, y: this.offsetY * this.scale },
                textLineHeight: lineHeight,
                textBoxWidth: physicalWidth * boxWidthFactor,
                headerHeight: this.headerHeight * this.scale,
                humanOffset: { x: this.humanOffsetX * this.scale, y: this.humanOffsetY * this.scale },
                humanHeight: this.humanHeight * this.scale,
                epsilon: 0.1 * this.scale,
            }
        },
        maskId () {
            return `screen-mask-${this._uid}`
        },
        fullRect () {
            return {
                x: this.x,
                y: this.y,
                width: this.maxWidth,
                height: this.maxHeight,
            }
        },
        verticalTextRect () {
            return {
                x: this.x + this.vars.padding.h,
                y: this.y + this.vars.headerHeight + this.vars.padding.v,
                width: this.textRight && this.horizontalAlign === 'left' ? this.currentRect.x + this.currentRect.width - (this.x + this.vars.padding.h) : this.maxWidth - 2 * this.vars.padding.h,
            }
        },
        topTextRect () {
            return {
                x: this.x + this.vars.padding.h,
                y: this.currentRect.y - this.vars.padding.v,
                width: this.maxWidth - 2 * this.vars.padding.h,
            }
        },
        bottomTextRect () {
            return Object.assign({}, this.verticalTextRect, {
                y: this.currentRect.y + this.currentRect.height + this.vars.padding.v,
            })
        },
        rightTextRect () {
            return {
                x: this.currentRect.x + this.currentRect.width + this.vars.padding.h,
                y: this.currentRect.y,
                width: this.x + this.maxWidth - (this.currentRect.x + this.currentRect.width) - 2 * this.vars.padding.h,
            }
        },
        leftTextRect () {
            return {
                x: this.x + this.vars.padding.h,
                y: this.currentRect.y,
                width: this.currentRect.x - this.x - 2 * this.vars.padding.h,
            }
        },
        currentRect () {
            let centerX = this.x + this.vars.offset.x
            let maxVariableWidth = this.maxWidth - this.vars.offset.x
            if (this.horizontalAlign === 'left') {
            } else if (this.horizontalAlign === 'center') {
                centerX += maxVariableWidth / 2
            } else if (this.horizontalAlign === 'right') {
                centerX += maxVariableWidth
            }

            let centerY = this.y + this.vars.headerHeight + this.vars.offset.y
            let maxVariableHeight = this.maxHeight - this.vars.headerHeight - this.vars.offset.y
            if (this.verticalAlign === 'top') {
            } else if (this.verticalAlign === 'center') {
                centerY +=  maxVariableHeight / 2
            } else if (this.verticalAlign === 'bottom') {
                centerY += maxVariableHeight
            }

            let leftPadding = this.boxPadding && this.boxPadding.indexOf('l') >= 0 ? this.vars.padding.h : 0
            let rightPadding = this.boxPadding && this.boxPadding.indexOf('r') >= 0 ? this.vars.padding.h : 0
            let topPadding = this.boxPadding && this.boxPadding.indexOf('t') >= 0 ? this.vars.padding.v : 0
            let bottomPadding = this.boxPadding && this.boxPadding.indexOf('b') >= 0 ? this.vars.padding.v : 0

            let maxWidth = this.maxWidth - leftPadding - rightPadding - this.vars.offset.x
            let maxHeight = this.maxHeight - topPadding - bottomPadding - this.vars.offset.y - this.vars.headerHeight

            let x = this.x + leftPadding + this.vars.offset.x
            let y = this.y + topPadding + this.vars.offset.y + this.vars.headerHeight

            let rect = this.calculateRect(x, y, maxWidth, maxHeight, centerX, centerY, this.vars.width, this.vars.height)

            if (rect.width > this.vars.epsilon && rect.height > this.vars.epsilon) {
                return rect
            }
            return { x: this.x, y: this.y, width: 0, height: 0 }
        },
        humanTransform () {
            let centerX = this.currentRect.x
            if (this.humanHorizontalAlign === 'left') {
            } else if (this.humanHorizontalAlign === 'center') {
                centerX += this.currentRect.width / 2
            } else if (this.humanHorizontalAlign === 'right') {
                centerX += this.currentRect.width
            }

            let centerY = this.currentRect.y
            let transformOriginY
            if (this.humanVerticalAlign === 'top') {
                if (this.humanPosition === 'standing') {
                    centerY += this.currentRect.height
                    transformOriginY = 0.1
                } else {
                    transformOriginY = 0.9
                }
            } else if (this.humanVerticalAlign === 'center') {
                centerY += this.currentRect.height / 2
                transformOriginY = 0.5
            } else if (this.humanVerticalAlign === 'bottom') {
                if (this.humanPosition === 'standing') {
                    transformOriginY = 0.9
                } else {
                    centerY += this.currentRect.height
                    transformOriginY = 0.9
                }
            }

            let visibleHeight = Math.max(transformOriginY, 1 - transformOriginY) * this.paths.human.height
            let scale = Math.min(1.2 * this.maxHeight / visibleHeight, this.vars.humanHeight / visibleHeight)
            let x = centerX + this.vars.humanOffset.x - 25
            let y = centerY + this.vars.humanOffset.y - this.paths.human.height * transformOriginY

            return {
                'transform-box': 'fill-box',
                'transform-origin': `50% ${transformOriginY * 100}%`,
                'transform': `translate(${x}px, ${y}px) scale(${scale})`,
            }
        },
        iconTransform () {
            let x = this.currentRect.x + this.currentRect.width / 2 - this.paths.playButton.width / 2
            let y = this.currentRect.y + this.currentRect.height / 2 - this.paths.playButton.height / 2

            return {
                'transform-box': 'fill-box',
                'transform-origin': `center`,
                'transform': `translate(${x}px, ${y}px) scale(0.4)`,
            }
        },
    },
    created () {
        this.previewTextColor = '#E7E7E7'

        this.paths = {
            human: {
                d: 'M 49.999 38.476 C 49.999 49.227 49.999 59.978 49.999 70.728 C 49.999 74.284 47.749 76.386 44.534 75.82 C 42.605 75.498 41.398 74.366 40.917 72.507 C 40.755 71.861 40.755 71.213 40.755 70.486 C 40.755 61.027 40.755 51.491 40.755 42.034 L 40.755 40.82 L 38.586 40.82 L 38.586 42.114 C 38.586 68.95 38.586 95.866 38.586 122.703 C 38.586 123.511 38.586 124.401 38.425 125.209 C 37.782 128.362 35.129 130.14 31.751 129.897 C 28.698 129.654 26.286 127.309 26.126 124.239 C 26.126 123.834 26.126 123.35 26.126 122.945 C 26.126 107.506 26.126 92.068 26.126 76.71 L 26.126 75.659 L 23.955 75.659 L 23.955 77.033 C 23.955 92.553 23.955 108.072 23.955 123.592 C 23.955 128.846 18.971 131.19 15.032 129.412 C 12.78 128.442 11.736 126.501 11.576 124.076 C 11.576 123.673 11.576 123.35 11.576 122.945 L 11.576 41.953 L 11.576 40.901 L 9.405 40.901 L 9.405 42.114 C 9.405 51.733 9.405 61.432 9.405 71.052 C 9.405 74.527 6.351 76.71 3.055 75.579 C 1.447 75.013 0.482 73.801 0.16 72.183 C 0.081 71.617 0 71.133 0 70.568 C 0 59.816 0 49.065 0 38.234 C 0 31.686 3.778 26.353 9.647 24.574 C 11.013 24.169 12.46 23.927 13.906 23.927 C 21.142 23.846 28.376 24.008 35.61 23.846 C 44.534 23.765 50.081 30.959 49.999 38.476 Z M 25 21.583 C 19.131 21.583 14.389 16.733 14.389 10.831 C 14.389 4.849 19.292 -0.081 25.16 0.001 C 31.11 0.082 35.771 4.931 35.771 10.913 C 35.691 16.894 30.948 21.583 25 21.583 Z',
                width: 100,
                height: 130,
            },
            playButton: {
                d: 'M 18.382 37.5 L 18.382 12.5 L 37.5 25.001 L 18.382 37.5 Z M 24.999 0 C 11.176 0 0 11.177 0 25.001 C 0 38.824 11.176 50 24.999 50 C 38.822 50 50 38.824 50 25.001 C 50 11.177 38.822 0 24.999 0 L 24.999 0 Z',
                width: 50,
                height: 50,
            },
        }
    },
    methods: {
        calculateRect (minX, minY, maxWidth, maxHeight, centerX, centerY, width, height) {
            let widthShrinkFactor = height > maxHeight ? maxHeight / height : 1
            let heightShrinkFactor = width > maxWidth ? maxWidth / width : 1

            let rectWidth = Math.min(maxWidth, width * widthShrinkFactor)
            let rectHeight = Math.min(maxHeight, height * heightShrinkFactor)

            let x = Math.max(minX, Math.min(centerX - rectWidth / 2, minX + maxWidth - rectWidth))
            let y = Math.max(minY, Math.min(centerY - rectHeight / 2, minY + maxHeight - rectHeight))

            return {
                x: x,
                y: y,
                width: rectWidth,
                height: rectHeight,
            }
        },
    },
}
</script>
