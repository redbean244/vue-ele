<template>
  <div class="msite">
    <div class="narbar">
      <van-icon name="location" />
      <span class="location">{{this.msiteTitle}}</span>
      <van-icon name="arrow-down" />
    </div>
    <van-search placeholder="Coco" shape="round" />
    <van-swipe v-if="foodTypes">
      <van-swipe-item v-for="(foodItem,index) in foodTypes" :key="index">
        <div class="swipe-contont">
          <figure v-for="(list,key) in foodItem" :key="key" class="swipe-item">
            <img :src="imgBaseUrl + list.image_url" />
            <figcaption>{{list.title}}</figcaption>
          </figure>
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { cities, msiteAddress, msiteFoodTypes } from '@/api/api';
export default {
  components: {},
  data() {
    return {
      geohash: '', // city页面传递过来的地址geohash
      msiteTitle: '请选择地址...', // msite页面头部标题
      foodTypes: [], // 食品分类列表
      hasGetData: false, // 是否已经获取地理位置数据，成功之后再获取商铺列表信息
      imgBaseUrl: 'https://fuss10.elemecdn.com' // 图片域名地址
    };
  },
  computed: {},
  watch: {},
  methods: {
    ...mapMutations(['RECORD_ADDRESS', 'SAVE_GEOHASH'])
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    // 获取导航食品类型列表
    msiteFoodTypes(this.geohash).then(res => {
      const resLength = res.length;
      const resArr = res; // 返回一个新的数组
      const foodArr = [];
      for (let i = 0, j = 0; i < resLength; i += 8, j++) {
        foodArr[j] = resArr.splice(0, 8);
      }
      this.foodTypes = foodArr;
    });
  },
  beforeCreate() {},
  async beforeMount() {
    if (!this.$route.query.geohash) {
      const address = await cities({ type: 'guess' });
      this.geohash = address.latitude + ',' + address.longitude;
    } else {
      this.geohash = this.$route.query.geohash;
    }
    // // 保存geohash 到vuex
    this.SAVE_GEOHASH(this.geohash);
    // // 获取位置信息
    const res = await msiteAddress(this.geohash);
    this.msiteTitle = res.name;
    // // 记录当前经度纬度
    this.RECORD_ADDRESS(res);

    this.hasGetData = true;
  },
  beforeUpdate() {}, // 生命周期 - 更新之前
  updated() {}, // 生命周期 - 更新之后
  beforeDestroy() {}, // 生命周期 - 销毁之前
  destroyed() {}, // 生命周期 - 销毁完成
  activated() {} // 如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
.msite {
  .narbar {
    font-size: 18px;
    height: 45px;
    padding-left: 5px;
    i {
      height: 45px;
      line-height: 45px;
      vertical-align: top;
    }
    .van-icon-location {
      color: $Blue;
      transform: translateY(-2px);
    }
    .van-icon-arrow-down {
      box-shadow: 0px 0px 10px #f5f5f5;
    }
    .location {
      display: inline-block;
      height: 45px;
      line-height: 45px;
      width: 150px;
      overflow: hidden;
    }
  }
  .swipe-contont {
    width: 100%;
    height: 3.6rem;
    @include flex-row;
    .swipe-item {
      width: 1.8rem;
      height: 1.8rem;
      text-align: center;
      img {
        margin-bottom: 0.3rem;
        width: 1rem;
        height: 1rem;
      }
    }
  }
}
</style>
