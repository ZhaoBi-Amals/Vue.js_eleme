<template>
  <div class="goods">
    <div class="sideBar">
      <ul class="sideBar-ul" :class="'sideBarCell' + index" v-for="(goodsType, index) in dataSheet.goods">
        <li class="sideBar-li" :class="'sideBarBorder' + index">
          <span class="sideBar-text"><span class="sideBar-img" v-if="goodsType.type" :class="iconMap[goodsType.type]"></span>{{goodsType.name}}</span>
        </li>
      </ul>
    </div>
    <div class="foods foods-hook">
      <ul class="foods-ul" v-for="(goodsDetail, index) in dataSheet.goods">
        <li class="foods-title-li" :class="'foodsTitle' + index">{{goodsDetail.name}}</li>
        <li class="foods-li">
          <ul class="foods-type-ul" v-for="(foodDetail, index) in goodsDetail.foods">
            <li class="foods-type-li">
              <div class="foods-img-div">
                <img class="foods-img" :src="foodDetail.icon" onerror="./error.png"></img>
              </div>
              <div class="right-container">
                <li class="foods-name">{{foodDetail.name}}</li>
                <li class="description">{{foodDetail.description}}</li>
                <li class="sellCount">月售{{foodDetail.sellCount}}份<span class="rating"> 好评率{{foodDetail.rating}}%</span></li>
                <li class="price">
                  <span class="price-symbol">￥</span>{{foodDetail.price}} <span class="old-price" v-if="foodDetail.oldPrice"><span class="oldPrice-symbol">￥</span>{{foodDetail.oldPrice}}</span>
                </li>
                <span class="icon-add_circle" @click="addFood($event, 0)"><span class="animation-circle"></span></span>
                <span class="buy-count">0</span>
                <span class="icon-remove_circle_outline" @click="removeFood($event, 0)"></span>
                <div class="tap-layer" @click="sendDataToPopUpBar($event)"></div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <transition name="fade">
      <div class="pop-up-details" v-show="popUpLayerFlag">
        <div class="detail-img-div">
          <img class="detail-img" onerror="error"></img>
          <span class="detail-description">我是描述</span>
        </div>
        <div class="pop-up-layer-under-img">
          <span class="pop-up-name">我是菜名</span>
          <span class="pop-up-sell-count"></span>
          <span class="pop-up-price">￥13 起</span>
          <div class="circle-div">
            <span class="icon-add_circle" @click="addFood($event, 1)"><span class="animation-circle"></span></span>
          </div>
          <span class="pop-up-buy-conut">999</span>
          <span class="icon-remove_circle_outline pop-up-remove" @click="removeFood($event, 1)"></span>
        </div>
      </div>
    </transition>
    <transition name="graylayer">
      <div class="gray-layer" v-show="popUpLayerFlag" @click="popUpLayerFade"></div>
    </transition>
  </div>
</template>
<script>
  export default{
    data () {
      return {
        iconMap: ['decresae_3', 'discount_3', 'special_3', 'invoice_3', 'guarantee_3'],
        sideBarMap: [],
        titlePosition: 0,
        scrollFlag: 0,
        shoppingCart: [],
        foodPosition: 0,
        ShowFlag: 0,
        ballAnimationFlag: 0,
        popUpLayerFlag: false,
        scrollPosition: 0
      }
    },
    props: {
      dataSheet: {
        type: Object
      }
    },
    created () {
      this.$root.Bus.$on('shoppingCartDataFromFooter', value => {
        // 解决v-for加载数据的时候数据不变的 原理：当v-for循环的数据 item 个数不变的时候，不会触发数据实时更新，将数据先清空再赋值，则解决了这个问题
        this.shoppingCart = []
        this.shoppingCart = value
      })
    },
    activated () {
      if (this.scrollPosition !== 0) {
        document.getElementsByClassName('foods')[0].scrollTop = this.scrollPosition
      }
    },
    updated () {
      this._getTitlePosition
      this._setSideBarStatus
      this._setMainBarStatus
    },
    computed: {
      _getTitlePosition () {
        for (let i = 0; i < this.dataSheet.goods.length; i++) {
          let positionY = document.getElementsByClassName('foodsTitle' + i)[0].offsetTop
          this.sideBarMap.push(positionY)
        }
        this.sideBarMap.push(document.getElementsByClassName('foods')[0].scrollHeight)
      },
      _setSideBarStatus () {
        document.getElementsByClassName('foods-hook')[0].addEventListener('scroll', this.scrollFun)
      },
      _setMainBarStatus () {
        let len = document.getElementsByClassName('sideBar-ul').length
        for (let i = 0; i < len; i++) {
          let that = this
          document.getElementsByClassName('sideBarCell' + i)[0].addEventListener('click', function () {
            let startP = document.getElementsByClassName('foods-hook')[0].scrollTop
            let finalP = that.sideBarMap[i]
            let flag = 0
            let animation = setInterval(function () {
              that.scrollFlag = 1
              if (flag > 100) {
                that.scrollFlag = 0
                that.scrollFun()
                clearInterval(animation)
              } else {
                let tempP = ((finalP - startP) / 100) * flag + startP
                document.getElementsByClassName('foods-hook')[0].scrollTop = tempP
              }
              flag++
            }, 3)
          })
        }
      }
    },
    watch: {
      // 监听shoppingCart数据变化，改变‘-’和购买量的显示状态
      shoppingCart: function () {
        let temp = document.getElementsByClassName('right-container')
        let len = temp.length
        for (let i = 0; i < len; i++) {
          temp[i].children[5].style.visibility = 'hidden'
          temp[i].children[6].style.visibility = 'hidden'
          if (this.shoppingCart !== '') {
            for (let j = 0; j < this.shoppingCart.length; j++) {
              if (temp[i].children[0].innerHTML === this.shoppingCart[j][0]) {
                temp[i].children[5].innerHTML = this.shoppingCart[j][2]
                temp[i].children[5].style.visibility = 'visible'
                temp[i].children[6].style.visibility = 'visible'
              }
            }
          }
        }
      }
    },
    methods: {
      scrollFun () {
        if (this.scrollFlag === 0) {
          let scrollY = document.getElementsByClassName('foods-hook')[0].scrollTop
          this.scrollPosition = scrollY
          for (let i = 0; i < this.sideBarMap.length - 1; i++) {
            if (scrollY >= this.sideBarMap[i] && scrollY < this.sideBarMap[i + 1]) {
              document.getElementsByClassName('sideBarCell' + i)[0].style.backgroundColor = '#fff'
              document.getElementsByClassName('sideBarBorder' + i)[0].style.borderBottom = 'none'
              if (i > 0) {
                let temp = i - 1
                document.getElementsByClassName('sideBarBorder' + temp)[0].style.borderBottom = 'none'
              }
            } else {
              document.getElementsByClassName('sideBarCell' + i)[0].style.backgroundColor = '#f3f5f7'
              document.getElementsByClassName('sideBarBorder' + i)[0].style.borderBottom = '1px solid rgba(7,17,27,0.1)'
            }
          }
        }
      },
      popUpLayerFade () {
        this.popUpLayerFlag = false
      },
      sendDataToPopUpBar (event) {
        let details = document.getElementsByClassName('pop-up-details')[0].children
        let temp = event.currentTarget.parentNode.children
        let foodName = temp[0].innerHTML
        let description = temp[1].innerHTML
        let sellCount = temp[2].innerHTML
        let price = temp[3].innerHTML
        let buyCount = parseInt(temp[5].innerHTML)
        details[0].children[1].innerHTML = description
        details[1].children[0].innerHTML = foodName
        details[1].children[1].innerHTML = sellCount
        details[1].children[2].innerHTML = price
        details[1].children[4].innerHTML = buyCount
        searchUrl:
        for (let i = 0; i < this.dataSheet.goods.length; i++) {
          for (let j = 0; j < this.dataSheet.goods[i].foods.length; j++) {
            if (foodName === this.dataSheet.goods[i].foods[j].name) {
              details[0].children[0].src = this.dataSheet.goods[i].foods[j].image
              break searchUrl
            }
          }
        }
        let popUpLayerRemove = document.getElementsByClassName('pop-up-remove')
        let popUplayerNumber = document.getElementsByClassName('pop-up-buy-conut')
        if (this.isFoodExist(foodName)) {
          popUpLayerRemove[0].style.visibility = 'visible'
          popUplayerNumber[0].style.visibility = 'visible'
        } else {
          popUpLayerRemove[0].style.visibility = 'hidden'
          popUplayerNumber[0].style.visibility = 'hidden'
        }
        this.popUpLayerFlag = true
      },
      // flag = 0，为主页面点击 + ； =1，为大图弹出框点击 +
      addFood (event, flag) {
        if (this.ballAnimationFlag === 0) {
          this.ballAnimationFlag = 1
          // 反比例函数效果
          let startX = event.currentTarget.getBoundingClientRect().x
          let startY = event.currentTarget.getBoundingClientRect().y
          let finalX = 35
          let finalY = document.getElementsByClassName('goods')[0].clientHeight + 162 + 24
          let k = (finalY - startY) * startX * finalX / (startX - finalX)
          let b = finalY - k / finalX
          let ball = event.currentTarget.childNodes
          let ballY = 0
          let ballX = startX
          let that = this
          let ballAnimation = setInterval(function () {
            ballY = k / ballX + b
            ball[0].style.position = 'fixed'
            ball[0].style.visibility = 'visible'
            ball[0].style.top = ballY + 'px'
            ball[0].style.left = ballX + 'px'
            ballX -= 2
            if (ballX < finalX) {
              ball[0].style.visibility = 'hidden'
              that.ballAnimationFlag = 0
              that.shoppingCartAnimation()
              clearInterval(ballAnimation)
            }
          }, 3)
        }
        document.getElementsByClassName('pop-up-remove')[0].style.visibility = 'visible'
        document.getElementsByClassName('pop-up-buy-conut')[0].style.visibility = 'visible'
        if (flag === 0) {
          var foodName = event.currentTarget.parentNode.childNodes[0].innerHTML
          var foodPrice = parseFloat(event.currentTarget.parentNode.children[3].childNodes[1].data)
        } else {
          var foodName = event.currentTarget.parentNode.parentNode.children[0].innerHTML
          var foodPrice = parseFloat(event.currentTarget.parentNode.parentNode.children[2].childNodes[1].data)
        }
        if (this.isFoodExist(foodName)) {
          this.shoppingCart[this.foodPosition][1] += foodPrice
          this.shoppingCart[this.foodPosition][2] += 1
        } else {
          this.shoppingCart.push([foodName, foodPrice, 1])
        }
        if (flag === 0) {
          event.currentTarget.parentNode.children[5].innerHTML = this.shoppingCart[this.foodPosition][2]
        } else {
          event.currentTarget.parentNode.parentNode.children[4].innerHTML = this.shoppingCart[this.foodPosition][2]
        }
        this.sendShoppingCartData()
      },
      removeFood (event, flag) {
        if (flag === 0) {
          var foodName = event.currentTarget.parentNode.childNodes[0].innerHTML
          var foodPrice = parseFloat(event.currentTarget.parentNode.children[3].childNodes[1].data)
        } else {
          var foodName = event.currentTarget.parentNode.children[0].innerHTML
          var foodPrice = parseFloat(event.currentTarget.parentNode.children[2].childNodes[1].data)
        }
        if (this.isFoodExist(foodName)) {
          this.shoppingCart[this.foodPosition][1] -= foodPrice
          this.shoppingCart[this.foodPosition][2] -= 1
          if (flag === 0) {
            event.currentTarget.parentNode.children[5].innerHTML = this.shoppingCart[this.foodPosition][2]
          } else {
            event.currentTarget.parentNode.children[4].innerHTML = this.shoppingCart[this.foodPosition][2]
          }
          if (this.shoppingCart[this.foodPosition][2] === 0) {
            this.shoppingCart.splice(this.foodPosition, 1)
          }
        }
        let popUpLayerRemove = document.getElementsByClassName('pop-up-remove')
        let popUplayerNumber = document.getElementsByClassName('pop-up-buy-conut')
        if (popUplayerNumber[0].innerHTML === '0') {
          popUpLayerRemove[0].style.visibility = 'hidden'
          popUplayerNumber[0].style.visibility = 'hidden'
        }
        this.sendShoppingCartData()
      },
      isFoodExist (foodName) {
        if (this.shoppingCart.length > 0) {
          for (let i = 0; i < this.shoppingCart.length; i++) {
            if (this.shoppingCart[i].includes(foodName)) {
              this.foodPosition = i
              return true
            }
          }
          this.foodPosition = this.shoppingCart.length
          return false
        } else {
          this.foodPosition = 0
          return false
        }
      },
      shoppingCartAnimation () {
        this.$root.Bus.$emit('shoppingCartAnimation')
      },
      sendShoppingCartData () {
        // 解决二维数组无法触发数据实时更新
        this.shoppingCart.splice(0, 0, 0)
        this.shoppingCart.splice(0, 1)
        this.$root.Bus.$emit('shoppingCartDataFromGoods', this.shoppingCart)
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../stylus/customStyle.styl"
  .goods
    font-size: 0
    position: absolute
    width: 100%
    top: 162px
    bottom: 46px
    display: flex
    .sideBar
      flex: 0 0 80px
      height: 100%
      width: 80px
      overflow: auto
      .sideBar-ul
        background: #f3f5f7
        .sideBar-li
          display: flex
          align-items: center
          margin: 0 12px 0 12px
          height: 56px
          border-bottom: 1px solid rgba(7,17,27,0.1)
          .sideBar-text
            color: rgb(20,20,20)
            font-size: 12px
            line-height: 14px
            .sideBar-img
              vertical-align: top
              display: inline-block
              background-repeat: no-repeat
              background-size: 12px 12px
              &.decrease_3
                width: 12px
                height: 12px
                bg-img('decrease_3')
              &.discount_3
                width: 12px
                height: 12px
                bg-img('discount_3')
              &.invoice_3
                width: 12px
                height: 12px
                bg-img('invoice_3')
              &.special_3
                width: 12px
                height: 12px
                bg-img('special_3')
              &.guarantee_3
                width: 12px
                height: 12px
                bg-img('guarantee_3')
    .foods
      flex: 1
      overflow: auto
      .foods-ul
        .foods-title-li
          height: 26px
          background: #f3f5f7
          font-size: 12px
          color: rgb(147,153,159)
          line-height: 29px
          border-left: solid 3px #d9dde1
          text-indent: 1em
        .foods-li
          .foods-type-ul
            margin: 0 18px
            border-bottom: 1px solid rgba(7,17,27,0.1)
            &:last-child
              border-bottom: none
            .foods-type-li
              display: flex
              padding-bottom: 18px
              .foods-img-div
                display: inline-block
                flex: 0
                width: 60px
                height: 60px
                margin-top: 18px
                .foods-img
                  width: 60px
                  height: 60px
              .right-container
                position: relative
                margin-left: 10px
                flex: 1
                .foods-name
                  padding: 0
                  margin-top: 22px
                  font-size: 14px
                  color: rgb(7,17,27)
                  line-height: 10px
                .description
                  margin-top: 9px
                  display: block
                  font-size: 10px
                  color: rgb(147,153,159)
                  line-height: 13px
                .sellCount
                  margin-top: 9px
                  font-size: 10px
                  color: rgb(147,153,159)
                  line-height: 10px
                  .rating
                    margin-left: 7px
                    font-size: 10px
                    color: rgb(147,153,159)
                    line-height: 10px
                .price
                  margin-top: 6px
                  font-size: 14px
                  color: #f01414
                  font-weight: 700
                  line-height: 14px
                  .price-symbol
                    font-size: 10px
                    font-weight: normal
                  .old-price
                    text-decoration: line-through
                    font-size: 10px
                    color: rgb(147,153,159)
                    font-weight: 700
                    line-height: 24px
                    .oldPrice-symbol
                      font-size: 8px
                      font-weight: normal
                .icon-add_circle
                  float: right
                  margin-top: -10px
                  bottom: 0
                  font-size: 20px
                  color: rgb(0,160,220)
                  .animation-circle
                    display: inline-block
                    position: absolute
                    visibility: hidden
                    bottom : 0
                    right: 0
                    width: 20px
                    height: 20px
                    border-radius: 10px
                    background: rgb(0,160,220)
                    z-index: 50
                .buy-count
                  visibility: hidden
                  float: right
                  margin-top: -10px
                  margin-right: 10px
                  line-height: 20px
                  font-size: 10px
                  bottom: 0
                  color: rgb(147,153,159)
                .icon-remove_circle_outline
                  visibility: hidden
                  float: right
                  margin-top: -10px
                  margin-right: 10px
                  bottom: 0
                  font-size: 20px
                  color: rgb(0,160,220)
                .tap-layer
                  position: absolute
                  z-index: 10
                  top: 0
                  left: -70px
                  width: 90%
                  height: 100%
                  // background: red
    .pop-up-details
      &.fade-enter-active
        transition: opacity .7s
      &.fade-leave-active
        transition: opacity .3s
      &.fade-enter, &.fade-leave-to
        opacity: 0
      z-index: 80
      background: rgb(255,255,255)
      position: fixed
      width: 80%
      top: 27%
      left: 10%
      border-radius: 10px
      .detail-img-div
        width: 100%
        position: relative
        .detail-img
          border-top-left-radius: 10px
          border-top-right-radius: 10px
          width: 100%
        .detail-description
          position: absolute
          bottom: 8px
          left: 10px
          font-size: 10px
          color: rgb(255,255,255)
          line-height: 20px
          font-weight: 400
      .pop-up-layer-under-img
        height: 80px
        .pop-up-name
          display: block
          margin-top: 8px
          margin-left: 8px
          font-size: 14px
          color: rgb(7,17,27)
          line-height: 14px
        .pop-up-sell-count
          display: block
          font-size: 10px
          color: rgba(7,17,27,0.7)
          line-height: 10px
          margin-top: 8px
          margin-left: 8px
        .pop-up-price
          display: block
          font-size: 12px
          color: #FC3A3A
          position: absolute
          bottom: 10px
          left: 8px
        .circle-div
          display: inline-block
          float: right
          position: relative
          .icon-add_circle
            font-size: 20px
            color: rgb(0,160,220)
            line-height: 20px
            margin-right: 8px
            .animation-circle
              display: inline-block
              position: absolute
              visibility: hidden
              right: 8px
              width: 20px
              height: 20px
              border-radius: 10px
              background: rgb(0,160,220)
              z-index: -10
        .pop-up-buy-conut
          visibility: hidden
          float: right
          font-size: 12px
          color: rgba(7,17,27,0.7)
          line-height: 22px
          margin-right: 8px
        .icon-remove_circle_outline
          visibility: hidden
          float: right
          font-size: 20px
          color: rgb(0,160,220)
          line-height: 20px
          margin-right: 8px
    .gray-layer
      &.graylayer-enter-active
        transition: opacity .5s
      &.graylayer-leave-active
        transition: opacity .9s
      &.graylayer-enter, &.graylayer-leave-to
        opacity: 0
      position: fixed
      height: 100%
      width: 100%
      top: 0
      left: 0
      background: rgba(7,17,27,0.7)
      backdrop-filter: blur(10px)
      z-index: 75
</style>