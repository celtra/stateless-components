<template>
    <div>
        <input class="reform-multilineautocompletebox dialog-multilineautocompletebox mark-non-existent"
               type="text"
               data-placeholder="Type to search..."
               data-close-on-fill="false" />
    </div>
</template>

<script>
import MultilineAutocompleteBox from 'cegli/lib/forms/multilineautocompletecombobox'
import $ from 'jquery'
export default {
    props: {
        options        : { type: Array, required: true },
        selectOptionFn : { type: Function, required: true },
        loadOptionsFn  : { type: Function, required: false },
    },
    mounted () {
        Array.prototype.forEach.call(this.$el.querySelectorAll('.reform-multilineautocompletebox'), (el) => {
            let typeElement = new MultilineAutocompleteBox(el)
            if (this.loadOptionsFn) {
                $(typeElement.select).on('keyup', (e) => {
                    this.onKeyUpEvent(e, typeElement.select)
                })
            }
            $(typeElement.select).trigger('reform.fill', [this.options])
            $(typeElement.select).on('change', (e) => {
                this.selectOption(e.target.value, typeElement.filterValue)
            })
        })
    },
    methods: {
        selectOption (id, name) {
            this.selectOptionFn(id, name)
        },
        onKeyUpEvent (e, el) {
            $(el).trigger('reform.loading.start')
            this.loadOptionsFn(e.target.value).then(() => {
                $(el).trigger('reform.fill', [this.options])
                $(el).trigger('filterChanged')
                $(el).trigger('reform.loading.stop')
            })
        },
    },
}
</script>
