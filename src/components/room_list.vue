<template>
	<div id="main">
		<div class="main-header">
			<el-select v-model="selectedCate" clearable filterable placeholder="请选择分类" @change="cateChange()">
			    <el-option
			      v-for="item in cates"
			      :key="item.cateId"
			      :label="item.cateName"
			      :value="item.cateId">
			    </el-option>
			  </el-select>
			  <el-input v-model="keyword" placeholder="请输入房间ID" style="width: 120px;"></el-input>
			  <el-button plain @click="searchRoom()"><span>搜索房间</span></el-button>
			<el-button style="background-image: linear-gradient(-90deg, #BB9BF1 0%, #887BF2 100%);
border-radius: 4px;color: #F7F0F0;" round @click="changeRoomListFlag()">
				<span v-if="!changeFlag">切换到所有房间</span>
				<span v-else>切换到已连接房间</span>
			</el-button>
		</div>
		<el-row class="main-body">
		  <el-col v-if="roomList.length>0" class="room-col" :span="8" v-for="(item,index) in roomList" :key="item.roomId">
		    <el-card class="room-mod-link" :body-style="{ padding: '0px' }">
		      <router-link :to="'/room/'+item.roomId">
			      <img class="room-image" v-bind:src="item.roomSrc"/>
		      </router-link>
		      <div class="room-text">
		        <label>主播：</label><span>{{item.nickname}}</span>
		        <div class="bottom clearfix">
		          <span style="width: 100%;overflow: hidden;text-overflow: ellipsis; white-space:nowrap;">
			          <label>房间名：</label><span>{{item.roomName}}</span>
		          </span>
		          <br />
		          <label>人气：</label><span>{{item.hn|numTransform}}</span>
		        </div>
		        <div class="room-conn">
		        	<a href="javascript:;" v-if="item.connected">
		        		<span v-if="roomConnecting[item.roomId]===true"><i class="iconfont icon-jiazai"></i></span>
		        		<span v-else @click="disConnect(item.roomId)">断开连接</span>
		        	</a>
		        	<a href="javascript:;" v-else>
		        		<span v-if="roomConnecting[item.roomId]===true"><i class="iconfont icon-jiazai"></i></span>
		        		<span v-else  @click="connect(item.roomId)">连接</span>
		        	</a>
		        </div>
		      </div>
		    </el-card>
		  </el-col>
		 <div v-else style="margin-top: 50px;">
		 	暂无数据
		 </div>
		</el-row>
		<v-goTop></v-goTop>
	</div>
</template>

<script>
	import goTop from './common/goTop';
//	import utils from '../utils/util.js';
	export default {
		name:'RoomList',
		data(){
			return{
				changeFlag:true,
				roomId:null,
				cates:[],
				keyword:null,
				selectedCate:null,
				roomList:[],
				roomConnecting:{}
			}
		},
		components:{
			'v-goTop':goTop
		},
		created(){
			var connected=this.$route.query.connected;
			if(connected===undefined){
				this.changeFlag=true;
				this.getRoomList();
			}else{
				this.changeFlag=false;
				this.getCacheRoomList();
			}
			this.getCates();
		},
		/*filters:{
			numTransform:function(value){
				return utils.numTransform(value);
			}
		},*/
		methods:{
			getRoomList(){
				var $this=this;
				var param={};
				param.limit=100;
				param.cate=this.selectedCate;
				this.$http.get('/room/list',{params:param})
					.then(function(response){
						var res=response.data;
						$this.roomList=res.body;
					})
			},
			getCacheRoomList(){
				var $this=this;
				this.$http.get('/room/logged')
					.then((response)=>{
						var res=response.data;
						$this.roomList=res.body;
					})
			},
			connect(room){
				var $this=this;
				this.$set(this.roomConnecting,room,true)
				this.$http.post(`/auth/login/${room}`)
					.then((response)=>{
						this.$set(this.roomConnecting,room,false)
						var res=response.data;
						$this.changeRoomList();
					})
					.catch((error)=>{
						this.$set(this.roomConnecting,room,false)
						$this.$message.error("连接错误");
					});
			},
			disConnect(room){
				var $this=this;
				this.$set(this.roomConnecting,room,true)
				var params=new URLSearchParams();
				params.append("room",room);
				this.$http.post('/auth/logout',params)
					.then((response)=>{
						this.$set(this.roomConnecting,room,false)
						var res=response.data;
						$this.changeRoomList();
					})
					.catch((error)=>{
						this.$set(this.roomConnecting,room,false)
						$this.$message.error("连接错误");
					});
			},
			changeRoomListFlag(){
				var flag=this.changeFlag;
				this.changeFlag=!flag;
				this.changeRoomList();
			},
			changeRoomList(){
				if(!this.changeFlag){
					this.getCacheRoomList();
				}else{
					this.getRoomList();
				}
			},
			cateChange(){
				if(this.selectedCate==null){
					return;
				}
				this.getRoomList();
			},
			getCates(){
				var $this=this;
				this.$http.get('/room/cates')
					.then((response)=>{
						var res=response.data;
						if(res.code==200){
							$this.cates=res.body;
						}
					})
			},
			searchRoom(){
				var room=this.keyword;
				if(room==null||room==''){
					return;
				}
				var $this=this;
				this.$http.get(`/room/detail/${room}`)
					.then((response=>{
						var res=response.data;
						var arr=new Array();
						arr.push(res.body.room);
						$this.roomList=arr;
					}));
			}
		},
		mounted () {
		}
	}
</script>
	
<style scoped="scoped">
	.main-header{
		width: 100%;
	}
	.main-body{
		margin-top: 8px;
	}
	.room-col{
			vertical-align: top;
		    display: inline-block;
		    padding:0 5px;
		    margin-bottom: 9px;
		    border-radius: 4px;
	}
	@media screen and (max-width: 1335px){
		.room-col .room-mod-link{
			height: 290px;
		}
		.room-image{
			height: 203px;
		}
	}
	@media screen and (min-width: 1336px) and (max-width:1765px){
		.room-col .room-mod-link{
			height: 351px;
		}
		.room-image{
			height: 264px;
		}
	}
	@media only screen and (min-width:1766px) {
		.room-col .room-mod-link{
			height: 412px;
		}
		.room-image{
			height: 326px;
		}
  	}
  	.el-button{
  		height: 40px;
  		padding-top: 8px;
  	}
  	/*.el-button span{
  		color: #5a2dff;
  	}*/
  	.room-list.m-col{
  		margin-bottom: 10px;
  	}
	.room-mod-link .room-image{
		display: block;
	    width: 100%;
	    transition: all .25s ease-in-out;
	    -webkit-backface-visibility: hidden;
	    backface-visibility: hidden;
	}
	.room-col .room-text{
		background-color: rgba(255,255,255,0.6);
		color: #838c9a;
		height: 100%;
	}
	.room-text .room-conn{
		margin-top: 8px;
	}
	.room-search{
		width: 180px;
		height: 36px;
	}
	.room-search .el-input__inner{
		height: 36px;
	}
	.room-text a span{
		font-family: .AppleSystemUIFont;
		font-size: 14px;
		color: #f56c6c;
		letter-spacing: 0;
	}
	a{
		text-decoration:none;
	}
	.el-button.is-plain:hover{
		border-color: rgb(90, 45, 255);
	}
	.el-button.is-plain span{
		color: rgb(90, 45, 255);
	}
	.el-input:focus{
		border-color: rgb(90, 45, 255);
	}
</style>