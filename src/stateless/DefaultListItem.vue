<template>
    <div :class="[theme, size, cssModifiers] | prefix('default-list-item--')" class="default-list-item">
        <p :style="labelWidth ? { width: `${labelWidth}px` } : {}" :class="cssModifiers | prefix('default-list-item__label--')" class="default-list-item__label">
            <template v-if="highlightQuery">
                <span v-for="(part, index) in getParts(label)" :key="index" :style="part.bold ? { fontWeight: 'bold' } : {}">{{ part.text }}</span>
            </template>
            <template v-else>
                {{ label }}
            </template>
        </p>
        <p v-if="metadata" :style="metadataWidth ? { width: `${metadataWidth}px` } : {}" :class="cssModifiers | prefix('default-list-item__metadata--')" class="default-list-item__metadata">
            <template v-if="highlightQuery">
                <span v-for="(part, index) in getParts(metadata)" :key="index" :style="part.bold ? { fontWeight: 'bold' } : {}">{{ part.text }}</span>
            </template>
            <template v-else>
                {{ metadata | middleEllipsis(metadataLength) }}
            </template>
            <icon v-if="icon" :name="icon" class="default-list-item__icon" />
        </p>

        <div v-if="metadata" class="default-list-item__hidden-widths">
            <p ref="labelContainer" class="default-list-item__label">{{ label }}</p>
            <p ref="metadataContainer" class="default-list-item__metadata">
                {{ metadata }}
                <icon v-if="icon" :name="icon" class="default-list-item__icon" />
            </p>
        </div>
    </div>
</template>

<script>
import Icon from './icon.vue'

export default {
    components: {
        Icon,
    },
    props: {
        size: { type: String, required: false, default: 'normal' },
        theme: { type: String, required: false, default: 'dark' },
        label: { type: String, required: true },
        metadata: { type: String },
        icon: { type: String },
        selected: { type: Boolean },
        disabled: { type: Boolean },
        highlightQuery: { type: String },
    },
    data () {
        return {
            labelWidth: null,
            metadataWidth: null,
        }
    },
    computed: {
        metadataLength () {
            if (!this.metadataWidth) {
                return 100
            }
            return Math.floor(this.metadataWidth / 7)
        },
        cssModifiers () {
            return {
                selected: this.selected,
                disabled: this.disabled,
                'with-metadata': !!this.metadata,
            }
        },
    },
    mounted () {
        window.addEventListener('resize', this.calculateWidths)
        this.$nextTick(this.calculateWidths)
    },
    beforeDestroy () {
        window.removeEventListener('resize', this.calculateWidths)
    },
    methods: {
        calculateWidths () {
            if (this.metadata) {
                const THRESHOLD = 0.1
                let totalWidth = this.$el.clientWidth - 5

                let labelWidth = this.$refs.labelContainer.clientWidth
                let metadataWidth = this.$refs.metadataContainer.clientWidth

                if (labelWidth + metadataWidth > totalWidth) {
                    let finalLabelWidth
                    if (labelWidth > metadataWidth) {
                        if (labelWidth <= (0.5 + THRESHOLD) * totalWidth) {
                            finalLabelWidth = labelWidth
                        } else {
                            finalLabelWidth = Math.floor(0.5 * totalWidth)
                        }
                    } else {
                        if (metadataWidth <= (0.5 + THRESHOLD) * totalWidth) {
                            finalLabelWidth = totalWidth - metadataWidth
                        } else {
                            finalLabelWidth = Math.floor(0.5 * totalWidth)
                        }
                    }

                    this.labelWidth = finalLabelWidth
                    this.metadataWidth = totalWidth - finalLabelWidth
                }
            }
        },
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

<style lang="less">
  /*
    Default list item styles are in default_list_item.less.
    They are imported in parent component so they can be overridden (colors for hover states etc.)
  */
</style>
