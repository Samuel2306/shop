<template>
  <el-form-item :rules="item.Rules" :label="item.label" :prop="item.key">
    <el-input
      v-if="item.type==='input'"
      v-bind="$attrs" v-on="$listeners"
      :type="item.subtype"
      :placeholder="item.placeholder"
      :disabled="item.disable"
      :readonly="item.readonly"
      :autosize="item.autosize">
    </el-input>

    <el-select
      v-else-if="item.type==='select'"
      v-bind="$attrs" v-on="$listeners"
      :multiple="item.multiple"
      :disabled="item.disabled"
      :multiple-limit="item.multipleLimit">
      <el-option
        v-for="o in item.options"
        :key="o.value"
        :label="o.label"
        :value="o.value"
        :disabled="o.disabled">
      </el-option>
    </el-select>
    <span v-else>未知控件类型</span>
  </el-form-item>
</template>

<script>
  export default {
    name: "DynamicFormItem",
    props: {
      item: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
