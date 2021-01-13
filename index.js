import _ from 'underscore';
import lscache from 'lscache';

export default class Cache {
  constructor(config) {
    this.service = lscache;
    this.default = {};
    let expires = 86400 * 30 * 3;
    if (config && config.expires) {
      expires = config.expires;
    }
    this.expires(expires);
  }

  expires(value) {
    if (value) {
      this.default.expires = value; 
    }
    return this.default.expires;
  }

  saveCache(key, value, expire) {
    return lscache.set(key, value, expire || this.default.expires);
  }

  loadCache(key, defaults) {
    let value = lscache.get(key);
    if (value === null && defaults !== undefined) {
      value = defaults;
    }
    return value;
  }

  load(key, defaults) {
    return this.loadCache(key, defaults);
  }

  remove(key) {
    return lscache.remove(key);
  }

  save(key, value, expire, exclude) {
    let data = value;
    if (_.isObject(value) && exclude) {
      data = _.omit(value, exclude);
    }
    this.saveCache(key, data, expire);
  }

  flash(key, expire, exclude) {
    const data = this.load(key);
    this.save(key, data, expire, exclude);
  }
}
