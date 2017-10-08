<template>
  <div class="ratings">
    <div class="ratings-header">
      <div class="ratings-header-score">
        <div class="score-left-bar">
          <span class="average-score">4.6</span>
          <span class="average-score-text">综合评分</span>
          <span class="compare-to-others">高于周边商家64.9%</span>
        </div>
        <div class="score-right-bar">
          <div class="service-score">
            <span class="service-score-text">服务态度</span>
            <star :starNumber='5' :starSize='36' :score='4.6' class="service-score-star"></star>
            <span class="service-score-number">4.7</span>
          </div>
          <div class="foods-score">
            <span class="foods-score-text">菜品评价</span>
            <star :starNumber='5' :starSize='36' :score='4.6' class="foods-score-star"></star>
            <span class="foods-score-number">4.4</span>
          </div>
          <div class="delivery-time">
            <span class="delivery-time-text">送达时间</span>
            <span class="delivery-time-minute">39分钟</span>
          </div>
        </div>
      </div>
      <div class="ratings-header-gray"></div>
      <div class="ratings-header-tags">
        <div class="tag-all" @click="switchTag(0)">
          <span class="tag-all-names">全部</span>
          <span class="tag-all-count">24</span>
        </div>
        <div class="tag-well" @click="switchTag(1)">
          <span class="tag-well-names">满意</span>
          <span class="tag-well-count">18</span>
        </div>
        <div class="tag-bad" @click="switchTag(2)">
          <span class="tag-bad-names">不满意</span>
          <span class="tag-bad-count">6</span>
        </div>
      </div>
    </div>
    <ul class="ratings-bars" v-for="items in dataSheet.ratings">
      <img class="avatar" :src="items.avatar"></img>
      <li class="ratings-message">
        <span class="buyer-name">{{items.username}}</span>
        <span class="rating-time">{{items.rateTime | formatDate}}</span>
        <div class="star-and-time">
          <star :starNumber='5' :starSize='24' :score='items.score' class="ratings-score-star"></star>
          <span class="delivery-time" v-if="items.deliveryTime">{{items.deliveryTime}}<span>分钟送达</span></span>
        </div>
        <span class="ratings-text">{{items.text}}</span>
        <div class="icons-and-recommend">
          <span class="ratings-detail"><span class="icon-thumb_down" :class="'bad-icon-' + items.rateType"></span><span class="icon-thumb_up" :class="'good-icon-' + items.rateType"></span></span>
          <span class="food-recommend" v-for="foods in items.recommend">{{foods}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  import {formatDate} from './formatDate'
  export default{
    data () {
      return {
        ratingFilterFlag: 0,
        tagSwitchFlag: 0
      }
    },
    props: {
      dataSheet: {
        tyle: Object
      }
    },
    filters: {
      formatDate (time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    methods: {
      ratingFilter () {
        if (this.ratingFilterFlag === 0) {
          let ratings = document.getElementsByClassName('ratings-text')
          document.getElementsByClassName('ratings-filter')[0].childNodes[0].style.color = 'rgb(0,160,220)'
          document.getElementsByClassName('ratings-filter')[0].childNodes[2].style.color = 'rgb(0,160,220)'
          for (let i = 0; i < ratings.length; i++) {
            if (ratings[i].innerHTML === '') {
              ratings[i].parentNode.parentNode.style.position = 'fixed'
              ratings[i].parentNode.parentNode.style.visibility = 'hidden'
            }
          }
          this.ratingFilterFlag = 1
        } else {
          let ratings = document.getElementsByClassName('ratings-text')
          document.getElementsByClassName('ratings-filter')[0].childNodes[0].style.color = '#b7bbbf'
          document.getElementsByClassName('ratings-filter')[0].childNodes[2].style.color = '#b7bbbf'
          for (let i = 0; i < ratings.length; i++) {
            if (ratings[i].innerHTML === '') {
              ratings[i].parentNode.parentNode.style.position = 'static'
              ratings[i].parentNode.parentNode.style.visibility = 'visible'
            }
          }
          this.ratingFilterFlag = 0
        }
      },
      switchTag (tagSwitchFlag) {
        let goodIcons = document.getElementsByClassName('good-icon-0')
        let badIcons = document.getElementsByClassName('bad-icon-1')
        if (tagSwitchFlag === 0) {
          for (let i = 0; i < goodIcons.length; i++) {
            goodIcons[i].parentNode.parentNode.parentNode.parentNode.style.position = 'static'
            goodIcons[i].parentNode.parentNode.parentNode.parentNode.style.visibility = 'visible'
          }
          for (let i = 0; i < badIcons.length; i++) {
            badIcons[i].parentNode.parentNode.parentNode.parentNode.style.position = 'static'
            badIcons[i].parentNode.parentNode.parentNode.parentNode.style.visibility = 'visible'
          }
          document.getElementsByClassName('tag-all')[0].style.backgroundColor = '#3770dc'
          document.getElementsByClassName('tag-well')[0].style.backgroundColor = '#ccecf8'
          document.getElementsByClassName('tag-bad')[0].style.backgroundColor = '#e9ebec'
          document.getElementsByClassName('tag-well')[0].childNodes[0].style.color = 'rgba(7,17,27,0.7)'
          document.getElementsByClassName('tag-well')[0].childNodes[2].style.color = 'rgba(7,17,27,0.7)'
          document.getElementsByClassName('tag-bad')[0].childNodes[0].style.color = 'rgba(7,17,27,0.7)'
          document.getElementsByClassName('tag-bad')[0].childNodes[2].style.color = 'rgba(7,17,27,0.7)'
        } else if (tagSwitchFlag === 1) {
          for (let i = 0; i < goodIcons.length; i++) {
            goodIcons[i].parentNode.parentNode.parentNode.parentNode.style.position = 'static'
            goodIcons[i].parentNode.parentNode.parentNode.parentNode.style.visibility = 'visible'
          }
          for (let i = 0; i < badIcons.length; i++) {
            badIcons[i].parentNode.parentNode.parentNode.parentNode.style.position = 'fixed'
            badIcons[i].parentNode.parentNode.parentNode.parentNode.style.visibility = 'hidden'
          }
          document.getElementsByClassName('tag-all')[0].style.backgroundColor = '#00a0dc'
          document.getElementsByClassName('tag-well')[0].style.backgroundColor = '#3770dc'
          document.getElementsByClassName('tag-bad')[0].style.backgroundColor = '#e9ebec'
          document.getElementsByClassName('tag-well')[0].childNodes[0].style.color = 'rgb(255,255,255)'
          document.getElementsByClassName('tag-well')[0].childNodes[2].style.color = 'rgb(255,255,255)'
          document.getElementsByClassName('tag-bad')[0].childNodes[0].style.color = 'rgba(7,17,27,0.7)'
          document.getElementsByClassName('tag-bad')[0].childNodes[2].style.color = 'rgba(7,17,27,0.7)'
        } else {
          for (let i = 0; i < goodIcons.length; i++) {
            goodIcons[i].parentNode.parentNode.parentNode.parentNode.style.position = 'fixed'
            goodIcons[i].parentNode.parentNode.parentNode.parentNode.style.visibility = 'hidden'
          }
          for (let i = 0; i < badIcons.length; i++) {
            badIcons[i].parentNode.parentNode.parentNode.parentNode.style.position = 'static'
            badIcons[i].parentNode.parentNode.parentNode.parentNode.style.visibility = 'visible'
          }
          document.getElementsByClassName('tag-all')[0].style.backgroundColor = '#00a0dc'
          document.getElementsByClassName('tag-well')[0].style.backgroundColor = '#ccecf8'
          document.getElementsByClassName('tag-bad')[0].style.backgroundColor = '#3770dc'
          document.getElementsByClassName('tag-well')[0].childNodes[0].style.color = 'rgba(7,17,27,0.7)'
          document.getElementsByClassName('tag-well')[0].childNodes[2].style.color = 'rgba(7,17,27,0.7)'
          document.getElementsByClassName('tag-bad')[0].childNodes[0].style.color = 'rgb(255,255,255)'
          document.getElementsByClassName('tag-bad')[0].childNodes[2].style.color = 'rgb(255,255,255)'
        }
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../stylus/customStyle.styl"
  .ratings
    font-size: 0
    position: absolute
    width: 100%
    // height: 100%
    bottom: 66px
    top: 162px
    overflow: auto
    .ratings-header
      width: 100%
      .ratings-header-score
        height: 112px
        .score-left-bar
          float: left
          width: 36%
          margin-top: 18px
          margin-bottom: 18px
          border-right: 1px solid rgba(7,17,27,0.1)
          text-align: center
          .average-score
            display: block
            font-size: 24px
            color: rgb(255,153,0)
            line-height: 28px
          .average-score-text
            display: block
            margin-top: 6px
            font-size: 12px
            color: rgb(7,17,27)
            line-height: 12px
          .compare-to-others
            display: block
            margin-top: 6px
            margin-bottom: 6px
            font-size: 10px
            color: rgba(7,17,27,0.2)
        .score-right-bar
          width: 63%
          float: left
          padding-left: 24px
          padding-top: 18px
          .service-score
            .service-score-text
              vertical-align: top
              display: inline-block
              font-size: 12px
              color: rgb(7,17,27)
              line-height: 17px
             .service-score-star
              vertical-align: top
              margin-left: 12px
              display: inline-block
             .service-score-number
              vertical-align: top
              line-height: 17px
              margin-left: 12px
              font-size: 12px
              color: rgb(255,153,0)
          .foods-score
            margin-top: 8px
            .foods-score-text
              vertical-align: top
              line-height: 17px
              display: inline-block
              font-size: 12px
              color: rgb(7,17,27)
             .foods-score-star
              margin-left: 12px
              display: inline-block
             .foods-score-number
              vertical-align: top
              line-height: 17px
              margin-left: 12px
              font-size: 12px
              color: rgb(255,153,0)
          .delivery-time
            margin-top: 8px
            .delivery-time-text
              display: inline-block
              font-size: 12px
              color: rgb(7,17,27)
              vertical-align: top
              line-height: 17px
            .delivery-time-minute
              margin-left: 12px
              font-size: 12px
              color: rgb(147,153,159)
              vertical-align: top
              line-height: 17px
              display: inline-block
      .ratings-header-gray
        height: 18px
        background: #f3f5f7
        border-top: 1px solid rgba(7,17,27,0.1)
        border-bottom: 1px solid rgba(7,17,27,0.1)
      .ratings-header-tags
        display: flex
        flex-derection: row
        padding: 18px
        width: 100%
        .tag-all
          height: 30px
          background: #00a0dc
          margin-right: 8px
          padding: 7px 12px 7px 12px
          .tag-all-names
            margin-right: 2px
            display: inline-block
            font-size: 12px
            color: rgb(255,255,255)
          .tag-all-count
            display: inline-block
            font-size: 10px
            color: rgb(255,255,255)
            font-weight: 300
        .tag-well
          height: 30px
          background: #ccecf8
          margin-right: 8px
          padding: 7px 12px 7px 12px
          .tag-well-names
            margin-right: 2px
            display: inline-block
            font-size: 12px
            color: rgba(7,17,27,0.7)
          .tag-well-count
            display: inline-block
            font-size: 10px
            color: rgba(7,17,27,0.7)
            font-weight: 300
        .tag-bad
          padding: 7px 12px 7px 12px
          height: 30px
          background: #e9ebec
          .tag-bad-names
            margin-right: 2px
            display: inline-block
            font-size: 12px
            color: rgba(7,17,27,0.7)
          .tag-bad-count
            display: inline-block
            font-size: 10px
            color: rgba(7,17,27,0.7)
            font-weight: 300
    .ratings-bars
      border-top: 1px solid rgba(7,17,27.0.1)
      display: flex
      flex-derection: row
      margin: 0 18px
      padding: 18px 0 10px 0
      .avatar
        width: 28px
        height: 28px
        border-radius: 14px
      .ratings-message
        width: 100%
        margin-left: 12px
        .buyer-name
          display: inline-block
          font-size: 10px
          color: rgb(7,17,27)
          // line-height: 24px
        .rating-time
          float: right
          display: inline-block
          font-size: 10px
          font-weight: 200
          color: rgb(147,153,159)
          line-height: 24px
        .star-and-time
          display: block
          .ratings-score-star
            display: inline-block
            margin-top: 2px
          .delivery-time
            margin-left: 6px
            display: inline-block
            font-size: 10px
            font-weight: 200
            color: rgb(147,153,159)
        .ratings-text
          display: block
          margin-top: 4px
          font-size: 12px
          color: rgb(7,17,27)
          line-height: 18px
        .icons-and-recommend
          .ratings-detail
            .good-icon-1
              visibility: hidden
            .good-icon-0
              font-size: 12px
              color: rgb(0,160,220)
              line-height: 16px
            .bad-icon-1
              font-size: 12px
              color: rgb(183,187,191)
              line-height: 16px
            .bad-icon-0
              visibility: hidden
          .food-recommend
            border: 1px solid rgba(7,17,27,0.1)
            font-size: 9px
            color: rgb(147,153,159)
            padding: 2px
            margin-left: 8px
            line-height: 24px
</style>














