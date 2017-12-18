import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Pipelines from '@/components/Pipelines'
import PageNotFound from '@/components/PageNotFound'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/pipelines',
      name: 'Pipelines',
      component: Pipelines
    },
    {
      path: '/pipelines/:pipelineid',
      component: Pipelines,
      props: true
    },
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '*',
      component: PageNotFound
    }
  ]
})
