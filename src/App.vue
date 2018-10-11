<template>
  <div id="app">
  	<el-header id="header" style="height: 50px;">
  			<el-menu class="header-menu" :router="true" mode="horizontal" background-color="#fff" text-color="#000" active-text-color="#5a2dff">
				  <el-menu-item  index="1" route="/">首页</el-menu-item>
				</el-menu>
  	</el-header>
  	<el-container>
  	<el-main class="container">
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
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#header.el-header{
	/*background-color: #e6e6e6;*/
	padding: 0 4% 0 4%;
	/*border-bottom: 1px gainsboro solid;*/
}
.el-menu.el-menu--horizontal{
	border-bottom: 0;
}
#header .header-menu{
	height: 49px;
}
#header .header-menu>li{
	height: 100%;
	line-height: 50px;
}
.el-container{
	 width: 100%;
}
.container{
	overflow: hidden;
	padding-bottom: 80px;
	margin:auto;
	text-align: center;
}
@media screen and (max-width: 1335px) and (min-width: 1156px){
	.el-main.container{
  	width: 1105px;
  }
}
@media screen and (min-width: 1336px) and (max-width:1765px){
	.el-main.container{
  	width:1306px;
  }
}
@media only screen and (min-width:1766px) {
	.el-main.container{
  	width: 1615px;
  }
}
#footer{
	height: 60px;
	text-align: center;
	width: 100%;
}
</style>
