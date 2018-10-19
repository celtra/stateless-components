<template>
    <div :class="`main--${theme}`" class="main">
        <div class="header">
            <div class="header-left">
                <icon :style="{ color: showBoundingBox ? 'white' : '#666' }" class="header-icon" name="duplicate-icon" @click="showBoundingBox = !showBoundingBox" />
            </div>
            <div class="props-info">
                <chip v-for="(values, name) in componentVariations" :key="name" :label="name" :metadata="name in filters ? filters[name] + '' : null" :is-active="name in filters" theme="light" class="prop-info" @click="cycleFilter(name)" />
            </div>
        </div>

        <div class="sidebar">
            <div
                v-for="componentName in componentNames"
                :key="componentName"
                class="sidebar-item"
                @click="$router.push({ name: 'ComponentPage', params: { component: componentName } })">
                {{ componentName }}
            </div>
        </div>

        <div class="component-view">
            <component-variations :component="component" :filters="filters" :show-bounding-boxes="showBoundingBox" class="variations" />
        </div>

        <div class="events-view">
            <div v-for="(event, index) in events.slice().reverse()" :key="index" :class="{ 'event-item--active': currentEventIndex === index }" class="event-item" @click="currentEventIndex = index">
                <p class="event-name">{{ event.componentName }}/{{ event.name }}</p>
                <div v-if="currentEventIndex === index" class="event-payload">
                    <template v-if="event.payload.length > 0">
                        <template v-if="typeof event.payload[0] === 'object'">
                            <p v-for="(value, key) in event.payload[0]" :key="key"><b>{{ key }}:</b> {{ value }}</p>
                        </template>
                        <template v-else>
                            {{ event.payload[0] }}
                        </template>
                    </template>
                    <template v-else>
                        <p><b>no data</b></p>
                    </template>
                </div>
            </div>
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
import ComponentVariations from './ComponentVariations.vue'

export default {
    components: {
        Chip,
        Checkbox,
        Icon,
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
            return this.showThemeToggle ? this.isThemeLight ? 'light' : 'dark' : 'light'
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
.main {
    height: 100%;

    &--light {
        background-color: white;
        color: black;
    }

    &--dark {
        background-color: white;
    }
}

.sidebar {
    position: fixed;
    top: 51px;
    height: 100%;
    display: flex;
    flex-direction: column;
    z-index: 10000;
}

.sidebar-item {
    border-bottom: 1px solid rgba(122, 122, 122, 0.1);
    padding: 1px 20px 0 20px;
    font-size: 15px;
    cursor: pointer;
    width: 150px;
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    box-sizing: border-box;

    &:last-child {
        border-bottom: none;
    }

    &:hover {
        background-color: rgba(122, 122, 122, 0.2);
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
    top: 51px;
    overflow-y: auto;
    width: calc(~'100% - 300px');
    height: 100%;
    display: flex;
    flex-flow: column;
    padding: 15px;
    box-sizing: border-box;
}

.props-info {
    display: flex;
    max-width: calc(~'100% - 300px');
    overflow-x: hidden;
    margin-left: 50px;
}

.prop-info {
    margin: 5px;
}

.events-view {
    position: fixed;
    right: 0;
    top: 51px;
    height: 100%;
    width: 150px;
    z-index: 100000;
}

.event-item {
    border-bottom: 1px solid rgba(122, 122, 122, 0.1);
    color: #333;
    font-size: 14px;
    cursor: pointer;
    width: 100%;
    box-sizing: border-box;
    padding: 10px 0;

    &:last-child {
        border-bottom: none;
    }

    &:hover, &--active {
        background-color: rgba(122, 122, 122, 0.2);
    }
}

.event-name {
    font-size: 16px;
    margin: 0;
    padding-left: 20px;
}

.event-payload {
    margin-top: 5px;
    border-top: 1px solid #e7e7e7;
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
