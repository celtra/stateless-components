<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
export default {
    name: 'app',
}
</script>

<style>
html {
    height: 100%;
}

body {
    margin: 0;
    height: 100%;
}

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100%;
}

@font-face {
    font-family: "SF UI Display Regular";
    src: url("./assets/fonts/SF-UI-Display-Regular.woff") format("woff");
}

@font-face {
    font-family: "SF UI Display Medium";
    src: url("./assets/fonts/SF-UI-Display-Medium.woff") format("woff");
}

@font-face {
    font-family: "SF UI Text Regular";
    src: url("./assets/fonts/SF-UI-Text-Regular.woff") format("woff");
}

@font-face {
    font-family: "SF UI Text Medium";
    src: url("./assets/fonts/SF-UI-Text-Medium.woff") format("woff");
}

@font-face {
    font-family: "SF UI Text Semibold";
    src: url("./assets/fonts/SF-UI-Text-Semibold.woff") format("woff");
}
</style>
