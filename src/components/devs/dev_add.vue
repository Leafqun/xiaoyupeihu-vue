<template>
  <div>
    <Card>
      <p slot="title">
        <Icon type="ios-plus"></Icon>
        <span>设备添加</span>
      </p>
      <div style="margin: 50px 100px 50px 0;">
        <Input v-model="devid" placeholder="请输入新的devid" style="width: 200px;"/>
        <Tooltip placement="right" :always="true">
          <Button type="success" @click="handleIdChange" :loading="btLoading" :icon="editIcon">添加</Button>
          <div slot="content">
            <p>devid长度必须为10位数字</p>
          </div>
        </Tooltip>
      </div>
      <div style="color: red;">{{editIDError}}</div>
    </Card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      devid: '',
      btLoading: false,
      editIcon: '',
      editIDError: ''
    }
  },
  methods: {
    handleIdChange () {
      console.log('sdfsdf')
      const id = this.devid.trim()
      if (id.length !== 10) {
        this.editIDError = 'devid长度必须为10位'
        return false
      }
      this.editIDError = ''
      this.btLoading = true
      let that = this
      this.axios.get(this.url + 'devs/addDev', {params: {devid: this.devid}}).then(response => {
        if (response.data.msg === 'success') {
          that.btLoading = false
          that.editIcon = 'checkmark-round'
          setTimeout(function () {
            that.editIcon = ''
            that.devid = ''
          }, 1000)
        }
      }).catch(error => {
        console.log(error)
        this.$router.push({name: 'error'})
      })
    }
  }
}
</script>

<style scoped>
</style>
