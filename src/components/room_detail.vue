<template>
	<div id="main">
		<div class="room-info">
			<span class="title">房间信息</span>
			<div class="img">
				<a target="_blank" :href="'https://www.douyu.com/'+roomDetail.roomId"><img :src="roomDetail.roomThumb"/></a>
				<div>
					<a href="javascript:;" v-if="connected">
						<span v-if="roomConnecting===true"><i class="iconfont icon-jiazai"></i></span>
		        		<span v-else @click="disConnect()">断开连接</span>
					</a>
				    <a href="javascript:;"  v-else @click="connect()">
				    	<span v-if="roomConnecting===true"><i class="iconfont icon-jiazai"></i></span>
		        		<span v-else @click="disConnect()">连接</span>
				    </a>
		    	</div>
			</div>
			<div class="room-desc">
				<p class="text"><label>房间号：</label><span>{{roomDetail.roomId}}</span></p>
				<p class="text" style="overflow: hidden;width: 18.62rem;text-overflow: ellipsis; white-space:nowrap;">
					<label>房间标题：</label>
					<span>{{roomDetail.roomName}}</span>
				</p>
				<p class="text"><label>主播名：</label><span>{{roomDetail.ownerName}}</span></p>
				<p class="text"><label>当前人气：</label><span>{{roomDetail.hn}}</span></p>
				<p class="text"><label>今日弹幕数量：</label><span>{{chatTotalCount|numTransform}}</span></p>
				<p class="text"><label>今日弹幕人数：</label><span>1213人</span></span>
				<p class="text"><label>今日礼物：</label><span>1213元</span></p>
			</div>
			<!--<div class="room-desc-2">
				
			</div>-->
		</div>
		<div>
			<div class="gift-left">
				<div style="color: rgb(90, 45, 255);margin-bottom: 10px;width: 100%;">今日最新礼物</div>
				<div v-if="gifts.length>0" class="gift-list">
					<div v-for="gift in gifts" v-bind:key="gift.id" style="float: left;width:100%;height: 50px;text-overflow: ellipsis; white-space:nowrap;overflow: hidden;">
						<div style="width: 50px;float: left;"><img :alt="gift.pc+' rmb'" v-bind:src="roomGifts[gift.gfid]!=null?roomGifts[gift.gfid].himg:tableGfit[gift.pc]!=undefined&&tableGfit[gift.pc]!=null?tableGfit[gift.pc]:''" height="48px;" width="48px"/></div>
						<div style="width: auto;padding: 13px 0 0 59px;text-align:left;">
							<span>x{{gift.gfcnt}}</span>
							<span>{{gift.nn}}</span>
						</div>
					</div>
				</div>
				<div v-else>
					无数据
				</div>
			</div>
			<div class="chat-center">
				<div style="height:450px;width: 100%;">
					<div style="padding-right: 10px;float: right;width: 100%;">
						<router-link :to="{
							name:'RoomView',
							path:'/view/'+roomId,
						}" style="color: darkorchid;text-decoration: none;">查看更多</router-link>
					</div>
					<div id="room_view" style="height:26.87rem;width: 100%;float: left;" ref="myEchart">
					</div>
				</div>
				<div style="background-color: antiquewhite;width: 100%;color: rgb(90, 45, 255);">今日最新弹幕<span style="float: right;padding-right: 10px;" @click="getMoreChat()"><a href="javascript:;" style="color: darkorchid;text-decoration: none;">查看更多</a></span></div>
				<div class="chat-list">
					<div class="chat-item" v-for="chat in chats" v-bind:key="chat.id">
							<div style="float: left;margin-left: 6px;margin-top: 8px;height: 36px;overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
								<span>{{chat.timestamp}}</span>
								<a v-bind:class="'user-level level-bgpng level-size1 level-'+chat.level" v-bind:title="'用户等级：'+chat.level"></a>
								<span style="color: #2b94ff;padding-left: 5px;margin-left: 40px;">{{chat.nn}}：</span>
								<span v-if="chat.ifs==1" v-bind:style="'color:'+tableColor[chat.col]+' ;'">{{chat.txt}}</span>
								<span v-else style="color: #333;">{{chat.txt}}</span>
							</div>
					</div>
				</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import tableColor from '../config/tableColor.json'
	import tableGfit from '../config/tableGfit.json'
	//引入模块
	var echarts = require('echarts');
	export default {
		name:'RoomDetail',
		data(){
			return{
				chart: null,
				tableGfit:tableGfit,
				roomId:null,
				chatTotalCount:0,
				roomDetail:{},
				gifts:[],
				chats:[],
				roomGifts:{},
				connected:false,
				tableColor:tableColor,
				roomConnecting:null
			}
		},
		created(){
			var roomId=this.$route.params.roomId;
			this.roomId=roomId;
			this.getRoomDetail(roomId);
		},
		mounted() {
		  	this.getViewData(this.roomId);
		},
		beforeDestroy() {
		    if (!this.chart) {
		      return
		    }
		    this.chart.dispose();
		    this.chart = null;
		},
		methods:{
			getViewData(room){
				var $this=this;
		  		this.$http.get(`/room/viewNoble/${room}`)
		  		.then((response)=>{
		  			var res=response.data;
					$this.initChart(res.body);
		  		});
			},
			initChart(data) {
				var $this=this;
				$this.chart = echarts.init($this.$refs.myEchart,null,{renderer: 'svg'});
				var options={
							color: ['#de7e7b'],
							tooltip: {
								trigger: 'axis',
								position: function (pt) {
									return [pt[0], '5%'];
								}
							},
							title:{
								left:'center',
								text:new Date().toLocaleDateString().replace(/\//g,"-")+'本房间贵族人数趋势图'
							},
							xAxis: [{
								type: 'category',
								boundaryGap: false,
								data: data.xAxis,
							/* axisTick: {
									alignWithLabel: true
								}*/
							}],
							yAxis: [{
								type: 'value',
								boundaryGap: [0, '100%']
							}],
							/* dataZoom: [{
									type: 'inside',
									start: 0,
									end: 50
							}, {
									start: 0,
									end: 10,
									handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
									handleSize: '60%',
									handleStyle: {
											color: '#fff',
											shadowBlur: 3,
											shadowColor: 'rgba(0, 0, 0, 0.6)',
											shadowOffsetX: 2,
											shadowOffsetY: 2
							}
						}], */
							series: [{
								name: '贵族数量',
								type: 'line',
								data: data.yAxis,
								smooth:true,
								symbol: 'none',
								sampling: 'average',
								itemStyle: {
										color: 'rgb(255, 70, 131)'
							},
							areaStyle: {
									color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
											offset: 0,
											color: 'rgb(255, 158, 68)'
									}, {
											offset: 1,
											color: 'rgb(255, 70, 131)'
									}])
							},
						}]
				}
				if(!data.xAxis||!data.xAxis.length){
					options.title.text=options.title.text+"\n\n无数据";
				}
				$this.chart.setOption(options);
				//图表自适应
				window.onresize = function(){
					$this.chart.resize();
				};
			},
			getRoomDetail(roomId){
				var $this=this;
				this.$http.get(`/room/info/${roomId}`)
					.then((response)=>{
						var res=response.data;
						if(res.code=200){
							var body=res.body;
							$this.roomDetail=body.roomDetail;
							$this.chatTotalCount = body.chatTotalCount;
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
				this.roomConnecting=true;
				var roomId=$this.roomId;
				var params=new URLSearchParams();
				params.append("room",roomId);
				this.$http.post('/auth/logout',params)
					.then((response)=>{
						var res=response.data;
						this.roomConnecting=false;
						$this.getRoomDetail(roomId);
					})
					.catch((error)=>{
						this.roomConnecting=false;
						$this.$message.error("连接错误");
					});
			},
			connect(){
				var $this=this;
				var roomId=$this.roomId;
				this.$http.post(`/auth/login/${roomId}`)
					.then((response)=>{
						var res=response.data;
						this.roomConnecting=false;
						$this.getRoomDetail(roomId);
					})
					.catch((error)=>{
						this.roomConnecting=false;
						$this.$message.error("连接错误");
					});
			}
		}
	}
</script>
<style scoped="scoped">
	@import '../../static/css/level.css';
</style>
<style scoped="scoped">
	#main{
		/*width:1069px;*/
		margin:auto;
	}
	.room-info{
		height: 13.43rem;
		border: 1px #f7f0f0 solid;
		margin: 0.62rem 0.62rem;
    	position: relative;
	}
	.room-info .title{
		text-align: center;
		width: 100%;
		font-size: 1.12rem;
	}
	.room-desc{
		position: absolute;
	    width: auto;
	    left: 17.43rem;
	    margin-top: 2.31rem;
	}
	.room-desc-2{
	    position: absolute;
	    width: auto;
	    left: 17.43rem;
	    margin-top: 4.5rem;
	}
	.room-desc .text{
		float: left;
		/*margin-top: 44px;*/
		margin-left:2.37rem;
		font-family: "微软雅黑";
		font-size: 1rem;
		padding-bottom: 0.62rem;
	}
	.room-desc-2 .text{
		/*float: left;*/
		/*margin-top: 44px;*/
		margin-left:2.25rem;
		font-family: "微软雅黑";
		font-size: 1rem;
	}
	.gift-left{
		width: 18%;
		height: auto;
		margin-left: 0.18rem;
		margin-top: 0.31rem;
		float: left;
	}
	.gift-list span{
		padding-left: 0.18rem;
	}
	.chat-center{
		float: right;
		width: 81%;
		height: auto;
		margin-top: 0.31rem;
		border-left: 1px #f7f0f0 solid;
	}
	.chat-list .chat-item{
		width: 100%;
		height: 2.12rem;
		float: left;
	}
	.img{
		/*float: left;*/
		width: 16.56rem;
		/*padding:10px 0 0 10px;*/
		padding: 0 0 0 0.62rem;
    	position: absolute;
	}
	.img img{
		width: 16.56rem;
	}
	.img a{
	  color: #f56c6c;
	  font-size: 0.87rem;
	  letter-spacing: 0;
	  text-decoration: none;
      line-height: 1.81rem;
	}
</style>