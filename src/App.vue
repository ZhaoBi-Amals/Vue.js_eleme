<template>
  <div id="app">
      <headerC :dataSheet="dataSheet"></headerC>
      <container :dataSheet="dataSheet"></container>
      <footerC></footerC>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        dataSheet: {}
      }
    },
    created () {
      this.$http.get('./static/data.json').then(response => {
        this.dataSheet = response.body
      }, response => {
        console.log('can not get data')
      })
    }
  }
</script>

<style>
</style>
