<template>
  <section class="container">
    <img src="../assets/img/logo.png" alt="Nuxt.js Logo" class="logo" />
    <h1 class="title">
      Universal Vue.js Application Framework
    </h1>
    <button>发起文件上传</button>
    <nuxt-link class="button" to="/about">
      About page
    </nuxt-link>
  </section>
</template>

<script>
  import axios from'axios'
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
    mounted(){
      axios.get('/aaa',{})
        .then((res) => {
          console.log(res)
        })
    }
  }
</script>

<style scoped>
.title
{
  margin: 50px 0;
}
</style>
