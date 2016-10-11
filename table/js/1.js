var oName = document.getElementById('name');   // 不能用name做变量！！！！！！
var oAge = document.getElementById('age');
//var oSex = document.getElementById('sex');
var oBtn = document.getElementById('btn');
var oForm = document.getElementById('form');
var oTable = document.getElementById('table');
var oAll = document.getElementById('all');
var oRemove = document.getElementById('r-btn');
var oRank = document.getElementById('rank');
var oSear = document.getElementById('search');
var oTbody = oTable.tBodies[0];
var count = 0;  //按钮选中个数


var datas = [
    {
        id: 1,
        username: '张三',
        age: 36,
        sex: '男'
    },
    {
        id: 2,
        username: '李四',
        age: 17,
        sex: '男'
    },
    {
        id: 3,
        username: '王五',
        age: 17,
        sex: '男'
    },
    {
        id: 4,
        username: '赵六',
        age: 26,
        sex: '男'
    },
    {
        id: 5,
        username: '田七',
        age: 20,
        sex: '女'
    }
];

var num = datas.length+1;  //ID

//初始化表格
for(var i = 0;i < datas.length;i++){
    createTr(datas[i]);
}

//提交按钮
oBtn.onclick = function(){
    var strName = oName.value.replace(/^\s*|\s*$/g,'');
    var strAge = oAge.value.replace(/^\s*|\s*$/g,'');
    var n = Number(strAge);
    if(strName === '' || strAge === ''){
        alert('输入的内容不能为空');
    }else if(n !== n || strAge !== parseInt(strAge)+''){    //是数字并且不是小数
        alert('数入的年龄不正确');
    }else{
        var obj = {
            id: ++num,
            username: strName,
            age: strAge,
            sex: oForm.sex.value
        }
        createTr(obj);   //创建tr
    }
    oName.value = oAge.value = '';
}
//全选按钮
oAll.onclick = function(){
    if(this.checked){    //全选
        for(var i = 0;i < oTbody.rows.length;i++){
            var oInp = oTbody.rows[i].cells[0].getElementsByTagName('input')[0];
            oInp.checked = true;
            oTbody.rows[i].style.background = 'yellow';
        }
        count = oTbody.rows.length;   //更新按钮选中个数
    }else{               //取消全选
        for(var i = 0;i < oTbody.rows.length;i++){
            var oInp = oTbody.rows[i].cells[0].getElementsByTagName('input')[0];
            oInp.checked = false;
            oTbody.rows[i].style.background = '';
        }
        count = 0;                    //更新按钮选中个数
    }
}
//删除选中按钮
oRemove.onclick = function(){
    var sure = confirm('确定要删除？');
    if(sure){   //确定的话
        var i = 0;
        while(i < oTbody.rows.length){
            var oInp = oTbody.rows[i].cells[0].getElementsByTagName('input')[0];
            if(oInp.checked){
                oTbody.removeChild(oTbody.rows[i]);
            }else{
                i++;
            }
        }
        oAll.checked = false;    //全选按钮不选中
        count = 0;               //选中按钮为0个
        color();                 //隔行变色
    }
}
//排序按钮
oRank.onclick = function(){
    if(oTbody.children.length >= 2){
        var arr = [];
        for(var i = 0;i < oTbody.rows.length;i++){
            arr.push(oTbody.rows[i]);
        }
        if(oForm.op.value === 'id'){    //按id排序
            if(oForm.order.value === '1'){   //降序
                sort(arr, 1, 1);
            }
            if(oForm.order.value === '2'){   //升序
                sort(arr, 1, 2);
            }
        }else{                          //按年龄排序
            if(oForm.order.value === '1'){   //降序
                sort(arr, 3, 1);
            }
            if(oForm.order.value === '2'){   //升序
                sort(arr, 3, 2);
            }
        }
        //重新排序tr
        for(var i = 0;i < arr.length;i++){
            oTbody.appendChild(arr[i]);
        }
        color();
    }
}
//搜索按钮
oSear.onclick = function(){
    var v = oForm.sbar.value.replace(/^\s*|\s*$/g,'').toLowerCase();  //搜索值
    if(v === ''){
        alert('请输入搜索的内容！');
        oForm.sbar.value = '';
    }else{
        var a = v.split(' ');
        count = 0; //按钮选中个数清空
        oAll.checked = false;  //全选按钮未选中
        for(var i = 0;i < oTbody.rows.length;i++){
            var oInp = oTbody.rows[i].cells[0].getElementsByTagName('input')[0];
            oTbody.rows[i].style.background = '';   //清除每一行的高亮色
            oInp.checked = false;                   //清除checkbox状态
            for(var j = 0;j < a.length;j++){    //循环第i行
                var nm = oTbody.rows[i].cells[2].getElementsByTagName('span')[0].innerHTML.toLowerCase();  //获取名字
                if(nm.indexOf(a[j]) !== -1){    //如果能搜索到
                    oInp.checked = true;
                    oTbody.rows[i].style.background = 'yellow';
                    count++;
                    break;
                }
            }
        }
        if(count === oTbody.rows.length){   //按钮选中个数与总行数相等 全选状态
            oAll.checked = true;
        }
    }
}

//创建tr
function createTr(obj){
    oAll.checked = false;  //每次创建元素全选按钮不被选中
    var tr = document.createElement('tr');
    var td = document.createElement('td');
    var checkBox = document.createElement('input');
    checkBox.type = 'checkbox';   //设置input类型
    checkBox.onclick = function(){
        if(this.checked){
            count++;
            if(count === oTbody.rows.length){   //全选状态
                oAll.checked = true;
            }
        }else{  //非全选状态
            count--;
            oAll.checked = false;
        }
    }
    td.appendChild(checkBox);
    tr.appendChild(td);

    var td = document.createElement('td');
    td.innerHTML = '<span>'+obj.id+'</span>';
    tr.appendChild(td);
    var td = document.createElement('td');
    td.innerHTML = '<span>'+obj.username+'</span><div class="inp"><input class="file-inp" type="text"><span class="file-btn file-btn1"></span><span class="file-btn file-btn2"></span></div>';
    tr.appendChild(td);
    var td = document.createElement('td');
    td.innerHTML = '<span>'+obj.age+'</span><div class="inp"><input class="file-inp" type="text"><span class="file-btn file-btn1"></span><span class="file-btn file-btn2"></span></div>';
    tr.appendChild(td);
    var td = document.createElement('td');
    td.innerHTML = '<span>'+obj.sex+'</span><div class="inp"><select><option value="男">男</option><option value="女">女</option></select><span class="file-btn file-btn1"></span><span class="file-btn file-btn2"></span></div>';
    tr.appendChild(td);

    var td = document.createElement('td');
    td.innerHTML = '<a href="javascript:;">上移</a>|<a href="javascript:;">下移</a>|<a href="javascript:;">删除</a>';
    tr.appendChild(td);

    var aA = tr.getElementsByTagName('a');
    aA[0].onclick = function(){   //上移
        if(prev(tr)){   //tr有上一个元素节点
            tr.style.background = '';   //不清空的话FF IE会有问题
            oTbody.insertBefore(tr,prev(tr));
        }
        color();    //隔行变色
    }
    aA[1].onclick = function(){   //下移
        if(next(tr)){   //tr有上一个元素节点
            tr.style.background = '';   //不清空的话IE会有问题
            next(tr).style.background = 'yellow';   //不设置的话IE会有问题
            oTbody.insertBefore(next(tr),tr);
        }
        color();    //隔行变色
    }
    aA[2].onclick = function(){   //删除
        var bl = checkBox.checked;
        oTbody.removeChild(tr);
        color();    //隔行变色

        if(!bl){   //如果删除的是没被选中的行，检测剩下选中的行数是否已经全选
            if(count === oTbody.rows.length){
                oAll.checked = true;
            }
        }
        if(oTbody.rows.length === 0){
            oAll.checked = false;
        }
    }

    oTbody.appendChild(tr);   //最后添加tr

    color();   //隔行变色

    tr.onmouseover = function(){
        this.style.background = 'yellow';   //#EAB7B7
    }
    tr.onmouseout = function(){
        if(!checkBox.checked){
            this.style.background = '';   //如果未被选中清空颜色
        }
    }

    for(var i = 2;i <= 4;i++){
        addEvent(i);
    }

    function addEvent(i){
        var oSpan = tr.cells[i].getElementsByTagName('span')[0];  //内容
        var oDiv = tr.cells[i].getElementsByTagName('div')[0];
        var oInp = oDiv.children[0];   //搜索框或者选择框
        var aBtn = oDiv.getElementsByTagName('span');   //√ X 按钮
        tr.cells[i].ondblclick = function(){   //双击显示修改条
            oInp.value = oSpan.innerHTML;
            oSpan.style.display = 'none';
            oDiv.style.display = 'block';
        }
        // √按钮点击
        if(i === 4){     //选择框
            aBtn[0].onclick = function(){
                oSpan.innerHTML = oInp.value;
                oSpan.style.display = 'inline';
                oDiv.style.display = 'none';
            }
        }else{          //搜索框
            aBtn[0].onclick = function(){
                var value = oInp.value.replace(/^\s*|\s*$/g,'');
                if(value === ''){
                    alert('内容不能为空');
                }else{
                    if(i === 3){
                        var n = Number(value);
                        if(n !== n || parseInt(n)+'' !==  value){
                            alert('输入的不是整数！');
                            return;
                        }
                    }
                    oSpan.innerHTML = value;
                    oSpan.style.display = 'inline';
                    oDiv.style.display = 'none';
                }
            }
        }
        // X 按钮点击
        aBtn[1].onclick = function(){
            oSpan.style.display = 'inline';
            oDiv.style.display = 'none';
        }
    }
}
//隔行变色
function color(){
    for(var i = 0;i < oTbody.rows.length;i++){
        if(i % 2 === 0){
            oTbody.rows[i].className = 'grey';
        }else{
            oTbody.rows[i].className = '';
        }
    }
}
//obj上一个元素节点
function prev(ele){
    var children = ele.parentNode.children
    if(ele === children[0]){
        return;
    }
    if(ele.previousElementSibling){
        return ele.previousElementSibling;
    }else{    //非标准IE
        return ele.previousSibling;
    }
}
//ele下一个元素节点
function next(ele){
    var children = ele.parentNode.children
    if(ele === children[children.length - 1]){
        return;
    }
    if(ele.nextElementSibling){
        return ele.nextElementSibling;
    }else{    //非标准IE
        return ele.nextSibling;
    }
}
/*
* 排序函数
* arr 数组
* index  第几列
* dir  1：降序  2：升序
* */
function sort(arr, index, dir){
    if(dir === 1){   //降序
        arr.sort(function(tr1,tr2){
            var a = tr1.cells[index].getElementsByTagName('span')[0].innerHTML;
            var b = tr2.cells[index].getElementsByTagName('span')[0].innerHTML;
            return b - a;
        });
    }else{     //升序
        arr.sort(function(tr1,tr2){
            var a = tr1.cells[index].getElementsByTagName('span')[0].innerHTML;
            var b = tr2.cells[index].getElementsByTagName('span')[0].innerHTML;
            return a - b;
        });
    }
}