<template>
    <div class="ranking">
        <ul class="clearfix zb-list">
            
            <li class="m_1 on">
                <img src="../assets/images/tv.png"/>
                <a href="javascr:void(0);">直播榜</a></li>
        </ul>
    </div>
</template>
<script>
export default {
    name:'RankingList',
    data(){
        return{
        }
    },
    created(){

    },
    methods:{

    },
}
</script>
<style scoped>
.ranking{
    height: auto;
    width: 1200px;
    margin-right: auto;
    margin-left: auto;
}
.clearfix{
    zoom: 1;
    clear: both;
}
.zb-list{
    background: url('../assets/images/menu.png') 0 0 no-repeat;
    z-index: 12;
}
.zb-list li.m_1 {
    position: relative;
    left: 0;
    z-index: 10;
}
.zb-list li {
    float: left;
    width: 280px;
    height: 44px;
    line-height: 44px;
    background: url('../assets/images/menu.png') 0 bottom no-repeat;
    text-align: center;
    font-size: 16px;
    position: relative;
    text-align: left;
    text-indent: 65px;
}
.zb-list li.on a {
    color: #510bc6;
}
.zb-list li.m_1.on i {
    background: url('../assets/images/tv.png') 0 no-repeat;
}
.zb-list li img{
    padding-top: 9px;
    float:left;
    position: relative;
    z-index: 13;
    width:26px;
    left: 62px;
}
.zb-list li a{
    line-height: 45px;
}
</style>


