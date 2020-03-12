<template>
  <div>
    <!-- 登录区域 -->
    <van-tabs v-model="activeName">
      <van-tab title="登录"
               name="a">
        <!-- 登录表单 -->
        <van-cell-group>
          <van-field v-model="phone"
                     type="text"
                     required
                     label="用户名"
                     left-icon="contact"
                     right-icon="question-o"
                     placeholder="请输入用户名"
                     @click-right-icon="$toast('用户名必须是手机号')" />
          <van-field v-model="password"
                     type="password"
                     label="密码"
                     left-icon="lock"
                     placeholder="请输入密码"
                     required />
        </van-cell-group>
      </van-tab>
      <!-- 注册区域 -->
      <van-tab title="注册"
               name="b">
        <!-- 注册表单 -->
        <van-cell-group>
          <van-field v-model="regphone"
                     type="text"
                     required
                     label="用户名"
                     left-icon="contact"
                     right-icon="question-o"
                     placeholder="请输入用户名"
                     @click-right-icon="$toast('用户名必须是手机号')" />
          <van-field v-model="regpassword"
                     type="password"
                     label="密码"
                     left-icon="lock"
                     placeholder="请输入密码"
                     required />
          <!-- 注册手机验证码 -->
          <van-cell-group>
            <van-field required
                       v-model="sms"
                       center
                       left-icon="comment-circle"
                       label="短信验证码"
                       placeholder="请输入短信验证码">
              <van-button slot="button"
                          size="small"
                          type="primary">发送验证码</van-button>
            </van-field>
          </van-cell-group>
        </van-cell-group>
      </van-tab>
    </van-tabs>
    <!-- 如果activeName为a展示登录按钮 为b展示注册按钮-->
    <van-button v-if="activeName=='a'"
                class="loginButton"
                plain
                round
                type="info"
                color="#c20c02"
                @click="onClickButtonSubmit">登录</van-button>
    <van-button v-if="activeName=='b'"
                class="loginButton"
                plain
                round
                type="info"
                color="#c20c02">注册</van-button>
    <!--  -->
  </div>
</template>
<script>
export default {
  data () {
    return {
      user: {},
      activeName: 'a',//导航标签
      error: [],//错误信息
      phone: '',//登录用户名
      password: '',//登录密码
      regphone: "",//注册用户名
      regpassword: "",//注册密码
      sms: "", // 获取到的验证码
    }
  },
  methods: {
    // 登录验证和提交
    onClickButtonSubmit () {
      if (this.phone === '')      {
        this.$toast.fail('手机号不能为空')
        return
      }
      if (this.password === '')      {
        this.$toast.fail('密码不能为空')
        return
      }
      this.$http.get(`/login/cellphone?phone=${this.phone}&password=${this.password}`)
        .then(res => {
          if (res)          {
            let user = res.data
            // console.log(res)
            this.$store.commit('LOGIN_STATE', 1)
            localStorage.setItem('user', JSON.stringify(user))
            localStorage.setItem('loginState', 1)
            localStorage.setItem('userId', user.profile.userId)
            window.sessionStorage.setItem('token',res.data.token);
            this.$store.state.user = user
            this.$router.push('/personal')
            this.$toast.success('登录成功')
          }
        }).catch(err => {
          if (err)          {
            this.$toast.fail('账号或密码错误')
          }
        })
    },


    validEmail: function (password) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(password);
    }
  },
}
</script>
<style scope>
.loginButton {
  margin-top: 15px;
  margin-left: 25%;
  width: 50%;
}
</style>