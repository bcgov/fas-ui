import { Role } from '@/util/constants'
import CreateRoutingSlipView from '../views/CreateRoutingSlipView.vue'
import Dashboard from '../views/Dashboard.vue'
import PageNotFound from '../views/PageNotFound.vue'
import SigninView from '@/views/auth/SigninView.vue'
import SignoutView from '@/views/auth/SignoutView.vue'
import Unauthorized from '@/views/Unauthorized.vue'

import ViewRoutingSlip from '../views/ViewRoutingSlip.vue'
import { RouteConfig } from 'vue-router'

const routes: Array<RouteConfig> = [
  { path: '/', name: 'root', redirect: 'home' },
  {
    path: '/home',
    name: 'home',
    component: Dashboard,
    meta: {
      requiresAuth: true,
      allowedRoles: [Role.FAS_USER]
    }
  },
  {
    path: '/create-routing-slip',
    name: 'create-routing-slip',
    component: CreateRoutingSlipView,
    meta: {
      requiresAuth: true,
      allowedRoles: [Role.FAS_EDIT]
    }
  },
  {
    path: '/view-routing-slip/:slipId?',
    name: 'view-routing-slip',
    component: ViewRoutingSlip,
    props: true,
    meta: {
      requiresAuth: true,
      allowedRoles: [Role.FAS_VIEW]
    }
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
  { path: '*', name: 'notfound', component: PageNotFound },
  {
    path: '/unauthorized',
    name: 'unauthorized',
    component: Unauthorized,
    meta: { requiresAuth: false }
  }
]

export default routes
