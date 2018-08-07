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
import Slider from '@/stateless/slider.vue'
import Group from '@/stateless/group.vue'
import Calendar from '@/stateless/Calendar.vue'
import DateInput from '@/stateless/DateInput.vue'
import DateRangeInput from '@/stateless/DateRangeInput.vue'
import DatePicker from '@/stateless/DatePicker.vue'

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
            uploadUrl: 'https://example.com',
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
        availableProps: {
            name: [
                'pencil-edit', 'pencil-edit-line', 'delete-icon', 'duplicate-icon', 'sort-arrow',
                'calendar', 'back', 'backward', 'save', 'arrow-down-strong', 'loading',
                'funnel', 'remove', 'plus', 'left-arrow', 'right-arrow',
                'search', 'clear', 'close', 'mail', 'screen-download',
                'card-edit', 'chain-link', 'clock', 'sort', 'x-bold',
                'alpha', 'beta',
            ],
        },
        defaultProps: {
            name: 'pencil-edit',
        },
    },
    Slider: {
        component: Slider,
        defaultProps: {
            min: 1,
            max: 100,
            limit: 20,
            step: 1,
            theme: 'light',
            size: 'normal',
            label: 'Basic slider',
            value: 5,
            unit: '%',
            alignment: 'right',
        },
    },
    Group: {
        component: Group,
        defaultProps: {
            label: 'Modeling',
            theme: 'light',
        },
    },
    Calendar: {
        component: Calendar,
        defaultProps: {
            isRange: true,
        },
    },
    DateInput: {
        component: DateInput,
    },
    DateRangeInput: {
        component: DateRangeInput,
    },
    DatePicker: {
        component: DatePicker,
    },
}
