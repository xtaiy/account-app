
<template>
  <nav>
    <router-link to="/money" class="item" active-class="selected">
      <Icon name="money"/>
      记账
    </router-link>
    <router-link to="/labels" class="item" active-class="selected">
      <Icon name="label"/>
      标签
    </router-link>
    <router-link to="/statistics" class="item" active-class="selected">
      <Icon name="statistics"/>
      统计
    </router-link>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
// eslint-disable-next-line no-undef
let importAll = (requireContext: __WebpackModuleApi.RequireContext)=>requireContext.keys().forEach(requireContext);
try {importAll(require.context('../assets/icons',true,/\.svg$/));}catch (error){console.log(error);}

@Component
export default class Nav extends Vue {

}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
nav {
  display: flex;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.25);
  flex-direction: row;
  font-size: 12px;
  > .item {
    padding: 2px 0;
    width: 33.33333%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  > .item.selected{
    color: $color-highlight;
  }
}
</style>