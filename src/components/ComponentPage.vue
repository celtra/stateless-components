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
    </div>
</template>

<script>
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
        }
    },
    computed: {
        componentNames () {
            return Object.values(library).filter(x => x.name && !x.hasAbsolutePosition).map(x => x.name).sort()
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
    width: calc(~'100% - 250px');
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
</style>
