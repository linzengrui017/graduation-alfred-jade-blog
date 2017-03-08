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
            var delTag = data[i].delTag;
            var modifyTime = data[i].modifyTime;
            var relayTag = data[i].relayTag;

            if(i == 0){
                $('#blogList').append(
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
                    '</div>'
                );
            }

            /**
             * 映射到视图
             */
            $('#blogList').append(
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
                    '<li><a style="color:red;" class="close-link"><i class="fa fa-trash"></i></a></li>'+
                    '</ul>'
                );
            }

            /**
             * 主体内容
             */
            $('#main_panel').append(
                '<ul class="messages">' +
                '<li><img src="images/img.jpg" alt="Avatar" class="avatar" />' +
                '<div class="message_wrapper">' +
                '<h4 class="heading">'+ author +'</h4>' +
                '<small>'+ createTime +'</small>' +
                '<br />' +
                '<br />' +
                '<a href="/toDetailBlogPage?title='+title+'&author='+author+'"><h4>'+
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
                '</div>'
            );

        }

    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
        var s1=XMLHttpRequest;
        var s2=textStatus;
        var s3=errorThrown;
        alert("error message : "+ errorThrown.toString());
    }
});