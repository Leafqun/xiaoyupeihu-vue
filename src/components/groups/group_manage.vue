<template>
  <div style="height: 100%">
    <Card>
      <p slot="title">
        <Icon type="ios-people"></Icon>
        <span>群组列表</span>
      </p>
      <div style="margin-bottom: 15px; ">
        <Input style="width: 200px;" placeholder="请输入用户信息" v-model="searchData" :icon="searchIcon" @on-click="clears"/>
        <iSelect v-model="searchOption" size="default" style="width:70px">
          <iOption value="1">设备ID</iOption>
          <iOption value="2">群组ID</iOption>
          <iOption value="3">群组名</iOption>
        </iSelect>
        <Button type="primary" @click="search">搜索</Button>
      </div>
      <Table :stripe="true" size="default" :loading="loading"
               :data="groupList" :columns="groupColumns"></Table>
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
        groupList: [],
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
      groupColumns () {
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
            title: '群组名',
            key: 'group_name',
            align: 'left'
          },
          {
            title: '设备ID',
            key: 'devid'
          },
          {
            title: '总人数',
            key: 'total'
          },
          {
            title: '创建时间',
            key: 'create_time'
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
                      this.showGroupInfo(params.row.groupid)
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
                      this.remove(params.row.groupid)
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
        this.getGroupList({currentPage: 1})
      },
      getGroupList (val) {
        this.loading = true
        let that = this
        this.axios.get(this.url + 'groups/getGroupList', {params: val}).then(response => {
          let data = response.data.groupList
          that.groupList = data.data
          that.total = data.total
          that.loading = false
        }).catch(error => {
          console.log(error)
        })
      },
      handlePageChange (val) {
        this.current = val
        this.getGroupList({currentPage: val})
      },
      showGroupInfo (val) {
        this.$router.push({name: 'group', params: {groupid: val}})
      },
      remove (val) {
        console.log(val)
      },
      search () {
        let data = ''
        if (this.searchOption === '1') data = {devid: this.searchData}
        else if (this.searchOption === '2') data = {groupid: this.searchData}
        else if (this.searchOption === '3') data = {group_name: this.searchData}
        this.getGroupList(Object.assign({currentPage: 1}, data))
      },
      clears () {
        this.searchData = ''
        this.getGroupList({currentPage: this.current})
      }
    }
  }
</script>

<style scoped>

</style>
