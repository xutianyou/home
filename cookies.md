1: 安装依赖 vue-cookies
2: 使用
import Vue from 'Vue'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
3: api
设置 cookie：this.$cookies.set(keyName, 'keyName', 30 * 60)   

获取cookie：this.$cookies.get(keyName)       

删除 cookie：this.$cookies.remove(keyName) 

查看一个cookie是否存在（通过keyName）：this.$cookies.isKey(keyName)  

获取所有cookie名称：this.$cookies.keys()