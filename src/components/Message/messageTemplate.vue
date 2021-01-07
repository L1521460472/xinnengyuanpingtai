<template>
  <div id="header" ref="header" v-loading="loading" element-loading-text="loading">
    <!-- 消息模板 -->
    <div class="header">
      <div class="title">消息模板</div>
      <div class="nav">
        <div class="navLeft">
          <span>我的模板（共{{ textNum + fileNum + cardNum }}条）</span>
          <img src="../../assets/icon-24px-列表@1x.png" alt="" />
        </div>
        <div class="navRight">
          <el-input v-model="templateName" placeholder="模板名称" size="small" clearable><i slot="suffix" @click="search" class="el-input__icon el-icon-search"></i></el-input>
        </div>
      </div>
      <div class="table">
        <div class="tableT">
          <div class="tableTLeft">
            <el-button size="mini" :class="{ active: isDisableTotal }" @click="handleClick()" round>全部 ({{ textNum + fileNum + cardNum }})</el-button>
            <el-button size="mini" :class="{ active: isDisableText }" @click="handleClick(1)" round>文本消息 ({{ textNum }})</el-button>
            <el-button size="mini" :class="{ active: isDisableFile }" @click="handleClick(2)" round>文件消息 ({{ fileNum }})</el-button>
            <el-button size="mini" :class="{ active: isDisableCard }" @click="handleClick(3)" round>卡片消息 ({{ cardNum }})</el-button>
            <el-button size="mini" :class="{ active: isDisableChange }" @click="handleClick(4)" round>变量消息 ({{ changeNum }})</el-button>
          </div>
          <div class="tableTRight">
            <el-button type="text" @click.stop="addMessage" style="color: #fe9636" v-has="'messageMouldCardAddOrUpdate'"><i class="el-icon-circle-plus-outline"></i>
              <p>新建消息</p>
            </el-button>
            <div class="addMsg" v-if="isShow">
              <div @click="handleText">
                <img src="../../assets/icon-文本消息@1x.svg" alt="" />文本消息
              </div>
              <div @click="handleFile">
                <img src="../../assets/icon-文件消息@1x.svg" alt="" />文件消息
              </div>
              <div @click="handleCard">
                <img src="../../assets/icon-卡片消息@1x.svg" alt="" />卡片消息
              </div>
              <div @click="handleChange">
                <img src="../../assets/icon_变量.svg" alt="" />变量消息
              </div>
            </div>
          </div>
        </div>
        <div class="tableF">
          <el-table ref="multipleTable" :data="tableData" :header-cell-style="{ background: '#F4F4F4', color: '#333333' }" border size="small" tooltip-effect="dark" style="width: 100%"
            :style="{ color: '#333', 'min-height': tableHeight + 'px' }">
            <!-- <el-table-column type="selection" width="55"> </el-table-column> -->
            <el-table-column type="expand" align="center">
              <template slot-scope="props">
                <div class="text" v-if="props.row.messageType == 0">
                  <div class="textTop">{{ props.row.content }}</div>
                  <div class="textBottom" v-if="
                      props.row.suggestions && props.row.suggestions.length > 0
                    ">
                    <span v-for="(item, index) in props.row.suggestions" :key="index">
                      <span class="btn" v-if="item.action">{{
                        item.action.displayText
                      }}</span>
                      <span class="btn" v-if="item.reply">{{
                        item.reply.displayText
                      }}</span>
                    </span>
                  </div>
                </div>
                <div class="expandAudio" v-else-if="props.row.messageType == 1">
                  <fileList :fileData="props.row"></fileList>
                  <el-button @click.native.prevent="
                      downloadAction(
                        props.row.fileGroupDetail.fileUrl,
                        props.row.fileGroupDetail.fileName
                      )
                    " type="text" size="small" class="dowImage">
                    <img src="../../assets/icon-24px-下载@1x.svg" alt="" />
                  </el-button>
                </div>
                <div v-else-if="props.row.messageType == 2">
                  <cardList :cardData="props.row"></cardList>
                </div>
                <div class="text" v-else>
                  <div class="textTop">{{ props.row.content }}</div>
                  <div class="textBottom" v-if="
                      props.row.suggestions && props.row.suggestions.length > 0
                    ">
                    <span v-for="(item, index) in props.row.suggestions" :key="index">
                      <span class="btn" v-if="item.action">{{
                        item.action.displayText
                      }}</span>
                      <span class="btn" v-if="item.reply">{{
                        item.reply.displayText
                      }}</span>
                    </span>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="mouldCode" label="模版ID" show-overflow-tooltip width="110"></el-table-column>
            <el-table-column prop="mouldName" label="模版名称" show-overflow-tooltip width="140"></el-table-column>
            <el-table-column prop="enterpriseAccountAppName" label="应用" show-overflow-tooltip width="120"></el-table-column>
            <el-table-column prop="channelName" label="通道" show-overflow-tooltip width="100"></el-table-column>
            <el-table-column prop="businessTypeStr" label="业务类型" width="80"></el-table-column>
            <el-table-column prop="address" label="模版类型" width="80" show-overflow-tooltip>
              <template slot-scope="scope">
                <span v-if="scope.row.messageType === 0">文本消息</span>
                <span v-if="scope.row.messageType === 1">文件消息</span>
                <span v-if="scope.row.messageType === 2">卡片消息</span>
                <span v-if="scope.row.messageType === 3">变量消息</span>
              </template>
            </el-table-column>
            <el-table-column prop="address" label="状态" width="100" show-overflow-tooltip>
              <template slot-scope="scope">
                <div class="status">
                  <span v-if="scope.row.checkStatus === 0">待审核</span>
                  <span v-if="scope.row.checkStatus === 1">审核通过</span>
                  <span v-if="scope.row.checkStatus === 2">审核拒绝</span>
                  <span v-if="scope.row.checkStatus === null">草稿</span>
                  <el-tooltip v-if="scope.row.checkStatus == 2" class="item" effect="dark" :content="scope.row.checkContent" placement="top">
                    <img src="../../assets/images/redWarning_icon.svg" alt="" />
                  </el-tooltip>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="mouldUpdateTime" label="更新时间" show-overflow-tooltip width="150">
            </el-table-column>
            <el-table-column label="操作" min-width="120">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" content="编辑" placement="bottom">
                  <el-button @click.native.prevent="handleEdit(scope.$index, scope.row)" type="text" size="small" v-has="'messageMouldCardAddOrUpdate'">
                    <img src="../../assets/icon-24px-编辑@1x.svg" alt="" />
                  </el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
                  <el-popover placement="bottom" width="200" :ref="`deleteVideo-${scope.$index}`" trigger="click">
                    <span style="padding: 30px">是否删除该消息模板？</span>
                    <div class="group-footer">
                      <el-button size="mini" type="primary" @click="handleDelete(scope.row, scope)">确定</el-button>
                      <el-button size="mini" @click="cancleDeleteVideoFile(scope)">取消</el-button>
                    </div>
                    <el-button type="text" style="padding: 0" slot="reference" v-has="'messageMouldDeleteById'">
                      <img src="../../assets/icon-24px-删除@1x.svg" />
                    </el-button>
                  </el-popover>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="发送" placement="bottom">
                  <el-button @click.native.prevent="handleSend(scope.row)" type="text" size="small" v-has="'messageMouldSendMouldMessage'">
                    <img src="../../assets/icon-24px-发送@1x.svg" alt="" />
                  </el-button>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="pagination">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40, 50]" :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </div>
      <div class="MessageBox" v-if="dialogVisible">
        <div class="banner">
          <div class="bannerTitle">
            <div class="titleLeft">发送消息</div>
            <div class="titleRight">
              <i @click="cancle" class="el-icon-close"></i>
            </div>
          </div>
          <div class="bannerMain">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm">
              <el-form-item label="应用" prop="app">
                <el-select size="small" v-model="ruleForm.app" placeholder="请选择">
                  <el-option v-for="item in appOptions" :key="item.id" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="消息模板" prop="msg">
                <span>{{ ruleForm.msg }}</span>
              </el-form-item>
              <el-form-item label="发送给" prop="desc">
                <el-input type="textarea" v-model="ruleForm.desc"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div class="bannerFottom">
            <el-button type="primary" @click="confirmSend" size="small">发送</el-button>
            <el-button size="small" @click="cancle">取消</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import cardList from './cardList'
import fileList from './fileList'
import {
  getMessageTemplateList,
  businessTypeList,
  getMouldNum,
  getAppList,
  channelList,
  sentMessage,
  deleteMessageMould,
} from '../../api/message/messageTemplate'
import { getCookie, download } from '../../public'
export default {
  name: 'messageTemplate',
  components: { cardList, fileList },
  data() {
    return {
      loading: false,
      templateName: null,
      tableData: [],
      ruleForm: {
        app: '',
        msg: '',
        channelId:'',
        mouldCode: '', //消息模板code
        desc: '',
      },
      rules: {
        app: [
          { required: true, message: '应用不可为空', trigger: 'blur' },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        desc: [{ required: true, message: '手机号不可为空', trigger: 'blur' }],
      },
      appOptions: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      messageType: null,
      businessTypeList: [], //业务类型
      appOptions: [], //应用
      channelOptions: [], //通道
      allNum: 0, //全部模板数量
      textNum: 0, //文本数量
      fileNum: 0, //文件数量
      cardNum: 0, //卡片数量
      changeNum: 0, //变量数量
      isDisableTotal: true,
      isDisableText: false,
      isDisableFile: false,
      isDisableCard: false,
      isDisableChange: false,
      isShow: false,
      dialogVisible: false,
      enterpriseId: getCookie('enterpriseId'),
      tableHeight: window.innerHeight - 370 + '',
    }
  },
  methods: {
    // 获取列表数据
    getListData() {
      this.loading = true
      let params = {
        messageType: this.messageType,
        name: this.templateName,
        currentPage: this.currentPage,
        pageSize: this.pageSize,
      }
      getMessageTemplateList(params)
        .then((res) => {
          this.loading = false
          if (res.data.status == 0) {
            this.total = res.data.data.total
            // 遍历组装业务类型文本
            res.data.data.records.map((item) => {
              this.appOptions.map((item0) => {
                if (item.enterpriseAccountAppId == item0.id) {
                  item.enterpriseAccountAppName = item0.name
                }
              })
              this.channelOptions.map((item1) => {
                if (item.channelId == item1.id) {
                  item.channelName = item1.name
                }
              })
              this.businessTypeList.map((item2) => {
                if (item.businessType == item2.id) {
                  item.businessTypeStr = item2.name
                }
              })
            })
            this.$nextTick(() => {
              this.tableData = res.data.data.records
            })
          } else {
            this.$message.error({
              message: res.data.message,
              center: true,
            })
          }
        })
        .catch((err) => {
          this.$message.error({
            message: err,
            center: true,
          })
        })
    },
    // 获取业务类型
    getBusinessTypeList() {
      getAppList()
        .then((res) => {
          this.appOptions = res.data.data
        })
        .catch((err) => {
          this.$message.error({
            message: err,
            center: true,
          })
        })
      channelList({ enterpriseAccountAppId: '' })
        .then((res) => {
          this.channelOptions = res.data.data
        })
        .catch((err) => {
          this.$message.error({
            message: err,
            center: true,
          })
        })
      this.$nextTick(() => {
        businessTypeList({ id: 1 })
          .then((res) => {
            if (res.data.status == 0) {
              this.businessTypeList = res.data.data
              this.getListData()
            } else {
              this.$message.error({
                message: res.data.message,
                center: true,
              })
            }
          })
          .catch((err) => {
            this.$message.error({
              message: err,
              center: true,
            })
          })
      })
    },
    // 获取消息模板类型对应的数量
    getMouldNumData() {
      getMouldNum({})
        .then((res) => {
          if (res.data.status == 0) {
            this.textNum = res.data.data.TEXT
            this.fileNum = res.data.data.FILE
            this.cardNum = res.data.data.CARD
            this.changeNum = res.data.data.VARIABLE
          } else {
            this.$message.error({
              message: res.data.message,
              center: true,
            })
          }
        })
        .catch((err) => {
          this.$message.error({
            message: err,
            center: true,
          })
        })
    },
    // 条件查询
    search() {
      this.currentPage = 1
      this.getListData()
    },
    // 回车查询
    keyDown(e) {
      if (e.keyCode == 13) {
        this.search()
      }
    },
    // 改变页面尺寸
    handleSizeChange(val) {
      this.pageSize = val
      this.getListData()
    },
    // 翻页
    handleCurrentChange(val) {
      this.currentPage = val
      this.getListData()
    },
    handleClick(val) {
      if (val == 1) {
        this.isDisableTotal = false
        this.isDisableText = true
        this.isDisableFile = false
        this.isDisableCard = false
        this.isDisableChange = false
        this.messageType = 0
      } else if (val == 2) {
        this.isDisableTotal = false
        this.isDisableText = false
        this.isDisableFile = true
        this.isDisableCard = false
        this.isDisableChange = false
        this.messageType = 1
      } else if (val == 3) {
        this.isDisableTotal = false
        this.isDisableText = false
        this.isDisableFile = false
        this.isDisableCard = true
        this.isDisableChange = false
        this.messageType = 2
      } else if (val == 4) {
        this.isDisableTotal = false
        this.isDisableText = false
        this.isDisableFile = false
        this.isDisableCard = false
        this.isDisableChange = true
        this.messageType = 3
      } else {
        this.isDisableTotal = true
        this.isDisableText = false
        this.isDisableFile = false
        this.isDisableCard = false
        this.isDisableChange = false
        this.messageType = null
      }
      this.getListData()
    },
    // 下载文件
    downloadAction(url, fileName) {
      download(url, fileName)
    },
    handleEdit(index, row) {
      //编辑
      if (row.messageType == 0) {
        this.$router.push({
          name: 'diyMessage',
          query: { jum: 'text', id: row.mouldId },
        })
      } else if (row.messageType == 1) {
        this.$router.push({
          name: 'diyMessage',
          query: { jum: 'file', id: row.mouldId },
        })
      } else if (row.messageType == 2) {
        this.$router.push({
          name: 'diyMessage',
          query: { jum: 'card', id: row.mouldId },
        })
      } else if (row.messageType == 3) {
        this.$router.push({
          name: 'diyMessage',
          query: { jum: 'change', id: row.mouldId },
        })
      }
    },
    handleDelete(row, scope) {
      //删除
      deleteMessageMould({ messageMouldId: row.mouldId })
        .then((res) => {
          if (res.data.status == 0) {
            scope._self.$refs[`deleteVideo-${scope.$index}`].doClose()
            this.$message.success({
              message: '消息模板删除成功',
              center: true,
            })
            this.getListData()
            this.getMouldNumData()
          } else {
            this.$message.error({
              message: res.data.message,
              center: true,
            })
          }
        })
        .catch((err) => {
          this.$message.error({
            message: err,
            center: true,
          })
        })
    },
    // 取消删除
    cancleDeleteVideoFile(scope) {
      scope._self.$refs[`deleteVideo-${scope.$index}`].doClose()
    },
    handleSend(row) {
        console.log('row: ', row);
      //发送
      this.ruleForm.app = ''
      this.ruleForm.desc = ''
      this.ruleForm.channelId = row.channelId
      this.ruleForm.mouldCode = row.mouldCode
      this.ruleForm.msg = row.mouldName
      getAppList()
        .then((res) => {
          if (res.data.status == 0) {
            this.appOptions = res.data.data
          } else {
            this.$message.error({
              message: res.data.message,
              center: true,
            })
          }
        })
        .catch((err) => {
          this.$message.error({
            message: err,
            center: true,
          })
        })
      this.dialogVisible = true
      window.removeEventListener('keydown', this.keyDown, false) //移除监听事件
    },
    confirmSend() {
      //确认发送
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          const temp = this.ruleForm.desc.split(/[\s\n]/).filter((item) => {
            if (item != '' || item != null) {
              return item
            }
          })
          const result = temp.every((item) => {
            return /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(item)
          })
          if (!result) {
            this.$message({
              type: 'warning',
              message: '请输入合法的手机号！',
              center: true,
            })
            return
          }
          let phoneList = temp.join(',')
          const params = {
            // batchName:'',//批次名称
            channelId: '', // 消息通道
            chatbotId: '125200401111131', // 机器人ID
            clientType: 'MAAP', // CM通道专用，其他不需要带
            enterpriseAccountAppId: this.ruleForm.app, //企业应用id
            // inReplyToContributionId: "null", // 回复id
            mouldCode: this.ruleForm.mouldCode, // 普通消息模板id
            params: {
              // 模板参数
              phone: '',
              date: '',
            },
            phoneDistinct:true,//号码去重
            sendingMode: 'ACTIVE',//ACTIVE:群发消息; PASSIVE:交互消息
            // timingTime:'',//定时时间，未开启定时则为空
            to: phoneList, // 接收方手机号
            clientCorrelator: '', //用户端关联数据
          }
          sentMessage(params)
            .then((res) => {
              if (res.data.status == 0) {
                this.$message.success({
                  message: '发送成功',
                  center: true,
                })
                this.cancle()
              } else {
                this.$message.error({
                  message: res.data.message,
                  center: true,
                })
              }
            })
            .catch((err) => {
              this.$message.error({
                message: err,
                center: true,
              })
            })
        }
      })
    },
    cancle() {
      //取消发送
      this.dialogVisible = false
      window.addEventListener('keydown', this.keyDown) //绑定监听事件
      // this.ruleForm.app = "";
      // this.ruleForm.desc = "";
    },
    addMessage() {
      //新增消息
      this.isShow = true
    },
    handleBodyClick() {
      this.isShow = false
    },
    handleText() {
      //文本消息
      this.$router.push({
        name: 'diyMessage',
        query: { jum: 'text' },
      })
      this.isShow = false
    },
    handleFile() {
      //文件消息
      this.$router.push({
        name: 'diyMessage',
        query: { jum: 'file' },
      })
      this.isShow = false
    },
    handleCard() {
      //卡片消息
      this.$router.push({
        name: 'diyMessage',
        query: { jum: 'card' },
      })
      this.isShow = false
    },
    handleChange() {
      this.$router.push({
        name: 'diyMessage',
        query: { jum: 'change' },
      })
      this.isShow = false
    },
  },
  mounted() {
    this.getBusinessTypeList()
    this.getMouldNumData()
    this.$nextTick(() => {
      document.addEventListener('click', this.handleBodyClick)
    })
    window.addEventListener('keydown', this.keyDown) //绑定监听事件
  },
  destroyed() {
    document.removeEventListener('click', this.handleBodyClick)
    window.removeEventListener('keydown', this.keyDown, false) //移除监听事件
  },

  // components: {
  //   cardList,
  //   audioList,
  // },
}
</script>
<style lang="less" scoped>
#header {
  width: 100%;
  // height: 100%;
  @vat: #666;
  .navW {
    width: 100%;
    // height: 100%;
  }
  .navF {
    box-sizing: border-box;
    font-size: 14px;
    padding: 0 70px;
  }
  .header {
    .navW();
    .navF();
    .title {
      height: 90px;
      font-size: 20px;
      line-height: 80px;
      box-sizing: border-box;
      padding-top: 10px;
    }
    .nav {
      width: 100%;
      height: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .navLeft {
        display: flex;
        align-items: center;
        font-size: 16px;
        color: #333;
      }
      .navRight {
        .el-icon-search {
          cursor: pointer;
        }
      }
    }
    .table {
      .text {
        width: 330px;
        background-color: #fff;
        border: 1px solid #e5e5e5;
        border-radius: 4px;
        padding: 0 30px;
        box-sizing: border-box;
        .textTop {
          margin: 15px 0px;
          word-break: break-all;
          display: -webkit-box;
          // width: 100%;
          // height: 40px;
          font-size: 14px;
          // color: #999;
          overflow: hidden;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 4;
        }
        .textBottom {
          width: 268px;
          padding: 20px 0;
          border-top: 1px solid #e5e5e5;
          white-space: nowrap;
          overflow-x: auto;
          .btn {
            width: fit-content;
            height: 34px;
            display: inline-block;
            line-height: 34px;
            text-align: center;
            border: 1px solid #e5e5e5;
            border-radius: 34px;
            margin-right: 16px;
            padding: 0 10px;
            box-sizing: border-box;
            cursor: pointer;
          }
          .btn:hover {
            color: #409eff;
            border-color: #409eff;
          }
          .btn:nth-of-type(3n) {
            margin-right: 0;
          }
        }
      }
      // height: calc(100% - 130px);
      .tableT {
        height: 90px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .tableTLeft {
          .el-button {
            color: #999;
            border: 1px solid#fff;
          }
          .el-button:hover {
            background: none;
          }
          .el-button:focus {
            background: none;
          }
          .active {
            border: 1px solid#368CFE;
            color: #368cfe;
          }
        }
        .tableTRight {
          position: relative;
          .el-button {
            /deep/ span {
              display: flex;
              justify-content: center;
              align-items: center;
            }
            [class*=' el-icon-'],
            [class^='el-icon-'] {
              font-size: 24px;
              display: block;
              margin-right: 5px;
            }
          }
          .addMsg {
            width: 130px;
            height: 150px;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
            position: absolute;
            top: 60px;
            right: -25px;
            z-index: 999;
            border-radius: 4px;
            background: #ffffff;
            box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.15);
            div {
              width: 100%;
              height: 38px;
              display: flex;
              justify-content: center;
              align-items: center;
              cursor: pointer;
              img {
                margin-right: 10px;
              }
            }
            div:hover {
              background: #f5f5f5;
            }
          }
        }
      }
      .tableF {
        width: 100%;
        .el-table .item {
          width: 24px;
          height: 26px;
          line-height: 26px;
          float: left;
          padding: 0;
          margin-right: 6px;
        }
        /deep/ .el-table__expanded-cell[class*='cell'] {
          background: #f8f8fb;
        }
        /deep/ .el-table__expanded-cell[class*='cell']:hover {
          background: #f8f8fb !important;
        }
        /deep/ .el-table__row td:nth-child(1) div {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .expandAudio {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .dowImage {
          float: right;
          padding: 0;
        }
        .status {
          display: flex;
          align-items: center;
          img {
            margin-left: 10px;
          }
        }
      }
      .pagination {
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
      }
    }
  }
  .MessageBox {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.2);
    z-index: 999;
    .banner {
      width: 450px;
      height: 390px;
      background: #fff;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      .bannerTitle {
        width: 100%;
        height: 44px;
        box-sizing: border-box;
        padding: 0 33px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #e5e5e5;
        .titleRight {
          cursor: pointer;
        }
      }
      .bannerMain {
        width: 100%;
        height: 272px;
        box-sizing: border-box;
        padding-top: 20px;
        .el-form-item {
          margin-bottom: 16px;
        }
        .el-textarea {
          width: 220px;
          /deep/ .el-textarea__inner {
            height: 140px !important;
          }
        }
      }
      .bannerFottom {
        width: 100%;
        height: 74px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
