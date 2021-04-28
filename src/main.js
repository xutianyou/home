import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import './assets/css/theme/blue/blue.css'; // 蓝色主题
import './assets/css/theme/violet/violet.css'; // 紫色主题
// import 'element-ui/lib/theme-chalk/index.css' //默认主题

/*rem的适配插件*/
import "amfe-flexible";

/*公共css*/
import './assets/css/reset.css'
/*主题颜色ss*/
import './assets/css/theme.css'

/*粒子背景*/
import VueParticles from 'vue-particles'
Vue.use(VueParticles)

/*拖拽登录验证*/
import SlideVerify from 'vue-monoplasty-slide-verify';
Vue.use(SlideVerify);

/*echarts*/
import * as echarts from 'echarts';
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
