/**
 * Created by lzr on 2017/3/7.
 */

/**
 * 异步查询数据库
 * 返回数据
 */
var customer = $('#customer').val();
var url = '/showBlogList';

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

            var relayHtml = '';
            /**
             * 添加转发图层
             */
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
                                '<h4 class="heading">'+ relay_author +'</h4>' +
                                '<br />' +
                                '<br />' +
                                '<a href="#" name="title"><h4>'+
                                relay_title +
                                '</h4></a>'+
                                '<blockquote class="message">' +
                                relay_content +
                                '</blockquote>' +
                                '<br />' +
                        '</div></li>' +
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
                                    '<br />' +
                                    '<br />' +
                                    '<a href="#"><h4>'+
                                        title +
                                    '</h4></a>'+
                                    '<blockquote class="message">' +
                                        content +
                                    '</blockquote>' +
                                    '<div>'+
                                        relayHtml+
                                    '</div>' +
                                    '<br />' +
                            '</div></li>' +
                        '</ul>' +
                    '</div>'+
                '</div>'
            );
        }
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
        alert("在未登录前的微博列表中执行显示所有微博的操作失败 : XMLHttpRequest.readyState="+ XMLHttpRequest.readyState+ '\n' + textStatus.toString()+ '\n' + errorThrown.toString());
    }
});