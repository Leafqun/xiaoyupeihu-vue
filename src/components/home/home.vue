<style lang="less">
  @import "./home.less";
  @import "../../styles/common.less";
</style>
<template>
  <div class="home-main">
    <iRow>
      <iCol span="8">
      <iRow>
        <Card>
          <iRow type="flex" class="user-infor">
            <iCol span="8">
            <iRow class-name="made-child-con-middle" type="flex" align="middle">
              <img class="avator-img" :src="avatorPath"/>
            </iRow>
            </iCol>
            <iCol span="16" style="padding-left:6px;">
            <iRow class-name="made-child-con-middle" type="flex" align="middle">
              <div>
                <b class="card-user-infor-name">{{userName}}</b>
                <p>super admin</p>
              </div>
            </iRow>
            </iCol>
          </iRow>
          <div class="line-gray"></div>
          <iRow class="margin-top-8">
            <iCol span="8">
            <p class="notwrap">上次登录时间:</p></iCol>
            <iCol span="16" class="padding-left-8">
            2017.09.12-13:32:20</iCol>
          </iRow>
          <iRow class="margin-top-8">
            <iCol span="8">
            <p class="notwrap">上次登录地点:</p></iCol>
            <iCol span="16" class="padding-left-8">
            北京</iCol>
          </iRow>
        </Card>
      </iRow>
      <iRow class="margin-top-10">
        <Card>
          <p slot="title" class="card-title">
            <Icon type="android-checkbox-outline"></Icon>
            待办事项
          </p>
          <a type="text" slot="extra" @click.prevent="addNewToDoItem">
            <Icon type="plus-round"></Icon>
          </a>
          <Modal
            v-model="showAddNewTodo"
            title="添加新的待办事项"
            @on-ok="addNew"
            @on-cancel="cancelAdd">
            <iRow type="flex" justify="center">
              <Input v-model="newToDoItemValue" icon="compose" placeholder="请输入..." style="width: 300px"/>
            </iRow>
            <iRow slot="footer">
              <Button type="text" @click="cancelAdd">取消</Button>
              <Button type="primary" @click="addNew">确定</Button>
            </iRow>
          </Modal>
          <div class="to-do-list-con">
            <div v-for="(item, index) in toDoList" :key="index" class="to-do-item">
              <to-do-list-item :content="item.title"></to-do-list-item>
            </div>
          </div>
        </Card>
      </iRow>
      </iCol>
      <iCol span="16" class-name="padding-left-5">
      <iRow>
        <iCol span="6">
        <infor-card
          id-name="user_created_count"
          :end-val="count.createUser"
          iconType="android-person-add"
          color="#2d8cf0"
          intro-text="今日新增用户"
        ></infor-card>
        </iCol>
        <iCol span="6" class-name="padding-left-5">
        <infor-card
          id-name="visit_count"
          :end-val="count.visit"
          iconType="ios-eye"
          color="#64d572"
          :iconSize="50"
          intro-text="今日浏览量"
        ></infor-card>
        </iCol>
        <iCol span="6" class-name="padding-left-5">
        <infor-card
          id-name="iCollection_count"
          :end-val="count.iCollection"
          iconType="upload"
          color="#ffd572"
          intro-text="今日数据采集量"
        ></infor-card>
        </iCol>
        <iCol span="6" class-name="padding-left-5">
        <infor-card
          id-name="transfer_count"
          :end-val="count.transfer"
          iconType="shuffle"
          color="#f25e43"
          intro-text="今日服务调用量"
        ></infor-card>
        </iCol>
      </iRow>
      <iRow class="margin-top-10">
        <Card :padding="0">
          <p slot="title" class="card-title">
            <Icon type="map"></Icon>
            今日服务调用地理分布
          </p>
          <div class="map-con">
            <iCol span="10">
            <map-data-table :cityData="cityData" height="281" :style-obj="{margin: '12px 0 0 11px'}"></map-data-table>
            </iCol>
            <iCol span="14" class="map-incon">
            <iRow type="flex" justify="center" align="middle">
              <home-map :city-data="cityData"></home-map>
            </iRow>
            </iCol>
          </div>
        </Card>
      </iRow>
      </iCol>
    </iRow>
    <iRow class="margin-top-10">
      <iCol span="8">
      <Card>
        <p slot="title" class="card-title">
          <Icon type="android-map"></Icon>
          上周每日来访量统计
        </p>
        <div class="data-source-iRow">
          <visite-volume></visite-volume>
        </div>
      </Card>
      </iCol>
      <iCol span="8" class="padding-left-10">
      <Card>
        <p slot="title" class="card-title">
          <Icon type="ios-pulse-strong"></Icon>
          数据来源统计
        </p>
        <div class="data-source-iRow">
          <data-source-pie></data-source-pie>
        </div>
      </Card>
      </iCol>
      <iCol span="8" class="padding-left-10">
      <Card>
        <p slot="title" class="card-title">
          <Icon type="android-wifi"></Icon>
          各类用户服务调用变化统计
        </p>
        <div class="data-source-iRow">
          <user-flow></user-flow>
        </div>
      </Card>
      </iCol>
    </iRow>
    <iRow class="margin-top-10">
      <Card>
        <p slot="title" class="card-title">
          <Icon type="ios-shuffle-strong"></Icon>
          上周每日服务调用量(万)
        </p>
        <div class="line-chart-con">
          <service-requests></service-requests>
        </div>
      </Card>
    </iRow>
  </div>
</template>

<script>
  import cityData from './map-data/get-city-value.js'
  import homeMap from './components/map.vue'
  import dataSourcePie from './components/dataSourcePie.vue'
  import visiteVolume from './components/visiteVolume.vue'
  import serviceRequests from './components/serviceRequests.vue'
  import userFlow from './components/userFlow.vue'
  import countUp from './components/countUp.vue'
  import inforCard from './components/inforCard.vue'
  import mapDataTable from './components/mapDataTable.vue'
  import toDoListItem from './components/toDoListItem.vue'
  import {Row, Col} from 'iview/src/components/grid'
  const pic = require('../../assets/1.jpg')
  export default {
    components: {
      homeMap,
      dataSourcePie,
      visiteVolume,
      serviceRequests,
      userFlow,
      countUp,
      inforCard,
      mapDataTable,
      toDoListItem,
      iRow: Row,
      iCol: Col
    },
    data () {
      return {
        toDoList: [
          {
            title: '去iView官网学习完整的iView组件'
          },
          {
            title: '消费环保集体爆发！机会越来越明显！'
          },
          {
            title: '麦当劳的深夜留宿者：有人没回家，有人没有家'
          },
          {
            title: '红米5 Plus手机价格曝光 千元以内的全面屏？'
          },
          {
            title: '苹果操作系统继续汉化：Live Photos改叫实况照片'
          }
        ],
        count: {
          createUser: 496,
          visit: 3264,
          iCollection: 24389305,
          transfer: 39503498
        },
        cityData: cityData,
        showAddNewTodo: false,
        newToDoItemValue: ''
      }
    },
    computed: {
      avatorPath () {
        return pic
      },
      userName () {
        return window.sessionStorage.getItem('userName')
      }
    },
    methods: {
      addNewToDoItem () {
        this.showAddNewTodo = true
      },
      addNew () {
        if (this.newToDoItemValue.length !== 0) {
          this.toDoList.unshift({
            title: this.newToDoItemValue
          })
          setTimeout(function () {
            this.newToDoItemValue = ''
          }, 200)
          this.showAddNewTodo = false
        } else {
          this.$Message.error('请输入待办事项内容')
        }
      },
      cancelAdd () {
        this.showAddNewTodo = false
        this.newToDoItemValue = ''
      }
    }
  }
</script>
