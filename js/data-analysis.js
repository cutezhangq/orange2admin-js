<!--柱状图-->
$(function () {
    // 基于准备好的dom，初始化echarts实例
    let barsChart = echarts.init(document.getElementById('echartjs-bars'));//全局 echarts 对象，在 script 标签引入 echarts.js 文件后获得
// 指定图表的配置项和数据
    let barsoption = {
        resize:{
            width:'80%',
            height:'90%',
            silent:false,//是否禁止抛出事件
        },
        color: ['#B7D4FF'],
        title: {
            text: 'ECharts 示例'
        },
        tooltip: {},
        legend: {
            data:['销量']
        },
        xAxis: {
            data: ["XXX1","XXX2","XXX3","XXX4","XXX5","XXX6"]
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20],
            barMaxWidth:30,//设置柱状最大的宽度
        }],
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
    };
// 使用刚指定的配置项和数据显示图表。
    barsChart.setOption(barsoption);
});
<!--折线图-->
$(function () {
    let linesChart = echarts.init(document.getElementById('echartjs-lines'));
    let linesoption = {
        resize:{
            width:'80%',
            height:'90%',
            silent:false,//是否禁止抛出事件
        },
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line'
        }],
    };
    linesChart.setOption(linesoption);//万能接口，所有参数和数据的修改都可以通过 setOption 完成

    window.onresize = function(){
        /*barsChart.resize();*/
        linesChart.resize();    //若有多个图表变动，可多写
    }
});

<!--天气-->
$(function () {
    $(".diywether").ready(function () {
        $.ajax({
            url:"https://www.tianqiapi.com/api/?version=v1",
            type:"get" ,
            data:'',
            dataType:"json",
            ContentType:"application/json",
            success:function (responseData) {
                let weatherData = responseData.data;
                let city = responseData.city;
                let html = "";
                let todayWeaImg = weatherData[0]["wea_img"];
                let todayCurrentTem = weatherData[0]["tem"];    //将 点 属性 改为["属性"]更好，因为点的必须是对象点属性，而[]的没有该限制
                    weatherData.forEach(function(result,index){
                        //let currentId="weekwea_imgs"+index;
                        html += `<div class='weekweather col-md-2'>
                                    <div>
                                    <p>${result.day}</p>
                                    <p>${result.tem}</p><!--温度-->
                                    <p>${result.week}</p>
                                    <p class='weekwea_imgs' id='${"weekwea_imgs"+index}' ></p>
                                    <p>${result.wea}</p><!--阴晴-->
                                    <p>${result.tem2}~${result.tem1}</p>
                                    </div>
                                </div>`;
                    });
                document.getElementById('rowtempother').innerHTML= html;
                document.getElementById('nowCity').innerHTML = city;
                document.getElementById('todaytem').innerHTML = todayCurrentTem;
               /* $("#weekwea_imgs").attr("id",'weekwea_imgs'+'num');*/
                let $img=$("img");
                //当天天气图标的切换
                switch (todayWeaImg) {//switch里是变量 ，然后变量的值与case比对
                    case "lei":
                        $img.attr('src',"");//清空图片
                        document.getElementById('todayweaImg').innerHTML = `<div><img src="../../orange2admin-web/images/weather/lei.png"/></div>`;
                        break;
                    case "qing":
                        $img.attr('src',"");
                        document.getElementById('todayweaImg').innerHTML = `<div><img src="../../orange2admin-web/images/weather/qing.png"/></div>`;
                        break;
                    case "snow":
                        $img.attr('src',"");
                        document.getElementById('todayweaImg').innerHTML = `<div><img src="../../orange2admin-web/images/weather/snow.png"/></div>`;
                        break;
                    case "yu":
                        $img.attr('src',"");
                        document.getElementById('todayweaImg').innerHTML = `<div><img src="../../orange2admin-web/images/weather/yu.png"/></div>`;
                        break;
                    case "yun":
                        $img.attr('src',"");
                        document.getElementById('todayweaImg').innerHTML = `<div><img src="../../orange2admin-web/images/weather/yun.png"/></div>`;
                        break;
                }
                $(".otherweas").attr('src',"");//清空图片
                weatherData.forEach(function(result,index){
                        //近七天天气图标的切换
                        otherweaimg =weatherData[index].wea_img;
                        switch (otherweaimg) {
                            case "lei":
                                document.getElementById('weekwea_imgs'+index).innerHTML = `<div><img class="otherweas" src="../../orange2admin-web/images/weather/lei.png"/></div>`;
                                break;
                            case "qing":
                                document.getElementById('weekwea_imgs'+index).innerHTML = `<div><img class="otherweas" src="../../orange2admin-web/images/weather/qing.png"/></div>`;
                                break;
                            case "snow":
                                document.getElementById('weekwea_imgs'+index).innerHTML = `<div><img class="otherweas" src="../../orange2admin-web/images/weather/snow.png"/></div>`;
                                break;
                            case "yu":
                                document.getElementById('weekwea_imgs'+index).innerHTML = `<div><img class="otherweas" src="../../orange2admin-web/images/weather/yu.png"/></div>`;
                                break;
                            case "yun":
                                document.getElementById('weekwea_imgs'+index).innerHTML = `<div><img class="otherweas" src="../../orange2admin-web/images/weather/yun.png"/></div>`;
                                break;
                        }
                });
            }
        })
    })
})