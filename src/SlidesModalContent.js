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
      visibleSlides
    } = this.options;

    return {
      position,
      visibleSlides
    };
  }

  _createContent() {
    // const wrapper = document.createElement('div');
    const wrapper = '<div class="vjs-ppslides"></div>';

    wrapper.innerHTML = `<div class="vjs-ppslides__top hidden-sm">
                          <div class="vjs-ppslides__title">${this.player.localize('Slides')}</div>
                        </div>

                        <div class="vjs-ppslides__middle">

                        </div>

                        <div class="vjs-ppslides__bottom">

                        </div>`;

    this.content = wrapper;
  }

  _getSlidesItems() {
    const slidesItems = [];

    this.slides.forEach((slide) => {
      slidesItems.push(`
        <li class="vjs-ppslides__slide">
          <img src="${slide}" class="vjs-ppslides__img">
        </li>
      `);
    });

    return slidesItems;
  }
}
