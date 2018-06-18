export function transitionWidths (from, to, ratio) {
    return to.map((target, index) => {
        let previous = from[index] || target
        return previous + (target - previous) * ratio
    })
}

export function calculateWidths (count, hoverIndex, totalWidth, maxSize, minSize) {
    if (hoverIndex === null || hoverIndex >= count) {
        let sizes = []
        for (var i = 0; i < count; i++) {
            sizes.push(totalWidth / count)
        }
        return sizes
    } else {
        let numLeft = hoverIndex
        let numRight = count - hoverIndex - 1
        let hoverStartX = Math.max(0, Math.min(totalWidth - maxSize, totalWidth * (hoverIndex + 0.5) / count - maxSize / 2))
        let hoverEndX = totalWidth - hoverStartX - maxSize

        let left = linearValues(hoverStartX, numLeft, maxSize, minSize).reverse()
        let center = [maxSize]
        let right = linearValues(hoverEndX, numRight, maxSize, minSize)

        let visibleWidths = left.concat(center).concat(right)
        let currentWidth = visibleWidths.reduce((s, acc) => s + acc, 0)
        return visibleWidths.map(w => w * totalWidth / currentWidth)
    }
}

export function linearValues (availableWidth, count, max, min) {
    if (count === 1) {
        return [availableWidth]
    }

    let averageWidth = availableWidth / count
    let maxK = 2 * (averageWidth - max) / (count + 1)
    let minK = 2 * (min - averageWidth) / (count - 1)
    let k = Math.max(maxK, minK)
    let offset = averageWidth - k * (count + 1) / 2

    let values = []
    for (var i = 0; i < count; i++) {
        values.push(k * (i + 1) + offset)
    }

    return values
}
