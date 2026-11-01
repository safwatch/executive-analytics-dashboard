export default {
  publicRuntimeConfig: {
    myPassphrase: process.env.PASSPHRASE,
    recaptcha: {
      siteKey: process.env.RECAPTCHA_SITEKEY || ''  // Make sure this is accessible on the client-side
    }
  },
  privateRuntimeConfig: {
    myPassphrase: process.env.PASSPHRASE,
    recaptcha: {
      secretKey: process.env.RECAPTCHA_SECRETKEY || ''  // Keep this on the server-side
    }
  },
  env: {
    myPassphrase: process.env.PASSPHRASE
  },
  loading: "~/components/Loading.vue",
  router: {

    extendRoutes(routes) {
      routes.push({
        path: "/",
        component: "~/pages/dashboard/index.vue"
      });
    },
  },
  // buildDir: '.output',
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  ssr: false,
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Global CSS
  */
  css: ["~/assets/scss/app.scss", 'quill/dist/quill.core.css', 'quill/dist/quill.snow.css', 'quill/dist/quill.bubble.css'],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    "~/plugins/check-auth.js",
    "~/plugins/check-token-satudata.js",
    "~/plugins/simplebar.js",
    "~/plugins/vue-click-outside.js",
    "~/plugins/vuelidate.js",
    "~/plugins/draggable.js",
    "~/plugins/vue-slidebar.js",
    "~/plugins/tour.js",
    "~/plugins/vue-lightbox.js",
    "~/plugins/mask.js",
    "~/plugins/quill-editor.js",
    "~/plugins/chartist.js",
    "~/plugins/vue-googlemap.js",
    "~/plugins/string-filter",
    "~/plugins/repository.js",
    "~/plugins/highcharts-vue.js",
    '~/plugins/leaflet.js', 
    '~/plugins/tableau.js',
    '~/plugins/sie-shimmer.js',
    '~/plugins/chroma.js',
    '~/plugins/tableau-api.js',
    // "~/plugins/select2.js",
    // "~/plugins/base64.ts"
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    'nuxt-i18n',
    '@nuxtjs/proxy',
    '@nuxtjs/auth-next',
    '@nuxtjs/axios',
    '@nuxtjs/firebase',
    '@nuxtjs/recaptcha',
    // '@nuxtjs/ngrok',
  ],
  i18n: {
    locales: [
      { code: 'en', file: 'en.json' },
      { code: 'fr', file: 'fr.json' },
      { code: 'es', file: 'es.json' },
      { code: 'ar', file: 'ar.json' },
      { code: 'zh', file: 'zh.json' }  // Add 'zh' to locales list
    ],
    defaultLocale: 'en',
    lazy: true,  // Lazy-load translation files
    langDir: 'locales/',  // Directory for language files
    vueI18n: {
      fallbackLocale: 'en'  // Fallback if no translation available
    }
  },
  axios: {
    proxy: true,
    credentials: false,
    proxyHeaders : false,
    crossDomain: true,
    baseURL: '' //process.env.API_BASE_URL
  },

  proxy: {
    // '/api': { target: 'http://localhost:8000', pathRewrite: {'^/api/': ''} , changeOrigin: true }
    '/api': require('./proxy.json')
  },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
    transpile: [
      ({ isServer }) => 'vue-bootstrap-autocomplete', 'vue-echarts', 'resize-detector',
    ],
    babel: {
      compact: true,
      ignore: [
        'node_modules/apexcharts/dist/apexcharts.min.js',
        'node_modules/ag-grid-community/dist/ag-grid-community.auto.esm.js',
        'node_modules/bootstrap-vue/esm/icons/icons.js' // Ignore icons.js
      ],
    },
    extend(config, { isDev, isClient }) {
      // Ensure babel-loader is used for .js and .mjs files in node_modules
      config.module.rules.push({
        test: /\.mjs$/, // Handle .mjs files (common for ES modules)
        include: /node_modules/,
        type: "javascript/auto",
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      });
  
      // Add babel-loader for .js files in node_modules (to handle highcharts and similar libraries)
      config.module.rules.push({
        test: /\.js$/,  // Transpile .js files
        include: /node_modules/,  // Include node_modules for packages like highcharts
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      });
    }
  },  
  // ngrok: {
  //   // Ngrok configuration options
  //   addr: 8000, // Port or network address, defaults to 3000
  //   region: 'us', // Ngrok region (us, eu, au, ap), defaults to 'us'
  //   authtoken: '1h5ZkocOSG5fq3makGS0wPfLoWI_JN134MhDqJX2pbJeUc5m', // Ngrok authtoken for more features
  //   subdomain: 'your-custom-subdomain', // Reserved tunnel name (e.g., https://your-custom-subdomain.ngrok.io)
  //   auth: "executive-analytics:sie2024" // HTTP Basic authentication for tunnel
  //   // Other ngrok options...
  // },
  env: {
    auth: process.env.VUE_APP_DEFAULT_AUTH,
    apikey: process.env.VUE_APP_APIKEY,
    authdomain: process.env.VUE_APP_AUTHDOMAIN,
    databaseurl: process.env.VUE_APP_DATABASEURL,
    projectid: process.env.VUE_APP_PROJECTId,
    storgebucket: process.env.VUE_APP_STORAGEBUCKET,
    message: process.env.VUE_APP_MESSAGINGSENDERID,
    appid: process.env.VUE_APP_APPId,
    measurement: process.env.VUE_APP_MEASUREMENTID,
  },

  firebase:  {
    config: {
      apiKey: "AIzaSyCFtZv4ShyvI3IxBXeM7VaEZdeOQL7gKgc",
      authDomain: "sie-dashboard.firebaseapp.com",
      databaseURL: "https://sie-dashboard-default-rtdb.asia-southeast1.firebasedatabase.app",
      projectId: "sie-dashboard",
      storageBucket: "sie-dashboard.appspot.com",
      messagingSenderId: "783748339708",
      appId: "1:783748339708:web:3cf34080fafaab1776c479",
      measurementId: "G-V2CD9QRG5Z"
    },
    services: {
      auth: true, // Just as example. Can be any other service.
      database: true,
      messaging : true
    }
  },

  recaptcha: {
    mode: "base",       // Mode: 'base', 'enterprise'
    siteKey: process.env.RECAPTCHA_SITEKEY,    // Site key for requests
    version: 3,    // Version
    size: 'normal'        // Size: 'compact', 'normal', 'invisible' (v2)
  },

  server: {
   port: process.env.BASE_URL_PORT || 3000,
  },
  vite: {
    // Add this if needed to handle JSON parsing issues
    json: {
      stringify: true, // Ensures proper handling of JSON files
    },
  },
}
