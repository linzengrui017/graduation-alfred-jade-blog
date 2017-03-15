/**
 * Created by lzr on 2017/3/15.
 */

/**
 * 显示好友
 */
/**
 * 同步查询数据库
 * 返回数据
 */
var url = '/queryFriends';
var data = [];
$.ajax({
    url: url,
    type: "post",
    dataType: "json",
    async:false,    //设置ajax请求是同步方式
    success:function(result){
        data = result.data;
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
        alert("查询用户信息失败 : "+ errorThrown.toString());
    }
});
// alert(data);
var table = $('#datatable').DataTable({
    bRetrieve: true,    //solve the problem: Cannot reinitialize Data Table
    data : data,        //数据源是对象数组 object array
    columns: [          //设置列匹配的键

        // {data : null},
        // {"data" : '_id'},
        {data : 'username'},
        {data: 'createTime'}
    ],
    order: [[1, 'asc']],
    columnDefs: [   //设置定义列的初始属性
        {
            targets: [-1],
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
    // "bProcessing" : true, //DataTables载入数据时，是否显示‘进度’提示
    // "bServerSide" : true, //是否启动服务器端数据导入
    // "bStateSave" : true, //是否打开客户端状态记录功能,此功能在ajax刷新纪录的时候不会将个性化设定回复为初始化状态
    // "bJQueryUI" : true, //是否使用 jQury的UI theme
    // "sScrollY" : 450, //DataTables的高
    // "sScrollX" : 820, //DataTables的宽
    // "aLengthMenu" : [20, 40, 60], //更改显示记录数选项
    // "iDisplayLength" : 40, //默认显示的记录数
    "bAutoWidth" : true, //是否自适应宽度
    // //"bScrollInfinite" : false, //是否启动初始化滚动条
    // "bScrollCollapse" : true, //是否开启DataTables的高度自适应，当数据条数不够分页数据条数的时候，插件高度是否随数据条数而改变
    // "bPaginate" : true, //是否显示（应用）分页器
    // "bInfo" : true, //是否显示页脚信息，DataTables插件左下角显示记录数
    // "sPaginationType" : "full_numbers", //详细分页组，可以支持直接跳转到某页
    // "bSort" : true, //是否启动各个字段的排序功能
    // "aaSorting" : [[1, "asc"]], //默认的排序方式，第2列，升序排列
    // "bFilter" : true, //是否启动过滤、搜索功能
});