import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../views/index.vue'),
      children: [
        {
          path: '',
          redirect: '/home'
        }, {
          path: '/home',
          name: 'home',
          component: () => import('../views/Home/Home.vue')
        }
        , {
          path: '/order',
          name: 'order',
          component: () => import('../views/Order/Order.vue')
        }
        , {
          path: '/me',
          name: 'me',
          component: () => import('../views/Me/Me.vue')
        }, {
          path: '/address/:city',
          name: 'address',
          component: () => import('../views/Address/Address.vue')
        }, {
          path: '/city',
          name: 'city',
          component: () => import('../views/City/City.vue')
        }
      ]
    }, {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login/login.vue')
    }
  ]
})

// 路由守卫
// router.beforeEach((to, from, next) => {
//   const isLogin = localStorage.ele_login ? true : false;
//   if (to.path == '/login') {
//     next()
//   } else {
//     isLogin ? next() : next('/login')
//   }
// })
export default router
