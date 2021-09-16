import search from './Search.vue'
import Vue from 'vue'
// import Vue from "vue";
import VueCompositionAPI from '@vue/composition-api'

// import breadCrump from "./breadcrump.vue";

function install (Vue) {
  // eslint-disable-next-line no-console
  console.log('1.install')
  Vue.use(VueCompositionAPI)
  if (install.installed) return
  install.installed = true
  Vue.use(VueCompositionAPI)
  // eslint-disable-next-line no-console
  console.log('2.install')
  Vue.component('v-Search', search)
}

const plugin = {
  install
}

let GlobalVue = null
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue
  // eslint-disable-next-line no-console
  console.log('1.window.Vue', window.Vue)
} else if (typeof global !== 'undefined') {
  GlobalVue = global.vue
  // eslint-disable-next-line no-console
  console.log('1.global.Vue', global.Vue)
}
// eslint-disable-next-line no-console
console.log('1.GlobalVue', GlobalVue)
if (GlobalVue) {
  GlobalVue.use(plugin)
}

// eslint-disable-next-line no-console
console.log('1.install')
Vue.use(VueCompositionAPI)

// clock.install = install

export default search
// export default {
//   install (_vue) {
//     _vue.use(VueCompositionAPI)
//   }
// }
