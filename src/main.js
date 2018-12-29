import Vue from 'vue'
import VueRouter from 'vue-router'

import IndexPage from './IndexPage.vue'
import MarkdownPage from './MarkdownPage.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: IndexPage },
  { path: '/:name', component: MarkdownPage, props: true }
]

const router = new VueRouter({
  routes,
  linkActiveClass: "active"
})

const app = new Vue({
  router
}).$mount('#app')