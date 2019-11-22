<template>
  <div class="city">
    <van-search
      v-model="searchValue"
      placeholder="请输入城市名或拼音"
      show-action
      shape="round"
      @search="onSearch"
      class="search-input"
    >
      <div slot="action" @click="onCancle">取消</div>
    </van-search>
    <div class="city-container">
      <section class="panel section">
        <h6 class="panel-title">当前定位</h6>
        <div class="panel-content">
          <span>{{guessCity}}</span>
          <span>重新定位</span>
        </div>
      </section>
      <section class="section">
        <van-index-bar v-if="groupcity" :index-list="indexList">
          <div class="panel" v-if="hotCity">
            <van-index-anchor index="#" :style="{opacity:0,height:0}" />
            <h6 class="panel-title">热门城市</h6>
            <div class="panel-lists">
              <span v-for="(item,index) in hotCity" :key="index" class="city-tag">{{item.name}}</span>
            </div>
          </div>
          <div v-for="(value,key,index) in sortgroupcity" :key="index">
            <van-index-anchor :index="key" />
            <van-cell v-for="(item,vIndex) in value" :title="item.name" :key="vIndex" />
          </div>
        </van-index-bar>
      </section>
    </div>
  </div>
</template>

<script>
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
      searchValue: '',
      guessCity: '',
      guessCityid: '',
      hotCity: [],
      groupcity: []
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
    onCancle() {},
    onSearch() {}
  }
};
</script>
<style  scoped lang='scss'>
.city {
  background-color: #f5f5f5;
  .search-input {
    position: fixed;
    top: 0;
    z-index: 99;
    width: 100%;
  }
  .city-container {
    margin-top: 54px;
    height: calc(100vh - 54px);
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
