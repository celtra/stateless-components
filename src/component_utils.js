const flatVariations = (variations) => {
    let flat = [{}]

    for (let key of Object.keys(variations).sort((a, b) => a.localeCompare(b))) {
        let newFlat = []
        for (let value of variations[key]) {
            newFlat = newFlat.concat(flat.map(item => {
                return { ...item, [key]: value }
            }))
        }
        flat = newFlat
    }

    return flat
}

export function getFlatUsecases (component) {
    let usecases = []
    if (component.usecases) {
        const variations = component.variations ? flatVariations(component.variations || []) : [{}]
        for (let variation of variations) {
            for (let usecase of component.usecases) {
                usecases.push({ ...variation, ...usecase })
            }
        }
    }
    return usecases
}

export function getProps (component) {
    let componentProps = component.props
    const usecases = getFlatUsecases(component)
    let defaultProps = usecases.length > 0 ? usecases[0] : {}

    let allProps = {}
    for (let key in componentProps)
        allProps[key] = true
    for (let key in defaultProps)
        allProps[key] = true
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
