<template>
  <div class="nav-wrapper">
    <div class="content">
      <slot></slot>
    </div>
    <Nav></Nav>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class Layout extends Vue {

}
</script>

<style scoped lang="scss">
.nav-wrapper{
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.content{
  flex-grow: 1;
  overflow: auto;
}
</style>