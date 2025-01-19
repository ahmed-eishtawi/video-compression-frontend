// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },

  future: {
    compatibilityVersion: 4
  },

  ssr: true,
  nitro: {
    preset: 'netlify'
  },

  // when enabling ssr option you need to disable inlineStyles and maybe devLogs
  features: {
    inlineStyles: false,
    devLogs: false
  },

  build: {
    transpile: ['vuetify']
  },

  vite: {
    ssr: {
      noExternal: ['vuetify']
    }
  },

  css: [],
  modules: [
    '@nuxt/fonts',
    'vuetify-nuxt-module',
    '@nuxt/eslint',
    'nuxt-echarts',
    '@vesp/nuxt-fontawesome'
  ],

  fontawesome: {
    icons: {
      solid: ['cog', 'coffee', 'user'],
      regular: ['comment'],
      brands: [
        'faHtml5',
        'faCss3Alt',
        'faJs',
        'faVuejs',
        'faNodeJs',
        'faPython',
        'faJava',
        'faFlutter',
        'faLaravel',
        'faWordpress',
        'faDocker',
        'faAws',
        'faGit',
        'faGithub'
      ]
    }
  },

  echarts: {
    charts: ['LineChart'],
    components: [
      'DatasetComponent',
      'GridComponent',
      'TitleComponent',
      'TooltipComponent'
    ]
  },

  vuetify: {
    moduleOptions: {
      // check https://nuxt.vuetifyjs.com/guide/server-side-rendering.html
      ssrClientHints: {
        reloadOnFirstRequest: false,
        viewportSize: false,
        prefersColorScheme: false,

        prefersColorSchemeOptions: {
          useBrowserThemeOnly: false
        }
      },

      // /* If customizing sass global variables ($utilities, $reset, $color-pack, $body-font-family, etc) */
      // disableVuetifyStyles: true,
      styles: {
        configFile: 'assets/settings.scss'
      }
    }
  }
})
