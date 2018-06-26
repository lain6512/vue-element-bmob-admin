<template>
    <div class="box">

        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>登录</span>
                <el-button style="float: right; padding: 3px 0" type="text"></el-button>
            </div>
            <div  class="text item">

                <el-row :gutter="10">
                    <el-col :span="20">
                        <div class="grid-content bg-purple">

                            <el-form ref="form" :model="form" label-width="80px">
                                <el-form-item label="用户名：">
                                    <el-input v-model="form.name"></el-input>
                                </el-form-item>
                                <el-form-item label="密码：">
                                    <el-input v-model="form.pass"></el-input>
                                </el-form-item>


                                <el-form-item>
                                    <el-button type="primary" @click="onSubmit">登录</el-button>
                                </el-form-item>

                            </el-form>
                    </div>
                    </el-col>
                </el-row>


            </div>
        </el-card>
    </div>
</template>

<script type="text/ecmascript-6">
  import {mapState} from 'vuex'

  export default {
    components: {},
//    computed: mapState(["currentUser"]),
    computed: {
      ...mapState(['titleAll']),
    },
    data: function () {
      return {
        form:{
          name:'',
          pass:'',
        }
      }
    },
    mounted: function () {
      console.log('this.titleAll:')
//      console.log(this.titleAll)
//      this.$store.commit('saveCurrentUser', '99999');
//      this.$store.commit('test');
    },
    methods: {
      onSubmit () {
        let that = this
        let user_phone = this.form.name
        let user_password = this.form.pass
        //登录
        Bmob.User.logIn(user_phone, user_password, {
          success: function(user) {
            // Do stuff after successful login.
            console.log("登录成功");
            console.log(user);

            that.$router.replace({path: '/'})
          },
          error: function(user, error) {
            console.log("登录失败");
            console.log(user);
            console.log(error);
            alert('登录失败:' + error.message)
            // The login failed. Check error to see why.
          }
        });


      },
    },
  }
</script>

<style lang="less" scoped>
    .box {
        width: 500px;
        margin:10px auto;
    }
</style>
