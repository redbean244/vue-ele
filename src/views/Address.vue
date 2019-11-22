<template>
   <div class=''>{{cityid}}</div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      cityid: null
    };
  },
  mounted() {
    this.cityid = this.$route.params.cityid;
  }
};
</script>
<style  scoped>

</style>
