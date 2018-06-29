<template>
    <div class="icon-wrapper" @click="$emit('click')">
        <div v-if="name === 'caret'" :style="styleOverride">
            <div class="icon-caret"></div>
        </div>

        <svg v-if="name === 'pencil-edit'" :style="styleOverride" width="23px" height="26px" viewBox="0 0 23 26"
             xmlns="http://www.w3.org/2000/svg">
            <g fill-rule="nonzero" transform="translate(3 1)">
                <path class="path"
                      d="M14.26956 6.63489l1.45422-1.45422c.36355-.36356.36355-.9089 0-1.27245l-3.272-3.272c-.36356-.36355-.9089-.36355-1.27245 0L9.72511 2.09044l4.54445 4.54445z"/>
                <path class="path"
                      d="M8.45267 3.36289L1.18156 10.634c-.18178.18178-.27267.36356-.27267.63622v3.272c0 .54534.36355.9089.90889.9089h3.272c.27266 0 .45444-.0909.63622-.27267l7.27111-7.27112L8.45267 3.3629z"/>
            </g>
        </svg>

        <svg v-if="name === 'delete-icon'" :style="styleOverride" width="16px" height="16px"
             viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <g fill="#444450" fill-rule="nonzero">
                <path class="path" d="M2 6v8c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V6H2z"/>
                <path class="path" d="M12 3V1c0-.6-.4-1-1-1H5c-.6 0-1 .4-1 1v2H0v2h16V3h-4zm-2 0H6V2h4v1z"/>
            </g>
        </svg>

        <svg v-if="name === 'duplicate-icon'" :style="styleOverride" width="16px" height="16px"
             viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <g fill-rule="nonzero">
                <path class="path"
                      d="M11 12H1c-.553 0-1-.447-1-1V1c0-.552.447-1 1-1h10c.553 0 1 .448 1 1v10c0 .553-.447 1-1 1z"/>
                <path class="path" d="M15 16H4v-2h10V4h2v11c0 .553-.447 1-1 1z"/>
            </g>
        </svg>

        <svg v-if="name === 'sort-arrow'" :style="styleOverride" width="9px" height="10px" xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 9 10">
            <polygon class="path"
                     points="9 5.8125 8.05970149 4.9375 5.17164179 7.625 5.17164179 0 3.82835821 0 3.82835821 7.625 0.940298507 4.9375 7.78543896e-14 5.8125 4.5 10"
                     fill-rule="nonzero"/>
        </svg>

        <svg v-if="name === 'calendar'" :style="styleOverride" width="16px" height="16px" viewBox="0 0 16 16"
             xmlns="http://www.w3.org/2000/svg">
            <path
                d="M15 2h-2V1c0-.6-.4-1-1-1h-1c-.6 0-1 .4-1 1v1H6V1c0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1v1H1c-.6 0-1 .4-1 1v12c0 .6.4 1 1 1h14c.6 0 1-.4 1-1V3c0-.6-.4-1-1-1zm-1 12H2V7h12v7z"
                fill-rule="nonzero"/>
        </svg>

        <!-- 'back': left angle icon -->
        <svg v-if="name === 'back'" :style="styleOverride" width="8" height="16" viewBox="0 0 8 17" xmlns="http://www.w3.org/2000/svg">
            <path class="path" d="M6.555 17L.23 9.157a1.058 1.058 0 0 1 0-1.314L6.555 0 8 1.316 2.204 8.5l5.795 7.183L6.555 17z"/>
        </svg>

        <!-- 'save': floppy icon  -->
        <svg v-if="name === 'save'" :style="styleOverride" width="16" height="16" viewBox="0 0 12 14" xmlns="http://www.w3.org/2000/svg">
            <path class="path" d="M10.238.262A.794.794 0 0 0 9.625 0H8.75v2.625c0 .525-.35.875-.875.875H3.5c-.525 0-.875-.35-.875-.875V0H.875C.35 0 0 .35 0 .875v12.25c0 .525.35.875.875.875h12.25c.525 0 .875-.35.875-.875v-8.75a.794.794 0 0 0-.262-.612l-3.5-3.5zM12 13H3v-3c0-.6.36-1 .9-1h7.2c.54 0 .9.4.9 1v3z" fill="#D6D8DD"/>
            <path class="path" d="M6 0h2v3H6z"/>
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

        <!-- 'mail': envelope icon -->
        <svg v-if="name === 'mail'" :style="styleOverride" width="16" height="14" viewBox="0 0 16 14" xmlns="http://www.w3.org/2000/svg">
            <path class="path" d="M15 0H1C.4 0 0 .4 0 1v1.4l8 4.5 8-4.4V1c0-.6-.4-1-1-1z"/>
            <path class="path" d="M7.5 8.9L0 4.7V13c0 .6.4 1 1 1h14c.6 0 1-.4 1-1V4.7L8.5 8.9c-.28.14-.72.14-1 0z"/>
        </svg>

        <!-- 'screen-donwload': dekstop screen with a down arrow in the right side -->
        <svg v-if="name === 'screen-download'" :style="styleOverride" width="16" height="15" viewBox="0 0 16 15" xmlns="http://www.w3.org/2000/svg">
            <path class="path" d="M13 5h2V2c0-1.065-.935-2-2-2H3C1.935 0 1 .935 1 2v5h2V2h10v3zM7 9H0v1a2 2 0 0 0 2 2h5V9zM14 10.586l-1 1V7h-2v4.586l-1-1L8.586 12l2.707 2.707a.997.997 0 0 0 1.414 0L15.414 12 14 10.586z"/>
        </svg>

        <!-- 'card-edit': credit card with pencil overlay -->
        <svg v-if="name === 'card-edit'" :style="styleOverride" width="16" height="16" viewBox="0 0 16 15" xmlns="http://www.w3.org/2000/svg">
            <path class="path" d="M12 14l-3 1 1-3 4-4 2 2zM2 6h14V1a1 1 0 0 0-1-1H1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h6v-2H2V6zm0-4h12v2H2V2z"/>
        </svg>

        <!-- 'chain-link': single link in the chain -->
        <svg v-if="name === 'chain-link'" :style="styleOverride" width="16" height="16" viewBox="0 0 18 16" xmlns="http://www.w3.org/2000/svg">
            <path class="path" d="M5.5 16c-1.2 0-2.3-.5-3.2-1.3-1.8-1.8-1.8-4.6 0-6.4l.7-.7L4.4 9l-.7.7c-1 1-1 2.6 0 3.6s2.6 1 3.6 0l3-3c1-1 1-2.6 0-3.6L9.6 6 11 4.6l.7.7c1.8 1.8 1.8 4.6 0 6.4l-3 3c-.8.8-2 1.3-3.2 1.3z"/><path class="path" d="M7 11.4l-.7-.7c-1.8-1.8-1.8-4.6 0-6.4l3-3c.9-.9 2-1.3 3.2-1.3 1.2 0 2.3.5 3.2 1.3 1.8 1.8 1.8 4.6 0 6.4l-.7.7L13.6 7l.7-.7c1-1 1-2.6 0-3.6s-2.6-1-3.6 0l-3 3c-1 1-1 2.6 0 3.6l.7.7L7 11.4z"/>
        </svg>

        <!-- 'clock': default clock - 3 o'clock -->
        <svg v-if="name === 'clock'" :style="styleOverride" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path class="path" d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 14c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z"/>
            <path class="path" d="M9 4H7v5h5V7H9z"/>
        </svg>

        <!-- 'sort': sort arrow icon -->
        <svg v-if="name === 'sort'" :style="styleOverride" width="7" height="9" viewBox="0 0 7 9" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fill-rule="evenodd">
                <path class="path" fill="#000" d="M3 0h1v8H3z"/>
                <g fill="#222235">
                    <path class="path" d="M3 8h1v1H3zM2 7h1v1H2zM1 6h1v1H1zM0 5h1v1H0zM4 7h1v1H4zM5 6h1v1H5zM6 5h1v1H6z"/>
                </g>
            </g>
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

/* Styles for specific icons */
.icon-caret {
    border-width: 3px 3.5px 0 3.5px;
    border-style: solid;
    border-color: currentColor transparent transparent transparent;
}
</style>
