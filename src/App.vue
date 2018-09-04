<template>
  <div id="app">
  	<el-container>
  	<el-header>
  		 <img src="./assets/065a07c4785084a4f0a2569bf9f056b5.png">
  	</el-header>
  	<el-main>
    	<router-view/>
    </el-main>
    <el-footer></el-footer>
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
  margin-top: 60px;
}
</style>
