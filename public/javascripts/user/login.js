/**
 * Created by lzr on 2017/2/23.
 */

/**
 * 弹出框默认隐藏
 */
// $("#alertPopover").hide();

/**
 * 给弹出框的关闭按钮添加事件
 */
$('#btn_alert').click(function () {
    $("#alertPopover").hide();
});

/**
 * 登录按钮
 * 前端校验
 */
$("#btn_login").click(function () {
    var login_username = $('#login_username').val();
    if(null == login_username || "" == login_username){
        $('#alertPopover').show();  //弹出提示框
        $('#message').text('用户名不能为空');     //设置提示信息
        return false;   //当click事件的返回值是false,阻止submit事件
    }
    if(login_username.length > 20){
        $('#alertPopover').show();
        $('#message').text('用户名的长度不能大于20');
        return false;
    }

    var login_password = $('#login_password').val();
    if(null == login_password || "" == login_password){
        $('#alertPopover').show();
        $('#message').text('密码不能为空');
        return false;
    }
    if(login_password.length > 20){
        $('#alertPopover').show();
        $('#message').text('密码的长度不能大于20');
        return false;
    }


});


/**
 * 注册按钮
 * 前端校验
 */

$('#btn_reg').click(function () {
    var reg_username = $('#reg_username').val();
    if (null == reg_username || "" == reg_username){
        $('#alertPopover').show();
        $('#message').text('用户名不能为空');
        return false;
    }
    if (reg_username.length > 20){
        $('#alertPopover').show();
        $('#message').text('用户名的长度不能大于20');
        return false;
    }

    var reg_pwd1 = $('#reg_pwd1').val();
    if (null == reg_pwd1 || "" == reg_pwd1){
        $('#alertPopover').show();
        $('#message').text('密码不能为空');
        return false;
    }

    var reg_pwd2 = $('#reg_pwd2').val();
    if (null == reg_pwd2 || "" == reg_pwd2){
        $('#alertPopover').show();
        $('#message').text('再次输入的密码不能为空');
        return false;
    }

    if (reg_pwd1 != reg_pwd2){
        $('#alertPopover').show();
        $('#message').text('两次输入的密码不一致');
        return false;
    }

    if (reg_pwd1.length > 20){
        $('#alertPopover').show();
        $('#message').text('密码的长度不能大于20');
        return false;
    }

});
