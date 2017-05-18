/**
 * Created by lzr on 2017/3/7.
 */

/**
 * 异步查询数据库
 * 返回数据
 */
var customer = $('#customer').val();
var url = '/myBlogList';
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
                                '<h4>'+ relay_title + '<br>'+ relay_content + '</h4>'+
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
                     * 删除按钮
                     */
                    '<ul class="nav navbar-right panel_toolbox">'+
                        '<li><button type="button" class="btn btn-danger" name="btn_delete"><i class="fa fa-trash"></i></button></li>'+
                    '</ul>'+
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
                                    '<a href="/toDetailBlogPage?title='+title+'&author='+author+'&content='+content+">'+
                                    title +
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
         * 删除微博功能
         */
        $("button[name='btn_delete']").click(function () {
            /**
             * 获取数据
             */
            var panel = $(this).closest('.x_panel');
            var message_wrapper = panel.find('.message_wrapper').eq(0);
            var author = message_wrapper.find('h4').eq(0).text();
            var title_text = message_wrapper.find('h4').eq(1).find('a').eq(0).text();
            var title = title_text.substring(1, title_text.length - 1);
            /**
             * 发起请求
             */
            var url = '/delBlog?author='+author+'&title='+title;
            // alert(url);
            $.ajax({
                url: url,
                type: "get",
                success:function(result){
                    alert("成功删除微博");
                    window.location.reload();
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert("在个人主页的微博列表里执行删除微博的操作失败 : XMLHttpRequest.readyState="+ XMLHttpRequest.readyState+ '\n' + textStatus.toString()+ '\n' + errorThrown.toString());
                }
            });

        });


    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
        alert("在个人主页的微博列表里执行显示个人的所有微博的操作失败 : XMLHttpRequest.readyState="+ XMLHttpRequest.readyState+ '\n' + textStatus.toString()+ '\n' + errorThrown.toString());
    }
});