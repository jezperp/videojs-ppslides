/*! @name videojs-ppslides @version 0.0.6 @license MIT */
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _inheritsLoose = _interopDefault(require('@babel/runtime/helpers/inheritsLoose'));
var videojs = _interopDefault(require('video.js'));
var _createClass = _interopDefault(require('@babel/runtime/helpers/createClass'));

var version = "0.0.6";

var Button = videojs.getComponent('Button');
/**
 * SlidesButton button.
 */

var SlidesButton =
/*#__PURE__*/
function (_Button) {
  _inheritsLoose(SlidesButton, _Button);

  function SlidesButton(player, options) {
    var _this;

    _this = _Button.call(this, player, options) || this;

    _this.addClass('vjs-menu-button');

    _this.addClass('vjs-slides-control');

    _this.addClass('vjs-icon-square');

    _this.addClass('vjs-icon-slides');

    _this.controlText(player.localize('Slides'));

    return _this;
  }

  var _proto = SlidesButton.prototype;

  _proto.handleClick = function handleClick() {
    this.player().getChild('SlidesOverlay').open();
  };

  return SlidesButton;
}(Button);

var SlidesModalContent =
/*#__PURE__*/
function () {
  function SlidesModalContent(player, options) {
    this.player = player;
    this.options = options;

    this._createContent();
  }

  var _proto = SlidesModalContent.prototype;

  _proto.getContent = function getContent() {
    return this.content;
  };

  _proto._createContent = function _createContent() {
    /* eslint-disable */
    var wrapper = document.createElement('div');
    /* eslint-enable */

    wrapper.innerHTML = "<div class=\"vjs-ppslides\">\n      <ul class=\"vjs-ppslides__container\">\n        " + this._getSlidesItems().join('') + "\n      </ul>\n    </div>";
    this.content = wrapper.firstChild;
  };

  _proto._getSlidesItems = function _getSlidesItems() {
    var slidesItems = [];
    this.options.slideinstances.forEach(function (slide) {
      slidesItems.push("\n        <li class=\"vjs-ppslides__slide" + (slide.active ? ' active' : '') + "\">\n          <a href=\"#\" class=\"vjs-ppslides__slide_link\" data-timecode=\"" + slide.timecode + "\" data-id=\"" + slide.slide_id + "\">\n            <img src=\"" + slide.url + "\" class=\"vjs-ppslides__img\">\n          </a>\n        </li>\n      ");
    });
    return slidesItems;
  };

  _createClass(SlidesModalContent, [{
    key: "slidesOptions",
    get: function get() {
      var _this$options = this.options,
          position = _this$options.position,
          visibleSlides = _this$options.visibleSlides,
          slideinstances = _this$options.slideinstances;
      return {
        position: position,
        visibleSlides: visibleSlides,
        slideinstances: slideinstances
      };
    }
  }]);

  return SlidesModalContent;
}();

var ModalDialog = videojs.getComponent('ModalDialog');
/**
 * Slides modal.
 */

var SlidesModal =
/*#__PURE__*/
function (_ModalDialog) {
  _inheritsLoose(SlidesModal, _ModalDialog);

  function SlidesModal(player, options) {
    var _this;

    _this = _ModalDialog.call(this, player, options) || this;
    _this.options = options;
    _this.playerClassName = 'vjs-videojs-modal_open';
    _this.playerClassNamePos = 'vjs-videojs-modal_' + _this.options.position;
    return _this;
  }

  var _proto = SlidesModal.prototype;

  _proto.open = function open() {
    var player = this.player();
    /* eslint-disable */

    var slideElements = document.getElementsByClassName('vjs-ppslides__slide_link');
    /* eslint-enable */

    player.addClass(this.playerClassName);
    player.addClass(this.playerClassNamePos);

    _ModalDialog.prototype.open.call(this);

    player.trigger('slides:opened');
    Array.from(slideElements).forEach(function (element) {
      var _this2 = this;

      if (this.options.isLive) {
        element.addEventListener('click', function (e) {
          var id = e.target.parentElement.getAttribute('data-id');

          _this2.zoom(id);
        });
      } else {
        element.addEventListener('click', function (e) {
          var time = e.target.parentElement.getAttribute('data-timecode');

          _this2.seek(time);
        });
      }
    }, this);
  };

  _proto.close = function close() {
    var player = this.player();
    player.removeClass(this.playerClassName);
    player.removeClass(this.playerClassNamePos);

    _ModalDialog.prototype.close.call(this);

    player.trigger('slides:closed');
  };

  _proto.seek = function seek(time) {
    var player = this.player();
    player.currentTime(time);
    player.play();
  };

  _proto.zoom = function zoom(id) {// const player = this.player();
  };

  return SlidesModal;
}(ModalDialog);

var Component = videojs.getComponent('Component');
/**
 * Slides overlay.
 */

var SlidesOverlay =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(SlidesOverlay, _Component);

  function SlidesOverlay(player, options) {
    var _this;

    _this = _Component.call(this, player, options) || this;
    _this.player = player;
    _this.options = options;
    return _this;
  }

  var _proto = SlidesOverlay.prototype;

  _proto._createModal = function _createModal() {
    var content = new SlidesModalContent(this.player, this.options).getContent();
    this.modal = new SlidesModal(this.player, {
      content: content,
      temporary: false,
      pauseOnOpen: false,
      position: this.options.position,
      isLive: this.options.isLive
    });
    this.el = this.modal.contentEl();
    this.player.addChild(this.modal);
  };

  _proto.open = function open() {
    this._createModal();

    this.modal.open();
  };

  return SlidesOverlay;
}(Component);

var Plugin = videojs.getPlugin('plugin'); // default options

/* eslint-disable */

var defaults = {
  position: 'bottom',
  isLive: false,
  visibleSlides: 6,
  slideinstances: [{
    slide_id: 1,
    timecode: 0,
    url: 'https://picsum.photos/id/1/1280/720'
  }, {
    slide_id: 2,
    timecode: 5,
    url: 'https://picsum.photos/id/2/1280/720'
  }, {
    slide_id: 3,
    timecode: 10,
    url: 'https://picsum.photos/id/3/1280/720'
  }, {
    slide_id: 4,
    timecode: 15,
    url: 'https://picsum.photos/id/4/1280/720'
  }, {
    slide_id: 5,
    timecode: 20,
    url: 'https://picsum.photos/id/5/1280/720'
  }, {
    slide_id: 6,
    timecode: 25,
    url: 'https://picsum.photos/id/6/1280/720'
  }, {
    slide_id: 7,
    timecode: 30,
    url: 'https://picsum.photos/id/7/1280/720'
  }, {
    slide_id: 8,
    timecode: 35,
    url: 'https://picsum.photos/id/8/1280/720'
  }, {
    slide_id: 9,
    timecode: 40,
    url: 'https://picsum.photos/id/9/1280/720'
  }]
};
/**
 * PowerPoint Slides Plugin.
 */

var Ppslides =
/*#__PURE__*/
function (_Plugin) {
  _inheritsLoose(Ppslides, _Plugin);

  function Ppslides(player, options) {
    var _this;

    // the parent class will add player under this.player
    _this = _Plugin.call(this, player) || this;
    _this.options = videojs.mergeOptions(defaults, options);

    _this.player.ready(function () {
      _this.player.addClass('vjs-ppslides');

      player.addClass('vjs-videojs-ppslides');
      player.getChild('controlBar').addChild('SlidesButton', _this.options);
      player.addChild('SlidesOverlay', _this.options);
    });

    return _this;
  }

  return Ppslides;
}(Plugin); // default values for the plugin's `state` object


Ppslides.defaultState = {}; // version

Ppslides.VERSION = version; // register plugin and components

videojs.registerComponent('SlidesButton', SlidesButton);
videojs.registerComponent('SlidesOverlay', SlidesOverlay);
videojs.registerPlugin('ppslides', Ppslides);

module.exports = Ppslides;
