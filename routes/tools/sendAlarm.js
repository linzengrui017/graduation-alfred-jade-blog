const AlarmClient = exports;

var request = require('request');

var DEFAULT_URL = 'http://120.25.242.85:8089/v1/alarm';

function send(code, content, level) {
    var option = {
        url: DEFAULT_URL,
        method: "POST",
        json: true,
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: {
            code: code,
            content: content,
            isTest: false,
            level: level
        }
    };
    request(option,function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log('request is success ');
        } else {
            console.log('request is error', error);
        }
    });
}

AlarmClient.debug = function (code, content) {
    send(code, content, "DEBUG");
};

AlarmClient.info = function (code, content) {
    send(code, content, "INFO");
};

AlarmClient.error = function (code, content) {
    send(code, content, "ERROR");
};

AlarmClient.debug(2, "愚人节快乐");