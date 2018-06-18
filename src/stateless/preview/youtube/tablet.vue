<template>
    <g :transform="coordinateTransform">
        <defs>
            <path id="a" :d="`M0 ${dimensions.height}h${dimensions.width}V0H0z`"/>
            <g id="videoGroup">
                <path d="M13 10h60V0h-60z"/>
                <path d="M13 139.4583h220V18H13z"/>
                <path d="M13 162h93v-10h-93z"/>
                <path d="M13 178h83v-10h-83z"/>

                <path d="M273 10h60V0h-60z"/>
                <path d="M273 139.4583h220V18H273z"/>
                <path d="M273 162h93v-10h-93z"/>
                <path d="M273 178h83v-10h-83z"/>

                <path d="M533 10h60V0h-60z"/>
                <path d="M533 139.4583h220V18H533z"/>
                <path d="M533 162h93v-10h-93z"/>
                <path d="M533 178h83v-10h-83z"/>
            </g>
            <text id="visitText" :fill="white" font-family="SFUIText-Regular, SF UI Text Regular" font-size="14" letter-spacing="-.1167">
                <tspan letter-spacing="-.1361">Visit advertiser</tspan>
            </text>
            <filter id="visitFilter" width="104.8%" height="128.6%" x="-2.4%" y="-7.1%" filter-units="objectBoundingBox">
                <feOffset dy="1" in="SourceAlpha" result="shadowOffsetOuter1"/>
                <feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1" std-deviation=".5"/>
                <feColorMatrix in="shadowBlurOuter1" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"/>
            </filter>
            <text id="skipAdText" :fill="white" font-family="SFUIText-Regular, SF UI Text Regular" font-size="12">
                <tspan x="23.0967" y="27">Skip ad</tspan>
            </text>
            <filter id="skipAdFilter" width="111.4%" height="133.3%" x="-5.7%" y="-8.3%" filter-units="objectBoundingBox">
                <feOffset dy="1" in="SourceAlpha" result="shadowOffsetOuter1"/>
                <feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1" std-deviation=".5"/>
                <feColorMatrix in="shadowBlurOuter1" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"/>
            </filter>
            <text id="skipTimerText" :fill="white" font-family="SFUIText-Regular, SF UI Text Regular" font-size="12">
                <tspan x="17.875" y="23.0345">You can skip </tspan> <tspan x="31.6856" y="37.0345">ad in {{ 5 - currentTime | formatSeconds }}s</tspan>
            </text>
            <filter id="skipTimerFilter" x="-2.9%" y="-4.2%" width="105.9%" height="116.7%" filter-units="objectBoundingBox">
                <feOffset dx="0" dy="1" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
                <feGaussianBlur std-deviation="0.5" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
            </filter>
            <g id="video-overlay">
                <g fill="none" fill-rule="evenodd" :stroke="white" stroke-width="2" :transform="fullScreenIconTransform" v-if="areVideoControlsVisible">
                    <path d="M1 5V1h4"/>
                    <path d="M13 5V1H9"/>
                    <path d="M5 13H1V9"/>
                    <path d="M9 13h4V9"/>
                </g>

                <g v-if="format.id === 'YouTubeTrueView' && areVideoControlsVisible" :transform="visitAdvertisterTransform" style="cursor: default; pointer-events: none;">
                    <use filter="url(#visitFilter)" xlink:href="#visitText"/>
                    <use xlink:href="#visitText"/>
                </g>

                <g :transform="countDownTransform">
                    <text :fill="white" font-family="SFUIText-Regular, SF UI Text Regular" font-size="12" style="cursor: default; pointer-events: none;">
                        <tspan>Ad • {{ timeLeft | formatDuration }}</tspan>
                    </text>
                </g>

                <g v-if="!isAbleToSkip && format.id === 'YouTubeTrueView' && videoPlaying" :transform="skipTimerTransform">
                    <rect :fill="black" fill-rule="evenodd" opacity="0.6" width="200" height="55.1724138"></rect>
                    <g style="cursor: default; pointer-events: none;">
                        <use filter="url(#skipTimerFilter)" xlink:href="#skipTimerText"/>
                        <use xlink:href="#skipTimerText"/>
                    </g>
                    <rect :fill="lightGray" fill-rule="evenodd" x="106.206897" y="0" width="93.7931034" height="55.1724138"></rect>
                </g>
            </g>
        </defs>
        <g id="landscape" v-if="isLandscape">
            <g fill="none" fill-rule="evenodd">
                <mask id="b" :fill="white">
                    <use xlink:href="#a"/>
                </mask>

                <use :fill="white" xlink:href="#a"/>
                <g :fill="gray" mask="url(#b)">
                    <path d="M293 552.24c0 5.1032 4.1984 9.24 9.3776 9.24 5.1791 0 9.3775-4.1368 9.3775-9.24s-4.1984-9.24-9.3775-9.24c-5.1792 0-9.3776 4.1368-9.3776 9.24zM368 552.24c0 5.1032 4.1984 9.24 9.3776 9.24 5.1791 0 9.3775-4.1368 9.3775-9.24s-4.1984-9.24-9.3775-9.24c-5.1792 0-9.3776 4.1368-9.3776 9.24zM441 552.24c0 5.1032 4.1984 9.24 9.3776 9.24 5.1791 0 9.3775-4.1368 9.3775-9.24s-4.1984-9.24-9.3775-9.24c-5.1792 0-9.3776 4.1368-9.3776 9.24zM515 552.24c0 5.1032 4.1984 9.24 9.3776 9.24 5.1791 0 9.3775-4.1368 9.3775-9.24s-4.1984-9.24-9.3775-9.24c-5.1792 0-9.3776 4.1368-9.3776 9.24z"/>
                </g>
                <path :fill="gray" d="M13 546h220v-15H13z" mask="url(#b)"/>
                <g mask="url(#b)">
                    <path :fill="gray" d="M13.8958 624c0 8.2844 6.7156 15 15 15s15-6.7156 15-15-6.7156-15-15-15-15 6.7156-15 15zM53 624h154v-15H53zM53 640h60v-10H53z"/>
                    <path :stroke="gray" stroke-linecap="square" d="M1.1963 599.5h765.6224M1.1963 647.5h765.6224"/>
                </g>

                <path :fill="gray" d="M53 741h324v-15H53zM14 689c0 8.2844 6.7156 15 15 15s15-6.7156 15-15-6.7156-15-15-15-15 6.7156-15 15zM53 697h154v-15H53zM14 733c0 8.2844 6.7156 15 15 15s15-6.7156 15-15-6.7156-15-15-15-15 6.7156-15 15zM13 562h60v-10H13zM1 507h768V0H1z" mask="url(#b)"/>
                <path :fill="gray" d="M785 30h60V20h-60zM785 262h60v-10h-60zM785 494h60v-10h-60zM785 710h60v-10h-60zM785 159.4583h220V38H785zM785 391.4583h220V270H785zM785 623.4583h220V502H785zM785 839.4583h220V718H785zM785 182h93v-10h-93zM785 414h93v-10h-93zM785 646h93v-10h-93zM785 198h83v-10h-83zM785 430h83v-10h-83zM785 662h83v-10h-83z" mask="url(#b)"/>
                <path transform="translate(260 0)" :fill="gray" d="M785 30h60V20h-60zM785 262h60v-10h-60zM785 494h60v-10h-60zM785 710h60v-10h-60zM785 159.4583h220V38H785zM785 391.4583h220V270H785zM785 623.4583h220V502H785zM785 839.4583h220V718H785zM785 182h93v-10h-93zM785 414h93v-10h-93zM785 646h93v-10h-93zM785 198h83v-10h-83zM785 430h83v-10h-83zM785 662h83v-10h-83z" mask="url(#b)"/>

                <g id="preview-media-content" :transform="`translate(${mediaContentPadding.x} ${mediaContentPadding.y})`">
                    <rect :fill="black" :width="mediaContentDimensions.width" :height="mediaContentDimensions.height"/>
                    <image :xlink:href="thumbnailUrl" class="post-svg-image" :width="mediaContentDimensions.width" :height="mediaContentDimensions.height" preserve-aspect-ratio="xMinYMin slice" ref="videoPosition"/>

                    <foreignObject :width="mediaContentDimensions.width" :height="mediaContentDimensions.height" style="pointer-events: none;">
                        <div xmlns="http://www.w3.org/1999/xhtml">
                            <div class="progress-bar" ref="progressBarPlaceholder">
                                <div class="progress-bar__bar"></div>
                            </div>
                        </div>
                    </foreignObject>

                    <rect opacity="0" :fill="white" class="toggle-video-controls" @click="toggleVideoControls" :width="mediaContentDimensions.width" :height="mediaContentDimensions.height"/>
                    <use xlink:href="#video-overlay"/>

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

                                <g v-if="isAbleToSkip && format.id === 'YouTubeTrueView'" @click="stopVideo($refs.video)" :transform="canSkipTransform" class="clickable">
                                    <rect :fill="black" opacity="0.6" mask="url(#b)" width="120" height="45.4054054"></rect>
                                    <g style="cursor: default; pointer-events: none;">
                                        <use filter="url(#skipAdFilter)" xlink:href="#skipAdText"/>
                                        <use xlink:href="#skipAdText"/>
                                    </g>

                                    <g :fill="white" transform="scale(1.7)">
                                        <path d="M57.56 13.713l-4.56 3.36v-6.72z"/>
                                        <path d="M58.96 10h1.6v7.68h-1.6z"/>
                                    </g>
                                </g>

                                <g :transform="videoControlsTransform" v-if="areVideoControlsVisible && videoPaused" @click="playVideo($refs.video, $refs.videoPosition, $refs.videoContainer)" class="clickable">
                                    <rect opacity="0" width="23" height="27"/>
                                    <path :fill="white" d="M13.11 10.6758L0 20.3358v-19.32z" transform="scale(1.5)"/>
                                </g>
                                <g :transform="videoControlsTransform" v-if="areVideoControlsVisible && !videoPaused" @click="pauseVideo($refs.video)" class="clickable">
                                    <rect opacity="0" width="23" height="27"/>
                                    <path :fill="white" d="M0 26.923h7.6923V0H0v26.923zM15.3846 0v26.923h7.6923V0h-7.6923z"/>
                                </g>
                            </svg>
                        </div>
                    </foreignObject>

                    <preview-video-placeholder v-if="isVideoTranscoding" :width="mediaContentDimensions.width" :height="mediaContentDimensions.height" :font-size="7.5" :text="transcodingText"></preview-video-placeholder>
                </g>
            </g>
        </g>
        <g id="portrait" v-else>
            <g fill="none" fill-rule="evenodd">
                <mask id="b" :fill="white">
                    <use xlink:href="#a"/>
                </mask>
                <use :fill="white" xlink:href="#a"/>
                <path :fill="gray" :d="`M0 20h${dimensions.width}V0H1z`" mask="url(#b)"/>

                <g :transform="`translate(0 ${mediaContentDimensions.height})`">
                    <path :fill="gray" :d="`M0 69h${mediaContentDimensions.width}v-50H1z`" mask="url(#b)"/>

                    <g :fill="gray" mask="url(#b)" :transform="`translate(280 123)`">
                        <path d="M0 9.24c0 5.1032 4.1984 9.24 9.3776 9.24 5.1791 0 9.3775-4.1368 9.3775-9.24S14.5567 0 9.3776 0C4.1984 0 0 4.1368 0 9.24z"/>
                        <path d="M75 9.24c0 5.1032 4.1984 9.24 9.3776 9.24 5.1791 0 9.3775-4.1368 9.3775-9.24S89.5567 0 84.3776 0C79.1984 0 75 4.1368 75 9.24z"/>
                        <path d="M148 9.24c0 5.1032 4.1984 9.24 9.3776 9.24 5.1791 0 9.3775-4.1368 9.3775-9.24S162.5567 0 157.3776 0C152.1984 0 148 4.1368 148 9.24z"/>
                        <path d="M222 9.24c0 5.1032 4.1984 9.24 9.3776 9.24 5.1791 0 9.3775-4.1368 9.3775-9.24S236.5567 0 231.3776 0C226.1984 0 222 4.1368 222 9.24z"/>
                    </g>

                    <g :fill="gray" mask="url(#b)" transform="translate(0 107)">
                        <path d="M13 25h220V10H13z"/>
                        <path d="M13 41h40V31H13z"/>
                    </g>

                    <g mask="url(#b)" :fill="gray" transform="translate(0 202)">
                        <path d="M13.8958 25c0 8.2844 6.7156 15 15 15s15-6.7156 15-15-6.7156-15-15-15-15 6.7156-15 15z"/>
                        <path d="M53 25h154V10H53z"/>
                        <path d="M53 41h60V31H53z"/>
                    </g>

                    <g mask="url(#b)" :stroke="gray" stroke-linecap="square" transform="translate(0 202)">
                        <path d="M1.1963.5h765.6224" :transform="separatorsTransform"/>
                        <path d="M1.1963 48.5h765.6224" :transform="separatorsTransform"/>
                    </g>

                    <g transform="translate(0 294)" :fill="gray" mask="url(#b)">
                        <use xlink:href="#videoGroup" :transform="videoGroupTransform"/>
                    </g>
                    <g transform="translate(0 504)" :fill="gray" mask="url(#b)">
                        <use xlink:href="#videoGroup" :transform="videoGroupTransform"/>
                    </g>
                    <g transform="translate(0 714)" :fill="gray" mask="url(#b)">
                        <use xlink:href="#videoGroup" :transform="videoGroupTransform"/>
                    </g>
                </g>

                <g id="preview-media-content" :transform="`translate(${mediaContentPadding.x} ${mediaContentPadding.y})`">
                    <rect :fill="black" :width="mediaContentDimensions.width" :height="mediaContentDimensions.height"/>
                    <image :xlink:href="thumbnailUrl" class="post-svg-image" :width="mediaContentDimensions.width" :height="mediaContentDimensions.height" preserve-aspect-ratio="xMinYMin slice" ref="videoPosition"/>

                    <rect v-show="!videoPlaying" fill="#929496" x="0" :y="mediaContentDimensions.height - 3" :width="mediaContentDimensions.width" height="3"></rect>

                    <rect opacity="0" :fill="white" style="pointer-events: bounding-box;" @click="toggleVideoControls" :width="mediaContentDimensions.width" :height="mediaContentDimensions.height"/>
                    <use xlink:href="#video-overlay"/>

                    <g :transform="videoControlsTransform" v-if="!videoPlaying && !isVideoTranscoding && areVideoControlsVisible" @click="playVideo($refs.video, $refs.videoPosition, $refs.videoContainer)" class="clickable">
                        <rect opacity="0" width="23" height="27"/>
                        <path :fill="white" d="M13.11 10.6758L0 20.3358v-19.32z" transform="scale(1.5)"/>
                    </g>

                    <foreignObject v-show="videoPlaying" ref="videoContainer" :width="mediaContentDimensions.width" :height="mediaContentDimensions.height">
                        <div xmlns="http://www.w3.org/1999/xhtml">
                            <video playsinline ref="video" @timeupdate="updateTime($refs.video)" @ended="stopVideo($refs.video)" :src="videoUrl" :height="mediaContentDimensions.height" style="object-fit: cover; clip-path: inset(0 0 0 0);"></video>

                            <div class="progress-bar" ref="progressBar">
                                <div class="progress-bar__bar" ref="progress"></div>
                            </div>

                            <svg xmlns="http://www.w3.org/2000/svg" ref="videoOverlay" height="100%" width="100%" style="position: absolute; left: 0px; top: 0px;">
                                <rect opacity="0" :fill="white" style="pointer-events: bounding-box;" @click="toggleVideoControls()" :width="mediaContentDimensions.width" :height="mediaContentDimensions.height"/>
                                <use xlink:href="#video-overlay"/>

                                <g v-if="isAbleToSkip && format.id === 'YouTubeTrueView'" @click="stopVideo($refs.video)" :transform="canSkipTransform" class="clickable">
                                    <rect :fill="black" opacity="0.6" mask="url(#b)" width="120" height="45.4054054"></rect>
                                    <g :fill="white">
                                        <use filter="url(#skipAdFilter)" xlink:href="#skipAdText"/>
                                        <use xlink:href="#skipAdText"/>
                                    </g>

                                    <g :fill="white" transform="scale(1.7)">
                                        <path d="M57.56 13.713l-4.56 3.36v-6.72z"/>
                                        <path d="M58.96 10h1.6v7.68h-1.6z"/>
                                    </g>
                                </g>

                                <g :transform="videoControlsTransform" v-if="areVideoControlsVisible && videoPaused" @click="playVideo($refs.video, $refs.videoPosition, $refs.videoContainer)" class="clickable">
                                    <rect opacity="0" width="23" height="27"/>
                                    <path :fill="white" d="M13.11 10.6758L0 20.3358v-19.32z" transform="scale(1.5)"/>
                                </g>
                                <g :transform="videoControlsTransform" v-if="areVideoControlsVisible && !videoPaused" @click="pauseVideo($refs.video)" class="clickable">
                                    <rect opacity="0" width="23" height="27"/>
                                    <path :fill="white" d="M0 26.923h7.6923V0H0v26.923zM15.3846 0v26.923h7.6923V0h-7.6923z"/>
                                </g>
                            </svg>
                        </div>
                    </foreignObject>

                    <preview-video-placeholder v-if="isVideoTranscoding" :width="mediaContentDimensions.width" :height="mediaContentDimensions.height" :font-size="7.5" :text="transcodingText"></preview-video-placeholder>
                </g>
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
            isLandscape: true,
            imageAspectRatio: 1.78,
        }
    },
    computed: {
        mediaContentDimensions () {
            if (this.isLandscape) {
                let width = 768
                let height = 432

                return { width, height }
            } else {
                let width = this.dimensions.width - (this.mediaContentPadding.x * 2)
                let height = width / this.imageAspectRatio

                return { width, height }
            }
        },
        mediaContentPadding () {
            let x = 0
            let y = 20

            return { x, y }
        },
        progressBarWidth () {
            return this.mediaContentDimensions.width
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
        separatorsTransform () {
            return `scale(${this.mediaContentDimensions.width / 765}, 1)`
        },
        videoGroupTransform () {
            return `scale(${this.mediaContentDimensions.width / 763}, 1)`
        },
        canSkipTransform () {
            return `translate(${this.mediaContentDimensions.width - 120} ${this.mediaContentDimensions.height - 100})`
        },
        skipTimerTransform () {
            return `translate(${this.mediaContentDimensions.width - 200} ${this.mediaContentDimensions.height - 95})`
        },
        countDownTransform () {
            return `translate(20 ${this.mediaContentDimensions.height - 12})`
        },
        fullScreenIconTransform () {
            return `translate(${this.mediaContentDimensions.width - 27} ${this.mediaContentDimensions.height - 30})`
        },
        visitAdvertisterTransform () {
            return `translate(${this.mediaContentDimensions.width - 128} 34)`
        },
        videoContentOffset () {
            let width = this.videoDimensions.width * (this.mediaContentDimensions.height / this.videoDimensions.height)
            return (this.mediaContentDimensions.width - width) / 2
        },
    },
}
</script>

<style scoped>
.progress-bar {
    background-color: #FFCB00;
    height: 3px;
    overflow: hidden;
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
