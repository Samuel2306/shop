<template>
  <div class="table-component">
    <el-table
      :data="tableData.data"
      style="width: 100%">
      <el-table-column
        v-for="(clo,index) in columnsData"
        :key="index"
        :label="clo.label"
        :width="clo.width">
        <template slot-scope="scope">
          <component
            v-if="clo.type == 'formatter'"
            @emitEvent="emitEvent"
            :is="clo.component"
            :row="scope.row"
            :index="scope.$index">
          </component>
          <div class="content" v-if="clo.type != 'formatter'">
            {{scope.row[clo.attrName]}}
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.total">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: "TableComponent",
    data(){
      return {
        currentPage: 1,
        pageSize: 10,
      }
    },
    props: {
      columnsData: {
        type: Array,
        default: function(){
          return []
        }
      },
      tableData: {
        type: Object,
        default: function(){
          return {
            data: [{
              date: '2016-05-02',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }, {
              date: '2016-05-04',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1517 弄'
            }, {
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            }, {
              date: '2016-05-03',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1516 弄'
            }],
            total: 30
          }
        }
      }
    },
    methods: {
      resetCurrentPage(){
        this.currentPage = 1
      },
      handleSizeChange(val) {
        this.resetCurrentPage()
        this.pageSize = val
        this.$emit("emitEvent", {
          type: 'search',
          data: {
            currentPage: this.currentPage,
            pageSize: this.pageSize
          }
        })
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.$emit("emitEvent", {
          type: 'search',
          data: {
            currentPage: this.currentPage,
            pageSize: this.pageSize
          }
        })
      },
      emitEvent(params){
        this.$emit("emitEvent", params)
      },
      getData(){
        return {
          currentPage: this.currentPage,
          pageSize: this.pageSize
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
