Highcharts.setOptions({
    global: {
        useUTC: false
    }
});
$('#container').highcharts({
    chart: {
        type: 'spline',
        animation: Highcharts.svg, // don't animate in old IE
        marginRight: 10,
        events: {
            load: function () {
                // set up the updating of the chart each second
                var series = this.series[0],
                    chart = this;
                setInterval(function () {
                    var url = '/queryUserTraffic';
                    $.ajax({
                        url: url,
                        type: "post",
                        dataType: "json",
                        success:function(result){
                            var x = (new Date()).getTime(), // current time
                                data = result.data;
                            if(data == null || data == undefined){
                                data = 0;
                            }
                            var y = parseInt(data);
                            series.addPoint([x, y], true, true);
                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                            console.log("查询网站访问量失败 : "+ errorThrown.toString());
                        }
                    });

                }, 3000);
            }
        }
    },
    title: {
        text: '网站访问量'
    },
    xAxis: {
        type: 'datetime',
        tickPixelInterval: 150
    },
    yAxis: {
        title: {
            text: '值'
        },
        plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
        }]
    },
    tooltip: {
        formatter: function () {
            return '<b>' + this.series.name + '</b><br/>' +
                Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' + this.y;
        }
    },
    legend: {
        enabled: false
    },
    exporting: {
        enabled: false
    },
    series: [{
        name: '访问人数',
        data: (function () {
            // generate an array of random data
            var data = [],
                time = (new Date()).getTime(),
                i;
            for (i = -19; i <= 0; i += 1) {
                data.push({
                    x: time + i * 1000,
                    y: Math.random() * 10
                });
            }
            return data;
        }())
    }]
}, function(c) {
    //activeLastPointToolip(c)
});
