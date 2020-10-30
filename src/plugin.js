import videojs from 'video.js';
import {version as VERSION} from '../package.json';

const Plugin = videojs.getPlugin('plugin');

// default options
/* eslint-disable */
const defaults = {
  position: 'bottom',
  isLive: false,
  visibleSlides: 6,
  slideinstances: [
    {
      slide_id: 1,
      timecode: 0,
      url: 'https://picsum.photos/id/1/1280/720'
    },
    {
      slide_id: 2,
      timecode: 5,
      url: 'https://picsum.photos/id/2/1280/720'
    },
    {
      slide_id: 3,
      timecode: 10,
      url: 'https://picsum.photos/id/3/1280/720'
    },
    {
      slide_id: 4,
      timecode: 15,
      url: 'https://picsum.photos/id/4/1280/720'
    },
    {
      slide_id: 5,
      timecode: 20,
      url: 'https://picsum.photos/id/5/1280/720'
    },
    {
      slide_id: 6,
      timecode: 25,
      url: 'https://picsum.photos/id/6/1280/720'
    },
    {
      slide_id: 7,
      timecode: 30,
      url: 'https://picsum.photos/id/7/1280/720'
    },
    {
      slide_id: 8,
      timecode: 35,
      url: 'https://picsum.photos/id/8/1280/720'
    },
    {
      slide_id: 9,
      timecode: 40,
      url: 'https://picsum.photos/id/9/1280/720'
    }
  ]
};
/* eslint-enable */

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
