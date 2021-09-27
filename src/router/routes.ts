import { BreadcrumbItem } from '@/models/BreadcrumbItem'
import ConfigHelper from '@/util/config-helper'
import CreateRoutingSlipView from '../views/CreateRoutingSlipView.vue'
import Dashboard from '../views/Dashboard.vue'
import PageNotFound from '../views/PageNotFound.vue'
import { Role } from '@/util/constants'
import { RouteConfig } from 'vue-router'
import SigninView from '@/views/auth/SigninView.vue'
import SignoutView from '@/views/auth/SignoutView.vue'
import Unauthorized from '@/views/Unauthorized.vue'
import ViewRoutingSlip from '../views/ViewRoutingSlip.vue'

const routes: Array<RouteConfig> = [
  { path: '/', name: 'root', redirect: 'home' },
  {
    path: '/home',
    name: 'home',
    component: Dashboard,
    meta: {
      requiresAuth: true,
      allowedRoles: [Role.FAS_USER],
      breadCrumb (route) {
        const redirectFromAuth = route.query?.redirectFromAuth
        if (redirectFromAuth) {
          return [
            {
              text: 'Staff Dashboard',
              disabled: false,
              href: `${ConfigHelper.getAuthWebUrl()}`
            } as BreadcrumbItem,
            {
              text: 'FAS Dashboard',
              disabled: true,
              to: '/home'
            } as BreadcrumbItem
          ]
        }
      }
    }
  },
  {
    path: '/create-routing-slip',
    name: 'create-routing-slip',
    component: CreateRoutingSlipView,
    meta: {
      requiresAuth: true,
      allowedRoles: [Role.FAS_CREATE]
    }
  },
  {
    path: '/view-routing-slip/:slipId?',
    name: 'view-routing-slip',
    component: ViewRoutingSlip,
    props: true,
    meta: {
      requiresAuth: true,
      allowedRoles: [Role.FAS_VIEW],
      breadCrumb (route) {
        const slipId = route.params.slipId
        const redirectFromAuth = route.query?.redirectFromAuth
        const items = [
          {
            text: 'FAS Dashboard',
            disabled: false,
            to: redirectFromAuth ? '/home?redirectFromAuth=true' : '/home'
          } as BreadcrumbItem,
          {
            text: `View Routing Slip: ${slipId}`,
            disabled: false,
            to: redirectFromAuth ? `/view-routing-slip/${slipId}?redirectFromAuth=true` : `/view-routing-slip/${slipId}`
          } as BreadcrumbItem
        ]
        if (redirectFromAuth) {
          items.unshift({
            text: 'Staff Dashboard',
            disabled: false,
            href: `${ConfigHelper.getAuthWebUrl()}`
          } as BreadcrumbItem)
        }
        return items
      }
    }
  },
  {
    path: '/view-routing-slip/:parentSlipId/:slipId?',
    name: 'view-routing-slip-child',
    component: ViewRoutingSlip,
    props: true,
    meta: {
      requiresAuth: true,
      allowedRoles: [Role.FAS_VIEW],
      breadCrumb (route) {
        const slipId = route.params.slipId
        const parentSlipId = route.params.parentSlipId
        const redirectFromAuth = route.query?.redirectFromAuth
        const items = [
          {
            text: 'FAS Dashboard',
            disabled: false,
            to: redirectFromAuth ? '/home?redirectFromAuth=true' : '/home'
          } as BreadcrumbItem,
          {
            text: `View Routing Slip: ${parentSlipId}`,
            disabled: false,
            to: redirectFromAuth ? `/view-routing-slip/${parentSlipId}?redirectFromAuth=true` : `/view-routing-slip/${parentSlipId}`
          } as BreadcrumbItem,
          {
            text: `View Routing Slip: ${slipId}`,
            disabled: true,
            to: redirectFromAuth ? `/view-routing-slip/${slipId}?redirectFromAuth=true` : `/view-routing-slip/${slipId}`
          } as BreadcrumbItem
        ]
        if (redirectFromAuth) {
          items.unshift({
            text: 'Staff Dashboard',
            disabled: false,
            href: `${ConfigHelper.getAuthWebUrl()}`
          } as BreadcrumbItem)
        }
        return items
      }
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
