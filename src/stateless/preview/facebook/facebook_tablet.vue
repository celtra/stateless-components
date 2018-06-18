<template>
    <g :transform="coordinateTransform">
        <defs>
            <polygon id="path-1" :points="whiteMaskPoints"></polygon>
            <path :d="`M6.40971 0H${carouselCardDimensions.width - 5}c2.2288 0 3.037.23206 3.85182.66783.81482.43577 1.45429 1.07524 1.89006 1.89006.43577.81481.66783 1.62303.66783 3.85182V${carouselCardDimensions.height}H0V6.40971c0-2.2288.23206-3.037.66783-3.85182.43577-.81482 1.07524-1.4543 1.89006-1.89006C3.3727.23206 4.18092 0 6.4097 0z`" id="path-3"/>
            <path :d="`M6.40971 0H${carouselCardDimensions.width - 5}c2.2288 0 3.037.23206 3.85182.66783.81482.43577 1.45429 1.07524 1.89006 1.89006.43577.81481.66783 1.62303.66783 3.85182V${carouselCardDimensions.height}H0V6.40971c0-2.2288.23206-3.037.66783-3.85182.43577-.81482 1.07524-1.4543 1.89006-1.89006C3.3727.23206 4.18092 0 6.4097 0z`" id="path-5"/>
            <clipPath id="clip-thumbnail">
                <rect x="0" y="267" width="768" height="444" />
            </clipPath>
        </defs>
        <mask id="mask-2" fill="#fff">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#path-1"></use>
        </mask>
        <use id="Mask" fill="#FFF" fill-rule="nonzero" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#path-1"></use>
        <polygon id="Fill-2" :fill="facebookGrayColor" fill-rule="nonzero" mask="url(#mask-2)" :points="blueBannerPoints"></polygon>

        <g :transform="isLandscape ? 'translate(0, -50)' : 'translate(0, 0)'">
            <!-- PREVIEW POST TEXT -->
            <g id="preview-post-text">
                <path d="M25 174c0 19.3302 15.6698 35 35 35 19.3302 0 35-15.6698 35-35 0-19.3302-15.6698-35-35-35-19.3302 0-35 15.6698-35 35z" id="Path" :fill="facebookGrayColor" fill-rule="nonzero"></path>
                <polygon id="Fill-4" :fill="facebookGrayColor" fill-rule="nonzero" points="115 164 417 164 417 149 115 149"></polygon>
                <foreignObject :width="postTextWidth" height="72" overflow="hidden" font-family="SFUIText-Regular, SF UI Text Regular" font-size="20" x="116" y="171">
                    <pre ref="postTextElement" xmlns="http://www.w3.org/1999/xhtml" style="max-height: 100%; text-align: left; margin:0; white-space: pre-wrap; font-family: SF UI Text Regular;" v-html="formattedPostText">
                    </pre>
                </foreignObject>
            </g>

            <!-- PREVIEW MEDIA CONTENT -->
            <g id="preview-media" :transform="mediaPartTransform">
                <g>
                    <!-- Carousel -->
                    <g id="carousel" v-if="format.id === 'FacebookCarouselAdPost'">
                        <g id="cards" :style="{transform: cardsTransform}" ref="carouselSwipable" class="carousel" :class="{'carousel--animate-transform': !isSwiping}">
                            <g v-for="(card, index) in carouselItems" :key="index" @click="cardClick(card)" class="carousel__card">
                                <g :transform="carouselCardTransform(index)">
                                    <g id="card-bottom-1" :transform="`translate(0 ${carouselCardDimensions.width - 1})`" fill="none">
                                        <foreignObject :width="carouselTextWidth" height="18" overflow="hidden" font-family="SFUIText-Regular, SF UI Text Regular" font-size="16" x="18" y="30">
                                            <p ref="carouselHeadlineElement1" xmlns="http://www.w3.org/1999/xhtml" style="max-height: 100%; text-align: left; margin:0; overflow: hidden; white-space: nowrap; text-overflow: ellipsis">
                                                {{ card.headline }}
                                            </p>
                                        </foreignObject>

                                        <foreignObject :width="carouselTextWidth" height="18" overflow="hidden" font-family="SFUIText-Regular, SF UI Text Regular" font-size="16" x="18" y="110">
                                            <p ref="carouselDescriptionElement1" xmlns="http://www.w3.org/1999/xhtml" :style="`max-height: 100%; text-align: left; margin:0; overflow: hidden; color: ${facebookDarkGrayColor}; white-space: nowrap; text-overflow: ellipsis`">
                                                {{ card.description }}
                                            </p>
                                        </foreignObject>

                                        <g id="carousel-cta-1" :transform="carouselCtaTransform" v-if="callToActionText">
                                            <rect id="Rectangle-4" :stroke="facebookDarkGrayColor" stroke-width="3" x="1.5" y="1.5" :width="carouselCtaDimensions.width" :height="carouselCtaDimensions.height" rx="10"></rect>
                                            <text font-family="SFUIText-Regular, SF UI Text Regular" :font-size="carouselCtaFontSize" letter-spacing="-.36667" :fill="facebookDarkGrayColor" style="text-anchor: middle; cursor: pointer" @click="$root.$emit('open-url', card.link)">
                                                <tspan :x="carouselCtaDimensions.width / 2" :y="(carouselCtaDimensions.height / 2) + (carouselCtaFontSize / 3)">{{ callToActionText }}</tspan>
                                            </text>
                                        </g>

                                        <path :d="`M0 0v${carouselCtaContainerHeight}c0 2.48527 2.01472 4.5 4.5 4.5h${carouselCardDimensions.width - 7.6}c2.48528 0 4.5-2.01473 4.5-4.5V1.1441H.5z`" id="card-bottom-outline" :stroke="facebookGrayColor" fill="transparent"></path>
                                    </g>

                                    <g id="image-card-top-1">
                                        <clipPath id="clip3">
                                            <use xlink:href="#path-3"/>
                                        </clipPath>

                                        <template v-if="card.isVideoTranscoding">
                                            <preview-video-placeholder clip-path="url(#clip3)" :key="index" :width="carouselCardDimensions.width" :height="carouselCardDimensions.height" :font-size="14" :text="transcodingTextShort"></preview-video-placeholder>
                                        </template>

                                        <g v-show="!card.isVideoTranscoding">
                                            <rect x="1" y="1" :width="carouselCardDimensions.width - 1" :height="carouselCardDimensions.height - 1" fill="#fff" clip-path="url(#clip3)" />
                                            <image :xlink:href="card.url" :width="carouselCardDimensions.width" :height="carouselCardDimensions.height" clip-path="url(#clip3)" ref="carouselVideoPosition" @click.stop="card.videoUrl ? playVideo($refs.carouselVideo[index], $refs.carouselVideoPosition[index], index) : playGif('gif' + index)" />

                                            <image v-show="gifPlaying === 'gif' + index" @click.stop="stopGif($refs.gif)" :xlink:href="card.animatedImageUrl" :width="carouselCardDimensions.width" :height="carouselCardDimensions.height" clip-path="url(#clip3)" ref="carouselGif"/>

                                            <foreignObject v-show="videoPlaying === index" ref="carouselVideoContainer" @click.stop="pauseVideo($refs.carouselVideo[index])" :width="carouselCardDimensions.width" :height="carouselCardDimensions.height">
                                                <video playsinline class="video" :class="{'video--animate-transform': !isSwiping}" ref="carouselVideo" @ended="stopVideo($refs.carouselVideo[index])" :src="card.videoUrl" style="object-fit: contain; height: 100%; width: 100%; clip-path: url(#clip3); cursor: pointer;"></video>
                                            </foreignObject>

                                            <g id="carousel-card-play-button-1" :transform="carouselCardPlayButtonTransform(index)" @click.stop="card.videoUrl ? playVideo($refs.carouselVideo[index], $refs.carouselVideoPosition[index], index) : playGif('gif' + index)" @touchstart.stop @mousedown.stop>
                                                <path v-if="(card.videoUrl || card.animatedImageUrl) && !(videoPlaying === index) && !(gifPlaying === 'gif' + index)" d="M23,45V15l20,15.009L23,45z M30,0C13.431,0,0,13.432,0,30s13.431,30,30,30c16.568,0,30-13.432,30-30 S46.568,0,30,0z" fill="#FFF" fill-rule="nonzero" style="cursor: pointer;"/>
                                            </g>
                                        </g>
                                        <use id="image" fill="none" :stroke="facebookGrayColor" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#path-3"></use>
                                    </g>
                                </g>
                            </g>

                        </g>

                        <g id="post-actions" :transform="postActionsTransform" fill="none" fill-rule="evenodd">
                            <g :fill="facebookGrayColor" fill-rule="nonzero">
                                <g>
                                    <path d="M0 16c0 8.83667 7.16333 16 16 16s16-7.16333 16-16S24.83667 0 16 0 0 7.16333 0 16z"></path>
                                    <polygon points="58.2857143 23 141.714286 23 141.714286 8 58.2857143 8"></polygon>
                                </g>

                                <g :transform="postActionTransform(0)">
                                    <path d="M228.85714 16c0 8.83667 7.16334 16 16 16 8.83667 0 16-7.16333 16-16s-7.16333-16-16-16c-8.83666 0-16 7.16333-16 16z"></path>
                                    <polygon points="287.142857 23 345.428571 23 345.428571 8 287.142857 8"></polygon>
                                </g>

                                <g :transform="postActionTransform(1)">
                                    <path d="M432.57143 16c0 8.83667 7.16333 16 16 16 8.83666 0 16-7.16333 16-16s-7.16334-16-16-16c-8.83667 0-16 7.16333-16 16z"></path>
                                    <polygon points="490.857143 23 574.285714 23 574.285714 8 490.857143 8"></polygon>
                                </g>
                            </g>
                        </g>

                        <g id="dummy-post" :transform="dummyPostTransform">
                            <g transform="translate(22 0)">
                                <path d="M1 950c0 19.3302 15.6698 35 35 35 19.3302 0 35-15.6698 35-35 0-19.3302-15.6698-35-35-35-19.3302 0-35 15.6698-35 35z" :fill="facebookGrayColor" fill-rule="nonzero"></path>
                                <polygon :fill="facebookGrayColor" fill-rule="nonzero" points="100 940 596 940 596 925 100 925"></polygon>
                                <polygon :fill="facebookGrayColor" fill-rule="nonzero" points="100 975 269 975 269 960 100 960"></polygon>
                                <polygon :fill="facebookGrayColor" fill-rule="nonzero" points="100 1010 353 1010 353 995 100 995"></polygon>
                            </g>

                            <g :transform="separatorScale">
                                <polygon :fill="facebookGrayColor" fill-rule="nonzero" mask="url(#b)" points="-3 868 767 868 767 863 -3 863"></polygon>
                            </g>
                        </g>
                    </g>

                    <!-- Photo, Video -->
                    <g id="photo-video" fill="none" fill-rule="evenodd" v-else>
                        <g id="preview-text" :transform="previewTextTransform" v-if="callToActionSectionPresent">
                            <foreignObject :width="ctaTextContentWidth" height="32" overflow="hidden" font-family="SFUIText-Regular, SF UI Text Regular" font-size="16" x="20" y="30">
                                <p ref="headlineElement" xmlns="http://www.w3.org/1999/xhtml" style="max-height: 100%; text-align: left; margin:0; overflow: hidden; white-space: nowrap; text-overflow: ellipsis">
                                    {{ headline }}
                                </p>
                            </foreignObject>

                            <foreignObject :width="ctaTextContentWidth" height="32" overflow="hidden" font-family="SFUIText-Regular, SF UI Text Regular" font-size="15" x="20" y="75">
                                <p ref="linkDescriptionElement" xmlns="http://www.w3.org/1999/xhtml" :style="`max-height: 100%; text-align: left; margin:0; overflow: hidden; color: ${facebookDarkGrayColor}; white-space: nowrap; text-overflow: ellipsis`">
                                    {{ linkDescription }}
                                </p>
                            </foreignObject>

                            <foreignObject :width="ctaTextContentWidth" height="30" overflow="hidden" font-family="SFUIText-Regular, SF UI Text Regular" font-size="14" x="20" y="150">
                                <p ref="displayLinkElement" xmlns="http://www.w3.org/1999/xhtml" :style="`max-height: 100%; text-align: left; margin:0; overflow: hidden; color: ${facebookDarkGrayColor}; white-space: nowrap; text-overflow: ellipsis`">
                                    {{ formattedDisplayLink }}
                                </p>
                            </foreignObject>
                            <g @click="$root.$emit('open-url', link)" style="cursor: pointer">
                                <path :d="generateCtaOutlinePath" id="preview-text-bottom-outline" :stroke="facebookGrayColor" fill="transparent"></path>
                                <g id="CTA" :transform="transformCta" v-if="callToActionText">
                                    <rect id="Rectangle-4" :stroke="facebookDarkGrayColor" x=".5" y=".5" :width="ctaDimensions.width" :height="ctaDimensions.height" rx="5" stroke-width="3"></rect>
                                    <text font-family="SFUIText-Regular, SF UI Text Regular" :font-size="ctaFontSize" letter-spacing="-.2" :fill="facebookDarkGrayColor" text-anchor="middle">
                                        <tspan :x="ctaDimensions.width / 2" :y="(ctaDimensions.height / 2) + (ctaFontSize / 3)">{{ callToActionText }}</tspan>
                                    </text>
                                </g>
                            </g>
                        </g>

                        <g id="preview-media-content" :transform="`translate(${mediaContentPadding.x} ${mediaContentPadding.y})`">
                            <rect :fill="facebookGrayColor" :width="mediaContentDimensions.width" :height="mediaContentDimensions.height"/>

                            <image v-if="videoUrl" :xlink:href="thumbnailUrl" class="post-svg-image" :height="mediaContentDimensions.height" :width="mediaContentDimensions.width" preserve-aspect-ratio="xMinYMin slice" style="cursor: pointer;" @click="playVideo($refs.video, $refs.videoPosition, $refs.videoContainer)" ref="videoPosition"/>
                            <image v-else :xlink:href="thumbnailUrl" class="post-svg-image" :width="mediaContentDimensions.width" :height="mediaContentDimensions.height" preserve-aspect-ratio="xMinYMin slice" style="cursor: pointer;" @click="playGif($refs.gif)"/>

                            <image v-show="gifPlaying" @click="stopGif($refs.gif)" :xlink:href="animatedImageUrl" ref="gif" class="post-gif-image" :width="mediaContentDimensions.width" :height="mediaContentDimensions.height" preserve-aspect-ratio="xMinYMin slice"/>

                            <foreignObject v-show="videoPlaying" ref="videoContainer" @click="pauseVideo($refs.video)" :height="mediaContentDimensions.height" :width="mediaContentDimensions.width" >
                                <video playsinline ref="video" @ended="stopVideo($refs.video)" :src="videoUrl" style="object-fit: cover; height: 100%; width: 100%; clip-path: inset(0 0 0 0); cursor: pointer;"></video>
                            </foreignObject>

                            <preview-video-placeholder v-if="isVideoTranscoding" :width="mediaContentDimensions.width" :height="mediaContentDimensions.height" :font-size="14" :text="transcodingText"></preview-video-placeholder>

                            <g id="video-play-button" :transform="videoPlayButtonTransform">
                                <path v-if="format.id === 'FacebookVideoAdPost' && !videoPlaying && !isVideoTranscoding && !gifPlaying" d="M23,45V15l20,15.009L23,45z M30,0C13.431,0,0,13.432,0,30s13.431,30,30,30c16.568,0,30-13.432,30-30 S46.568,0,30,0z" fill="#FFF" fill-rule="nonzero" style="cursor: pointer;" @click="videoUrl ? playVideo($refs.video, $refs.videoPosition, $refs.videoContainer) : playGif($refs.gif)"/>
                            </g>
                        </g>

                        <g id="bottom-dummy-content">
                            <g id="post-actions" :transform="postActionsTransform" :fill="facebookGrayColor" fill-rule="nonzero">
                                <g>
                                    <path d="M0 16c0 8.83667 7.16333 16 16 16s16-7.16333 16-16S24.83667 0 16 0 0 7.16333 0 16z"/>
                                    <polygon points="58.2857143 23 141.714286 23 141.714286 8 58.2857143 8"/>
                                </g>

                                <g :transform="postActionTransform(0)">
                                    <path d="M228.85714 16c0 8.83667 7.16334 16 16 16 8.83667 0 16-7.16333 16-16s-7.16333-16-16-16c-8.83666 0-16 7.16333-16 16z"/>
                                    <polygon points="287.142857 23 345.428571 23 345.428571 8 287.142857 8"/>
                                </g>

                                <g :transform="postActionTransform(1)">
                                    <path d="M432.57143 16c0 8.83667 7.16333 16 16 16 8.83666 0 16-7.16333 16-16s-7.16334-16-16-16c-8.83667 0-16 7.16333-16 16z"/>
                                    <polygon points="490.857143 23 574.285714 23 574.285714 8 490.857143 8"/>
                                </g>
                            </g>

                            <g id="dummy-post" :transform="dummyPostTransform">
                                <path d="M21 950c0 19.3302 15.6698 35 35 35 19.3302 0 35-15.6698 35-35 0-19.3302-15.6698-35-35-35-19.3302 0-35 15.6698-35 35z" :fill="facebookGrayColor" fill-rule="nonzero"/>
                                <polygon :fill="facebookGrayColor" fill-rule="nonzero" points="117 940 613 940 613 925 117 925"/>
                                <polygon :fill="facebookGrayColor" fill-rule="nonzero" points="117 975 286 975 286 960 117 960"/>
                                <polygon :fill="facebookGrayColor" fill-rule="nonzero" points="117 1010 370 1010 370 995 117 995"/>

                                <g :transform="separatorScale">
                                    <polygon :fill="facebookGrayColor" fill-rule="nonzero" mask="url(#b)" points="-3 868 767 868 767 863 -3 863"/>
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
            </g>
        </g>
    </g>
</template>

<script>
import PreviewVideoPlaceholder from '../shared/preview_video_placeholder.vue'
import { FacebookPreviewMixin, FacebookPhotoPreviewMixin, FacebookVideoPreviewMixin, SwipableCarouselMixin } from './facebook_mixins'

export default {
    components: {
        previewVideoPlaceholder: PreviewVideoPlaceholder,
    },
    mixins: [FacebookPreviewMixin, FacebookPhotoPreviewMixin, FacebookVideoPreviewMixin, SwipableCarouselMixin],
    props: {
        format: { type: Object, required: true },
        isInteractive: { type: Boolean, required: true },
        postText: { type: String, required: false },
        link: { type: String, required: false },
        displayLink: { type: String, required: false },
        callToAction: { type: String, required: false },
        headline: { type: String, required: false },
        linkDescription: { type: String, required: false },
        thumbnailUrl: { type: String, required: false },
        videoUrl: { type: String, required: false },
        animatedImageUrl: { type: String, required: false },
        isVideoTranscoding: { type: Boolean, required: false },
        carouselItems: { type: Array, required: false },
    },
    data () {
        return {
            dimensions: { width: 100, height: 100 },
            isLandscape: false,
            postTextHeight: 24,
            imageAspectRatio: 1.78,
        }
    },
    computed: {
        postTextHeightDifference () {
            return Math.max(0, this.postTextHeight - this.initialPostTextHeight)
        },
        postTextWidth () {
            return this.dimensions.width < 750 ? 450 : 550
        },
        mediaContentDimensions () {
            let width = this.dimensions.width - (this.mediaContentPadding.x * 2)
            let height = width / this.imageAspectRatio

            if (this.format.id === 'FacebookCarouselAdPost') {
                height = (width - this.mediaContentPadding.x - this.carouselCardPadding) / 2
            }

            return { width, height }
        },
        mediaContentPadding () {
            let x = this.callToActionSectionPresent ? 10 : 0
            let y = 267

            if (this.isLandscape) {
                x = 89
            }

            return { x, y }
        },
        ctaDimensions () {
            let width = Math.min(250, this.mediaContentDimensions.width / 3)
            let height = width / 3

            return { width, height }
        },
        ctaFontSize () {
            return this.ctaDimensions.width / 10
        },
        ctaTextContentWidth () {
            return this.mediaContentDimensions.width - this.ctaDimensions.width - 50
        },
        carouselCardDimensions () {
            let width = (this.mediaContentDimensions.width / 2) + 25

            if (this.isLandscape) {
                width = (this.mediaContentDimensions.width - this.carouselCardPadding) / 2
            }

            let height = width

            return { width, height }
        },
        carouselTextWidth () {
            return this.carouselCardDimensions.width / 3
        },
        carouselCtaDimensions () {
            let width = this.carouselCardDimensions.width / 2
            let height = width / 3

            return { width, height }
        },
        carouselCtaFontSize () {
            return this.carouselCardDimensions.width / 18
        },
        blueBannerHeight () {
            return !this.isLandscape ? 100 : 50
        },
        whiteMaskPoints () {
            return `0 ${this.dimensions.height} ${this.dimensions.width} ${this.dimensions.height} ${this.dimensions.width} 0 0 0`
        },
        blueBannerPoints () {
            return `0 ${this.blueBannerHeight} ${this.dimensions.width} ${this.blueBannerHeight} ${this.dimensions.width} 0 0 0`
        },
        generateCtaOutlinePath () {
            return `M.5.7958V${this.ctaContainerHeight}c0 2.48528 2.01472 4.5 4.5 4.5h${this.mediaContentDimensions.width - 10}c2.48528 0 4.5-2.01472 4.5-4.5V.7958H.5z`
        },
        coordinateTransform () {
            return `scale(${100 / this.dimensions.width})`
        },
        mediaPartTransform () {
            return `translate(0 ${this.postTextHeightDifference})`
        },
        carouselCtaTransform () {
            let translateX = this.carouselCardDimensions.width - this.carouselCtaDimensions.width - 15
            let translateY = (this.carouselCtaContainerHeight / 5 * 3) - (this.carouselCtaDimensions.height / 2)

            return `translate(${translateX} ${translateY})`
        },
        cardsTransform () {
            return `translate(${this.swipeOffset}px, 0px)`
        },
        transformCta () {
            let translateX = this.mediaContentDimensions.width - this.ctaDimensions.width - 15
            let translateY = (this.ctaContainerHeight / 2) - 35

            return `translate(${translateX} ${translateY})`
        },
        mediaContentHeight () {
            let height = this.mediaContentDimensions.height

            if (this.callToActionSectionPresent) {
                height += this.format.id === 'FacebookCarouselAdPost' ? this.carouselCtaContainerHeight : this.ctaContainerHeight
                height += 50
            }

            return height
        },
        previewTextTransform () {
            let translateY = this.mediaContentPadding.y + this.mediaContentDimensions.height

            return `translate(${this.mediaContentPadding.x}, ${translateY})`
        },
        videoPlayButtonTransform () {
            let playButtonWidth = 60
            let playButtonHeight = 60

            let translateX = (this.mediaContentDimensions.width / 2) - (playButtonWidth / 2)
            let translateY = (this.mediaContentDimensions.height / 2) - (playButtonHeight / 2)

            return `translate(${translateX} ${translateY})`
        },
        postActionsTransform () {
            let translateY = this.mediaContentHeight + this.postActionsOffset

            return `translate(${this.postActionsPadding} ${translateY})`
        },
        dummyPostTransform () {
            const dummyPostOffsetInSvg = 950

            let translateY = (this.postTextHeightDifference + this.mediaContentPadding.y + this.mediaContentHeight + this.dummyPostOffset) - dummyPostOffsetInSvg

            return `translate(0 ${translateY})`
        },
        separatorScale () {
            return `scale(${this.dimensions.width / 500}, 1)`
        },
        maxHeight () {
            let maxHeight = this.mediaContentPadding.y + this.mediaContentDimensions.height + this.postActionsOffset + this.dummyPostOffset

            if (this.callToActionSectionPresent) {
                maxHeight += this.format.id === 'FacebookCarouselAdPost' ? this.carouselCtaContainerHeight : this.ctaContainerHeight
            }

            return Math.max(maxHeight, this.dimensions.height)
        },
    },
    created () {
        this.initialPostTextHeight = 24
        this.ctaContainerHeight = 200
        this.carouselCtaContainerHeight = 175
        this.postActionsOffset = 350
        this.postActionsPadding = 25
        this.dummyPostOffset = 300
        this.carouselCardPadding = 25
        this.firstCardPadding = 10
        this.firstCardLandscapePadding = 88
        this.lastCardPadding = 75
        this.lastCardLandscapePadding = -45
        this.transcodingText = 'We’re processing this video. After a few moments, please refresh your browser.'
        this.transcodingTextShort = 'We’re processing this video.'
        this.facebookGrayColor = '#E7E7E7'
        this.facebookDarkGrayColor = '#AAAAB0'
        this.facebookLinkColor = '#365899'
    },
    mounted () {
        this.postTextHeight = this.$refs.postTextElement.clientHeight

        this.$nextTick(() => {
            this.setPreviewHeight()
            this.measureThumbnailAspectRatio()
            if (this.format.id === 'FacebookCarouselAdPost'){
                this.attachEventListeners()
            }
        })
    },
    beforeDestroy () {
        if (this.format.id === 'FacebookCarouselAdPost'){
            this.detachEventListeners()
        }
    },
    methods: {
        carouselCardTransform (index) {
            let translateX = this.mediaContentPadding.x + (index * this.carouselCardDimensions.width) + (index * this.carouselCardPadding)
            let translateY = this.mediaContentPadding.y

            return `translate(${translateX} ${translateY})`
        },
        carouselCardPlayButtonTransform (index) {
            let playButtonWidth = 60
            let playButtonHeight = 60

            let translateX = (this.carouselCardDimensions.width / 2) - (playButtonWidth / 2)
            let translateY = (this.carouselCardDimensions.height / 2) - (playButtonHeight / 2)

            return `translate(${translateX} ${translateY})`
        },
        postActionTransform (index) {
            let translateX = (this.dimensions.width - (2 * this.postActionsPadding) - 575) / 2

            return `translate(${translateX * (index + 1)} 0)`
        },
        cardClick (card) {
            if (this.isInteractive && !this.shouldPreventCardClick){
                this.$root.$emit('open-url', card.link)
            }
        },
    },
}
</script>

<style lang="less" scoped>
    .carousel__card {
        cursor: pointer;
    }
</style>
