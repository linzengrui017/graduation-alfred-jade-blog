/**
 * 显示头像
 */
var url = '/showCustomerImage';
$.ajax({
    url: url,
    type: "post",
    dataType: "json",
    success: function(result){
        var data = result.data;
        var imageUrl = data.imageUrl;
        $('#layout_img').attr('src',imageUrl);
        console.log('ajax请求显示头像');
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
        alert("ajax请求显示头像操作失败 : XMLHttpRequest.readyState="+ XMLHttpRequest.readyState+ '\n' + textStatus.toString()+ '\n' + errorThrown.toString());
    }
});
