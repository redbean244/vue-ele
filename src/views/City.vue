<template>
  <div class="city" >
    <van-search
      v-model="searchValue"
      placeholder="请输入城市名或拼音"
      show-action
      shape="round"
      @search="onSearch"
      @input="onInput"
      class="search-input"
    >
      <div slot="action" @click="onCancle">取消</div>
    </van-search>
    <div class="city-container" v-if="!searchValue" :style="`height:${windowHeight-54}px`">
      <section class="panel section">
        <h6 class="panel-title">当前定位</h6>
        <div class="panel-content">
          <router-link :to="'/address/'+guessCityid">
            <span>{{guessCity}}</span>
          </router-link>
          <span>重新定位</span>
        </div>
      </section>
      <section class="section">
        <van-index-bar v-if="groupcity" :index-list="indexList" :sticky="false">
          <div class="panel" v-if="hotCity">
            <van-index-anchor index="#" :style="{opacity:0,height:0}" />
            <h6 class="panel-title">热门城市</h6>
            <div class="panel-lists">
              <router-link v-for="(item,index) in hotCity" :key="index" :to="'/address/'+item.id">
                <span class="city-tag">{{item.name}}</span>
              </router-link>
            </div>
          </div>

          <div v-for="(value,key,index) in sortgroupcity" :key="index">
            <van-index-anchor :index="key" />
            <router-link v-for="(item,vIndex) in value" :key="vIndex" :to="'/address/'+item.id">
              <van-cell :title="item.name" />
            </router-link>
          </div>
        </van-index-bar>
      </section>
    </div>
    <div ref="wrapper" :style="searchValue?`height:${windowHeight-54}px`:''">
      <van-list :finished="true" finished-text="没有更多了"  v-show="searchValue">
        <router-link v-for="item in searchCity" :key="item.id" :to="'/address/'+item.id">
          <van-cell :title="item.name" />
        </router-link>
      </van-list>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
import { cities } from '@/api/api.js';
export default {
  name: '',
  data() {
    return {
      indexList: [
        '#',
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z'
      ],
      windowHeight: 0,
      searchValue: '', // 搜索框的值
      searchCity: '', // 搜索出来的城市
      guessCity: '', // 定位城市
      guessCityid: '', // 定位城市id
      hotCity: [], // 热门城市
      groupcity: [], // 所有城市
      scroll: null
    };
  },
  computed: {
    // 将获取的数据按照A-Z字母开头排序
    sortgroupcity() {
      const sortobj = {};
      for (let i = 65; i <= 90; i++) {
        if (this.groupcity[String.fromCharCode(i)]) {
          sortobj[String.fromCharCode(i)] = this.groupcity[
            String.fromCharCode(i)
          ];
        }
      }
      return sortobj;
    }
  },
  created() {
    this.init();
    this.windowHeight = window.innerHeight;
  },
  activated() {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: 3,
        click: true,
        mouseWheel: true
      });
    });
  },
  methods: {
    init() {
      // 获取热门城市
      cities({ type: 'hot' }).then(res => {
        this.hotCity = res;
      });
      // 获取当前城市
      cities({ type: 'guess' }).then(res => {
        this.guessCity = res.name;
        this.guessCityid = res.id;
      });

      // 获取所有城市
      cities({ type: 'group' }).then(res => {
        this.groupcity = res;
      });
    },
    onCancle() {
      this.searchValue = '';
    },
    onSearch() {},
    onInput() {
      // 输入拼音搜索
      if (/[A-Za-z]/.test(this.searchValue)) {
        let firstCode = this.searchValue[0];
        if (/[a-z]/.test(firstCode)) {
          firstCode = firstCode.toUpperCase();
        }
        this.searchCity = this.groupcity[firstCode];
        if (this.searchValue.length > 1) {
          const city = this.searchValue.toLowerCase();
          this.searchCity = this.searchCity.filter(item => {
            return item.pinyin.includes(city);
          });
        }
      }
      // 输入文字搜索
      if (/[\u4e00-\u9fa5]/.test(this.searchValue)) {
        this.searchCity = [];
        for (const key in this.groupcity) {
          const city = this.groupcity[key].filter(item => {
            return item.name.includes(this.searchValue);
          });
          this.searchCity = this.searchCity.concat(city);
        }
      }
      this.scroll.refresh();
    }
  }
};
</script>
<style  scoped lang='scss'>
.city {
  background-color: #f5f5f5;
  padding-top: 54px;
  .search-input {
    position: fixed;
    top: 0;
    z-index: 99;
    width: 100%;
  }
  .city-container {
    overflow-y: scroll;
    .section {
      padding: px2rem(24);
      background-color: #fff;
      margin-bottom: px2rem(20);
      .panel-title {
        font-weight: 400;
        font-size: px2rem(28);
        padding-bottom: px2rem(20);
      }
      .panel-content,
      .panel-lists {
        @include flex-row;
        font-size: px2rem(24);
      }
      .panel-lists:after {
        content: "";
        text-align: center;
        width: px2rem(180);
      }
      .city-tag {
        @include cTag(px2rem(180), px2rem(70));
        margin-top: px2rem(20);
        background-color: #f5f5f5;
      }
    }
  }
}
</style>
