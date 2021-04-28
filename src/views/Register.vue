<template>
  <div class="register">
    <div class="register-box">
      <h1 class="register-box-title">注册</h1>

      <el-form ref="ruleForm" :model="form" :rules="rules" label-width="55px">
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

      <el-button 
        class="register-box-btn"
        type="primary" 
        :loading="loading"
        size="mini"
        @click="submitForm('ruleForm')"
      >同意协议并注册</el-button>

      <el-row type="flex" justify="left">
        <el-button 
          class="register-box-login"
          type="info" 
          circle
          size="mini"
          @click="toLogin"
        >登</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>

// import '@/mock/register.js'
import { getRegister } from '@/api/login.js'
import md5 from 'js-md5';
import { validateUsername, validatePassword } from '@/utils/validate.js'

export default {
  name: 'Register',
  data() {
    return {
      db: null,
      loading: false,
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
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true;

          getRegister({
            name: this.form.name,
            password: md5(this.form.password)
          })
          .then(res => {
            this.loading = false;
            if (res && res.code === '00') {
              this.$message.success(res.msg);
            } else {
              this.$message.error(res.msg);
            }
          })
        } else {
          return false;
        }
      });
    },
    toLogin() {
      this.$router.push({ name:'Login' }, () => {}, () => {})
    }
  }
}
</script>
<style lang="less" scoped>
.register {
  .imgRegister();

  &-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    width: 300px;
    border-radius: 4PX;
    background-color: rgba(0, 0, 0, 0.1);

    &-title {
      margin-bottom: 20px;
      line-height: 1;
      text-align: center;
      font-size: 16px;
      color: @textPrimary;
    }

    &-btn {
      width: 100%;
      margin-bottom: 20px;
    }
  }
}
</style>