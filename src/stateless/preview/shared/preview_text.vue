<template>
    <g>
        <path v-for="(path, index) in paths" :key="index" :d="path" :fill="color"></path>
    </g>
</template>

<script>
export default {
    props: {
        x: { type: Number, required: true },
        y: { type: Number, required: true },
        width: { type: Number, required: true },
        scale: { type: Number, default: 1 },
        rows: { type: Array, required: true }, // element type: { type = (basic, box, left-box), num_lines = Number }
        lineHeight: { type: Number, required: true },
        sectionSpacing: { type: Number, required: false },
        boxWidth: { type: Number, required: false },
        growDown: { type: Boolean, default: true },
        color: { type: String, default: '#aaa' },
        minLineWidthRatio: { type: Number, default: 0.85 },
    },
    computed: {
        constants () {
            let lineHeight = this.lineHeight * this.scale

            return {
                lineHeight: lineHeight,
                lineSpacing: 1.0 * lineHeight,
                rowSpacing: this.sectionSpacing || lineHeight,
            }
        },
        paths () {
            if (this.width < 0.1)
                return []

            let offsetDirection = this.growDown ? 1 : -1
            let currentOffset = this.y
            let paths = []

            let randomIndex = 0
            let addLines = (n, lineX, lineWidth) => {
                for (let i = 0; i < n; i++) {
                    let randomNumber = this.randomNumbers[randomIndex % this.randomNumbers.length]
                    randomIndex++

                    let currentLineWidth = lineWidth * (this.minLineWidthRatio + randomNumber * (1 - this.minLineWidthRatio))
                    paths.push(`M${lineX} ${currentOffset} H ${lineX + currentLineWidth} V ${currentOffset + this.constants.lineHeight * offsetDirection} H ${lineX} Z`)

                    currentOffset += (this.constants.lineHeight + this.constants.lineSpacing) * offsetDirection
                }
            }

            this.rows.forEach(row => {
                let height = (this.constants.lineSpacing + this.constants.lineHeight) * row.numLines - this.constants.lineSpacing
                let rowOffset = currentOffset
                let columnTypes = row.types || [row.type]
                let columnWidth = (this.width - this.constants.rowSpacing * (columnTypes.length - 1)) / columnTypes.length

                columnTypes.forEach((type, columnIndex) => {
                    currentOffset = rowOffset
                    let columnX = this.x + columnIndex * (columnWidth + this.constants.rowSpacing)

                    if (type === 'basic') {
                        addLines(row.numLines, columnX, columnWidth)
                        currentOffset += (this.constants.rowSpacing - this.constants.lineSpacing) * offsetDirection
                    } else if (type === 'box') {
                        paths.push(`M${columnX} ${currentOffset} H ${columnX + columnWidth} V ${currentOffset + height * offsetDirection} H ${columnX} Z`)
                        currentOffset += (height + this.constants.rowSpacing) * offsetDirection
                    } else if (type === 'left-box') {
                        let boxWidth = Math.min(columnWidth, this.boxWidth * this.scale)
                        paths.push(`M${columnX} ${currentOffset} H ${columnX + boxWidth} V ${currentOffset + height * offsetDirection} H ${columnX} Z`)

                        let linesOffsetX = boxWidth + this.constants.rowSpacing
                        if (linesOffsetX < columnWidth) {
                            addLines(row.numLines, columnX + linesOffsetX, columnWidth - linesOffsetX)
                            currentOffset += (this.constants.rowSpacing - this.constants.lineSpacing) * offsetDirection
                        } else {
                            currentOffset += (height + this.constants.rowSpacing) * offsetDirection
                        }
                    }
                })
            })

            return paths
        },
    },
    created () {
        this.randomNumbers = []
        for (var i = 0; i < 100; i++) {
            this.randomNumbers.push(Math.random())
        }
    },
}
</script>
