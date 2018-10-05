const flatVariations = (variations) => {
    let flat = [{}]

    for (const key of Object.keys(variations).sort((a, b) => a.localeCompare(b))) {
        let newFlat = []
        for (const value of variations[key]) {
            newFlat = newFlat.concat(flat.map(item => {
                return { ...item, [key]: value }
            }))
        }
        flat = newFlat
    }

    return flat
}

const getHash = (usecase) => {
    const s = Object.keys(usecase)
        .sort((a, b) => a.localeCompare(b))
        .filter(key => typeof usecase[key] !== 'function')
        .map(key => {
            const value = typeof usecase[key] === 'object' ? JSON.stringify(usecase[key]).trim('"') : usecase[key]
            return `${key}=${value}`
        })
        .join('&')

    var a = 1, c = 0, h, o
    if (s) {
        a = 0
        for (h = s.length - 1; h >= 0; h--) {
            o = s.charCodeAt(h)
            a = (a<<6&268435455) + o + (o<<14)
            c = a & 266338304
            a = c!==0?a^c>>21:a
        }
    }
    return String(a)
}

export function getFlatUsecases (component, ignoreVariations = []) {
    const usecases = []
    if (component.usecases) {
        const variations = component.variations && component.variations || {}
        const filterVariations = {}
        for (const k in variations) {
            if (!ignoreVariations.includes(k)) {
                filterVariations[k] = variations[k]
            }
        }

        for (const variation of flatVariations(filterVariations)) {
            for (const usecase of component.usecases) {
                const usecaseData = { ...variation, ...usecase }
                usecases.push({ data: usecaseData, uniqueID: getHash(usecaseData) })
            }
        }
    }
    return usecases
}

export function getProps (component) {
    const componentProps = component.props
    const usecases = getFlatUsecases(component)
    const defaultProps = usecases.length > 0 ? usecases[0].data : {}

    let allProps = {}
    for (const key in componentProps) {
        allProps[key] = true
    }
    for (const key in defaultProps) {
        allProps[key] = true
    }
    allProps = Object.keys(allProps)

    return allProps.map(propName => {
        return {
            name: propName,
            type: componentProps.hasOwnProperty(propName) ? componentProps[propName].type : typeof defaultProps[propName],
            default: defaultProps.hasOwnProperty(propName) ? defaultProps[propName] : componentProps[propName].default,
            availableValues: component.variations && component.variations[propName] || null,
        }
    })
}
