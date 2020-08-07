<template>
  <div class="DynamicToolBar">
    <div class="item" :key="idx" v-for="(item, idx) in itemList">
      <el-button v-if="item.type == 'button'">{{item.text}}</el-button>
      <el-button-group v-if="item.type == 'button-group'">
        <el-button :key="index" v-for="(button, index) in item.buttons">{{button.text}}</el-button>
      </el-button-group>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DynamicToolBar",
    props: {
      itemList: {
        type: Array,
        default: function () {
          return [
            {
              type: 'button',
              text: '按钮1',
              eventName: 'bbb'
            },
            {
              type: 'button',
              text: '按钮2',
              eventName: 'aaa'
            },
            {
              type: 'button-group',
              buttons: [
                {
                  type: 'button',
                  text: '按钮3',
                  eventName: 'ccc'
                },
                {
                  type: 'button',
                  text: '按钮4',
                  eventName: 'ddd'
                },
              ]
            }
          ]
        }
      }
    }
  }
</script>

<style lang="scss">
  .DynamicToolBar{
    text-align: left;
    .item{
      display: inline-block;
      & + .item{
        margin-left: 16px;
      }
    }
  }
</style>
