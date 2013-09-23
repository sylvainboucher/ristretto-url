//     ristretto-url 0.0.1
//     (c) 2013 Sylvain Boucher
//     ristretto-url may be freely distributed under the MIT license.

var mongoose = require('mongoose');
var helpers = require('./helpers');
var config = require('./config');

var urlsSchema = new mongoose.Schema({
    url: String,
    seq_id: Number
});
var countersSchema = new mongoose.Schema({
    _id: {type: String, default: "userid"},
    seq: Number
});

var Urls = mongoose.model('Urls', urlsSchema);
var Counters = mongoose.model('counters', countersSchema);

exports.redirectToUrl = function(request, response, next) {
    var hash = request.params.hash;
    Urls.findOne({seq_id: helpers.decode(hash)}, function(err, url) {
        if(err) return next(err);
        if(!url) return response.send(404);
        response.redirect(301, url.url);
    });
};
exports.addUrl = function(request, response) {
    var newUrl = request.body.url;
    if(!newUrl || !helpers.isUrl(newUrl)) {
        return response.send(400, 'Post a valid url in the format: {"url": "http://example.com"}');
    }
    Counters.findByIdAndUpdate('userid', {$inc: {seq: 1}}, {upsert: true},
      function(err, counters) {
        if(err) return next(err);
        var url = new Urls({url: newUrl, seq_id: counters.seq});
        url.save(function(err, result) {
            var output = {};
            output.url = result.url;
            output.shorturl = config.siteurl.replace(/\/+$/, "") + "/"  + helpers.encode(result.seq_id);
            response.send(output);
        });
    });
}
