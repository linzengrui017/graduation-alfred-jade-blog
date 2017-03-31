/**
 * Created by lzr on 2017/3/30.
 */

/**
 * 导入模块
 */
var log4js = require("log4js");
/**
 * 导入json配置文件
 */
var log4js_config = require("../log4js.json");
/**
 * 配置路径
 */
log4js.configure(log4js_config);
/**
 * 导出函数
 * @returns {Logger}
 */
exports.getLogger = function (file) {
    return log4js.getLogger(file || 'normal');
};