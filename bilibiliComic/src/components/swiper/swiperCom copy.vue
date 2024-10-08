<!--  -->
<template>
  <div class="swiperDemo">
    <div class="swiper-container">
      <div class="swiper-wrapper" v-if="banner == null">
        <img
          class="loading"
          src="http://s1.hdslb.com/bfs/manga-static/manga-mobile/static/img/670007b907d30e5.png"
          alt=""
        />
      </div>
      <div class="swiper-wrapper" v-if="banner">
        <div class="swiper-slide" v-for="(item, index) in banner" :key="index">
          <!-- <img class="bannerImg" src="../../assets/banner/2B14.png" alt="" /> -->
          <img class="bannerImg" :src="item.img" alt="" />
          <h3>{{ item.title }}</h3>
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <!-- <div class="swiper-pagination"></div> -->

      <!-- 如果需要导航按钮 -->
      <!-- <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div> -->

      <!-- 如果需要滚动条 -->
      <!-- <div class="swiper-scrollbar"></div> -->
    </div>
  </div>
</template>
<!-- 加载图  http://s1.hdslb.com/bfs/manga-static/manga-mobile/static/img/670007b907d30e5.png -->
<!-- 失败图  http://s1.hdslb.com/bfs/manga-static/manga-mobile/static/img/e36d9fdb4faf705.png -->
<script>
//这里可以导入其他文件(比如:组件,工具js,第三方插件js,json文件,图片文件等等)
//例如:import 《组件名称》 from '《组件路径》';
import Swiper from "swiper";
import { getBanner } from "../../api/home";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      banner: null,
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    /* 获取轮播图数据方法 */
    getBannerFun() {
      getBanner().then((data) => {
        this.banner = data.data;
        console.log("轮播图数据", this.banner);
      });
    },
  },
  //生命周期 - 创建完成(可以访问当前this实例)
  created() {
    this.getBannerFun();
  },
  //生命周期 - 挂载完成(可以访问DOM元素)
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {
    /* swiper真实Dom挂载 */
    new Swiper(".swiper-container", {
      //direction: "vertical", // 垂直切换选项
      loop: true, // 循环模式选项

      // 如果需要分页器
      pagination: {
        el: ".swiper-pagination",
      },

      // 如果需要前进后退按钮
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },

      // 如果需要滚动条
      scrollbar: {
        el: ".swiper-scrollbar",
      },
    });
  }, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能,这个函数会触发
};
</script>
<style  lang="scss" scoped>
@import "../../../node_modules/swiper/css/swiper.css";
.swiper-container {
  max-width: 750px;
  min-width: 375px;
  height: 300px;
  margin: 0 auto;
  .swiper-wrapper {
    .loading {
      width: 100%;
    }
    .swiper-slide {
      .bannerImg {
        width: 100%;
      }
    }
  }
}
</style>