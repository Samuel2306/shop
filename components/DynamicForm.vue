<template>
  <el-form
    class="dynamic-form"
    :inline="formConfig.inline"
    :model="value"
    :label-position="formConfig.labelPosition"
    :label-width="formConfig.labelWidth"
    :size='formConfig.size'
    :status-icon="formConfig.statusIcon">
    <dynamic-form-item
      v-for="item in formConfig.formItemList"
      :key="item.key"
      :item="item"
      :value="value[item.key]"
      @input="handleInput($event, item.key)"
    />
  </el-form>
</template>

<script>
  import DynamicFormItem from './DynamicFormItem'
  export default {
    name: "DynamicForm",
    components: {
      'dynamic-form-item': DynamicFormItem
    },
    props: {
      formConfig: {
        type: Object,
        required: true
      },
      value: {
        type: Object,
        required: true
      }
    },
    methods: {
      handleInput(val, key) {
        // 这里element-ui没有上报event，直接就是value了,  val原来是$event对象
        this.$emit('input', { ...this.value, [key]: val })
      },
      setDefaultValue() {
        const formData = { ...this.value }
        // 设置默认值
        this.formConfig.formItemList.forEach(({ key, value }) => {
          if (formData[key] === undefined || formData[key] === null) {
            formData[key] = value
          }
        })
        this.$emit('input', formData)
      }
    },
    mounted() {
      this.setDefaultValue()
    },
  }
</script>

<style lang="scss" scoped>

</style>
