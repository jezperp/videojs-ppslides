import videojs from 'video.js';
const ModalDialog = videojs.getComponent('ModalDialog');

/**
 * Slides modal.
 */
class SlidesModal extends ModalDialog {
  constructor(player, options) {
    super(player, options);

    this.options = options;

    this.playerClassName = 'vjs-videojs-modal_open';
    this.playerClassNamePos = 'vjs-videojs-modal_' + this.options.position;
  }

  open() {
    const player = this.player();
    /* eslint-disable */
    const slideElements = document.getElementsByClassName('vjs-ppslides__slide_link');
    /* eslint-enable */

    player.addClass(this.playerClassName);
    player.addClass(this.playerClassNamePos);

    super.open();

    player.trigger('slides:opened');

    Array.from(slideElements).forEach(function(element) {
      if (this.options.isLive) {
        element.addEventListener('click', (e) => {
          const id = e.target.parentElement.getAttribute('data-id');

          this.zoom(id);
        });
      } else {
        element.addEventListener('click', (e) => {
          const time = e.target.parentElement.getAttribute('data-timecode');

          this.seek(time);
        });
      }
    }, this);
  }

  close() {
    const player = this.player();

    player.removeClass(this.playerClassName);
    player.removeClass(this.playerClassNamePos);

    super.close();

    player.trigger('slides:closed');
  }

  seek(time) {
    const player = this.player();

    player.currentTime(time);
    player.play();
  }

  zoom(id) {
    // const player = this.player();

  }
}

export default SlidesModal;
