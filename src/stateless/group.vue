<template>
    <div :class="[theme] | prefix('group--')" class="group">
        <div class="group__header">
            <div class="group__label">{{ label }}</div>
            <div v-if="description" class="group__tooltip-wrapper">
                <support-text
                    :text="description"
                ></support-text>
            </div>
        </div>
        <slot>If the actual lift in conversion is 5%, you will get a statistically significant result by running 2,069,740
        impressions</slot>
    </div>
</template>

<script>
import SupportText from './support_text.vue'

export default {
    components: {
        supportText: SupportText,
    },
    props: {
        label: { type: String },
        description: { type: String, required: false },
        theme: { type: String, required: false, default: 'dark' },
    },
}
</script>

<style lang="less" scoped>
@import (reference) "variables";

.group {
    position: relative;
    padding: 40px 30px 30px 30px;
    margin-top: 10px;
    border: 1px solid @gunpowder;

    &__header {
        display: flex;
        align-items: center;
        position: absolute;
        top: -13px;
        padding: 0 10px;
        background-color: @extremely-dark-gray;
    }

    &__label {
        flex: 1;
        color: @dolphin;
        font-size: 18px;
    }

    &__tooltip-wrapper {
        width: 16px;
        height: 16px;
        margin: 0 5px 0 15px;
    }

    // themes
    &--light {
        border-color: @very-light-gray;

        .group {
            &__header {
                background-color: @white;
            }

            &__label {
                color: @bluish-gray;
            }
        }
    }
}
</style>
