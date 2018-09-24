<template>
	<div id="goTop">
		<div class="page-component-up" style="display: none;" v-show="goTopShow" @click="goTop"><i class="el-icon-caret-top"></i></div>
	</div>
</template>

<script>
	export default {
      name: "goTop",
      data(){
          return{
            scrollTop: '',
            goTopShow:false,
          }
        },
      methods:{
        handleScroll () {
          this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
          if(this.scrollTop>800){
            this.goTopShow=true
          }else{
          	this.goTopShow=false
          }
        },
        goTop(){
          let timer=null,_that=this;
          cancelAnimationFrame(timer)
          timer=requestAnimationFrame(function fn(){
            if(_that.scrollTop>0){
              _that.scrollTop-=350;
              document.body.scrollTop = document.documentElement.scrollTop = _that.scrollTop;
              timer=requestAnimationFrame(fn)
            }else {
              cancelAnimationFrame(timer);
              _that.goTopShow=false;
            }
          })
        }
      },
      mounted() {
        window.addEventListener('scroll', this.handleScroll);
      },
      destroyed(){
        window.removeEventListener('scroll', this.handleScroll)
      }
    }
</script>

<style scoped="scoped">
	.page-component-up {
	    background-color: #fff;
	    position: fixed;
	    right: 100px;
	    bottom: 150px;
	    width: 40px;
	    height: 40px;
	    border-radius: 20px;
	    cursor: pointer;
	    transition: .3s;
	    box-shadow: 0 0 6px rgba(0,0,0,.12);
	    z-index: 5;
	}
	.page-component-up:hover{
    	border:1px #409eff solid;
  	}
	.page-component-up i {
	    color: #409eff;
	    display: block;
	    line-height: 40px;
	    text-align: center;
	    font-size: 18px;
	}
	[class*=" el-icon-"], [class^=el-icon-] {
	    font-family: element-icons!important;
	    speak: none;
	    font-style: normal;
	    font-weight: 400;
	    font-variant: normal;
	    text-transform: none;
	    line-height: 1;
	    vertical-align: baseline;
	    display: inline-block;
	    -webkit-font-smoothing: antialiased;
	    -moz-osx-font-smoothing: grayscale;
	}
</style>