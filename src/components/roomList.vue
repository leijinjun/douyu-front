<template>
	<div id="container">
		<el-row>
		  <el-col class="room-col" :span="8" v-for="(item,index) in roomList" :key="item.room_id">
		    <el-card class="room-mod-link" :body-style="{ padding: '0px' }">
		      <img class="room-image" v-bind:src="item.room_src"/>
		      <div class="room-text">
		        <label>主播：</label><span>{{item.nickname}}</span>
		        <div class="bottom clearfix">
		          <label>房间名：</label><span>{{item.room_name}}</span>
		        </div>
		        <div>
		        	<label>人气：</label><span>{{item.hn}}</span><br />
		        	<el-button class="btn">login</el-button>
		        </div>
		      </div>
		    </el-card>
		  </el-col>
		</el-row>
		<!--<div class="room-list m-col" v-for="(item,index) in roomList" :key="item.room_id">
			<div class="room-img">
				<img v-bind:src="item.room_src"/>
			</div>
			<div class="room-t">
				<div>
				<label class="label">房间ID：</label><span class="room-text">{{item.room_id}}</span></div>
				<div>
					<label class="label">房间标题：</label><span class="room-text">{{item.room_name}}</span>
				</div>
				<div>
					<label class="label">房间人气：</label><span class="room-text">{{item.online}}</span>
				</div>
				<div>
					<label class="label">房间粉丝：</label><span class="room-text">{{item.hn}}</span>
				</div>
				<div>
					<label class="label">主播：</label><span class="room-text">{{item.nickname}}</span>
				</div>
			</div>
		</div>-->
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
				this.$http.get('/room')
					.then(function(response){
						var res=response.data;
						if(res.code==200){
							$this.roomList=res.body;
						}
					})
			}
		}
	}
</script>
	
<style scoped="scoped">
	#container{
		position: relative;
		overflow: hidden;
		padding: 0 4px;
		margin: 0 auto;
	}
	@media screen and (max-width: 1335px){
		.room-col .room-mod-link{
			width: 356px;
			height: 280px;
		}
		.room-col{
			width: 366px;
			vertical-align: top;
		    display: inline-block;
		    padding:0 5px;
		    margin-bottom: 18px;
		    border-radius: 4px;
		}
		.room-list{
			width: 1013px;
			height: 264px;
			border: 1px solid #DCDFE6;
			border-radius: 4px;
			padding:0 45px;
		}
	}
	@media screen and (min-width: 1336px) and (max-width:1765px){
		.room-col .room-mod-link{
			width: 422px;
			height: 309px;
		}
		.room-col{
			width: 434px;
			vertical-align: top;
		    display: inline-block;
		    padding:0 5px;
		    margin-bottom: 18px;
		    border-radius: 4px;
		}
		.room-list{
			width: 1201px;
			height: 264px;
			border: 1px solid #DCDFE6;
			border-radius: 4px;
			padding:0 45px;
		}
	}
	@media only screen and (min-width:1766px) {
  		.room-col .room-mod-link{
			width: 528px;
		}
		.room-col{
			width: 536px;
			height: 401px;
			vertical-align: top;
		    display: inline-block;
		    padding:0 5px;
		    margin-bottom: 18px;
		    border-radius: 4px;
		}
		.room-list{
			width: 1475px;
			height: 264px;
			border: 1px solid #DCDFE6;
			border-radius: 4px;
			padding:0 45px;
		}
  	}
  	.room-list.m-col{
  		margin-bottom: 10px;
  	}
  	.room-mod-link{
  		border: 1px solid #4d1e94;
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
		background-color: #f56c6c;
		color: #DCDFE6;
	}
	.btn{
		font-family: .AppleSystemUIFont;
		font-size: 14px;
		color: #f56c6c;
		letter-spacing: 0;
	}
</style>