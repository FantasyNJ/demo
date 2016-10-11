/**
 * Created by 好 on 2016/6/1.
 */
var list = document.getElementById('list');
var aLi = list.getElementsByTagName('li');
var prev = document.getElementById('prev');
var next = document.getElementById('next');
var icon = document.getElementById('icon');
var aI = icon.getElementsByTagName('i');
var title = document.getElementById('title');
var h2 = title.getElementsByTagName('h2')[0];
var p = title.getElementsByTagName('p')[0];
var width = parseFloat(getStyle(aLi[0],'width'));
var liLen = aLi.length;
var num = 0;
var timer = null; //自动轮播定时器
var arr = [       //存放下方标题内容
	{
		title : '当夏必buy',
		content : '第一张图片'
	},
	{
		title : '阿里旅行',
		content : '第二张图片'
	},
	{
		title : '淘宝房产',
		content : '第三张图片'
	},
	{
		title : '春夏新品',
		content : '第四张图片'
	},
	{
		title : '电子烟直降5折',
		content : '第五张图片'
	}
]

//设置所有图片总宽度
list.style.width = liLen * width + 'px';
//下一张按钮点击
next.onclick = function(){
	aI[num].className = '';  //清除上一个i标签状态
	num++;
	num %= liLen;
	imgMove();
}
//上一张按钮点击
prev.onclick = function(){
	aI[num].className = '';
	num--;
	if(num < 0){
		num = liLen - 1;
	}
	imgMove();
}
//为下方按钮添加点击事件
for(var i = 0;i<aI.length;i++){
	aI[i].index = i;
	aI[i].onclick = function(){
		aI[num].className = '';
		num = this.index;
		imgMove();
	}
}

//图片运动
function imgMove(){
	move(list, 'left', -num * width, 400, 'easeInStrong', titleMove);
	clearAutoPlay();
}

//自动轮播函数
autoPlay();
function autoPlay(){
	timer = setInterval(function(){
		aI[num].className = '';
		num++;
		num %= liLen;
		move(list, 'left', -num * width, 400, 'easeInStrong', titleMove);
	},3500);
}
//清除并设置自动轮播
function clearAutoPlay(){
	clearInterval(timer);
	autoPlay();
}

//运动函数框架 -num * width
function move(obj, attr , target, duration, method, callback){
	method = method || 'linear';
	clearInterval(obj.timer);
	aI[num].className = 'active';
	//list.style.left = -num * width +'px';
	//起始值
	var begin = parseFloat(getStyle(obj, attr));
	//总运动值
	var count = target - begin;  // -(num*width - (-begin))
	//当前时间
	//var startTime = new Date().getTime();
	//持续时间
	//var duration = 300;
	//速度
	var speed = count / duration;
	//时间差计数
	var n = 0;

	obj.timer = setInterval(function(){
		//已过时间
		//var time = new Date().getTime() - startTime;
		n++;
		var time = n * 30;
		if(time > duration){
			time = duration;
			clearInterval(obj.timer);
			//callback && callback();
			if(typeof callback == 'function'){
				callback();
			}
		}
		//obj.style[attr] = begin + speed * time +'px';
		obj.style[attr] = Tween[method](time, begin, count, duration) +'px';
	},30);
}

//下方标题栏显示隐藏
titleMove();
function titleMove(){
	clearInterval(title.timer);
	clearTimeout(title.timer2);   //title.timer2下方标题栏到达最顶端延迟
	h2.innerHTML = arr[num].title;
	p.innerHTML = arr[num].content;
	move(title, 'bottom', 0, 1000, 'linear', function(){
		title.timer2 = setTimeout(function(){    //一定不要忘记清除这个定时器
			move(title, 'bottom', -70, 1000, 'linear');
		},1000);
	});
}
//获取样式函数
function getStyle(obj, attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj)[attr];
	}
}