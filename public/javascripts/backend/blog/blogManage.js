/**
 * Created by lzr on 2017/3/7.
 */

/**
 * 同步查询数据库
 * 返回数据
 */
var url = '/queryWeibo';
var data = [];
$.ajax({
    url: url,
    type: "post",
    dataType: "json",
    async:false,    //设置ajax请求是同步方式
    success:function(result){
        data = result.data;
        // alert('ajax:'+data);
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
        alert("查询微博信息失败 : "+ errorThrown.toString());
    }
});
// alert(data);
var table = $('#datatable').DataTable({
    bRetrieve: true,    //solve the problem: Cannot reinitialize Data Table
    data : data,        //数据源是对象数组 object array
    columns: [          //设置列匹配的键
        {
            "class":          'details-control',
            "orderable":      false,
            "data":           null,
            "defaultContent": ''
        },
        {"data" : '_id'},
        {"data" : 'author'},
        {"data": 'title'},
        {"data": 'createTime'},
        {"data": 'relayNum'},
        {"data" : null}
    ],
    order: [[1, 'asc']],
    columnDefs: [   //设置定义列的初始属性
        {
            targets: -1,//编辑
            data: null,
            defaultContent:
             '<button type="button" class="btn btn-danger btn-xs" name="btn_remove"><i class="fa fa-remove"> 删除</i></button>'
        },
        {
            targets: [4],   //第五列
            data: 'createTime',
            render: function (data, type, row) {
                var createTime = moment(data).format('YYYY-MM-DD HH:mm:ss');
                return '<span>'+ createTime +'</span>';
            }
        }
    ],
    oLanguage: { //国际化配置
        sProcessing : "正在获取数据，请稍后...",
        sLengthMenu : "显示 _MENU_ 条",
        sZeroRecords : "没有您要搜索的内容",
        sInfo : "从 _START_ 到  _END_ 条记录 总记录数为 _TOTAL_ 条",
        sInfoEmpty : "记录数为0",
        sInfoFiltered : "(全部记录数 _MAX_ 条)",
        sInfoPostFix : "",
        sSearch : "搜索",
        sUrl : "",
        oPaginate: {
            "sFirst" : "第一页",
            "sPrevious" : "上一页",
            "sNext" : "下一页",
            "sLast" : "最后一页"
        }
    },
    "bAutoWidth" : true //是否自适应宽度
});

/**
 * 删除操作
 */
$('button[name="btn_remove"]').click(function () {
    var tr = $(this).closest('tr');
    var id = tr.find('td').eq(1).text();
    $.ajax({
        url: '/delIllegalWeibo?_id='+id,
        type: "get",
        success:function(result){
            tr.remove();
            window.location.reload();
            // alert("success");
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("ajax请求删除微博操作失败 : XMLHttpRequest.readyState="+ XMLHttpRequest.readyState+ '\n' + textStatus.toString()+ '\n' + errorThrown.toString());
        }
    });
});

/**
 * 获得行的附加信息
 */
function format ( d ) {
    var comments_length = d.comments.length; //是否有评论
    if(comments_length == 0){
        return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
                    '<tr>'+
                        '<td style="width: 40px;">标题:</td>'+
                        '<td>'+d.title+'</td>'+
                    '</tr>'+
                    '<tr>'+
                        '<td>内容:</td>'+
                        '<td style="padding-top: 18px;">'+d.content+'</td>'+
                    '</tr>'+
                '</table>';
    }else if(comments_length > 0){
        var html = '';
        for(var i = 0; i < comments_length; i++){
            html +=
                d.comments[i].author+ ':'+
                d.comments[i].content + '&nbsp;&nbsp;&nbsp;&nbsp;' +
                moment(d.comments[i].createTime).format('YYYY-MM-DD HH:mm:ss')+'<br>';
        }
        return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
                    '<tr>'+
                        '<td style="width: 40px;">标题:</td>'+
                        '<td>'+d.title+'</td>'+
                    '</tr>'+
                    '<tr>'+
                        '<td>内容:</td>'+
                        '<td style="padding-top: 18px;">'+d.content+'</td>'+
                    '</tr>'+
                    '<tr>'+
                    '<td>评论:</td>'+
                    '<td style="padding-top: 18px;">'+ html +'</td>'+
                    '</tr>'+
                '</table>';
    }else {
        return '';
    }

}

$('#datatable tbody').on('click', 'td.details-control', function () {
    var tr = $(this).closest('tr');
    var row = table.row( tr );
    if ( row.child.isShown() ) {
        // This row is already open - close it
        row.child.hide();
        tr.removeClass('shown');
    }
    else {
        // Open this row
        row.child( format(row.data()) ).show();
        tr.addClass('shown');
    }
} );

