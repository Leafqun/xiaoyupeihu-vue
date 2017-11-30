<template>
  <Breadcrumb>
    <BreadcrumbItem><router-link to="/home">首页</router-link></BreadcrumbItem>
    <BreadcrumbItem v-if="path.indexOf('/users')>= 0"><router-link to="/users">用户管理</router-link></BreadcrumbItem>
    <BreadcrumbItem v-if="path.indexOf('/users/')>= 0">用户详情</BreadcrumbItem>
    <BreadcrumbItem v-if="path.indexOf('/groups')>= 0"><router-link to="/groups">群组管理</router-link></BreadcrumbItem>
    <BreadcrumbItem v-if="path.indexOf('/groups/')>= 0">群组详情</BreadcrumbItem>
    <BreadcrumbItem v-if="path.indexOf('/devs')>= 0"><router-link to="/devs">设备管理</router-link></BreadcrumbItem>
    <BreadcrumbItem v-if="path.indexOf('/devs/')>= 0 && path !== '/devs/add'">设备详情</BreadcrumbItem>
    <BreadcrumbItem v-if="path.indexOf('/devs/add')>= 0">设备添加</BreadcrumbItem>
    <BreadcrumbItem v-if="path.indexOf('/posts')>= 0"><router-link to="/posts">帖子管理</router-link></BreadcrumbItem>
    <BreadcrumbItem v-if="path.indexOf('/message')>= 0"><router-link to="/message">消息中心</router-link></BreadcrumbItem>
    <BreadcrumbItem v-if="path.indexOf('/ownspace')>= 0"><router-link to="/ownspace">个人中心</router-link></BreadcrumbItem>
  </Breadcrumb>
</template>

<script>
  import Breadcrumb from 'iview/src/components/breadcrumb'
  export default {
    name: 'breadcrumbNav',
    components: {
      Breadcrumb,
      BreadcrumbItem: Breadcrumb.Item
    },
    computed: {
      path () {
        return this.$route.path
      }
    }
  }
</script>

