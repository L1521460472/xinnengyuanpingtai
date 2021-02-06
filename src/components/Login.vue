<template>
  <!-- 登录 -->
  <div id="header">
    <div class="header">
      <div class="login">
        <div class="login_left">
          <img src="../assets/login_02.png" alt="" />
        </div>
        <div class="login_right">
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="28px" class="demo-ruleForm">
            <el-form-item><span class="p-hyld">欢迎登陆</span></el-form-item>

            <el-form-item prop="username">
              <el-input v-model="ruleForm.username" autocomplete="off">
                <i slot="prefix" class="el-input__icon"></i>
              </el-input>
              <img class="image01" src="../assets/Frame@1x.png" alt />
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" v-model="ruleForm.password" autocomplete="off">
                <i slot="prefix" class="el-input__icon"></i>
              </el-input>
              <img class="image02" src="../assets/Frame@1x-1.png" alt />
            </el-form-item>
            <el-form-item prop="code">
              <el-col :span="14">
                <el-input placeholder="验证码" v-model="ruleForm.code">
                </el-input>
              </el-col>
              <el-col :span="8" style="margin-left: 10px">
                <verificationCode ref="mychild" :changeCode.sync="identifyCode"></verificationCode>
              </el-col>
            </el-form-item>
            <div class="login-btn">
              <el-button type="primary" @click="submitForm('ruleForm')" :loading="loading">登录</el-button>
            </div>
          </el-form>
        </div>
      </div>
      <div class="footer">
        <span>©2020 深圳市航通北斗信息技术有限公司 版权所有
          ​​粤ICP备15008917号</span>
      </div>
    </div>
  </div>
</template>
<script>
import bcryptjs from 'bcryptjs'
import JSEncrypt from 'jsencrypt'
import md5 from 'js-md5'
import { Login } from '../api/homeIndex/login'
import { getCookie, setCookie, removeCookie } from '../public'
import { getLimitMenus } from '../api/setting/menu'
import verificationCode from './common/verificationCode'
import { Loading } from 'element-ui'
export default {
  name: 'Login',
  data() {
    return {
      ruleForm: {
        username: '',
        password: '',
        code: '',
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
      },
      identifyCode: '',
      loading: false,
      btnList: [],
    }
  },
  methods: {
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (this.ruleForm.code.toUpperCase() != this.identifyCode) {
            this.$message({
              message: '验证码错误！',
              type: 'error',
              center: true,
            })
            this.ruleForm.code = ''
            this.$refs.mychild.changeCode()
          } else {
            this.loading = true
            this.fullLoading
            let salt = bcryptjs.genSaltSync() //定义密码加密的计算强度，默认10
            let jse = new JSEncrypt() //新建JSEncrypt对象
            let publicKey =
              'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCsdyqfaCfhwUuvIUyMnKu9Btmcx1bX53a9tV0q0vSF/S4fd+DjzhX/u8FWHH61e/YpRwvs6DiC/h06hgYnswnZxEvwp/eRxnt6JQVK2y+v8ZzZ838Z6fRb82W3g5FLJfTtJPf93uKlTDQywjYvmO1qbQTFraUNMSxzBi2/unRLHwIDAQAB' // 设置密钥
            jse.setPublicKey(publicKey) //设置公钥

            let password = jse.encrypt(md5(this.ruleForm.password))

            let params = {
              loginName: this.ruleForm.username,
              password: password,
              rememberMe: 0,
            }
            Login(params)
              .then((res) => {
                if (res.data.status == 0) {
                  setCookie('enterpriseToken', res.data.data.token, 1 / 3)
                  setCookie('enterpriseName', res.data.data.userName, 1 / 3)
                  setCookie('enterpriseId', res.data.data.accountId, 1 / 3)
                  setCookie('companyName', res.data.data.enterpriseName, 1 / 3)
                  sessionStorage.setItem('loginName', this.ruleForm.username)
                  getLimitMenus()
                    .then((res) => {
                      if (res.data.status == 0) {
                        const data = res.data.data
                        const result = this.getTreeData(data)
                        sessionStorage.setItem(
                          'btnList',
                          JSON.stringify(result)
                        )
                        sessionStorage.setItem('menuList', JSON.stringify(data))
                        if (data[0].show) {
                          this.$router.push(data[0].children[0].url)
                        } else {
                          this.$router.push(data[0].url)
                        }
                        this.$message({
                          type: 'success',
                          message:
                            '亲爱的' + this.ruleForm.username + ', 欢迎回来！',
                          center: true,
                        })
                      } else {
                        this.$message({
                          type: 'success',
                          message: res.data.message,
                          center: true,
                        })
                      }
                    })
                    .catch((error) => {
                      this.$message({
                        type: 'error',
                        message: error,
                        center: true,
                      })
                    })
                  // this.$router.push("/homeIndex")
                  // this.$message({
                  //   type: 'success',
                  //   message: '亲爱的' + this.ruleForm.username + ', 欢迎回来！',
                  //   center: true
                  // })
                } else {
                  this.$message.error({
                    message: res.data.message,
                    center: true,
                  })
                }
                this.loading = false
                this.fullLoading.close()
              })
              .catch((err) => {
                this.loading = false
                this.fullLoading.close()
                this.$message.error({
                  message: err,
                  center: true,
                })
              })
          }
        } else {
          //
          return false
        }
      })
    },
    keyDown(e) {
      if (e.keyCode == 13) {
        //enter回车键 == 13
        this.submitForm()
      }
    },
    // getMenuList(){
    //   getLimitMenus().then(res=>{
    //     if(res.data.status == 0){
    //       // this.menuItems = res.data.data
    //       const data = res.data.data
    //       const result = this.getTreeData(data)
    //       sessionStorage.setItem('btnList', JSON.stringify(result))
    //       sessionStorage.setItem('menuList',JSON.stringify(data))
    //     } else {
    //       this.$message.error({
    //         message:res.data.message,
    //         center:true
    //       })
    //     }
    //   }).catch(err=>{})
    // },
    getTreeData(data) {
      for (var i in data) {
        if (data[i].type == 2) {
          this.btnList.push(data[i].code)
        }
        if (data[i].children != 0) {
          this.getTreeData(data[i].children)
        }
      }
      return this.btnList
    },
  },
  computed: {
    fullLoading: function () {
      return Loading.service({
        lock: true,
        text: '正在登陆...', //可以自定义文字
        spinner: 'el-icon-loading', //自定义加载图标类名
        background: 'rgba(0, 0, 0, 0.6)', //遮罩层背景色
        target: document.querySelector('.login'),
      })
    },
  },
  mounted() {
    window.addEventListener('keydown', this.keyDown) //绑定监听事件
  },
  destroyed() {
    window.removeEventListener('keydown', this.keyDown, false) //移除监听事件
  },
  components: {
    verificationCode,
  },
}
</script>
<style lang="less" scoped>
.bordered {
  border: 1px solid #e5e5e5;
}
#header {
  width: 100%;
  height: 100%;
  position: relative;
  background: url('../assets/login.jpg') no-repeat;
  .login {
    width: 640px;
    height: 360px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    .login_left {
      float: left;
      width: 320px;
      height: 100%;
    }
    .login_right {
      padding-top: 20px;
      box-sizing: border-box;
      float: left;
      width: 320px;
      height: 100%;
      background: #fff;
      position: relative;
      /deep/ .el-input--prefix .el-input__inner {
        padding-left: 40px !important;
      }
      .image01 {
        position: absolute;
        top: 12px;
        left: 12px;
      }
      .image02 {
        position: absolute;
        top: 12px;
        left: 12px;
      }
    }
  }
  .el-form-item {
    width: 90%;
    /deep/ .el-input__inner {
      width: 100% !important;
    }
  }
  .login-btn {
    display: flex;
    justify-content: center;
    .el-button {
      width: 260px;
    }
  }
  .p-hyld {
    font-size: 20px;
    font-weight: 600;
    color: #333;
  }
  .footer {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 70px;
    margin: auto;
    font-size: 12px;
    color: #fff;
    text-align: center;
  }
}
</style>
