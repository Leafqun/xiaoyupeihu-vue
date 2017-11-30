<template>
  <div class="all" :style="{minHeight: clientHeight + 'px'}">
    <div class="login">
      <div class="login_logo"><h1>小鱼陪护后台管理</h1></div>
      <div class="login_border">
        <i_Form ref="form" :model="form" :rules="rule" class="login_form">
          <FormItem prop="userName" style="margin-bottom: 35px;">
            <Input type="text" v-model="form.userName" placeholder="Username" :style="isWhatError === 'user' ? borderC : ''">
              <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="userPwd" style="margin-bottom: 35px;">
            <Input type="password" v-model="form.userPwd" placeholder="Password" :style="isWhatError === 'pwd' ? borderC : ''">
              <Icon type="ios-locked-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleSubmit('form')" style="width:100%">登录</Button>
          </FormItem>
          <div style="text-align: center; color: red">{{error}}</div>
        </i_Form>
      </div>
    </div>
  </div>
</template>

<script>
  import { Form } from 'iview'
  export default {
    data () {
      return {
        clientHeight: document.documentElement.clientHeight,
        form: {
          userName: '',
          userPwd: ''
        },
        rule: {
          userName: [
            { required: true, message: '请填写用户名', trigger: 'submit' }
          ],
          userPwd: [
            { required: true, message: '请填写密码', trigger: 'blur' },
            { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'submit' }
          ]
        },
        error: '',
        isWhatError: ''
      }
    },
    mounted () {
      const that = this
      window.onresize = () => {
        return (() => {
          that.clientHeight = document.documentElement.clientHeight
        })()
      }
    },
    watch: {
      clientHeight (val) {
        if (!this.timer) {
          this.clientHeight = val
          this.timer = true
          let that = this
          setTimeout(function () {
            // that.screenWidth = that.$store.state.canvasWidth
            that.timer = false
          }, 400)
        }
      }
    },
    computed: {
      borderC () {
        return {border: '1px solid #ed3f14', borderRadius: '5px'}
      }
    },
    components: {
      i_Form: Form,
      FormItem: Form.Item
    },
    methods: {
      handleSubmit (name) {
        let that = this
        this.$refs[name].validate((valid) => {
          if (valid) {
            that.axios.post(this.url + 'managerLogin', this.form).then(response => {
              if (response.data.msg === 'success') {
                that.$store.commit('login')
                window.sessionStorage.setItem('isLogin', true)
                window.sessionStorage.setItem('userName', that.form.userName)
                let url = that.$route.query.redirect
                if (url) that.$router.push({path: url})
                else that.$router.push({path: '/home'})
              } else {
                that.error = response.data.msg
                if (that.error === '用户名不存在') {
                  that.isWhatError = 'user'
                } else {
                  that.isWhatError = 'pwd'
                }
              }
            }).catch(error => {
              console.log(error + '!!!!')
            })
          } else {
            that.isWhatError = ''
            that.error = ''
          }
        })
      }
    }
  }
</script>

<style scoped>
  .all{
    background: url(img/login_bgx.gif);
  }
  .login{
    max-width: 405px;
    position: relative;
    margin: 0 auto;
    padding-top:10%;
  }
  .login_logo{
    text-align: center;
    height:50px;
    margin-bottom:25px;
    color: #fafafa;
    font-size: 18px;
    letter-spacing: 0;
    text-shadow: 0px 1px 0px #999, 0px 2px 0px #888, 0px 3px 0px #777, 0px 4px 0px #666, 0px 5px 0px #555, 0px 6px 0px #444, 0px 7px 0px #333, 0px 8px 7px #001135
  }
  .login_border{ background: url(img/login_m_bg.png) no-repeat; overflow:hidden; height:400px; }
  .login_form {
    padding:50px 47px 20px 47px ;
  }
</style>
