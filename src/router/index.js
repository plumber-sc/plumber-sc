import Vue from 'vue'
import Router from 'vue-router'
import Blocks from '@/components/Blocks'
import Policies from '@/components/Policies'
import Pipelines from '@/components/Pipelines'
import Plugins from '@/components/Plugins'
import Schema from '@/components/Schema'
import PageNotFound from '@/components/PageNotFound'
import _ from 'underscore'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: {
        mounted() {
          var hashParts = this.$route.hash.split('&')
          var hash = {}
          _.each(hashParts, (element) => {
            var parts = element.split('=', 2)
            hash[parts[0]] = parts[1]
          })
          var token = `Bearer ${hash.access_token}`
          this.$store.commit('setToken', token)
          this.$router.push({
            name: 'pipelines'
          })
        },
        template: '<div class="auth-component">Welcome</div>'
      }
    },
    {
      path: '/pipelines/:pipelineid?',
      name: 'pipelines',
      component: Pipelines,
      props: true
    },
    {
      path: '/blocks/:blockname?',
      name: 'blocks',
      component: Blocks,
      props: true
    },
    {
      path: '/policies',
      name: 'policies',
      component: Policies,
      props: true
    },
    {
      path: '/plugins',
      name: 'plugins',
      component: Plugins
    },
    {
      path: '/metadata',
      name: 'metadata',
      component: Schema
    },
    {
      path: '/auth',
      name: 'auth',
      component: Schema
    },
    {
      path: '/auth/callback',
      component: {
        mounted() {
          var hashParts = this.$route.hash.split('&')
          var hash = {}
          _.each(hashParts, (element) => {
            var parts = element.split('=', 2)
            hash[parts[0]] = parts[1]
          })
          var token = `Bearer ${hash.access_token}`
          this.$store.commit('setToken', token)

          this.$store.dispatch('initData')

          this.$router.push({
            name: 'pipelines'
          })
        },
        template: '<div class="auth-component">Welcome</div>'
      }
    },

    {
      path: '*',
      component: PageNotFound
    }
  ]
})
