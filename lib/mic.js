var EventEmitter = require('eventemitter3');
var throttle = require('lodash-node/modern/functions/throttle');

var samples = 64;

var mic = module.exports = new EventEmitter();

mic.start = function () {
  if (!navigator.getUserMedia) navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

  if (!window.AudioContext) {
    if (!window.webkitAudioContext) {
      mic.emit('error', 'no audiocontext found');
    }
    window.AudioContext = window.webkitAudioContext;
  }

  navigator.getUserMedia({ audio: true }, gotStream, function onError (e) {
    mic.emit('error', e);
  });
};

function gotStream (stream) {
  var context = new AudioContext();
  var javascriptNode = context.createScriptProcessor(1024, 1, 1);
  javascriptNode.connect(context.destination);

  var analyser = context.createAnalyser();
  analyser.smoothingTimeConstant = 0.4; // easing from one value to another
  analyser.fftSize = samples * 2;

  var sourceNode = context.createMediaStreamSource(stream);
  sourceNode.connect(analyser);
  analyser.connect(javascriptNode);

  var array =  new Uint8Array(analyser.frequencyBinCount);
  javascriptNode.onaudioprocess = throttle(function() {
    analyser.getByteFrequencyData(array);
    mic.emit('audio', array);
  }, 60);
}
