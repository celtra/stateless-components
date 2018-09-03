export function capitalize (value) {
    return value[0].toUpperCase() + value.slice(1)
}

export function uppercase (value) {
    return value.toUpperCase()
}

export function prefix (value, prefix) {
    let prefixValue = (x) => {
        if (Array.isArray(x)) {
            return x.map(prefixValue)
        } else if (typeof (x) === 'object') {
            let prefixed = {}
            for (let key in x) {
                prefixed[prefix + key] = x[key]
            }
            return prefixed
        } else {
            return prefix + x
        }
    }

    if (value == null) {
        return null
    }
    return prefixValue(value)
}

export function slugify (value) {
    return value ? value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') : ''
}

export function middleEllipsis (value, totalCharacters) {
    if (totalCharacters && value.length > totalCharacters){
        return value.substring(0, totalCharacters - 11) + '...' + value.substring(value.length - 10, value.length)
    }
    return value
}
