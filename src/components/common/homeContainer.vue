<template>
    <div>
        <div class="container-header">
            <Header/>
        </div>
        <div class="container-right">
            <router-view/>
        </div>
    </div>
</template>
<script>
import Header from "@/components/common/header";
export default {
    name:"HomeContainer",
    data(){
        return{

        }
    },
    components:{
        Header,
    },
}
</script>
<style scoped>
.container-header{
    width: 1222px;
    margin: auto;
    padding-top: 13px;
}
.container-right{
    margin: auto;
    margin-top: 20px;
}
</style>


