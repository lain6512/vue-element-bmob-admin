<template>
    <div class="">

        <!-- 头部-->
        <el-row type="flex" class="row-bg" justify="space-between">
            <el-col :span="12">
              <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>初始习惯选项</el-breadcrumb-item>
                <el-breadcrumb-item>添加/编辑 选项</el-breadcrumb-item>
              </el-breadcrumb>
            </el-col>
            <el-col :span="12" class="align-r">
                <el-button plain type="info" size="small" @click="$router.go(-1)">返回</el-button>
            </el-col>
        </el-row>
        <!-- /头部-->


        <div class="form-submit mt20">

                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="选项标题：" prop="desc">
                        <el-input v-model="ruleForm.txt" placeholder="请输入内容"></el-input>
                    </el-form-item>

                    <el-form-item label="类型：">
                      <el-radio v-model="ruleForm.type" :label=1 >好习惯</el-radio>
                      <el-radio v-model="ruleForm.type" :label=2 >坏习惯</el-radio>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>

                </el-form>



        </div>


        <!-- 弹框-->

    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data:function() {
            return {
                isEdit:false,
                itemData:{},
                ruleForm: {
                    id:'',
                    txt: '',
                  type:1
                },
                rules: {
                    txt: [
                        { required: true, message: '不能为空', trigger: 'blur' }
                    ]
                },


            };
    },
        mounted:function(){
            if(this.$route.query.itemData){
                this.ruleForm.txt = this.$route.query.itemData.txt
                this.ruleForm.type = this.$route.query.itemData.type
                this.ruleForm.id = this.$route.query.itemData.id
                this.isEdit = true;
            }else{
                this.isEdit = false;
            }

        },
        methods: {
            submitForm: function (formName) {
                var self = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log("提交表单 （）")
                        console.log(this.ruleForm)

                        if(self.isEdit == true){
                            self.updateData()
                        }else{
                            self.addData()
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm: function (formName) {
                this.$refs[formName].resetFields();
            },
            successPupop: function () {
                this.$notify({
                    title: '成功',
                    message: '提交数据成功',
                    type: 'success'
                });
            },
            /**
             * 修改数据
             */
            updateData:function(){
                var self =this;
                var InitRoleAttrList = Bmob.Object.extend("habit_init_item");
                var query = new Bmob.Query(InitRoleAttrList);

                console.log(" updateData ()");
                console.log(self.ruleForm.id);
                console.log(self.ruleForm.type);
                query.get(self.ruleForm.id, {
                    success: function(data) {
                        data.set('txt',self.ruleForm.txt);
                        data.set('type',self.ruleForm.type);
                        data.save();
                        console.log("修改成功");
                        self.successPupop();
                        self.$router.push({path: '/page/habit/initItem'})

                    },
                    error: function(object, error) {
                        console.log("修改失败");
                    }
                });
            },
            /**
             * 新增数据
             */
            addData:function(){
                var self =this;
                //添加一行数据
                var InitRoleAttr = Bmob.Object.extend("habit_init_item");
                var initRoleAttr = new InitRoleAttr();
                initRoleAttr.set("title", this.ruleForm.txt);
                initRoleAttr.set("type", this.ruleForm.type);
                initRoleAttr.save(null, {
                    success: function (object) {
                        console.log("新增一行成功");
                        self.successPupop()
//                        self.$router.push({path: '/page/habit/initItem'})
                    },
                    error: function (model, error) {
                        alert("保存失败");
                        console.log(model);
                        console.log(error);
                    }
                });
            }

        },


    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
