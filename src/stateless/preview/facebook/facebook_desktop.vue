<template>
    <g :transform="coordinateTransform">
        <defs>
            <polygon id="path-1" :points="grayBackgroundPoints"/>
            <rect id="path-3" width="226" height="513"/>
            <path d="M6.40971 0h321.4895c2.2288 0 3.03701.23206 3.85183.66783.81481.43577 1.45428 1.07524 1.89005 1.89006.43577.81481.66783 1.62303.66783 3.85182v335.04105H0V6.4097c0-2.2288.23206-3.037.66783-3.85182.43577-.81482 1.07524-1.4543 1.89006-1.89006C3.3727.23206 4.18092 0 6.4097 0z" id="path-5"/>
            <path d="M6.40971 0h321.4895c2.2288 0 3.03701.23206 3.85183.66783.81481.43577 1.45428 1.07524 1.89005 1.89006.43577.81481.66783 1.62303.66783 3.85182v335.04105H0V6.4097c0-2.2288.23206-3.037.66783-3.85182.43577-.81482 1.07524-1.4543 1.89006-1.89006C3.3727.23206 4.18092 0 6.4097 0z" id="path-7"/>
            <clipPath id="clip-thumbnail">
                <rect :width="mediaContentDimensions.width" :height="mediaContentDimensions.height" />
            </clipPath>
        </defs>

        <mask id="mask-2" fill="#fff">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#path-1"></use>
        </mask>
        <use id="Mask" fill="#F5F5F5" fill-rule="nonzero" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#path-1"></use>
        <polygon id="Fill-2" :fill="facebookGrayColor" fill-rule="nonzero" :points="blueBannerPoints"></polygon>

        <g id="centerContent" :transform="contentCenterTranslate">
            <rect id="Rectangle" fill="#FFF" mask="url(#mask-2)" x="50" y="60" width="288" height="211"></rect>
            <rect id="Rectangle-Copy-3" fill="#FFF" mask="url(#mask-2)" x="50" y="283" width="288" height="569"></rect>
            <rect id="Rectangle-Copy-2" fill="#FFF" mask="url(#mask-2)" x="350" y="60" width="588" :height="mainContentRectHeight"></rect>
            <rect id="Rectangle-Copy-4" fill="#FFF" mask="url(#mask-2)" x="950" y="487" width="288" height="184"></rect>
            <rect id="Rectangle-Copy" fill="#FFF" mask="url(#mask-2)" x="950" y="60" width="288" height="415"></rect>
            <path d="M362 110c0 13.255 10.745 24 24 24s24-10.745 24-24-10.745-24-24-24-24 10.745-24 24z" id="Path" :fill="facebookGrayColor" fill-rule="nonzero"/>
            <polygon id="Fill-4" :fill="facebookGrayColor" fill-rule="nonzero" points="422 104 724 104 724 92 422 92"/>

            <foreignObject width="475" height="72" overflow="hidden" font-family="SFUIText-Regular, SF UI Text Regular" font-size="20" x="422" y="114">
                <pre ref="postTextElement" xmlns="http://www.w3.org/1999/xhtml" style="max-height: 100%; text-align: left; margin:0; white-space: pre-wrap; font-family: SF UI Text Regular;" v-html="formattedPostText">
                </pre>
            </foreignObject>

            <g :transform="contentTranslate">
                <g id="previews-desktop" v-if="format.id === 'FacebookCarouselAdPost'" fill="none"
                   fill-rule="evenodd">
                    <g id="carousel-desktop" class="carousel">
                        <g id="desktop">
                            <g id="Fill-4">
                                <polygon fill="#F5F5F5" fill-rule="nonzero" mask="url(#mask-2)" points="350 745 938 745 938 743 350 743"/>
                            </g>
                            <mask id="cards-mask" >
                                <use xlink:href="#Rectangle-Copy-2"/>
                            </mask>
                            <g mask="url(#cards-mask)">
                                <g id="cards" :style="{transform: cardsTransform}" ref="carouselSwipable" class="carousel" :class="{'carousel--animate-transform': !isSwiping}">
                                    <g v-for="(card, index) in carouselItems" :key="index">
                                        <g :transform="carouselCardTransform(index)">
                                            <rect data-v-44dcf612="" height="480" width="334.5" fill="#e3e3e3" transform="translate(8 13)" rx="5"></rect>
                                            <g class="carousel__card" :class="{'carousel__card--do-not-animate': carouselPositions.indexOf(swipeOffset) === index}" @click="handleCardClick(index, $event)">
                                                <g transform="translate(8 13)">
                                                    <g id="card-bottom" transform="translate(0 338.8951)">
                                                        <path d="M0 1.01636V136.3861c0 2.48528 2.01472 4.5 4.5 4.5h325.30892c2.48528 0 4.5-2.01472 4.5-4.5V1.01636H.5z"
                                                              id="card-bottom-outline" fill="white" :stroke="facebookGrayColor"/>
                                                        <foreignObject width="300" height="18" overflow="hidden" font-family="SFUIText-Regular, SF UI Text Regular" font-size="16" x="14" y="20">
                                                            <p ref="carouselHeadlineElement2" xmlns="http://www.w3.org/1999/xhtml" style="max-height: 100%; text-align: left; margin:0; overflow: hidden; white-space: nowrap; text-overflow: ellipsis">
                                                                {{ card.headline }}
                                                            </p>
                                                        </foreignObject>
                                                        <foreignObject width="130" height="18" overflow="hidden" font-family="SFUIText-Regular, SF UI Text Regular" font-size="16" x="14" y="85">
                                                            <p ref="carouselDescriptionElement2" xmlns="http://www.w3.org/1999/xhtml" :style="`max-height: 100%; text-align: left; margin:0; overflow: hidden; color: ${facebookDarkGrayColor}; white-space: nowrap; text-overflow: ellipsis`">
                                                                {{ card.description }}
                                                            </p>
                                                        </foreignObject>
                                                        <g id="CTA" transform="translate(185 47) scale(0.8)" v-if="callToActionText">
                                                            <rect id="Rectangle-4" :stroke="facebookDarkGrayColor" stroke-width="3" x="1.5" y="1.5" width="165.30143" height="50.71167" rx="10"/>
                                                            <text font-family="SFUIText-Regular, SF UI Text Regular" font-size="22" letter-spacing="-.36667" :fill="facebookDarkGrayColor" text-anchor="middle" style="cursor: pointer">
                                                                <tspan x="84" y="34.25754">{{ callToActionText }}</tspan>
                                                            </text>
                                                        </g>
                                                    </g>
                                                    <g id="image-card-top">
                                                        <clipPath id="clip5">
                                                            <use xlink:href="#path-5"/>
                                                        </clipPath>
                                                        <use fill="white" xlink:href="#path-5"/>

                                                        <template v-if="card.isVideoTranscoding">
                                                            <preview-video-placeholder :key="index" :width="carouselCardDimensions.width" :height="carouselCardDimensions.height" :font-size="13" :text="transcodingTextShort" clip-path="url(#clip5)"></preview-video-placeholder>
                                                        </template>

                                                        <g v-show="!card.isVideoTranscoding">
                                                            <image :xlink:href="card.url" :width="carouselCardDimensions.width" :height="carouselCardDimensions.height" clip-path="url(#clip5)" ref="carouselVideoPosition" @click.stop="card.videoUrl ? playVideo($refs.carouselVideo[index], $refs.carouselVideoPosition[index], index) : playGif('gif' + index)" />

                                                            <image v-show="gifPlaying === 'gif' + index" @click.stop="stopGif($refs.gif)" :xlink:href="card.animatedImageUrl" :width="carouselCardDimensions.width" :height="carouselCardDimensions.height" clip-path="url(#clip5)" ref="carouselGif"/>

                                                            <foreignObject v-show="videoPlaying === index" @click.stop="pauseVideo($refs.carouselVideo[index])" :width="carouselCardDimensions.width - 10" :height="carouselCardDimensions.height">
                                                                <video playsinline ref="carouselVideo" @ended="stopVideo($refs.carouselVideo[index])" :src="card.videoUrl" style="object-fit: contain; height: 100%; width: 100%; clip-path: url(#clip5); cursor: pointer;"></video>
                                                            </foreignObject>

                                                            <g transform="translate(-82 -168) scale(1.6)" @click.stop="card.videoUrl ? playVideo($refs.carouselVideo[index], $refs.carouselVideoPosition[index], index) : playGif('gif' + index)">
                                                                <path v-if="(card.videoUrl || card.animatedImageUrl) && !(videoPlaying === index) && !(gifPlaying === 'gif' + index)" d="M152 225v-30l20 15.00875L152 225zm7-45c-16.56875 0-30 13.43125-30 30s13.43125 30 30 30 30-13.43125 30-30-13.43125-30-30-30z" fill="#FFF" fill-rule="nonzero" style="cursor: pointer;"/>
                                                            </g>
                                                        </g>
                                                        <use id="image" fill="none" :stroke="facebookGrayColor" xlink:href="#path-5" pointer-events="none"/>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                            <g id="Group-6" transform="translate(366 685)" :fill="facebookGrayColor" fill-rule="nonzero">
                                <path d="M0 14c0 7.73208 6.26792 14 14 14s14-6.26792 14-14S21.73208 0 14 0 0 6.26792 0 14z" id="Path-Copy"/>
                                <path d="M199.85714 14c0 7.73208 6.26792 14 14 14 7.73209 0 14-6.26792 14-14s-6.26791-14-14-14c-7.73208 0-14 6.26792-14 14z" id="Path-Copy-2"/>
                                <path d="M374.57143 14c0 7.73208 6.26791 14 14 14 7.73208 0 14-6.26792 14-14s-6.26792-14-14-14c-7.73209 0-14 6.26792-14 14z" id="Path-Copy-3"/>
                                <polygon id="Fill-10" points="48.2857143 20 131.714286 20 131.714286 8 48.2857143 8"/>
                                <polygon id="Fill-10-Copy" points="248.142857 20 306.428571 20 306.428571 8 248.142857 8"/>
                                <polygon id="Fill-10-Copy-2" points="422.857143 20 506.285714 20 506.285714 8 422.857143 8"/>
                            </g>
                            <g transform="translate(362 770)" :fill="facebookGrayColor"
                               fill-rule="nonzero">
                                <path d="M0 24c0 13.255 10.745 24 24 24s24-10.745 24-24S37.255 0 24 0 0 10.745 0 24z"/>
                                <polygon points="0 92 493 92 493 80 0 80"/>
                                <polygon points="0 146 493 146 493 134 0 134"/>
                                <polygon points="0 119 411 119 411 107 0 107"/>
                                <polygon points="0 173 351 173 351 161 0 161"/>
                                <polygon points="60 18 422 18 422 6 60 6"/>
                                <polygon points="60 45 362 45 362 33 60 33"/>
                            </g>
                            <g id="carousel-next-arrow" class="carousel__arrow" transform="translate(900 320) scale(1.25)" style="cursor: pointer;" @click.stop="arrowForward" v-show="arrowForwardActive">
                                <defs>
                                    <path d="M5 0h25v30H5c-2.76142 0-5-2.23858-5-5V5c0-2.76142 2.23858-5 5-5zm9.14286 8L12 10l5.71429 5.5L12 21l2.14286 2L22 15.5 14.14286 8z" id="b"/>
                                    <filter x="-15%" y="-15%" width="130%" height="130%" filter-units="objectBoundingBox" id="a">
                                        <feOffset in="SourceAlpha" result="shadowOffsetOuter1"/>
                                        <feGaussianBlur std-deviation="1.5" in="shadowOffsetOuter1" result="shadowBlurOuter1"/>
                                        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" in="shadowBlurOuter1"/>
                                    </filter>
                                </defs>
                                <g transform="translate(1 3)" fill="none" fill-rule="evenodd">
                                    <rect width="30" height="30" rx="5" fill="#E7E7E7"/>
                                    <use fill="#000" filter="url(#a)" xlink:href="#b"/>
                                    <use fill="#FFF" xlink:href="#b"/>
                                </g>
                            </g>
                            <g id="carousel-back-arrow" class="carousel__arrow" transform="translate(358 335) rotate(180 16 16) scale(1.25)" style="cursor: pointer" @click.stop="arrowBack" v-show="arrowBackActive">
                                <defs>
                                    <path d="M5 0h25v30H5c-2.76142 0-5-2.23858-5-5V5c0-2.76142 2.23858-5 5-5zm9.14286 8L12 10l5.71429 5.5L12 21l2.14286 2L22 15.5 14.14286 8z" id="b"/>
                                    <filter x="-15%" y="-15%" width="130%" height="130%" filter-units="objectBoundingBox" id="a">
                                        <feOffset in="SourceAlpha" result="shadowOffsetOuter1"/>
                                        <feGaussianBlur std-deviation="1.5" in="shadowOffsetOuter1" result="shadowBlurOuter1"/>
                                        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" in="shadowBlurOuter1"/>
                                    </filter>
                                </defs>
                                <g transform="translate(3 3)" fill="none" fill-rule="evenodd">
                                    <rect width="30" height="30" rx="5" fill="#E7E7E7"/>
                                    <use fill="#000" filter="url(#a)" xlink:href="#b"/>
                                    <use fill="#FFF" xlink:href="#b"/>
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
                <g id="preview-media" v-else>
                    <g id="preview-text" :transform="previewTextTransform" fill="none" v-if="callToActionSectionPresent" style="cursor: pointer" @click="$root.$emit('open-url', link)">
                        <path d="M362.5 468.5V582c0 2.48528 2.01472 4.5 4.5 4.5h554c2.48528 0 4.5-2.01472 4.5-4.5V468.5h-563z" :stroke="facebookGrayColor" fill="transparent"/>

                        <foreignObject width="300" height="18" overflow="hidden" transform="translate(362 468)" font-family="SFUIText-Regular, SF UI Text Regular" font-size="16" x="19" y="10">
                            <p xmlns="http://www.w3.org/1999/xhtml" style="max-height: 100%; text-align: left; margin:0; overflow: hidden; color: #14171A; white-space: nowrap; text-overflow: ellipsis">
                                {{ headline }}
                            </p>
                        </foreignObject>

                        <foreignObject width="300" height="18" overflow="hidden" transform="translate(362 468)" font-family="SFUIText-Regular, SF UI Text Regular" font-size="15" x="19" y="35">
                            <p xmlns="http://www.w3.org/1999/xhtml" :style="`max-height: 100%; text-align: left; margin:0; overflow: hidden; color: ${facebookDarkGrayColor}; white-space: nowrap; text-overflow: ellipsis`">
                                {{ linkDescription }}
                            </p>
                        </foreignObject>

                        <foreignObject width="300" height="14" overflow="hidden" transform="translate(362 468)" font-family="SFUIText-Regular, SF UI Text Regular" font-size="12" x="19" y="88">
                            <p xmlns="http://www.w3.org/1999/xhtml" :style="`max-height: 100%; text-align: left; margin:0; overflow: hidden; color: ${facebookDarkGrayColor}; white-space: nowrap; text-overflow: ellipsis`">
                                {{ formattedDisplayLink }}
                            </p>
                        </foreignObject>

                        <g transform="translate(778 503)" v-if="callToActionText">
                            <rect :stroke="facebookDarkGrayColor" stroke-width="3" x="1.5" y="1.5" width="128.60382" height="39" rx="10"/>
                            <text font-family="SF UI Text Regular" font-size="18" letter-spacing="-.3" :fill="facebookDarkGrayColor" text-anchor="middle">
                                <tspan x="66" y="28">{{ callToActionText }}</tspan>
                            </text>
                        </g>
                    </g>

                    <g id="preview-media-content" transform="translate(362 174)">
                        <rect :fill="facebookGrayColor" :width="mediaContentDimensions.width" :height="mediaContentDimensions.height"/>

                        <image v-if="videoUrl" :xlink:href="thumbnailUrl" class="post-svg-image" clip-path="url(#clip-thumbnail)" preserve-aspect-ratio="xMinYMin slice" style="cursor: pointer;" @click="playVideo($refs.video, $refs.videoPosition, $refs.videoContainer)" ref="videoPosition" :width="mediaContentDimensions.width" :height="mediaContentDimensions.height"/>
                        <image v-else :xlink:href="thumbnailUrl" class="post-svg-image" clip-path="url(#clip-thumbnail)" preserve-aspect-ratio="xMinYMin slice" style="cursor: pointer;" @click="playGif($refs.gif)" :width="mediaContentDimensions.width" :height="mediaContentDimensions.height"/>

                        <image v-show="gifPlaying" @click="stopGif($refs.gif)" :xlink:href="animatedImageUrl" ref="gif" class="post-gif-image" :width="mediaContentDimensions.width" :height="mediaContentDimensions.height" preserve-aspect-ratio="xMinYMin slice"/>

                        <foreignObject v-show="videoPlaying" ref="videoContainer" @click="pauseVideo($refs.video)" :width="mediaContentDimensions.width" :height="mediaContentDimensions.height">
                            <video playsinline ref="video" @ended="stopVideo($refs.video)" :src="videoUrl" style="object-fit: cover; height: 100%; width: 100%; clip-path: inset(0 0 0 0); cursor: pointer;"></video>
                        </foreignObject>

                        <preview-video-placeholder v-if="isVideoTranscoding" :text="transcodingText" :font-size="14" :width="mediaContentDimensions.width" :height="mediaContentDimensions.height"></preview-video-placeholder>

                        <path v-if="format.id === 'FacebookVideoAdPost' && !videoPlaying && !isVideoTranscoding && !gifPlaying" :transform="videoPlayButtonTransform" d="M634.625 342v-40l26.875 20.01167L634.625 342zM644 282c-22.09167 0-40 17.90833-40 40s17.90833 40 40 40 40-17.90833 40-40-17.90833-40-40-40z" fill="#FFF" fill-rule="nonzero" style="cursor: pointer;" @click="videoUrl ? playVideo($refs.video, $refs.videoPosition, $refs.videoContainer) : playGif($refs.gif)"/>
                    </g>

                    <g :transform="bottomFillerContentTransform">
                        <g transform="translate(366 499)" :fill="facebookGrayColor">
                            <path d="M0 14c0 7.73208 6.26792 14 14 14s14-6.26792 14-14S21.73208 0 14 0 0 6.26792 0 14z"/>
                            <path d="M199.85714 14c0 7.73208 6.26792 14 14 14 7.73209 0 14-6.26792 14-14s-6.26791-14-14-14c-7.73208 0-14 6.26792-14 14z"/>
                            <path d="M374.57143 14c0 7.73208 6.26791 14 14 14 7.73208 0 14-6.26792 14-14s-6.26792-14-14-14c-7.73209 0-14 6.26792-14 14z"/>
                            <polygon points="48.2857143 20 131.714286 20 131.714286 8 48.2857143 8"/>
                            <polygon points="248.142857 20 306.428571 20 306.428571 8 248.142857 8"/>
                            <polygon points="422.857143 20 506.285714 20 506.285714 8 422.857143 8"/>
                        </g>
                        <g transform="translate(362 618)" :fill="facebookGrayColor" fill-rule="nonzero">
                            <path d="M0 24c0 13.255 10.745 24 24 24s24-10.745 24-24S37.255 0 24 0 0 10.745 0 24z"/>
                            <polygon points="0 92 493 92 493 80 0 80"/>
                            <polygon points="0 146 493 146 493 134 0 134"/>
                            <polygon points="0 119 411 119 411 107 0 107"/>
                            <polygon points="0 173 351 173 351 161 0 161"/>
                            <polygon points="60 18 422 18 422 6 60 6"/>
                            <polygon points="60 45 362 45 362 33 60 33"/>
                        </g>
                        <g transform="translate(366 846)" :fill="facebookGrayColor" fill-rule="nonzero">
                            <path d="M0 14c0 7.73208 6.26792 14 14 14s14-6.26792 14-14S21.73208 0 14 0 0 6.26792 0 14z"/>
                            <path d="M199.85714 14c0 7.73208 6.26792 14 14 14 7.73209 0 14-6.26792 14-14s-6.26791-14-14-14c-7.73208 0-14 6.26792-14 14z"/>
                            <path d="M374.57143 14c0 7.73208 6.26791 14 14 14 7.73208 0 14-6.26792 14-14s-6.26792-14-14-14c-7.73209 0-14 6.26792-14 14z"/>
                            <polygon points="48.2857143 20 131.714286 20 131.714286 8 48.2857143 8"/>
                            <polygon points="248.142857 20 306.428571 20 306.428571 8 248.142857 8"/>
                            <polygon points="422.857143 20 506.285714 20 506.285714 8 422.857143 8"/>
                        </g>
                        <g transform="translate(362 963)" :fill="facebookGrayColor" fill-rule="nonzero">
                            <path d="M0 24c0 13.255 10.745 24 24 24s24-10.745 24-24S37.255 0 24 0 0 10.745 0 24z"/>
                            <polygon points="60 18 422 18 422 6 60 6"/>
                            <polygon points="60 45 362 45 362 33 60 33"/>
                        </g>
                        <polygon fill="#F5F5F5" fill-rule="nonzero" mask="url(#b)" points="350 934 938 934 938 932 350 932"/>
                        <polygon fill="#F5F5F5" fill-rule="nonzero" mask="url(#b)" points="350 589 938 589 938 587 350 587"/>
                    </g>
                </g>
            </g>
            <!-- to make carousel hover work right -->
            <rect id="Rectangle-left" fill="white" x="0" y="0" width="350" :height="mainContentRectHeight" style="opacity: 0" ></rect>
            <rect id="Rectangle-right" fill="white" mask="url(#mask-2)" x="940" y="0" width="340" :height="mainContentRectHeight" style="opacity: 0"></rect>
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
            dimensions: { width: 1280, height: 1024 },
            postTextHeight: 24,
            imageAspectRatio: 1.78,
        }
    },
    computed: {
        grayBackgroundPoints () {
            return `0 ${this.maxHeight} ${this.dimensions.width} ${this.maxHeight} ${this.dimensions.width} 0 0 0`
        },
        blueBannerPoints () {
            return `0 50 ${this.dimensions.width} 50 ${this.dimensions.width} 0 0 0`
        },
        coordinateTransform () {
            return `scale(${100 / this.dimensions.width})`
        },
        cardsTransform () {
            return `translate(${this.swipeOffset}px, 0px)`
        },
        mainContentRectHeight () {
            return this.maxHeight - 60
        },
        contentCenterTranslate () {
            return `translate(${(this.dimensions.width - 1284) / 2} 0)`
        },
        contentTranslate () {
            let translateY = this.postTextHeight - this.postTextInitialHeight

            if (this.postTextHeight > 0) {
                translateY -= 10
            }

            return `translate(0 ${translateY})`
        },
        bottomFillerContentTransform () {
            let translateY = this.mediaContentDimensions.height - this.bottomContentOffset

            if (this.callToActionSectionPresent) {
                translateY += 120
            }

            return `translate(0, ${translateY})`
        },
        mediaContentDimensions () {
            let width = 564
            let height = width / this.imageAspectRatio

            if (this.format.id === 'FacebookCarouselAdPost') {
                height = this.isLandscape ? ((width - this.carouselCardPadding) / 2) : ((width / 2) + 25)
            }

            return { width, height }
        },
        mediaContentPadding () {
            let x = this.callToActionSectionPresent ? 10 : 0
            let y = 121

            if (this.isLandscape) {
                x = 57
            }

            return { x, y }
        },
        videoPlayButtonTransform () {
            let playButtonWidth = 80
            let playButtonHeight = 80

            let translateX = (this.mediaContentDimensions.width / 2) - (playButtonWidth / 2) - 604
            let translateY = (this.mediaContentDimensions.height / 2) - (playButtonHeight / 2) - 282

            return `translate(${translateX} ${translateY})`
        },
        previewTextTransform () {
            let translateY = this.mediaContentDimensions.height - this.bottomContentOffset

            return `translate(0, ${translateY})`
        },
        maxHeight () {
            return this.mediaContentDimensions.height + 800
        },
        arrowForwardActive () {
            return this.swipeOffset !== this.carouselPositions.slice(-1)[0]
        },
        arrowBackActive () {
            return this.swipeOffset !== 0
        },
    },
    created () {
        this.postTextInitialHeight = 24
        this.bottomContentOffset = 294
        this.transcodingText = 'We’re processing this video. After a few moments, please refresh your browser.'
        this.transcodingTextShort = 'We’re processing this video.'
        this.facebookGrayColor = '#E7E7E7'
        this.facebookDarkGrayColor = '#AAAAB0'
        this.facebookLinkColor = '#365899'
        this.carouselCardPadding = 25
        this.carouselCardDimensions = { width: 343, height: 343 }
        this.firstCardPadding = 10
        this.firstCardLandscapePadding = 10
        this.lastCardPadding = -200
        this.lastCardLandscapePadding = -200
        if (this.format.id === 'FacebookCarouselAdPost'){
            this.carouselPositions = [0].concat(this.getCarouselPositions().slice(1).map(p => p - 350))
        }
    },
    mounted () {
        this.postTextHeight = this.$refs.postTextElement.clientHeight

        this.$nextTick(() => {
            this.setPreviewHeight()
            this.measureThumbnailAspectRatio()
        })
    },
    methods: {
        carouselCardTransform (index) {
            let translateX = this.mediaContentPadding.x + (index * this.carouselCardDimensions.width) + (index * this.carouselCardPadding)
            let translateY = this.mediaContentPadding.y

            return `translate(${350 + translateX} ${38 + translateY})`
        },
        arrowForward () {
            this.$refs.carouselVideo.forEach((v) => this.stopVideo(v))
            this.swipeOffset = this.carouselPositions[this.carouselPositions.indexOf(this.swipeOffset) + 1]
        },
        arrowBack () {
            this.$refs.carouselVideo.forEach((v) => this.stopVideo(v))
            this.swipeOffset = this.carouselPositions[this.carouselPositions.indexOf(this.swipeOffset) - 1]
        },
        handleCardClick (index, event) {
            if (this.carouselPositions.indexOf(this.swipeOffset) === index) {
                this.$root.$emit('open-url', this.carouselItems[index].link)
            } else {
                this.$refs.carouselVideo.forEach((v) => this.stopVideo(v))
                this.swipeOffset = this.carouselPositions[index]
            }
        },
    },
}
</script>

<style lang="less" scoped>
    #cards {
        pointer-events: bounding-box;
    }

    #cards:hover .carousel__card:not(.carousel__card--do-not-animate)   {
        opacity: 0.6;
    }

    .carousel__arrow:hover .carousel__card:not(.carousel__card--do-not-animate)  {
        opacity: 0.6;
    }

    .carousel__card {
        transition: opacity 200ms ease-out;
        cursor: pointer;
    }
</style>
