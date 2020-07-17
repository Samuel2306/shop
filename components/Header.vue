<template>
  <div class="header-container">
    <div class="user">
      <i class="el-icon-s-custom"></i>
      <i class="el-icon-s-comment"></i>
      <i class="msg" v-if="msgNums">
        {{msgNums}}
      </i>
      <span>退出登录</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Header",
    data() {
      return {
        msgNums: 0
      }
    }
  }
</script>

<style lang="scss" scoped>
  .header-container{
    background-color: #efefef;
    height: 49px;
    padding:0 20px;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    .user{
      font-size: 20px;
      position: relative;
      display: flex;
      i{
        cursor: pointer;
        margin-right: 6px;
        &:hover{
          color: #777;
        }
      }
      .msg{
        width: 16px;
        height: 16px;
        border-radius: 50%;
        display: inline-block;
        background-color: red;
        font-style: normal;
        color: #fff;
        font-size: 12px;
        line-height: 16px;
        text-align: center;
        position: absolute;
        top:-6px;
        right: -6px;
      }
    }
    span{
      font-size: 14px;
      cursor: pointer;
      &:hover{
        color: #777;
      }
    }
  }
</style>
