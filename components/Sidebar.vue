<template>
  <div class="sidebar-container">
    <div class="sidebar-title">
      系统导航
    </div>
    <el-menu>
      <el-menu-item class="topItem" index="1-1">
        <nuxt-link to="/product_management">
          <i class="el-icon-s-data nav-icon"></i>商品管理
        </nuxt-link>
      </el-menu-item>
      <el-menu-item class="topItem" index="1-2">
        <nuxt-link to="/order_management">
          <i class="el-icon-s-data nav-icon"></i>订单管理
        </nuxt-link>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-menu nav-icon"></i>
          <span>库存管理</span>
        </template>
        <el-menu-item index="1-3">
          <nuxt-link to="/stock_management">
            <div class="el-icon-s-data"></div>库存列表
          </nuxt-link>
        </el-menu-item>
        <el-menu-item index="1-4">
          <nuxt-link to="/inbound_order">
            <i class="el-icon-s-order"></i>入库单管理
          </nuxt-link>
        </el-menu-item>
        <el-menu-item index="1-5">
          <nuxt-link to="/outbound_order">
            <i class="el-icon-s-order"></i>出库单管理
          </nuxt-link>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>

</template>

<script>
  export default {
    name: "Sidebar"
  }
</script>

<style lang="scss">
  .sidebar-container{
    height: 100%;
    background: #323A45;
    position: relative;
    .sidebar-title{
      font-size: 18px;
      text-align: center;
      color: #fff;
      line-height: 50px;
      border-bottom: #4c5868 solid 1px;
      box-sizing: border-box;
    }
    .el-menu{
      background: #323A45;
      color: #fff;
      height: 100%;
      overflow-y: auto;
    }
    .el-menu-item{
      color: #fff;
      i{
        color: #fff;
        &.nav-icon{
          margin-top: -2px;
        }
      }
      &:hover, &.is-active{
        background-color: lighten(#323A45, 10%);
      }
      a{
        color: #fff !important;
        text-decoration: none !important;
        display: block;
        margin: 0 -20px;
        padding: 0 20px;
      }
      &.is-active {
        a, i{
          color: #409EFF !important;
        }
      }
    }
    .el-submenu {
      .el-menu-item{
        padding-left: 54px !important;
      }
      .el-submenu__title{
        color: #fff;
        i{
          color: #fff;
          &.nav-icon{
            margin-top: -2px;
          }
        }
        &:hover{
          background-color: lighten(#323A45, 10%);
        }
      }
    }
  }
</style>
