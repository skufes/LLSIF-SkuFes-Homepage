<template>
    <div class="ui grid container">
        <sticky class="four wide column">
            <scrollactive class="ui vertical secondary pointing stickyed menu" activeClass="active" v-bind:scrollactiveItems="scrollactiveItems" style="width: initial!important">
                 <a v-for="header in headers" v-bind:href="'#' + header.id" v-bind:key="header.id" class="item scrollactive-item">{{header.text}}</a>
            </scrollactive>
        </sticky>
        <div class="article twelve wide han-init column" v-html="articleHtml" lang="zh-Hans">
        </div>
    </div>
</template>
<script>

import Vue from 'vue'
import VueResource from 'vue-resource'
import VueScrollActive from './plugins/vue-scrollactive'
import Sticky from 'vue-sticky-position'

import marked from 'marked'

import SiteListMarkedRenderer from './SiteListMarkedRenderer.js'
import NormalMarkedRenderer from './NormalMarkedRenderer.js'
import CustomReplacer from './CustomReplacer.js'

Vue.use(VueResource)
Vue.use(VueScrollActive)

export default {
    props: ['name'],
    components: {
        Sticky
    },
    data: function () {
        return {
            articleHtml: "",
            headers: [],
            scrollactiveItems: [],
            headerAdded: false,
            linkPost: ['howto', 'related']
        }
    },
    created: function () {
        this.$http.get(`/about/${this.name}.md`)
        .then(response => {
            this.headers = []
            this.articleHtml = CustomReplacer(marked(response.body, { renderer: this.getMarkedRenderer()(this.$route.path, this.headers) }))
            this.headerAdded = true
        })
    },
    methods: {
        getMarkedRenderer() {
            return this.linkPost.indexOf(this.name) === -1 ? NormalMarkedRenderer : SiteListMarkedRenderer
        }
    },
    watch: {
        name: function (currName, prevName) {
            this.$http.get(`/about/${this.name}.md`)
            .then(response => {
                this.headers = []
                this.articleHtml = marked(response.body, {
                    renderer: this.getMarkedRenderer()(this.$route.path, this.headers)
                })
                this.headerAdded = true
            })
        }
    },
    mounted: function () {
        addEventListener('resize', function () {
            $('.stickyed.menu').width($('.sticky.column').width())
        })
        $('.stickyed.menu').width($('.sticky.column').width())
        this.headerAdded = true
    },
    updated: function () {
        if (this.headerAdded) {
            this.scrollactiveItems = document.querySelectorAll('.scrollactive-item')
            this.headerAdded = false
        }
        window.renderMathInElement(this.$el)
        //console.log(this.scrollactiveItems)
    }

}
</script>
<style>
.ui.celled.list>.item:first-child, .ui.celled.list>.item:last-child, .ui.celled.list>.item {
    padding-top: .4em;
    padding-bottom: .4em;
}

.ui.list .list>.item>.icon+.content, .ui.list .list>.item>.image+.content, .ui.list>.item>.icon+.content, .ui.list>.item>.image+.content {
    display: table-cell;
    padding: 0 0 0 .5em;
    vertical-align: top;
    line-height: 1.5em;
}

.ui.list .list>.item>i.icon, .ui.list>.item>i.icon {
    padding-top: .4em;
}

.article > p {
    line-height: 1.7em;
}

img.ui.text.icon {
    height: 1.5em;
    padding: 0rem 0.1rem;
    vertical-align: middle;
}

.ui.list .list>.item, .ui.list>.item, ol.ui.list li, ul.ui.list li {
    line-height: 1.5em;
}

span.game-item {
    padding: 0rem 0.2rem;
    color: #920;
}
</style>