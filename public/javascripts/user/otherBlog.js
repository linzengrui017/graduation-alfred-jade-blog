/**
 * Created by lzr on 2017/3/7.
 */

/**
 * 异步查询数据库
 * 返回数据
 */
var author = $('#author').val();
var url = '/otherBlog?author='+author;
$.ajax({
    url: url,
    type: "post",
    dataType: "json",
    success:function(result){
        var data = result.data;
        for(var i = 0; i < data.length; i++){
            /**
             * 获取数据
             * @type {*}
             */
            var author = data[i].author;
            var title = data[i].title;
            var content = data[i].content;
            var createTime = moment(data[i].createTime).format('YYYY-MM-DD HH:mm:ss');
            var relayTag = data[i].relayTag;
            var imageUrl = data[i].imageUrl;

            /**
             * 添加转发图层
             */
            var relayHtml = '';
            if(relayTag){
                /**
                 * 获取数据
                 */
                var relayContent = data[i].relayContent;

                var relay_author = relayContent.author;
                var relay_title = relayContent.title;
                var relay_content = relayContent.content;
                var relay_imageUrl = relayContent.imageUrl;
                /**
                 * 添加视图
                 */
                relayHtml +=
                    '<ul class="messages">' +
                        '<li><img src="'+ relay_imageUrl +'" alt="Avatar" class="avatar" />' +
                            '<div class="message_wrapper">' +
                                '<h4><a href="#" name="others">'+ relay_author +'</a></h4>' +
                                '<h4>【'+ relay_title + '】'+ relay_content + '</h4>'+
                            '</div>'+
                        '</li>' +
                    '</ul>';
            }

            /**
             * 显示微博内容
             */
            $('#blogList').append(
                '<div class="x_panel">' +
                    /**
                     * 微博标题、内容等
                     */
                    '<div class="block">'+
                        '<ul class="messages">' +
                            '<li><img src="'+ imageUrl +'" alt="Avatar" class="avatar" />' +
                                '<div class="message_wrapper">' +
                                    '<h4 class="heading"><a href="#" name="others">'+ author +'</a></h4>' +
                                    '<small>'+ createTime +'</small>' +
                                    '<h4>'+
                                    '<a href="/toDetailBlogPage?title='+title+'&author='+author+'">【'+ title + '】</a>'+
                                        content +
                                        relayHtml +
                                    '</h4>'+
                                '</div>'+
                            '</li>' +
                        '</ul>' +
                    '</div>'+
                '</div>'
            );

        }

    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
        alert("在他人主页里显示他人的全部微博的操作失败 : XMLHttpRequest.readyState="+ XMLHttpRequest.readyState+ '\n' + textStatus.toString()+ '\n' + errorThrown.toString());
    }
});