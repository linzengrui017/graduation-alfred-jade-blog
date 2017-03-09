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
                                var s1=XMLHttpRequest;
                                var s2=textStatus;
                                var s3=errorThrown;
                                alert("error message : "+ errorThrown.toString());
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
                        '<li><img src="images/img.jpg" alt="Avatar" class="avatar" />' +
                            '<div class="message_wrapper">' +
                                '<h4 class="heading">'+ author +'</h4>' +
                                '<small>'+ createTime +'</small>' +
                                '<br />' +
                                '<br />' +
                                '<a href="#" name="title"><h4>'+
                                    title +
                                '</h4></a>'+
                                '<blockquote class="message">' +
                                    content +
                                '</blockquote>' +
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
                                        '<button type="button" class="btn btn-primary">转发</button>' +
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
                    '<div id="collapse'+i+'" role="tabpanel" aria-labelledby="headingOne" aria-expanded="false" style="height: 0px;" class="panel-collapse collapse">' +
                        '<div class="panel-body">' +
                            '<ul class="messages" id="comments_message">' +

                            '</ul>' +
                        '</div>' +
                    '</div>'
                );

                /**
                 * 显示写评论文本框
                 */
                $('#comments_message').append(
                    '<li>' +
                        '<form class="form-horizontal form-label-left">' +
                            '<div class="input-group">' +
                                '<input type="text" class="form-control" placeholder="写点什么评论吧~" id="write_comment">' +
                                '<span class="input-group-btn">' +
                                    '<button type="button" class="btn btn-primary" id="btn_comment">评论</button>' +
                                '</span>' +
                            '</div>' +
                        '</form>' +
                    '</li>'
                );

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
                // $('#comments_message').append(
                //     '<li><img src="images/img.jpg" alt="Avatar" class="avatar" />' +
                //         '<div class="message_wrapper">' +
                //         '<font style="color:#CD5C5C;">author:</font>' +
                //         '<font style="color:#696969;">content</font>' +
                //         '<br />' +
                //         '<small>createTime</small>' +
                //         '<br />' +
                //     '</div></li>'
                // );





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
