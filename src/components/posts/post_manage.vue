<template>
  <div>
    <Card>
      <p slot="title">
        <Icon type="social-twitter"></Icon>
        <span>帖子列表</span>
      </p>
      <div style="margin-bottom: 15px;">
        <span>起始时间</span>
        <DatePicker type="datetime" placeholder="选择日期" style="width: 200px" @on-change="handleStartTime"
                    v-model="startTime"></DatePicker>
        <span>截止时间</span>
        <DatePicker type="datetime" placeholder="选择日期" style="width: 200px" @on-change="handleEndTime"
                    v-model="endTime"></DatePicker>
        <span>用户</span>
        <Input style="width: 200px;" placeholder="用户名" v-model="userName"></Input>
        <iSelect slot="append" style="width: 70px; margin-left: -5px; color: black" v-model="sOption">
          <iOption value="1">用户名</iOption>
          <iOption value="2">用户ID</iOption>
        </iSelect>
        <Button type="primary" @click="dateFilter">搜索</Button>
        <Button type="error" @click="clear">清空</Button>
      </div>
      <Table :stripe="true" size="default" :loading="loading"
               :data="postList" :columns="postColumns"></Table>
      <div style="text-align: center; margin-top: 20px" v-if="!loading">
        <Page :total="total" show-total show-elevator size="small" @on-change="handlePageChange" :current="current"
              :pageSize="5"></Page>
      </div>
    </Card>
  </div>
</template>

<script>
  import expandContent from './expand_content.vue'
  import DatePicker from 'iview/src/components/date-picker'
  import { Select, Option } from 'iview/src/components/select'
  export default {
    data () {
      return {
        postList: [],
        total: 1,
        current: 1,
        loading: true,
        startTime: '',
        endTime: '',
        userName: '',
        sOption: '1'
      }
    },
    created () {
      this.fetchData()
    },
    components: {
      DatePicker,
      iSelect: Select,
      iOption: Option
    },
    computed: {
      postColumns () {
        let columns = [
          {
            type: 'expand',
            width: 50,
            render: (h, params) => {
              return h(expandContent, {
                props: {
                  row: params.row
                }
              })
            }
          },
          {
            key: 'index',
            width: 60,
            align: 'center',
            render: (h, params) => {
              let index = params.index + 1 + (this.current - 1) * 5
              return h('div', index)
            }
          },
          {
            title: '发帖人ID',
            key: 'userid',
            align: 'left'
          },
          {
            title: '发帖人',
            key: 'name',
            align: 'left'
          },
          {
            title: '赞数',
            key: 'like_num'
          },
          {
            title: '发帖时间',
            key: 'create_time'
          },
          {
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Poptip', {
                  props: {
                    confirm: true,
                    title: '确定要删除吗？',
                    placement: 'top-end',
                    transfer: true
                  },
                  on: {
                    ok: () => { // 修改poptip.vue的源码，将on-ok事件改为ok，否则无法触发确认事件
                      this.remove(params.row.postid)
                    }
                  }
                }, [
                  h('Button', {
                    props: {
                      type: 'text',
                      size: 'small'
                    }
                  }, [
                    h('Icon', {
                      props: {
                        type: 'trash-a',
                        size: '20'
                      }
                    })
                  ])
                ])
              ])
            }
          }
        ]
        return columns
      }
    },
    methods: {
      fetchData () {
        this.getPostList({currentPage: 1})
      },
      getPostList (val) {
        this.loading = true
        let that = this
        this.axios.get(this.url + 'posts/getPostList', {params: val}).then(response => {
          that.loading = false
          that.postList = response.data.postList.data
          that.total = response.data.postList.total
          const len = this.postList.length
          for (let i = 0; i < len; i++) {
            this.postList[i]._expanded = true
          }
        }).catch(error => {
          console.log(error)
        })
      },
      handlePageChange (val) {
        this.current = val
        this.getPostList({currentPage: val, userName: this.userName, startTime: this.startTime, endTime: this.endTime})
      },
      remove (val) {
        this.axios.get(this.url + 'posts/deletePost', {params: {postid: val}}).then(response => {
          if (response.data.msg === 'success') {
            this.getPostList({currentPage: this.current, userName: this.userName, startTime: this.startTime, endTime: this.endTime})
          }
        }).catch(error => {
          console.log(error)
        })
      },
      handleStartTime (val) {
        this.startTime = val
      },
      handleEndTime (val) {
        this.endTime = val
      },
      dateFilter () {
        this.current = 1
        let data = ''
        if (this.sOption === '1') data = {userName: this.userName}
        else data = {userid: this.userName}
        this.getPostList(Object.assign({currentPage: 1, startTime: this.startTime, endTime: this.endTime}, data))
      },
      clear () {
        this.startTime = ''
        this.endTime = ''
        this.userName = ''
        this.current = 1
        this.getPostList({currentPage: 1})
      }
    }
  }
</script>

<style scoped>

</style>
