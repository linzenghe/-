<template>
  <div class="table">
    <el-table
      id="iTable"
      v-loading.iTable="options.loading"
      :height="options.height"
      :data="data"
      :border="options.border"
      :cell-style="options.cellStyle"
      @row-click="handleRowClick"
      :stripe="options.stripe"
      @selection-change="handleSelectionChange"
    >
      <!--region 选择框-->
      <el-table-column v-if="options.mutiSelect" type="selection" style="width: 55px;"></el-table-column>
      <!--endregion-->
      <!--region 数据列-->
      <template v-for="(column, index) in columns">
        <el-table-column
          :prop="column.prop"
          :key="column.label"
          :label="column.label"
          :align="column.align"
          :width="column.width"
        >
          <template slot-scope="scope">
            <template v-if="!column.render">
              <template v-if="column.formatter">
                <span v-html="column.formatter(scope.row, column)"></span>
              </template>
              <template v-else>
                <span>{{scope.row[column.prop]}}</span>
              </template>
            </template>
            <template v-else>
              <expand-dom :column="column" :row="scope.row" :render="column.render" :index="index"></expand-dom>
            </template>
          </template>
        </el-table-column>
      </template>
      <!--endregion-->
      <!--region 按钮操作组-->
      <el-table-column
        ref="fixedColumn"
        label="操作"
        align="center"
        :width="operates.width"
        :fixed="operates.fixed"
        v-if="operates.list.filter(_x=>_x.show === true).length > 0"
      >
        <template slot-scope="scope">
          <span v-for="(btn, key) in operates.list" style="margin: 0 4px;" :key="key">
            <el-button
              v-if="btn.show"
              :type="btn.type"
              size="mini"
              :disabled="btn.disabled(key,scope.row)"
              :plain="btn.plain"
              @click.native.prevent="btn.method(key,scope.row)"
            >{{ btn.label }}
            </el-button>
          </span>
        </template>
      </el-table-column>
      <!--endregion-->
    </el-table>

    <el-pagination
      v-if="options.pagination"
      :total="pagination.total"
      :page-sizes="[10, 20, 50]"
      :current-page.sync="pagination.page"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleIndexChange"
      prev-text="上一页"
      next-text="下一页"
      style="margin-top: 15px;text-align: center"
    ></el-pagination>
  </div>
</template>
<!--endregion-->
<script>
  export default {
    props: {
      data: {
        type: Array,
        default: []
      }, // 数据列表
      columns: {
        type: Array,
        default: []
      }, // 需要展示的列 === prop：列数据对应的属性，label：列名，align：对齐方式，width：列宽
      operates: {}, // 操作按钮组 === label: 文本，type :类型（primary / success / warning / danger / info / text），show：是否显示，icon：按钮图标，plain：是否朴素按钮，disabled：是否禁用，method：回调方法
      options: {
        type: Object,
        default: {
          stripe: true, // 是否为斑马纹 table
          border: true,  //是否边框
          highlightCurrentRow: false // 是否要高亮当前行
        },
        pagination: true
      }, // table 表格的控制参数
      pagination: Object,  //分页

    },
    //组件
    components: {
      expandDom: {
        functional: true,
        props: {
          row: Object,
          render: Function,
          index: Number,
          column: {
            type: Object,
            default: null
          }
        },
        render: (h, ctx) => {  //作用渲染视图，相当于template
          const params = {
            row: ctx.props.row,
            index: ctx.props.index
          };
          if (ctx.props.column) params.column = ctx.props.column;
          return ctx.props.render(h, params);
        }
      }
    },
    // 数据
    data() {
      return {
        pageIndex: 1,
        multipleSelection: [] // 多行选中
      };
    },
    created(){

    },
    mounted() {

    },
    computed: {},
    methods: {
      // 多行选中
      handleSelectionChange(val) {
        this.multipleSelection = val;
        this.$emit("handleSelectionChange", val);
      },
      handleRowClick(val) {
        this.$emit("handleRowClick", val);
      },
      handleSizeChange(size){
        this.$$emit('handleSizeChange',size);
      },
      /*切换页码*/
      handleIndexChange(current){
        this.$emit('getTableData',current);
      }
    }
  };
</script>
<style lang="scss">
</style>
