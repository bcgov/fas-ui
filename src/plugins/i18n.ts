import { createI18n } from 'vue-i18n'
import enLocals from '@/locales/en.json'

export default function initialize () {
  function loadLocaleMessages () {
    const messages = { en: enLocals }
    return messages
  }

  const i18n = createI18n({
    legacy: false, // you must specify 'legacy: false' option
    locale: import.meta.env.VUE_APP_I18N_LOCALE || 'en',
    fallbackLocale: import.meta.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
    messages: loadLocaleMessages()
  })

  return i18n
}
