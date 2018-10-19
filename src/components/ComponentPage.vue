<template>
    <div :class="`main--${theme}`" class="main">
        <div class="header">
            <checkbox :is-toggle="true" v-model="showBoundingBox" :theme="theme" style="margin-top: 0; height: auto;">Bounds</checkbox>
            <checkbox :is-toggle="true" v-model="isEventsListOpen" :theme="theme" style="margin-left: 15px; margin-top: 0; height: auto;">Events</checkbox>
            <div class="props-info">
                <chip v-for="(values, name) in componentVariations" :key="name" :label="name" :metadata="name in filters ? filters[name] + '' : null" :is-active="name in filters" :theme="theme" class="prop-info" @click="cycleFilter(name)" />
            </div>
        </div>

        <div class="sidebar browse">
            <default-list :items="componentNames.map(name => ({ id: name, label: name }))" :theme="theme" @select="$router.push({ name: 'ComponentPage', params: { component: $event.label } })">
                <div slot-scope="{ item }" class="sidebar-item">
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

        <div :style="isEventsListOpen ? { left: '360px', width: 'calc(100% - 360px)' } : {}" class="component-view">
            <component-variations :component="component" :filters="filters" :show-bounding-boxes="showBoundingBox" class="variations" />
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
            showBoundingBox: false,
            filters: {},
            isEventsListOpen: false,
        }
    },
    computed: {
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
            return this.component && this.component.variations || {}
        },
        theme () {
            return this.filters.theme === 'dark' ? 'dark' : 'light'
        },
    },
    watch: {
        '$route.params.component' (name) {
            this.setupComponent()
        },
    },
    created () {
        const original = Vue.prototype.$emit
        const logEvent = this.logEvent
        Vue.prototype.$emit = function (...args) {
            const componentName = this.$options.name || this.$options._componentTag || 'Root'
            const res = original.apply(this, args)
            logEvent(kebabCase(componentName), args[0], args.slice(1))
            return res
        }
        this.setupComponent()
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
            const newIndex = (currentIndex + 1) % (values.length + 1)
            if (newIndex >= values.length) {
                Vue.delete(this.filters, name)
                delete this.filters[name]
            } else {
                Vue.set(this.filters, name, values[newIndex])
            }
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

    }

    &--dark {
        background-color: @dark-theme;

        .header {
            color: black;
        }

        .sidebar-item {
            color: white;
        }
    }
}

.header {
    display: flex;
    align-items: center;
    padding: 0 20px;
    width: 100%;

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
    position: fixed;
    left: 150px;
    top: 70px;
    overflow-y: auto;
    width: calc(~'100% - 150px');
    height: 100%;
    display: flex;
    flex-flow: column;
    padding-left: 15px;
    box-sizing: border-box;
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
    z-index: 10000;
}

.browse {
    width: 150px;
}

.events {
    left: 150px;
    width: 200px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-width: 1px 1px 0 1px;
    border-radius: 5px;
    margin-left: 5px;
}

.sidebar-item {
    padding: 10px 0px;
    font-size: 15px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
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
