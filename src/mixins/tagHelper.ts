import {Component} from 'vue-property-decorator';
import Vue from 'vue';
import {MessageBoxInputData} from 'element-ui/types/message-box';

@Component
export default class  tagHelper extends Vue{
    createTag() {
        this.$prompt('请输入标签名', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
        }).then(res => {
            const value = (res as MessageBoxInputData).value
            if(!value){
                return window.alert('标签名不能为空');
            }
            this.$store.commit('createTag',value);
        }).catch(() => {
            this.$message({
                type: 'info',
                message: '取消输入'
            });
        });
    }
    // createTag(){
    //     const name=window.prompt("请输入标签名")
    //     if(!name){
    //         return window.alert('标签名不能为空');
    //     }
    //     this.$store.commit('createTag',name);
    // }
}
