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
    <el-radio-group
      v-else-if="item.type==='radio'"
      v-bind="$attrs" v-on="$listeners"
      :disabled="item.disable"
      :readonly="item.readonly">
      <el-radio-button
        v-if="item.button"
        v-for="(option,index) in item.options"
        :key="index"
        :disabled="option.disabled"
        :label="option.value">
        {{option.label}}
      </el-radio-button>
      <el-radio
        v-if="!item.button"
        v-for="(option,index) in item.options"
        :key="index"
        :disabled="option.disabled"
        :label="option.value">
        {{option.label}}
      </el-radio>
    </el-radio-group>
    <el-checkbox-group
      v-else-if="item.type==='checkbox'"
      v-bind="$attrs" v-on="$listeners"
      :max="item.max"
      :min="item.min"
      :disabled="item.disable"
      :readonly="item.readonly">
      <el-checkbox-button
        v-if="item.button"
        v-for="(option,index) in item.options"
        :key="index"
        :disabled="option.disabled"
        :label="option.value">
        {{option.label}}
      </el-checkbox-button>
      <el-checkbox
        v-if="!item.button"
        v-for="(option,index) in item.options"
        :key="index"
        :disabled="option.disabled"
        :label="option.value">
        {{option.label}}
      </el-checkbox>
    </el-checkbox-group>

    <el-cascader
      v-else-if="item.type==='cascader'"
      :options="item.options"
      :props="item.props"
      @change="changeCascader"
      :show-all-levels="false"
      collapse-tags
      clearable>
    </el-cascader>
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
    },
    methods: {
      changeCascader(value){
        this.$emit('input', value)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
