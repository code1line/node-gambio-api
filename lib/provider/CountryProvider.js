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
 * Class representing a country provider.
 * @description Provides an API for countries.
 * @extends Provider
 */

var CountryProvider = function (_Provider) {
  _inherits(CountryProvider, _Provider);

  function CountryProvider() {
    _classCallCheck(this, CountryProvider);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(CountryProvider).apply(this, arguments));
  }

  _createClass(CountryProvider, [{
    key: '_getSuffix',

    /**
     * Returns the API endpoint URL suffix.
     * @return {String}
     * @private
     */
    value: function _getSuffix() {
      return '/countries';
    }

    /**
     * Returns country by provided country ID.
     * @param {Number} id Country ID.
     * @throws {Error} On missing or invalid argument.
     * @return {Promise}
     */

  }, {
    key: 'getById',
    value: function getById(id) {
      // Check ID.
      if (_lodash2.default.isNil(id) || !_lodash2.default.isInteger(id)) {
        throw new Error('ID is missing or invalid');
      }

      return this.dispatcher.get(this._getEndpointUrl() + '/' + id);
    }

    /**
     * Returns zones of a country by provided country ID.
     * @param {Number} id Country ID.
     * @throws {Error} On missing or invalid argument.
     * @return {Promise}
     */

  }, {
    key: 'getZonesByCountryId',
    value: function getZonesByCountryId(id) {
      // Check ID.
      if (_lodash2.default.isNil(id) || !_lodash2.default.isInteger(id)) {
        throw new Error('ID is missing or invalid');
      }

      return this.dispatcher.get(this._getEndpointUrl() + '/' + id + '/zones');
    }
  }]);

  return CountryProvider;
}(_Provider3.default);

exports.default = CountryProvider;