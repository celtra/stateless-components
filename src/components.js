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
import Toast from '@/stateless/Toast.vue'
import PieChart from '@/stateless/PieChart.vue'
import InlineDialog from '@/stateless/InlineDialog.vue'
import DefaultList from '@/stateless/DefaultList.vue'
import DefaultListItem from '@/stateless/DefaultListItem.vue'
import ScrollableList from '@/stateless/ScrollableList.vue'
import Typeahead from '@/stateless/Typeahead.vue'
import TypeaheadMultiselect from '@/stateless/TypeaheadMultiselect.vue'
import Tooltip from '@/stateless/Tooltip.vue'
import Chip from '@/stateless/Chip.vue'
import ChipWithMultiselect from '@/stateless/ChipWithMultiSelect.vue'

const largeItems = [{ "id":"Inline and 360 Video","label":"Inline and 360 Video","items":[{ "id":"inlineVideoShows","key":"Inline and 360 Video/inlineVideoShows","label":"Inline video feature views", "tooltip": "Tooltip dkmsamdksma kmkdsanjdsnjak nsdjkn jkndsa kjndsakjn dskjnads kjna", "disabled": true },{ "id":"inlineVideoManualShows","key":"Inline and 360 Video/inlineVideoManualShows","label":"User-initiated inline video feature views" },{ "id":"inlineVideoManualPlayRate","key":"Inline and 360 Video/inlineVideoManualPlayRate","label":"Inline video play rate" },{ "id":"inlineVideoPlays","key":"Inline and 360 Video/inlineVideoPlays","label":"Inline video plays" },{ "id":"inlineVideoTrackablePlays","key":"Inline and 360 Video/inlineVideoTrackablePlays","label":"Measurable inline video plays" },{ "id":"inlineVideoPctTrackable","key":"Inline and 360 Video/inlineVideoPctTrackable","label":"Inline video measured rate" },{ "id":"inlineVideoUniqueStarts","key":"Inline and 360 Video/inlineVideoUniqueStarts","label":"Inline video starts" },{ "id":"inlineVideoStartRate","key":"Inline and 360 Video/inlineVideoStartRate","label":"Inline video start rate" },{ "id":"inlineVideoAutoPlays","key":"Inline and 360 Video/inlineVideoAutoPlays","label":"Automatic inline video plays" },{ "id":"inlineVideoManualPlays","key":"Inline and 360 Video/inlineVideoManualPlays","label":"User-initiated inline video plays" },{ "id":"inlineVideoPlaysWithSoundOff","key":"Inline and 360 Video/inlineVideoPlaysWithSoundOff","label":"Inline video plays initially muted" },{ "id":"inlineVideoPlaysWithSoundOn","key":"Inline and 360 Video/inlineVideoPlaysWithSoundOn","label":"Inline video plays initially audible" },{ "id":"inlineVideoMutes","key":"Inline and 360 Video/inlineVideoMutes","label":"Inline video mutes" },{ "id":"inlineVideoMuteRate","key":"Inline and 360 Video/inlineVideoMuteRate","label":"Inline video mute rate" },{ "id":"inlineVideoUnmutes","key":"Inline and 360 Video/inlineVideoUnmutes","label":"Inline video unmutes" },{ "id":"inlineVideoUnmuteRate","key":"Inline and 360 Video/inlineVideoUnmuteRate","label":"Inline video unmute rate" },{ "id":"inlineVideoPlayTime","key":"Inline and 360 Video/inlineVideoPlayTime","label":"Inline video play time" },{ "id":"inlineVideoAvgPlayTime","key":"Inline and 360 Video/inlineVideoAvgPlayTime","label":"Avg. inline video play time" },{ "id":"inlineVideoUniquePlayTime","key":"Inline and 360 Video/inlineVideoUniquePlayTime","label":"Unique inline video play time" },{ "id":"inlineVideoMuteTime","key":"Inline and 360 Video/inlineVideoMuteTime","label":"Inline video mute time" },{ "id":"inlineVideoAvgMuteTime","key":"Inline and 360 Video/inlineVideoAvgMuteTime","label":"Avg. inline video mute time" },{ "id":"inlineVideoAudibleTime","key":"Inline and 360 Video/inlineVideoAudibleTime","label":"Inline video audible time" },{ "id":"inlineVideoAvgAudibleTime","key":"Inline and 360 Video/inlineVideoAvgAudibleTime","label":"Avg. audible inline video time" },{ "id":"inlineVideoAudibilityRate","key":"Inline and 360 Video/inlineVideoAudibilityRate","label":"Inline video audibility rate" },{ "id":"inlineVideoSoundOffPlayRate","key":"Inline and 360 Video/inlineVideoSoundOffPlayRate","label":"Inline video sound off play rate" },{ "id":"inlineVideoSoundOnPlayRate","key":"Inline and 360 Video/inlineVideoSoundOnPlayRate","label":"Inline video sound on play rate" },{ "id":"inlineVideoUniqueFinishes","key":"Inline and 360 Video/inlineVideoUniqueFinishes","label":"Inline video completions" },{ "id":"inlineVideoFinishRate","key":"Inline and 360 Video/inlineVideoFinishRate","label":"Inline video completion rate" },{ "id":"inlineVideoSecondUniqueViews","key":"Inline and 360 Video/inlineVideoSecondUniqueViews","label":"Inline video second marker unique views" },{ "id":"inlineVideoQuarterUniqueViews","key":"Inline and 360 Video/inlineVideoQuarterUniqueViews","label":"Inline video quarter marker unique views" },{ "id":"inlineVideoSeconds","key":"Inline and 360 Video/inlineVideoSeconds","label":"Consumable inline video seconds" },{ "id":"inlineVideoConsumptionRate","key":"Inline and 360 Video/inlineVideoConsumptionRate","label":"Inline video consumption rate" },{ "id":"inlineVideoFirstQuarterUniqueViews","key":"Inline and 360 Video/inlineVideoFirstQuarterUniqueViews","label":"Inline video first quarter views" },{ "id":"inlineVideoSecondQuarterUniqueViews","key":"Inline and 360 Video/inlineVideoSecondQuarterUniqueViews","label":"Inline video second quarter views" },{ "id":"inlineVideoThirdQuarterUniqueViews","key":"Inline and 360 Video/inlineVideoThirdQuarterUniqueViews","label":"Inline video third quarter views" },{ "id":"inlineVideoFourthQuarterUniqueViews","key":"Inline and 360 Video/inlineVideoFourthQuarterUniqueViews","label":"Inline video fourth quarter views" },{ "id":"inlineVideoFirstQuarterUniquePlayRate","key":"Inline and 360 Video/inlineVideoFirstQuarterUniquePlayRate","label":"Inline video first quarter play rate" },{ "id":"inlineVideoSecondQuarterUniquePlayRate","key":"Inline and 360 Video/inlineVideoSecondQuarterUniquePlayRate","label":"Inline video second quarter play rate" },{ "id":"inlineVideoThirdQuarterUniquePlayRate","key":"Inline and 360 Video/inlineVideoThirdQuarterUniquePlayRate","label":"Inline video third quarter play rate" },{ "id":"inlineVideoFourthQuarterUniquePlayRate","key":"Inline and 360 Video/inlineVideoFourthQuarterUniquePlayRate","label":"Inline video fourth quarter play rate" },{ "id":"inlineVideoQuadrant1Views","key":"Inline and 360 Video/inlineVideoQuadrant1Views","label":"360 video quadrant 1 views" },{ "id":"inlineVideoQuadrant2Views","key":"Inline and 360 Video/inlineVideoQuadrant2Views","label":"360 video quadrant 2 views" },{ "id":"inlineVideoQuadrant3Views","key":"Inline and 360 Video/inlineVideoQuadrant3Views","label":"360 video quadrant 3 views" },{ "id":"inlineVideoQuadrant4Views","key":"Inline and 360 Video/inlineVideoQuadrant4Views","label":"360 video quadrant 4 views" },{ "id":"inlineVideoAvgQuadrantViews","key":"Inline and 360 Video/inlineVideoAvgQuadrantViews","label":"Average 360 video quadrant views" },{ "id":"inlineVideoSwipeInteractions","key":"Inline and 360 Video/inlineVideoSwipeInteractions","label":"360 video swipes" },{ "id":"inlineVideoSwipeInteractionRate","key":"Inline and 360 Video/inlineVideoSwipeInteractionRate","label":"360 video swipe interaction rate" },{ "id":"inlineVideoTiltInteractions","key":"Inline and 360 Video/inlineVideoTiltInteractions","label":"360 video tilts" },{ "id":"inlineVideoTiltInteractionRate","key":"Inline and 360 Video/inlineVideoTiltInteractionRate","label":"360 video tilt interaction rate" },{ "id":"inlineVideoHorizontalDegreesExplored","key":"Inline and 360 Video/inlineVideoHorizontalDegreesExplored","label":"Horizontal degrees explored" },{ "id":"inlineVideoAvgHorizontalDegreesExplored","key":"Inline and 360 Video/inlineVideoAvgHorizontalDegreesExplored","label":"Average horizontal degrees explored" },{ "id":"inlineVideoVerticalDegreesExplored","key":"Inline and 360 Video/inlineVideoVerticalDegreesExplored","label":"Vertical degrees explored" },{ "id":"inlineVideoAvgVerticalDegreesExplored","key":"Inline and 360 Video/inlineVideoAvgVerticalDegreesExplored","label":"Average vertical degrees explored" },{ "id":"inlineVideoDegreesPanned","key":"Inline and 360 Video/inlineVideoDegreesPanned","label":"360 video degrees panned" },{ "id":"inlineVideoAvgPanningSpeed","key":"Inline and 360 Video/inlineVideoAvgPanningSpeed","label":"360 video average panning speed" }] },{ "id":"Snapchat","label":"Snapchat","items":[{ "id":"snapchatImpressions","key":"Snapchat/snapchatImpressions","label":"Snapchat impressions" },{ "id":"snapchatVideoViews","key":"Snapchat/snapchatVideoViews","label":"Snapchat video views" },{ "id":"snapchatVideoViewRate","key":"Snapchat/snapchatVideoViewRate","label":"Snapchat video view rate" },{ "id":"snapchatSwipes","key":"Snapchat/snapchatSwipes","label":"Snapchat swipe ups" },{ "id":"snapchatSwipeRate","key":"Snapchat/snapchatSwipeRate","label":"Snapchat swipe up rate" },{ "id":"snapchatScreenTime","key":"Snapchat/snapchatScreenTime","label":"Snapchat screen time" },{ "id":"snapchatAvgScreenTime","key":"Snapchat/snapchatAvgScreenTime","label":"Snapchat avg. screen time" },{ "id":"snapchatFirstQuartileViews","key":"Snapchat/snapchatFirstQuartileViews","label":"Snapchat 25% quartile" },{ "id":"snapchatMidpointQuartileViews","key":"Snapchat/snapchatMidpointQuartileViews","label":"Snapchat 50% quartile" },{ "id":"snapchatThirdQuartileViews","key":"Snapchat/snapchatThirdQuartileViews","label":"Snapchat 75% quartile" },{ "id":"snapchatCompletions","key":"Snapchat/snapchatCompletions","label":"Snapchat completions" },{ "id":"snapchatFirstQuartileRate","key":"Snapchat/snapchatFirstQuartileRate","label":"Snapchat 25% quartile rate" },{ "id":"snapchatMidpointQuartileRate","key":"Snapchat/snapchatMidpointQuartileRate","label":"Snapchat 50% quartile rate" },{ "id":"snapchatThirdQuartileRate","key":"Snapchat/snapchatThirdQuartileRate","label":"Snapchat 75% quartile rate" },{ "id":"snapchatCompletionRate","key":"Snapchat/snapchatCompletionRate","label":"Snapchat video completion rate" },{ "id":"snapchatSpend","key":"Snapchat/snapchatSpend","label":"Snapchat spend" },{ "id":"snapchatUniques","key":"Snapchat/snapchatUniques","label":"Snapchat uniques" },{ "id":"snapchatFrequency","key":"Snapchat/snapchatFrequency","label":"Snapchat frequency" },{ "id":"snapchatAttachmentViewTime","key":"Snapchat/snapchatAttachmentViewTime","label":"Snapchat attachment view time" },{ "id":"snapchatAvgAttachmentViewTime","key":"Snapchat/snapchatAvgAttachmentViewTime","label":"Snapchat avg. attachment screen time" },{ "id":"snapchatAttachmentUniques","key":"Snapchat/snapchatAttachmentUniques","label":"Snapchat attachment uniques" },{ "id":"snapchatAttachmentFrequency","key":"Snapchat/snapchatAttachmentFrequency","label":"Snapchat attachment frequency" },{ "id":"snapchatInstalls","key":"Snapchat/snapchatInstalls","label":"Snapchat installs" },{ "id":"snapchatIOSInstalls","key":"Snapchat/snapchatIOSInstalls","label":"Snapchat iOS installs" },{ "id":"snapchatAndroidInstalls","key":"Snapchat/snapchatAndroidInstalls","label":"Snapchat Android installs" },{ "id":"snapchatAttachmentFirstQuartileViews","key":"Snapchat/snapchatAttachmentFirstQuartileViews","label":"Snapchat 25% attachment quartile" },{ "id":"snapchatAttachmentMidpointQuartileViews","key":"Snapchat/snapchatAttachmentMidpointQuartileViews","label":"Snapchat 50% attachment quartile" },{ "id":"snapchatAttachmentThirdQuartileViews","key":"Snapchat/snapchatAttachmentThirdQuartileViews","label":"Snapchat 75% attachment quartile" },{ "id":"snapchatAttachmentCompletions","key":"Snapchat/snapchatAttachmentCompletions","label":"Snapchat attachment completions" }] },{ "id":"Video","label":"Video","items":[{ "id":"videoSessions","key":"Video/videoSessions","label":"Requested video impressions" },{ "id":"videoStarts","key":"Video/videoStarts","label":"Video starts" },{ "id":"videoPlayTime","key":"Video/videoPlayTime","label":"Non-unique play time" },{ "id":"videoAvgUniquePlayTime","key":"Video/videoAvgUniquePlayTime","label":"Avg. video play time" },{ "id":"videoUniquePlayTime","key":"Video/videoUniquePlayTime","label":"Video play time" },{ "id":"videoConsumableSeconds","key":"Video/videoConsumableSeconds","label":"Video consumable seconds" },{ "id":"videoConsumptionRate","key":"Video/videoConsumptionRate","label":"Video consumption rate" },{ "id":"videoFirstQuartileViews","key":"Video/videoFirstQuartileViews","label":"1st quartile video completes" },{ "id":"videoMidpointQuartileViews","key":"Video/videoMidpointQuartileViews","label":"2nd quartile video completes" },{ "id":"videoThirdQuartileViews","key":"Video/videoThirdQuartileViews","label":"3rd quartile video completes" },{ "id":"videoCompletions","key":"Video/videoCompletions","label":"Video completes" },{ "id":"videoCompletionRate","key":"Video/videoCompletionRate","label":"Video completion rate" },{ "id":"videoReplayAttempts","key":"Video/videoReplayAttempts","label":"Overall video replays" },{ "id":"videoUniqueReplayAttempts","key":"Video/videoUniqueReplayAttempts","label":"Video replays" },{ "id":"videoUniqueReplayRate","key":"Video/videoUniqueReplayRate","label":"Video replay rate" },{ "id":"videoSecondViews","key":"Video/videoSecondViews","label":"Video second views" },{ "id":"videoSecondUniqueViews","key":"Video/videoSecondUniqueViews","label":"Video second unique views" },{ "id":"videoEndCardInteractions","key":"Video/videoEndCardInteractions","label":"End card engagements" },{ "id":"videoEndCardInteractionRate","key":"Video/videoEndCardInteractionRate","label":"End card engagement rate" },{ "id":"video2sViews","key":"Video/video2sViews","label":"2 second video completes" },{ "id":"video3sViews","key":"Video/video3sViews","label":"3 second video completes" },{ "id":"urlOpensOnVideo","key":"Video/urlOpensOnVideo","label":"Video website opens" },{ "id":"videoClicks","key":"Video/videoClicks","label":"Video clicks" },{ "id":"videoClickRate","key":"Video/videoClickRate","label":"Video CTR" },{ "id":"videoEndCardClickThroughs","key":"Video/videoEndCardClickThroughs","label":"End card clickthroughs" },{ "id":"videoEndCardClickThroughRate","key":"Video/videoEndCardClickThroughRate","label":"End card CTR" }] },{ "id":"Engagement","label":"Engagement","items":[{ "id":"sessionsWithInteraction","key":"Engagement/sessionsWithInteraction","label":"Ad engagements" },{ "id":"invalidSessionsWithInteraction","key":"Engagement/invalidSessionsWithInteraction","label":"Invalid ad engagements" },{ "id":"interactionRate","key":"Engagement/interactionRate","label":"Ad engagement rate" },{ "id":"unitShowsWithInteraction","key":"Engagement/unitShowsWithInteraction","label":"Unit engagements" },{ "id":"primaryUnitShowsWithInteraction","key":"Engagement/primaryUnitShowsWithInteraction","label":"Primary unit engagements" },{ "id":"bannerUnitShowsWithInteraction","key":"Engagement/bannerUnitShowsWithInteraction","label":"Banner unit engagements" },{ "id":"modalUnitShowsWithInteraction","key":"Engagement/modalUnitShowsWithInteraction","label":"Modal unit engagements" },{ "id":"unitInteractionRate","key":"Engagement/unitInteractionRate","label":"Unit engagement rate" },{ "id":"creativeUnitInteractionRate","key":"Engagement/creativeUnitInteractionRate","label":"Primary unit engagement rate" },{ "id":"unitVariantShowsWithInteraction","key":"Engagement/unitVariantShowsWithInteraction","label":"Unit variant engagements" },{ "id":"unitVariantInteractionRate","key":"Engagement/unitVariantInteractionRate","label":"Unit variant engagement rate" },{ "id":"screenShowsWithInteraction","key":"Engagement/screenShowsWithInteraction","label":"Page engagements" },{ "id":"screenInteractionRate","key":"Engagement/screenInteractionRate","label":"Page engagement rate" },{ "id":"timeOnScreen","key":"Engagement/timeOnScreen","label":"Time spent" },{ "id":"avgTimeOnScreen","key":"Engagement/avgTimeOnScreen","label":"Avg. time spent on page" },{ "id":"avgTimeOnUnit","key":"Engagement/avgTimeOnUnit","label":"Avg. time spent on unit" },{ "id":"timeOnPrimaryUnit","key":"Engagement/timeOnPrimaryUnit","label":"Time on primary unit" },{ "id":"timeOnBannerUnit","key":"Engagement/timeOnBannerUnit","label":"Time on banner unit" },{ "id":"timeOnModalUnit","key":"Engagement/timeOnModalUnit","label":"Time on modal unit" },{ "id":"avgTimeOnCreativeUnit","key":"Engagement/avgTimeOnCreativeUnit","label":"Avg. time spent on primary unit" },{ "id":"sessionsWithClickReportedToExternalAdServer","key":"Engagement/sessionsWithClickReportedToExternalAdServer","label":"Clicks reported to external ad server" },{ "id":"sessionsWithClick","key":"Engagement/sessionsWithClick","label":"Clicks" },{ "id":"engagementTime","key":"Engagement/engagementTime","label":"Engagement time" },{ "id":"sessionsWithEngagementTime","key":"Engagement/sessionsWithEngagementTime","label":"Impressions with engagement time" },{ "id":"avgEngagementTime","key":"Engagement/avgEngagementTime","label":"Avg. engagement time" }] },{ "id":"Requested impressions (Identity)","label":"Requested impressions (Identity)","items":[{ "id":"sessionsWithPlatformAdvIdRequested","key":"Requested impressions (Identity)/sessionsWithPlatformAdvIdRequested","label":"Impressions with advertising identifier requested in the tag" },{ "id":"sessionsWithPlatformAdvIdPassed","key":"Requested impressions (Identity)/sessionsWithPlatformAdvIdPassed","label":"Impressions with advertising identifier passed" },{ "id":"sessionsWithPlatformAdvIdTrackingLimited","key":"Requested impressions (Identity)/sessionsWithPlatformAdvIdTrackingLimited","label":"Impressions with advertising identifier tracking limited" },{ "id":"sessionsWithPlatformAdvIdTrackingUnlimited","key":"Requested impressions (Identity)/sessionsWithPlatformAdvIdTrackingUnlimited","label":"Impressions with advertising identifier tracking unlimited" },{ "id":"platformAdvIdRequestedRate","key":"Requested impressions (Identity)/platformAdvIdRequestedRate","label":"Platform advertising ID requested in tag rate" },{ "id":"platformAdvIdPassedRate","key":"Requested impressions (Identity)/platformAdvIdPassedRate","label":"Platform advertising ID passed rate" },{ "id":"sessionsWithNeustarQueried","key":"Requested impressions (Identity)/sessionsWithNeustarQueried","label":"Impressions with Neustar queried" },{ "id":"sessionsWithNeustarMatched","key":"Requested impressions (Identity)/sessionsWithNeustarMatched","label":"Impressions with Neustar matched" },{ "id":"neustarMatchRate","key":"Requested impressions (Identity)/neustarMatchRate","label":"Neustar match rate" },{ "id":"sessionsWithUserInNeustarAudience","key":"Requested impressions (Identity)/sessionsWithUserInNeustarAudience","label":"Impressions with user in Neustar audiences" },{ "id":"sessionsWithUserInCustomNeustarAudience","key":"Requested impressions (Identity)/sessionsWithUserInCustomNeustarAudience","label":"Impressions with user in custom Neustar audiences" },{ "id":"sessionsWithPippioQueried","key":"Requested impressions (Identity)/sessionsWithPippioQueried","label":"Impressions with Arbor queried" },{ "id":"sessionsWithPippioMatched","key":"Requested impressions (Identity)/sessionsWithPippioMatched","label":"Impressions with Arbor matched" },{ "id":"pippioMatchRate","key":"Requested impressions (Identity)/pippioMatchRate","label":"Arbor match rate" },{ "id":"sessionsWithTapadQueried","key":"Requested impressions (Identity)/sessionsWithTapadQueried","label":"Impressions with Tapad queried" },{ "id":"sessionsWithTapadMatched","key":"Requested impressions (Identity)/sessionsWithTapadMatched","label":"Impressions with Tapad matched" },{ "id":"tapadMatchRate","key":"Requested impressions (Identity)/tapadMatchRate","label":"Tapad match rate" },{ "id":"sessionsWithExelateQueried","key":"Requested impressions (Identity)/sessionsWithExelateQueried","label":"Impressions with Exelate queried" },{ "id":"sessionsWithExelateMatched","key":"Requested impressions (Identity)/sessionsWithExelateMatched","label":"Impressions with Exelate matched" },{ "id":"exelateMatchRate","key":"Requested impressions (Identity)/exelateMatchRate","label":"Exelate match rate" },{ "id":"sessionsWithLotameQueried","key":"Requested impressions (Identity)/sessionsWithLotameQueried","label":"Impressions with Lotame queried" },{ "id":"sessionsWithLotameMatched","key":"Requested impressions (Identity)/sessionsWithLotameMatched","label":"Impressions with Lotame matched" },{ "id":"lotameMatchRate","key":"Requested impressions (Identity)/lotameMatchRate","label":"Lotame match rate" }] },{ "id":"Errors","label":"Errors","items":[{ "id":"errors","key":"Errors/errors","label":"Errors" },{ "id":"sessionsWithErrorMultipleStickyAds","key":"Errors/sessionsWithErrorMultipleStickyAds","label":"Impressions with error 'More than one sticky ad served into page.'" },{ "id":"sessionsWithErrorNonFriendlyIFrame","key":"Errors/sessionsWithErrorNonFriendlyIFrame","label":"Impressions with error 'Ad served into a non-friendly iframe.'" },{ "id":"sessionsWithErrorNonMobileOptimized","key":"Errors/sessionsWithErrorNonMobileOptimized","label":"Impressions with error 'Ad served into a webpage that is not mobile-optimized.'" },{ "id":"sessionsWithErrorMissingMraidObject","key":"Errors/sessionsWithErrorMissingMraidObject","label":"Impressions with error 'mraid object doesn't exist.'" },{ "id":"sessionsWithErrorUnsupportedBrowserOrOS","key":"Errors/sessionsWithErrorUnsupportedBrowserOrOS","label":"Impressions with error 'Unsupported OS on mobile device or browser on non-mobile device.'" },{ "id":"sessionsWithErrorMraidMismatchPlacementInterstitial","key":"Errors/sessionsWithErrorMraidMismatchPlacementInterstitial","label":"Impressions with error 'Ad placement is Interstitial, but creative is not.'" },{ "id":"sessionsWithErrorMraidMismatchPlacementInline","key":"Errors/sessionsWithErrorMraidMismatchPlacementInline","label":"Impressions with error 'Creative is Interstitial format, but ad placement is not.'" },{ "id":"sessionsWithErrorMraidNotCompliant","key":"Errors/sessionsWithErrorMraidNotCompliant","label":"Impressions with error 'Unused.'" },{ "id":"sessionsWithErrorClickUrlNotExpanded","key":"Errors/sessionsWithErrorClickUrlNotExpanded","label":"Impressions with error 'clickUrl is non-empty and contains a value that is not a URL.'" },{ "id":"sessionsWithErrorMraidPlacementTypeNotCompliant","key":"Errors/sessionsWithErrorMraidPlacementTypeNotCompliant","label":"Impressions with error 'mraid.getPlacementType is not available or returns an invalid value.'" },{ "id":"sessionsWithErrorEventLimitReached","key":"Errors/sessionsWithErrorEventLimitReached","label":"Impressions with error 'Tracking event limit reached.'" },{ "id":"sessionsWithErrorVpaidNotSupported","key":"Errors/sessionsWithErrorVpaidNotSupported","label":"Impressions with error 'VPAID is not available.'" },{ "id":"sessionsWithErrorMissingVideoObject","key":"Errors/sessionsWithErrorMissingVideoObject","label":"Impressions with error 'VPAID Creative; No Video component on the first screen.'" },{ "id":"sessionsWithErrorMissingMasterVideoObject","key":"Errors/sessionsWithErrorMissingMasterVideoObject","label":"Impressions with error 'VPAID Creative; No MasterVideo component on the master screen.'" },{ "id":"sessionsWithErrorCheckNoMraidOnWebFailed","key":"Errors/sessionsWithErrorCheckNoMraidOnWebFailed","label":"Impressions with error 'Creative used Mobile Web adapter in MRAID environment.'" },{ "id":"sessionsWithErrorExpandBeforeAppear","key":"Errors/sessionsWithErrorExpandBeforeAppear","label":"Impressions with error 'Creative expanded before appearing.'" },{ "id":"sessionsWithErrorUnitVariantsDoNotFitPlacement","key":"Errors/sessionsWithErrorUnitVariantsDoNotFitPlacement","label":"Impressions with error 'Placement is too small to fit any of the unit variants defined on the Creative.'" }] },{ "id":"Actions","label":"Actions","items":[{ "id":"customEventOccurs","key":"Actions/customEventOccurs","label":"Custom event occurrences" },{ "id":"customEventOccursUniqueBySession","key":"Actions/customEventOccursUniqueBySession","label":"Custom event occurrences unique by impression" },{ "id":"urlOpens","key":"Actions/urlOpens","label":"Website opens" },{ "id":"urlOpensOnScreen","key":"Actions/urlOpensOnScreen","label":"Website opens on screen" },{ "id":"storeOpens","key":"Actions/storeOpens","label":"App store opens" },{ "id":"phoneCalls","key":"Actions/phoneCalls","label":"Phone calls" },{ "id":"pinterestPinAttempts","key":"Actions/pinterestPinAttempts","label":"Pin on Pinterest attempts" },{ "id":"photoSelections","key":"Actions/photoSelections","label":"Photo selections" },{ "id":"facebookShareAttempts","key":"Actions/facebookShareAttempts","label":"Facebook share attempts" },{ "id":"twitterShareAttempts","key":"Actions/twitterShareAttempts","label":"Twitter share attempts" },{ "id":"whatsAppShareAttempts","key":"Actions/whatsAppShareAttempts","label":"WhatsApp share attempts" },{ "id":"twitterProfileOpens","key":"Actions/twitterProfileOpens","label":"Twitter profile opens" },{ "id":"tweetPageOpens","key":"Actions/tweetPageOpens","label":"Tweet attempts" },{ "id":"formSubmissionAttempts","key":"Actions/formSubmissionAttempts","label":"Form submission attempts" },{ "id":"formSubmissionSuccesses","key":"Actions/formSubmissionSuccesses","label":"Form submission successes" },{ "id":"saveImageAttempts","key":"Actions/saveImageAttempts","label":"Save image attempts" }] },{ "id":"Relevancy","label":"Relevancy","items":[{ "id":"sessionsWithRelevancy","key":"Relevancy/sessionsWithRelevancy","label":"Programmatic impressions" },{ "id":"sessionsWithRelevancyDataAvailable","key":"Relevancy/sessionsWithRelevancyDataAvailable","label":"Measurable programmatic impressions" },{ "id":"sessionsWithNonDefaultRelevancyVariantChosen","key":"Relevancy/sessionsWithNonDefaultRelevancyVariantChosen","label":"Personalized impressions" },{ "id":"sessionsWithDefaultRelevancyVariantChosen","key":"Relevancy/sessionsWithDefaultRelevancyVariantChosen","label":"Non-personalized impressions" },{ "id":"dataAvailableRate","key":"Relevancy/dataAvailableRate","label":"Programmatic data available rate" },{ "id":"nonDefaultRelevancyVariantChosenRate","key":"Relevancy/nonDefaultRelevancyVariantChosenRate","label":"Personalization rate" },{ "id":"defaultVariantChosenRate","key":"Relevancy/defaultVariantChosenRate","label":"Non-personalization rate" },{ "id":"creativeMediaMismatchRate","key":"Relevancy/creativeMediaMismatchRate","label":"Creative-media mismatch rate" },{ "id":"dataNonAvailabilityRate","key":"Relevancy/dataNonAvailabilityRate","label":"Data non-availability rate" },{ "id":"creativeToMediaAlignment","key":"Relevancy/creativeToMediaAlignment","label":"Creative to media alignment" },{ "id":"sessionsWithSignal","key":"Relevancy/sessionsWithSignal","label":"Per-signal type programmatic impressions" },{ "id":"sessionsWithSignalDataAvailable","key":"Relevancy/sessionsWithSignalDataAvailable","label":"Per-signal type measurable impressions" },{ "id":"sessionsWithSignalNonDefaultVariantChosen","key":"Relevancy/sessionsWithSignalNonDefaultVariantChosen","label":"Per-signal type personalized impressions" },{ "id":"sessionsWithResoldThirdPartyAudienceData","key":"Relevancy/sessionsWithResoldThirdPartyAudienceData","label":"Impressions with resold third-party audience data" }] },{ "id":"AdWords","label":"AdWords","items":[{ "id":"adWordsImpressions","key":"AdWords/adWordsImpressions","label":"AdWords impressions" },{ "id":"adWordsEngagements","key":"AdWords/adWordsEngagements","label":"AdWords engagements" },{ "id":"adWordsVideoViews","key":"AdWords/adWordsVideoViews","label":"AdWords video views" },{ "id":"adWordsFirstQuartileViews","key":"AdWords/adWordsFirstQuartileViews","label":"1st quartile AdWords video completes" },{ "id":"adWordsMidpointQuartileViews","key":"AdWords/adWordsMidpointQuartileViews","label":"2nd quartile AdWords video completes" },{ "id":"adWordsThirdQuartileViews","key":"AdWords/adWordsThirdQuartileViews","label":"3rd quartile AdWords video completes" },{ "id":"adWordsCompletions","key":"AdWords/adWordsCompletions","label":"AdWords video completes" },{ "id":"adWordsFirstQuartileRate","key":"AdWords/adWordsFirstQuartileRate","label":"1st quartile AdWords video views rate" },{ "id":"adWordsMidpointQuartileRate","key":"AdWords/adWordsMidpointQuartileRate","label":"2nd quartile AdWords video views rate" },{ "id":"adWordsThirdQuartileRate","key":"AdWords/adWordsThirdQuartileRate","label":"3rd quartile AdWords video views rate" },{ "id":"adWordsCompletionRate","key":"AdWords/adWordsCompletionRate","label":"AdWords video completion rate" },{ "id":"adWordsClicks","key":"AdWords/adWordsClicks","label":"AdWords clicks" },{ "id":"adWordsCost","key":"AdWords/adWordsCost","label":"AdWords cost" }] },{ "id":"Facebook","label":"Facebook","items":[{ "id":"facebookImpressions","key":"Facebook/facebookImpressions","label":"Facebook impressions" },{ "id":"facebookLikes","key":"Facebook/facebookLikes","label":"Facebook likes" },{ "id":"facebookClicks","key":"Facebook/facebookClicks","label":"Facebook clicks" },{ "id":"facebookPostEngagements","key":"Facebook/facebookPostEngagements","label":"Facebook post engagement" },{ "id":"facebookPostReactions","key":"Facebook/facebookPostReactions","label":"Facebook post reactions" },{ "id":"facebookPageEngagements","key":"Facebook/facebookPageEngagements","label":"Facebook page engagements" },{ "id":"facebookLinkClicks","key":"Facebook/facebookLinkClicks","label":"Facebook link clicks" },{ "id":"facebookVideoTenSecondsPlayed","key":"Facebook/facebookVideoTenSecondsPlayed","label":"Facebook video ten seconds played" },{ "id":"facebookFirstQuartileViews","key":"Facebook/facebookFirstQuartileViews","label":"Facebook 1st quartile video views" },{ "id":"facebookMidpointQuartileViews","key":"Facebook/facebookMidpointQuartileViews","label":"Facebook 2nd quartile video views" },{ "id":"facebookThirdQuartileViews","key":"Facebook/facebookThirdQuartileViews","label":"Facebook 3nd quartile video views" },{ "id":"facebookCompletions","key":"Facebook/facebookCompletions","label":"Facebook completions" }] },{ "id":"DBM","label":"DBM","items":[{ "id":"dbmImpressions","key":"DBM/dbmImpressions","label":"DBM impressions" },{ "id":"dbmViews","key":"DBM/dbmViews","label":"DBM views" },{ "id":"dbmViewRate","key":"DBM/dbmViewRate","label":"DBM view rate" },{ "id":"dbmEarnedViews","key":"DBM/dbmEarnedViews","label":"DBM earned views" },{ "id":"dbmClicks","key":"DBM/dbmClicks","label":"DBM clicks" },{ "id":"dbmEngagements","key":"DBM/dbmEngagements","label":"DBM engagements" },{ "id":"dbmEngagementRate","key":"DBM/dbmEngagementRate","label":"DBM engagement rate" },{ "id":"dbmFirstQuartileCompletes","key":"DBM/dbmFirstQuartileCompletes","label":"DBM 1st quartile video views" },{ "id":"dbmMidpoints","key":"DBM/dbmMidpoints","label":"DBM 2nd quartile video views" },{ "id":"dbmThirdQuartileCompletes","key":"DBM/dbmThirdQuartileCompletes","label":"DBM 3rd quartile video views" },{ "id":"dbmCompletions","key":"DBM/dbmCompletions","label":"DBM completed video views" }] },{ "id":"Locator","label":"Locator","items":[{ "id":"locatorShows","key":"Locator/locatorShows","label":"Locator feature views" },{ "id":"locatorShowsWithInteraction","key":"Locator/locatorShowsWithInteraction","label":"Locator engagements" },{ "id":"locatorInteractionRate","key":"Locator/locatorInteractionRate","label":"Locator engagement rate" },{ "id":"locatorListViews","key":"Locator/locatorListViews","label":"Locator list views" },{ "id":"locatorMapViews","key":"Locator/locatorMapViews","label":"Locator map views" },{ "id":"locationDirectionClicks","key":"Locator/locationDirectionClicks","label":"Location direction clicks" },{ "id":"locationEmailClicks","key":"Locator/locationEmailClicks","label":"Location email clicks" },{ "id":"locationUrlOpens","key":"Locator/locationUrlOpens","label":"Location website opens" },{ "id":"locationPhoneCalls","key":"Locator/locationPhoneCalls","label":"Location phone calls" },{ "id":"locationShows","key":"Locator/locationShows","label":"Location views" },{ "id":"locatorSearchClicks","key":"Locator/locatorSearchClicks","label":"Locator search clicks" }] },{ "id":"Rendered impressions","label":"Rendered impressions","items":[{ "id":"creativeRenders","key":"Rendered impressions/creativeRenders","label":"Rendered impressions" },{ "id":"creativeRenderRate","key":"Rendered impressions/creativeRenderRate","label":"Render rate" },{ "id":"creativeShows","key":"Rendered impressions/creativeShows","label":"Rendered impressions (old)" },{ "id":"creativeShowRate","key":"Rendered impressions/creativeShowRate","label":"Render rate" },{ "id":"creativeShowsWithMeasurableViewability00","key":"Rendered impressions/creativeShowsWithMeasurableViewability00","label":"Rendered impressions (old, measurable for core viewability)" },{ "id":"creativeShowsWithMeasurableViewability501","key":"Rendered impressions/creativeShowsWithMeasurableViewability501","label":"Rendered impressions (old, measurable for IAB viewability)" },{ "id":"creativeShowsWithoutMeasurableViewability00","key":"Rendered impressions/creativeShowsWithoutMeasurableViewability00","label":"Rendered impressions (old, not measurable for core viewability)" },{ "id":"creativeShowsWithoutMeasurableViewability501","key":"Rendered impressions/creativeShowsWithoutMeasurableViewability501","label":"Rendered impressions (old, not measurable for IAB viewability)" }] },{ "id":"Loaded impressions","label":"Loaded impressions","items":[{ "id":"creativeLoads","key":"Loaded impressions/creativeLoads","label":"Loaded impressions" },{ "id":"creativeLoadRate","key":"Loaded impressions/creativeLoadRate","label":"Load rate" },{ "id":"sessionsWithLoadingTime","key":"Loaded impressions/sessionsWithLoadingTime","label":"Impressions with measured loading time" },{ "id":"loadingTime","key":"Loaded impressions/loadingTime","label":"Loading time" },{ "id":"avgLoadingTime","key":"Loaded impressions/avgLoadingTime","label":"Avg. loading time" },{ "id":"sessionsWithLongLoadingTime","key":"Loaded impressions/sessionsWithLongLoadingTime","label":"Impressions with long loading time" },{ "id":"longLoadingTimeRate","key":"Loaded impressions/longLoadingTimeRate","label":"Long loading time rate" }] },{ "id":"Loaded impressions (Core viewability)","label":"Loaded impressions (Core viewability)","items":[{ "id":"creativeViews00","key":"Loaded impressions (Core viewability)/creativeViews00","label":"Core viewable impressions" },{ "id":"creativeNonViews00","key":"Loaded impressions (Core viewability)/creativeNonViews00","label":"Core non-viewable impressions" },{ "id":"creativeLoadsWithMeasurableViewability00","key":"Loaded impressions (Core viewability)/creativeLoadsWithMeasurableViewability00","label":"Loaded impressions with determined core viewability" },{ "id":"creativeLoadsWithoutMeasurableViewability00","key":"Loaded impressions (Core viewability)/creativeLoadsWithoutMeasurableViewability00","label":"Loaded impressions with undetermined core viewability" },{ "id":"creativeShows00","key":"Loaded impressions (Core viewability)/creativeShows00","label":"Rendered impressions" },{ "id":"pctCreativeLoadsWithMeasurableViewability00","key":"Loaded impressions (Core viewability)/pctCreativeLoadsWithMeasurableViewability00","label":"Core measured rate" },{ "id":"viewableRate00","key":"Loaded impressions (Core viewability)/viewableRate00","label":"Core viewable rate" }] },{ "id":"Loaded impressions (Viewability)","label":"Loaded impressions (Viewability)","items":[{ "id":"creativeViews501","key":"Loaded impressions (Viewability)/creativeViews501","label":"Viewable impressions" },{ "id":"creativeNonViews501","key":"Loaded impressions (Viewability)/creativeNonViews501","label":"Non-viewable impressions" },{ "id":"creativeLoadsWithMeasurableViewability501","key":"Loaded impressions (Viewability)/creativeLoadsWithMeasurableViewability501","label":"Loaded impressions with determined viewability" },{ "id":"creativeLoadsWithoutMeasurableViewability501","key":"Loaded impressions (Viewability)/creativeLoadsWithoutMeasurableViewability501","label":"Loaded impressions with undetermined viewability" },{ "id":"pctCreativeLoadsWithMeasurableViewability501","key":"Loaded impressions (Viewability)/pctCreativeLoadsWithMeasurableViewability501","label":"Measured rate" },{ "id":"viewableRate501","key":"Loaded impressions (Viewability)/viewableRate501","label":"Viewable rate" }] },{ "id":"Creative structure","label":"Creative structure","items":[{ "id":"unitShows","key":"Creative structure/unitShows","label":"Unit views" },{ "id":"unitVariantShows","key":"Creative structure/unitVariantShows","label":"Unit variant views" },{ "id":"primaryUnitShows","key":"Creative structure/primaryUnitShows","label":"Primary unit views" },{ "id":"bannerUnitShows","key":"Creative structure/bannerUnitShows","label":"Banner unit views" },{ "id":"modalUnitShows","key":"Creative structure/modalUnitShows","label":"Modal unit views" },{ "id":"screenShows","key":"Creative structure/screenShows","label":"Page views" }] },{ "id":"A/B testing","label":"A/B testing","items":[{ "id":"abVariantChoices","key":"A/B testing/abVariantChoices","label":"A/B test variant choices" },{ "id":"abExposures","key":"A/B testing/abExposures","label":"A/B test exposures" },{ "id":"abSuccesses","key":"A/B testing/abSuccesses","label":"A/B test successes" },{ "id":"abSuccessRate","key":"A/B testing/abSuccessRate","label":"A/B test success rate" }] },{ "id":"Requested impressions","label":"Requested impressions","items":[{ "id":"sessions","key":"Requested impressions/sessions","label":"Requested impressions" },{ "id":"invalidSessions","key":"Requested impressions/invalidSessions","label":"Invalid requested impressions" },{ "id":"creativeLoadAttempts","key":"Requested impressions/creativeLoadAttempts","label":"Creative load attempts" },{ "id":"sessionsWithGpsPassed","key":"Requested impressions/sessionsWithGpsPassed","label":"Impressions with GPS passed" }] },{ "id":"Expansions","label":"Expansions","items":[{ "id":"sessionsWithExpandAttempt","key":"Expansions/sessionsWithExpandAttempt","label":"Ad expansions" },{ "id":"sessionsWithIntentionalExpandAttempt","key":"Expansions/sessionsWithIntentionalExpandAttempt","label":"Intentional ad expansions" },{ "id":"expansionRate","key":"Expansions/expansionRate","label":"Ad expansion rate" }] },{ "id":"Display","label":"Display","items":[{ "id":"viewableTime","key":"Display/viewableTime","label":"Exposure time" },{ "id":"sessionsWithViewableTime","key":"Display/sessionsWithViewableTime","label":"Impressions with exposure time" },{ "id":"avgViewableTime","key":"Display/avgViewableTime","label":"Avg. exposure time" }] },{ "id":"Test","label":"Test","items":[{ "id":"iosSessions","key":"Test/iosSessions","label":"Ios requested impressions" }] },{ "id":"Aggregators","label":"Aggregators","items":[{ "id":"aggregatorValue","key":"Aggregators/aggregatorValue","label":"Aggregator value" }] }]

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

const defaultNestedItems = [
    { id: 'a', label: 'G1', items: defaultItems },
    { id: 'b', label: 'G2', items: [
        { id: '1', key: 'G2/1', label: "Something", metadata: 'someone@lorem.ipsum', tooltip: 'Test tooltip' },
        { id: '11', label: "D", metadata: 'someone@lorem.ipsum' },
        { id: '12', label: "E", metadata: 'someone@lorem.ipsum' },
        { id: '13', label: "F", metadata: 'someone@lorem.ipsum' },
        { id: '14', label: "G", metadata: 'someone@lorem.ipsum', tooltip: 'Something else' },
    ] },
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
        rootCss: {
            width: '450px',
        },
        defaultProps: {
            options: largeItems,
            value: [],
            isSearchable: true,
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
            options: defaultItems,
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
    Toast: {
        component: Toast,
    },
    Tooltip: {
        component: Tooltip,
    },
    PieChart: {
        component: PieChart,
    },
    InlineDialog: {
        component: InlineDialog,
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
        rootCss: {
            width: '450px',
        },
        defaultProps: {
            label: 'Something',
            value: [],
            getSuggestions: (text) => {
                return [
                    { id: '1', label: "Something", metadata: 'zan.kusterle@gmail.com', icon: 'plus' },
                    { id: '2', label: "Lorem" },
                    { id: '3', label: "Ipsum", metadata: 'someone@lorem.ipsum' },
                ]
            },
            isValid: (text) => {
                if (text && text.length > 0 && text.indexOf('@') === -1) {
                    return 'Not a valid email address'
                }
                return null
            },
        },
    },
    Chip: {
        component: Chip,
        defaultProps: {
            label: 'Label',
            metadata: '3/9',
            theme: 'light',
        },
    },
    ChipWithMultiselect: {
        component: ChipWithMultiselect,
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
            isSearchable: true,
            canSelectAll: true,
            canClearAll: true,
            chipLabel: 'Chip Label',
            searchLabel: 'Search Label',
        },
    },
}
