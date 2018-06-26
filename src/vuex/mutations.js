
export default {

  //初始化
  initBmob:function (state) {
    Bmob.initialize("f7993c20b4a3db6747fc24695794a2d6", "da37b2dee9e12d6c78a2fe3abec4234e");//模板
    state.currentUser = Bmob.User.current();
    state.initFinish = true;//全局数据初始化完成！
  },
  saveCurrentUser (state, info) {
    console.log('saveCurrentUser()')
    state.currentUser = info
  },
  test(){
    console.log('test...')
  }

}
