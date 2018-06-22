export function find (items, fn) {
    for (let item of items) {
        if (fn(item)) {
            return item
        }
        let children = item.items || item.options
        if (children) {
            let found = find(children, fn)
            if (found) {
                return found
            }
        }
    }
    return null
}

export function map (items, fn) {
    return items.map(item => {
        let children = item.items || item.options

        if (children) {
            return {
                ...fn(item),
                items: map(children, fn),
            }
        } else {
            return fn(item)
        }
    })
}

export function filter (items, fn) {
    let mapItem = (item) => {
        if (fn(item)) {
            return item
        }
        let children = item.items || item.options
        if (children) {
            let newChildren = children.map(mapItem).filter(x => x)
            if (newChildren.length > 0) {
                return {
                    ...item,
                    items: newChildren,
                }
            }
        }
        return null
    }
    return items.map(mapItem).filter(x => x)
}

export function sort (items, fn) {
    return items.slice().sort(fn).map(item => {
        let children = item.items || item.options

        if (children) {
            return {
                ...item,
                items: sort(children, fn),
            }
        } else {
            return item
        }
    })
}

export function getLeafIds (item) {
    let children = Array.isArray(item) ? item : item.items || item.options

    let ids = []
    if (children) {
        for (let child of children) {
            ids = ids.concat(getLeafIds(child))
        }
    } else {
        ids.push(item.id)
    }
    return ids
}

export function flatten (items) {
    let flat = []

    let traverse = (items, path) => {
        for (let item of items) {
            let children = item.items || item.options

            let currentPath = path.concat([item.id])
            flat.push({
                ...item,
                items: null,
                key: item.key || item.id,
                depth: path.length,
                isLeaf: !children,
                leafIds: getLeafIds(item),
            })
            if (children) {
                traverse(children, currentPath)
            }
        }
    }

    traverse(items, [])

    return flat
}
