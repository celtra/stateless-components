<template>
    <div :class="`main--${theme}`" class="main">
        <div class="header">
            <checkbox :is-toggle="true" v-model="boundsVisible" :theme="theme" style="margin-top: 0; height: auto;">Bounds</checkbox>
            <checkbox :is-toggle="true" v-model="isEventsListOpen" :theme="theme" style="margin-left: 15px; margin-top: 0; height: auto;">Events</checkbox>
            <checkbox :is-toggle="true" :disabled="component.forceValueSync" v-model="syncValue" :theme="theme" style="margin-left: 15px; margin-top: 0; height: auto;">Sync model</checkbox>
            <div class="props-info">
                <chip
                    v-for="(values, name) in componentVariations"
                    v-if="name !== 'value'"
                    :is-removable="name in filters"
                    :key="name" :label="kebabCase(name).toUpperCase()" :metadata="name in filters ? filters[name] + '' : null"
                    :is-active="name in filters"
                    :theme="theme"
                    class="prop-info"
                    @click="cycleFilter(name)"
                    @remove="removeFilter(name)"
                />
            </div>
        </div>

        <div :style="isEventsListOpen ? { paddingLeft: '370px' } : {}" class="component-view">
            <component-variations :use-sync-value="syncValue || component.forceValueSync || false" :component="component" :filters="filters" :show-bounding-boxes="boundsVisible" />
        </div>

        <div class="sidebar browse">
            <default-list :items="componentNames.map(name => ({ id: name, label: name }))" :theme="theme" @select="$router.push({ name: 'ComponentPage', params: { component: $event.label } })">
                <div slot-scope="{ item }" :class="{ 'sidebar-item--active': item.id === name }" class="sidebar-item">
                    {{ item.label }}
                </div>
            </default-list>
        </div>

        <div v-if="isEventsListOpen" class="sidebar events">
            <default-list :items="events.slice().reverse().map((event, index) => ({ id: index, event: event }))" :theme="theme">
                <div slot-scope="{ item }" class="sidebar-item" @click="currentEventIndex = item.id">
                    <p v-if="item.event" class="event-name">{{ item.event.componentName }}/{{ item.event.name }}</p>
                    <div v-if="currentEventIndex === item.id" class="event-payload">
                        <template v-if="item.event.payload.length > 0">
                            <template v-if="typeof item.event.payload[0] === 'object'">
                                <p v-for="(value, key) in item.event.payload[0]" :key="key"><b>{{ key }}:</b> {{ value }}</p>
                            </template>
                            <template v-else>
                                {{ item.event.payload[0] }}
                            </template>
                        </template>
                        <template v-else>
                            <p><b>no data</b></p>
                        </template>
                    </div>
                </div>
            </default-list>
        </div>

    </div>
</template>

<script>
import Vue from 'vue'
import { kebabCase } from 'lodash'
import '@/stateless/define_helpers'
import * as library from '../library.js'
import Chip from '@/stateless/Chip.vue'
import Checkbox from '@/stateless/checkbox.vue'
import Icon from '@/stateless/icon.vue'
import DefaultList from '@/stateless/DefaultList.vue'
import ComponentVariations from './ComponentVariations.vue'

export default {
    components: {
        Chip,
        Checkbox,
        Icon,
        DefaultList,
        ComponentVariations,
    },
    data () {
        return {
            name: null,
            events: [],
            currentEventIndex: null,
            showThemeToggle: true,
            isThemeLight: true,
            boundsVisibleData: false,
            filters: {},
            isEventsListOpenData: false,
            syncValueData: false,
        }
    },
    computed: {
        syncValue: {
            get () {
                return this.component && this.component.forceValueSync || this.syncValueData
            },
            set (v) {
                localStorage.setItem('syncValue', v.toString())
                this.syncValueData = v
            },
        },
        boundsVisible: {
            get () {
                return this.boundsVisibleData
            },
            set (v) {
                localStorage.setItem('boundsVisible', v.toString())
                this.boundsVisibleData = v
            },
        },
        isEventsListOpen: {
            get () {
                return this.isEventsListOpenData
            },
            set (v) {
                localStorage.setItem('isEventsListOpen', v.toString())
                this.isEventsListOpenData = v
            },
        },
        componentNames () {
            return Object.values(library).filter(x => x.usecases && !x.hasAbsolutePosition).map(x => x.metaName).sort()
        },
        component () {
            if (this.name === null) {
                return null
            }
            return library[this.name]
        },
        componentVariations () {
            const variations = this.component && { ...this.component.variations } || {}
            if (this.component.usecases[0].name) {
                variations.name = this.component.usecases.map(usecase => usecase.name)
            }
            return variations
        },
        theme () {
            return this.filters.theme === 'dark' ? 'dark' : 'light'
        },
    },
    watch: {
        '$route.params.component' (name) {
            this.setupComponent()
        },
        '$route.params.filters' (value) {
            this.setupFilters()
        },
    },
    created () {
        this.syncValue = localStorage.getItem('syncValue') === 'true' ? true : false
        this.isEventsListOpen = localStorage.getItem('isEventsListOpen') === 'true' ? true : false
        this.boundsVisible = localStorage.getItem('boundsVisible') === 'true' ? true : false

        this.kebabCase = kebabCase
        const original = Vue.prototype.$emit
        const logEvent = this.logEvent
        Vue.prototype.$emit = function (...args) {
            const componentName = this.$options.name || this.$options._componentTag || 'Root'
            const res = original.apply(this, args)
            logEvent(kebabCase(componentName), args[0], args.slice(1))
            return res
        }
        this.setupComponent()
        this.setupFilters()
    },
    methods: {
        setupComponent () {
            const name = this.$route.params.component
            const component = library[name]
            if (!component) {
                throw `Component ${name} does not exist!`
            }
            this.name = name
        },
        setupFilters () {
            if (this.$route.params.filters) {
                const newFilters = {}
                const filterValues = this.$route.params.filters.split('&')
                for (const filterValue of filterValues) {
                    const parts = filterValue.split('=')
                    if (parts.length === 2) {
                        const name = parts[0], value = parts[1]
                        const propData = this.component.props[name]
                        if (propData) {
                            let newValue = value
                            if (propData.type === Boolean) {
                                newValue = value === 'true'
                            }
                            newFilters[name] = newValue
                        }
                    }
                }
                this.filters = newFilters
            }
        },
        logEvent (componentName, eventName, payload) {
            if (this.currentEventIndex !== null) {
                this.currentEventIndex ++
            }
            this.events.push({ componentName: componentName, name: eventName, payload: payload })
        },
        cycleFilter (name) {
            const currentValue = this.filters[name]
            const values = this.componentVariations[name]
            const currentIndex = values.indexOf(currentValue)
            const newIndex = (currentIndex + 1) % values.length
            Vue.set(this.filters, name, values[newIndex])
            this.updateUrlFilters()
        },
        removeFilter (name) {
            Vue.delete(this.filters, name)
            delete this.filters[name]
            this.updateUrlFilters()
        },
        updateUrlFilters () {
            const value = Object.keys(this.filters).sort().map(name => `${name}=${this.filters[name]}`).join('&')
            this.$router.replace({ name: 'ComponentPage', params: { component: this.name, filters: value || null } })
        },
    },
}
</script>

<style lang="less" scoped>
@dark-theme: #1f1f2c;

.main {
    height: 100%;

    &--light {
        background-color: white;
        color: black;

        .header {
            background-color: white;
        }
    }

    &--dark {
        background-color: @dark-theme;

        .header {
            color: black;
            background-color: @dark-theme;
        }

        .sidebar-item {
            color: white;
        }
    }
}

.header {
    display: flex;
    align-items: center;
    padding-left: 20px;
    box-sizing: border-box;
    width: calc(~'100% - 20px');

    user-select: none;
    height: 50px;
    position: fixed;
    top: 0;
    left: 0;
    border-bottom: 1px solid rgba(122, 122, 122, 0.1);

    .theme-toggle {
        margin-top: 0;
        margin-left: 50px;
    }

    .header-icon {
        cursor: pointer;
    }

    .view-toggle {
        font-size: 14px;
        margin-left: 10px;
        cursor: pointer;
    }

    .header-left {
        display: flex;
        align-items: center;
    }
}

.component-view {
    padding-left: 155px;
    padding-top: 70px;
    overflow-y: auto;
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    box-sizing: border-box;
    transition: padding-left 500ms ease-out;
    z-index: 100;
    user-select: none;
}

.props-info {
    display: flex;
    overflow-x: hidden;
    margin-left: 10px;
}

.prop-info {
    margin: 5px;
}

.sidebar {
    position: fixed;
    top: 70px;
    height: 100%;
    display: flex;
    flex-direction: column;
    z-index: 10;
}

.browse {
    width: 150px;
}

.events {
    left: 150px;
    top: 50px;
    width: 200px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-width: 0 1px;
    animation: fadeIn 500ms linear;
    animation-fill-mode: forwards;
    opacity: 0;
    animation-delay: 300ms;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

.sidebar-item {
    padding: 10px 0px;
    font-size: 15px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;

    &--active {
        font-weight: bold;
    }
}

.event-payload {
    margin-top: 5px;
    padding-left: 20px;
    padding-top: 5px;

    > p {
        margin: 0;
        font-size: 15px;

        > b {
            text-transform: uppercase;
            font-size: 12px;
        }
    }
}
</style>
