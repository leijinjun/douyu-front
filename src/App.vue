<template>
  <div id="app">
  	<el-container>
  	<el-header id="header">
  			<el-menu :router="true" mode="horizontal" background-color="#fff" text-color="#000" active-text-color="#5a2dff" style="border-bottom:0">
				  <el-menu-item index="1" route="/room">首页</el-menu-item>
				</el-menu>
  	</el-header>
  	<el-main>
    	<router-view/>
    </el-main>
    <!--<el-footer id="footer"></el-footer>-->
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: "PingFang SC";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
}
#header{
	height: 120px;
	margin-left: 203px;
	/*background-color:  #5a2dff;*/
}
#footer{
	position: absolute;
	height: 120px;
	width: 100%;
	bottom: 0;
}
</style>
