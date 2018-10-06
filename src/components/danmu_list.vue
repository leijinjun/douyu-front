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
			<ul class="c-list"  v-if="chats.length>0">
				<li class="li-chat" v-for="chat in chats">
					<p class="text-cont">
						<span class="user-chat-info">
							<span>{{chat.timestamp}}</span>
							<a v-bind:class="'user-level level-bgpng level-size1 level-'+chat.level" v-bind:title="'用户等级：'+chat.level"></a>
							<a href="javascript:;" class="nick-new">{{chat.nn}}：</a>
						</span>
						<span v-if="chat.ifs==1" v-bind:style="'color:'+tableColor[chat.col]+' ;'">{{chat.txt}}</span>
						<span v-else style="color: #333;">{{chat.txt}}</span>
					</p>
				</li>
			</ul>
			<div v-else>暂无数据</div>
		</div>
	</div>
	<!--<div>
		<el-button-group>
		  <el-button size="small" round style="background-color: #5a2dff;color: white;" @click="toPrev()" :disabled="pagnation.from<=0">上一页</el-button>
		  <el-button size="small" round style="background-color: #5a2dff;color: white;" @click="toNext()" :disabled="!isMore">下一页</el-button>
		</el-button-group>
	</div>-->
</div>
</template>

<script>
	import tableColor from '../config/tableColor.json'
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
				tableColor:tableColor,
			}
		},
		created(){
			this.initPagnation();
			var roomId=this.$route.params.roomId;
			this.roomId=roomId;
			this.getDanmuList(roomId);
		},
		methods:{
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
			initPagnation(){
				this.pagnation.size=100;
				this.pagnation.from=0;
			},
			toPrev(){
				if(this.pagnation.from<=0){
					return;
				}
				this.pagnation.from=this.pagnation.from-this.pagnation.size;
				this.getDanmuList(this.roomId);
			},
			toNext(){
				this.pagnation.from=this.pagnation.from+this.pagnation.size;
				this.getDanmuList(this.roomId);
			},
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
	width: 53.75rem;
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
	padding-left: 11.25rem;
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
.danmu-container .c-list{
	font-size: 13px;
}
.danmu-container ul>li{
	margin-bottom: 8px;
	margin-top: 8px;
	padding-left: 10px;
	padding-right: 5px;
	line-height: 21px;
}
li .text-cont{
	line-height: 17px;
	height: 20px;
	text-align: left;
}
.user-chat-info .nick-new{
	margin-left: 47px;
	color: #2b94ff;
	text-decoration: none;
}
.el-button{
	background-color: #5a2dff;
	color: white;
	height: 41px;
}
</style>