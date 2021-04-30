import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import './assets/css/theme/blue/blue.css'; // 蓝色主题
import './assets/css/theme/violet/violet.css'; // 紫色主题
// import 'element-ui/lib/theme-chalk/index.css' //默认主题
/*公共css*/
import './assets/css/reset.css';
/*主题颜色ss*/
import './assets/css/theme.css';
/*图标管理css*/
import './assets/iconfont/iconfont.css';
/*prototype管理*/
import './utils/prototype';
/*全局组件管理*/
import './utils/globalComponent';
/*rem的适配插件*/
import "amfe-flexible";
/*粒子背景*/
import VueParticles from 'vue-particles';
/*拖拽登录验证*/
import SlideVerify from 'vue-monoplasty-slide-verify';
/*echarts*/

Vue.use(VueParticles)
Vue.use(SlideVerify);
Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
