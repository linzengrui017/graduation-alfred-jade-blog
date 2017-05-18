/**
 * Created by lzr on 2017/3/7.
 */

/**
 * 异步查询
 * 当前用户是否在这条微博的点赞列表里
 * 对点赞按钮显示相应的样式
 */

$(function () {

    var author = $('#author').val();
    var title = $('#title').val();
    var customer = $('#customer').val();
    var content = $('#content').val();
    if(author != '' || author != null || title != '' || title != null || content != '' || content != null){
        var url = '/queryPraiseList?author='+author+'&title='+title+'&content='+content;
        $.ajax({
            url: url,
            type: "get",
            dataType: "json",
            success:function(result){
                var data = result.data;
                var praiseList = [];
                praiseList = data.praiseList;
                // alert(praiseList[0]);
                var thumbs = $('a[name="btn_thumbs"]').find('.fa-thumbs-o-up');
                var thumbs2 = $('a[name="btn_thumbs"]').find('.fa-thumbs-up');

                if(praiseList.length > 0){
                    /**
                     * 有数据
                     * 已点赞
                     */
                    thumbs.hide();
                    thumbs2.show();
                }else {
                    thumbs.show();
                    thumbs2.hide();
                }



            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                var s1=XMLHttpRequest;
                var s2=textStatus;
                var s3=errorThrown;
                alert("查询当前用户是否在这条微博的点赞列表里的操作失败 : "+ errorThrown.toString());
            }
        });
    }

});
