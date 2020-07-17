<template>
  <section class="container">
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        label="日期"
        width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="姓名"
        width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.name }}</p>
            <p>住址: {{ scope.row.address }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>




    <el-upload
      class="upload-demo"
      action="https://localhost:3000/api/v1/order/upload"
      :http-request="uploadFileChange"
      accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
      :show-file-list="true">
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
    <button @click="uploadData">倒入订单</button>


    <!--<form action="http://localhost:3000/api/v1/order/upload" method="post" enctype="multipart/form-data">
      <input type="file" name="file" id="file" value="" multiple="multiple" />
      <input type="submit" value="提交"/>
    </form>-->
    <nuxt-link class="button" to="/about">
      About page
    </nuxt-link>
  </section>
</template>

<script>
  import axios from 'axios'
  const uploadRequest = axios.create({})
  export default {
    asyncData({ req }) {
      return {
        name: req ? 'server' : 'client'
      }
    },
    head() {
      return {
        title: `About Page (${this.name}-side)`
      }
    },
    data(){
      return {
        fileList: null,
        tableData: [{
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
        }]
      }
    },
    methods: {
      uploadFileChange(param){
        this.fileList = param.file
      },
      uploadData(){
        let that = this
        let reader = new FileReader();
        reader.addEventListener("load", function () {
          let formData = new FormData()
          formData.append("files", that.fileList)
          formData.append("platform", 'tb')
          formData.append("createDate", '2020/07/31')


          uploadRequest.post('/api/v1/order/upload', formData, {
            headers:{'Content-Type':'multipart/form-data'},
            timeout: 50000
          })
            .then((res) => {
              console.log(res)
            })
            .catch((error) => {
              console.log(error)
            })
        }, false);

        reader.onprogress = function (event) {
          console.log(event)
          if(event.lengthComputable) {
            console.log(event.loaded + '/' + event.total)
          }
        }
        reader.addEventListener("error", function () {
          console.log('Could not read file, error code is ' + reader.error.code)
        })


        reader.readAsDataURL(this.fileList);
      },

      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    },
    mounted(){

    }
  }
</script>

<style scoped>
.title
{
  margin: 50px 0;
}
</style>
