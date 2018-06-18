<template>
    <g :transform="coordinateTransform">
        <defs>
            <path id="background" :d="`M0 ${dimensions.height}h${dimensions.width}V0H0z`"/>
            <text id="visitAdvertiserText" :fill="white" font-family="SFUIText-Regular, SF UI Text Regular" font-size="12" letter-spacing="-.1">
                <tspan>Visit advertiser</tspan>
            </text>
            <filter id="visitAdvertiserFilter" width="104.8%" height="128.6%" x="-2.4%" y="-7.1%" filter-units="objectBoundingBox">
                <feOffset dy="1" in="SourceAlpha" result="shadowOffsetOuter1"/>
                <feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1" std-deviation=".5"/>
                <feColorMatrix in="shadowBlurOuter1" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"/>
            </filter>
            <text id="skipAdText" :fill="white" font-family="SFUIText-Regular, SF UI Text Regular" font-size="10">
                <tspan x="8.581" y="17">Skip ad</tspan>
            </text>
            <filter id="skipAdFilter" width="111.4%" height="133.3%" x="-5.7%" y="-8.3%" filter-units="objectBoundingBox">
                <feOffset dy="1" in="SourceAlpha" result="shadowOffsetOuter1"/>
                <feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1" std-deviation=".5"/>
                <feColorMatrix in="shadowBlurOuter1" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"/>
            </filter>
            <text id="skipTimer" font-family="SFUIText-Regular, SF UI Text Regular" font-size="10" font-weight="normal" :fill="white">
                <tspan x="8.93896484" y="18">You can skip </tspan>
                <tspan x="20.4477539" y="30">ad in {{ 5 - currentTime | formatSeconds }}s</tspan>
            </text>
            <filter id="skipTimerFilter" x="-2.9%" y="-4.2%" width="105.9%" height="116.7%" filter-units="objectBoundingBox">
                <feOffset dx="0" dy="1" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
                <feGaussianBlur std-deviation="0.5" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
            </filter>
            <g id="video-overlay" :width="mediaContentDimensions.width" :height="mediaContentDimensions.height">
                <g :stroke="white" stroke-width="2" :transform="fullScreenIconTransform" v-if="areVideoControlsVisible">
                    <g v-if="!isLandscape">
                        <path d="M1 5V1h4"/>
                        <path d="M13 5V1H9"/>
                        <path d="M5 13H1V9"/>
                        <path d="M9 13h4V9"/>
                    </g>
                    <g v-else>
                        <path d="M4 0v4H0"/>
                        <path d="M8 0v4h4"/>
                        <path d="M0 8h4v4"/>
                        <path d="M12 8H8v4"/>
                    </g>
                </g>

                <g v-if="format.id === 'YouTubeTrueView' && areVideoControlsVisible" :transform="visitAdvertisterTransform" style="cursor: default; pointer-events: none;">
                    <use filter="url(#visitAdvertiserFilter)" xlink:href="#visitAdvertiserText"/>
                    <use xlink:href="#visitAdvertiserText"/>
                </g>

                <text :transform="countDownTransform" :fill="white" font-family="SFUIText-Regular, SF UI Text Regular" font-size="10" style="cursor: default; pointer-events: none;">
                    <tspan>Ad • {{ timeLeft | formatDuration }}</tspan>
                </text>

                <g v-if="!isAbleToSkip && format.id === 'YouTubeTrueView' && videoPlaying" style="cursor: default; pointer-events: none;" :transform="skipTimerTransform">
                    <rect :fill="black" opacity="0.6" x="0" y="0" width="145" height="40"></rect>
                    <g :fill="white" fill-opacity="1">
                        <use filter="url(#skipTimerFilter)" xlink:href="#skipTimer"></use>
                        <use xlink:href="#skipTimer"/>
                    </g>
                    <rect :fill="lightGray" x="77" y="0" width="68" height="40"></rect>
                </g>
            </g>

            <g id="group" :fill="gray">
                <path fill-rule="nonzero" d="M12 443h60v-10H12z"/>
                <path fill-rule="nonzero" d="M12 531h145v-80H12z"/>
                <path fill-rule="nonzero" d="M171 443h93v-10h-93z"/>
                <path fill-rule="nonzero" d="M171 459h83v-10h-83z"/>
                <path fill-rule="nonzero" d="M171 491h83v-10h-83z"/>
                <path fill-rule="nonzero" d="M171 507h60v-10h-60z"/>
                <path fill-rule="nonzero" d="M171 475h103v-10H171z"/>
            </g>
        </defs>
        <g fill="none" fill-rule="evenodd">
            <g>
                <mask id="mask" :fill="white">
                    <use xlink:href="#background"/>
                </mask>
                <use :fill="white" fill-rule="nonzero" xlink:href="#background"/>

                <g id="top" v-if="!isLandscape">
                    <path :fill="gray" fill-rule="nonzero" :d="`M0 20h${dimensions.width}V0H0z`" mask="url(#b)"/>
                </g>

                <g id="bottom" v-if="!isLandscape" mask="url(#mask)" :transform="bottomObjectsTransform">
                    <g :transform="centerVideoObjectsTransform">
                        <path :fill="gray" fill-rule="nonzero" d="M39 322.24c0 5.1032 4.1984 9.24 9.3776 9.24 5.1791 0 9.3775-4.1368 9.3775-9.24S53.5567 313 48.3776 313C43.1984 313 39 317.1368 39 322.24z"/>
                        <path :fill="gray" fill-rule="nonzero" d="M114 322.24c0 5.1032 4.1984 9.24 9.3776 9.24 5.1791 0 9.3775-4.1368 9.3775-9.24s-4.1984-9.24-9.3775-9.24c-5.1792 0-9.3776 4.1368-9.3776 9.24z"/>
                        <path :fill="gray" fill-rule="nonzero" d="M187 322.24c0 5.1032 4.1984 9.24 9.3776 9.24 5.1791 0 9.3775-4.1368 9.3775-9.24s-4.1984-9.24-9.3775-9.24c-5.1792 0-9.3776 4.1368-9.3776 9.24z"/>
                        <path :fill="gray" fill-rule="nonzero" d="M261 322.24c0 5.1032 4.1984 9.24 9.3776 9.24 5.1791 0 9.3775-4.1368 9.3775-9.24s-4.1984-9.24-9.3775-9.24c-5.1792 0-9.3776 4.1368-9.3776 9.24z"/>
                    </g>
                    <path fill-rule="nonzero" d="M12.8958 387c0 8.2844 6.7156 15 15 15s15-6.7156 15-15-6.7156-15-15-15-15 6.7156-15 15z"/>
                    <g :fill="gray">
                        <path fill-rule="nonzero" d="M12 283h220v-15H12z"/>
                        <path fill-rule="nonzero" d="M12 299h60v-10H12z"/>
                    </g>
                    <g :fill="gray">
                        <path fill-rule="nonzero" d="M52 387h154v-15H52z"/>
                        <path fill-rule="nonzero" d="M52 403h60v-10H52z"/>
                    </g>

                    <use xlink:href="#group"/>
                    <use xlink:href="#group" transform="translate(0 130)"/>
                    <use xlink:href="#group" transform="translate(0 260)"/>

                    <g :transform="separatorsTransform">
                        <path :fill="gray" fill-rule="nonzero" d="M0 250h320v-50H0z"/>
                        <path :stroke="gray" stroke-linecap="square" d="M-.5 363.5h320.0063"/>
                        <path :stroke="gray" stroke-linecap="square" d="M-.5 411.5h320.0063"/>
                        <path :stroke="gray" stroke-linecap="square" d="M-.5 541h320.0063"/>
                        <path :stroke="gray" stroke-linecap="square" d="M-.5 671h320.0063"/>
                    </g>
                </g>
            </g>

            <g id="preview-media-content" :transform="`translate(${mediaContentPadding.x} ${mediaContentPadding.y})`">
                <rect :fill="black" :width="mediaContentDimensions.width" :height="mediaContentDimensions.height"/>
                <image :xlink:href="thumbnailUrl" :width="mediaContentDimensions.width" :height="mediaContentDimensions.height" preserve-aspect-ratio="xMinYMin slice" ref="videoPosition"/>

                <rect v-show="!videoPlaying" fill="#929496" x="0" :y="mediaContentDimensions.height - 3" :width="mediaContentDimensions.width" height="3"></rect>

                <rect opacity="0" :fill="white" class="toggle-video-controls" @click="toggleVideoControls()" :width="mediaContentDimensions.width" :height="mediaContentDimensions.height"/>

                <use xlink:href="#video-overlay" v-if="!videoPlaying"/>

                <g :transform="videoControlsTransform" v-if="!videoPlaying && !isVideoTranscoding && areVideoControlsVisible" @click="playVideo($refs.video, $refs.videoPosition, $refs.videoContainer)" class="clickable">
                    <rect opacity="0" width="23" height="27"/>
                    <path :fill="white" d="M13.11 10.6758L0 20.3358v-19.32z" transform="scale(1.5)"/>
                </g>

                <foreignObject v-show="videoPlaying" ref="videoContainer" :width="mediaContentDimensions.width" :height="mediaContentDimensions.height">
                    <div xmlns="http://www.w3.org/1999/xhtml">
                        <video :height="mediaContentDimensions.height" playsinline ref="video" @timeupdate="updateTime($refs.video)" @ended="stopVideo($refs.video)" :src="videoUrl" style="object-fit: cover; clip-path: inset(0 0 0 0);"></video>

                        <div class="progress-bar" ref="progressBar">
                            <div class="progress-bar__bar" ref="progress"></div>
                        </div>

                        <svg xmlns="http://www.w3.org/2000/svg" ref="videoOverlay" height="100%" width="100%" style="position: absolute; left: 0px; top: 0px;">
                            <rect opacity="0" :fill="white" class="toggle-video-controls" @click="toggleVideoControls()" :width="mediaContentDimensions.width" :height="mediaContentDimensions.height"/>
                            <use xlink:href="#video-overlay"/>

                            <g v-if="isAbleToSkip && format.id === 'YouTubeTrueView'" @click="stopVideo($refs.video)" class="clickable" :transform="canSkipTransform">
                                <path :fill="black" d="M0 0h74v28h-74z" opacity=".6"/>
                                <g :fill="white">
                                    <use filter="url(#skipAdFilter)" xlink:href="#skipAdText"></use>
                                    <use xlink:href="#skipAdText"/>
                                </g>
                                <g :fill="white">
                                    <path d="M57.56 13.713l-4.56 3.36v-6.72z"/>
                                    <path fill-rule="nonzero" d="M58.96 10h1.6v7.68h-1.6z"/>
                                </g>
                            </g>

                            <g :transform="videoControlsTransform" v-if="areVideoControlsVisible && videoPaused" @click="playVideo($refs.video, $refs.videoPosition, $refs.videoContainer)" class="clickable">
                                <rect opacity="0" width="23" height="27"/>
                                <path :fill="white" d="M13.11 10.6758L0 20.3358v-19.32z" transform="scale(1.5)"/>
                            </g>
                            <g :transform="videoControlsTransform" v-if="areVideoControlsVisible && !videoPaused" @click="pauseVideo($refs.video)" class="clickable">
                                <rect opacity="0" width="23" height="27"/>
                                <path :fill="white" fill-rule="nonzero" d="M0 26.923h7.6923V0H0v26.923zM15.3846 0v26.923h7.6923V0h-7.6923z"/>
                            </g>
                        </svg>
                    </div>
                </foreignObject>

                <preview-video-placeholder v-if="isVideoTranscoding" :width="mediaContentDimensions.width" :height="mediaContentDimensions.height" :font-size="7.5" :text="transcodingText"></preview-video-placeholder>
            </g>
        </g>
    </g>
</template>

<script>
import PreviewVideoPlaceholder from '../shared/preview_video_placeholder.vue'
import { VideoPreviewMixin } from './mixins'

export default {
    components: {
        previewVideoPlaceholder: PreviewVideoPlaceholder,
    },
    mixins: [VideoPreviewMixin],
    props: {
        format: { type: Object, required: true },
        thumbnailUrl: { type: String, required: false },
        videoUrl: { type: String, required: false },
        duration: { type: Number, required: true },
        isVideoTranscoding: { type: Boolean, required: false },
        videoDimensions: { type: Object, required: true },
    },
    data () {
        return {
            dimensions: { width: 100, height: 100 },
            isLandscape: false,
            imageAspectRatio: 1.78,
        }
    },
    computed: {
        mediaContentDimensions () {
            let width = this.dimensions.width - (this.mediaContentPadding.x * 2)
            let height = width / this.imageAspectRatio

            return { width, height }
        },
        mediaContentPadding () {
            let x = 0
            let y = this.isLandscape ? 0 : 20

            return { x, y }
        },
        coordinateTransform () {
            return `scale(${100 / this.dimensions.width})`
        },
        videoControlsTransform () {
            let playButtonWidth = 22
            let playButtonHeight = 28

            let translateX = (this.mediaContentDimensions.width / 2) - (playButtonWidth / 2)
            let translateY = (this.mediaContentDimensions.height / 2) - (playButtonHeight / 2)

            return `translate(${translateX} ${translateY})`
        },
        progressBarWidth () {
            return this.mediaContentDimensions.width
        },
        visitAdvertisterTransform () {
            return `translate(${this.mediaContentDimensions.width - 100} 28)`
        },
        countDownTransform () {
            return `translate(8 ${this.mediaContentDimensions.height - 12})`
        },
        fullScreenIconTransform () {
            return `translate(${this.mediaContentDimensions.width - 32} ${this.mediaContentDimensions.height - 22})`
        },
        skipTimerTransform () {
            return `translate(${this.mediaContentDimensions.width - 145} ${this.mediaContentDimensions.height - 70})`
        },
        canSkipTransform () {
            return `translate(${this.mediaContentDimensions.width - 74} ${this.mediaContentDimensions.height - 63})`
        },
        bottomObjectsTransform () {
            return `translate(0 ${this.mediaContentDimensions.height - 180})`
        },
        centerVideoObjectsTransform () {
            return `translate(${(this.dimensions.width - 320) / 2} 0)`
        },
        separatorsTransform () {
            return `scale(${this.dimensions.width / 320}, 1)`
        },
        videoContentOffset () {
            let width = this.videoDimensions.width * (this.mediaContentDimensions.height / this.videoDimensions.height)
            return (this.dimensions.width - width) / 2
        },
    },
}
</script>

<style scoped>
.progress-bar {
    background-color: #FFCB00;
    height: 3px;
    position: absolute;
    width: 100%;
    bottom: 0;
}

.progress-bar__bar {
    background-color: #929496;
    position: absolute;
    transition: all 500ms ease-out;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
}

.clickable {
    cursor: pointer;
    pointer-events: bounding-box
}

.toggle-video-controls {
    pointer-events: bounding-box;
    -webkit-backface-visibility: hidden;
    -webkit-tap-highlight-color: transparent;
}
</style>
