var filter = require('lodash-node/modern/collections/filter');

module.exports = function isClap(threshold, fn) {
  if (typeof threshold === 'function') {
    fn = threshold;
    threshold = 200;
  }
  var numberCrossingsInRow = 0;
  return function (data) {
    var clap = filter(data, function (amp) {
      return amp >= threshold;
    }).length >= 20;

    if (clap) numberCrossingsInRow++;

    if (!clap && numberCrossingsInRow > 0 && numberCrossingsInRow < 4 ) {
      numberCrossingsInRow = 0;
      return fn.call(this, data);
    }

    if (!clap && numberCrossingsInRow < 4 ) {
      numberCrossingsInRow = 0;
    }
  };
};
