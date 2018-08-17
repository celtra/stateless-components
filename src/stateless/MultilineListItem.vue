<template>
    <div :class="[theme, size, cssModifiers] | prefix('multiline-list-item--')" class="multiline-list-item">
        <div class="multiline-list-item__content">
            <p :class="cssModifiers | prefix('multiline-list-item__label--')" class="multiline-list-item__label">
                <template v-if="highlightQuery">
                    <span v-for="(part, index) in getParts(label)" :key="index" :style="part.bold ? { fontWeight: 'bold' } : {}">{{ part.text }}</span>
                </template>
                <template v-else>
                    {{ label }}
                </template>
            </p>
            <p v-if="metadata" :class="cssModifiers | prefix('multiline-list-item__metadata--')" class="multiline-list-item__metadata">
                <template v-if="highlightQuery">
                    <span v-for="(part, index) in getParts(metadata)" :key="index" :style="part.bold ? { fontWeight: 'bold' } : {}">{{ part.text }}</span>
                </template>
                <template v-else>
                    {{ metadata }}
                </template>
            </p>
        </div>

        <div class="multiline-list-item__slot">
            <slot name="right"></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        size: { type: String, required: false, default: 'normal' },
        theme: { type: String, required: false, default: 'dark' },
        label: { type: String, required: true },
        metadata: { type: String },
        selected: { type: Boolean },
        disabled: { type: Boolean },
        highlightQuery: { type: String },
    },
    computed: {
        cssModifiers () {
            return {
                selected: this.selected,
                disabled: this.disabled,
                'with-metadata': !!this.metadata,
            }
        },
    },
    methods: {
        getParts (label) {
            let index = this.highlightQuery && this.highlightQuery.length > 0 ? label.toLowerCase().indexOf(this.highlightQuery.toLowerCase()) : -1
            if (index === -1) {
                return [
                    { text: label, bold: false },
                ]
            }
            let beforeIndex = label.substring(0, index)
            let atIndex = label.substring(index, index + this.highlightQuery.length)
            let afterIndex = label.substring(index + this.highlightQuery.length)

            let parts = []
            if (beforeIndex.length > 0) {
                parts.push({
                    text: beforeIndex,
                    bold: false,
                })
            }

            parts.push({
                text: atIndex,
                bold: true,
            })

            if (afterIndex.length > 0) {
                parts.push({
                    text: afterIndex,
                    bold: false,
                })
            }

            return parts
        },
    },
}
</script>

<style lang="less" scoped>
/*
  Multiline list item styles are in multiline_list_item.less.
  They are imported in parent component so they can be overridden (colors for hover states etc.)
*/
</style>
