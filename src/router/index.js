import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

// 导入页面组件
import goods from '../components/goods/goods'
import ratings from '../components/ratings/ratings'
import seller from '../components/seller/seller'
const routes = [
  {path: '', redirect: '/goods'},
  {path: '/goods', component: goods},
  {path: '/ratings', component: ratings},
  {path: '/seller', component: seller}
]

const router = new Router({
  routes: routes
})

export default router
