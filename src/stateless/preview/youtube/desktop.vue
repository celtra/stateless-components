<template>
    <g :transform="coordinateTransform">
        <defs>
            <polygon id="path-1" points="0 1024 1280 1024 1280 0 0 0"></polygon>
            <polygon id="path-3" points="120 714 888 714 888 96 120 96"></polygon>
            <text id="skipAdText" :fill="white" font-family="SFUIText-Regular, SF UI Text Regular" font-size="12">
                <tspan x="23.0967" y="27">Skip ad</tspan>
            </text>
            <filter id="skipAdFilter" width="111.4%" height="133.3%" x="-5.7%" y="-8.3%" filter-units="objectBoundingBox">
                <feOffset dy="1" in="SourceAlpha" result="shadowOffsetOuter1"/>
                <feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1" std-deviation=".5"/>
                <feColorMatrix in="shadowBlurOuter1" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"/>
            </filter>
            <text id="skipTimerText" :fill="white" font-family="SFUIText-Regular, SF UI Text Regular" font-size="12" letter-spacing="-.1167">
                <tspan x="17.875" y="23.0345">You can skip </tspan> <tspan x="31.6856" y="37.0345">ad in {{ 5 - currentTime | formatSeconds }}s</tspan>
            </text>
            <filter id="skipTimerFilter" x="-2.9%" y="-4.2%" width="105.9%" height="116.7%" filter-units="objectBoundingBox">
                <feOffset dx="0" dy="1" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
                <feGaussianBlur std-deviation="0.5" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
            </filter>
            <g id="video-overlay" >
                <g id="controls">
                    <g :fill="white" :transform="nextVideoControlTransform">
                        <path d="M13.11 10.6758L0 20.3358v-19.32z" transform="scale(0.4)"/>
                        <path d="M17.135 0h4.6v22.08h-4.6z" transform="scale(0.4)"/>
                    </g>

                    <g :fill="white" :transform="soundBarControlTransform">
                        <path d="M7.2235.0525A.5028.5028 0 0 0 6.7.1L2.8335 3H.5c-.2765 0-.5.2235-.5.5v4c0 .2765.2235.5.5.5h2.3335L6.7 10.9c.088.0665.194.1.3.1.076 0 .153-.0175.2235-.0525A.5005.5005 0 0 0 7.5 10.5V.5a.5005.5005 0 0 0-.2765-.4475zM9.1215 3.379l-.3535-.3535-.707.707.3535.3535c.78.78.78 2.0485 0 2.828l-.3535.3535.707.707.3535-.3535c1.1695-1.1695 1.1695-3.0725 0-4.242z"/>
                        <path d="M10.182 1.611l-.707.707.3535.3535c1.5595 1.5595 1.5595 4.0975 0 5.657l-.3535.3535.707.707.3535-.3535c1.9495-1.9495 1.9495-5.1215 0-7.0715l-.3535-.353z"/>
                    </g>

                    <g fill="none" :transform="soundCircleControlTransform">
                        <path fill="#333333" d="M0 4h54v3H0z"/>
                        <path :fill="white" d="M0 4h34v3H0z"/>
                        <circle cx="34" cy="5" r="5" :fill="white"/>
                    </g>

                    <g :transfrom="videoDurationControlTransform">
                        <text :fill="white" font-family="SFUIText-Regular, SF UI Text Regular" font-size="12" style="cursor: default; pointer-events: none;">
                            <tspan>{{ currentTime | formatDuration }} / {{ duration | formatDuration }}</tspan>
                        </text>
                    </g>

                    <g fill="none" :stroke="white" stroke-width="2" :transform="videoSettingsControlTransform">
                        <path d="M1 5V1h4"/>
                        <path d="M13 5V1H9"/>
                        <path d="M5 13H1V9"/>
                        <path d="M9 13h4V9"/>
                    </g>
                    <path fill="none" :stroke="white" stroke-width="2" d="M1 1h14v10H1z" :transform="videoCinemaModeControlTransform"/>
                    <path :transform="videoFullScreenControlTransform" :fill="white" d="M12 7.091V4.909h-1.7793a4.346 4.346 0 0 0-.4647-1.1225l1.2578-1.2578L9.4713.9862 8.2135 2.244a4.346 4.346 0 0 0-1.1226-.4647V0H4.9091v1.7793a4.346 4.346 0 0 0-1.1226.4647L2.5287.9862.9862 2.5287 2.244 3.7865a4.346 4.346 0 0 0-.4647 1.1226H0v2.1818h1.7793a4.346 4.346 0 0 0 .4647 1.1226L.9862 9.4713l1.5425 1.5425L3.7865 9.756a4.338 4.338 0 0 0 1.1226.4647V12h2.1818v-1.7793a4.346 4.346 0 0 0 1.1226-.4647l1.2578 1.2578 1.5425-1.5425L9.756 8.2135a4.3381 4.3381 0 0 0 .4647-1.1226H12zm-6 .5454c-.9038 0-1.6364-.7326-1.6364-1.6364S5.0962 4.3636 6 4.3636 7.6364 5.0962 7.6364 6 6.9038 7.6364 6 7.6364z"/>
                </g>

                <g :transform="videoTimeTextLeftTransform">
                    <text :fill="white" font-family="SFUIText-Regular, SF UI Text Regular" font-size="12" style="cursor: default; pointer-events: none;">
                        <tspan>Ad • {{ timeLeft | formatDuration }}</tspan>
                    </text>
                </g>

                <g v-if="!isAbleToSkip && format.id === 'YouTubeTrueView' && videoPlaying" :transform="skipTimerTransform" style="cursor: default; pointer-events: none;">
                    <path :fill="black" d="M568 356h200v55.1724H568z" opacity=".6"/>
                    <g :fill="white" transform="translate(568 356)">
                        <use filter="url(#skipTimerFilter)" xlink:href="#skipTimerText"/>
                        <use xlink:href="#skipTimerText"/>
                    </g>
                    <path :fill="lightGray" d="M674.2069 356H768v55.1724h-93.7931z"/>
                </g>
            </g>
        </defs>
        <g>
            <mask id="mask-2" fill="white">
                <use xlink:href="#path-1"></use>
            </mask>
            <use id="Mask" fill="#F5F5F5" xlink:href="#path-1"></use>
            <mask id="mask-4" fill="white">
                <use xlink:href="#path-3"></use>
            </mask>
            <polygon :fill="white" points="0 73 1280 73 1280 0 0 0"></polygon>

            <g :transform="videoDetailsTransform">
                <use id="Mask" :fill="white" xlink:href="#path-3"></use>
                <polygon :fill="gray" mask="url(#mask-4)" points="133 572 353 572 353 557 133 557"></polygon>
                <polygon :fill="gray" mask="url(#mask-4)" points="133 588 193 588 193 578 133 578"></polygon>
                <rect :fill="white" x="121" y="728" :width="mediaContentDimensions.width" height="296"></rect>
                <g mask="url(#mask-4)" :fill="gray">
                    <g transform="translate(413, 609)">
                        <path d="M0,9.24 C0,14.3431751 4.1984105,18.48 9.37755716,18.48 C14.5567038,18.48 18.7551143,14.3431751 18.7551143,9.24 C18.7551143,4.13682494 14.5567038,0 9.37755716,0 C4.1984105,0 0,4.13682494 0,9.24 Z"></path>
                        <path d="M75,9.24 C75,14.3431751 79.1984105,18.48 84.3775572,18.48 C89.5567038,18.48 93.7551143,14.3431751 93.7551143,9.24 C93.7551143,4.13682494 89.5567038,0 84.3775572,0 C79.1984105,0 75,4.13682494 75,9.24 Z"></path>
                        <path d="M148,9.24 C148,14.3431751 152.19841,18.48 157.377557,18.48 C162.556704,18.48 166.755114,14.3431751 166.755114,9.24 C166.755114,4.13682494 162.556704,0 157.377557,0 C152.19841,0 148,4.13682494 148,9.24 Z"></path>
                        <path d="M222,9.24 C222,14.3431751 226.19841,18.48 231.377557,18.48 C236.556704,18.48 240.755114,14.3431751 240.755114,9.24 C240.755114,4.13682494 236.556704,0 231.377557,0 C226.19841,0 222,4.13682494 222,9.24 Z"></path>
                    </g>
                </g>
                <g mask="url(#mask-4)">
                    <g transform="translate(120, 665)">
                        <path d="M13.89579,25 C13.89579,33.2843751 20.6114151,40 28.89579,40 C37.180165,40 43.89579,33.2843751 43.89579,25 C43.89579,16.7156249 37.180165,10 28.89579,10 C20.6114151,10 13.89579,16.7156249 13.89579,25 Z" stroke="none" :fill="gray"></path>
                        <polygon stroke="none" :fill="gray" points="53 25 207 25 207 10 53 10"></polygon>
                        <polygon stroke="none" :fill="gray" points="53 41 113 41 113 31 53 31"></polygon>
                        <path d="M1.19626168,0.5 L766.818691,0.5" :stroke="gray" stroke-width="1" fill="none" stroke-linecap="square"></path>
                        <path d="M1.19626168,48.5 L766.818691,48.5" :stroke="gray" stroke-width="1" fill="none" stroke-linecap="square"></path>
                    </g>
                </g>
                <g mask="url(#mask-4)">
                    <g transform="translate(120, 665)">
                        <path d="M13.89579,25 C13.89579,33.2843751 20.6114151,40 28.89579,40 C37.180165,40 43.89579,33.2843751 43.89579,25 C43.89579,16.7156249 37.180165,10 28.89579,10 C20.6114151,10 13.89579,16.7156249 13.89579,25 Z" stroke="none" :fill="gray"></path>
                        <polygon stroke="none" :fill="gray" points="53 25 207 25 207 10 53 10"></polygon>
                        <polygon stroke="none" :fill="gray" points="53 41 113 41 113 31 53 31"></polygon>
                        <path d="M1.19626168,0.5 L766.818691,0.5" :stroke="gray" stroke-width="1" fill="none" stroke-linecap="square"></path>
                        <path d="M1.19626168,48.5 L766.818691,48.5" :stroke="gray" stroke-width="1" fill="none" stroke-linecap="square"></path>
                    </g>
                </g>
                <g transform="translate(134, 770)" :fill="gray">
                    <path d="M0,15 C0,23.2843751 6.71562502,30 15,30 C23.284375,30 30,23.2843751 30,15 C30,6.7156249 23.284375,0 15,0 C6.71562502,0 0,6.7156249 0,15 Z"></path>
                    <polygon points="39 23 193 23 193 8 39 8"></polygon>
                    <path d="M0,68 C0,76.2843751 6.71562502,83 15,83 C23.284375,83 30,76.2843751 30,68 C30,59.7156249 23.284375,53 15,53 C6.71562502,53 0,59.7156249 0,68 Z"></path>
                    <polygon points="39 76 582 76 582 61 39 61"></polygon>
                    <path d="M0,128 C0,136.284375 6.71562502,143 15,143 C23.284375,143 30,136.284375 30,128 C30,119.715625 23.284375,113 15,113 C6.71562502,113 0,119.715625 0,128 Z"></path>
                    <polygon points="39 136 297 136 297 121 39 121"></polygon>
                    <path d="M0,188 C0,196.284375 6.71562502,203 15,203 C23.284375,203 30,196.284375 30,188 C30,179.715625 23.284375,173 15,173 C6.71562502,173 0,179.715625 0,188 Z"></path>
                    <polygon points="39 196 363 196 363 181 39 181"></polygon>
                </g>
            </g>
            <rect :fill="white" x="0" y="1024" width="1000" height="300"></rect>

            <rect :fill="white" x="904" y="96" width="321" height="928"></rect>
            <g transform="translate(948, 116)" :fill="gray">
                <polygon points="0 10 60 10 60 0 0 0"></polygon>
                <polygon points="0 242 60 242 60 232 0 232"></polygon>
                <polygon points="0 474 60 474 60 464 0 464"></polygon>
                <polygon points="0 690 60 690 60 680 0 680"></polygon>
                <polygon points="0 139.458333 220 139.458333 220 18 0 18"></polygon>
                <polygon points="0 371.458333 220 371.458333 220 250 0 250"></polygon>
                <polygon points="0 603.458333 220 603.458333 220 482 0 482"></polygon>
                <polygon points="0 819.458333 220 819.458333 220 698 0 698"></polygon>
                <polygon points="0 162 93 162 93 152 0 152"></polygon>
                <polygon points="0 394 93 394 93 384 0 384"></polygon>
                <polygon points="0 626 93 626 93 616 0 616"></polygon>
                <polygon points="0 842 93 842 93 832 0 832"></polygon>
                <polygon points="0 178 83 178 83 168 0 168"></polygon>
                <polygon points="0 410 83 410 83 400 0 400"></polygon>
                <polygon points="0 642 83 642 83 632 0 632"></polygon>
                <polygon points="0 858 83 858 83 848 0 848"></polygon>
            </g>

            <g id="preview-media-content" transform="translate(120 96)">
                <rect :fill="black" :width="mediaContentDimensions.width" :height="mediaContentDimensions.height"/>
                <image :xlink:href="thumbnailUrl" :width="mediaContentDimensions.width" :height="mediaContentDimensions.height" preserve-aspect-ratio="xMinYMin slice" ref="videoPosition"/>
                <rect opacity="0" :fill="white" class="video-control" :width="mediaContentDimensions.width" :height="overlayHeight" @click="playVideo($refs.video, $refs.videoPosition, $refs.videoContainer)"/>
                <use xlink:href="#video-overlay"/>

                <rect fill="#929496" x="11" :y="mediaContentDimensions.height - 32" :width="mediaContentDimensions.width - 22" height="3"></rect>

                <g v-if="!videoPlaying && !isVideoTranscoding" @click="playVideo($refs.video, $refs.videoPosition, $refs.videoContainer)" :transform="playVideoControlTransform">
                    <path :fill="white" d="M13.11 10.6758L0 20.3358v-19.32z" class="clickable" transform="scale(0.5)"/>
                </g>

                <foreignObject v-show="videoPlaying" ref="videoContainer" :width="mediaContentDimensions.width" :height="mediaContentDimensions.height">
                    <div xmlns="http://www.w3.org/1999/xhtml">
                        <video playsinline ref="video" @timeupdate="updateTime($refs.video)" @ended="stopVideo($refs.video)" :src="videoUrl" :height="mediaContentDimensions.height" style="object-fit: cover; clip-path: inset(0 0 0 0);"></video>

                        <div class="progress-bar" ref="progressBar">
                            <div class="progress-bar__bar" ref="progress"></div>
                        </div>

                        <svg xmlns="http://www.w3.org/2000/svg" ref="videoOverlay" :width="mediaContentDimensions.width" :height="mediaContentDimensions.height" style="position: absolute; left: 0px; top: 0px;">
                            <rect v-if="videoPaused" opacity="0" :fill="white" class="video-control" @click="playVideo($refs.video, $refs.videoPosition, $refs.videoContainer)" :width="mediaContentDimensions.width" :height="overlayHeight"/>
                            <rect v-else opacity="0" :fill="white" class="video-control" @click="pauseVideo($refs.video)" :width="mediaContentDimensions.width" :height="overlayHeight"/>
                            <use xlink:href="#video-overlay"/>

                            <g v-if="isAbleToSkip && format.id === 'YouTubeTrueView'" @click="stopVideo($refs.video)" class="clickable" :transform="canSkipTransform">
                                <path :fill="black" d="M648 361h120v45.4054H648z" opacity=".6"/>
                                <g transform="translate(648 361)">
                                    <use filter="url(#skipAdFilter)" xlink:href="#skipAdText"/>
                                    <use xlink:href="#skipAdText"/>
                                </g>
                                <g :fill="white">
                                    <path d="M741.3406 383.2378l-7.3946 5.4486v-10.8973z"/>
                                    <path d="M743.6108 377.2162h2.5946v12.4541h-2.5946z"/>
                                </g>
                            </g>

                            <g v-if="videoPaused" @click="playVideo($refs.video, $refs.videoPosition, $refs.videoContainer)" class="clickable" :transform="playVideoControlTransform">
                                <path :fill="white" d="M13.11 10.6758L0 20.3358v-19.32z" transform="scale(0.5)"/>
                            </g>
                            <g v-else @click="pauseVideo($refs.video)" class="clickable" :transform="playVideoControlTransform">
                                <path :fill="white" d="M0 26.923h7.6923V0H0v26.923zM15.3846 0v26.923h7.6923V0h-7.6923z" transform="scale(0.35)"/>
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
            let height = 432
            let width = 768

            if (this.videoDimensions.height >= this.videoDimensions.width) {
                height = 720
                // width = (this.videoDimensions.width / this.videoDimensions.height) * 1074
            }

            return { width, height }
        },
        progressBarWidth () {
            return Math.max(0, this.mediaContentDimensions.width - 22)
        },
        coordinateTransform () {
            return `scale(${100 / this.dimensions.width})`
        },
        playVideoControlTransform () {
            return `translate(22, ${this.mediaContentDimensions.height - 20})`
        },
        nextVideoControlTransform () {
            return `translate(52, ${this.mediaContentDimensions.height - 19})`
        },
        soundBarControlTransform () {
            return `translate(80, ${this.mediaContentDimensions.height - 20})`
        },
        soundCircleControlTransform () {
            return `translate(102, ${this.mediaContentDimensions.height - 20})`
        },
        videoDurationControlTransform () {
            return `translate(167, ${this.mediaContentDimensions.height - 10.5})`
        },
        videoSettingsControlTransform () {
            return `translate(${this.mediaContentDimensions.width - 34} ${this.mediaContentDimensions.height - 21.5})`
        },
        videoCinemaModeControlTransform () {
            return `translate(${this.mediaContentDimensions.width - 64} ${this.mediaContentDimensions.height - 20.5})`
        },
        videoFullScreenControlTransform () {
            return `translate(${this.mediaContentDimensions.width - 91} ${this.mediaContentDimensions.height - 20.5})`
        },
        videoTimeTextLeftTransform () {
            return `translate(20 ${this.mediaContentDimensions.height - 45})`
        },
        overlayHeight () {
            return this.mediaContentDimensions.height - 31
        },
        videoContentOffset () {
            let width = this.videoDimensions.width * (this.mediaContentDimensions.height / this.videoDimensions.height)
            return (this.mediaContentDimensions.width - width) / 2
        },
        videoDetailsTransform () {
            let height = Math.max(0, this.mediaContentDimensions.height - 432)
            return `translate(0 ${height})`
        },
        skipTimerTransform () {
            return `translate(0 ${this.mediaContentDimensions.height - 452})`
        },
        canSkipTransform () {
            return `translate(0 ${this.mediaContentDimensions.height - 453})`
        },
    },
}
</script>

<style scoped>
.progress-bar {
    background-color: #FFCB00;
    height: 2px;
    overflow: hidden;
    position: absolute;
    width: auto;
    bottom: 30px;
    left: 11px;
    right: 11px;
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

.video-control {
    pointer-events: bounding-box;
    -webkit-backface-visibility: hidden;
    -webkit-tap-highlight-color: transparent;
}
</style>
