<template>
<div id="main">
	<div class="left-container">
		<div class="left-form">
			<span style="float: left;">
				<el-form :inline="true" :model="pagnation">
					<el-form-item>
					    <el-input v-model="pagnation.nn" placeholder="用户昵称"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button @click="searchChat()">搜索</el-button>
				    </el-form-item>
				</el-form>
			</span>
		</div>
		<div class="left-pagnation">
			<el-button-group>
			  <el-button size="small" round style="background-color: #5a2dff;color: white;" @click="toPrev()" :disabled="pagnation.from<=0">上一页</el-button>
			  <el-button size="small" round style="background-color: #5a2dff;color: white;" @click="toNext()" :disabled="!isMore">下一页</el-button>
			</el-button-group>
		</div>
		<div class="left-title"><p>房间{{roomId}}弹幕</p></div>
		<div class="danmu-container">
			<div class="left">
				<ul class="c-list"  v-if="chats.length>0">
					<li class="li-chat" v-for="chat in chats" :key="chat.cid">
						<p class="text-cont">
							<span class="user-chat-info">
								<span>{{chat.timestamp}}</span>
								<a v-bind:class="'user-level level-bgpng level-size1 level-'+chat.level" v-bind:title="'用户等级：'+chat.level"></a>
								<a href="javascript:;" class="nick-new" @click="searchUserChats(chat.uid)">{{chat.nn}}：</a>
							</span>
							<span class="txt" v-if="chat.ifs==1" v-bind:style="'color:'+tableColor[chat.col]+' ;'">{{chat.txt}}</span>
							<span class="txt" v-else style="color: #333;">{{chat.txt}}</span>
						</p>
					</li>
				</ul>
				<div class="no-chat" v-else>暂无数据</div>
			</div>
			<div class="right" v-show="showTimeLine">
				<p class="timeline-title">用户<span style="color: rgb(90, 45, 255);font-size: 16px;">{{timeLine.nickname}}</span>今日共发送<span style="color: rgb(90, 45, 255);font-size: 16px;">{{timeLine.totalCount}}</span>条弹幕</p>
				<ul class="timeline">
					<li class="timeline-item" v-for="(chat,index) in timeLine.chats" :key="chat.cid">
						<div class="timeline-circle" style="border-color: rgb(90, 45, 255); background-color: rgb(90, 45, 255);">
							<p class="left-circle">第{{timeLine.chats.length-index}}条弹幕</p>
						</div>
						<p class="timeline-text" v-if="chat.ifs==1" v-bind:style="'color:'+tableColor[chat.col]">{{chat.txt}}</p>
						<p class="timeline-text" v-else style="color: #333;">{{chat.txt}}</p>
					</li>
				</ul>
			</div>
		</div>
	</div>
</div>
</template>

<script>
	import Vue from 'vue'
	import tableColor from '../config/tableColor.json'
//	import { Timeline, TimelineItem, TimelineTitle } from 'vue-cute-timeline'
	export default {
		name:'DanmuList',
		data(){
			return{
				roomId:null,
				chats:[],
				isMore:true,
				pagnation:{
					from:0,
					size:100,
					nn:''
				},
				timeLine:{
					nickname:'',
					totalCount:0,
					chats:[]
				},
				showTimeLine:false,
				tableColor:tableColor,
			}
		},
//		components: {
//		    Timeline,
//		    TimelineItem,
//		    TimelineTitle
//		},
		created(){
			this.initPagnation();
			var roomId=this.$route.params.roomId;
			this.roomId=roomId;
			this.getDanmuList(roomId);
		},
		methods:{
			//获取弹幕列表
			getDanmuList(roomId){
				var $this=this;
				$this.$http.get(`/room/danmu/${roomId}`,{
					params:this.pagnation
				})
					.then((response)=>{
						var res=response.data;
						if(res.code==200){
							$this.chats=res.body.chats;
							$this.isMore=res.body.isMore;
						}
					})
			},
			//获取用户弹幕
			searchUserChats(uid){
				var $this=this;
				var roomId=this.roomId;
				var startTime=new Date();
				startTime.setHours(0,0,0);
				var endTime=new Date();
				endTime.setHours(23,59,59);
				$this.$http.get(`/room/danmu/${roomId}`,{
					params:{uid:uid,startTimestamp:startTime.getTime(),endTimestamp:endTime.getTime()}
				})
					.then((response)=>{
						var res=response.data;
						var chats=res.body.chats;
						if(chats){
							$this.showTimeLine=true;
							$this.timeLine.nickname=chats[0].nn;
							$this.timeLine.totalCount=chats.length;
							$this.timeLine.chats=chats;
							//定位到该元素顶部
							$('html,body').animate({
			                    scrollTop: $("#main").offset().top
			                }, 200);
						}else{
							$this.showTimeLine=false;
							$this.$message.success("该用户还没有发送弹幕哦");
						}
					})
			},
			initPagnation(){
				this.pagnation.size=100;
				this.pagnation.from=0;
			},
			//上一页
			toPrev(){
				if(this.pagnation.from<=0){
					return;
				}
				this.pagnation.from=this.pagnation.from-this.pagnation.size;
				this.getDanmuList(this.roomId);
			},
			//下一页
			toNext(){
				this.pagnation.from=this.pagnation.from+this.pagnation.size;
				this.getDanmuList(this.roomId);
			},
			//搜索
			searchChat(){
				this.initPagnation();
				this.getDanmuList(this.roomId);
			},
		},
		mounted(){
			$(".el-button span").css({"line-height":"19px"});
			$(".left-form .el-form .el-input input").css({"height":"36px"});
		}
	}
</script>
<style scoped="scoped">
	@import '../../static/css/level.css';
</style>
<style scoped="scoped">

.left-container{
	width: 100%;
}
.left-container .left-form{
	height: 4.37rem;
	margin-top: 0.93rem;
}
.left-container .left-form button{
	height: 2.31rem;
	line-height: 2.18rem;
	padding: 0.5rem 1.25rem;
}
.left-container .left-title{
	width: 100%;
	font-size: 1.06rem;
	font-family: "微软雅黑";
	float: left;
	margin-top: 0.31rem;
	margin-left: 11.25rem;
}
.left-title p{
	font-weight: 500;
	color: rgb(90, 45, 255);
	float: left;
}
.left-container .left-pagnation{
	width: 100%;
}
.left-pagnation .el-button-group{
	float: left;
}
.left-pagnation .el-button-group button{
	height: 2.25rem;
}
.danmu-container{
	width: 100%;
	height: 100%;
    float: left;
}
.danmu-container .left{
	width: 50%;
	float: left;
}
.danmu-container .right{
	width: 50%;
	float: right;
}
.danmu-container .c-list{
	font-size: 0.81rem;
}
.danmu-container .left ul>li{
	margin-bottom: 0.5rem;
	margin-top: 0.5rem;
	padding-left: 0.62rem;
	padding-right: 0.31rem;
	line-height: 1.31rem;
	height:1.87rem;
}
li .text-cont{
	line-height: 1.06rem;
	height: 1.25rem;
	text-align: left;
}
.text-cont .txt{
	line-height: 1.25rem;
}
.user-chat-info .nick-new{
	margin-left: 2.93rem;
	color: #2b94ff;
	text-decoration: none;
}
.danmu-container .left .no-chat{
	float: left;
	margin-left: 12.36rem;
	margin-top: 0.31rem;
}
.el-button{
	background-color: #5a2dff;
	color: white;
	height: 2.56rem;
}
.timeline{
	padding: 0;
    position: relative;
    list-style: none;
    font-family: PingFangSC-light, Avenir, Helvetica, Arial, Hiragino Sans GB, Microsoft YaHei, sans-serif;
    -webkit-font-smoothing: antialiased;
    margin: 0.62rem 1.25rem;
    --timelineTheme: rgb(90, 45, 255);
}
.timeline:after {
    position: absolute;
    content: '';
    left: 0;
    top: 0;
    width: 1px;
    height: 100%;
    background-color: var(--timelineTheme);
}
.timeline-title{
	padding-left: 1.06rem;
    text-align: left;
}
.timeline .timeline-item{
	position: relative;
    margin: 0.75rem 0 0 1.25rem;
    padding-bottom: 0.62rem;
    text-align: left;
    /*border-bottom: 1px dotted var(--timelineTheme);*/
}
.timeline-item .timeline-circle {
    position: absolute;
    top: 0;
    left: -25px;
    width: 0.62rem;
    height: 0.62rem;
    border-radius: 50%;
    border-color: rgb(90, 45, 255);
    background-color: rgb(90, 45, 255);
    z-index: 1;
    box-sizing: content-box;
}
.timeline-text{
	display: inline-block;
    color: rgb(122, 200, 75);
    padding: 18px;
    /*background-color: #333;*/
    border: 1px rgb(90, 45, 255) solid;
    border-radius: 10px;
}
p.timeline-text:before {
    position: absolute;
    top: 25px;
    left: -4px;
    display: block;
    width: 8px;
    height: 8px;
    content: " ";
    /*background-color: inherit;*/
    background-color:rgb(90, 45, 255);
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    transform: rotate(40deg);
}
.left-circle{
	position: relative;
    left: -77px;
    top: -3px;
    font-family: "微软雅黑";
    width: 89px;
}
</style>