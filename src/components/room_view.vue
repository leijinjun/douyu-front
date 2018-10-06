<template>
  <div id="main">
	  <div id="view_noble" style="height: 450px;width: 1000px;" ref="chart_room">
	  </div>
		<div id="view_chat" style="height: 25rem;width: 25rem;margin-left: 311px;" ref="chart_chat"></div>
  </div>
</template>
<script>
//引入主模块
var echarts = require('echarts');
//引入词云
import Js2WordCloud from 'js2wordcloud';
//require('echarts-wordcloud');
export default {
  name:'RoomView',
  data() {
    return {
			roomId:null,
			chatViewData:[],
      frankChart: null,
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
		this.getRoomDetail(roomId);
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
  },
  methods: {
  	getRoomDetail(roomId){
  		var $this=this;
  		this.$http.get(`/room/detail/${roomId}`)
  			.then((response)=>{
  				var res=response.data;
  				$this.frankOptions.title.text=$this.frankOptions.title.text+"\n主播昵称："+res.body.room.nickname;
  			})
  	},
  	getViewData(roomId){
  		var $this=this;
  		this.$http.get(`/room/view/${roomId}`,{
				query:$this.pageParams
			})
  		.then((response)=>{
  			var res=response.data;
				$this.frankOptions.xAxis.data=res.body.frankView.frankViewX;
				$this.frankOptions.series[0].data=res.body.frankView.frankViewY;
				var clouds= res.body.clouds;
				var arr=new Array();
				for(var key in clouds){
　　　　		var tmp=new Array();
					tmp.push(key);
					tmp.push(clouds[key]);
					arr.push(tmp)
　　			}
				$this.chatViewData=arr;
				$this.initChart();
  		});
  	},
    initChart() {
    	 var $this=this;
			 $this.frankChart = echarts.init($this.$refs.chart_room,null, {renderer: 'svg'});
			 $this.frankChart.setOption($this.frankOptions);
			 var wc = new Js2WordCloud(document.getElementById('view_chat'))
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
		
	}
</style>