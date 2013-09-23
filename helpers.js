//     ristretto-url 0.0.1
//     (c) 2013 Sylvain Boucher
//     ristretto-url may be freely distributed under the MIT license.

exports.encode = function(id){
    var result = '';
    var codeSet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var base = codeSet.length;
    while (id > 0) {
    var result = codeSet.substr((id % base), 1) + result;
    id = Math.floor(id / base);
    }

    return result;
}
exports.decode = function(data){
    data = data.toString();
    var result = 0;
    var i = data.length;
    var codeSet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var base = codeSet.length;
    for (i; i; i--) {
        result += codeSet.indexOf(data.substr((-1 * (i - data.length)), 1)) * Math.pow(base, i - 1);
    }

    return result;
}
exports.isUrl = function(str) {
    return str.length < 2083 && str.match(/^(?!mailto:)(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?:(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[0-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))|localhost)(?::\d{2,5})?(?:\/[^\s]*)?$/i);
}
