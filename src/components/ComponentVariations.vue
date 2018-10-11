<script>
import '@/stateless/define_helpers'
import * as library from '../library.js'
import { getFlatUsecases } from '../component_utils'

const getModelName = component => component.model && component.model.prop || 'value'
const getModelEvent = component => component.model && component.model.event || 'input'

export default {
    data () {
        return {
            name: null,
            value: null,
        }
    },
    computed: {
        component () {
            if (this.name === null) {
                return null
            }
            return library[this.name]
        },
        usecases () {
            if (this.component === null) {
                return null
            }
            return getFlatUsecases(this.component, [getModelName(this.component)])
        },
    },
    watch: {
        '$route.params.component' (name) {
            this.setupComponent()
        },
    },
    created () {
        this.setupComponent()
    },
    methods: {
        setupComponent () {
            const name = this.$route.params.component
            const component = library[name]
            if (!component) {
                throw `Component ${name} does not exist!`
            }
            const modelName = getModelName(component)
            let defaultValue = component.props && component.props[modelName] && component.props[modelName].default
            if (typeof defaultValue === 'undefined') {
                const type = component.props && component.props[modelName] && component.props[modelName].type
                if (type === Array) {
                    defaultValue = []
                } else if (type === Object) {
                    defaultValue = {}
                } else if (type === String) {
                    defaultValue = ''
                } else {
                    defaultValue = null
                }
            }
            this.value = defaultValue
            this.name = name
        },
        updateValue (value) {
            this.value = value
        },
    },
    render (h) {
        if (!this.component) {
            return h()
        }

        const mapUsecase = usecase => {
            const props = {
                ...usecase.data,
                [getModelName(this.component)]: this.value,
            }

            let slot = usecase.data.slot ? usecase.data.slot.bind(props)(h) : null
            if (typeof slot === 'string') {
                slot = this._v(slot)
            }

            return h(this.component, {
                props: props,
                on: {
                    [getModelEvent(this.component)]: (value) => {
                        this.updateValue(value)
                    },
                },
            }, slot ? [slot] : [])
        }

        const bySize = (usecases, mapChildren) => {
            return [
                h('div', { class: 'size-container' }, [
                    h('h2', 'CONDENSED'),
                    ...mapChildren(usecases.filter(x => x.data.size === 'condensed')),
                ]),
                h('div', { class: 'size-container' }, [
                    h('h2', 'NORMAL'),
                    ...mapChildren(usecases.filter(x => x.data.size === 'normal')),
                ]),
                h('div', { class: 'size-container' }, [
                    h('h2', 'PHAT'),
                    ...mapChildren(usecases.filter(x => x.data.size === 'phat')),
                ]),
            ]
        }

        const byTheme = (usecases, mapChildren) => {
            return [
                h('div', { class: 'theme-container', style: { backgroundColor: '#f2f2f3', color: 'black' } }, mapChildren(usecases.filter(x => x.data.theme === 'light'))),
                h('div', { class: 'theme-container', style: { backgroundColor: '#1f1f2c', color: 'white' } }, mapChildren(usecases.filter(x => x.data.theme === 'dark'))),
            ]
        }

        const mapByTheme = usecases => {
            const mapBySize = usecases => {
                return this.component.props.size ? bySize(usecases, x => x.map(mapUsecase)) : usecases.map(mapUsecase)
            }
            if (this.component.props.theme) {
                return byTheme(usecases, mapBySize)
            } else {
                return mapBySize(usecases)
            }
        }

        const sidebar = h('div', { class: 'sidebar' }, Object.values(library).filter(c => c.name).map(component => {
            return h('div', { class: 'sidebar-item', on: { click: () => {
                this.$router.push({ name: 'ComponentVariations', params: { component: component.name } })
            } } }, component.name)
        }))

        return h('div', { class: 'main' }, [
            sidebar,
            h('div', { style: { display: 'flex', position: 'relative', width: '100%', height: '100%' } }, mapByTheme(this.usecases)),
        ])
    },
}
</script>

<style lang="less" scoped>
.main {
    display: flex;
    height: 100%;
}

.sidebar {
    border-right: 1px solid #ccc;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.sidebar-item {
    background-color: #eee;
    border-bottom: 1px solid #ccc;
    padding: 1px 0 0 20px;
    color: #333;
    font-size: 15px;
    cursor: pointer;
    width: 250px;
    flex: 1 1 auto;
    display: flex;
    align-items: center;

    &:last-child {
        border: none;
    }
}

h2 {
    font-weight: bold;
    font-size: 18px;
    margin: 0;
    margin-bottom: 10px;
    margin-left: 5px;
}

.theme-container {
    width: 50%;
    padding: 20px;
    box-sizing: border-box;
}

.size-container {
    flex: 1;
    padding: 20px;
    border-bottom: 1px solid currentColor;
    box-sizing: border-box;

    &:last-child {
        border-bottom: none;
    }
}
</style>
