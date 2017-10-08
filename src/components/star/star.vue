<template>
  <div class="star">
    <span v-for="star in stars" :class="'star'+starSize+'_'+star" class="star-span"></span>
  </div>
</template>
<script>
export default {
  props: {
    starNumber: {
      type: Number
    },
    starSize: {
      type: Number
    },
    score: ''
  },
  computed: {
    stars () {
      let sco = parseFloat(this.score)
      let a = []
      for (let i = 0; i < this.starNumber; i++) {
        if (sco < 0.3) {
          a.push('off')
        } else if (sco < 0.7) {
          a.push('half')
        } else {
          a.push('on')
        }
        sco--
      }
      return a
    }
  }
}

</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../stylus/customStyle.styl"
  .star
    .star-span
      &.star24_on
        bg-img('star24_on')
        width: 9px
        height: 9px
        background-size: 9px 9px
        margin-right: 2px
      &.star24_half
        bg-img('star24_half')
        width: 9px
        height: 9px
        background-size: 9px 9px
        margin-right: 2px
      &.star24_off
        bg-img('star24_off')
        width: 9px
        height: 9px
        background-size: 9px 9px
        margin-right: 2px
      &.star36_on
        bg-img('star36_on')
        background-size: 14px 14px
        width: 14px
        height: 14px
        margin-right: 4px
      &.star36_half
        bg-img('star36_half')
        background-size: 14px 14px
        width: 14px
        height: 14px
        margin-right: 4px
      &.star36_off
        bg-img('star36_off')
        background-size: 14px 14px
        width: 14px
        height: 14px
        margin-right: 4px
      &.star48_on
        bg-img('star48_on')
        background-size: 24px 24px
        width: 24px
        height: 24px
        margin-right: 20px
      &.star48_half
        bg-img('star48_half')
        background-size: 24px 24px
        width: 24px
        height: 24px
        margin-right: 20px
      &.star48_off
        bg-img('star48_off')
        background-size: 24px 24px
        width: 24px
        height: 24px
        margin-right: 20px
      &:last-child
        margin-right: 0
      background-repeat: no-repeat
      color: red
      display: inline-block
</style>
