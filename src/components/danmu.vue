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
                <!-- <dt class="week-lable"><b>周</b></dt>
                <dd class="week">
                    <el-date-picker
                            v-model="date.week"
                            type="week"
                            format="yyyy 第 WW 周"
                            value-format="yyyy-MM-dd"
                            placeholder="选择周">
                    </el-date-picker>
                </dd> -->
                <!-- <dt class="week-lable"><b>月</b></dt>
                <dd class="week">
                    <el-date-picker
                            v-model="date.month"
                            type="month"
                            format="yyyy-MM"
                            placeholder="选择月"
                            @change="changeWeek">
                    </el-date-picker>
                </dd> -->
                <dt class="week-lable"><span style="font-size: 15px;">发言日期</span></dt>
                <dd class="week">
                    <el-select v-model="date.dateFrom" @change="selectDateChange" placeholder="请选择时间">
                        <el-option
                        v-for="item in date.selectedDateRange"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </dd>
            </dl>
        </div>
        <el-table
            v-loading="tableLoading"
            element-loading-text="数据加载中"
            element-loading-background="rgba(0, 0, 0, 0.8)"
            element-loading-custom-class="table-loading"
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
            label="弹幕内容">
                <template slot-scope="scope">
                    <span class="txt" v-if="scope.row.ifs==1" v-bind:style="'color:'+tableColor[scope.row.col]+' ;'">{{scope.row.txt}}</span>
                    <span class="txt" v-else style="color: #333;">{{scope.row.txt}}</span>
                </template>
            </el-table-column>
            <el-table-column
            prop="createAt"
            label="发言时间">
            </el-table-column>
        </el-table>
        <el-pagination
            style="margin-top:20px;text-align:center;"
            :background="true"
            :page-size="danmuPage.limit"
            :pager-count="9"
            layout="prev, pager, next"
            :total="danmuPage.total"
            :current-page.sync="danmuPage.pageNum"
            @current-change="changePage">
        </el-pagination>
    </div>
</template>

<script>
import utils from '@/utils/util'
import tableColor from '../config/tableColor.json'
export default {
    name:'Danmu',
    data(){
        return{
            pickerOptions:{
                disabledDate(time){
                    var now=new Date();
                    var day=now.getDate();
                    now.setDate(day-7);
                    return time.getTime()>Date.now()||time.getTime()<now.getTime();
                }
            },
            danmuPage:{
                items:[],
                pageNum:1,
                total:0,
                offset:0,
                limit:20,
            },
            params:{
                pageNum:1,
                limit:20,
                startDate:null,
                endDate:null,
                ownerName:null,
                roomId:null,
                nn:null,
            },
            date:{
                selectedDateRange:[],
                dateFrom:null,
            },
            selectType:null,
            keyword:null,
            tableLoading:false,
            tableColor:tableColor,
        }
    },
    created(){
        this.generateSelectDateRange();
        this.params.startDate = utils.formatDate(new Date(),'yyyy-MM-dd');
        this.date.dateFrom = this.params.startDate;
        this.params.endDate = utils.formatDate(new Date(),'yyyy-MM-dd');
        var roomId=this.$route.query.roomId;
        if(roomId){
            this.params.roomId = roomId;
            this.selectType = '2';
            this.keyword  = roomId;
            this.$set(this.date,'dateFrom',this.params.startDate);
            this.getDanmuPage();
        }
    },
    methods:{
        getDanmuPage(){
            var $this=this;
            this.tableLoading = true;
            this.$request.getDanmuPage(this.params)
            .then(res=>{
                $this.$set($this,'tableLoading',false),
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
            this.getDanmuPage();
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
            this.$set(this.params,'ownerName',null);
            this.$set(this.params,'roomId',null);
            this.$set(this.params,'nn',null);
            switch(this.selectType){
                case '1':this.params.ownerName = this.keyword;break;
                case '2':
                    this.params.roomId = this.keyword;
                    break;
                case '3':this.params.nn = this.keyword;break;
                default:
            }
            this.params.pageNum=1;
            this.getDanmuPage();
        },
        generateSelectDateRange(){
            var now=new Date();
            var arr=new Array();
            arr[0]={"label":"今天","value":utils.formatDate(now,'yyyy-MM-dd')};
            for(var i=1;i<7;i++){
                now.setDate(now.getDate()-1);
                arr[i]={"label":`近${i+1}天`,"value":utils.formatDate(now,'yyyy-MM-dd')};
            }
            this.$set(this.date,'selectedDateRange',arr);
        },
        selectDateChange(selectedDate){
            this.params.startDate = selectedDate;
            this.params.endDate = utils.formatDate(new Date(),'yyyy-MM-dd');
            if(!this.keyword){
                this.$message({
                    message: '请输入关键词',
                    type: 'warning'
                });
                return;
            }
            this.params.pageNum=1;
            this.getDanmuPage();
        }
        // changeWeek(date){
        //     this.$set(this.date,'dateRange',null);
        //     if(date){
        //         var s = utils.formatDate(date,'yyyy-MM-dd');
        //         var d = new Date(date.getTime());
        //         d.setMonth(d.getMonth()+1);
        //         d.setDate(d.getDate()-1);
        //         var e = utils.formatDate(d,'yyyy-MM-dd');
        //         this.params.startDate = s;
        //         this.params.endDate = e;
        //     }else{
        //         this.$set(this.params,'startDate',null);
        //         this.$set(this.params,'endDate',null);
        //     }
        //     this.params.pageNum=1;
        //     this.getDanmuPage();
        // },
        // changeDateRange(dateRange){
        //     this.$set(this.date,'month',null);
        //     if(dateRange){
        //         var s = utils.formatDate(dateRange[0],'yyyy-MM-dd');
        //         var e = utils.formatDate(dateRange[1],'yyyy-MM-dd');
        //         this.params.startDate = s;
        //         this.params.endDate = e;
        //     }else{
        //         this.$set(this.params,'startDate',null);
        //         this.$set(this.params,'endDate',null);
        //     }
        //     this.params.pageNum=1;
        //     this.getDanmuPage();
        // }
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
    background: #fff;
}
.danmu-container .el-pager li.active{
    color: #fff!important;
    background-color:#5816b1!important;
}
.danmu-container .el-pager li:hover{
    color: #fff!important;
    background-color:#5816b1!important;
}
.danmu-container .el-pagination.is-background .btn-prev{
    color:#5816b1;
    background-color: #fff;
}
.danmu-container .el-pagination.is-background .btn-prev:hover{
    color:#fff;
    background-color: #5816b1;
}
.danmu-container .el-pagination.is-background .btn-next{
    color: #5816b1;
    background-color: #fff;
}
.danmu-container .el-pagination.is-background .btn-next:hover{
    color:#fff;
    background-color: #5816b1;
}
.danmu-container .el-loading-mask.table-loading .el-loading-spinner .el-loading-text{
    color: #fff!important;
}
</style>

<style scoped>
@import url('../assets/css/danmu.css');
</style>


