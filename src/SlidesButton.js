import videojs from 'video.js';
const Button = videojs.getComponent('Button');

/**
 * SlidesButton button.
 */
class SlidesButton extends Button {
  constructor(player, options) {
    super(player, options);

    this.addClass('vjs-menu-button');
    this.addClass('vjs-slides-control');
    this.addClass('vjs-icon-square');
    this.addClass('vjs-icon-slides');
    this.controlText(player.localize('Slides'));
  }

  handleClick() {
    this.player().getChild('SlidesOverlay').open();
  }
}

export default SlidesButton;
