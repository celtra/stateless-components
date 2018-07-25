<template>
    <div :class="{ 'tooltip--visible': show }" class="tooltip">
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        show: { type: Boolean, required: false, default: false },
    },
}
</script>

<style lang="less" scoped>
@import (reference) './variables';

.tooltip {
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

:hover > .tooltip,
.tooltip--visible {
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
