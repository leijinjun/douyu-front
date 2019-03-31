<template>
    <div id="header">
        <el-menu style="height: 50px;" class="header-menu" :router="true" mode="horizontal" background-color="#fff" text-color="#000" active-text-color="#5a2dff">
        <el-menu-item  index="1" route="/">首页</el-menu-item>
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
	height: 49px;
}
#header .header-menu>li{
	height: 100%;
	line-height: 50px;
    font-size: 18px;
}
#header .el-menu--horizontal{
    border-bottom: 0;
}
</style>



