<template>
	<div id="main">
		<el-container>
		  <el-header height="100%">
		  	<div class="room-info">
				<p style="text-align: center;width: 100%;font-size: 16px;">房间信息</p>
				<div style="width: 100%;height: 181px;">
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
					<div class="room-desc text">
						<span>房间号:{{roomDetail.roomId}}</span>
						<span class="title">房间标题：{{roomDetail.roomName}}</span>
						<span>主播名：{{roomDetail.ownerName}}</span>
						<span>当前人气：{{roomDetail.hn}}</span>
						<span>今日弹幕数：{{chatTotalCount|numTransform}}</span>
					</div>
				</div>
				</div>
		  </el-header>
		  <el-container>
		    <el-aside width="262px" style="margin-left: 10px;overflow: hidden;">
				<div style="color: rgb(90, 45, 255);">今日最新礼物</div>
				<div v-if="gifts.length>0" class="gift-list">
					<div v-for="gift in gifts" style="float: left;height: 50px;text-overflow: ellipsis; white-space:nowrap;overflow: hidden;margin-left: 61px;">
						<div style="width: 50px;float: left;"><img  v-bind:src="roomGifts[gift.gfid]!=null?roomGifts[gift.gfid].himg:''" height="48px;" width="48px"/></div>
						<div style="width: auto;padding: 13px 0 0 59px;text-align:left;">
							<span>x{{gift.gfcnt}}</span>
							<span>{{gift.nn}}</span>
						</div>
					</div>
				</div>
		    </el-aside>
		    <el-main>
		    	<div style="height:450px;">
					<p>
						<router-link :to="{
							name:'RoomView',
							path:'/view/'+roomId,
						}" style="color: darkorchid;text-decoration: none;">查看更多</router-link>
					</p>
					<div id="room_view" style="height:430px;width:100%;" ref="myEchart">
					</div>
				</div>
				<div style="background-color: antiquewhite;color: rgb(90, 45, 255);">今日最新弹幕<span style="float: left;padding-left: 10px;" @click="getMoreChat()"><a href="javascript:;" style="color: darkorchid;text-decoration: none;">查看更多</a></span></div>
				<div class="chat-list">
					<div class="chat-item" v-for="chat in chats">
						<div style="float: left;margin-left: 6px;margin-top: 8px;height: 36px;overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
							<span>{{chat.timestamp}}</span>
							<a v-bind:class="'user-level level-bgpng level-size1 level-'+chat.level" v-bind:title="'用户等级：'+chat.level"></a>
							<span style="color: #2b94ff;padding-left: 5px;margin-left: 40px;">{{chat.nn}}：</span>
							<span v-if="chat.ifs==1" v-bind:style="'color:'+tableColor[chat.col]+' ;'">{{chat.txt}}</span>
							<span v-else style="color: #333;">{{chat.txt}}</span>
						</div>
					</div>				
				</div>
		    </el-main>
		  </el-container>
		</el-container>
		<!--<div class="room-info">
			<p style="text-align: center;width: 100%;font-size: 16px;">房间信息</p>
			<div style="width: 100%;height: 181px;">
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
				<div class="room-desc text">
					<span>房间号:{{roomDetail.roomId}}</span>
					<span class="title">房间标题：{{roomDetail.roomName}}</span>
					<span>主播名：{{roomDetail.ownerName}}</span>
					<span>当前人气：{{roomDetail.hn}}</span>
					<span>今日弹幕数：{{chatTotalCount|numTransform}}</span>
				</div>
			</div>
		</div>-->
		<!--<div style="width: 100%;height: 100%;">
			<div class="gift-left">
				<div style="color: rgb(90, 45, 255);margin-bottom: 10px;width: 230px;float: left;">今日最新礼物</div>
				<div v-if="gifts.length>0" class="gift-list">
					<div v-for="gift in gifts" style="float: left;width:100%;height: 50px;text-overflow: ellipsis; white-space:nowrap;overflow: hidden;">
						<div style="width: 50px;float: left;"><img  v-bind:src="roomGifts[gift.gfid]!=null?roomGifts[gift.gfid].himg:''" height="48px;" width="48px"/></div>
						<div style="width: auto;padding: 13px 0 0 59px;text-align:left;">
							<span>x{{gift.gfcnt}}</span>
							<span>{{gift.nn}}</span>
						</div>
					</div>
				</div>
			</div>
			<div class="chat-center">
				<div style="height:450px;position: absolute;">
					<p style="padding-right: 10px;">
						<router-link :to="{
							name:'RoomView',
							path:'/view/'+roomId,
						}" style="color: darkorchid;text-decoration: none;">查看更多</router-link>
					</p>
					<div id="room_view" style="height:430px;width:100%;position:fixed;" ref="myEchart">
					</div>
				</div>
				<div style="background-color: antiquewhite;width: 100%;color: rgb(90, 45, 255);">今日最新弹幕<span style="float: left;padding-left: 10px;" @click="getMoreChat()"><a href="javascript:;" style="color: darkorchid;text-decoration: none;">查看更多</a></span></div>
				<div class="chat-list">
					<div class="chat-item" v-for="chat in chats">
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
		</div>-->
	</div>
</template>

<script>
	import tableColor from '../config/tableColor.json'
	//引入模块
	var echarts = require('echarts');
	export default {
		name:'RoomDetail',
		data(){
			return{
				chart: null,
				options:{
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
			          data: [],
			         /* axisTick: {
			            alignWithLabel: true
			          }*/
			        }],
			        yAxis: [{
			          type: 'value',
			          boundaryGap: [0, '100%']
			        }],
			        dataZoom: [{
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
				    }],
			        series: [{
			          name: '贵族数量',
			          type: 'line',
			          data: [],
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
		        },
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
					$this.options.xAxis[0].data = res.body.xAxis;
					$this.options.series[0].data=res.body.yAxis;
					$this.initChart();
		  		});
			},
			initChart() {
		    	var $this=this;
				$this.chart = echarts.init($this.$refs.myEchart,null,{renderer: 'svg'});
				$this.chart.setOption($this.options)
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
		/*width: 990px;*/
		/*margin: auto;*/
		/*margin-left: 3%;*/
		/*margin-right: 3%;*/
	}
	.room-desc.text{
		margin-left: 10px;
		margin-top: 44px;
		position: absolute;
    	left: 399px;
	}
	.gift-list span{
		padding-left: 3px;
	}
	.chat-list .chat-item{
		width: 100%;
		height: 34px;
		float: left;
	}
	.img{
		float: left;
		width: 275px;
		padding:0 0 0 10px;
	}
	.img img{
		width: 275px;
	}
	.img a{
		color: #f56c6c;
		font-size: 14px;
	    letter-spacing: 0;
	    text-decoration: none;
	}
	.text span{
		margin-right: 5px;
	}
	.text span.title{
		overflow-x: hidden;
		width: 180px;
		text-overflow: ellipsis;
		white-space:nowrap;
	}
</style>