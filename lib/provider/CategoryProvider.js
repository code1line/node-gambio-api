'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _Provider2 = require('./Provider');

var _Provider3 = _interopRequireDefault(_Provider2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Class representing a category provider.
 * @description Provides an API for categories.
 * @extends Provider
 */

var CategoryProvider = function (_Provider) {
  _inherits(CategoryProvider, _Provider);

  function CategoryProvider() {
    _classCallCheck(this, CategoryProvider);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(CategoryProvider).apply(this, arguments));
  }

  _createClass(CategoryProvider, [{
    key: '_getSuffix',

    /**
     * Returns the API endpoint URL suffix.
     * @return {String}
     * @private
     */
    value: function _getSuffix() {
      return '/categories';
    }

    /**
     * Create a new category.
     * @param  {Object} data Category data.
     * @throws {Error} On missing or invalid argument.
     * @return {Promise}
     */

  }, {
    key: 'create',
    value: function create(data) {
      // Check data.
      if (_lodash2.default.isNil(data) || !_lodash2.default.isObject(data)) {
        throw new Error('Category data object is missing or invalid');
      }

      return this.dispatcher.post(this._getEndpointUrl(), data);
    }
  }]);

  return CategoryProvider;
}(_Provider3.default);

exports.default = CategoryProvider;