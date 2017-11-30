<template>
  <div>
    <Card>
      <p slot="title">
        <Icon type="ios-navigate"></Icon>
        <span>用户列表</span>
      </p>
      <div style="margin-bottom: 15px; ">
        <Input style="width: 200px;" placeholder="请输入用户信息" v-model="searchData" :icon="searchIcon" @on-click="clears"/>
        <iSelect v-model="searchOption" size="default" style="width:70px">
          <iOption value="1">手机号</iOption>
          <iOption value="2">用户ID</iOption>
          <iOption value="3">用户名</iOption>
        </iSelect>
        <Button type="primary" @click="search">搜索</Button>
      </div>
      <Table :stripe="true" size="default" :loading="loading"
               :data="userList" :columns="userColumns"></Table>
      <div style="text-align: center; margin-top: 20px" v-if="!loading">
        <Page :total="total" show-total show-elevator size="small" @on-change="handlePageChange" :current="current"
              :pageSize="15"></Page>
      </div>
    </Card>
  </div>
</template>

<script>
  import { Select, Option } from 'iview/src/components/select'
  export default {
    data () {
      return {
        loading: true,
        userList: [],
        total: null,
        current: 1,
        searchOption: '1',
        searchIcon: '',
        searchData: ''
      }
    },
    created () {
      this.fetchData()
    },
    watch: {
      searchData (val) {
        if (val) this.searchIcon = 'close-circled'
        else this.searchIcon = ''
      }
    },
    components: {
      iSelect: Select,
      iOption: Option
    },
    computed: {
      userColumns () {
        let columns = [
          {
            key: 'index',
            width: 60,
            align: 'center',
            render: (h, params) => {
              let index = params.index + 1 + (this.current - 1) * 15
              return h('div', index)
            }
          },
          {
            title: '用户Id',
            key: 'userid',
            align: 'left'
          },
          {
            title: '用户名',
            key: 'name',
            align: 'left'
          },
          {
            title: '密码',
            key: 'password'
          },
          {
            title: '手机号',
            key: 'tel_num'
          },
          {
            title: '登录状态',
            key: 'is_login',
            align: 'center',
            render: (h, params) => {
              const row = params.row
              const color = row.is_login === 1 ? 'green' : 'red'
              const text = row.is_login === 1 ? '登录' : '下线'
              return h('Tag', {
                props: {
                  type: 'dot',
                  color: color
                }
              }, text)
            }
          },
          {
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  style: {
                    marginRight: '0px'
                  },
                  on: {
                    click: () => {
                      let val = {id: params.row.id, userid: params.row.userid}
                      this.showUserInfo(val)
                    }
                  }
                }, [
                  h('Icon', {
                    props: {
                      type: 'ios-search-strong',
                      size: '20'
                    },
                    on: {
                      mouseover: () => {
                        this.style.backgroundColor = 'red'
                      }
                    }
                  })
                ]),
                h('Poptip', {
                  props: {
                    confirm: true,
                    title: '确定要删除吗？',
                    placement: 'top-end',
                    transfer: true
                  },
                  on: {
                    ok: () => { // 修改poptip.vue的源码，将on-ok事件改为ok，否则无法触发确认事件
                      this.remove(params.row.id)
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
        this.getUserList({currentPage: 1})
      },
      getUserList (val) {
        this.loading = true
        let that = this
        this.axios.get(this.url + 'users/getAllUsers', {params: val}).then(response => {
          let data = response.data.userList
          that.userList = data.data
          that.total = data.total
          that.loading = false
        }).catch(error => {
          console.log(error)
        })
      },
      handlePageChange (val) {
        this.current = val
        this.getUserList({currentPage: val})
      },
      showUserInfo (val) {
        this.userModal = true
        this.$router.push({name: 'user', params: {userid: val.userid, id: val.id}})
      },
      remove (val) {
        console.log(val)
      },
      search () {
        let data = ''
        if (this.searchOption === '1') data = {tel_num: this.searchData}
        else if (this.searchOption === '2') data = {userid: this.searchData}
        else if (this.searchOption === '3') data = {name: this.searchData}
        this.getUserList(Object.assign({currentPage: 1}, data))
      },
      clears () {
        this.searchData = ''
        this.getUserList({currentPage: this.current})
      }
    }
  }
</script>

<style scoped>
a:hover{
  color:red;
}
</style>
