<template>
  <div class="sider" :style="{height: siderHeight + 'px'}">
    <Button :key="1" style="width: 70px;margin-left: -5px;padding:10px 0;" type="text" @click="changeMenu('users')" :class="active === 'users' ? 'ax' : 'nax'">
      <Icon :size="20" type="ios-navigate" color="white"></Icon>
    </Button>
    <Button :key="2" style="width: 70px;margin-left: -5px;padding:10px 0;" type="text" @click="changeMenu('devs')" :class="active === 'devs' ? 'ax' : 'nax'">
    <Icon :size="20" type="ipad" color="white"></Icon>
    </Button>
    <Button :key="2" style="width: 70px;margin-left: -5px;padding:10px 0;" type="text" @click="changeMenu('devAdd')" :class="active === 'devAdd' ? 'ax' : 'nax'">
      <Icon :size="20" type="ios-plus" color="white"></Icon>
    </Button>
    <Button :key="2" style="width: 70px;margin-left: -5px;padding:10px 0;" type="text" @click="changeMenu('groups')" :class="active === 'groups' ? 'ax' : 'nax'">
      <Icon :size="20" type="ios-people" color="white"></Icon>
    </Button>
    <Button :key="3" style="width: 70px;margin-left: -5px;padding:10px 0;" type="text" @click="changeMenu('posts')" :class="active === 'posts' ? 'ax' : 'nax'">
      <Icon :size="20" type="social-twitter" color="white"></Icon>
    </Button>
  </div>
</template>

<script>
  import Dropdown from 'iview/src/components/dropdown'
  import {appRouter} from '../../router'
  export default {
    props: {
      siderHeight: Number
    },
    components: {
      Dropdown,
      DropdownMenu: Dropdown.Menu,
      DropdownItem: Dropdown.Item
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
    methods: {
      changeMenu (name) {
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

<style scoped lang="less">
  .sider{
    background-color:#495060;
    width: 60px;
  }
  .ax{
    background-color: #363e4f;
    transition: all 1s ease;
  }
  .nax{

  }
</style>
