// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './vuex/store.js';
import ElementUI from 'element-ui'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/base.less';
import './assets/css/css.less'

import App from './App'
import router from './router'

Vue.use(ElementUI)
Vue.use(Element, { size: 'small' })
Vue.config.productionTip = false


router.beforeEach((to, from, next) => {
  /**
   * 监听初始化是否完成
   * @type {number}
   */
  var watchBmob = setInterval(function () {
    if(store.state.initFinish === true){
      clearInterval(watchBmob);
      next();
    }else{
      console.log("监听....")
    }
  },200);

});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  mounted:function(){
    store.commit('initBmob');
  }
})
