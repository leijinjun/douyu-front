<template>
  <div class="row" v-loading="rankingLoading">
      <div class="x_title">
        <em>
          <router-link to="/rankingList">更多>></router-link>
        </em>
        <h3>
          直播实时榜
        </h3>
      </div>
      <div class="live_list mt20 clearfix">
        <div class="lt_box">
          <div class="lt_title clearfix">
            <h4>主播收礼</h4>
          </div>
          <div class="x_table x_anchor">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <thead>
                <tr>
                  <th width="10%">排名</th>
                  <th class="table_th_name" width="60%">主播</th>
                  <th width="30%">礼物收入</th>
                </tr>
              </thead>
              <tbody>
                
                <tr v-for="(item,index) in giftRankingList" v-bind:key="item.roomId">
                  <td>
                    <span class="x_num">{{index+1}}</span>
                  </td>
                  <td>
                    <router-link :to="'/room/'+item.roomId">
                      <dl class="clearfix">
                        <dt>
                          <img :src="item.roomThumb"/>
                          <i></i>
                        </dt>
                        <dd>
                          <h5>
                            <span class="nickname">{{item.nickName}}</span>
                          </h5>
                        </dd>
                      </dl>
                    </router-link>
                  </td>
                  <td>
                    <span class="x_orange">
                      ￥{{item.giftMoney|numTransform}}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="lt_box">
          <div class="lt_title clearfix">
            <h4>主播弹幕</h4>
          </div>
          <div class="x_table x_audience">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <thead>
                <tr>
                  <th width="10%">排名</th>
                  <th class="table_th_name" width="60%">主播</th>
                  <th width="30%">弹幕条数</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,index) in danmuRankingList" v-bind:key="item.roomId">
                  <td>
                    <span class="x_num">{{index+1}}</span>
                  </td>
                  <td>
                    <router-link :to="'/room/'+item.roomId">
                      <dl class="clearfix">
                        <dt>
                          <img :src="item.roomThumb">
                        </dt>
                        <dd>
                          <h5>
                            <span class="nickname">{{item.nickName}}</span>
                          </h5>
                        </dd>
                      </dl>
                    </router-link>
                  </td>
                  <td>
                    <span class="x_orange">
                      {{item.count|numTransform}}条
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
export default {
  name: "Home",
  data() {
    return {
      giftRankingList:[],
      danmuRankingList:[],
      rankingLoading:false,
    };
  },
  created() {
    this.rankingLoading = true;
    this.getTodayGiftRankingList();
    this.getTodayDanmuRankingList();
  },
  methods: {
    getTodayGiftRankingList(){
       var $this=this;
        this.$request.getTodayGiftRankingList()
        .then(res=>{
           $this.$set($this,'giftRankingList',res.body);
        });
    },
    getTodayDanmuRankingList(){
      var $this=this;
      this.$request.getTodayDanmuRankingList()
      .then(res=>{
        $this.rankingLoading =false;
        $this.$set($this,'danmuRankingList',res.body);
      })
    }
  },
  mounted() {}
};
</script>
<style scoped>
@import url('../assets/css/home.css');
</style>
