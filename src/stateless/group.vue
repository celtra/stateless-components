<template>
    <div class="group">
        <div class="group__title">
            <div>{{ label }}</div>
            <support-text
                v-if="description"
                :text="description"
                class="group__info"
            ></support-text>
        </div>
        <slot></slot>
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
    },
}
</script>

<style lang="less" scoped>
@import (reference) "variables";

.group {
  border: 1px solid @gunpowder;
  padding: 30px;
  margin-top: 10px;
  position: relative;

  &__title {
    color: @dolphin;
    font-size: 18px;
    position: absolute;
    top: -11px;
    background-color: @extremely-dark-gray;
    padding: 0 10px;
    display: flex;
  }

  &__info {
    width: 16px;
    height: 16px;
    margin: 3px 6px 0 16px;
  }
}
</style>
