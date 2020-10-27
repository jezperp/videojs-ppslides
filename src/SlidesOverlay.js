import SlidesModalContent from './SlidesModalContent';
import SlidesModal from './SlidesModal';
import videojs from 'video.js';
const Component = videojs.getComponent('Component');

/**
 * Slides overlay.
 */
class SlidesOverlay extends Component {
  constructor(player, options) {
    super(player, options);

    this.player = player;
    this.options = options;
  }

  _createModal() {
    const content = new SlidesModalContent(this.player, this.options).getContent();

    this.modal = new SlidesModal(this.player, {
      content,
      temporary: true
    });

    this.el = this.modal.contentEl();

    this.player.addChild(this.modal);
  }

  open() {
    this._createModal();
    this.modal.open();
  }
}

export default SlidesOverlay;
