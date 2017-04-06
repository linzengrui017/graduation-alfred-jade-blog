
setInterval(function () {
    var url = '/toLoadTraffic';
    $.ajax({
        url: url,
        type: "post",
        success:function(result){

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("自动访问网站失败 : "+ errorThrown.toString());
        }
    });

}, 3000);

setInterval(function () {
    var url = '/toLoadTraffic';
    $.ajax({
        url: url,
        type: "post",
        success:function(result){

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("自动访问网站失败 : "+ errorThrown.toString());
        }
    });

}, 2000);


