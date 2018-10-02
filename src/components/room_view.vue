<template>
  <div id="main">
	  <div id="view_noble" style="height: 500px;width: 100%;" ref="chart_room">
	  </div>
		<div id="view_chat" style="height: 2800px;width: 80%;left: 207px;" ref="chart_chat"></div>
  </div>
</template>
<script>
//引入主模块
var echarts = require('echarts');
require('echarts-wordcloud');
export default {
  name:'RoomView',
  data() {
    return {
			roomId:null,
      frankChart: null,
			chatChart:null,
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
			chatOptions:{
				tooltip: {},
				title:{
					left:'center',
					text:'房间今日弹幕云图'
				},
				series: [{
						type: 'wordCloud',
						shape: 'circle',
						// maskImage: maskImage,
// 						left: 'center',
// 						top: 'center',
						width: '100%',
						// height: '300px',
// 						right: null,
// 						bottom: null,
						sizeRange: [12, 60],
						rotationRange: [-90, 90],
						rotationStep: 45,
						gridSize: 8,
						// drawOutOfBound: false,
						textStyle: {
								normal: {
										fontFamily: 'sans-serif',
										fontWeight: 'bold',
										color: function () {
												// Random color
												return 'rgb(' + [
														Math.round(Math.random() * 160),
														Math.round(Math.random() * 160),
														Math.round(Math.random() * 160)
												].join(',') + ')';
										}
								},
								emphasis: {
										shadowBlur: 10,
										shadowColor: '#333'
								}
						},
						data: []
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
		var chatText=this.chatOptions.title.text;
		this.frankOptions.title.text=this.roomId+frankText;
		this.chatOptions.title.text=this.roomId+chatText;
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
		if(!this.chatChart){
			return
		}
		this.chatChart.dispose();
		this.chatChart=null;
  },
  methods: {
  	getViewData(roomId){
  		var $this=this;
  		this.$http.get(`/room/view/${roomId}`,{
				query:$this.pageParams
			})
  		.then((response)=>{
  			var res=response.data;
				$this.frankOptions.xAxis.data=res.body.frankView.frankViewX;
				$this.frankOptions.series[0].data=res.body.frankView.frankViewY;
				$this.chatOptions.series[0].data=res.body.clouds;
				$this.initChart();
  		});
  	},
    initChart() {
    	 var $this=this;
			 $this.frankChart = echarts.init($this.$refs.chart_room,null, {renderer: 'svg'});
			 $this.frankChart.setOption($this.frankOptions)
			 $this.chatChart = echarts.init($this.$refs.chart_chat,null,{renderer: 'svg'});
			 $this.chatChart.setOption($this.chatOptions);
    }
  }
}
</script>