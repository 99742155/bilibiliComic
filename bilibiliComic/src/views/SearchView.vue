<!-- 搜索页 -->
<template>
  <transition name="fade" mode="in-out">
    <div class="searchView">
      <!-- 搜索框 -->
      <form action="/">
        <van-search
          shape="round"
          v-model="Searchvalue"
          show-action
          placeholder="请输入搜索关键词"
          @search="onSearch"
          @cancel="onCancel"
        />
      </form>
      <!-- 搜索历史 -->
      <div class="searchHistory" v-show="!Searchvalue">
        <div class="searchHistoryTop">
          <div class="searchHistoryTop_left">搜索历史</div>
          <div class="searchHistoryTop_right">
            <van-icon name="delete-o" />
          </div>
        </div>
        <div class="searchHistoryList">
          <div
            class="searchHistoryItem"
            v-for="(item, index) in searchHistory"
            :key="index"
            @click="choose(item.name)"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
      <!-- 热门搜索 -->
      <div class="searchHot" v-show="!Searchvalue">
        <div class="searchHotTop">热门搜索</div>
        <van-loading type="spinner" v-if="!searchRecommend" />
        <div class="searchHotList" v-if="searchRecommend">
          <div
            class="searchListItem"
            v-for="(item, index) in searchRecommend"
            :key="index"
            v-show="index < 6"
            @click="ToComicDetails(item.season_id)"
          >
            <div class="searchListItemleft">
              {{ index + 1 }}
              <img :src="item.vertical_cover + '@37w.jpg'" alt="" />
            </div>
            <div class="searchListItemRight">
              <div class="searchListItemRightName">{{ item.title }}</div>
              <div class="searchListItemRightStyle">{{ item.styles[0] }}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 搜索关键词 -->
      <div class="searchRecommendText" v-show="Searchvalue">
        <ul>
          <van-loading type="spinner" v-if="!getSearchSugResult" />
          <li
            v-for="(item, index) in getSearchSugResult"
            :key="index"
            @click="choose(item)"
          >
            <!-- <li v-for="(item, index) in getSearchSugResult" :key="index"> -->
            <van-icon name="search" /><span v-html="item"></span>
            <!-- </li> -->
          </li>
        </ul>
      </div>
      <!-- 广告轮播图 -->
    </div>
  </transition>
</template>

<script>
//这里可以导入其他文件(比如:组件,工具js,第三方插件js,json文件,图片文件等等)
//例如:import 《组件名称》 from '《组件路径》';
import {
  getSearchRecommend,
  getSearchBanner,
  getSearchSug,
} from "@/api/search";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      Searchvalue: null,
      searchHistory: [
        {
          name: "トニカクカワイイ",
        },
        {
          name: "电锯人",
        },
        {
          name: "间谍过家家",
        },
        {
          name: "123",
        },
      ],
      searchRecommend: "",
      searchBanner: "",
      getSearchSugResult: "",
      chooseSearch: "",
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    Searchvalue: function () {
      console.log(this.Searchvalue);
      if (this.Searchvalue != null && this.Searchvalue != "") {
        console.log("搜索关键词中");
        /* 搜索关键词方法 */
        getSearchSug({ term: this.Searchvalue }).then((data) => {
          this.getSearchSugResult = data.data;
          console.log(this.getSearchSugResult);
        });
      }
    },
  },
  //方法集合
  methods: {
    onSearch(val) {
      val;
      this.$router.push({
        name: "aftersearch",
        query: { aftersearch: val },
      });
    },
    /* 点击取消返回 */
    onCancel() {
      this.$router.go(-1);
    },
    /* 热门搜索方法 */
    getSearchRecommendFun() {
      getSearchRecommend({ num: 6 + 1 }).then((data) => {
        this.searchRecommend = data.data;
        console.log("热门搜索", data);
      });
    },
    /* 热门搜索轮播图 */
    getSearchBannerFun() {
      getSearchBanner().then((data) => {
        this.searchBanner = data;
        console.log("搜索轮播图", this.searchBanner);
      });
    },
    /* 选择该条搜索 */
    choose(item) {
      let a = item.replace(/<[^>]+>/g, "");
      console.log(a);
      this.$router.push({
        name: "aftersearch",
        query: { aftersearch: a },
      });
    },
    /* 跳转漫画详情页方法 */
    ToComicDetails(comicId) {
      this.$router.push({
        name: "comicdetails",
        query: {
          comicId: comicId,
        },
      });
    },
  },

  filters: {
    searchText(searchtext) {
      let afterSearchtext = "";
      afterSearchtext = searchtext.replace(/<[^>]+>/g, "");
      return afterSearchtext;
    },
  },
  //生命周期 - 创建完成(可以访问当前this实例)
  created() {
    this.getSearchRecommendFun();
    this.getSearchBannerFun();
  },
  //生命周期 - 挂载完成(可以访问DOM元素)
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能,这个函数会触发
};
</script>
<style lang="scss"  scoped>
.searchView {
  max-width: 20rem;
  min-width: 10rem;
  padding: 0 .2667rem 0 .2667rem;
  box-sizing: border-box;
  /* 搜索框 */
  .van-search {
    padding: .2933rem 0;
    border-bottom: .0267rem solid rgb(246, 246, 246);
  }
  /* 历史搜索 */
  .searchHistory {
    /* 历史搜索顶部文字 */
    .searchHistoryTop {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: .2667rem 0;
      .searchHistoryTop_left {
        font-size: .32rem;
        color: rgb(194, 195, 201);
      }
      .searchHistoryTop_right {
        margin-right: .32rem;
      }
    } /* 历史搜索列表 */
    .searchHistoryList {
      display: flex;
      .searchHistoryItem {
        font-size: .32rem;
        padding: .16rem;
        margin-right: .1867rem;
        border-radius: .1333rem;
        background-color: rgb(241, 241, 243);
      }
    }
  }
  /* 热门搜索 */
  .searchHot {
    .searchHotTop {
      padding: .2667rem 0;
      text-align: left;
      font-size: .32rem;
      color: rgb(194, 195, 201);
    }
    /* 热搜列表 */
    .searchHotList {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      /* 热搜块儿 */
      .searchListItem {
        width: 4.6667rem;
        height: 1.28rem;
        display: flex;
        margin-bottom: .4267rem;
        /* 热搜块儿左部 */
        .searchListItemleft {
          font-weight: bolder;
          display: flex;
          align-items: center;
          img {
            width: .9867rem;
            height: 1.28rem;
            margin: 0 .2133rem;
          }
        }
        .searchListItemleft:nth-child(1) {
          color: rgb(235, 98, 98);
        }
        .searchListItemleft:nth-child(2) {
          color: rgb(188, 188, 188);
        }
        /* 热搜块儿右部 */
        .searchListItemRight {
          text-align: left;
          margin: auto 0;
          .searchListItemRightName {
            width: 2.9333rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-size: .32rem;
          }
          .searchListItemRightStyle {
            margin-top: .16rem;
            font-size: .2667rem;
            color: rgb(164, 166, 174);
          }
        }
      }
    }
  }
  .searchRecommendText {
    ul {
      li {
        width: 100%;
        box-sizing: border-box;
        height: 1.0667rem;
        line-height: 1.0667rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: flex;
        align-items: center;
        padding: 0 .32rem;
        border-bottom: .0267rem solid rgb(242, 242, 242);
        .van-icon {
          font-size: .4267rem;
        }
        span {
          margin-left: .4rem;
          font-size: .32rem;
          ::v-deep .keyword {
            font-style: normal;
            color: rgb(84, 184, 255);
          }
        }
      }
    }
  }
}

/* ，.fade-leave-active  */
.fade-enter-active {
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>