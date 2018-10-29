<template>
    <div class="icon-wrapper" @click="$emit('click', $event)" @keyup="$emit('keyup', $event)" @keydown="$emit('keydown', $event)">
        <svg v-if="name === 'undo-arrow'" xmlns="http://www.w3.org/2000/svg">
            <path class="path" d="M2.502 12.333a6.996 6.996 0 0 1-1.405-3.168l1.973-.331a4.982 4.982 0 0 0 1.003 2.26l-1.571 1.239zM6.834 14.903a7.015 7.015 0 0 1-2.976-1.259l1.186-1.611c.624.459 1.358.77 2.122.898l-.332 1.972zM9.165 14.903l-.33-1.973a4.99 4.99 0 0 0 2.209-.964l1.219 1.586a6.997 6.997 0 0 1-3.098 1.351zM8 1c-1.873 0-3.65.759-4.948 2.052L.9.9.2 7.3l6.4-.7-2.135-2.135A5.023 5.023 0 0 1 8 3c2.757 0 5 2.243 5 5 0 1.06-.327 2.072-.947 2.928l1.621 1.173A6.96 6.96 0 0 0 15 8c0-3.86-3.141-7-7-7z"/>
        </svg>

        <svg v-if="name === 'pencil-edit'" viewBox="0 0 23 26" xmlns="http://www.w3.org/2000/svg">
            <g fill-rule="nonzero" transform="translate(3 1)">
                <path class="path"
                      d="M14.26956 6.63489l1.45422-1.45422c.36355-.36356.36355-.9089 0-1.27245l-3.272-3.272c-.36356-.36355-.9089-.36355-1.27245 0L9.72511 2.09044l4.54445 4.54445z"/>
                <path class="path"
                      d="M8.45267 3.36289L1.18156 10.634c-.18178.18178-.27267.36356-.27267.63622v3.272c0 .54534.36355.9089.90889.9089h3.272c.27266 0 .45444-.0909.63622-.27267l7.27111-7.27112L8.45267 3.3629z"/>
            </g>
        </svg>

        <svg v-if="name === 'delete-icon'" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <g fill="#444450" fill-rule="nonzero">
                <path class="path" d="M2 6v8c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V6H2z"/>
                <path class="path" d="M12 3V1c0-.6-.4-1-1-1H5c-.6 0-1 .4-1 1v2H0v2h16V3h-4zm-2 0H6V2h4v1z"/>
            </g>
        </svg>

        <svg v-if="name === 'duplicate-icon'" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <g fill-rule="nonzero">
                <path class="path"
                      d="M11 12H1c-.553 0-1-.447-1-1V1c0-.552.447-1 1-1h10c.553 0 1 .448 1 1v10c0 .553-.447 1-1 1z"/>
                <path class="path" d="M15 16H4v-2h10V4h2v11c0 .553-.447 1-1 1z"/>
            </g>
        </svg>

        <svg v-if="name === 'sort-arrow'" xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 8 8">
            <path class="path" transform="translate(-4 -4)" d="M12 8.231l-.836-.787-2.567 2.419V4H7.403v5.863l-2.567-2.42L4 8.232 8 12z"/>
        </svg>

        <svg v-if="name === 'calendar'" viewBox="0 0 16 16"
             xmlns="http://www.w3.org/2000/svg">
            <path
                d="M15 2h-2V1c0-.6-.4-1-1-1h-1c-.6 0-1 .4-1 1v1H6V1c0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1v1H1c-.6 0-1 .4-1 1v12c0 .6.4 1 1 1h14c.6 0 1-.4 1-1V3c0-.6-.4-1-1-1zm-1 12H2V7h12v7z"
                fill-rule="nonzero"/>
        </svg>

        <!-- 'back': left angle icon -->
        <svg v-if="name === 'back'" viewBox="-3 0 14 17" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path class="path" d="M6.555 17L.23 9.157a1.058 1.058 0 0 1 0-1.314L6.555 0 8 1.316 2.204 8.5l5.795 7.183L6.555 17z"/>
        </svg>

        <!-- 'save': floppy icon  -->
        <svg v-if="name === 'save'" viewBox="0 0 12 14" xmlns="http://www.w3.org/2000/svg">
            <path class="path" d="M10.238.262A.794.794 0 0 0 9.625 0H8.75v2.625c0 .525-.35.875-.875.875H3.5c-.525 0-.875-.35-.875-.875V0H.875C.35 0 0 .35 0 .875v12.25c0 .525.35.875.875.875h12.25c.525 0 .875-.35.875-.875v-8.75a.794.794 0 0 0-.262-.612l-3.5-3.5zM12 13H3v-3c0-.6.36-1 .9-1h7.2c.54 0 .9.4.9 1v3z" fill="#D6D8DD"/>
            <path class="path" d="M6 0h2v3H6z"/>
        </svg>

        <!-- 'arrow-down-strong': arrow down with additional line icon -->
        <svg v-if="name === 'arrow-down-strong'" viewBox="0 0 12 16" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g class="path">
                <polygon points="7 16 14 8 10 8 10 4 4 4 4 8 0 8"/>
                <rect x="4" width="6" height="2"/>
            </g>
        </svg>

        <!-- 'loading': loader spinning icon -->
        <svg v-if="name === 'loading'" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <path class="path" d="M15 30C6.7 30 0 23.3 0 15c0-4.7 2.3-9.2 6-12l2.4 3.2C5.6 8.2 4 11.5 4 15c0 6 4.9 11 11 11s11-4.9 11-11c0-5.7-4.4-10.5-10-11l.3-4C24 .7 30 7.2 30 15c0 8.3-6.7 15-15 15z"/>
        </svg>

        <!-- 'funnel': funnel (filter) icon -->
        <svg v-if="name === 'funnel'" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <path class="path" d="M15,0H1C0.4,0,0,0.4,0,1v2c0,0.3,0.1,0.6,0.4,0.8L6,8.5V15c0,0.4,0.2,0.8,0.6,0.9C6.7,16,6.9,16,7,16 c0.3,0,0.5-0.1,0.7-0.3l2-2C9.9,13.5,10,13.3,10,13V8.5l5.6-4.7C15.9,3.6,16,3.3,16,3V1C16,0.4,15.6,0,15,0z"></path>
        </svg>

        <svg v-if="name === 'remove'" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path class="path" d="M2 6v8c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V6H2zM12 3V1c0-.6-.4-1-1-1H5c-.6 0-1 .4-1 1v2H0v2h16V3h-4zm-2 0H6V2h4v1z"/>
        </svg>

        <svg v-if="name === 'plus'" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path class="path" d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm4 9H9v3H7V9H4V7h3V4h2v3h3v2z" fill-rule="nonzero"/>
        </svg>

        <svg v-if="name === 'plus-square'" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 0H6v6H0v4h6v6h4v-6h6V6h-6z" fill="#444450" fill-rule="nonzero"/>
        </svg>

        <svg v-if="name === 'left-arrow'" viewBox="0 0 22 17" xmlns="http://www.w3.org/2000/svg">
            <path class="path" d="M.293 7.707L8 0l1.414 1.414-6 6H21a1 1 0 1 1 0 2H3.414l6 6L8 16.828.293 9.121a.999.999 0 0 1 0-1.414z" fill-rule="nonzero"/>
        </svg>

        <svg v-if="name === 'right-arrow'" viewBox="0 0 22 17" xmlns="http://www.w3.org/2000/svg">
            <path class="path" d="M21.707 7.707L14 0l-1.414 1.414 6 6H1a1 1 0 1 0 0 2h17.586l-6 6L14 16.828l7.707-7.707a.999.999 0 0 0 0-1.414z" fill-rule="nonzero"/>
        </svg>

        <svg v-if="name === 'search'" viewBox="0 0 16 17" xmlns="http://www.w3.org/2000/svg">
            <path class="path" d="M12.7 11.3c.9-1.2 1.4-2.6 1.4-4.2 0-3.9-3.1-7.1-7-7.1S0 3.2 0 7.1c0 3.9 3.2 7.1 7.1 7.1 1.6 0 3.1-.5 4.2-1.4l3 3c.2.2.5.3.7.3.2 0 .5-.1.7-.3.4-.4.4-1 0-1.4l-3-3.1zm-5.6.8c-2.8 0-5.1-2.2-5.1-5S4.3 2 7.1 2s5.1 2.3 5.1 5.1-2.3 5-5.1 5z" fill-rule="nonzero"/>
        </svg>

        <!-- 'clear': X sign, transparent and encircled -->
        <svg v-if="name === 'clear'" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path class="path" d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm3.5 10.1l-1.4 1.4L8 9.4l-2.1 2.1-1.4-1.4L6.6 8 4.5 5.9l1.4-1.4L8 6.6l2.1-2.1 1.4 1.4L9.4 8l2.1 2.1z" fill-rule="nonzero"/>
        </svg>

        <!-- 'clear-small': X sign, bold -->
        <svg v-if="name === 'x-bold'" viewBox="0 0 8 8" xmlns="http://www.w3.org/2000/svg">
            <path class="path" d="M6.4 0L4 2.4 1.6 0 0 1.6 2.4 4 0 6.4 1.6 8 4 5.6 6.4 8 8 6.4 5.6 4 8 1.6z"/>
        </svg>

        <!-- 'close-bolder': X sign, thin -->
        <svg v-if="name === 'close-bolder'" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path class="path stroke-path" stroke-width="1" d="M13.4 12L23.7 1.7c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0L12 10.6 1.7.3C1.3-.1.7-.1.3.3c-.4.4-.4 1 0 1.4L10.6 12 .3 22.3c-.4.4-.4 1 0 1.4.2.2.4.3.7.3.3 0 .5-.1.7-.3L12 13.4l10.3 10.3c.2.2.5.3.7.3.2 0 .5-.1.7-.3.4-.4.4-1 0-1.4L13.4 12z" fill-rule="nonzero" />
        </svg>

        <!-- 'close': X sign, thin -->
        <svg v-if="name === 'close'" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path class="path" d="M13.4 12L23.7 1.7c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0L12 10.6 1.7.3C1.3-.1.7-.1.3.3c-.4.4-.4 1 0 1.4L10.6 12 .3 22.3c-.4.4-.4 1 0 1.4.2.2.4.3.7.3.3 0 .5-.1.7-.3L12 13.4l10.3 10.3c.2.2.5.3.7.3.2 0 .5-.1.7-.3.4-.4.4-1 0-1.4L13.4 12z" fill-rule="nonzero" />
        </svg>

        <!-- 'mail': envelope icon -->
        <svg v-if="name === 'mail'" viewBox="0 0 16 14" xmlns="http://www.w3.org/2000/svg">
            <path class="path" d="M15 0H1C.4 0 0 .4 0 1v1.4l8 4.5 8-4.4V1c0-.6-.4-1-1-1z"/>
            <path class="path" d="M7.5 8.9L0 4.7V13c0 .6.4 1 1 1h14c.6 0 1-.4 1-1V4.7L8.5 8.9c-.28.14-.72.14-1 0z"/>
        </svg>

        <!-- 'screen-donwload': dekstop screen with a down arrow in the right side -->
        <svg v-if="name === 'screen-download'" viewBox="0 0 16 15" xmlns="http://www.w3.org/2000/svg">
            <path class="path" d="M13 5h2V2c0-1.065-.935-2-2-2H3C1.935 0 1 .935 1 2v5h2V2h10v3zM7 9H0v1a2 2 0 0 0 2 2h5V9zM14 10.586l-1 1V7h-2v4.586l-1-1L8.586 12l2.707 2.707a.997.997 0 0 0 1.414 0L15.414 12 14 10.586z"/>
        </svg>

        <!-- 'card-edit': credit card with pencil overlay -->
        <svg v-if="name === 'card-edit'" viewBox="0 0 16 15" xmlns="http://www.w3.org/2000/svg">
            <path class="path" d="M12 14l-3 1 1-3 4-4 2 2zM2 6h14V1a1 1 0 0 0-1-1H1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h6v-2H2V6zm0-4h12v2H2V2z"/>
        </svg>

        <!-- 'chain-link': single link in the chain -->
        <svg v-if="name === 'chain-link'" viewBox="0 0 18 16" xmlns="http://www.w3.org/2000/svg">
            <path class="path" d="M5.5 16c-1.2 0-2.3-.5-3.2-1.3-1.8-1.8-1.8-4.6 0-6.4l.7-.7L4.4 9l-.7.7c-1 1-1 2.6 0 3.6s2.6 1 3.6 0l3-3c1-1 1-2.6 0-3.6L9.6 6 11 4.6l.7.7c1.8 1.8 1.8 4.6 0 6.4l-3 3c-.8.8-2 1.3-3.2 1.3z"/><path class="path" d="M7 11.4l-.7-.7c-1.8-1.8-1.8-4.6 0-6.4l3-3c.9-.9 2-1.3 3.2-1.3 1.2 0 2.3.5 3.2 1.3 1.8 1.8 1.8 4.6 0 6.4l-.7.7L13.6 7l.7-.7c1-1 1-2.6 0-3.6s-2.6-1-3.6 0l-3 3c-1 1-1 2.6 0 3.6l.7.7L7 11.4z"/>
        </svg>

        <!-- 'clock': default clock - 3 o'clock -->
        <svg v-if="name === 'clock'" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path class="path" d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 14c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z"/>
            <path class="path" d="M9 4H7v5h5V7H9z"/>
        </svg>

        <!-- 'sort': sort arrow icon -->
        <svg v-if="name === 'sort'" viewBox="0 0 7 9" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fill-rule="evenodd">
                <path class="path" fill="#000" d="M3 0h1v8H3z"/>
                <g fill="#222235">
                    <path class="path" d="M3 8h1v1H3zM2 7h1v1H2zM1 6h1v1H1zM0 5h1v1H0zM4 7h1v1H4zM5 6h1v1H5zM6 5h1v1H6z"/>
                </g>
            </g>
        </svg>

        <svg v-if="name === 'backward'" viewBox="0 0 30 22" xmlns="http://www.w3.org/2000/svg">
            <g fill-rule="evenodd">
                <path class="stroke-path" stroke="#D6D8DD" stroke-width="2" fill="none" stroke-linecap="square" d="M11 20l-9-9 9-9"/>
            </g>
        </svg>

        <svg v-if="name === 'pencil-edit-line'" viewBox="0 0 23 26" xmlns="http://www.w3.org/2000/svg">
            <path class="path" d="M18.451 20.996H3.91c-.545 0-.909-.364-.909-.91 0-.545.364-.908.909-.908H18.45c.545 0 .909.363.909.909 0 .545-.364.909-.909.909zM17.27 7.635l1.454-1.454a.879.879 0 0 0 0-1.273l-3.272-3.272a.879.879 0 0 0-1.273 0L12.725 3.09l4.545 4.545zM11.453 4.363l-7.271 7.271a.825.825 0 0 0-.273.636v3.272c0 .546.363.91.909.91H8.09c.272 0 .454-.092.636-.274l7.271-7.27-4.544-4.545z"/>
        </svg>

        <svg v-if="name === 'alpha'" viewBox="0 0 300 92" xmlns="http://www.w3.org/2000/svg">
            <path fill="#FE664E" d="M0 0h300v92H0z"/>
            <path d="M73.315 71.077l-3.697-11.642h-17.04L48.88 71.077H38.463l16.838-48h11.932l16.872 48h-10.79zM60.98 32.257l-6.218 19.66h12.67l-6.216-19.66h-.236zm60.987 30.504H100.76V23.078H90.61v48h31.357V62.76zm7.58-39.683h20.234c9.95 0 16.806 6.553 16.806 16.432 0 9.846-7.09 16.432-17.31 16.432H139.7v15.135h-10.15v-48zm10.15 7.95V48.09h7.362c5.813 0 9.208-3.06 9.208-8.547 0-5.456-3.36-8.516-9.176-8.516h-7.394zm76.583 40.05v-48h-10.15V42.57h-21.846V23.077h-10.15v48h10.15V50.852h21.846v20.225h10.15zm41.393 0l-3.697-11.642h-17.04l-3.698 11.642h-10.42l16.84-48h11.93l16.874 48h-10.79zm-12.335-38.82l-6.218 19.66h12.67l-6.217-19.66h-.235z" fill="#FFF"/>
        </svg>

        <svg v-if="name === 'beta'" viewBox="0 0 300 114" xmlns="http://www.w3.org/2000/svg">
            <path fill="#FE664E" d="M0 0h300v114H0z"/>
            <path d="M80.192 86.006h-27.01v-60h26.552c11.296 0 18.382 5.78 18.382 14.97 0 6.57-4.918 12.057-11.296 13.014v.332c8.17.624 14.173 6.57 14.173 14.512 0 10.56-7.962 17.172-20.8 17.172zM65.77 35.362v15.592h9.42c6.71 0 10.546-2.952 10.546-8.025 0-4.824-3.376-7.568-9.254-7.568H65.77zm0 41.29h11.213c7.253 0 11.17-3.078 11.17-8.816 0-5.614-4.042-8.607-11.462-8.607H65.77v17.42zm84.183-1.04H122.69V60.475h25.72V50.83h-25.72V36.36h27.263V26.006h-39.85v60h39.85V75.61zm38.205 10.394H175.57V36.36h-17.59V26.006h47.81V36.36H188.16v49.646zm57.797 0l-4.585-14.553h-21.134l-4.585 14.553h-12.92l20.883-60h14.797l20.926 60h-13.38zm-15.298-48.524l-7.71 24.574h15.714l-7.71-24.574h-.293z" fill="#FFF"/>
        </svg>

        <svg v-if="name === 'caret'" viewBox="0 0 12 5" xmlns="http://www.w3.org/2000/svg">
            <path class="path" d="M6 5l6-5H0z"/>
        </svg>

        <svg v-if="name === 'list-search'" viewBox="0 0 16 14" xmlns="http://www.w3.org/2000/svg">
            <path class="path" d="M4 12H1a1 1 0 0 1 0-2h3v2zM15 2H1a1 1 0 0 1 0-2h14a1 1 0 0 1 0 2zM4 7H1a1 1 0 0 1 0-2h3v2zM15.707 12.293l-2.274-2.274A3.947 3.947 0 0 0 14 8c0-2.206-1.794-4-4-4S6 5.794 6 8s1.794 4 4 4c.74 0 1.424-.215 2.019-.567l2.274 2.274 1.414-1.414zM10 10c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2z"/>
        </svg>

        <svg v-if="name === 'bars'" viewBox="0 0 7 10" xmlns="http://www.w3.org/2000/svg">
            <path class="path" d="M1 0v10H0V0h1zm3 0v10H3V0h1zm3 0v10H6V0h1z"/>
        </svg>

        <svg v-if="name === 'check'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path class="path" d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/>
        </svg>

        <svg v-if="name === 'minus'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 8">
            <rect class="path" x="0" y="0" width="24" height="8"/>
        </svg>

        <svg  v-if="name === 'update'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 16">
            <path class="path" d="M7.5 3c1.2 0 2.2.4 3.2 1H8v2h6V0h-2v2.5C10.7 1.5 9.2 1 7.5 1 3.6 1 .3 4 0 7.9l2 .2C2.2 5.2 4.6 3 7.5 3zM6.5 13c-1.2 0-2.2-.4-3.2-1H6v-2H0v6h2v-2.5c1.3 1 2.8 1.5 4.5 1.5 3.9 0 7.2-3 7.5-6.9l-2-.2c-.2 2.9-2.6 5.1-5.5 5.1z"/>
        </svg>
    </div>
</template>

<script>
export default {
    props: {
        name: { type: String, required: true },
    },
}
</script>

<style lang="less" scoped>
.icon-wrapper {
    font-size: 0;
    display: inline-block;
    width: 16px;
    height: 16px;
}

.icon-wrapper > svg {
    width: 100%;
    height: 100%;
}

.path {
    fill: currentColor;
}

.stroke-path {
    stroke: currentColor;
}

.spin {
    animation: SPIN 1s ease-out infinite;
}

@keyframes SPIN {
    0% { transform: rotate(0); }
    100% { transform: rotate(720deg); }
}
</style>
