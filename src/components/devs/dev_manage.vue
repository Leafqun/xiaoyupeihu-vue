<template>
  <div style="height: 100%">
    <Card>
      <p slot="title">
        <Icon type="ipad"></Icon>
        <span>设备列表</span>
      </p>
      <div style="margin-bottom: 15px; ">
        <Input style="width: 200px;" placeholder="请输入设备ID" v-model="devid" :icon="searchIcon" @on-click="clears"/>
        <Button type="primary" @click="search">搜索</Button>
      </div>
      <Table :stripe="true" size="default" :loading="loading"
             :data="devList" :columns="devColumns"></Table>
      <div style="text-align: center; margin-top: 20px" v-if="!loading">
        <Page :total="total" show-total show-elevator size="small" @on-change="handlePageChange" :current="currentPage"
              :pageSize="10"></Page>
      </div>
    </Card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      devList: [],
      loading: true,
      total: 0,
      currentPage: 1,
      devid: '',
      searchIcon: ''
    }
  },
  created () {
    this.fetchData()
  },
  watch: {
    devid (val) {
      if (val) this.searchIcon = 'close-circled'
      else this.searchIcon = ''
    }
  },
  computed: {
    devColumns () {
      let columns = [
        {
          key: 'index',
          width: 60,
          align: 'center',
          render: (h, params) => {
            let index = params.index + 1 + (this.currentPage - 1) * 15
            return h('div', index)
          }
        },
        {
          title: '设备ID',
          key: 'devid',
          align: 'left'
        },
        {
          title: '允许最大人数',
          key: 'max'
        },
        {
          title: '对应群组ID',
          key: 'groupid'
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
                    this.showDevInfo(params.row.devid)
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
                    this.remove(params.row.did)
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
      this.getDevList({currentPage: 1, devid: ''})
    },
    getDevList (val) {
      this.loading = true
      this.axios.get(this.url + 'devs/getDevList', {params: val}).then(response => {
        this.devList = response.data.devList.data
        this.total = response.data.devList.total
        this.loading = false
      }).catch(error => {
        console.log(error)
      })
    },
    showDevInfo (val) {
      this.$router.push({name: 'dev', params: {devid: val}})
    },
    remove (val) {
      console.log(val)
    },
    handlePageChange (val) {
      this.currentPage = val
      this.getDevList({currentPage: val})
    },
    search () {
      const devid = this.devid.trim()
      this.getDevList({currentPage: 1, devid: devid})
    },
    clears () {
      this.devid = ''
      this.fetchData()
    }
  }
}
</script>

<style scoped>
</style>
