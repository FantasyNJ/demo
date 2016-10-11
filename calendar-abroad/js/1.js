/*
* 1.怎么知道一个月有多少天
* 2.怎么知道一个月的1号是星期几
* */

var table = document.getElementById('table');
var year = document.getElementById('year');
var month = document.getElementById('month');
var prev = document.getElementById('prev');
var next = document.getElementById('next');
var now = document.getElementById('now');
var time = document.getElementById('time');
var tbody = table.tBodies[0];
var d= new Date();   //获取当前时间
var nowMonth = d.getMonth() + 1;  //存储当前日历的月份,以便上一个月和下一个月按钮使用
var startYear = 1970;     //开始年份
var targetYear = 2030;    //结束年份

createOption(year , startYear, targetYear, d.getFullYear());
createOption(month, 1, 12, d.getMonth()+1);

//选中年份
year.onchange = function(){
    createCal(this.value, month.value);
}
//选中月份
month.onchange = function(){
    createCal(year.value, this.value);
}
//上一个月按钮
prev.onclick = function(){
    if(year.value == startYear && month.value == 1){
        alert('已经到最前面了！');
    }else{
        nowMonth--;
        createCal(year.value, nowMonth);
    }
}
//下一个月按钮
next.onclick = function(){
    if(year.value == targetYear && month.value == 12){
        alert('已经到最后面了！');
    }else{
        nowMonth++;
        createCal(year.value, nowMonth);
    }
}
//回到今天按钮
now.onclick = function(){
    createCal(d.getFullYear(), d.getMonth()+1);
}
//更新时间
showTime();
setInterval(showTime, 1000);

createCal(d.getFullYear(), d.getMonth()+1);    //一开始创建日历
function createCal(y, m){  //m是自然月
    var date = new Date(y, m-1);
    var line = getLine(date.getFullYear(), date.getMonth());  //当前月份的行数
    var mDays = getDays(date.getFullYear(), date.getMonth()); //当前月份的天数
    var pmDays = getDays(date.getFullYear(), date.getMonth()-1); //上个月份的天数
    var num = 1 - getWeek(date.getFullYear(), date.getMonth());  // 计数判断 -2 -1 0 1 2 .... 31 32 33
    nowMonth = date.getMonth() + 1;     //存储当前日历的月份

    var tHtml = '';
    for(var i = 0;i < line;i++){
        tHtml += '<tr>';
        for(var j = 0;j < 7;j++){
            if(num < 1){   //上个月日期
                tHtml += '<td class="no-active">'+(pmDays + num)+'</td>';
            }else if(num > mDays){   //下个月日期
                tHtml += '<td class="no-active">'+(num - mDays)+'</td>';
            }else{   //本月日期
                if(num == d.getDate() && date.getFullYear() == d.getFullYear() && date.getMonth() == d.getMonth()){
                    tHtml += '<td class="today">'+num+'</td>';
                }else if(j == 0 || j == 6){
                    tHtml += '<td class="weekend-td">'+num+'</td>';
                }else{
                    tHtml += '<td>'+num+'</td>';
                }
            }
            num++;
        }
        tHtml += '</tr>';
    }
    tbody.innerHTML = tHtml;
    //更新select中的年月
    year.value = date.getFullYear();
    month.value = date.getMonth() + 1;
}


//获取月份天数，m是程序的月份（自然月-1）
function getDays(y, m){
    var d = new Date(y, m+1,1);
    return new Date(d - 1).getDate();
}
//获取生成月份的行数
function getLine(y, m){
    var d = new Date(y, m,1);
    return Math.ceil((d.getDay() + getDays(y, m)) / 7);
}
//获取月份一号是星期几
function getWeek(y, m){
    var d = new Date(y, m,1);
    return d.getDay();
}
//创建option
function createOption(obj, s, t){    //创建option s:起始值  t:目标值
    var html = '';
    for(var i = s;i <= t;i++){
        html += '<option>'+i+'</option>';
    }
    obj.innerHTML = html;
}
//更新时间
function showTime(){
    d = new Date();
    time.innerHTML = d.getFullYear()+'年'+format(d.getMonth() + 1)+'月'+format(d.getDate())+'日'+'&nbsp;&nbsp;&nbsp;&nbsp;'+format(d.getHours())+':'+format(d.getMinutes())+':'+format(d.getSeconds())+'&nbsp;&nbsp;&nbsp;&nbsp;'+showWeek(d.getDay());
}
//格式化时间
function format(n){
    if(n < 10){
        return '0' + n;
    }else{
        return n;
    }
}
//返回星期几
function showWeek(v){
    return ['星期天','星期一','星期二','星期三','星期四','星期五','星期六'][v];
}