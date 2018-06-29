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
import Toast from '@/stateless/Toast.vue'
import PieChart from '@/stateless/PieChart.vue'
import InlineDialog from '@/stateless/InlineDialog.vue'

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
        availableProps: {
            name: [
                'caret', 'pencil-edit', 'delete-icon', 'duplicate-icon', 'sort-arrow',
                'calendar', 'back', 'save', 'arrow-down-strong', 'loading',
                'funnel', 'remove', 'plus', 'left-arrow', 'right-arrow',
                'search', 'clear', 'close', 'mail', 'screen-download',
                'card-edit', 'chain-link', 'clock', 'sort',
            ],
        },
        defaultProps: {
            name: 'caret',
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
}
