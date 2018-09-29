<template>
	<div id="main">
		<div id="wait" class="show" v-show="wait">
            <div class="loading">
                <div class="loading-dot"></div>
                <div class="loading-dot"></div>
                <div class="loading-dot"></div>
                <div class="loading-dot"></div>
            </div>
	    </div>
	</div>
</template>

<script>
	import {gt} from '../assets/js/gt.js'
	export default {
		name:'Geetest',
		data(){
			return{
				wait:true
			}
		},
		created(){
			gt();
		},
		mounted(){
			this.init();
		},
		methods:{
			init(){
				var $this=this;
				this.$http.get('/geetest/validation/step1')
				.then((response)=>{
					var res=response.data;
					var body=JSON.parse(res.body);
					if(body.success&&body.challenge&&gt){
						initGeetest({
			            gt: body.gt,
			            challenge: body.challenge,
			            offline:!body.success,
			            new_captcha: true,
						}, function (captchaObj) {
							console.log(typeof captchaObj)
							captchaObj.appendTo("#main")
							// 这里可以调用验证实例 captchaObj 的实例方法
							captchaObj.onReady(function(){
								 $this.wait=false;
						    }).onSuccess(function(){
						    	var result = captchaObj.getValidate();
						    	$this.secondValidation(result);
						    	captchaObj.reset();
						    }).onError(function(){
						    	console.log("验证错误")
						    	$this.$message.error("验证失败，请重新刷新验证");
						    	 captchaObj.reset();
						    })
				        })
					}
				})
			},
			secondValidation(obj){
				var params=new URLSearchParams();
				params.append("geetest_challenge",obj.geetest_challenge);
				params.append("geetest_validate",obj.geetest_validate);
				params.append("geetest_seccode",obj.geetest_seccode);
				this.$http.post('/geetest/validation/step2', params).then((response)=>{
						var res=response.data;
						console.log(res)
					})
		
			}
		}
	}
</script>

<style scoped="scoped">
</style>