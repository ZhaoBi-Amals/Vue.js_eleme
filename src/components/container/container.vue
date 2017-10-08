<template>
  <div class="container">
    <div class="container-bar border-1px">
      <router-link to='/goods' class="items">商品</router-link>
      <router-link to='/ratings' class="items">评价</router-link>
      <router-link to='/seller' class="items">商家</router-link>
    </div>
    <div class="viewPort">
      <keep-alive><router-view :dataSheet="dataSheet"></router-view></keep-alive>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    dataSheet: {
      type: Object
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../stylus/customStyle.styl"
  .container
    .container-bar
      display: flex
      justify-content: space-around
      line-height: 28px
      height: 28px
      width: 100%
      .items
        width: 100%
        height: 100%
        line-height: 28px
        text-align: center
        font-size: 14px
        color: rgb(77,85,93)
        &:hover
          color: rgb(240,20,20)
        border-1px(rgba(7,17,27,0.1))
</style>
