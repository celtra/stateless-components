<template>
    <div :class="{ 'hover-tooltip--visible': show }" class="hover-tooltip">
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        show: { type: Boolean, default: false },
    },
}
</script>

<style lang="less" scoped>
@import (reference) './variables';

.hover-tooltip {
    position: absolute;
    opacity: 0;
    top: 100%;
    left: 0px;
    color: @white;
    background-color: @gunpowder;
    border-radius: 3px;
    font-size: 11px;
    text-align: center;
    padding: 6px 20px;
    z-index: @z-index-new-dialog + 25;
    max-width: 200px;
}

:hover > .hover-tooltip,
.hover-tooltip--visible {
    animation: 0.2s fadeIn;
    animation-delay: 0.4s;
    animation-fill-mode: forwards;
}

@keyframes fadeIn {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
</style>
