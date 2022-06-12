<template>
  <svg class="icon" @click="$emit('click',$event)">
    <use :xlink:href="'#'+name"/>
  </svg>
</template>
<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class Icon extends Vue {
  @Prop(String) name:string|undefined;
}
</script>

<style scoped lang="scss">
.icon{
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  width: 32px;
  height: 32px;
}
</style>