<template>
    <div class="support-text">
        <div :class="{right: isRight, left: !isRight} | prefix('support-text__main--')" class="support-text__main">
            <a v-if="url" :href="url" target="_blank" tabindex="-1" class="support-text__link" @click="click">
                <support-text :theme="theme" :text="text" :is-right="isRight"></support-text>
            </a>
            <template v-else>
                <div v-if="isRight && showText" class="support-text__hidden support-text__hidden--right">
                    <p ref="content"
                       :class="{'support-text__content--multiline': isMultiline,
                                'support-text__content--light': theme==='light'}"
                       class="support-text__content support-text__content--right" v-html="text"></p>
                </div>

                <div :class="{'support-text__icon--open': showText}" class="support-text__icon">
                    <svg ref="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 17">
                        <g fill="none" fill-rule="evenodd">
                            <circle cx="8.5" cy="8.5" r="8.5" fill="#D8D8D8"/>
                            <path fill="#1F1F2C"
                                  d="M6 6.505h1.746c.016-.52.37-.864.886-.864.505 0 .86.3.86.737 0 .473-.19.7-.92 1.128-.746.43-1.014.913-.912 1.832l.016.215h1.676V9.3c0-.505.204-.746.94-1.17.79-.457 1.16-1.005 1.16-1.8 0-1.29-1.064-2.148-2.697-2.148-1.718 0-2.74.918-2.755 2.325zm2.562 5.683c.693 0 1.096-.36 1.096-.978 0-.623-.403-.982-1.096-.982-.693 0-1.1.36-1.1.982 0 .618.407.978 1.1.978z"/>
                        </g>
                    </svg>
                </div>

                <div v-if="!isRight && showText" class="support-text__hidden support-text__hidden--left">
                    <p ref="content" :class="{'support-text__content--multiline': isMultiline,
                                              'support-text__content--light': theme==='light'}"
                       class="support-text__content support-text__content--left"
                       v-html="text"></p>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
export default {
    name: 'support-text',
    components: {
        supportText: this,
    },
    props: {
        text: { type: String, required: true },
        url: { type: String, required: false },
        isRight: { type: Boolean, default: false },
        theme: { type: String, default: 'dark' },
        trackName: { type: String, required: false },
    },
    data () {
        return {
            isMultiline: false,
            showText: false, // Don't have "hidden" element in DOM all the time, absolute positoning prevents clicking under element
        }
    },
    created () {
        this.timeoutId = null
    },
    mounted () {
        if (!this.url) {
            this.$refs.icon.addEventListener('mouseenter', this.open)
        }
    },
    methods: {
        /*
        Using setTimeout is simpler than handling all sorts of transitionend events,
        also vertical animations don't have to start exactly when horizontal one is over
            */
        open (ev) {
            this.showText = true
            this.$nextTick(() => {
                const expandedHeight = this.$refs.content.scrollHeight

                this.isMultiline = expandedHeight > this.$refs.content.clientHeight + 1

                this.$refs.content.addEventListener('mouseleave', this.close)
                this.$refs.content.style.transform = 'translateX(0px)'

                if (this.isMultiline) {
                    this.timeoutId = setTimeout(() => {
                        this.$refs.content.style.height = `${expandedHeight - 2}px` // 2px of padding
                    }, 100)
                }
            })
        },
        close (ev) {
            clearTimeout(this.timeoutId)
            this.$refs.content.style.height = `${this.isMultiline ? 8 : 12}px`
            setTimeout(() =>
                this.$refs.content.style.transform = `translateX(${this.isRight ? 225 : -225}px)`, this.isMultiline ? 80: 150
            )
            setTimeout(() => this.showText = false, 300)
        },
        click () {
            this.$root.$emit('tracking-event', { type: 'link', label: this.trackName || 'supportText', trigger: 'click' })
        },
    },
}
</script>

<style lang="less" scoped>
@import (reference) './common';
@import './typography';

.support-text {
    font-family: @regular-text-font;
    position: relative;

    &__main {
        font-size: 0;
        position: relative;
        cursor: default;

        &--right {
            position: absolute;
            right: 0;
            top: 0;
        }
    }

    &__link {
        outline: none;
    }

    &__hidden {
        overflow: hidden;
        display: inline-block;
        vertical-align: middle;
        position: absolute;
        border-radius: 7px;
        padding: 0 0 4px 2px; // For shadow
        z-index: @z-middle;

        &--left {
            left: -2px;
        }

        &--right {
            right: 0;
        }
    }

    &__content {
        margin: 0;
        height: 12px;
        color: white;
        background-color: @gunpowder;
        font-size: 11px;
        padding: 1px 0;
        border-radius: 7px;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
        line-height: 14px;
        white-space: pre;
        transition: transform @default-transition-time ease-out;

        &--light {
            background-color: #f7f7f7;
            color: #7a7982;
        }

        &--multiline {
            padding: 3px 0;
            transition: transform 100ms ease-out, height 80ms ease-out;
        }

        &--left {
            padding-left: 20px;
            padding-right: 10px;
            transform: translateX(-105%);
        }

        &--right {
            padding-left: 10px;
            padding-right: 20px;
            transform: translateX(105%);
        }
    }

    &__icon {
        width: 14px;
        height: 14px;
        display: inline-block;
        vertical-align: middle;
        position: relative;
        z-index: @z-high;

        &--open {
            pointer-events: none;
        }
    }
}
</style>

<style lang="less">
.support-text__content {
    b {
        font-weight: bold;
    }
}
</style>
