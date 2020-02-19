# videojs-ppslides

Plugin with Power Point presentation slides inside videojs player

## Installation

```sh
npm install --save videojs-ppslides
```

## Usage

To include videojs-ppslides on your website or web application, use any of the following methods.

### `<script>` Tag

This is the simplest case. Get the script in whatever way you prefer and include the plugin _after_ you include [video.js][videojs], so that the `videojs` global is available.

```html
<script src="//path/to/video.min.js"></script>
<script src="//path/to/videojs-ppslides.min.js"></script>
<script>
  var player = videojs('my-video');

  player.ppslides();
</script>
```

### Browserify/CommonJS

When using with Browserify, install videojs-ppslides via npm and `require` the plugin as you would any other module.

```js
var videojs = require('video.js');

// The actual plugin function is exported by this module, but it is also
// attached to the `Player.prototype`; so, there is no need to assign it
// to a variable.
require('videojs-ppslides');

var player = videojs('my-video');

player.ppslides();
```

### RequireJS/AMD

When using with RequireJS (or another AMD library), get the script in whatever way you prefer and `require` the plugin as you normally would:

```js
require(['video.js', 'videojs-ppslides'], function(videojs) {
  var player = videojs('my-video');

  player.ppslides();
});
```

## License

MIT. Copyright (c) Jesper Pettersson &lt;jezperp@gmail.com&gt;


[videojs]: http://videojs.com/
