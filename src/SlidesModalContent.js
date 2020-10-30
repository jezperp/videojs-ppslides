export default class SlidesModalContent {
  constructor(player, options) {
    this.player = player;

    this.options = options;

    this._createContent();
  }

  getContent() {
    return this.content;
  }

  get slidesOptions() {
    const {
      position,
      visibleSlides,
      slideinstances
    } = this.options;

    return {
      position,
      visibleSlides,
      slideinstances
    };
  }

  _createContent() {
    /* eslint-disable */
    const wrapper = document.createElement('div');
    /* eslint-enable */

    wrapper.innerHTML = `<div class="vjs-ppslides">
      <ul class="vjs-ppslides__container">
        ${this._getSlidesItems().join('')}
      </ul>
    </div>`;

    this.content = wrapper.firstChild;
  }

  _getSlidesItems() {
    const slidesItems = [];

    this.options.slideinstances.forEach((slide) => {
      slidesItems.push(`
        <li class="vjs-ppslides__slide${slide.active ? ' active' : ''}">
          <a href="#" class="vjs-ppslides__slide_link" data-timecode="${slide.timecode}" data-id="${slide.slide_id}">
            <img src="${slide.url}" class="vjs-ppslides__img">
          </a>
        </li>
      `);
    });

    return slidesItems;
  }
}
