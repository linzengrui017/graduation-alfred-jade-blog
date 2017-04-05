/**
 * 邮箱格式校验
 * @type {jQuery}
 */

$('#send').click(function () {
    var email = $('#email').val();


});

/**
 * 阻止浏览器重复提交
 * @type {boolean}
 */
var flag = false;
function checkSubmit() {
    if (flag == true) {
        return false;
    }
    flag = true;
    $('#form').submit();
}
