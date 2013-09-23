//     ristretto-url 0.0.1
//     (c) 2013 Sylvain Boucher
//     ristretto-url may be freely distributed under the MIT license.

var config = {}
config.mongodb = {};
config.node = {};

config.appname = 'ristretto-url';
config.node.port = process.env.PORT || 3000;
config.siteurl = process.env.SITE_URL || 'http://localhost:3000';
config.mongodb.uri = process.env.MONGODB_URI || "mongodb://localhost/ristretto-url";

module.exports = config;
