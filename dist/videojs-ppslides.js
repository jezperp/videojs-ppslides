/*! @name videojs-ppslides @version 0.0.3 @license MIT */
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

  var version = "0.0.3";

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
      // const wrapper = document.createElement('div');
      var wrapper = '<div class="vjs-ppslides"></div>';
      wrapper.innerHTML = "<div class=\"vjs-ppslides__top hidden-sm\">\n                          <div class=\"vjs-ppslides__title\">" + this.player.localize('Slides') + "</div>\n                        </div>\n\n                        <div class=\"vjs-ppslides__middle\">\n\n                        </div>\n\n                        <div class=\"vjs-ppslides__bottom\">\n\n                        </div>";
      this.content = wrapper;
    };

    _proto._getSlidesItems = function _getSlidesItems() {
      var slidesItems = [];
      this.slides.forEach(function (slide) {
        slidesItems.push("\n        <li class=\"vjs-ppslides__slide\">\n          <img src=\"" + slide + "\" class=\"vjs-ppslides__img\">\n        </li>\n      ");
      });
      return slidesItems;
    };

    createClass(SlidesModalContent, [{
      key: "slidesOptions",
      get: function get() {
        var _this$options = this.options,
            position = _this$options.position,
            visibleSlides = _this$options.visibleSlides;
        return {
          position: position,
          visibleSlides: visibleSlides
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
      return _this;
    }

    var _proto = SlidesModal.prototype;

    _proto.open = function open() {
      var player = this.player();
      player.addClass(this.playerClassName);

      _ModalDialog.prototype.open.call(this);

      player.trigger('slides:opened');
    };

    _proto.close = function close() {
      var player = this.player();
      player.removeClass(this.playerClassName);

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
        temporary: true
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

  var Plugin = videojs.getPlugin('plugin'); // Default options for the plugin.

  var defaults = {
    position: 'bottom',
    visibleSlides: 6,
    slideinstances: []
  }; // Import components
  /**
   * An advanced Video.js plugin. For more information on the API
   *
   * See: https://blog.videojs.com/feature-spotlight-advanced-plugins/
   */

  var Ppslides =
  /*#__PURE__*/
  function (_Plugin) {
    inheritsLoose(Ppslides, _Plugin);

    /**
     * Create a Ppslides plugin instance.
     *
     * @param  {Player} player
     *         A Video.js Player instance.
     *
     * @param  {Object} [options]
     *         An optional options object.
     *
     *         While not a core part of the Video.js plugin architecture, a
     *         second argument of options is a convenient way to accept inputs
     *         from your plugin's caller.
     */
    function Ppslides(player, options) {
      var _this;

      // the parent class will add player under this.player
      _this = _Plugin.call(this, player) || this;
      _this.options = videojs.mergeOptions(defaults, options);

      _this.player.ready(function () {
        _this.player.addClass('vjs-ppslides');

        player.addClass('vjs-videojs-ppslides');
        player.getChild('controlBar').addChild('SlidesButton', options);
        player.addChild('SlidesOverlay', options);
      });

      return _this;
    }

    return Ppslides;
  }(Plugin); // Define default values for the plugin's `state` object here.


  Ppslides.defaultState = {}; // Include the version number.

  Ppslides.VERSION = version; // Register the plugin with video.js.

  videojs.registerComponent('SlidesButton', SlidesButton);
  videojs.registerComponent('SlidesOverlay', SlidesOverlay);
  videojs.registerPlugin('ppslides', Ppslides);

  return Ppslides;

}));
