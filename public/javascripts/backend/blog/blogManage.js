/**
 * Created by lzr on 2017/3/7.
 */

/**
 * 同步查询数据库
 * 返回数据
 */
var url = '/showBlogList';
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
$('#datatable').dataTable({
    bRetrieve: true, //solve the problem: Cannot reinitialize Data Table
    data : data,
    columns: [
        {"data" : '_id'},
        {"data" : 'author'},
        {"data": 'title'},
        {"data": 'content'},
        // {"data": 'comments'},
        // {"data": 'relayContent'},
        // {"data": 'createTime'},
        {data : null}
    ]
});
