const routes = [
  {
    path: "/",
    name: "index",
    redirect: "/login",
    meta: { title: "main", icon: '', shows: false },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Register.vue')
  }
]
export default routes