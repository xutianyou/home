<template>
	<div class="login">
		<vue-particles
      color="#fff"
      :particleOpacity="0.7"
      :particlesNumber="60"
      shapeType="circle"
      :particleSize="4"
      linesColor="#fff"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="2"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
      class="lizi"
      style="height:100%"
    ></vue-particles>

    <div class="login-box">
      <h1 class="login-box-title">登录</h1>

      <el-form ref="ruleForm" :model="form" :rules="rules">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="form.name" name="userName" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input 
            type="password"
            v-model="form.password" 
            show-password clearable 
          ></el-input>
        </el-form-item>
      </el-form>

      <login-verify v-if="loginVerifyNum" @success="loginVerifySuccess" />
      
      <el-row type="flex" justify="space-between">
        <span>
          <el-button type="primary" icon="el-icon-user-solid" size="mini" @click="toRegister">注册</el-button>
          <el-button type="warning" icon="el-icon-user" size="mini">忘记密码</el-button>
        </span>
        <el-button 
          type="primary" 
          icon="el-icon-check" 
          size="mini" 
          circle
          :loading="loginLoad"
          :disabled="!!loginVerifyNum"
          @click="submitForm('ruleForm')"
        ></el-button>
        
      </el-row>
    </div>
	</div>
</template>
<script>

import md5 from 'js-md5';

import { getLogin } from '@/api/login.js'
import { validateUsername, validatePassword } from '@/utils/validate.js'
import LoginVerify from '@/components/LoginVerify'
import { mapMutations } from 'vuex'
// import '@/mock/login.js'

export default {
	name: 'Login',
  components: { LoginVerify },
	data() {
		return {
      loginLoad: false,
      loginVerifyNum: 0,
			form: {
				name: '',
				password: ''
			},
      rules: {
        name: [
          { validator: validateUsername, trigger: 'blur' }
        ],
        password: [
          { validator: validatePassword, trigger: 'blur' }
        ]
      }
		}
	},
  computed: {
  },
  created() {
    console.log('login-created')
  },
  methods: {
    ...mapMutations(['setToken', 'setMenu', 'setUser']),

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loginLoad = true;
          getLogin({
            name: this.form.name,
            password: md5(this.form.password)
          })
          .then(res => {
            this.loginLoad = false;

            if (res && res.code === '00') {
              this.$message.success(res.msg);

              this.setToken(res.data.token);
              this.setMenu(res.data.menu);
              this.setUser({name: this.form.name});

              this.$router.push({ name:'Home' })
              .then( () => {
                // console.log('then-res')
              })
              .catch( () => {
                // console.log('catch-res')
              })
            } else {
              this.$message.error(res.msg);
            }
          })
          .catch(res => {
            console.log('getLogin-catch', res)
            this.$message.error(res.msg);
          })
        } else {
          this.loginVerifyNum = this.loginVerifyNum + 1;
          return false;
        }
      });
    },
    loginVerifySuccess() {
      this.loginVerifyNum = 0
    },
    toRegister() {
      this.$router.push({ name:'Register' })
      .then( () => {
        console.log('then-res')
      }).catch( () => {
        console.log('catch-res')
      })
    }
  }
}
</script>

<style lang="less" scoped>

.login {
  .imgLogin();

	position: relative;
  height: 100%;

  &-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
		width: 300px;
		min-height: 200px;
    border-radius: 4PX;
    background-color: rgba(68, 206, 246, 0.5);

		&-title {
      line-height: 1;
      margin-bottom: 20px; 
			color: @textPrimary;
		}
  }
}
</style>
<style lang="less" scoped>
::v-deep .el-form {
  .el-form-item {
    .el-form-item__label {
      width: 55px;
    }
    .el-form-item__content {
      margin-left: 55px;
    }
  }
}
</style>