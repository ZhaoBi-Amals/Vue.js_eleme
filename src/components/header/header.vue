<template>
  <div class="headerDiv" v-if="dataSheet.seller">
    <div class="headerDiv-header">
      <div class="avatar">
        <img class="seller-img" width="64" height="64" :src="dataSheet.seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="title-span">{{dataSheet.seller.name}}</span>
        </div>
        <div class="deliver">
          <span class="deliver-span">{{dataSheet.seller.description}} / {{dataSheet.seller.deliveryTime}}分钟送达</span>
        </div>
        <div class="description">
          <span class="decrease"></span>
          <span class="description-span">{{dataSheet.seller.supports[0].description}}</span>
        </div>
        <div class="tag" @click="showBulletin">
          <span class="tag-span">5个</span>
          <span class="icon-keyboard_arrow_right"></span>
        </div>
      </div>
    </div>
    <div class="headerDiv-center" @click="showBulletin">
      <span class="bulletin-img"></span><span class="bulletin-span">{{dataSheet.seller.bulletin}}</span>
      <span class="icon-keyboard_arrow_right"></span>
    </div>
    <div class="background">
      <img :src="dataSheet.seller.avatar" width="100%" height="100%">
    </div>
    <bulletin :show="show" :dataSheet="dataSheet" @childMessage="showBulletin"></bulletin>
  </div>
</template>
<script>
export default {
  props: {
    dataSheet: {
      type: Object
    }
  },
  data () {
    return {
      show: false
    }
  },
  methods: {
    showBulletin () {
      this.show = !this.show
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../stylus/customStyle.styl"
  .headerDiv
    position: relative
    color: rgb(255,255,255)
    background: rgba(7,17,27,0.2)
    .headerDiv-header
      font-size: 0
      display: flex
      flex-derection: row
      height: 106px
      width: 100%
      background: rgba(7,17,27,0.2)
      .avatar
        width: 88px
        .seller-img
          border-radius: 2px
          margin-top: 24px
          margin-left: 24px
      .content
        position: relative
        width: 100%
        .title
          margin-top: 26px
          margin-left: 16px
          width: 100%
          .brand
            vertical-align: top
            height: 18px
            width: 30px
            bg-img('brand')
            display: inline-block
            background-size: 30px 18px
            background-repeat: no-repeat
          .title-span
            margin-left: 6px
            font-size: 16px
            font-weight: bold
            line-height: 18px
        .deliver
          margin-left: 16px
          margin-top: 8px
          .deliver-span
            font-size: 12px
            font-weight: 100
            line-height: 12px
        .description
          margin-top: 8px
          margin-left: 16px
          width: 100%
          .decrease
            vertical-align: top
            display: inline-block
            height: 12px
            width: 12px
            bg-img('decrease_1')
            background-size: 12px 12px
            background-repeat: no-repeat
          .description-span
            margin-left: 4px
            font-size: 10px
            font-weight: 200
            line-height: 12px
        .tag
          position: absolute
          height: 24px
          width: 45px
          top: 65px
          right: 12px
          padding: 5px 8px 5px 8px
          background: rgba(7,17,27,0.5)
          border-radius: 8px
          .tag-span
            font-size: 10px
            font-weight: 100
            line-height: 12px
          .icon-keyboard_arrow_right
            position: absolute
            font-size: 10px
            top: 6px
            right: 5px
    .headerDiv-center
      position: relative
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
      padding: 0 20px 0 12px
      height: 28px
      width: 100%
      line-height: 28px
      background: rgba(7,17,27,0.5)
      .bulletin-img
        margin-top: 8px
        display: inline-block
        bg-img('bulletin')
        height: 12px
        width: 22px
        background-size: 22px 12px
        background-repeat: no-repeat
      .bulletin-span
        vertical-align: top
        margin: 0 4px 0 4px
        font-size: 10px
      .icon-keyboard_arrow_right
        position: absolute
        background-repeat: no-repeat
        font-size: 10px
        right: 12px
        top: 8px
    .background
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      z-index: -1
      filter: blur(10px)
</style>
