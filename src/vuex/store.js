/**
 * Created by 林 on 2017/8/24 0024.
 */
import Vue from 'vue'
import Vuex from 'vuex'

import State from './state'
import Actions from './actions'
import Mtations from './mutations'

Vue.use(Vuex);



//变量存储
const state = State;
// let state = {
//   initFinish:false,//载入初始化是否完成
//   currentUser:'1111',
//   titleAll:'是的冯绍峰',
// }
const mutations = Mtations;
const actions = Actions;

export  default new Vuex.Store({
  state,
  mutations,
  actions
})
