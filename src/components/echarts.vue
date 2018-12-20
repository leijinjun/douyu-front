<template>
  <div :class="className" :id="id" :style="{height:height,width:width}" ref="myEchart">
  </div>
</template>
<script>
//引入主模块
var echarts = require('echarts');
export default {
  props: {
    className: {
      type: String,
      default: 'room_guizu'
    },
    id: {
      type: String,
      default: 'room_guizu'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '500px'
    }
  },
  data() {
    return {
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
        	text:'房间今天贵族人数趋势图'
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
      }
    }
  },
  created(){
  },
  mounted() {
  	this.getData();
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
  	getData(){
  		var $this=this;
  		this.$http.get('/room/info/viewNoble/485503')
  		.then((response)=>{
  			var res=response.data;
			$this.options.xAxis[0].data = res.body.xAxis;
			$this.options.series[0].data=res.body.yAxis;
			$this.initChart();
  		});
  	},
    initChart() {
    	 var $this=this;
		 $this.chart = echarts.init($this.$refs.myEchart);
		 $this.chart.setOption($this.options)
    }
  }
}
</script>