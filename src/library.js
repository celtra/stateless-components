import '@/stateless/define_helpers'

import * as filtersObject from '@/helpers/filters.js'
import * as directivesObject from '@/helpers/directives.js'

import CheckboxComponent from '@/stateless/checkbox.vue'
import DialogButtonComponent from '@/stateless/dialog_button.vue'
import DialogComponent from '@/stateless/dialog.vue'
import DropAreaComponent from '@/stateless/drop_area.vue'
import FileUploadRequirementsComponent from '@/stateless/file_upload_requirements.vue'
import FileUploadComponent from '@/stateless/file_upload.vue'
import ImageListComponent from '@/stateless/image_list.vue'
import InputComponent from '@/stateless/input.vue'
import MultiselectComponent from '@/stateless/multiselect.vue'
import RadioButtonComponent from '@/stateless/radiobutton.vue'
import SelectboxComponent from '@/stateless/selectbox.vue'
import SupportTextComponent from '@/stateless/support_text.vue'
import IconComponent from '@/stateless/icon.vue'
import SliderComponent from '@/stateless/slider.vue'
import GroupComponent from '@/stateless/group.vue'

export const filters = filtersObject
export const directives = directivesObject

export const Checkbox = CheckboxComponent
export const DialogButton = DialogButtonComponent
export const Dialog = DialogComponent
export const DropArea = DropAreaComponent
export const FileUploadRequirements = FileUploadRequirementsComponent
export const FileUpload = FileUploadComponent
export const ImageList = ImageListComponent
export const Input = InputComponent
export const Multiselect = MultiselectComponent
export const RadioButton = RadioButtonComponent
export const Selectbox = SelectboxComponent
export const SupportText = SupportTextComponent
export const Icon = IconComponent
export const Slider = SliderComponent
export const Group = GroupComponent