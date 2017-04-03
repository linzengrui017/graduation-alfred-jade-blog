
$('#ccap').click(function () {
    var url = 'toGetCode';
    $.ajax({
        url: url,
        type: "post",
        dataType: "json",
        success:function(result) {
            var txt = result.data;
            $('#ccap').html(txt);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("在登录页面执行获取验证码操作失败 : XMLHttpRequest.readyState="+ XMLHttpRequest.readyState+ '\n' + textStatus.toString()+ '\n' + errorThrown.toString());
        }
    });

});