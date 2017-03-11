/**
 * Created by lzr on 2017/3/7.
 */

/**
 * 异步查询数据库
 * 返回数据
 */

$(function () {

    var url = '/showBlogList';
    $.ajax({
        url: url,
        type: "post",
        dataType: "json",
        success:function(result){
            var data = result.data;

            var html = '';
            for(var i = 0; i < data.length; i++){
                /**
                 * 获取数据
                 * @type {*}
                 */
                var index = data[i]._id;
                var author = data[i].author;
                var title = data[i].title;
                var content = data[i].content;
                // var createTime = moment(data[i].createTime).format('YYYY-MM-DD HH:mm:ss');
                var comments = data[i].comments;
                var relayContent = data[i].relayContent;
                /**
                 * 返回视图
                 */
                html +=
                    '<tr role="row" class="odd">'+
                        '<td class="sorting_1">'+index+'</td>'+
                        '<td>'+author+'</td>'+
                        '<td>'+title+'</td>'+
                        '<td>'+content+'</td>'+
                        // '<td>'+comments+'</td>'+
                        // '<td>'+relayContent+'</td>'+
                        '<td>'+
                            '<button type="button" data-toggle="modal" data-target=".bs-example-modal-lg" class="btn btn-primary btn-xs"><i class="fa fa-folder"> 查看</i></button>'+
                            '<button type="button" data-toggle="modal" data-target=".bs-example-modal-sm" class="btn btn-info btn-xs"><i class="fa fa-pencil"> 修改</i></button>'+
                            '<button type="button" data-toggle="modal" data-target=".bs-example-modal" class="btn btn-danger btn-xs"><i class="fa fa-trash-o"></i> 删除</button>'+
                        '</td>'+
                    '</tr>';




            }

            $('#body').html(html);



        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            var s1=XMLHttpRequest;
            var s2=textStatus;
            var s3=errorThrown;
            alert("查询微博信息失败 : "+ errorThrown.toString());
        }
    });

});
