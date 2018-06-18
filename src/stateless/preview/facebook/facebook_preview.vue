<template>
    <component ref="previewComponent"
               :is="previewComponent"
               :is-interactive="isInteractive"
               :format="format"
               :post-text="postText"
               :link="link"
               :display-link="displayLink"
               :call-to-action="callToAction"
               :headline="headline"
               :link-description="linkDescription"
               :thumbnail-url="thumbnailUrl"
               :video-url="videoUrl"
               :animated-image-url="animatedImageUrl"
               :is-video-transcoding="isVideoTranscoding"
               :carousel-items="carouselItems"
               :carousel-index="carouselIndex"
    ></component>
</template>

<script>
import Mobile from './facebook_mobile.vue'
import Tablet from './facebook_tablet.vue'
import Desktop from './facebook_desktop.vue'
import Instagram from './instagram_mobile.vue'

export default {
    components: {
        phone: Mobile,
        tablet: Tablet,
        desktop: Desktop,
        instagram: Instagram,
    },
    props: {
        device: { type: String, required: true },
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
        carouselIndex: { type: Number, required: false },
    },
    data () {
        return {
            placementType: 'facebook',
        }
    },
    computed: {
        previewComponent () {
            return this.placementType === 'instagram' ? 'instagram': this.device
        },
    },
    watch: {
        device () {
            this.$nextTick(this.setParamsByScreenSize)
        },
        placementType () {
            this.$nextTick(this.setParamsByScreenSize)
        },
    },
    mounted () {
        window.parent.postMessage({
            type: 'facebookPreviewOnReady',
        }, '*')
        // On mobile devices, placementType is passed as URL param
        let param = window.location.search.split('placementType=')[1]
        if (param) {
            this.placementType = param
        }
        this.$nextTick(() => {
            this.setParamsByScreenSize()

            window.addEventListener('resize', () => {
                this.setParamsByScreenSize()

                this.$nextTick(() => {
                    this.$refs.previewComponent.positionVideos()
                })
            })
        })
    },
    methods: {
        setScreenParams (params) {
            // Ensure $refs.previewComponent is available
            this.$nextTick(() => {
                this.setOrientation(params.isLandscape)
                this.setDimensions(params.dimensions)
                this.$nextTick(() => {
                    this.$refs.previewComponent.positionVideos()
                    if (this.format.id === 'FacebookCarouselAdPost' && this.previewComponent !== 'desktop'){
                        this.$refs.previewComponent.moveCarouselToFixedPosition()
                    }
                })
            })
        },
        setParamsByScreenSize () {
            // When loading withot phone/tablet simulator dimensions aren't set from outside
            let width = window.innerWidth
            let height = window.innerHeight

            this.setScreenParams({
                isLandscape: width > height,
                dimensions: {
                    width: width,
                    height: height,
                },
            })
        },
        setDimensions (dimensions) {
            this.$refs.previewComponent.dimensions = dimensions
        },
        setOrientation (isLandscape) {
            this.$refs.previewComponent.isLandscape = isLandscape
        },
        handleMessage (message) {
            if (message.data.name === 'updatePlacementType'){
                this.placementType = message.data.placementType
                this.$nextTick(this.triggerAutoplay)
            }
        },
        triggerAutoplay () {
            if (typeof this.$refs.previewComponent.triggerAutoplay === 'function'){
                this.$refs.previewComponent.triggerAutoplay()
            }
        },
    },
}
</script>

<style lang="less">
    .carousel--animate-transform,
    .video--animate-transform {
        transition: all 250ms ease-out;
    }
</style>
