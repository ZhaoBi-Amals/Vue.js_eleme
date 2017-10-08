<template>
  <div class="seller">
    <div class="title">
      <div class="title-text">{{dataSheet.seller.name}}</div>
      <div class="seller-score">
        <star :starNumber='5' :starSize='36' :score='dataSheet.seller.score' class="average-star"></star><span class="rate-count">({{dataSheet.seller.ratingCount}})</span><span class="sell-count">月售{{dataSheet.seller.sellCount}}单</span>
      </div>
      <div class="like" @click="like">
        <span class="like-icon icon-favorite"></span>
        <span class="like-text">收藏</span>
      </div>
      <div class="average-data">
        <div class="min-delivery-price">
          <span class="min-delivery-price-text">起送价</span>
          <span class="min-delivery-price-number">{{dataSheet.seller.minPrice}}<span class="yuan">元</span></span>
        </div>
        <div class="delivery-cost">
          <span class="delivery-cost-text">配送费</span>
          <span class="delivery-cost-number">{{dataSheet.seller.deliveryPrice}}<span class="yuan">元</span></span>
        </div>
        <div class="average-delivery-time">
          <span class="average-delivery-time-text">平均配送时间</span>
          <span class="average-delivery-time-number">{{dataSheet.seller.deliveryTime}}<span class="yuan">分钟</span></span>
        </div>
      </div>
    </div>
    <div class="gray-bar"></div>
    <div class="bulletin">
      <div class="bulletin-details">
        <span class="bulletin-title">公告与活动</span>
        <p class="bulletin-text">{{dataSheet.seller.bulletin}}</p>
      </div>
      <ul class="bulletin-tags">
        <li class="bulletin-tags-li border-1px" v-for="(items, index) in dataSheet.seller.supports">
          <span class="bulletin-icon" :class="iconMap[index]"></span>
          <span class="supports-text">{{items.description}}</span>
        </li>
      </ul>
    </div>
    <div class="gray-bar"></div>
    <div class="photos">
      <span class="photos-title">商家实景</span>
      <div class="photos-bar">
        <img class="photos-img" v-for="img in dataSheet.seller.pics" :src="img"></img>
      </div>
    </div>
    <div class="gray-bar"></div>
    <div class="informations">
      <span class="informations-title">商家信息</span>
      <ul class="informations-ul">
        <li class="informations-li" v-for="items in dataSheet.seller.infos">{{items}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default{
    data () {
      return {
        iconMap: ['decrease_3', 'discount_3', 'special_3', 'invoice_3', 'guarantee_3'],
        likeFlag: 0
      }
    },
    props: {
      dataSheet: {
        type: Object
      }
    },
    methods: {
      like () {
        let icon = document.getElementsByClassName('like-icon')
        let text = document.getElementsByClassName('like-text')
        if (this.likeFlag === 0) {
          icon[0].style.color = 'rgb(240,20,20)'
          text[0].style.color = 'rgb(240,20,20)'
          this.likeFlag = 1
        } else {
          icon[0].style.color = 'rgb(77,85,93)'
          text[0].style.color = 'rgb(77,85,93)'
          this.likeFlag = 0
        }
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../stylus/customStyle.styl"
  @import "../../stylus/base.styl"
  .seller
    font-size: 0
    position: absolute
    width: 100%
    bottom: 66px
    top: 162px
    overflow: auto
    .title
      width: 100%
      padding: 18px
      .title-text
        font-size: 14px
        color: rgb(7,17,27)
        line-heigth: 14px
      .seller-score
        margin-top: 4px
        .average-star
          display: inline-block
          margin-top: 2px
        .rate-count
          margin-left: 8px
          display: inline-block
          vertical-align: top
          font-size: 10px
          color: rgb(77,85,93)
          line-heigth: 18px
        .sell-count
          margin-left: 12px
          display: inline-block
          vertical-align: top
          font-size: 10px
          color: rgb(77,85,93)
          line-heigth: 18px
      .like
        position: absolute
        right: 18px
        top: 20px
        .like-icon
          display: block
          font-size: 24px
          color: rgb(77,85,93)
          line-heigth: 24px
        .like-text
          display: block
          font-size: 10px
          color: rgb(77,85,93)
          line-heigth: 20px
      .average-data
        display: flex
        flex-derection: row
        padding-top: 18px
        padding-bottom: 18px
        margin-top: 18px
        border-top: 1px solid rgba(7,17,27,0.1)
        text-align: center
        .min-delivery-price
          flex: 1
          border-right: 1px solid rgba(7,17,27,0.1)
          .min-delivery-price-text
            display: block
            font-size: 10px
            color: rgb(147,153,159)
            line-heigth: 18px
          .min-delivery-price-number
            font-size: 24px
            font-weight: 200
            color: rgb(7,17,27)
            line-heigth: 24px
            .yuan
              font-size: 10px
        .delivery-cost
          flex: 1
          border-right: 1px solid rgba(7,17,27,0.1)
          .delivery-cost-text
            display: block
            font-size: 10px
            color: rgb(147,153,159)
            line-heigth: 18px
          .delivery-cost-number
            font-size: 24px
            font-weight: 200
            color: rgb(7,17,27)
            line-heigth: 24px
            .yuan
              font-size: 10px
        .average-delivery-time
          flex: 1
          .average-delivery-time-text
            display: block
            font-size: 10px
            color: rgb(147,153,159)
            line-heigth: 18px
          .average-delivery-time-number
            font-size: 24px
            font-weight: 200
            color: rgb(7,17,27)
            line-heigth: 24px
            .yuan
              font-size: 10px
    .gray-bar
      height: 16px
      width: 100%
      background: #f3f5f7
      border-top: 1px solid rgba(7,17,27,0.1)
      border-bottom: 1px solid rgba(7,17,27,0.1)
    .bulletin
      .bulletin-details
        padding: 18px 18px 16px 18px
        .bulletin-title
          font-size: 14px
          color: rgb(7,17,27)
          line-heigth: 18px
        .bulletin-text
          padding: 8px 12px 0 12px
          font-size: 12px
          font-weight: 200
          color: rgb(240,20,20)
          line-heigth: 24px
      .bulletin-tags
        padding: 16px 16px 0px 16px
        .bulletin-tags-li
          padding: 16px 12px
          border-top: 1px solid rgba(7,17,27,0.1)
          .bulletin-icon
            display: inline-block
            background-repeat: no-repeat
            background-size: 16px 16px
            &.decrease_3
              width: 16px
              height: 16px
              bg-img('decrease_3')
            &.discount_3
              width: 16px
              height: 16px
              bg-img('discount_3')
            &.special_3
              width: 16px
              height: 16px
              bg-img('special_3')
            &.invoice_3
              width: 16px
              height: 16px
              bg-img('invoice_3')
            &.guarantee_3
              width: 16px
              height: 16px
              bg-img('guarantee_3')
          .supports-text
            vertical-align: top
            padding-left: 6px
            font-size: 12px
            font-weight: 200
            color: rgb(7,17,27)
            line-heigth: 16px
    .photos
      .photos-title
        display: inline-block
        margin-top: 18px
        margin-left: 18px
        font-size: 14px
        color: rgb(7,17,27)
        line-heigth: 18px
      .photos-bar
        // width: 100%
        overflow: auto
        white-space: nowrap
        margin: 12px 0 0 18px
        height: 120px
        .photos-img
          margin-right: 12px
          width: 120px
          height: 90px
    .informations
      .informations-title
        display: inline-block
        margin-top: 18px
        margin-left: 16px
        font-size: 14px
        line-heigth: 14px
        color: rgb(7,17,27)
      .informations-ul
        margin-top: 12px
        padding: 0 18px
        .informations-li
          margin: 0px 12px
          padding: 16px 0
          border-top: 1px solid rgba(7,17,27,0.1)
          font-size: 12px
          font-weight: 200
          color: rgb(7,17,27)
          line-heigth: 16px
</style>












