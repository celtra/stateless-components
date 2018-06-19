import components from 'src/components'

let data = {}
Object.keys(components).forEach(componentId => {
    data[componentId] = components[componentId].component
})

module.exports = data
