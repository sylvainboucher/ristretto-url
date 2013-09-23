//     ristretto-url 0.0.1
//     (c) 2013 Sylvain Boucher
//     ristretto-url may be freely distributed under the MIT license.

var superagent = require('superagent');
var expect = require('expect.js');
var config = require('./config');

describe('ristretto-url API', function(){

    var shorturl;

    it('post object', function(done){
    superagent.post(config.siteurl)
      .send({"url": "http://example.com"})
      .end(function(e,res){
        expect(e).to.eql(null);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('url');
        expect(res.body).to.have.property('shorturl');
        expect(res.body.url).to.be('http://example.com');
        expect(res.body.shorturl).to.contain(config.siteurl);
        shorturl = res.body.shorturl;
        done();
      })
    })

    it('redirect to url', function(done){
    superagent.head(shorturl)
      .redirects(0)
      .end(function(e, res){
        expect(e).to.eql(null);
        expect(res.status).to.be(301);
        expect(res.header['location']).to.be('http://example.com');
        done();
      })
    })

})
