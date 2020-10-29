/*! @name videojs-ppslides @version 0.0.5 @license MIT */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('video.js')) :
  typeof define === 'function' && define.amd ? define(['video.js'], factory) :
  (global = global || self, global.videojsPpslides = factory(global.videojs));
}(this, function (videojs) { 'use strict';

  videojs = videojs && videojs.hasOwnProperty('default') ? videojs['default'] : videojs;

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  var inheritsLoose = _inheritsLoose;

  var version = "0.0.5";

  var Button = videojs.getComponent('Button');
  /**
   * SlidesButton button.
   */

  var SlidesButton =
  /*#__PURE__*/
  function (_Button) {
    inheritsLoose(SlidesButton, _Button);

    function SlidesButton(player, options) {
      var _this;

      _this = _Button.call(this, player, options) || this;

      _this.addClass('vjs-menu-button');

      _this.addClass('vjs-slides-control');

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

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var createClass = _createClass;

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

      wrapper.innerHTML = "<div class=\"vjs-ppslides\">\n        " + this._getSlidesItems().join('') + "\n    </div>";
      this.content = wrapper.firstChild;
    };

    _proto._getSlidesItems = function _getSlidesItems() {
      var slidesItems = [];
      this.options.slideinstances.forEach(function (slide) {
        slidesItems.push("\n        <li class=\"vjs-ppslides__slide" + (slide.active ? ' active' : '') + "\">\n          <img src=\"" + slide.url + "\" data-id=\"" + slide.id + "\" class=\"vjs-ppslides__img\">\n        </li>\n      ");
      });
      return slidesItems;
    };

    createClass(SlidesModalContent, [{
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
    inheritsLoose(SlidesModal, _ModalDialog);

    function SlidesModal(player, options) {
      var _this;

      _this = _ModalDialog.call(this, player, options) || this;
      _this.playerClassName = 'vjs-videojs-modal_open';
      _this.playerClassNamePos = 'vjs-videojs-modal_' + options.position;
      return _this;
    }

    var _proto = SlidesModal.prototype;

    _proto.open = function open() {
      var player = this.player();
      player.addClass(this.playerClassName);
      player.addClass(this.playerClassNamePos);

      _ModalDialog.prototype.open.call(this);

      player.trigger('slides:opened');
    };

    _proto.close = function close() {
      var player = this.player();
      player.removeClass(this.playerClassName);
      player.removeClass(this.playerClassNamePos);

      _ModalDialog.prototype.close.call(this);

      player.trigger('slides:closed');
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
    inheritsLoose(SlidesOverlay, _Component);

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
        temporary: true,
        pauseOnOpen: false,
        position: this.options.position
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

  var defaults = {
    position: 'bottom',
    visibleSlides: 6,
    slideinstances: []
  }; // components
  /**
   * PowerPoint Slides Plugin.
   */

  var Ppslides =
  /*#__PURE__*/
  function (_Plugin) {
    inheritsLoose(Ppslides, _Plugin);

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

  return Ppslides;

}));
