import _ from 'underscore';
import lscache from 'lscache';

export default class Cache {
  constructor(config) {
    this.service = lscache;
    this.default = {
      expires: config.expires || 86400 * 30 * 3,
    };
  }

  saveCache(key, value, expire) {
    return lscache.set(key, value, expire || this.default.expires);
  }

  loadCache(key, defaults) {
    return lscache.get(key) || defaults || null;
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
