import Vue from 'vue'
import Tooltip from '../stateless/Tooltip.vue'

export default {
    beforeCreate () {
        const body = document.getElementsByTagName('body')[0]
        const container = document.createElement('div')
        body.appendChild(container)

        this._tooltipVm = new Vue({
            el: container,
            data () {
                return {
                    target: null,
                    text: null,
                    title: null,
                }
            },
            mounted () {
                const tooltipElement = this.$children[0].$el
                tooltipElement.style.top = tooltipElement.style.left = '0'
                this.intervalId = setInterval(this.updatePosition, 100)
            },
            beforeDestroy () {
                clearInterval(this.intervalId)
            },
            methods: {
                updatePosition () {
                    if (this.target && !document.body.contains(this.target)) {
                        this.target = null
                    }

                    if (this.target) {
                        const tooltipElement = this.$children[0].$el
                        const targetRect = this.target.getBoundingClientRect()

                        tooltipElement.style.transform = `translate(${targetRect.left}px, ${targetRect.bottom}px)`
                    }
                },
            },
            render (h) {
                const props = {
                    isRelative: false,
                    title: this.title,
                    show: !!this.target,
                }
                return h(Tooltip, { props }, [this._v(this.text || '')])
            },
        })
    },
    methods: {
        showTooltip (element, text, title = null) {
            this._tooltipVm.canShowTooltip = true
            this.$nextTick(() => {
                if (this._tooltipVm.canShowTooltip) {
                    this._tooltipVm.text = text
                    this._tooltipVm.title = title
                    this._tooltipVm.target = element
                    this._tooltipVm.updatePosition()
                }
            })
        },
        hideTooltip () {
            this._tooltipVm.target = null
            this._tooltipVm.canShowTooltip = false
        },
    },
}
