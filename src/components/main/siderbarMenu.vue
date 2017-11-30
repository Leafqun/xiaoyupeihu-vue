<template>
  <div style="height: 100%">
    <iMenu width="auto" theme="dark" :active-name="active" class="text" @on-select="handleSelect" :style="{minHeight: siderHeight + 'px'}">
      <div class="layout-logo-left"></div>
      <iMenuItem name="users">
        <Icon type="ios-navigate" :size="14"></Icon>
        <span>用户管理</span>
      </iMenuItem>
      <iMenuItem name="devs">
        <Icon type="ipad" :size="14"/></Icon>
        <span>设备管理</span>
      </iMenuItem>
      <iMenuItem name="devAdd">
        <Icon type="ios-plus" :size="14"/></Icon>
        <span>设备添加</span>
      </iMenuItem>
      <iMenuItem name="groups">
        <Icon type="ios-people" :size="14"/></Icon>
        <span>群组管理</span>
      </iMenuItem>
      <iMenuItem name="posts">
        <Icon type="social-twitter" :size="14"/></Icon>
        <span>帖子管理</span>
      </iMenuItem>
      </Submenu>
    </iMenu>
  </div>
</template>

<script>
  import { Menu } from 'iview'
  import {appRouter} from '../../router'
  export default {
    data () {
      return {
        clientHeight: document.documentElement.clientHeight
      }
    },
    props: {
      siderHeight: Number
    },
    computed: {
      active () {
        let path = this.$route.path
        return path.split('/')[1]
      },
      tagsList () {
        return appRouter
      }
    },
    components: {
      iMenu: Menu,
      iMenuItem: Menu.Item,
      Submenu: Menu.Sub
    },
    methods: {
      handleSelect (name) {
        let pageOpenedList = this.$store.state.pageOpenedList
        let openedPageLen = pageOpenedList.length
        let i = 0
        let tagHasOpened = false
        while (i < openedPageLen) {
          if (name === pageOpenedList[i].name) {  // 页面已经打开
            this.$store.commit('moveToSecond', i)
            tagHasOpened = true
            break
          }
          i++
        }
        if (!tagHasOpened) {
          let tag = this.tagsList.filter((item) => {
            return name === item.name
          })
          tag = tag[0]
          this.$store.commit('createTag', tag)
        }
        window.sessionStorage.setItem('pageOpenedList', JSON.stringify(this.$store.state.pageOpenedList))
        this.$router.push({name: name})
      }
    }
  }
</script>

<style scoped>

</style>
