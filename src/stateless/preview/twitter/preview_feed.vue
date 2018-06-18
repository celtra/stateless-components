<template>
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" :viewBox="`0 0 ${hasDesktop ? 370 : 335} 333`">
        <g v-if="hasDesktop" transform="translate(32.058 4.007)">
            <path fill="#353540" fill-rule="nonzero" d="M-3.267 30.602c0-3.894 3.16-7.05 7.047-7.05h327.073c3.892 0 7.047 3.146 7.047 7.05v216.24c0 3.894-3.16 7.05-7.047 7.05H3.78c-3.892 0-7.047-3.146-7.047-7.05V30.602zm15.32 208.002H323.6V38.84H12.054v199.764zm325.15 21.486c0-.8-1.293-1.45-3.054-1.45H-37.62c-1.763 0-3.055.65-3.055 1.45v4.345c0 .49.326.71 1.02.965 8.45 1.63 16.97 2.414 28.52 2.414H307.66c11.546 0 20.065-.784 28.52-2.414.69-.254 1.017-.476 1.017-.965v-4.346z" mask="url(#b)"/>

            <mask id="b" fill="#fff">
                <path d="M295.758 271.74V114.58c0-6.072-5.328-13.637-15.315-13.97l-72.467-.66-.02-6.194-.285-84.173H76.62L0 0h337.934v273.552"/>
            </mask>
            <clipPath :id="`${_uid}-desktop-mask`">
                <rect v-bind="masks.desktop" fill="#fff"></rect>
            </clipPath>
            <g :clip-path="`url(#${_uid}-desktop-mask)`" mask="url(#b)">
                <preview-screen-twitter
                    :transform="getBoxTransform(boxes.desktop)"
                    device="desktop"
                    :is-condensed="true"
                    :content-data="desktopData">
                </preview-screen-twitter>
            </g>
        </g>

        <g v-if="hasPhone" :transform="hasDesktop ? 'translate(239.097 104.188)' : 'translate(239.097 93) scale(1.12)'">
            <path fill="#353540" fill-rule="nonzero" d="M-4.58 4.007h76.125c7.18 0 12.784 5.672 12.784 12.815v171.84c0 7.142-5.61 12.814-12.79 12.814H-4.58c-7.18 0-12.785-5.672-12.785-12.815V16.83c0-7.15 5.605-12.82 12.785-12.82zm-6.974 178.247h90.072V21.482h-90.072v160.772z" mask="url(#a)"/>

            <mask id="a" fill="#fff">
                <path d="M.935 0H88.16v203.032H.934z"/>
            </mask>
            <clipPath :id="`${_uid}-phone-mask`">
                <rect v-bind="masks.phone" fill="#fff"></rect>
            </clipPath>
            <g :clip-path="`url(#${_uid}-phone-mask)`" mask="url(#a)">
                <preview-screen-twitter
                    :transform="getBoxTransform(boxes.phone)"
                    device="phone"
                    :is-condensed="true"
                    :content-data="screenData">
                </preview-screen-twitter>
            </g>
        </g>

        <g v-if="hasTablet" fill-rule="nonzero">
            <path fill="#353540" d="M15.938 301.08h204.29V28.95H15.94v272.13zM226.025 0H10.142C4.517 0 0 4.507 0 10.132v312.66c0 5.625 4.517 10.132 10.142 10.132h215.883c5.625 0 10.142-4.507 10.142-10.133V10.14c0-5.632-4.517-10.14-10.142-10.14z"/>

            <clipPath :id="`${_uid}-tablet-mask`">
                <rect v-bind="masks.tablet" fill="#fff"></rect>
            </clipPath>
            <g :clip-path="`url(#${_uid}-tablet-mask)`">
                <preview-screen-twitter
                    :transform="getBoxTransform(boxes.tablet)"
                    device="tablet"
                    :is-condensed="true"
                    :content-data="screenData">
                </preview-screen-twitter>
            </g>
        </g>
    </svg>
</template>

<script>
import PreviewScreenTwitter from './preview_screen_twitter.vue'

export default {
    components: {
        previewScreenTwitter: PreviewScreenTwitter,
    },
    props: {
        hasPhone: { type: Boolean, default: true },
        hasTablet: { type: Boolean, default: true },
        hasDesktop: { type: Boolean, default: true },
        screenData: { type: Object, required: true },
    },
    computed: {
        desktopData () {
            if (this.screenData.imageUrls.length === 0) {
                return this.screenData
            }
            return {
                ...this.screenData,
                text: null,
            }
        },
    },
    created () {
        this.boxes = {
            phone: { x: -21, y: 21, width: 100, height: 164 },
            tablet: { x: 15, y: 28, width: 204, height: 272 },
            desktop: { x: 0, y: 39, width: 324, height: 200 },
        }

        this.masks = {
            phone: { ...this.boxes.phone, x: 1 },
            tablet: { ...this.boxes.tablet },
            desktop: { ...this.boxes.desktop },
        }
    },
    methods: {
        getBoxTransform (box) {
            return `translate(${box.x}, ${box.y}) scale(${box.width / 100})`
        },
    },
}
</script>

<style lang="less" scoped>
svg {
    width: 100%;
    height: 100%;
}
</style>
