import containerComponent from './container.vue'
const container = {
  install: function (Vue) {
    Vue.component('container', containerComponent)
  }
}
export default container
