<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "~@/assets/style/reset.scss";
body{
  font-size: 16px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  background-color: #f5f5f5;
}
@media screen and (min-width: 500px){
  .el-picker-panel {
    left: calc(50% - 70px) !important;
    > .popper__arrow{
      left:215px !important;
    }
  }

}
@media screen and (max-width: 500px) {
  .el-message-box{
    width: 85% !important;
  }
}
#app{
  max-width: 500px;
  margin:0 auto;
 }

</style>
