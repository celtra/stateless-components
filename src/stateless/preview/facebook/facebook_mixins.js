import _ from 'underscore'
import constants from '../../../../_compiled/constants'

const IS_FIREFOX = navigator.userAgent.toLowerCase().includes('firefox')

export const FacebookPreviewMixin = {
    computed: {
        callToActionText () {
            let callToAction = constants.callsToAction.find((cta) => cta.id === this.callToAction)

            return callToAction ? callToAction.label : null
        },
    },
    methods: {
        setPreviewHeight () {
            if (this.maxHeight && !Number.isNaN(this.maxHeight) && this.dimensions.width) {
                document.getElementById('vue-preview-svg').setAttribute('viewBox', `0 0 100 ${100 * this.maxHeight / this.dimensions.width}`)
            }
        },
    },
    watch: {
        dimensions () {
            this.setPreviewHeight()
        },
        maxHeight () {
            this.setPreviewHeight()
        },
    },
}

export const FacebookVideoPreviewMixin = {
    data () {
        return {
            videoPlaying: null,
            gifPlaying: null,
        }
    },
    computed: {
        callToActionSectionPresent () {
            return this.format.id === 'FacebookCarouselAdPost' || this.callToActionText != null || this.headline != null || this.linkDescription != null
        },
        formattedPostText () {
            let escapedText = _.escape(this.postText)
            let truncatedText = escapedText.length > 125 ? `${escapedText.substring(0, 125)}...` : escapedText
            let postTextArray = truncatedText.split(' ').map((text) => {
                if (text.startsWith('http')) {
                    return `<span style="cursor: pointer; color: ${this.facebookLinkColor};">${text}</span>`
                } else {
                    return text
                }
            })

            return postTextArray.join(' ')
        },
        formattedDisplayLink () {
            let link = this.displayLink || this.link

            return link ? link.toUpperCase() : null
        },
    },
    methods: {
        positionVideos () {
            let videoPositionRef = this.$refs.videoPosition
            let carouselVideoPosition1Ref = this.$refs.carouselVideoPosition1
            let carouselVideoPosition2Ref = this.$refs.carouselVideoPosition2

            if (videoPositionRef) {
                this.positionVideo(videoPositionRef, this.$refs.video)
            }

            if (carouselVideoPosition1Ref) {
                this.positionVideo(carouselVideoPosition1Ref, this.$refs.carouselVideo1)
            }

            if (carouselVideoPosition2Ref) {
                this.positionVideo(carouselVideoPosition2Ref, this.$refs.carouselVideo2)
            }
        },
        positionVideo (positionRef, videoRef) {
            let boundingRect = positionRef.getBoundingClientRect()
            // Firefox positions foreignObject contents correctly, no need to translate them
            if (!IS_FIREFOX) {
                videoRef.style.transform = `translate(${boundingRect.left}px, ${boundingRect.top + window.scrollY}px)`
            }
        },
        playVideo (videoRef, positionRef, videoId) {
            if (['FacebookVideoAdPost', 'FacebookCarouselAdPost'].includes(this.format.id) && this.isInteractive) {
                this.positionVideo(positionRef, videoRef)

                videoRef.play().then(() => {
                    this.videoPlaying = videoId
                }).catch((error) => {
                    console.error(error)
                })
            }
        },
        pauseVideo (videoRef) {
            if (['FacebookVideoAdPost', 'FacebookCarouselAdPost'].includes(this.format.id) && this.isInteractive) {
                if (videoRef.paused || videoRef.currentTime === 0) {
                    videoRef.play()
                } else {
                    videoRef.pause()
                }
            }
        },
        stopVideo (videoRef) {
            if (['FacebookVideoAdPost', 'FacebookCarouselAdPost'].includes(this.format.id) && this.isInteractive) {
                videoRef.pause()
                videoRef.currentTime = 0
                this.videoPlaying = false
            }
        },
        playGif (gifId) {
            this.gifPlaying = gifId
        },
        stopGif (gifId) {
            this.gifPlaying = false
        },
    },
}

export const FacebookPhotoPreviewMixin = {
    methods: {
        measureThumbnailAspectRatio () {
            if (this.thumbnailUrl) {
                // create image element to measure aspect ratio
                let imageElement = document.createElement('img')
                imageElement.setAttribute('src', this.thumbnailUrl)
                document.body.appendChild(imageElement)

                let vm = this
                imageElement.addEventListener('load', function (e) {
                    // limit aspect ratio to at least 2:3
                    vm.imageAspectRatio = Math.max(0.67, imageElement.width / imageElement.height)
                    imageElement.remove()
                })
            }
        },
    },
}

export const SwipableCarouselMixin = {
    // For swipable carousel, requires dimensions and carouselCardDimensions to be set on parent
    data () {
        return {
            isSwiping: false,
            swipeStartX: null,
            swipeOffset: 0,
            startSwipeOffset: 0,
        }
    },
    created () {
        this.absoluteSwipeStartX = 0
        this.setIntervalId = null
        this.setIntervalDelay = 25
        this.carouselPositions = []
        this.translateRegex = /translate\((-?\d+.?\d*)px, ?(-?\d+.?\d*)px/
        this.videosToMove = []
        this.moveVideosDuringSwipe = true
        this.shouldPreventCardClick = false
    },
    methods: {
        processTouchEvent (ev) {
            return ev.touches ? ev.touches[0] : ev
        },
        isTouchEventInCarousel (ev) {
            ev = this.processTouchEvent(ev)
            let carouselBounds = this.$refs.carouselSwipable.getBoundingClientRect()
            return ev.clientY > carouselBounds.top && ev.clientY < carouselBounds.bottom && ev.clientX > carouselBounds.left && ev.clientX < carouselBounds.right
        },
        logCarouselPosition () {
            this.carouselPositions.push(this.swipeOffset)
        },
        checkFlick () {
            let lastPositions = this.carouselPositions.slice(-8)
            let lastSpeed = 1000 * Math.abs(lastPositions[0] - lastPositions.slice(-1)) / (lastPositions.length * this.setIntervalDelay)
            let isFlick = lastSpeed > 150
            let direction = lastPositions[0] > lastPositions.slice(-1) ? 1 : -1
            return { isFlick, direction }
        },
        attachEventListeners () {
            window.addEventListener('touchstart', this.swipeStart)
            window.addEventListener('touchmove', this.swipe)
            window.addEventListener('touchend', this.swipeEnd)

            window.addEventListener('mousedown', this.swipeStart)
            window.addEventListener('mousemove', this.swipe)
            window.addEventListener('mouseup', this.swipeEnd)
        },
        detachEventListeners () {
            window.removeEventListener('touchstart', this.swipeStart)
            window.removeEventListener('touchmove', this.swipe)
            window.removeEventListener('touchend', this.swipeEnd)

            window.removeEventListener('mousedown', this.swipeStart)
            window.removeEventListener('mousemove', this.swipe)
            window.removeEventListener('mouseup', this.swipeEnd)
        },
        getCarouselPositions () {
            const CARD_WIDTH = this.carouselCardDimensions.width + this.carouselCardPadding
            const FIRST_CARD_PADDING = this.isLandscape ? this.firstCardLandscapePadding : this.firstCardPadding
            const LAST_CARD_PADDING = this.isLandscape ? this.lastCardLandscapePadding : this.lastCardPadding

            let getOffsetForIndex = (index) => -index * CARD_WIDTH - FIRST_CARD_PADDING + this.dimensions.width / 2 - this.carouselCardDimensions.width / 2

            let positions = Array.from(new Array(this.carouselItems.length - 2).keys()).map(idx => getOffsetForIndex(idx + 1))
            positions.unshift(0) // starting position
            positions.push(-CARD_WIDTH * (this.carouselItems.length - 2) - LAST_CARD_PADDING)
            return positions
        },
        getFixedCarouselPosition () {
            let positions = this.getCarouselPositions()
            let { isFlick, direction } = this.checkFlick()

            let minIdx = 0
            for (let i = 0; i < positions.length; i++) {
                if (Math.abs(positions[i] - this.swipeOffset) < Math.abs(positions[minIdx] - this.swipeOffset)) {
                    minIdx = i
                }
            }
            // If it was a flick, move to next or previous card
            if (positions[minIdx] === this.startSwipeOffset && isFlick) {
                let newIdx = minIdx + direction
                return newIdx >= 0 && newIdx < positions.length ? positions[minIdx + direction] : positions[minIdx]
            }
            return positions[minIdx]
        },
        swipeRepositionVideos () {
            this.videosToMove.forEach((videoTranslate, index) => {
                if (videoTranslate) {
                    let translateX = parseFloat(videoTranslate.x) + this.swipeOffset - this.absoluteSwipeStartX
                    let translateY = videoTranslate.y
                    this.$refs.carouselVideo[index].style.transform = `translate(${translateX}px, ${translateY}px)`
                }
            })
        },
        moveCarouselToFixedPosition () {
            this.swipeOffset = this.getFixedCarouselPosition()
            this.swipeRepositionVideos()
            this.startSwipeOffset = this.swipeOffset
        },
        swipeStart (ev) {
            if (IS_FIREFOX) {
                // Calling this in chrome will only make swiping work when mouse is within device simulator
                ev.preventDefault()
            }
            ev = this.processTouchEvent(ev)
            if (this.isTouchEventInCarousel(ev)) {
                if (this.$refs.carouselVideo) {
                    this.videosToMove = this.$refs.carouselVideo.map((v) => {
                        if (v.style.transform) {
                            let match = v.style.transform.match(this.translateRegex)
                            return { x: match[1], y: match[2] }
                        }
                    })
                }
                this.absoluteSwipeStartX = this.swipeOffset
                this.swipeStartX = this.swipeOffset - ev.clientX
                this.isSwiping = true
                this.logCarouselPosition()
                this.setIntervalId = setInterval(this.logCarouselPosition, this.setIntervalDelay)
            }
        },
        swipe (ev) {
            if (this.isSwiping) {
                ev.preventDefault() // disable vertical scroll
                ev = this.processTouchEvent(ev)
                this.swipeOffset = this.swipeStartX + ev.clientX
                this.swipeRepositionVideos()
            }
        },
        swipeEnd (ev) {
            this.shouldPreventCardClick = this.absoluteSwipeStartX !== this.swipeOffset
            if (this.isSwiping) {
                this.isSwiping = false
                this.moveCarouselToFixedPosition()
                this.carouselPositions = []
                clearInterval(this.setIntervalId)
            }
        },
    },
}
