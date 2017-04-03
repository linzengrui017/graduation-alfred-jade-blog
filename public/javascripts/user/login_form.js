
/**
 * 手动打开 id = alert_modal 的模态框
 */
$('#alert_modal').modal('show');

/**
 * 校验验证码
 * @type {jQuery}
 */
var code = $('#ccap').text().toLowerCase();

$('#btn_login').click(function () {
    var validate_code = $('#validate_code').val().toLowerCase();

    if(code != validate_code){
        alert("验证码不正确");
        return false;
    }
});
