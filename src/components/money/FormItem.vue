<template>
  <label class="notes">
    <span class="name">{{ fieldName }}</span>
    <input type="text" :placeholder="placeholder" :value="value" @input="onValueChanged($event.target.value)">
  </label>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class Notes extends Vue {
  @Prop({default: ''}) readonly value!: string;
  @Prop({required:true}) fieldName!:string;
  @Prop() placeholder?:string;


  onValueChanged(newValue:string){
    this.$emit('update:value',newValue)
  }
}
</script>

<style scoped lang="scss">
.notes{
  display: flex;
  padding-left: 16px;
  font-size: 14px;
  align-items: center;
  .name{
    padding-right: 16px;
  }
  > input{
    flex-grow: 1;
    height: 40px;
    background-color: transparent;
    border: none;
    padding-right: 16px;
  }
}
</style>