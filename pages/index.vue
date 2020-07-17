<template>
  <section class="container">
    <DynamicForm :formConfig="formConfig" :value="formData" @input="formChange"/>
    <SearchFormComponent
      ref="form"
      :optionsList="optionsList"
      @emitEvent="handleTableEvent"
    />
    <TableComponent
      ref="table"
      :columnsData="columnsData"
      @emitEvent="handleTableEvent"
    />


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
  import TableComponent from '../components/TableComponent.vue'
  import SearchFormComponent from '../components/SearchFormComponent.vue'
  import DynamicForm from '../components/DynamicForm.vue'
  const uploadRequest = axios.create({})
  let searchModel = {
    name: 'searchModel',
    post: function(params){
      console.log(params)
      return Promise.resolve("searchModel")
    }
  }
  let editModel = {
    name: 'editModel',
    post: function(params){
      console.log(params)
      return Promise.resolve("editModel")
    }
  }
  let delModel = {
    name: 'delModel',
    post: function(params){
      console.log(params)
      return Promise.resolve("delModel")
    }
  }
  let cancelModel = {
    name: 'cancelModel',
    post: function(params){
      console.log(params)
      return Promise.resolve("cancelModel")
    }
  }

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
    components: {
      TableComponent,
      SearchFormComponent,
      DynamicForm,
    },
    data(vm){
      return {
        fileList: null,
        columnsData: [
          {
            label: '日期',
            attrName: 'date',
            width: 180,
          },
          {
            label: '用户',
            type: 'formatter',
            component: 'product_list_table_user_component',
          },
          {
            label: '操作',
            type: 'formatter',
            component: 'product_list_table_operation_component',
          },
        ],
        handlerMap: {
          search: {
            paramsExchange: function(row){
              return row
            },
            handlerModel: searchModel,
            callback: ((res) => {
              console.log(this)
              console.log(res)
            }).bind(vm),
          },
          edit: {
            paramsExchange: function(row){
              return row
            },
            handlerModel: editModel,
            callback: ((res) => {
              console.log(this)
              console.log(res)
            }).bind(vm),
          },
          cancel: {
            paramsExchange: function(row){
              return row
            },
            handlerModel: cancelModel,
            callback: ((res) => {
              console.log(this)
              console.log(res)
            }).bind(vm),
          },
          del: {
            paramsExchange: function(row){
              return row
            },
            handlerModel: delModel,
            callback: ((res) => {
              console.log(this)
              console.log(res)
            }).bind(vm),
          },
        },
        optionsList: [
          {
            attrName: 'productName',
            initValue: '雨伞',
            exchange: function(value){
              return value
            },
            component: 'product_list_form_input'
          }
        ],
        formData: {
          "name": "Genji",
          "gender": "1"
        },
        formConfig: {
          "inline": true,
          "labelPosition": "right",
          "labelWidth": "",
          "size": "small",
          "statusIcon": true,
          "formItemList": [
            {
              "type": "input",
              "label": "姓名",
              "disable": false,
              "readonly": false,
              "value": "",
              "placeholder": "请输入姓名",
              "rules": [],
              "key": "name",
              "subtype": "text"
            },
            {
              "type": "radio",
              "label": "性别",
              "value": "",
              "button": false,
              "border": true,
              "rules": [],
              "key": "gender",
              "options": [
                {
                  "value": "1",
                  "label": "男",
                  "disabled": false
                },
                {
                  "value": "0",
                  "label": "女",
                  "disabled": false
                }
              ]
            }
          ]
        }
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



      handleTableEvent(params){
        let event = params.type
        let handlerObj = this.handlerMap[event]
        let model = handlerObj.handlerModel
        let requestParams = handlerObj.paramsExchange(params.data)
        let callback = handlerObj.callback
        model.post(requestParams)
          .then((res) => {
            callback(res)
          })
          .catch((error) => {
            console.log(error)
          })
      },

      formChange(data){
        this.formData = data
        console.log(this.formData)
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
