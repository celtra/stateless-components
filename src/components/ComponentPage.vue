<template>
    <div :class="[$style.main, $style[`main_${theme}`], { [$style.main_bounds]: boundsVisible }]">

        <div :class="[$style.componentWrap, { [$style.componentWrap_eventsOpen]: isEventsListOpen }]">
            <div ref="scrollable" :class="$style.componentView">
                <component-examples
                    :key="component.metaName + Object.keys(filters).sort().join(',')"
                    :use-sync-value="syncValue || component.forceValueSync || false"
                    :show-snapshot="showSnapshotImages"
                    :component="component"
                    :class="$style.componentExamples"
                    :filters="filters" :show-bounding-boxes="boundsVisible"
                    @event="logEvent($event)"
                    @filter="applyFilter"
                />
            </div>

            <scrollbar
                :class="$style.scrollbar"
                :theme="theme"
                :container="$refs.scrollable">
            </scrollbar>
        </div>

        <div :class="$style.logo">
            <img src="https://nbcqbz4aqm-flywheel.netdna-ssl.com/wp-content/themes/celtra/images/celtra-logo.svg" />
        </div>

        <div :class="$style.filters">
            <icon :class="$style.clearFilters" name="delete-icon" @click="clearFilters" />
            <chip
                v-for="(values, name) in valuesByName"
                v-if="name !== modelName"
                :is-removable="name in filters"
                :key="name"
                :label="getFilterTitle(name)"
                :is-active="name in filters"
                :theme="filters.theme || 'light'"
                :class="$style.propInfo"
                @click="cycleFilter(name)"
                @remove="removeFilter(name)"
            />
        </div>

        <div :class="[$style.sidebar, $style.browse]">
            <div :class="$style.toggles">
                <checkbox :is-toggle="true" :disabled="component.forceValueSync" v-model="syncValue" :theme="theme" :class="$style.sidebarToggle" size="condensed">Sync model</checkbox>
                <checkbox :is-toggle="true" v-model="boundsVisible" :theme="theme" :class="$style.sidebarToggle" size="condensed">Bounds</checkbox>
                <checkbox :is-toggle="true" v-model="isEventsListOpen" :theme="theme" :class="$style.sidebarToggle" size="condensed">Events</checkbox>
                <checkbox :is-toggle="true" v-model="showSnapshotImages" :theme="theme" :class="$style.sidebarToggle" size="condensed">Visual snapshots</checkbox>
            </div>

            <default-list :items="componentNames.map(name => ({ id: name, label: name }))" :theme="theme" @select="$router.push({ name: 'ComponentPage', params: { component: $event.label, filters: $route.params.filters } })">
                <div slot-scope="{ item }" :class="[$style.sidebarItem, { [$style.sidebarItem_activeTitle]: item.id === name }]">
                    {{ item.label }}
                </div>
            </default-list>
        </div>

        <div v-click-outside="closeOpenEvent" v-if="isEventsListOpen && events.length > 0" :class="[$style.sidebar, $style.events]">
            <!-- <p :class="$style.eventsTitle">Events</p> -->
            <default-list :items="events.slice().reverse()" :theme="theme" @select="openEventIndex = $event.id">
                <div slot-scope="{ item }" :class="[$style.sidebarItem, { [$style.sidebarItem_active]: item.id === openEventIndex }]">
                    <p v-if="item" :class="$style.eventName">{{ item.componentName }}: {{ item.name }}</p>
                    <div v-if="item.id === openEventIndex" :class="$style.eventPayload">
                        <template v-if="item.payload.length > 0">
                            <template v-if="typeof item.payload[0] === 'object'">
                                <pre>{{ JSON.stringify(item.payload[0], null, 2) }}</pre>
                            </template>
                            <template v-else>
                                {{ item.payload[0] }}
                            </template>
                        </template>
                        <template v-else>
                            No data
                        </template>
                    </div>
                </div>
            </default-list>
        </div>
    </div>
</template>

<script>
import { kebabCase } from 'lodash'
import Vue from 'vue'
import '@/stateless/define_helpers'
import * as library from '../library.js'
import Chip from '@/stateless/Chip.vue'
import Checkbox from '@/stateless/checkbox.vue'
import Icon from '@/stateless/icon.vue'
import DefaultList from '@/stateless/DefaultList.vue'
import ComponentExamples from './ComponentExamples.vue'
import Scrollbar from './Scrollbar.vue'
import ComponentConfigurations from '../component_utils.js'

export default {
    components: {
        Chip,
        Checkbox,
        Icon,
        DefaultList,
        ComponentExamples,
        Scrollbar,
    },
    data () {
        return {
            name: null,
            events: [],
            openEventIndex: null,
            showThemeToggle: true,
            showSnapshotImagesData: false,
            isThemeLight: true,
            boundsVisibleData: false,
            filters: {},
            isEventsListOpenData: false,
            syncValueData: false,
            eventCount: 0,
        }
    },
    computed: {
        modelName () {
            return this.component.model && this.component.model.prop || 'value'
        },
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
        showSnapshotImages: {
            get () {
                return this.showSnapshotImagesData
            },
            set (v) {
                localStorage.setItem('showSnapshotImages', v.toString())
                this.showSnapshotImagesData = v
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
        valuesByName () {
            if (!this.component) {
                return {}
            }
            const configurations = new ComponentConfigurations(this.component)
            return configurations.valuesByName
        },
    },
    beforeRouteUpdate (to, from, next) {
        this.$nextTick(() => {
            this.setupComponent(to.params.component)
            this.setupFilters(to.params.filters)
        })
        next()
    },
    created () {
        this.syncValue = localStorage.getItem('syncValue') === 'true' ? true : false
        this.isEventsListOpen = localStorage.getItem('isEventsListOpen') === 'true' ? true : false
        this.boundsVisible = localStorage.getItem('boundsVisible') === 'true' ? true : false
        this.showSnapshotImages = localStorage.getItem('showSnapshotImages') === 'true' ? true : false

        this.setupComponent(this.$route.params.component)
        this.setupFilters(this.$route.params.filters)
    },
    mounted () {
        this.$forceUpdate()
    },
    methods: {
        setupComponent (name) {
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
        setupFilters (filters) {
            const newFilters = {}
            if (filters) {
                const filterValues = filters.split('&')
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
            }
            this.filters = newFilters
        },
        logEvent ({ componentName, eventName, eventPayload }) {
            if (this.openEventIndex !== null) {
                this.openEventIndex ++
            }
            if (eventPayload.length === 0 || !eventPayload[0] || !eventPayload[0].isTrusted) {
                this.events.push({ id: this.eventCount, componentName: componentName, name: `${eventName} #${this.eventCount}`, payload: eventPayload })
                this.eventCount ++

                if (this.events.length > 50) {
                    this.events = this.events.slice(20)
                }
            }
        },
        setFilter (name, value) {

        },
        updateUrlFilters () {
            const value = Object.keys(this.filters).sort().map(name => `${name}=${this.filters[name]}`).join('&')
            this.$router.push({ name: 'ComponentPage', params: { component: this.name, filters: value || null } })
        },
        clearFilters () {
            this.filters = {}
            this.$router.push({ name: 'ComponentPage', params: { component: this.name } })
        },
        closeOpenEvent () {
            this.openEventIndex = null
        },
        getFilterTitle (name) {
            if (name === 'usecaseName') {
                return this.filters.usecaseName ? this.filters.usecaseName.toUpperCase() : 'NAME'
            }
            const configurations = new ComponentConfigurations(this.component)
            return configurations.extractFromConfiguration({ [name]: this.filters[name] }, { addName: true }).name
        },
        cycleFilter (name) {
            const currentValue = this.filters[name]
            const values = this.valuesByName[name]
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
        applyFilter (data) {
            for (const key in data) {
                Vue.set(this.filters, key, data[key])
            }
            this.updateUrlFilters()
        },
    },
}
</script>

<style lang="less">
.default-list__item {
    cursor: pointer;
}

._15UTCNegfx39jtQolGR6PZ_1 {
    .bounding-box {
        background-color: rgba(33, 150, 234, 0.2);
        border: 1px solid rgba(220, 0, 0, 0.8);
    }
}
</style>

<style lang="less" module>
@border-radius: 4px;
@sidebar-start: 65px;

.theme(@a-extreme, @a-median, @b-median, @b-extreme) {
    background-color: @a-extreme;
    color: @b-extreme;

    .sidebar {
        background-color: @a-median;
        color: @b-extreme;
    }

    .sidebarItem {
        color: @b-extreme;
    }

    .filters {
        background-color: @a-median;
    }

    .clearFilters {
        color: @b-extreme;
        &:hover {
            color: @b-median;
        }
    }
}
.main {
    &_light {
        .theme(white, #f2f2f3, #333, black);
    }
    &_dark {
        .theme(black, #1f1f2c, #ccc, white);
    }
}

.main {
    height: 100%;
    user-select: none;

    &_bounds {
        display: block;
    }
}

.componentWrap {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
    position: fixed;
    top: @sidebar-start;
    left: 170px;
    width: calc(~'100% - 170px');

    &_eventsOpen {
        width: calc(~'100% - 370px');
    }
}

.scrollbar {
    right: 0 !important;
}

.componentView {
    overflow-y: hidden;
    height: 100%;
    display: flex;
    flex-flow: column;
    box-sizing: border-box;

    z-index: 100;
    overflow-x: hidden;
}

.componentExamples {
    width: calc(~'100% - 20px');
}

.sidebar {
    position: fixed;
    top: @sidebar-start;
    display: flex;
    flex-direction: column;
    z-index: 10;
    padding-bottom: 6px;
}

.sidebarToggle {
    margin: 0 0 10px 11px;
    height: auto;
}

.browse {
    width: 158px;
    border-radius: 0 @border-radius @border-radius 0;
}

.events {
    padding-top: 6px;
    right: 0px;
    width: 189px;
    background-color: #ddd;
    border-radius: @border-radius 0 0 @border-radius;

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
        transform: translateX(-2px);
        font-weight: bold;
    }
}

.eventPayload {
    margin-top: 5px;
    margin-bottom: 2px;
    width: 100%;
    font-weight: normal;
    background-color: rgba(122, 122, 122, 0.2);
    padding: 6px 10px;
    box-sizing: border-box;

    > p {
        margin: 0;
        font-size: 15px;
    }

    pre {
        overflow: hidden;
        width: 100%;
        font-size: 12px;
        margin: 0;
    }
}

.toggles {
    margin: 0px 0;
    padding-bottom: 0px;
    border-bottom: 1px solid rgba(122, 122, 122, 0.2);
}

.logo {
    width: 80px;
    position: fixed;
    top: 18px;
    left: 12px;

    > img {
        width: 100%;
    }
}

.eventName {
    margin: 0;
    width: 100%;
}

.filters {
    display: flex;
    align-items: center;
    padding: 10px;
    box-sizing: border-box;
    border-radius: @border-radius;
    width: calc(~'100% - 190px');
    position: fixed;
    top: 12px;
    left: 170px;
}

.clearFilters {
    cursor: pointer;
    margin: 0 8px;
}

.propInfo {
    margin-left: 10px;
}
</style>
