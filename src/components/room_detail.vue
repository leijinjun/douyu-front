<template>
	<div id="main">
		<div class="room-info">
			房间信息：
			<div class="img">
				<img :src="roomDetail.roomThumb" />
			</div>
			<div class="room-desc">
				<span class="text">房间号:{{roomDetail.roomId}}</span>
				<span class="text">房间标题：{{roomDetail.roomName}}</span>
				<span class="text">主播名：{{roomDetail.ownerName}}</span>
				<span class="text">当前人气：{{roomDetail.hn}}</span>
			</div>
		</div>
		<div class="gift-left">
			<div class="gift-list">
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name:'RoomDetail',
		data(){
			return{
				roomDetail:{},
				gifts:[],
				chats:[]
			}
		},
		created(){
			var roomId=this.$route.params.roomId;
			this.getRoomDetail(roomId);
		},
		methods:{
			getRoomDetail(roomId){
				var $this=this;
				this.$http.get(`/room/${roomId}`)
					.then((response)=>{
						var res=response.data;
						if(res.code=200){
							$this.roomDetail=res.body.roomDetail;
							$this.chats=res.body.chats;
							$this.gifts=res.body.gifts;
						}
					})
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
		height: 163px;
		border: 1px #f7f0f0 solid;
		
	}
	.room-desc{
		margin-left: 10px;
		margin-top: 50px;
	}
	.room-desc .text{
		float: left;
		margin-top: 26px;
		margin-left:65px;
	}
	.gift-left{
		width: 230px;
		height: auto;
		margin-left: 3px;
		margin-top: 5px;
	}
	.img img{
		float: left;
		height: 108px;
		padding: 26px 0 0 23px;
	}
</style>