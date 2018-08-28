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

const largeItems = [{ "id":"Time (UTC)","label":"TIME (UTC)","items":[{ "id":"utcDate","key":"Time (UTC)/utcDate","label":"Date (UTC)","tooltip":"The date on which the impression was registered.","disabled":false },{ "id":"utcYear","key":"Time (UTC)/utcYear","label":"Year (UTC)","tooltip":"The year in which the impression was registered.","disabled":false },{ "id":"utcMonth","key":"Time (UTC)/utcMonth","label":"Month (UTC)","tooltip":"The month in which the impression was registered.","disabled":false },{ "id":"utcWeek","key":"Time (UTC)/utcWeek","label":"Week (UTC)","tooltip":"The week of the year in which the impression was registered.","disabled":false },{ "id":"utcDay","key":"Time (UTC)/utcDay","label":"Day (UTC)","tooltip":"The day on which the impression was registered.","disabled":false },{ "id":"utcHour","key":"Time (UTC)/utcHour","label":"Hour of day (UTC)","tooltip":"The hour in which the impression was registered.","disabled":false },{ "id":"utcHourTimestamp","key":"Time (UTC)/utcHourTimestamp","label":"Hour timestamp (UTC)","tooltip":"The timestamp of the beginning of the hour when the impression was registered.","disabled":false }] },{ "id":"Time (account)","label":"TIME (ACCOUNT)","items":[{ "id":"accountDate","key":"Time (account)/accountDate","label":"Date (account)","tooltip":"The date on which the impression was registered, in the account time zone.","disabled":false },{ "id":"accountYear","key":"Time (account)/accountYear","label":"Year (account)","tooltip":"The year in which the impression was registered, in the account's time zone.","disabled":false },{ "id":"accountMonth","key":"Time (account)/accountMonth","label":"Month (account)","tooltip":"The month in which the impression was registered, in the account's time zone.","disabled":false },{ "id":"accountWeek","key":"Time (account)/accountWeek","label":"Week (account)","tooltip":"The week of the year in which the impression was registered, in the account's time zone.","disabled":false },{ "id":"accountDay","key":"Time (account)/accountDay","label":"Day (account)","tooltip":"The day on which the impression was registered, in the account's time zone.","disabled":false },{ "id":"accountHour","key":"Time (account)/accountHour","label":"Hour of day (account)","tooltip":"The hour in which the impression was registered, in the account's time zone.","disabled":false },{ "id":"accountHourTimestamp","key":"Time (account)/accountHourTimestamp","label":"Hour timestamp (account)","tooltip":"The timestamp of the beginning of the hour when the impression was registered, in the accounts time zone.","disabled":false }] },{ "id":"Account","label":"ACCOUNT","items":[{ "id":"accountId","key":"Account/accountId","label":"Account ID","tooltip":"The ID of the account.","disabled":false },{ "id":"accountName","key":"Account/accountName","label":"Account name","tooltip":"The name of the account.","disabled":false },{ "id":"accountInternalName","key":"Account/accountInternalName","label":"Account internal name","tooltip":"The internal name of the account.","disabled":false },{ "id":"accountIdentifier","key":"Account/accountIdentifier","label":"Account identifier","tooltip":"The subdomain of the account.","disabled":false },{ "id":"clientType","key":"Account/clientType","label":"Client type","tooltip":"The type of client which owns the account.","disabled":false },{ "id":"billingCountry","key":"Account/billingCountry","label":"Billing country","tooltip":"The country where the account is billed.","disabled":false },{ "id":"billingRegion","key":"Account/billingRegion","label":"Billing region","tooltip":"The region where the account is billed, based on the selected country.","disabled":false },{ "id":"billingCurrency","key":"Account/billingCurrency","label":"Billing currency","tooltip":"Currency used for invoicing/billing purposes.","disabled":false },{ "id":"contractType","key":"Account/contractType","label":"Contract type","tooltip":"Contract style (MSA or IO).","disabled":false },{ "id":"payeeException","key":"Account/payeeException","label":"Payee exception","tooltip":"Indicates that account is not a payee for some of its invoices.","disabled":false },{ "id":"sellerId","key":"Account/sellerId","label":"Seller ID","tooltip":"The ID of the seller assigned to the account.","disabled":false },{ "id":"sellerFullName","key":"Account/sellerFullName","label":"Seller name","tooltip":"The full name of the seller assigned to the account.","disabled":false },{ "id":"accountManagerId","key":"Account/accountManagerId","label":"Account manager ID","tooltip":"The ID of the account manager assigned to the account.","disabled":false },{ "id":"accountManagerFullName","key":"Account/accountManagerFullName","label":"Account manager name","tooltip":"The full name of the account manager assigned to the account.","disabled":false },{ "id":"managedAccount","key":"Account/managedAccount","label":"Managed account","tooltip":"Indicates that account is managed by Celtra.","disabled":false },{ "id":"accountCreationDate","key":"Account/accountCreationDate","label":"Account creation date (UTC)","tooltip":"UTC date when account was created.","disabled":false }] },{ "id":"Campaign","label":"CAMPAIGN","items":[{ "id":"campaignId","key":"Campaign/campaignId","label":"Campaign ID","tooltip":"The ID of the campaign.","disabled":false },{ "id":"campaignName","key":"Campaign/campaignName","label":"Campaign name","tooltip":"The name of the campaign.","disabled":false },{ "id":"goals","key":"Campaign/goals","label":"Goals","tooltip":"The goals of the campaign.","disabled":false },{ "id":"campaignCountries","key":"Campaign/campaignCountries","label":"Campaign countries","tooltip":"Countries running campaign.","disabled":false },{ "id":"campaignCreationDate","key":"Campaign/campaignCreationDate","label":"Campaign creation date (UTC)","tooltip":"UTC date when campaign was created.","disabled":false }] },{ "id":"Creative","label":"CREATIVE","items":[{ "id":"creativeId","key":"Creative/creativeId","label":"Creative ID","tooltip":"The ID of the creative, or '(unknown)' when Incrementality is enabled on the campaign and PSA creative was chosen instead.","disabled":false },{ "id":"creativeName","key":"Creative/creativeName","label":"Creative name","tooltip":"The name of the creative.","disabled":false },{ "id":"sourceCreativeId","key":"Creative/sourceCreativeId","label":"Creative assets source creative ID","tooltip":"The ID of the source creative from creative assets folder.","disabled":false },{ "id":"sourceCreativeName","key":"Creative/sourceCreativeName","label":"Creative assets source creative name","tooltip":"The name of the source creative from creative assets folder.","disabled":false },{ "id":"product","key":"Creative/product","label":"Product","tooltip":"The Product on which the creative is built.","disabled":false },{ "id":"billingRate","key":"Creative/billingRate","label":"Billing rate","tooltip":"Non-discounted billing rate.","disabled":false },{ "id":"billingRateException","key":"Creative/billingRateException","label":"Billing rate exception","tooltip":"Indicates that account has non-standard rates for some campaigns.","disabled":false },{ "id":"format","key":"Creative/format","label":"Format","tooltip":"The format of the creative.","disabled":false },{ "id":"intendedDeviceType","key":"Creative/intendedDeviceType","label":"Intended device type","tooltip":"The device type for which the creative was intended.","disabled":false },{ "id":"templateName","key":"Creative/templateName","label":"Template name","tooltip":"The name of the template used to track publisher specific formats.","disabled":false },{ "id":"creativeCreationDate","key":"Creative/creativeCreationDate","label":"Creative creation date (UTC)","tooltip":"UTC date when creative was created.","disabled":false },{ "id":"sourceCreativeCreationDate","key":"Creative/sourceCreativeCreationDate","label":"Creative assets source creative date (UTC)","tooltip":"UTC date when the source creative from creative assets folder of this creative was created.","disabled":false },{ "id":"firstUnitVariantWidth","key":"Creative/firstUnitVariantWidth","label":"Unit variant width (first rendered per impression)","tooltip":"Width of the unit variant that was the first one rendered in an impression.","disabled":false },{ "id":"firstUnitVariantHeight","key":"Creative/firstUnitVariantHeight","label":"Unit variant height (first rendered per impression)","tooltip":"Height of the unit variant that was the first one rendered in an impression.","disabled":false },{ "id":"firstUnitVariantName","key":"Creative/firstUnitVariantName","label":"Unit variant (first rendered per impression)","tooltip":"Name of the unit variant that was the first one rendered in an impression.","disabled":false }] },{ "id":"Snapchat","label":"SNAPCHAT","items":[{ "id":"creativeName","key":"Snapchat/creativeName","label":"Creative name","tooltip":"The name of the creative.","disabled":false },{ "id":"snapchatAdId","key":"Snapchat/snapchatAdId","label":"Snapchat ad ID","tooltip":"The id of the Snapchat ad.","disabled":false },{ "id":"snapchatAdName","key":"Snapchat/snapchatAdName","label":"Snapchat ad name","tooltip":"The name of the Snapchat ad.","disabled":false },{ "id":"snapchatAdType","key":"Snapchat/snapchatAdType","label":"Snapchat ad type","tooltip":"The type of Snapchat ad.","disabled":false },{ "id":"snapchatAdStatus","key":"Snapchat/snapchatAdStatus","label":"Snapchat ad status","tooltip":"The status of Snapchat ad.","disabled":false },{ "id":"snapchatAdReviewStatus","key":"Snapchat/snapchatAdReviewStatus","label":"Snapchat ad review status","tooltip":"The ad review status of Snapchat ad.","disabled":false },{ "id":"snapchatAccountName","key":"Snapchat/snapchatAccountName","label":"Snapchat account name","tooltip":"The name of Snapchat account.","disabled":false },{ "id":"snapchatAccountTimezone","key":"Snapchat/snapchatAccountTimezone","label":"Snapchat account timezone","tooltip":"The timezone of Snapchat account.","disabled":false },{ "id":"snapchatAdSquadId","key":"Snapchat/snapchatAdSquadId","label":"Snapchat ad squad ID","tooltip":"The ad squad ID of Snapchat ad.","disabled":false },{ "id":"snapchatCreativeId","key":"Snapchat/snapchatCreativeId","label":"Snapchat creative ID","tooltip":"The creative ID of Snapchat ad.","disabled":false }] },{ "id":"Placement","label":"PLACEMENT","items":[{ "id":"placementId","key":"Placement/placementId","label":"Placement ID","tooltip":"The ID of the placement in which the creative was trafficked.","disabled":false },{ "id":"placementName","key":"Placement/placementName","label":"Placement name","tooltip":"The name of the placement in which the creative was trafficked.","disabled":false },{ "id":"placementCreationDate","key":"Placement/placementCreationDate","label":"Placement creation date (UTC)","tooltip":"UTC date when placement was created.","disabled":false }] },{ "id":"Partner","label":"PARTNER","items":[{ "id":"supplierId","key":"Partner/supplierId","label":"Supplier ID","tooltip":"The ID of the supplier.","disabled":false },{ "id":"supplierName","key":"Partner/supplierName","label":"Supplier name","tooltip":"The name of the supplier.","disabled":false },{ "id":"brandId","key":"Partner/brandId","label":"Brand ID","tooltip":"The ID of the brand/advertiser.","disabled":false },{ "id":"brandName","key":"Partner/brandName","label":"Brand name","tooltip":"The name of the brand/advertiser.","disabled":false }] },{ "id":"External ad server","label":"EXTERNAL AD SERVER","items":[{ "id":"externalAdServer","key":"External ad server/externalAdServer","label":"External ad server","tooltip":"The external Ad Server through which the ad was trafficked.","disabled":false },{ "id":"externalCampaignId","key":"External ad server/externalCampaignId","label":"External campaign ID","tooltip":"The ID of the campaign on the external Ad Server.","disabled":false },{ "id":"externalCampaignName","key":"External ad server/externalCampaignName","label":"External campaign name","tooltip":"The name of the campaign on the external Ad Server.","disabled":false },{ "id":"externalCreativeId","key":"External ad server/externalCreativeId","label":"External creative ID","tooltip":"The ID of the creative on the external Ad Server.","disabled":false },{ "id":"externalCreativeName","key":"External ad server/externalCreativeName","label":"External creative name","tooltip":"The name of the creative on the external Ad Server.","disabled":false },{ "id":"externalPlacementId","key":"External ad server/externalPlacementId","label":"External placement ID","tooltip":"The ID of the placement on the external Ad Server.","disabled":false },{ "id":"externalPlacementName","key":"External ad server/externalPlacementName","label":"External placement name","tooltip":"The name of the placement on the external Ad Server.","disabled":false },{ "id":"externalSiteId","key":"External ad server/externalSiteId","label":"External site ID","tooltip":"The ID of the site on the external Ad Server.","disabled":false },{ "id":"externalSiteName","key":"External ad server/externalSiteName","label":"External site name","tooltip":"The name of the site on the external Ad Server.","disabled":false },{ "id":"externalSupplierId","key":"External ad server/externalSupplierId","label":"External supplier ID","tooltip":"The ID of the supplier (publisher or exchange) on the external Ad Server.","disabled":false },{ "id":"externalSupplierName","key":"External ad server/externalSupplierName","label":"External supplier name","tooltip":"The name of the supplier (publisher or exchange) on the external Ad Server.","disabled":false },{ "id":"externalLineItemId","key":"External ad server/externalLineItemId","label":"External line item ID","tooltip":"The ID of the line item on the external Ad Server.","disabled":false },{ "id":"externalBundleId","key":"External ad server/externalBundleId","label":"External bundle ID","tooltip":"The Bundle ID of the app inventory, e.g., com.company.app, as provided by the external Ad Server.","disabled":false },{ "id":"externalCreativeWidth","key":"External ad server/externalCreativeWidth","label":"External creative width","tooltip":"The width of the creative, as provided by the external Ad Server.","disabled":false },{ "id":"externalCreativeHeight","key":"External ad server/externalCreativeHeight","label":"External creative height","tooltip":"The height of the creative, as provided by the external Ad Server.","disabled":false },{ "id":"tagVersion","key":"External ad server/tagVersion","label":"Tag version","tooltip":"The version of tag, which was used to load creative. Possible values are integer or 'unknown'.","disabled":false }] },{ "id":"SDK","label":"SDK","items":[{ "id":"sdk","key":"SDK/sdk","label":"SDK","tooltip":"The SDK used for serving the ad.","disabled":false }] },{ "id":"Device","label":"DEVICE","items":[{ "id":"actualDeviceType","key":"Device/actualDeviceType","label":"Device type","tooltip":"The device type that was recorded in an impression.","disabled":false },{ "id":"platform","key":"Device/platform","label":"Platform","tooltip":"The platform on which the creative was loaded.","disabled":false }] },{ "id":"Display","label":"DISPLAY","items":[{ "id":"viewableTimeBucket","key":"Display/viewableTimeBucket","label":"Exposure time 3s bucket","tooltip":"The grouping of `Impressions with exposure time` in a bucket of specific `Exposure time`.","disabled":false }] },{ "id":"Engagement time","label":"ENGAGEMENT TIME","items":[{ "id":"engagementTimeBucket","key":"Engagement time/engagementTimeBucket","label":"Ad engagement time 1s bucket","tooltip":"The estimated time of user engagement with the ad content.","disabled":false }] },{ "id":"Creative structure","label":"CREATIVE STRUCTURE","items":[{ "id":"unitName","key":"Creative structure/unitName","label":"Unit","tooltip":"The name of the unit, for example: 'banner', 'modal'.","disabled":false },{ "id":"isUnitShowAccidental","key":"Creative structure/isUnitShowAccidental","label":"Is unit view accidental","tooltip":"Indicates if the unit was rendered to the user as a result of an unintentional interaction.","disabled":false },{ "id":"screenDepth","key":"Creative structure/screenDepth","label":"Page depth","tooltip":"The number of unique pages in the unit visited as part of the impression.","disabled":false },{ "id":"timeOnScreenKnown","key":"Creative structure/timeOnScreenKnown","label":"Time on page known","tooltip":"Indicates if the time the user spent on the page is known or not.","disabled":false },{ "id":"screenLocalId","key":"Creative structure/screenLocalId","label":"Page Local ID","tooltip":"The Local ID of the page.","disabled":false },{ "id":"screenTitle","key":"Creative structure/screenTitle","label":"Page name","tooltip":"The name of the page.","disabled":false },{ "id":"unitVariantWidth","key":"Creative structure/unitVariantWidth","label":"Unit variant width","tooltip":"Width of the unit variant for impressions.","disabled":false },{ "id":"unitVariantHeight","key":"Creative structure/unitVariantHeight","label":"Unit variant height","tooltip":"Height of the unit variant for impressions.","disabled":false },{ "id":"unitVariantName","key":"Creative structure/unitVariantName","label":"Unit variant","tooltip":"Name of the unit variant for impressions.","disabled":false }] },{ "id":"Social","label":"SOCIAL","items":[{ "id":"sharedUrl","key":"Social/sharedUrl","label":"Shared url","tooltip":"The URL that was shared in a message or on a social network.","disabled":false },{ "id":"shareType","key":"Social/shareType","label":"Shared type","tooltip":"The type of object that was shared in a message or on a social network.","disabled":false },{ "id":"sharedAssetBlobHash","key":"Social/sharedAssetBlobHash","label":"Shared asset blob hash","tooltip":"The blob hash of the asset (predefined image, video or user-generated content) that was shared in a message or on a social network.","disabled":false }] },{ "id":"Relevancy","label":"RELEVANCY","items":[{ "id":"signal","key":"Relevancy/signal","label":"Signal type","tooltip":"Indicates what specific signal was used for relevancy.","disabled":false },{ "id":"relevancyCause","key":"Relevancy/relevancyCause","label":"Relevancy cause","tooltip":"Whether relevancy was used in this impression and what was the consequence.","disabled":false }] },{ "id":"Actions","label":"ACTIONS","items":[{ "id":"label","key":"Actions/label","label":"Reporting label","tooltip":"A text description used for reporting, as specified in the creative.","disabled":false },{ "id":"imageBlobHash","key":"Actions/imageBlobHash","label":"Image blob hash","tooltip":"The blob hash of the image that the user attempted to download.","disabled":false }] },{ "id":"Inline and 360 Video","label":"INLINE AND 360 VIDEO","items":[{ "id":"label","key":"Inline and 360 Video/label","label":"Reporting label","tooltip":"A text description used for reporting, as specified in the creative.","disabled":false },{ "id":"inlineVideoSourceType","key":"Inline and 360 Video/inlineVideoSourceType","label":"Source type","tooltip":"The source type of the video file. Either 'FILE' or 'URL'.","disabled":false },{ "id":"inlineVideoSource","key":"Inline and 360 Video/inlineVideoSource","label":"Source","tooltip":"The source of the video.","disabled":false },{ "id":"inlineVideoFilename","key":"Inline and 360 Video/inlineVideoFilename","label":"Filename","tooltip":"Filename of uploaded video asset.","disabled":false },{ "id":"inlineVideoPlayerMode","key":"Inline and 360 Video/inlineVideoPlayerMode","label":"Player mode","tooltip":"Indicates the player mode. Possible values: 'display', 'display-action' and '(unknown)'.","disabled":false },{ "id":"videoLength","key":"Inline and 360 Video/videoLength","label":"Video length","tooltip":"The length of the video in seconds, rounded up to the nearest second.","disabled":false },{ "id":"inlineVideoActualAudibility","key":"Inline and 360 Video/inlineVideoActualAudibility","label":"Play audibility","tooltip":"Indicates whether a given Inline Video was played with or without sound.","disabled":false },{ "id":"inlineVideoIntendedAudibility","key":"Inline and 360 Video/inlineVideoIntendedAudibility","label":"Intended audibility","tooltip":"Intended audibility for a given Inline Video component.","disabled":false },{ "id":"inlineVideoPlaySetting","key":"Inline and 360 Video/inlineVideoPlaySetting","label":"Play setting","tooltip":"The initial setting of how a given Inline Video play started.","disabled":false },{ "id":"inlineVideoSecond","key":"Inline and 360 Video/inlineVideoSecond","label":"Second marker","tooltip":"Indicates what specific second a video has played through using each individual second in the length (capped at 120 seconds) of the inline video as an index.","disabled":false },{ "id":"inlineVideoQuarter","key":"Inline and 360 Video/inlineVideoQuarter","label":"Quarter marker","tooltip":"Indicates what specific quarter an Inline Video has played through using each quarter within the entire length of the video as an index.","disabled":false },{ "id":"inlineVideoIs360","key":"Inline and 360 Video/inlineVideoIs360","label":"Is 360 video","tooltip":"Indicates whether the inline video is a 360 video or not.","disabled":false }] },{ "id":"Video","label":"VIDEO","items":[{ "id":"videoLength","key":"Video/videoLength","label":"Video length","tooltip":"The length of the video in seconds, rounded up to the nearest second.","disabled":false },{ "id":"videoSecond","key":"Video/videoSecond","label":"Second","tooltip":"Indicates what specific second the video has played through in its entirety using each individual second in the entire length of the video as an index.","disabled":false }] },{ "id":"Aggregators","label":"AGGREGATORS","items":[{ "id":"aggregatorMetric","key":"Aggregators/aggregatorMetric","label":"Aggregator metric","tooltip":"The aggregator metric name.","disabled":false },{ "id":"aggregatorEncodedDimensions","key":"Aggregators/aggregatorEncodedDimensions","label":"Encoded aggregator dimensions","tooltip":"A query-string structured list of custom aggregator dimension names and values.","disabled":false }] },{ "id":"A/B testing","label":"A/B TESTING","items":[{ "id":"abTest","key":"A/B testing/abTest","label":"A/B test","tooltip":"Name of the A/B test, as defined in the creative.","disabled":false },{ "id":"abTestOptimized","key":"A/B testing/abTestOptimized","label":"A/B test optimized","tooltip":"Whether the A/B test had optimization enabled or not in the creative.","disabled":false },{ "id":"experimentKey","key":"A/B testing/experimentKey","label":"Experiment key","tooltip":"Key that identifies each experiment instance. Is unique per Experiment class ID and scope keys defined for it.","disabled":false },{ "id":"optimizer","key":"A/B testing/optimizer","label":"Optimizer","tooltip":"Optimizer that was used to choose variant for this impression.","disabled":false },{ "id":"abVariant","key":"A/B testing/abVariant","label":"A/B test variant","tooltip":"Variant of the `A/B test`.","disabled":false }] },{ "id":"Locator","label":"LOCATOR","items":[{ "id":"locatorLocalId","key":"Locator/locatorLocalId","label":"Locator local ID","tooltip":"Local ID of the Locator component.","disabled":false },{ "id":"locatorName","key":"Locator/locatorName","label":"Locator name","tooltip":"The name of the Locator component.","disabled":false },{ "id":"objectLocalId","key":"Locator/objectLocalId","label":"Object local ID","tooltip":"Local ID of the component.","disabled":false },{ "id":"objectName","key":"Locator/objectName","label":"Object name","tooltip":"The name of the component.","disabled":false },{ "id":"locationId","key":"Locator/locationId","label":"Location id","tooltip":"Location ID of the location stored in a location table.","disabled":false },{ "id":"locationName","key":"Locator/locationName","label":"Location name","tooltip":"Name of the location as stored in a location table.","disabled":false },{ "id":"locationAddress","key":"Locator/locationAddress","label":"Location address","tooltip":"Address of the location as stored in a location table.","disabled":false },{ "id":"locationCity","key":"Locator/locationCity","label":"Location city","tooltip":"City where the location is located as stored in a location table.","disabled":false },{ "id":"locationState","key":"Locator/locationState","label":"Location state","tooltip":"State where the location is located as stored in a location table.","disabled":false },{ "id":"locationCountry","key":"Locator/locationCountry","label":"Location country","tooltip":"Country where the location is located as stored in a location table.","disabled":false }] },{ "id":"Errors","label":"ERRORS","items":[{ "id":"errorType","key":"Errors/errorType","label":"Type of error","tooltip":"The type of `Error`.","disabled":false },{ "id":"error","key":"Errors/error","label":"Error","tooltip":"The specific error.","disabled":false }] },{ "id":"Requested impressions","label":"REQUESTED IMPRESSIONS","items":[{ "id":"invalidSessionReason","key":"Requested impressions/invalidSessionReason","label":"Invalid impression reason","tooltip":"The reason for impression to be deemed invalid. This can be a consequence of General Invalid Traffic filtration or due to incomplete, erroneous or abnormal data received.","disabled":false }] },{ "id":"Product category","label":"PRODUCT CATEGORY","items":[{ "id":"productCategoryId","key":"Product category/productCategoryId","label":"Product category ID","tooltip":"The ID of the product category.","disabled":false },{ "id":"productCategoryName","key":"Product category/productCategoryName","label":"Product category name","tooltip":"The name of the product category.","disabled":false },{ "id":"productCategoryCode","key":"Product category/productCategoryCode","label":"Product category code","tooltip":"The code of the product category.","disabled":false }] },{ "id":"DBM","label":"DBM","items":[{ "id":"dbmAdId","key":"DBM/dbmAdId","label":"DBM ad ID","tooltip":"The ID of the Trueview ad.","disabled":false },{ "id":"dbmAd","key":"DBM/dbmAd","label":"DBM ad","tooltip":"The name of the Trueview ad.","disabled":false },{ "id":"dbmAdGroupId","key":"DBM/dbmAdGroupId","label":"DBM ad group ID","tooltip":"The ID of the ad group.","disabled":false },{ "id":"dbmAdGroup","key":"DBM/dbmAdGroup","label":"DBM ad group","tooltip":"The name of the ad group.","disabled":false },{ "id":"dbmPartnerId","key":"DBM/dbmPartnerId","label":"DBM partner ID","tooltip":"The DBM partner ID.","disabled":false },{ "id":"dbmPartner","key":"DBM/dbmPartner","label":"DBM partner","tooltip":"The name of the DBM partner.","disabled":false },{ "id":"dbmPartnerStatus","key":"DBM/dbmPartnerStatus","label":"DBM partner status","tooltip":"The status of the DBM partner.","disabled":false },{ "id":"dbmAdvertiserId","key":"DBM/dbmAdvertiserId","label":"DBM advertiser ID","tooltip":"The DBM advertiser ID.","disabled":false },{ "id":"dbmAdvertiser","key":"DBM/dbmAdvertiser","label":"DBM advertiser","tooltip":"The name of the DBM advertiser.","disabled":false },{ "id":"dbmAdvertiserStatus","key":"DBM/dbmAdvertiserStatus","label":"DBM advertiser status","tooltip":"The status of the DBM advertiser.","disabled":false },{ "id":"dbmAdvertiserIntegrationCode","key":"DBM/dbmAdvertiserIntegrationCode","label":"DBM advertiser integration code","tooltip":"The integration code of the DBM advertiser.","disabled":false },{ "id":"dbmInsertionOrderId","key":"DBM/dbmInsertionOrderId","label":"DBM insertion order ID","tooltip":"The DBM insertion order ID.","disabled":false },{ "id":"dbmInsertionOrder","key":"DBM/dbmInsertionOrder","label":"DBM insertion order","tooltip":"The name of the DBM insertion order.","disabled":false },{ "id":"dbmInsertionOrderStatus","key":"DBM/dbmInsertionOrderStatus","label":"DBM insertion order status","tooltip":"The status of the DBM insertion order.","disabled":false },{ "id":"dbmInsertionOrderIntegrationCode","key":"DBM/dbmInsertionOrderIntegrationCode","label":"DBM insertion order integration code","tooltip":"The integration code of the DBM insertion order.","disabled":false },{ "id":"dbmLineItemId","key":"DBM/dbmLineItemId","label":"DBM lineitem ID","tooltip":"The DBM lineitem ID.","disabled":false },{ "id":"dbmLineItem","key":"DBM/dbmLineItem","label":"DBM lineitem","tooltip":"The name of the DBM lineitem.","disabled":false },{ "id":"dbmLineItemStatus","key":"DBM/dbmLineItemStatus","label":"DBM lineitem status","tooltip":"The status of the DBM lineitem.","disabled":false },{ "id":"dbmLineItemIntegrationCode","key":"DBM/dbmLineItemIntegrationCode","label":"DBM lineitem integration code","tooltip":"The integration code of the DBM lineitem.","disabled":false }] },{ "id":"AdWords","label":"ADWORDS","items":[{ "id":"adWordsAccount","key":"AdWords/adWordsAccount","label":"AdWords account","tooltip":"The name of the AdWords account.","disabled":false },{ "id":"adWordsAccountTimeZoneId","key":"AdWords/adWordsAccountTimeZoneId","label":"AdWords account time zone","tooltip":"The name of the time zone selected for the AdWords account.","disabled":false },{ "id":"adWordsAccountCurrencyCode","key":"AdWords/adWordsAccountCurrencyCode","label":"AdWords account currency code","tooltip":"The currency of the AdWords Customer account.","disabled":false },{ "id":"adWordsCustomer","key":"AdWords/adWordsCustomer","label":"AdWords customer name","tooltip":"The name of the AdWords customer.","disabled":false },{ "id":"adWordsCustomerId","key":"AdWords/adWordsCustomerId","label":"AdWords customer ID.","tooltip":"The ID of the AdWords customer.","disabled":false },{ "id":"adWordsCampaign","key":"AdWords/adWordsCampaign","label":"AdWords campaign","tooltip":"The name of the AdWords campaign.","disabled":false },{ "id":"adWordsCampaignStatus","key":"AdWords/adWordsCampaignStatus","label":"AdWords campaign status","tooltip":"The status of the AdWords campaign.","disabled":false },{ "id":"adWordsCampaignId","key":"AdWords/adWordsCampaignId","label":"AdWords campaign ID","tooltip":"The AdWords campaign ID.","disabled":false },{ "id":"adWordsAdGroup","key":"AdWords/adWordsAdGroup","label":"AdWords ad group","tooltip":"The name of the AdWords ad group.","disabled":false },{ "id":"adWordsAdGroupStatus","key":"AdWords/adWordsAdGroupStatus","label":"AdWords ad group status","tooltip":"The status of the AdWords ad group.","disabled":false },{ "id":"adWordsAdGroupId","key":"AdWords/adWordsAdGroupId","label":"AdWords ad group ID","tooltip":"The AdWords ad group ID.","disabled":false },{ "id":"adWordsVideoChannelId","key":"AdWords/adWordsVideoChannelId","label":"AdWords video channel ID","tooltip":"The AdWords video channel ID.","disabled":false },{ "id":"adWordsVideoTitle","key":"AdWords/adWordsVideoTitle","label":"AdWords video title","tooltip":"The title of the AdWords video.","disabled":false },{ "id":"adWordsVideoDuration","key":"AdWords/adWordsVideoDuration","label":"AdWords video duration","tooltip":"The duration of the video in milliseconds.","disabled":false },{ "id":"adWordsVideoId","key":"AdWords/adWordsVideoId","label":"AdWords video ID","tooltip":"The AdWords video ID.","disabled":false },{ "id":"adWordsCreativeStatus","key":"AdWords/adWordsCreativeStatus","label":"AdWords creative status","tooltip":"The status of the AdWords ad.","disabled":false },{ "id":"adWordsCreativeId","key":"AdWords/adWordsCreativeId","label":"AdWords creative ID","tooltip":"The AdWords ad ID.","disabled":false },{ "id":"adWordsAdNetworkType1","key":"AdWords/adWordsAdNetworkType1","label":"AdWords first level network type.","tooltip":"The AdWords first level network type.","disabled":false },{ "id":"adWordsAdNetworkType2","key":"AdWords/adWordsAdNetworkType2","label":"AdWords second level network type.","tooltip":"The AdWords second level network type (includes search partners).","disabled":false },{ "id":"adWordsDevice","key":"AdWords/adWordsDevice","label":"AdWords device type.","tooltip":"The device type where the AdWords impression was rendered.","disabled":false }] },{ "id":"Incrementality","label":"INCREMENTALITY","items":[{ "id":"incrementalityAssignment","key":"Incrementality/incrementalityAssignment","label":"Incrementality assignment","tooltip":"The group assignment for the incrementality experiment (ad vs. no ad).","disabled":false },{ "id":"campaignIsPsa","key":"Incrementality/campaignIsPsa","label":"PSA campaign","tooltip":"Indicates that campaign is a PSA campaign.","disabled":false },{ "id":"isIncrementalityEnabled","key":"Incrementality/isIncrementalityEnabled","label":"Incrementality enabled","tooltip":"Indicates that incrementality experiment is enabled on a campaign.","disabled":false },{ "id":"controlGroupPercentage","key":"Incrementality/controlGroupPercentage","label":"Control group percentage","tooltip":"The percentage of users allocated to control group in incrementality experiment.","disabled":false },{ "id":"usedPsaPlacementId","key":"Incrementality/usedPsaPlacementId","label":"Used PSA placement ID","tooltip":"The ID of the placement that was used to serve PSA creative in incrementality experiment.","disabled":false }] },{ "id":"GeoIP","label":"GEOIP","items":[{ "id":"countryCode","key":"GeoIP/countryCode","label":"Country code","tooltip":"ISO 3166-1 two-letter ISO country code.","disabled":false },{ "id":"countryName","key":"GeoIP/countryName","label":"Country","tooltip":"The country name associated to countryCode.","disabled":false },{ "id":"principalSubdivisionCode","key":"GeoIP/principalSubdivisionCode","label":"State/province code","tooltip":"State or province. The second part of ISO 3166-2, up to three alphanumeric characters.","disabled":false },{ "id":"principalSubdivisionName","key":"GeoIP/principalSubdivisionName","label":"State/province","tooltip":"The state or province name associated to principalSubdivisionCode.","disabled":false }] },{ "id":"Retired features","label":"RETIRED FEATURES","items":[{ "id":"retiredFeatureType","key":"Retired features/retiredFeatureType","label":"Retired feature type","tooltip":"Retired feature type.","disabled":false },{ "id":"retiredFeatureName","key":"Retired features/retiredFeatureName","label":"Retired feature name","tooltip":"Retired feature name.","disabled":false }] },{ "id":"Facebook","label":"FACEBOOK","items":[{ "id":"facebookAdId","key":"Facebook/facebookAdId","label":"Facebook ad ID","tooltip":"ID of the Facebook Ad.","disabled":false },{ "id":"facebookAdName","key":"Facebook/facebookAdName","label":"Facebook ad name","tooltip":"Name of the Facebook Ad.","disabled":false },{ "id":"facebookAdStatus","key":"Facebook/facebookAdStatus","label":"Facebook ad status","tooltip":"Status of the Facebook Ad.","disabled":false },{ "id":"facebookAccountId","key":"Facebook/facebookAccountId","label":"Facebook account ID","tooltip":"Facebook Account ID.","disabled":false },{ "id":"facebookPageId","key":"Facebook/facebookPageId","label":"Facebook page ID","tooltip":"Facebook page ID.","disabled":false },{ "id":"facebookDevice","key":"Facebook/facebookDevice","label":"Facebook device","tooltip":"Type of user's device.","disabled":false },{ "id":"facebookPublisherPlatform","key":"Facebook/facebookPublisherPlatform","label":"Facebook publisher platform","tooltip":"Name of publisher platform.","disabled":false },{ "id":"facebookPlatformPosition","key":"Facebook/facebookPlatformPosition","label":"Facebook platform position","tooltip":"Position of the ad in the platform.","disabled":false }] },{ "id":"Twitter","label":"TWITTER","items":[{ "id":"twitterAdId","key":"Twitter/twitterAdId","label":"Twitter ad ID","tooltip":"Twitter ad ID.","disabled":false },{ "id":"twitterAdGroupId","key":"Twitter/twitterAdGroupId","label":"Twitter ad group ID","tooltip":"Twitter ad group ID.","disabled":false },{ "id":"twitterAdStatus","key":"Twitter/twitterAdStatus","label":"Twitter ad status","tooltip":"Twitter ad status.","disabled":false },{ "id":"twitterAccountId","key":"Twitter/twitterAccountId","label":"Twitter account ID","tooltip":"Twitter account ID.","disabled":false },{ "id":"twitterAccountTimeZone","key":"Twitter/twitterAccountTimeZone","label":"Twitter account time zone","tooltip":"Twitter account timezone.","disabled":false },{ "id":"twitterPlacement","key":"Twitter/twitterPlacement","label":"Twitter placement","tooltip":"Twitter placement.","disabled":false }] }]

const defaultItems = [
    { id: '1', label: "Something", metadata: 'zan.kusterle@gmail.com', icon: 'plus' },
    { id: '2', label: "Lorem" },
    { id: '3', label: "Ipsum", metadata: 'someone@lorem.ipsum' },
    { id: '4', label: "Really loooooooooooooooooooooooooooooooong label", metadata: 'someone@lorem.ipsum' },
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
        { id: '11', key: 'G2/1', label: "Something", metadata: 'someone@lorem.ipsum', tooltip: 'Test tooltip' },
        { id: '12', label: "D", metadata: 'someone@lorem.ipsum' },
        { id: '13', label: "E", metadata: 'someone@lorem.ipsum' },
        { id: '14', label: "F", metadata: 'someone@lorem.ipsum' },
        { id: '15', label: "G", metadata: 'someone@lorem.ipsum', tooltip: 'Something else' },
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
        defaultProps: {
            steps: [
                { id: 'a', passiveLabel: 'A', activeLabel: 'A' },
                { id: 'b', passiveLabel: 'B', activeLabel: 'B' },
            ],
            stepId: 'b',
        },
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
            canClearAll: true,
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
            text: 'Lorem Ipsum<br>And a new line',
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
                'alpha', 'beta', 'caret', 'list-search', 'bars',
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
        rootCss: {
            width: '600px',
        },
        defaultProps: {

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
        rootCss: {
            width: '400px',
        },
        defaultProps: {
            items: defaultItems,
        },
    },
    DefaultListItem: {
        component: DefaultListItem,
    },
    ScrollableList: {
        component: ScrollableList,
        defaultProps: {
            items: defaultItems,
            label: 'Something',
        },
    },
    Typeahead: {
        component: Typeahead,
        rootCss: {
            width: '600px',
        },
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
            canSelectAndClearAll: true,
            canClearAll: true,
            chipLabel: 'Chip Label',
            searchLabel: 'Search Label',
        },
    },
}
