/*eslint-disable */
import Search from './Search.vue'
// import Vue from 'vue'
// import Vue from "vue";
import VueCompositionAPI from '@vue/composition-api'
import routingSlip from '../../store/modules/routingSlip'
import codes from '../../store/modules/codes'
import indicator from '../../store/modules/indicator'
import i18n from '../../plugins/i18n'


// import Vuex from 'vuex'

// const store = new Vuex.Store({
//   /* options */
// })

// import breadCrump from "./breadcrump.vue";

function install(Vue, options) {
  // eslint-disable-next-line no-console
  console.log('insid e1.install')
  Vue.use(VueCompositionAPI)
  // Vue.use(i18n)
  if (install.installed) return
  install.installed = true
  // Vue.use(VueCompositionAPI)
  // eslint-disable-next-line no-console
  console.log('2.install options', options)

  options.store.registerModule('indicator', indicator)
  options.store.registerModule('routingSlip', routingSlip)
  options.store.registerModule('fasCodes', codes)

  Vue.component('v-search', Search)
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
