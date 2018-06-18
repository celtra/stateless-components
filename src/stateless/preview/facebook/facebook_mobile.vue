<template>
    <g :transform="coordinateTransform">
        <defs>
            <polygon id="path-1" :points="whiteMaskPoints"></polygon>
            <clipPath id="clip-thumbnail">
                <rect :width="mediaContentDimensions.width" :height="mediaContentDimensions.height" />
            </clipPath>
        </defs>
        <mask id="mask-2" fill="#fff">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#path-1"></use>
        </mask>
        <use id="Mask" fill="#FFF" fill-rule="nonzero" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#path-1"></use>

        <polygon id="Fill-2" :fill="facebookGrayColor" fill-rule="nonzero" mask="url(#mask-2)" :points="blueBannerPoints"></polygon>

        <!-- PREVIEW POST TEXT -->
        <g id="preview-post-text" transform="translate(-2, 0)">
            <path d="M12 76c0 7.1798 5.8202 13 13 13s13-5.8202 13-13-5.8202-13-13-13-13 5.8202-13 13z" id="Path" :fill="facebookGrayColor" fill-rule="nonzero" mask="url(#mask-2)"></path>

            <template v-if="isLandscape">
                <polygon id="Fill-4" :fill="facebookGrayColor" fill-rule="nonzero" mask="url(#mask-2)" points="58 74 167 74 167 66 58 66"></polygon>
            </template>
            <template v-else>
                <polygon id="Fill-4" :fill="facebookGrayColor" fill-rule="nonzero" mask="url(#mask-2)" points="48 74 167 74 167 66 48 66"></polygon>
            </template>

            <foreignObject :width="postTextWidth" height="48" overflow="hidden" font-family="SFUIText-Regular, SF UI Text Regular" font-size="14" :x="isLandscape ? 58 : 48" y="80">
                <pre ref="postTextElement" xmlns="http://www.w3.org/1999/xhtml" style="max-height: 100%; text-align: left; margin:0; white-space: pre-wrap; font-family: SF UI Text Regular;" v-html="formattedPostText">
                </pre>
            </foreignObject>
        </g>

        <!-- PREVIEW MEDIA CONTENT -->
        <g id="preview-media" :transform="mediaPartTransform">
            <g>
                <!-- Carousel -->
                <g id="carousel" fill="none" fill-rule="evenodd" v-if="format.id === 'FacebookCarouselAdPost'">
                    <defs>
                        <path :d="`M6.40971 0h${carouselCardDimensions.width - 13}c2.2288 0 3.03702.23206 3.85183.66783.81482.43577 1.45429 1.07524 1.89006 1.89006.43576.81481.66783 1.62303.66783 3.85182v${carouselCardDimensions.height - 6}H0V6.4097c0-2.2288.23206-3.037.66783-3.85182.43577-.81482 1.07524-1.4543 1.89006-1.89006C3.3727.23206 4.18092 0 6.4097 0z`" id="path-3"></path>
                        <path :d="`M6.40971 0h${carouselCardDimensions.width - 13}c2.2288 0 3.03702.23206 3.85183.66783.81482.43577 1.45429 1.07524 1.89006 1.89006.43576.81481.66783 1.62303.66783 3.85182v${carouselCardDimensions.height - 6}H0V6.4097c0-2.2288.23206-3.037.66783-3.85182.43577-.81482 1.07524-1.4543 1.89006-1.89006C3.3727.23206 4.18092 0 6.4097 0z`" id="path-5"></path>
                    </defs>

                    <g id="cards" :style="{transform: cardsTransform}" ref="carouselSwipable" class="carousel" :class="{'carousel--animate-transform': !isSwiping}">
                        <g v-for="(card, index) in carouselItems" :key="index" @click="cardClick(card)" class="carousel__card">
                            <g :transform="carouselCardTransform(index)">
                                <g :transform="`translate(0 ${carouselCardDimensions.width})`">
                                    <foreignObject :width="carouselTextWidth" height="12" overflow="hidden" font-family="SFUIText-Regular, SF UI Text Regular" font-size="10" x="8" y="13">
                                        <p ref="carouselHeadlineElement1" xmlns="http://www.w3.org/1999/xhtml" style="max-height: 100%; text-align: left; margin:0; overflow: hidden; white-space: nowrap; text-overflow: ellipsis">
                                            {{ card.headline }}
                                        </p>
                                    </foreignObject>

                                    <foreignObject :width="carouselTextWidth" height="12" overflow="hidden" font-family="SFUIText-Regular, SF UI Text Regular" font-size="10" x="8" y="50">
                                        <p ref="carouselDescriptionElement1" xmlns="http://www.w3.org/1999/xhtml" :style="`max-height: 100%; text-align: left; margin:0; overflow: hidden; color: ${facebookDarkGrayColor}; white-space: nowrap; text-overflow: ellipsis`">
                                            {{ card.description }}
                                        </p>
                                    </foreignObject>

                                    <g id="carousel-cta-1" :transform="carouselCtaTransform" v-if="callToActionText">
                                        <rect id="Rectangle-4" :stroke="facebookDarkGrayColor" x=".5" y=".5" :width="carouselCtaDimensions.width" :height="carouselCtaDimensions.height" rx="5"></rect>
                                        <text font-family="SFUIText-Regular, SF UI Text Regular" :font-size="carouselCtaFontSize" letter-spacing="-.2" :fill="facebookDarkGrayColor" text-anchor="middle" style="cursor: pointer">
                                            <tspan :x="carouselCtaDimensions.width / 2" :y="(carouselCtaDimensions.height / 2) + (carouselCtaFontSize / 4)">{{ callToActionText }}</tspan>
                                        </text>
                                    </g>

                                    <path :d="`M.0.7958V${carouselCtaContainerHeight}c0 2.48528 2.01472 4.5 4.5 4.5h${carouselCardDimensions.width - 9.1}c2.48528 0 4.5-2.01472 4.5-4.5V.7958H.5z`" id="card-bottom-outline-1" :stroke="facebookGrayColor" fill="transparent"></path>
                                </g>

                                <g id="image-card-top-1">
                                    <clipPath id="clip3">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#path-3"></use>
                                    </clipPath>

                                    <template v-if="card.isVideoTranscoding">
                                        <preview-video-placeholder clip-path="url(#clip3)" :key="index" :width="carouselCardDimensions.width" :height="carouselCardDimensions.height" :font-size="9" :text="transcodingTextShort"></preview-video-placeholder>
                                    </template>

                                    <g v-show="!card.isVideoTranscoding">
                                        <rect x="1" y="1" :width="carouselCardDimensions.width - 2" :height="carouselCardDimensions.height - 1" fill="#fff" clip-path="url(#clip5)" />
                                        <image :xlink:href="card.url" :width="carouselCardDimensions.width" :height="carouselCardDimensions.height" clip-path="url(#clip3)" ref="carouselVideoPosition" @click.stop="card.videoUrl ? playVideo($refs.carouselVideo[index], $refs.carouselVideoPosition[index], index) : playGif('gif' + index)" />

                                        <image v-show="gifPlaying === 'gif' + index" @click.stop="stopGif($refs.gif)" :xlink:href="card.animatedImageUrl" :width="carouselCardDimensions.width" :height="carouselCardDimensions.height" clip-path="url(#clip3)" ref="carouselGif"/>

                                        <foreignObject v-show="videoPlaying === index" ref="carouselVideoContainer" @click.stop="pauseVideo($refs.carouselVideo[index])" :width="carouselCardDimensions.width" :height="carouselCardDimensions.height">
                                            <video playsinline class="video" :class="{'video--animate-transform': !isSwiping}" ref="carouselVideo" @ended="stopVideo($refs.carouselVideo[index])" :src="card.videoUrl" style="object-fit: contain; height: 100%; width: 100%; clip-path: url(#clip3); cursor: pointer;"></video>
                                        </foreignObject>

                                        <g id="carousel-card-play-button-1" :transform="carouselCardPlayButtonTransform(index)" @click.stop="card.videoUrl ? playVideo($refs.carouselVideo[index], $refs.carouselVideoPosition[index], index) : playGif('gif' + index)" @touchstart.stop @mousedown.stop>
                                            <path v-if="(card.videoUrl || card.animatedImageUrl) && !(videoPlaying === index) && !(gifPlaying === 'gif' + index)" d="M23,45V15l20,15.009L23,45z M30,0C13.431,0,0,13.432,0,30s13.431,30,30,30c16.568,0,30-13.432,30-30 S46.568,0,30,0z" fill="#FFF" fill-rule="nonzero" style="cursor: pointer;"/>
                                        </g>
                                    </g>
                                    <use id="image" :stroke="facebookGrayColor" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#path-3"></use>
                                </g>
                            </g>
                        </g>
                    </g>

                    <g id="post-actions" :transform="postActionsTransform" :fill="facebookGrayColor" fill-rule="nonzero">
                        <g>
                            <path d="M0 9.24c0 5.10318 4.19841 9.24 9.37756 9.24 5.17914 0 9.37755-4.13682 9.37755-9.24S14.55671 0 9.37756 0C4.1984 0 0 4.13682 0 9.24z" id="Path-Copy"></path>
                            <polygon id="Fill-10" points="32.8214501 13.1800779 79.7092359 13.1800779 79.7092359 4.62 32.8214501 4.62"></polygon>
                        </g>

                        <g :transform="postActionTransform(0)">
                            <path d="M112.53069 9.24c0 5.10318 4.1984 9.24 9.37755 9.24 5.17915 0 9.37756-4.13682 9.37756-9.24S127.08739 0 121.90824 0c-5.17914 0-9.37755 4.13682-9.37755 9.24z" id="Path-Copy-2"></path>
                            <polygon id="Fill-10-Copy" points="145.352136 13.1800779 178.173586 13.1800779 178.173586 4.62 145.352136 4.62"></polygon>
                        </g>

                        <g :transform="postActionTransform(1)">
                            <path d="M210.99504 9.24c0 5.10318 4.1984 9.24 9.37755 9.24 5.17915 0 9.37756-4.13682 9.37756-9.24S225.55174 0 220.37259 0c-5.17914 0-9.37755 4.13682-9.37755 9.24z" id="Path-Copy-3"></path>
                            <polygon id="Fill-10-Copy-2" points="243.816486 13.1800779 290.704272 13.1800779 290.704272 4.62 243.816486 4.62"></polygon>
                        </g>

                        <path d="M0 491.5h320" id="Line" :stroke="facebookGrayColor" stroke-linecap="square" mask="url(#mask-2)"></path>
                    </g>

                    <g id="dummy-post" :transform="dummyPostTransform">
                        <polygon :fill="facebookGrayColor" fill-rule="nonzero" points="48 38 121 38 121 30 48 30"/>
                        <polygon :fill="facebookGrayColor" fill-rule="nonzero" points="48 53 129 53 129 45 48 45"/>
                        <polygon :fill="facebookGrayColor" fill-rule="nonzero" points="15 111 238 111 238 103 15 103"/>
                        <polygon :fill="facebookGrayColor" fill-rule="nonzero" points="15 80 252 80 252 72 15 72"/>
                        <polygon :fill="facebookGrayColor" fill-rule="nonzero" points="15 95 281 95 281 87 15 87"/>
                        <path d="M12 42c0 7.1798 5.8202 13 13 13s13-5.8202 13-13-5.8202-13-13-13-13 5.8202-13 13z" :fill="facebookGrayColor" fill-rule="nonzero"/>

                        <g :transform="separatorScale">
                            <path d="M0 1.5h320" :stroke="facebookGrayColor" stroke-linecap="square"/>
                        </g>
                    </g>
                </g>

                <!-- Photo, Video -->
                <g id="photo-video" fill="none" fill-rule="evenodd" v-else>
                    <g id="preview-text" :transform="previewTextTransform" v-if="callToActionSectionPresent">
                        <foreignObject :width="ctaTextContentWidth" height="12" overflow="hidden" font-family="SFUIText-Regular, SF UI Text Regular" font-size="10" x="8" y="14">
                            <p ref="headlineElement" xmlns="http://www.w3.org/1999/xhtml" style="max-height: 100%; text-align: left; margin:0; overflow: hidden; white-space: nowrap; text-overflow: ellipsis">
                                {{ headline }}
                            </p>
                        </foreignObject>

                        <foreignObject :width="ctaTextContentWidth" height="12" overflow="hidden" font-family="SFUIText-Regular, SF UI Text Regular" font-size="9" x="8" y="34">
                            <p ref="linkDescriptionElement" xmlns="http://www.w3.org/1999/xhtml" :style="`max-height: 100%; text-align: left; margin:0; overflow: hidden; color: ${facebookDarkGrayColor}; white-space: nowrap; text-overflow: ellipsis`">
                                {{ linkDescription }}
                            </p>
                        </foreignObject>

                        <foreignObject :width="ctaTextContentWidth" height="10" overflow="hidden" font-family="SFUIText-Regular, SF UI Text Regular" font-size="8" x="8" y="62">
                            <p ref="formattedDisplayLinkElement" xmlns="http://www.w3.org/1999/xhtml" :style="`max-height: 100%; text-align: left; margin:0; overflow: hidden; color: ${facebookDarkGrayColor}; white-space: nowrap; text-overflow: ellipsis`">
                                {{ formattedDisplayLink }}
                            </p>
                        </foreignObject>
                        <g @click="$root.$emit('open-url', link)" style="cursor: pointer">
                            <path :d="generateCtaOutlinePath" id="preview-text-bottom-outline" :stroke="facebookGrayColor" fill="transparent"></path>
                            <g id="CTA" :transform="transformCta" v-if="callToActionText">
                                <rect id="Rectangle-4" :stroke="facebookDarkGrayColor" x=".5" y=".5" :width="ctaDimensions.width" :height="ctaDimensions.height" stroke-width="2" rx="5"></rect>
                                <text font-family="SFUIText-Regular, SF UI Text Regular" :font-size="ctaFontSize" letter-spacing="-.2" :fill="facebookDarkGrayColor" text-anchor="middle">
                                    <tspan :x="ctaDimensions.width / 2" :y="(ctaDimensions.height / 2) + (ctaFontSize / 3)">{{ callToActionText }}</tspan>
                                </text>
                            </g>
                        </g>
                    </g>

                    <g id="preview-media-content" :transform="`translate(${mediaContentPadding.x} ${mediaContentPadding.y})`">
                        <rect :fill="facebookGrayColor" id="b" :width="mediaContentDimensions.width" :height="mediaContentDimensions.height"/>

                        <image v-if="videoUrl" :xlink:href="thumbnailUrl" class="post-svg-image" :width="mediaContentDimensions.width" :height="mediaContentDimensions.height" clip-path="url(#clip-thumbnail)" preserve-aspect-ratio="xMinYMin slice" style="cursor: pointer;" @click="playVideo($refs.video, $refs.videoPosition, $refs.videoContainer)" ref="videoPosition"/>
                        <image v-else :xlink:href="thumbnailUrl" class="post-svg-image" :width="mediaContentDimensions.width" :height="mediaContentDimensions.height" clip-path="url(#clip-thumbnail)" preserve-aspect-ratio="xMinYMin slice" style="cursor: pointer;" @click="playGif($refs.gif)"/>

                        <image v-show="gifPlaying" @click="stopGif($refs.gif)" :xlink:href="animatedImageUrl" ref="gif" class="post-gif-image" :width="mediaContentDimensions.width" :height="mediaContentDimensions.height" clip-path="url(#clip-thumbnail)" preserve-aspect-ratio="xMinYMin slice"/>

                        <foreignObject v-show="videoPlaying" ref="videoContainer" @click="pauseVideo($refs.video)" :width="mediaContentDimensions.width" :height="mediaContentDimensions.height">
                            <video playsinline ref="video" @ended="stopVideo($refs.video)" :src="videoUrl" style="object-fit: cover; height: 100%; width: 100%; clip-path: inset(0 0 0 0); cursor: pointer;"></video>
                        </foreignObject>

                        <preview-video-placeholder v-if="isVideoTranscoding" :width="mediaContentDimensions.width" :height="mediaContentDimensions.height" :font-size="7.5" :text="transcodingText"></preview-video-placeholder>

                        <g id="video-play-button" :transform="videoPlayButtonTransform">
                            <path v-if="format.id === 'FacebookVideoAdPost' && !videoPlaying && !isVideoTranscoding && !gifPlaying" d="M23,45V15l20,15.009L23,45z M30,0C13.431,0,0,13.432,0,30s13.431,30,30,30c16.568,0,30-13.432,30-30 S46.568,0,30,0z" fill="#FFF" fill-rule="nonzero" style="cursor: pointer;" @click="videoUrl ? playVideo($refs.video, $refs.videoPosition, $refs.videoContainer) : playGif($refs.gif)"/>
                        </g>
                    </g>

                    <g id="bottom-dummy-content">
                        <g id="post-actions" :transform="postActionsTransform" :fill="facebookGrayColor" fill-rule="nonzero">
                            <g>
                                <path d="M0 9.24c0 5.10318 4.19841 9.24 9.37756 9.24 5.17914 0 9.37755-4.13682 9.37755-9.24S14.55671 0 9.37756 0C4.1984 0 0 4.13682 0 9.24z"/>
                                <polygon points="32.8214501 13.1800779 79.7092359 13.1800779 79.7092359 4.62 32.8214501 4.62"/>
                            </g>

                            <g :transform="postActionTransform(0)">
                                <path d="M112.53069 9.24c0 5.10318 4.1984 9.24 9.37755 9.24 5.17915 0 9.37756-4.13682 9.37756-9.24S127.08739 0 121.90824 0c-5.17914 0-9.37755 4.13682-9.37755 9.24z"/>
                                <polygon points="145.352136 13.1800779 178.173586 13.1800779 178.173586 4.62 145.352136 4.62"/>
                            </g>

                            <g :transform="postActionTransform(1)">
                                <path d="M210.99504 9.24c0 5.10318 4.1984 9.24 9.37755 9.24 5.17915 0 9.37756-4.13682 9.37756-9.24S225.55174 0 220.37259 0c-5.17914 0-9.37755 4.13682-9.37755 9.24z"/>
                                <polygon points="243.816486 13.1800779 290.704272 13.1800779 290.704272 4.62 243.816486 4.62"/>
                            </g>
                        </g>

                        <g id="dummy-post" :transform="dummyPostTransform">
                            <polygon :fill="facebookGrayColor" fill-rule="nonzero" points="48 38 121 38 121 30 48 30"/>
                            <polygon :fill="facebookGrayColor" fill-rule="nonzero" points="48 53 129 53 129 45 48 45"/>
                            <polygon :fill="facebookGrayColor" fill-rule="nonzero" points="15 111 238 111 238 103 15 103"/>
                            <polygon :fill="facebookGrayColor" fill-rule="nonzero" points="15 80 252 80 252 72 15 72"/>
                            <polygon :fill="facebookGrayColor" fill-rule="nonzero" points="15 95 281 95 281 87 15 87"/>
                            <path d="M12 42c0 7.1798 5.8202 13 13 13s13-5.8202 13-13-5.8202-13-13-13-13 5.8202-13 13z" :fill="facebookGrayColor" fill-rule="nonzero"/>

                            <g :transform="separatorScale">
                                <path d="M0 1.5h320" :stroke="facebookGrayColor" stroke-linecap="square"/>
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
            postTextHeight: 16,
            imageAspectRatio: 1.78,
        }
    },
    computed: {
        postTextHeightDifference () {
            return Math.max(0, this.postTextHeight - this.initialPostTextHeight)
        },
        mediaContentDimensions () {
            let width = this.dimensions.width - (this.mediaContentPadding.x * 2)
            let height = width / this.imageAspectRatio

            if (this.format.id === 'FacebookCarouselAdPost') {
                height = this.isLandscape ? ((width - this.carouselCardPadding) / 2) : ((width / 2) + 25)
            }

            return { width, height }
        },
        postTextWidth () {
            return this.isLandscape ? this.mediaContentDimensions.width : this.mediaContentDimensions.width - 60
        },
        mediaContentPadding () {
            let x = this.callToActionSectionPresent ? 10 : 0
            let y = 121

            if (this.isLandscape) {
                x = 57
            }

            return { x, y }
        },
        ctaTextContentWidth () {
            return this.mediaContentDimensions.width - this.ctaDimensions.width - 30
        },
        carouselCardDimensions () {
            let width = (this.mediaContentDimensions.width / 2) + 25 - 5

            if (this.isLandscape) {
                width = (this.mediaContentDimensions.width - this.carouselCardPadding) / 2
            }

            let height = width

            return { width, height }
        },
        carouselTextWidth () {
            return this.carouselCardDimensions.width / 3
        },
        ctaDimensions () {
            let width = Math.min(125, this.mediaContentDimensions.width / 3)
            let height = width / 3

            return { width, height }
        },
        ctaFontSize () {
            return this.ctaDimensions.width / 10
        },
        carouselCtaDimensions () {
            let width = this.carouselCardDimensions.width / 2
            let height = width / 3

            return { width, height }
        },
        carouselCtaFontSize () {
            return this.carouselCardDimensions.width / 18
        },
        whiteMaskPoints () {
            return `0 ${this.dimensions.height} ${this.dimensions.width} ${this.dimensions.height} ${this.dimensions.width} 0 0 0`
        },
        blueBannerPoints () {
            return `0 49 ${this.dimensions.width} 49 ${this.dimensions.width} 0 0 0`
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
            let translateX = this.carouselCardDimensions.width - this.carouselCtaDimensions.width - 8
            let translateY = (this.carouselCtaContainerHeight / 2) - (this.carouselCtaDimensions.height / 2)

            return `translate(${translateX} ${translateY})`
        },
        cardsTransform () {
            return `translate(${this.swipeOffset}px, 0px)`
        },
        transformCta () {
            let translateX = this.mediaContentDimensions.width - this.ctaDimensions.width - 10
            let translateY = (this.ctaContainerHeight / 2) - 12

            return `translate(${translateX} ${translateY})`
        },
        mediaContentHeight () {
            let height = this.mediaContentDimensions.height

            if (this.callToActionSectionPresent) {
                height += this.format.id === 'FacebookCarouselAdPost' ? this.carouselCtaContainerHeight : this.ctaContainerHeight
                height += 20
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
            let translateY = this.mediaContentHeight + this.dummyPostOffset

            return `translate(0 ${translateY})`
        },
        separatorScale () {
            return `scale(${this.dimensions.width / 300}, 1)`
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
        this.initialPostTextHeight = 16
        this.ctaContainerHeight = 80
        this.carouselCtaContainerHeight = 80
        this.postActionsOffset = 145
        this.postActionsPadding = 10
        this.dummyPostOffset = 200
        this.carouselCardPadding = 15
        this.firstCardPadding = 10
        this.firstCardLandscapePadding = 58
        this.lastCardPadding = 65
        this.lastCardLandscapePadding = -35
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
            if (this.format.id === 'FacebookCarouselAdPost'){
                this.attachEventListeners()
            }
            this.measureThumbnailAspectRatio()
        })
    },
    beforeDestroy () {
        if (this.format.id === 'FacebookCarouselAdPost') {
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
            let translateX = (this.dimensions.width - (2 * this.postActionsPadding) - 295) / 2

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
