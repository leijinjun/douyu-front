<template>
    <div class="danmu-container">
        <h2>弹幕查询</h2>
        <div class="danmu-search-input">
            <el-input placeholder="请输入房间名或房间ID或用户昵称" v-model="keyword" class="input-with-select">
                <!-- <el-button class="pre" slot="prepend" icon="el-icon-search"></el-button> -->
                <el-select v-model="selectType" slot="prepend" placeholder="请选择类型">
                    <el-option label="请选择" value=""></el-option>
                    <el-option label="房间名" value="1"></el-option>
                    <el-option label="房间ID" value="2"></el-option>
                    <el-option label="用户昵称" value="3"></el-option>
                </el-select>
                <el-button class="suf" slot="append" @click="search">搜索</el-button>
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
            :data="danmuPage.items"
            stripe
            style="width: 100%;color: #786c6c;">
            <el-table-column
            prop="roomId"
            label="房间ID">
            </el-table-column>
            <el-table-column
            prop="ownerName"
            label="房间名">
            </el-table-column>
            <el-table-column
            prop="nn"
            label="用户">
            </el-table-column>
            <el-table-column
            prop="level"
            label="用户等级">
            </el-table-column>
            <el-table-column
            prop="fansLevel"
            label="粉丝牌等级">
            </el-table-column>
            <el-table-column
            prop="txt"
            label="弹幕内容">
            </el-table-column>
            <el-table-column
            prop="createAt"
            label="发言时间">
            </el-table-column>
        </el-table>
        <el-pagination
            style="margin-top:20px;text-align:center;"
            :page-size="danmuPage.limit"
            :pager-count="9"
            layout="prev, pager, next"
            :total="danmuPage.total"
            @current-change="changePage">
        </el-pagination>
    </div>
</template>

<script>
export default {
    name:'Danmu',
    data(){
        return{
            danmuPage:{
                items:[],
                pageNum:1,
                total:0,
                offset:0,
                limit:15,
            },
            params:{
                pageNum:1,
                limit:15,
            },
            selectType:null,
            keyword:null,
        }
    },
    created(){
        this.getDanmuPage({});
    },
    methods:{
        getDanmuPage(params){
            var $this=this;
            params.pageNum = this.params.pageNum;
            params.limit = this.params.limit;
            this.$request.getDanmuPage(params)
            .then(res=>{
                // $this.danmuPage = JSON.parse(JSON.stringify(res.body));
                $this.$set($this.danmuPage,'items',res.body.items);
                $this.$set($this.danmuPage,'pageNum',res.body.pageNum);
                $this.$set($this.danmuPage,'total',res.body.total);
                $this.$set($this.danmuPage,'offset',res.body.offset);
                $this.$set($this.danmuPage,'limit',res.body.limit);
            });
        },
        changePage(nextPage){
            this.params.pageNum = nextPage;
            this.getDanmuPage(this.getParams());
        },
        getParams(){
            var params={};
            switch(this.selectType){
                case '1':params.ownerName = this.keyword;break;
                case '2':
                    params.roomId = this.keyword;
                    break;
                case '3':params.nn = this.keyword;break;
                default:
            }
            return params;
        },
        search(){
            if(!this.selectType){
                this.$message({
                    message: '请选择类型',
                    type: 'warning'
                });
                return;
            }
            if(!this.keyword){
                var message = "";
                switch(this.selectType){
                    case '1':message='请输入房间名';break;
                    case '2':message='请输入房间ID';break;
                    case '3':message='请输入用户昵称';break;
                    default:
                }
                this.$message({
                    message: message,
                    type: 'warning'
                });
                return;
            }else{
                if(this.selectType==='2'){
                    var reg = /^\d+$/g;
                    if(!reg.test(this.keyword)){
                        this.$message({
                            message: '请输入正确的房间号',
                            type: 'error'
                        });
                       return;
                    }
                }
            }
            this.params.pageNum=1;
            this.getDanmuPage(this.getParams());

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
    /* border-top-left-radius: 28px;
    border-bottom-left-radius: 28px; */
    background-color: #fff;
    width: 83px;
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
.danmu-container .el-pagination button:hover{
    color: #5816b1;
}
.danmu-container .el-pager li.active{
    color: #5816b1;
}
.danmu-container .el-pager li:hover{
    color: #5816b1;
}
</style>

<style scoped>
@import url('../assets/css/danmu.css');
</style>


