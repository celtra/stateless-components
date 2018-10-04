<template>
    <div class="file-upload-requirements">
        <p v-for="requirement in requirements" :key="requirement.name" class="file-upload-requirements__requirement">
            {{ requirement.name }}:
            <span class="file-upload-requirements__requirement-value">{{ requirement.value }}</span>
        </p>
    </div>
</template>

<script>
export default {
    name: 'file-upload-requirements',
    props: {
        requirements: { type: Array, required: true },
    },
    usecases: [
        {
            requirements: [
                { name: 'Format', value: 'PNG, JPG' },
                { name: 'Size', value: 'max. 3MB' },
            ],
        },
    ],
}
</script>

<style scoped lang="less">
@import (reference) './common';
@import './typography';

.file-upload-requirements {
    color: @dolphin;
    font-size: 11px;
    margin-top: 15px;
    line-height: 15px;
    letter-spacing: 0.5px;
    position: absolute;
    z-index: @z-heaven;

    .file-upload-requirements__requirement-value {
        font-family: @medium-text-font;
        font-weight: bold;
    }
}
</style>
