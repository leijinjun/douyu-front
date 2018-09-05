<template>
	<div id="container">
	<el-row>
	  <el-col class="room-col" :span="8" v-for="(item,index) in roomList" :key="item.room_id">
	    <el-card class="room-mod-link" :body-style="{ padding: '0px' }">
	      <img class="room-image" v-bind:src="item.room_src"/>
	      <div class="room-text">
	        <span>{{item.nickname}}</span>
	        <div class="bottom clearfix">
	          <span>{{item.room_name}}</span>
	          <el-button type="text" class="button">login</el-button>
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
		    margin-bottom: 58px;
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
		    margin-bottom: 58px;
		}
	}
	@media only screen and (min-width:1766px) {
  		.room-col .room-mod-link{
			width: 528px;
			height: 360px;
		}
		.room-col{
			width: 536px;
			vertical-align: top;
		    display: inline-block;
		    padding:0 5px;
		    margin-bottom: 58px;
		}
  	}
	
	.room-mod-link .room-image{
		display: block;
	    width: 100%;
	    height: 100%;
	    transition: all .25s ease-in-out;
	    -webkit-backface-visibility: hidden;
	    backface-visibility: hidden;
	}
	.room-col .room-text{
		/*min-width: 356px;*/
	}
</style>