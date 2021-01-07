<template>
  <div id="header">
    <!-- 收发记录 -->
    <div class="header">
      <div class="title">收发记录</div>
      <div class="table">
        <div class="tableT">
          <el-button-group>
            <el-button type="primary" size="small" @click="refresh">
              <i class="iconfont iconshuaxin"></i>
            </el-button>
            <el-button type="primary" @click="clear" size="small" >
              <i class="iconfont iconguanbi"></i>
            </el-button>
          </el-button-group>
          <el-select
            v-model="enterpriseAccountAppId"
            placeholder="应用"
            size="small"
            clearable
          >
            <el-option
              v-for="item in optionsList01"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-select
            v-model="messageMouldId"
            placeholder="模板"
            size="small"
            clearable
          >
            <el-option
              v-for="item in optionsList02"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-select
            v-model="direction1"
            placeholder="方向"
            size="small"
            clearable
          >
            <el-option
              v-for="item in optionsList03"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <template v-if="direction1 !== 'RECEIVE'">
            <el-select
              v-model="status"
              placeholder="状态"
              size="small"
              clearable>
              <el-option
                v-for="item in optionsList04"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
          <el-input
            v-model="searchContent"
            placeholder="手机号码或内容"
            size="small"
            clearable
            ><i
              slot="suffix"
              @click="search"
              class="el-input__icon el-icon-search"
            ></i
          ></el-input>
        </div>
        <div class="tableF">
          <el-table
            ref="multipleTable"
            :data="tableData"
            :header-cell-style="{ background: '#F4F4F4', color: '#333333' }"
            border
            size="small"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
            v-loading="loading"
            :style="{'color':'#333','min-height':tableHeight + 'px'}"
          >
            <!-- <el-table-column type="selection" width="55"> </el-table-column> -->
            <el-table-column type="expand" align="center">
              <template slot-scope="props">
                  <div class="text" v-if="props.row.messageContent.messageType == 'TEXT'">
                  <div class="textTop">{{ props.row.messageContent.content }}</div>
                  <div
                    class="textBottom"
                    v-if="
                      props.row.messageContent.suggestions && props.row.messageContent.suggestions.length > 0
                    "
                  >
                    <span v-for="(item, index) in props.row.messageContent.suggestions" :key="index">
                        <span class="btn" v-if="item.action">{{item.action.displayText}}</span>
                        <span  class="btn" v-if="item.reply">{{item.reply.displayText}}</span>
                    </span>
                  </div>
                </div>
                <!-- <span v-if="props.row.messageContent.messageType == 'TEXT'">{{ props.row.messageContent.content }}</span> -->
                <div v-else-if="props.row.messageContent.messageType == 'FILE'">
                  <fileList :fileData="props.row.messageContent"></fileList>
                  <el-button
                    @click.native.prevent="downLoad(props.row.messageContent.fileGroupDetail.fileName, props.row.messageContent.fileGroupDetail.fileUrl)"
                    type="text"
                    size="small"
                    class="dowImage"
                  >
                    <img src="../../assets/icon-24px-下载@1x.png" alt="" />
                  </el-button>
                </div>
                <div v-else-if="props.row.messageContent.messageType == 'CARD'">
                  <cardList :cardData="props.row.messageContent"></cardList>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="应用" width="150" show-overflow-tooltip>
              <template slot-scope="scope">{{ scope.row.enterpriseAccountApp }}</template>
            </el-table-column>
            <el-table-column prop="directions" label="方向" width="100">
            </el-table-column>
            <el-table-column
              label="手机号码"
              show-overflow-tooltip
              width="100"
            >
            <template slot-scope="scope">{{scope.row.messageContent == null ? '' : scope.row.messageContent.phoneList}}</template>
            </el-table-column>
            <el-table-column
              prop="messageMould"
              label="消息模板"
              show-overflow-tooltip
              width="150"
            >
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="创建时间"
              show-overflow-tooltip
              width="150"
            >
            </el-table-column>
            <el-table-column
              prop="sendTime"
              label="发送时间"
              show-overflow-tooltip
              width="150"
            >
            </el-table-column>
            <el-table-column
              prop="deliverTime"
              label="送达时间"
              show-overflow-tooltip
              width="150"
            >
            </el-table-column>
            <el-table-column prop="status_send" label="状态" width="100" show-overflow-tooltip>
              <template slot-scope="scope">
                <span v-if="scope.row.direction == 'RECEIVE'">--</span>
                <span v-else>{{scope.row.status_send}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" min-width="85">
              <template slot-scope="scope">
                <!-- 撤回消息 -->
                <template v-if="scope.row.direction != 'RECEIVE'">
                  <template v-if="scope.row.status == 'DELIVERED' || scope.row.status == 'DISPLAYED'">
                    <el-tooltip class="item" effect="dark" content="消息撤回；处于已送达和已读状态的消息，不支持撤回" placement="bottom-start">
                      <el-button
                      @click.native.prevent="notAllowWithDraw(scope.$index, tableData)"
                      type="text"
                      v-has="'messageWithdraw'"
                      size="small">
                      <img
                        src="../../assets/icon-24px-撤回@2x.svg"
                        alt=""
                        />
                    </el-button>
                    </el-tooltip>
                  </template>
                </el-table-column>
                <el-table-column label="操作" min-width="85">
                  <template slot-scope="scope">
                    <!-- 撤回消息 -->
                    <template v-if="scope.row.direction != 'RECEIVE'">
                      <template v-if="scope.row.status == 'DELIVERED' || scope.row.status == 'DISPLAYED'">
                        <el-tooltip class="item" effect="dark" content="消息撤回；处于已送达和已读状态的消息，不支持撤回" placement="bottom-start">
                          <el-button
                          @click.native.prevent="notAllowWithDraw(scope.$index, tableData)"
                          type="text"
                          v-has="'messageWithdraw'"
                          size="small">
                          <img
                            src="../../assets/icon-24px-撤回@2x.svg"
                            alt=""
                            />
                        </el-button>
                        </el-tooltip>
                      </template>
                      <template v-else>
                        <el-tooltip class="item" effect="dark" content="消息撤回" placement="bottom-start">
                          <el-button
                            @click.native.prevent="deleteRow(scope.row)"
                            type="text"
                            size="small"
                            v-has="'messageWithdraw'"
                          >
                            <img
                              src="../../assets/icon-24px-撤回@1x.svg"
                              alt=""
                            />
                          </el-button>
                        </el-tooltip>
                      </template>
                    </template>
                    <!-- 查看记录 -->
                    <el-tooltip class="item" effect="dark" content="查看记录" placement="bottom-start" v-has="'messageRecordView'">
                      <el-button
                        @click.native.prevent="handleDetails(scope.$index, scope.row)"
                        type="text"
                        size="small"
                      >
                        <img
                          src="../../assets/icon-24px-详情@1x.svg"
                          alt=""
                        />
                      </el-button>
                    </el-tooltip>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="pagination">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 30, 40, 50]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
              >
              </el-pagination>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="发送详情" name="second">
          <!-- <HTable :data="testData" :operation="true">
            <template slot="search">
              <el-form label-width="80px">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="测试">
                      <el-input></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="测试">
                      <el-input></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-button type="primary" style="float:right">搜索</el-button>
                  </el-col>
                </el-row>
              </el-form>
            </template>
            <template slot="operation" slot-scope="scope">
              <el-button type="text" @click="test(scope)">编辑</el-button>
              <el-button type="text">删除</el-button>
            </template>
          </HTable> -->
        </el-tab-pane>
        <el-tab-pane label="接收记录" name="third">角色管理</el-tab-pane>
      </el-tabs>
      <el-drawer
        title="收发记录"
        :visible.sync="drawer"
        :direction="direction"
      >
        <!-- 聊天内容区域 -->
      <div ref="chattingContent" id="chattingContent" class="chatting-content" v-loading="chatLoading" @scroll="chatScroll">
        <div v-if="msgs.length == 0">
          <span class="none-message">暂无记录</span>
        </div>
        <div v-else>
          <div v-for="(item, index) of msgs" :key="index">
            <!-- 发送类型为接收的 -->
            <div v-if="item.direction == 'RECEIVE'" class="chatting-item self clearfix">
              <div class="msg-date">
                {{ item.sendTime }}
              </div>
              <div class="msg-from">
                <!-- <span class="loc">[{{item.loc}}]</span> -->
                <span class="msg-author">{{ item.messageContent.phoneList}}</span>
                <img src="../../assets/Frame-350@1x.png" alt="">
              </div>
              <div class="msg-content" v-if="item.messageContent.messageType == 'TEXT' ">
                  {{ item.messageContent.content }}
              </div>
              <div class="msg-content" v-else-if="item.messageContent.messageType == 'FILE'">
                <fileList :fileData="item.messageContent"></fileList>
                  <!-- <audio ref="audio" preload readyState>
                      <source
                        src="../../assets/梦然 - 少年 (DJ阿祥版).mp3"
                        type="audio/mpeg"
                      />
                    </audio>
                    <div class="audio">
                      <img class="iamgeLeft" :src="iamgeLeftUrl" alt="" />
                      {{ duration }}
                      <img
                        class="imageRight"
                        @click="handlePlay"
                        :src="imageRightUrl"
                        alt=""
                      />
                    </div> -->
              </div>
              <div class="msg-content" v-else-if="item.messageContent && item.messageContent.messageType == 'CARD'">
                  <cardList :cardData="item.messageContent"></cardList>
              </div>
            </div>
            <!-- 文件类型为发的时候 -->
            <div v-else class="chatting-item other clearfix">
              <!-- 时间 -->
              <div class="msg-date">
                {{ item.sendTime }}
              </div>
              <!-- 头像+名称 -->
              <div class="msg-from">
                <img src="../../assets/Frame-343@1x.png" alt="">
                <span class="msg-author">{{ item.appName }}</span>
              </div>
              <!-- 内容信息 -->
              <div class="msg-content" v-if="item.messageContent.messageType == 'TEXT' ">
                  {{ item.messageContent.content }}
              </div>
              <div class="msg-content" v-else-if="item.messageContent.messageType == 'FILE'">
                <fileList :fileData="item.messageContent"></fileList>
              </div>
              <div class="msg-content" v-else-if="item.messageContent.messageType = 'CARD'">
                <cardList :cardData="item.messageContent"></cardList>
              </div>
            </div>
          </div>
        </div>
      </div>
      </el-drawer>
    </div>
  </div>
</template>
<script>
import cardList from "./cardList"
import fileList from './fileList'
import HTable from '../common/HTable'
import { getCookie, download } from '../../public'
import { getAppLists } from '../../api/Develop/myapp'
import { getMessageList } from '../../api/message/moreMessage'
import { getRecord, recoedDetail, withdraw } from '../../api/message/records'
export default {
  name: "records",
  data() {
    return {
      activeName: 'first',
      /**
       * 发送记录
       */
      enterpriseAccountAppId: "", //应用
      messageMouldId: "", //模板
      direction1: "", //方向
      status: "", //状态
      searchContent: "", //搜索
      optionsList01: [], //应用
      optionsList02: [], //模板
      optionsList03: [
        {
          value: "RECEIVE",
          label: "接收",
        },
        {
          value: "SEND",
          label: "发送",
        }
      ], //方向
      optionsList04: [
        {
          value: "TO_SUBMIT",
          label: "待提交",
        },
        {
          value: "SUBMIT",
          label: "已提交",
        },
        {
          value: "SUBMIT_FAILED",
          label: "提交失败",
        },
        {
          value: "SENT",
          label: "已发出",
        },
        {
          value: "DELIVERED",
          label: "已送达",
        },
        {
          value: "DISPLAYED",
          label: "已读",
        },
        {
          value: "FAILED",
          label: "发送失败",
        },
        {
          value: "SMS",
          label: "转短信",
        },
        {
          value: "ABNORMAL",
          label: "系统异常",
        },
        {
          value: 'REVOKED',
          label: '已撤销'
        },
        // {
        //   value: 'REVOKE_FAILED',
        //   label: '撤销失败'
        // }
      ], //状态
      tableData: [],
      msgs:[],
      multipleSelection: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      tableHeight: window.innerHeight - 310 + "",
      flag: false,
      iamgeLeftUrl: require("../../assets/icon-14px-音频@1x.png"),
      imageRightUrl: require("../../assets/icon-14px-播放@1x.png"),
      duration: "1", //音频时长
      time: "",
      drawer: false,
      direction: 'rtl',
      loading: false,
      chatLoading: false,
      detailSizeDown: 10,
      detailSizeUp: 10,
      tempData: '',
      tempMsg: '' // 用来存放纪录列表
    };
  },
  methods: {
    test(scope){
      console.log(scope)
    },
    // 切换tab页
    handleClick(tab, event) {
      console.log(tab.name)
      this.activeName = tab.name
    },
    // 获取收发记录
    getRecordList() {
      const that = this
      this.loading = true
      const query = {
        enterpriseAccountAppId: this.enterpriseAccountAppId,
        currentPage: this.currentPage,
        direction: this.direction1,
        messageMouldId: this.messageMouldId,
        pageSize: this.pageSize,
        searchContent: this.searchContent,
        status: this.status   // 状态
      }
      if (this.status == '') {
        delete query.status
      }
      if (this.direction1 == '') {
        delete query.direction
      }
      getRecord(query).then(res => {
        if (res.data.status == 0) {
          const data = res.data.data
          this.currentPage = data.current
          this.pageSize = data.size
          this.total = data.total
          data.records.forEach(item => {
            item.enterpriseAccountApp = that.findAppByid(item.enterpriseAccountAppId)
            item.directions = that.findDirectionByid(item.direction)
            item.messageMould = that.findTemplateByid(item.messageMouldId)
            item.status_send  = that.findStatusByid(item.status)
            item.messageContent.messageMouldCards = item.messageContent.cardList
          })
          this.tableData = data.records
        } else {
          this.$message({
            type: res.data.status === 2 ? 'warning':'error',
            message: res.data.message,
            center: true
          })
        }
        this.loading = false
      }).catch(error => {
        this.loading = false
        this.$message({
            type: 'error',
            message: error,
            center: true
          })
      })
    },
    // 获取应用列表
    getDataList() {
      // const query = {
      //   enterpriseId: getCookie('enterpriseId')
      // }
      this.loading = true
      getAppLists().then(res => {
        if (res.data.status == 0) {
          const data = res.data.data
          data.forEach(item => {
            const val = {}
            val.value = item.id
            val.label = item.name
            this.optionsList01.push(val)
          })
          // console.log(this.optionsList01)
        } else {
          this.$message({
            type: res.data.status === 2 ? 'warning':'error',
            message:res.data.message,
            center:true
          })
        }
        this.loading = false
      }).catch(error => {
        this.$message.error({
          message:error,
          center:true
        })
        this.loading = false
      })
    },
    // 获取消息模板列表
    getMessageLists() {
      getMessageList().then(res => {
        if (res.data.status == 0) {
          const data = res.data.data
          // console.log(data)
          data.forEach(item => {
            const val = {
              label: item.name,
              value: item.id,
            }
            this.optionsList02.push(val)
          })
        } else {
          this.$message({
            type: res.data.status === 2 ? 'warning':'error',
            message:res.data.message,
            center:true
          })
        }
      }).catch(error => {
        this.$message.error({
          message:error,
          center:true
        })
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 撤回消息
    deleteRow(val) {
      // console.log(val)
      const query = {
        businessId : val.id,
        // phoneNumber: val.phoneNumber,
        // enterpriseAccountAppId: val.enterpriseAccountAppId,
        // channel: "HW",  // 通道
        // sendingMode: 'ACTIVE'  // ACTIVE  群发   PASSIVE  私发
      }
      // console.log(query)
      withdraw(query).then(res => {
        if (res.data.status == 0) {
          this.$message({
            type: 'success',
            message: '撤回成功!',
            center: true
          })
          this.getRecordList()
        } else {
          this.$message({
            type: 'error',
            message: res.data.message,
            center: true
          })
        }
      }).catch((error) => {
      this.$message({
          type: 'error',
          message: error,
          center: true
        })
      })
    },
    // 不允许撤回
    notAllowWithDraw() {
      this.$confirm('撤回失败', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        confirmButtonClass:'btn-custom-confirm',
        center:true
      }).then(() => {}).catch(() => {})
    },
    downLoad(fileName, url) {
      // this.getUrlToBase(url).then(dataUrl => {
      //   let downLink = document.createElement('a')
      //   downLink.style = 'display: none'
      //   downLink.download = fileName
      //   downLink.href = dataUrl
      //   document.body.appendChild(downLink)
      //   downLink.click()
      //   document.body.removeChild(downLink)
      // })
      download(url, fileName);
    },
    getUrlToBase(url) {
      return new Promise(reslove => {
        let canvas = document.createElement('canvas')
        let ctx = canvas.getContext("2d")
        let img = new Image()
        img.crossOrigin = "Anonymous" // 允许跨域
        img.src = url
        img.onload = function() {
          canvas.height = img.width
          canvas.height = img.height
          ctx.drawImage(img, 0, 0, img.width, img.height)
          let dataUrl = canvas.toDataURL(url)
          canvas = null
          reslove(dataUrl)
        }
      })
    },
    search() {
      this.getRecordList()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getRecordList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getRecordList()
    },
    handlePlay() {
      //播放音频
      this.flag = !this.flag;
      if (this.flag) {
        this.$refs.audio.play();
        this.duration = this.$refs.audio.duration;
        this.iamgeLeftUrl = require("../../assets/音频播放动效10.gif");
        this.imageRightUrl = require("../../assets/icon-14px-暂停@1x.png");
      } else {
        this.$refs.audio.pause();
        this.iamgeLeftUrl = require("../../assets/icon-14px-音频@1x.png");
        this.imageRightUrl = require("../../assets/icon-14px-播放@1x.png");
      }
    },
    handleDetails(val1, val2){
        //查看记录
        this.drawer = true;
        // console.log(val2)
        // this.tempMsg = val2
        this.tempData = val2
        // console.log(this.tempData)
        const query = {
          phoneNumber: this.tempData.messageContent.phoneList,
          scrollType: "DOWN",
          sendTime: this.tempData.sendTime ? this.tempData.sendTime : this.tempData.createTime,
          size: this.detailSizeDown
        }
        // console.log(query)
        this.chatLoading = true
        this.getRecordDetail(query)
    },
    //获取聊天记录
    getRecordDetail(val) {
      recoedDetail(val).then(res => {
        if (res.data.status == 0) {
          const data = res.data.data
          data.unshift(this.tempData)
          data.forEach(item => {
            item.appName = this.findAppByid(item.enterpriseAccountAppId)
            item.messageContent.messageMouldCards = item.messageContent.cardList
          })
          // this.msgs = data
          for(let i=0;i< data.length;i++) {
            this.$set(this.msgs, i, data[i])
          }
          // console.log(this.msgs)
          this.$nextTick(() => {
            const scrollEvent = this.$refs.chattingContent
            scrollEvent.scrollTo(0,10)
          })
        } else {
          this.$message({
            type: 'error',
            message: '获取收发记录失败',
            center: true
          })
        }
        this.chatLoading = false
      }).catch(error => {
        this.$message({
          type: 'error',
          message: error,
          center: true
        })
        this.chatLoading = false
      })
    },
    // 获取记录
    getRecordMemory(val) {
      this.chatLoading = true
      // const scrollEvent = this.$refs.chattingContent
      // console.log(scrollEvent.scrollHeight)
      recoedDetail(val).then(res => {
        // console.log(res.data.data)
        if (res.data.status == 0) {
          const data = res.data.data
          if (val.scrollType == 'DOWN') {
            const temp = data.slice(this.msgs.length)
            console.log(data)
            console.log(temp)
            temp.forEach(item => {
              this.msgs.push(item)
            })
          } else if (val.scrollType == 'UP'){
            const temp = data.slice(this.msgs.length)
            // console.log(temp.length)   //此次添加的数组的长度
            temp.forEach(item => {
              this.msgs.unshift(item)
            })
            // console.log(this.msgs.length)
            this.$nextTick(() => {
              if (this.msgs.length -1 > temp.length && temp != 0) {
                // console.log(document.getElementsByClassName('msg-from')[temp.length -1])
                // console.log(document.getElementsByClassName('msg-from')[temp.length -1].offsetTop)
                const scrollHeight = document.getElementsByClassName('msg-from')[temp.length -1].offsetTop
                const scrollEvent = this.$refs.chattingContent
                scrollEvent.scrollTop =  scrollHeight
              }
            })
          }
        } else {
          this.$message({
            type: 'error',
            message: '获取收发记录失败',
            center: true
          })
        }
        this.chatLoading = false
      }).catch((error) => {
        this.$message({
          type: 'error',
          message: error,
          center: true
        })
        this.chatLoading = false
      })
    },
    // 根据应用ID匹配应用
    findAppByid(val) {
      // console.log(this.optionsList01)
      let temp = ''
      this.optionsList01.map(item => {
        if (val == item.value) {
          temp =  item.label
        }
      })
      return temp
    },
    // 根据模板id匹配模板
    findTemplateByid(val) {
      let temp = ''
      this.optionsList02.forEach(item => {
        if (val == item.value) {
          temp = item.label
        }
      })
      return temp
    },
    // 根据方向值匹配方向
    findDirectionByid(val) {
      let temp = ''
      this.optionsList03.map(item => {
        if (val == item.value) {
          temp = item.label
        }
      })
      return temp
    },
    // 根据状态值配置状态
    findStatusByid(val) {
      let temp = ''
      this.optionsList04.map(item => {
        if (val == item.value) {
          temp = item.label
        }
      })
      return temp
    },
    // 刷新
    refresh() {
      this.clear()
      this.getRecordList()
    },
    // 清空搜索条件
    clear() {
      this.enterpriseAccountAppId = '',
      this.messageMouldId = '',
      this.direction1 = '',
      this.status = '',
      this.searchContent = ''
    },
    // 监听页面滚动
    chatScroll() {
      const scrollEvent = this.$refs.chattingContent
      // console.log(scrollEvent.scrollTop)
      if ((scrollEvent.scrollTop + scrollEvent.clientHeight) == scrollEvent.scrollHeight) {
          this.detailSizeDown += 5
          const query = {
            phoneNumber: this.tempData.messageContent.phoneList,
            scrollType: "DOWN",
            sendTime: this.tempData.sendTime ? this.tempData.sendTime : this.tempData.createTime,
            size: this.detailSizeDown
          }
          this.chatLoading = true
          this.getRecordMemory(query)
      } else if (scrollEvent.scrollTop == 0) {
        // console.log('向上获取聊天记录')
        this.detailSizeUp += 5
        const query = {
            phoneNumber: this.tempData.messageContent.phoneList,
            scrollType: "UP",
            sendTime: this.tempData.sendTime ? this.tempData.sendTime : this.tempData.createTime,
            size: this.detailSizeUp
          }
          this.getRecordMemory(query)
      }
      this.chatLoading = false
    },
    // 回车事件
    keyDown(e) {
      if (e.keyCode == 13) {
        this.getRecordList()
      }
     }
  },
  created() {
    this.getMessageLists()
    this.getDataList()
  },
  mounted() {
    window.addEventListener("keydown", this.keyDown);
  },
  watch: {
    optionsList01(){
      this.getRecordList()
    },
    optionsList02() {
      this.getRecordList()
    },
    enterpriseAccountAppId() {
      this.currentPage = 1
    },
    messageMouldId() {
      this.currentPage = 1
    },
    direction1() {
      this.currentPage = 1
    },
    status() {
      this.currentPage = 1
    },
    searchContent() {
      this.currentPage = 1
    }
  },
  components: {
    cardList, fileList, HTable
  },
  destroyed() {
    window.removeEventListener("keydown", this.keyDown, false);
    // window.removeEventListener("keydown", this.keyDown, false);
  }
};
</script>
<style lang="less" scoped>
#header {
  width: 100%;
  min-height: 100%;
  @vat: #666;
  .navW {
    width: 100%;
    min-height: 100%;
  }
  .navF {
    box-sizing: border-box;
    font-size: 14px;
  }
  .header {
    padding: 0 70px;
    box-sizing: border-box;
    .navW();
    /deep/ .el-drawer{
        width: 500px;
        height: 100%;
        .el-drawer__body{
            height: calc(100% - 80px);
        }
    }
    /deep/ .el-drawer:focus{
        outline: initial;
    }
    /deep/ .el-drawer__header>:first-child{
        color: #333;
        font-size: 14px;
        font-weight: 400;
        margin-left: 30px;
    }
    /deep/ .el-drawer__header>:first-child:focus{
        outline: initial;
    }
    /deep/ .el-drawer__header{
        border: 1px solid #e5e5e5;
        padding: 10px;
    }
    /deep/ .el-drawer__close-btn:focus{
        outline: initial;
    }
    /deep/ .el-dialog__close:focus{
        outline: initial;
    }
    .chatting-content {
      flex: 1;
      width: 100%;
      height: 100%;
      background-color: #fff;
      overflow: auto;
      .chatting-item {
        padding: 10px;
        box-sizing: border-box;
        width: 100%;
        .msg-date {
          text-align: center;
          color: gray;
          font-size: 80%;
        }
        .msg-from {
          display: flex;
          align-items: center;
          user-select: none;
          span.loc {
            color: gray;
            font-size: 60%;
            margin-right: 5px;
          }
          .msg-author {
            font-size: 12px;
            color: @vat;
          }
          img {
            width: 40px;
            height: 40px;
            border-radius: 20px;
          }
        }
        .msg-content {
          margin-top: 10px;
          max-width: 340px;
          background-color: #F6F6F6;
          width: fit-content;
          padding: 16px 22px;
          font-size: 14px;
          color: #333;
        //   /deep/ .expandCardList .cardList{
        //       margin: 0 !important;
        //   }
        }
      }
      .none-message{
        display: flex;
        justify-content: center;
        color: grey;
      }
      .chatting-item + .chatting-item {
        margin-top: 10px;
      }
      .self {
        .msg-from {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          img {
            margin-left: 12px;
          }
        }
        .msg-content {
          float: right;
          word-wrap: break-word;
          word-break: break-all;
          margin-left: 60px;
          margin-right: 60px;
        }
      }
      .other {
        .msg-from {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          img {
            margin-right: 12px;
          }
        }
        .msg-content {
          float: left;
          margin-left: 60px;
          margin-right: 60px;
          word-wrap: break-word;
          word-break: break-all;
        }
      }
      .online {
        width: 200px;
        // max-width: 100%;
        margin: 3px auto;
        border-radius: 4px;
        text-align: center;
        background-color: #FFFDE7;
      }
      .clearfix {
        *zoom: 1;
      }
      .clearfix:after {
        content: "";
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
      }
  }
  }
  .title {
    height: 90px;
    font-size: 20px;
    line-height: 80px;
    box-sizing: border-box;
    // padding-left: 70px;
    padding-top: 10px;
  }
  .table {
    height: calc(100% - 90px);
    .text {
        width: 330px;
        background-color: #fff;
        border: 1px solid #e5e5e5;
        border-radius: 4px;
        padding: 0 30px;
        box-sizing: border-box;
        .textTop {
          margin: 15px 0px;
          word-break:break-all;
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
          padding: 20px 0;
          border-top: 1px solid #e5e5e5;
          display: flex;
          .btn {
            // width: 79px;
            height: 34px;
            display: block;
            line-height: 34px;
            text-align: center;
            border: 1px solid #e5e5e5;
            border-radius: 34px;
            margin-right: 16px;
            padding: 0 10px;
            box-sizing: border-box;
            cursor: pointer;
          }
          .btn:nth-of-type(3n) {
            margin-right: 0;
          }
        }
      }
    .tableT {
      height: 60px;
      //   line-height: 60px;
      box-sizing: border-box;
      // padding-left: 70px;
      .el-button-group {
        margin-right: 5px;
      }
      .el-select {
        margin-right: 5px;
      }
      .el-input {
        width: 160px;
        .el-icon-search {
          cursor: pointer;
        }
      }
      /deep/ .el-input__inner {
        width: 160px;
      }
    }
    .tableF {
      width: 100%;
      box-sizing: border-box;
      // padding: 0 70px;
      /deep/ .el-table .cell {
        display: flex;
        // justify-content: space-around;
        // align-items: center;
        .el-button--small,
        .el-button--small.is-round {
          padding: 0;
        }
      }
      /deep/ .el-table__expanded-cell[class*="cell"] {
        background: #f8f8fb;
      }
      /deep/ .el-table__expanded-cell[class*="cell"]:hover {
        background: #f8f8fb !important;
      }
      /deep/ .el-table__row td:nth-child(1) div {
        display: flex;
        justify-content: center;
        align-items: center;
        // text-align: center !important;
      }
      .expandAudio {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .audio {
        width: 178px;
        height: 72px;
        border: 1px solid #e5e5e5;
        background: #ffffff;
        float: left;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .iamgeLeft {
          margin-left: 5px;
          cursor: pointer;
        }
        .imageRight {
          margin-right: 5px;
          cursor: pointer;
        }
      }
      .dowImage {
        float: right;
        padding: 0;
      }
    }
    .pagination {
      width: 100%;
      height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 70px;
      box-sizing: border-box;
    }
  }
}
</style>
<style>
.btn-custom-cancel{
    float: right;
    /* margin-left: 10px; */
  }
</style>
