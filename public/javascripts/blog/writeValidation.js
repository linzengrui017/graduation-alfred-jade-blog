/**
 * Created by lzr on 2017/3/20.
 */

/**
 * 发布微博文本框校验
 */
$('#btn_pubBlog').click(function () {
    var title = $('#title').val();
    var description = $('#description').val();
    if(title == '' || title == null){
        return false;
    }
    else if(description == '' || description == null){
        return false;
    }else {
        return true;
    }

});