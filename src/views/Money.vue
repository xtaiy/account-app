<template>
  <div>
    <Layout class="layout">
      <NumberPad :value.sync="record.amount" @submit="saveRecord" @change="onUpdateCreatedAt"/>
      <Types :value.sync=record.type :data-source="recordTypeList"/>
      <FormItem @update:value="onUpdateNotes" field-name="备注" placeholder="在这里输入备注"/>
      <Tags @update:tags="onUpdateTags"/>
    </Layout>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import NumberPad from '@/components/money/NumberPad.vue';
import Tags from '@/components/money/Tags.vue';
import Types from '@/components/money/Types.vue';
import FormItem from '@/components/money/FormItem.vue';
import recordTypeList from '@/constants/recordTypeList';

  @Component({
  components: {FormItem, Types, Tags, NumberPad}
})
export default class Money extends Vue {
  record:RecordItem={tags:[], notes:'', type:'-', amount:0,createdAt:'0'};
  recordTypeList=recordTypeList;
  created() {
    this.$store.commit('fetchRecords');
  }
  get recordList(){
    return this.$store.state.recordList;
  }

  onUpdateNotes(newValue:string){
    this.record.notes=newValue;
  }
  onUpdateTags(newTags: string[]) {
    this.record.tags= newTags;
  }
  saveRecord(){
    if(!this.record.tags||this.record.tags.length===0){
      window.alert('请至少选择一个标签');
      return
    }
    this.$store.commit('createRecord',this.record);
    window.alert('已保存');
    this.record.notes='';
  }
    onUpdateCreatedAt(value:string){
      this.record.createdAt=value.split('T')[0];
  }
}
</script>

<style scoped lang="scss">
::v-deep{
  .content{
    display: flex;
    flex-direction: column-reverse;
  }
}
</style>