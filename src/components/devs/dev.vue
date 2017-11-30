<template>
  <div style="height: 100%">
    <div>
      <Spin size="large" fix v-if="loading" style="margin-top:50px"></Spin>
      <div v-else style="overflow: hidden; font-size: 17px">
        <Card>
          <p slot="title">
            <Icon type="ios-people"></Icon>
            <span>设备信息</span>
          </p>
          <router-link to="/devs" slot="extra">
            <Icon type="android-arrow-back" size="20"></Icon>
          </router-link>
          <div v-if="editID" style="margin-bottom: 10px;">
            <Input v-model="devid" placeholder="请输入新的devid" style="width: 200px;"/>
            <Button type="default" @click="editID = false">取消</Button>
            <Tooltip placement="right" :always="true">
              <Button type="success" @click="handleIdChange" :loading="btLoading" :icon="editIcon">确定</Button>
              <div slot="content">
                <p>devid长度必须为10位数字</p>
              </div>
            </Tooltip>
            <div style="color: red;">{{editIDError}}</div>
          </div>
          <div class="info" v-else><label class="bq">设备ID：</label><span style="margin-left: 30px;margin-right:10px;">{{dev.devid}}</span><a @click="editID = true" href="javascript:void(0)"><Icon type="edit"></Icon></a>
          </div>
          <div class="info"><label class="bq">创建时间：</label><span
            style="margin-left: 15px;">{{dev.create_time}}</span></div>
          <div class="info"><label class="bq">群组ID：</label><span style="margin-left: 30px;"><router-link :to="{name: 'group', params: {groupid: dev.groupid}}">{{dev.groupid}}</router-link></span>
          </div>
          <div class="info"><label class="bq">群组名：</label><span style="margin-left: 30px;"><router-link :to="{name: 'group', params: {groupid: dev.groupid}}">{{dev.group_name}}</router-link></span>
          </div>
          <div v-if="editMax" style="margin-bottom: 10px;">
            <Input v-model="max" placeholder="请输入新的最大人数" style="width: 200px;"/>
            <Button type="default" @click="editMax = false">取消</Button>
            <Tooltip placement="right" :always="true">
              <Button type="success" @click="handleMaxChange" :loading="btLoading" :icon="editIcon">确定</Button>
              <div slot="content">
                <p>必须为10-100之间的数字</p>
              </div>
            </Tooltip>
            <div style="color: red;">{{editMaxError}}</div>
          </div>
          <div class="info" v-else><label class="bq">最大人数：</label><span style="margin-left: 15px; margin-right: 10px;">{{dev.max}}</span>
            <a @click="editMax = true" href="javascript:void(0)"><Icon type="edit"></Icon></a></div>
        </Card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dev: {
        did: '',
        devid: '',
        dev_name: '',
        max: '',
        create_time: '',
        group_name: ''
      },
      editID: false,
      editMax: false,
      editIDError: '',
      editMaxError: '',
      editIcon: '',
      loading: true,
      devid: '',
      max: '',
      btLoading: false
    }
  },
  created () {
    this.fetchData()
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      this.getDevInfo(this.$route.params.devid)
    },
    getDevInfo (devid) {
      this.loading = true
      this.axios.get(this.url + '/devs/getDevInfo', {params: {devid: devid}}).then(response => {
        this.dev = response.data.dev
        this.loading = false
      }).catch(error => {
        console.log(error)
      })
    },
    handleIdChange () {
      const id = this.devid.trim()
      if (id.length !== 10) {
        this.editIDError = 'devid长度必须为10位'
        return false
      }
      this.editIDError = ''
      this.btLoading = true
      let that = this
      this.axios.get(this.url + 'devs/updateDevInfo', {params: {devid: id, did: this.dev.did}}).then(response => {
        if (response.data.msg === 'success') {
          that.btLoading = false
          that.editIcon = 'checkmark-round'
          setTimeout(function () {
            that.editID = false
            that.editIcon = ''
            that.devid = ''
            that.$router.push({name: 'dev', params: {devid: id}})
          }, 500)
        }
      }).catch(error => {
        console.log(error)
        this.$router.push({name: 'error'})
      })
    },
    handleMaxChange () {
      const max = this.max
      if (max < 10 || max > 100) {
        this.editMaxError = '必须为10-100之间的数字'
        return false
      }
      this.editMaxError = ''
      this.btLoading = true
      let that = this
      this.axios.get(this.url + 'devs/updateDevInfo', {params: {max: max, did: this.dev.did}}).then(response => {
        if (response.data.msg === 'success') {
          that.btLoading = false
          that.editIcon = 'checkmark-round'
          setTimeout(function () {
            that.editMax = false
            that.editIcon = ''
            that.max = ''
            that.dev.max = max
          }, 500)
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
  .info{
    margin-bottom: 12px;
    overflow: hidden;
  }
  .avatar{
    float:left;
    margin-left: 15px;
  }
  .bq{
    font-family: "黑体","宋体";
    font-size:16px;
    font-weight: 700;
  }
  a{
    color: green;
  }
  a:hover{
    color: red;
  }
</style>
