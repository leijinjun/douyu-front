<template>
	<div>
	<el-row>
	  <el-col :span="8" v-for="(item,index) in roomList" :key="item.room_id">
	    <el-card :body-style="{ padding: '0px' }">
	      <img class="image" v-bind:src="item.room_src"/>
	      <div style="padding: 14px;">
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
	
<style>
</style>