<template>
  <div>
  <div style="margin-bottom: 5px;">{{row.content}}</div>
  <div v-if="row.post_pic.length > 0"><img v-for="pic in row.post_pic" key="pic.ppid" alt="pic" :src="picUrl + pic.pic_name" width="100" height="100"></div>
  </div>
</template>

<script>
  import {picUrl} from '../../config/url'
  export default {
    props: {
      row: Object
    },
    data () {
      return {
        picUrl
      }
    }
  }
</script>

<style scoped>

</style>
