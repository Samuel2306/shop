<template>
  <el-container>
    <el-aside width="200px">
      <Sidebar />
    </el-aside>
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-main>
        <nuxt/>
      </el-main>
      <el-footer>
        <my-footer/>
      </el-footer>
    </el-container>
  </el-container>
</template>

<script>
import MyFooter from '../components/Footer.vue'
import Sidebar from '../components/Sidebar.vue'
import Header from '../components/Header.vue'

export default {
  components: {
    MyFooter,
    Sidebar,
    Header,
  }
}
</script>

<style>
.container
{
  margin: 0;
  width: 100%;
  padding: 100px 0;
  text-align: center;
}

.button, .button:visited
{
  display: inline-block;
  color: #3B8070;
  letter-spacing: 1px;
  background-color: #fff;
  border: 2px solid #3B8070;
  text-decoration: none;
  text-transform: uppercase;
  padding: 15px 45px;
}

.button:hover, .button:focus
{
  color: #fff;
  background-color: #3B8070;
}

.title
{
  color: #505153;
  font-weight: 300;
  font-size: 2.5em;
  margin: 0;
}
</style>
