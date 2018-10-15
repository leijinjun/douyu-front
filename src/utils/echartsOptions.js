var echarts = require('echarts');
var options={
	"giftMoney":{
		tooltip: {
			trigger: 'axis',
			position: function (pt) {
				return [pt[0], '5%'];
			}
		},
		title:{
			left:'center',
			text:'本房间礼物收入图'
		},
	    xAxis: {
	        type: 'category',
	        data: []
	    },
	    yAxis: {
	        type: 'value'
	    },
	    series: [{
	        data: [],
	        type: 'line',
	        smooth: true,
	        areaStyle: {}
	    }]
	},
	"giftPerson":{
		tooltip: {
			trigger: 'axis',
			position: function (pt) {
				return [pt[0], '5%'];
			}
		},
		title:{
			left:'center',
			text:'本房间送礼人数图'
		},
	    xAxis: {
	        type: 'category',
	        data: []
	    },
	    yAxis: {
	        type: 'value'
	    },
	    series: [{
	        data: [],
	        type: 'line',
	        smooth: true,
	        areaStyle: {}
	    }]
	},
	"chatNum":{
		tooltip: {
			trigger: 'axis',
			position: function (pt) {
				return [pt[0], '5%'];
			}
		},
		title:{
			left:'center',
			text:'本房间弹幕条数图'
		},
	    xAxis: {
	        type: 'category',
	        data: []
	    },
	    yAxis: {
	        type: 'value'
	    },
	    series: [{
	        data: [],
	        type: 'line',
	        smooth: true,
	        areaStyle: {}
	    }]
	},
	"chatPerson":{
		tooltip: {
			trigger: 'axis',
			position: function (pt) {
				return [pt[0], '5%'];
			}
		},
		title:{
			left:'center',
			text:'本房间弹幕人数图'
		},
	    xAxis: {
	        type: 'category',
	        data: []
	    },
	    yAxis: {
	        type: 'value'
	    },
	    series: [{
	        data: [],
	        type: 'line',
	        smooth: true,
	        areaStyle: {}
	    }]
	},
	"fansPerson":{
		tooltip: {
			trigger: 'axis',
			position: function (pt) {
				return [pt[0], '5%'];
			}
		},
		title:{
			left:'center',
			text:'本房间弹幕粉丝人数图'
		},
	    xAxis: {
	        type: 'category',
	        data: []
	    },
	    yAxis: {
	        type: 'value'
	    },
	    series: [{
	        data: [],
	        type: 'line',
	        smooth: true,
	        areaStyle: {}
	    }]
	},
	"noble":{
		color: ['#de7e7b'],
		tooltip: {
			trigger: 'axis',
			position: function (pt) {
				return [pt[0], '5%'];
			}
		},
		title:{
			left:'center',
			text:'本房间贵族人数图'
		},
		xAxis: [{
			type: 'category',
			boundaryGap: false,
			data: [],
		}],
		yAxis: [{
			type: 'value',
			boundaryGap: [0, '100%']
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
export default options;
