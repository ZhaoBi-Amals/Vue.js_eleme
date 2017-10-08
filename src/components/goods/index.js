import goodsComponent from './goods.vue'
const goods = {
  install: function (Vue) {
    Vue.component('goods', goodsComponent)
  }
}
export default goods
