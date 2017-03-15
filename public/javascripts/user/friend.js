/**
 * Created by lzr on 2017/3/15.
 */

/**
 * 控制 关注 按钮组的显示
 */
$(function () {

    var url = '/checkFriends?username='+author;
    $.ajax({
        url: url,
        type: "post",
        success:function(result){
            var data = result.data;
            var isFriend = '';
            if(data.length > 0){
                isFriend = true;
            }else {
                isFriend = false;
            }
            // alert(isFriend);
            if(isFriend){
                $('#haveFriend').hide();
                $('#loseFriend').show();
            }else {
                $('#haveFriend').show();
                $('#loseFriend').hide();
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            var s1=XMLHttpRequest;
            var s2=textStatus;
            var s3=errorThrown;
            alert("error message : "+ errorThrown.toString());
        }
    });



});


/**
 * 加关注
 */
$('#haveFriend').click(function () {
    /**
     * 获取他人名称
     */
    var author = $(this).parent().find('h3').eq(0).text();
    if( null != author && '' != author){
        /**
         * 发起请求
         */
        var url = '/follow?username='+author;
        $.ajax({
            url: url,
            type: "post",
            success:function(result){
                console.log('成功添加好友');
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                var s1=XMLHttpRequest;
                var s2=textStatus;
                var s3=errorThrown;
                alert("error message : "+ errorThrown.toString());
            }
        });
    }

});

/**
 * 解除关注
 */
$('#loseFriend').click(function () {
    /**
     * 获取他人名称
     */
    var author = $(this).parent().find('h3').eq(0).text();
    if( null != author && '' != author){
        /**
         * 发起请求
         */
        var url = '/unfollow?username='+author;
        $.ajax({
            url: url,
            type: "post",
            success:function(result){
                console.log('成功删除好友');
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                var s1=XMLHttpRequest;
                var s2=textStatus;
                var s3=errorThrown;
                alert("error message : "+ errorThrown.toString());
            }
        });
    }

});


