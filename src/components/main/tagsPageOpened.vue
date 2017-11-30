<style lang="less">
  @import '../main.less';
</style>

<template>
  <div>
    <transition-group name="taglist-moving-animation">
      <Tag
        type="dot"
        v-for="item in pageTagsList"
        v-if="item"
        :key="item.name"
        :name="item.name"
        @on-close="closePage"
        @click.native="linkTo(item.name, item.title)"
        :closable="item.name==='home'?false:true"
        :color="item.children?(item.children[0].name===currentPageName?'blue':'default'):(item.name.indexOf(currentPageName)>=0?'blue':'default')"
      >{{ item.title }}
      </Tag>
    </transition-group>
  </div>
</template>

<script>
  export default {
    name: 'tagsPageOpened',
    data () {
      return {
        currentPageName: this.$route.name,
        isIn: false
      }
    },
    computed: {
      pageTagsList () {
        return this.$store.state.pageOpenedList
      }
    },
    methods: {
      closePage (event, name) {
        this.$store.commit('removeTag', name)
        window.sessionStorage.setItem('pageOpenedList', JSON.stringify(this.$store.state.pageOpenedList))
        if (this.currentPageName === name) {
          let lastPageName = ''
          if (this.$store.state.pageOpenedList.length > 1) {
            lastPageName = this.$store.state.pageOpenedList[1].name
          } else {
            lastPageName = this.$store.state.pageOpenedList[0].name
          }
          this.$router.push({
            name: lastPageName
          })
        }
      },
      linkTo (name, title) {
        this.$router.push({
          name: name
        })
      }
    },
    watch: {
      '$route' (to) {
        this.currentPageName = to.name
      }
    }
  }
</script>
