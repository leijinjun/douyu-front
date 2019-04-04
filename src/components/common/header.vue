<template>
    <div id="header">
        <el-menu style="height: 65px;" class="header-menu" :router="true" mode="horizontal" background-color="#fff" text-color="#000" active-text-color="#5a2dff">
        <el-menu-item  index="1" route="/">首页</el-menu-item>
        <el-menu-item  index="2" route="/danmu">弹幕查询</el-menu-item>
    </el-menu>
    </div>
</template>

<script>
export default {
    name:'Header',
    data(){
        return{

        }
    },
    created(){

    },
    methods:{
        
    },
    mounted(){

    }
}
</script>
<style scoped>
#header .header-menu{
	height: 58px;
}
#header .header-menu>li{
	height: 100%;
	line-height: 58px;
    font-size: 20px;
}
#header .header-menu>li:hover{
    background-color: #fff!important;
}
#header .el-menu--horizontal{
    border-bottom: 0;
}
</style>



