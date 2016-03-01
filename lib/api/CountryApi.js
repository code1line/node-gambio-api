/**
 * @name Country API
 * @description Provides an API for countries.
 * @example
 * 	API.countries.getById(36)
 * 		.then(console.log)
 * 		.catch(console.error);
 */

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Api = require('./Api');
var Requester = require('./../Requester');
var Validator = require('./../Validator');

/**
 * Class representing a country API.
 * @extends Api
 */

var CountryApi = function (_Api) {
  _inherits(CountryApi, _Api);

  function CountryApi() {
    _classCallCheck(this, CountryApi);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(CountryApi).apply(this, arguments));
  }

  _createClass(CountryApi, [{
    key: '_getSuffix',

    /**
     * Returns the API endpoint URL suffix.
     *
     * @return {String}
     * @override
     * @private
     */
    value: function _getSuffix() {
      return '/countries';
    }

    /**
     * Returns country by provided country ID.
     *
     * @param {Number} id Country ID.
     *
     * @throws ArgumentNullError  If argument is missing.
     * @throws ArgumentError      If argument is invalid.
     *
     * @return {Promise}
     */

  }, {
    key: 'getById',
    value: function getById(id) {
      // Check argument.
      Validator.checkInteger(id, 'Country ID');

      // Compose URL.
      var url = this._getEndpointUrl() + ('/' + id);

      // Return request promise.
      return Requester.get(url, this._getAuth());
    }

    /**
     * Returns zones of a country by provided country ID.
     *
     * @param {Number} id Country ID.
     *
     * @throws ArgumentNullError  If argument is missing.
     * @throws ArgumentError      If argument is invalid.
     *
     * @return {Promise}
     */

  }, {
    key: 'getZonesByCountryId',
    value: function getZonesByCountryId(id) {
      // Check argument.
      Validator.checkInteger(id, 'Country ID');

      // Compose URL.
      var url = this._getEndpointUrl() + ('/' + id + '/zones');

      // Return request promise.
      return Requester.get(url, this._getAuth());
    }
  }]);

  return CountryApi;
}(Api);

// Export class.


module.exports = CountryApi;