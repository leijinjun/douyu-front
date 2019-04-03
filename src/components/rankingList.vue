<template>
<div>
    <div class="ranking">
        <ul class="clearfix zb-list">
            <li class="m_1 on">
                <img src="../assets/images/tv.png"/>
                <a href="javascript:void(0);">今日直播榜</a>
            </li>
        </ul>
        <div class="fs_menu">
            <ul class="clearfix">
                <li class="fs_1" v-bind:class="{on:menuIndex==1}"><a href="javascript:void(0);" @click="handle(1)"><i class="iconfont icon-qianbao"></i>收入榜</a></li>
                <li class="fs_2" v-bind:class="{on:menuIndex==2}"><a href="javascript:void(0);" @click="handle(2)"><i class="iconfont icon-redu"></i>人气榜</a></li>
                <li class="fs_3" v-bind:class="{on:menuIndex==3}"><a href="javascript:void(0);" @click="handle(3)"><i class="iconfont icon-tuhao"></i>土豪榜</a></li>
            </ul>
            <el-table class="menu-table" v-bind:class="[menuIndex==1?'show':'hide']"
                v-loading="tableLoading"
                stripe
                size="medium"
                :data="liverData">
                <el-table-column
                    label="排名"
                    width="180"
                    header-align="center"
                    align="center"
                    >
                    <template slot-scope="scope">
                        <span class="x_num">{{scope.$index}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    header-align="center"
                    align="center"
                    label="主播">
                    <template slot-scope="scope">
                        <router-link class="tr-2" :to="'/room/'+scope.row.roomId">
                            <img :src="scope.row.roomThumb"/>
                            <span class="nickname">{{scope.row.nickName}}</span>
                        </router-link>
                    </template>
                </el-table-column>
                <el-table-column
                    header-align="center"
                    align="center"
                    label="收入">
                    <template slot-scope="scope">
                        <span class="x_orange">￥{{scope.row.giftMoney|numTransform}}</span>
                    </template>
                </el-table-column>
            </el-table>
            <el-table class="menu-table" v-bind:class="[menuIndex==2?'show':'hide']"
                v-loading="tableLoading"
                stripe
                :data="danmuData">
                <el-table-column
                    label="排名"
                    width="180"
                    header-align="center"
                    align="center">
                    <template slot-scope="scope">
                        <span class="x_num">{{scope.$index}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    header-align="center"
                    align="center"
                    label="主播">
                    <template slot-scope="scope">
                        <router-link class="tr-2" :to="'/room/'+scope.row.roomId">
                            <img :src="scope.row.roomThumb"/>
                            <span class="nickname">{{scope.row.nickName}}</span>
                        </router-link>
                    </template>
                </el-table-column>
                <el-table-column
                    header-align="center"
                    align="center"
                    prop="giftMoney"
                    label="弹幕数">
                    <template slot-scope="scope">
                        <span class="x_orange">{{scope.row.count|numTransform}}条</span>
                    </template>
                </el-table-column>
            </el-table>
            <el-table class="menu-table" v-bind:class="[menuIndex==3?'show':'hide']"
                v-loading="tableLoading"
                stripe
                :data="userData">
                <el-table-column
                    label="排名"
                    width="180"
                    header-align="center"
                    align="center">
                    <template slot-scope="scope">
                        <span class="x_num">{{scope.$index}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    header-align="center"
                    align="center"
                    label="用户">
                    <template slot-scope="scope">
                        <a class="tr-2" href="javascript:void(0);">
                            <img :src="'https://apic.douyucdn.cn/upload/'+scope.row.ic+'_middle.jpg'"/>
                            <span class="nickname">{{scope.row.nn}}</span>
                        </a>
                    </template>
                </el-table-column>
                <el-table-column
                    header-align="center"
                    align="center"
                    label="送礼">
                    <template slot-scope="scope">
                        <span class="x_orange">￥{{scope.row.money|numTransform}}</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</div>
</template>
<script>
export default {
    name:'RankingList',
    data(){
        return{
            tableLoading:false,
            menuIndex:1,
            topSize:100,
            liverData:[],
            danmuData:[],
            userData:[]
        }
    },
    created(){
        this.getTodayTopGiftList();
    },
    methods:{
        handle(menuIndex){
            this.$set(this,'menuIndex',menuIndex);
            switch(menuIndex){
                case 1:this.getTodayTopGiftList();break;
                case 2:this.getTodayTopDanmuList();break;
                case 3:this.getTodayUserRankingList();break;
                default:
            }
        },
        getTodayTopGiftList(){
            var $this=this;
            this.$set(this,'tableLoading',true);
            this.$request.getTodayGiftRankingList({topSize:this.topSize})
            .then(res=>{
                $this.$set($this,'tableLoading',false);
                $this.$set($this,'liverData',res.body);
            });
        },
        getTodayTopDanmuList(){
            var $this=this;
            this.$set(this,'tableLoading',true);
            this.$request.getTodayDanmuRankingList({topSize:this.topSize})
            .then(res=>{
                $this.$set($this,'tableLoading',false);
                $this.$set($this,'danmuData',res.body);
            });
        },
        getTodayUserRankingList(){
            var $this=this;
            this.$set(this,'tableLoading',true);
            this.$request.getTodayUserRankingList({topSize:this.topSize})
            .then(res=>{
                $this.$set($this,'tableLoading',false);
                $this.$set($this,'userData',res.body);
            });
        }
    },
}
</script>
<style scoped>
.ranking{
    height: auto;
    width: 1200px;
    margin-right: auto;
    margin-left: auto;
}
.clearfix{
    zoom: 1;
    clear: both;
}
.zb-list{
    background: url('../assets/images/menu.png') 0 0 no-repeat;
    z-index: 12;
}
.zb-list li.m_1 {
    position: relative;
    left: 0;
    z-index: 10;
}
.zb-list li {
    float: left;
    width: 280px;
    height: 44px;
    line-height: 44px;
    background: url('../assets/images/menu.png') 0 bottom no-repeat;
    text-align: center;
    font-size: 16px;
    position: relative;
    text-align: left;
    text-indent: 65px;
}
.zb-list li.on a {
    color: #510bc6;
}
.zb-list li.m_1.on i {
    background: url('../assets/images/tv.png') 0 no-repeat;
}
.zb-list li img{
    padding-top: 9px;
    float:left;
    position: relative;
    z-index: 13;
    width:26px;
    left: 62px;
}
.zb-list li a{
    line-height: 45px;
}
.fs_menu {
    border-bottom: 1px solid #e4daf2;
    margin-top: 10px;
}
.fs_menu ul{
    padding-top: 7px;
    margin-bottom: 25px;
}
.fs_menu li {
    float: left;
    width: 120px;
    height: 28px;
    line-height: 28px;
    font-size: 21px;
    padding-bottom: 12px;
    margin-right: 20px;
}
.fs_menu li a {
    color: #b0a5c1;
    display: block;
    height: 39px;
}
.fs_menu li.on a {
    border-bottom: 2px solid #683cc0;
    color: #510bc6;
}
.fs_menu li a i{
    font-size: 21px;
    padding-right: 5px;
}
.menu-table{
    width: 100%;
}
.menu-table.hide{
    display: none;
}
.menu-table.show{
    display: block;
}
.menu-table tbody tr td .tr-2 .nickname{
  font-size:15px;
  position: relative;
  float: left;
  left: 167px;
  line-height: 62px;
}
.menu-table tbody tr td .tr-2 img {
  border-radius: 50%;
  border: 2px solid #FFFFFF;
  width: 70px;
  height: 70px;
  position: relative;
  float: left;
  left: 129px;
}
.menu-table tbody tr:first-child td .x_num {
    color: #ffd700;
    line-height: 30px;
    font-size: 25px;
}
.menu-table tbody tr:nth-child(2) td .x_num {
    color: #c0c0c0;
    line-height: 30px;
    font-size: 19px;
}
.menu-table tbody tr:nth-child(3) td .x_num {
    color: #b87335;
    line-height: 30px;
    font-size: 16px;
}
.menu-table tbody tr td .x_orange {
    font-size: 26px;
    color: #ff7200;
}
</style>