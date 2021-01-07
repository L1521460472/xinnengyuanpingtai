<template>
  <div class="expandAudio">
    <audio ref="audio" @ended="handleEnded" @loadedmetadata="handleDuration" @timeupdate="handlePlaying" preload readyState>
      <source src="../../assets/梦然 - 少年 (DJ阿祥版).mp3" type="audio/mpeg" />
    </audio>
    <div class="audio">
      <img class="iamgeLeft" :src="iamgeLeftUrl" alt="" />
      {{ duration }}
      <img class="imageRight" @click="handlePlay" :src="imageRightUrl" alt="" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'audioList',
  data() {
    return {
      currentTime: '0:00',
      duration: '10s',
      iamgeLeftUrl: require('../../assets/icon-14px-音频@1x.png'),
      imageRightUrl: require('../../assets/icon-14px-播放@1x-1.png'),
      flag: false,
    }
  },
  methods: {
    handlePlay() {
      //播放音频
      this.flag = !this.flag
      if (this.flag) {
        this.$refs.audio.play()
        this.iamgeLeftUrl = require('../../assets/音频播放动效10.gif')
        this.imageRightUrl = require('../../assets/icon-14px-暂停@1x.png')
      } else {
        this.$refs.audio.pause()
        this.iamgeLeftUrl = require('../../assets/icon-14px-音频@1x.png')
        this.imageRightUrl = require('../../assets/icon-14px-播放@1x-1.png')
      }
    },
    handleEnded() {
      this.$refs.audio.pause()
      this.iamgeLeftUrl = require('../../assets/icon-14px-音频@1x.png')
      this.imageRightUrl = require('../../assets/icon-14px-播放@1x-1.png')
    },
    handleDuration() {
      var h = Math.floor(this.$refs.audio.duration / 360)
      var m =
        Math.floor(this.$refs.audio.duration / 60) < 10
          ? '0' + Math.floor(this.$refs.audio.duration / 60)
          : Math.floor(this.$refs.audio.duration / 60)
      var s = Math.floor(this.$refs.audio.duration % 60)
      var str = h > 0 ? h + ':' + m + ':' + s : m + ':' + s
      this.duration = str
    },
    handlePlaying(e) {
      var h = Math.floor(e.target.currentTime / 360)
      var m =
        Math.floor(e.target.currentTime / 60) < 10
          ? '0' + Math.floor(e.target.currentTime / 60)
          : Math.floor(e.target.currentTime / 60)
      var s =
        Math.floor(e.target.currentTime % 60) < 10
          ? '0' + Math.floor(e.target.currentTime % 60)
          : Math.floor(e.target.currentTime % 60)
      var str = h > 0 ? h + ':' + m + ':' + s : m + ':' + s
      this.currentTime = str
    },
  },
  mounted() {},
}
</script>
<style lang="less" scoped>
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
</style>
