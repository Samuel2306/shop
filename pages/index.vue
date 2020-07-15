<template>
  <section class="container">
    <img src="../assets/img/logo.png" alt="Nuxt.js Logo" class="logo" />
    <h1 class="title">
      Universal Vue.js Application Framework
    </h1>
    <el-upload
      class="upload-demo"
      action="https://localhost:3000/api/v1/order/upload"
      :limit="15"
      :http-request="uploadFileChange"

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

        reader.readAsDataURL(that.fileList);
      }
    },
    mounted(){
      axios.get('/aaa',{})
        .then((res) => {
          console.log(res)
        })
    }
  }
</script>

<style scoped>
.title
{
  margin: 50px 0;
}
</style>
