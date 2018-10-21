<template>
    <div :class="[$style.main, $style[`main_${theme}`], { [$style.main_bounds]: boundsVisible }]">

        <div :style="isEventsListOpen ? { paddingLeft: '370px' } : {}" :class="$style.componentView">
            <component-examples
                :key="component.metaName + Object.keys(filters).sort().join(',')" :use-sync-value="syncValue || component.forceValueSync || false"
                :component="component"
                :class="$style.componentExamples"
                :filters="filters" :show-bounding-boxes="boundsVisible"
                @set-filter="setFilter"
                @unset-filter="unsetFilter"
                @reset-filters="clearFilters"
            />
        </div>

        <div :class="[$style.sidebar, $style.browse]">
            <div :class="$style.logo">
                <img src="https://nbcqbz4aqm-flywheel.netdna-ssl.com/wp-content/themes/celtra/images/celtra-logo.svg" />
            </div>

            <div :class="$style.toggles">
                <checkbox :is-toggle="true" :disabled="component.forceValueSync" v-model="syncValue" :theme="theme" :class="$style.sidebarToggle" size="condensed">Sync model</checkbox>
                <checkbox :is-toggle="true" v-model="boundsVisible" :theme="theme" :class="$style.sidebarToggle" size="condensed">Bounds</checkbox>
                <checkbox :is-toggle="true" v-model="isEventsListOpen" :theme="theme" :class="$style.sidebarToggle" size="condensed">Events</checkbox>
            </div>

            <default-list :items="componentNames.map(name => ({ id: name, label: name }))" :theme="theme" @select="$router.push({ name: 'ComponentPage', params: { component: $event.label, filters: $route.params.filters } })">
                <div slot-scope="{ item }" :class="[$style.sidebarItem, { [$style.sidebarItem_active]: item.id === name }]">
                    {{ item.label }}
                </div>
            </default-list>
        </div>

        <div v-if="isEventsListOpen" :class="[$style.sidebar, $style.events]">
            <default-list :items="events.slice().reverse().map((event, index) => ({ id: index, event: event }))" :theme="theme">
                <div slot-scope="{ item }" :class="$style.sidebarItem" @click="currentEventIndex = item.id">
                    <p v-if="item.event" :class="$style.eventName">{{ item.event.componentName }}/{{ item.event.name }}</p>
                    <div v-if="currentEventIndex === item.id" :class="$style.eventPayload">
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
import ComponentExamples from './ComponentExamples.vue'

export default {
    components: {
        Chip,
        Checkbox,
        Icon,
        DefaultList,
        ComponentExamples,
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
            const list = ['Checkbox', 'Input', 'FileUpload', 'RadioButton', 'Selectbox', 'Slider', 'Chip', 'DialogButton', 'Icon']
            for (const name of Object.values(library).filter(x => x.usecases && !x.hasAbsolutePosition).map(x => x.metaName).sort()) {
                if (!list.includes(name)) {
                    list.push(name)
                }
            }
            return list
        },
        component () {
            if (this.name === null) {
                return null
            }
            return library[this.name]
        },
        theme () {
            return this.filters.theme === 'dark' ? 'dark' : 'light'
        },
    },
    beforeRouteUpdate (to, from, next) {
        this.$nextTick(() => {
            this.setupComponent()
            this.setupFilters()
        })
        next()
    },
    created () {
        this.syncValue = localStorage.getItem('syncValue') === 'true' ? true : false
        this.isEventsListOpen = localStorage.getItem('isEventsListOpen') === 'true' ? true : false
        this.boundsVisible = localStorage.getItem('boundsVisible') === 'true' ? true : false

        const original = Vue.prototype.$emit
        const logEvent = this.logEvent
        const rootUid = this._uid
        Vue.prototype.$emit = function (...args) {
            if (this.$options.parent && this.$options.parent._uid !== rootUid) {
                const componentName = this.$options.name || this.$options._componentTag || 'Root'
                logEvent(kebabCase(componentName), args[0], args.slice(1))
            }

            const res = original.apply(this, args)
            return res
        }
        this.setupComponent()
        this.setupFilters()
    },
    methods: {
        setupComponent () {
            let name = this.$route.params.component
            if (!name) {
                name = this.componentNames[0]
            }

            if (name !== this.name) {
                const component = library[name]
                if (!component) {
                    throw `Component ${name} does not exist!`
                }
                this.name = name
                for (const name in this.filters) {
                    if (!this.component.variations || !this.component.variations[name]) {
                        Vue.delete(this.filters, name)
                        delete this.filters[name]
                        this.updateUrlFilters()
                    }
                }
            }
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
                        if (name === 'usecaseName' || propData) {
                            let newValue = value
                            if (propData && propData.type === Boolean) {
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
        setFilter (name, value) {
            Vue.set(this.filters, name, value)
            this.updateUrlFilters()
        },
        unsetFilter (name) {
            Vue.delete(this.filters, name)
            delete this.filters[name]
            this.updateUrlFilters()
        },
        updateUrlFilters () {
            const value = Object.keys(this.filters).sort().map(name => `${name}=${this.filters[name]}`).join('&')
            this.$router.replace({ name: 'ComponentPage', params: { component: this.name, filters: value || null } })
        },

        clearFilters () {
            this.filters = {}
            this.$router.push({ name: 'ComponentPage', params: { component: this.name } })
        },
    },
}
</script>

<style lang="less">
.bounding-box {
    display: flex;
    border: 1px solid transparent;
}
._15UTCNegfx39jtQolGR6PZ_1 {
    .bounding-box {
        box-sizing: border-box;
        background-color: rgba(33, 150, 234, 0.2);
        border: 1px solid rgba(220, 0, 0, 0.8);
    }
}
</style>

<style lang="less" module>
@dark-theme: #1f1f2c;

.main {
    height: 100%;
    user-select: none;

    &_light {
        background-color: white;
        color: black;
    }

    &_dark {
        background-color: #080808;

        .sidebarItem {
            color: white;
        }
    }

    &_bounds {
        display: block;
    }
}

.componentView {
    padding-left: 170px;
    padding-top: 20px;
    overflow-y: auto;
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    box-sizing: border-box;
    transition: padding-left 500ms ease-out;
    z-index: 100;
}

.componentExamples {
    width: calc(~'100% - 20px');
}

.sidebar {
    position: fixed;
    top: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    z-index: 10;
    background-color: rgba(122, 122, 122, 0.15);
}

.sidebarToggle {
    margin: 0 0 15px 15px;
    height: auto;
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

.sidebarItem {
    padding: 10px 0px;
    font-size: 15px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;

    &_active {
        font-weight: bold;
    }
}

.eventPayload {
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

.toggles {
    margin-bottom: 10px;
    margin-top: 20px;
    padding-bottom: 5px;
    border-bottom: 1px solid rgba(122, 122, 122, 0.2);
}

.logo {
    width: 99%;
    background: linear-gradient(to right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 40%, rgba(0, 0, 0, 0) 100%);
    padding: 12px 0 2px 15px;
    box-sizing: border-box;

    > img {
        width: 70px;
    }
}
</style>
