<template>
    <div class="inline-dialog">
        <div v-if="$slots.header" class="inline-dialog__header">
            <slot name="header"></slot>
        </div>

        <div class="inline-dialog__content">
            <slot></slot>
        </div>
    </div>
</template>

<style lang="less" scoped>
.inline-dialog {
    position: absolute;
    width: 340px;
    background-color: #FFFFFF;
    box-shadow: 1px 2px 5px 0 rgba(0,0,0,0.25);
    font-size: 14px;
    z-index: 1;

    &__header {
        padding: 10px 15px;
        border-bottom: 1px solid #f5f5f5;
    }

    &__content {
        padding: 20px 15px;
    }
}
</style>
