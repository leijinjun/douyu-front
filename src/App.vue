<template>
  <div id="app">
		<div class="main">
			<router-view/>
		</div>
    <el-footer id="footer">
    	Copyright ©2018-2019 leijinjun
    </el-footer>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	position: relative;
	min-height: 100%;
	padding-bottom: 60px;
	box-sizing: border-box;
}
/* .el-container{
	 width: 100%;
	 overflow: hidden;
	 padding-bottom: 80px;
	 margin:auto;
	 text-align: center;
}
	
@media screen and (max-width: 1335px) and (min-width: 1156px){
	.el-container.container{
  	width: 1105px;
  }
}
@media screen and (min-width: 1336px) and (max-width:1765px){
	.el-container.container{
  	width:1306px;
  }
}
@media only screen and (min-width:1766px) {
	.el-container.container{
  	width: 1615px;
  }
} */
.main{
	margin-bottom: 20px;
	overflow: hidden;
	padding-bottom: 80px;
}
#footer{
	text-align: center;
	width: 100%;
	height: 60px;
	bottom: 0;
	position: absolute;
}
</style>
