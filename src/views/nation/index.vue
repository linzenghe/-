<template>
  <div class="app-container">
    <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>标准化代码</el-breadcrumb-item>
      <el-breadcrumb-item>国家地区信息</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="filter-container">
      <el-form ref="filter" label-position="left" :model="listQuery">
        <el-row :gutter="10">
          <el-col :md="6" :lg="5">
            <el-form-item label="国家/地区代码：" label-width="102px" prop="countryCode">
              <el-input v-model="listQuery.countryCode" placeholder="请输入内容" />
            </el-form-item>
          </el-col>
          <el-col :md="6" :lg="5">
            <el-form-item label="国家/地区中文名：" label-width="116px" prop="countryNameZh">
              <el-input v-model="listQuery.countryNameZh" placeholder="请输入内容" />
            </el-form-item>
          </el-col>
          <el-col :md="6" :lg="5">
            <el-form-item label="国家/地区英文名：" label-width="116px" prop="countryNameEn">
              <el-input v-model="listQuery.countryNameEn" placeholder="请输入内容" />
            </el-form-item>
          </el-col>
          <el-col :md="6" :lg="3">
            <el-form-item label="是否有效：" label-width="70px" prop="validFlag">
              <el-select v-model="listQuery.validFlag" placeholder="请选择">
                <el-option v-for="(item,index) in validList" :key="index" :label="item.name" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :md="24" :lg="6">
            <el-button type="primary" @click="handleSearch">查 询</el-button>
            <el-button type="default" @click="moreFn">更多条件</el-button>
            <el-button type="default" icon="el-icon-refresh-right" @click="resetFn">重 置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="table-container">
      <div class="opt">
        <el-button plain type="plain" icon="el-icon-plus" class="btn-plain-primary" @click="handleAdd">新 增</el-button>
        <el-button plain type="default" icon="el-icon-download" class="btn-plain-success" @click="handleExport">导 出</el-button>
      </div>
      <table-component
        ref="tableComponent"
        :auth="tableHeight"
        :data="tableData"
        :options="options"
        :pagination="listQuery"
        :columns="columns"
        :operates="operates"
        @handleRowClick="handleRowClick"
        @handleSelectionChange="handleSelectionChange"
        @handleIndexChange="handleIndexChange"
        @handleSizeChange="handleSizeChange"
      />
    </div>
    <!-- 更多条件 -->
    <el-dialog title="更多条件" :visible.sync="dialogConditionVisible">
      <el-form>
        <el-row v-for="(item,index) in conditionList" :key="index" :gutter="20">
          <el-col :span="8">
            <el-form-item>
              <el-select v-model="item.name" style="width:100%">
                <el-option v-for="(option,sindex) in nameList" :key="sindex" :value="option.value" :label="option.label" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item>
              <el-select v-model="item.operator" placeholder="比较符">
                <el-option v-for="(option,sindex) in operatorsList" :key="sindex" :value="option" :label="option" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item>
              <el-input v-model="item.value" placeholder="条件值" />
            </el-form-item>
          </el-col>
          <el-col :span="4" class="opt-panel">
            <i class="el-icon-remove-outline" @click.prevent="removeCondition(item,index)" />
            <i v-if="index==conditionList.length-1" class="el-icon-circle-plus-outline" @click.prevent="addCondition(item,index)" />
          </el-col>
        </el-row>
        <el-form-item style="text-align:center">
          <el-button type="primary" @click.prevent="conditionSearch">查 询</el-button>
          <el-button type="primary">保 存</el-button>
          <el-button type="default" @click.prevent="resetConditionForm">重 置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 更新新增 -->
    <el-dialog :visible.sync="dialogFormVisible" width="80%" :show-close="false" class="form-dialog">
      <div class="form-dialog-header">
        <div class="header-title">标准化代码 > 国家/地区信息</div>
        <div class="header-opt">
          <el-button plain type="default" size="mini">历史信息</el-button>
          <el-button plain type="default" class="btn-plain-primary" icon="el-icon-plus" size="mini" @click="newMethod">新 增</el-button>
          <el-button plain type="default" class="btn-plain-success" icon="el-icon-check" size="mini" @click="chooseAddMethod">保 存</el-button>
          <el-button plain type="default" :disabled="dialogStatus !='update'" icon="el-icon-delete" size="mini" @click="handleDelete(temp)">删 除</el-button>
          <el-button plain type="default" icon="el-icon-close" size="mini" @click="closeDialog">关 闭</el-button>
        </div>
      </div>
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        class="dialog-form"
      >
        <div class="form-title">
          <span>国家/地区信息</span>
        </div>
        <el-row :gutter="10">
          <el-col :span="6">
            <el-form-item label="国家/地区代码：" label-width="112px" prop="countryCode">
              <el-input v-model="temp.countryCode" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="国家/地区中文名：" label-width="126px" prop="countryNameZh">
              <el-input v-model="temp.countryNameZh" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="国家/地区英文名：" label-width="126px" prop="countryNameEn">
              <el-input v-model="temp.countryNameEn" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="是否有效：" label-width="82px" prop="validFlag">
              <el-select v-model="temp.validFlag" placeholder="请选择">
                <el-option v-for="(option,sindex) in validFlagList" :key="sindex" :value="option.value" :label="option.label" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <!-- <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          {{ $t('table.cancel') }}
        </el-button>
        <el-button type="primary" @click="chooseAddMethod">
          {{ $t('table.confirm') }}
        </el-button>
      </div> -->
    </el-dialog>
  </div>
</template>
<script>
import tableComponent from '@/components/TableComponent'
import { queryCountry, addCountry, updateCountry, deleteCountry, exportCountry } from '@/api/country'
import { parseDsErrorMessage } from '@/utils/responseUtil'
export default {
  components: { tableComponent },
  data() {
    return {
      dialogConditionVisible: false,

      conditionList: [{
        name: 'countryCode',
        operator: '',
        value: ''
      }],
      nameList: [{
        label: '国家/地区代码',
        value: 'countryCode'
      }, {
        label: '国家/地区中文名',
        value: 'countryNameZh'
      }, {
        label: '国家/地区英文名',
        value: 'countryNameEn'
      }, {
        label: '是否有效',
        value: 'validFlag'
      }, {
        label: '创建人',
        value: 'creator'
      }],
      operatorsList: ['=', '!=', '>', '>=', '<', '<=', '包含', '介于', '不包含', '从属于'],
      validList: [{ name: '生效', value: 1 }, { name: '失效', value: 0 }],
      validFlagList: [{ label: '生效', value: true }, { label: '失效', value: false }],
      tableData: [],
      tableHeight: '', // 高度
      // table 的参数
      options: {
        border: true,
        stripe: true, // 是否为斑马纹 table
        loading: false, // 是否添加表格loading加载动画
        highlightCurrentRow: true, // 是否支持当前行高亮显示
        mutiSelect: true, // 是否支持列表项选中功能
        pagination: true
      },
      // 需要展示的列
      columns: [
        {
          prop: 'index',
          label: '序号',
          align: 'center',
          width: '80'
        },
        {
          prop: 'countryCode',
          label: '国家/地区代码',
          align: 'center',
          width: '150'
        },
        {
          prop: 'countryNameZh',
          label: '国家/地区中文名'
        },
        {
          prop: 'countryNameEn',
          label: '国家/地区英文名'
        },
        {
          prop: 'validFlag',
          label: '是否有效',
          align: 'center',
          width: '100',
          render: (h, params) => {
            return h(
              'el-tag',
              {
                props: {
                  type:
                    params.row.validFlag
                      ? 'success'
                      : 'danger'
                } // 组件的props
              },
              params.row.validFlag ? '生效' : '失效'
            );
          }
        }
      ],
      // 列操作按钮
      operates: {
        list: [
          {
            id: '1',
            label: '编辑',
            type: 'primary',
            show: true,
            icon: 'el-icon-edit-outline',
            plain: false,
            disabled: false,
            btnType: 'icon',
            method: (index, row) => {
              this.handleUpdate(row);
            }
          },
          {
            id: '2',
            label: '删除',
            type: 'danger',
            icon: 'el-icon-delete',
            show: true,
            plain: false,
            disabled: false,
            btnType: 'icon',
            method: (index, row) => {
              this.handleDelete(row)
            }
          }
        ],
        fixed: false,
        width: 230
      },
      listQuery: {
        page: 1,
        limit: 20,
        total: 0,
        countryCode: '',
        countryNameZh: '',
        countryNameEn: '',
        validFlag: undefined
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '添加'
      },
      temp: {
        id: undefined
      },
      rules: {
        countryCode: [{
          required: true,
          message: '不能为空'
        }],
        countryNameZh: [{
          required: true,
          message: '不能为空'
        }],
        countryNameEn: [{
          required: true,
          message: '不能为空'
        }],
        validFlag: [{
          required: true,
          message: '请选择状态'
        }]
      }
    }
  },
  created() {

  },
  mounted() {
    this.$nextTick(function() {
      this.tableHeight = window.innerHeight - this.$refs.tableComponent.$refs.table.$el.offsetTop - 100;
      // 监听窗口大小变化
      const self = this;
      window.onresize = function() {
        self.tableHeight = window.innerHeight - self.$refs.tableComponent.$refs.table.$el.offsetTop - 100
      }
    })
  },
  methods: {
    /* 重置 */
    resetConditionForm() {
      this.conditionList = [{
        name: '',
        operator: '',
        value: ''
      }]
    },
    /* 关闭弹窗 */
    closeDialog() {
      this.dialogFormVisible = false
    },
    /* 更多条件 */
    addCondition(item, index) {
      if (index >= 4) {
        this.$message({
          message: '最多5个条件',
          type: 'warning'
        })
        return false
      }
      const subObj = {
        name: '',
        operator: '',
        value: ''
      }
      this.conditionList.push(subObj)
    },
    removeCondition(item, index) {
      if (this.conditionList.length === 1) {
        return this.$message({
          message: '最后一项不可删除',
          type: 'warning'
        })
      }
      this.conditionList.splice(index, 1)
    },
    conditionSearch() {
      const data = {}
      for (const item of this.conditionList) {
        if (item.value) {
          data[item.name] = item.value
        }
      }
      data.page = 1
      data.limit = this.listQuery.limit
      this.dialogConditionVisible = false
      queryCountry(data).then(res => {
        if (res.success) {
          this.tableData = res.data.records
          this.listQuery.total = parseInt(res.data.totalRecord)
        } else {
          this.$message({
            message: '搜索失败',
            type: 'error'
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    /* 新增 */
    handleAdd() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        countryCode: '',
        countryNameZh: '',
        countryNameEn: '',
        timestamp: new Date(),
        validFlag: true
      };
    },
    chooseAddMethod() {
      if (this.dialogStatus === 'create') {
        return this.createCountry()
      } else {
        return this.updateCountry()
      }
    },
    newMethod() {
      if (this.dialogStatus === 'create') {
        return
      }
      this.resetTemp()
      this.dialogStatus = 'create'
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    /* 新增 */
    createCountry() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.temp.creator = 'admin'
          this.temp.createTime = new Date()
          addCountry(this.temp).then(response => this.handleAddResponse(response))
        }
      })
    },
    handleAddResponse(response) {
      if (response.success) {
        if (response.success) {
          this.searchFn()
          this.dialogFormVisible = false
          this.$notify({
            title: '成功',
            message: '创建成功',
            type: 'success',
            duration: 2000
          });
        }
      } else {
        parseDsErrorMessage(response)
      }
    },
    /* 更新 */
    updateCountry() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.temp.creator = 'admin';
          const tempData = Object.assign({}, this.temp);
          updateCountry(tempData).then(response => this.handleUpdateResponse(response));
        }
      });
    },
    handleUpdateResponse(response) {
      if (response.success) {
        this.searchFn();
        this.dialogFormVisible = false;
        this.$notify({
          title: '成功',
          message: '更新成功',
          type: 'success',
          duration: 2000
        });
      } else {
        console.log('error');
        parseDsErrorMessage(response);
      }
    },
    // 查询方法
    handleSearch() {
      this.listQuery.page = 1
      this.searchFn()
    },
    // 查询事件
    searchFn() {
      const data = {}
      for (const key in this.listQuery) {
        if (this.listQuery[key] !== '' && key !== 'total') {
          data[key] = this.listQuery[key]
        }
      }
      queryCountry(data).then(res => {
        if (res.success) {
          this.tableData = res.data.records
          this.listQuery.total = parseInt(res.data.totalRecord)
        } else {
          this.$message({
            message: '搜索失败',
            type: 'error'
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    /* 更多条件 */
    moreFn() {
      this.dialogConditionVisible = true
    },
    /* 重置 */
    resetFn() {
      this.$refs.filter.resetFields()
    },
    /* 导出 */
    handleExport() {
      const data = {}
      for (const key in this.listQuery) {
        if (this.listQuery[key] !== '' && key !== 'total') {
          data[key] = this.listQuery[key]
        }
      }
      exportCountry(data)
    },
    handleRowClick() {

    },
    handleSelectionChange() {

    },
    handleSizeChange(size) {
      this.listQuery.limit = size
      this.searchFn()
    },
    handleIndexChange(page) {
      this.listQuery.page = page
      this.searchFn()
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row);
      this.temp.timestamp = new Date(this.temp.timestamp);
      this.dialogStatus = 'update';
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate();
      });
    },

    handleDelete(row) {
      deleteCountry({ id: row.id }).then(() => {
        this.searchFn();
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success',
          duration: 2000
        });
      });
    }
  }
}
</script>
<style lang="scss" scoped>
.app-container{
  .breadcrumb{
    margin-bottom: 20px;
  }
}
.filter-container{

  .el-form-item{
    margin-bottom: 0px;
    /deep/.el-form-item__label{
      padding-right:0px
    }
  }
}
.table-container{
  .opt{
    text-align: right;
    margin-bottom: 10px;
  }
}
.opt-panel{
  i{
    font-size:36px;
    color: #bbb;
    cursor: pointer;
    margin-right: 4px;
    &:hover{
      color: #999 ;
    }
  }
}
.form-dialog{

  .form-dialog-header{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding: 20px;
    overflow: hidden;
    .header-title{
      font-size: 16px;
      color: #666;
      float: left;
    }
    .header-opt{
       float: right;
    }
  }
  .dialog-form{
    background: #f5faff;
    padding: 20px 20px 0 20px;
    .el-form-item{
      /deep/.el-form-item__label{
        padding-right: 0;
      }
    }
    .form-title{

      position: relative;
      padding: 0 20px 10px;
      margin-bottom: 20px;
      &::before{
        content: '';
        width: 100%;
        height: 2px;
        background: #ddd;
        position: absolute;
        bottom: 0;
        left: 0;
      }
      span{
        font-size: 14px;
        color:#999;
        position: relative;
        &::before{
          content: '';
          width: 50%;
          position: absolute;
          height: 2px;
          bottom: -10px;
          background: #61b0ff;
          transform: translateX(50%);
        }
      }
    }
  }
}

</style>
