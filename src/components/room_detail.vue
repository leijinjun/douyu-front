<template>
	<div id="main">
		<div>
			<div class="img">
				<img src="../../build/logo.png" />
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name:'RoomDetail',
		data(){
			return{
				
			}
		},
		created(){
			var roomId=this.$route.params.roomId;
			this.getRoomDetail(roomId);
		},
		methods:{
			getRoomDetail(roomId){
				this.$http.get(`/room/${roomId}`)
					.then((response)=>{
						var res=response.data;
						console.log(res)
					})
			}
		}
	}
</script>
	
<style scoped="scoped">
	
</style>