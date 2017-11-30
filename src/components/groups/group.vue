<template>
  <div style="height: 100%">
    <div>
      <Spin size="large" fix v-if="loading" style="margin-top:50px"></Spin>
      <div v-else style="overflow: hidden; font-size: 17px">
        <Card>
          <p slot="title">
            <Icon type="ios-people"></Icon>
            <span>群组信息</span>
          </p>
          <router-link to="/groups" slot="extra">
            <Icon type="android-arrow-back" size="20"></Icon>
          </router-link>
          <div class="info"><label class="bq">群组名：</label><span style="margin-left: 30px;">{{group.group_name}}</span>
          </div>
          <div class="info"><label class="bq">创建时间：</label><span
            style="margin-left: 15px;">{{group.create_time}}</span></div>
          <div style="overflow: hidden" class="info">
            <div style="float: left" class="bq"><label>群组头像：</label></div>
            <div class="avatar"><img :src="picUrl + group.avatar" alt="未上传头像" width="100" height="100"></div>
          </div>
          <div class="info"><label class="bq">总人数：</label><span style="margin-left: 30px;">{{group.total}}</span></div>
          <div class="info">
            <div style="float: left"><label class="bq">群组成员：</label></div>
            <div style="float: left;overflow: hidden;margin-left: 15px;width:950px;">
              <Spin size="small" v-if="userLoading" style="margin-left:15px;margin-top:5px;"></Spin>
              <div v-else-if="userList.length>0" style="margin-right: 15px; float: left; margin-top: 4px;" v-for="user in userList">
                <router-link :to="{name: 'user', params: {userid: user.userid, id: user.id}}">{{user.name}}
                </router-link>
                ({{user.auth>1 ? '群主' : '普通成员'}})
              </div>
              <div v-else>???</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  </div>
</template>

<script>
  import {picUrl} from '../../config/url'
  export default {
    data () {
      return {
        group: {
          groupid: '',
          group_name: '',
          total: 1,
          created_time: ''
        },
        loading: true,
        userList: [],
        userLoading: true,
        picUrl
      }
    },
    created () {
      this.getGroupInfo()
      this.getAllUserFromGroup()
    },
    methods: {
      getGroupInfo () {
        this.loading = true
        let that = this
        this.axios.get(this.url + 'groups/getGroupInfo', {params: {groupid: this.$route.params.groupid}}).then(response => {
          that.group = response.data.group
          that.loading = false
        }).catch(error => {
          console.log(error)
        })
      },
      getAllUserFromGroup () {
        let that = this
        this.userLoading = true
        this.axios.get(this.url + 'groups/getAllUserFromGroup', {params: {groupid: this.$route.params.groupid}}).then(response => {
          that.userList = response.data.userList
          that.userLoading = false
        }).catch(error => {
          console.log(error)
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
  a:hover{
    color: red;
  }
</style>
