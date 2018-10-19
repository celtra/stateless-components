<template>
    <div class="main">
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
            <div class="props-info">
                <chip v-for="propInfo in propsInfo" :key="propInfo.name" :label="propInfo.name" :metadata="propInfo.type.name" :is-active="true" theme="light" class="prop-info" />
            </div>
            <component-variations :component="component" class="variations" />
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
import ComponentVariations from './ComponentVariations.vue'

export default {
    components: {
        Chip,
        ComponentVariations,
    },
    data () {
        return {
            name: null,
            events: [],
            currentEventIndex: null,
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
        propsInfo () {
            if (!this.component) {
                return null
            }
            return Object.keys(this.component.props).map(propName => {
                const propData = this.component.props[propName]
                return {
                    name: propName,
                    type: propData.type,
                }
            })
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
    },
}
</script>

<style lang="less" scoped>
.main {
    height: 100%;
}

.sidebar {
    position: fixed;
    border-right: 1px solid #ddd;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.sidebar-item {
    background-color: #eee;
    border-bottom: 1px solid #ddd;
    padding: 1px 0 0 20px;
    color: #333;
    font-size: 15px;
    cursor: pointer;
    width: 249px;
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    box-sizing: border-box;

    &:last-child {
        border: none;
    }

    &:hover {
        background-color: #ddd;
    }
}

.component-view {
    margin-left: 250px;
    width: calc(~'100% - 450px');
    height: 100%;
    display: flex;
    flex-flow: column;
}

.props-info {
    padding: 10px 20px;
    background-color: #f8f8f8;
    // position: fixed;
}

.prop-info {
    margin: 5px;
}

.variations {
    flex: 1;
    // padding-top: 76px;
    // height: calc(100% - 76px);
}

.events-view {
    position: fixed;
    right: 0;
    top: 0;
    border-left: 1px solid #ddd;
    height: 100%;
    width: 199px;
}

.event-item {
    border-bottom: 1px solid #ddd;
    background-color: #eee;
    color: #333;
    font-size: 15px;
    cursor: pointer;
    width: 100%;
    box-sizing: border-box;
    padding: 10px 0;

    &:hover, &--active {
        background-color: #ddd;
    }
}

.event-name {
    font-size: 18px;
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
