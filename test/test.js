var Router = require('./../lib/routers.js');
var chai = require('chai')
  , chaiHTTP = require('chai-http')
  , expect = chai.expect;
var router = new Router();
var http = require('http');
chai.use(chaiHTTP);

describe('Router', function(){
  before((done) => {
    http.createServer(router.route())
      .listen(3000, () => {
        console.log('up on 3000');
      })
    done();
  });
  it('router methods should all be functions', function(done) {

    expect(typeof router.get).to.eql('function');
    expect(typeof router.post).to.eql('function');
    expect(typeof router.put).to.eql('function');
    expect(typeof router.patch).to.eql('function');
    expect(typeof router.delete).to.eql('function');

    done();
  });
  it('get should take get requests to a sample url', function(done) {
    router.get('/hello', (req, res) => {
      res.write('HELLO THERE\n');
      res.end();
    });
    chai.request('http://localhost:3000')
      .get('/hello')
      .end((err, res) => {
        expect(res.text).to.eql('HELLO THERE\n');
        done();
      })
  })
  it('post should post requests to a sample url', function(done) {
    router.post('/hello', (req, res) => {
      req.on('data', function(chunk) {
        var newUser = JSON.parse(chunk.toString()).newUser;
        res.write("Hello there, " + newUser + ".\n");
        res.end();
      })
    })
    chai.request('http://localhost:3000')
      .post('/hello')
      .send({newUser: 'Zach'})
      .end((err, res) => {
        expect(res.text).to.eql("Hello there, Zach.\n");
        done();
      })
  })
  it('put should post requests to a sample url', function(done) {
    router.put('/hello', (req, res) => {
      req.on('data', function(chunk) {
        var newUser = JSON.parse(chunk.toString()).newUser;
        res.write("Hello there, " + newUser + ".\n");
        res.end();
      })
    })
    chai.request('http://localhost:3000')
      .put('/hello')
      .send({newUser: 'Zachary'})
      .end((err, res) => {
        expect(res.text).to.eql("Hello there, Zachary.\n");
        done();
      })
  })
  it('patch should update requeststo a sample url', function(done) {
    router.patch('/hello', (req, res) => {
      req.on('data', function(chunk) {
        var newUser = JSON.parse(chunk.toString()).newUser;
        res.write("Hello there, " + newUser + ".\n");
        res.end();
      })
    })
    chai.request('http://localhost:3000')
      .patch('/hello')
      .send({newUser: 'Zachariah'})
      .end((err, res) => {
        expect(res.text).to.eql("Hello there, Zachariah.\n");
        done();
      })
  })

});
