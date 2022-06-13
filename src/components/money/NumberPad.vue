<template>
  <div class="numberPad">
    <div class="output">{{output}}</div>
    <div class="buttons">
      <button @click="inputContent" class="button-item">1</button>
      <button @click="inputContent" class="button-item">2</button>
      <button @click="inputContent" class="button-item">3</button>
      <button @click="remove" class="button-item">删除</button>
      <button @click="inputContent" class="button-item">4</button>
      <button @click="inputContent" class="button-item">5</button>
      <button @click="inputContent" class="button-item">6</button>
      <button @click="clear" class="button-item">清空</button>
      <button @click="inputContent" class="button-item">7</button>
      <button @click="inputContent" class="button-item">8</button>
      <button @click="inputContent" class="button-item">9</button>
      <DatePicker class="button-item" @update:change ="dateSelected"></DatePicker>
      <button @click="inputContent" class="zero button-item">0</button>
      <button @click="inputContent" class="button-item">.</button>
      <button @click="ok" class="ok button-item">完成</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import DatePicker from '@/components/DatePicker.vue';
@Component({
  components: {DatePicker}
})
export default class NumberPad extends Vue {
  @Prop(Number) value!:number;
  output=this.value.toString();
  inputContent(event:MouseEvent){
    const button=event.target as HTMLButtonElement;
    const input= button.textContent as string;
    if(this.output.length===16){return;}
    if(this.output==='0'){
      if('0123456789'.indexOf(input)>=0){
        this.output=input;
      }else if(input==='.'){
        this.output+=input;
      }
    }else {
      if(this.output.indexOf('.')>=0){
        if(input==='.'){
          return;
        }
      }
      this.output+=input
    }
  }
  remove(){
    this.output=this.output.substring(0,this.output.length-1)
    if(this.output.length===0){
      this.output='0';
    }
  }
  clear(){
    this.output='0'
  }
  ok(){
    const number=parseFloat(this.output);
    this.$emit('update:value',number)
    this.$emit('submit')
    this.output = '0';
  }
  dateSelected(value:string) {
    this.$emit('change',value)
  }
}
</script>

<style scoped lang="scss">

.numberPad{
  display: flex;
  flex-direction: column;
  > .output{
    font-size: 36px;
    font-family: Consolas,monospace;
    padding: 9px 16px;
    text-align: right;
    box-shadow: inset 0 -5px 5px -5px rgba(0,0,0,0.25),
    inset 0 5px 5px -5px rgba(0,0,0,0.25);
    height: 72px;
  }
  > .buttons{
    display: flex;
    flex-wrap: wrap;
    >.button-item{
      width: 25%;
      height: 64px;
      background:transparent;
      border: none;

      &.ok{
        flex-grow: 1;
      }
      $bg:#f2f2f2;
      &:nth-child(1) {
        background: $bg;
      }
      &:nth-child(2) ,&:nth-child(5){
        background: darken($bg,4%);
      }
      &:nth-child(3) ,&:nth-child(6),&:nth-child(9){
        background: darken($bg,8%);
      }
      &:nth-child(4) ,&:nth-child(7),&:nth-child(10),&:nth-child(13){
        background: darken($bg,12%);
      }
      &:nth-child(8) ,&:nth-child(11),&:nth-child(14){
        background: darken($bg,16%);
      }
      &:nth-child(12){
        background: darken($bg,20%);
      }
      &:nth-child(15){
        background: #4497ec;
      }
    }
  }
}
</style>