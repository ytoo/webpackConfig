<template>
  <div>
  <section class="jd-news">
		<div class="left fl">
			<img src="images/icons/jd-news-tit.png" alt="">
		</div>
		<div class="right fr"><a href="#">| 更多</a></div>
		<div class="center">
			<ul>
				<li class="one-txt-cut"><a href="#">新闻1新闻1新闻1新闻1新闻1新闻1新闻1新闻1新闻1新闻1新闻1新闻1新闻1新闻1新闻1新闻1新闻1新闻1新闻1新闻1新闻1</a></li>
				<li class="one-txt-cut"><a href="#">新闻2</a></li>
				<li class="one-txt-cut"><a href="#">新闻3</a></li>
				<li class="one-txt-cut"><a href="#">新闻4</a></li>
				<li class="one-txt-cut"><a href="#">新闻5</a></li>
			</ul>
		</div>
	</section>
  <section class="jd-sec-kill">
		<div class="sec-kill-t clearfix">
			<div class="sec-kill-txt fl jd-sprite center-y">
				京东秒杀
			</div>
			<div class="sec-kill-time fl">
				<span>0</span>
				<span>0</span>
				<span>:</span>
				<span>0</span>
				<span>0</span>
				<span>:</span>
				<span>0</span>
				<span>0</span>
			</div>
			<div class="more fr"><a href="#">更多秒杀 > </a></div>
		</div>
		
	</section>
  </div>
</template>
<script>
  ;(function(){

	var wrap = document.querySelector('.jd-news > .center');
	var ul = wrap.querySelector('ul');
	var lis = ul.querySelectorAll('li');
	var lisHeight = lis[0].offsetHeight;
	var timer = null;
	// 信号量
	var index = 0;
	// 需求：实现京东快报的无缝滚动
	// 思路：
	// （1）复制一个临时工追加到最后面
	// （2）开始定时器，让ul自动往上走
	// （3）在过渡结束的时候，去看看index的值，如果index的值到了临时工身上，立马换到第一张
	
	// 复制一个临时工追加到最后面
	ul.appendChild(lis[0].cloneNode(true));

	timer = setInterval(function(){

		index++;
		// 细节：过渡的时间一定要小于定时器的时间
		ul.style.transition = 'top .5s';
		ul.style.top =  -lisHeight * index + 'px';

	}, 1000);


	// 在过渡结束的时候，去瞅瞅index为几，如果为5，则里面跳转到第一个li的位置
  // 此处不能使用ul.ontransitionend添加监听事件，因为监听不到
  // 所以在移动web端，尽量都使用addEventListener添加监听事件
	ul.addEventListener('transitionend',function(){
		// console.log(index);
		// 细节：这里面直接用lis.length就可以了。因为lis在获取的时候，还没有临时工存在
		// 细节：过渡结束事件在切换窗口（浏览器之间的窗口切换）之后不执行，所以需要用>=
		// 所以lis.length是5 不需要在-1
		if(index >= lis.length){
			index = 0;
			ul.style.transition = 'none';
			ul.style.top = '0px';
		}

	})
})()

// 倒计时模块
;(function(){

	//首先声明 倒计时的时间来源应该是服务器，因为前台的时间是不安全的
	//思路：
	//（1）得到目标时间和当下时间 两个时间相减得到毫秒数，并转换成秒数
	//（2）通过定时器每一秒执行一次，将得到的秒数自减一
	//（3）做极值判断，如果一旦时间小于0 则停止定时器，同时阻止代码的执行
	//（4）将得到的时间转换成时 分 秒 （套用公式）
	//（5）将得到的时 分 秒 代入到对应的span里面 
	
	var timer = null;
	// 未来时间
	var furDate = new Date('Jul 26 2017 17:30:00');
	// 当下时间
	var nowDate = new Date();
	// 得到相差的秒数
	var dTime = parseInt((furDate - nowDate)/1000);

	var spans = document.querySelectorAll('.sec-kill-time span');

	timer = setInterval(function(){
		dTime--;
		// 当时间小于0，那么直接停止定时器
		if(dTime < 0){
			clearInterval(timer);
			return false;
		}

		//　将秒数转换成时  分 秒
		//　公式：转换成天 时 分 秒 
		//　天：dTime/86400  时：dTime%86400/3600 分：dTime%3600/60 秒：dTime%60
		var h = Math.floor(dTime/3600);
		var m = Math.floor(dTime%3600/60);
		var s = Math.floor(dTime%60);

		// 方法一
		// 将时分秒放到对应的span上去
		/*spans[0].innerHTML = Math.floor(h/10);
		spans[1].innerHTML = Math.floor(h%10);
		spans[3].innerHTML = Math.floor(m/10);
		spans[4].innerHTML = Math.floor(m%10);
		spans[6].innerHTML = Math.floor(s/10);
		spans[7].innerHTML = Math.floor(s%10);*/

		// 方法二
		// 连成一个字符串
		var str = toTwo(h) + ':' + toTwo(m) + ':' + toTwo(s);
		for(var i = 0; i < str.length; i++){
			spans[i].innerHTML = str[i];
		}


	}, 1000);
	// 补0函数
	function toTwo(n){
		return n > 9 ? n : '0' + n;
	}
})()
</script>
<style >
/* 禁用iPhone中Safari的字号自动调整 */
html {
	-webkit-text-size-adjust: 100%;
	-ms-text-size-adjust: 100%;
	/* 解决IOS默认滑动很卡的情况 */
	/* -webkit-overflow-scrolling : touch;  */
}

/* 禁止缩放表单 */
input[type="submit"], input[type="reset"], input[type="button"], input {
	resize: none;
	border: none;
}

/* 取消链接高亮  */
a {
	-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

/* 设置HTML5元素为块 */
article, aside, details, figcaption, figure, footer, header, menu, nav, section {
	display: block;
}

/* 图片自适应 */
img {
	width: 100%;
	height: auto;
	width: auto\9; /* ie8 */
	display: block;  /* 解决图片底部有3px留白的问题*/
	-ms-interpolation-mode: bicubic;/*为了照顾ie图片缩放失真*/
}

/* 初始化 */
body, div, ul, li, ol, h1, h2, h3, h4, h5, h6, input, textarea, select, p, dl, dt, dd, a, img, button, form, table, th, tr, td, tbody, article, aside, details, figcaption, figure, footer, header, menu, nav, section {
	margin: 0;
	padding: 0;
}
body {
	font: 12px/1.5 'Microsoft YaHei','宋体', Tahoma, Arial, sans-serif;
	color: #555;
	background-color: #F7F7F7;
}
em, i {
	font-style: normal;
}
ul,li,ol{
	list-style-type: none;
}
strong {
	font-weight: normal;
}
.clearfix:after {
	content: "";
	display: block;
	visibility: hidden;
	height: 0;
	clear: both;
}
.clearfix {
	zoom: 1;
}
a {
	text-decoration: none;
	color: #969696;
	font-family: 'Microsoft YaHei', Tahoma, Arial, sans-serif;
}
a:hover {
	text-decoration: none;
}
h1, h2, h3, h4, h5, h6 {
	font-size: 100%;
	font-family: 'Microsoft YaHei';
}
img {
	border: none;
}
input{
	font-family: 'Microsoft YaHei';
}
/*单行溢出*/
.one-txt-cut{
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
/*多行溢出 手机端使用*/
.txt-cut{
	overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    /*设置在第几行将超出的文字变成省略号*/
    -webkit-box-orient: vertical;
}
/* 水平垂直居中公共类 */
.center-xy:before,.center-self-xy {
	position: absolute;
	left: 50%;
	top: 50%;
	-webkit-transform:translate(-50%,-50%);
	transform:translate(-50%,-50%);
}
/* 水平居中公共类 */
.center-x:before,.center-self-x {
	position: absolute;
	left: 50%;
	-webkit-transform:translateX(-50%);
	transform:translateX(-50%);
}
/* 垂直居中公共类 */
.center-y:before,.center-self-y {
	position: absolute;
	top: 50%;
	-webkit-transform:translateY(-50%);
	transform:translateY(-50%);
}
.w50{
	width: 50%;
}
.w25{
	width: 25%;
}
.w20{
	width: 20%;
}
.w33{
	width: 33.333333%;
}
.fl{
	float: left;
}
.fr{
	float: right;
}
.db{
	display: block !important;
}
.dn{
	display: none;
}
  .jd-news {
	height: 30px;
	line-height: 30px;
	margin:0px 10px;
	background-color: #fff;
	border-radius: 5px;
}
.jd-news .left {
	width: 80px;
	height: 30px;
}
.jd-news .left img {
	margin-top: 7px;
}
.jd-news .right {
	width: 40px;
	height: 30px;
}
.jd-news .center {
	height: 30px;
	margin:0 40px 0 80px;
	overflow: hidden;
	position: relative;
}
.jd-news .center ul {
	position: absolute;
	width: 100%;
	left: 0;
	top: 0;
}

.jd-news .center li {
	text-indent: 10px;
}

/* 京东秒杀 */
.jd-sec-kill {
	background-color: #fff;
	margin-top: 20px;
}
.sec-kill-t {
	height: 35px;
}
.sec-kill-t .sec-kill-txt {
	line-height: 35px;
	text-indent: 35px;
	color: #D90000;
	font-size: 14px;
	letter-spacing: 5px;
	position: relative;
}
.sec-kill-t .sec-kill-txt:before {
	width: 18px;
	height: 22px;
	background-position: -84px -109px;
	left: 5px;
}
.sec-kill-t .more a {
	line-height: 35px;
	display: block;
	margin-right: 10px;
}
.sec-kill-time {
	/* 可以去掉行内块默认的边距 */
	font-size: 0;
}
.sec-kill-time span {
	display: inline-block;
	padding:2px;
	background-color: #000;
	color: #fff;
  /*再单独设置有效内容的字体和边距*/
	font-size: 12px;
	margin-top: 7px;
}
.sec-kill-time span:nth-child(3n+1) {
	border-radius: 5px 0 0 5px;
}
.sec-kill-time span:nth-child(3n+2) {
	border-radius: 0px 5px 5px 0;
}
.sec-kill-time span:nth-child(3n) {
	background-color: #fff;
	color: #000;
}

</style>
