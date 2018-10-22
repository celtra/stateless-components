<template>
    <div :class="[$style.main, $style[`main_${theme}`], { [$style.main_bounds]: boundsVisible }]">
        <div :class="[$style.componentView, { [$style.componentView_eventsOpen]: isEventsListOpen }]">
            <component-examples
                :key="component.metaName + Object.keys(filters).sort().join(',')"
                :use-sync-value="syncValue || component.forceValueSync || false"
                :component="component"
                :class="$style.componentExamples"
                :filters="filters" :show-bounding-boxes="boundsVisible"
                @set-filter="setFilter"
                @unset-filter="unsetFilter"
                @reset-filters="clearFilters"
                @event="logEvent($event)"
            />
        </div>

        <div v-click-outside="closeOpenEvent" v-if="isEventsListOpen" :class="[$style.sidebar, $style.events]">
            <p :class="$style.eventsTitle">Events</p>
            <default-list :items="events.slice().reverse().map((event, index) => ({ id: index, event: event }))" :theme="theme" @select="openEventIndex = $event.id">
                <div slot-scope="{ item }" :class="[$style.sidebarItem, { [$style.sidebarItem_active]: item.id === openEventIndex }]">
                    <p v-if="item.event" :class="$style.eventName">{{ item.event.componentName }}/{{ item.event.name }}</p>
                    <div v-if="item.id === openEventIndex" :class="$style.eventPayload">
                        <template v-if="item.event.payload.length > 0">
                            <template v-if="typeof item.event.payload[0] === 'object'">
                                <pre>{{ JSON.stringify(item.event.payload[0], null, 2) }}</pre>
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
                <div slot-scope="{ item }" :class="[$style.sidebarItem, { [$style.sidebarItem_activeTitle]: item.id === name }]">
                    {{ item.label }}
                </div>
            </default-list>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
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
            openEventIndex: null,
            showThemeToggle: true,
            isThemeLight: true,
            boundsVisibleData: false,
            filters: {},
            isEventsListOpenData: false,
            syncValueData: false,
            eventCount: 0,
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
        logEvent ({ componentName, eventName, eventPayload }) {
            if (this.openEventIndex !== null) {
                this.openEventIndex ++
            }
            if (eventPayload.length === 0 || !eventPayload[0] || !eventPayload[0].isTrusted) {
                this.events.push({ componentName: `#${this.eventCount} ${componentName}`, name: eventName, payload: eventPayload })
                this.eventCount ++

                if (this.events.length > 50) {
                    this.events = this.events.slice(20)
                }
            }
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
        closeOpenEvent () {
            this.openEventIndex = null
        },
    },
}
</script>

<style lang="less">
.bounding-box {
    display: flex;
    border: 1px solid transparent;
}

.default-list__item {
    cursor: pointer;
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

        .sidebar {
            color: black;
            background-color: #eee;
        }
    }

    &_dark {
        background-color: #080808;

        .sidebarItem {
            color: white;
        }

        .sidebar {
            color: white;
            background-color: #111;
        }
    }

    &_bounds {
        display: block;
    }
}

.componentView {
    padding-left: 170px;
    padding-right: 0;
    overflow-y: auto;
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    box-sizing: border-box;
    transition: padding-right 500ms ease-out;
    z-index: 100;
    overflow-x: hidden;

    &_eventsOpen {
        padding-right: 200px;
    }
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

}

.sidebarToggle {
    margin: 0 0 15px 15px;
    height: auto;
}

.browse {
    width: 150px;
}

.events {
    padding-top: 20px;
    right: 0px;
    top: 0px;
    animation: fadeIn 350ms ease-in;
    animation-delay: 200ms;
    animation-fill-mode: forwards;
    opacity: 0;
    width: 200px;

    .sidebarItem {
        width: 100%;
    }
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

.eventsTitle {
    font-size: 20px;
    margin: 0;
    margin-left: 15px;
    margin-bottom: 10px;
}

.sidebarItem {
    padding: 10px 0px;
    font-size: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: transform 80ms ease-out;

    &_activeTitle {
        transform: translateX(4px);
        font-weight: bold;
    }
}

.eventPayload {
    margin-top: 5px;
    margin-bottom: 2px;
    width: 100%;
    font-weight: normal;

    > p {
        margin: 0;
        font-size: 15px;

        > b {
            text-transform: uppercase;
            font-size: 12px;
        }
    }

    pre {
        overflow: hidden;
        width: 100%;
        font-size: 12px;
        margin: 0;
    }
}

.toggles {
    margin: 10px 0;
    padding-bottom: 5px;
    border-bottom: 1px solid rgba(122, 122, 122, 0.2);
}

.logo {
    width: 100%;
    background: linear-gradient(to right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 40%, rgba(50, 50, 50, 0.25) 100%);
    padding: 12px 0 2px 15px;
    box-sizing: border-box;

    > img {
        width: 70px;
    }
}

.eventName {
    margin: 0;
    width: 100%;
}
</style>
