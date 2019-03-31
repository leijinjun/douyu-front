<template>
    <div class="danmu-container">
        <h2>弹幕查询</h2>
        <div class="danmu-search-input">
            <el-input placeholder="请输入主播昵称或房间ID或用户昵称"  class="input-with-select">
                <el-button class="pre" slot="prepend" icon="el-icon-search"></el-button>
                <el-button class="suf" slot="append">搜索</el-button>
            </el-input>
        </div>
        <div class="date">
            <dl>
                <dt class="week-lable"><b>周</b></dt>
                <dd class="week">
                    <el-date-picker
                            type="week"
                            format="yyyy 第 WW 周"
                            placeholder="选择周">
                        </el-date-picker>
                </dd>
                <dt class="week-lable"><b>月</b></dt>
                <dd class="week">
                     <el-date-picker
                            type="month"
                            placeholder="选择月">
                            </el-date-picker>
                </dd>
                <dt class="week-lable"><b>范围日期</b></dt>
                <dd class="week">
                    <el-date-picker
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    >
                    </el-date-picker>
                </dd>
            </dl>
        </div>
        <el-table
            :data="tableData"
            style="width: 100%;margin-bottom: 20px;"
            border>
            <el-table-column
            prop="date"
            label="日期"
            sortable
            width="180">
            </el-table-column>
            <el-table-column
            prop="name"
            label="姓名"
            sortable
            width="180">
            </el-table-column>
            <el-table-column
            prop="address"
            label="地址">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name:'Danmu',
    data(){
        return{
            tableData: [{
          id: 1,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id: 2,
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          id: 3,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          children: [{
              id: 31,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            }, {
              id: 32,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
          }]
        }, {
          id: 4,
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        }
    },
    created(){

    },
    methods:{
        load(tree, treeNode, resolve) {
        resolve([
          {
            id: 31,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            id: 32,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }
        ])
      }
    },
    mounted(){

    }
}
</script>
<style>
.danmu-container .danmu-search-input{
    height: auto;
}
.danmu-container .danmu-search-input .el-input input{
    height: 56px;
}
.danmu-container .danmu-search-input .el-input .el-input-group__prepend{
    border-top-left-radius: 28px;
    border-bottom-left-radius: 28px;
    padding: 0 15px;
}
.danmu-container .danmu-search-input .el-input .el-input-group__prepend i{
    font-size: 23px;
}
.danmu-container .danmu-search-input .el-input .el-input-group__append{
    border-bottom-right-radius: 28px;
    border-top-right-radius: 28px;
    padding: 0 46px;
    background: #5816b1;
    color: #FFFFFF;
    font-size: 17px;
    border: 1px;
}
.danmu-container .danmu-search-input .el-input .el-input-group__append span{
    letter-spacing:7px;
}
.danmu-container .el-date-editor{
    width: 141px;
}
.danmu-container .el-date-editor.el-range-editor{
    width: 350px;
    height: 44px;
}
.danmu-container .el-date-editor.el-range-editor input{
    height: 38px;
}
.danmu-container .el-date-editor input{
    height: 44px;
    border: 0;
}
</style>

<style scoped>
@import url('../assets/css/danmu.css');
</style>


