// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import BootstrapVue from 'bootstrap-vue'
import Snotify from 'vue-snotify'
import VueAxios from 'vue-axios'
import VueAuthenticate from 'vue-authenticate'
import axios from 'axios'

Vue.use(BootstrapVue)
Vue.use(Snotify)

Vue.use(VueAxios, axios)
Vue.use(VueAuthenticate, {
  baseUrl: 'http://localhost:3000', // Your API domain

  providers: {
    oauth2: {
      authorizationEndpoint: 'http://localhost:5050/connect/authorize',
      clientId: 'Plumber',
      responseType: 'id_token token',
      scope: ['openid', 'EngineAPI'],
      scopeDelimiter: ' ',
      defaultUrlParams: ['response_type', 'client_id', 'redirect_uri', 'scope', 'nonce'],
      redirectUri: 'http://localhost:8080/auth/callback', // Your client app URL
      nonce: () => {
        return 'vueauth-' + new Date().getTime()
      }
    }
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
