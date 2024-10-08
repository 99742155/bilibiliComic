<!-- 底部导航栏 -->
<template>
  <div class="bottomNav">
    <div class="bottomNav-in">
      <van-tabbar route v-model="active">
        <van-tabbar-item replace :to="{ name: 'home' }">
          <template>
            <img
              v-show="active != 0"
              src="@/assets/images/tabbar/light/tab_home_n.png"
              alt=""
            />
            <img
              v-show="active == 0"
              src="@/assets/images/tabbar/light/tab_home.png"
              alt=""
            />
            <br />
            首页
          </template>
        </van-tabbar-item>
        <!-- <van-tabbar-item replace :to="{ name: 'shop' }">
        <template>
          <img
            v-show="active != 1"
            src="@/assets/images/tabbar/light/tab_mall_n.png"
            alt=""
          />
          <img
            v-show="active == 1"
            src="@/assets/images/tabbar/light/tab_mall.png"
            alt=""
          />
          <br />
          商城
        </template>
      </van-tabbar-item> -->
        <van-tabbar-item replace :to="{ name: 'bookshelf' }">
          <template>
            <img
              v-show="active != 1"
              src="@/assets/images/tabbar/light/tab_bookshelf_n.png"
              alt=""
            />
            <img
              v-show="active == 1"
              src="@/assets/images/tabbar/light/tab_bookshelf.png"
              alt=""
            />
            <br />
            书架
          </template>
        </van-tabbar-item>
        <van-tabbar-item replace :to="{ name: 'my' }">
          <template>
            <img
              v-show="active != 2"
              src="@/assets/images/tabbar/light/tab_mine_n.png"
              alt=""
            />
            <img
              v-show="active == 2"
              src="@/assets/images/tabbar/light/tab_mine.png"
              alt=""
            />
            <br />
            我的
          </template>
        </van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件(比如:组件,工具js,第三方插件js,json文件,图片文件等等)
//例如:import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      active: 0,
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
  //生命周期 - 创建完成(可以访问当前this实例)
  created() {},
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
<style  lang="scss" scoped>
.bottomNav {
  min-width: 375px;
  max-width: 750px;
  margin: 0 auto;
  .bottomNav-in {
    .van-tabbar {
      min-width: 375px;
      max-width: 750px;
      margin: 0 auto;
      left: unset;
      .van-tabbar-item {
        img {
          width: 0.6rem;
          height: 0.6rem;
        }
      }
    }
  }
}
</style>