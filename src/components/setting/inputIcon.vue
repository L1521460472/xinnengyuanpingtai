<template>
  <div>
    <el-input placeholder="请选择图标" :value="iconvalue" @input="changeValue" size="small">
      <template slot="append">
        <el-button slot="append" icon="el-icon-search" size="small" @click="openDialog"></el-button>
      </template>
    </el-input>
    <el-dialog
      title="请选择图标"
      :visible.sync="dialogVisible"
      width="60%"
      append-to-body
      :before-close="handleClose">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="常用" name="first">
            <div>
              <i v-for="(item,index) in icons" :key="index" :class="item" class="icon-item" @click="changeIcons(item)"></i>
            </div>
          </el-tab-pane>
          <el-tab-pane label="北斗" name="second">
            <div>
              <i v-for="(item,index) in icons2" :key="index" :class="item" class="icon-item" @click="changeIcons(item)"></i>
            </div>
          </el-tab-pane>
        </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'input-icon',
  props: {
    icon: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      iconvalue: this.icon,  // input 输入框的值
      dialogVisible: false, // 控制弹框的弹出
      activeName: 'first',
      icons: ['el-icon-delete-solid', 'el-icon-delete', 'el-icon-s-tools', 'el-icon-setting',
              'el-icon-user-solid',  'el-icon-user', 'el-icon-phone', 'el-icon-more', 'el-icon-more-outline',
              'el-icon-star-on', 'el-icon-star-off', 'el-icon-warning', 'el-icon-warning-outline',
              'el-icon-question', 'el-icon-info', 'el-icon-remove', 'el-icon-circle-plus',
              'el-icon-success', 'el-icon-error', 'el-icon-zoom-in', 'el-icon-zoom-out', 'el-icon-remove-outline',
              'el-icon-circle-plus-outline', 'el-icon-circle-check', 'el-icon-circle-close', 'el-icon-s-help',
              'el-icon-minus', 'el-icon-plus', 'el-icon-check', 'el-icon-close', 'el-icon-picture', 'el-icon-picture-outline','el-icon-picture-outline-round',
              'el-icon-sold-out', 'el-icon-sell', 'el-icon-present', 'el-icon-box', 'el-icon-bank-card', 'el-icon-money',
              'el-icon-coin', 'el-icon-wallet', 'el-icon-discount', 'el-icon-price-tag', 'el-icon-news', 'el-icon-guide', 'el-icon-male',
              'el-icon-female', 'el-icon-thumb', 'el-icon-cpu', 'el-icon-link', 'el-icon-connection', 'el-icon-open', 'el-icon-turn-off',
              'el-icon-set-up', 'el-icon-chat-round', 'el-icon-chat-line-round', 'el-icon-chat-square', 'el-icon-chat-dot-round',
              'el-icon-chat-dot-square', 'el-icon-chat-line-square', 'el-icon-message', 'el-icon-postcard', 'el-icon-position',
              'el-icon-turn-off-microphone', 'el-icon-microphone', 'el-icon-close-notification', 'el-icon-bangzhu', 'el-icon-time',
              'el-icon-odometer', 'el-icon-crop', 'el-icon-aim', 'el-icon-switch-button', 'el-icon-full-screen', 'el-icon-copy-document',
              'el-icon-mic', 'el-icon-stopwatch', 'el-icon-medal-1', 'el-icon-medal', 'el-icon-trophy', 'el-icon-trophy-1', 'el-icon-first-aid-kit',
              'el-icon-discover', 'el-icon-place', 'el-icon-location', 'el-icon-location-outline', 'el-icon-location-information', 'el-icon-add-location',
              'el-icon-delete-location', 'el-icon-map-location', 'el-icon-alarm-clock',' el-icon-timer', 'el-icon-watch-1', 'el-icon-watch', 'el-icon-lock'
      ],
      icons2: [
        'el-icon-upload', 'el-icon-upload2', 'el-icon-download', 'el-icon-camera-solid', 'el-icon-camera', 'el-icon-video-camera-solid', 'el-icon-video-camera',
        'el-icon-message-solid', 'el-icon-bell', 'el-icon-s-cooperation', 'el-icon-s-order', 'el-icon-s-platform' ,'el-icon-s-fold',
        'el-icon-s-unfold', 'el-icon-s-operation', 'el-icon-s-promotion', 'el-icon-s-home', 'el-icon-s-release', 'el-icon-s-ticket',
        'el-icon-s-management', 'el-icon-s-open', 'el-icon-s-shop', 'el-icon-s-marketing', 'el-icon-s-flag', 'el-icon-s-comment',
        'el-icon-s-finance', 'el-icon-s-claim', 'el-icon-s-custom', 'el-icon-s-opportunity' ,'el-icon-s-data', 'el-icon-s-check', 'el-icon-s-grid',
        'el-icon-menu', 'el-icon-share', 'el-icon-d-caret', 'el-icon-caret-left', 'el-icon-caret-right', 'el-icon-caret-bottom',' el-icon-caret-top',
        'el-icon-bottom-left', 'el-icon-bottom-right',' el-icon-back',' el-icon-right', 'el-icon-bottom', 'el-icon-top', 'el-icon-top-left',
        'el-icon-top-right', 'el-icon-arrow-left', 'el-icon-arrow-right', 'el-icon-arrow-down', 'el-icon-arrow-up', 'el-icon-d-arrow-left',
        'el-icon-d-arrow-right', 'el-icon-video-pause', 'el-icon-video-play', 'el-icon-refresh', 'el-icon-refresh-right', 'el-icon-refresh-left',
        'el-icon-finished', 'el-icon-sort', 'el-icon-sort-up', 'el-icon-sort-down', 'el-icon-rank', 'el-icon-loading', 'el-icon-view',
        'el-icon-c-scale-to-original', 'el-icon-date', 'el-icon-edit','el-icon-edit-outline', 'el-icon-folder', 'el-icon-folder-opened',
        'el-icon-folder-add', 'el-icon-folder-remove', 'el-icon-folder-delete', 'el-icon-folder-checked', 'el-icon-tickets',
        'el-icon-document-remove', 'el-icon-document-delete', 'el-icon-document-copy', 'el-icon-document-checked',
        'el-icon-document', 'el-icon-document-add', 'el-icon-printer', 'el-icon-paperclip', 'el-icon-takeaway-box',
        'el-icon-search', 'el-icon-monitor', 'el-icon-attract', 'el-icon-mobile', 'el-icon-scissors', 'el-icon-umbrella',
        'el-icon-headset', 'el-icon-brush', 'el-icon-mouse', 'el-icon-coordinate', 'el-icon-magic-stick', 'el-icon-reading',
        'el-icon-data-line', 'el-icon-data-board', 'el-icon-pie-chart', 'el-icon-data-analysis', 'el-icon-collection-tag',
        'el-icon-film' , 'el-icon-suitcase', 'el-icon-suitcase-1', 'el-icon-receiving', 'el-icon-collection', 'el-icon-files',
        'el-icon-notebook-1', 'el-icon-notebook-2', 'el-icon-toilet-paper', 'el-icon-office-building', 'el-icon-school',
        'el-icon-table-lamp', 'el-icon-house', 'el-icon-no-smoking', 'el-icon-smoking', 'el-icon-shopping-cart-full',
        'el-icon-shopping-cart-1', 'el-icon-shopping-cart-2', 'el-icon-shopping-bag-1', 'el-icon-shopping-bag-2'
      ]
    }
  },
  methods: {
    openDialog() {
      this.dialogVisible = true
    },
    getIcons() {
      this.$emit('getValues', '')
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    handleClick(tab, event) {
      
    },
    changeIcons(val) {
      this.iconvalue = val
      this.dialogVisible = false
    },
    changeValue(val) {
      this.iconvalue = val
    }
  }
}
</script>
<style scoped>
  /deep/ .el-dialog__footer{
    text-align: center;
  }
  /deep/ .el-dialog__header {
    border-bottom: 1px solid #eee;
  }
  .icon-item{
    font-size: 32px;
    padding: 20px;
  }
  .icon-item:hover{
    transform: scale(1.2);
  }
</style>
