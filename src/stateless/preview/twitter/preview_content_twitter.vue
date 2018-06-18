<template>
    <g>
        <circle :cx="circleX" :cy="topY + vars.circleRadius * 0.8" :r="vars.circleRadius" :fill="previewTextColor" />

        <preview-text
            v-if="text !== null"
            :x="textX"
            :y="topY"
            :width="textWidth"
            :scale="1"
            :rows="topRows"
            :line-height="vars.lineHeight"
            :box-width="100"
            :color="previewTextColor"
            :min-line-width-ratio="0.3">
        </preview-text>

        <foreignObject v-if="text !== null" :x="textX" :y="topY + vars.textVerticalSpacing" :width="textWidth" :height="textHeight">
            <p
                xmlns="http://www.w3.org/1999/xhtml" ref="textSpan" class="preview-screen-twitter__text"
                :style="{ fontSize: `${vars.fontSize}px`, lineHeight: `${vars.textLineHeight}px` }">

                <template v-for="(textPart, index) in textParts">
                    <span v-if="textPart.isLink" :key="index" class="preview-screen-twitter__link" @click="$root.$emit('open-url', textPart.text)">{{ textPart.text }} </span>
                    <span v-else :key="index">{{ textPart.text }} </span>
                </template>
            </p>
        </foreignObject>

        <clipPath :id="`${maskId}-card`">
            <rect :x="cardBox.x" :y="cardBox.y" :height="cardBox.height" :width="cardBox.width" :rx="2" fill="#fff"/>
        </clipPath>
        <g :clip-path="`url(#${maskId}-card)`">
            <rect v-if="title" :x="cardBox.x" :y="cardBox.y" :height="cardBox.height" :width="cardBox.width" :rx="2" :stroke="previewTextColor" fill="none" />

            <template v-for="(imageBox, index) in imageBoxes">
                <preview-video-placeholder :key="index" v-if="isVideoTranscoding" :width="imageBox.width" :height="imageBox.height" :transform="`translate(${imageBox.x}, ${imageBox.y})`" :text="transcodingText"></preview-video-placeholder>
                <image ref="videoSurface" :key="index" v-else-if="imageBox.url" @click="playVideo()" :style="videoUrl ? { cursor: 'pointer' } : {}" :x="imageBox.x" :y="imageBox.y" :height="imageBox.height" :width="imageBox.width" :xlink:href="imageBox.url" preserve-aspect-ratio="xMidYMid slice" />
                <rect :key="index" v-else :x="imageBox.x" :y="imageBox.y" :height="imageBox.height" :width="imageBox.width" :fill="twitterColor"></rect>
            </template>

            <foreignObject v-show="isVideoPlaying" ref="videoContainer" @click="stopVideo()">
                <video xmlns="http://www.w3.org/1999/xhtml" playsinline ref="video" @ended="stopVideo()" :src="videoUrl" :style="{ borderRadius: title ? '8px 8px 0px 0px' : '8px' }" class="preview-screen-twitter__preview-video"></video>
            </foreignObject>

            <path v-if="boxIcon === 'play' && !isVideoTranscoding" :style="Object.assign({ pointerEvents: 'none' }, iconTransform)" :d="paths.playButton.d" fill="#fff"/>

            <template v-if="title">
                <foreignObject :x="cardBox.x + 4" :y="cardBox.y + imageBox.height + vars.cardExtraHeight / 2 - vars.titleFontSize - vars.cardTextOffset * 1.3" :width="cardTextWidth" height="100%">
                    <p xmlns="http://www.w3.org/1999/xhtml" class="preview-screen-twitter__card-text" :style="{ fontSize: `${vars.titleFontSize}px` }">{{ title }}</p>
                </foreignObject>

                <foreignObject v-if="subtitle" :x="cardBox.x + 4" :y="cardBox.y + imageBox.height + vars.cardExtraHeight / 2 + vars.cardTextOffset" :width="cardTextWidth" height="100%">
                    <p xmlns="http://www.w3.org/1999/xhtml" class="preview-screen-twitter__card-text" :style="{ color: '#aaa', fontSize: `${vars.subtitleFontSize}px` }">
                        <template v-if="!isSubtitleLink">
                            {{ subtitle }}
                        </template>
                        <span v-else class="preview-screen-twitter__link" @click="$root.$emit('open-url', subtitle)">{{ subtitle }}</span>
                    </p>
                </foreignObject>

                <template v-if="callToAction">
                    <text ref="callToActionText" :x="callToActionBox.x + callToActionBox.width / 2" :y="callToActionBox.y + callToActionBox.height / 2" :font-size="vars.callToActionFontSize" font-family="SF UI Text Regular" dominant-baseline="middle" text-anchor="middle" :fill="twitterColor">
                        {{ callToAction }}
                    </text>

                    <rect :x="callToActionBox.x" :y="callToActionBox.y" :width="callToActionBox.width" :height="callToActionBox.height" :rx="callToActionBox.height / 2" :stroke="twitterColor" :stroke-width="vars.callToActionStrokeWidth" fill="none" />
                </template>
            </template>
        </g>

        <g v-if="text !== null">
            <g v-for="index in 10" :key="index">
                <rect :x="x - 100" :y="bottomY + vars.tweetHeight * (index - 1)" :width="maxWidth + 200" :height="vars.separatorHeight" :fill="previewTextColor" shape-rendering="crispEdges"></rect>

                <circle :cx="circleX" :cy="bottomY + vars.tweetVerticalSpacing + vars.tweetHeight * (index - 1) + vars.circleRadius * 0.8" :r="vars.circleRadius" :fill="previewTextColor" />

                <preview-text
                    :x="textX"
                    :y="bottomY + vars.tweetVerticalSpacing + vars.tweetHeight * (index - 1)"
                    :width="textWidth"
                    :scale="1"
                    :rows="vars.tweetRows"
                    :line-height="vars.lineHeight"
                    :section-spacing="vars.sectionSpacing"
                    :box-width="100"
                    :color="previewTextColor"
                    :min-line-width-ratio="0.3">
                </preview-text>
            </g>
        </g>
    </g>
</template>

<script>
import PreviewText from '../shared/preview_text.vue'
import PreviewVideoPlaceholder from '../shared/preview_video_placeholder.vue'

export default {
    components: {
        previewText: PreviewText,
        previewVideoPlaceholder: PreviewVideoPlaceholder,
    },
    props: {
        device: { type: String },
        isLandscape: { type: Boolean, default: false },
        isCondensed: { type: Boolean, default: false },
        text: { type: String, required: false },
        imageUrls: { type: Array, required: false },
        imageAspectRatio: { type: Number, required: false },
        videoUrl: { type: String, required: false },
        isVideoTranscoding: { type: Boolean, required: false },
        boxIcon: { type: String, required: false },
        title: { type: String, required: false },
        subtitle: { type: String, required: false },
        isSubtitleLink: { type: Boolean, required: false },
        callToAction: { type: String, required: false },
    },
    data () {
        return {
            textHeight: 0,
            callToActionTextWidth: 0,
            isVideoPlaying: false,
        }
    },
    computed: {
        vars () {
            let constants = {
                phone: {
                    topSpacing: this.isLandscape ? 3.5 : 5.6,
                    circleRadius: this.isLandscape ? 2.9 : 4.4,
                    textOffset: this.isCondensed ? 12 : 3.4,
                    lineHeight: this.isLandscape ? 2 : 2.5,
                    sectionSpacing: this.isCondensed ? 8 : 6,
                    textVerticalSpacing: this.isLandscape ? 3 : 4,
                    fontSize: this.isLandscape ? 3 : this.isCondensed ? 6 : 5, // condensed = 4.5 for plain text
                    textLineHeight: this.isLandscape ? 5 : this.isCondensed ? 8 : 7,
                    textBottomSpacing: this.isLandscape ? 3 : this.isCondensed ? 4 : 10,
                    imageOffset: this.isLandscape ? 3.4 : 1.7,
                    cardExtraHeight: this.isLandscape ? 18 : this.isCondensed ? 28 : 20,
                    titleFontSize: this.isLandscape ? 3 : this.isCondensed ? 6 : 5,
                    subtitleFontSize: this.isLandscape ? 3 : this.isCondensed ? 6 : 4,
                    callToActionFontSize: this.isLandscape ? 3 : this.isCondensed ? 6 : 4,
                    callToActionHeight: this.isLandscape ? 7 : this.isCondensed ? 14 : 10,
                    cardTextOffset: this.isLandscape ? 1 : this.isCondensed ? 1.5 : 1,
                    callToActionStrokeWidth: this.isCondensed ? 1 : 0.3,
                    iconWidth: this.isCondensed ? 23 : 15,
                    imageBottomSpacing: 20.1,
                    separatorHeight: this.isCondensed ? 1.5 : 0.3,
                    tweetVerticalSpacing: this.isCondensed ? 13 : 10,
                    tweetHeight: this.isCondensed ? 66 : 53,
                    tweetRows: [
                        { type: 'basic', numLines: 2 },
                        { type: 'basic', numLines: 3 },
                    ],
                },
                tablet: {
                    topSpacing: this.isLandscape ? 4.2 : 6.3,
                    circleRadius: this.isLandscape ? 3.2 : 4.9,
                    textOffset: this.isLandscape ? 2.8 : 3.5,
                    lineHeight: this.isLandscape ? 1.6 : this.isCondensed ? 2.5 : 2.2,
                    sectionSpacing: this.isCondensed ? 10 : 11,
                    textVerticalSpacing: this.isLandscape ? 2 : 3,
                    fontSize: this.isLandscape ? 2.6 : this.isCondensed ? 6 : 3, // condensed = 4.8 for plain text
                    textLineHeight: this.isLandscape ? 4.6 : this.isCondensed ? 8 : 5,
                    textBottomSpacing: this.isLandscape ? 2 : 5,
                    imageOffset: this.isLandscape ? 2.8 : 3.5,
                    cardExtraHeight: this.isLandscape ? 16 : 18,
                    titleFontSize: this.isCondensed ? 5 : 2.4,
                    subtitleFontSize: this.isCondensed ? 5 : 2.2,
                    callToActionFontSize: this.isCondensed ? 5 : 2.6,
                    callToActionHeight: this.isCondensed ? 10 : 6.5,
                    cardTextOffset: this.isLandscape ? 1.2 : this.isCondensed ? 0.5 : 1.5,
                    callToActionStrokeWidth: this.isCondensed ? 0.6 : 0.3,
                    iconWidth: this.isCondensed ? 17 : 15,
                    imageBottomSpacing: 9.6,
                    separatorHeight: 0.6,
                    tweetVerticalSpacing: 9,
                    tweetHeight: 60,
                    tweetRows: [
                        { type: 'basic', numLines: 2 },
                        { type: 'basic', numLines: 4 },
                    ],
                },
                desktop: {
                    topSpacing: 5,
                    circleRadius: 4,
                    textOffset: 2.5,
                    lineHeight: 2.2,
                    sectionSpacing: 8,
                    textVerticalSpacing: 4,
                    fontSize: 3,
                    textLineHeight: 5,
                    textBottomSpacing: 4,
                    imageOffset: 2.5,
                    cardExtraHeight: 18,
                    titleFontSize: 3,
                    subtitleFontSize: 2.8,
                    callToActionFontSize: 3.5,
                    callToActionHeight: 9,
                    cardTextOffset: 1.6,
                    callToActionStrokeWidth: 0.3,
                    iconWidth: 15,
                    imageBottomSpacing: 16,
                    separatorHeight: 0.4,
                    tweetVerticalSpacing: 6,
                    tweetHeight: 60,
                    tweetRows: [
                        { type: 'basic', numLines: 2 },
                        { type: 'basic', numLines: 4 },
                    ],
                },
            }

            return constants[this.device]
        },
        topRows () {
            return [
                { type: 'basic', numLines: 1 },
            ]
        },
        maskId () {
            return `screen-mask-${this._uid}`
        },
        topY () {
            return this.text === null ? this.y : this.y + this.vars.topSpacing
        },
        textEndY () {
            return this.text === null ? this.topY : this.topY + this.vars.textVerticalSpacing + Math.max(this.vars.textLineHeight, this.textHeight) + this.vars.textBottomSpacing
        },
        imageBox () {
            let offsetX = this.vars.circleRadius * 2 + this.vars.imageOffset
            let width = this.x + this.maxWidth - offsetX

            let aspectRatio
            if (this.imageAspectRatio) {
                aspectRatio = this.imageAspectRatio
            } else {
                let n = Math.max(2, this.imageUrls && this.imageUrls.length > 0 ? this.imageUrls.length : 0)
                aspectRatio = n / (n - 1)
            }

            return {
                x: this.x + offsetX,
                y: this.textEndY,
                width: width,
                height: width / aspectRatio,
            }
        },
        cardBox () {
            if (!this.title) {
                return this.imageBox
            }
            return { ...this.imageBox, height: this.imageBox.height + this.vars.cardExtraHeight }
        },
        imageBoxes () {
            let boxes = []
            let x = this.imageBox.x, y = this.imageBox.y, width = this.imageBox.width, height = this.imageBox.height
            let horizontalPadding = 0.7
            let verticalPadding = 0.5
            if (this.imageUrls.length === 1) {
                boxes = [
                    { x: x, y: y, width: width, height: height },
                ]
            } else if (this.imageUrls.length === 2) {
                boxes = [
                    { x: x, y: y, width: width / 2 - horizontalPadding, height: height },
                    { x: x + width / 2 + horizontalPadding, y: y, width: width / 2 - horizontalPadding, height: height },
                ]
            } else if (this.imageUrls.length === 3) {
                let squareSize = height / 2
                boxes = [
                    { x: x, y: y, width: width - squareSize - horizontalPadding, height: height },
                    { x: x + width - squareSize + horizontalPadding, y: y, width: squareSize - horizontalPadding, height: squareSize - verticalPadding },
                    { x: x + width - squareSize + horizontalPadding, y: y + squareSize + verticalPadding, width: squareSize - horizontalPadding, height: squareSize - verticalPadding },
                ]
            } else if (this.imageUrls.length >= 4) {
                let squareSize = height / 3
                boxes = [
                    { x: x, y: y, width: width - squareSize - horizontalPadding, height: height },
                    { x: x + width - squareSize + horizontalPadding, y: y, width: squareSize - horizontalPadding, height: squareSize - verticalPadding },
                    { x: x + width - squareSize + horizontalPadding, y: y + squareSize + verticalPadding, width: squareSize - horizontalPadding, height: squareSize - verticalPadding },
                    { x: x + width - squareSize + horizontalPadding, y: y + 2 * (squareSize + verticalPadding), width: squareSize - horizontalPadding, height: squareSize - verticalPadding },
                ]
            }

            return boxes.map((b, index) => ({ ...b, url: this.imageUrls[index] }))
        },
        callToActionBox () {
            let spacing = 6
            let width = this.callToActionTextWidth + 2 * spacing
            return {
                x: this.cardBox.x + this.cardBox.width - width - 3,
                y: this.cardBox.y + this.imageBox.height + this.vars.cardExtraHeight / 2 - this.vars.callToActionHeight / 2,
                width: width,
                height: this.vars.callToActionHeight,
            }
        },
        contentOffsetX () {
            return this.vars.textOffset + this.vars.circleRadius * 2
        },
        bottomY () {
            if (this.imageUrls.length === 0) {
                return this.textEndY - this.vars.textBottomSpacing + this.vars.imageBottomSpacing
            }
            return this.textEndY + this.cardBox.height + this.vars.imageBottomSpacing
        },
        textX () {
            return this.x + this.contentOffsetX
        },
        textWidth () {
            return this.maxWidth - this.contentOffsetX
        },
        circleX () {
            return this.x + this.vars.circleRadius
        },
        cardTextWidth () {
            let spacing = 4
            let startX = this.cardBox.x
            if (this.callToAction) {
                return this.callToActionBox.x - startX - 2 * spacing
            }
            return this.cardBox.x + this.cardBox.width - startX - 2 * spacing
        },
        iconTransform () {
            let x = this.imageBox.x + this.imageBox.width / 2 - this.paths.playButton.width / 2
            let y = this.imageBox.y + this.imageBox.height / 2 - this.paths.playButton.height / 2

            return {
                'transform-box': 'fill-box',
                'transform-origin': `center`,
                'transform': `translate(${x}px, ${y}px) scale(${this.vars.iconWidth / this.paths.playButton.width})`,
            }
        },
        textParts () {
            return this.text.replace(/\n/g, ' ').replace(/\s+/g, ' ').split(' ').map(word => {
                if (word.startsWith('https://') || word.startsWith('http://')) {
                    return { isLink: true, text: word }
                } else {
                    return { isLink: false, text: word }
                }
            })
        },
    },
    watch: {
        text () {
            this.$nextTick(() => {
                if (this.text !== null) {
                    this.textHeight = this.$refs.textSpan.clientHeight
                }
            })
        },
        callToAction () {
            if (this.title) {
                this.$nextTick(() => this.callToActionTextWidth = this.$refs.callToActionText.getBBox().width)
            }
        },
    },
    created () {
        this.transcodingText = 'We’re processing this video. After a few moments, please refresh your browser.'
        this.x = 0
        this.y = 0
        this.maxWidth = 100
        this.twitterColor = '#1EA1F1'
        this.previewTextColor = '#E7E7E7'

        this.paths = {
            playButton: {
                d: 'M 18.382 37.5 L 18.382 12.5 L 37.5 25.001 L 18.382 37.5 Z M 24.999 0 C 11.176 0 0 11.177 0 25.001 C 0 38.824 11.176 50 24.999 50 C 38.822 50 50 38.824 50 25.001 C 50 11.177 38.822 0 24.999 0 L 24.999 0 Z',
                width: 50,
                height: 50,
            },
        }
    },
    mounted () {
        this.$nextTick(() => {
            if (this.text !== null) {
                this.textHeight = this.$refs.textSpan.clientHeight
            }
            if (this.title && this.callToAction) {
                this.callToActionTextWidth = this.$refs.callToActionText.getBBox().width
            }
        })

        // Hack for some devices (e.g. iPhone 7) that initially return incorrect clientHeight for text in foreignObject
        for (var i = 1; i <= 5; i++) {
            setTimeout(() => {
                if (this.text !== null) {
                    this.textHeight = this.$refs.textSpan.clientHeight
                }
            }, i * 50)
        }
    },
    methods: {
        triggerAutoplay () {
            this.$nextTick(() => {
                if (this.videoUrl && !this.isVideoPlaying) {
                    this.positionVideo()
                    this.$refs.video.muted = true
                    this.$refs.video.play()
                    this.isVideoPlaying = true
                }
            })
        },
        positionVideo () {
            if (this.videoUrl && this.$refs.videoContainer && this.$refs.videoSurface) {
                let x, y, width, height

                let useBoundingRect = !navigator.userAgent.toLowerCase().includes('firefox')
                if (useBoundingRect) {
                    let boundingRect = this.$refs.videoSurface[0].getBoundingClientRect()

                    x = boundingRect.x || boundingRect.left
                    y = (boundingRect.y || boundingRect.top) + window.scrollY
                    width = boundingRect.width
                    height = boundingRect.height
                } else {
                    x = this.imageBox.x
                    y = this.imageBox.y
                    width = this.imageBox.width
                    height = this.imageBox.height
                }

                let currentWidth = this.$refs.videoContainer.getAttribute('width')
                let currentHeight = this.$refs.videoContainer.getAttribute('height')

                this.$refs.videoContainer.setAttribute('x', x)
                this.$refs.videoContainer.setAttribute('y', y)
                this.$refs.videoContainer.setAttribute('width', width)
                this.$refs.videoContainer.setAttribute('height', height)
                this.$refs.video.setAttribute('width', width)
                this.$refs.video.setAttribute('height', height)

                // In Safari video does not get resized unless we hide it
                let isSameSize = currentWidth === this.$refs.videoContainer.getAttribute('width') && currentHeight === this.$refs.videoContainer.getAttribute('height')
                if (this.isVideoPlaying && !isSameSize) {
                    this.isVideoPlaying = false

                    setTimeout(() => {
                        this.isVideoPlaying = true
                    }, 0)
                }
            }
        },
        playVideo () {
            if (this.videoUrl && !this.isVideoPlaying) {
                this.positionVideo()
                this.$refs.video.muted = false
                this.isVideoPlaying = true
                let promise = this.$refs.video.play()

                if (promise !== undefined) {
                    promise.catch(error => {
                        // Auto-play was prevented
                    })
                }
            }
        },
        stopVideo () {
            if (this.videoUrl && this.isVideoPlaying) {
                this.$refs.video.currentTime = 0
                this.$refs.video.pause()
                this.isVideoPlaying = false
            }
        },
    },
}
</script>

<style lang="less" scoped>
@import (reference) '../../../../shared/components/variables';

.preview-screen-twitter {
    &__text {
        font-family: @regular-text-font;
        color: #333;
        text-align: left;
        padding-left: 1px; // Fixes a bug where text gets cut from the left on some devices (e.g. iPad Pro)
    }

    &__card-text {
        overflow: hidden;
        text-overflow: ellipsis;
        font-family: @regular-text-font;
        text-align: left;
        white-space: nowrap;
        color: #333;
        padding-left: 1px; // Fixes a bug where text gets cut from the left on some devices (e.g. iPad Pro)
    }

    &__preview-video {
        object-fit: cover;
        height: 100%;
        width: 100%;
        clip-path: inset(0 0 0 0);
        cursor: pointer;
    }
}
</style>

<style lang="less">
.preview-screen-twitter {
    &__link {
        cursor: pointer;
        color: #1EA1F1;
    }
}
</style>
