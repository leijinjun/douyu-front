<template>
	<div id="main">
		<el-row>
		  <el-col class="room-col" :span="8" v-for="(item,index) in roomList" :key="item.roomId">
		    <el-card class="room-mod-link" :body-style="{ padding: '0px' }">
		      <router-link :to="'/room/'+item.roomId">
			      <img class="room-image" v-bind:src="item.roomSrc"/>
		      </router-link>
		      <div class="room-text">
		        <label>主播：</label><span>{{item.nickname}}</span>
		        <div class="bottom clearfix">
		          <label>房间名：</label><span>{{item.roomName}}</span><br />
		          <label>人气：</label><span>{{item.online}}</span>
		        </div>
		        <div class="room-conn">
		        	<a href="javascript:;" v-if="item.connected" @click="disConnect(item.roomId)">断开连接</a>
		        	<a href="javascript:;" v-else @click="connect(item.roomId)">连接</a>
		        </div>
		      </div>
		    </el-card>
		  </el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		name:'RoomList',
		data(){
			return{
				roomList:[]
			}
		},
		created(){
			this.getRoomList();
		},
		methods:{
			getRoomList(){
				var $this=this;
				this.$http.get('/room/list')
					.then(function(response){
						var res=response.data;
						if(res.code==200){
							$this.roomList=res.body;
						}
					})
			},
			connect(room){
				var $this=this;
				this.$http.post(`/room1/${room}`)
					.then((response)=>{
						var res=response.data;
						if(res.code==200){
							$this.getRoomList();
						}
					});
			},
			disConnect(room){
				var $this=this;
				var params=new URLSearchParams();
				params.append("room",room);
				this.$http.post('/logout',params)
					.then((response)=>{
						var res=response.data;
						if(res.code==200){
							$this.getRoomList();
						}
					})
			}
		}
	}
</script>
	
<style scoped="scoped">
	#main{
		position: relative;
		overflow: hidden;
		padding: 0 4px;
		margin: 0 auto;
	}
	@media screen and (max-width: 1335px){
		.room-col .room-mod-link{
			height: 400px;
		}
		.room-col{
			vertical-align: top;
		    display: inline-block;
		    padding:0 5px;
		    margin-bottom: 18px;
		    border-radius: 4px;
		}
		#main{
			width: 1100px;
			position: relative;
			overflow: hidden;
			padding: 0 4px;
			margin: 0 auto;
		}
	}
	@media screen and (min-width: 1336px) and (max-width:1765px){
		.room-col .room-mod-link{
			height: 400px;
		}
		.room-col{
			vertical-align: top;
		    display: inline-block;
		    padding:0 5px;
		    margin-bottom: 18px;
		    border-radius: 4px;
		}
		#main{
			width: 1303px;
			position: relative;
			overflow: hidden;
			padding: 0 4px;
			margin: 0 auto;
		}
	}
	@media only screen and (min-width:1766px) {
  		.room-col .room-mod-link{
		}
		.room-col{
			height: 401px;
			vertical-align: top;
		    display: inline-block;
		    padding:0 5px;
		    margin-bottom: 18px;
		    border-radius: 4px;
		}
		#main{
			width: 1609px;
			position: relative;
			overflow: hidden;
			padding: 0 4px;
			margin: 0 auto;
		}
  	}
  	.room-list.m-col{
  		margin-bottom: 10px;
  	}
	.room-mod-link .room-image{
		display: block;
	    width: 100%;
	    height: 297px;
	    transition: all .25s ease-in-out;
	    -webkit-backface-visibility: hidden;
	    backface-visibility: hidden;
	}
	.room-col .room-text{
		background-color: rgba(255,255,255,0.6);
		color: #838c9a;
		height: 102px;
	}
	.room-text .room-conn{
		margin-top: 8px;
	}
	.room-text a{
		font-family: .AppleSystemUIFont;
		font-size: 14px;
		color: #f56c6c;
		letter-spacing: 0;
		text-decoration:none
	}
</style>