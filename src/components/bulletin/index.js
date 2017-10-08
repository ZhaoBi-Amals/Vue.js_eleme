import bulletinComponent from './bulletin.vue'
const bulletin = {
  install: function (Vue) {
    Vue.component('bulletin', bulletinComponent)
  }
}
export default bulletin
