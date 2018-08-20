export function find (items, fn) {
    for (let item of items) {
        if (fn(item)) {
            return item
        }
        if (item.items) {
            let found = find(item.items, fn)
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
    let mapItem = (item) => {
        if (fn(item)) {
            return item
        }
        if (item.items) {
            let newChildren = item.items.map(mapItem).filter(x => x)
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
    let keys = items.map(x => x.key || x.id)
    return items.slice().sort((x, y) => {
        let fnValue = fn(y) - fn(x)
        if (x.items && y.items) {
            let sumFn = (items) => items.reduce((total, x) => total + fn(x), 0)
            let sorts = {
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

            let sortBy = ['max', 'sum', 'avg']

            for (let sortFn of sortBy) {
                let result = sorts[sortFn](y.items) - sorts[sortFn](x.items)
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
    let children = Array.isArray(item) ? item : item.items

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
            let currentPath = path.concat([item.id])
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
