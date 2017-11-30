<style lang="less">
  @import './styles/to-do-list-item.less';
</style>

<template>
  <iRow class="to-do-list-item">
    <iCol span="2" class="height-100">
    <iRow type="flex" justify="center" align="middle" class="height-100">
      <Checkbox v-model="todoitem"></Checkbox>
    </iRow>
    </iCol>
    <iCol span="22" class="height-100">
    <iRow type="flex" justify="start" align="middle" class="height-100">
      <p class="to-do-list-item-text" @click="handleHasDid" :class="{hasDid: todoitem}">{{ content }}</p>
    </iRow>
    </iCol>
    <!-- <Col span="4" class="height-100">
        <Row type="flex" justify="center" align="middle" class="infor-icon-row height-100">
            <Icon @click.native="showItemInfor" type="information-circled" size="20"></Icon>
        </Row>
    </Col> -->
  </iRow>
</template>

<script>
  import {Row, Col} from 'iview/src/components/grid'
  import Checkbox from 'iview/src/components/checkbox'
  export default {
    name: 'toDoListItem',
    data () {
      return {
        todoitem: false
      }
    },
    props: {
      content: String
    },
    components: {
      iRow: Row,
      iCol: Col,
      Checkbox
    },
    methods: {
      handleHasDid () {
        this.todoitem = !this.todoitem
      }
    }
  }
</script>
