<template>
    <div class="hello">
        <el-row type="flex" class="row-bg" justify="space-between">
            <el-col :span="12">
                <el-breadcrumb separator="/"  class="pb20">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>初始习惯选项</el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
            <el-col :span="12" class="align-r">
                <el-button plain type="info" size="small" @click="$router.go(-1)">返回</el-button>
            </el-col>
        </el-row>



        <el-row class="pb20">
            <el-row type="flex" class="row-bg" justify="space-between">
                <el-col :span="12">
                    <router-link to="/page/habit/initItemAdd" ><el-button type="primary" icon="plus">添加</el-button></router-link>
                </el-col>
                <el-col :span="12" class="align-r">
                    <br/>
                    一共 {{dataLength}} 条数据
                </el-col>
            </el-row>

        </el-row>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="id" label="ID" width="120"></el-table-column>
            <el-table-column prop="title" label="标题" width=""></el-table-column>
            <el-table-column prop="type" label="类型" width=""></el-table-column>

            <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                    <el-button
                            size="small"
                            @click="handleEdit(scope.$index, scope.row)">编辑
                    </el-button>
                    <el-button
                            size="small"
                            @click="handleDelete(scope.$index, scope.row)">x
                    </el-button>
                </template>
            </el-table-column>

        </el-table>

    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'hello',
        data: function () {
            return {
                dataLength:0,
                tableData: []
            }
        },
        mounted:function(){
            this.getData();
        },
        methods:{
            handleEdit: function (index, row) {
                this.$router.push({
                    path: '/page/habit/initItemAdd', query: {
                        itemData: {
                            id: row.id,
                            txt: row.title,
                            type: row.type,
                        }
                    }
                })
            },
            handleDelete:function(index, row){
                console.log(index, row);

                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.delData(row)


                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            successPupop: function () {
                this.$notify({
                    title: '成功',
                    message: '操作成功',
                    type: 'success'
                });
            },
            /**
             * 读取数据
             */
            getData:function(){
                var self =this;
                var Record = Bmob.Object.extend("habit_init_item");
                var query = new Bmob.Query(Record);
                query.descending("updatedAt");
                query.limit(200)
                query.find({
                    success: function(results) {
                      console.log("获取数据成功")
                      console.log(results)
                        self.dataLength = results.length;

                        // 循环处理查询到的数据
                        for (var i = 0; i < results.length; i++) {
                            var obj={}
                            obj.id = results[i].id;
                            obj.title = results[i].attributes.title;
                            obj.type = results[i].attributes.type;
                            self.tableData.push(obj);

                        }
                    },
                    error: function(error) {
                        console.log("查询失败: " + error.code + " " + error.message);
                    }
                });
            },
            /**
             * 删除数据
             */
            delData:function(row){
                var self =this;
                var InitRoleAttrList = Bmob.Object.extend("habit_init_item");
                var query = new Bmob.Query(InitRoleAttrList);

                query.get(row.id, {
                    success: function(object) {
                        object.destroy({
                            success: function(deleteObject) {
                                console.log("删除成功");
                                self.successPupop();

                                //删除,逆循环
                                var arr =self.tableData;
                                for (let i = arr.length - 1; i >= 0; i--) {
                                  if(arr[i].id == row.id){
                                    arr.splice(i,1)
                                  }
                                }



                                self.$router.replace("/page/habit/initItem")


                            },
                            error: function(GameScoretest, error) {
                                console.log("delete fail");
                            }
                        });
                    },
                    error: function(object, error) {
                        alert("query object fail");
                    }
                });
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
