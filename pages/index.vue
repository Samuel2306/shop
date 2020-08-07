<template>
  <section class="container">
    <el-input type="text" v-model="content" @keydown.native="changeContent" />  <!-- @change="changeContent"-->
    <DynamicForm :formConfig="formConfig" :value="formData" @input="formChange"/>
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
  import TableComponent from '../components/DynamicTable/DynamicTable.vue'
  import DynamicForm from '../components/DynamicForm/DynamicForm.vue'
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
        content: "",
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
          "gender": "1",
          "origin": "",
          "love": [],
          "city": [],
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
              "type": "select",
              "label": "来源",
              "multiple": false,
              "multipleLimit": 3,
              "value": "",
              "placeholder": "请输入姓名",
              "rules": [],
              "key": "origin",
              "options": [
                {"label": "精品商城","value": "PT001"},
                {"label": "车商城","value": "PT003"}
              ]
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
                  "value": 1,
                  "label": "男",
                  "disabled": false
                },
                {
                  "value": 0,
                  "label": "女",
                  "disabled": false
                }
              ]
            },
            {
              "type": "checkbox",
              "label": "爱好",
              "value": [],
              "button": true,
              "border": true,
              "rules": [],
              "key": "love",
              "min": 0,
              "max": 100,
              "options": [
                {
                  "value": "1",
                  "label": "游泳",
                  "disabled": false
                },
                {
                  "value": "2",
                  "label": "看电影",
                  "disabled": false
                },
                {
                  "value": "3",
                  "label": "打篮球",
                  "disabled": false
                }
              ]
            },
            {
              "type": "cascader",
              "label": "城市",
              "value": [],
              "rules": [],
              "key": "city",
              props: { multiple: true },
              "options": [{
                value: 1,
                label: '东南',
                children: [{
                  value: 2,
                  label: '上海',
                  children: [
                    { value: 3, label: '普陀' },
                    { value: 4, label: '黄埔' },
                    { value: 5, label: '徐汇' }
                  ]
                }, {
                  value: 7,
                  label: '江苏',
                  children: [
                    { value: 8, label: '南京' },
                    { value: 9, label: '苏州' },
                    { value: 10, label: '无锡' }
                  ]
                }, {
                  value: 12,
                  label: '浙江',
                  children: [
                    { value: 13, label: '杭州' },
                    { value: 14, label: '宁波' },
                    { value: 15, label: '嘉兴' }
                  ]
                }]
              }, {
                value: 17,
                label: '西北',
                children: [{
                  value: 18,
                  label: '陕西',
                  children: [
                    { value: 19, label: '西安' },
                    { value: 20, label: '延安' }
                  ]
                }, {
                  value: 21,
                  label: '新疆维吾尔族自治区',
                  children: [
                    { value: 22, label: '乌鲁木齐' },
                    { value: 23, label: '克拉玛依' }
                  ]
                }]
              }]
            }
          ]
        }
      }
    },
    methods: {
      changeContent($event){
        let event = window.event || $event;
        let code = event.keyCode || event.which || event.charCode;
        if (code == 13) {
          console.log($event)
          console.log("asd")
        }
      },
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
      /*let item = {
        "platform":"tb",
        "orderNo":"1095896609307326460",
        "title":"【一只陆同款】Y64天丝休闲气质侧开叉衬衫+K20杏色百搭雪纺中裤",
        "price":119,
        "orderNum":1,
        "externalSysNum":"Y64",
        "productAttrs":"颜色分类：单件衬衣;尺码：均码[（衬衣）]",
        "packageInfo":"null",
        "remark":"null",
        "orderStatus":"交易关闭",
        "productCode":"Y64",
        "createDate":"2020-08-02 00:00:00"
      }

      axios.post("/api/v1/order/insert", {
        params: JSON.stringify(item)
      })
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })*/

    }
  }
</script>

<style scoped>
.title
{
  margin: 50px 0;
}
</style>
