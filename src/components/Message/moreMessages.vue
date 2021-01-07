<template>
  <div id="header">
    <!-- 群发助手 -->
    <div class="header">
        <div class="title">群发助手</div>
    </div>
    <div class="content">
      <div class="content-left">
        <div class="content-left-head">
          <span>添加联系人({{contacts}})</span>
          <img src="../../assets/images1/删除1.svg" style="cursor: pointer;" @click="deletePhoneList">
        </div>
        <div class="content-left-button">
          <el-button type="primary" size="small">
            <i class="iconfont icondaoru"></i>
            导入文件
            <!-- <img src="../../assets/images1/icon_18px_导入.svg" style="width:14px;height:14px">导入文件 -->
          </el-button>
          <el-button type="primary" size="small">
            <i class="iconfont icontongxunlu"></i>通讯录
            <!-- <img src="../../assets/images1/icon_18px_通迅录.svg" style="width:14px;height:14px">通讯录 -->
          </el-button>
        </div>
        <div>
          <el-input placeholder="快速输入手机号" v-model="phoneNumber" @keyup.enter.native="addPhoneToList">
            <el-button slot="append" @click="open">展开</el-button>
          </el-input>
        </div>
        <!-- <el-divider></el-divider> -->
        <div class="content-left-list">
          <div class="list-item" v-for="(item, index) in phoneLists" :key="index">
            <span class="list-item-left">
              <img src="../../assets/images1/icon_头像.svg" style="margin-right:7px">
              <span class="phone-style">{{item}}</span>
            </span>
            <i class="el-icon-close close-phone" @click="deletePhone(index)"></i>
          </div>
        </div>
        <div class="content-left-footer">
          <el-pagination
            small
            background
            layout="prev, pager, next"
            :current-page="currentPage"
            :hide-on-single-page="true"
            :page-size="10"
            :total="contacts"
            @current-change="handleCurrentChange">
          </el-pagination>
        </div>
      </div>
      <div class="content-center">
        <span>群发消息内容</span>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="批次名称">
            <el-input v-model="ruleForm.batchName"></el-input>
          </el-form-item>
          <el-form-item label="应用" prop="app">
            <el-select v-model="ruleForm.app" clearable placeholder="请选择" @change="selectedApp">
              <el-option
                v-for="item in appOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="消息模板" prop="msg">
            <el-select v-model="ruleForm.msg" clearable filterable placeholder="请选择" @change="selectedModule">
              <el-option
                v-for="item in msgOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="发送给" prop="desc">
            <el-input type="textarea" v-model="ruleForm.desc" placeholder="每行一个手机号,或者以空格隔开..."></el-input>
          </el-form-item> -->
          <el-form-item label="可用变量">
            <!-- <div class="variable">
              <span v-for="(item,index) in variableList" :key="index" @click="variableSelect(item)" :class="{'disable': messageType != 3}"> {{item.label}} </span>
            </div> -->
            <div>
              <el-button v-for="(item,index) in variableList" :key="index" @click="variableSelect(item)" size="small" :disabled= "messageType != 3">{{item.label}}</el-button>
            </div>
            <div class="tips">提示：点击可用变量，将依次替换消息模板中的变量</div>
          </el-form-item>
          <el-form-item label="发送时间段">
            <!-- <el-time-picker
              is-range
              v-model="ruleForm.sendTimeRange"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围">
            </el-time-picker> -->
            <div style="color: #368CFE">
              <span>{{startTime }}</span> 至 <span>{{endTime }}</span>
            </div>
          </el-form-item>
          <el-form-item label="过滤重复号码">
            <el-checkbox v-model="ruleForm.phoneDistinct">启用</el-checkbox>
          </el-form-item>
          <el-form-item label="定时发送">
            <el-checkbox v-model="delivery">启用</el-checkbox><br/>
            <el-date-picker
              :disabled="!delivery"
              v-model="ruleForm.timingTime"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSend" size="small">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="content-right">
        <span>效果预览</span>
        <div class="content-right-body">
          <div class="simulation">
            <div class="header">{{appName}}</div>
            <div class="message-content">
              <div class="top">
                <img src="../../assets/images1/icon_头像.svg" style="margin-right:2px">
                <span style="color:#aaa">{{nowTime}}</span>
              </div>
              <div class="bottom">
                <!-- 文本消息 -->
                <div v-if="messageType == 0">
                  <div class="text">{{textContent}}</div>
                </div>
                <!-- 文件消息 -->
                <div v-if="messageType == 1">
                  <div class="file">
                    <img v-if="fileContent.fileType == 1" :src="fileContent.fileUrl" />
                    <div v-if="fileContent.fileType == 2" style="overflow-x: scroll;">
                      <audio controls="controls" class="audio-class">
                        <source :src="fileContent.fileUrl" type="audio/mpeg" />
                      </audio>
                    </div>
                    <div v-if="fileContent.fileType == 3">
                      <video :src="fileContent.fileUrl" controls="controls" class="video-class"></video>
                    </div>
                  </div>
                </div>
                <!-- 卡片消息 -->
                <div v-if="messageType == 2">
                  <div class="file">
                    <img :src="cardContent.fileUrl" />
                    <div class="file-content">
                      <div class="file-content-head">
                        {{cardContent.title}}
                      </div>
                      <div class="file-content-body">
                        {{cardContent.textContent}}
                      </div>
                      <template v-if="cardContent.showButton">
                        <div class="file-content-button" v-for="(item, index) in cardContent.buttonList" :key="index">{{item.action.displayText}}</div>
                      </template>
                    </div>
                  </div>
                </div>

                <!-- 变量消息 -->
                <div v-if="messageType == 3">
                  <div class="text">
                    {{variableMessage}}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      title="手动添加"
      :visible.sync="openVisible"
      width="40%">
      <span>多个手机号码以空格、回车、逗号（半角）、分号（半角）、竖线（|）其中一种方式隔开！</span>
      <el-input type="textarea" v-model="phoneArray" style="margin-top:12px"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="splitPhone" size="small">确 定</el-button>
        <el-button @click="openVisible = false" size="small">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getAppLists } from '../../api/Develop/myapp'
import {
  getMessageList,
  sendTempalteMsessage,
} from '../../api/message/moreMessage'
import { MessageMould, MessageMouldCard, cardList, getFile } from '../../api/message/diyMessage'
import { Loading } from 'element-ui'
import dayjs from 'dayjs'
export default {
  name: 'moreMessages',
  data() {
    return {
      // contacts: 0,  // 联系人数量
      phoneNumber: '',  // 左侧手机号
      ruleForm: {
        batchName: '',
        app: '',
        msg: '',
        desc: '',
        phoneDistinct: false,
        timingTime: ''
      },
      rules: {
        app: [
          { required: true, message: '应用不可为空', trigger: 'blur' },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        msg: [
          { required: true, message: '消息模板不可为空', trigger: 'change' },
        ],
        desc: [{ required: true, message: '手机号不可为空', trigger: 'blur' }],
      },
      appOptions: [],
      msgOptions: [],
      loading: '',
      value1: '',
      value2: '',
      delivery: false,  // 定时发送
      variableList: [
        {
          id: '2',
          label: '手机号'
        }
      ],
      phoneLists:[],  // 当前页的数据
      phoneTotalList: [],  // 总的电话列表
      appName: '测试', // 预览应用名称
      openVisible: false,  // 弹框控制
      phoneArray: '',  // 输入的电话号码
      currentPage: 1,  // 当前页码
      startTime: '00:00:00',  // 发送时间段开始时间
      endTime: '00:00:00',    // 发送时间段结束时间
      messageType: 0,  // 模板类型
      textContent: '这是一段测试文本，这是一段测试文本',  // 文本内容
      fileContent: {  // 文件内容
        fileType: 1,  // 图片、视频、音频
        fileUrl: '',
      },
      cardContent: {  // 卡片内容
        title: '',
        textContent: '',
        fileUrl: '',
        buttonList: [
          {
            displayText: '',
            urlAction: ''
          }
        ],
        showButton: false
      },
      variableMessage: '',  // 变量内容
      btnDisable: false,  // 变量按钮是否可以点击
      replaceParams: {}
    };
  },
  computed: {
    nowTime() {   // 接收信息的时间
      return dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss")
    },
    contacts() {
      return this.phoneTotalList.length
    }
  },
  methods: {
    // 发送模板消息
    handleSend() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (this.phoneTotalList.length == 0) {
            this.$message({
              type: 'warning',
              message: '请先添加联系人',
              center: true
            })
            return
          }
          // 判断批次名称是否含有特殊字符
          const pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“’。，、？]")
          if (pattern.test(this.ruleForm.batchName)) {
            this.$message({
              type: 'warning',
              message: '批次名称中不能含有特殊字符!',
              center: true
            })
            return
          }
          const phoneList = this.phoneTotalList.join(',')
          const query = {
            batchName: this.ruleForm.batchName,
            channel: 'HW', // 消息通道
            // chatbotId: '125200401111131', // 机器人ID
            clientType: 'MAAP', // CM通道专用，其他不需要带
            enterpriseAccountAppId: this.ruleForm.app, //企业应用id
            // inReplyToContributionId: 'null', // 回复id
            mouldCode: this.ruleForm.msg.split(' ')[1], // 普通消息模板id
            params: this.replaceParams,
            phoneDistinct: this.ruleForm.phoneDistinct,
            sendingMode: 'ACTIVE',
            to: phoneList, // 接收方手机号
            timingTime: this.ruleForm.timingTime == ''? '' : dayjs(this.ruleForm.timingTime).format("YYYY-MM-DD HH:mm:ss"),
            clientCorrelator: '', //用户端关联数据
          }
          this.loading = Loading.service({
            lock: true,
            text: '正在发送中...', //可以自定义文字
            spinner: 'el-icon-loading', //自定义加载图标类名
            background: 'rgba(255, 255, 255, 0.7)', //遮罩层背景色
            target: document.querySelector('.demo-ruleForm'),
          })
          sendTempalteMsessage(query)
            .then((res) => {
              this.loading.close()
              if (res.data.status == 0) {
                this.$message({
                  type: 'success',
                  message: '发送成功!',
                  center: true,
                })
              } else {
                this.$message({
                  type: res.data.status === 2 ? 'warning' : 'error',
                  message: res.data.message,
                  center: true,
                })
              }
            })
            .catch((error) => {
              this.loading.close()
              this.$message({
                type: res.data.status === 2 ? 'warning' : 'error',
                message: error,
                center: true,
              })
            })
        } else {

          return false;
        }
      })
    },
    // 获取应用下拉列表
    getDataList() {
      getAppLists()
        .then((res) => {
          if (res.data.status == 0) {
            const data = res.data.data
            data.forEach((item) => {
              const val = {}
              val.value = item.id
              val.label = item.name
              this.appOptions.push(val)
            })
          } else {
            this.$message.error({
              message: res.data.message,
              center: true,
            })
          }
        })
        .catch((error) => {
          this.$message.error({
            message: error,
            center: true,
          })
        })
    },
    // 获取消息模板列表
    getMessageLists() {
      this.msgOptions = []
      const params = {
        checkStatus: 1,
        enterpriseAccountAppId: this.ruleForm.app
      }
      getMessageList(params).then(res => {
        if (res.data.status == 0) {
          const data = res.data.data
          // console.log(data)
          data.forEach(item => {
            const val = {
              label: item.name,
              value: item.id + ' ' + item.mouldCode,
              type: item.messageType
            }
            this.msgOptions.push(val)
          })
        } else {
          this.$message.error({
            message: res.data.message,
            center: true,
          })
        }
      })
    },
    variableSelect(val) {
      if (this.phoneTotalList.length == 0) {
        this.$message({
          type: 'warning',
          message: '请先输入联系人！',
          center: true
        })
        return
      }
      const regex3 = /\{(.+?)\}/;
      this.variableMessage = this.variableMessage.replace(regex3, this.phoneTotalList[0])
      this.replaceParams = {
        column1: this.phoneTotalList[0]
      }
    },
    // 删除联系人
    deletePhone(index) {
      this.phoneTotalList.splice((this.currentPage-1)*10 + index, 1)  // 总数中删除
      this.getCurrentList(this.currentPage)
    },
    // 展开弹窗
    open(){
      this.openVisible = true
      this.phoneArray = ''
    },
    // 分割手动输入的联系人列表
    splitPhone(){
      // 判断是不是含有中文字符
      const res = /[；，]/
      if(this.phoneArray.match(res)){
        this.$message({
          type: 'warning',
          message: '请输入半角的逗号或者分号',
          center: true
        })
        return
      }
      const temp = this.phoneArray.split(/[\s\n,|; ]/).filter(item => {
            if (item != '' || item != null) {
              return item
            }
          })
      // 过滤一下是否含有非法手机号
      const result = temp.every(item => {
        return (/^1[3|4|5|6|7|8|9][0-9]{9}$/.test(item))
      })
      if (!result) {
        this.$message({
          type: 'warning',
          message: '请输入合法的手机号！',
          center: true
        })
        return
      }
      this.phoneTotalList.push(...temp)
      this.getCurrentList(this.currentPage)
      this.openVisible = false
    },
    // 删除联系人列表
    deletePhoneList() {
      this.$confirm("确定清空所有联系人吗？", {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        confirmButtonClass:'btn-custom-confirm',
        center:true
      }).then(() => {
        this.phoneTotalList = []
        this.phoneLists = []
      }).catch(() => {
        console.log(222)
      })
    },
    // 当回车按下时验证号码并将号码添加到列表
    addPhoneToList() {
      // console.log(this.phoneNumber)
      if (this.phoneNumber.length != 11 || !(/^1[3|4|5|6|7|8|9][0-9]{9}$/.test(this.phoneNumber))) {
        this.$message({
          type: 'warning',
          message: '请输入合法的手机号',
          center: true
        })
      } else {
        this.phoneTotalList.push(this.phoneNumber)
        this.getCurrentList(this.currentPage)
        this.$message({
          type: 'success',
          message: '添加成功！',
          center: true
        })
        this.phoneNumber = ''
      }
    },
    // 选中模板
    selectedModule(val) {
      const params = {
        messageMouldId: val.split(' ')[0]
      }
      MessageMould(params).then(res => {
        if (res.data.status == 0) {
          const data = res.data.data
          this.startTime = data.sendStartTime
          this.endTime = data.sendEndTime
          if (data.enterpriseAccountAppId != null) {
            this.ruleForm.app = data.enterpriseAccountAppId
          }
          if(data.messageType == 0) {  // 文本消息
            this.messageType = 0
            this.textContent = data.content
          } else if (data.messageType == 1) {  // 文件消息
            this.messageType = 1
            getFile({fileGroupDetailId: data.fileGroupDetailId}).then((res) => {
              // console.log(res.data.data)
              if (res.data.status == 0) {
                const data = res.data.data
                this.fileContent.fileType = data.fileType
                this.fileContent.fileUrl = data.fileUrl
              } else {
                this.$message({
                  type: 'warning',
                  message: res.data.message,
                  center: true
                })
              }
            })
          } else if (data.messageType == 2) {  // 卡片消息
            this.messageType = 2
            // 在调用一个获取卡片详情的接口
            cardList({messageMouldId: val.split(' ')[0]}).then((res) => {
              if(res.data.status == 0) {
                const result = res.data.data[0]
                this.cardContent.textContent = result.description
                this.cardContent.title = result.title
                if (result.suggestions.length > 0) {
                  this.cardContent.showButton = true
                  this.cardContent.fileUrl = result.fileGroupDetail.fileUrl
                  this.cardContent.buttonList = result.suggestions
                }
              }
            })
          } else if (data.messageType == 3) {
            this.messageType = 3
            this.variableMessage = data.content
          }
        } else {
          this.$message({
            type: 'error',
            message: res.data.message,
            center: true
          })
        }
      })
    },
    // 选中应用
    selectedApp(val){
      this.appName = this.findAppByid(val)
      this.getMessageLists()
    },
    // 根据id匹配应用名称
    findAppByid(id) {
      let temp = ''
      this.appOptions.forEach(item => {
        if (item.value == id) {
          temp = item.label
        }
      })
      return temp
    },
    // 根据页码获取当前页的电话列表
    getCurrentList(page) {
      this.phoneLists = this.phoneTotalList.slice((page-1)*10, page*10)
    },
    // 当页码变化时
    handleCurrentChange(val) {
      this.currentPage = val
      this.getCurrentList(this.currentPage)
    }
  },
  created() {
    this.getDataList()
    this.getMessageLists()
  },
  mounted() {
    this.getCurrentList(this.currentPage)
  }
}
</script>
<style lang="less" scoped>
#header {
  width: 100%;
  height: 100%;
  @vat: #666;
  .navW {
    width: 100%;
    height: 100%;
  }
  .navF {
    box-sizing: border-box;
    font-size: 14px;
  }
  .header {
    .navW();
    .el-form-item{
      // margin-bottom: 36px;
      // /deep/ .el-input__inner {
      //   width: 220px !important;
      // }
      /deep/ .el-form-item__content{
        width: 70%;
      }
      /deep/ .el-select{
        width: 100%;
      }
    }
    .el-textarea{
        /deep/ .el-textarea__inner{
            height: 200px !important;
        }
    }
    }
  // }
  .title{
      height: 100px;
      font-size: 20px;
      line-height: 100px;
      box-sizing: border-box;
      padding-left: 70px;
      // margin-bottom: 30px;
  }
  .content{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 70px;
    min-height: 620px;
    .content-left {
      width: 26%;
      border-right: 1px solid #ccc;
      padding: 0 17px 20px 0;
      box-sizing: border-box;
      font-size: 14px;
      font-family: Microsoft YaHei, Microsoft YaHei-Regular;
      font-weight: 400;
      text-align: left;
      position: relative;
      overflow: hidden;
      .content-left-head{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items:center;
        color: #333;
        letter-spacing: 0px;
      }
      .content-left-button{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 10px 0;
        /deep/ .el-button span{
          display: flex;
          align-items: center;
        }
        /deep/ .el-button img{
          width: 14px;
          height: 14px;
          margin-right: 2px;
        }
      }
      .content-left-list{
        padding-top: 24px ;
        .list-item{
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 5px 0;
          color: #333333;
          font-size: 14px;
          .close-phone{
            color: transparent;
          }
          .list-item-left{
            display: flex;
            align-items: center;

          }
        }
        .list-item:hover {
          // background-color: #eee;
          color: #409eff;
          .close-phone{
            color: #409eff;
            cursor: pointer;
          }
        }
      }
      .content-left-footer{
        width: 100%;
        position: absolute;
        bottom: 10px;
        overflow: auto;
      }
    }
    .content-center{
      width: 44%;
      // border: 1px solid #ccc;
      // border-radius: 5px;
      padding: 0 17px 20px 17px;
      box-sizing: border-box;
      .demo-ruleForm{
        margin-top: 10px;
      }
      .variable{
        span{
          color: #409eff;
          border: 1px solid rgba(54,140,254,0.3);
          border-radius: 4px;
          padding: 6px 13px;
          margin-right: 12px;
          user-select: none;
        }
        .disable{
          pointer-events: none;
          cursor:not-allowed;
        }
      }
      .variable span:hover {
        border-color: #409eff;
        cursor: pointer;
      }
      .tips{
        font-size:12px;
        color:#bbb;
        user-select: none;
      }
    }
    .content-right{
      width: 30%;
      padding: 0 17px 20px 17px;
      box-sizing: border-box;
      .content-right-body{
        width: 350px;
        margin-top: 10px;
        height: 100%;
        background-image: url("../../assets/images1/Silver1.png");
        background-repeat: no-repeat;
        // background-size: contain;
        background-size: auto 90%;
        position: relative;
        .simulation{
          // width: 82%;
          width: 100%;
          position: absolute;
          top: 70px;
          left: 25px;
          word-break: break-all;
          .header{
            // display: flex;
            // justify-content: center;
            // font-weight: bold;
            width: 50%;
            margin-left: 5%;
            text-align: center;
            font-weight: bold;
          }
          .message-content{
            margin-top: 12px;
            width: 100%;
            .top{
              display: flex;
              align-items: center;
              font-size: 12px;
            }
            .bottom{
              .text{
                width: 50%;
                background: #eee;
                padding: 10px;
                border-radius: 8px;
                font-size: 12px;
                margin-left: 5%;
              }
              .file{
                width: 50%;
                margin-top: 5px;
                border-radius: 8px;
                margin-left: 5%;
                box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
                overflow: hidden;
                img{
                  width: 100%;
                }
                .file-content{
                  padding: 10px;
                  font-size: 12px;
                  .file-content-head{
                    font-size: 14px;
                    font-weight: bold;
                  }
                  .file-content-body{
                    margin-top: 10px;
                    color: #333;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 3;
                    overflow: hidden;
                  }
                  .file-content-button{
                    background-color: #eee;
                    padding: 10px 30px;
                    text-align: center;
                    border-radius: 30px;
                    font-weight: bold;
                    margin-top: 10px;
                  }
                }
                .video-class{
                  width: 100%;
                  max-height: 200px;
                  object-fit: fill;
                }
                .audio-class{
                  object-fit: fill;
                  padding: 20px 5px;
                  outline: none;
                }
              }
            }
          }

        }
      }
    }
  }
  /deep/.el-dialog__header{
    border-bottom: 1px solid #eee;
  }
  /deep/ .el-dialog__footer{
    text-align: center;
  }
  /deep/ .iconfont{
    margin-right: 3px;
  }
}
</style>
