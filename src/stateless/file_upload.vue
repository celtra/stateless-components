<template>
    <div :class="'file-upload--' + theme" class="file-upload" tabindex="0" @keyup.esc.stop="blur" @keyup.enter.stop="openUploadDialog">
        <div :class="fileInputSquareModifiers | prefix('file-upload__square-prepend--')" class="file-upload__square-prepend" @click="openUploadDialog">
            <div
                v-if="states.uploaded && file.thumbnailUrl"
                class="file-upload__square-prepend__thumbnail-wrap"
                @mouseover="$emit('thumbnail-mouseover', $event)"
                @mouseleave="$emit('thumbnail-mouseleave', $event)">

                <div :style="{ backgroundImage: `url(${file.thumbnailUrl})`, opacity: file.thumbnailOpacity || 1 }" class="file-upload__square-prepend__thumbnail"></div>
                <div class="file-upload__square-prepend__buttons">
                    <slot name="buttons"></slot>
                </div>
            </div>

            <svg v-if="states.normal || states.error" width="25" height="30" viewBox="0 0 25 30"
                 xmlns="http://www.w3.org/2000/svg" >
                <path d="M7.06 22.94h10.587V12.354h7.06L12.352 0 0 12.353h7.06V22.94zM0 26.47h24.706V30H0v-3.53z"
                      fill-rule="nonzero"/>
            </svg>
            <svg v-if="states.droppingFile" class="file-upload__dropping-file-svg" width="27" height="30" viewBox="0 0 27 30"
                 xmlns="http://www.w3.org/2000/svg">
                <path d="M18.75 0l7.5 7.5h-7.5V0zM15 11.25h11.25v16.875c0 1.125-.75 1.875-1.875 1.875h-22.5C.75 30 0 29.25 0 28.125V1.875C0 .75.75 0 1.875 0H15v11.25z"
                      fill-rule="nonzero" fill="d8d8d8"/>
            </svg>

            <div v-if="states.uploading" class="file-upload__square-prepend__progress-percent">{{ progress }}%</div>
            <svg v-if="states.uploading" height="80" width="80">
                <circle cx="40" cy="40" r="38" class="file-upload__square-prepend__background-circle"></circle>
                <circle :style="{strokeDashoffset: progressDashoffset}" cx="40" cy="40" r="38"
                        transform="rotate(-90 40 40)"
                        class="file-upload__square-prepend__progress-circle"></circle>
            </svg>

        </div>
        <div class="file-upload__form-wrapper">
            <input ref="fileInput" :accept="accepts ? accepts.join(',') : null" :name="inputName" type="file" style="display: none;"/>
            <svg v-if="!states.uploaded" :viewBox="`0 0 ${width - 90} 90`" :class="{ 'file-upload__form-wrapper__border-svg--error':states.error }"
                 preserveAspectRatio="none"
                 vector-effect="non-scaling-stroke"
                 class="file-upload__form-wrapper__border-svg">
                <path :d="`M0,0 ${width - 90},0 ${width - 90},90`" />
                <path :d="`M0,90 ${width - 90},90`"/>
            </svg>

            <div v-if="states.uploaded" class="file-upload__form-wrapper__uploaded-text">
                <div class="file-upload__with-icon__text">{{ file.name | middleEllipsis(maxFilenameLength) }}</div>
                <div v-if="!disabled" class="file-upload__with-icon__icon" @click="userRemoveFile">
                    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <g fill-rule="nonzero">
                            <path d="M2 6v8c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V6H2zM12 3V1c0-.6-.4-1-1-1H5c-.6 0-1 .4-1 1v2H0v2h16V3h-4zm-2 0H6V2h4v1z"/>
                        </g>
                    </svg>
                </div>
            </div>

            <div v-if="states.error" class="file-upload__form-wrapper__error">
                <div class="file-upload__text">
                    {{ errorMessage }}
                    <span class="file-upload__trigger" @click="cleanupAndOpenUploadDialog">Re-upload.</span>
                </div>
            </div>
            <div v-else-if="states.uploading" class="file-upload__form-wrapper__text file-upload__form-wrapper__text--white">
                Uploading file. <br>
                Please wait.
            </div>

            <div v-if="states.normal && !states.error" class="file-upload__form-wrapper__text">
                Drag a file here or <span class="file-upload__trigger" @click="openUploadDialog">browse</span>
                for it to upload.
            </div>

            <div v-if="states.droppingFile"
                 class="file-upload__form-wrapper__text
                        file-upload__form-wrapper__text--white
                        file-upload__form-wrapper__text--dropping">
                Drop the file here to upload
            </div>
        </div>
    </div>
</template>

<script>
function loadVideo (file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => {
            const blob = new Blob([reader.result], { type: file.type })
            const url = URL.createObjectURL(blob)
            const video = document.createElement('video')
            video.preload = 'auto'

            const errorCallback = (e) => {
                reject()
                cleanVideo()
            }

            const loadedCallback = () => {
                const mozAudio = video.mozHasAudio
                const safariAudio = video.audioTracks && video.audioTracks.length !== 0
                const chromeAudio = video.webkitAudioDecodedByteCount > 0

                resolve({
                    width: video.videoWidth,
                    height: video.videoHeight,
                    duration: video.duration,
                    hasAudio: mozAudio || safariAudio || chromeAudio,
                })

                cleanVideo()
            }

            const cleanVideo = () => {
                video.removeEventListener('error', errorCallback)
                video.removeEventListener('loadeddata', loadedCallback)
                video.src = ''
                URL.revokeObjectURL(url)
            }

            video.addEventListener('error', errorCallback)
            video.addEventListener('loadeddata', loadedCallback)
            video.src = url
        }

        reader.readAsArrayBuffer(file)
    })
}

function loadImage (file) {
    return new Promise ((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => {
            const image = new Image()
            image.onerror = () => {
                reject()
                image.src = ''
            }
            image.onload = () => {
                resolve({
                    width: image.width,
                    height: image.height,
                })
            }
            image.src = reader.result
        }

        reader.readAsDataURL(file)
    })
}

export default {
    model: {
        prop: 'file',
        event: 'update',
    },
    props: {
        file: { type: Object, required: true },
        uploadUrl: { type: String, required: true },
        disabled: { type: Boolean, default: false },
        accepts: { type: Array, required: false },
        error: { type: String, required: false },
        dropActive: { type: Boolean, default: false },
        theme: { type: String, required: false, default: 'dark' },
        width: { type: Number, default: 280 },
        inputName: { type: String, required: false, default: 'video-file' },
    },
    data () {
        return {
            progress: 0,
            internalError: null,
            uploadFinished: true,
        }
    },
    computed: {
        errorMessage () {
            return this.error || this.internalError
        },
        states () {
            if (this.dropActive) {
                return {
                    droppingFile: true,
                }
            } else {
                let state = 'normal'
                if (this.errorMessage) {
                    state = 'error'
                } else if (this.file.thumbnailUrl && this.uploadFinished) {
                    state = 'uploaded'
                } else if (this.file.name) {
                    state = 'uploading'
                }

                return {
                    normal: state === 'normal',
                    uploading: state === 'uploading',
                    uploaded: state === 'uploaded',
                    error: state === 'error',
                }
            }
        },
        progressDashoffset () {
            return 240 - (240 * this.progress / 100)
        },
        fileInputSquareModifiers () {
            return {
                'empty': !this.states.uploaded,
                'error': this.states.error,
                'clickable': this.states.normal || this.states.error,
            }
        },
        maxFilenameLength () {
            const squareWidth = 90, padding = 15, iconWidth = 30
            const textWidth = this.width - squareWidth - 2 * padding - iconWidth
            const averageCharacterWidth = 7
            return Math.floor(textWidth / averageCharacterWidth)
        },
    },
    watch: {
        file (newFile, oldFile) {
            if (newFile.thumbnailUrl && oldFile.thumbnailUrl !== newFile.thumbnailUrl) {
                this.finishUpload()
            }
        },
    },
    created () {
        this.currentData = {}
    },
    mounted () {
        this.$refs.fileInput.addEventListener('change', () => {
            this.selectFile(this.$refs.fileInput.files[0])
        })
    },
    methods: {
        selectFile (file) {
            this.removeFile()

            this.$emit('focus')
            this.$emit('file-selected', file)

            this.currentData = { name: file.name, type: file.type, size: file.size }
            this.$emit('update', this.currentData)

            let metadataPromise = new Promise((resolve) => resolve())

            if (file.type.indexOf('image') === 0) {
                metadataPromise = loadImage(file)
            } else if (file.type.indexOf('video') === 0) {
                metadataPromise = loadVideo(file)
            }

            metadataPromise.then((image) => {
                this.currentData = Object.assign(this.currentData, image)
                this.$emit('update', this.currentData)
                this.$nextTick(() => {
                    if (!this.error) {
                        this.uploadFile(file)
                    }
                })
            }).catch(() => {
                this.currentData = Object.assign(this.currentData, { unreadable: true })
                this.$emit('update', this.currentData)
            })

        },
        openUploadDialog () {
            if (!this.disabled && (this.states.normal || this.states.error)) {
                this.setError(null)
                this.$root.$emit('tracking-event', { type: 'action', label: 'openUploadDialog', trigger: 'click' })
                this.$emit('focus')
                this.$refs.fileInput.click()
            }
        },
        uploadFile (file) {
            const self = this

            this.activeXhr = new XMLHttpRequest()
            this.activeXhr.open('POST', this.uploadUrl, true)

            this.activeXhr.upload.onprogress = (e) => {
                if (e.lengthComputable) {
                    self.progress = Math.round(100.0 * e.loaded / e.total)
                }
            }
            this.activeXhr.onload = function () {
                if (this.status == 201) {
                    if (self.file && !self.error) {
                        const resp = JSON.parse(this.response)
                        self.$emit('upload', {
                            file: file,
                            hash: resp.hash,
                        })

                        self.currentData = Object.assign(self.currentData, { hash: resp.hash })
                        self.$emit('update', self.currentData)
                    }
                } else {
                    self.setError('There was an error uploading this file to the server.')
                }
            }
            this.activeXhr.send(file)
        },
        finishUpload (file, hash) {
            this.uploadFinished = true
            this.progress = 0
            this.$emit('upload-finished')
        },
        setError (error) {
            this.internalError = error
            this.progress = 0

            this.currentData = {}
            this.$emit('update', this.currentData)
        },
        blur () {
            this.$el.blur()
        },
        userRemoveFile () {
            this.$root.$emit('tracking-event', { type: 'button', label: 'removeFile', trigger: 'click' })
            this.$emit('user-remove-file')
            this.removeFile()
        },
        removeFile () {
            this.internalError = null
            this.uploadFinished = false
            this.progress = 0
            if (this.activeXhr) {
                this.activeXhr.abort()
                this.activeXhr = null
            }
            this.$refs.fileInput.value = ''

            this.$emit('remove-file')
            this.currentData = {}
            this.$emit('update', this.currentData)
        },
        cleanupAndOpenUploadDialog () {
            this.$root.$emit('tracking-event', { type: 'button', label: 'cleanupAndOpenUploadDialog', trigger: 'click' })
            this.removeFile()
            this.openUploadDialog()
        },
    },
}
</script>

<style lang="less" scoped>
@import (reference) './common';
@import './typography';

.file-upload {
    width: 100%;
    height: 90px;
    display: flex;

    &:focus {
        outline: none;
        .file-upload__trigger {
            color: white;
        }
        .file-upload__square-prepend svg {
            fill: white;
        }
    }

    &__dropping-file-svg {
        position: absolute;
        left: 0;
        right: 0;
        margin: 0 auto;
        fill: white;
        z-index: @z-sky; // This must be higher than drag-drop-overlay z-index in drop_area.vue
        pointer-events: none;
    }
}

.file-upload__square-prepend {
    flex: none;
    width: 90px;
    margin: 0 auto;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;

    &--empty { background-color: @gunpowder; }

    &--clickable { cursor: pointer; }

    &--error { background-color: @pink-red; }

    &__thumbnail-wrap {
        width: 100%;
        height: 100%;
    }

    &__thumbnail {
        width: 100%;
        height: 100%;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: 50% 50%;
        transition: opacity @default-transition-time;
    }

    &__buttons {
        position: absolute;
        right: 0;
        bottom: 0;
    }

    svg { fill: @extremely-light-gray; }

    &:hover {
        svg {
            fill: white;
        }
    }

    &__progress-circle {
        fill: none;
        stroke: @progress-blue;
        stroke-dasharray: 240;
        stroke-dashoffset: 240;
        stroke-width: 2;
        transition: stroke-dashoffset 0.2s ease-out;
    }

    &__background-circle {
        fill: none;
        stroke: black;
    }

    &__progress-percent {
        position: absolute;
        color: @progress-blue;
    }
}

.file-upload__text {
    overflow: hidden;
    flex: auto;
}

.file-upload__with-icon {
    &__text {
        max-width: ~"calc(100% - 32px)";
        overflow: hidden;
        flex: auto;
        margin-right: 15px;
    }

    &__icon {
        cursor: pointer;
        width: 16px;
        height: 16px;
        fill: #d8d8d8;
    }
}

.file-upload__form-wrapper {
    box-sizing: border-box;
    width: ~"calc(100% - 90px)";
    font-family: @medium-text-font;
    position: relative;
    color: @dolphin;
    font-size: 14px;
    flex: initial;
    display: inline-flex;
    line-height: 16px;
    align-items: center;
    padding: 0 15px;

    &__error {
        display: flex;
        align-items: center;
        width: 100%;
        color: @pink-red;
    }

    &__text {
        &--white { color: @very-light-gray; }
        &--dropping {
            color: white;
            position: absolute;
            pointer-events: none;
            z-index: @z-sky; // This must be higher than drag-drop-overlay z-index in drop_area.vue
        }
    }

    &__uploaded-text {
        white-space: nowrap;
        display: flex;
        width: 100%;
        font-family: @regular-text-font;
        font-size: 11px;
        letter-spacing: 0.5px;
        color: white;
    }

    &__border-container {
        position: absolute;
        pointer-events: none;
        top: 0px;
        left: 0px;
        height: 100%;
        width: 100%;
    }

    &__border-svg {
        position: absolute;
        pointer-events: none;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        fill: none;
        stroke: @gunpowder;
        stroke-dashoffset: 8;
        stroke-width: 5;
        stroke-dasharray: 8, 12;

        &--error { stroke: @pink-red; }
    }

    span.file-upload__trigger {
        color: @very-light-gray;
        cursor: pointer;
    }
}

.file-upload--light {

    .file-upload__square-prepend {
        background-color: @very-light-gray;

        svg:not(.file-upload__dropping-file-svg) { fill: @gunpowder; }

        &--empty { background-color: @very-light-gray; }

        &--error {
            background-color: @pink-red;
            svg:not(.file-upload__dropping-file-svg) { fill: @white; }
        }

        &__progress-circle {
            stroke: #00CBD6;
        }

        &__background-circle {
            fill: none;
            stroke: white;
        }

        &__progress-percent {
            position: absolute;
            color: #00CBD6;
        }
    }

    .file-upload__form-wrapper__border-svg {
        stroke: @very-light-gray;
        &--error { stroke: @pink-red; }
    }

    .file-upload__form-wrapper__error .file-upload__with-icon__text {
        color: @pink-red;
    }

    .file-upload__form-wrapper__text {
        color: @dolphin;

        &--dropping {
            color: white;
        }

        .file-upload__trigger {
            color: @gunpowder;
        }
    }

    .file-upload__form-wrapper__error .file-upload__trigger {
        color: @dolphin;
    }

    &:focus {
        .file-upload__trigger {
            color: @black;
        }

        .file-upload__square-prepend:not(.file-upload__square-prepend--error) svg {
            fill: @black;
        }
    }

    .file-upload__with-icon__text {
        color: @dolphin;
    }

    .file-upload__with-icon__icon svg {
        fill: @gunpowder;
    }
}
</style>
