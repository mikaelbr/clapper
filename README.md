clapper [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]
===

> The javascript clapper. Do actions on applause and listen on claps on browser usermedia.

```js
var clapper = require('clapper');

clapper.on('clap', function () {
  console.log('clap-attack');
});

clapper.on('double-clap', function () {
  console.log('double-clap-attack');
});

clapper.on('error', function (err) {
  console.log('Couldn\'t connect, or some other error:', err);
});

// Start listening on the mic.
clapper.start();
```


## Testing the Code & Running it locally

Clone the repository and install dependencies

```shell
$ git clone https://github.com/mikaelbr/clapper.git
$ npm install
```

Build the example:

```shell
$ npm run build-example
```

Start a static server in the [./example/](./example) directory to run the example
from localhost (required for usermedia to work).

## Contribution

I'd love for everyone to test the code out and contribute by sending PRs.

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

[npm-url]: https://npmjs.org/package/clapper
[npm-image]: http://img.shields.io/npm/v/clapper.svg?style=flat
[npm-downloads]: http://img.shields.io/npm/dm/clapper.svg?style=flat

[travis-url]: http://travis-ci.org/mikaelbr/clapper
[travis-image]: http://img.shields.io/travis/mikaelbr/clapper.svg?style=flat
