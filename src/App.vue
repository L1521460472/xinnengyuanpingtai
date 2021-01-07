<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Microsoft YaHei;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color:#333333;
}
/* 交换confirmz弹窗确认按钮位置 */
.btn-custom-confirm{
  float: left !important;
  /* margin-left: 10px; */
}
/* .el-message-box__btns button:nth-child(2) {
    margin-right: 10px;
} */
.el-message-box__btns{
  padding:  5px 130px 0 !important;
}
/* 兼容safari浏览器，防止表头错位 */
.el-table__body {
  width: 100%;
  table-layout: fixed !important;
}
/* 设置el-tooltip宽度 */
.el-tooltip__popper{
  max-width: 300px!important;
}
/* 去掉el-tooltip聚焦边框 */
.el-tooltip:focus{
  outline: 0 !important;
}
.v-modal{
  top:60px !important;
}
.el-drawer__wrapper{
  top: 60px !important
}
*{
  -webkit-tap-highlight-color: rgba(0,0,0,0);
}
input{
  outline: none
}
.el-tabs__item:focus.is-active.is-focus:not(:active) {
  box-shadow: none;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}
/* 抽屉超出滚动 */
.el-drawer__open .el-drawer.rtl{
  overflow-y: auto;
}
.el-tree-node__content>.el-tree-node__expand-icon{
  width: 12px;
  height: 12px;
}
/* 操作图标居中 */
.operation {
  margin-left: 10px;
  display: block;
  float: left;
  cursor: pointer;
}
</style>
