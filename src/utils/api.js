import $http from '@/utils/request'
export default {
    getTodayGiftRankingList(params){
        return $http.get('/gift/view/today/rankingList',{params});
    },
    getTodayDanmuRankingList(params){
        return $http.get('/danmu/view/today/rankingList',{params});
    },
    getDanmuPage(params){
        return $http.get('/danmu',{params});
    },
    getTodayUserRankingList(params){
        return $http.get('/gift/view/today/userRankingList',{params});
    },
    getFansNum(roomId,params){
        return $http.get(`/room/info/view/fansPersonNum/${roomId}`,{params});
    },
    getRoomInfo(roomId,params){
        return $http.get(`/room/info/${roomId}`,{params:params});
    },
    getGiftMoney(roomId,params){
        return $http.get(`/room/info/view/giftMoney/${roomId}`,{params});
    },
    getGiftNum(roomId,params){
        return $http.get(`/room/info/view/giftPersonNum/${roomId}`,{params});
    },
    getChatNum(roomId,params){
        return $http.get(`/room/info/view/chatSum/${roomId}`,{params});
    },
    getChatSum(roomId,params){
        return $http.get(`/room/info/view/chatPersonNum/${roomId}`,{params});
    }
}