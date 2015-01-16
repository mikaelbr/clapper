var clapper = require('../clapper');

var lamp = document.querySelector('.lamp');

clapper.on('clap', function () {
  console.log('clap-attack');
  lamp.classList.add('on');
});

clapper.on('double-clap', function () {
  console.log('double-clap-attack');
  lamp.classList.remove('on')
});

clapper.start();
