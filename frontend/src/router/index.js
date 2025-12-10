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
      meta: { requiresAuth: false }
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

  if (isAuthenticated && to.meta.requiresAuth === false) {
    next('/home')
  }
  else if (!isAuthenticated && to.meta.guest) {
    next('/login')
  }
})

export default router
