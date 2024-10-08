<!-- 漫画详情页 -->
<template>
  <div class="comicDetails">
    <!-- <van-loading size=".8rem" v-if="!comicDetails && !comicComment" /> -->
    <div class="loading" v-if="!comicDetails && !comicComment">
      <img src="@/assets/loading.jpg" alt="" />
      怎么还没好~
    </div>
    <!-- 漫画详情主体 -->
    <div class="comicDetails_in" v-if="comicDetails && comicComment">
      <!-- 顶部图 -->
      <div
        class="topImg"
        :style="{
          backgroundImage: 'url(' + comicDetails.horizontal_cover + ')',
        }"
      >
        <div class="leftGoback" @click="goback">
          <img
            src="@/assets/images/reader/2.0x/reader_bookmark_back.png"
            alt=""
          />
        </div>
        <div class="right">
          <div class="downloard">
            <img
              src="@/assets/images/detail/detail_nav_download_icon_white.png"
              alt=""
            />
          </div>
          <div class="share">
            <img src="@/assets/images/common/common_share_white.png" alt="" />
          </div>
        </div>
        <!-- 追漫 -->
        <div class="unCollect" v-if="!collects" @click="collect">
          <svg
            height="16"
            viewBox="0 0 16 16"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m8 11.7446535 3.3184442 1.4058689c.0601236.0254715.1255686.035837.1906207.0301913.2200866-.0191006.3830179-.2130002.3639173-.4330868l-.3116051-3.59046533 2.3625164-2.72159061c.0428041-.04930977.0728859-.10834863.0876187-.1719614.0498448-.21521722-.0842161-.4300924-.2994333-.47993713l-3.5110268-.81316074-1.85832876-3.08790439c-.03366919-.05594664-.0805227-.10280015-.13646934-.13646934-.18928087-.11391094-.4350664-.05281154-.54897734.13646934l-1.85832875 3.08790439-3.51102677.81316074c-.06361276.01473284-.12265163.04481464-.17196139.08761871-.16682675.14481639-.18466967.39745307-.03985328.56427982l2.36251643 2.72159061-.31160512 3.59046533c-.00564566.0650521.00471982.1304972.03019135.1906207.08617627.2034124.32093427.2984511.52434666.2122748zm0 .7240263-3.0583843 1.2956938c-.54243304.2298034-1.16845437-.023633-1.39825776-.5660661-.06792407-.1603295-.09556536-.3348497-.08051027-.5083218l.28718524-3.30908769-2.17737068-2.50830493c-.38617705-.44487133-.33859593-1.11856914.10627539-1.50474619.13149272-.11414417.28892968-.19436231.45856373-.23364989l3.23587454-.74943494 1.71269521-2.84591143c.3037625-.504749.95919057-.66768074 1.46393957-.36391823.14919104.08978451.27413372.21472719.36391823.36391823l1.7126952 2.84591143 3.2358745.74943494c.5739126.13291929.9314084.70591976.7984891 1.27983235-.0392876.16963405-.1195058.32707102-.2336499.45856373l-2.1773707 2.50830493.2871852 3.30908769c.050935.5868976-.3835486 1.1039632-.9704462 1.1548981-.1734721.0150551-.3479923-.0125862-.5083218-.0805102z"
              fill="#fff"
            />
          </svg>
          追漫
        </div>
        <div class="collect" v-if="collects" @click="unCollect">
          <svg
            height="16"
            viewBox="0 0 16 16"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m8 12.1066667-3.18841425 1.3507813c-.37292272.1579898-.80331238-.0162477-.96130222-.3891704-.0466978-.1102266-.06570118-.2302092-.0553508-.3494713l.29939518-3.44977651-2.26994356-2.61494777c-.26549672-.30584904-.2327847-.76901629.07306434-1.03451301.09040124-.07847411.19863915-.13362408.31526256-.16063429l3.37345065-.78129784 1.78551198-2.96690792c.20883672-.34701493.65944352-.4590305 1.00645846-.25019378.10256883.06172685.18846693.14762494.25019378.25019378l1.78551198 2.96690792 3.3734507.78129784c.3945649.09138201.6403432.48531983.5489611.87988474-.0270102.11662341-.0821601.22486132-.1606342.31526256l-2.2699436 2.61494777.2993952 3.44977651c.0350178.4034921-.2636897.7589747-.6671818.7939925-.1192621.0103504-.2392447-.008653-.3494712-.0553508z"
              fill="#f9a018"
            />
          </svg>
          已追
        </div>
        <!-- <img :src="comicDetails.horizontal_cover + '@375w.jpg'" alt="" /> -->
      </div>
      <!-- 漫画详情 -->
      <div class="detailsBody">
        <!-- 漫画名 -->
        <div class="comicName">
          {{ comicDetails.title }}
        </div>
        <!-- 漫画评分及评论数 -->
        <div class="comicCommentScroll">
          <div class="comicStar" @click="watchAllComment">
            {{ beforeScrollValue | scrollValuefilter }}
            <van-rate
              v-model="scrollValue"
              readonly
              allow-half
              color="#ffd21e"
              void-icon="star"
              void-color="#eee"
              size=".3467rem"
            />
            <img
              src="@/assets/images/reader/2.0x/reader_bookmark_arrow.png"
              alt=""
            />
          </div>
          <div class="readed">
            阅读指数{{ comicComment.watch | watchFilter }}
          </div>
        </div>
        <!-- 是否连载 -->
        <div class="finished">
          <div class="isFinsih" v-if="comicDetails.is_finish == 1">已完结</div>
          <div class="isFinsih" v-if="comicDetails.is_finish == 0">
            连载中 {{ comicDetails.renewal_time }}
          </div>
        </div>
        <!-- 作者及更新情况 -->
        <div class="author">
          <div class="authorLeft">
            <span>{{ comicDetails.author_name[0] }}</span
            >·
            <span v-for="item in comicDetails.styles" :key="item.id"
              >{{ item }} </span
            >|
            <span>已更新{{ comicDetails.last_ord }}话</span>
          </div>
          <div class="moreInfoRight">
            <van-collapse v-model="activeNames" border:none>
              <van-collapse-item title="查看更多" name="1">
                <div class="authorName">
                  作者：<span
                    v-for="(item, index) in comicDetails.author_name"
                    :key="index"
                    >{{ item }}
                  </span>
                </div>
                <div class="briefInfo">
                  <div class="briefInfoLeft">简介:</div>
                  <div
                    class="briefInfoRight"
                    v-html="comicDetails.classic_lines"
                  ></div>
                </div>
              </van-collapse-item>
            </van-collapse>
          </div>
        </div>
        <!-- 互动点评及周边 -->
        <div class="comment">
          <van-tabs
            v-model="active"
            scrollspy
            sticky
            line-width=".2667rem"
            color="black"
          >
            <!-- 互动点评 -->
            <van-tab title="互动点评">
              <!-- 漫画点评 -->
              <div class="comicComment">
                <div class="top">
                  <div class="left">漫画点评</div>
                  <div class="right" @click="watchAllComment">
                    查看全部
                    <img
                      src="@/assets/images/reader/2.0x/reader_bookmark_arrow.png"
                      alt=""
                    />
                  </div>
                </div>
                <!-- 漫画评论块儿 -->
                <div
                  class="comicCommentItem"
                  v-for="(item, index) in shortReviews"
                  :key="index"
                  @click="watchAllComment"
                >
                  <!-- 评论人信息 -->
                  <div class="comicCommenterInfo">
                    <div class="userAvatar">
                      <img :src="item.face" alt="" />
                    </div>
                    <div class="userName">{{ item.nick_name }}</div>
                    <div class="comicCommentStar">
                      <van-rate
                        v-model="item.score"
                        readonly
                        allow-half
                        color="#ffd21e"
                        void-icon="star"
                        void-color="#eee"
                        size=".3467rem"
                      />
                    </div>
                  </div>
                  <div class="comicCommentText" v-html="item.content"></div>
                  <div class="like">
                    <svg
                      height="12"
                      viewBox="0 0 22 20"
                      width="14"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="m6.125 17.743635h1.35v-10.57500002h-1.35zm7.575-12.00000002h5.625c.675 0 1.35.3 1.8.9.375.525.45 1.275.3 1.875l-2.4 7.95000002c-.375 1.5-1.65 2.55-3.225 2.625h-12.6c-.975.075-1.875-.45-2.325-1.275-.225-.45-.375-.9-.375-1.35v-8.02500002c0-.975.525-1.875 1.35-2.325.45-.225.9-.3 1.35-.375h3.375l3.675-4.575c.75-.825 2.1-.9 2.925-.15.45.45.75 1.05.675 1.725zm5.475 1.35h-6.975l.15-1.575.225-2.775c.075-.375-.15-.75-.525-.825-.225-.075-.525 0-.675.225l-3.45 4.425-.45.6h-4.5c-.15 0-.3.075-.45.15-.45.225-.675.675-.675 1.125v8.02500002c0 .225.075.525.225.675.225.45.675.675 1.125.6h12.6c.3 0 .525-.075.75-.225.6-.3 1.05-.825 1.125-1.5l2.4-7.87500002 1.35.3-1.35-.3c.075-.225 0-.525-.075-.75-.225-.15-.525-.3-.825-.3l.15-1.35z"
                        fill="#6c6f7e"
                      />
                    </svg>
                    {{ item.like_count | likeFilter }}
                  </div>
                </div>
                <!-- 漫画讨论区 -->
                <div class="toComicCommentArea" @click="watchDisscuss">
                  <div class="left">漫画讨论区</div>
                  <div class="right">
                    {{ replyMainNum | replyMainNumFilter }}条评论等你来
                    <img
                      src="@/assets/images/reader/2.0x/reader_bookmark_arrow.png"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </van-tab>
            <!-- 热门周边 -->
            <van-tab title="热门周边" v-if="shopItems.length != 0">
              <div class="periphery">
                <div class="top">
                  <div class="left">热门周边</div>
                  <div class="right">
                    查看全部
                    <img
                      src="@/assets/images/reader/2.0x/reader_bookmark_arrow.png"
                      alt=""
                    />
                  </div>
                </div>
                <div class="peripherys">
                  <div
                    class="peripheryItem"
                    v-for="(item, index) in shopItems"
                    :key="index"
                    jn
                  >
                    <div class="itemImg">
                      <img :src="item.cover + '@660w.jpg'" alt="" />
                    </div>
                    <div class="itemName">{{ item.name }}</div>
                    <div class="itemPrice" v-if="item.deposit_price != 0">
                      定金￥{{ item.deposit_price | Pricefilter }}
                    </div>
                    <div class="itemPrice" v-if="item.deposit_price == 0">
                      ￥{{ item.price | Pricefilter }}
                    </div>
                  </div>
                </div>
              </div>
            </van-tab>
            <!-- 漫画推荐 -->
            <van-tab title="推荐">
              <div class="moreCommend">
                <div class="top">
                  <div class="left">更多推荐</div>
                  <div class="right">
                    <van-icon name="replay" class="right_replay" />
                    换一换
                  </div>
                </div>
                <div class="recommendComic">
                  <div
                    class="recommendComicItem"
                    v-for="(item, index) in moreRecommend.recommend_comics"
                    :key="index"
                    v-show="index < 6"
                    @click="ToComicDetails(item.id)"
                  >
                    <div class="img">
                      <img :src="item.vertical_cover + '@660w.jpg'" alt="" />
                    </div>
                    <div class="recommendComicItemComicName">
                      {{ item.title }}
                    </div>
                    <div class="comicUpdated">
                      更新至{{ item.last_short_title }}话
                    </div>
                  </div>
                </div>
              </div>
            </van-tab>
          </van-tabs>
        </div>
      </div>
    </div>
    <!-- 底部章节导航器 -->
    <div class="ListFooter" v-show="comicDetails && comicComment">
      <!-- 漫画目录 -->
      <div class="leftCatalogue" @click="showCatalogue = true">
        <div class="img">
          <img src="@/assets/images/detail/detail_bottom_chapter.png" alt="" />
        </div>
        目录
      </div>
      <!-- 漫画章节列表 -->
      <div class="comicList">
        <div
          class="comicListItem"
          v-for="(item, index) in comicDetails.ep_list"
          :key="index"
          @click="chooseThisEp(item, index)"
        >
          {{ item.short_title }}
          <svg
            v-show="item.pay_mode == 1"
            height="16"
            viewBox="0 0 16 16"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m8 1.7c1.82253967 0 3.3 1.47746033 3.3 3.3v2h.4180574c.4457594 0 .6074025.04641281.7703655.13356635.1629629.08715355.2908572.21504784.3780107.3780108.0871536.16296296.1335664.32460608.1335664.77036545v3.1541722c0 .8915187-.0928256 1.214805-.2671327 1.5407309s-.4300957.5817145-.7560216.7560216-.6492122.2671327-1.5407309.2671327h-4.8722296c-.89151874 0-1.21480498-.0928256-1.5407309-.2671327-.32592593-.1743071-.5817145-.4300957-.7560216-.7560216-.17430709-.3259259-.2671327-.6492122-.2671327-1.5407309v-3.1541722c0-.44575937.04641281-.60740249.13356635-.77036545.08715355-.16296296.21504784-.29085725.3780108-.3780108.16296296-.08715354.32460608-.13356635.77036545-.13356635h.4180574v-2c0-1.82253967 1.47746033-3.3 3.3-3.3zm0 1.6c-.93888407 0-1.7.76111593-1.7 1.7v2h3.4v-2c0-.93888407-.76111593-1.7-1.7-1.7z"
              fill="#ff9d11"
            />
          </svg>
        </div>
      </div>
      <!-- 开始阅读 -->
      <div class="BeginWatch" @click="BeginWatch">开始阅读</div>
    </div>
    <!-- 漫画目录列表 -->
    <van-action-sheet
      v-model="showCatalogue"
      :round="false"
      v-if="comicDetails"
    >
      <!-- 章节列表 -->
      <div class="catalogueList">
        <div class="top">
          <!-- 左部全部章节 -->
          <div class="topleft">
            全部章节({{ this.comicDetails.ep_list.length }})
          </div>
          <!-- 右部排序模式 -->
          <div class="topright">
            <div class="listMode" v-if="showListMode" @click="closeListModeFun">
              <svg
                height="10"
                viewBox="0 0 16 16"
                width="10"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m6.5 8.8c.38659932 0 .7.31340068.7.7v4c0 .3865993-.31340068.7-.7.7h-4c-.38659932 0-.7-.3134007-.7-.7v-4c0-.38659932.31340068-.7.7-.7zm7 3.5c.3865993 0 .7.3134007.7.7 0 .3543827-.2633436.6472582-.6050141.6936098l-.0949859.0063902h-4c-.38659932 0-.7-.3134007-.7-.7 0-.3543827.26334362-.6472582.60501415-.6936098l.09498585-.0063902zm-7.7-2.1h-2.6v2.6h2.6zm7.7-.9c.3865993 0 .7.31340068.7.7 0 .3543827-.2633436.6472582-.6050141.6936098l-.0949859.0063902h-4c-.38659932 0-.7-.3134007-.7-.7 0-.35438271.26334362-.64725823.60501415-.69360983l.09498585-.00639017zm-7-7.5c.38659932 0 .7.31340068.7.7v4c0 .38659932-.31340068.7-.7.7h-4c-.38659932 0-.7-.31340068-.7-.7v-4c0-.38659932.31340068-.7.7-.7zm7 3.5c.3865993 0 .7.31340068.7.7 0 .35438271-.2633436.64725823-.6050141.69360983l-.0949859.00639017h-4c-.38659932 0-.7-.31340068-.7-.7 0-.35438271.26334362-.64725823.60501415-.69360983l.09498585-.00639017zm-7.7-2.1h-2.6v2.6h2.6zm7.7-.9c.3865993 0 .7.31340068.7.7 0 .35438271-.2633436.64725823-.6050141.69360983l-.0949859.00639017h-4c-.38659932 0-.7-.31340068-.7-.7 0-.35438271.26334362-.64725823.60501415-.69360983l.09498585-.00639017z"
                  fill="#32aaff"
                />
              </svg>
              列表模式
            </div>
            <div
              class="abbreviationMode"
              v-if="!showListMode"
              @click="closeAbbreviationModeFun"
            >
              <svg
                height="10"
                viewBox="0 0 16 16"
                width="10"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m6.5 8.8c.38659932 0 .7.31340068.7.7v4c0 .3865993-.31340068.7-.7.7h-4c-.38659932 0-.7-.3134007-.7-.7v-4c0-.38659932.31340068-.7.7-.7zm7 3.5c.3865993 0 .7.3134007.7.7 0 .3543827-.2633436.6472582-.6050141.6936098l-.0949859.0063902h-4c-.38659932 0-.7-.3134007-.7-.7 0-.3543827.26334362-.6472582.60501415-.6936098l.09498585-.0063902zm-7.7-2.1h-2.6v2.6h2.6zm7.7-.9c.3865993 0 .7.31340068.7.7 0 .3543827-.2633436.6472582-.6050141.6936098l-.0949859.0063902h-4c-.38659932 0-.7-.3134007-.7-.7 0-.35438271.26334362-.64725823.60501415-.69360983l.09498585-.00639017zm-7-7.5c.38659932 0 .7.31340068.7.7v4c0 .38659932-.31340068.7-.7.7h-4c-.38659932 0-.7-.31340068-.7-.7v-4c0-.38659932.31340068-.7.7-.7zm7 3.5c.3865993 0 .7.31340068.7.7 0 .35438271-.2633436.64725823-.6050141.69360983l-.0949859.00639017h-4c-.38659932 0-.7-.31340068-.7-.7 0-.35438271.26334362-.64725823.60501415-.69360983l.09498585-.00639017zm-7.7-2.1h-2.6v2.6h2.6zm7.7-.9c.3865993 0 .7.31340068.7.7 0 .35438271-.2633436.64725823-.6050141.69360983l-.0949859.00639017h-4c-.38659932 0-.7-.31340068-.7-.7 0-.35438271.26334362-.64725823.60501415-.69360983l.09498585-.00639017z"
                  fill="#32aaff"
                />
              </svg>
              缩略模式
            </div>
          </div>
        </div>
        <!-- 需要硬币提示文字 -->
        <div class="needCoin">
          <img src="@/assets/images/recharge/coin_logo.png" alt="" />
          最新一话仅限漫币或通用券解锁
        </div>
        <!-- 列表模式主体 -->
        <div class="listModeBody" v-show="showListMode">
          <div
            class="listModeBodyItem"
            v-for="(item, index) in comicDetails.ep_list"
            :key="index"
            @click="chooseThisEp(item, index)"
          >
            <div class="leftImg">
              <img :src="item.cover" alt="" />
              <div class="lock" v-show="item.pay_mode == 1">
                <svg
                  v-show="item.pay_mode == 1"
                  height="16"
                  viewBox="0 0 16 16"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m8 1.7c1.82253967 0 3.3 1.47746033 3.3 3.3v2h.4180574c.4457594 0 .6074025.04641281.7703655.13356635.1629629.08715355.2908572.21504784.3780107.3780108.0871536.16296296.1335664.32460608.1335664.77036545v3.1541722c0 .8915187-.0928256 1.214805-.2671327 1.5407309s-.4300957.5817145-.7560216.7560216-.6492122.2671327-1.5407309.2671327h-4.8722296c-.89151874 0-1.21480498-.0928256-1.5407309-.2671327-.32592593-.1743071-.5817145-.4300957-.7560216-.7560216-.17430709-.3259259-.2671327-.6492122-.2671327-1.5407309v-3.1541722c0-.44575937.04641281-.60740249.13356635-.77036545.08715355-.16296296.21504784-.29085725.3780108-.3780108.16296296-.08715354.32460608-.13356635.77036545-.13356635h.4180574v-2c0-1.82253967 1.47746033-3.3 3.3-3.3zm0 1.6c-.93888407 0-1.7.76111593-1.7 1.7v2h3.4v-2c0-.93888407-.76111593-1.7-1.7-1.7z"
                    fill="#ff9d11"
                  />
                </svg>
              </div>
            </div>
            <div class="rightInfoBox">
              <div
                class="rightInfoBoxTop"
                :style="{ color: index == 0 ? 'rgb(66,176,255)' : '' }"
              >
                {{ item.ord }}&nbsp;{{ item.title }}
              </div>
              <div class="rightInfoBoxBottom">
                <div class="reply">
                  <svg
                    height="14"
                    viewBox="0 0 16 16"
                    width="16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m6.1519 15.0244c-.123.097-.275.149-.432.149-.387 0-.7-.313-.7-.7v-1.675c-2.346-.653-4.02-2.803-4.02-5.298 0-3.038 2.463-5.5 5.5-5.5h3c3.037 0 5.5 2.462 5.5 5.5 0 3.037-2.463 5.5-5.5 5.5h-.77zm2.232-3.024h1.116c2.485 0 4.5-2.015 4.5-4.5 0-2.486-2.015-4.5-4.5-4.5h-3c-2.485 0-4.5 2.014-4.5 4.5 0 2.156 1.528 3.998 3.617 4.413l.403.08v1.863z"
                      fill="#90929b"
                    />
                  </svg>
                  {{ item.comments }}
                </div>
                <div class="like">
                  <svg
                    height="14"
                    viewBox="0 0 22 20"
                    width="14"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m6.125 17.743635h1.35v-10.57500002h-1.35zm7.575-12.00000002h5.625c.675 0 1.35.3 1.8.9.375.525.45 1.275.3 1.875l-2.4 7.95000002c-.375 1.5-1.65 2.55-3.225 2.625h-12.6c-.975.075-1.875-.45-2.325-1.275-.225-.45-.375-.9-.375-1.35v-8.02500002c0-.975.525-1.875 1.35-2.325.45-.225.9-.3 1.35-.375h3.375l3.675-4.575c.75-.825 2.1-.9 2.925-.15.45.45.75 1.05.675 1.725zm5.475 1.35h-6.975l.15-1.575.225-2.775c.075-.375-.15-.75-.525-.825-.225-.075-.525 0-.675.225l-3.45 4.425-.45.6h-4.5c-.15 0-.3.075-.45.15-.45.225-.675.675-.675 1.125v8.02500002c0 .225.075.525.225.675.225.45.675.675 1.125.6h12.6c.3 0 .525-.075.75-.225.6-.3 1.05-.825 1.125-1.5l2.4-7.87500002 1.35.3-1.35-.3c.075-.225 0-.525-.075-.75-.225-.15-.525-.3-.825-.3l.15-1.35z"
                      fill="#6c6f7e"
                    />
                  </svg>
                  {{ item.like_count }}
                </div>
              </div>
            </div>
          </div>
          <div class="isBottom">到底啦~</div>
        </div>
        <!-- 缩略模式主体 -->
        <div class="abbreviationMode" v-show="!showListMode">
          <div
            class="abbreviationModeItem"
            v-for="(item, index) in comicDetails.ep_list"
            :key="index"
            @click="chooseThisEp(item, index)"
            :style="{ border: index == 0 ? '1px solid rgb(94,188,255)' : '' }"
          >
            {{ item.ord }}
            <svg
              v-show="item.pay_mode == 1"
              height="12"
              viewBox="0 0 16 16"
              width="12"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m8 1.7c1.82253967 0 3.3 1.47746033 3.3 3.3v2h.4180574c.4457594 0 .6074025.04641281.7703655.13356635.1629629.08715355.2908572.21504784.3780107.3780108.0871536.16296296.1335664.32460608.1335664.77036545v3.1541722c0 .8915187-.0928256 1.214805-.2671327 1.5407309s-.4300957.5817145-.7560216.7560216-.6492122.2671327-1.5407309.2671327h-4.8722296c-.89151874 0-1.21480498-.0928256-1.5407309-.2671327-.32592593-.1743071-.5817145-.4300957-.7560216-.7560216-.17430709-.3259259-.2671327-.6492122-.2671327-1.5407309v-3.1541722c0-.44575937.04641281-.60740249.13356635-.77036545.08715355-.16296296.21504784-.29085725.3780108-.3780108.16296296-.08715354.32460608-.13356635.77036545-.13356635h.4180574v-2c0-1.82253967 1.47746033-3.3 3.3-3.3zm0 1.6c-.93888407 0-1.7.76111593-1.7 1.7v2h3.4v-2c0-.93888407-.76111593-1.7-1.7-1.7z"
                fill="#ff9d11"
              />
            </svg>
          </div>
        </div>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
//这里可以导入其他文件(比如:组件,工具js,第三方插件js,json文件,图片文件等等)
//例如:import 《组件名称》 from '《组件路径》';
import { Dialog } from "vant";
import {
  getComicDetail,
  getReviewDetailByComicID,
  getReplyMain,
  getShopItems,
  moreRecommend,
} from "@/api/comic";
import { Toast } from "vant";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      active: 0,
      activeNames: ["0"],
      comicId: "",
      comicDetails: "",
      masking: {},
      comicComment: "",
      scrollValue: 3.5,
      beforeScrollValue: 5,
      shortReviews: "",
      replyMainNum: "",
      shopItems: "",
      moreRecommend: "",
      comicList: "",
      collects: false,
      showCatalogue: false,
      showListMode: true,
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    /* 获取漫画详情方法 */
    getComicDetailFun() {
      this.comicId = this.$route.query.comicId;
      console.log("漫画Id", this.comicId);
      getComicDetail({ comicId: this.comicId }).then((data) => {
        this.comicDetails = data.data;
        this.comicList = data.data.ep_list.reverse();
        console.log("漫画信息", this.comicDetails);
      });
    },
    /* 返回按钮方法 */
    goback() {
      this.$router.go(-1);
    },
    /* 获取精选漫画点评方法 */
    getReviewDetailByComicIDFun() {
      this.comicId = this.$route.query.comicId;
      getReviewDetailByComicID({
        comicId: this.comicId,
      }).then((data) => {
        this.comicComment = data.data;
        /* 漫画评分 */
        this.scrollValue = this.comicComment.score / 2;
        this.beforeScrollValue = this.comicComment.score;
        this.shortReviews = this.comicComment.short_reviews;
        console.log("漫画精选点评", this.comicComment);
      });
    },
    /* 获取漫画评论列表方法 */
    getReplyMainFun() {
      this.comicId = this.$route.query.comicId;
      getReplyMain({
        oid: this.comicId,
      }).then((data) => {
        this.replyMainNum = data.data.cursor.all_count;
        console.log("漫画评论列表数量", this.replyMainNum);
      });
    },
    /* 获取漫画周边方法 */
    getShopItemsFun() {
      this.comicId = this.$route.query.comicId;
      getShopItems({
        comicId: this.comicId,
      }).then((data) => {
        this.shopItems = data.data.items;
        console.log("周边商品", this.shopItems);
      });
    },
    /* 获取漫画推荐方法 */
    moreRecommendFun() {
      this.comicId = this.$route.query.comicId;
      moreRecommend({
        comicId: this.comicId,
      }).then((data) => {
        this.moreRecommend = data.data;
        console.log("漫画推荐", this.moreRecommend);
      });
    },
    /* 跳转该章节方法 */
    chooseThisEp(item, index) {
      if (item.pay_mode == 1) {
        Toast("该章节需付费解锁，解锁后再试吧~");
        return;
      }
      this.$router.push({
        name: "comicview",
        query: {
          epId: item.epId,
          index: index,
          ep_list: this.comicDetails.ep_list,
        },
      });
    },
    /* 跳转漫画详情页 */
    async ToComicDetails(id) {
      let index = "";
      let ep_list = "";
      console.log("当前选择漫画Id为", id);
      await getComicDetail({ comicId: id }).then((data) => {
        index = 0;
        ep_list = data.data.ep_list.reverse();
        console.log(index, ep_list);
      });
      this.$router.push({
        name: "comicview",
        query: { index: index, ep_list: ep_list, comicId: id },
      });
    },
    /* 开始阅读 */
    BeginWatch() {
      this.$router.push({
        name: "comicview",
        query: {
          index: 0,
          ep_list: this.comicDetails.ep_list,
        },
      });
    },
    /* 查看漫画点评列表 */
    watchAllComment() {
      this.$router.push({
        name: "commentview",
        query: {
          comicName: this.comicDetails.title,
          comicStar: this.beforeScrollValue,
          comicId: this.$route.query.comicId,
        },
      });
    },
    /* 查看讨论区列表 */
    watchDisscuss() {
      this.$router.push({
        name: "discussview",
        query: {
          comicId: this.$route.query.comicId,
        },
      });
    },
    /*追漫按钮 */
    collect() {
      this.collects = true;
      Toast("追漫成功~");
      let collectSusscss = {
        code: 200,
        type: 0,
        actions: "成功",
      };
      console.log(collectSusscss);
    },
    /* 取消追漫按钮 */
    unCollect() {
      Dialog.confirm({
        title: "是否取消追漫?",
        message: "人家那么好看，给个机会吧~",
      })
        .then(() => {
          this.collects = false;
          Toast("取消追漫成功~");
          let collectSusscss = {
            code: 200,
            type: 1,
            actions: "取消",
          };
          console.log(collectSusscss);
        })
        .catch(() => {
          // on cancel
        });
    },
    /* 显示缩略模式 */
    closeListModeFun() {
      this.showListMode = false;
    },
    /* 显示列表模式 */
    closeAbbreviationModeFun() {
      this.showListMode = true;
    },
  },
  filters: {
    /* 星级评分过滤器 */
    scrollValuefilter(scrollValuefilter) {
      let afterscrollValuefilter = "";
      afterscrollValuefilter = scrollValuefilter.toFixed(1);
      return afterscrollValuefilter;
    },
    /* 阅读量过滤器 */
    watchFilter(value) {
      if (value < 10000) {
        return value;
      }
      let w = value > 10000 ? value / 10000 : value;
      let y = w > 10000 ? w.toFixed(1) + "亿" : w.toFixed(1) + "万";
      return y;
    },
    /* 点赞过滤器 */
    likeFilter(value) {
      if (value < 10000) {
        return value;
      }
      let w = value > 10000 ? value / 10000 : value;
      let y = w > 10000 ? w.toFixed(1) + "亿" : w.toFixed(1) + "w";
      return y;
    },
    /* 评论数过滤器 */
    replyMainNumFilter(value) {
      if (value < 10000) {
        return value;
      }
      let w = value > 10000 ? value / 10000 : value;
      let y = w > 10000 ? w.toFixed(1) + "亿+" : w.toFixed(1) + "w+";
      return y;
    },
    /* 价格过滤器 */
    Pricefilter(price) {
      let fen = price / 100;
      return fen;
    },
  },
  //生命周期 - 创建完成(可以访问当前this实例)
  created() {
    this.getComicDetailFun();
    this.getReviewDetailByComicIDFun();
    this.getReplyMainFun();
    this.getShopItemsFun();
    this.moreRecommendFun();
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
<style lang="scss" scoped>
.van-cell {
  background-color: transparent;
}
.comicDetails {
  width: 100vw;
  .loading {
    width: 3.8667rem;
    height: 1.6rem;
    margin: auto;
    margin-top: 40vh;
    display: flex;
    align-items: center;
    font-size: 0.3733rem;
    color: rgb(173, 174, 181);
    img {
      height: 1.3333rem;
    }
  }
  font-family: "mine";
  .comicDetails_in {
    max-width: 750px;
    min-width: 375px;
    margin: 0 auto;
    /* 顶部图 */
    .topImg {
      background-size: cover;
      height: 5.8667rem;
      padding: 0.3733rem;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      position: relative;
      .leftGoback {
        width: 0.5333rem;
        height: 0.5333rem;
        img {
          width: 0.5333rem;
        }
      }
      .right {
        display: flex;
        .downloard {
          width: 0.5333rem;
          height: 0.5333rem;
          margin-right: 0.5333rem;
          img {
            width: 0.5333rem;
          }
        }
        .share {
          width: 0.5333rem;
          height: 0.5333rem;
          img {
            width: 0.5333rem;
          }
        }
      }
      .unCollect {
        font-size: 0.3733rem;
        width: 1.8667rem;
        height: 0.8533rem;
        line-height: 0.8533rem;
        position: absolute;
        bottom: -0.1333rem;
        right: 0.2667rem;
        color: white;
        background-color: rgb(255, 157, 17);
        align-items: center;
      }
      .collect {
        font-size: 0.3733rem;
        width: 1.8667rem;
        height: 0.8533rem;
        line-height: 0.8533rem;
        position: absolute;
        bottom: -0.1333rem;
        right: 0.2667rem;
        color: white;
        background-color: rgb(210, 211, 217);
      }
    }
    /* 主体 */
    .detailsBody {
      /* 漫画名 */
      .comicName {
        margin: 0.3733rem 0.3733rem 0.2667rem 0.3733rem;
        font-size: 0.4533rem;
        text-align: left;
      }
      /* 漫画分数及阅读数 */
      .comicCommentScroll {
        display: flex;
        margin-left: 0.3733rem;
        /* 星分 */
        .comicStar {
          width: 3.0133rem;
          height: 0.4533rem;
          font-size: 0.3467rem;
          display: flex;
          align-items: center;
          margin-right: 0.2133rem;
          padding: 0.1333rem 0.1867rem 0.1333rem 0.1867rem;
          border-radius: 0.08rem;
          background-color: rgb(245, 246, 248);
          img {
            width: 0.3467rem;
          }
        }
        /* 阅读数 */
        .readed {
          font-size: 0.2933rem;
          padding: 0.1333rem 0.1867rem 0.1333rem 0.1867rem;
          border-radius: 0.08rem;
          background-color: rgb(245, 246, 248);
        }
      }
      /* 是否完结 */
      .finished {
        margin-top: 0.2667rem;
        margin-left: 0.3733rem;
        .isFinsih {
          text-align: left;
          font-size: 0.2933rem;
        }
      }
      /* 作者 */
      .author {
        margin: 0rem 0.3733rem;
        margin-top: 0.2667rem;
        font-size: 0.2667rem;
        color: rgb(155, 157, 165);
        .authorLeft {
          text-align: left;
        }
        .moreInfoRight {
          ::v-deep .van-collapse {
            .van-cell {
              background-color: none;
              line-height: 0.48rem;
            }
            .van-collapse-item {
              .van-collapse-item__title {
                right: 0rem;
                top: -0.4rem;
                position: absolute;
                color: rgb(155, 157, 165);
                font-size: 0.2667rem;
                border: none;
                width: 1.8133rem;
                padding: 0;
              }
              .van-collapse-item__content {
                padding: 0;
              }
            }
            .authorName {
              text-align: left;
            }
            .briefInfo {
              display: flex;
              .briefInfoLeft {
                width: 0.8533rem;
              }
              .briefInfoRight {
                width: 8.2667rem;
                text-align: left;
              }
            }
          }
          ::after {
            font-size: 0.2667rem;
            border: none;
          }
        }
      }
      /*  */
      .comment {
        .van-tabs {
          ::v-deep .van-sticky {
            /* padding-bottom: .1333rem; */
            border: 0.0267rem solid rgb(244, 244, 244);
            .van-tab {
              width: 4rem;
              font-size: 0.32rem;
              flex: 0;
              span {
                width: 1.7333rem;
              }
            }
          }
          /* 漫画精选评 */
          .comicComment {
            padding-bottom: 0.3733rem;
            border-bottom: 0.0267rem solid rgb(244, 244, 244);
            .top {
              margin: 0.3733rem;
              display: flex;
              justify-content: space-between;
              align-items: center;
              .left {
                font-size: 0.3733rem;
              }
              .right {
                color: rgb(183, 184, 190);
                font-size: 0.32rem;
                img {
                  width: 0.32rem;
                  height: 0.32rem;
                }
              }
            }
            .comicCommentItem {
              margin: 0.3733rem;
              .comicCommenterInfo {
                display: flex;
                align-items: center;
                margin-bottom: 0.1333rem;
                .userAvatar {
                  img {
                    width: 0.7467rem;
                    height: 0.7467rem;
                    border-radius: 50%;
                  }
                }
                .userName {
                  margin: 0 0.1333rem;
                  font-size: 0.2667rem;
                }
              }
              .comicCommentText {
                margin-bottom: 0.1333rem;
                font-size: 0.2667rem;
                text-align: left;
              }
              .like {
                font-size: 0.2667rem;
                text-align: left;
              }
            }
          }
          .toComicCommentArea {
            height: 1.1467rem;
            margin: 0 0.3733rem;
            padding: 0 0.3733rem;
            border-radius: 0.08rem;
            background-color: rgb(245, 246, 248);
            display: flex;
            justify-content: space-between;
            align-items: center;
            .left {
              font-size: 0.3467rem;
            }
            .right {
              font-size: 0.2667rem;
              color: rgb(164, 166, 173);
              img {
                width: 0.2667rem;
              }
            }
          }
          .periphery {
            padding-bottom: 0.3733rem;
            border-bottom: 0.0267rem solid rgb(244, 244, 244);
            .top {
              margin: 0.3733rem;
              display: flex;
              justify-content: space-between;
              align-items: center;

              .left {
                font-size: 0.3733rem;
              }
              .right {
                color: rgb(183, 184, 190);
                font-size: 0.32rem;
                img {
                  width: 0.32rem;
                  height: 0.32rem;
                }
              }
            }
            .peripherys {
              display: flex;
              overflow: scroll;
              .peripheryItem {
                width: 2.0267rem;
                height: 3.6rem;
                margin: 0.2667rem;
                .itemImg {
                  img {
                    width: 2.0267rem;
                    height: 2.0267rem;
                  }
                }
                .itemName {
                  height: 0.8rem;
                  text-align: left;
                  font-size: 0.24rem;
                  overflow: hidden;
                  -webkit-line-clamp: 1;
                  -webkit-box-orient: vertical;
                  text-overflow: ellipsis;
                  margin: 0.2133rem 0;
                }
                .itemPrice {
                  text-align: left;
                  font-size: 0.24rem;
                  color: rgb(255, 111, 148);
                }
              }
            }
          }
          .moreCommend {
            margin-bottom: 1.2rem;
            padding-top: 0.3733rem;
            .top {
              margin: 0 0.3733rem;
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding-bottom: 0.3733rem;
              .left {
                font-size: 0.3733rem;
              }
              .right {
                color: rgb(183, 184, 190);
                font-size: 0.32rem;
                .right_replay {
                  width: 0.32rem;
                }
              }
            }
            .recommendComic {
              display: flex;
              justify-content: space-around;
              flex-wrap: wrap;
              align-items: center;
              .recommendComicItem {
                width: 2.9867rem;
                margin-bottom: 0.4rem;
                .img {
                  img {
                    width: 2.9867rem;
                    height: 4.1067rem;
                    border-radius: 0.08rem;
                  }
                }
                .recommendComicItemComicName {
                  margin: 0.08rem 0;
                  text-align: left;
                  font-size: 0.3733rem;
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                }
                .comicUpdated {
                  text-align: left;
                  font-size: 0.2667rem;
                  color: rgb(185, 187, 193);
                }
              }
            }
          }
        }
      }
    }
  }
  .ListFooter {
    max-width: 750px;
    min-width: 375px;
    margin: 0 auto;
    height: 1.2rem;
    bottom: 0;
    background-color: white;
    position: sticky;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0 0 0.3733rem;
    box-sizing: border-box;
    .leftCatalogue {
      font-size: 0.32rem;
      color: rgb(127, 133, 143);
      .img {
        img {
          height: 0.72rem;
        }
      }
    }
    .comicList {
      width: 100%;
      display: flex;
      overflow: scroll;
      .comicListItem {
        flex: none;
        width: 1.3333rem;
        line-height: 0.8rem;
        margin: 0 0.1333rem;
        height: 0.8rem;
        font-size: 0.32rem;
        color: rgb(186, 187, 194);
        background-color: rgb(250, 250, 251);
        position: relative;
        svg {
          position: absolute;
          top: -0.0267rem;
          right: -0.1867rem;
        }
      }
    }
    .BeginWatch {
      width: 3.2rem;
      height: 1.2rem;
      line-height: 1.2rem;
      font-size: 0.32rem;
      color: white;
      background-color: rgb(50, 170, 255);
    }
  }
}
.catalogueList {
  height: 10.8rem;
  padding: 0.3733rem;
  box-sizing: border-box;
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .topleft {
      display: flex;
      font-size: 0.3733rem;
    }
    .topright {
      display: flex;
      font-size: 0.2667rem;
      color: rgb(158, 159, 167);
    }
  }
  .needCoin {
    margin: 0.4267rem 0;
    text-align: left;
    font-size: 0.32rem;
    img {
      margin-right: 0.16rem;
      width: 0.32rem;
    }
  }
  .listModeBody {
    .listModeBodyItem {
      display: flex;
      text-align: left;
      margin-bottom: 0.2667rem;
      .leftImg {
        position: relative;
        img {
          display: block;
          width: 2.4rem;
          height: 1.3333rem;
        }
        .lock {
          width: 100%;
          position: absolute;
          bottom: 0;
          height: 0.4rem;
          background-color: rgba($color: #000000, $alpha: 0.5);
          svg {
            margin-left: 1.0667rem;
          }
        }
      }
      .rightInfoBox {
        margin-left: 0.32rem;
        display: flex;
        flex-wrap: wrap;
        flex-flow: column;
        justify-content: space-between;
        .rightInfoBoxTop {
          font-size: 0.32rem;
        }
        .rightInfoBoxBottom {
          display: flex;
          font-size: 0.2133rem;
          .reply {
            margin-right: 0.3733rem;
          }
        }
      }
    }
    .isBottom {
      text-align: center;
      margin: 0.6933rem 0;
      font-size: 0.2133rem;
      color: rgb(196, 197, 200);
    }
  }
  .abbreviationMode {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    .abbreviationModeItem {
      display: flex;
      justify-content: space-around;
      align-items: center;
      text-align: center;
      width: 2.1333rem;
      height: 0.6667rem;
      border: 0.0267rem solid rgb(220, 220, 220);
      border-radius: 0.08rem;
      position: relative;
      margin-bottom: 0.2667rem;
      svg {
        top: -0.1333rem;
        right: -0.16rem;
        position: absolute;
      }
    }
  }
}
</style>