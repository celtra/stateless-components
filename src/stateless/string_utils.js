export function getTextHighlightParts (text, query) {
    let simpleQuery = query.toLowerCase().trim()
    const index = simpleQuery && simpleQuery.length > 0 ? text.toLowerCase().indexOf(simpleQuery) : -1
    if (index === -1) {
        return [
            { text: text, bold: false },
        ]
    }
    const beforeIndex = text.substring(0, index)
    const atIndex = text.substring(index, index + simpleQuery.length)
    const afterIndex = text.substring(index + simpleQuery.length)

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
}
