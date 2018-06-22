import Checkbox from '@/stateless/checkbox.vue'
import DialogButton from '@/stateless/dialog_button.vue'
import Dialog from '@/stateless/dialog.vue'
import DropArea from '@/stateless/drop_area.vue'
import FileUploadRequirements from '@/stateless/file_upload_requirements.vue'
import FileUpload from '@/stateless/file_upload.vue'
import ImageList from '@/stateless/image_list.vue'
import Input from '@/stateless/input.vue'
import Multiselect from '@/stateless/multiselect.vue'
import RadioButton from '@/stateless/radiobutton.vue'
import Selectbox from '@/stateless/selectbox.vue'
import SupportText from '@/stateless/support_text.vue'
import Icon from '@/stateless/icon.vue'
import DefaultList from '@/stateless/DefaultList.vue'
import DefaultListItem from '@/stateless/DefaultListItem.vue'
import ScrollableList from '@/stateless/ScrollableList.vue'
import Typeahead from '@/stateless/Typeahead.vue'
import TypeaheadMultiselect from '@/stateless/TypeaheadMultiselect.vue'
import ColumnFilter from '@/stateless/ColumnFilter.vue'
import Toast from '@/stateless/Toast.vue'
import PieChart from '@/stateless/PieChart.vue'
import InlineDialog from '@/stateless/InlineDialog.vue'
import FilterChip from '@/stateless/FilterChip.vue'
import FilterChipWithMultiselect from '@/stateless/FilterChipWithMultiSelect.vue'

const defaultItems = [
    { id: '1', label: "Something", metadata: 'zan.kusterle@gmail.com', icon: 'plus' },
    { id: '2', label: "Lorem" },
    { id: '3', label: "Ipsum", metadata: 'someone@lorem.ipsum' },
    { id: '4', label: "A", metadata: 'someone@lorem.ipsum' },
    { id: '5', label: "B", metadata: 'someone@lorem.ipsum' },
    { id: '6', label: "C", metadata: 'someone@lorem.ipsum' },
    { id: '7', label: "D", metadata: 'someone@lorem.ipsum' },
    { id: '8', label: "E", metadata: 'someone@lorem.ipsum' },
    { id: '9', label: "F", metadata: 'someone@lorem.ipsum' },
    { id: '10', label: "G", metadata: 'someone@lorem.ipsum' },
]

export default {
    Checkbox: {
        component: Checkbox,
        defaultProps: {
            value: false,
        },
    },
    DialogButton: {
        component: DialogButton,
    },
    Dialog: {
        component: Dialog,
    },
    DropArea: {
        component: DropArea,
    },
    FileUploadRequirements: {
        component: FileUploadRequirements,
        defaultProps: {
            requirements: [
                { name: 'Format', value: 'PNG, JPG' },
                { name: 'Size', value: 'max. 3MB' },
            ],
        },
    },
    FileUpload: {
        component: FileUpload,
        defaultProps: {
            file: {},
            uploadUrl: '',
        },
    },
    ImageList: {
        component: ImageList,
        defaultProps: {
            images: [
                {},
                {},
            ],
        },
    },
    Input: {
        component: Input,
        rootCss: {
            width: '300px',
        },
        defaultProps: {
            label: 'Something',
            theme: 'light',
        },
    },
    Multiselect: {
        component: Multiselect,
        defaultProps: {
            options: defaultItems,
            value: [],
        },
    },
    RadioButton: {
        component: RadioButton,
        defaultProps: {
            value: 'something',
            selectedValue: 'something',
        },
    },
    Selectbox: {
        component: Selectbox,
        rootCss: {
            width: '300px',
        },
        defaultProps: {
            groups: [{ options: defaultItems }],
            isSearchable: true,
            isUnselectable: true,
            theme: 'light',
            size: 'condensed',
            label: 'Something',
        },
    },
    SupportText: {
        component: SupportText,
        defaultProps: {
            text: 'Lorem Ipsum',
        },
    },
    Icon: {
        component: Icon,
    },
    DefaultList: {
        component: DefaultList,
    },
    DefaultListItem: {
        component: DefaultListItem,
    },
    ScrollableList: {
        component: ScrollableList,
    },
    Typeahead: {
        component: Typeahead,
        defaultProps: {
            label: 'Something',
            value: 'Lorem',
            getSuggestions: () => [
                { id: '1', label: "Something", metadata: 'zan.kusterle@gmail.com', icon: 'plus' },
                { id: '2', label: "Lorem" },
                { id: '3', label: "Ipsum", metadata: 'someone@lorem.ipsum' },
            ],
        },
    },
    TypeaheadMultiselect: {
        component: TypeaheadMultiselect,
    },
    ColumnFilter: {
        component: ColumnFilter,
        rootCss: {
            width: '400px',
            boxShadow: '1px 2px 5px 0 rgba(0,0,0,0.25)',
            height: 'fit-content',
        },
        defaultProps: {
            columns: [
                {
                    items: [
                        { id: 'creativeName', label: 'Creative name', type: 'String' },
                        { id: 'unit', label: 'Unit', type: 'String' },
                        { id: 'pageViews', label: 'Page views', type: 'Number' },
                    ],
                },
                {
                    label: 'Campaign level filtering',
                    items: [
                        { id: 'creative', label: 'Creative', type: 'String' },
                        { id: 'placement', label: 'Placement', type: 'String' },
                        {
                            id: 'supplier',
                            label: 'Supplier',
                            type: 'Multiselect',
                            props: {
                                options: [
                                    { id: 'banner', label: 'Banner', metadata: 'Something', ratio: 0.9 },
                                    { id: 'expandableBanner', label: 'ExpandableBanner', metadata: 'Something', ratio: 0.2 },
                                ],
                                getOptions (v) {
                                    return new Promise((resolve, reject) => {
                                        resolve([
                                            { id: 'interstitial', label: 'Interstitial' },
                                        ])
                                    })
                                },
                                autoReorder: false,
                            },
                        },
                    ],
                },
            ],
        },
    },
    Toast: {
        component: Toast,
    },
    PieChart: {
        component: PieChart,
    },
    InlineDialog: {
        component: InlineDialog,
    },
    FilterChip: {
        component: FilterChip,
        defaultProps: {
            click: () => {
                console.log('click on filter chip')
            },
            selectionCounter: {
                selected: 0, all: 4,
            },
            label: 'Label',
        },
    },
    FilterChipWithMultiSelect: {
        component: FilterChipWithMultiselect,
        defaultProps: {
            options: [
                { id: '1', label: '1', metadata: '1' },
                { id: '2', label: '2', metadata: '2' },
                { id: '3', label: '3', metadata: '3' },
                { id: '4', label: '4', metadata: '4' },
                { id: '5', label: '5', metadata: '5' },
                { id: '6', label: '6', metadata: '6' },
                { id: '7', label: '7', metadata: '7' },
                { id: '8', label: '8', metadata: '8' },
                { id: '9', label: '9', metadata: '9' },
            ],
            value: [ '1', '2' ],
            searchableWhenOptionsLengthIsMoreThan: 6,
            label: 'Test Label',
        },
    },
}
