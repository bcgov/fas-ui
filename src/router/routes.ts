
import { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
// auth
import SigninView from '@/views/auth/SigninView.vue'
import SignoutView from '@/views/auth/SignoutView.vue'

// Dasboard

const routes: Array<RouteConfig> = [
  { path: '/', name: 'root', redirect: 'home' },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    // router.beforeEach() routes here:
    path: '/signin/:idpHint',
    name: 'signin',
    component: SigninView,
    meta: {
      requiresAuth: false
    }
  },
  {
    // SbcHeader.logout() redirects here:
    path: '/signout',
    name: 'signout',
    component: SignoutView,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    // route level code-splitting
    // this generates a separate chunk (dashboard.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue')
  }
]

export default routes
