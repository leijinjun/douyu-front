<template>
  <div id="app">
  	<el-container>
  	<el-header id="header">
  			<el-menu :router="true" mode="horizontal" background-color="#fff" text-color="#000" active-text-color="#5a2dff" style="border-bottom:0;float: left;">
				  <el-menu-item index="1" route="/room">首页</el-menu-item>
				</el-menu>
  	</el-header>
  	<el-main>
    	<router-view/>
    </el-main>
    </el-container>
    <el-footer id="footer">
    	Copyright ©2018 leijinjun
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
  font-family: "PingFang SC";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.el-container.is-vertical{
	min-height: 100%;
}
.el-main{
	padding-bottom: 60px;
}
@media screen and (max-width: 1335px) and (min-width: 1156px){
	#header{
		margin-left: 44px;
    margin-right: 5%;
	}
}
@media screen and (min-width: 1336px) and (max-width:1765px){
	#header{
		margin-left: 66px;
    margin-right: 5%;
	}
}
@media only screen and (min-width:1766px) {
	#header{
		margin-left: 4%;
    margin-right: 5%;
	}
}
#footer{
	height: 60px;
	margin-top: -60px;
	width: 100%;
}
</style>
