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
		</div>
		<el-row class="main-body">
		  <el-col class="room-col" :span="8" v-for="(index,item) in roomList" :key="item.roomId">
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
		          <label>人气：</label><span>{{item.hn | numTransform}}</span>
		        </div>
		      </div>
		    </el-card>
		  </el-col>
		 <div style="margin-top: 50px;">
		 	暂无数据
		 </div>
		</el-row>
		<v-goTop></v-goTop>
	</div>
</template>

<script>
	import goTop from './common/goTop';
//	import utils from '../utils/util.js';
	import Vue from 'vue'
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
		methods:{
			getRoomList(){
				var $this=this;
				var param={};
				param.limit=100;
				param.cate=this.selectedCate;
				this.$http.get('/room/info/list',{params:param})
					.then(function(response){
						var res=response.data;
						$this.roomList=res.body;
					})
			},
			getCacheRoomList(){
				var $this=this;
				this.$http.get('/room/info/logged')
					.then((response)=>{
						var res=response.data;
						$this.roomList=res.body;
					})
			},
			cateChange(){
				if(this.selectedCate==null){
					return;
				}
				this.getRoomList();
			},
			getCates(){
				var $this=this;
				this.$http.get('/room/info/cates')
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
				this.$http.get(`/room/info/detail/${room}`)
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
	#main{
		width: 80%;
    	margin: auto;
	}
	.main-header{
		width: 100%;
		text-align: center;
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
		margin-bottom: 5px;
	}
	.room-search{
		width: 180px;
		height: 36px;
	}
	.room-search .el-input__inner{
		height: 36px;
	}
	.room-text a span{
		font-family: AppleSystemUIFont;
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