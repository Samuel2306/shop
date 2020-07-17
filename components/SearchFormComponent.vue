<template>
  <div class="search_form_component">
    {{aaa}}
    <el-form v-if="show" ref="form" :model="form" label-width="80px">
      <el-form-item v-for="(item, index) in form" label="活动名称" :key="index">
        <!--<component :is="item.component" />-->
        <div v-html="'<el-input v-model=' + 'aaa' + '></el-input>'"></div>
      </el-form-item>
    </el-form>
    <el-row class="btns">
      <el-button @click="resetData">重置</el-button>
      <el-button @click="search" type="primary">查询</el-button>
    </el-row>
  </div>
</template>

<script>
  import {
    deepClone,
  } from '../utils/utils'
  export default {
    name: "SearchFormComponent",
    data(){
      return {
        form: {},
        formBackend: {},
        show: false,
        aaa: 'aasdasd'
      }
    },
    props: {
      optionsList: {
        type: Array,
        default: function(){
          /*
          元素表示：{
            attrName: 属性名称
            initValue: 属性默认值
            exchange：属性值转换方法，有些时候属性值需要一定的转换才传给接口
            component: 经过render函数渲染出来的element组件
          }
          * */
          return []
        }
      }
    },
    computed: {
      optionsListMap(){
        let obj = {}
        this.optionsList.forEach((item) => {
          obj[item.attrName] = item
        })
      }
    },
    methods: {
      resetData(){
        this.form = deepClone(this.formBackend)
      },
      search(){
        let obj = {}
        this.form.forEach((attr, value) => {
          obj[attr] = this.optionsListMap[attr].exchange(value)
        })
        this.$emit("emitEvent", {
          type: 'search',
          data: obj
        })
      },
      getData(){
        return this.form
      }
    },
    mounted(){
      this.optionsList.forEach((item) => {
        this.form[item.attrName] = deepClone(item.initValue)
        this.formBackend[item.attrName] = deepClone(item.initValue)
      })
      console.log(this.form)
      setTimeout(() => {
        this.show = true
      },200)
    }
  }
</script>

<style lang="scss" scoped>
  .search_form_component{
    .btns{
      text-align: center;
    }
  }
</style>
