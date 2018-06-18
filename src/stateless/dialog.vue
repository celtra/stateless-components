<template>
    <div>
        <div class="new-dialog" :class="['new-dialog--' + theme, 'new-dialog--' + dialogViewState]">
            <div ref="overlay" class="new-dialog__overlay" :class="'new-dialog__overlay--' + dialogViewState"></div>
            <div class="new-dialog__content-wrapper" :class="'new-dialog__content-wrapper--' + dialogViewState">
                <div class="new-dialog__header-wrapper" v-if="steps && steps.length > 0 || title">
                    <dialog-header
                        ref="header"
                        :theme="theme"
                        :dialog-view-state="dialogViewState"
                        :steps="steps && steps.length > 0 ? steps : [{ passiveLabel: title, activeLabel: title }]"
                        :current-step-id="stepId"
                        :is-valid="isValid"
                        :has-back-button="hasBackButton"
                        :has-close-button="hasCloseButton"
                        @previous-step="$emit('previous-step')"
                        @close-dialog="closeDialog">
                    </dialog-header>
                </div>

                <div ref="content" class="new-dialog__content" :class="'new-dialog__content--' + dialogViewState" tabindex="-1">
                    <slot></slot>
                </div>

                <div class="new-dialog__last-focusable-element" tabindex="0" @focus="refocus"></div>
            </div>
        </div>

        <svg xmlns="http://www.w3.org/2000/svg">
            <defs>
                <symbol id="new-dialog-back-icon" viewBox="0 0 30 22">
                    <g stroke="#D6D8DD" stroke-width="2" fill="none" fill-rule="evenodd">
                        <path d="M30 11H2"/>
                        <path stroke-linecap="square" d="M11 20l-9-9 9-9"/>
                    </g>
                </symbol>

                <symbol id="new-dialog-forward-arrow-icon" viewBox="0 0 30 22">
                    <g stroke="#D6D8DD" stroke-width="2" fill="none" fill-rule="evenodd">
                        <path stroke-linecap="square" d="M11 20l-9-9 9-9"/>
                    </g>
                </symbol>

                <symbol id="new-dialog-close-icon" viewBox="0 0 24 24">
                    <path d="M13.4 12L23.7 1.7c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0L12 10.6 1.7.3C1.3-.1.7-.1.3.3c-.4.4-.4 1 0 1.4L10.6 12 .3 22.3c-.4.4-.4 1 0 1.4.2.2.4.3.7.3.3 0 .5-.1.7-.3L12 13.4l10.3 10.3c.2.2.5.3.7.3.2 0 .5-.1.7-.3.4-.4.4-1 0-1.4L13.4 12z" fill-rule="nonzero"/>
                </symbol>

                <symbol id="new-dialog-alpha-icon" viewBox="0 0 300 92">
                    <g fill="none" fill-rule="evenodd">
                        <path fill="#FE664E" d="M0 0h300v92H0z"/>
                        <path d="M73.315 71.077l-3.697-11.642h-17.04L48.88 71.077H38.463l16.838-48h11.932l16.872 48h-10.79zM60.98 32.257l-6.218 19.66h12.67l-6.216-19.66h-.236zm60.987 30.504H100.76V23.078H90.61v48h31.357V62.76zm7.58-39.683h20.234c9.95 0 16.806 6.553 16.806 16.432 0 9.846-7.09 16.432-17.31 16.432H139.7v15.135h-10.15v-48zm10.15 7.95V48.09h7.362c5.813 0 9.208-3.06 9.208-8.547 0-5.456-3.36-8.516-9.176-8.516h-7.394zm76.583 40.05v-48h-10.15V42.57h-21.846V23.077h-10.15v48h10.15V50.852h21.846v20.225h10.15zm41.393 0l-3.697-11.642h-17.04l-3.698 11.642h-10.42l16.84-48h11.93l16.874 48h-10.79zm-12.335-38.82l-6.218 19.66h12.67l-6.217-19.66h-.235z" fill="#FFF"/>
                    </g>
                </symbol>

                <symbol id="new-dialog-beta-icon" viewBox="0 0 300 114">
                    <g fill="none" fill-rule="evenodd">
                        <path fill="#FE664E" d="M0 0h300v114H0z"/>
                        <path d="M80.192 86.006h-27.01v-60h26.552c11.296 0 18.382 5.78 18.382 14.97 0 6.57-4.918 12.057-11.296 13.014v.332c8.17.624 14.173 6.57 14.173 14.512 0 10.56-7.962 17.172-20.8 17.172zM65.77 35.362v15.592h9.42c6.71 0 10.546-2.952 10.546-8.025 0-4.824-3.376-7.568-9.254-7.568H65.77zm0 41.29h11.213c7.253 0 11.17-3.078 11.17-8.816 0-5.614-4.042-8.607-11.462-8.607H65.77v17.42zm84.183-1.04H122.69V60.475h25.72V50.83h-25.72V36.36h27.263V26.006h-39.85v60h39.85V75.61zm38.205 10.394H175.57V36.36h-17.59V26.006h47.81V36.36H188.16v49.646zm57.797 0l-4.585-14.553h-21.134l-4.585 14.553h-12.92l20.883-60h14.797l20.926 60h-13.38zm-15.298-48.524l-7.71 24.574h15.714l-7.71-24.574h-.293z" fill="#FFF"/>
                    </g>
                </symbol>

                <symbol id="new-dialog-edit-thumbnail-icon" viewBox="0 0 23 26">
                    <g fill-rule="nonzero" transform="translate(3 1)" fill="#F5F5F5">
                        <path d="M15.45111 19.99556H.9089C.36356 19.99556 0 19.632 0 19.08666c0-.54533.36356-.90888.90889-.90888H15.4511c.54533 0 .9089.36355.9089.90889 0 .54533-.36356.90889-.9089.90889z"/>
                        <path d="M14.26956 6.63489l1.45422-1.45422c.36355-.36356.36355-.9089 0-1.27245l-3.272-3.272c-.36356-.36355-.9089-.36355-1.27245 0L9.72511 2.09044l4.54445 4.54445z"/>
                        <path d="M8.45267 3.36289L1.18156 10.634c-.18178.18178-.27267.36356-.27267.63622v3.272c0 .54534.36355.9089.90889.9089h3.272c.27266 0 .45444-.0909.63622-.27267l7.27111-7.27112L8.45267 3.3629z"/>
                    </g>
                </symbol>
            </defs>
        </svg>
    </div>
</template>

<script>
import DialogHeader from './dialog_header.vue'

export default {
    components: {
        dialogHeader: DialogHeader,
    },
    props: {
        theme: { type: String, default: 'dark' },
        stepId: { type: String, required: false },
        blurElement: { type: HTMLElement, required: false },
        steps: { type: Array, required: false },
        title: { type: String, required: false },
        isValid: { type: Boolean, default: true },
        hasBackButton: { type: Boolean, default: true },
        hasCloseButton: { type: Boolean, default: true },
        isClosingAllowed: { type: Boolean, default: true },
        closed: { type: Boolean, default: false },
    },
    data () {
        return {
            dialogViewState: 'opening',
        }
    },
    watch: {
        closed (v) {
            if (v && this.dialogViewState === 'open') {
                this.closeDialogWithoutEmit()
            }
        },
    },
    mounted () {
        this.$nextTick(() => {
            window.addEventListener('keyup', this.keyUpEventListener)

            if (this.blurElement) {
                this.blurElement.style['-webkit-transition'] = '-webkit-filter 250ms ease-out'
            }

            let onAnimationEnd = (e) => {
                this.$refs.overlay.removeEventListener('animationend', onAnimationEnd)

                if (this.blurElement) {
                    this.blurElement.style['-webkit-filter'] = 'blur(5px)'
                    this.blurElement.style.filter = 'blur(5px)'
                }

                this.dialogViewState = 'open'
            }
            this.$refs.overlay.addEventListener('animationend', onAnimationEnd)

            this.$refs.content.focus()
        })
    },
    beforeDestroy () {
        window.removeEventListener('keyup', this.keyUpEventListener)
    },
    methods: {
        closeDialog () {
            if (this.isClosingAllowed) {
                this.$emit('close')
                this.closeDialogWithoutEmit()
            }
        },
        closeDialogWithoutEmit () {
            this.dialogViewState = 'closing'

            if (this.blurElement) {
                this.blurElement.style['-webkit-filter'] = ''
                this.blurElement.style.filter = ''
            }

            let onAnimationEnd = (e) => {
                this.$refs.overlay.removeEventListener('animationend', onAnimationEnd)

                if (this.blurElement) {
                    this.blurElement.style['-webkit-transition'] = 'inherit'
                }

                this.$emit('closed')
            }
            this.$refs.overlay.addEventListener('animationend', onAnimationEnd)
        },
        keyUpEventListener (event) {
            switch (event.keyCode) {
            // ESC
            case 27:
                event.preventDefault()
                event.stopPropagation()
                this.closeDialog()
                break
            // Backspace or Left Arrow
            case 8:
            case 37:
                event.preventDefault()
                event.stopPropagation()
                this.$emit('previous-step')
                break
            // Right Arrow
            case 39:
                event.preventDefault()
                event.stopPropagation()
                this.$emit('next-step')
                break
            }
        },
        refocus () {
            if (this.$refs.header) {
                this.$refs.header.focus()
            }
            this.$emit('refocus')
        },
    },
}
</script>

<style scoped lang="less">
@import (reference) '../../shared/components/breakpoints';
@import (reference) '../../shared/components/variables';

.new-dialog {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;

    z-index: @z-index-new-dialog;

    &--closed {
        display: none;
    }

    &__overlay {
        position: absolute;
        left: 0;
        width: 100%;
        height: 100%;
        cursor: pointer;
        background-color: @purple;
        will-change: transform;
        transform: scaleY(0); // Revert to scale3d after switching to webpack (https://celtra.atlassian.net/browse/MAB-10812)
        opacity: 0;

        &--opening, &--open {
            animation-duration: @open-close-animation-time-background;
            animation-timing-function: ease-out;
            animation-fill-mode: forwards;
            animation-name: open-overlay-animation;
        }

        &--close-animation {
            animation-duration: @open-close-animation-time-background;
            animation-timing-function: ease-in;
            animation-delay: @close-animation-time-background-delay;
            animation-fill-mode: backwards;
            animation-name: close-overlay-animation;
        }

        &--closing {
            animation-duration: @closing-animation-time-background;
            animation-timing-function: ease-in;
            animation-delay: @closing-animation-time-background-delay;
            animation-fill-mode: backwards;
            animation-name: close-overlay-animation;
        }

        @keyframes open-overlay-animation {
            to {
                opacity: 1;
                transform: scaleY(1); // Revert to scale3d after switching to webpack (https://celtra.atlassian.net/browse/MAB-10812)
            }
        }

        @keyframes close-overlay-animation {
            from {
                opacity: 1;
                transform: scaleY(1); // Revert to scale3d after switching to webpack (https://celtra.atlassian.net/browse/MAB-10812)
            }
            to {
                transform: scaleY(0); // Revert to scale3d after switching to webpack (https://celtra.atlassian.net/browse/MAB-10812)
                opacity: 0;
            }
        }
    }

    &__content-wrapper {
        position: absolute;
        display: flex;
        flex-direction: column;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 1;
        overflow-y: auto;
        overflow-x: hidden;
        font-family: @regular-text-font;
    }

    &__header-wrapper {
        height: 120px;
        flex: none;

        .breakpoint-height-lte-870({ height: 80px; })
    }

    &__content {
        padding: 30px 60px 0 60px;
        box-sizing: border-box;
        padding-bottom: 120px;
        flex: 1 0 auto;
        justify-content: center;
        display: inline-flex;
        flex-direction: column;

        &:focus {
            outline: none;
        }

        .breakpoint-height-lte-870({ padding-bottom: 80px; });

        &--opening {
            animation: opening-content-animation @opening-animation-time-content ease-in;
            animation-fill-mode: both;
        }

        &--closing {
            animation: closing-content-animation @closing-animation-time-content ease-in;
            animation-fill-mode: both;
        }

        @keyframes opening-content-animation {
            from { opacity: 0; }
            to   { opacity: 1; }
        }

        @keyframes closing-content-animation {
            from { opacity: 1; }
            to   { opacity: 0; }
        }
    }

    &__last-focusable-element {
        user-select: none;
        opacity: 0;
    }
}

.new-dialog--light {
    .new-dialog__overlay {
        background-color: @pale-white;
    }
}
</style>

<style lang="less">
@import (reference) '../../shared/components/variables';

.step-next-leave-active     { animation: step-next-leave-animation @step-animation-time ease-in; }
.step-next-enter-active     { animation: step-next-enter-animation @step-animation-time ease-out; }
.step-previous-leave-active { animation: step-previous-leave-animation @step-animation-time ease-in; }
.step-previous-enter-active { animation: step-previous-enter-animation @step-animation-time ease-out; }

@keyframes step-next-leave-animation {
    0% {
        transform: translate3d(0, 0, 0);
        opacity: 1;
    }
    50% {
        transform: translate3d(-150px, 0, 0);
        opacity: 0.7;
    }
    100% {
        transform: translate3d(-300px, 0, 0);
        opacity: 0;
    }
}

@keyframes step-next-enter-animation {
    0% {
        transform: translate3d(1000px, 0, 0);
        opacity: 0;
    }
    5% {
        transform: translate3d(950px, 0, 0);
        opacity: 0.05;
    }
    10% {
        transform: translate3d(300px, 0, 0);
        opacity: 0.1;
    }
    100% {
        transform: translate3d(0, 0, 0);
        opacity: 1;
    }
}

@keyframes step-previous-leave-animation {
    from {
        transform: translate3d(0, 0, 0);
        opacity: 1;
    }
    to {
        transform: translate3d(300px, 0, 0);
        opacity: 0;
    }
}

@keyframes step-previous-enter-animation {
    from {
        transform: translate3d(-300px, 0, 0);
        opacity: 0;
    }
    to {
        transform: translate3d(0, 0, 0);
        opacity: 1;
    }
}
</style>

<style lang="less">
@import (reference) '../../shared/components/breakpoints';

.new-dialog__step-wrapper {
    width: 100%;
    position: relative;
    flex: auto;
    display: inline-flex;
    flex-direction: column;
}

.new-dialog__button-container {
    position: relative;
    left: 0;
    width: 100%;
    height: 120px;
    flex: none;
    text-align: center;
    margin-bottom: -90px;
    margin-top: 30px;

    .breakpoint-height-lte-870({
        height: 80px;
        margin-bottom: -50px;
    })
}
</style>
