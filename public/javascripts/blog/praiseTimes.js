/**
 * Created by lzr on 2017/3/7.
 */

/**
 * 异步查询
 * 当前这条微博的点赞次数
 */

$(function () {

    var author = $('#author').val();
    var title = $('#title').val();
    var customer = $('#customer').val();
    if(author != '' || author != null || title != '' || title != null){
        var url = '/queryPraiseNums?author='+author+'&title='+title;
        $.ajax({
            url: url,
            type: "get",
            dataType: "json",
            success:function(result){
                var number = result.data;
                /**
                 * 显示点赞字数
                 */
                $('#likeNums').html(number);

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                var s1=XMLHttpRequest;
                var s2=textStatus;
                var s3=errorThrown;
                alert("查询当前微博的点赞次数的操作失败 : "+ errorThrown.toString());
            }
        });
    }

});
