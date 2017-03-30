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
                                '<h4><a href="#" name="others">'+ relay_author +'</a></h4>' +
                                '<h4>【'+ relay_title + '】'+ relay_content + '</h4>'+
                            '</div>'+
                        '</li>' +
                    '</ul>';
            }

            var btnDel_Html = '';
            if(author == customer){
                btnDel_Html +=
                    '<ul class="nav navbar-right panel_toolbox">'+
                        '<li><button type="button" class="btn btn-danger" name="btn_delete"><i class="fa fa-trash"></i></button></li>'+
                    '</ul>';
            }

            /**
             * 显示微博内容
             */
            $('#blogList').append(
                '<div class="panel">' +
                    '<ul class="list-group">' +
                        '<li class="list-group-item list-group-item-success">'+
                            /**
                             * 删除按钮
                             */
                            btnDel_Html +
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
                                                    '【'+title + '】'+
                                                '</a>'+
                                                content +
                                                relayHtml +
                                            '</h4>'+
                                '</div></li>' +
                                '</ul>' +
                            '</div>'+
                        '</li>'+
                    '</ul>'+
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

        /**
         * 删除微博功能
         */
        $("button[name='btn_delete']").click(function () {
            /**
             * 获取数据
             */
            var ul = $(this).closest('.list-group');
            var message_wrapper = ul.find('.message_wrapper').eq(0);
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
        alert("在登录后的微博列表执行查询所有的微博操作失败 : XMLHttpRequest.readyState="+ XMLHttpRequest.readyState+ '\n' + textStatus.toString()+ '\n' + errorThrown.toString());
    }
});