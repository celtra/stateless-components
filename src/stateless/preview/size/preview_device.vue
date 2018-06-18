<template>
    <div>
        <template v-if="device === 'Phone'">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 195">
                <path fill="#353540" d="M 12.63 0 L 87.764 0 C 94.848 0 100.394 5.586 100.394 12.63 L 100.394 181.722 C 100.394 188.766 94.848 194.352 87.764 194.352 L 12.63 194.352 C 5.546 194.312 0 188.725 0 181.681 L 0 12.63 C 0 5.586 5.546 0 12.63 0 Z M 5.748 175.407 L 94.686 175.407 L 94.686 17.205 L 5.748 17.205 L 5.748 175.407 Z"/>
                <preview-screen
                    :x="boxes.phone.x"
                    :y="boxes.phone.y"
                    :maxWidth="boxes.phone.w"
                    :maxHeight="boxes.phone.h"
                    :scale="boxes.phone.w / 320"
                    :width="byDevices.phone.width || 0"
                    :height="byDevices.phone.height || 0"
                    v-bind="byDevices.phone">
                </preview-screen>
            </svg>
        </template>
        <template v-else-if="device === 'Tablet'">
            <svg viewBox="0 0 100 145" xmlns="http://www.w3.org/2000/svg">
                <path fill="#353540" d="M 95.596 0 C 97.976 0 99.886 1.91 99.886 4.289 L 99.886 136.725 C 99.886 139.105 97.976 141.014 95.596 141.014 L 4.289 141.014 C 1.91 141.014 0 139.105 0 136.725 L 0 4.289 C 0 1.91 1.91 0 4.289 0 L 95.596 0 Z M 6.875 127.295 L 92.952 127.295 L 92.952 12.133 L 6.875 12.133 L 6.875 127.295 Z"/>

                <preview-screen
                    :x="boxes.tablet.x"
                    :y="boxes.tablet.y"
                    :maxWidth="boxes.tablet.w"
                    :maxHeight="boxes.tablet.h"
                    :scale="boxes.tablet.w / 600"
                    :width="byDevices.tablet.width || 0"
                    :height="byDevices.tablet.height || 0"
                    v-bind="byDevices.tablet">
                </preview-screen>
            </svg>
        </template>
        <template v-else-if="device === 'Desktop'">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 65">
                <path fill="#353540" d="M 5.676 2.822 C 5.676 1.816 6.493 1 7.5 1 L 92.162 1 C 93.169 1 93.986 1.813 93.986 2.822 L 93.986 58.725 C 93.986 59.731 93.169 60.548 92.162 60.548 L 7.5 60.548 C 6.492 60.548 5.676 59.734 5.676 58.725 L 5.676 2.822 Z M 9.641 56.595 L 90.284 56.595 L 90.284 4.953 L 9.641 4.953 L 9.641 56.595 Z M 98.746 62.767 C 98.746 62.56 98.409 62.393 97.952 62.393 L 1.446 62.393 C 0.988 62.393 0.652 62.56 0.652 62.767 L 0.652 63.89 C 0.652 64.017 0.737 64.073 0.916 64.139 C 3.111 64.561 5.323 64.764 8.32 64.764 L 91.078 64.764 C 94.075 64.764 96.286 64.561 98.48 64.139 C 98.66 64.073 98.746 64.017 98.746 63.89 C 98.746 63.945 98.746 62.767 98.746 62.767 Z"/>

                <preview-screen
                    :x="boxes.desktop.x"
                    :y="boxes.desktop.y"
                    :maxWidth="boxes.desktop.w"
                    :maxHeight="boxes.desktop.h"
                    :scale="boxes.desktop.w / 1100"
                    :width="byDevices.desktop.width || 0"
                    :height="byDevices.desktop.height || 0"
                    v-bind="byDevices.desktop">
                </preview-screen>
            </svg>
        </template>
        <template v-else>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" xmlns:xlink="http://www.w3.org/1999/xlink">
                <!-- DESKTOP -->
                <mask id="b" fill="#fff">
                    <path d="M100.338 75.327V33.692c.11-1.653-1.195-2.953-2.918-2.912h-19.1c-.852 0-1.977.38-2.388 1.06V18.413c0-2.367-1.012-3.442-3.714-3.442H33.222c-2.467 0-3.998 1.03-3.998 3.178v57.707H-4.184V-4.087h109.828v79.944"/>
                </mask>

                <g mask="url(#b)">
                    <path fill="#353540" d="M6.214 4.647c0-1.01.82-1.828 1.83-1.828H92.96c1.01 0 1.83.814 1.83 1.826v56.07c0 1.01-.82 1.828-1.83 1.828H8.044c-1.01 0-1.83-.816-1.83-1.828V4.646zm3.978 53.934h80.885V7.118l-4.902-.333H10.192V58.58zm89.37 6.19c0-.205-.336-.374-.795-.374H1.97c-.458 0-.795.17-.795.376V65.9c0 .126.085.184.266.25 2.2.423 4.42.626 7.427.626h83.006c3.007 0 5.225-.204 7.426-.626.18-.066.264-.124.264-.25v-1.13z" mask="url(#a)"/>

                    <preview-screen
                        :x="boxes.universal.desktop.x"
                        :y="boxes.universal.desktop.y"
                        :maxWidth="boxes.universal.desktop.w"
                        :maxHeight="boxes.universal.desktop.h"
                        :scale="boxes.universal.desktop.w / 1100"
                        :width="byDevices.desktop.width || 0"
                        :height="byDevices.desktop.height || 0"
                        v-bind="byDevices.desktop">
                    </preview-screen>
                </g>

                <!-- TABLET -->
                <path fill="#353540" d="M72.38 16.724c1.03 0 1.855.827 1.855 1.856v57.302c0 1.03-.826 1.856-1.856 1.856H32.86c-1.03 0-1.856-.826-1.856-1.856V18.58c0-1.03.826-1.856 1.856-1.856H72.38zm-38.4 55.078h37.255V21.974H33.98v49.828z"/>

                <preview-screen
                    :x="boxes.universal.tablet.x"
                    :y="boxes.universal.tablet.y"
                    :maxWidth="boxes.universal.tablet.w"
                    :maxHeight="boxes.universal.tablet.h"
                    :scale="boxes.universal.tablet.w / 600"
                    :width="byDevices.tablet.width || 0"
                    :height="byDevices.tablet.height || 0"
                    v-bind="byDevices.tablet">
                </preview-screen>

                <!-- PHONE -->
                <path fill="#353540" d="M78.777 32.522h17.47c1.648 0 2.934 1.303 2.934 2.944v39.478c0 1.64-1.285 2.944-2.933 2.944h-17.47c-1.647 0-2.933-1.303-2.933-2.944V35.466c0-1.64 1.286-2.944 2.933-2.944zm-1.6 40.95h20.67V36.536h-20.67v36.936z"/>

                <preview-screen
                    :x="boxes.universal.phone.x"
                    :y="boxes.universal.phone.y"
                    :maxWidth="boxes.universal.phone.w"
                    :maxHeight="boxes.universal.phone.h"
                    :scale="boxes.universal.phone.w / 320"
                    :width="byDevices.phone.width || 0"
                    :height="byDevices.phone.height || 0"
                    v-bind="byDevices.phone">
                </preview-screen>
            </svg>
        </template>
    </div>
</template>

<script>
import PreviewScreen from './preview_screen.vue'

export default {
    components: {
        PreviewScreen: PreviewScreen,
    },
    props: {
        device: { type: String, required: true },
        byDevices: { type: Object, required: true },
    },
    created () {
        this.boxes = {
            phone: { x: 6, y: 16, w: 88, h: 160 },
            tablet: { x: 7, y: 12, w: 86, h: 115 },
            desktop: { x: 9, y: 5, w: 81, h: 51 },
            universal: {
                phone: { x: 77.5, y: 36, w: 20, h: 37.5 },
                tablet: { x: 34, y: 22, w: 37, h: 50 },
                desktop: { x: 10, y: 7, w: 81, h: 53 },
            },
        }
    },
}
</script>

<style lang="less" scoped>
svg {
    width: 100%;
    height: 100%;
}
</style>
