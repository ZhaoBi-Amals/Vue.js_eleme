import ratingsComponent from './ratings.vue'
const ratings = {
  install: function (Vue) {
    Vue.component('ratings', ratingsComponent)
  }
}
export default ratings
