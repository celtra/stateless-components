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

        <component-variations :component="component" class="variations" />
    </div>
</template>

<script>
import '@/stateless/define_helpers'
import * as library from '../library.js'
import ComponentVariations from './ComponentVariations.vue'

export default {
    components: {
        ComponentVariations,
    },
    data () {
        return {
            name: null,
        }
    },
    computed: {
        componentNames () {
            return Object.values(library).map(x => x.name).filter(x => x)
        },
        component () {
            if (this.name === null) {
                return null
            }
            return library[this.name]
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
    width: 249px;
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    box-sizing: border-box;

    &:last-child {
        border: none;
    }
}

.variations {
    margin-left: 250px;
    width: calc(~'100% - 250px');
    height: 100%;
}
</style>
