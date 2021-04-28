import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"
import VueRouter from '../router'

Vue.use(Vuex)

function mapRou(arr) {
  /*
    动态添加路由component
    name对应views文件夹下页面组件
    返回菜单一元数组
  */ 

  let _router = []
  arr.forEach(item => {
    if (item.name) {
      _router.push({
        path: item.path,
        name: item.name,
        component: () => import(`@/views/${item.name}`),
      }) 
    }
    if (item.children) {
      _router = _router.concat(mapRou(item.children))
    }
  })
  return _router
}

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    token: null,
    user: {
      name: ''
    },
    menu: [],
    routerHome: []
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    deleteToken(state) {
      state.token = null;
    },
    setMenu(state, arr) {
      state.menu = arr;
    },
    setUser(state, obj) {
      state.user.name = obj.name;
    },
    SET_HOME_ROUTER(state) {
      const children = mapRou(state.menu);
      state.routerHome = [
        {
          path: '/home',
          name: 'Home',
          component: () => import('@/views/Home.vue'),
          redirect: children[0].path, // 设置默认打开的页面
          children
        }
      ]
      VueRouter.addRoutes(state.routerHome); 
    }
  },
  getters: {
    getMenu(state) {
      return state.menu
    }
  },
  actions: {
    getMenuList(context) {
      context.commit('SET_HOME_ROUTER') // actions调用mutations
    }
  },
  modules: {
  }
})
