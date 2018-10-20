import { kebabCase } from 'lodash'

export function getPropTitle (name, value, addName = false) {
    const kebabName = kebabCase(name)
    if (typeof value === 'boolean') {
        return (value ? kebabName : `not ${kebabName}`).toUpperCase()
    } else if (typeof value === 'undefined') {
        return kebabName.toUpperCase()
    } else {
        return (addName ? `${value} ${kebabName}` : value).toUpperCase()
    }
}
