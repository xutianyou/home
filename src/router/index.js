import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routesName'
import store from '@/store'
Vue.use(VueRouter)

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (store.state.token) {
    if (to.name) {
      if ( routes.some(item => item.name === to.name) ) {
        next();
      } else if (to.name === 'Home') {
        store.dispatch('getMenuList');
        next({...to, replace: true })
      } else if (store.state.routerHome[0].children.some(item => item.name === to.name)) {
        next();
      }
    } else {
      if (!to.name && to.path !== '/') {
        if (store.state.routerHome[0].children.some(item => item.path === to.path)) {
          store.dispatch('getMenuList');
          next({...to, replace: true })
        }
      }
    }
  } else {
    if (routes.some(item => item.name === to.name)) {
      next();
    } else {
      next({
        name: 'Login'
      })
    }
  }

  // if (to.matched.some(record => record.meta.requiresAuth)) {
  //   if (router.app.$cookies.get("status") !== "logined") {
  //     next({
  //       path: '/login',
  //       query: { redirect: to.fullPath } // 把要跳转的地址作为参数传到下一步
  //     })
  //   } else {
  //     next()
  //   }
  // } else {
  //   if (to.query && to.query.redirect) {
  //     if (router.app.$cookies.get("status") === "logined") {
  //       next({path: to.query.redirect})
  //     } else {
  //       next()
  //     }
  //   } else {
  //     next() // 确保一定要调用 next()
  //   }
  // }
})

export default router
