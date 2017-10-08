<template>
  <div class="footer">
    <transition name="fade">
      <div class="gray-layer" v-show="tapFlag" @click="popUp"></div>
    </transition>
    <div class="footer-bar">
      <div class="shopping-cart">
        <div class="ourter-circle" @click="popUp">
          <div class="inner-circle" @click="popUp">
            <span class="shopping-cart-img icon-shopping_cart" @click="popUp"></span>
          </div>
        </div>
        <div class="total-count">0</div>
      </div>
      <div class="total-price" @click="popUp"></div>
      <div class="delivery-cost" @click="popUp">配送费5元</div>
      <div class="purchase">￥20起送</div>
    </div>
    <div class="shopping-cart-detail">
      <div class="title-bar">
        <span class="title-span">购物车</span>
        <span class="clear-all" @click="clearAllGoods($event)">清空</span>
      </div>
      <div class="goods-detail">
        <ul class="detail-ul">
          <li class="detail-li" v-for="(items, index) in shoppingCartData">
            <span class="icon-add_circle add-food" @click="addFood($event)"></span>
            <span class="food-counter">{{shoppingCartData[index][2]}}</span>
            <span class="icon-remove_circle_outline remove-food" @click="reomveFood($event)"></span>
            <span class="food-price"><span class="food-price-symbol">￥</span>{{shoppingCartData[index][1]}}</span>
            <span class="food-name">{{shoppingCartData[index][0]}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    data () {
      return {
        shoppingCartData: [],
        tapFlag: 0
      }
    },
    created () {
      this.$root.Bus.$on('shoppingCartDataFromGoods', value => {
        // 解决v-for加载数据的时候数据不变的 原理：当v-for循环的数据 item 个数不变的时候，不会触发数据实时更新，将数据先清空再赋值，则解决了这个问题
        this.shoppingCartData = []
        this.shoppingCartData = value
      })
      this.$root.Bus.$on('shoppingCartAnimation', value => {
        this.shoppingCartAnimate()
      })
    },
    watch: {
      shoppingCartData: function () {
        if (this.shoppingCartData.length > 0) {
          document.getElementsByClassName('inner-circle')[0].style.backgroundColor = '#00a0dc'
          document.getElementsByClassName('shopping-cart-img')[0].style.color = '#fff'
          let total = 0
          let totalNumber = 0
          for (let i = 0; i < this.shoppingCartData.length; i++) {
            totalNumber += this.shoppingCartData[i][2]
            total += this.shoppingCartData[i][1]
          }
          document.getElementsByClassName('total-count')[0].innerHTML = totalNumber
          document.getElementsByClassName('total-count')[0].style.visibility = 'visible'
          if (total >= 20) {
            document.getElementsByClassName('purchase')[0].style.backgroundColor = '#00e562'
            document.getElementsByClassName('purchase')[0].style.color = 'rgba(255,255,255,0.8)'
            document.getElementsByClassName('purchase')[0].innerHTML = '去结算'
          } else {
            document.getElementsByClassName('purchase')[0].style.backgroundColor = '#2b333b'
            document.getElementsByClassName('purchase')[0].style.color = 'rgba(255,255,255,0.4)'
            document.getElementsByClassName('purchase')[0].innerHTML = '￥20起送'
          }
          document.getElementsByClassName('total-price')[0].innerHTML = '￥' + total
          document.getElementsByClassName('shopping-cart-detail')[0].style.height = 100 + this.shoppingCartData.length * 50 + 'px'
          if (parseInt(document.getElementsByClassName('shopping-cart-detail')[0].style.height) > 500) {
            document.getElementsByClassName('shopping-cart-detail')[0].style.height = 500 + 'px'
          }
        } else {
          this.tapFlag = 0
          document.getElementsByClassName('shopping-cart-detail')[0].style.visibility = 'hidden'
          document.getElementsByClassName('total-price')[0].innerHTML = ''
          document.getElementsByClassName('total-count')[0].innerHTML = 0
          document.getElementsByClassName('total-count')[0].style.visibility = 'hidden'
          document.getElementsByClassName('inner-circle')[0].style.backgroundColor = '#2b343c'
          document.getElementsByClassName('shopping-cart-img')[0].style.color = 'rgba(255,255,255,0.4)'
          document.getElementsByClassName('purchase')[0].style.backgroundColor = '#2b333b'
          document.getElementsByClassName('purchase')[0].style.color = 'rgba(255,255,255,0.4)'
          document.getElementsByClassName('purchase')[0].innerHTML = '￥20起送'
          document.getElementsByClassName('shopping-cart-detail')[0].style.height = 40 + 'px'
        }
      }
    },
    methods: {
      addFood (event) {
        for (let i = 0; i < this.shoppingCartData.length; i++) {
          if (this.shoppingCartData[i][0] === event.target.parentNode.children[4].innerHTML) {
            this.shoppingCartData[i][1] += this.shoppingCartData[i][1] / this.shoppingCartData[i][2]
            this.shoppingCartData[i][2] += 1
            // 解决二维数组无法实时更新数据。
            this.shoppingCartData.splice(0, 0, 0)
            this.shoppingCartData.splice(0, 1)
            this.sendShoppingCartData()
          }
        }
      },
      reomveFood (event) {
        for (let i = 0; i < this.shoppingCartData.length; i++) {
          if (this.shoppingCartData[i][0] === event.target.parentNode.children[4].innerHTML) {
            this.shoppingCartData[i][1] -= this.shoppingCartData[i][1] / this.shoppingCartData[i][2]
            this.shoppingCartData[i][2] -= 1
            this.shoppingCartData.splice(0, 0, 0)
            this.shoppingCartData.splice(0, 1)
            if (this.shoppingCartData[i][2] === 0) {
              this.shoppingCartData.splice(i, 1)
            }
            this.sendShoppingCartData()
          }
        }
      },
      clearAllGoods (event) {
        document.getElementsByClassName('total-price')[0].innerHTML = ''
        let startHeight = 100 + this.shoppingCartData.length * 50
        if (startHeight > 500) {
          startHeight = 500
        }
        let finalHeight = 0
        let eachFlamesHeight = (startHeight - finalHeight) / 50
        let temp = startHeight
        let animationFlag = 0
        let barAnimation = setInterval(function () {
          temp -= eachFlamesHeight
          document.getElementsByClassName('shopping-cart-detail')[0].style.height = temp + 'px'
          animationFlag++
          if (animationFlag >= 50) {
            document.getElementsByClassName('shopping-cart-detail')[0].style.visibility = 'hidden'
            document.getElementsByClassName('shopping-cart-detail')[0].style.height = startHeight + 'px'
            clearInterval(barAnimation)
          }
        }, 4)
        this.tapFlag = 0
        this.shoppingCartData = []
        this.sendShoppingCartData()
      },
      sendShoppingCartData () {
        this.$root.Bus.$emit('shoppingCartDataFromFooter', this.shoppingCartData)
      },
      popUp () {
        if (this.shoppingCartData.length > 0) {
          if (this.tapFlag === 0) {
            let finalHeight = 100 + this.shoppingCartData.length * 50
            if (finalHeight > 500) {
              finalHeight = 500
            }
            let startHeight = 0
            let eachFlamesHeight = (finalHeight - startHeight) / 50
            let temp = 0
            document.getElementsByClassName('shopping-cart-detail')[0].style.height = 0 + 'px'
            document.getElementsByClassName('shopping-cart-detail')[0].style.visibility = 'visible'
            let animationFlag = 0
            let barAnimation = setInterval(function () {
              temp += eachFlamesHeight
              document.getElementsByClassName('shopping-cart-detail')[0].style.height = temp + 'px'
              animationFlag++
              if (animationFlag > 50) {
                document.getElementsByClassName('shopping-cart-detail')[0].style.height = finalHeight + 'px'
                clearInterval(barAnimation)
              }
            }, 6)
            this.tapFlag = 1
          } else {
            let startHeight = 100 + this.shoppingCartData.length * 50
            if (startHeight > 500) {
              startHeight = 500
            }
            let finalHeight = 0
            let eachFlamesHeight = (startHeight - finalHeight) / 50
            let temp = startHeight
            let animationFlag = 0
            let barAnimation = setInterval(function () {
              temp -= eachFlamesHeight
              document.getElementsByClassName('shopping-cart-detail')[0].style.height = temp + 'px'
              animationFlag++
              if (animationFlag > 50) {
                document.getElementsByClassName('shopping-cart-detail')[0].style.visibility = 'hidden'
                document.getElementsByClassName('shopping-cart-detail')[0].style.height = startHeight + 'px'
                clearInterval(barAnimation)
              }
            }, 5)
            this.tapFlag = 0
          }
        }
      },
      shoppingCartAnimate () {
        let cartDiv = document.getElementsByClassName('shopping-cart')
        let ourterC = document.getElementsByClassName('ourter-circle')
        let innerC = document.getElementsByClassName('inner-circle')
        let cartImg = document.getElementsByClassName('shopping-cart-img')
        let scaleFlagA = 2
        let scaleFlagB = 2
        let scaleFlagC = 2
        let cartAnimationA = setInterval(function () {
          cartDiv[0].style.width = cartDiv[0].clientWidth - 2 + 'px'
          cartDiv[0].style.left = cartDiv[0].offsetLeft + 1 + 'px'
          cartDiv[0].style.top = cartDiv[0].offsetTop + 1 + 'px'
          ourterC[0].style.width = ourterC[0].clientWidth - 2 + 'px'
          innerC[0].style.width = innerC[0].clientWidth - 2 + 'px'
          cartImg[0].style.fontSize = 24 - scaleFlagA + 'px'
          cartDiv[0].style.height = cartDiv[0].clientHeight - 2 + 'px'
          ourterC[0].style.height = ourterC[0].clientHeight - 2 + 'px'
          innerC[0].style.height = innerC[0].clientHeight - 2 + 'px'
          scaleFlagA += 2
          if (scaleFlagA === 6) {
            clearInterval(cartAnimationA)
            let cartAnimationB = setInterval(function () {
              cartDiv[0].style.width = cartDiv[0].clientWidth + 2 + 'px'
              cartDiv[0].style.left = cartDiv[0].offsetLeft - 1 + 'px'
              cartDiv[0].style.top = cartDiv[0].offsetTop - 1 + 'px'
              ourterC[0].style.width = ourterC[0].clientWidth + 2 + 'px'
              innerC[0].style.width = innerC[0].clientWidth + 2 + 'px'
              cartImg[0].style.fontSize = 20 + scaleFlagB + 'px'
              cartDiv[0].style.height = cartDiv[0].clientHeight + 2 + 'px'
              ourterC[0].style.height = ourterC[0].clientHeight + 2 + 'px'
              innerC[0].style.height = innerC[0].clientHeight + 2 + 'px'
              scaleFlagB += 2
              if (scaleFlagB === 8) {
                clearInterval(cartAnimationB)
                let cartAnimationC = setInterval(function () {
                  cartDiv[0].style.width = cartDiv[0].clientWidth - 2 + 'px'
                  cartDiv[0].style.left = cartDiv[0].offsetLeft + 1 + 'px'
                  cartDiv[0].style.top = cartDiv[0].offsetTop + 1 + 'px'
                  ourterC[0].style.width = ourterC[0].clientWidth - 2 + 'px'
                  innerC[0].style.width = innerC[0].clientWidth - 2 + 'px'
                  cartImg[0].style.fontSize = 26 - scaleFlagC + 'px'
                  cartDiv[0].style.height = cartDiv[0].clientHeight - 2 + 'px'
                  ourterC[0].style.height = ourterC[0].clientHeight - 2 + 'px'
                  innerC[0].style.height = innerC[0].clientHeight - 2 + 'px'
                  scaleFlagC += 2
                  if (scaleFlagC === 4) {
                    clearInterval(cartAnimationC)
                  }
                }, 30)
              }
            }, 30)
          }
        }, 30)
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../stylus/customStyle.styl"
  .footer
    font-size: 0
    .fade-enter-active
      transition: opacity .5s
    .fade-leave-active
      transition: opacity .5s
    .fade-enter, .fade-leave-to
      opacity: 0
    .gray-layer
      position: fixed
      height: 100%
      width: 100%
      top: 0
      left: 0
      background: rgba(7,17,27,0.7)
      backdrop-filter: blur(10px)
      z-index: 10
    .footer-bar
      position: absolute
      bottom: 0px
      width: 100%
      height: 48px
      background: #141d27
      z-index: 50
      .shopping-cart
        position: absolute
        left: 16px
        bottom: 2px
        .ourter-circle
          z-index: 55
          height: 56px
          width: 56px
          padding: 6px
          border-radius: 28px
          background: #141d27
          .inner-circle
            z-index: 60
            padding: 10px
            height: 44px
            width: 44px
            border-radius: 22px
            background: #2b343c
            .shopping-cart-img
              z-index: 65
              font-size: 24px
              color: rgba(255,255,255,0.4)
              line-height: 24px
        .total-count
          display: block
          visibility: hidden
          position: absolute
          top: 0
          right: 0
          background: #f01416
          height: 16px
          padding: 0 5px
          border-radius: 8px
          font-size: 10px
          text-align: center
          line-height: 16px
          vertical-align: top
          color: rgb(255,255,255)
      .total-price
        position: absolute
        left: 0
        top: 0
        height: 46px
        width: 130px
        font-size: 16px
        line-height: 46px
        font-weight: 700
        color: rgba(255,255,255,0.4)
        text-indent: 70px
        border-right: 1px solid rgba(255,255,255,0.1)
      .delivery-cost
        margin: 1px 105px 1px 130px
        height: 46px
        line-height: 46px
        font-size: 12px
        text-indent: 13px
        color: rgba(255,255,255,0.4)
        font-weight: 300
      .purchase
        position: absolute
        height: 48px
        width: 105px
        bottom: 0
        right: 0
        font-size: 12px
        font-weight: 700
        line-height: 48px
        text-align: center
        background: #2b333b
        color: rgba(255,255,255,0.4)
    .shopping-cart-detail
      visibility: hidden
      height: 40px
      position: absolute
      width: 100%
      bottom: 0
      z-index: 20
      background: #fff
      .title-bar
        position: relative
        height: 40px
        width: 100%
        padding-left: 18px
        background: #f4f5f7
        border-bottom: 1px solid #d9dde0
        .title-span
          font-size: 14px
          color: rgba(0,0,0,0.7)
          font-weight: 300
          line-height: 38px
        .clear-all
          display: inline-block
          position: absolute
          right: 18px
          top: 12px
          height: 18px
          width: 25px
          font-size: 12px
          color: #00a0dc
          font-weight: 700
      .goods-detail
        overflow: auto
        margin-bottom: 0
        max-height: 400px
        width: 100%
        padding: 0 18px
        .detail-ul
          .detail-li
            height: 50px
            width: 100%
            border-bottom: 1px solid rgba(7,17,27,0.1)
            .food-name
              vertical-align: top
              font-size: 14px
              color: rgb(7,17,27)
              line-height: 48px
            .food-price
              margin-right: 12px
              float: right
              vertical-align: top
              font-size: 14px
              font-weight: 700
              color: #f01414
              line-height: 48px
              .food-price-symbol
                display: inline-block
                vertical-align: top
                line-height: 50px
                font-weight: normal
                font-size: 10px
            .add-food
              float: right
              right: 18px
              vertical-align: top
              font-size: 20px
              color: #00a0dc
              line-height: 48px
            .remove-food
              float: right
              vertical-align: top
              margin-right: 10px
              font-size: 20px
              color: #00a0dc
              line-height: 48px
            .food-counter
              float: right
              vertical-align: top
              margin-right: 10px
              font-size: 10px
              color: rgb(147,153,159)
              line-height: 48px
</style>