/**
 * 字数限制
 */
$("#description").on("input propertychange", function() {
    var description = $(this).val();
    var limit = 240;
    if (description.length > limit) {
        $(this).val(description.substring(0, limit));
    }

});