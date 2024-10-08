import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

const routes = [{
    /* 底部导航栏 */
    path: '/',
    name: 'tarbar',
    component: () => import('@/views/TarbarView.vue'),

    children: [{
      /* 首页 */
      path: '',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      meta: {
        keepAlive: true // 需要缓存
      }
    }, {
      /* 商城 */
      path: 'shop',
      name: 'shop',
      component: () => import('@/views/ShopView.vue'),
      meta: {
        keepAlive: true // 需要缓存
      }
    }, {
      /* 书架 */
      path: 'bookshelf',
      name: 'bookshelf',
      component: () => import('@/views/BookshelfView.vue'),
      meta: {
        keepAlive: true // 需要缓存
      },
      beforeEnter: (to, from, next) => {
        let login = window.localStorage.getItem("token");
        if (!login) {
          next({
            name: "loginview"
          })
          setTimeout('console.clear()', 10)
        } else {
          next()
        }
      }
    }, {
      /* 我的 */
      path: 'my',
      name: 'my',
      component: () => import('@/views/MyView.vue'),
      meta: {
        keepAlive: true // 需要缓存
      },
      beforeEnter: (to, from, next) => {
        let login = window.localStorage.getItem("token");
        if (!login) {
          next({
            name: "loginview"
          })
          setTimeout('console.clear()', 10)
        } else {
          next()
        }
      }
    }]
  },
  {
    /* 搜索 */
    path: '/search',
    name: 'search',
    component: () => import('../views/SearchView.vue'),
  },
  {
    /* 搜索后 */
    path: '/aftersearch',
    name: 'aftersearch',
    component: () => import('../views/AftersearchView.vue')
  },
  {
    /* 漫画主体 */
    path: '/comicview',
    name: 'comicview',
    component: () => import('../views/ComicView.vue')
  },
  {
    /* 漫画详情 */
    path: '/comicdetails',
    name: 'comicdetails',
    component: () => import('../views/ComicdetailsView.vue')
  },
  {
    /* 分类 */
    path: '/ClassifyView',
    name: 'classifyview',
    component: () => import('../views/ClassifyView.vue'),
    meta: {
      keepAlive: true // 需要缓存
    }
  },
  {
    /* 点评区 */
    path: '/CommentView',
    name: 'commentview',
    component: () => import('../views/CommentView.vue')
  },
  {
    /* 讨论区 */
    path: '/DiscussView',
    name: 'discussview',
    component: () => import('../views/DiscussView.vue')
  },
  /* 广告页 */
  {
    path: '/Advertisement',
    name: 'advertisement',
    component: () => import('../components/AdvertisementView.vue'),
    beforeEnter: (to, from, next) => {
      next('advertisement')
    }
  },
  /* 登录页 */
  {
    path: '/LoginView',
    name: 'loginview',
    component: () => import('../views/LoginView.vue'),
    meta: {
      keepAlive: true // 需要缓存
    }
  },
  /* 排行榜 */
  {
    path: '/listrank',
    name: 'listrank',
    component: () => import('../views/ListRank.vue'),
    meta: {
      keepAlive: true // 需要缓存
    }
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router