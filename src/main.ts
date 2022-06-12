import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import Nav from '@/components/Nav.vue';
import Layout from '@/components/Layout.vue';
import Icon from '@/components/Icon.vue';
import { MessageBox ,Message,DatePicker} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;
Vue.component('Nav', Nav);
Vue.component('Layout', Layout);
Vue.component('Icon', Icon);
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$message = Message
Vue.use(DatePicker);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');

window.onload=function (){
    setTimeout(function (){
        window.scrollTo(0,200);
    },0);
};