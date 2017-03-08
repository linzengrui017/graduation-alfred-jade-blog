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
                var delTag = data[i].delTag;
                var modifyTime = data[i].modifyTime;
                var relayTag = data[i].relayTag;


                /**
                 * 映射到视图
                 */
                $('#blogDetail').append(
                    '<div class="x_panel">' +
                        '<ul class="messages">' +
                            '<li><img src="images/img.jpg" alt="Avatar" class="avatar" />' +
                                '<div class="message_wrapper">' +
                                '<h4 class="heading">'+ author +'</h4>' +
                                '<small>'+ createTime +'</small>' +
                                '<br />' +
                                '<br />' +
                                '<a href="#"><h4>'+
                                    title +
                                '</h4></a>'+
                                '<blockquote class="message">' +
                                    content +
                                '</blockquote>' +
                                '<br />' +
                                '</div></li>' +
                        '</ul>' +
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
                        '<div id="collapse'+i+'" role="tabpanel" aria-labelledby="headingOne" aria-expanded="false" style="height: 0px;" class="panel-collapse collapse">' +
                            '<div class="panel-body">' +
                                '<ul class="messages">' +
                                        '<li><img src="images/img.jpg" alt="Avatar" class="avatar" />' +
                                        '<div class="message_wrapper">' +
                                        '<font style="color:#CD5C5C;">Desmond Davison:</font>' +
                                        '<font style="color:#696969;">comment this is a comment</font>' +
                                        '<br />' +
                                        '<small>2017.03.01</small>' +
                                        '<br />' +
                                    '</div></li>' +
                                    '<li><img src="images/img.jpg" alt="Avatar" class="avatar" />' +
                                        '<div class="message_wrapper">' +
                                            '<font style="color:#CD5C5C;">Desmond Davison:</font>' +
                                            '<font style="color:#696969;">comment this is a comment</font>' +
                                            '<br />' +
                                            '<small>2017.03.01</small>' +
                                            '<br />' +
                                    '</div></li>' +
                                '</ul>' +
                            '</div>' +
                        '</div>' +
                    '</div>'
                );


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
