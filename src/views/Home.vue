<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <svg-icon icon-class="tax-hot" class="input-icon" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  created() {
    // getCode().then(res=>{

    // })
  }
};
</script>
<style lang="scss" scoped>
.home {
  img {
    width: 100px;
  }
  .input-icon {
    fill: red;
    width:200px;
    height:100px;
  }
}
</style>
