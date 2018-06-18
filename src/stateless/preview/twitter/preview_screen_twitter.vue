<template>
    <g>
        <clipPath :id="`${_uid}-full-mask`">
            <rect :x="x" :y="y" :width="maxWidth" :height="maxHeight" fill="#fff"></rect>
        </clipPath>

        <rect :x="x" :y="y" :width="maxWidth" :height="maxHeight" :fill="backgroundColor"></rect>

        <rect :x="x" :y="y" :width="maxWidth" :height="vars.headerHeight" :fill="lightGray"></rect>

        <g :clip-path="`url(#${_uid}-full-mask)`">
            <preview-text
                :x="x + edgeSpacing"
                :y="y + vars.headerHeight + vars.headerSpacing"
                :width="sideWidth - edgeSpacing"
                :scale="1"
                :rows="leftRows"
                :line-height="vars.lineHeight"
                :section-spacing="vars.sectionSpacing"
                :box-width="100"
                :color="textColor"
                :min-line-width-ratio="0.3">
            </preview-text>

            <clipPath :id="`${_uid}-content-mask`">
                <rect :x="contentX" :y="y + vars.headerHeight + vars.headerSpacing" :width="contentWidth" :height="maxHeight" fill="#fff"></rect>
            </clipPath>

            <rect :x="contentX" :y="y + vars.headerHeight + vars.headerSpacing" :width="contentWidth" :height="maxHeight" fill="#fff"></rect>
            <g :clip-path="`url(#${_uid}-content-mask)`">
                <preview-content
                    ref="content"
                    :transform="contentTransform"
                    :device="device"
                    :is-landscape="isLandscape"
                    :is-condensed="isCondensed"
                    v-bind="contentData">
                </preview-content>
            </g>

            <preview-text
                :x="contentX + contentWidth + sideSpacing"
                :y="y + vars.headerHeight + vars.headerSpacing"
                :width="sideWidth - edgeSpacing"
                :scale="1"
                :rows="rightRows"
                :line-height="vars.lineHeight"
                :section-spacing="vars.sectionSpacing"
                :box-width="100"
                :color="textColor"
                :min-line-width-ratio="0.3">
            </preview-text>
        </g>
    </g>
</template>

<script>
import PreviewContent from './preview_content_twitter.vue'
import PreviewText from '../shared/preview_text.vue'

export default {
    components: {
        previewContent: PreviewContent,
        previewText: PreviewText,
    },
    props: {
        device: { type: String, required: true },
        isLandscape: { type: Boolean, default: false },
        isCondensed: { type: Boolean, default: false },
        contentData: { type: Object, required: true },
    },
    computed: {
        contentTransform () {
            let x = this.contentX + this.vars.leftPadding
            let y = this.y + this.vars.headerHeight + this.vars.headerSpacing
            let width = this.contentWidth - this.vars.leftPadding - this.vars.rightPadding

            return `translate(${x}, ${y}) scale(${width / 100})`
        },
        vars () {
            let constants = {
                phone: {
                    headerHeight: this.isLandscape ? 9.5 : 15,
                    headerSpacing: 0,
                    lineHeight: 0.8,
                    leftPadding: this.isLandscape ? 3 : 4,
                    rightPadding: this.isLandscape ? 16 : 4,
                },
                tablet: {
                    headerHeight: this.isLandscape ? 5 : 13,
                    headerSpacing: 0,
                    lineHeight: 1.6,
                    leftPadding: this.isLandscape ? 9 : 3.2,
                    rightPadding: this.isLandscape ? 16 : 7,
                },
                desktop: {
                    headerHeight: this.isCondensed ? 3 : 4,
                    headerSpacing: this.isCondensed ? 1.5 : 0.8,
                    lineHeight: 1,
                    sectionSpacing: this.isCondensed ? 2 : 1,
                    leftPadding: this.isCondensed ? 0.2 : 1,
                    rightPadding: this.isCondensed ? 0.2 : 1,
                },
            }

            return constants[this.device]
        },
        edgeSpacing () {
            return this.sideSpacing * (this.isCondensed ? 2 : 4)
        },
        leftRows () {
            if (this.isCondensed) {
                return [
                    { type: 'box', numLines: 12 },
                    { type: 'box', numLines: 4 },
                    { type: 'basic', numLines: 20 },
                ]
            }

            return [
                { type: 'box', numLines: 8 },
                { type: 'box', numLines: 21 },
            ]
        },
        rightRows () {
            if (this.isCondensed) {
                return [
                    { type: 'box', numLines: 15 },
                    { type: 'box', numLines: 4 },
                ]
            }

            return [
                { type: 'box', numLines: 15 },
                { type: 'box', numLines: 7 },
            ]
        },
        backgroundColor () {
            return this.isCondensed ? '#fff' : this.lightGray
        },
        textColor () {
            return this.isCondensed ? this.lightGray : '#fff'
        },
        hasSides () {
            return this.device === 'desktop'
        },
        sideWidth () {
            return (this.isCondensed ? 10 : 26.5)
        },
        sideSpacing () {
            return this.vars.lineHeight
        },
        contentX () {
            if (!this.hasSides) {
                return this.x
            }
            return this.x + this.sideWidth + this.sideSpacing
        },
        contentWidth () {
            if (!this.hasSides) {
                return this.maxWidth
            }
            return this.maxWidth - 2 * (this.sideWidth + this.sideSpacing)
        },
    },
    watch: {
        device () {
            this.redrawVideo()
        },
        isLandscape () {
            this.redrawVideo()
        },
    },
    created () {
        this.lightGray = '#E7E7E7'

        this.x = 0
        this.y = 0
        this.maxWidth = 100
        this.maxHeight = 2 * this.maxWidth
    },
    mounted () {
        window.addEventListener('resize', this.redrawVideo)
    },
    beforeDestroy () {
        window.removeEventListener('resize', this.redrawVideo)
    },
    methods: {
        redrawVideo () {
            this.$nextTick(this.$refs.content.positionVideo)
        },
        triggerAutoplay () {
            this.$refs.content.triggerAutoplay()
        },
    },
}
</script>
