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

            // alert(data);

            /**
             * 创建dataTables
             */
            $('#datatable').DataTable({
                "bRetrieve": true, //solve the problem: Cannot reinitialize Data Table
                "processing": true,
                "serverSide": true,
                //"autoWidth": true,//自适应宽度
                "jQueryUI": false,
                responsive: true,
                "bSort": false, //是否支持排序功能
                "oLanguage": {
                    "sLengthMenu": "每页显示 _MENU_ 条记录",
                    "sZeroRecords": "对不起，查询不到任何相关数据",
                    "sInfo": "当前显示 _START_ 到 _END_ 条，共 _TOTAL_ 条记录",
                    "sInfoEmtpy": "找不到相关数据",
                    "sInfoFiltered": "数据表中共为 _MAX_ 条记录)",
                    "sProcessing": "正在加载中...",
                    "sSearch": "搜索",
                    "sUrl": "", //多语言配置文件，可将oLanguage的设置放在一个txt文件中，例：Javascript/datatable/dtCH.txt
                    "oPaginate": {
                        "sFirst": "第一页",
                        "sPrevious": " 上一页 ",
                        "sNext": " 下一页 ",
                        "sLast": " 最后一页 "
                    }
                }, //多语言配置
                "ajax": data,
                columns: [
                    { data: '_id' },
                    { data: 'author' },
                    { data: 'title' },
                    { data: 'content' },
                    // { data: 'createTime' },
                    { data: 'comments' },
                    { data: 'relayContent' },
                    { data: null }
                ],
                //设置定义列的初始属性
                "columnDefs": [{
                    "targets": -1,//编辑
                    "data": null,
                    "defaultContent": '<button type="button" data-toggle="modal" data-target=".bs-example-modal-lg" class="btn btn-primary btn-xs"><i class="fa fa-folder"> 查看</i></button>'+
                    '<button type="button" data-toggle="modal" data-target=".bs-example-modal-sm" class="btn btn-info btn-xs"><i class="fa fa-pencil"> 修改</i></button>'+
                    '<button type="button" data-toggle="modal" data-target=".bs-example-modal" class="btn btn-danger btn-xs"><i class="fa fa-trash-o"></i> 删除</button>'
                }]
            });

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            var s1=XMLHttpRequest;
            var s2=textStatus;
            var s3=errorThrown;
            alert("查询微博失败 : "+ errorThrown.toString());
        }
    });



});
