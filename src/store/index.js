import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //漫画ID
    comicId: '',
    //漫画目录列表
    ep_list: '',
    //漫画下标
    index: '',

  },
  getters: {},
  mutations: {
    //修改漫画ID方法
    getComicIdFun(state, comicId) {
      state.comicId = comicId
    },
    //修改漫画目录列表方法
    getepListFun(state, ep_list) {
      state.ep_list = ep_list
    },
    //修改漫画下标方法
    getIndexFun(state, index) {
      state.index = index
    }
  },
  actions: {},
  modules: {}
})