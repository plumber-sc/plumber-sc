import Vue from 'vue'
import Router from 'vue-router'
import Blocks from '@/components/Blocks'
import Pipelines from '@/components/Pipelines'
import Plugins from '@/components/Plugins'
import Schema from '@/components/Schema'
import PageNotFound from '@/components/PageNotFound'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
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
      component: Blocks,
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
        template: '<div class="auth-component">{{ $route.fullPath }}</div>'
      }
    },

    {
      path: '*',
      component: PageNotFound
    }
  ]
})
