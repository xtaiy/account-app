<template>
      <el-date-picker
          @change="select"
          v-model="value1"
          type="date">
      </el-date-picker>

</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class DatePicker extends Vue {
  select(value:Date){
    this.$emit('update:change',value.toISOString())
  }
  value1='';
  value2='';
  pickerOptions={
    disabledDate(time:Date) {
      return time.getTime() > Date.now();}
  }
}
</script>

<style scoped lang="scss">
::v-deep{

  .el-input__inner{
    display: none;
  }
  .el-input__prefix{
    width: 100%;
    color: #409EFF;
    left:0;
  }
  .el-input__icon{
    width: 100%;
  }
  .el-input__icon::before{
    font-size: 32px;
    position: absolute;
    left:50%;
    top:50%;
    transform: translate(-50%,-50%);
  }

  .el-input__inner,
  .el-date-editor .el-range-input {
    color: #409EFF;
    &::placeholder {
      color: #409EFF;
    }

    &::-webkit-input-placeholder {
      /* WebKit browsers 适配谷歌 */
      color: #409EFF;
    }

    &:-moz-placeholder {
      /* Mozilla Firefox 4 to 18 适配火狐 */
      color: #409EFF;
    }

    &::-moz-placeholder {
      /* Mozilla Firefox 19+ 适配火狐 */
      color: #409EFF;
    }

    &:-ms-input-placeholder {
      /* Internet Explorer 10+  适配ie*/
      color: #409EFF;
    }
  }
}
</style>