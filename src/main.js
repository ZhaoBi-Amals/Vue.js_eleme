import Vue from 'vue'
import App from './App'
import router from './router/index'
import vueResource from '../node_modules/vue-resource'
Vue.use(vueResource)
import './stylus/index.styl'
Vue.config.productionTip = false

import headerC from './components/header/index'
Vue.use(headerC)
import container from './components/container/index'
Vue.use(container)
import footerC from './components/footer/index'
Vue.use(footerC)
import bulletin from './components/bulletin/index'
Vue.use(bulletin)
import star from './components/star/index'
Vue.use(star)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  // bus通信
  data: {
    Bus: new Vue()
  }
})
