import components from './components'

var data = {}
Object.keys(components).forEach(componentId => {
    data[componentId] = components[componentId].component
})

export default data
