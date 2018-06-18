<template>
    <component ref="previewComponent"
               :is="previewComponent"
               :format="format"
               :thumbnail-url="thumbnailUrl"
               :video-url="videoUrl"
               :duration="duration"
               :is-video-transcoding="isVideoTranscoding"
               :video-dimensions="videoDimensions"
    ></component>
</template>

<script>
import Mobile from './mobile.vue'
import Tablet from './tablet.vue'
import Desktop from './desktop.vue'

export default {
    components: {
        phone: Mobile,
        tablet: Tablet,
        desktop: Desktop,
    },
    props: {
        device: { type: String, required: true },
        format: { type: Object, required: true },
        thumbnailUrl: { type: String, required: false },
        videoUrl: { type: String, required: false },
        duration: { type: Number, required: true },
        isVideoTranscoding: { type: Boolean, required: false },
        videoDimensions: { type: Object, required: true },
    },
    computed: {
        previewComponent () { return this.device },
    },
    watch: {
        device () {
            this.$nextTick(this.setParamsByScreenSize)
        },
    },
    mounted () {
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
    },
}
</script>
