<template>
    <div :class="['selectbox--' + size, 'selectbox--' + theme]" :title="disabledText" :id="label | slugify" class="selectbox" tabindex="0" @focus="setFocus()" @blur="clearFocus()"
         @keyup.esc.stop="handleEsc" @keyup.up="move(-1)" @keyup.down="move(1)" @keyup.enter="selectActiveOption" @keyup.left.stop @keyup.right.stop @keyup.delete.stop>

        <div :class="cssStates | prefix('selectbox__label-text--')" class="selectbox__label-text">
            {{ mappedLabelText }}
        </div>

        <div :class="cssStates | prefix('selectbox__select-row--')" class="selectbox__select-row" @click="openSelectList()">
            <div class="selectbox__selected-text">
                <div :class="cssStates | prefix('selectbox__label--')" :style="selectedMetadataText && showSelectedMetadata ? { width: '70%' } : { width: '100%' }" :title="states.disabled ? mappedDisabledText : selectedLabelText" class="selectbox__label">
                    {{ selectedLabelText }}
                </div>

                <div v-if="selectedMetadataText" :title="selectedMetadataText"
                     class="selectbox__metadata">
                    {{ selectedMetadataText }}
                </div>
            </div>
            <div class="selectbox__arrow-wrapper">
                <div :class="cssStates | prefix('selectbox__arrow-down--')" class="selectbox__arrow-down"></div>
            </div>
        </div>

        <div :class="cssStates | prefix('selectbox__helper-text--')" class="selectbox__helper-text">
            {{ mappedHelperText }}
        </div>

        <div v-click-outside="closeSelectList" v-if="isOpen" :class="{ 'with-search': isSearchable }"
             class="selectbox__select-list">
            <div class="selectbox__list-frame"></div>
            <div class="selectbox__list-content">
                <div v-if="isSearchable" class="selectbox__search-wrapper">
                    <div class="selectbox__search-icon-wrapper">
                        <img class="selectbox__icon" src="/img/icons/search.svg"/>
                    </div>

                    <div class="selectbox__input-field">
                        <div class="selectbox__label">Search</div>
                        <div class="selectbox__input-row">
                            <input v-model="searchText" class="selectbox__text" type="text" @input="setSearch"/>
                            <img class="selectbox__clear-icon" src="/img/icons/clear.svg" @click="clearSearch"/>
                        </div>
                    </div>
                </div>

                <div :class="cssStates | prefix('selectbox__options-wrapper--')" class="selectbox__options-wrapper">
                    <div v-if="isUnselectable" :class="cssStates | prefix('selectbox__option--')" class="selectbox__option"
                         @click="selectOption(null)">
                        <div class="selectbox__label">
                            {{ placeholder }}
                        </div>
                    </div>
                    <template v-for="(group, groupIndex) in filteredGroups">
                        <div v-if="group.label" :key="groupIndex" :class="cssStates | prefix('selectbox__group--')" class="selectbox__group">
                            {{ group.label.toUpperCase() }}
                        </div>

                        <div v-for="option in group.options" :data-option-id="option.id" :class="getOptionCssStates(option) | prefix('selectbox__option--')"
                             :key="option.id" class="selectbox__option" @click="selectOption(option.id)">
                            <div :class="getOptionCssStates(option) | prefix('selectbox__label--')" :title="option.label" class="selectbox__label">
                                {{ option.label }}
                            </div>

                            <div v-if="option.metadata" :title="option.metadata" class="selectbox__metadata">
                                {{ option.metadata }}
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import _ from 'lodash'

export default {
    props: {
        label: { type: String, required: false, default: '' },
        placeholder: { type: String, required: false, default: 'Please select' },
        disabled: { type: Boolean, default: false },
        helperText: { type: String, required: false, default: '' },
        disabledText: { type: String, required: false, default: '' },
        errorText: { type: String, required: false, default: '' },
        warningText: { type: String, required: false, default: '' },
        groups: { type: Array, required: true },
        value: { type: String, required: false, default: '' },
        isSearchable: { type: Boolean, required: false, default: false },
        isUnselectable: { type: Boolean, required: false, default: false },
        showSelectedMetadata: { type: Boolean, required: false, default: false },
        size: { type: String, required: false, default: 'normal' },
        theme: { type: String, required: false, default: 'dark' },
    },
    data () {
        return {
            isOpen: false,
            searchText: '',
            searchTextDebounced: '',
            activeId: null,
            selectedId: this.value,
            focused: false,
        }
    },
    computed: {
        states () {
            return {
                error: !!this.errorText,
                warning: !!this.warningText,
                disabled: this.disabled,
                selected: this.selectedId !== null,
                focused: this.focused,
            }
        },
        cssStates () {
            return {
                ...this.states,
                'with-metadata': this.selectedMetadataText !== '',
                'with-search': this.isSearchable,
            }
        },
        mappedLabelText () {
            return this.label
        },
        selected () {
            let found = this.filteredOptions.filter(o => o.id == this.selectedId)
            return found.length > 0 ? found[0] : null
        },
        selectedLabelText () {
            return this.selected ? this.selected.label : this.placeholder
        },
        selectedMetadataText () {
            return this.showSelectedMetadata && this.selected ? this.selected.metadata : ''
        },
        mappedHelperText () {
            if (this.errorText) {
                return this.errorText
            } else if (this.warningText) {
                return this.warningText
            } else {
                return this.helperText ? this.helperText : ''
            }
        },
        mappedDisabledText () {
            return this.disabled ? this.disabledText : ''
        },
        filteredGroups () {
            let filtered = []

            for (let i = 0; i < this.groups.length; i++) {
                let group = this.groups[i]
                let filteredOptions = []
                for (let j = 0; j < group.options.length; j++) {
                    let option = group.options[j]
                    if (option.label.toLowerCase().indexOf(this.searchTextDebounced.toLowerCase()) > -1) {
                        filteredOptions.push(option)
                    }
                }
                if (filteredOptions.length > 0) {
                    filtered.push({ label: group.label, options: filteredOptions })
                }
            }

            return filtered
        },
        filteredOptions () {
            return this.filteredGroups
                .map((group) => group.options)
                .reduce((a, b) => a.concat(b), [])
                .filter((option) => !option.disabled)
        },
        heights () {
            let labelHeight = 13
            let border = 2
            let margin = 15
            let groupHeight = 30
            let optionHeight = 30
            let searchHeight = 38
            if (this.size === 'condensed') {
                border = 1
                margin = 10
                optionHeight = 20
                searchHeight = 33
            } else if (this.size === 'phat') {
                labelHeight = 21
                optionHeight = 45
                searchHeight = 46
            }

            return {
                border: border,
                margin: margin,
                label: labelHeight,
                group: groupHeight,
                option: optionHeight,
                search: searchHeight,
            }
        },
    },
    mounted () {
        this.$nextTick(() => {
            window.addEventListener('resize', () => this.positionSelectList())
        })
    },
    beforeDestroy () {
        window.removeEventListener('resize', () => this.positionSelectList())
    },
    methods: {
        setFocus () {
            this.focused = true
            this.$root.$emit('tracking-event', { type: 'input', label: this.$attrs.trackName || this.label, trigger: 'focus' })
            this.$emit('focus')
        },
        clearFocus () {
            this.focused = false
        },
        handleEsc () {
            let wasOpen = this.isOpen

            this.closeSelectList()

            if (wasOpen) {
                this.$el.focus()
            } else {
                this.$el.blur()
                this.clearFocus()
            }
        },
        openSelectList () {
            if (this.disabled) {
                return
            }

            this.isOpen = true

            if (!this.focused) {
                this.$emit('focus')
            }

            this.$nextTick(() => {
                if (this.isSearchable) {
                    this.clearSearch()
                    this.$el.getElementsByClassName('selectbox__text')[0].focus()
                }

                this.positionSelectList()
            })
        },
        closeSelectList () {
            this.focused = true
            this.isOpen = false
            this.activeId = null

            this.$el.focus()
        },
        positionSelectList () {
            if (this.isOpen) {
                let selectBox = this.$el
                let selectList = this.$el.querySelector('.selectbox__select-list')
                let optionsWrapper = this.$el.querySelector('.selectbox__options-wrapper')
                let offsetTop = selectBox.getBoundingClientRect().top + document.documentElement.scrollTop

                let numGroupsBefore = 0
                let numOptionsBefore = 0
                if (this.selectedId) {
                    for (let group of this.groups) {
                        if (group.label) {
                            numGroupsBefore++
                        }

                        for (let option of group.options) {
                            if (option.id === this.selectedId) {
                                break
                            }
                            numOptionsBefore++
                        }
                    }
                }

                let { position, scroll } = this.calculateOffset(numGroupsBefore, numOptionsBefore, offsetTop, selectList.clientHeight, optionsWrapper.scrollHeight, document.documentElement.clientHeight)

                optionsWrapper.scrollTop = scroll
                selectList.style.top = `${-position}px`
            }
        },
        calculateOffset (numGroupsBefore, numOptionsBefore, offsetTop, selectListHeight, scrollHeight, screenHeight) {
            let heights = this.heights

            let top = heights.margin - heights.label + (heights.border / 2)
            top += heights.group * numGroupsBefore + heights.option * numOptionsBefore
            if (this.selectedId && this.isUnselectable) {
                top += heights.option
            }

            let scrollTop
            if (top < selectListHeight / 2) {
                scrollTop = 0
            } else if (top > scrollHeight - (selectListHeight / 2)) {
                scrollTop = scrollHeight - selectListHeight
                top = selectListHeight - (scrollHeight - top)
            } else {
                scrollTop = (selectListHeight / 2) + (top - selectListHeight)
                top = selectListHeight / 2
            }

            if (this.selectedId && top > offsetTop - (heights.option / 2)) {
                top = offsetTop - (heights.option / 2)
            } else if (offsetTop + selectListHeight - top > screenHeight - (heights.option / 2)) {
                top = offsetTop + selectListHeight - screenHeight + (heights.option / 2)
            }

            // if selectbox has search input, we have to position it further up
            if (this.isSearchable) {
                if (this.selectedId) {
                    top += heights.search + heights.margin + heights.border
                } else {
                    // to align selectbox search line with input line
                    top += 12
                }
            }

            return {
                position: top,
                scroll: scrollTop,
            }
        },
        selectOption (optionId) {
            if (optionId) {
                let option = this.filteredOptions.find(o => o.id == optionId)
                if (option && !option.disabled) {
                    this.selectedId = optionId
                    this.$emit('input', optionId)
                    this.closeSelectList()
                }
            } else {
                this.selectedId = null
                this.$emit('input', null)
                this.closeSelectList()
            }
        },
        setSearch: _.debounce(function () {
            this.searchTextDebounced = this.searchText
        }, 400),
        clearSearch () {
            this.searchText = ''
            this.searchTextDebounced = ''
        },
        scrollIntoView (selectedId) {
            let optionsWrapper = this.$el.querySelector('.selectbox__options-wrapper')
            let optionsBoundingClientRect = optionsWrapper.getBoundingClientRect()
            let elemBoundingClientRect = this.$el.querySelector(`[data-option-id="${selectedId}"]`).getBoundingClientRect()

            let offsetTop = elemBoundingClientRect.top - optionsBoundingClientRect.top - optionsBoundingClientRect.height
            let offsetBottom = optionsBoundingClientRect.height - (optionsBoundingClientRect.bottom - elemBoundingClientRect.bottom)

            if (offsetTop + elemBoundingClientRect.height > 0) {
                optionsWrapper.scrollTop += offsetTop + elemBoundingClientRect.height
            } else if (offsetBottom - elemBoundingClientRect.height < 0) {
                optionsWrapper.scrollTop += offsetBottom - elemBoundingClientRect.height
            }
        },
        move (direction) {
            if (!this.isOpen)
                this.openSelectList()

            if (this.activeId === null) {
                this.activeId = this.selectedId
            }

            if (this.filteredOptions.length === 0){
                return // Empty list
            }

            let activeIndex = this.filteredOptions.indexOf(this.filteredOptions.find(o => o.id === this.activeId))
            activeIndex += direction
            activeIndex = Math.max(0, Math.min(this.filteredOptions.length - 1, activeIndex))

            this.activeId = this.filteredOptions[activeIndex].id
            this.$nextTick(() => {
                this.scrollIntoView(this.activeId)
            })
        },
        getOptionCssStates (option) {
            return {
                ...this.cssStates,
                'disabled': option.disabled,
                'is-selected': option.id === this.activeId,
                'selected': option.id === this.selectedId,
                'with-metadata': option.metadata !== '',
            }
        },
        selectActiveOption () {
            if (!this.isOpen)
                this.openSelectList()

            if (this.activeId) {
                this.selectOption(this.activeId)
                this.closeSelectList()
            }
        },
    },
}
</script>

<style lang="less" scoped>
@import (reference) './variables';

* {
    box-sizing: border-box;
}

.selectbox {
    position: relative;
    width: 100%;
    font-family: @regular-text-font;
    outline: none;

    &__label-text {
        height: 13px;
        display: flex;
        align-items: center;
        font-size: 11px;
        letter-spacing: 0.5px;
        color: @dolphin;

        &--focused { color: @royal-blue; }

        &--disabled { color: @gunpowder; }
    }

    &__helper-text {
        height: 17px;
        display: flex;
        align-items: flex-end;
        font-size: 11px;
        letter-spacing: 0.5px;
        color: @dolphin;

        &--error { color: @pink-red; }
        &--warning { color: @pale-yellow; }
        &--disabled { color: @gunpowder; }
    }

    &__arrow-wrapper {
        width: 16px;
        height: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    &__arrow-down {
        border-width: 5px 6px 0 6px;
        border-style: solid;
        transition: border-color @form-element-transition-time ease-out;
        border-color: @very-light-gray transparent transparent transparent;

        &--disabled {
            border-style: dashed;
            border-top-color: @gunpowder;
        }
    }

    &__selected-text {
        width: 94%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .selectbox__label {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 18px;
            font-family: @regular-text-font;
            transition: color @form-element-transition-time ease-out;
            color: @very-light-gray;

            &--error { color: @pink-red; }

            &--with-metadata { padding-right: 5px; }

            &--selected { color: @white; }
            &--disabled { color: @gunpowder; }

            &:hover { color: @white; }
        }

        .selectbox__metadata {
            padding-right: 8px;
            width: 30%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            text-align: right;
            font-size: 12px;
            font-family: @regular-text-font;
            color: @gray-blue;

            &.disabled { color: @gunpowder; }
        }
    }

    &__select-row {
        height: 30px;
        display: flex;
        align-items: center;
        border-width: 0 0 2px 0;
        border-style: solid;
        cursor: pointer;
        transition: border-color @form-element-transition-time ease-out;
        border-color: @gunpowder;

        &:hover:not(&--disabled) {
            border-style: solid;
            border-color: @bluish-gray;

            .selected-text .selectbox__label { color: @white; }
            .selectbox__arrow-wrapper .selectbox__arrow-down { border-top-color: @white; }
        }

        &--focused {
            border-color: @royal-blue;
        }

        &--disabled {
            cursor: auto;
            border-style: dashed;
            border-color: @gunpowder;
        }
    }

    &__select-list {
        position: absolute;
        top: 0;
        left: -15px;
        width: calc(~'100% + 2 * 15px');
        max-height: calc(~'8 * 30px');
        z-index: @z-index-new-dialog + 75;

        &--with-search {
            top: -15px;
            left: -45px;
            width: calc(~'100% + 45px + 15px');
        }
    }

    &__list-frame {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transform-origin: center center;
        background-color: @white;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
        animation: list-frame-open @select-list-animation-time-frame ease-out;
        animation-fill-mode: forwards;

        @keyframes list-frame-open {
            from {
                background-color: transparent;
                transform: scale3d(1, 0.8, 1);
            }
            66.67% {
                transform: scale3d(1, 1.025, 1);
                background-color: @white;
            }
            90% {
                background-color: @white;
            }
            to {
                transform: scale3d(1, 1, 1);
                background-color: @white;
            }
        }
    }

    &__list-content {
        position: relative;
        animation: list-content-open @select-list-animation-time-content ease-out;

        @keyframes list-content-open {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    }

    &__search-wrapper {
        margin: 15px 0 17px 0;
        display: flex;

        .selectbox__search-icon-wrapper {
            width: 45px;
            height: 38px;
            padding-bottom: 3px;
            display: flex;
            align-items: flex-end;
            justify-content: center;

            .selectbox__icon {
                width: 16px;
                height: 16px;
            }
        }
    }

    &__input-field {
        width: 100%;
        height: 100%;
        margin-right: 15px;

        .selectbox__label {
            width: 70%;
            height: 13px;
            display: flex;
            align-items: center;
            font-size: 11px;
            letter-spacing: 0.5px;
            color: @royal-blue;
        }
    }

    &__input-row {
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-width: 0 0 2px 0;
        border-style: solid;
        border-color: @royal-blue;

        .selectbox__text {
            width: 100%;
            display: flex;
            align-items: center;
            color: @black;
            font-size: 18px;
            font-family: @regular-text-font;
            background-color: transparent;
            border: 0;
            outline: none;
        }

        .selectbox__clear-icon {
            width: 16px;
            height: 16px;
            cursor: pointer;
            margin-left: 5px;
        }
    }

    &__options-wrapper {
        max-height: calc(~'8 * 30px');
        overflow-y: scroll;

        &--with-search { max-height: calc(~'8 * 30px - 75px'); }

        &::-webkit-scrollbar { display: none; }

        .selectbox__group {
            height: 30px;
            padding: 10px 15px 0 15px;
            display: flex;
            align-items: center;
            font-size: 11px;
            letter-spacing: 0.5px;
            font-family: @regular-text-font;
            color: @gray-blue;

            &--with-search { padding: 0 15px 0 45px; }
        }

        .selectbox__option {
            height: 30px;
            padding: 0 15px;
            display: flex;
            align-items: center;
            cursor: pointer;
            transition: background-color @form-element-transition-time ease-in-out;

            &:first-of-type { margin-top: 15px; }

            &:last-of-type { margin-bottom: 15px; }

            &--is-selected {
                background-color: @very-light-gray;
                .selectbox__label { color: @black; }
            }

            &:hover {
                &:not(.selectbox__option--disabled) {
                    background-color: @very-light-gray;
                    &:not(.selectbox__option--selected) {
                        .selectbox__label { color: @black; }
                    }

                }
            }

            &--disabled { cursor: auto; }

            &--with-search {
                padding: 0 15px 0 45px;
                &:first-of-type { margin-top: 0; }
            }

            .selectbox__label {
                width: 70%;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                font-size: 18px;
                font-family: @regular-text-font;
                color: @gunpowder;

                &--selected { color: @royal-blue; }
                &--disabled { color: @gray-blue; }

                &--with-metadata { padding-right: 5px; }
            }

            .selectbox__metadata {
                width: 30%;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                text-align: right;
                font-size: 12px;
                font-family: @regular-text-font;
                color: @gray-blue;
            }
        }
    }
}

.selectbox--light {
    .selectbox__label {
        color: @gunpowder;

        &--selected { color: @black; }
        &:hover { color: @black; }
    }

    .selectbox__label-text {
        color: @bluish-gray;
        &--focused {
            color: @royal-blue;
        }
    }

    .selectbox__arrow-down { border-top-color: @gunpowder; }

    .selectbox__select-row {
        border-color: @very-light-gray;
        &:hover:not(.selectbox__select-row--focused) {
            border-color: @bluish-gray;

            .selectbox__label { color: @black; }
            .selectbox__arrow-down { border-top-color: @black; }
        }
        &--focused {
            border-color: @royal-blue;
        }
        .selectbox__arrow-down--focused { border-top-color: @royal-blue; }
    }
}

.selectbox--condensed {
    .selectbox__label-text {
        font-size: 10px;
        letter-spacing: 0.5px;
    }

    .selectbox__helper-text {
        height: 12px;
        font-size: 10px;
        letter-spacing: 0.5px;
    }

    .selectbox__arrow-wrapper {
        .selectbox__arrow-down { border-width: 3px 3.5px 0 3.5px; }
    }

    .selectbox__selected-text {
        .selectbox__label { font-size: 14px; }
        .selectbox__metadata {
            padding-right: 5px;
            font-size: 11px;
            letter-spacing: 0.5px;
        }
    }

    .selectbox__select-row {
        height: 20px;
    }

    .selectbox__select-list {
        left: -10px;
        width: calc(~'100% + 2 * 10px');
        max-height: calc(~'8 * 20px');

        &--with-search {
            top: -10px;
            left: -35px;
            width: calc(~'100% + 35px + 10px');
        }
    }

    .selectbox__search-wrapper {
        margin: 10px 0 12px 0;

        .selectbox__search-icon-wrapper {
            width: 35px;
            height: 33px;
            padding-bottom: 2px;
        }
    }

    .selectbox__input-field {
        font-size: 10px;
        margin-right: 10px;
        letter-spacing: 0.5px;
    }

    .selectbox__input-row {
        height: 20px;
        border-width: 0 0 1px 0;

        .selectbox__text {
            height: 20px;
            font-size: 14px;
            border-width: 0 0 1px 0;
        }
    }

    .selectbox__options-wrapper {
        max-height: calc(~'8 * 20px');

        &--with-search { max-height: calc(~'8 * 20px - 55px'); }

        .selectbox__group {
            padding: 0 10px;

            &--with-search { padding: 0 10px 0 36px; }
        }

        .selectbox__option {
            height: 20px;
            padding: 0 10px;

            &:first-of-type { margin-top: 10px; }

            &:last-of-type { margin-bottom: 10px; }

            &--with-search { padding: 0 10px 0 36px; }
        }

        .selectbox__label { font-size: 14px; }
        .selectbox__metadata {
            font-size: 11px;
            letter-spacing: 0.5px;
        }
    }
}

.selectbox--phat {
    .selectbox__label-text {
        height: 21px;
        font-size: 14px;
    }

    .selectbox__helper-text {
        height: 17px;
        font-size: 12px;
    }

    .selectbox__selected-text {
        .selectbox__label { font-size: 22px; }
        .selectbox__metadata { font-size: 14px; }
    }

    .selectbox__select-row {
        height: 45px;
    }

    .selectbox__select-list {
        max-height: calc(~'8 * 45px');

        &--with-search { top: -18px; }
    }

    .selectbox__search-wrapper {
        margin-bottom: 19px;

        .selectbox__search-icon-wrapper {
            height: 46px;
            padding-bottom: 14px;
        }
    }

    .selectbox__input-field {
        height: 21px;
        font-size: 14px;
    }

    .selectbox__input-row {
        height: 45px;
        border-width: 0 0 1px 0;

        .selectbox__text {
            height: 45px;
            font-size: 22px;
        }
    }

    .selectbox__options-wrapper {
        max-height: calc(~'8 * 45px');

        &--with-search { max-height: calc(~'8 * 45px - 115px'); }

        .selectbox__option { height: 45px; }

        .selectbox__label { font-size: 22px; }

        .selectbox__metadata { font-size: 14px; }
    }

}
</style>
