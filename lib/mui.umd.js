(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.MUI = {}));
}(this, (function (exports) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    var script = {
      name: "MDialog",
      props: {
        title: {
          type: String,
          default: "标题"
        },
        visible: {
          type: Boolean,
          default: false
        },
        showFooter: {
          type: Boolean,
          default: true
        },
        // 判断是否关闭，支持回调 next 关闭
        beforeClose: {
          type: Function,
          default: null
        }
      },
      data: function data() {
        return {
          show: false
        };
      },
      watch: {
        visible: function visible(nv) {
          this.show = nv;
        },
        show: function show(nv) {
          this.$emit("update:visible", nv);
        }
      },
      methods: {
        close: function close() {
          var _this = this;

          var beforeClose = this.$props.beforeClose;

          if (typeof beforeClose === "function") {
            beforeClose(function () {
              _this.show = false;
            });
            return;
          }

          this.show = false;
        },
        confirm: function confirm() {
          this.$emit("confirm");
        }
      }
    };

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function createCommonjsModule(fn, module) {
    	return module = { exports: {} }, fn(module, module.exports), module.exports;
    }

    var check = function (it) {
      return it && it.Math == Math && it;
    }; // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028


    var global_1 = // eslint-disable-next-line no-undef
    check(typeof globalThis == 'object' && globalThis) || check(typeof window == 'object' && window) || check(typeof self == 'object' && self) || check(typeof commonjsGlobal == 'object' && commonjsGlobal) || // eslint-disable-next-line no-new-func
    function () {
      return this;
    }() || Function('return this')();

    var fails = function (exec) {
      try {
        return !!exec();
      } catch (error) {
        return true;
      }
    };

    // Thank's IE8 for his funny defineProperty


    var descriptors = !fails(function () {
      return Object.defineProperty({}, 1, {
        get: function () {
          return 7;
        }
      })[1] != 7;
    });

    var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
    var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor; // Nashorn ~ JDK8 bug

    var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({
      1: 2
    }, 1); // `Object.prototype.propertyIsEnumerable` method implementation
    // https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable

    var f = NASHORN_BUG ? function propertyIsEnumerable(V) {
      var descriptor = getOwnPropertyDescriptor(this, V);
      return !!descriptor && descriptor.enumerable;
    } : nativePropertyIsEnumerable;

    var objectPropertyIsEnumerable = {
    	f: f
    };

    var createPropertyDescriptor = function (bitmap, value) {
      return {
        enumerable: !(bitmap & 1),
        configurable: !(bitmap & 2),
        writable: !(bitmap & 4),
        value: value
      };
    };

    var toString = {}.toString;

    var classofRaw = function (it) {
      return toString.call(it).slice(8, -1);
    };

    var split = ''.split; // fallback for non-array-like ES3 and non-enumerable old V8 strings

    var indexedObject = fails(function () {
      // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
      // eslint-disable-next-line no-prototype-builtins
      return !Object('z').propertyIsEnumerable(0);
    }) ? function (it) {
      return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
    } : Object;

    // `RequireObjectCoercible` abstract operation
    // https://tc39.github.io/ecma262/#sec-requireobjectcoercible
    var requireObjectCoercible = function (it) {
      if (it == undefined) throw TypeError("Can't call method on " + it);
      return it;
    };

    // toObject with fallback for non-array-like ES3 strings




    var toIndexedObject = function (it) {
      return indexedObject(requireObjectCoercible(it));
    };

    var isObject = function (it) {
      return typeof it === 'object' ? it !== null : typeof it === 'function';
    };

    // `ToPrimitive` abstract operation
    // https://tc39.github.io/ecma262/#sec-toprimitive
    // instead of the ES6 spec version, we didn't implement @@toPrimitive case
    // and the second argument - flag - preferred type is a string


    var toPrimitive = function (input, PREFERRED_STRING) {
      if (!isObject(input)) return input;
      var fn, val;
      if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
      if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
      if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
      throw TypeError("Can't convert object to primitive value");
    };

    var hasOwnProperty = {}.hasOwnProperty;

    var has = function (it, key) {
      return hasOwnProperty.call(it, key);
    };

    var document$1 = global_1.document; // typeof document.createElement is 'object' in old IE

    var EXISTS = isObject(document$1) && isObject(document$1.createElement);

    var documentCreateElement = function (it) {
      return EXISTS ? document$1.createElement(it) : {};
    };

    // Thank's IE8 for his funny defineProperty


    var ie8DomDefine = !descriptors && !fails(function () {
      return Object.defineProperty(documentCreateElement('div'), 'a', {
        get: function () {
          return 7;
        }
      }).a != 7;
    });

    var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor; // `Object.getOwnPropertyDescriptor` method
    // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor

    var f$1 = descriptors ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
      O = toIndexedObject(O);
      P = toPrimitive(P, true);
      if (ie8DomDefine) try {
        return nativeGetOwnPropertyDescriptor(O, P);
      } catch (error) {
        /* empty */
      }
      if (has(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
    };

    var objectGetOwnPropertyDescriptor = {
    	f: f$1
    };

    var anObject = function (it) {
      if (!isObject(it)) {
        throw TypeError(String(it) + ' is not an object');
      }

      return it;
    };

    var nativeDefineProperty = Object.defineProperty; // `Object.defineProperty` method
    // https://tc39.github.io/ecma262/#sec-object.defineproperty

    var f$2 = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
      anObject(O);
      P = toPrimitive(P, true);
      anObject(Attributes);
      if (ie8DomDefine) try {
        return nativeDefineProperty(O, P, Attributes);
      } catch (error) {
        /* empty */
      }
      if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
      if ('value' in Attributes) O[P] = Attributes.value;
      return O;
    };

    var objectDefineProperty = {
    	f: f$2
    };

    var createNonEnumerableProperty = descriptors ? function (object, key, value) {
      return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
    } : function (object, key, value) {
      object[key] = value;
      return object;
    };

    var setGlobal = function (key, value) {
      try {
        createNonEnumerableProperty(global_1, key, value);
      } catch (error) {
        global_1[key] = value;
      }

      return value;
    };

    var SHARED = '__core-js_shared__';
    var store = global_1[SHARED] || setGlobal(SHARED, {});
    var sharedStore = store;

    var functionToString = Function.toString; // this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper

    if (typeof sharedStore.inspectSource != 'function') {
      sharedStore.inspectSource = function (it) {
        return functionToString.call(it);
      };
    }

    var inspectSource = sharedStore.inspectSource;

    var WeakMap = global_1.WeakMap;
    var nativeWeakMap = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));

    var shared = createCommonjsModule(function (module) {
    (module.exports = function (key, value) {
      return sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {});
    })('versions', []).push({
      version: '3.8.1',
      mode:  'global',
      copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
    });
    });

    var id = 0;
    var postfix = Math.random();

    var uid = function (key) {
      return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
    };

    var keys = shared('keys');

    var sharedKey = function (key) {
      return keys[key] || (keys[key] = uid(key));
    };

    var hiddenKeys = {};

    var WeakMap$1 = global_1.WeakMap;
    var set, get, has$1;

    var enforce = function (it) {
      return has$1(it) ? get(it) : set(it, {});
    };

    var getterFor = function (TYPE) {
      return function (it) {
        var state;

        if (!isObject(it) || (state = get(it)).type !== TYPE) {
          throw TypeError('Incompatible receiver, ' + TYPE + ' required');
        }

        return state;
      };
    };

    if (nativeWeakMap) {
      var store$1 = sharedStore.state || (sharedStore.state = new WeakMap$1());
      var wmget = store$1.get;
      var wmhas = store$1.has;
      var wmset = store$1.set;

      set = function (it, metadata) {
        metadata.facade = it;
        wmset.call(store$1, it, metadata);
        return metadata;
      };

      get = function (it) {
        return wmget.call(store$1, it) || {};
      };

      has$1 = function (it) {
        return wmhas.call(store$1, it);
      };
    } else {
      var STATE = sharedKey('state');
      hiddenKeys[STATE] = true;

      set = function (it, metadata) {
        metadata.facade = it;
        createNonEnumerableProperty(it, STATE, metadata);
        return metadata;
      };

      get = function (it) {
        return has(it, STATE) ? it[STATE] : {};
      };

      has$1 = function (it) {
        return has(it, STATE);
      };
    }

    var internalState = {
      set: set,
      get: get,
      has: has$1,
      enforce: enforce,
      getterFor: getterFor
    };

    var redefine = createCommonjsModule(function (module) {
    var getInternalState = internalState.get;
    var enforceInternalState = internalState.enforce;
    var TEMPLATE = String(String).split('String');
    (module.exports = function (O, key, value, options) {
      var unsafe = options ? !!options.unsafe : false;
      var simple = options ? !!options.enumerable : false;
      var noTargetGet = options ? !!options.noTargetGet : false;
      var state;

      if (typeof value == 'function') {
        if (typeof key == 'string' && !has(value, 'name')) {
          createNonEnumerableProperty(value, 'name', key);
        }

        state = enforceInternalState(value);

        if (!state.source) {
          state.source = TEMPLATE.join(typeof key == 'string' ? key : '');
        }
      }

      if (O === global_1) {
        if (simple) O[key] = value;else setGlobal(key, value);
        return;
      } else if (!unsafe) {
        delete O[key];
      } else if (!noTargetGet && O[key]) {
        simple = true;
      }

      if (simple) O[key] = value;else createNonEnumerableProperty(O, key, value); // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
    })(Function.prototype, 'toString', function toString() {
      return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
    });
    });

    var path = global_1;

    var aFunction = function (variable) {
      return typeof variable == 'function' ? variable : undefined;
    };

    var getBuiltIn = function (namespace, method) {
      return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global_1[namespace]) : path[namespace] && path[namespace][method] || global_1[namespace] && global_1[namespace][method];
    };

    var ceil = Math.ceil;
    var floor = Math.floor; // `ToInteger` abstract operation
    // https://tc39.github.io/ecma262/#sec-tointeger

    var toInteger = function (argument) {
      return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
    };

    var min = Math.min; // `ToLength` abstract operation
    // https://tc39.github.io/ecma262/#sec-tolength

    var toLength = function (argument) {
      return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
    };

    var max = Math.max;
    var min$1 = Math.min; // Helper for a popular repeating case of the spec:
    // Let integer be ? ToInteger(index).
    // If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).

    var toAbsoluteIndex = function (index, length) {
      var integer = toInteger(index);
      return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
    };

    // `Array.prototype.{ indexOf, includes }` methods implementation


    var createMethod = function (IS_INCLUDES) {
      return function ($this, el, fromIndex) {
        var O = toIndexedObject($this);
        var length = toLength(O.length);
        var index = toAbsoluteIndex(fromIndex, length);
        var value; // Array#includes uses SameValueZero equality algorithm
        // eslint-disable-next-line no-self-compare

        if (IS_INCLUDES && el != el) while (length > index) {
          value = O[index++]; // eslint-disable-next-line no-self-compare

          if (value != value) return true; // Array#indexOf ignores holes, Array#includes - not
        } else for (; length > index; index++) {
          if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
        }
        return !IS_INCLUDES && -1;
      };
    };

    var arrayIncludes = {
      // `Array.prototype.includes` method
      // https://tc39.github.io/ecma262/#sec-array.prototype.includes
      includes: createMethod(true),
      // `Array.prototype.indexOf` method
      // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
      indexOf: createMethod(false)
    };

    var indexOf = arrayIncludes.indexOf;



    var objectKeysInternal = function (object, names) {
      var O = toIndexedObject(object);
      var i = 0;
      var result = [];
      var key;

      for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key); // Don't enum bug & hidden keys


      while (names.length > i) if (has(O, key = names[i++])) {
        ~indexOf(result, key) || result.push(key);
      }

      return result;
    };

    // IE8- don't enum bug keys
    var enumBugKeys = ['constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf'];

    var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype'); // `Object.getOwnPropertyNames` method
    // https://tc39.github.io/ecma262/#sec-object.getownpropertynames

    var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
      return objectKeysInternal(O, hiddenKeys$1);
    };

    var objectGetOwnPropertyNames = {
    	f: f$3
    };

    var f$4 = Object.getOwnPropertySymbols;

    var objectGetOwnPropertySymbols = {
    	f: f$4
    };

    // all object keys, includes non-enumerable and symbols


    var ownKeys = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
      var keys = objectGetOwnPropertyNames.f(anObject(it));
      var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
      return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
    };

    var copyConstructorProperties = function (target, source) {
      var keys = ownKeys(source);
      var defineProperty = objectDefineProperty.f;
      var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;

      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
      }
    };

    var replacement = /#|\.prototype\./;

    var isForced = function (feature, detection) {
      var value = data[normalize(feature)];
      return value == POLYFILL ? true : value == NATIVE ? false : typeof detection == 'function' ? fails(detection) : !!detection;
    };

    var normalize = isForced.normalize = function (string) {
      return String(string).replace(replacement, '.').toLowerCase();
    };

    var data = isForced.data = {};
    var NATIVE = isForced.NATIVE = 'N';
    var POLYFILL = isForced.POLYFILL = 'P';
    var isForced_1 = isForced;

    var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;










    /*
      options.target      - name of the target object
      options.global      - target is the global object
      options.stat        - export as static methods of target
      options.proto       - export as prototype methods of target
      options.real        - real prototype method for the `pure` version
      options.forced      - export even if the native feature is available
      options.bind        - bind methods to the target, required for the `pure` version
      options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
      options.unsafe      - use the simple assignment of property instead of delete + defineProperty
      options.sham        - add a flag to not completely full polyfills
      options.enumerable  - export as enumerable property
      options.noTargetGet - prevent calling a getter on target
    */


    var _export = function (options, source) {
      var TARGET = options.target;
      var GLOBAL = options.global;
      var STATIC = options.stat;
      var FORCED, target, key, targetProperty, sourceProperty, descriptor;

      if (GLOBAL) {
        target = global_1;
      } else if (STATIC) {
        target = global_1[TARGET] || setGlobal(TARGET, {});
      } else {
        target = (global_1[TARGET] || {}).prototype;
      }

      if (target) for (key in source) {
        sourceProperty = source[key];

        if (options.noTargetGet) {
          descriptor = getOwnPropertyDescriptor$1(target, key);
          targetProperty = descriptor && descriptor.value;
        } else targetProperty = target[key];

        FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced); // contained in target

        if (!FORCED && targetProperty !== undefined) {
          if (typeof sourceProperty === typeof targetProperty) continue;
          copyConstructorProperties(sourceProperty, targetProperty);
        } // add a flag to not completely full polyfills


        if (options.sham || targetProperty && targetProperty.sham) {
          createNonEnumerableProperty(sourceProperty, 'sham', true);
        } // extend global


        redefine(target, key, sourceProperty, options);
      }
    };

    // `IsArray` abstract operation
    // https://tc39.github.io/ecma262/#sec-isarray


    var isArray = Array.isArray || function isArray(arg) {
      return classofRaw(arg) == 'Array';
    };

    // `ToObject` abstract operation
    // https://tc39.github.io/ecma262/#sec-toobject


    var toObject = function (argument) {
      return Object(requireObjectCoercible(argument));
    };

    var createProperty = function (object, key, value) {
      var propertyKey = toPrimitive(key);
      if (propertyKey in object) objectDefineProperty.f(object, propertyKey, createPropertyDescriptor(0, value));else object[propertyKey] = value;
    };

    var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
      // Chrome 38 Symbol has incorrect toString conversion
      // eslint-disable-next-line no-undef
      return !String(Symbol());
    });

    var useSymbolAsUid = nativeSymbol // eslint-disable-next-line no-undef
    && !Symbol.sham // eslint-disable-next-line no-undef
    && typeof Symbol.iterator == 'symbol';

    var WellKnownSymbolsStore = shared('wks');
    var Symbol$1 = global_1.Symbol;
    var createWellKnownSymbol = useSymbolAsUid ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid;

    var wellKnownSymbol = function (name) {
      if (!has(WellKnownSymbolsStore, name)) {
        if (nativeSymbol && has(Symbol$1, name)) WellKnownSymbolsStore[name] = Symbol$1[name];else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
      }

      return WellKnownSymbolsStore[name];
    };

    var SPECIES = wellKnownSymbol('species'); // `ArraySpeciesCreate` abstract operation
    // https://tc39.github.io/ecma262/#sec-arrayspeciescreate

    var arraySpeciesCreate = function (originalArray, length) {
      var C;

      if (isArray(originalArray)) {
        C = originalArray.constructor; // cross-realm fallback

        if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;else if (isObject(C)) {
          C = C[SPECIES];
          if (C === null) C = undefined;
        }
      }

      return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
    };

    var engineUserAgent = getBuiltIn('navigator', 'userAgent') || '';

    var process = global_1.process;
    var versions = process && process.versions;
    var v8 = versions && versions.v8;
    var match, version;

    if (v8) {
      match = v8.split('.');
      version = match[0] + match[1];
    } else if (engineUserAgent) {
      match = engineUserAgent.match(/Edge\/(\d+)/);

      if (!match || match[1] >= 74) {
        match = engineUserAgent.match(/Chrome\/(\d+)/);
        if (match) version = match[1];
      }
    }

    var engineV8Version = version && +version;

    var SPECIES$1 = wellKnownSymbol('species');

    var arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
      // We can't use this feature detection in V8 since it causes
      // deoptimization and serious performance degradation
      // https://github.com/zloirock/core-js/issues/677
      return engineV8Version >= 51 || !fails(function () {
        var array = [];
        var constructor = array.constructor = {};

        constructor[SPECIES$1] = function () {
          return {
            foo: 1
          };
        };

        return array[METHOD_NAME](Boolean).foo !== 1;
      });
    };

    var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
    var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
    var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded'; // We can't use this feature detection in V8 since it causes
    // deoptimization and serious performance degradation
    // https://github.com/zloirock/core-js/issues/679

    var IS_CONCAT_SPREADABLE_SUPPORT = engineV8Version >= 51 || !fails(function () {
      var array = [];
      array[IS_CONCAT_SPREADABLE] = false;
      return array.concat()[0] !== array;
    });
    var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

    var isConcatSpreadable = function (O) {
      if (!isObject(O)) return false;
      var spreadable = O[IS_CONCAT_SPREADABLE];
      return spreadable !== undefined ? !!spreadable : isArray(O);
    };

    var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT; // `Array.prototype.concat` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.concat
    // with adding support of @@isConcatSpreadable and @@species

    _export({
      target: 'Array',
      proto: true,
      forced: FORCED
    }, {
      concat: function concat(arg) {
        // eslint-disable-line no-unused-vars
        var O = toObject(this);
        var A = arraySpeciesCreate(O, 0);
        var n = 0;
        var i, k, length, len, E;

        for (i = -1, length = arguments.length; i < length; i++) {
          E = i === -1 ? O : arguments[i];

          if (isConcatSpreadable(E)) {
            len = toLength(E.length);
            if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);

            for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
          } else {
            if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
            createProperty(A, n++, E);
          }
        }

        A.length = n;
        return A;
      }
    });

    function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
    /* server only */
    , shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
      if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
      } // Vue.extend constructor export interop.


      var options = typeof script === 'function' ? script.options : script; // render functions

      if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true; // functional template

        if (isFunctionalTemplate) {
          options.functional = true;
        }
      } // scopedId


      if (scopeId) {
        options._scopeId = scopeId;
      }

      var hook;

      if (moduleIdentifier) {
        // server build
        hook = function hook(context) {
          // 2.3 injection
          context = context || // cached call
          this.$vnode && this.$vnode.ssrContext || // stateful
          this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
          // 2.2 with runInNewContext: true

          if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
            context = __VUE_SSR_CONTEXT__;
          } // inject component styles


          if (style) {
            style.call(this, createInjectorSSR(context));
          } // register component module identifier for async chunk inference


          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        }; // used by ssr in case component is cached and beforeCreate
        // never gets called


        options._ssrRegister = hook;
      } else if (style) {
        hook = shadowMode ? function (context) {
          style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
        } : function (context) {
          style.call(this, createInjector(context));
        };
      }

      if (hook) {
        if (options.functional) {
          // register for functional component in vue file
          var originalRender = options.render;

          options.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context);
          };
        } else {
          // inject component registration as beforeCreate hook
          var existing = options.beforeCreate;
          options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }

      return script;
    }

    /* script */
    const __vue_script__ = script;

    /* template */
    var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('el-dialog',_vm._g(_vm._b({staticClass:"mui-dialog",attrs:{"visible":_vm.show,"title":_vm.title,"before-close":_vm.beforeClose},on:{"update:visible":function($event){_vm.show=$event;},"close":_vm.close}},'el-dialog',_vm.$attrs,false),_vm.$listeners),[_vm._t("default"),_vm._v(" "),(_vm.$slots.footer || _vm.showFooter)?_vm._t("footer",[_c('m-button',{attrs:{"width":88},on:{"click":_vm.close}},[_vm._v("取消")]),_vm._v(" "),_c('m-button',{attrs:{"type":"primary","width":88},on:{"click":_vm.confirm}},[_vm._v("\n      确定\n    ")])],{"slot":"footer"}):_vm._e()],2)};
    var __vue_staticRenderFns__ = [];

      /* style */
      const __vue_inject_styles__ = undefined;
      /* scoped */
      const __vue_scope_id__ = undefined;
      /* module identifier */
      const __vue_module_identifier__ = undefined;
      /* functional template */
      const __vue_is_functional_template__ = false;
      /* style inject */
      
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__ = /*#__PURE__*/normalizeComponent(
        { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
        __vue_inject_styles__,
        __vue_script__,
        __vue_scope_id__,
        __vue_is_functional_template__,
        __vue_module_identifier__,
        false,
        undefined,
        undefined,
        undefined
      );

    var Dialog = __assign(__assign({}, __vue_component__), { install: function (Vue) {
            Vue.component(__vue_component__.name, __vue_component__);
        } });

    var aPossiblePrototype = function (it) {
      if (!isObject(it) && it !== null) {
        throw TypeError("Can't set " + String(it) + ' as a prototype');
      }

      return it;
    };

    // `Object.setPrototypeOf` method
    // https://tc39.github.io/ecma262/#sec-object.setprototypeof
    // Works with __proto__ only. Old v8 can't work with null proto objects.

    /* eslint-disable no-proto */


    var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
      var CORRECT_SETTER = false;
      var test = {};
      var setter;

      try {
        setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
        setter.call(test, []);
        CORRECT_SETTER = test instanceof Array;
      } catch (error) {
        /* empty */
      }

      return function setPrototypeOf(O, proto) {
        anObject(O);
        aPossiblePrototype(proto);
        if (CORRECT_SETTER) setter.call(O, proto);else O.__proto__ = proto;
        return O;
      };
    }() : undefined);

    // makes subclassing work correct for wrapped built-ins


    var inheritIfRequired = function ($this, dummy, Wrapper) {
      var NewTarget, NewTargetPrototype;
      if ( // it can work only with native `setPrototypeOf`
      objectSetPrototypeOf && // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
      typeof (NewTarget = dummy.constructor) == 'function' && NewTarget !== Wrapper && isObject(NewTargetPrototype = NewTarget.prototype) && NewTargetPrototype !== Wrapper.prototype) objectSetPrototypeOf($this, NewTargetPrototype);
      return $this;
    };

    // `Object.keys` method
    // https://tc39.github.io/ecma262/#sec-object.keys


    var objectKeys = Object.keys || function keys(O) {
      return objectKeysInternal(O, enumBugKeys);
    };

    // `Object.defineProperties` method
    // https://tc39.github.io/ecma262/#sec-object.defineproperties


    var objectDefineProperties = descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
      anObject(O);
      var keys = objectKeys(Properties);
      var length = keys.length;
      var index = 0;
      var key;

      while (length > index) objectDefineProperty.f(O, key = keys[index++], Properties[key]);

      return O;
    };

    var html = getBuiltIn('document', 'documentElement');

    var GT = '>';
    var LT = '<';
    var PROTOTYPE = 'prototype';
    var SCRIPT = 'script';
    var IE_PROTO = sharedKey('IE_PROTO');

    var EmptyConstructor = function () {
      /* empty */
    };

    var scriptTag = function (content) {
      return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
    }; // Create object with fake `null` prototype: use ActiveX Object with cleared prototype


    var NullProtoObjectViaActiveX = function (activeXDocument) {
      activeXDocument.write(scriptTag(''));
      activeXDocument.close();
      var temp = activeXDocument.parentWindow.Object;
      activeXDocument = null; // avoid memory leak

      return temp;
    }; // Create object with fake `null` prototype: use iframe Object with cleared prototype


    var NullProtoObjectViaIFrame = function () {
      // Thrash, waste and sodomy: IE GC bug
      var iframe = documentCreateElement('iframe');
      var JS = 'java' + SCRIPT + ':';
      var iframeDocument;
      iframe.style.display = 'none';
      html.appendChild(iframe); // https://github.com/zloirock/core-js/issues/475

      iframe.src = String(JS);
      iframeDocument = iframe.contentWindow.document;
      iframeDocument.open();
      iframeDocument.write(scriptTag('document.F=Object'));
      iframeDocument.close();
      return iframeDocument.F;
    }; // Check for document.domain and active x support
    // No need to use active x approach when document.domain is not set
    // see https://github.com/es-shims/es5-shim/issues/150
    // variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
    // avoid IE GC bug


    var activeXDocument;

    var NullProtoObject = function () {
      try {
        /* global ActiveXObject */
        activeXDocument = document.domain && new ActiveXObject('htmlfile');
      } catch (error) {
        /* ignore */
      }

      NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
      var length = enumBugKeys.length;

      while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];

      return NullProtoObject();
    };

    hiddenKeys[IE_PROTO] = true; // `Object.create` method
    // https://tc39.github.io/ecma262/#sec-object.create

    var objectCreate = Object.create || function create(O, Properties) {
      var result;

      if (O !== null) {
        EmptyConstructor[PROTOTYPE] = anObject(O);
        result = new EmptyConstructor();
        EmptyConstructor[PROTOTYPE] = null; // add "__proto__" for Object.getPrototypeOf polyfill

        result[IE_PROTO] = O;
      } else result = NullProtoObject();

      return Properties === undefined ? result : objectDefineProperties(result, Properties);
    };

    // a string of all valid unicode whitespaces
    // eslint-disable-next-line max-len
    var whitespaces = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

    var whitespace = '[' + whitespaces + ']';
    var ltrim = RegExp('^' + whitespace + whitespace + '*');
    var rtrim = RegExp(whitespace + whitespace + '*$'); // `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation

    var createMethod$1 = function (TYPE) {
      return function ($this) {
        var string = String(requireObjectCoercible($this));
        if (TYPE & 1) string = string.replace(ltrim, '');
        if (TYPE & 2) string = string.replace(rtrim, '');
        return string;
      };
    };

    var stringTrim = {
      // `String.prototype.{ trimLeft, trimStart }` methods
      // https://tc39.github.io/ecma262/#sec-string.prototype.trimstart
      start: createMethod$1(1),
      // `String.prototype.{ trimRight, trimEnd }` methods
      // https://tc39.github.io/ecma262/#sec-string.prototype.trimend
      end: createMethod$1(2),
      // `String.prototype.trim` method
      // https://tc39.github.io/ecma262/#sec-string.prototype.trim
      trim: createMethod$1(3)
    };

    var getOwnPropertyNames = objectGetOwnPropertyNames.f;

    var getOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;

    var defineProperty = objectDefineProperty.f;

    var trim = stringTrim.trim;

    var NUMBER = 'Number';
    var NativeNumber = global_1[NUMBER];
    var NumberPrototype = NativeNumber.prototype; // Opera ~12 has broken Object#toString

    var BROKEN_CLASSOF = classofRaw(objectCreate(NumberPrototype)) == NUMBER; // `ToNumber` abstract operation
    // https://tc39.github.io/ecma262/#sec-tonumber

    var toNumber = function (argument) {
      var it = toPrimitive(argument, false);
      var first, third, radix, maxCode, digits, length, index, code;

      if (typeof it == 'string' && it.length > 2) {
        it = trim(it);
        first = it.charCodeAt(0);

        if (first === 43 || first === 45) {
          third = it.charCodeAt(2);
          if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
        } else if (first === 48) {
          switch (it.charCodeAt(1)) {
            case 66:
            case 98:
              radix = 2;
              maxCode = 49;
              break;
            // fast equal of /^0b[01]+$/i

            case 79:
            case 111:
              radix = 8;
              maxCode = 55;
              break;
            // fast equal of /^0o[0-7]+$/i

            default:
              return +it;
          }

          digits = it.slice(2);
          length = digits.length;

          for (index = 0; index < length; index++) {
            code = digits.charCodeAt(index); // parseInt parses a string to a first unavailable symbol
            // but ToNumber should return NaN if a string contains unavailable symbols

            if (code < 48 || code > maxCode) return NaN;
          }

          return parseInt(digits, radix);
        }
      }

      return +it;
    }; // `Number` constructor
    // https://tc39.github.io/ecma262/#sec-number-constructor


    if (isForced_1(NUMBER, !NativeNumber(' 0o1') || !NativeNumber('0b1') || NativeNumber('+0x1'))) {
      var NumberWrapper = function Number(value) {
        var it = arguments.length < 1 ? 0 : value;
        var dummy = this;
        return dummy instanceof NumberWrapper // check on 1..constructor(foo) case
        && (BROKEN_CLASSOF ? fails(function () {
          NumberPrototype.valueOf.call(dummy);
        }) : classofRaw(dummy) != NUMBER) ? inheritIfRequired(new NativeNumber(toNumber(it)), dummy, NumberWrapper) : toNumber(it);
      };

      for (var keys$1 = descriptors ? getOwnPropertyNames(NativeNumber) : ( // ES3:
      'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' + // ES2015 (in case, if modules with ES2015 Number statics required before):
      'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' + 'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger,' + // ESNext
      'fromString,range').split(','), j = 0, key; keys$1.length > j; j++) {
        if (has(NativeNumber, key = keys$1[j]) && !has(NumberWrapper, key)) {
          defineProperty(NumberWrapper, key, getOwnPropertyDescriptor$2(NativeNumber, key));
        }
      }

      NumberWrapper.prototype = NumberPrototype;
      NumberPrototype.constructor = NumberWrapper;
      redefine(global_1, NUMBER, NumberWrapper);
    }

    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    var script$1 = {
      name: "MButton",
      props: {
        width: {
          type: Number,
          default: null
        }
      },
      computed: {
        btnStyle: function btnStyle() {
          var ret = {};

          if (this.width) {
            ret["width"] = this.setToPx(this.width);
          }

          return ret;
        }
      },
      methods: {
        setToPx: function setToPx(value) {
          return value + "px";
        }
      }
    };

    /* script */
    const __vue_script__$1 = script$1;

    /* template */
    var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('el-button',_vm._g(_vm._b({staticClass:"mui-button",style:(_vm.btnStyle)},'el-button',_vm.$attrs,false),_vm.$listeners),[_vm._t("default")],2)};
    var __vue_staticRenderFns__$1 = [];

      /* style */
      const __vue_inject_styles__$1 = undefined;
      /* scoped */
      const __vue_scope_id__$1 = undefined;
      /* module identifier */
      const __vue_module_identifier__$1 = undefined;
      /* functional template */
      const __vue_is_functional_template__$1 = false;
      /* style inject */
      
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__$1 = /*#__PURE__*/normalizeComponent(
        { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
        __vue_inject_styles__$1,
        __vue_script__$1,
        __vue_scope_id__$1,
        __vue_is_functional_template__$1,
        __vue_module_identifier__$1,
        false,
        undefined,
        undefined,
        undefined
      );

    var Button = __assign(__assign({}, __vue_component__$1), { install: function (Vue) {
            Vue.component(__vue_component__$1.name, __vue_component__$1);
        } });

    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    var script$2 = {
      name: "MMultiTag",
      data: function data() {
        return {
          inputValue: ""
        };
      }
    };

    /* script */
    const __vue_script__$2 = script$2;

    /* template */
    var __vue_render__$2 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',{staticClass:"mui-multiTag"},[_c('el-dropdown',{attrs:{"trigger":"click","placement":"bottom-start"}},[_c('div',{staticClass:"mui-multiTag-box"},[_c('el-tag',{attrs:{"size":"small","type":"info","closable":""}},[_vm._v("小型标签")]),_vm._v(" "),_c('el-input',{staticClass:"mui-multiTag-input",attrs:{"placeholder":"请输入..."},model:{value:(_vm.inputValue),callback:function ($$v) {_vm.inputValue=$$v;},expression:"inputValue"}})],1),_vm._v(" "),_c('el-dropdown-menu',{attrs:{"slot":"dropdown"},slot:"dropdown"},[_c('el-dropdown-item',[_vm._v("黄金糕")])],1)],1)],1)};
    var __vue_staticRenderFns__$2 = [];

      /* style */
      const __vue_inject_styles__$2 = undefined;
      /* scoped */
      const __vue_scope_id__$2 = undefined;
      /* module identifier */
      const __vue_module_identifier__$2 = undefined;
      /* functional template */
      const __vue_is_functional_template__$2 = false;
      /* style inject */
      
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__$2 = /*#__PURE__*/normalizeComponent(
        { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
        __vue_inject_styles__$2,
        __vue_script__$2,
        __vue_scope_id__$2,
        __vue_is_functional_template__$2,
        __vue_module_identifier__$2,
        false,
        undefined,
        undefined,
        undefined
      );

    var MultiTag = __assign(__assign({}, __vue_component__$2), { install: function (Vue) {
            Vue.component(__vue_component__$2.name, __vue_component__$2);
        } });

    var arrayMethodIsStrict = function (METHOD_NAME, argument) {
      var method = [][METHOD_NAME];
      return !!method && fails(function () {
        // eslint-disable-next-line no-useless-call,no-throw-literal
        method.call(null, argument || function () {
          throw 1;
        }, 1);
      });
    };

    var defineProperty$1 = Object.defineProperty;
    var cache = {};

    var thrower = function (it) {
      throw it;
    };

    var arrayMethodUsesToLength = function (METHOD_NAME, options) {
      if (has(cache, METHOD_NAME)) return cache[METHOD_NAME];
      if (!options) options = {};
      var method = [][METHOD_NAME];
      var ACCESSORS = has(options, 'ACCESSORS') ? options.ACCESSORS : false;
      var argument0 = has(options, 0) ? options[0] : thrower;
      var argument1 = has(options, 1) ? options[1] : undefined;
      return cache[METHOD_NAME] = !!method && !fails(function () {
        if (ACCESSORS && !descriptors) return true;
        var O = {
          length: -1
        };
        if (ACCESSORS) defineProperty$1(O, 1, {
          enumerable: true,
          get: thrower
        });else O[1] = 1;
        method.call(O, argument0, argument1);
      });
    };

    var $indexOf = arrayIncludes.indexOf;





    var nativeIndexOf = [].indexOf;
    var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
    var STRICT_METHOD = arrayMethodIsStrict('indexOf');
    var USES_TO_LENGTH = arrayMethodUsesToLength('indexOf', {
      ACCESSORS: true,
      1: 0
    }); // `Array.prototype.indexOf` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.indexof

    _export({
      target: 'Array',
      proto: true,
      forced: NEGATIVE_ZERO || !STRICT_METHOD || !USES_TO_LENGTH
    }, {
      indexOf: function indexOf(searchElement
      /* , fromIndex = 0 */
      ) {
        return NEGATIVE_ZERO // convert -0 to +0
        ? nativeIndexOf.apply(this, arguments) || 0 : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : undefined);
      }
    });

    var aFunction$1 = function (it) {
      if (typeof it != 'function') {
        throw TypeError(String(it) + ' is not a function');
      }

      return it;
    };

    // `Array.prototype.{ reduce, reduceRight }` methods implementation


    var createMethod$2 = function (IS_RIGHT) {
      return function (that, callbackfn, argumentsLength, memo) {
        aFunction$1(callbackfn);
        var O = toObject(that);
        var self = indexedObject(O);
        var length = toLength(O.length);
        var index = IS_RIGHT ? length - 1 : 0;
        var i = IS_RIGHT ? -1 : 1;
        if (argumentsLength < 2) while (true) {
          if (index in self) {
            memo = self[index];
            index += i;
            break;
          }

          index += i;

          if (IS_RIGHT ? index < 0 : length <= index) {
            throw TypeError('Reduce of empty array with no initial value');
          }
        }

        for (; IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
          memo = callbackfn(memo, self[index], index, O);
        }

        return memo;
      };
    };

    var arrayReduce = {
      // `Array.prototype.reduce` method
      // https://tc39.github.io/ecma262/#sec-array.prototype.reduce
      left: createMethod$2(false),
      // `Array.prototype.reduceRight` method
      // https://tc39.github.io/ecma262/#sec-array.prototype.reduceright
      right: createMethod$2(true)
    };

    var engineIsNode = classofRaw(global_1.process) == 'process';

    var $reduce = arrayReduce.left;









    var STRICT_METHOD$1 = arrayMethodIsStrict('reduce');
    var USES_TO_LENGTH$1 = arrayMethodUsesToLength('reduce', {
      1: 0
    }); // Chrome 80-82 has a critical bug
    // https://bugs.chromium.org/p/chromium/issues/detail?id=1049982

    var CHROME_BUG = !engineIsNode && engineV8Version > 79 && engineV8Version < 83; // `Array.prototype.reduce` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.reduce

    _export({
      target: 'Array',
      proto: true,
      forced: !STRICT_METHOD$1 || !USES_TO_LENGTH$1 || CHROME_BUG
    }, {
      reduce: function reduce(callbackfn
      /* , initialValue */
      ) {
        return $reduce(this, callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
      }
    });

    function _extends() {
      return _extends = Object.assign || function (a) {
        for (var b, c = 1; c < arguments.length; c++) {
          for (var d in b = arguments[c], b) {
            Object.prototype.hasOwnProperty.call(b, d) && (a[d] = b[d]);
          }
        }

        return a;
      }, _extends.apply(this, arguments);
    }

    var normalMerge = ["attrs", "props", "domProps"],
        toArrayMerge = ["class", "style", "directives"],
        functionalMerge = ["on", "nativeOn"],
        mergeJsxProps = function mergeJsxProps(a) {
      return a.reduce(function (c, a) {
        for (var b in a) {
          if (!c[b]) c[b] = a[b];else if (-1 !== normalMerge.indexOf(b)) c[b] = _extends({}, c[b], a[b]);else if (-1 !== toArrayMerge.indexOf(b)) {
            var d = c[b] instanceof Array ? c[b] : [c[b]],
                e = a[b] instanceof Array ? a[b] : [a[b]];
            c[b] = d.concat(e);
          } else if (-1 !== functionalMerge.indexOf(b)) {
            for (var f in a[b]) {
              if (c[b][f]) {
                var g = c[b][f] instanceof Array ? c[b][f] : [c[b][f]],
                    h = a[b][f] instanceof Array ? a[b][f] : [a[b][f]];
                c[b][f] = g.concat(h);
              } else c[b][f] = a[b][f];
            }
          } else if ("hook" == b) for (var i in a[b]) {
            c[b][i] = c[b][i] ? mergeFn(c[b][i], a[b][i]) : a[b][i];
          } else c[b] = a[b];
        }

        return c;
      }, {});
    },
        mergeFn = function mergeFn(a, b) {
      return function () {
        a && a.apply(this, arguments), b && b.apply(this, arguments);
      };
    };

    var helper = mergeJsxProps;

    var nativeGetOwnPropertyNames = objectGetOwnPropertyNames.f;

    var toString$1 = {}.toString;
    var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];

    var getWindowNames = function (it) {
      try {
        return nativeGetOwnPropertyNames(it);
      } catch (error) {
        return windowNames.slice();
      }
    }; // fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window


    var f$5 = function getOwnPropertyNames(it) {
      return windowNames && toString$1.call(it) == '[object Window]' ? getWindowNames(it) : nativeGetOwnPropertyNames(toIndexedObject(it));
    };

    var objectGetOwnPropertyNamesExternal = {
    	f: f$5
    };

    var f$6 = wellKnownSymbol;

    var wellKnownSymbolWrapped = {
    	f: f$6
    };

    var defineProperty$2 = objectDefineProperty.f;

    var defineWellKnownSymbol = function (NAME) {
      var Symbol = path.Symbol || (path.Symbol = {});
      if (!has(Symbol, NAME)) defineProperty$2(Symbol, NAME, {
        value: wellKnownSymbolWrapped.f(NAME)
      });
    };

    var defineProperty$3 = objectDefineProperty.f;





    var TO_STRING_TAG = wellKnownSymbol('toStringTag');

    var setToStringTag = function (it, TAG, STATIC) {
      if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
        defineProperty$3(it, TO_STRING_TAG, {
          configurable: true,
          value: TAG
        });
      }
    };

    // optional / simple context binding


    var functionBindContext = function (fn, that, length) {
      aFunction$1(fn);
      if (that === undefined) return fn;

      switch (length) {
        case 0:
          return function () {
            return fn.call(that);
          };

        case 1:
          return function (a) {
            return fn.call(that, a);
          };

        case 2:
          return function (a, b) {
            return fn.call(that, a, b);
          };

        case 3:
          return function (a, b, c) {
            return fn.call(that, a, b, c);
          };
      }

      return function ()
      /* ...args */
      {
        return fn.apply(that, arguments);
      };
    };

    var push = [].push; // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterOut }` methods implementation

    var createMethod$3 = function (TYPE) {
      var IS_MAP = TYPE == 1;
      var IS_FILTER = TYPE == 2;
      var IS_SOME = TYPE == 3;
      var IS_EVERY = TYPE == 4;
      var IS_FIND_INDEX = TYPE == 6;
      var IS_FILTER_OUT = TYPE == 7;
      var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
      return function ($this, callbackfn, that, specificCreate) {
        var O = toObject($this);
        var self = indexedObject(O);
        var boundFunction = functionBindContext(callbackfn, that, 3);
        var length = toLength(self.length);
        var index = 0;
        var create = specificCreate || arraySpeciesCreate;
        var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_OUT ? create($this, 0) : undefined;
        var value, result;

        for (; length > index; index++) if (NO_HOLES || index in self) {
          value = self[index];
          result = boundFunction(value, index, O);

          if (TYPE) {
            if (IS_MAP) target[index] = result; // map
            else if (result) switch (TYPE) {
                case 3:
                  return true;
                // some

                case 5:
                  return value;
                // find

                case 6:
                  return index;
                // findIndex

                case 2:
                  push.call(target, value);
                // filter
              } else switch (TYPE) {
                case 4:
                  return false;
                // every

                case 7:
                  push.call(target, value);
                // filterOut
              }
          }
        }

        return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
      };
    };

    var arrayIteration = {
      // `Array.prototype.forEach` method
      // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
      forEach: createMethod$3(0),
      // `Array.prototype.map` method
      // https://tc39.github.io/ecma262/#sec-array.prototype.map
      map: createMethod$3(1),
      // `Array.prototype.filter` method
      // https://tc39.github.io/ecma262/#sec-array.prototype.filter
      filter: createMethod$3(2),
      // `Array.prototype.some` method
      // https://tc39.github.io/ecma262/#sec-array.prototype.some
      some: createMethod$3(3),
      // `Array.prototype.every` method
      // https://tc39.github.io/ecma262/#sec-array.prototype.every
      every: createMethod$3(4),
      // `Array.prototype.find` method
      // https://tc39.github.io/ecma262/#sec-array.prototype.find
      find: createMethod$3(5),
      // `Array.prototype.findIndex` method
      // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
      findIndex: createMethod$3(6),
      // `Array.prototype.filterOut` method
      // https://github.com/tc39/proposal-array-filtering
      filterOut: createMethod$3(7)
    };

    var $forEach = arrayIteration.forEach;

    var HIDDEN = sharedKey('hidden');
    var SYMBOL = 'Symbol';
    var PROTOTYPE$1 = 'prototype';
    var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
    var setInternalState = internalState.set;
    var getInternalState = internalState.getterFor(SYMBOL);
    var ObjectPrototype = Object[PROTOTYPE$1];
    var $Symbol = global_1.Symbol;
    var $stringify = getBuiltIn('JSON', 'stringify');
    var nativeGetOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
    var nativeDefineProperty$1 = objectDefineProperty.f;
    var nativeGetOwnPropertyNames$1 = objectGetOwnPropertyNamesExternal.f;
    var nativePropertyIsEnumerable$1 = objectPropertyIsEnumerable.f;
    var AllSymbols = shared('symbols');
    var ObjectPrototypeSymbols = shared('op-symbols');
    var StringToSymbolRegistry = shared('string-to-symbol-registry');
    var SymbolToStringRegistry = shared('symbol-to-string-registry');
    var WellKnownSymbolsStore$1 = shared('wks');
    var QObject = global_1.QObject; // Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173

    var USE_SETTER = !QObject || !QObject[PROTOTYPE$1] || !QObject[PROTOTYPE$1].findChild; // fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687

    var setSymbolDescriptor = descriptors && fails(function () {
      return objectCreate(nativeDefineProperty$1({}, 'a', {
        get: function () {
          return nativeDefineProperty$1(this, 'a', {
            value: 7
          }).a;
        }
      })).a != 7;
    }) ? function (O, P, Attributes) {
      var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor$1(ObjectPrototype, P);
      if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
      nativeDefineProperty$1(O, P, Attributes);

      if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
        nativeDefineProperty$1(ObjectPrototype, P, ObjectPrototypeDescriptor);
      }
    } : nativeDefineProperty$1;

    var wrap = function (tag, description) {
      var symbol = AllSymbols[tag] = objectCreate($Symbol[PROTOTYPE$1]);
      setInternalState(symbol, {
        type: SYMBOL,
        tag: tag,
        description: description
      });
      if (!descriptors) symbol.description = description;
      return symbol;
    };

    var isSymbol = useSymbolAsUid ? function (it) {
      return typeof it == 'symbol';
    } : function (it) {
      return Object(it) instanceof $Symbol;
    };

    var $defineProperty = function defineProperty(O, P, Attributes) {
      if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
      anObject(O);
      var key = toPrimitive(P, true);
      anObject(Attributes);

      if (has(AllSymbols, key)) {
        if (!Attributes.enumerable) {
          if (!has(O, HIDDEN)) nativeDefineProperty$1(O, HIDDEN, createPropertyDescriptor(1, {}));
          O[HIDDEN][key] = true;
        } else {
          if (has(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
          Attributes = objectCreate(Attributes, {
            enumerable: createPropertyDescriptor(0, false)
          });
        }

        return setSymbolDescriptor(O, key, Attributes);
      }

      return nativeDefineProperty$1(O, key, Attributes);
    };

    var $defineProperties = function defineProperties(O, Properties) {
      anObject(O);
      var properties = toIndexedObject(Properties);
      var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
      $forEach(keys, function (key) {
        if (!descriptors || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
      });
      return O;
    };

    var $create = function create(O, Properties) {
      return Properties === undefined ? objectCreate(O) : $defineProperties(objectCreate(O), Properties);
    };

    var $propertyIsEnumerable = function propertyIsEnumerable(V) {
      var P = toPrimitive(V, true);
      var enumerable = nativePropertyIsEnumerable$1.call(this, P);
      if (this === ObjectPrototype && has(AllSymbols, P) && !has(ObjectPrototypeSymbols, P)) return false;
      return enumerable || !has(this, P) || !has(AllSymbols, P) || has(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
    };

    var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
      var it = toIndexedObject(O);
      var key = toPrimitive(P, true);
      if (it === ObjectPrototype && has(AllSymbols, key) && !has(ObjectPrototypeSymbols, key)) return;
      var descriptor = nativeGetOwnPropertyDescriptor$1(it, key);

      if (descriptor && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) {
        descriptor.enumerable = true;
      }

      return descriptor;
    };

    var $getOwnPropertyNames = function getOwnPropertyNames(O) {
      var names = nativeGetOwnPropertyNames$1(toIndexedObject(O));
      var result = [];
      $forEach(names, function (key) {
        if (!has(AllSymbols, key) && !has(hiddenKeys, key)) result.push(key);
      });
      return result;
    };

    var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
      var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
      var names = nativeGetOwnPropertyNames$1(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
      var result = [];
      $forEach(names, function (key) {
        if (has(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has(ObjectPrototype, key))) {
          result.push(AllSymbols[key]);
        }
      });
      return result;
    }; // `Symbol` constructor
    // https://tc39.github.io/ecma262/#sec-symbol-constructor


    if (!nativeSymbol) {
      $Symbol = function Symbol() {
        if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
        var description = !arguments.length || arguments[0] === undefined ? undefined : String(arguments[0]);
        var tag = uid(description);

        var setter = function (value) {
          if (this === ObjectPrototype) setter.call(ObjectPrototypeSymbols, value);
          if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
          setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
        };

        if (descriptors && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, {
          configurable: true,
          set: setter
        });
        return wrap(tag, description);
      };

      redefine($Symbol[PROTOTYPE$1], 'toString', function toString() {
        return getInternalState(this).tag;
      });
      redefine($Symbol, 'withoutSetter', function (description) {
        return wrap(uid(description), description);
      });
      objectPropertyIsEnumerable.f = $propertyIsEnumerable;
      objectDefineProperty.f = $defineProperty;
      objectGetOwnPropertyDescriptor.f = $getOwnPropertyDescriptor;
      objectGetOwnPropertyNames.f = objectGetOwnPropertyNamesExternal.f = $getOwnPropertyNames;
      objectGetOwnPropertySymbols.f = $getOwnPropertySymbols;

      wellKnownSymbolWrapped.f = function (name) {
        return wrap(wellKnownSymbol(name), name);
      };

      if (descriptors) {
        // https://github.com/tc39/proposal-Symbol-description
        nativeDefineProperty$1($Symbol[PROTOTYPE$1], 'description', {
          configurable: true,
          get: function description() {
            return getInternalState(this).description;
          }
        });

        {
          redefine(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable, {
            unsafe: true
          });
        }
      }
    }

    _export({
      global: true,
      wrap: true,
      forced: !nativeSymbol,
      sham: !nativeSymbol
    }, {
      Symbol: $Symbol
    });
    $forEach(objectKeys(WellKnownSymbolsStore$1), function (name) {
      defineWellKnownSymbol(name);
    });
    _export({
      target: SYMBOL,
      stat: true,
      forced: !nativeSymbol
    }, {
      // `Symbol.for` method
      // https://tc39.github.io/ecma262/#sec-symbol.for
      'for': function (key) {
        var string = String(key);
        if (has(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
        var symbol = $Symbol(string);
        StringToSymbolRegistry[string] = symbol;
        SymbolToStringRegistry[symbol] = string;
        return symbol;
      },
      // `Symbol.keyFor` method
      // https://tc39.github.io/ecma262/#sec-symbol.keyfor
      keyFor: function keyFor(sym) {
        if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
        if (has(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
      },
      useSetter: function () {
        USE_SETTER = true;
      },
      useSimple: function () {
        USE_SETTER = false;
      }
    });
    _export({
      target: 'Object',
      stat: true,
      forced: !nativeSymbol,
      sham: !descriptors
    }, {
      // `Object.create` method
      // https://tc39.github.io/ecma262/#sec-object.create
      create: $create,
      // `Object.defineProperty` method
      // https://tc39.github.io/ecma262/#sec-object.defineproperty
      defineProperty: $defineProperty,
      // `Object.defineProperties` method
      // https://tc39.github.io/ecma262/#sec-object.defineproperties
      defineProperties: $defineProperties,
      // `Object.getOwnPropertyDescriptor` method
      // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors
      getOwnPropertyDescriptor: $getOwnPropertyDescriptor
    });
    _export({
      target: 'Object',
      stat: true,
      forced: !nativeSymbol
    }, {
      // `Object.getOwnPropertyNames` method
      // https://tc39.github.io/ecma262/#sec-object.getownpropertynames
      getOwnPropertyNames: $getOwnPropertyNames,
      // `Object.getOwnPropertySymbols` method
      // https://tc39.github.io/ecma262/#sec-object.getownpropertysymbols
      getOwnPropertySymbols: $getOwnPropertySymbols
    }); // Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
    // https://bugs.chromium.org/p/v8/issues/detail?id=3443

    _export({
      target: 'Object',
      stat: true,
      forced: fails(function () {
        objectGetOwnPropertySymbols.f(1);
      })
    }, {
      getOwnPropertySymbols: function getOwnPropertySymbols(it) {
        return objectGetOwnPropertySymbols.f(toObject(it));
      }
    }); // `JSON.stringify` method behavior with symbols
    // https://tc39.github.io/ecma262/#sec-json.stringify

    if ($stringify) {
      var FORCED_JSON_STRINGIFY = !nativeSymbol || fails(function () {
        var symbol = $Symbol(); // MS Edge converts symbol values to JSON as {}

        return $stringify([symbol]) != '[null]' // WebKit converts symbol values to JSON as null
        || $stringify({
          a: symbol
        }) != '{}' // V8 throws on boxed symbols
        || $stringify(Object(symbol)) != '{}';
      });
      _export({
        target: 'JSON',
        stat: true,
        forced: FORCED_JSON_STRINGIFY
      }, {
        // eslint-disable-next-line no-unused-vars
        stringify: function stringify(it, replacer, space) {
          var args = [it];
          var index = 1;
          var $replacer;

          while (arguments.length > index) args.push(arguments[index++]);

          $replacer = replacer;
          if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined

          if (!isArray(replacer)) replacer = function (key, value) {
            if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
            if (!isSymbol(value)) return value;
          };
          args[1] = replacer;
          return $stringify.apply(null, args);
        }
      });
    } // `Symbol.prototype[@@toPrimitive]` method
    // https://tc39.github.io/ecma262/#sec-symbol.prototype-@@toprimitive


    if (!$Symbol[PROTOTYPE$1][TO_PRIMITIVE]) {
      createNonEnumerableProperty($Symbol[PROTOTYPE$1], TO_PRIMITIVE, $Symbol[PROTOTYPE$1].valueOf);
    } // `Symbol.prototype[@@toStringTag]` property
    // https://tc39.github.io/ecma262/#sec-symbol.prototype-@@tostringtag


    setToStringTag($Symbol, SYMBOL);
    hiddenKeys[HIDDEN] = true;

    var $filter = arrayIteration.filter;





    var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter'); // Edge 14- issue

    var USES_TO_LENGTH$2 = arrayMethodUsesToLength('filter'); // `Array.prototype.filter` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.filter
    // with adding support of @@species

    _export({
      target: 'Array',
      proto: true,
      forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH$2
    }, {
      filter: function filter(callbackfn
      /* , thisArg */
      ) {
        return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
      }
    });

    var $forEach$1 = arrayIteration.forEach;





    var STRICT_METHOD$2 = arrayMethodIsStrict('forEach');
    var USES_TO_LENGTH$3 = arrayMethodUsesToLength('forEach'); // `Array.prototype.forEach` method implementation
    // https://tc39.github.io/ecma262/#sec-array.prototype.foreach

    var arrayForEach = !STRICT_METHOD$2 || !USES_TO_LENGTH$3 ? function forEach(callbackfn
    /* , thisArg */
    ) {
      return $forEach$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    } : [].forEach;

    // `Array.prototype.forEach` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.foreach


    _export({
      target: 'Array',
      proto: true,
      forced: [].forEach != arrayForEach
    }, {
      forEach: arrayForEach
    });

    var nativeGetOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;



    var FAILS_ON_PRIMITIVES = fails(function () {
      nativeGetOwnPropertyDescriptor$2(1);
    });
    var FORCED$1 = !descriptors || FAILS_ON_PRIMITIVES; // `Object.getOwnPropertyDescriptor` method
    // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor

    _export({
      target: 'Object',
      stat: true,
      forced: FORCED$1,
      sham: !descriptors
    }, {
      getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
        return nativeGetOwnPropertyDescriptor$2(toIndexedObject(it), key);
      }
    });

    // `Object.getOwnPropertyDescriptors` method
    // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors


    _export({
      target: 'Object',
      stat: true,
      sham: !descriptors
    }, {
      getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
        var O = toIndexedObject(object);
        var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
        var keys = ownKeys(O);
        var result = {};
        var index = 0;
        var key, descriptor;

        while (keys.length > index) {
          descriptor = getOwnPropertyDescriptor(O, key = keys[index++]);
          if (descriptor !== undefined) createProperty(result, key, descriptor);
        }

        return result;
      }
    });

    var FAILS_ON_PRIMITIVES$1 = fails(function () {
      objectKeys(1);
    }); // `Object.keys` method
    // https://tc39.github.io/ecma262/#sec-object.keys

    _export({
      target: 'Object',
      stat: true,
      forced: FAILS_ON_PRIMITIVES$1
    }, {
      keys: function keys(it) {
        return objectKeys(toObject(it));
      }
    });

    // iterable DOM collections
    // flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
    var domIterables = {
      CSSRuleList: 0,
      CSSStyleDeclaration: 0,
      CSSValueList: 0,
      ClientRectList: 0,
      DOMRectList: 0,
      DOMStringList: 0,
      DOMTokenList: 1,
      DataTransferItemList: 0,
      FileList: 0,
      HTMLAllCollection: 0,
      HTMLCollection: 0,
      HTMLFormElement: 0,
      HTMLSelectElement: 0,
      MediaList: 0,
      MimeTypeArray: 0,
      NamedNodeMap: 0,
      NodeList: 1,
      PaintRequestList: 0,
      Plugin: 0,
      PluginArray: 0,
      SVGLengthList: 0,
      SVGNumberList: 0,
      SVGPathSegList: 0,
      SVGPointList: 0,
      SVGStringList: 0,
      SVGTransformList: 0,
      SourceBufferList: 0,
      StyleSheetList: 0,
      TextTrackCueList: 0,
      TextTrackList: 0,
      TouchList: 0
    };

    for (var COLLECTION_NAME in domIterables) {
      var Collection = global_1[COLLECTION_NAME];
      var CollectionPrototype = Collection && Collection.prototype; // some Chrome versions have non-configurable methods on DOMTokenList

      if (CollectionPrototype && CollectionPrototype.forEach !== arrayForEach) try {
        createNonEnumerableProperty(CollectionPrototype, 'forEach', arrayForEach);
      } catch (error) {
        CollectionPrototype.forEach = arrayForEach;
      }
    }

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

    function ownKeys$1(object, enumerableOnly) {
      var keys = Object.keys(object);

      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) symbols = symbols.filter(function (sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
        keys.push.apply(keys, symbols);
      }

      return keys;
    }

    function _objectSpread2(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};

        if (i % 2) {
          ownKeys$1(Object(source), true).forEach(function (key) {
            _defineProperty(target, key, source[key]);
          });
        } else if (Object.getOwnPropertyDescriptors) {
          Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        } else {
          ownKeys$1(Object(source)).forEach(function (key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
          });
        }
      }

      return target;
    }

    var script$3 = {
      name: "MTooltip",
      inheritAttrs: false,
      props: {
        // 是否只在溢出时显示 tip
        ellipsis: {
          type: Boolean,
          default: true
        }
      },
      data: function data() {
        return {
          isEllipsis: false
        };
      },
      mounted: function mounted() {
        this.calcTips();
        this.$el.addEventListener("mouseenter", this.calcTips);
      },
      beforeDestroy: function beforeDestroy() {
        this.$el.removeEventListener("mouseenter", this.calcTips);
      },
      methods: {
        calcTips: function calcTips() {
          var el = this.$el;
          var clientWidth = el === null || el === void 0 ? void 0 : el.clientWidth;
          var scrollWidth = el.scrollWidth;
          var isEllipsis = scrollWidth > clientWidth;
          this.isEllipsis = isEllipsis;
        }
      },
      render: function render() {
        var h = arguments[0];
        var $attrs = this.$attrs,
            $slots = this.$slots,
            $props = this.$props,
            $data = this.$data;
        var tooltipProps = {
          props: _objectSpread2({}, $attrs)
        };

        if (!$props.ellipsis) {
          return h("el-tooltip", helper([{}, tooltipProps]), [$slots.default]);
        }

        return h("el-tooltip", helper([{}, tooltipProps, {
          "attrs": {
            "disabled": !$data.isEllipsis
          }
        }]), [h("span", {
          "class": "mui-textEllipsis"
        }, [$slots.default])]);
      }
    };

    /* script */
    const __vue_script__$3 = script$3;

    /* template */

      /* style */
      const __vue_inject_styles__$3 = undefined;
      /* scoped */
      const __vue_scope_id__$3 = undefined;
      /* module identifier */
      const __vue_module_identifier__$3 = undefined;
      /* functional template */
      const __vue_is_functional_template__$3 = undefined;
      /* style inject */
      
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__$3 = /*#__PURE__*/normalizeComponent(
        {},
        __vue_inject_styles__$3,
        __vue_script__$3,
        __vue_scope_id__$3,
        __vue_is_functional_template__$3,
        __vue_module_identifier__$3,
        false,
        undefined,
        undefined,
        undefined
      );

    var Tooltip = __assign(__assign({}, __vue_component__$3), { install: function (Vue) {
            Vue.component(__vue_component__$3.name, __vue_component__$3);
        } });

    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    var script$4 = {
      name: "MEmpty",
      inheritAttrs: false,
      props: {
        // 是否相对父容器居中
        center: {
          type: Boolean,
          default: true
        },
        // 展示空提示 => 设置字段为 false 时不展示
        description: {
          type: [String, Boolean],
          default: "暂无数据"
        },
        // 图片地址
        image: {
          type: [Object, String],
          default: null
        },
        // 图片样式
        imageStyle: {
          type: Object,
          default: function _default() {
            return {};
          }
        }
      }
    };

    var img = "data:image/png;base64,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";

    /* script */
    const __vue_script__$4 = script$4;
    var __vue_render__$3 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:['mui-empty', { center: _vm.center }]},[_c('div',{staticClass:"mui-empty-box"},[_vm._t("default",[_c('img',{staticClass:"mui-empty-img",style:(_vm.imageStyle),attrs:{"src":_vm.image || img}}),_vm._v(" "),(_vm.description || _vm.$slots.text)?_c('div',{staticClass:"mui-empty-text"},[_vm._t("text",[_vm._v("\n          "+_vm._s(_vm.description)+"\n        ")])],2):_vm._e()])],2)])};
    var __vue_staticRenderFns__$3 = [];

      /* style */
      const __vue_inject_styles__$4 = undefined;
      /* scoped */
      const __vue_scope_id__$4 = undefined;
      /* module identifier */
      const __vue_module_identifier__$4 = undefined;
      /* functional template */
      const __vue_is_functional_template__$4 = false;
      /* style inject */
      
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__$4 = /*#__PURE__*/normalizeComponent(
        { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
        __vue_inject_styles__$4,
        __vue_script__$4,
        __vue_scope_id__$4,
        __vue_is_functional_template__$4,
        __vue_module_identifier__$4,
        false,
        undefined,
        undefined,
        undefined
      );

    var Empty = __assign(__assign({}, __vue_component__$4), { PRESENTED_IMAGE_DEFAULT: img,
        install: function (Vue) {
            Vue.component(__vue_component__$4.name, __vue_component__$4);
        } });

    var version$1 = "1.0.0";

    var components = {
        /* 基础组件 */
        Dialog: Dialog,
        Button: Button,
        MultiTag: MultiTag,
        Tooltip: Tooltip,
        Empty: Empty
    };
    var install = function (Vue, opts) {
        if (opts === void 0) { opts = {}; }
        if (install.installed)
            return;
        install.installed = true;
        Vue.prototype.$ELEMENT = {
            size: opts.size || "medium",
            zIndex: opts.zIndex || 2000
        };
        Object.keys(components).forEach(function (key) { return Vue.use(components[key]); });
    };
    // Auto-install when vue is found (eg. in browser via <script> tag)
    if (typeof window !== "undefined" && window.Vue) {
        install(window.Vue);
    }
    {
        console.log("MUI\uFF1Arunning version " + version$1);
    }
    var index = __assign({ version: version$1,
        install: install }, components);

    exports.Button = Button;
    exports.Dialog = Dialog;
    exports.Empty = Empty;
    exports.MultiTag = MultiTag;
    exports.Tooltip = Tooltip;
    exports.default = index;
    exports.install = install;
    exports.version = version$1;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
