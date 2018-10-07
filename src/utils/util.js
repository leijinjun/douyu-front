var utils={
	numTransform:function(value){
		var obj = {
			int:undefined,    //整数位
			dec:undefined,  //小数位
			targ:"",          //正负
			times:['','万','亿','万亿','亿亿']
		}
		if(value<=10000){
			return value;
		}
		value = String(value);
		var reg = /^-?\d+\.?\d+$/;
		if(!reg.test(value)){
			return value;
		}
		
		if(value[0]=="-"){
			obj.targ = "-";
			value = value.substring(1,value.length)
		}
		
		var times = 0;
		value = Number(value);
		while(value > 10000){
			value = value/10000;
			times++;
		}
 
		value = value.toFixed(1)
 
		var arr = String(value).split(".")
		obj.dec = arr[1];
		obj.int = arr[0];
		if(obj.int.length>3){
			obj.int = obj.int.replace(/(.{1})/,'$1,')
		}
 
		return obj.targ+obj.int+"."+obj.dec+obj.times[times];
	},
	formatDate:function(date,fmt){
	  if(!fmt){
	  	fmt='yyyy-MM-dd hh:mm:ss';
	  }
	  if (/(y+)/.test(fmt)) {
	    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
	  }
	  let o = {
	    'M+': date.getMonth() + 1,
	    'd+': date.getDate(),
	    'h+': date.getHours(),
	    'm+': date.getMinutes(),
	    's+': date.getSeconds()
	  }
	  for (let k in o) {
	    if (new RegExp(`(${k})`).test(fmt)) {
	      let str = o[k] + ''
	      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : ('00' + str).substr(str.length))
	    }
	  }
	  return fmt
	}
}
export default utils