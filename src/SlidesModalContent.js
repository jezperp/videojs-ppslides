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
        ${this._getSlidesItems().join('')}
    </div>`;

    this.content = wrapper.firstChild;
  }

  _getSlidesItems() {
    const slidesItems = [];

    this.options.slideinstances.forEach((slide) => {
      slidesItems.push(`
        <li class="vjs-ppslides__slide${slide.active ? ' active' : ''}">
          <img src="${slide.url}" data-id="${slide.id}" class="vjs-ppslides__img">
        </li>
      `);
    });

    return slidesItems;
  }
}
