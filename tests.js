var assert = require('assert');
var isClap = require('./lib/is-clap');

describe('is-clap', function () {
  this.timeout(200);

  it('should not call decorated function on no value', function (done) {
    var fn = isClap(function(data) {
      assert.fail(data, '', 'Should not trigger');
    });

    fn();

    // Move to end of call stack / message queue.
    setTimeout(function(){
      done();
    }, 0);
  });

  it('should not call decorated function when all values are 0', function (done) {
    var fn = isClap(function(data) {
      assert.fail(data, '', 'Should not trigger');
    });

    fn(createArray(0));

    // Move to end of call stack / message queue.
    setTimeout(function(){
      done();
    }, 0);
  });

  it('should not call decorated function when all values are 0, no matter how many times its called', function (done) {
    var fn = isClap(function(data) {
      assert.fail(data, '', 'Should not trigger');
    });

    fn(createArray(0));
    fn(createArray(0));
    fn(createArray(0));
    fn(createArray(0));
    fn(createArray(0));

    // Move to end of call stack / message queue.
    setTimeout(function(){
      done();
    }, 0);
  });

  it('should not call decorated function when 20 values are over default threshold 200 but only for one iteration', function (done) {
    var fn = isClap(function(data) {
      assert.fail(data, '', 'Should not trigger');
    });

    fn(createArray(250));
    fn(createArray(250));
    fn(createArray(250));

    // Move to end of call stack / message queue.
    setTimeout(function(){
      done();
    }, 0);
  });

  it('should call decorated function when 20 values are over default threshold 200 over two iterations and then 0', function (done) {
    var fn = isClap(function () { done(); });
    fn(createArray(250));
    fn(createArray(250));
    fn(createArray(10));
  });

  it('should not call decorated function when 20 values are over default threshold 200 more than 3 iterations', function (done) {
    var fn = isClap(function(data) {
      assert.fail(data, '', 'Should not trigger');
    });

    fn(createArray(250));
    fn(createArray(250));
    fn(createArray(250));
    fn(createArray(250));
    fn(createArray(10));

    // Move to end of call stack / message queue.
    setTimeout(function(){
      done();
    }, 0);
  });

  it('should call decorated function when 20 values are over default threshold' +
   '200 after one iteration after more than 3 iterations without clap', function (done) {
    var fn = isClap(function(data) {
      assert.fail(data, '', 'Should not trigger');
    });

    fn(createArray(250));
    fn(createArray(250));
    fn(createArray(250));
    fn(createArray(250));
    fn(createArray(10));
    fn(createArray(250));
    fn(createArray(250));
    fn(createArray(10));

    // Move to end of call stack / message queue.
    setTimeout(function(){
      done();
    }, 0);
  });

  it('should be able to define own threshold', function (done) {
    var fn = isClap(100, function () { done(); });
    fn(createArray(101));
    fn(createArray(101));
    fn(createArray(10));
  });

});


function createArray (val, len, lenWithVal) {
  val = val || 300;
  len = len || 40;
  lenWithVal = lenWithVal || len;

  var arr = fill(lenWithVal, val);
  if (lenWithVal < len) {
    arr = arr.concat(fill(len - lenWithVal, 0));
  }
  return arr;
}

function fill (len, val) {
  return Array.apply(null, new Array(len)).map(Number.prototype.valueOf, val);
}
