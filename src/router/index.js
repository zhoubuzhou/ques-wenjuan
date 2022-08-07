import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/users/Login.vue'
import LayoutIndex from '@/views/layout/LayoutIndex.vue'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:{
      name:'user',
    },
    meta:{
      needLogin:false,
      showMenu:false,
      menuName:''
    },
  }
  , {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      needLogin: false,//不需要登陆
      showMenu: false,
    }
  }, {
    path: '/user',
    component: LayoutIndex,
    name: 'layout',
    meta: {
      //元信息
      needLogin: true,//需要登陆
      showMenu: true,
      menuName: '用户模块'
    },
    children: [
      {
        path: 'index',
        name: 'user',
        component: () => import('@/views/users/UsersIndex.vue'),
        meta: {
          //元信息
          needLogin: true,
          showMenu: true,
          menuName: '用户管理'
        }
      },
      {
        path: 'add',
        name: 'user_add',
        component: () => import('@/views/users/UsersAdd.vue'),
        meta: {
          //元信息
          needLogin: true,
          showMenu: true,
          menuName: '添加用户'
        }
      },
      {
        path: 'edit/:id',
        name: 'user_edit',
        component: () => import('@/views/users/UsersEdit.vue'),
        meta: {
          //元信息
          needLogin: true,
          showMenu: false,
        }
      },
      {
        path: 'group',
        name: 'user_group',
        component: () => import('@/views/users/UsersGroup.vue'),
        meta: {
          needLogin: true,
          showMenu: false,
          menuName: '用户管理',
        }
      }
    ]
  },{
    path: '/classes',
    component: LayoutIndex,
    name: 'classes',
    meta: {
      needLogin: true,//需要登陆
      showMenu: true,
      menuName: '班级模块'
    },
    children: [
      {
        path: 'index',
        name: 'classes_index',
        component: () => import('@/views/classes/ClassesIndex.vue'),
        meta: {
          needLogin: true,
          showMenu: true,
          menuName: '班级管理'
        }
      },{
        path: 'add',
        name: 'classes_add',
        component: () => import('@/views/classes/ClassesAdd.vue'),
        meta: {
          needLogin: true,
          showMenu: true,
          menuName: '添加班级'
        }
      },
      {
        path: 'edit/:id',
        name: 'classes_edit',
        component: () => import('@/views/classes/ClassesEdit.vue'),
        meta: {
          needLogin: true,
          showMenu: false,
        }
      },
    ]
  },{
    path: '/outlines',
    component: LayoutIndex,
    name: 'outlines',
    meta: {
      needLogin: true,//需要登陆
      showMenu: true,
      menuName: '大纲模块'
    },
    children: [
      {
        path: 'index',
        name: 'outlines_index',
        component: () => import('@/views/outlines/OutlinesIndex.vue'),
        meta: {
          needLogin: true,
          showMenu: true,
          menuName: '大纲管理'
        }
      },{
        path: 'add',
        name: 'outlines_add',
        component: () => import('@/views/outlines/OutlinesAdd.vue'),
        meta: {
          needLogin: true,
          showMenu: true,
          menuName: '添加大纲'
        }
      },
      {
        path: 'edit/:id',
        name: 'outlines_edit',
        component: () => import('@/views/outlines/OutlinesEdit.vue'),
        meta: {
          needLogin: true,
          showMenu: false,
        }
      },
    ]
  },{
    path: '/items',
    component: LayoutIndex,
    name: 'items',
    meta: {
      needLogin: true,//需要登陆
      showMenu: true,
      menuName: '选项模块'
    },
    children: [
      {
        path: 'index',
        name: 'items_index',
        component: () => import('@/views/items/ItemsIndex.vue'),
        meta: {
          needLogin: true,
          showMenu: true,
          menuName: '选项管理'
        }
      },{
        path: 'add',
        name: 'items_add',
        component: () => import('@/views/items/ItemsAdd.vue'),
        meta: {
          needLogin: true,
          showMenu: true,
          menuName: '添加选项'
        }
      },
      {
        path: 'edit/:id',
        name: 'items_edit',
        component: () => import('@/views/items/ItemsEdit.vue'),
        meta: {
          needLogin: true,
          showMenu: false,
        }
      },
    ]
  },{
    path: '/papers',
    component: LayoutIndex,
    name: 'papers',
    meta: {
      needLogin: true,//需要登陆
      showMenu: true,
      menuName: '问卷模块'
    },
    children: [
      {
        path: 'index',
        name: 'papers_index',
        component: () => import('@/views/papers/PapersIndex.vue'),
        meta: {
          needLogin: true,
          showMenu: true,
          menuName: '问卷管理'
        }
      },{
        path: 'add',
        name: 'papers_add',
        component: () => import('@/views/papers/PapersAdd.vue'),
        meta: {
          needLogin: true,
          showMenu: true,
          menuName: '添加问卷'
        }
      },
      {
        path: 'edit/:id',
        name: 'papers_edit',
        component: () => import('@/views/papers/PapersEdit.vue'),
        meta: {
          needLogin: true,
          showMenu: false,
        }
      },{
        path: 'answers/add/:id',
        name: 'answers_add',
        component: () => import('@/views/papers/AnswersAdd.vue'),
        meta: {
          needLogin: true,
          showMenu: false,
          menuName: '添加答卷'
        }
      },
    ]
  }
]

const router = new VueRouter({
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.name === 'login') {
    if (!!localStorage.token) {
      next({ name: 'user' });
    } else {
      next();
    }
  }
  if (to.meta.needLogin) {
    if (!!localStorage.token) {
      next();
    } else {
      next({ name: 'login' })
    }
  }
  next();
})

export default router;
