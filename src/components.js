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

export default {
    checkbox: {
        component: Checkbox,
    },
    dialog_button: {
        component: DialogButton,
    },
    dialog: {
        component: Dialog,
    },
    drop_area: {
        component: DropArea,
    },
    file_upload_requirements: {
        component: FileUploadRequirements,
    },
    file_upload: {
        component: FileUpload,
    },
    image_list: {
        component: ImageList,
    },
    input: {
        component: Input,
        width: 300,
        defaultProps: {
            label: 'Something',
            theme: 'light',
        },
    },
    multiselect: {
        component: Multiselect,
    },
    radio_button: {
        component: RadioButton,
    },
    selectbox: {
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
    support_text: {
        component: SupportText,
    },
}
