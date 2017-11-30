import Vue from 'vue'
import Router from 'vue-router'
import LoadingBar from 'iview/src/components/loading-bar'
import store from '../store'

const Login = () => import('@/components/login/login')
const Main = () => import('@/components/Main')
const Home = () => import('@/components/home/home')
const UserManage = () => import('@/components/users/user_manage')
const User = () => import('@/components/users/user')
const GroupManage = () => import('@/components/groups/group_manage')
const Group = () => import('@/components/groups/group')
const DevManage = () => import('@/components/devs/dev_manage')
const Dev = () => import('@/components/devs/dev')
const DevAdd = () => import('@/components/devs/dev_add')
const PostManage = () => import('@/components/posts/post_manage')
const Locking = () => import('@/components/main/locking-page')
const OwnSpace = () => import('@/components/own-space/own-space')
const Message = () => import('@/components/message/message')
const Error = () => import('@/components/error_page/404')
const Hello = () => import('@/components/HelloWorld')
Vue.use(Router)

export const appRouter = [
  {path: 'home', name: 'home', title: '首页', component: Home},
  {path: '/ownspace', name: 'ownspace', component: OwnSpace},
  {path: '/message', name: 'message', component: Message},
  {path: 'users', name: 'users', title: '用户管理', component: UserManage},
  {path: 'users/:userid/:id', name: 'user', title: '用户详情', component: User},
  {path: 'groups', name: 'groups', title: '群组管理', component: GroupManage},
  {path: 'groups/:groupid', name: 'group', title: '群组详情', component: Group},
  {path: 'posts', name: 'posts', title: '帖子管理', component: PostManage},
  {path: 'devs', name: 'devs', title: '设备管理', component: DevManage},
  {path: 'devs/add', name: 'devAdd', title: '设备添加', component: DevAdd},
  {path: 'devs/:devid', name: 'dev', title: '设备详情', component: Dev}
]

const router = new Router({
  routes: [
    {path: '/login', name: 'login', component: Login},
    {path: '/locking', name: 'locking', component: Locking},
    {path: '/hello', name: 'hello', component: Hello},
    {
      path: '/',
      component: Main,
      redirect: '/home',
      children: appRouter
    },
    {path: '*', name: 'error', component: Error}
  ]
})

router.beforeEach((to, from, next) => {
  LoadingBar.start()
  if (!(to.path.indexOf('/login') === 0)) { // 判断该路由是否需要登录权限
    if (store.state.isLogin) { // 通过vuex state获取当前的token是否存在
      next()
    } else {
      next({path: '/login', query: { redirect: to.fullPath }})
    }
  } else {
    if (store.state.isLogin) {
      next(false)
      LoadingBar.finish()
    } else {
      next()
    }
  }
})

router.afterEach(route => {
  LoadingBar.finish()
})

export default router
