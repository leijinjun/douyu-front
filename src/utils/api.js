import $http from '@/utils/request'
export default {
    getTodayGiftRankingList(params){
        return $http.get('/gift/view/today/rankingList',{params:params});
    },
    getTodayDanmuRankingList(params){
        return $http.get('/danmu/view/today/rankingList',{params:params});
    },
    getDanmuPage(params){
        return $http.get('/danmu',{params:params});
    },
    getTodayUserRankingList(params){
        return $http.get('/gift/view/today/userRankingList',{params:params});
    }
}