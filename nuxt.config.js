export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Projeto em Nuxt',
    htmlAttrs: {
      lang: 'pt-br'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/argon-dashboard@1.2.0/assets/css/argon.css' },
      { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/argon-dashboard@1.2.0/assets/vendor/nucleo/css/nucleo.css' },
      { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/argon-dashboard@1.2.0/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css' },
    ],
    script: [
      { src: 'https://code.jquery.com/jquery-3.6.0.min.js' },
      { src: 'https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js' },
      { src: 'https://cdn.jsdelivr.net/npm/argon-dashboard@1.2.0/assets/js/argon.min.js' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/tinymce', ssr: false },
    { src: '~/plugins/notification', ssr: true },
    { src: '~/plugins/notification.client', ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: 'http://localhost:8080/'
  },

  auth: {
    strategies: {
      local: {

        token: {
          required:false,
          type: 'Bearer'
        },

        endpoints: {
          login: { url: '/login', method:'post', propertyName: false},
          user: { url: '/user', method: 'get', propertyName: false},
          logout: false
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}