import videojs from 'video.js';
import {version as VERSION} from '../package.json';

const Plugin = videojs.getPlugin('plugin');

// default options
const defaults = {
  position: 'bottom',
  visibleSlides: 6,
  slideinstances: []
};

// components
import SlidesButton from './SlidesButton';
import SlidesOverlay from './SlidesOverlay';

/**
 * PowerPoint Slides Plugin.
 */
class Ppslides extends Plugin {
  constructor(player, options) {
    // the parent class will add player under this.player
    super(player);

    this.options = videojs.mergeOptions(defaults, options);

    this.player.ready(() => {
      this.player.addClass('vjs-ppslides');
      player.addClass('vjs-videojs-ppslides');
      player.getChild('controlBar').addChild('SlidesButton', this.options);
      player.addChild('SlidesOverlay', this.options);
    });
  }
}

// default values for the plugin's `state` object
Ppslides.defaultState = {};

// version
Ppslides.VERSION = VERSION;

// register plugin and components
videojs.registerComponent('SlidesButton', SlidesButton);
videojs.registerComponent('SlidesOverlay', SlidesOverlay);
videojs.registerPlugin('ppslides', Ppslides);

export default Ppslides;
