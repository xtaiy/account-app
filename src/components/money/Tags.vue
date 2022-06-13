<template>
  <div class="tags">
    <div class="new">
      <button @click="createTag">新增标签</button>
    </div>
    <ul class="current">
      <li :class="{selected:selectedTags.indexOf(tag)>=0}" v-for="(tag,id) in tagList" :key="id" @click="toggle(tag)">{{tag.name}}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import tagHelper from '@/mixins/tagHelper';
import {mixins} from 'vue-class-component';

@Component
export default class Tags extends mixins (tagHelper){
  get tagList(){
    return this.$store.state.tagList;
  }
  created(){
    this.$store.commit('fetchTags')
  }

  selectedTags:string[]=[];

  toggle(tag:string){
    let index=this.selectedTags.indexOf(tag);
    if(index>=0){
      this.selectedTags.splice(index,1);
    }else{
      this.selectedTags.push(tag);
    }
    this.$emit('update:tags',this.selectedTags)
  }
}
</script>

<style scoped lang="scss">
.tags{
  display: flex;
  flex-direction: column-reverse;
  background: white;
  font-size: 14px;
  padding: 16px;
  flex-grow: 1;
  > .current{
    display: flex;
    flex-wrap: wrap;

    > li{
      $bg:#d9d9d9;
      background-color: $bg;
      height: 24px;
      line-height: 24px;
      border-radius: 12px;
      padding: 0 16px;
      margin-right: 12px;
      margin-top: 4px;
      &.selected{
        background-color: darken($bg,50%);
      }
    }
  }
  > .new {
    padding-top: 16px;
    > button {
      background-color: transparent;
      border: none;
      color: #999;
      padding: 0 4px;
      border-bottom: 1px solid;
    }
  }
}
</style>