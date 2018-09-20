<template>
	<div id="main">
		<div class="room-info">
			<span style="text-align: center;">房间信息</span>
			<div class="img">
				<a target="_blank" :href="'https://www.douyu.com/'+roomDetail.roomId"><img :src="roomDetail.roomThumb"/></a>
				<div>
					<a href="javascript:;" v-if="connected" @click="disConnect()">断开连接</a>
				    <a href="javascript:;"  v-else @click="connect()">连接</a>
		    	</div>
			</div>
			<div class="room-desc">
				<span class="text">房间号:{{roomDetail.roomId}}</span>
				<span class="text">房间标题：{{roomDetail.roomName}}</span>
				<span class="text">主播名：{{roomDetail.ownerName}}</span>
				<span class="text">当前人气：{{roomDetail.hn}}</span>
			</div>
		</div>
		<div>
			<div class="gift-left">
				<span>最新礼物</span>
				<div class="gift-list">
					<span v-for="gift in gifts" style="float: left;height: 50px;">
						<img  v-bind:src="roomGifts[gift.gfid]!=null?roomGifts[gift.gfid].himg:''" height="48px;" width="48px"/>
						<span style="margin-left: 10px;">x{{gift.hits}}</span>
						<span>{{gift.nn}}</span>
					</span>
				</div>
			</div>
			<div class="chat-center">
				<div style="background-color: antiquewhite;width: 100%;">最新弹幕<span style="float: right;padding-right: 10px;" @click="getMoreChat()"><a href="javascript:;" style="color: darkorchid;text-decoration: none;">查看更多</a></span></div>
				<div class="chat-list" v-for="chat in chats">
					<div style="float: left;margin-left: 6px;margin-top: 8px;height: 36px;overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
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
		</div>
	</div>
</template>

<script>
	import tableColor from '../config/tableColor.json'
	export default {
		name:'RoomDetail',
		data(){
			return{
				roomId:null,
				roomDetail:{},
				gifts:[],
				chats:[],
				roomGifts:{},
				connected:false,
				tableColor:tableColor,
			}
		},
		created(){
			var roomId=this.$route.params.roomId;
			this.roomId=roomId;
			this.getRoomDetail(roomId);
		},
		methods:{
			getRoomDetail(roomId){
				var $this=this;
				this.$http.get(`/room/info/${roomId}`)
					.then((response)=>{
						var res=response.data;
						if(res.code=200){
							var body=res.body;
							$this.roomDetail=body.roomDetail;
							$this.chats=body.chats;
							$this.gifts=body.gifts;
							var json=new Object();
							$.each(body.roomDetail.roomGifts, function(i,n) {
								json[n.id]=n;
							});
							$this.roomGifts=json;
							$this.connected=body.connected;
						}
					})
			},
			getMoreChat(){
				var roomId=this.roomId;
				var path=`/danmu/${roomId}`;
				this.$router.push({path:path});
			},
			disConnect(){
				var $this=this;
				var roomId=$this.roomId;
				var params=new URLSearchParams();
				params.append("room",roomId);
				this.$http.post('/auth/logout',params)
					.then((response)=>{
						var res=response.data;
						if(res.code==200){
							$this.getRoomDetail(roomId);
						}
					})
			},
			connect(){
				var $this=this;
				var roomId=$this.roomId;
				this.$http.post(`/auth/room1/${roomId}`)
					.then((response)=>{
						var res=response.data;
						if(res.code==200){
							$this.getRoomDetail(roomId);
						}
					});
			}
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
		
	}
	.room-info{
		height: 205px;
		border: 1px #f7f0f0 solid;
		
	}
	.room-desc .text{
		float: left;
		margin-top: 44px;
		margin-left:38px;
	}
	.gift-left{
		width: 20%;
		height: auto;
		margin-left: 3px;
		margin-top: 5px;
		float: left;
	}
	.gift-list span{
		padding-left: 3px;
	}
	.chat-center{
		float: right;
		width: 78%;
		height: auto;
		margin-top: 5px;
		border-left: 1px #f7f0f0 solid;
	}
	.chat-center .chat-list{
		width: 100%;
		float: left;
	}
	.img{
		float: left;
		width: 252px;
		padding:10px 0 0 10px;
	}
	.img img{
		width: 265px;
	}
	.img a{
		color: #f56c6c;
		font-size: 14px;
	    letter-spacing: 0;
	    text-decoration: none;
	}
</style>