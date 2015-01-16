var throttle = require('lodash-node/modern/functions/throttle');
var EventEmitter = require('eventemitter3');

var mic = require('./lib/mic');
var isClap = require('./lib/is-clap');

var threshold = 200;
var doubleClapMs = 500;

var clapper = module.exports = new EventEmitter();
module.exports.start = function (opts) {
  opts = opts || {};
  threshold = opts.threshold || threshold || 200;
  doubleClapMs = opts.doubleClickDelay || doubleClapMs || 200;
  mic.start();
};

mic.on('error', function (err) {
  clapper.emit('error', err);
});

var previousClapTime = 0;
mic.on('audio', isClap(threshold, throttle(function (clapEvent) {
  var isDouble = previousClapTime > ms() - doubleClapMs;
  clapper.emit(isDouble ? 'double-clap' : 'clap');
  previousClapTime = ms();
}, 300)));

function ms() {
  return new Date().getTime();
}
