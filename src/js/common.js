//
//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//
//
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//
//               佛祖保佑         永无BUG
// 

//随机数
function random(min, max) {
    var num = max - min + 1;
    return Math.floor(Math.random() * num + min);
};

function GetQueryString(str, name) {
    str = decodeURIComponent(str);
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = str.substr(str.indexOf("?") + 1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
// 获取链接里面的参数
function getUrlQueryString(name) {
    return GetQueryString(window.location.href, name);
}
// 名字
function isName(str) {
    var rege = /^[\u4e00-\u9fa5_a-zA-Z]{1,20}$/;
    return rege.test(str)
}
//密码
function isPossword(str) {
    var rege = /^[a-zA-Z]\w{5,16}$/;
    return rege.test(str)
}
// 手机
function isMobile(str) {
    var rege = /^1[34578]\d{9}$/;
    return rege.test(str);
}
//email
function isEmail(str) {
    var rege = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return rege.test(str);
}
// ajax
function ajax(obj) {
    $.ajax({
        type: obj.type || "POST",
        dataType: obj.dataType || 'json',
        url: obj.url,
        success: obj.success,
        error: function (json) {
            console.log(json);
        }
    });
};

function activeJsBridge(_js, _param) {
    try {
        switch (_js) {
            case "buycard":
                window.active.type(_js, _param);
                break;
            case "goback":
                window.active.type(_js, _param);
                break;
            case "rules":
                window.active.type(_js, _param);
                break;
        }
    } catch (e) {
        window.location.href = "active:" + _js + "," + _param;
    }
}
prize_title = function (list) {
    if (typeof (prizeTitle) == "function") { // 苹果客户端
        prizeTitle(list);
    } else if (typeof (nativeGame) == "object" && typeof (nativeGame.prizeTitle) == "function") { // 安卓客户端
        nativeGame.prizeTitle(list);
    }
}
function trim(str) {
    return str.replace(/^\s+|\s+$/g, '');
}