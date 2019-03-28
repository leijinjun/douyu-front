<template>
  <div class="row">
      <div class="x_title">
        <em>
          <a href="javascript:void(0)">更多 &gt;</a>
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
                  <th class="table_th_name" width="65%">主播</th>
                  <th width="25%">礼物收入</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <span class="x_num">1</span>
                  </td>
                  <td>
                    <a href="javascript:void(0)">
                      <dl class="clearfix">
                        <dt>
                          <img src=""/>
                          <i></i>
                        </dt>
                        <dd>
                          <h5>
                            <i class="ar_plat">xxx</i>
                            <span class="ar_name">xxx</span>
                            <i class="ar_sex ar_boy"></i>
                          </h5>
                        </dd>
                      </dl>
                    </a>
                  </td>
                  <td>
                    <span class="x_orange">
                      <i>￥</i>41.61
                      <i>万</i>
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="lt_box">
          <div class="lt_title clearfix">
            <h4>弹幕总数</h4>
          </div>
          <div class="x_table x_audience">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <thead>
                <tr>
                  <th width="10%">排名</th>
                  <th class="table_th_name" width="65%">房间名称</th>
                  <th width="25%">弹幕条数</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <span class="x_num">1</span>
                  </td>
                  <td>
                    <a href="javascript:void(0)">
                      <dl class="clearfix">
                        <dt>
                          <img
                            src=""
                          >
                        </dt>
                        <dd>
                          <h5>
                            <span class="au_name">xxxx</span>
                            <i class="au_star au_5x"></i>
                          </h5>
                        </dd>
                      </dl>
                    </a>
                  </td>
                  <td>
                    <span class="x_orange">
                      35.08
                      <i>万</i>
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
    return {};
  },
  created() {},
  methods: {},
  mounted() {}
};
</script>
<style scoped>
.row {
  width: 1200px;
  margin-right: auto;
  margin-left: auto;
}
.x_title {
  height: 20px;
  line-height: 20px;
}
.x_title em {
  float: right;
}
.x_title em a {
  color: #999999;
  font-size: 12px;
}
.x_title h3 {
  font-size: 18px;
  border-left: 4px solid #641bf6;
  line-height: 20px;
  text-indent: 15px;
  font-weight: bold;
  position: relative;
  margin-right: 100px;
  float: left;
}
.x_title h3 strong {
  position: absolute;
  left: 110px;
  top: -10px;
}
.live_list {
  border-right: 1px solid #e1def6;
  border-bottom: 1px solid #e1def6;
  height: 100%;
}

.mt20 {
  margin-top: 20px;
}
.clearfix {
  zoom: 1;
  clear: both;
}
.live_list .lt_box:nth-child(odd) {
  width: 579px;
}
.live_list .lt_box {
  border-left: 1px solid #e1def6;
  border-top: 1px solid #e1def6;
  width: 618px;
  float: left;
  height: 100%;
}
.lt_title {
  padding: 18px 10px;
  border-bottom: 1px solid #e1def6;
}
.lt_title h4 {
  font-size: 22px;
  display: inline-block;
}
.lt_title i {
  font-size: 12px;
  color: #999999;
  margin-left: 20px;
  font-style: normal;
}
.x_table thead th {
  font-size: 12px;
  color: #999999;
  border-bottom: 1px solid #f2f2f2;
  padding-bottom: 5px;
  padding-left: 10px;
  padding-right: 10px;
}
/* .x_table thead th.table_th_name {
  text-indent: 95px;
} */
.x_anchor tbody tr td {
  height: 108px;
}
.x_table tbody tr td {
  border-bottom: 1px solid #f2f2f2;
  padding: 0 10px;
}
.x_table tbody tr:first-child td .x_num {
  color: #ffd700;
  line-height: 30px;
  font-size: 25px;
}
.x_table tbody tr:nth-child(2) td .x_num {
  color: #c0c0c0;
  line-height: 30px;
  font-size: 19px;
}
.x_table tbody tr:nth-child(3) td .x_num {
  color: #b87335;
  line-height: 30px;
  font-size: 16px;
}

.x_table tbody tr td .x_num {
  width: 24px;
  height: 25px;
  line-height: 25px;
  display: inline-block;
  text-align: center;
  color: #666666;
}
.x_table tbody tr td .x_orange {
  font-size: 26px;
  color: #ff7200;
}
.lt_box table tr {
    height: 109px;
}
a{
    text-decoration: none;
}
</style>
