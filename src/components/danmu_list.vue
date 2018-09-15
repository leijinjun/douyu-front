<template>
<div  id="main">
	<span style="float: left;">
		<el-input v-model="pagnation.nn" placeholder="用户昵称" style="width: 135px;height: 36px;"></el-input>
		<el-button style="background-color: #5a2dff;color: white;" @click="searchChat()">搜索</el-button>
	</span>
	<span>房间号{{roomId}}弹幕列表</span>
	<div>
		<el-button-group>
		  <el-button size="small" round style="background-color: #5a2dff;color: white;" @click="toPrev()" :disabled="pagnation.from<=0">上一页</el-button>
		  <el-button size="small" round style="background-color: #5a2dff;color: white;" @click="toNext()" :disabled="!isMore">下一页</el-button>
		</el-button-group>
	</div>
	<div class="chat-list" v-for="chat in chats" style="float: left;width: 100%;">
		<div style="float: left;margin-left: 6px;margin-top: 8px;height: 36px;overflow: hidden;text-overflow: ellipsis;white-space:nowrap;">
			<span style="float: left;padding-right: 10px;">{{chat.timestamp}}</span>
			<span style="float: left;">
				<img src="../../static/level.png" height="19px;" style="margin-top: 3px;"/>
			</span>
			<span style="margin-right:13px;margin-left: -23px;">
				<label style="color:#fff;line-height: 24px;font-size: 12px;">{{chat.level}}</label>
			</span>
			<span style="line-height: 10px;">{{chat.nn}}：</span>
			<span v-if="chat.ifs==1" v-bind:style="'color:'+tableColor[chat.col]+' ;'">{{chat.txt}}</span>
			<span v-else style="color: #333;">{{chat.txt}}</span>
		</div>
	</div>
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
		}
	}
</script>

<style scoped="scoped">
@media only screen and (min-width:1766px){
	#main{
		width: 1230px;
		position: relative;
	    overflow: hidden;
	    padding: 0 4px;
	    margin: 0 auto;
	}
	.img img{
		float: left;
		height: 108px;
		padding: 26px 0 0 23px;
	}
}
</style>