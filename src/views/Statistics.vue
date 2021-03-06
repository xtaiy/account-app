<template>
    <Layout>
      <types class-prefix="types" :data-source="recordTypeList" :value.sync="type"/>
      <div class="chart-wrapper" ref="chartWrapper">
        <Chart :options="chartOptions" class="chart"></Chart>
      </div>
      <ol v-if="groupedList.length>0">
        <li v-for="(group,index) in groupedList" :key="index">
          <h3 class="title">
            <span>{{beautify(group.title)}}</span>
            <span>￥{{group.total}}</span>
          </h3>
          <ol>
            <li v-for="item in group.items" :key="item.id" class="record">
              <span>{{tagString(item.tags)}}</span>
              <span class="notes">{{item.notes}}</span>
              <span>{{item.amount}}</span>
            </li>
          </ol>
        </li>
      </ol>
      <div v-else class="noResult">
        目前没有相关记录
      </div>
    </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Types from '@/components/money/Types.vue';
import recordTypeList from '@/constants/recordTypeList';
import clone from '@/lib/clone';
import dayjs from 'dayjs';
import Chart from '@/components/Chart.vue';
import _ from 'lodash'

@Component({
  components: {Chart, Types}
})
export default class Statistics extends Vue {
    recordTypeList=recordTypeList;
    type='-';
    get chartOptions(){
      const today=new Date();
      const array=[];
      for(let i=0;i<=29;i++) {
        const date=dayjs(today).subtract(i,'day').format('YYYY-MM-DD');

        const found=_.find(this.groupedList,{
          title:date
        })
        array.push({date,value:found?found.total:0});
      }
      const keys=array.map(item=>item.date).reverse();
      const values=array.map(item=>item.value).reverse();
      return{
        grid:{
          left:0,
          right:0,
        },
        xAxis: [{
          type: "category",
          data: keys,
          axisTick: {show:false, alignWithLabel:true},
          axisLabel:{
            formatter:function(value:string){
              return value.substr(5)
            }
          },
        }],
        yAxis: [{
          type: "value",
          show: false
        }],
        series: [{
          symbol:'circle',
          symbolSize:10,
          data: values,
          type: 'line'
        }
        ],
        tooltip:{
          show:true,
          triggerOn:'click',
          formatter:'{c}',
          position:'top',
        },
      }
    }
  beforeCreate(){
    this.$store.commit('fetchRecords');
  }
  mounted(){
      const div=(this.$refs.chartWrapper as HTMLDivElement)
      div.scrollLeft=div.scrollWidth;
  }
  get recordList(){
    // eslint-disable-next-line no-undef
    return (this.$store.state as RootState).recordList;
  }
  get groupedList(){
    type Result={title:string,total?:number,items:RecordItem[]}[]
    const {recordList}=this;
    const newList=clone(recordList).filter(item=>item.type===this.type).sort((a,b)=>dayjs(b.createdAt).valueOf()-dayjs(a.createdAt).valueOf());
    if(newList.length===0)return [];
    const result:Result=[{title:dayjs(newList[0].createdAt).format('YYYY-MM-DD'),items:[newList[0]]}];
    for(let i=1;i<newList.length;i++){
      const current=newList[i];
      const last=result[result.length-1];
      if(dayjs(last.title).isSame(dayjs(current.createdAt),'day')){
        last.items.push(current);
      }else{
        result.push({title:dayjs(current.createdAt).format('YYYY-MM-DD'),items:[current]});
      }
    }
    result.forEach(group=>{
      group.total=group.items.reduce((sum,item)=>sum + item.amount,0);
    })
    return result;
  }
  // eslint-disable-next-line no-undef
  tagString(tags: Tag[]) {
    return tags.length === 0 ? '无' :
        tags.map(t => t.name).join('，');
  }
  beautify(string:string){
    const day=dayjs(string);
    const now=dayjs();
    if(day.isSame(now,'day')){
      return '今天';
    }else if(day.isSame(now.subtract(1,'day'),'day')){
      return '昨天';
    }else if(day.isSame(now.subtract(2,'day'),'day')){
      return '前天';
    }else if(day.isSame(now,'year')){
      return day.format('M月D日');
    }else{
      return day.format('YYYY年MM月DD日');
    }
  }
}
</script>

<style scoped lang="scss">
.noResult{
  padding: 16px;
  text-align: center;
}
::v-deep {
  .types-tabs-item{
    background: #c4c4c4;
    &.selected{
      background:white;
      &::after{
        display: none;
      }
    }
  }
}
.title{
  padding: 0 16px;
  min-height: 40px;
  line-height: 40px;
  display: flex;
  justify-content: space-between;
}
.record{
  background: white;
  padding: 0 16px;
  min-height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.notes{
  margin-right: auto;
  margin-left: 16px;
  color: #999;
}
.chart-wrapper{
  overflow: auto;
  &::-webkit-scrollbar{
    display: none;
  }
}
.chart{
  width: 430%;

}
</style>