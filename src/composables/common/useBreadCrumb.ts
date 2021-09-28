import { BreadcrumbItem } from '@/models/BreadcrumbItem'
import ConfigHelper from '@/util/config-helper'
import { computed } from '@vue/composition-api'

/*
Composable function for BreadCrumb component that is displayed at top of the screen.
Currently, displayed in Dashboard and ViewRoutingslip views
*/
export function useBreadCrumb (_, context) {
  const items = computed(() => {
    if (context.root.$route && context.root.$route.name) {
      return generateBreadcrumbItems(context.root.$route)
    }
  })

  function generateBreadcrumbItems (route: any): BreadcrumbItem[] {
    switch (route.name) {
      case 'home':
        return generateBreadcrumbForHome(route)
      case 'view-routing-slip':
        return generateBreadcrumbForViewRoutingSlip(route)
      case 'view-routing-slip-child':
        return generateBreadcrumbForViewChildRoutingSlip(route)
      // We can add breadcrumbs for future components here
    }
  }

  function generateBreadcrumbForHome (route: any): BreadcrumbItem[] {
    if (route.query?.redirectFromAuth) {
      return [
        {
          text: 'Staff Dashboard',
          disabled: false,
          /* For redirecting to parent dashboard ( for Vuetify Breadcrumb to navigate )
          Reason: Behind the scenes, Vuetify breadcrumb calls router.push for :to property and
          window.location for :href property */
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

  function generateBreadcrumbForViewRoutingSlip (route: any): BreadcrumbItem[] {
    const slipId = route.params.slipId
    const items = [
        {
          text: 'FAS Dashboard',
          disabled: false,
          to: appendQueryParamsIfNeeded('/home', route)
        } as BreadcrumbItem,
        {
          text: `View Routing Slip: ${slipId}`,
          disabled: true,
          to: appendQueryParamsIfNeeded(`/view-routing-slip/${slipId}`, route)
        } as BreadcrumbItem
    ]
    // Append parent dashboard if redirectFromAuth property set to true
    if (route.query?.redirectFromAuth) {
      items.unshift({
        text: 'Staff Dashboard',
        disabled: false,
        href: `${ConfigHelper.getAuthWebUrl()}`
      } as BreadcrumbItem)
    }
    return items
  }

  function generateBreadcrumbForViewChildRoutingSlip (route: any): BreadcrumbItem[] {
    const slipId = route.params.slipId
    const parentSlipId = route.params.parentSlipId
    const items = [
        {
          text: 'FAS Dashboard',
          disabled: false,
          to: appendQueryParamsIfNeeded('/home', route)
        } as BreadcrumbItem,
        {
          text: `View Routing Slip: ${parentSlipId}`,
          disabled: false,
          to: appendQueryParamsIfNeeded(`/view-routing-slip/${parentSlipId}`, route)
        } as BreadcrumbItem,
        {
          text: `View Routing Slip: ${slipId}`,
          disabled: true,
          to: appendQueryParamsIfNeeded(`/view-routing-slip/${slipId}`, route)
        } as BreadcrumbItem
    ]

    if (route.query?.redirectFromAuth) {
      items.unshift({
        text: 'Staff Dashboard',
        disabled: false,
        href: `${ConfigHelper.getAuthWebUrl()}`
      } as BreadcrumbItem)
    }
    return items
  }

  function appendQueryParamsIfNeeded (targetUrl: string, route: any): string {
    const redirectFromAuth = route.query?.redirectFromAuth
    return redirectFromAuth ? `${targetUrl}?redirectFromAuth=true` : targetUrl
  }

  function goBack (): void {
    const penUltimateBreadcrumbItem = items.value[items.value.length - 2]
    // for parent dashboard, we had stored the target url in href property rather than to property
    if (penUltimateBreadcrumbItem.href) {
      window.location.href = penUltimateBreadcrumbItem.href
    } else {
      context.root.$router.push(penUltimateBreadcrumbItem.to)
    }
  }
  return {
    items,
    goBack
  }
}
