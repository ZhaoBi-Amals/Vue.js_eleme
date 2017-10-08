<template>
  <transition name="fade">
    <div class="bulletin clearfix" v-show="show">
      <div class="bulletin-upper">
        <div class="bulletin-informations">
          <h1 class="name">{{dataSheet.seller.name}}</h1>
          <div class="star">
            <star :starNumber='5' :starSize='48' :score='4.6' class="star-span"></star>
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="title-text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul v-if="dataSheet.seller.supports" class="supports">
            <li v-for="(item, index) in dataSheet.seller.supports" class="supports-li">
              <span class="icon" :class="icon_map[index]"></span>
              <span class="supports-text">{{dataSheet.seller.supports[index].description}}</span>
            </li>
          </ul>
          <div class="title-bulletin">
            <div class="line"></div>
            <div class="title-bulletin-text">商家公告</div>
            <div class="line"></div>
          </div>
          <p class="history-bulletin">{{dataSheet.seller.bulletin}}</p>
        </div>
      </div>
      <div class="bulletin-footer">
        <span class="icon-close" v-on:click="childshows"></span>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  data () {
    return {
      icon_map: ['decrease_1', 'disconut_1', 'discount_2', 'special_1', 'special_2']
    }
  },
  props: {
    dataSheet: {
      type: Object
    },
    show: {
      type: Boolean
    }
  },
  methods: {
    childshows: function () {
      this.$emit('childMessage')
    }
  }
}

</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../stylus/customStyle.styl"
  .fade-enter-active
    transition: opacity .7s
  .fade-leave-active
    transition: opacity .5s
  .fade-enter, .fade-leave-to
    opacity: 0
  .bulletin
    font-size: 0
    position: fixed
    z-index: 100
    width: 100%
    height: 100%
    top: 0
    left: 0
    overflow: auto
    background: rgba(7,17,27,0.7)
    backdrop-filter: blur(10px)
    .bulletin-upper
      min-height: 100%
      .bulletin-informations
        padding-top: 64px
        padding-bottom: 64px
        .name
          line-height: 16px
          font-size: 16px
          font-weight: 700
          text-align: center
        .star
          margin-top 10px
          text-align: center
        .title
          display: flex
          margin: 18px 36px 24px 36px
          .line
            flex: 1
            position: relative
            top: -8px
            border-bottom: 1px solid rgba(255,255,255,0.2)
          .title-text
            font-size: 14px
            padding: 0 12px
            font-weight: 700
        .supports
          margin-top: 24px
          .supports-li
            margin-left: 48px
            font-size: 12px
            font-weight: 100
            line-height: 24px
            color: rgb(255,255,255)
            .icon
              display: inline-block
              background-repeat: no-repeat
              background-size: 16px 16px
              &.decrease_1
                width: 16px
                height: 16px
                bg-img('decrease_1')
              &.disconut_1
                width: 16px
                height: 16px
                bg-img('discount_1')
              &.discount_2
                width: 16px
                height: 16px
                bg-img('discount_2')
              &.special_1
                width: 16px
                height: 16px
                bg-img('special_1')
              &.special_2
                width: 16px
                height: 16px
                bg-img('special_2')
            .supports-text
              vertical-align: top
              line-height: 18px
        .title-bulletin
          display: flex
          margin: 18px 36px 24px 36px
          .line
            flex: 1
            position: relative
            top: -8px
            border-bottom: 1px solid rgba(255,255,255,0.2)
          .title-bulletin-text
            font-size: 14px
            padding: 0 12px
            font-weight: 700
        .history-bulletin
          margin: 24px 48px 24px 48px
          font-size: 12px
          font-weight: 200
          color: rgb(255,255,255)
          line-height:24px
    .bulletin-footer
      position: relative
      margin: -64px auto 0 auto
      height: 32px
      width: 32px
      clear: both
      font-size: 32px
      color: rgba(255,255,255,0.5)
</style>
