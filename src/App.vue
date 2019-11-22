<template>
  <div id="app">
    <keep-alive>
        <router-view  v-if="$route.meta.keepAlive" class="router-view" :style="`height:${windowHeight}px`"/>
    </keep-alive>
    <router-view  v-if="!$route.meta.keepAlive" class="router-view" :style="`height:${windowHeight}px`"/>
  </div>
</template>
<script>
export default {
  name: '',
  data() {
    return {
      windowHeight: 0
    };
  },

  created() {
    this.windowHeight = window.innerHeight;
  }
};
</script>

<style lang="scss">
.router-view{
  font-size: px2rem(24);
}
</style>
