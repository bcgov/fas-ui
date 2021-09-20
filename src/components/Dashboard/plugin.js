/*eslint-disable */
import Search from './Search.vue'
// import Vue from 'vue'
// import Vue from "vue";
import VueCompositionAPI from '@vue/composition-api'
import routingSlip from '../../store/modules/routingSlip'
import codes from '../../store/modules/codes'
import indicator from '../../store/modules/indicator'
import i18n from '../../plugins/i18n'
// import store from '../../store'


// import Vuex from 'vuex'

// const store = new Vuex.Store({
//   /* options */
// })

// import breadCrump from "./breadcrump.vue";

function install(Vue, options) {
  // eslint-disable-next-line no-console
  console.log('insid e1.install store')
  Vue.use(VueCompositionAPI)
  Vue.use(i18n)
  // Vue.use(i18n)
  if (install.installed) return
  install.installed = true
  // Vue.extend({ i18n });
  // Vue.use(VueCompositionAPI)
  // eslint-disable-next-line no-console
  console.log('2.install options', options)
  // eslint-disable-next-line no-console
  console.log('i18n', i18n.messages)
  // eslint-disable-next-line no-console
  console.log('i18n.locale', i18n.locale)
  // eslint-disable-next-line no-console
  console.log('options.i18n', options.i18n.messages)
  // simple hack to inject locale messages. check for better solutions
  // this will not work when chaging lang. need to updated code
  if (options.i18n) {
    options.i18n.mergeLocaleMessage(
      options.i18n.locale,
      i18n.messages[i18n.locale]
    )
  } else {
    console.error('please provide i18n')
  }

  // // eslint-disable-next-line no-console
  // console.log('i18n[i18n.locale]', options.i18n.messages[i18n.locale])

  // eslint-disable-next-line no-console
  console.log('2.install vue', Vue.prototype)
  if (options.store) {
    options.store.registerModule('indicator', indicator)
    options.store.registerModule('routingSlip', routingSlip)
    options.store.registerModule('fasCodes', codes)
    // options.store.registerModule('store', store)
  } else {
    console.error('please provide store')
  }
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
