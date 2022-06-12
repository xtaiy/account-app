<template>
  <ul class="tabs" :class="{[classPrefix+'-tabs']:classPrefix}">
    <li v-for="item in dataSource" :key="item.value" @click="select(item.value)" class="tabs-item" :class="{selected:item.value===value,[classPrefix+'-tabs-item']:classPrefix}">{{item.text}}</li>

  </ul>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

type DataSourceItem={
  text:string
  value:string
}

@Component
export default class Types extends Vue {
 @Prop({default:'-'}) value!: string;
  @Prop(String) classPrefix?:string;
  @Prop({required:true,type:Array}) dataSource!:DataSourceItem[];
  select(newValue:string){
    this.$emit('update:value',newValue)
  }
}
</script>

<style scoped lang="scss">
.tabs {
  background-color: #c4c4c4;
  display: flex;
  justify-content: space-evenly;
  font-size: 24px;

  &-item {
    display: flex;
    width: 50%;
    height: 64px;
    justify-content: center;
    align-items: center;
    position: relative;

    &.selected::after {
      position: absolute;
      display: block;
      content: '';
      bottom: 0;
      width: 100%;
      height: 4px;
      background-color: #333;
    }
  }
}
</style>