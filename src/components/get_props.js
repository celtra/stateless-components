export default function () {
    const componentProps = component.props
    const usecases = getFlatUsecases(component)
    const defaultProps = usecases.length > 0 ? usecases[0].data : {}

    // Transparent wrapper components might use props even if they are not explicitly defined
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
            availableValues: null,
        }
    })
}
