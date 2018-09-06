export function find (items, fn) {
    for (let item of items) {
        if (fn(item)) {
            return item
        }
        if (item.items) {
            const found = find(item.items, fn)
            if (found) {
                return found
            }
        }
    }
    return null
}

export function map (items, fn) {
    return items.map(item => {
        if (item.items) {
            return {
                ...fn(item),
                items: map(item.items, fn),
            }
        } else {
            return fn(item)
        }
    })
}

export function filter (items, fn) {
    const mapItem = (item) => {
        if (fn(item)) {
            return item
        }
        if (item.items) {
            const newChildren = item.items.map(mapItem).filter(x => x)
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

export function sortBy (items, fn) {
    const keys = items.map(x => x.key || x.id)
    return items.slice().sort((x, y) => {
        let fnValue = fn(y) - fn(x)
        if (x.items && y.items) {
            const sumFn = (items) => items.reduce((total, x) => total + fn(x), 0)
            const sorts = {
                max (items) {
                    return Math.max(...items.map(x => fn(x)))
                },
                sum (items) {
                    return sumFn(items)
                },
                avg (items) {
                    return sumFn(items) / items.length
                },
            }

            const sortBy = ['max', 'sum', 'avg']

            for (let sortFn of sortBy) {
                const result = sorts[sortFn](y.items) - sorts[sortFn](x.items)
                if (result !== 0) {
                    fnValue = result
                    break
                }
            }
        }

        if (fnValue === 0) {
            return keys.indexOf(x.key || x.id) - keys.indexOf(y.key || y.id)
        } else {
            return fnValue
        }
    }).map(item => {
        if (item.items) {
            return {
                ...item,
                items: sortBy(item.items, fn),
            }
        } else {
            return item
        }
    })
}

export function getLeafIds (item) {
    const children = Array.isArray(item) ? item : item.items

    let ids = {}
    if (children) {
        for (let child of children) {
            for (let id of getLeafIds(child)) {
                ids[id] = true
            }
        }
    } else {
        ids[item.id] = true
    }
    return Object.keys(ids)
}

export function flatten (items) {
    let flat = []

    const traverse = (items, path) => {
        for (let item of items) {
            const currentPath = path.concat([item.id])
            flat.push({
                ...item,
                items: null,
                key: item.key || item.id,
                depth: path.length,
                isLeaf: !item.items,
                leafIds: getLeafIds(item),
            })
            if (item.items) {
                traverse(item.items, currentPath)
            }
        }
    }

    traverse(items, [])

    return flat
}

export function search (items, query, fields = ['label', 'metadata', 'tooltip']) {
    const cleanQuery = (query || '').trim(' ').toLowerCase()
    if (cleanQuery.length === 0) {
        return [...items]
    }

    const getMatchingPriority = (value) => {
        if (!value)
            return 0
        const cleanValue = value.trim().toLowerCase()
        if (cleanValue === cleanQuery)
            return 3
        const index = value.toLowerCase().indexOf(cleanQuery)
        if (index >= 0) {
            return index === 0 ? 2 : 1
        }
        return 0
    }

    const searchFn = option => {
        for (let i = 0; i < fields.length; i++) {
            let priority = getMatchingPriority(option[fields[i]])
            if (priority > 0)
                return (option.items ? 0: 100) + 10 * (fields.length - i) + priority
        }
        return 0
    }

    return sortBy(flatten(items).filter(x => x.isLeaf && searchFn(x) > 0), searchFn)
}
