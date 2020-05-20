/*!
 * vue-loading-state v0.0.1
 * (c) Guillaume Denis <guillaume.denis@two-i.fr>
 * Released under the MIT License.
 */
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Vue = _interopDefault(require('vue'));
var mutations_types_js = require('@/store/mutations.types.js');

var REMOVE_LOADING = 'REMOVE_LOADING';
var SET_LOADING = 'SET_LOADING';

var actions = {
  resetState: function resetState(_ref) {//

    var commit = _ref.commit;
  },
  startLoading: function startLoading(_ref2, key) {
    var state = _ref2.state,
        commit = _ref2.commit;
    commit(SET_LOADING, {
      key: key,
      value: true
    });
  },
  stopLoading: function stopLoading(_ref3, key) {
    var commit = _ref3.commit;
    commit(SET_LOADING, {
      key: key,
      value: false
    });
  },
  toggleLoading: function toggleLoading(_ref4, key) {
    var state = _ref4.state,
        commit = _ref4.commit;
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

var _RESET_STATE$types$SE;
var mutations = (_RESET_STATE$types$SE = {}, _defineProperty(_RESET_STATE$types$SE, mutations_types_js.RESET_STATE, function (state) {
  Object.assign(state, getDefaultState());
}), _defineProperty(_RESET_STATE$types$SE, SET_LOADING, function (state, _ref) {
  var key = _ref.key,
      value = _ref.value;
  Vue.set(state.entities, key, value);
}), _defineProperty(_RESET_STATE$types$SE, REMOVE_LOADING, function (state, key) {
  Vue["delete"](state.entities, key);
}), _RESET_STATE$types$SE);

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

var createPluginMixin = (function (moduleName) {
  return {
    methods: {
      $isLoading: function $isLoading(key) {
        return this.$store.getters["".concat(moduleName, "/isLoading")](key);
      },
      $startLoading: function $startLoading(key) {
        return this.$store.dispatch("".concat(moduleName, "/startLoading"), key);
      },
      $endLoading: function $endLoading(key) {
        return this.$store.dispatch("".concat(moduleName, "/endLoading"), key);
      },
      $toggleLoading: function $toggleLoading(key) {
        return this.$store.dispatch("".concat(moduleName, "/toggleLoading"), key);
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
