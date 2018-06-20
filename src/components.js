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
import InlineDialog from '@/stateless/InlineDialog.vue'

export default {
    Checkbox: {
        component: Checkbox,
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
    },
    FileUpload: {
        component: FileUpload,
    },
    ImageList: {
        component: ImageList,
    },
    Input: {
        component: Input,
        width: 300,
        defaultProps: {
            label: 'Something',
            theme: 'light',
        },
    },
    Multiselect: {
        component: Multiselect,
    },
    RadioButton: {
        component: RadioButton,
    },
    Selectbox: {
        component: Selectbox,
        width: 300,
        defaultProps: {
            options: [
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
            ],
            isSearchable: true,
            isUnselectable: true,
            theme: 'light',
            size: 'condensed',
            label: 'Something',
        },
    },
    SupportText: {
        component: SupportText,
    },
    InlineDialog: {
        component: InlineDialog,
    },
}
