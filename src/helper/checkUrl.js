import _ from 'lodash';

/**
 * Validates an URL for its type and format validity.
 * @param {String} url Checked URL.
 * @throws {Error} On missing or invalid URL.
 */
function checkUrl(url) {
  /**
   * Regular expression to test the URL format against.
   *
   * Will match following cases:
   * - http://www.foufos.gr
   * - https://www.foufos.gr
   * - http://foufos.gr
   * - http://www.foufos.gr/kino
   * - http://www.t.co
   * - http://t.co
   * - http://werer.gr
   * - www.foufos.gr
   *
   * Will NOT match the following:
   * - www.foufos
   * - http://www.foufos
   * - http://foufos
   *
   * @see http://stackoverflow.com/a/17773849
   */
  const formatRegex = /https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,}/;

  // Check type.
  if (_.isNil(url) || !_.isString(url)) {
    throw new Error('Missing or invalid URL');
  }

  // Check format.
  if (_.isNull(url.match(formatRegex))) {
    throw new Error('Invalid URL format');
  }
}

export default checkUrl;
