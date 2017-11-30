<template>
  <div id="main" class="main" :class="{'main-hide-text': hideMenuText}">
    <div class="sidebar-menu-con" :style="{width: hideMenuText?'60px':'200px', overflow: hideMenuText ? 'visible' : 'auto', backgroundColor: '#495060'}">
      <div class="logo-con">
        <img v-show="!hideMenuText"  src="../assets/logo.jpg">
        <img v-show="hideMenuText" src="../assets/logo-min.jpg">
      </div>
      <div>
        <siderbar-menu v-if="!hideMenuText" :siderHeight="clientHeight - 60"></siderbar-menu>
        <siderbar-menu-shrink v-else :siderHeight="clientHeight - 60"></siderbar-menu-shrink>
      </div>
    </div>
    <div class="main-header-con" :style="{paddingLeft: hideMenuText?'60px':'200px'}">
      <div class="main-header">
        <div class="navicon-con">
          <Button :style="{transform: 'rotateZ(' + (this.hideMenuText ? '-90' : '0') + 'deg)'}" type="text" @click="toggleClick">
            <Icon type ="navicon" size="32"></Icon>
          </Button>
        </div>
        <div class="header-middle-con">
          <div class="main-breadcrumb">
            <breadcrumb-nav></breadcrumb-nav>
          </div>
        </div>
        <div class="header-avator-con">
          <div @click="lockScreen" class="lock-screen-btn-con">
            <Tooltip content="锁屏" placement="bottom">
              <Icon type="locked" :size="20"></Icon>
            </Tooltip>
          </div>
          <div @click="showMessage" class="message-con">
            <Tooltip :content="messageCount > 0 ? '有' + messageCount + '条未读消息' : '无未读消息'" placement="bottom">
              <Badge :count="messageCount" dot>
                <Icon type="ios-bell" :size="22"></Icon>
              </Badge>
            </Tooltip>
          </div>
          <div class="user-dropdown-menu-con">
            <iRow type="flex" justify="end" align="middle" class="user-dropdown-innercon">
              <Dropdown trigger="click" @on-click="handleClickUserDropdown">
                <a href="javascript:void(0)">
                  <span class="main-user-name">{{ userName }}</span>
                  <Icon type="arrow-down-b"></Icon>
                </a>
                <DropdownMenu slot="list">
                  <DropdownItem name="ownspace">个人中心</DropdownItem>
                  <DropdownItem name="logout" divided>退出登录</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <Avatar :src="avatorPath" style="background: #619fe7;margin-left: 10px;"></Avatar>
            </iRow>
          </div>
        </div>
      </div>
      <div class="tags-con">
        <tags-page-opened></tags-page-opened>
      </div>
    </div>
    <div class="single-page-con" :style="{paddingLeft: hideMenuText? '60px':'200px'}">
      <div class="single-page" :style="{minHeight: clientHeight - 130 + 'px'}">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import siderbarMenu from './main/siderbarMenu.vue'
  import siderbarMenuShrink from './main/siderbarMenuShrink.vue'
  import breadcrumbNav from './main/breadcrumbNav.vue'
  import tagsPageOpened from './main/tagsPageOpened.vue'
  import { Badge, Dropdown, Avatar } from 'iview'
  import { Row } from 'iview/src/components/grid'
  const pic = require('../assets/1.jpg')
  export default {
    data () {
      return {
        hideMenuText: false,
        messageCount: 5,
        clientHeight: document.documentElement.clientHeight,
        clientWidth: document.documentElement.clientWidth,
        currentPath: this.$route,
        isFullScreen: false,
        showFullScreenBtn: window.navigator.userAgent.indexOf('MSIE') < 0
      }
    },
    mounted () {
      const that = this
      let lockScreen = document.getElementById('lockScreen')
     /* lockScreen.style.width = this.lockScreenSize + 'px'
      lockScreen.style.height = this.lockScreenSize + 'px' */
      lockScreen.style.boxShadow = '0 0 0 0 #667aa6 inset'
      lockScreen.style.transition = 'all 0s'
      lockScreen.style.borderRadius = this.lockScreenSize / 2 + 'px'
      lockScreen.style.transform = 'translate(-5%, -29%)'
      window.onresize = () => {
        return (() => {
          lockScreen.style.height = that.clientHeight = document.documentElement.clientHeight
          lockScreen.style.width = that.clientWidth = document.documentElement.clientWidth
        })()
      }
      lockScreen.style.zIndex = -1
    },
    watch: {
      clientHeight (val) {
        if (!this.timer) {
          this.clientHeight = val
          this.timer = true
          let that = this
          setTimeout(function () {
            // that.screenWidth = that.$store.state.canvasWidth
            that.timer = false
          }, 400)
        }
      },
      clientWidth (val) {
        if (!this.timer) {
          this.clientWidth = val
          this.timer = true
          let that = this
          setTimeout(function () {
            // that.screenWidth = that.$store.state.canvasWidth
            that.timer = false
          }, 400)
        }
      }
    },
    computed: {
      avatorPath () {
        return pic
      },
      userName () {
        return window.sessionStorage.getItem('userName')
      },
      pageTagsList () {
        return this.$store.state.pageOpenedList  // 打开的页面的页面对象
      },
      lockScreenSize () {
        let x = this.clientWidth
        let y = this.clientHeight
        let r = Math.sqrt(x * x + y * y)
        return parseInt(r)
      }
    },
    components: {
      siderbarMenu,
      siderbarMenuShrink,
      breadcrumbNav,
      tagsPageOpened,
      Badge,
      iRow: Row,
      Dropdown,
      DropdownMenu: Dropdown.Menu,
      DropdownItem: Dropdown.Item,
      Avatar
    },
    methods: {
      toggleClick () {
        this.hideMenuText = !this.hideMenuText
      },
      lockScreen () {
        let lockScreen = document.getElementById('lockScreen')
        lockScreen.style.width = this.lockScreenSize + 'px'
        lockScreen.style.height = this.lockScreenSize + 'px'
        lockScreen.style.transition = 'box-shadow 3s'
        lockScreen.style.boxShadow = '0 0 0 ' + this.lockScreenSize + 'px #667aa6 inset'
        lockScreen.style.zIndex = 10000
        this.$store.commit('lock')
        window.sessionStorage.setItem('last_page_name', this.$route.name) // 本地存储锁屏之前打开的页面以便解锁后打开
        setTimeout(() => {
          lockScreen.style.borderRadius = '0px'
          lockScreen.style.transform = 'translate(0, 0)'
          lockScreen.style.transition = 'all 0s'
          this.$router.push({
            name: 'locking'
          })
        }, 800)
      },
      showMessage () {
        this.$router.push({name: 'message'})
        let hasOpened = false
        this.pageTagsList.forEach((item, index) => {
          if (item.name === 'message') {
            hasOpened = true
            this.$store.commit('moveToSecond', index)
          }
        })
        if (!hasOpened) {
          this.$store.commit('createTag', {name: 'message', title: '消息中心'})
        }
        window.sessionStorage.setItem('pageOpenedList', this.pageTagsList)
      },
      handleClickUserDropdown (name) {
        if (name === 'ownspace') {
          this.$router.push({name: name})
          let hasOpened = false
          this.pageTagsList.forEach((item, index) => {
            if (item.name === name) {
              hasOpened = true
              this.$store.commit('moveToSecond', index)
            }
          })
          if (!hasOpened) {
            this.$store.commit('createTag', {name: name, title: '个人中心'})
          }
          window.sessionStorage.setItem('pageOpenedList', JSON.stringify(this.pageTagsList))
        }
        if (name === 'logout') {
          this.$store.commit('logout')
          this.$store.commit('setPageList', [{path: '/home', name: 'home', title: '首页'}])
          window.sessionStorage.setItem('isLogin', false)
          window.sessionStorage.setItem('userName', '')
          window.sessionStorage.setItem('pageOpenedList', JSON.stringify([{path: '/home', name: 'home', title: '首页'}]))
          this.$router.push({name: 'login'})
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import "./main.less";
</style>
