/*
While upgrading to vue 3 please check full plugin and do necessary modifications here
  Library build set up for fas-search-components.
  build library using vue-cli-service
  Basic set up of included files store and i18n included here
  How to use :
  inside main.ts  `import Search from 'fas-ui'`
  Vue.use(Search, { store, i18n })
  include style if needed either
  import 'fas-ui/fas-lib/fas-ui.css'
  or inside component style tag us without scope (global scope needed),
  @import '~fas-ui/src/assets/scss/search.scss';
  */

import OurVue from 'vue'
import Search from '@/components/Dashboard/Search.vue'
import VueCompositionAPI from '@vue/composition-api'
import { useI18n } from 'vue-i18n-composable'

// stores needed fro search

// lang files

/**
 * install function
 *
 * @param {*} Vue parent component vue contructor
 * @param {store, i18n} options need store and i18n
 */
function install (Vue, options) {
  if (OurVue !== Vue) {
    // eslint-disable-next-line no-console
    console.error('Multiple instances of Vue detected ')
  }

  if (install.installed) return
  install.installed = true
  // since VueCompositionAPI is not giving direct access to property we are checking by using setup api exist in context or not
  // since setup is a reserved keyword and which is using in vue 3 also, Hope it will not change.
  // Another solution is Object.hasOwnProperty.call(Vue, '__composition_api_installed__').
  // we are not using that in futurem, if they change the string no need to brake app
  // Couldnot find better solution since lack of information available. sorry devs :(
  if (!Object.hasOwnProperty.call(Vue.config.optionMergeStrategies, 'setup')) {
    // if parent is not using VueCompositionAPI api need to push to vue
    Vue.use(VueCompositionAPI)
    // eslint-disable-next-line no-console
    console.info('[FAS-Plugin] VueCompositionAPI is not available in parent so pushing from plugin')
  } else {
    // eslint-disable-next-line no-console
    console.info('[FAS-Plugin] VueCompositionAPI already installed')
  }

  // simple hack to inject locale messages. check for better solutions
  // this will not work when chaging lang.
  // need to updated code (since we are not using other lag now, not updating chanegs)
  const { t } = useI18n()
  if (options.i18n && t && t.messages) {
    options.i18n.mergeLocaleMessage(
      options.i18n.locale,
      t.messages[t.locale]
    )
  } else {
    // eslint-disable-next-line no-console
    console.error('[FAS-Plugin] please provide i18n to use lang')
  }
  // pushing store modules to parent store
  // use unique name to avoid conflict
  if (options.store) {
    // options.store.registerModule('store', store)
    window.fasStore = options.store
  } else {
    // eslint-disable-next-line no-console
    console.error('[FAS-Plugin] please provide store')
  }
  // registering component to use as  plugin
  Vue.component('fas-search-component', Search)
}

const plugin = {
  install
}

let GlobalVue = null
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
  GlobalVue = global.vue
}

if (GlobalVue) {
  GlobalVue.use(plugin)
}

Search.install = install

export default Search
