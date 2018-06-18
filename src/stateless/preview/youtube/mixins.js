import moment from 'moment'

export const VideoPreviewMixin = {
    data () {
        return {
            videoPlaying: false,
            videoPaused: false,
            currentTime: 0,
            timeLeft: 0,
            isAbleToSkip: false,
            areVideoControlsVisible: true,
        }
    },
    created () {
        this.transcodingText = 'We’re processing this video. After a few moments, please refresh your browser.'
        this.transcodingTextShort = 'We’re processing this video.'
        this.black = '#000000'
        this.gray = '#E7E7E7'
        this.lightGray = '#D8D8D8'
        this.white = '#FFFFFF'
    },
    methods: {
        setPreviewHeight () {
            // set viewbox so that svg dimensions are equal to screen dimensions
            document.getElementById('vue-preview-svg').setAttribute('viewBox', `0 0 100 ${100 * this.dimensions.height / this.dimensions.width}`)
        },
        positionVideos () {
            let videoPositionRef = this.$refs.videoPosition

            if (videoPositionRef) {
                this.positionVideo(videoPositionRef, this.$refs.video)
            }
        },
        positionVideo (positionRef, videoRef) {
            let isFirefox = navigator.userAgent.toLowerCase().includes('firefox')
            let boundingRect = positionRef.getBoundingClientRect()

            // Firefox positions foreignObject contents correctly, no need to translate them
            if (!isFirefox) {
                videoRef.style.transform = `translate(${this.videoContentOffset + boundingRect.left}px, ${boundingRect.top + window.scrollY}px)`
                this.$refs.videoOverlay.style.transform = `translate(${boundingRect.left}px, ${boundingRect.top + window.scrollY}px)`
                this.$refs.progressBar.style.transform = `translate(${boundingRect.left}px, ${boundingRect.top + window.scrollY}px)`
            } else {
                videoRef.style.transform = `translate(${this.videoContentOffset}px, 0px)`
            }
        },
        playVideo (videoRef, positionRef, videoContainerRef, videoIndex) {
            this.positionVideo(positionRef, videoRef)

            videoRef.play().then(() => {
                this.videoPlaying = videoIndex || true
                this.videoPaused = false
            }).catch((error) => { console.error(error) })
        },
        pauseVideo (videoRef) {
            if (videoRef.paused || videoRef.currentTime === 0) {
                this.videoPaused = false
                videoRef.play()
            } else {
                this.videoPaused = true
                videoRef.pause()
            }
        },
        stopVideo (videoRef) {
            videoRef.pause()
            videoRef.currentTime = 0
            this.videoPlaying = false
        },
        updateTime (ev) {
            this.timeLeft = this.duration - ev.currentTime
            this.currentTime = ev.currentTime
            this.isAbleToSkip = Math.ceil(ev.currentTime) >= 5

            let videoProgress = Math.floor(ev.currentTime / this.duration * 100) + 1
            this.$refs.progress.style.transform = 'translateX(' + videoProgress + '%)'
        },
        toggleVideoControls () {
            this.areVideoControlsVisible = !this.areVideoControlsVisible
        },
    },
    filters: {
        formatDuration: function (value) {
            return moment.utc(value * 1000).format("m:ss")
        },
        formatSeconds: function (value) {
            return value.toFixed()
        },
    },
    watch: {
        dimensions () {
            this.setPreviewHeight()
        },
    },
}
