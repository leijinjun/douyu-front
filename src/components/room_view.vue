<template>
  <div id="main" v-loading="loading">
		  <div id="view_noble" ref="chart_room">
		  </div>
			<div id="view_chat" ref="chart_chat"></div>
  </div>
</template>
<script>
//引入主模块
var echarts = require('echarts');
//引入词云
import Js2WordCloud from 'js2wordcloud';
//require('echarts-wordcloud');
import axios from 'axios';
import { Loading } from 'element-ui';
export default {
  name:'RoomView',
  data() {
    return {
			loading: true,
			roomId:null,
			chatViewData:[],
      frankChart: null,
			js2Wordcloud:null,
      frankOptions:{
        color: ['#de7e7b'],
        tooltip: {
          trigger: 'axis',
          position: function (pt) {
            return [pt[0], '5%'];
          }
        },
        title:{
        	left:'center',
        	text:'房间本周粉丝人数趋势图'
        },
        xAxis: {
	        type: 'category',
	        boundaryGap: false,
	        data: []
				},
				yAxis: {
						type: 'value'
				},
				series: [{
						data: [],
						type: 'line',
						areaStyle: {}
				}]
      },
			pageParams:{
			}
    }
  },
  created(){
		var roomId=this.$route.params.roomId;
		this.roomId=roomId;
		var frankText=this.frankOptions.title.text;
		this.frankOptions.title.text=this.roomId+frankText;
  },
  mounted() {
  	this.getViewData(this.roomId);
  },
  beforeDestroy() {
    if (!this.frankChart) {
      return
    }
    this.frankChart.dispose();
    this.frankChart = null;
		this.js2Wordcloud=null;
  },
  methods: {
  	getViewData(roomId){
  		var $this=this;
			var getViewData=function(){
				return $this.$http.get(`/room/view/${roomId}`,{
					query:$this.pageParams
				});
			}
			var getRoomDetail=function(){
				return $this.$http.get(`/room/detail/${roomId}`);
			}
			axios.all([getViewData(),getRoomDetail()])
					.then(axios.spread((response1,response2)=>{
							$this.loading=false;
						  var res1=response1.data;
							var res2=response2.data;
							if(res1.body.frankView.frankViewX==null||res1.body.frankView.frankViewX.length==0){
								 $this.frankOptions.title.text = $this.frankOptions.title.text+"\n\n暂无数据";
							}else{
								$this.frankOptions.title.text=$this.frankOptions.title.text+"\n主播昵称："+res2.body.room.nickname;
								$this.frankOptions.xAxis.data=res1.body.frankView.frankViewX;
								$this.frankOptions.series[0].data=res1.body.frankView.frankViewY;
							}
							var clouds= res1.body.clouds;
							var arr=new Array();
							for(var key in clouds){
			　　　　		var tmp=new Array();
								tmp.push(key);
								tmp.push(clouds[key]);
								arr.push(tmp)
			　　			}
							$this.chatViewData=arr;
							$this.initChart();
					}))
					.catch(function(error){
					})
  	},
    initChart() {
    	 var $this=this;
			 $this.frankChart = echarts.init($this.$refs.chart_room,null, {renderer: 'svg'});
			 $this.frankChart.setOption($this.frankOptions);
			 var wc = new Js2WordCloud(document.getElementById('view_chat'));
			 this.js2Wordcloud=wc;
		   wc.setOption({
				    tooltip: {
				        show: true
				    },
		//		    imageShape:'./../static/images/template-image.png',
				    fontSizeFactor: 0.1,
				    tooltip: {
			        show: true,                                         // 默认：false
			        backgroundColor: 'rgba(0, 0, 0, 0.701961)',         // 默认：'rgba(0, 0, 0, 0.701961)'
			        formatter: function(item) {                         // 数据格式化函数，item为list的一项
			        	return item[0]+"："+item[1]
			        }
		    		},
		    		noDataLoadingOption: {                                  // 无数据提示。
				        backgroundColor: '#eee',
				        text: '暂无数据',
				        textStyle: {
				            color: '#888',
				            fontSize: 14
				        }
				    },
				    list:this.chatViewData,
				    color: 'random-dark',
				    fontFamily:'微软雅黑',
				    size:'1',
				    fontWeight:'600',
		//		    backgroundColor:'gray',
				    minRotation: -1.57080,
				    maxRotation: -1.57080,
				    rotateRatio: .2,
		//		    fontSizeFactor: 5,
		//		    maxFontSize: 60,
		//		    minFontSize: 20,
		//		    gridSize: 1,
						shape:'circle'
				})
    }
  }
}
</script>
<style scoped="scoped">
	#main{
		width: auto;
    height: 53.12rem;
    position: relative;
	}
	#view_noble{
		position: absolute;
    left: 50%;
    margin-left: -30.62rem;
    height: 28.12rem;
    width: 62.5rem;
	}
	#view_chat{
		position: absolute;
		left: 50%;
		top:28.12rem;
		margin-left: -14.62rem;
		height: 25rem;
		width: 25rem;
	}
	.loadingClass{
		color: #0000FF;
	}
</style>