<style lang="less">
  @import './styles/infor-card.less';
</style>

<template>
  <Card :padding="0">
    <div class="infor-card-con">
      <iCol class="infor-card-icon-con" :style="{backgroundColor: color, color: 'white'}" span="8">
        <iRow class="height-100" type="flex" align="middle" justify="center">
          <Icon :type="iconType" :size="iconSize"></Icon>
        </iRow>
      </iCol>
      <iCol span="16" class="height-100">
        <iRow type="flex" align="middle" justify="center" class="height-100">
          <count-up
            class="infor-card-count user-created-count"
            :id-name="idName"
            :end-val="endVal"
            :color="color"
            :countSize="countSize"
            :countWeight="countWeight"
          >
            <p class="infor-intro-text" slot="intro">{{ introText }}</p>
          </count-up>
        </iRow>
      </iCol>
    </div>
  </Card>
</template>

<script>
  import countUp from './countUp.vue'
  import {Row, Col} from 'iview/src/components/grid'

  export default {
    name: 'inforCard',
    props: {
      idName: String,
      endVal: Number,
      color: String,
      iconType: String,
      introText: String,
      countSize: {
        type: String,
        default: '30px'
      },
      countWeight: {
        type: Number,
        default: 700
      },
      iconSize: {
        type: Number,
        default: 40
      }
    },
    components: {
      countUp,
      iRow: Row,
      iCol: Col
    }
  }
</script>

