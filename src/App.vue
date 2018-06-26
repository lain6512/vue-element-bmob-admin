<template>
  <div id="app">
    <div class="m-head">
      <div class="logo">管理后台</div>
      <div class="loginOut" @click="loginOut">[退出登录]</div>
    </div>
    <div class="m-body">
      <div class="m-menu">

        <el-menu
          default-active="0"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">


          <el-submenu index="1">
            <template slot="title">
              <router-link to="/page/habit/initItem">vue-bmob-admin</router-link>
            </template>
            <el-menu-item index="1-2">
              <router-link to="/page/habit/initItem">菜单1</router-link>
            </el-menu-item>
          </el-submenu>

        </el-menu>


      </div>
      <div class="m-content">
        <router-view></router-view>
      </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import {mapState} from 'vuex'
  export default {
    name: 'app',
    mounted: function () {
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      loginOut () {
        console.log('logOut()')
        Bmob.User.logOut();
        this.$router.replace({path: '/login'})
//        window.location.reload()
      },
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .logo {
    padding: 30px 0 0 30px;
    font-size: 34px;
    font-family: '微软雅黑';
    color: dimgray;
  }
  .loginOut {
    position: absolute;
    right: 10px;
    top: 60px;
    color: #999999;
    cursor: pointer;
  }
</style>
