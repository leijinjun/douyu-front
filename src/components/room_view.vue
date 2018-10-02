<template>
  <div id="main">
	  <div id="view_noble" style="height: 500px;width: 100%;" ref="chart_room">
	  </div>
  </div>
</template>
<script>
//引入主模块
var echarts = require('echarts');
export default {
  name:'RoomView',
  data() {
    return {
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
      }
    }
  },
  created(){
  },
  mounted() {
  	this.getViewData();
  },
  beforeDestroy() {
    if (!this.frankChart) {
      return
    }
    this.frankChart.dispose();
    this.frankChart = null;
  },
  methods: {
  	getViewData(){
  		var $this=this;
  		this.$http.get('/room/view/485503')
  		.then((response)=>{
  			var res=response.data;
			$this.frankOptions.xAxis.data=res.body.frankView.frankViewX;
			$this.frankOptions.series[0].data=res.body.frankView.frankViewY;
			$this.initChart();
  		});
  	},
    initChart() {
    	 var $this=this;
		 $this.frankChart = echarts.init($this.$refs.chart_room,null, {renderer: 'svg'});
		 $this.frankChart.setOption($this.frankOptions)
    }
  }
}
</script>