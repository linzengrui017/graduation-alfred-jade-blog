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
            /**
             * 只添加一个模态框
             */
            if(i == 0){
                // $('#blogList').append(
                //     '<div tabindex="-1" role="dialog" aria-hidden="true" style="display: none;" class="modal fade bs-example-modal-lg">' +
                //         '<div class="modal-dialog modal-lg">' +
                //             '<div class="modal-content">' +
                //                 '<div class="modal-header">' +
                //                     '<button type="button" data-dismiss="modal" class="close"><span aria-hidden="true">×</span></button>' +
                //                     '<h4 id="myModalLabel" class="modal-title">转发微博</h4>' +
                //                 '</div>' +
                //                 '<div class="modal-body">' +
                //                     '<textarea id="reason" name="reason" style="width:100%;height:100px;" placeholder="请输入转发理由"></textarea>' +
                //                 '</div>' +
                //                 '<div class="modal-footer">' +
                //                     '<button type="button" data-dismiss="modal" class="btn btn-default">取消</button>' +
                //                     '<button type="button" class="btn btn-primary" id="btn_relay">转发</button>' +
                //                 '</div>' +
                //             '</div>' +
                //         '</div>' +
                //     '</div>'
                // );
                /**
                 * 映射到视图
                 */
                $('#blogList').append(
                    '<div class="x_panel" id="main_panel">' +

                    '</div>'
                );
            }



            /**
             * 判断是否显示 删除按钮
             * @type {*}
             */

            if(author == customer){
                $('#main_panel').append(
                    '<ul class="nav navbar-right panel_toolbox">'+
                        '<li><button type="button" class="btn btn-danger" name="btn_delete"><i class="fa fa-trash"></i></button></li>'+
                    '</ul>'
                );
            }

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
             * 显示写评论文本框
             */
            var comments_message_html = '';
            comments_message_html +=
                '<li>' +
                    '<form class="form-horizontal form-label-left">' +
                        '<div class="input-group">' +
                            '<input type="text" class="form-control" placeholder="写点什么评论吧~" name="write_comment">' +
                            '<span class="input-group-btn">' +
                                '<button type="button" class="btn btn-primary" name="btn_comment">评论</button>' +
                            '</span>' +
                        '</div>' +
                    '</form>' +
                '</li>';

            /**
             * 获取comments
             * 显示评论信息
             */
            var comments = data[i].comments;

            var comments_list_html = '';
            /**
             * 遍历comments
             * 得到每个author content createTime
             * 返回数据
             */
            for(var k = comments.length - 1; k >= 0; k--){
                if(comments[k].author == customer){
                    comments_list_html+=
                        '<li><img src="'+ comments[k].imageUrl +'" alt="Avatar" class="avatar" />' +
                            '<div class="message_wrapper">' +
                                '<font style="color:#CD5C5C;">'+comments[k].author+'</font>:' +
                                '<font style="color:#696969;">'+comments[k].content+'</font>' +
                                '<br />' +
                                '<small>'+moment(comments[k].createTime).format('YYYY-MM-DD HH:mm:ss')+'</small>' +
                                '&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" name="btn_delComment">删除</a>' +
                                '<br />' +
                        '</div></li>';
                }else {
                    comments_list_html+=
                        '<li><img src="'+ comments[k].imageUrl +'" alt="Avatar" class="avatar" />' +
                            '<div class="message_wrapper">' +
                                '<font style="color:#CD5C5C;">'+comments[k].author+'</font>:' +
                                '<font style="color:#696969;">'+comments[k].content+'</font>' +
                                '<br />' +
                                '<small>'+moment(comments[k].createTime).format('YYYY-MM-DD HH:mm:ss')+'</small>' +
                            '<br />' +
                        '</div></li>';
                }

            }


            /**
             * 显示微博内容
             */
            $('#main_panel').append(
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
                            '<a href="/toDetailBlogPage?title='+title+'&author='+author+'"><h4>'+
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
                /**
                 * 按钮组：转发、评论、点赞
                 */
                '<div class="row">' +
                    '<div class="col-md-2 col-sm-2 col-xs-2"></div>' +
                    '<div class="col-md-3 col-sm-3 col-xs-3">' +
                        '<a data-toggle="modal" data-target=".bs-example-modal-lg" class="btn"><i class="fa fa-external-link"></i>123</a>' +
                    '</div>' +
                    '<div class="col-md-3 col-sm-3 col-xs-3">' +
                        '<a id="headingOne" role="tab" data-toggle="collapse" data-parent="#accordion" href="#collapse'+i+'" aria-expanded="false" aria-controls="collapseOne" class="btn panel-heading collapsed"><i class="fa fa-comment-o"></i>456</a>' +
                    '</div>' +
                    '<div class="col-md-3 col-sm-3 col-xs-3">' +
                        '<a name="btn_thumbs" class="btn"><i name="btn_thumbs_1" class="fa fa-thumbs-o-up"></i><i name="btn_thumbs_2" style="display:none;" class="fa fa-thumbs-up"></i>789</a>' +
                    '</div>' +
                    '<div class="col-md-1 col-sm-1 col-xs-1"></div>' +
                '</div>' +
                /**
                 * 评论显示的评论信息
                 */
                '<div id="collapse'+i+'" role="tabpanel" aria-labelledby="headingOne" aria-expanded="false" style="height: 0px;" class="panel-collapse collapse">' +
                    '<div class="panel-body">' +
                        '<ul class="messages">' +
                            comments_message_html+
                            comments_list_html+
                        '</ul>' +
                    '</div>' +
                '</div>'+
            '</div>'
            );

        }

        /**
         * 转发按钮事件
         */
        // $('#btn_relay').click(function () {
        //     /**
        //      * 获取数据
        //      */
        //     var blog_content = $('#reason').val();
        //     var relay_author = author;
        //     var relay_title = title;
        //     var relay_content = content;
        //
        //     if(null == blog_content || '' == blog_content ||
        //         null == relay_author || '' == relay_author ||
        //         null == relay_title || '' == relay_title ||
        //         null == relay_content || '' == relay_content){
        //
        //         alert('参数不能为空');
        //
        //     }else {
        //         /**
        //          * 发起请求
        //          */
        //         window.location.href = "/forwardBlog?blog_content="+blog_content+
        //             "&relay_author="+relay_author+"&relay_title="+relay_title+
        //             "&relay_content="+relay_content;
        //     }
        //
        // });

        /**
         * 添加评论功能
         */
        $('button[name="btn_comment"]').click(function () {
            var dom_div = $(this).parent().parent();
            var content = dom_div.find('input').val();

            var dom_block_div = $(this).parent().parent().parent().parent().parent().parent().parent().parent();
            var message_wrapper_div = dom_block_div.find('ul').find('li').find('div');
            var author = message_wrapper_div.children().eq(0).text();
            var title = message_wrapper_div.find('a').eq(0).text();
            // alert(author+'\n'+title+'\n'+content);
            window.location.href = '/commentBlog?comment_content='
                + content + '&author=' + author + '&title=' + title;
        });

        /**
         * 删除微博功能
         */
        $("button[name='btn_delete']").click(function () {
            /**
             * 获取数据
             */
            var dom_panel = $(this).parent().parent().parent();
            var dom_ul_message = dom_panel.children().eq(1);
            var title = dom_ul_message.find('li').eq(0).find('a').eq(0).text();
            var author = dom_ul_message.find('li').eq(0).find('h4').eq(0).text();
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
                    window.location.href='/toAddPage';
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert("在登录前的微博列表执行删除微博操作失败 : XMLHttpRequest.readyState="+ XMLHttpRequest.readyState+ '\n' + textStatus.toString()+ '\n' + errorThrown.toString());
                }
            });

        });
        /**
         * 删除评论功能
         */
        $('a[name="btn_delComment"]').click(function () {
            var dom_div = $(this).parent();
            var comment_author = dom_div.find('font').eq(0).text();
            var comment_content = dom_div.find('font').eq(1).text();
            var comment_createTime = dom_div.find('small').text();
            // alert(
            //     'author='+author+'\n'+
            //     'title='+title+'\n'+
            //     'comment_author='+comment_author+'\n'+
            //     'comment_content='+comment_content+'\n'+
            //     'comment_createTime='+comment_createTime+'\n'
            // );
            if( null == author || '' == author || null == title || '' == title ||
                null == comment_author || '' == comment_author ||
                null == comment_content || '' == comment_content ||
                null == comment_createTime || '' == comment_createTime ){

                alert('参数不能为空');

            }else {
                window.location.href = '/delComment?author=' + author
                    + '&title=' + title + '&comment_author=' + comment_author
                    + '&comment_content=' + comment_content + '&comment_createTime=' + comment_createTime;
            }


        });
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
        alert("在未登录前的微博列表中执行显示所有微博的操作失败 : XMLHttpRequest.readyState="+ XMLHttpRequest.readyState+ '\n' + textStatus.toString()+ '\n' + errorThrown.toString());
    }
});