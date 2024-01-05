import 'vuetify/dist/vuetify.min.css'
import '$assets/scss/base.scss'
import '$assets/scss/layout.scss'
import '$assets/scss/overrides.scss'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#1669BB',
          error: '#D3272C',
          success: '#2E8540',
          anchor: '#1669BB',

          // Grey colors
          greyBase: '#adb5bd',
          greyLighten5: '#f8f9fa',
          greyLighten4: '#f1f3f5',
          greyLighten3: '#e9ecef',
          greyLighten2: '#dee2e6',
          greyLighten1: '#ced4da',
          greyDarken1: '#868e96',
          greyDarken2: '#495057',
          greyDarken3: '#343a40',
          greyDarken4: '#212529',

          // Bcgovblue colors
          bcgovblueBase: '#003366',
          bcgovblueLighten5: '#e0e7ed',
          bcgovblueLighten4: '#b3c2d1',
          bcgovblueLighten3: '#8099b3',
          bcgovblueLighten2: '#4d7094',
          bcgovblueLighten1: '#26527d',
          bcgovblueDarken1: '#1e1e1f',
          bcgovblueDarken2: '#002753',
          bcgovblueDarken3: '#002049',
          bcgovblueDarken4: '#001438',

          // Other colors
          bcgovblue2Base: '#38598A',
          bcgovblueLinkBase: '#1A5A96',
          bcgovgoldBase: '#fcba19',
          navBgBase: '#001438',
          navMenuBgBase: '#26527d'
        }
      }
    }
  }
})
