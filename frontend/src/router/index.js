import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login/login.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import('../views/Home/Home.vue'),
      meta: { guest: true }
    }
  ],
})

router.beforeEach((to, from, next) =>{
  const isAuthenticated = JSON.parse(localStorage.getItem('user'))

 if (to.meta.requiresAuth && isAuthenticated) {
    next('/home')
 }
else if (to.meta.guest && !isAuthenticated) {
    next('/login')
 } else {
    next()
 }
})

export default router
