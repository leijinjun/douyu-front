import $http from '@/utils/request'
export default {
    getTodayGiftRankingList(){
        return $http.get('/room/info/view/today/giftRankingList');
    },
    getTodayDanmuRankingList(){
        return $http.get('/room/info/view/today/danmuRankingList');
    },
    getDanmuPage(params){
        return $http.get('/danmu',{params:params});
    }
}