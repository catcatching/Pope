<template>
  <div id='login'>
    <el-container class='container'>
      <el-header>
        <el-row type='flex' justify='end'>
          <el-col :xs='15' :lg='4' :xl='3'>
            <div class='navigationContainer clearfix'>
              <div class='navigationColumn'>
                <div><font style='vertical-align: inherit;'><font style='vertical-align: inherit;'>已有账号？</font></font></div>
                <a id='retrieve' href='#'><font style='vertical-align: inherit;'><font style='vertical-align: inherit;'>忘记用户名或密码?</font></font></a>
              </div>
              <div class='navigationColumn'>
                <el-button type='primary' size='small' @click="goToLogin"><i class='el-icon-lock'></i>&nbsp;&nbsp;登录</el-button>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-row type="flex" justify="center" >
          <div class='loginBox' :xs='24' :span='5' >
            <font class='create' style="vertical-align: inherit;"><font style="vertical-align: inherit;">创建帐号</font></font>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-position="top">
              <!-- <el-form-item label="邮箱地址" prop="email">
                <el-tooltip class="item" effect="dark" content="在这里填入邮箱地址" placement="right">
                  <el-input v-model.number="ruleForm.email" size="medium"></el-input>
                </el-tooltip>
              </el-form-item> -->
              <el-form-item label="手机号码" prop="phoneNumber">
                <el-tooltip class="item" effect="dark" content="这会作为你的账号ID" placement="right">
                  <el-input ref="name" v-model.number="ruleForm.phoneNumber" size="medium"></el-input>
                </el-tooltip>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-tooltip class="item" effect="dark" content="尽量避免简单密码" placement="right">
                  <el-input ref="pass" type="password" @input='confirm' v-model="ruleForm.password" autocomplete="off" :suffix-icon='lock' size="medium"></el-input>
                </el-tooltip>
              </el-form-item>
              <el-form-item v-show="qualifiedPassword" label="确认密码" prop="cPassword">
                <el-input type="password" v-model="ruleForm.cPassword" autocomplete="off" size="medium"></el-input>
              </el-form-item>
              <el-form-item>
                <el-row type="flex" justify="center"><el-button class='wideButton' type='primary' @click="submitForm('ruleForm')"><i class='el-icon-lock'></i>&nbsp;&nbsp;注册账号</el-button></el-row>
              </el-form-item>
            </el-form>
          </div>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  name: 'login',
  data () {
    var checkPhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号'))
      } else {
        if (!(/^1[3456789]\d{9}$/.test(value))) {
          callback(new Error('手机号格式不正确'))
        } else {
          callback()
        }
      }
    }
    // var checkEmail = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error('请输入邮箱'))
    //   } else {
    //     if (!(/^[a-zA-Z0-9._]+@([a-zA-Z0-9]+.)+com$/.test(value))) {
    //       callback(new Error('邮箱格式不正确'))
    //     } else {
    //       callback()
    //     }
    //   }
    // }
    var password = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        this.lock = 'el-icon-lock'
        if (this.ruleForm.cPassword !== '') {
          this.$refs.ruleForm.validateField('cPassword')
        }
        callback()
      }
    }
    var cPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      qualifiedPassword: false,
      lock: 'el-icon-unlock',
      ruleForm: {
        // email: '',
        phoneNumber: '',
        password: '',
        cPassword: ''
      },
      rules: {
        phoneNumber: [
          { validator: checkPhone, trigger: 'blur' }
        ],
        // email: [
        //   { validator: checkEmail, trigger: 'blur' }
        // ],
        password: [
          { validator: password, trigger: 'blur' },
          { min: 10, max: 15, message: '长度在 10 到 15 个字符', trigger: 'blur' }
        ],
        cPassword: [
          { validator: cPassword, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    confirm () {
      if (this.ruleForm.password.trim() !== '') {
        this.qualifiedPassword = true
      }
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
          this.$axios.post('http://127.0.0.1:8848/new_user', {
            'name': this.$refs.name,
            'pass': this.$refs.pass
          }).then(function (response) {
            if (response === 'success') {
              if (confirm('注册成功，是否跳转登录')) {
                this.$router.push({ name: 'login' })
              }
            }
          }).catch(function (error) {
            console.log(error)
          })
          this.$refs[formName].resetFields()
        } else {
          window.console.log('error submit!!')
          return false
        }
      })
    },
    goToLogin () {
      this.$router.push({ name: 'login' })
    }
  }
}
</script>
<style>
  html,body {
    height: 100%;
    padding: 0;
    margin: 0;
  }
  #login {
    background-color: #eceef1;
    height: 100%;
    box-sizing: border-box;
  }
  .container {
    height: 100%;
  }
  .navigationContainer {
    font-family: AvenirNext,Avenir,"Helvetica Neue",Helvetica,Arial,sans-serif;
    font-weight: 400;
    color: #505050;
    padding: 10px 0;
  }
  .navigationColumn {
    float: left;
    margin-left: 10px;
    text-align: right;
    font-size: 12px;
    line-height: 1.5;
  }
  #retrieve {
    color: #0077C5;
  }
  .loginBox {
    width: 350px;
    margin-top: 80px;
    padding: 30px 30px;
    background-color: white;
    border: 1px solid #c7c7c7;
  }
  .create {
    display: block;
    padding-bottom: 10px;
    font-size: 24px;
    font-weight: 400;
    color: #4c4c4c;
  }
  .el-form label {
    width: 100%;/*此处为了让label能够向左对齐，当label宽度未设置时，即使设置文本向左对齐，其元素依旧会居中*/
    padding: 0px !important;
  }
  .el-form .item {
    margin: 0;
  }
  .wideButton {
    width: 100%;
  }
</style>
