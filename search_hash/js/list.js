//获取左侧列表元素
var oLeft = $('.left')[0];
var oUl = $('ul', oLeft)[0];
//获取右侧列表元素
var oRight = $('.right')[0];
var oInfo = $('.info', oRight)[0];
var oPages = $('.pages', oRight)[0];
var oBtnWrap = $('p', oPages)[0];
var oTitle = $('.title',oRight)[0];
var oImg = $('img', oTitle)[0];


if(window.location.search === ''){
    window.location.href = '?s='+ aData.list[0].lx +'#p=1';
}
var s = window.location.search.split('=')[1];  //search值

//更新左侧列表样式
for(var i = 0;i < aData.list.length;i++){
    var li = document.createElement('li');
    if(aData.list[i].lx === s){     //如果search时当前tab，为当前tab添加样式
        li.className = 'focus';
    }
    var a = document.createElement('a');
    a.href = '?s='+ aData.list[i].lx +'#p=1';   //a标签链接为对应的search值和hash第一页
    a.innerHTML = aData.list[i].text;
    li.appendChild(a);
    oUl.appendChild(li);
}
//更新上方图片
oImg.src = aData[s].img;

update();

window.onhashchange = update;

//更新右侧内容
function update(){
    var h = parseInt(window.location.hash.split('=')[1]);    //hash值
    var oPrev = $('a',$('.prev')[0])[0];  //获取上一页按钮
    var oNext = $('a',$('.next')[0])[0];  //获取下一页按钮
    //更新右侧列表
    var sInfo = '';
    var n = 2;   //每页展示职位个数
    for(var i = 0;i < n;i++){
        var num = (h-1)*n+i;   //在大类中的第几条数据
        var obj = aData[s].text[num];
        if(obj){    //如果数据存在
            var time = aData.date(obj.sj, 1);
            var str = obj.info[0].l.join('').substring(0,100) + '...';
            sInfo += '<p class="zp"><span><a href="content.html?s='+   s +'#page='+ num +'">★ '+ obj.zw +'</a></span><span>需求人数：'+ obj.rs +'</span><span class="date">'+ time +'</span></p><p class="yq">'+ str +'[<a href="content.html?s='+ s +'#page='+ num +'">查看详情</a>]</p>';
        }
    }
    oInfo.innerHTML = sInfo;
//更新分页器
    oBtnWrap.innerHTML = '';   //先清空按钮容器的内容
    var len = Math.ceil(aData[s].text.length / 2);   //总共分成几页
    for(var i = 1;i <= len;i++){
        var span = document.createElement('span');
        if(i === h){     //如果页码时当前页
            span.className = 'focus';
        }
        var a = document.createElement('a');
        a.href = '#p=' + i;
        a.innerHTML = i;
        span.appendChild(a);
        oBtnWrap.appendChild(span);
    }
//上一页 下一页
    var pre = h - 1;  //上一页页码
    var nex = h + 1;  //下一页页码
    if(pre < 1){
        pre = 1;
    }
    if(nex > len){
        nex = len;
    }
    oPrev.href = '#p=' + pre;
    oNext.href = '#p=' + nex;
}

//var sHtml = '';  //存储html字符串
//for(var i = 0;i < aData.list.length;i++){
//    sHtml += '<li';
//    if(aData.list[i].lx === s){
//        sHtml += ' class="focus"';
//    }
//    sHtml += '><a href="?s='+ aData.list[i].lx +'#p=1">'+ aData.list[i].text +'</a></li>';
//}
//oUl.innerHTML = sHtml;
