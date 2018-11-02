import '@/stateless/define_helpers'

import * as filtersObject from '@/helpers/filters.js'
import * as directivesObject from '@/helpers/directives.js'
import * as itemsUtilsObject from '@/stateless/items_utils.js'

export const filters = filtersObject
export const directives = directivesObject
export const itemsUtils = itemsUtilsObject

import CheckboxComponent from '@/stateless/checkbox.vue'
import CheckboxMetadata from '@/stateless/Checkbox.metadata.js'
export const Checkbox = { ...CheckboxComponent, ...CheckboxMetadata }

import DialogButtonComponent from '@/stateless/dialog_button.vue'
import DialogButtonMetadata from '@/stateless/DialogButton.metadata.js'
export const DialogButton = { ...DialogButtonComponent, ...DialogButtonMetadata }

import DialogComponent from '@/stateless/dialog.vue'
import DialogMetadata from '@/stateless/Dialog.metadata.js'
export const Dialog = { ...DialogComponent, ...DialogMetadata }

import DropAreaComponent from '@/stateless/drop_area.vue'
import DropAreaMetadata from '@/stateless/DropArea.metadata.js'
export const DropArea = { ...DropAreaComponent, ...DropAreaMetadata }

import FileUploadRequirementsComponent from '@/stateless/file_upload_requirements.vue'
import FileUploadRequirementsMetadata from '@/stateless/FileUploadRequirements.metadata.js'
export const FileUploadRequirements = { ...FileUploadRequirementsComponent, ...FileUploadRequirementsMetadata }

import FileUploadComponent from '@/stateless/file_upload.vue'
import FileUploadMetadata from '@/stateless/FileUpload.metadata.js'
export const FileUpload = { ...FileUploadComponent, ...FileUploadMetadata }

import ImageListComponent from '@/stateless/image_list.vue'
import ImageListMetadata from '@/stateless/ImageList.metadata.js'
export const ImageList = { ...ImageListComponent, ...ImageListMetadata }

import InputComponent from '@/stateless/input.vue'
import InputMetadata from '@/stateless/Input.metadata.js'
export const Input = { ...InputComponent, ...InputMetadata }

import SearchInputComponent from '@/stateless/SearchInput.vue'
import SearchInputMetadata from '@/stateless/SearchInput.metadata.js'
export const SearchInput = { ...SearchInputComponent, ...SearchInputMetadata }

import MultiselectComponent from '@/stateless/multiselect.vue'
import MultiselectMetadata from '@/stateless/Multiselect.metadata.js'
export const Multiselect = { ...MultiselectComponent, ...MultiselectMetadata }

import RadioButtonComponent from '@/stateless/radiobutton.vue'
import RadioButtonMetadata from '@/stateless/RadioButton.metadata.js'
export const RadioButton = { ...RadioButtonComponent, ...RadioButtonMetadata }

import SelectboxComponent from '@/stateless/selectbox.vue'
import SelectboxMetadata from '@/stateless/Selectbox.metadata.js'
export const Selectbox = { ...SelectboxComponent, ...SelectboxMetadata }

import SupportTextComponent from '@/stateless/support_text.vue'
import SupportTextMetadata from '@/stateless/SupportText.metadata.js'
export const SupportText = { ...SupportTextComponent, ...SupportTextMetadata }

import IconComponent from '@/stateless/icon.vue'
import IconMetadata from '@/stateless/Icon.metadata.js'
export const Icon = { ...IconComponent, ...IconMetadata }

import SliderComponent from '@/stateless/slider.vue'
import SliderMetadata from '@/stateless/Slider.metadata.js'
export const Slider = { ...SliderComponent, ...SliderMetadata }

import GroupComponent from '@/stateless/group.vue'
import GroupMetadata from '@/stateless/Group.metadata.js'
export const Group = { ...GroupComponent, ...GroupMetadata }

import CalendarComponent from '@/stateless/Calendar.vue'
import CalendarMetadata from '@/stateless/Calendar.metadata.js'
export const Calendar = { ...CalendarComponent, ...CalendarMetadata }

import DateInputComponent from '@/stateless/DateInput.vue'
import DateInputMetadata from '@/stateless/DateInput.metadata.js'
export const DateInput = { ...DateInputComponent, ...DateInputMetadata }

import DateRangeInputComponent from '@/stateless/DateRangeInput.vue'
export const DateRangeInput = DateRangeInputComponent

import DatePickerComponent from '@/stateless/DatePicker.vue'
import DatePickerMetadata from '@/stateless/DatePicker.metadata.js'
export const DatePicker = { ...DatePickerComponent, ...DatePickerMetadata }

import ToastComponent from '@/stateless/Toast.vue'
import ToastMetadata from '@/stateless/Toast.metadata.js'
export const Toast = { ...ToastComponent, ...ToastMetadata }

import PieChartComponent from '@/stateless/PieChart.vue'
export const PieChart = PieChartComponent

import InlineDialogComponent from '@/stateless/InlineDialog.vue'
export const InlineDialog = InlineDialogComponent

import DefaultListComponent from '@/stateless/DefaultList.vue'
import DefaultListMetadata from '@/stateless/DefaultList.metadata.js'
export const DefaultList = { ...DefaultListComponent, ...DefaultListMetadata }

import DefaultListItemComponent from '@/stateless/DefaultListItem.vue'
export const DefaultListItem = DefaultListItemComponent

import MultilineListItemComponent from '@/stateless/MultilineListItem.vue'
export const MultilineListItem = MultilineListItemComponent

import ScrollableListComponent from '@/stateless/ScrollableList.vue'
import ScrollableListMetadata from '@/stateless/ScrollableList.metadata.js'
export const ScrollableList = { ...ScrollableListComponent, ...ScrollableListMetadata }

import TypeaheadComponent from '@/stateless/Typeahead.vue'
export const Typeahead = TypeaheadComponent

import TypeaheadMultiselectComponent from '@/stateless/TypeaheadMultiselect.vue'
export const TypeaheadMultiselect = TypeaheadMultiselectComponent

import TooltipComponent from '@/stateless/Tooltip.vue'
import TooltipMetadata from '@/stateless/Tooltip.metadata.js'
export const Tooltip = { ...TooltipComponent, ...TooltipMetadata }

import ChipComponent from '@/stateless/Chip.vue'
import ChipMetadata from '@/stateless/Chip.metadata.js'
export const Chip = { ...ChipComponent, ...ChipMetadata }

import ChipWithMultiselectComponent from '@/stateless/ChipWithMultiselect.vue'
export const ChipWithMultiselect = ChipWithMultiselectComponent

import MiddleEllipsisComponent from '@/stateless/MiddleEllipsis.vue'
export const MiddleEllipsis = MiddleEllipsisComponent

import MiddleEllipsisListItemComponent from '@/stateless/MiddleEllipsisListItem.vue'
export const MiddleEllipsisListItem = MiddleEllipsisListItemComponent

import TextLineComponent from '@/stateless/TextLine.vue'
export const TextLine = TextLineComponent
