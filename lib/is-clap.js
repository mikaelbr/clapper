var filter = require('lodash-node/modern/collections/filter');

var numTimes = 6;

module.exports = function isClap(threshold, fn) {
  if (typeof threshold === 'function') {
    fn = threshold;
    threshold = 150;
  }
  var numberCrossingsInRow = 0;
  return function (data) {
    var maybeClap = filter(data, function (amp) {
      return amp >= threshold;
    }).length >= 20;

    if (maybeClap) numberCrossingsInRow++;

    if (!maybeClap && numberCrossingsInRow > 0 && numberCrossingsInRow < numTimes) {
      numberCrossingsInRow = 0;
      return fn.call(this, data);
    }

    if (!maybeClap && numberCrossingsInRow < numTimes) {
      numberCrossingsInRow = 0;
    }
  };
};
