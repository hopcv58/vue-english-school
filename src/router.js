import Vue from 'vue'
import Router from 'vue-router'
import AppHeader from './layout/AppHeader'
import AppFooter from './layout/AppFooter'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Profile from './views/Profile.vue'
import QuestionIndex from '@/views/questions/index.vue'
import TagIndex from '@/views/tags/index.vue'
import TestIndex from './views/tests/index.vue'
import EmptyHeader from '@/layout/empty/EmptyHeader.vue'
import EmptyFooter from '@/layout/empty/EmptyFooter.vue'

Vue.use(Router)

export default new Router({
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'components',
      components: {
        header: AppHeader,
        default: Home,
        footer: AppFooter
      }
    },
    {
      path: '/tests',
      name: 'tests',
      components: {
        header: AppHeader,
        default: TestIndex,
        footer: AppFooter
      }
    },
    {
      path: '/questions',
      name: 'questions',
      components: {
        header: AppHeader,
        default: QuestionIndex,
        footer: AppFooter
      }
    },
    {
      path: '/questions/create',
      name: 'questions.create',
      components: {
        header: AppHeader,
        default: () => import('@/views/questions/create.vue'),
        footer: AppFooter
      }
    },
    {
      path: '/questions/:id/edit',
      name: 'questions.edit',
      components: {
        header: AppHeader,
        default: () => import('@/views/questions/edit.vue'),
        footer: AppFooter
      }
    },
    {
      path: '/tags',
      name: 'tags',
      components: {
        header: AppHeader,
        default: TagIndex,
        footer: AppFooter
      }
    },
    {
      path: '/login',
      name: 'login',
      components: {
        header: EmptyHeader,
        default: Login,
        footer: EmptyFooter
      }
    },
    {
      path: '/register',
      name: 'register',
      components: {
        header: EmptyHeader,
        default: Register,
        footer: EmptyFooter
      }
    },
    {
      path: '/profile',
      name: 'profile',
      components: {
        header: AppHeader,
        default: Profile,
        footer: AppFooter
      }
    }
  ],
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash }
    } else {
      return { x: 0, y: 0 }
    }
  }
})
