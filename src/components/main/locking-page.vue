<template>
  <div :style="{width: clientWidth, height: clientHeight}" class="locking">
    <div class="unlock-con">
      <unlock :show-unlock="showUnlock" @on-unlock="handleUnlock"></unlock>
    </div>
  </div>
</template>

<script>
  import unlock from './unlock.vue'

  export default {
    components: {
      unlock
    },
    data () {
      return {
        showUnlock: false,
        clientHeight: document.documentElement.clientHeight,
        clientWidth: document.documentElement.clientWidth
      }
    },
    mounted () {
      this.showUnlock = true
      const that = this
      let lockScreen = document.getElementById('lockScreen')
      lockScreen.style.transition = 'all 0s'
      lockScreen.style.boxShadow = '0 0 0 ' + this.clientHeight + 'px #667aa6 inset'
      lockScreen.style.width = window.innerWidth + 'px'
      lockScreen.style.height = window.innerHeight + 'px'
      lockScreen.style.zIndex = -1
      window.onresize = () => {
        return (() => {
          that.clientHeight = window.innerHeight
          that.clientWidth = window.innerWidth
          lockScreen.style.width = this.clientWidth + 'px'
          lockScreen.style.height = this.clientHeight + 'px'
        })()
      }
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
    methods: {
      handleUnlock () {
        const lockScreen = document.getElementById('lockScreen')
        lockScreen.style.zIndex = -1
        lockScreen.style.boxShadow = '0 0 0 0 #667aa6 inset'
        lockScreen.style.transition = 'all 0s'
        this.showUnlock = false
        this.$router.push({
          name: window.sessionStorage.getItem('last_page_name')  // 解锁之后跳转到锁屏之前的页面
        })
      }
    }
  }
</script>

<style scoped>
 .locking{
   background-color: red;
   overflow-x: hidden;
   overflow-y: hidden;
 }
</style>
