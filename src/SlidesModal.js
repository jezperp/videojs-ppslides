import videojs from 'video.js';
const ModalDialog = videojs.getComponent('ModalDialog');

/**
 * Slides modal.
 */
class SlidesModal extends ModalDialog {
  constructor(player, options) {
    super(player, options);

    this.playerClassName = 'vjs-videojs-modal_open';
  }

  open() {
    const player = this.player();

    player.addClass(this.playerClassName);
    super.open();
    player.trigger('slides:opened');
  }

  close() {
    const player = this.player();

    player.removeClass(this.playerClassName);
    super.close();
    player.trigger('slides:closed');
  }
}

export default SlidesModal;
