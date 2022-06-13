<template>
  <div class="wrapper" ref="container"></div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';
import * as echarts from 'echarts';
import {EChartsCoreOption} from 'echarts';
import {EChartsType} from 'echarts/types/dist/echarts';


@Component
export default class Chart extends Vue {
  @Prop() options!: EChartsCoreOption
  chart!:EChartsType;
  mounted(){
    this.chart=echarts.init(this.$refs.container as HTMLDivElement)
    this.chart.setOption(this.options);
  }
  @Watch('options')
  onOptionsChange(newValue:EChartsCoreOption){
    this.chart.setOption(newValue);
  }
}
</script>

<style scoped lang="scss">
.wrapper{
  height: 400px;
}
</style>