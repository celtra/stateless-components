<template>
    <div :class="[theme] | prefix('search-status--')" class="search-status">
        <template v-if="isLoading">
            <icon name="loading" class="search-status__loading-icon spin" />
            <span class="search-status__loading-text">Loading</span>
        </template>
        <template v-else-if="isEmpty">
            <span class="search-status__empty-text">No items</span>
        </template>
    </div>
</template>

<script>
import Icon from './icon.vue'

export default {
    components: {
        Icon,
    },
    props: {
        theme: { type: String, default: 'dark' },
        isLoading: { type: Boolean, default: false },
        isEmpty: { type: Boolean, default: false },
    },
}
</script>

<style lang="less" scoped>
@import (reference) './common';
@import './typography';

.search-status {
    font-family: @regular-text-font;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 60px;

    &__loading-text {
        font-size: 12px;
    }

    &__loading-icon {
        margin-right: 10px;
        color: @royal-blue;
    }

    &__empty-text {
        font-size: 16px;
    }
}

.search-status__loading-icon.search-status__loading-icon {
    width: 24px;
    height: 24px;
}

.search-status--light {
    color: @bluish-gray;
}

.search-status--dark {
    color: @gunpowder;
}
</style>
