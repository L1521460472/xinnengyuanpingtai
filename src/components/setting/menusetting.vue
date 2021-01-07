<template>
  <div>
    <div class="header-title">菜单管理</div>
    <div class="menu_item">
      <el-button size="small" type="primary" icon="el-icon-plus" @click="addMenu">新增</el-button>
    </div>
    <div class="table-content">
      <el-table
      :data="tableData"
      size="mini"
      row-key="id"
      :header-cell-style="{ background: '#fafafa', color: '#333333' }"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      border >
        <!-- <el-table-column label="#" type="index" width="50" align="center"></el-table-column> -->
        <el-table-column label="菜单名称" align="center" prop="name" width="120"></el-table-column>
        <el-table-column label="类型" align="center" prop="type" width="50">
          <template slot-scope="scope">
            <span v-if="scope.row.type == 1">菜单</span>
            <span v-if="scope.row.type == 2">按钮</span>
          </template>
        </el-table-column>
        <el-table-column label="排序" align="center" prop="rank" width="80"></el-table-column>
        <el-table-column label="编码" align="center" prop="code" width="80"></el-table-column>
        <el-table-column label="API" align="center" prop="api" width="200"></el-table-column>
        <el-table-column label="菜单图标" align="center" prop="icon" width="80">
          <template slot-scope="scope">
            <i :class="scope.row.icon"></i>
          </template>
        </el-table-column>
        <el-table-column label="路由地址" align="center" prop="url"></el-table-column>
        <el-table-column label="描述" align="center" prop="content" width="200"></el-table-column>
        <el-table-column label="操作" align="center" width="150">
          <template slot-scope="scope">
            <!-- <el-button type="text" icon="el-icon-view" size="mini">查看</el-button> -->
            <el-button type="text" icon="el-icon-edit" size="mini" @click="editMenu(scope.row)">编辑</el-button>
            <el-button type="text" icon="el-icon-delete" size="mini" @click="deleteMenu(scope.row)">删除</el-button>
            <!-- <el-button type="text" icon="el-icon-plus" size="mini">新增子项</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="菜单" :visible.sync="menuVisible">
      <el-form :model="formData" label-width="80px" :rules="rules" ref="form">
        <el-row>
          <el-col :span="12">
            <el-form-item label="类型" prop="type">
              <el-radio-group v-model="formData.type">
                <el-radio :label="1">菜单</el-radio>
                <el-radio :label="2">按钮</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="菜单名称" prop="name">
              <el-input v-model="formData.name" size="small"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <template v-if="formData.type == 1">
          <el-row>
            <el-col :span="12">
              <el-form-item label="上级菜单">
                <!-- <el-input v-model="formData.code" size="small"></el-input> -->
                <el-cascader
                  size="small"
                  v-model="formData.parentId"
                  :options="options"
                  ref="refHandle"
                  :show-all-levels="false"
                  :props="{ checkStrictly: true }"
                  @change="handleChange"
                  clearable
                  style="width:100%"
                ></el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="排序">
                <el-input v-model="formData.rank" size="small" type="number"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="图标">
                <inputIcon v-model="formData.icon"></inputIcon>
                <!-- <el-input v-model="formData.icon" size="small"></el-input> -->
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="路由">
                <el-input v-model="formData.url" size="small"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="描述">
              <el-input v-model="formData.content" type="textarea"></el-input>
            </el-form-item>
          </el-row>
        </template>
        <template v-else>
          <el-row>
            <el-col :span="12">
              <el-form-item label="上级菜单">
                <!-- <el-input v-model="formData.code" size="small"></el-input> -->
                <el-cascader
                  size="small"
                  v-model="formData.parentId"
                  :options="options"
                  ref="refHandle"
                  :show-all-levels="false"
                  :props="{ checkStrictly: true }"
                  @change="handleChange"
                  clearable
                  style="width:100%"
                ></el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="API">
                <el-input v-model="formData.api" size="small"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="编码">
                <el-input v-model="formData.code" size="small"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="描述">
                <el-input v-model="formData.content" type="textarea" :autosize="{minRows: 1, maxRows: 2}"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </template>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="menuVisible = false" size="small">取 消</el-button>
        <!-- 新增 新增的时候因为有两个接口  -->
        <template v-if="!editStatus">
          <el-button type="primary" @click="submitMenu" size="small" v-if="formData.type == 1">确 定</el-button>
          <el-button type="primary" @click="submitButtons" size="small" v-else>确 定</el-button>
        </template>
        <!-- 编辑 编辑更新的时候只有一个接口 -->
        <el-button type="primary" @click="updateMenus" size="small" v-else>确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getMenus, addMenu, updateMenu, deleteMenu, addBtn } from '../../api/setting/menu'
import inputIcon from './inputIcon'
export default {
  data() {
    return {
      tableData: [],
      rules: {
        name: [
          { required: true, message: "请输入菜单名", trigger: "blur" },
        ],
        // parentId: [{ required: true, message: "请输入密码", trigger: "blur" }],
        type: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      },
      formData: {
        name: '',
        type: 1,
        rank: '',
        code: '',
        url: '',
        content: '',
        api: '',
        parentId: '',
        icon: ''
      },
      menuVisible: false,
      options: [], // 上级菜单选项
      editStatus: false, // 判断是新增还是编辑
    }
  },
  components: {
    inputIcon
  },
  methods: {
    // 获取所有菜单列表
    getMenuLsit() {
      getMenus().then(res => {
        if (res.data.status == 0) {
          this.tableData = res.data.data
          this.options = this.getTreeData(res.data.data)
        } else {
          this.$message({
            type: res.data.status === 2 ? 'warning':'error',
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
    // 打开新增弹窗
    addMenu() {
      this.menuVisible = true
      this.clearForm()
      this.editStatus = false
    },
    // 处理属性数据
    getTreeData(data) {
      const temp = []
      for (var i = 0; i < data.length; i++) {
        const val = {}
        val.label = data[i].name
        val.value = data[i].id
        if (data[i].children) {
          const arr = []
          data[i].children.forEach(item => {
            const res = {
              label: item.name,
              value: item.id
            }
            arr.push(res)
          })
          val.children = arr
        }
        temp.push(val)
        // if (data[i].children.length < 1) {

        //   // children若为空数组，则将children设为undefined
        //   data[i].children = undefined;
        // } else {
        //   // children若不为空数组，则继续 递归调用 本方法
        //   this.getTreeData(data[i].children);
        // }
      }
      // 
      return temp;
    },
    //
    handleChange() {

    },
    // 确定新增菜单
    submitMenu() {
      let query = {}
      if (this.formData.type == 1) {  // 菜单
        query = {
          content: this.formData.content,
          icon: this.formData.icon,
          menuRank: this.formData.rank,
          name: this.formData.name,
          parentId: this.formData.parentId == '' ? '' : this.formData.parentId[0],
          url: this.formData.url
        }
      } else if (this.formData.type == 2) {
        query = {
          content: this.formData.content,
          code: this.formData.code,
          menuRank: this.formData.rank,
          name: this.formData.name,
          parentId: this.formData.parentId == '' ? '' : this.formData.parentId[0],
          api: this.formData.api
        }
      }
      this.$refs.form.validate(vaild => {
        if (vaild) {
          addMenu(query).then(res => {
            if (res.data.status == 0) {
              this.$message({
                type: 'success',
                message: '新增成功!',
                center: true
              })
              this.menuVisible = false
              this.getMenuLsit()
            } else {
              this.$message({
                type: 'error',
                message: '新增失败!',
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
        } else{
          return false
        }
      })
    },
    // 新增按钮
    submitButtons() {
      const query = {
        list: [
          {
            api: this.formData.api,
            code: this.formData.code,
            content: this.formData.content,
            name: this.formData.name
          }
        ],
        parentId: this.formData.parentId == '' ? '' : this.formData.parentId.slice(-1)[0],
      }
      addBtn(query).then(res => {
        if (res.data.status == 0) {
          this.$message({
            type: 'success',
            message: '新增成功!',
            center: true
          })
          this.menuVisible = false
          this.getMenuLsit()
        } else {
          this.$message({
            type: 'error',
            message: res.data.message,
            center: true
          })
        }
      }).catch(error => {
        this.$message({
          type: 'error',
          message: error,
          center: true
        })
      })
    },
    // 编辑菜单
    editMenu(val) {
      this.clearForm()
      const temp = Object.assign({}, val)
      
      this.editStatus = true
      this.formData = temp
      this.menuVisible = true
    },
    // 确定更新编辑菜单
    updateMenus() {
      let query = {}
      if (this.formData.type == 1) {  // 菜单
        query = {
          content: this.formData.content,
          icon: this.formData.icon,
          id: this.formData.id,
          menuRank: this.formData.rank,
          menuType: this.formData.type,
          name: this.formData.name,
          parentId: this.formData.parentId == null ? '' : this.formData.parentId[0],
          url: this.formData.url
        }
      } else if (this.formData.type == 2) {  // 按钮
        query = {
          api: this.formData.api,
          code: this.formData.code,
          content: this.formData.content,
          id: this.formData.id,
          menuType: this.formData.type,
          name: this.formData.name,
          parentId: this.formData.parentId == null ? '' : this.formData.parentId[0]
        }
      }
      this.$refs.form.validate(vaild => {
        if (vaild) {
          updateMenu(query).then(res => {
            if (res.data.status ==0) {
              this.$message({
                type: 'success',
                message: '更新成功!',
                center: true
              })
              this.menuVisible = false
              this.getMenuLsit()
            } else {
              this.$message({
                type: 'error',
                message: res.data.message,
                center: true
              })
            }
          }).catch(error => {
            this.$message({
              type: 'error',
              message: error,
              center: true
            })
          })
        } else{
          return false
        }
      })
    },
    // 删除菜单
    deleteMenu(val) {
      
      const query = {
        id: val.id,
        menuType: val.type
      }
      deleteMenu(query).then(res => {
        if (res.data.status == 0) {
          this.$message({
            type: 'success',
            message: '删除成功！',
            center: true
          })
          this.getMenuLsit()
        } else {
          this.$message({
            type: 'error',
            message: res.data.message,
            center: true
          })
        }
      }).catch(error => {
        this.$message({
          type: 'error',
          message: error,
          center: true
        })
      })
    },
    // 清空表单
    clearForm() {
      this.formData.name = ''
      this.formData.type = 1
      this.formData.rank = ''
      this.formData.code = ''
      this.formData.url = ''
      this.formData.content = ''
      this.formData.api = ''
      this.formData.parentId = ''
      this.formData.icon = ''
    },
    changeIcons(val) {
      this.formData.icon = val
    }
  },
  created() {
    this.getMenuLsit()
  }
}
</script>
<style scoped>
.header-title{
  height: 96px;
  line-height: 96px;
  margin-left: 70px;
  font-size: 20px;
}
.table-content{
  padding: 0 70px;
}
.menu_item{
  padding-left: 70px;
  padding-bottom: 12px;
}
/deep/ .el-dialog__footer {
  text-align: center;
}
</style>
