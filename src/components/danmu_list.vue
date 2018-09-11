<template>
<div  id="main">
	<span>房间号{{roomId}}弹幕列表</span>
	<div class="chat-list" v-for="chat in chats" style="padding-left: 13%;width: 56%;">
		<div style="float: left;margin-left: 6px;margin-top: 8px;height: 36px;">
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
				pagnation:{},
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
							$this.chats=res.body;
						}
					})
			},
			initPagnation(){
				this.pagnation.size=100;
				this.pagnation.from=0;
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