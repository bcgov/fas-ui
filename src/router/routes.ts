
import { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
// auth
import SigninView from '@/views/auth/SigninView.vue'
import SignoutView from '@/views/auth/SignoutView.vue'

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
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

export default routes
