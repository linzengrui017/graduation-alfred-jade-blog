/**
 * Created by lzr on 2017/3/7.
 */

/**
 * 异步查询数据库
 * 返回数据
 */

$(function () {

    var author = $('#author').val();
    var title = $('#title').val();
    var customer = $('#customer').val();
    if(author != '' || author != null || title != '' || title != null){
        var url = '/showDetailBlog?author='+author+'&title='+title;
        $.ajax({
            url: url,
            type: "get",
            dataType: "json",
            success:function(result){
                var data = result.data;

                var i = 0;

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
                 * 映射到视图
                 */
                $('#blogDetail').append(
                    '<div class="x_panel" id="main_panel">' +

                    '</div>'
                );

                /**
                 * 判断是否显示 删除按钮
                 * @type {*}
                 */

                if(author == customer){
                    $('#main_panel').append(
                        '<ul class="nav navbar-right panel_toolbox">'+
                        '<li><button type="button" class="btn btn-danger" id="btn_delete"><i class="fa fa-trash"></i></button></li>'+
                        '</ul>'
                    );

                    /**
                     * 删除按钮
                     * 点击事件
                     */
                    $("#btn_delete").click(function () {
                        /**
                         * 获取数据
                         */
                        // var dom_panel = $(this).parent().parent().parent();
                        // var dom_ul_message = dom_panel.children().eq(1);
                        // var title = dom_ul_message.find('li').eq(0).find('a').text();
                        /**
                         * 发起请求
                         */
                        var url = '/delBlog?author='+author+'&title='+title;
                        $.ajax({
                            url: url,
                            type: "get",
                            success:function(result){
                                alert("成功删除微博");
                                window.location.href='/toAddPage';
                            },
                            error: function (XMLHttpRequest, textStatus, errorThrown) {
                                alert("在微博详情页面执行删除微博操作失败 : XMLHttpRequest.readyState="+ XMLHttpRequest.readyState+ '\n' + textStatus.toString()+ '\n' + errorThrown.toString());
                            }
                        });

                    });

                }

                /**
                 * 显示微博详情
                 */
                $('#main_panel').append(
                    /**
                     * 微博标题、内容等
                     */
                    '<ul class="messages">' +
                        '<li><img src="'+ imageUrl +'" alt="Avatar" class="avatar" />' +
                            '<div class="message_wrapper">' +
                                '<h4 class="heading"><a href="#" name="others">'+ author +'</a></h4>' +
                                '<small>'+ createTime +'</small>' +
                                '<br />' +
                                '<br />' +
                                '<a href="#" name="title"><h4>'+
                                    title +
                                '</h4></a>'+
                                '<blockquote class="message">' +
                                    content +
                                '</blockquote>' +
                                '<div id="div_relay"></div>' +
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
                            //转发对应的模态框
                        '<div tabindex="-1" role="dialog" aria-hidden="true" style="display: none;" class="modal fade bs-example-modal-lg">' +
                            '<div class="modal-dialog modal-lg">' +
                                '<div class="modal-content">' +
                                    '<div class="modal-header">' +
                                        '<button type="button" data-dismiss="modal" class="close"><span aria-hidden="true">×</span></button>' +
                                        '<h4 id="myModalLabel" class="modal-title">转发微博</h4>' +
                                    '</div>' +
                                    '<div class="modal-body">' +
                                        '<textarea id="reason" name="reason" style="width:100%;height:100px;" placeholder="请输入转发理由"></textarea>' +
                                    '</div>' +
                                    '<div class="modal-footer">' +
                                        '<button type="button" data-dismiss="modal" class="btn btn-default">取消</button>' +
                                        '<button type="button" class="btn btn-primary" id="btn_relay">转发</button>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
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
                     * 评论图层里的评论信息
                     */
                    '<div id="collapse'+i+'" role="tabpanel" aria-labelledby="headingOne" aria-expanded="false" >' +
                        '<div class="panel-body">' +
                            '<ul class="messages" id="comments_message">' +

                            '</ul>' +
                        '</div>' +
                    '</div>'
                );

                /**
                 * 转发按钮事件
                 */
                $('#btn_relay').click(function () {
                    /**
                     * 获取数据
                     */
                    var blog_content = $('#reason').val();
                    var relay_author = author;
                    var relay_title = title;
                    var relay_content = content;

                    if(null == blog_content || '' == blog_content ||
                        null == relay_author || '' == relay_author ||
                        null == relay_title || '' == relay_title ||
                        null == relay_content || '' == relay_content){

                        alert('参数不能为空');

                    }else {
                        /**
                         * 发起请求
                         */
                        window.location.href = "/forwardBlog?blog_content="+blog_content+
                            "&relay_author="+relay_author+"&relay_title="+relay_title+
                            "&relay_content="+relay_content;
                    }

                });


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
                    $('#div_relay').append(
                        '<ul class="messages">' +
                            '<li><img src="'+ relay_imageUrl +'" alt="Avatar" class="avatar" />' +
                                '<div class="message_wrapper">' +
                                    '<h4 class="heading"><a href="#" name="others">'+ relay_author +'</a></h4>' +
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
                        '</ul>'
                    );
                }

                /**
                 * 显示写评论文本框
                 */
                $('#comments_message').append(
                    '<li>' +
                        '<form class="form-horizontal form-label-left">' +
                            '<div class="input-group">' +
                                '<input type="text" class="form-control" placeholder="写点什么评论吧~" id="write_comment">' +
                                '<span class="input-group-btn">' +
                                    '<input type="button" class="btn btn-primary" disabled="true" id="btn_comment" value="评论"></input>' +
                                '</span>' +
                            '</div>' +
                        '</form>' +
                    '</li>'
                );

                /**
                 * 文本框输入事件
                 */
                $('#write_comment').bind('input propertychange',function () {
                    var len = $(this).val().length;
                    if(len == 0){
                        $('#btn_comment').attr('disabled',true);
                    }else {
                        $('#btn_comment').attr('disabled',false);
                    }
                });

                $('#btn_comment').click(function () {
                    var content = $('#write_comment').val();
                    window.location.href = '/commentBlog?comment_content='
                        + content + '&author=' + author + '&title=' + title;
                });

                /**
                 * 获取comments
                 * 显示评论信息
                 */
                var comments = data[i].comments;

                /**
                 * 遍历comments
                 * 得到每个author content createTime
                 * 返回数据
                 */
                for(var k = comments.length - 1; k >= 0; k--){
                    if(comments[k].author == customer){
                        $('#comments_message').append(
                            '<li><img src="'+ comments[k].imageUrl +'" alt="Avatar" class="avatar" />' +
                            '<div class="message_wrapper">' +
                            '<font style="color:#CD5C5C;">'+comments[k].author+'</font>:' +
                            '<font style="color:#696969;">'+comments[k].content+'</font>' +
                            '<br />' +
                            '<small>'+moment(comments[k].createTime).format('YYYY-MM-DD HH:mm:ss')+'</small>' +
                            '&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" name="btn_delComment">删除</a>' +
                            '<br />' +
                            '</div></li>'
                        );
                    }else {
                        $('#comments_message').append(
                            '<li><img src="'+ comments[k].imageUrl +'" alt="Avatar" class="avatar" />' +
                            '<div class="message_wrapper">' +
                            '<font style="color:#CD5C5C;">'+comments[k].author+'</font>:' +
                            '<font style="color:#696969;">'+comments[k].content+'</font>' +
                            '<br />' +
                            '<small>'+moment(comments[k].createTime).format('YYYY-MM-DD HH:mm:ss')+'</small>' +
                            '<br />' +
                            '</div></li>'
                        );
                    }


                }

                $('a[name="btn_delComment"]').click(function () {
                    var dom_div = $(this).parent();
                    var comment_author = dom_div.find('font').eq(0).text();
                    var comment_content = dom_div.find('font').eq(1).text();
                    var comment_createTime = dom_div.find('small').text();

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
                var s1=XMLHttpRequest;
                var s2=textStatus;
                var s3=errorThrown;
                alert("查询微博详情信息失败 : "+ errorThrown.toString());
            }
        });
    }

});
