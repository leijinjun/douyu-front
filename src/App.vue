<template>
  <div id="app">
  	<el-container>
  	<el-header id="header">
  	</el-header>
  	<el-main>
    	<router-view/>
    </el-main>
    <el-footer id="footer"></el-footer>
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
	background-color: #3931a9;
}
#footer{
	position: absolute;
	height: 120px;
	width: 100%;
	bottom: 0;
}
</style>
