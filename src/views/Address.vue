<template>
  <div class="address">
    <van-nav-bar
      title="选择收货地址"
      left-text="X"
      right-text="管理"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <van-search
      v-if="city"
      v-model="searchValue"
      placeholder="小区/写字楼/学校等"
      shape="round"
      @search="onSearch"
    >
      <div slot="label">
        <router-link to="/city">
          {{city.name}}
          <svg-icon icon-class="down" class="icon-down" />
          <svg-icon icon-class="line" />
        </router-link>
      </div>
    </van-search>
    <div ref="wrapper" :style="`height:${windowHeight-54-46}px`">
      <van-list :finished="true" finished-text="没有了">
        <router-link v-for="item in placelist" :key="item.id" :to="{path:'/msite', query:{geohash:item.geohash}}">
          <van-cell :title="item.name" :label="item.address" />
        </router-link>
      </van-list>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
import { currentcity, searchplace } from '@/api/api';
export default {
  name: '',
  data() {
    return {
      cityid: null, // 城市id
      city: null, // 城市名
      searchValue: null, // 搜索值
      placelist: [], // 搜索地址列表

      windowHeight: 0, // window高度
      scroll: null
    };
  },
  created() {
    this.cityid = this.$route.params.cityid;
    this.windowHeight = window.innerHeight;
    currentcity(this.cityid).then(res => {
      this.city = res;
    });
  },
  mounted() {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: 3,
        click: true,
        mouseWheel: true
      });
    });
  },
  methods: {
    onClickLeft() {},
    onClickRight() {},
    onSearch() {
      // 输入值不为空时才发送信息
      if (this.searchValue) {
        searchplace(this.cityid, this.searchValue).then(res => {
          this.placelist = res;
          this.scroll.refresh();
        });
      }
    }
  }
};
</script>
<style  scoped lang="scss">
.address {
  .icon-down {
    margin-left: 5px;
  }
}
</style>
