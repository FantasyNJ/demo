//获取左侧列表元素
var oLeft = $('.left')[0];
var oUl = $('ul', oLeft)[0];
//获取右侧列表元素
var oRight = $('.right')[0];
var oInfo = $('.info', oRight)[0];
var oTitle = $('.title',oRight)[0];
var oImg = $('img', oTitle)[0];

if(window.location.search === ''){
    window.location.href = '?s='+ aData.list[0].lx +'#page=0';
}
var s = window.location.search.split('=')[1];  //search值
var h = parseInt(window.location.hash.split('=')[1]);    //hash值
var n = 2;   //每页两条招聘信息

//更新左侧列表样式
for(var i = 0;i < aData.list.length;i++){
    var li = document.createElement('li');
    var a = document.createElement('a');
    if(aData.list[i].lx === s){     //如果search时当前tab，为当前tab添加样式
        li.className = 'focus';
        a.href = 'list.html?s='+ aData.list[i].lx +'#p=' + (Math.floor(h/n) + 1);   //a标签链接为对应的search值和跳转前的hash
    }else{
        a.href = 'list.html?s='+ aData.list[i].lx +'#p=1';
    }
    a.innerHTML = aData.list[i].text;
    li.appendChild(a);
    oUl.appendChild(li);
}
//更新上方图片
oImg.src = aData[s].img;

write();

window.onhashchange = write;

//写入内容
function write(){
    var h = parseInt(window.location.hash.split('=')[1]);    //hash值
    var obj = aData[s].text[h];        //找到对应职位对象
    var info = obj.info;               //找到对应职位的岗位要求
    var time = aData.date(obj.sj, 1);  //格式化时间
    var sInfo = '<h2>'+ obj.zw +'</h2><div> <span class="l">招聘公司：'+ obj.gs +'>></span><span>公司性质：'+ obj.xz +'</span><span class="l">职位性质：'+ obj.gz +'</span><span>工作地点：'+ obj.dd +'</span><span class="l">工作经验：'+ obj.jy +'</span><span>学历要求：'+ obj.xl +'</span><span class="l">招聘人数：'+ obj.rs +'</span><span>薪资待遇：'+ obj.dy +'</span><span class="l">发布日期：'+ time +'</span><span>招聘类型：'+ obj.lx +'</span></div><div class="clear"></div>';
    if(info[1]){
        sInfo += '<dl><dt>'+  info[1].t +'</dt>';
        for(var i = 0;i < info[1].l.length;i++){
            sInfo += '<dd>'+ info[1].l[i] +'</dd>';
        }
    }
    sInfo += '</dl><dl><dt>'+ info[0].t +'</dt>';
    for(var i = 0;i < info[0].l.length;i++){
        sInfo += '<dd>'+ info[0].l[i] +'</dd>';
    }
    sInfo += '</dl><p>有意者请投递简历至 '+ aData.email +'</p>';

    oInfo.innerHTML = sInfo;
}
