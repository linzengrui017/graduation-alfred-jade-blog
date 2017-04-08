/**
 * Created by lzr on 2017/3/15.
 */

/**
 * 显示好友
 */
/**
 * 异步查询数据库
 * 返回数据
 */
var url = '/queryFriendsBlogList';
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
                /**
                 * 添加视图
                 */
                relayHtml +=
                    '<ul class="messages">' +
                        '<li><img src="'+ relay_imageUrl +'" alt="Avatar" class="avatar" />' +
                            '<div class="message_wrapper">' +
                                '<h4><a href="#" name="others">'+ relay_author +'</a></h4>' +
                                '<h4>'+ relay_title + '<br>'+ relay_content + '</h4>'+
                            '</div>'+
                        '</li>' +
                    '</ul>';
            }

            /**
             * 显示微博内容
             */
            $('#friendsBlogList').append(
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
                                    '<a href="/toDetailBlogPage?title='+title+'&author='+author+'">'+
                                    +title +
                                    '</a><br>'+
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

        /**
         * 跳转到他人主页
         */
        $('a[name="others"]').click(function () {
            var author = $(this).text();
            if( null == author || '' == author){

            }else {
                window.location.href = '/others?author='+author;
            }
        });



    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
        alert("查询用户信息失败 : "+ errorThrown.toString());
    }
});
