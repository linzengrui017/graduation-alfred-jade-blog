
/**
 * 注册按钮
 * 前端校验
 */

$('#btn_reg').click(function () {
    var reg_username = $('#reg_username').val();
    if (reg_username.length > 20){
        alert('用户名的长度不能大于20');
        return false;
    }

    var reg_pwd1 = $('#reg_pwd1').val();
    var reg_pwd2 = $('#reg_pwd2').val();
    if (reg_pwd1.length > 20){
        alert('密码的长度不能大于20');
        return false;
    }
    if (reg_pwd1 != reg_pwd2){
        alert('两次输入的密码不一致');
        return false;
    }



});

/**
 * 手动打开 id = alert_modal 的模态框
 */
$('#alert_modal').modal('show');