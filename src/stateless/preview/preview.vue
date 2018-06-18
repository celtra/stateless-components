<script>
import PreviewScreenFacebook from './facebook/facebook_preview.vue'
import PreviewScreenTwitter from './twitter/preview_screen_twitter.vue'
import PreviewScreenYouTube from './youtube/preview_screen.vue'
import twitterData from '../../constants/twitter_formats'
import facebookData from '../../constants/facebook_formats'
import youTubeData from '../../constants/youtube_formats'

export default {
    props: {
        formatId: { type: String, required: true },
        contentData: { type: Object, required: true },
    },
    methods: {
        triggerAutoplay () {
            if (typeof this.$children[0].triggerAutoplay === 'function') {
                this.$children[0].triggerAutoplay()
            }
        },
        handleMessage (message) {
            if (typeof this.$children[0].handleMessage === 'function'){
                this.$children[0].handleMessage(message)
            }
        },
    },
    render (createElement) {
        if (facebookData[this.formatId]) {
            return createElement(PreviewScreenFacebook, { props: this.contentData })
        } else if (twitterData[this.formatId]) {
            return createElement(PreviewScreenTwitter, { props: { ...this.contentData, contentData: this.contentData } })
        } else if (youTubeData[this.formatId]) {
            return createElement(PreviewScreenYouTube, { props: this.contentData })
        }
    },
}
</script>
