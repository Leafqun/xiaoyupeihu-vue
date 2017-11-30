<template>
  <div>
    <div style="position: relative;">
      <Spin size="large" fix  v-if="loading" style="margin-top:50px;"></Spin>
      <div v-else style="overflow: hidden; font-size: 17px">
        <Card>
          <p slot="title">
            <Icon type="ios-navigate"></Icon>
            <span>用户信息</span>
          </p>
          <router-link to="/users" slot="extra">
            <Icon type="android-arrow-back" size="20"></Icon>
          </router-link>
        <div class="info"><label class="bq">用户名：</label><span style="margin-left:15px;">{{user.name}}</span></div>
        <div class="info"><label class="bq">用户id：</label><span style="margin-left:15px;">{{user.userid}}</span></div>
        <div class="info"><label class="bq">性&nbsp&nbsp别：</label><span style="margin-left: 15px;">{{gender}}</span></div>
        <div style="overflow: hidden" class="info">
          <div style="float: left" class="bq"><label>头&nbsp&nbsp像：</label></div>
          <div class="avatar"><img :src="picUrl + user.avatar" alt="未上传头像" width="100" height="100"></div>
        </div>
        <div class="info"><label class="bq">手机号：</label><span style="margin-left:15px;">{{phone}}</span></div>
        <div class="info" style="overflow: hidden">
          <div style="float:left;"><label class="bq">登录状态：</label></div>
          <div style="float: left">
            <Tag type="dot" :color="user.is_login === 1 ? 'green' : 'red'">{{isLogin}}</Tag>
          </div>
        </div>
        <div class="info">
          <div style="float: left"><label class="bq">群&nbsp&nbsp组：</label></div>
          <div style="float: left;overflow: hidden;width:1000px;">
            <Spin size="small" v-if="groupLoading" style="margin-left:15px;margin-top:5px;"></Spin>
            <div v-else-if="groupList.length>0" style="margin-left: 15px; float: left;" v-for="group in groupList">
              <router-link :to="{name: 'group', params: {groupid: group.groupid}}">{{group.group_name}}</router-link>
            </div>
            <div v-else>未加入群组</div>
          </div>
        </div>
        <div class="info">
          <div style="float: left"><label class="bq">好&nbsp&nbsp友：</label></div>
          <div style="float: left;overflow: hidden;width:1000px;">
            <Spin size="small" v-if="friendLoading" style="margin-left:15px;margin-top:5px;"></Spin>
            <div v-else-if="friendList.length>0" style="margin-left: 15px; float: left;" v-for="friend in friendList">
              <router-link :to="{name: 'user', params: {id: friend.id, userid: friend.userid}}">{{friend.name}}</router-link>
            </div>
            <div v-else  style="margin-left: 15px; margin-top: 2px;">无</div>
          </div>
        </div>
        </Card>
        <div class="info">
          <div><label class="bq">历史发帖:</label></div>
          <Spin size="large" v-if="postLoading" style="margin-left:15px;margin-top:5px;"></Spin>
          <div v-else-if="postList.length>0">
            <div class="post" v-for="post in postList" :key="post.postid">
              <Card>
              <div>
                {{post.content}}
              </div>
                <div v-if="post.post_pic.length > 0"><img v-for="pic in post.post_pic" key="pic.ppid" alt="pic" :src="picUrl + pic.pic_name" width="100" height="100"/></div>
              <div class="time">{{post.create_time}}
                <span style="margin-left: 10px;"><Icon type="thumbsup"></Icon> &nbsp{{post.like_num}}</span>
                <span style="margin-left: 10px;">
                  <Poptip confirm title="您确认删除这条内容吗？" placement="right" @ok="ok(post.postid)">
                    <a href="javascript:void(0)"><Icon type="trash-a" :size="14"></Icon></a>
                  </Poptip>
                </span>
              </div>
              </Card>
            </div>
            <div style="text-align: center">
              <Page :total="total" show-total show-elevator size="small" @on-change="handlePageChange" :current="currentPage" :pageSize="5"></Page>
            </div>
          </div>
          <div v-else>
            无发帖
          </div>
        </div>
        <div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {picUrl} from '../../config/url'
  export default {
    data () {
      return {
        user: {
          id: null,
          userid: null,
          name: '',
          password: '',
          tel_num: '',
          is_login: ''
        },
        loading: true,
        groupList: [],
        groupLoading: true,
        friendList: [],
        friendLoading: true,
        postList: [],
        postLoading: true,
        currentPage: 1,
        total: 1,
        picUrl
      }
    },
    created () {
      this.fetchData()
    },
    watch: {
      '$route': 'fetchData'
    },
    computed: {
      gender () {
        if (this.user.gender === 0) {
          return '男'
        } else if (this.user.gender === 1) {
          return '女'
        } else {
          return '未知'
        }
      },
      isLogin () {
        if (this.user.is_login === 1) {
          return '登录'
        } else {
          return '下线'
        }
      },
      phone () {
        if (this.user.tel_num === null) {
          return '未知'
        } else {
          return this.user.tel_num
        }
      }
    },
    methods: {
      fetchData () {
        this.getUserInfo()
        this.getAllGroupFromUser()
        this.getAllFriendFromUser()
        this.getPostlistFromUser(1)
      },
      getUserInfo () {
        this.loading = true
        let that = this
        this.axios.get(this.url + 'users/getUserInfo', {params: {userid: this.$route.params.userid}}).then(response => {
          that.user = response.data.user
          that.loading = false
        }).catch(error => {
          console.log(error)
        })
      },
      getAllGroupFromUser () {
        this.groupLoading = true
        let that = this
        this.axios.get(this.url + 'users/getAllGroupFromUser', {params: {id: this.$route.params.id}}).then(response => {
          that.groupList = response.data.groupList
          that.groupLoading = false
        }).catch(error => {
          console.log(error)
        })
      },
      getAllFriendFromUser () {
        let that = this
        this.friendLoading = true
        this.axios.get(this.url + 'users/getAllFriendFromUser', {params: {id: this.$route.params.id}}).then(response => {
          that.friendList = response.data.userList
          that.friendLoading = false
        }).catch(error => {
          console.log(error)
        })
      },
      getPostlistFromUser (val) {
        this.postLoading = true
        let that = this
        this.axios.post(this.url + 'posts/getPostListFromUser', {id: this.$route.params.id, currentPage: val}).then(response => {
          that.postList = response.data.postList.data
          that.total = response.data.postList.total
          that.postLoading = false
        }).catch(error => {
          console.log(error)
        })
      },
      handlePageChange (val) {
        this.currentPage = val
        this.getPostlistFromUser(val)
      },
      ok (val) {
        this.axios.get(this.url + 'posts/deletePost', {params: {postid: val}}).then(response => {
          if (response.data.msg === 'success') {
            this.getPostlistFromUser(this.currentPage)
          }
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
  .post{
    margin-top:10px;
    margin-bottom:10px;
  }
  .post .time{
    margin-top:10px;
    font-size: 12px;
    color: #99a2aa;
  }
a:hover{
  color: red;
}
</style>
