// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'iview/dist/styles/iview.css'
import axios from 'axios'
import url from './config/url'
import { Button, Icon, Table, Form, Input, Tooltip, Card, Page, Poptip, Spin, Modal, Tag, Badge } from 'iview'
Vue.component('Button', Button)
Vue.component('Table', Table)
Vue.component('Icon', Icon)
Vue.component('Form', Form)
Vue.component('FormItem', Form.Item)
Vue.component('Input', Input)
Vue.component('Tooltip', Tooltip)
Vue.component('Card', Card)
Vue.component('Page', Page)
Vue.component('Poptip', Poptip)
Vue.component('Spin', Spin)
Vue.component('Modal', Modal)
Vue.component('Tag', Tag)
Vue.component('Badge', Badge)
Vue.config.productionTip = false
Vue.prototype.axios = axios
Vue.prototype.url = url

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
