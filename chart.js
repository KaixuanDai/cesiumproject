function chart(){
    "use strict"
    //基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'),'macarons');
    // createChart(myChart);

          
option = {
    
    tooltip: {
        trigger: "axis",
        showDelay: 0,
        axisPointer: {
            type: "cross",
            lineStyle: {
                type: "dashed",
                width: 1
            }
        },
        formatter:"{c0}"
    },
    legend: {
        data: ["position"]
    },
    toolbox: {
        show: false,
        feature: {
            mark: {
                show: true
            },
            dataZoom: {
                show: true
            },
            dataView: {
                show: true,
                readOnly: true
            },
            restore: {
                show: true
            },
            saveAsImage: {
                show: true
            }
        }
    },
    xAxis: [
        {
            type: "value",
            power: 1,
            splitNumber: 4,
            scale: true
        }
    ],
    yAxis: [
        {
            type: "value",
            power: 1,
            splitNumber: 4,
            scale: true,
            axisLabel : {
            formatter: function(){
                  return "";
            }
        }
        }
    ],
    series: [
        {
            name: "position",
            type: "scatter",
            symbol: "circle",
            data: [[-69, 58, 70], [10, 74, 29]],
            markPoint: {
                data: []
            },
            symbolSize: 10
           
        }
    ],
    title: {
        text: "实时位置"
    },
    grid: { // 控制图的大小，调整下面这些值就可以，
            x: 40,
            x2: 100,
            y2: 150// y2可以控制 X轴跟Zoom控件之间的间隔，避免以为倾斜后造成 label重叠到zoom上
     },

};

var myChart;
var data=[0];
var shift=false;
var p_x=10;
var p_y=10;

function addData(shift) {
        data.push([p_x,p_y]);
 if (shift) {
        data.shift();
     }

}
var timeTicket = setInterval(function (){
    addData(true);  
myChart.setOption({
    notMerge:true,
        series: [{
            name:'position',
            data: data,
            symbolSize: 10
        }]
})
}, 1000);

  timer = setInterval(function () {
            //var curr = count % total;
            var count=0
            //3.0以上版本的showTip使用方式
            myChart.dispatchAction({type: 'showTip', seriesIndex: '0', dataIndex: count});
            count += 1;
        }, 1);

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }