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
        mounted() {},
        template: ''
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
        mounted() {},
        template: '<div class="auth-component">Authenticating</div>'
      }
    },

    {
      path: '*',
      component: PageNotFound
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    const position = {}
    if (to.hash) {
      position.selector = to.hash
      position.offset = { y: 100 }

      if (document.querySelector(to.hash)) {
        return position
      }
      return false
    }
  }
})
