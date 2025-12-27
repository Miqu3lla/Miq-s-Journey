import { createRouter, createWebHistory } from 'vue-router'

// Create router instance with routes configuration
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login' // Redirect root to login page
    },

    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login/login.vue'), // Lazy load component
      meta: { requiresAuth: true } // Only accessible if authenticated
    },

    {
      path: '/home',
      name: 'Home',
      component: () => import('../views/Home/Home.vue'),
      meta: { guest: true } // Requires user to be logged in
    },

    {
      path: '/Dashboard',
      name: 'Dashboard',
      component: () => import('../views/Dashboard/Dashboard.vue'),
      meta: { guest: true } // Requires user to be logged in
    }
  ],
})

// Navigation guard - runs before each route change
router.beforeEach((to, from, next) =>{
  // Check if user is authenticated from localStorage
  const isAuthenticated = JSON.parse(localStorage.getItem('user'))

 // If route requires auth and user is logged in, redirect to home
 if (to.meta.requiresAuth && isAuthenticated) {
    next('/home')
 }
 // If route is for guests only and user is not logged in, redirect to login
else if (to.meta.guest && !isAuthenticated) {
    next('/login')
 } else {
    next() // Allow navigation
 }
})

export default router
