<template>
	<div id='main'>
		<div class="search">
			<el-input v-model="input" placeholder="请输入关键词">
				<el-button slot="append" icon="el-icon-search" class="search-icon"></el-button>				
			</el-input>
		</div>
		<div class="rank-list-bar">
			<div class="col-50">
				<div class="row-box">
					<div class="row-main">
						<div class="row-title mt-20 clearfix">
							<div class="fl">
								<i class="iconfont icon-shouru color-yello"></i>
								<strong class="h5 inline-block">今日礼物榜</strong>
							</div>
						</div>
						<ul class="table-bar table-fixed table-hover rank-table">
							<li class="thead">
								<div class="to">
									<div class="th one">排名</div>
									<div class="th two">主播</div>
									<div class="th three">礼物价值</div>
								</div>
							</li>
							<li class="tbody">
								<a class="to" href="/anchor/3_18001.html" target="_blank">
									<div class="td one">
										<div class="rank-gold">
										</div>
											<div class="rank-1">
											</div>
									</div>
									<div class="td two tl">
										<div class="ellipsis">
											<span class="img">
												<!--<img width="60" height="60" src="/tp/img?url=https://huyaimg.msstatic.com/avatar/1045/32/177910c7a4f6c7578491cf73683b44_180_135.jpg?1538642630" onerror="javascript:this.src='http://static.toubang.tv/img/default/lose2.jpg'">-->
											</span>
											<div class="inline-block anchor-info">
												<p class="h5 ellipsis">洋气黄</p>
												<p class="color-gray"><span class="btn btn-sx btn-border btn-radius mt-4 mr5">虎牙</span>
													
												</p>
											</div>
										</div>	
									</div>
									<div class="td three">
										<strong class="h5 color-yello">
											40.49万
										</strong>	
										<em class="color-gray">元</em>
									</div>
								</a>
								<a class="to" href="/anchor/3_199585.html" target="_blank">
									<div class="td one">
										<div class="rank-gold">
										</div>
											<div class="rank-2">
											</div>
									</div>
									<div class="td two tl">
										<div class="ellipsis">
											<span class="img">
												<!--<img width="60" height="60" src="/tp/img?url=https://huyaimg.msstatic.com/avatar/1056/cc/2ae247f33b3d03046c0b41eddf8ac9_180_135.jpg?1527666162" onerror="javascript:this.src='http://static.toubang.tv/img/default/lose2.jpg'">-->
											</span>
											<div class="inline-block anchor-info">
												<p class="h5 ellipsis">小小小酷哥</p>
												<p class="color-gray"><span class="btn btn-sx btn-border btn-radius mt-4 mr5">虎牙</span>
													
												</p>
											</div>
										</div>	
									</div>
									<div class="td three">
										<strong class="h5 color-yello">
											12.23万
										</strong>	
										<em class="color-gray">元</em>
									</div>
								</a>
								<a class="to" href="/anchor/1_1229.html" target="_blank">
									<div class="td one">
										<div class="rank-gold">
										</div>
											<div class="rank-3">
											</div>
									</div>
									<div class="td two tl">
										<div class="ellipsis">
											<span class="img">
												<!--<img width="60" height="60" src="/tp/img?url=https://apic.douyucdn.cn/upload/avatar_v3/201811/b661a706d729164de5e60bfa1379864e_middle.jpg" onerror="javascript:this.src='http://static.toubang.tv/img/default/lose2.jpg'">-->
											</span>
											<div class="inline-block anchor-info">
												<p class="h5 ellipsis">嗨氏</p>
												<p class="color-gray"><span class="btn btn-sx btn-border btn-radius mt-4 mr5">斗鱼</span>
													
												</p>
											</div>
										</div>	
									</div>
									<div class="td three">
										<strong class="h5 color-yello">
											8.93万
										</strong>	
										<em class="color-gray">元</em>
									</div>
								</a>
								<a class="to" href="/anchor/3_275925.html" target="_blank">
									<div class="td one">
										<div class="rank-gold">
										</div>
											<span class="color-gray tag">4</span>
									</div>
									<div class="td two tl">
										<div class="ellipsis">
											<span class="img">
												<!--<img width="60" height="60" src="/tp/img?url=https://huyaimg.msstatic.com/avatar/1068/50/9424410e75c56ab42a6561f46d0d08_180_135.jpg?1542279337" onerror="javascript:this.src='http://static.toubang.tv/img/default/lose2.jpg'">-->
											</span>
											<div class="inline-block anchor-info">
												<p class="h5 ellipsis">JV-皮皮宝宝</p>
												<p class="color-gray"><span class="btn btn-sx btn-border btn-radius mt-4 mr5">虎牙</span>
													星秀
												</p>
											</div>
										</div>	
									</div>
									<div class="td three">
										<strong class="h5 color-yello">
											8.71万
										</strong>	
										<em class="color-gray">元</em>
									</div>
								</a>
								<a class="to" href="/anchor/3_52700.html" target="_blank">
									<div class="td one">
										<div class="rank-gold">
										</div>
											<span class="color-gray tag">5</span>
									</div>
									<div class="td two tl">
										<div class="ellipsis">
											<span class="img">
												<!--<img width="60" height="60" src="/tp/img?url=https://huyaimg.msstatic.com/avatar/1079/9e/c008b3d87b701d64bbfc7485cf1f8d_180_135.jpg?1541523775" onerror="javascript:this.src='http://static.toubang.tv/img/default/lose2.jpg'">-->
											</span>
											<div class="inline-block anchor-info">
												<p class="h5 ellipsis">集梦会长</p>
												<p class="color-gray"><span class="btn btn-sx btn-border btn-radius mt-4 mr5">虎牙</span>
													星秀
												</p>
											</div>
										</div>	
									</div>
									<div class="td three">
										<strong class="h5 color-yello">
											8.71万
										</strong>	
										<em class="color-gray">元</em>
									</div>
								</a>
								<a class="to" href="/anchor/3_201866.html" target="_blank">
									<div class="td one">
										<div class="rank-gold">
										</div>
											<span class="color-gray tag">6</span>
									</div>
									<div class="td two tl">
										<div class="ellipsis">
											<span class="img">
												<!--<img width="60" height="60" src="/tp/img?url=http://huyaimg.msstatic.com/avatar/1062/c6/ce1529a30623d5bc8d43fd4733b44e_180_135.jpg?1468467093" onerror="javascript:this.src='http://static.toubang.tv/img/default/lose2.jpg'">-->
											</span>
											<div class="inline-block anchor-info">
												<p class="h5 ellipsis">曹操大表哥</p>
												<p class="color-gray"><span class="btn btn-sx btn-border btn-radius mt-4 mr5">虎牙</span>
													王者荣耀
												</p>
											</div>
										</div>	
									</div>
									<div class="td three">
										<strong class="h5 color-yello">
											8.56万
										</strong>	
										<em class="color-gray">元</em>
									</div>
								</a>
								<a class="to" href="/anchor/3_16525890.html" target="_blank">
									<div class="td one">
										<div class="rank-gold">
										</div>
											<span class="color-gray tag">7</span>
									</div>
									<div class="td two tl">
										<div class="ellipsis">
											<span class="img">
												<!--<img width="60" height="60" src="/tp/img?url=https://huyaimg.msstatic.com/avatar/1074/f1/30a5a5c63b608ec87116dcd4601e75_180_135.jpg" onerror="javascript:this.src='http://static.toubang.tv/img/default/lose2.jpg'">-->
											</span>
											<div class="inline-block anchor-info">
												<p class="h5 ellipsis">正恒RM丶煜骐</p>
												<p class="color-gray"><span class="btn btn-sx btn-border btn-radius mt-4 mr5">虎牙</span>
													星秀
												</p>
											</div>
										</div>	
									</div>
									<div class="td three">
										<strong class="h5 color-yello">
											7.65万
										</strong>	
										<em class="color-gray">元</em>
									</div>
								</a>
								<a class="to" href="/anchor/2_66128.html" target="_blank">
									<div class="td one">
										<div class="rank-gold">
										</div>
											<span class="color-gray tag">8</span>
									</div>
									<div class="td two tl">
										<div class="ellipsis">
											<span class="img">
												<!--<img width="60" height="60" src="/tp/img?url=https://i.ssl.pdim.gs/dmfd/100_100_70/aa01dc71036c0a4ddb60d54d5415c322.jpg" onerror="javascript:this.src='http://static.toubang.tv/img/default/lose2.jpg'">-->
											</span>
											<div class="inline-block anchor-info">
												<p class="h5 ellipsis">芃芃芃L</p>
												<p class="color-gray"><span class="btn btn-sx btn-border btn-radius mt-4 mr5">熊猫</span>
													星颜
												</p>
											</div>
										</div>	
									</div>
									<div class="td three">
										<strong class="h5 color-yello">
											6.93万
										</strong>	
										<em class="color-gray">元</em>
									</div>
								</a>
							</li>
						</ul>
					</div>
					<a class="btn btn-block rank-more" target="_blank" href="/anchor/gift.html">点击查看完整榜单 <i class="iconfont icon-right"></i></a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name:'Home',
		data(){
			return{
				input:''
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

<style scoped="scoped">
	.search .el-input{
		width: 900px;
		text-align: center;
	}
	.search .search-icon{
		color: #fff;
		background-color: rgb(90, 45, 255);
	}
	.search .el-input__inner:hover {
    	border-color: #fff;
	}
	.search .el-input.is-active .el-input__inner, .el-input__inner:focus {
	    border-color: #fff;
	    outline: 0;
	}
	.col-50 {
	    width: 50%;
	}
	.col-50 {
	    float: left;
	}
	.rank-list-bar .row-box {
	    margin-left: 10px;
	    margin-right: 10px;
	}
	.row-box {
	    margin-top: 20px;
	    background-color: #fff;
	}
	.row-main {
	    padding: 20px;
	}
	.rank-list-bar .rank-more {
	    margin-top: -20px;
	    padding-top: 0;
	    padding-bottom: 0;
	    height: 46px;
	    line-height: 46px;
	    color: #ff8e16;
	}
	.btn-block {
	    display: block;
	    width: 100%;
	}
	.btn {
	    display: inline-block;
	    height: 30px;
	    padding: 6px 6px;
	    font-size: 14px;
	    margin-bottom: 0;
	    font-weight: normal;
	    line-height: 16px;
	    text-align: center;
	    white-space: nowrap;
	    vertical-align: middle;
	    -ms-touch-action: manipulation;
	    touch-action: manipulation;
	    cursor: pointer;
	    -webkit-user-select: none;
	    -moz-user-select: none;
	    -ms-user-select: none;
	    user-select: none;
	    background-image: none;
	    border: 1px solid transparent;
	}
	.row-title {
	    height: 50px;
	    line-height: 50px;
	    overflow: hidden;
	    border-bottom: 1px solid #e7e7e7;
	}
	.mt-20 {
	    margin-top: -20px !important;
	}
	.table-fixed {
	    table-layout: fixed;
	}
	table, .table-bar {
	    border-collapse: collapse;
	    border-spacing: 0;
	    width: 100%;
	}
	.table-bar {
	    display: table;
	    width: 100%;
	    vertical-align: middle;
	}
	.row:before, .row:after, .baseUl:before, .baseUl:after, .clearfix:before, .clearfix:after {
	    content: ".";
	    display: block;
	    height: 0;
	    overflow: hidden;
	    visibility: hidden;
	}
	.fl {
	    float: left;
	}
	.row-title .icon-shouru{
		font-size: 22px;
    	margin-right: 5px;
	}
	.color-yello {
	    color: #ff8e16 !important;
	}
	.iconfont {
	    display: inline-block;
	    vertical-align: middle;
	}
	.icon-shouru:before {
	    content: "\e6bb";
	}
	.h5.inline-block {
	    font-size: 16px;
	    display: inline-block;
    	vertical-align: middle;
	}
	.table-bar .to {
	    display: block;
	}
	.rank-table .th.one, .rank-table .td.one {
	    width: 120px;
	}
	table th, .table-bar .th {
	    color: #666;
	}
	.table-bar .th, .table-bar .td {
	    display: table-cell;
	    vertical-align: middle;
	    text-align: center;
	}
	table th, table td, .table-bar .th, .table-bar .td {
	    padding: 12px 0;
	    line-height: 16px;
	    text-align: center;
	}
	.rank-table .th.two, .rank-table .td.two {
	    width: 220px;
	}
	.rank-table .th.three, .rank-table .td.three {
	    width: 160px;
	}
	.rank-table .tbody .to {
	    border-bottom: 1px dashed #e7e7e7;
	}
	.table-bar .to {
	    display: block;
	}
	.rank-table .td.one {
	    width: 120px;
	}
	.rank-table .td {
	    padding-top: 12px;
	    padding-bottom: 12px;
	}
	.table-bar .th, .table-bar .td {
	    display: table-cell;
	    vertical-align: middle;
	    text-align: center;
	}
	.rank-table .td.two {
	    width: 220px;
	}
	.rank-table .td.three {
	    width: 160px;
	}
	.rank-1 {
	    display: inline-block;
	    vertical-align: middle;
	    width: 22px;
	    height: 34px;
	    background: url(../../../static/images/gold.png) no-repeat;
	    background-size: 22px auto;
	}
	.rank-2{
		display: inline-block;
	    vertical-align: middle;
	    width: 22px;
	    height: 34px;
	    background: url(../../../static/images/silver.png) no-repeat;
	    background-size: 22px auto;
	}
	.rank-3{
		display: inline-block;
	    vertical-align: middle;
	    width: 22px;
	    height: 34px;
	    background: url(../../../static/images/copper.png) no-repeat;
	    background-size: 22px auto;
	}
	.ellipsis {
	    white-space: nowrap;
	    overflow: hidden;
	    text-overflow: ellipsis;
	}
	.rank-table .td .img {
	    width: 58px;
	    height: 58px;
	    margin-right: 10px;
	    overflow: hidden;
	}
	.rank-table .td .anchor-info {
	    max-width: 110px;
	}
	.inline-block, .iconfont {
	    display: inline-block;
	    vertical-align: middle;
	}
	.rank-table .td.three {
	    width: 160px;
	}
	.color-yello {
	    color: #ff8e16 !important;
	}
	.color-gray {
	    color: #999 !important;
	}
</style>