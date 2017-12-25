import Vue from 'vue'
import Router from 'vue-router'
import Blocks from '@/components/Blocks'
import Pipelines from '@/components/Pipelines'
import Plugins from '@/components/Plugins'
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
      path: '/blocks',
      name: 'blocks',
      component: Blocks
    },
    {
      path: '/plugins',
      name: 'plugins',
      component: Plugins
    },
    {
      path: '*',
      component: PageNotFound
    }
  ]
})
