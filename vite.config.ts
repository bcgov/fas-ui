import EnvironmentPlugin from 'vite-plugin-environment'
import { defineConfig } from 'vite'
import fs from 'fs'
import path from 'path'
import postcssNesting from 'postcss-nesting'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'

const packageJson = fs.readFileSync('./package.json') as unknown as string
const appName = JSON.parse(packageJson).appName
const appVersion = JSON.parse(packageJson).version
const sbcName = JSON.parse(packageJson).sbcName
const sbcVersion = JSON.parse(packageJson).dependencies['sbc-common-components']
const aboutText1 = (appName && appVersion) ? `${appName} v${appVersion}` : ''
const aboutText2 = (sbcName && sbcVersion) ? `${sbcName} v${sbcVersion}` : ''

const generateAboutText = (aboutText1, aboutText2) => {
  return (aboutText1 && aboutText2) ? `"${aboutText1}<br>${aboutText2}"`
    : aboutText1 ? `"${aboutText1}"`
      : aboutText2 ? `"${aboutText2}"`
        : '""' // Ensure a string is always returned
}

export default defineConfig(({ mode }) => {
  const isLibBuild = mode === 'lib'
  return {
    define: {
      'import.meta.env.ABOUT_TEXT': generateAboutText(aboutText1, aboutText2)
    },
    envPrefix: 'VUE_APP_', // Need to remove this after fixing vaults. Use import.meta.env with VUE_APP.

    build: {
      sourcemap: true,
      lib: isLibBuild ? {
        entry: path.resolve(__dirname, 'src/lib-setup.js'),
        name: 'lib',
        formats: ['umd'],
        fileName: (format) => `lib.${format}.min.js`
      } : undefined,
      terserOptions: {
        format: {
          semicolons: false
        }
      },
      rollupOptions: {
        external: (request) => {
          // If library, use externals, otherwise the Vue/ composition-api instance in Auth-web will have issues.
          if (isLibBuild && (/^@vue\/composition-api$/.test(request) || /^vue$/.test(request))) {
            return true
          }
          return false
        }
      },
      outDir: 'lib',
      minify: isLibBuild ? 'terser' : false
    },
    plugins: [
      // @vitejs/plugin-vue plugin handles Vue Single File Components (SFCs)
      vue(),
      vuetify(),
      EnvironmentPlugin({
        BUILD: 'web' // Fix for Vuelidate, allows process.env with Vite.
      }),
      postcssNesting
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '~': path.resolve(__dirname, './node_modules'),
        $assets: path.resolve(__dirname, './src/assets'),
        // Fix for bcrs-shared-components unit tests fail
        '@bcrs-shared-components/mixins': path.resolve(__dirname, './node_modules/@bcrs-shared-components/mixins/index.ts'),
        '@bcrs-shared-components/enums': path.resolve(__dirname, './node_modules/@bcrs-shared-components/enums/index.ts'),
        '@bcrs-shared-components/staff-comments': path.resolve(__dirname, './node_modules/@bcrs-shared-components/staff-comments/index.ts'),
        '@bcrs-shared-components/interfaces': path.resolve(__dirname, './node_modules/@bcrs-shared-components/interfaces/index.ts'),
        // Fix for module decorator unit tests fail
        // 'vuex-module-decorators': path.resolve(__dirname, './node_modules/vuex-module-decorators/dist/esm/index.js')
        '@sbc': path.resolve(__dirname, './node_modules/sbc-common-components/src')
      },
      extensions: ['.js', '.ts', '.vue', '.json', '.css', '.mjs', '.jsx', 'tsx']
    },
    server: {
      port: 8080,
      host: true
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './tests/unit/setup.ts',
      threads: true,
      // hide Vue Devtools message
      onConsoleLog: function (log) {
        if (log.includes('Download the Vue Devtools extension')) {
          return false
        }
      }
    }
  }
})
