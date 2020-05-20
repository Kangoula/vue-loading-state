/*!
 * vue-loading-state v0.0.2
 * (c) Guillaume Denis <guillaume.denis@two-i.fr>
 * Released under the MIT License.
 */
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Vue = _interopDefault(require('vue'));

var REMOVE_LOADING = 'REMOVE_LOADING';
var SET_LOADING = 'SET_LOADING';

var actions = {
  startLoading: function startLoading(_ref, key) {
    var state = _ref.state,
        commit = _ref.commit;
    commit(SET_LOADING, {
      key: key,
      value: true
    });
  },
  endLoading: function endLoading(_ref2, key) {
    var commit = _ref2.commit;
    commit(SET_LOADING, {
      key: key,
      value: false
    });
  },
  toggleLoading: function toggleLoading(_ref3, key) {
    var state = _ref3.state,
        commit = _ref3.commit;
    commit(SET_LOADING, {
      key: key,
      value: !state.entities[key]
    });
  }
};

var getters = {
  isLoading: function isLoading(state) {
    return function (key) {
      return Boolean(state.entities[key]);
    };
  }
};

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var getDefaultState = function getDefaultState() {
  return {
    entities: {}
  };
};
var state = getDefaultState();

var _types$SET_LOADING$ty;
var mutations = (_types$SET_LOADING$ty = {}, _defineProperty(_types$SET_LOADING$ty, SET_LOADING, function (state, _ref) {
  var key = _ref.key,
      value = _ref.value;
  Vue.set(state.entities, key, value);
}), _defineProperty(_types$SET_LOADING$ty, REMOVE_LOADING, function (state, key) {
  Vue["delete"](state.entities, key);
}), _types$SET_LOADING$ty);

var createVuexModule = (function (moduleName, store) {
  if (!store) {
    throw new Error('you must provide a Vuex store for this plugin to work');
  }

  var vuexModule = {
    namespaced: true,
    actions: actions,
    getters: getters,
    mutations: mutations,
    state: state
  };

  if (!store.hasModule(moduleName)) {
    store.registerModule(moduleName, vuexModule);
  }

  store.$isLoading = function (key) {
    return store.getters["".concat(moduleName, "/isLoading")](key);
  };

  store.$startLoading = function (key) {
    return store.dispatch("".concat(moduleName, "/startLoading"), key);
  };

  store.$endLoading = function (key) {
    return store.dispatch("".concat(moduleName, "/stopLoading"), key);
  };

  store.$toggleLoading = function (key) {
    return store.dispatch("".concat(moduleName, "/toggleLoading"), key);
  };
});

function _empty() {}

function _awaitIgnored(value, direct) {
  if (!direct) {
    return value && value.then ? value.then(_empty) : Promise.resolve();
  }
}

var createPluginMixin = (function (moduleName) {
  return {
    methods: {
      $isLoading: function $isLoading(key) {
        return this.$store.getters["".concat(moduleName, "/isLoading")](key);
      },
      $startLoading: function $startLoading(key) {
        try {
          var _this2 = this;

          return _awaitIgnored(_this2.$store.dispatch("".concat(moduleName, "/startLoading"), key));
        } catch (e) {
          return Promise.reject(e);
        }
      },
      $endLoading: function $endLoading(key) {
        try {
          var _this4 = this;

          return _awaitIgnored(_this4.$store.dispatch("".concat(moduleName, "/endLoading"), key));
        } catch (e) {
          return Promise.reject(e);
        }
      },
      $toggleLoading: function $toggleLoading(key) {
        try {
          var _this6 = this;

          return _awaitIgnored(_this6.$store.dispatch("".concat(moduleName, "/toggleLoading"), key));
        } catch (e) {
          return Promise.reject(e);
        }
      }
    }
  };
});

var createLoadingPlugin = function createLoadingPlugin(_ref) {
  var moduleName = _ref.moduleName;
  return function (Vue, _ref2) {
    var store = _ref2.store;
    createVuexModule(moduleName, store);
    Vue.mixin(createPluginMixin(moduleName));
  };
};

module.exports = createLoadingPlugin;
