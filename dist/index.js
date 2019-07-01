'use strict';

class LocalStorage {
  constructor(jest) {
    Object.defineProperty(this, 'getItem', {
      enumerable: false,
      value: jest.fn(key => this[key] || null)
    });
    Object.defineProperty(this, 'setItem', {
      enumerable: false,
      // not mentioned in the spec, but we must always coerce to a string
      value: jest.fn((key, val = '') => {
        this[key] = val + '';
      })
    });
    Object.defineProperty(this, 'removeItem', {
      enumerable: false,
      value: jest.fn(key => {
        delete this[key];
      })
    });
    Object.defineProperty(this, 'clear', {
      enumerable: false,
      value: jest.fn(() => {
        Object.keys(this).map(key => delete this[key]);
      })
    });
    Object.defineProperty(this, 'toString', {
      enumerable: false,
      value: jest.fn(() => {
        return '[object Storage]';
      })
    });
    Object.defineProperty(this, 'key', {
      enumerable: false,
      value: jest.fn(idx => Object.keys(this)[idx] || null)
    });
  } // end constructor


  get length() {
    return Object.keys(this).length;
  } // for backwards compatibility


  get __STORE__() {
    return this;
  }

}

const setup = () => {
  if (typeof global._localStorage !== 'undefined') {
    Object.defineProperty(global, '_localStorage', {
      value: new LocalStorage(jest),
      writable: false
    });
  } else {
    global.localStorage = new LocalStorage(jest);
  }

  if (typeof global._sessionStorage !== 'undefined') {
    Object.defineProperty(global, '_sessionStorage', {
      value: new LocalStorage(jest),
      writable: false
    });
  } else {
    global.sessionStorage = new LocalStorage(jest);
  }
};

setup();
//# sourceMappingURL=index.js.map
