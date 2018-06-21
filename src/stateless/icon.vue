<template>
    <div class="icon-wrapper" @click="$emit('click')">

        <!-- 'back': left angle icon -->
        <svg v-if="name === 'back'" :style="styleOverride" width="8px" height="16px" viewBox="0 0 8 17" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g transform="translate(-492.000000, -85.000000)">
                <g transform="translate(474.000000, 70.000000)">
                    <g transform="translate(18.000000, 15.000000)">
                        <path class="path" d="M6.55518236,17 L0.228992658,9.15742227 C-0.0763308861,8.77944236 -0.0763308861,8.22055764 0.228992658,7.84257773 L6.55518236,0 L8,1.31585518 L2.20360848,8.50050532 L7.99904884,15.6841448 L6.55518236,17 Z"></path>
                    </g>
                </g>
            </g>
        </svg>

        <!-- 'save': floppy icon  -->
        <svg v-if="name === 'save'" :style="styleOverride" width="16px" height="16px" viewBox="0 0 12 14" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g transform="translate(-1255.000000, -23.000000)">
                <g transform="translate(1240.000000, 0.000000)">
                    <g transform="translate(14.000000, 22.000000)">
                        <rect class="path" opacity="0" x="0" y="0" width="16" height="16"></rect>
                        <path id="Shape" class="path" d="M11.2375,1.2625 C11.0625,1.0875 10.8875,1 10.625,1 L9.75,1 L9.75,3.625 C9.75,4.15 9.4,4.5 8.875,4.5 L4.5,4.5 C3.975,4.5 3.625,4.15 3.625,3.625 L3.625,1 L1.875,1 C1.35,1 1,1.35 1,1.875 L1,14.125 C1,14.65 1.35,15 1.875,15 L14.125,15 C14.65,15 15,14.65 15,14.125 L15,5.375 C15,5.1125 14.9125,4.9375 14.7375,4.7625 L11.2375,1.2625 Z M13,14 L4,14 L4,11 C4,10.4 4.36,10 4.9,10 L12.1,10 C12.64,10 13,10.4 13,11 L13,14 Z" fill="#D6D8DD"></path>
                        <rect class="path" x="7" y="1" width="2" height="3"></rect>
                    </g>
                </g>
            </g>
        </svg>

        <!-- 'arrow-down-strong': arrow down with additional line icon -->
        <svg v-if="name === 'arrow-down-strong'" :style="styleOverride" width="16px" height="16px" viewBox="0 0 12 16" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g class="path">
                <polygon points="7 16 14 8 10 8 10 4 4 4 4 8 0 8"/>
                <rect x="4" width="6" height="2"/>
            </g>
        </svg>

        <!-- 'loading': loader spinning icon -->
        <svg v-if="name === 'loading'" :style="styleOverride" width="16px" height="16px" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <path class="path" d="M15 30C6.7 30 0 23.3 0 15c0-4.7 2.3-9.2 6-12l2.4 3.2C5.6 8.2 4 11.5 4 15c0 6 4.9 11 11 11s11-4.9 11-11c0-5.7-4.4-10.5-10-11l.3-4C24 .7 30 7.2 30 15c0 8.3-6.7 15-15 15z"/>
        </svg>

        <!-- 'funnel': funnel (filter) icon -->
        <svg v-if="name === 'funnel'" :style="styleOverride" width="16px" height="16px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <path class="path" d="M15,0H1C0.4,0,0,0.4,0,1v2c0,0.3,0.1,0.6,0.4,0.8L6,8.5V15c0,0.4,0.2,0.8,0.6,0.9C6.7,16,6.9,16,7,16 c0.3,0,0.5-0.1,0.7-0.3l2-2C9.9,13.5,10,13.3,10,13V8.5l5.6-4.7C15.9,3.6,16,3.3,16,3V1C16,0.4,15.6,0,15,0z"></path>
        </svg>

        <svg v-if="name === 'remove'" :style="styleOverride" width="16px" height="16px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path class="path" d="M2 6v8c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V6H2zM12 3V1c0-.6-.4-1-1-1H5c-.6 0-1 .4-1 1v2H0v2h16V3h-4zm-2 0H6V2h4v1z"/>
        </svg>

        <svg v-if="name === 'plus'" :style="styleOverride" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path class="path" d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm4 9H9v3H7V9H4V7h3V4h2v3h3v2z" fill-rule="nonzero"/>
        </svg>

        <svg v-if="name === 'left-arrow'" :style="styleOverride" width="22" height="17" viewBox="0 0 22 17" xmlns="http://www.w3.org/2000/svg">
            <path class="path" d="M.293 7.707L8 0l1.414 1.414-6 6H21a1 1 0 1 1 0 2H3.414l6 6L8 16.828.293 9.121a.999.999 0 0 1 0-1.414z" fill-rule="nonzero"/>
        </svg>

        <svg v-if="name === 'right-arrow'" :style="styleOverride" width="22" height="17" viewBox="0 0 22 17" xmlns="http://www.w3.org/2000/svg">
            <path class="path" d="M21.707 7.707L14 0l-1.414 1.414 6 6H1a1 1 0 1 0 0 2h17.586l-6 6L14 16.828l7.707-7.707a.999.999 0 0 0 0-1.414z" fill-rule="nonzero"/>
        </svg>

        <svg v-if="name === 'search'" :style="styleOverride" width="16" height="16" viewBox="0 0 16 17" xmlns="http://www.w3.org/2000/svg">
            <path class="path" d="M12.7 11.3c.9-1.2 1.4-2.6 1.4-4.2 0-3.9-3.1-7.1-7-7.1S0 3.2 0 7.1c0 3.9 3.2 7.1 7.1 7.1 1.6 0 3.1-.5 4.2-1.4l3 3c.2.2.5.3.7.3.2 0 .5-.1.7-.3.4-.4.4-1 0-1.4l-3-3.1zm-5.6.8c-2.8 0-5.1-2.2-5.1-5S4.3 2 7.1 2s5.1 2.3 5.1 5.1-2.3 5-5.1 5z" fill-rule="nonzero"/>
        </svg>

        <svg v-if="name === 'clear'" :style="styleOverride" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path class="path" d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm3.5 10.1l-1.4 1.4L8 9.4l-2.1 2.1-1.4-1.4L6.6 8 4.5 5.9l1.4-1.4L8 6.6l2.1-2.1 1.4 1.4L9.4 8l2.1 2.1z" fill-rule="nonzero"/>
        </svg>

        <svg v-if="name === 'close'" :style="styleOverride" width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path class="path" d="M13.4 12L23.7 1.7c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0L12 10.6 1.7.3C1.3-.1.7-.1.3.3c-.4.4-.4 1 0 1.4L10.6 12 .3 22.3c-.4.4-.4 1 0 1.4.2.2.4.3.7.3.3 0 .5-.1.7-.3L12 13.4l10.3 10.3c.2.2.5.3.7.3.2 0 .5-.1.7-.3.4-.4.4-1 0-1.4L13.4 12z" fill-rule="nonzero"/>
        </svg>
    </div>
</template>

<script>
export default {
    props: {
        name: { type: String, required: true },
        styleOverride: { type: Object },
    },
}
</script>

<style lang="less" scoped>
.icon-wrapper {
    font-size: 0px;
    display: inline-block;
}

.path {
    fill: currentColor;
}

.spin {
    animation: SPIN 1s ease-out infinite;
}

@keyframes SPIN {
    0%   { transform: rotate(0); }
    100% { transform: rotate(720deg); }
}
</style>
