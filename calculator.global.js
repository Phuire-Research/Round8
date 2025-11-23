"use strict";
var Round8Calculator = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // node_modules/rxjs/dist/cjs/internal/util/isFunction.js
  var require_isFunction = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/util/isFunction.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.isFunction = void 0;
      function isFunction(value) {
        return typeof value === "function";
      }
      exports.isFunction = isFunction;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/util/createErrorClass.js
  var require_createErrorClass = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/util/createErrorClass.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.createErrorClass = void 0;
      function createErrorClass(createImpl) {
        var _super = function(instance) {
          Error.call(instance);
          instance.stack = new Error().stack;
        };
        var ctorFunc = createImpl(_super);
        ctorFunc.prototype = Object.create(Error.prototype);
        ctorFunc.prototype.constructor = ctorFunc;
        return ctorFunc;
      }
      exports.createErrorClass = createErrorClass;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/util/UnsubscriptionError.js
  var require_UnsubscriptionError = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/util/UnsubscriptionError.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.UnsubscriptionError = void 0;
      var createErrorClass_1 = require_createErrorClass();
      exports.UnsubscriptionError = createErrorClass_1.createErrorClass(function(_super) {
        return function UnsubscriptionErrorImpl(errors) {
          _super(this);
          this.message = errors ? errors.length + " errors occurred during unsubscription:\n" + errors.map(function(err, i) {
            return i + 1 + ") " + err.toString();
          }).join("\n  ") : "";
          this.name = "UnsubscriptionError";
          this.errors = errors;
        };
      });
    }
  });

  // node_modules/rxjs/dist/cjs/internal/util/arrRemove.js
  var require_arrRemove = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/util/arrRemove.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.arrRemove = void 0;
      function arrRemove(arr, item) {
        if (arr) {
          var index = arr.indexOf(item);
          0 <= index && arr.splice(index, 1);
        }
      }
      exports.arrRemove = arrRemove;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/Subscription.js
  var require_Subscription = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/Subscription.js"(exports) {
      "use strict";
      var __values = exports && exports.__values || function(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
          next: function() {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
          }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
      };
      var __read = exports && exports.__read || function(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
          while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        } catch (error) {
          e = { error };
        } finally {
          try {
            if (r && !r.done && (m = i["return"])) m.call(i);
          } finally {
            if (e) throw e.error;
          }
        }
        return ar;
      };
      var __spreadArray = exports && exports.__spreadArray || function(to, from) {
        for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
          to[j] = from[i];
        return to;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.isSubscription = exports.EMPTY_SUBSCRIPTION = exports.Subscription = void 0;
      var isFunction_1 = require_isFunction();
      var UnsubscriptionError_1 = require_UnsubscriptionError();
      var arrRemove_1 = require_arrRemove();
      var Subscription = function() {
        function Subscription2(initialTeardown) {
          this.initialTeardown = initialTeardown;
          this.closed = false;
          this._parentage = null;
          this._finalizers = null;
        }
        Subscription2.prototype.unsubscribe = function() {
          var e_1, _a, e_2, _b;
          var errors;
          if (!this.closed) {
            this.closed = true;
            var _parentage = this._parentage;
            if (_parentage) {
              this._parentage = null;
              if (Array.isArray(_parentage)) {
                try {
                  for (var _parentage_1 = __values(_parentage), _parentage_1_1 = _parentage_1.next(); !_parentage_1_1.done; _parentage_1_1 = _parentage_1.next()) {
                    var parent_1 = _parentage_1_1.value;
                    parent_1.remove(this);
                  }
                } catch (e_1_1) {
                  e_1 = { error: e_1_1 };
                } finally {
                  try {
                    if (_parentage_1_1 && !_parentage_1_1.done && (_a = _parentage_1.return)) _a.call(_parentage_1);
                  } finally {
                    if (e_1) throw e_1.error;
                  }
                }
              } else {
                _parentage.remove(this);
              }
            }
            var initialFinalizer = this.initialTeardown;
            if (isFunction_1.isFunction(initialFinalizer)) {
              try {
                initialFinalizer();
              } catch (e) {
                errors = e instanceof UnsubscriptionError_1.UnsubscriptionError ? e.errors : [e];
              }
            }
            var _finalizers = this._finalizers;
            if (_finalizers) {
              this._finalizers = null;
              try {
                for (var _finalizers_1 = __values(_finalizers), _finalizers_1_1 = _finalizers_1.next(); !_finalizers_1_1.done; _finalizers_1_1 = _finalizers_1.next()) {
                  var finalizer = _finalizers_1_1.value;
                  try {
                    execFinalizer(finalizer);
                  } catch (err) {
                    errors = errors !== null && errors !== void 0 ? errors : [];
                    if (err instanceof UnsubscriptionError_1.UnsubscriptionError) {
                      errors = __spreadArray(__spreadArray([], __read(errors)), __read(err.errors));
                    } else {
                      errors.push(err);
                    }
                  }
                }
              } catch (e_2_1) {
                e_2 = { error: e_2_1 };
              } finally {
                try {
                  if (_finalizers_1_1 && !_finalizers_1_1.done && (_b = _finalizers_1.return)) _b.call(_finalizers_1);
                } finally {
                  if (e_2) throw e_2.error;
                }
              }
            }
            if (errors) {
              throw new UnsubscriptionError_1.UnsubscriptionError(errors);
            }
          }
        };
        Subscription2.prototype.add = function(teardown) {
          var _a;
          if (teardown && teardown !== this) {
            if (this.closed) {
              execFinalizer(teardown);
            } else {
              if (teardown instanceof Subscription2) {
                if (teardown.closed || teardown._hasParent(this)) {
                  return;
                }
                teardown._addParent(this);
              }
              (this._finalizers = (_a = this._finalizers) !== null && _a !== void 0 ? _a : []).push(teardown);
            }
          }
        };
        Subscription2.prototype._hasParent = function(parent) {
          var _parentage = this._parentage;
          return _parentage === parent || Array.isArray(_parentage) && _parentage.includes(parent);
        };
        Subscription2.prototype._addParent = function(parent) {
          var _parentage = this._parentage;
          this._parentage = Array.isArray(_parentage) ? (_parentage.push(parent), _parentage) : _parentage ? [_parentage, parent] : parent;
        };
        Subscription2.prototype._removeParent = function(parent) {
          var _parentage = this._parentage;
          if (_parentage === parent) {
            this._parentage = null;
          } else if (Array.isArray(_parentage)) {
            arrRemove_1.arrRemove(_parentage, parent);
          }
        };
        Subscription2.prototype.remove = function(teardown) {
          var _finalizers = this._finalizers;
          _finalizers && arrRemove_1.arrRemove(_finalizers, teardown);
          if (teardown instanceof Subscription2) {
            teardown._removeParent(this);
          }
        };
        Subscription2.EMPTY = function() {
          var empty = new Subscription2();
          empty.closed = true;
          return empty;
        }();
        return Subscription2;
      }();
      exports.Subscription = Subscription;
      exports.EMPTY_SUBSCRIPTION = Subscription.EMPTY;
      function isSubscription(value) {
        return value instanceof Subscription || value && "closed" in value && isFunction_1.isFunction(value.remove) && isFunction_1.isFunction(value.add) && isFunction_1.isFunction(value.unsubscribe);
      }
      exports.isSubscription = isSubscription;
      function execFinalizer(finalizer) {
        if (isFunction_1.isFunction(finalizer)) {
          finalizer();
        } else {
          finalizer.unsubscribe();
        }
      }
    }
  });

  // node_modules/rxjs/dist/cjs/internal/config.js
  var require_config = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/config.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.config = void 0;
      exports.config = {
        onUnhandledError: null,
        onStoppedNotification: null,
        Promise: void 0,
        useDeprecatedSynchronousErrorHandling: false,
        useDeprecatedNextContext: false
      };
    }
  });

  // node_modules/rxjs/dist/cjs/internal/scheduler/timeoutProvider.js
  var require_timeoutProvider = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/scheduler/timeoutProvider.js"(exports) {
      "use strict";
      var __read = exports && exports.__read || function(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
          while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        } catch (error) {
          e = { error };
        } finally {
          try {
            if (r && !r.done && (m = i["return"])) m.call(i);
          } finally {
            if (e) throw e.error;
          }
        }
        return ar;
      };
      var __spreadArray = exports && exports.__spreadArray || function(to, from) {
        for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
          to[j] = from[i];
        return to;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.timeoutProvider = void 0;
      exports.timeoutProvider = {
        setTimeout: function(handler, timeout) {
          var args = [];
          for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
          }
          var delegate = exports.timeoutProvider.delegate;
          if (delegate === null || delegate === void 0 ? void 0 : delegate.setTimeout) {
            return delegate.setTimeout.apply(delegate, __spreadArray([handler, timeout], __read(args)));
          }
          return setTimeout.apply(void 0, __spreadArray([handler, timeout], __read(args)));
        },
        clearTimeout: function(handle) {
          var delegate = exports.timeoutProvider.delegate;
          return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearTimeout) || clearTimeout)(handle);
        },
        delegate: void 0
      };
    }
  });

  // node_modules/rxjs/dist/cjs/internal/util/reportUnhandledError.js
  var require_reportUnhandledError = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/util/reportUnhandledError.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.reportUnhandledError = void 0;
      var config_1 = require_config();
      var timeoutProvider_1 = require_timeoutProvider();
      function reportUnhandledError(err) {
        timeoutProvider_1.timeoutProvider.setTimeout(function() {
          var onUnhandledError = config_1.config.onUnhandledError;
          if (onUnhandledError) {
            onUnhandledError(err);
          } else {
            throw err;
          }
        });
      }
      exports.reportUnhandledError = reportUnhandledError;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/util/noop.js
  var require_noop = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/util/noop.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.noop = void 0;
      function noop() {
      }
      exports.noop = noop;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/NotificationFactories.js
  var require_NotificationFactories = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/NotificationFactories.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.createNotification = exports.nextNotification = exports.errorNotification = exports.COMPLETE_NOTIFICATION = void 0;
      exports.COMPLETE_NOTIFICATION = function() {
        return createNotification("C", void 0, void 0);
      }();
      function errorNotification(error) {
        return createNotification("E", void 0, error);
      }
      exports.errorNotification = errorNotification;
      function nextNotification(value) {
        return createNotification("N", value, void 0);
      }
      exports.nextNotification = nextNotification;
      function createNotification(kind, value, error) {
        return {
          kind,
          value,
          error
        };
      }
      exports.createNotification = createNotification;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/util/errorContext.js
  var require_errorContext = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/util/errorContext.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.captureError = exports.errorContext = void 0;
      var config_1 = require_config();
      var context = null;
      function errorContext(cb) {
        if (config_1.config.useDeprecatedSynchronousErrorHandling) {
          var isRoot = !context;
          if (isRoot) {
            context = { errorThrown: false, error: null };
          }
          cb();
          if (isRoot) {
            var _a = context, errorThrown = _a.errorThrown, error = _a.error;
            context = null;
            if (errorThrown) {
              throw error;
            }
          }
        } else {
          cb();
        }
      }
      exports.errorContext = errorContext;
      function captureError(err) {
        if (config_1.config.useDeprecatedSynchronousErrorHandling && context) {
          context.errorThrown = true;
          context.error = err;
        }
      }
      exports.captureError = captureError;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/Subscriber.js
  var require_Subscriber = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/Subscriber.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.EMPTY_OBSERVER = exports.SafeSubscriber = exports.Subscriber = void 0;
      var isFunction_1 = require_isFunction();
      var Subscription_1 = require_Subscription();
      var config_1 = require_config();
      var reportUnhandledError_1 = require_reportUnhandledError();
      var noop_1 = require_noop();
      var NotificationFactories_1 = require_NotificationFactories();
      var timeoutProvider_1 = require_timeoutProvider();
      var errorContext_1 = require_errorContext();
      var Subscriber = function(_super) {
        __extends(Subscriber2, _super);
        function Subscriber2(destination) {
          var _this = _super.call(this) || this;
          _this.isStopped = false;
          if (destination) {
            _this.destination = destination;
            if (Subscription_1.isSubscription(destination)) {
              destination.add(_this);
            }
          } else {
            _this.destination = exports.EMPTY_OBSERVER;
          }
          return _this;
        }
        Subscriber2.create = function(next, error, complete) {
          return new SafeSubscriber(next, error, complete);
        };
        Subscriber2.prototype.next = function(value) {
          if (this.isStopped) {
            handleStoppedNotification(NotificationFactories_1.nextNotification(value), this);
          } else {
            this._next(value);
          }
        };
        Subscriber2.prototype.error = function(err) {
          if (this.isStopped) {
            handleStoppedNotification(NotificationFactories_1.errorNotification(err), this);
          } else {
            this.isStopped = true;
            this._error(err);
          }
        };
        Subscriber2.prototype.complete = function() {
          if (this.isStopped) {
            handleStoppedNotification(NotificationFactories_1.COMPLETE_NOTIFICATION, this);
          } else {
            this.isStopped = true;
            this._complete();
          }
        };
        Subscriber2.prototype.unsubscribe = function() {
          if (!this.closed) {
            this.isStopped = true;
            _super.prototype.unsubscribe.call(this);
            this.destination = null;
          }
        };
        Subscriber2.prototype._next = function(value) {
          this.destination.next(value);
        };
        Subscriber2.prototype._error = function(err) {
          try {
            this.destination.error(err);
          } finally {
            this.unsubscribe();
          }
        };
        Subscriber2.prototype._complete = function() {
          try {
            this.destination.complete();
          } finally {
            this.unsubscribe();
          }
        };
        return Subscriber2;
      }(Subscription_1.Subscription);
      exports.Subscriber = Subscriber;
      var _bind = Function.prototype.bind;
      function bind(fn, thisArg) {
        return _bind.call(fn, thisArg);
      }
      var ConsumerObserver = function() {
        function ConsumerObserver2(partialObserver) {
          this.partialObserver = partialObserver;
        }
        ConsumerObserver2.prototype.next = function(value) {
          var partialObserver = this.partialObserver;
          if (partialObserver.next) {
            try {
              partialObserver.next(value);
            } catch (error) {
              handleUnhandledError(error);
            }
          }
        };
        ConsumerObserver2.prototype.error = function(err) {
          var partialObserver = this.partialObserver;
          if (partialObserver.error) {
            try {
              partialObserver.error(err);
            } catch (error) {
              handleUnhandledError(error);
            }
          } else {
            handleUnhandledError(err);
          }
        };
        ConsumerObserver2.prototype.complete = function() {
          var partialObserver = this.partialObserver;
          if (partialObserver.complete) {
            try {
              partialObserver.complete();
            } catch (error) {
              handleUnhandledError(error);
            }
          }
        };
        return ConsumerObserver2;
      }();
      var SafeSubscriber = function(_super) {
        __extends(SafeSubscriber2, _super);
        function SafeSubscriber2(observerOrNext, error, complete) {
          var _this = _super.call(this) || this;
          var partialObserver;
          if (isFunction_1.isFunction(observerOrNext) || !observerOrNext) {
            partialObserver = {
              next: observerOrNext !== null && observerOrNext !== void 0 ? observerOrNext : void 0,
              error: error !== null && error !== void 0 ? error : void 0,
              complete: complete !== null && complete !== void 0 ? complete : void 0
            };
          } else {
            var context_1;
            if (_this && config_1.config.useDeprecatedNextContext) {
              context_1 = Object.create(observerOrNext);
              context_1.unsubscribe = function() {
                return _this.unsubscribe();
              };
              partialObserver = {
                next: observerOrNext.next && bind(observerOrNext.next, context_1),
                error: observerOrNext.error && bind(observerOrNext.error, context_1),
                complete: observerOrNext.complete && bind(observerOrNext.complete, context_1)
              };
            } else {
              partialObserver = observerOrNext;
            }
          }
          _this.destination = new ConsumerObserver(partialObserver);
          return _this;
        }
        return SafeSubscriber2;
      }(Subscriber);
      exports.SafeSubscriber = SafeSubscriber;
      function handleUnhandledError(error) {
        if (config_1.config.useDeprecatedSynchronousErrorHandling) {
          errorContext_1.captureError(error);
        } else {
          reportUnhandledError_1.reportUnhandledError(error);
        }
      }
      function defaultErrorHandler(err) {
        throw err;
      }
      function handleStoppedNotification(notification, subscriber) {
        var onStoppedNotification = config_1.config.onStoppedNotification;
        onStoppedNotification && timeoutProvider_1.timeoutProvider.setTimeout(function() {
          return onStoppedNotification(notification, subscriber);
        });
      }
      exports.EMPTY_OBSERVER = {
        closed: true,
        next: noop_1.noop,
        error: defaultErrorHandler,
        complete: noop_1.noop
      };
    }
  });

  // node_modules/rxjs/dist/cjs/internal/symbol/observable.js
  var require_observable = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/symbol/observable.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.observable = void 0;
      exports.observable = function() {
        return typeof Symbol === "function" && Symbol.observable || "@@observable";
      }();
    }
  });

  // node_modules/rxjs/dist/cjs/internal/util/identity.js
  var require_identity = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/util/identity.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.identity = void 0;
      function identity(x) {
        return x;
      }
      exports.identity = identity;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/util/pipe.js
  var require_pipe = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/util/pipe.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.pipeFromArray = exports.pipe = void 0;
      var identity_1 = require_identity();
      function pipe() {
        var fns = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          fns[_i] = arguments[_i];
        }
        return pipeFromArray(fns);
      }
      exports.pipe = pipe;
      function pipeFromArray(fns) {
        if (fns.length === 0) {
          return identity_1.identity;
        }
        if (fns.length === 1) {
          return fns[0];
        }
        return function piped(input) {
          return fns.reduce(function(prev, fn) {
            return fn(prev);
          }, input);
        };
      }
      exports.pipeFromArray = pipeFromArray;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/Observable.js
  var require_Observable = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/Observable.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Observable = void 0;
      var Subscriber_1 = require_Subscriber();
      var Subscription_1 = require_Subscription();
      var observable_1 = require_observable();
      var pipe_1 = require_pipe();
      var config_1 = require_config();
      var isFunction_1 = require_isFunction();
      var errorContext_1 = require_errorContext();
      var Observable2 = function() {
        function Observable4(subscribe) {
          if (subscribe) {
            this._subscribe = subscribe;
          }
        }
        Observable4.prototype.lift = function(operator) {
          var observable2 = new Observable4();
          observable2.source = this;
          observable2.operator = operator;
          return observable2;
        };
        Observable4.prototype.subscribe = function(observerOrNext, error, complete) {
          var _this = this;
          var subscriber = isSubscriber(observerOrNext) ? observerOrNext : new Subscriber_1.SafeSubscriber(observerOrNext, error, complete);
          errorContext_1.errorContext(function() {
            var _a = _this, operator = _a.operator, source = _a.source;
            subscriber.add(operator ? operator.call(subscriber, source) : source ? _this._subscribe(subscriber) : _this._trySubscribe(subscriber));
          });
          return subscriber;
        };
        Observable4.prototype._trySubscribe = function(sink) {
          try {
            return this._subscribe(sink);
          } catch (err) {
            sink.error(err);
          }
        };
        Observable4.prototype.forEach = function(next, promiseCtor) {
          var _this = this;
          promiseCtor = getPromiseCtor(promiseCtor);
          return new promiseCtor(function(resolve, reject) {
            var subscriber = new Subscriber_1.SafeSubscriber({
              next: function(value) {
                try {
                  next(value);
                } catch (err) {
                  reject(err);
                  subscriber.unsubscribe();
                }
              },
              error: reject,
              complete: resolve
            });
            _this.subscribe(subscriber);
          });
        };
        Observable4.prototype._subscribe = function(subscriber) {
          var _a;
          return (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber);
        };
        Observable4.prototype[observable_1.observable] = function() {
          return this;
        };
        Observable4.prototype.pipe = function() {
          var operations = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            operations[_i] = arguments[_i];
          }
          return pipe_1.pipeFromArray(operations)(this);
        };
        Observable4.prototype.toPromise = function(promiseCtor) {
          var _this = this;
          promiseCtor = getPromiseCtor(promiseCtor);
          return new promiseCtor(function(resolve, reject) {
            var value;
            _this.subscribe(function(x) {
              return value = x;
            }, function(err) {
              return reject(err);
            }, function() {
              return resolve(value);
            });
          });
        };
        Observable4.create = function(subscribe) {
          return new Observable4(subscribe);
        };
        return Observable4;
      }();
      exports.Observable = Observable2;
      function getPromiseCtor(promiseCtor) {
        var _a;
        return (_a = promiseCtor !== null && promiseCtor !== void 0 ? promiseCtor : config_1.config.Promise) !== null && _a !== void 0 ? _a : Promise;
      }
      function isObserver(value) {
        return value && isFunction_1.isFunction(value.next) && isFunction_1.isFunction(value.error) && isFunction_1.isFunction(value.complete);
      }
      function isSubscriber(value) {
        return value && value instanceof Subscriber_1.Subscriber || isObserver(value) && Subscription_1.isSubscription(value);
      }
    }
  });

  // node_modules/rxjs/dist/cjs/internal/util/lift.js
  var require_lift = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/util/lift.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.operate = exports.hasLift = void 0;
      var isFunction_1 = require_isFunction();
      function hasLift2(source) {
        return isFunction_1.isFunction(source === null || source === void 0 ? void 0 : source.lift);
      }
      exports.hasLift = hasLift2;
      function operate2(init) {
        return function(source) {
          if (hasLift2(source)) {
            return source.lift(function(liftedSource) {
              try {
                return init(liftedSource, this);
              } catch (err) {
                this.error(err);
              }
            });
          }
          throw new TypeError("Unable to lift unknown Observable type");
        };
      }
      exports.operate = operate2;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/OperatorSubscriber.js
  var require_OperatorSubscriber = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/OperatorSubscriber.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.OperatorSubscriber = exports.createOperatorSubscriber = void 0;
      var Subscriber_1 = require_Subscriber();
      function createOperatorSubscriber2(destination, onNext, onComplete, onError, onFinalize) {
        return new OperatorSubscriber2(destination, onNext, onComplete, onError, onFinalize);
      }
      exports.createOperatorSubscriber = createOperatorSubscriber2;
      var OperatorSubscriber2 = function(_super) {
        __extends(OperatorSubscriber3, _super);
        function OperatorSubscriber3(destination, onNext, onComplete, onError, onFinalize, shouldUnsubscribe) {
          var _this = _super.call(this, destination) || this;
          _this.onFinalize = onFinalize;
          _this.shouldUnsubscribe = shouldUnsubscribe;
          _this._next = onNext ? function(value) {
            try {
              onNext(value);
            } catch (err) {
              destination.error(err);
            }
          } : _super.prototype._next;
          _this._error = onError ? function(err) {
            try {
              onError(err);
            } catch (err2) {
              destination.error(err2);
            } finally {
              this.unsubscribe();
            }
          } : _super.prototype._error;
          _this._complete = onComplete ? function() {
            try {
              onComplete();
            } catch (err) {
              destination.error(err);
            } finally {
              this.unsubscribe();
            }
          } : _super.prototype._complete;
          return _this;
        }
        OperatorSubscriber3.prototype.unsubscribe = function() {
          var _a;
          if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            var closed_1 = this.closed;
            _super.prototype.unsubscribe.call(this);
            !closed_1 && ((_a = this.onFinalize) === null || _a === void 0 ? void 0 : _a.call(this));
          }
        };
        return OperatorSubscriber3;
      }(Subscriber_1.Subscriber);
      exports.OperatorSubscriber = OperatorSubscriber2;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/refCount.js
  var require_refCount = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/refCount.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.refCount = void 0;
      var lift_1 = require_lift();
      var OperatorSubscriber_1 = require_OperatorSubscriber();
      function refCount() {
        return lift_1.operate(function(source, subscriber) {
          var connection = null;
          source._refCount++;
          var refCounter = OperatorSubscriber_1.createOperatorSubscriber(subscriber, void 0, void 0, void 0, function() {
            if (!source || source._refCount <= 0 || 0 < --source._refCount) {
              connection = null;
              return;
            }
            var sharedConnection = source._connection;
            var conn = connection;
            connection = null;
            if (sharedConnection && (!conn || sharedConnection === conn)) {
              sharedConnection.unsubscribe();
            }
            subscriber.unsubscribe();
          });
          source.subscribe(refCounter);
          if (!refCounter.closed) {
            connection = source.connect();
          }
        });
      }
      exports.refCount = refCount;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/observable/ConnectableObservable.js
  var require_ConnectableObservable = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/observable/ConnectableObservable.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ConnectableObservable = void 0;
      var Observable_1 = require_Observable();
      var Subscription_1 = require_Subscription();
      var refCount_1 = require_refCount();
      var OperatorSubscriber_1 = require_OperatorSubscriber();
      var lift_1 = require_lift();
      var ConnectableObservable = function(_super) {
        __extends(ConnectableObservable2, _super);
        function ConnectableObservable2(source, subjectFactory) {
          var _this = _super.call(this) || this;
          _this.source = source;
          _this.subjectFactory = subjectFactory;
          _this._subject = null;
          _this._refCount = 0;
          _this._connection = null;
          if (lift_1.hasLift(source)) {
            _this.lift = source.lift;
          }
          return _this;
        }
        ConnectableObservable2.prototype._subscribe = function(subscriber) {
          return this.getSubject().subscribe(subscriber);
        };
        ConnectableObservable2.prototype.getSubject = function() {
          var subject = this._subject;
          if (!subject || subject.isStopped) {
            this._subject = this.subjectFactory();
          }
          return this._subject;
        };
        ConnectableObservable2.prototype._teardown = function() {
          this._refCount = 0;
          var _connection = this._connection;
          this._subject = this._connection = null;
          _connection === null || _connection === void 0 ? void 0 : _connection.unsubscribe();
        };
        ConnectableObservable2.prototype.connect = function() {
          var _this = this;
          var connection = this._connection;
          if (!connection) {
            connection = this._connection = new Subscription_1.Subscription();
            var subject_1 = this.getSubject();
            connection.add(this.source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subject_1, void 0, function() {
              _this._teardown();
              subject_1.complete();
            }, function(err) {
              _this._teardown();
              subject_1.error(err);
            }, function() {
              return _this._teardown();
            })));
            if (connection.closed) {
              this._connection = null;
              connection = Subscription_1.Subscription.EMPTY;
            }
          }
          return connection;
        };
        ConnectableObservable2.prototype.refCount = function() {
          return refCount_1.refCount()(this);
        };
        return ConnectableObservable2;
      }(Observable_1.Observable);
      exports.ConnectableObservable = ConnectableObservable;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/scheduler/performanceTimestampProvider.js
  var require_performanceTimestampProvider = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/scheduler/performanceTimestampProvider.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.performanceTimestampProvider = void 0;
      exports.performanceTimestampProvider = {
        now: function() {
          return (exports.performanceTimestampProvider.delegate || performance).now();
        },
        delegate: void 0
      };
    }
  });

  // node_modules/rxjs/dist/cjs/internal/scheduler/animationFrameProvider.js
  var require_animationFrameProvider = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/scheduler/animationFrameProvider.js"(exports) {
      "use strict";
      var __read = exports && exports.__read || function(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
          while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        } catch (error) {
          e = { error };
        } finally {
          try {
            if (r && !r.done && (m = i["return"])) m.call(i);
          } finally {
            if (e) throw e.error;
          }
        }
        return ar;
      };
      var __spreadArray = exports && exports.__spreadArray || function(to, from) {
        for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
          to[j] = from[i];
        return to;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.animationFrameProvider = void 0;
      var Subscription_1 = require_Subscription();
      exports.animationFrameProvider = {
        schedule: function(callback) {
          var request = requestAnimationFrame;
          var cancel = cancelAnimationFrame;
          var delegate = exports.animationFrameProvider.delegate;
          if (delegate) {
            request = delegate.requestAnimationFrame;
            cancel = delegate.cancelAnimationFrame;
          }
          var handle = request(function(timestamp) {
            cancel = void 0;
            callback(timestamp);
          });
          return new Subscription_1.Subscription(function() {
            return cancel === null || cancel === void 0 ? void 0 : cancel(handle);
          });
        },
        requestAnimationFrame: function() {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }
          var delegate = exports.animationFrameProvider.delegate;
          return ((delegate === null || delegate === void 0 ? void 0 : delegate.requestAnimationFrame) || requestAnimationFrame).apply(void 0, __spreadArray([], __read(args)));
        },
        cancelAnimationFrame: function() {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }
          var delegate = exports.animationFrameProvider.delegate;
          return ((delegate === null || delegate === void 0 ? void 0 : delegate.cancelAnimationFrame) || cancelAnimationFrame).apply(void 0, __spreadArray([], __read(args)));
        },
        delegate: void 0
      };
    }
  });

  // node_modules/rxjs/dist/cjs/internal/observable/dom/animationFrames.js
  var require_animationFrames = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/observable/dom/animationFrames.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.animationFrames = void 0;
      var Observable_1 = require_Observable();
      var performanceTimestampProvider_1 = require_performanceTimestampProvider();
      var animationFrameProvider_1 = require_animationFrameProvider();
      function animationFrames(timestampProvider) {
        return timestampProvider ? animationFramesFactory(timestampProvider) : DEFAULT_ANIMATION_FRAMES;
      }
      exports.animationFrames = animationFrames;
      function animationFramesFactory(timestampProvider) {
        return new Observable_1.Observable(function(subscriber) {
          var provider = timestampProvider || performanceTimestampProvider_1.performanceTimestampProvider;
          var start = provider.now();
          var id = 0;
          var run = function() {
            if (!subscriber.closed) {
              id = animationFrameProvider_1.animationFrameProvider.requestAnimationFrame(function(timestamp) {
                id = 0;
                var now = provider.now();
                subscriber.next({
                  timestamp: timestampProvider ? now : timestamp,
                  elapsed: now - start
                });
                run();
              });
            }
          };
          run();
          return function() {
            if (id) {
              animationFrameProvider_1.animationFrameProvider.cancelAnimationFrame(id);
            }
          };
        });
      }
      var DEFAULT_ANIMATION_FRAMES = animationFramesFactory();
    }
  });

  // node_modules/rxjs/dist/cjs/internal/util/ObjectUnsubscribedError.js
  var require_ObjectUnsubscribedError = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/util/ObjectUnsubscribedError.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ObjectUnsubscribedError = void 0;
      var createErrorClass_1 = require_createErrorClass();
      exports.ObjectUnsubscribedError = createErrorClass_1.createErrorClass(function(_super) {
        return function ObjectUnsubscribedErrorImpl() {
          _super(this);
          this.name = "ObjectUnsubscribedError";
          this.message = "object unsubscribed";
        };
      });
    }
  });

  // node_modules/rxjs/dist/cjs/internal/Subject.js
  var require_Subject = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/Subject.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      var __values = exports && exports.__values || function(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
          next: function() {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
          }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.AnonymousSubject = exports.Subject = void 0;
      var Observable_1 = require_Observable();
      var Subscription_1 = require_Subscription();
      var ObjectUnsubscribedError_1 = require_ObjectUnsubscribedError();
      var arrRemove_1 = require_arrRemove();
      var errorContext_1 = require_errorContext();
      var Subject4 = function(_super) {
        __extends(Subject5, _super);
        function Subject5() {
          var _this = _super.call(this) || this;
          _this.closed = false;
          _this.currentObservers = null;
          _this.observers = [];
          _this.isStopped = false;
          _this.hasError = false;
          _this.thrownError = null;
          return _this;
        }
        Subject5.prototype.lift = function(operator) {
          var subject = new AnonymousSubject(this, this);
          subject.operator = operator;
          return subject;
        };
        Subject5.prototype._throwIfClosed = function() {
          if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
          }
        };
        Subject5.prototype.next = function(value) {
          var _this = this;
          errorContext_1.errorContext(function() {
            var e_1, _a;
            _this._throwIfClosed();
            if (!_this.isStopped) {
              if (!_this.currentObservers) {
                _this.currentObservers = Array.from(_this.observers);
              }
              try {
                for (var _b = __values(_this.currentObservers), _c = _b.next(); !_c.done; _c = _b.next()) {
                  var observer = _c.value;
                  observer.next(value);
                }
              } catch (e_1_1) {
                e_1 = { error: e_1_1 };
              } finally {
                try {
                  if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                } finally {
                  if (e_1) throw e_1.error;
                }
              }
            }
          });
        };
        Subject5.prototype.error = function(err) {
          var _this = this;
          errorContext_1.errorContext(function() {
            _this._throwIfClosed();
            if (!_this.isStopped) {
              _this.hasError = _this.isStopped = true;
              _this.thrownError = err;
              var observers = _this.observers;
              while (observers.length) {
                observers.shift().error(err);
              }
            }
          });
        };
        Subject5.prototype.complete = function() {
          var _this = this;
          errorContext_1.errorContext(function() {
            _this._throwIfClosed();
            if (!_this.isStopped) {
              _this.isStopped = true;
              var observers = _this.observers;
              while (observers.length) {
                observers.shift().complete();
              }
            }
          });
        };
        Subject5.prototype.unsubscribe = function() {
          this.isStopped = this.closed = true;
          this.observers = this.currentObservers = null;
        };
        Object.defineProperty(Subject5.prototype, "observed", {
          get: function() {
            var _a;
            return ((_a = this.observers) === null || _a === void 0 ? void 0 : _a.length) > 0;
          },
          enumerable: false,
          configurable: true
        });
        Subject5.prototype._trySubscribe = function(subscriber) {
          this._throwIfClosed();
          return _super.prototype._trySubscribe.call(this, subscriber);
        };
        Subject5.prototype._subscribe = function(subscriber) {
          this._throwIfClosed();
          this._checkFinalizedStatuses(subscriber);
          return this._innerSubscribe(subscriber);
        };
        Subject5.prototype._innerSubscribe = function(subscriber) {
          var _this = this;
          var _a = this, hasError = _a.hasError, isStopped = _a.isStopped, observers = _a.observers;
          if (hasError || isStopped) {
            return Subscription_1.EMPTY_SUBSCRIPTION;
          }
          this.currentObservers = null;
          observers.push(subscriber);
          return new Subscription_1.Subscription(function() {
            _this.currentObservers = null;
            arrRemove_1.arrRemove(observers, subscriber);
          });
        };
        Subject5.prototype._checkFinalizedStatuses = function(subscriber) {
          var _a = this, hasError = _a.hasError, thrownError = _a.thrownError, isStopped = _a.isStopped;
          if (hasError) {
            subscriber.error(thrownError);
          } else if (isStopped) {
            subscriber.complete();
          }
        };
        Subject5.prototype.asObservable = function() {
          var observable2 = new Observable_1.Observable();
          observable2.source = this;
          return observable2;
        };
        Subject5.create = function(destination, source) {
          return new AnonymousSubject(destination, source);
        };
        return Subject5;
      }(Observable_1.Observable);
      exports.Subject = Subject4;
      var AnonymousSubject = function(_super) {
        __extends(AnonymousSubject2, _super);
        function AnonymousSubject2(destination, source) {
          var _this = _super.call(this) || this;
          _this.destination = destination;
          _this.source = source;
          return _this;
        }
        AnonymousSubject2.prototype.next = function(value) {
          var _a, _b;
          (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.next) === null || _b === void 0 ? void 0 : _b.call(_a, value);
        };
        AnonymousSubject2.prototype.error = function(err) {
          var _a, _b;
          (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.call(_a, err);
        };
        AnonymousSubject2.prototype.complete = function() {
          var _a, _b;
          (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.complete) === null || _b === void 0 ? void 0 : _b.call(_a);
        };
        AnonymousSubject2.prototype._subscribe = function(subscriber) {
          var _a, _b;
          return (_b = (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber)) !== null && _b !== void 0 ? _b : Subscription_1.EMPTY_SUBSCRIPTION;
        };
        return AnonymousSubject2;
      }(Subject4);
      exports.AnonymousSubject = AnonymousSubject;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/BehaviorSubject.js
  var require_BehaviorSubject = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/BehaviorSubject.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.BehaviorSubject = void 0;
      var Subject_1 = require_Subject();
      var BehaviorSubject = function(_super) {
        __extends(BehaviorSubject2, _super);
        function BehaviorSubject2(_value) {
          var _this = _super.call(this) || this;
          _this._value = _value;
          return _this;
        }
        Object.defineProperty(BehaviorSubject2.prototype, "value", {
          get: function() {
            return this.getValue();
          },
          enumerable: false,
          configurable: true
        });
        BehaviorSubject2.prototype._subscribe = function(subscriber) {
          var subscription = _super.prototype._subscribe.call(this, subscriber);
          !subscription.closed && subscriber.next(this._value);
          return subscription;
        };
        BehaviorSubject2.prototype.getValue = function() {
          var _a = this, hasError = _a.hasError, thrownError = _a.thrownError, _value = _a._value;
          if (hasError) {
            throw thrownError;
          }
          this._throwIfClosed();
          return _value;
        };
        BehaviorSubject2.prototype.next = function(value) {
          _super.prototype.next.call(this, this._value = value);
        };
        return BehaviorSubject2;
      }(Subject_1.Subject);
      exports.BehaviorSubject = BehaviorSubject;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/scheduler/dateTimestampProvider.js
  var require_dateTimestampProvider = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/scheduler/dateTimestampProvider.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.dateTimestampProvider = void 0;
      exports.dateTimestampProvider = {
        now: function() {
          return (exports.dateTimestampProvider.delegate || Date).now();
        },
        delegate: void 0
      };
    }
  });

  // node_modules/rxjs/dist/cjs/internal/ReplaySubject.js
  var require_ReplaySubject = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/ReplaySubject.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ReplaySubject = void 0;
      var Subject_1 = require_Subject();
      var dateTimestampProvider_1 = require_dateTimestampProvider();
      var ReplaySubject = function(_super) {
        __extends(ReplaySubject2, _super);
        function ReplaySubject2(_bufferSize, _windowTime, _timestampProvider) {
          if (_bufferSize === void 0) {
            _bufferSize = Infinity;
          }
          if (_windowTime === void 0) {
            _windowTime = Infinity;
          }
          if (_timestampProvider === void 0) {
            _timestampProvider = dateTimestampProvider_1.dateTimestampProvider;
          }
          var _this = _super.call(this) || this;
          _this._bufferSize = _bufferSize;
          _this._windowTime = _windowTime;
          _this._timestampProvider = _timestampProvider;
          _this._buffer = [];
          _this._infiniteTimeWindow = true;
          _this._infiniteTimeWindow = _windowTime === Infinity;
          _this._bufferSize = Math.max(1, _bufferSize);
          _this._windowTime = Math.max(1, _windowTime);
          return _this;
        }
        ReplaySubject2.prototype.next = function(value) {
          var _a = this, isStopped = _a.isStopped, _buffer = _a._buffer, _infiniteTimeWindow = _a._infiniteTimeWindow, _timestampProvider = _a._timestampProvider, _windowTime = _a._windowTime;
          if (!isStopped) {
            _buffer.push(value);
            !_infiniteTimeWindow && _buffer.push(_timestampProvider.now() + _windowTime);
          }
          this._trimBuffer();
          _super.prototype.next.call(this, value);
        };
        ReplaySubject2.prototype._subscribe = function(subscriber) {
          this._throwIfClosed();
          this._trimBuffer();
          var subscription = this._innerSubscribe(subscriber);
          var _a = this, _infiniteTimeWindow = _a._infiniteTimeWindow, _buffer = _a._buffer;
          var copy = _buffer.slice();
          for (var i = 0; i < copy.length && !subscriber.closed; i += _infiniteTimeWindow ? 1 : 2) {
            subscriber.next(copy[i]);
          }
          this._checkFinalizedStatuses(subscriber);
          return subscription;
        };
        ReplaySubject2.prototype._trimBuffer = function() {
          var _a = this, _bufferSize = _a._bufferSize, _timestampProvider = _a._timestampProvider, _buffer = _a._buffer, _infiniteTimeWindow = _a._infiniteTimeWindow;
          var adjustedBufferSize = (_infiniteTimeWindow ? 1 : 2) * _bufferSize;
          _bufferSize < Infinity && adjustedBufferSize < _buffer.length && _buffer.splice(0, _buffer.length - adjustedBufferSize);
          if (!_infiniteTimeWindow) {
            var now = _timestampProvider.now();
            var last = 0;
            for (var i = 1; i < _buffer.length && _buffer[i] <= now; i += 2) {
              last = i;
            }
            last && _buffer.splice(0, last + 1);
          }
        };
        return ReplaySubject2;
      }(Subject_1.Subject);
      exports.ReplaySubject = ReplaySubject;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/AsyncSubject.js
  var require_AsyncSubject = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/AsyncSubject.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.AsyncSubject = void 0;
      var Subject_1 = require_Subject();
      var AsyncSubject = function(_super) {
        __extends(AsyncSubject2, _super);
        function AsyncSubject2() {
          var _this = _super !== null && _super.apply(this, arguments) || this;
          _this._value = null;
          _this._hasValue = false;
          _this._isComplete = false;
          return _this;
        }
        AsyncSubject2.prototype._checkFinalizedStatuses = function(subscriber) {
          var _a = this, hasError = _a.hasError, _hasValue = _a._hasValue, _value = _a._value, thrownError = _a.thrownError, isStopped = _a.isStopped, _isComplete = _a._isComplete;
          if (hasError) {
            subscriber.error(thrownError);
          } else if (isStopped || _isComplete) {
            _hasValue && subscriber.next(_value);
            subscriber.complete();
          }
        };
        AsyncSubject2.prototype.next = function(value) {
          if (!this.isStopped) {
            this._value = value;
            this._hasValue = true;
          }
        };
        AsyncSubject2.prototype.complete = function() {
          var _a = this, _hasValue = _a._hasValue, _value = _a._value, _isComplete = _a._isComplete;
          if (!_isComplete) {
            this._isComplete = true;
            _hasValue && _super.prototype.next.call(this, _value);
            _super.prototype.complete.call(this);
          }
        };
        return AsyncSubject2;
      }(Subject_1.Subject);
      exports.AsyncSubject = AsyncSubject;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/scheduler/Action.js
  var require_Action = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/scheduler/Action.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Action = void 0;
      var Subscription_1 = require_Subscription();
      var Action = function(_super) {
        __extends(Action2, _super);
        function Action2(scheduler, work) {
          return _super.call(this) || this;
        }
        Action2.prototype.schedule = function(state, delay) {
          if (delay === void 0) {
            delay = 0;
          }
          return this;
        };
        return Action2;
      }(Subscription_1.Subscription);
      exports.Action = Action;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/scheduler/intervalProvider.js
  var require_intervalProvider = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/scheduler/intervalProvider.js"(exports) {
      "use strict";
      var __read = exports && exports.__read || function(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
          while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        } catch (error) {
          e = { error };
        } finally {
          try {
            if (r && !r.done && (m = i["return"])) m.call(i);
          } finally {
            if (e) throw e.error;
          }
        }
        return ar;
      };
      var __spreadArray = exports && exports.__spreadArray || function(to, from) {
        for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
          to[j] = from[i];
        return to;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.intervalProvider = void 0;
      exports.intervalProvider = {
        setInterval: function(handler, timeout) {
          var args = [];
          for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
          }
          var delegate = exports.intervalProvider.delegate;
          if (delegate === null || delegate === void 0 ? void 0 : delegate.setInterval) {
            return delegate.setInterval.apply(delegate, __spreadArray([handler, timeout], __read(args)));
          }
          return setInterval.apply(void 0, __spreadArray([handler, timeout], __read(args)));
        },
        clearInterval: function(handle) {
          var delegate = exports.intervalProvider.delegate;
          return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearInterval) || clearInterval)(handle);
        },
        delegate: void 0
      };
    }
  });

  // node_modules/rxjs/dist/cjs/internal/scheduler/AsyncAction.js
  var require_AsyncAction = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/scheduler/AsyncAction.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.AsyncAction = void 0;
      var Action_1 = require_Action();
      var intervalProvider_1 = require_intervalProvider();
      var arrRemove_1 = require_arrRemove();
      var AsyncAction = function(_super) {
        __extends(AsyncAction2, _super);
        function AsyncAction2(scheduler, work) {
          var _this = _super.call(this, scheduler, work) || this;
          _this.scheduler = scheduler;
          _this.work = work;
          _this.pending = false;
          return _this;
        }
        AsyncAction2.prototype.schedule = function(state, delay) {
          var _a;
          if (delay === void 0) {
            delay = 0;
          }
          if (this.closed) {
            return this;
          }
          this.state = state;
          var id = this.id;
          var scheduler = this.scheduler;
          if (id != null) {
            this.id = this.recycleAsyncId(scheduler, id, delay);
          }
          this.pending = true;
          this.delay = delay;
          this.id = (_a = this.id) !== null && _a !== void 0 ? _a : this.requestAsyncId(scheduler, this.id, delay);
          return this;
        };
        AsyncAction2.prototype.requestAsyncId = function(scheduler, _id, delay) {
          if (delay === void 0) {
            delay = 0;
          }
          return intervalProvider_1.intervalProvider.setInterval(scheduler.flush.bind(scheduler, this), delay);
        };
        AsyncAction2.prototype.recycleAsyncId = function(_scheduler, id, delay) {
          if (delay === void 0) {
            delay = 0;
          }
          if (delay != null && this.delay === delay && this.pending === false) {
            return id;
          }
          if (id != null) {
            intervalProvider_1.intervalProvider.clearInterval(id);
          }
          return void 0;
        };
        AsyncAction2.prototype.execute = function(state, delay) {
          if (this.closed) {
            return new Error("executing a cancelled action");
          }
          this.pending = false;
          var error = this._execute(state, delay);
          if (error) {
            return error;
          } else if (this.pending === false && this.id != null) {
            this.id = this.recycleAsyncId(this.scheduler, this.id, null);
          }
        };
        AsyncAction2.prototype._execute = function(state, _delay) {
          var errored = false;
          var errorValue;
          try {
            this.work(state);
          } catch (e) {
            errored = true;
            errorValue = e ? e : new Error("Scheduled action threw falsy error");
          }
          if (errored) {
            this.unsubscribe();
            return errorValue;
          }
        };
        AsyncAction2.prototype.unsubscribe = function() {
          if (!this.closed) {
            var _a = this, id = _a.id, scheduler = _a.scheduler;
            var actions = scheduler.actions;
            this.work = this.state = this.scheduler = null;
            this.pending = false;
            arrRemove_1.arrRemove(actions, this);
            if (id != null) {
              this.id = this.recycleAsyncId(scheduler, id, null);
            }
            this.delay = null;
            _super.prototype.unsubscribe.call(this);
          }
        };
        return AsyncAction2;
      }(Action_1.Action);
      exports.AsyncAction = AsyncAction;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/util/Immediate.js
  var require_Immediate = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/util/Immediate.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.TestTools = exports.Immediate = void 0;
      var nextHandle = 1;
      var resolved;
      var activeHandles = {};
      function findAndClearHandle(handle) {
        if (handle in activeHandles) {
          delete activeHandles[handle];
          return true;
        }
        return false;
      }
      exports.Immediate = {
        setImmediate: function(cb) {
          var handle = nextHandle++;
          activeHandles[handle] = true;
          if (!resolved) {
            resolved = Promise.resolve();
          }
          resolved.then(function() {
            return findAndClearHandle(handle) && cb();
          });
          return handle;
        },
        clearImmediate: function(handle) {
          findAndClearHandle(handle);
        }
      };
      exports.TestTools = {
        pending: function() {
          return Object.keys(activeHandles).length;
        }
      };
    }
  });

  // node_modules/rxjs/dist/cjs/internal/scheduler/immediateProvider.js
  var require_immediateProvider = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/scheduler/immediateProvider.js"(exports) {
      "use strict";
      var __read = exports && exports.__read || function(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
          while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        } catch (error) {
          e = { error };
        } finally {
          try {
            if (r && !r.done && (m = i["return"])) m.call(i);
          } finally {
            if (e) throw e.error;
          }
        }
        return ar;
      };
      var __spreadArray = exports && exports.__spreadArray || function(to, from) {
        for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
          to[j] = from[i];
        return to;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.immediateProvider = void 0;
      var Immediate_1 = require_Immediate();
      var setImmediate = Immediate_1.Immediate.setImmediate;
      var clearImmediate = Immediate_1.Immediate.clearImmediate;
      exports.immediateProvider = {
        setImmediate: function() {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }
          var delegate = exports.immediateProvider.delegate;
          return ((delegate === null || delegate === void 0 ? void 0 : delegate.setImmediate) || setImmediate).apply(void 0, __spreadArray([], __read(args)));
        },
        clearImmediate: function(handle) {
          var delegate = exports.immediateProvider.delegate;
          return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearImmediate) || clearImmediate)(handle);
        },
        delegate: void 0
      };
    }
  });

  // node_modules/rxjs/dist/cjs/internal/scheduler/AsapAction.js
  var require_AsapAction = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/scheduler/AsapAction.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.AsapAction = void 0;
      var AsyncAction_1 = require_AsyncAction();
      var immediateProvider_1 = require_immediateProvider();
      var AsapAction = function(_super) {
        __extends(AsapAction2, _super);
        function AsapAction2(scheduler, work) {
          var _this = _super.call(this, scheduler, work) || this;
          _this.scheduler = scheduler;
          _this.work = work;
          return _this;
        }
        AsapAction2.prototype.requestAsyncId = function(scheduler, id, delay) {
          if (delay === void 0) {
            delay = 0;
          }
          if (delay !== null && delay > 0) {
            return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
          }
          scheduler.actions.push(this);
          return scheduler._scheduled || (scheduler._scheduled = immediateProvider_1.immediateProvider.setImmediate(scheduler.flush.bind(scheduler, void 0)));
        };
        AsapAction2.prototype.recycleAsyncId = function(scheduler, id, delay) {
          var _a;
          if (delay === void 0) {
            delay = 0;
          }
          if (delay != null ? delay > 0 : this.delay > 0) {
            return _super.prototype.recycleAsyncId.call(this, scheduler, id, delay);
          }
          var actions = scheduler.actions;
          if (id != null && ((_a = actions[actions.length - 1]) === null || _a === void 0 ? void 0 : _a.id) !== id) {
            immediateProvider_1.immediateProvider.clearImmediate(id);
            if (scheduler._scheduled === id) {
              scheduler._scheduled = void 0;
            }
          }
          return void 0;
        };
        return AsapAction2;
      }(AsyncAction_1.AsyncAction);
      exports.AsapAction = AsapAction;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/Scheduler.js
  var require_Scheduler = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/Scheduler.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Scheduler = void 0;
      var dateTimestampProvider_1 = require_dateTimestampProvider();
      var Scheduler = function() {
        function Scheduler2(schedulerActionCtor, now) {
          if (now === void 0) {
            now = Scheduler2.now;
          }
          this.schedulerActionCtor = schedulerActionCtor;
          this.now = now;
        }
        Scheduler2.prototype.schedule = function(work, delay, state) {
          if (delay === void 0) {
            delay = 0;
          }
          return new this.schedulerActionCtor(this, work).schedule(state, delay);
        };
        Scheduler2.now = dateTimestampProvider_1.dateTimestampProvider.now;
        return Scheduler2;
      }();
      exports.Scheduler = Scheduler;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/scheduler/AsyncScheduler.js
  var require_AsyncScheduler = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/scheduler/AsyncScheduler.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.AsyncScheduler = void 0;
      var Scheduler_1 = require_Scheduler();
      var AsyncScheduler = function(_super) {
        __extends(AsyncScheduler2, _super);
        function AsyncScheduler2(SchedulerAction, now) {
          if (now === void 0) {
            now = Scheduler_1.Scheduler.now;
          }
          var _this = _super.call(this, SchedulerAction, now) || this;
          _this.actions = [];
          _this._active = false;
          return _this;
        }
        AsyncScheduler2.prototype.flush = function(action) {
          var actions = this.actions;
          if (this._active) {
            actions.push(action);
            return;
          }
          var error;
          this._active = true;
          do {
            if (error = action.execute(action.state, action.delay)) {
              break;
            }
          } while (action = actions.shift());
          this._active = false;
          if (error) {
            while (action = actions.shift()) {
              action.unsubscribe();
            }
            throw error;
          }
        };
        return AsyncScheduler2;
      }(Scheduler_1.Scheduler);
      exports.AsyncScheduler = AsyncScheduler;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/scheduler/AsapScheduler.js
  var require_AsapScheduler = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/scheduler/AsapScheduler.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.AsapScheduler = void 0;
      var AsyncScheduler_1 = require_AsyncScheduler();
      var AsapScheduler = function(_super) {
        __extends(AsapScheduler2, _super);
        function AsapScheduler2() {
          return _super !== null && _super.apply(this, arguments) || this;
        }
        AsapScheduler2.prototype.flush = function(action) {
          this._active = true;
          var flushId = this._scheduled;
          this._scheduled = void 0;
          var actions = this.actions;
          var error;
          action = action || actions.shift();
          do {
            if (error = action.execute(action.state, action.delay)) {
              break;
            }
          } while ((action = actions[0]) && action.id === flushId && actions.shift());
          this._active = false;
          if (error) {
            while ((action = actions[0]) && action.id === flushId && actions.shift()) {
              action.unsubscribe();
            }
            throw error;
          }
        };
        return AsapScheduler2;
      }(AsyncScheduler_1.AsyncScheduler);
      exports.AsapScheduler = AsapScheduler;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/scheduler/asap.js
  var require_asap = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/scheduler/asap.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.asap = exports.asapScheduler = void 0;
      var AsapAction_1 = require_AsapAction();
      var AsapScheduler_1 = require_AsapScheduler();
      exports.asapScheduler = new AsapScheduler_1.AsapScheduler(AsapAction_1.AsapAction);
      exports.asap = exports.asapScheduler;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/scheduler/async.js
  var require_async = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/scheduler/async.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.async = exports.asyncScheduler = void 0;
      var AsyncAction_1 = require_AsyncAction();
      var AsyncScheduler_1 = require_AsyncScheduler();
      exports.asyncScheduler = new AsyncScheduler_1.AsyncScheduler(AsyncAction_1.AsyncAction);
      exports.async = exports.asyncScheduler;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/scheduler/QueueAction.js
  var require_QueueAction = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/scheduler/QueueAction.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.QueueAction = void 0;
      var AsyncAction_1 = require_AsyncAction();
      var QueueAction = function(_super) {
        __extends(QueueAction2, _super);
        function QueueAction2(scheduler, work) {
          var _this = _super.call(this, scheduler, work) || this;
          _this.scheduler = scheduler;
          _this.work = work;
          return _this;
        }
        QueueAction2.prototype.schedule = function(state, delay) {
          if (delay === void 0) {
            delay = 0;
          }
          if (delay > 0) {
            return _super.prototype.schedule.call(this, state, delay);
          }
          this.delay = delay;
          this.state = state;
          this.scheduler.flush(this);
          return this;
        };
        QueueAction2.prototype.execute = function(state, delay) {
          return delay > 0 || this.closed ? _super.prototype.execute.call(this, state, delay) : this._execute(state, delay);
        };
        QueueAction2.prototype.requestAsyncId = function(scheduler, id, delay) {
          if (delay === void 0) {
            delay = 0;
          }
          if (delay != null && delay > 0 || delay == null && this.delay > 0) {
            return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
          }
          scheduler.flush(this);
          return 0;
        };
        return QueueAction2;
      }(AsyncAction_1.AsyncAction);
      exports.QueueAction = QueueAction;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/scheduler/QueueScheduler.js
  var require_QueueScheduler = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/scheduler/QueueScheduler.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.QueueScheduler = void 0;
      var AsyncScheduler_1 = require_AsyncScheduler();
      var QueueScheduler = function(_super) {
        __extends(QueueScheduler2, _super);
        function QueueScheduler2() {
          return _super !== null && _super.apply(this, arguments) || this;
        }
        return QueueScheduler2;
      }(AsyncScheduler_1.AsyncScheduler);
      exports.QueueScheduler = QueueScheduler;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/scheduler/queue.js
  var require_queue = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/scheduler/queue.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.queue = exports.queueScheduler = void 0;
      var QueueAction_1 = require_QueueAction();
      var QueueScheduler_1 = require_QueueScheduler();
      exports.queueScheduler = new QueueScheduler_1.QueueScheduler(QueueAction_1.QueueAction);
      exports.queue = exports.queueScheduler;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/scheduler/AnimationFrameAction.js
  var require_AnimationFrameAction = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/scheduler/AnimationFrameAction.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.AnimationFrameAction = void 0;
      var AsyncAction_1 = require_AsyncAction();
      var animationFrameProvider_1 = require_animationFrameProvider();
      var AnimationFrameAction = function(_super) {
        __extends(AnimationFrameAction2, _super);
        function AnimationFrameAction2(scheduler, work) {
          var _this = _super.call(this, scheduler, work) || this;
          _this.scheduler = scheduler;
          _this.work = work;
          return _this;
        }
        AnimationFrameAction2.prototype.requestAsyncId = function(scheduler, id, delay) {
          if (delay === void 0) {
            delay = 0;
          }
          if (delay !== null && delay > 0) {
            return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
          }
          scheduler.actions.push(this);
          return scheduler._scheduled || (scheduler._scheduled = animationFrameProvider_1.animationFrameProvider.requestAnimationFrame(function() {
            return scheduler.flush(void 0);
          }));
        };
        AnimationFrameAction2.prototype.recycleAsyncId = function(scheduler, id, delay) {
          var _a;
          if (delay === void 0) {
            delay = 0;
          }
          if (delay != null ? delay > 0 : this.delay > 0) {
            return _super.prototype.recycleAsyncId.call(this, scheduler, id, delay);
          }
          var actions = scheduler.actions;
          if (id != null && ((_a = actions[actions.length - 1]) === null || _a === void 0 ? void 0 : _a.id) !== id) {
            animationFrameProvider_1.animationFrameProvider.cancelAnimationFrame(id);
            scheduler._scheduled = void 0;
          }
          return void 0;
        };
        return AnimationFrameAction2;
      }(AsyncAction_1.AsyncAction);
      exports.AnimationFrameAction = AnimationFrameAction;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/scheduler/AnimationFrameScheduler.js
  var require_AnimationFrameScheduler = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/scheduler/AnimationFrameScheduler.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.AnimationFrameScheduler = void 0;
      var AsyncScheduler_1 = require_AsyncScheduler();
      var AnimationFrameScheduler = function(_super) {
        __extends(AnimationFrameScheduler2, _super);
        function AnimationFrameScheduler2() {
          return _super !== null && _super.apply(this, arguments) || this;
        }
        AnimationFrameScheduler2.prototype.flush = function(action) {
          this._active = true;
          var flushId = this._scheduled;
          this._scheduled = void 0;
          var actions = this.actions;
          var error;
          action = action || actions.shift();
          do {
            if (error = action.execute(action.state, action.delay)) {
              break;
            }
          } while ((action = actions[0]) && action.id === flushId && actions.shift());
          this._active = false;
          if (error) {
            while ((action = actions[0]) && action.id === flushId && actions.shift()) {
              action.unsubscribe();
            }
            throw error;
          }
        };
        return AnimationFrameScheduler2;
      }(AsyncScheduler_1.AsyncScheduler);
      exports.AnimationFrameScheduler = AnimationFrameScheduler;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/scheduler/animationFrame.js
  var require_animationFrame = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/scheduler/animationFrame.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.animationFrame = exports.animationFrameScheduler = void 0;
      var AnimationFrameAction_1 = require_AnimationFrameAction();
      var AnimationFrameScheduler_1 = require_AnimationFrameScheduler();
      exports.animationFrameScheduler = new AnimationFrameScheduler_1.AnimationFrameScheduler(AnimationFrameAction_1.AnimationFrameAction);
      exports.animationFrame = exports.animationFrameScheduler;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/scheduler/VirtualTimeScheduler.js
  var require_VirtualTimeScheduler = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/scheduler/VirtualTimeScheduler.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.VirtualAction = exports.VirtualTimeScheduler = void 0;
      var AsyncAction_1 = require_AsyncAction();
      var Subscription_1 = require_Subscription();
      var AsyncScheduler_1 = require_AsyncScheduler();
      var VirtualTimeScheduler = function(_super) {
        __extends(VirtualTimeScheduler2, _super);
        function VirtualTimeScheduler2(schedulerActionCtor, maxFrames) {
          if (schedulerActionCtor === void 0) {
            schedulerActionCtor = VirtualAction;
          }
          if (maxFrames === void 0) {
            maxFrames = Infinity;
          }
          var _this = _super.call(this, schedulerActionCtor, function() {
            return _this.frame;
          }) || this;
          _this.maxFrames = maxFrames;
          _this.frame = 0;
          _this.index = -1;
          return _this;
        }
        VirtualTimeScheduler2.prototype.flush = function() {
          var _a = this, actions = _a.actions, maxFrames = _a.maxFrames;
          var error;
          var action;
          while ((action = actions[0]) && action.delay <= maxFrames) {
            actions.shift();
            this.frame = action.delay;
            if (error = action.execute(action.state, action.delay)) {
              break;
            }
          }
          if (error) {
            while (action = actions.shift()) {
              action.unsubscribe();
            }
            throw error;
          }
        };
        VirtualTimeScheduler2.frameTimeFactor = 10;
        return VirtualTimeScheduler2;
      }(AsyncScheduler_1.AsyncScheduler);
      exports.VirtualTimeScheduler = VirtualTimeScheduler;
      var VirtualAction = function(_super) {
        __extends(VirtualAction2, _super);
        function VirtualAction2(scheduler, work, index) {
          if (index === void 0) {
            index = scheduler.index += 1;
          }
          var _this = _super.call(this, scheduler, work) || this;
          _this.scheduler = scheduler;
          _this.work = work;
          _this.index = index;
          _this.active = true;
          _this.index = scheduler.index = index;
          return _this;
        }
        VirtualAction2.prototype.schedule = function(state, delay) {
          if (delay === void 0) {
            delay = 0;
          }
          if (Number.isFinite(delay)) {
            if (!this.id) {
              return _super.prototype.schedule.call(this, state, delay);
            }
            this.active = false;
            var action = new VirtualAction2(this.scheduler, this.work);
            this.add(action);
            return action.schedule(state, delay);
          } else {
            return Subscription_1.Subscription.EMPTY;
          }
        };
        VirtualAction2.prototype.requestAsyncId = function(scheduler, id, delay) {
          if (delay === void 0) {
            delay = 0;
          }
          this.delay = scheduler.frame + delay;
          var actions = scheduler.actions;
          actions.push(this);
          actions.sort(VirtualAction2.sortActions);
          return 1;
        };
        VirtualAction2.prototype.recycleAsyncId = function(scheduler, id, delay) {
          if (delay === void 0) {
            delay = 0;
          }
          return void 0;
        };
        VirtualAction2.prototype._execute = function(state, delay) {
          if (this.active === true) {
            return _super.prototype._execute.call(this, state, delay);
          }
        };
        VirtualAction2.sortActions = function(a, b) {
          if (a.delay === b.delay) {
            if (a.index === b.index) {
              return 0;
            } else if (a.index > b.index) {
              return 1;
            } else {
              return -1;
            }
          } else if (a.delay > b.delay) {
            return 1;
          } else {
            return -1;
          }
        };
        return VirtualAction2;
      }(AsyncAction_1.AsyncAction);
      exports.VirtualAction = VirtualAction;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/observable/empty.js
  var require_empty = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/observable/empty.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.empty = exports.EMPTY = void 0;
      var Observable_1 = require_Observable();
      exports.EMPTY = new Observable_1.Observable(function(subscriber) {
        return subscriber.complete();
      });
      function empty(scheduler) {
        return scheduler ? emptyScheduled(scheduler) : exports.EMPTY;
      }
      exports.empty = empty;
      function emptyScheduled(scheduler) {
        return new Observable_1.Observable(function(subscriber) {
          return scheduler.schedule(function() {
            return subscriber.complete();
          });
        });
      }
    }
  });

  // node_modules/rxjs/dist/cjs/internal/util/isScheduler.js
  var require_isScheduler = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/util/isScheduler.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.isScheduler = void 0;
      var isFunction_1 = require_isFunction();
      function isScheduler(value) {
        return value && isFunction_1.isFunction(value.schedule);
      }
      exports.isScheduler = isScheduler;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/util/args.js
  var require_args = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/util/args.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.popNumber = exports.popScheduler = exports.popResultSelector = void 0;
      var isFunction_1 = require_isFunction();
      var isScheduler_1 = require_isScheduler();
      function last(arr) {
        return arr[arr.length - 1];
      }
      function popResultSelector(args) {
        return isFunction_1.isFunction(last(args)) ? args.pop() : void 0;
      }
      exports.popResultSelector = popResultSelector;
      function popScheduler(args) {
        return isScheduler_1.isScheduler(last(args)) ? args.pop() : void 0;
      }
      exports.popScheduler = popScheduler;
      function popNumber(args, defaultValue) {
        return typeof last(args) === "number" ? args.pop() : defaultValue;
      }
      exports.popNumber = popNumber;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/util/isArrayLike.js
  var require_isArrayLike = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/util/isArrayLike.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.isArrayLike = void 0;
      exports.isArrayLike = function(x) {
        return x && typeof x.length === "number" && typeof x !== "function";
      };
    }
  });

  // node_modules/rxjs/dist/cjs/internal/util/isPromise.js
  var require_isPromise = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/util/isPromise.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.isPromise = void 0;
      var isFunction_1 = require_isFunction();
      function isPromise(value) {
        return isFunction_1.isFunction(value === null || value === void 0 ? void 0 : value.then);
      }
      exports.isPromise = isPromise;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/util/isInteropObservable.js
  var require_isInteropObservable = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/util/isInteropObservable.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.isInteropObservable = void 0;
      var observable_1 = require_observable();
      var isFunction_1 = require_isFunction();
      function isInteropObservable(input) {
        return isFunction_1.isFunction(input[observable_1.observable]);
      }
      exports.isInteropObservable = isInteropObservable;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/util/isAsyncIterable.js
  var require_isAsyncIterable = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/util/isAsyncIterable.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.isAsyncIterable = void 0;
      var isFunction_1 = require_isFunction();
      function isAsyncIterable(obj) {
        return Symbol.asyncIterator && isFunction_1.isFunction(obj === null || obj === void 0 ? void 0 : obj[Symbol.asyncIterator]);
      }
      exports.isAsyncIterable = isAsyncIterable;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/util/throwUnobservableError.js
  var require_throwUnobservableError = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/util/throwUnobservableError.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.createInvalidObservableTypeError = void 0;
      function createInvalidObservableTypeError(input) {
        return new TypeError("You provided " + (input !== null && typeof input === "object" ? "an invalid object" : "'" + input + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.");
      }
      exports.createInvalidObservableTypeError = createInvalidObservableTypeError;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/symbol/iterator.js
  var require_iterator = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/symbol/iterator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.iterator = exports.getSymbolIterator = void 0;
      function getSymbolIterator() {
        if (typeof Symbol !== "function" || !Symbol.iterator) {
          return "@@iterator";
        }
        return Symbol.iterator;
      }
      exports.getSymbolIterator = getSymbolIterator;
      exports.iterator = getSymbolIterator();
    }
  });

  // node_modules/rxjs/dist/cjs/internal/util/isIterable.js
  var require_isIterable = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/util/isIterable.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.isIterable = void 0;
      var iterator_1 = require_iterator();
      var isFunction_1 = require_isFunction();
      function isIterable(input) {
        return isFunction_1.isFunction(input === null || input === void 0 ? void 0 : input[iterator_1.iterator]);
      }
      exports.isIterable = isIterable;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/util/isReadableStreamLike.js
  var require_isReadableStreamLike = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/util/isReadableStreamLike.js"(exports) {
      "use strict";
      var __generator = exports && exports.__generator || function(thisArg, body) {
        var _ = { label: 0, sent: function() {
          if (t[0] & 1) throw t[1];
          return t[1];
        }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
          return this;
        }), g;
        function verb(n) {
          return function(v) {
            return step([n, v]);
          };
        }
        function step(op) {
          if (f) throw new TypeError("Generator is already executing.");
          while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
              case 0:
              case 1:
                t = op;
                break;
              case 4:
                _.label++;
                return { value: op[1], done: false };
              case 5:
                _.label++;
                y = op[1];
                op = [0];
                continue;
              case 7:
                op = _.ops.pop();
                _.trys.pop();
                continue;
              default:
                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                  _ = 0;
                  continue;
                }
                if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                  _.label = op[1];
                  break;
                }
                if (op[0] === 6 && _.label < t[1]) {
                  _.label = t[1];
                  t = op;
                  break;
                }
                if (t && _.label < t[2]) {
                  _.label = t[2];
                  _.ops.push(op);
                  break;
                }
                if (t[2]) _.ops.pop();
                _.trys.pop();
                continue;
            }
            op = body.call(thisArg, _);
          } catch (e) {
            op = [6, e];
            y = 0;
          } finally {
            f = t = 0;
          }
          if (op[0] & 5) throw op[1];
          return { value: op[0] ? op[1] : void 0, done: true };
        }
      };
      var __await = exports && exports.__await || function(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
      };
      var __asyncGenerator = exports && exports.__asyncGenerator || function(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
          return this;
        }, i;
        function verb(n) {
          if (g[n]) i[n] = function(v) {
            return new Promise(function(a, b) {
              q.push([n, v, a, b]) > 1 || resume(n, v);
            });
          };
        }
        function resume(n, v) {
          try {
            step(g[n](v));
          } catch (e) {
            settle(q[0][3], e);
          }
        }
        function step(r) {
          r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
        }
        function fulfill(value) {
          resume("next", value);
        }
        function reject(value) {
          resume("throw", value);
        }
        function settle(f, v) {
          if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
        }
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.isReadableStreamLike = exports.readableStreamLikeToAsyncGenerator = void 0;
      var isFunction_1 = require_isFunction();
      function readableStreamLikeToAsyncGenerator(readableStream) {
        return __asyncGenerator(this, arguments, function readableStreamLikeToAsyncGenerator_1() {
          var reader, _a, value, done;
          return __generator(this, function(_b) {
            switch (_b.label) {
              case 0:
                reader = readableStream.getReader();
                _b.label = 1;
              case 1:
                _b.trys.push([1, , 9, 10]);
                _b.label = 2;
              case 2:
                if (false) return [3, 8];
                return [4, __await(reader.read())];
              case 3:
                _a = _b.sent(), value = _a.value, done = _a.done;
                if (!done) return [3, 5];
                return [4, __await(void 0)];
              case 4:
                return [2, _b.sent()];
              case 5:
                return [4, __await(value)];
              case 6:
                return [4, _b.sent()];
              case 7:
                _b.sent();
                return [3, 2];
              case 8:
                return [3, 10];
              case 9:
                reader.releaseLock();
                return [7];
              case 10:
                return [2];
            }
          });
        });
      }
      exports.readableStreamLikeToAsyncGenerator = readableStreamLikeToAsyncGenerator;
      function isReadableStreamLike(obj) {
        return isFunction_1.isFunction(obj === null || obj === void 0 ? void 0 : obj.getReader);
      }
      exports.isReadableStreamLike = isReadableStreamLike;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/observable/innerFrom.js
  var require_innerFrom = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/observable/innerFrom.js"(exports) {
      "use strict";
      var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
          });
        }
        return new (P || (P = Promise))(function(resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
      var __generator = exports && exports.__generator || function(thisArg, body) {
        var _ = { label: 0, sent: function() {
          if (t[0] & 1) throw t[1];
          return t[1];
        }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
          return this;
        }), g;
        function verb(n) {
          return function(v) {
            return step([n, v]);
          };
        }
        function step(op) {
          if (f) throw new TypeError("Generator is already executing.");
          while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
              case 0:
              case 1:
                t = op;
                break;
              case 4:
                _.label++;
                return { value: op[1], done: false };
              case 5:
                _.label++;
                y = op[1];
                op = [0];
                continue;
              case 7:
                op = _.ops.pop();
                _.trys.pop();
                continue;
              default:
                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                  _ = 0;
                  continue;
                }
                if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                  _.label = op[1];
                  break;
                }
                if (op[0] === 6 && _.label < t[1]) {
                  _.label = t[1];
                  t = op;
                  break;
                }
                if (t && _.label < t[2]) {
                  _.label = t[2];
                  _.ops.push(op);
                  break;
                }
                if (t[2]) _.ops.pop();
                _.trys.pop();
                continue;
            }
            op = body.call(thisArg, _);
          } catch (e) {
            op = [6, e];
            y = 0;
          } finally {
            f = t = 0;
          }
          if (op[0] & 5) throw op[1];
          return { value: op[0] ? op[1] : void 0, done: true };
        }
      };
      var __asyncValues = exports && exports.__asyncValues || function(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
          return this;
        }, i);
        function verb(n) {
          i[n] = o[n] && function(v) {
            return new Promise(function(resolve, reject) {
              v = o[n](v), settle(resolve, reject, v.done, v.value);
            });
          };
        }
        function settle(resolve, reject, d, v) {
          Promise.resolve(v).then(function(v2) {
            resolve({ value: v2, done: d });
          }, reject);
        }
      };
      var __values = exports && exports.__values || function(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
          next: function() {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
          }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.fromReadableStreamLike = exports.fromAsyncIterable = exports.fromIterable = exports.fromPromise = exports.fromArrayLike = exports.fromInteropObservable = exports.innerFrom = void 0;
      var isArrayLike_1 = require_isArrayLike();
      var isPromise_1 = require_isPromise();
      var Observable_1 = require_Observable();
      var isInteropObservable_1 = require_isInteropObservable();
      var isAsyncIterable_1 = require_isAsyncIterable();
      var throwUnobservableError_1 = require_throwUnobservableError();
      var isIterable_1 = require_isIterable();
      var isReadableStreamLike_1 = require_isReadableStreamLike();
      var isFunction_1 = require_isFunction();
      var reportUnhandledError_1 = require_reportUnhandledError();
      var observable_1 = require_observable();
      function innerFrom(input) {
        if (input instanceof Observable_1.Observable) {
          return input;
        }
        if (input != null) {
          if (isInteropObservable_1.isInteropObservable(input)) {
            return fromInteropObservable(input);
          }
          if (isArrayLike_1.isArrayLike(input)) {
            return fromArrayLike(input);
          }
          if (isPromise_1.isPromise(input)) {
            return fromPromise(input);
          }
          if (isAsyncIterable_1.isAsyncIterable(input)) {
            return fromAsyncIterable(input);
          }
          if (isIterable_1.isIterable(input)) {
            return fromIterable(input);
          }
          if (isReadableStreamLike_1.isReadableStreamLike(input)) {
            return fromReadableStreamLike(input);
          }
        }
        throw throwUnobservableError_1.createInvalidObservableTypeError(input);
      }
      exports.innerFrom = innerFrom;
      function fromInteropObservable(obj) {
        return new Observable_1.Observable(function(subscriber) {
          var obs = obj[observable_1.observable]();
          if (isFunction_1.isFunction(obs.subscribe)) {
            return obs.subscribe(subscriber);
          }
          throw new TypeError("Provided object does not correctly implement Symbol.observable");
        });
      }
      exports.fromInteropObservable = fromInteropObservable;
      function fromArrayLike(array) {
        return new Observable_1.Observable(function(subscriber) {
          for (var i = 0; i < array.length && !subscriber.closed; i++) {
            subscriber.next(array[i]);
          }
          subscriber.complete();
        });
      }
      exports.fromArrayLike = fromArrayLike;
      function fromPromise(promise) {
        return new Observable_1.Observable(function(subscriber) {
          promise.then(function(value) {
            if (!subscriber.closed) {
              subscriber.next(value);
              subscriber.complete();
            }
          }, function(err) {
            return subscriber.error(err);
          }).then(null, reportUnhandledError_1.reportUnhandledError);
        });
      }
      exports.fromPromise = fromPromise;
      function fromIterable(iterable) {
        return new Observable_1.Observable(function(subscriber) {
          var e_1, _a;
          try {
            for (var iterable_1 = __values(iterable), iterable_1_1 = iterable_1.next(); !iterable_1_1.done; iterable_1_1 = iterable_1.next()) {
              var value = iterable_1_1.value;
              subscriber.next(value);
              if (subscriber.closed) {
                return;
              }
            }
          } catch (e_1_1) {
            e_1 = { error: e_1_1 };
          } finally {
            try {
              if (iterable_1_1 && !iterable_1_1.done && (_a = iterable_1.return)) _a.call(iterable_1);
            } finally {
              if (e_1) throw e_1.error;
            }
          }
          subscriber.complete();
        });
      }
      exports.fromIterable = fromIterable;
      function fromAsyncIterable(asyncIterable) {
        return new Observable_1.Observable(function(subscriber) {
          process2(asyncIterable, subscriber).catch(function(err) {
            return subscriber.error(err);
          });
        });
      }
      exports.fromAsyncIterable = fromAsyncIterable;
      function fromReadableStreamLike(readableStream) {
        return fromAsyncIterable(isReadableStreamLike_1.readableStreamLikeToAsyncGenerator(readableStream));
      }
      exports.fromReadableStreamLike = fromReadableStreamLike;
      function process2(asyncIterable, subscriber) {
        var asyncIterable_1, asyncIterable_1_1;
        var e_2, _a;
        return __awaiter(this, void 0, void 0, function() {
          var value, e_2_1;
          return __generator(this, function(_b) {
            switch (_b.label) {
              case 0:
                _b.trys.push([0, 5, 6, 11]);
                asyncIterable_1 = __asyncValues(asyncIterable);
                _b.label = 1;
              case 1:
                return [4, asyncIterable_1.next()];
              case 2:
                if (!(asyncIterable_1_1 = _b.sent(), !asyncIterable_1_1.done)) return [3, 4];
                value = asyncIterable_1_1.value;
                subscriber.next(value);
                if (subscriber.closed) {
                  return [2];
                }
                _b.label = 3;
              case 3:
                return [3, 1];
              case 4:
                return [3, 11];
              case 5:
                e_2_1 = _b.sent();
                e_2 = { error: e_2_1 };
                return [3, 11];
              case 6:
                _b.trys.push([6, , 9, 10]);
                if (!(asyncIterable_1_1 && !asyncIterable_1_1.done && (_a = asyncIterable_1.return))) return [3, 8];
                return [4, _a.call(asyncIterable_1)];
              case 7:
                _b.sent();
                _b.label = 8;
              case 8:
                return [3, 10];
              case 9:
                if (e_2) throw e_2.error;
                return [7];
              case 10:
                return [7];
              case 11:
                subscriber.complete();
                return [2];
            }
          });
        });
      }
    }
  });

  // node_modules/rxjs/dist/cjs/internal/util/executeSchedule.js
  var require_executeSchedule = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/util/executeSchedule.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.executeSchedule = void 0;
      function executeSchedule(parentSubscription, scheduler, work, delay, repeat) {
        if (delay === void 0) {
          delay = 0;
        }
        if (repeat === void 0) {
          repeat = false;
        }
        var scheduleSubscription = scheduler.schedule(function() {
          work();
          if (repeat) {
            parentSubscription.add(this.schedule(null, delay));
          } else {
            this.unsubscribe();
          }
        }, delay);
        parentSubscription.add(scheduleSubscription);
        if (!repeat) {
          return scheduleSubscription;
        }
      }
      exports.executeSchedule = executeSchedule;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/observeOn.js
  var require_observeOn = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/observeOn.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.observeOn = void 0;
      var executeSchedule_1 = require_executeSchedule();
      var lift_1 = require_lift();
      var OperatorSubscriber_1 = require_OperatorSubscriber();
      function observeOn(scheduler, delay) {
        if (delay === void 0) {
          delay = 0;
        }
        return lift_1.operate(function(source, subscriber) {
          source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
            return executeSchedule_1.executeSchedule(subscriber, scheduler, function() {
              return subscriber.next(value);
            }, delay);
          }, function() {
            return executeSchedule_1.executeSchedule(subscriber, scheduler, function() {
              return subscriber.complete();
            }, delay);
          }, function(err) {
            return executeSchedule_1.executeSchedule(subscriber, scheduler, function() {
              return subscriber.error(err);
            }, delay);
          }));
        });
      }
      exports.observeOn = observeOn;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/subscribeOn.js
  var require_subscribeOn = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/subscribeOn.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.subscribeOn = void 0;
      var lift_1 = require_lift();
      function subscribeOn(scheduler, delay) {
        if (delay === void 0) {
          delay = 0;
        }
        return lift_1.operate(function(source, subscriber) {
          subscriber.add(scheduler.schedule(function() {
            return source.subscribe(subscriber);
          }, delay));
        });
      }
      exports.subscribeOn = subscribeOn;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/scheduled/scheduleObservable.js
  var require_scheduleObservable = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/scheduled/scheduleObservable.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.scheduleObservable = void 0;
      var innerFrom_1 = require_innerFrom();
      var observeOn_1 = require_observeOn();
      var subscribeOn_1 = require_subscribeOn();
      function scheduleObservable(input, scheduler) {
        return innerFrom_1.innerFrom(input).pipe(subscribeOn_1.subscribeOn(scheduler), observeOn_1.observeOn(scheduler));
      }
      exports.scheduleObservable = scheduleObservable;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/scheduled/schedulePromise.js
  var require_schedulePromise = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/scheduled/schedulePromise.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.schedulePromise = void 0;
      var innerFrom_1 = require_innerFrom();
      var observeOn_1 = require_observeOn();
      var subscribeOn_1 = require_subscribeOn();
      function schedulePromise(input, scheduler) {
        return innerFrom_1.innerFrom(input).pipe(subscribeOn_1.subscribeOn(scheduler), observeOn_1.observeOn(scheduler));
      }
      exports.schedulePromise = schedulePromise;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/scheduled/scheduleArray.js
  var require_scheduleArray = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/scheduled/scheduleArray.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.scheduleArray = void 0;
      var Observable_1 = require_Observable();
      function scheduleArray(input, scheduler) {
        return new Observable_1.Observable(function(subscriber) {
          var i = 0;
          return scheduler.schedule(function() {
            if (i === input.length) {
              subscriber.complete();
            } else {
              subscriber.next(input[i++]);
              if (!subscriber.closed) {
                this.schedule();
              }
            }
          });
        });
      }
      exports.scheduleArray = scheduleArray;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/scheduled/scheduleIterable.js
  var require_scheduleIterable = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/scheduled/scheduleIterable.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.scheduleIterable = void 0;
      var Observable_1 = require_Observable();
      var iterator_1 = require_iterator();
      var isFunction_1 = require_isFunction();
      var executeSchedule_1 = require_executeSchedule();
      function scheduleIterable(input, scheduler) {
        return new Observable_1.Observable(function(subscriber) {
          var iterator;
          executeSchedule_1.executeSchedule(subscriber, scheduler, function() {
            iterator = input[iterator_1.iterator]();
            executeSchedule_1.executeSchedule(subscriber, scheduler, function() {
              var _a;
              var value;
              var done;
              try {
                _a = iterator.next(), value = _a.value, done = _a.done;
              } catch (err) {
                subscriber.error(err);
                return;
              }
              if (done) {
                subscriber.complete();
              } else {
                subscriber.next(value);
              }
            }, 0, true);
          });
          return function() {
            return isFunction_1.isFunction(iterator === null || iterator === void 0 ? void 0 : iterator.return) && iterator.return();
          };
        });
      }
      exports.scheduleIterable = scheduleIterable;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/scheduled/scheduleAsyncIterable.js
  var require_scheduleAsyncIterable = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/scheduled/scheduleAsyncIterable.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.scheduleAsyncIterable = void 0;
      var Observable_1 = require_Observable();
      var executeSchedule_1 = require_executeSchedule();
      function scheduleAsyncIterable(input, scheduler) {
        if (!input) {
          throw new Error("Iterable cannot be null");
        }
        return new Observable_1.Observable(function(subscriber) {
          executeSchedule_1.executeSchedule(subscriber, scheduler, function() {
            var iterator = input[Symbol.asyncIterator]();
            executeSchedule_1.executeSchedule(subscriber, scheduler, function() {
              iterator.next().then(function(result) {
                if (result.done) {
                  subscriber.complete();
                } else {
                  subscriber.next(result.value);
                }
              });
            }, 0, true);
          });
        });
      }
      exports.scheduleAsyncIterable = scheduleAsyncIterable;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/scheduled/scheduleReadableStreamLike.js
  var require_scheduleReadableStreamLike = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/scheduled/scheduleReadableStreamLike.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.scheduleReadableStreamLike = void 0;
      var scheduleAsyncIterable_1 = require_scheduleAsyncIterable();
      var isReadableStreamLike_1 = require_isReadableStreamLike();
      function scheduleReadableStreamLike(input, scheduler) {
        return scheduleAsyncIterable_1.scheduleAsyncIterable(isReadableStreamLike_1.readableStreamLikeToAsyncGenerator(input), scheduler);
      }
      exports.scheduleReadableStreamLike = scheduleReadableStreamLike;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/scheduled/scheduled.js
  var require_scheduled = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/scheduled/scheduled.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.scheduled = void 0;
      var scheduleObservable_1 = require_scheduleObservable();
      var schedulePromise_1 = require_schedulePromise();
      var scheduleArray_1 = require_scheduleArray();
      var scheduleIterable_1 = require_scheduleIterable();
      var scheduleAsyncIterable_1 = require_scheduleAsyncIterable();
      var isInteropObservable_1 = require_isInteropObservable();
      var isPromise_1 = require_isPromise();
      var isArrayLike_1 = require_isArrayLike();
      var isIterable_1 = require_isIterable();
      var isAsyncIterable_1 = require_isAsyncIterable();
      var throwUnobservableError_1 = require_throwUnobservableError();
      var isReadableStreamLike_1 = require_isReadableStreamLike();
      var scheduleReadableStreamLike_1 = require_scheduleReadableStreamLike();
      function scheduled(input, scheduler) {
        if (input != null) {
          if (isInteropObservable_1.isInteropObservable(input)) {
            return scheduleObservable_1.scheduleObservable(input, scheduler);
          }
          if (isArrayLike_1.isArrayLike(input)) {
            return scheduleArray_1.scheduleArray(input, scheduler);
          }
          if (isPromise_1.isPromise(input)) {
            return schedulePromise_1.schedulePromise(input, scheduler);
          }
          if (isAsyncIterable_1.isAsyncIterable(input)) {
            return scheduleAsyncIterable_1.scheduleAsyncIterable(input, scheduler);
          }
          if (isIterable_1.isIterable(input)) {
            return scheduleIterable_1.scheduleIterable(input, scheduler);
          }
          if (isReadableStreamLike_1.isReadableStreamLike(input)) {
            return scheduleReadableStreamLike_1.scheduleReadableStreamLike(input, scheduler);
          }
        }
        throw throwUnobservableError_1.createInvalidObservableTypeError(input);
      }
      exports.scheduled = scheduled;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/observable/from.js
  var require_from = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/observable/from.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.from = void 0;
      var scheduled_1 = require_scheduled();
      var innerFrom_1 = require_innerFrom();
      function from(input, scheduler) {
        return scheduler ? scheduled_1.scheduled(input, scheduler) : innerFrom_1.innerFrom(input);
      }
      exports.from = from;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/observable/of.js
  var require_of = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/observable/of.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.of = void 0;
      var args_1 = require_args();
      var from_1 = require_from();
      function of() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        var scheduler = args_1.popScheduler(args);
        return from_1.from(args, scheduler);
      }
      exports.of = of;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/observable/throwError.js
  var require_throwError = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/observable/throwError.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.throwError = void 0;
      var Observable_1 = require_Observable();
      var isFunction_1 = require_isFunction();
      function throwError(errorOrErrorFactory, scheduler) {
        var errorFactory = isFunction_1.isFunction(errorOrErrorFactory) ? errorOrErrorFactory : function() {
          return errorOrErrorFactory;
        };
        var init = function(subscriber) {
          return subscriber.error(errorFactory());
        };
        return new Observable_1.Observable(scheduler ? function(subscriber) {
          return scheduler.schedule(init, 0, subscriber);
        } : init);
      }
      exports.throwError = throwError;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/Notification.js
  var require_Notification = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/Notification.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.observeNotification = exports.Notification = exports.NotificationKind = void 0;
      var empty_1 = require_empty();
      var of_1 = require_of();
      var throwError_1 = require_throwError();
      var isFunction_1 = require_isFunction();
      var NotificationKind;
      (function(NotificationKind2) {
        NotificationKind2["NEXT"] = "N";
        NotificationKind2["ERROR"] = "E";
        NotificationKind2["COMPLETE"] = "C";
      })(NotificationKind = exports.NotificationKind || (exports.NotificationKind = {}));
      var Notification = function() {
        function Notification2(kind, value, error) {
          this.kind = kind;
          this.value = value;
          this.error = error;
          this.hasValue = kind === "N";
        }
        Notification2.prototype.observe = function(observer) {
          return observeNotification(this, observer);
        };
        Notification2.prototype.do = function(nextHandler, errorHandler, completeHandler) {
          var _a = this, kind = _a.kind, value = _a.value, error = _a.error;
          return kind === "N" ? nextHandler === null || nextHandler === void 0 ? void 0 : nextHandler(value) : kind === "E" ? errorHandler === null || errorHandler === void 0 ? void 0 : errorHandler(error) : completeHandler === null || completeHandler === void 0 ? void 0 : completeHandler();
        };
        Notification2.prototype.accept = function(nextOrObserver, error, complete) {
          var _a;
          return isFunction_1.isFunction((_a = nextOrObserver) === null || _a === void 0 ? void 0 : _a.next) ? this.observe(nextOrObserver) : this.do(nextOrObserver, error, complete);
        };
        Notification2.prototype.toObservable = function() {
          var _a = this, kind = _a.kind, value = _a.value, error = _a.error;
          var result = kind === "N" ? of_1.of(value) : kind === "E" ? throwError_1.throwError(function() {
            return error;
          }) : kind === "C" ? empty_1.EMPTY : 0;
          if (!result) {
            throw new TypeError("Unexpected notification kind " + kind);
          }
          return result;
        };
        Notification2.createNext = function(value) {
          return new Notification2("N", value);
        };
        Notification2.createError = function(err) {
          return new Notification2("E", void 0, err);
        };
        Notification2.createComplete = function() {
          return Notification2.completeNotification;
        };
        Notification2.completeNotification = new Notification2("C");
        return Notification2;
      }();
      exports.Notification = Notification;
      function observeNotification(notification, observer) {
        var _a, _b, _c;
        var _d = notification, kind = _d.kind, value = _d.value, error = _d.error;
        if (typeof kind !== "string") {
          throw new TypeError('Invalid notification, missing "kind"');
        }
        kind === "N" ? (_a = observer.next) === null || _a === void 0 ? void 0 : _a.call(observer, value) : kind === "E" ? (_b = observer.error) === null || _b === void 0 ? void 0 : _b.call(observer, error) : (_c = observer.complete) === null || _c === void 0 ? void 0 : _c.call(observer);
      }
      exports.observeNotification = observeNotification;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/util/isObservable.js
  var require_isObservable = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/util/isObservable.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.isObservable = void 0;
      var Observable_1 = require_Observable();
      var isFunction_1 = require_isFunction();
      function isObservable(obj) {
        return !!obj && (obj instanceof Observable_1.Observable || isFunction_1.isFunction(obj.lift) && isFunction_1.isFunction(obj.subscribe));
      }
      exports.isObservable = isObservable;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/util/EmptyError.js
  var require_EmptyError = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/util/EmptyError.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.EmptyError = void 0;
      var createErrorClass_1 = require_createErrorClass();
      exports.EmptyError = createErrorClass_1.createErrorClass(function(_super) {
        return function EmptyErrorImpl() {
          _super(this);
          this.name = "EmptyError";
          this.message = "no elements in sequence";
        };
      });
    }
  });

  // node_modules/rxjs/dist/cjs/internal/lastValueFrom.js
  var require_lastValueFrom = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/lastValueFrom.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.lastValueFrom = void 0;
      var EmptyError_1 = require_EmptyError();
      function lastValueFrom(source, config) {
        var hasConfig = typeof config === "object";
        return new Promise(function(resolve, reject) {
          var _hasValue = false;
          var _value;
          source.subscribe({
            next: function(value) {
              _value = value;
              _hasValue = true;
            },
            error: reject,
            complete: function() {
              if (_hasValue) {
                resolve(_value);
              } else if (hasConfig) {
                resolve(config.defaultValue);
              } else {
                reject(new EmptyError_1.EmptyError());
              }
            }
          });
        });
      }
      exports.lastValueFrom = lastValueFrom;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/firstValueFrom.js
  var require_firstValueFrom = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/firstValueFrom.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.firstValueFrom = void 0;
      var EmptyError_1 = require_EmptyError();
      var Subscriber_1 = require_Subscriber();
      function firstValueFrom(source, config) {
        var hasConfig = typeof config === "object";
        return new Promise(function(resolve, reject) {
          var subscriber = new Subscriber_1.SafeSubscriber({
            next: function(value) {
              resolve(value);
              subscriber.unsubscribe();
            },
            error: reject,
            complete: function() {
              if (hasConfig) {
                resolve(config.defaultValue);
              } else {
                reject(new EmptyError_1.EmptyError());
              }
            }
          });
          source.subscribe(subscriber);
        });
      }
      exports.firstValueFrom = firstValueFrom;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/util/ArgumentOutOfRangeError.js
  var require_ArgumentOutOfRangeError = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/util/ArgumentOutOfRangeError.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ArgumentOutOfRangeError = void 0;
      var createErrorClass_1 = require_createErrorClass();
      exports.ArgumentOutOfRangeError = createErrorClass_1.createErrorClass(function(_super) {
        return function ArgumentOutOfRangeErrorImpl() {
          _super(this);
          this.name = "ArgumentOutOfRangeError";
          this.message = "argument out of range";
        };
      });
    }
  });

  // node_modules/rxjs/dist/cjs/internal/util/NotFoundError.js
  var require_NotFoundError = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/util/NotFoundError.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.NotFoundError = void 0;
      var createErrorClass_1 = require_createErrorClass();
      exports.NotFoundError = createErrorClass_1.createErrorClass(function(_super) {
        return function NotFoundErrorImpl(message) {
          _super(this);
          this.name = "NotFoundError";
          this.message = message;
        };
      });
    }
  });

  // node_modules/rxjs/dist/cjs/internal/util/SequenceError.js
  var require_SequenceError = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/util/SequenceError.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.SequenceError = void 0;
      var createErrorClass_1 = require_createErrorClass();
      exports.SequenceError = createErrorClass_1.createErrorClass(function(_super) {
        return function SequenceErrorImpl(message) {
          _super(this);
          this.name = "SequenceError";
          this.message = message;
        };
      });
    }
  });

  // node_modules/rxjs/dist/cjs/internal/util/isDate.js
  var require_isDate = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/util/isDate.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.isValidDate = void 0;
      function isValidDate(value) {
        return value instanceof Date && !isNaN(value);
      }
      exports.isValidDate = isValidDate;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/timeout.js
  var require_timeout = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/timeout.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.timeout = exports.TimeoutError = void 0;
      var async_1 = require_async();
      var isDate_1 = require_isDate();
      var lift_1 = require_lift();
      var innerFrom_1 = require_innerFrom();
      var createErrorClass_1 = require_createErrorClass();
      var OperatorSubscriber_1 = require_OperatorSubscriber();
      var executeSchedule_1 = require_executeSchedule();
      exports.TimeoutError = createErrorClass_1.createErrorClass(function(_super) {
        return function TimeoutErrorImpl(info) {
          if (info === void 0) {
            info = null;
          }
          _super(this);
          this.message = "Timeout has occurred";
          this.name = "TimeoutError";
          this.info = info;
        };
      });
      function timeout(config, schedulerArg) {
        var _a = isDate_1.isValidDate(config) ? { first: config } : typeof config === "number" ? { each: config } : config, first = _a.first, each = _a.each, _b = _a.with, _with = _b === void 0 ? timeoutErrorFactory : _b, _c = _a.scheduler, scheduler = _c === void 0 ? schedulerArg !== null && schedulerArg !== void 0 ? schedulerArg : async_1.asyncScheduler : _c, _d = _a.meta, meta = _d === void 0 ? null : _d;
        if (first == null && each == null) {
          throw new TypeError("No timeout provided.");
        }
        return lift_1.operate(function(source, subscriber) {
          var originalSourceSubscription;
          var timerSubscription;
          var lastValue = null;
          var seen = 0;
          var startTimer = function(delay) {
            timerSubscription = executeSchedule_1.executeSchedule(subscriber, scheduler, function() {
              try {
                originalSourceSubscription.unsubscribe();
                innerFrom_1.innerFrom(_with({
                  meta,
                  lastValue,
                  seen
                })).subscribe(subscriber);
              } catch (err) {
                subscriber.error(err);
              }
            }, delay);
          };
          originalSourceSubscription = source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
            timerSubscription === null || timerSubscription === void 0 ? void 0 : timerSubscription.unsubscribe();
            seen++;
            subscriber.next(lastValue = value);
            each > 0 && startTimer(each);
          }, void 0, void 0, function() {
            if (!(timerSubscription === null || timerSubscription === void 0 ? void 0 : timerSubscription.closed)) {
              timerSubscription === null || timerSubscription === void 0 ? void 0 : timerSubscription.unsubscribe();
            }
            lastValue = null;
          }));
          !seen && startTimer(first != null ? typeof first === "number" ? first : +first - scheduler.now() : each);
        });
      }
      exports.timeout = timeout;
      function timeoutErrorFactory(info) {
        throw new exports.TimeoutError(info);
      }
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/map.js
  var require_map = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/map.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.map = void 0;
      var lift_1 = require_lift();
      var OperatorSubscriber_1 = require_OperatorSubscriber();
      function map4(project, thisArg) {
        return lift_1.operate(function(source, subscriber) {
          var index = 0;
          source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
            subscriber.next(project.call(thisArg, value, index++));
          }));
        });
      }
      exports.map = map4;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/util/mapOneOrManyArgs.js
  var require_mapOneOrManyArgs = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/util/mapOneOrManyArgs.js"(exports) {
      "use strict";
      var __read = exports && exports.__read || function(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
          while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        } catch (error) {
          e = { error };
        } finally {
          try {
            if (r && !r.done && (m = i["return"])) m.call(i);
          } finally {
            if (e) throw e.error;
          }
        }
        return ar;
      };
      var __spreadArray = exports && exports.__spreadArray || function(to, from) {
        for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
          to[j] = from[i];
        return to;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.mapOneOrManyArgs = void 0;
      var map_1 = require_map();
      var isArray = Array.isArray;
      function callOrApply(fn, args) {
        return isArray(args) ? fn.apply(void 0, __spreadArray([], __read(args))) : fn(args);
      }
      function mapOneOrManyArgs(fn) {
        return map_1.map(function(args) {
          return callOrApply(fn, args);
        });
      }
      exports.mapOneOrManyArgs = mapOneOrManyArgs;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/observable/bindCallbackInternals.js
  var require_bindCallbackInternals = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/observable/bindCallbackInternals.js"(exports) {
      "use strict";
      var __read = exports && exports.__read || function(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
          while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        } catch (error) {
          e = { error };
        } finally {
          try {
            if (r && !r.done && (m = i["return"])) m.call(i);
          } finally {
            if (e) throw e.error;
          }
        }
        return ar;
      };
      var __spreadArray = exports && exports.__spreadArray || function(to, from) {
        for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
          to[j] = from[i];
        return to;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.bindCallbackInternals = void 0;
      var isScheduler_1 = require_isScheduler();
      var Observable_1 = require_Observable();
      var subscribeOn_1 = require_subscribeOn();
      var mapOneOrManyArgs_1 = require_mapOneOrManyArgs();
      var observeOn_1 = require_observeOn();
      var AsyncSubject_1 = require_AsyncSubject();
      function bindCallbackInternals(isNodeStyle, callbackFunc, resultSelector, scheduler) {
        if (resultSelector) {
          if (isScheduler_1.isScheduler(resultSelector)) {
            scheduler = resultSelector;
          } else {
            return function() {
              var args = [];
              for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
              }
              return bindCallbackInternals(isNodeStyle, callbackFunc, scheduler).apply(this, args).pipe(mapOneOrManyArgs_1.mapOneOrManyArgs(resultSelector));
            };
          }
        }
        if (scheduler) {
          return function() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i];
            }
            return bindCallbackInternals(isNodeStyle, callbackFunc).apply(this, args).pipe(subscribeOn_1.subscribeOn(scheduler), observeOn_1.observeOn(scheduler));
          };
        }
        return function() {
          var _this = this;
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }
          var subject = new AsyncSubject_1.AsyncSubject();
          var uninitialized = true;
          return new Observable_1.Observable(function(subscriber) {
            var subs = subject.subscribe(subscriber);
            if (uninitialized) {
              uninitialized = false;
              var isAsync_1 = false;
              var isComplete_1 = false;
              callbackFunc.apply(_this, __spreadArray(__spreadArray([], __read(args)), [
                function() {
                  var results = [];
                  for (var _i2 = 0; _i2 < arguments.length; _i2++) {
                    results[_i2] = arguments[_i2];
                  }
                  if (isNodeStyle) {
                    var err = results.shift();
                    if (err != null) {
                      subject.error(err);
                      return;
                    }
                  }
                  subject.next(1 < results.length ? results : results[0]);
                  isComplete_1 = true;
                  if (isAsync_1) {
                    subject.complete();
                  }
                }
              ]));
              if (isComplete_1) {
                subject.complete();
              }
              isAsync_1 = true;
            }
            return subs;
          });
        };
      }
      exports.bindCallbackInternals = bindCallbackInternals;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/observable/bindCallback.js
  var require_bindCallback = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/observable/bindCallback.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.bindCallback = void 0;
      var bindCallbackInternals_1 = require_bindCallbackInternals();
      function bindCallback(callbackFunc, resultSelector, scheduler) {
        return bindCallbackInternals_1.bindCallbackInternals(false, callbackFunc, resultSelector, scheduler);
      }
      exports.bindCallback = bindCallback;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/observable/bindNodeCallback.js
  var require_bindNodeCallback = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/observable/bindNodeCallback.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.bindNodeCallback = void 0;
      var bindCallbackInternals_1 = require_bindCallbackInternals();
      function bindNodeCallback(callbackFunc, resultSelector, scheduler) {
        return bindCallbackInternals_1.bindCallbackInternals(true, callbackFunc, resultSelector, scheduler);
      }
      exports.bindNodeCallback = bindNodeCallback;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/util/argsArgArrayOrObject.js
  var require_argsArgArrayOrObject = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/util/argsArgArrayOrObject.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.argsArgArrayOrObject = void 0;
      var isArray = Array.isArray;
      var getPrototypeOf = Object.getPrototypeOf;
      var objectProto = Object.prototype;
      var getKeys = Object.keys;
      function argsArgArrayOrObject(args) {
        if (args.length === 1) {
          var first_1 = args[0];
          if (isArray(first_1)) {
            return { args: first_1, keys: null };
          }
          if (isPOJO(first_1)) {
            var keys = getKeys(first_1);
            return {
              args: keys.map(function(key) {
                return first_1[key];
              }),
              keys
            };
          }
        }
        return { args, keys: null };
      }
      exports.argsArgArrayOrObject = argsArgArrayOrObject;
      function isPOJO(obj) {
        return obj && typeof obj === "object" && getPrototypeOf(obj) === objectProto;
      }
    }
  });

  // node_modules/rxjs/dist/cjs/internal/util/createObject.js
  var require_createObject = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/util/createObject.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.createObject = void 0;
      function createObject(keys, values) {
        return keys.reduce(function(result, key, i) {
          return result[key] = values[i], result;
        }, {});
      }
      exports.createObject = createObject;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/observable/combineLatest.js
  var require_combineLatest = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/observable/combineLatest.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.combineLatestInit = exports.combineLatest = void 0;
      var Observable_1 = require_Observable();
      var argsArgArrayOrObject_1 = require_argsArgArrayOrObject();
      var from_1 = require_from();
      var identity_1 = require_identity();
      var mapOneOrManyArgs_1 = require_mapOneOrManyArgs();
      var args_1 = require_args();
      var createObject_1 = require_createObject();
      var OperatorSubscriber_1 = require_OperatorSubscriber();
      var executeSchedule_1 = require_executeSchedule();
      function combineLatest() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        var scheduler = args_1.popScheduler(args);
        var resultSelector = args_1.popResultSelector(args);
        var _a = argsArgArrayOrObject_1.argsArgArrayOrObject(args), observables = _a.args, keys = _a.keys;
        if (observables.length === 0) {
          return from_1.from([], scheduler);
        }
        var result = new Observable_1.Observable(combineLatestInit(observables, scheduler, keys ? function(values) {
          return createObject_1.createObject(keys, values);
        } : identity_1.identity));
        return resultSelector ? result.pipe(mapOneOrManyArgs_1.mapOneOrManyArgs(resultSelector)) : result;
      }
      exports.combineLatest = combineLatest;
      function combineLatestInit(observables, scheduler, valueTransform) {
        if (valueTransform === void 0) {
          valueTransform = identity_1.identity;
        }
        return function(subscriber) {
          maybeSchedule(scheduler, function() {
            var length = observables.length;
            var values = new Array(length);
            var active = length;
            var remainingFirstValues = length;
            var _loop_1 = function(i2) {
              maybeSchedule(scheduler, function() {
                var source = from_1.from(observables[i2], scheduler);
                var hasFirstValue = false;
                source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
                  values[i2] = value;
                  if (!hasFirstValue) {
                    hasFirstValue = true;
                    remainingFirstValues--;
                  }
                  if (!remainingFirstValues) {
                    subscriber.next(valueTransform(values.slice()));
                  }
                }, function() {
                  if (!--active) {
                    subscriber.complete();
                  }
                }));
              }, subscriber);
            };
            for (var i = 0; i < length; i++) {
              _loop_1(i);
            }
          }, subscriber);
        };
      }
      exports.combineLatestInit = combineLatestInit;
      function maybeSchedule(scheduler, execute, subscription) {
        if (scheduler) {
          executeSchedule_1.executeSchedule(subscription, scheduler, execute);
        } else {
          execute();
        }
      }
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/mergeInternals.js
  var require_mergeInternals = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/mergeInternals.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.mergeInternals = void 0;
      var innerFrom_1 = require_innerFrom();
      var executeSchedule_1 = require_executeSchedule();
      var OperatorSubscriber_1 = require_OperatorSubscriber();
      function mergeInternals(source, subscriber, project, concurrent, onBeforeNext, expand, innerSubScheduler, additionalFinalizer) {
        var buffer = [];
        var active = 0;
        var index = 0;
        var isComplete = false;
        var checkComplete = function() {
          if (isComplete && !buffer.length && !active) {
            subscriber.complete();
          }
        };
        var outerNext = function(value) {
          return active < concurrent ? doInnerSub(value) : buffer.push(value);
        };
        var doInnerSub = function(value) {
          expand && subscriber.next(value);
          active++;
          var innerComplete = false;
          innerFrom_1.innerFrom(project(value, index++)).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(innerValue) {
            onBeforeNext === null || onBeforeNext === void 0 ? void 0 : onBeforeNext(innerValue);
            if (expand) {
              outerNext(innerValue);
            } else {
              subscriber.next(innerValue);
            }
          }, function() {
            innerComplete = true;
          }, void 0, function() {
            if (innerComplete) {
              try {
                active--;
                var _loop_1 = function() {
                  var bufferedValue = buffer.shift();
                  if (innerSubScheduler) {
                    executeSchedule_1.executeSchedule(subscriber, innerSubScheduler, function() {
                      return doInnerSub(bufferedValue);
                    });
                  } else {
                    doInnerSub(bufferedValue);
                  }
                };
                while (buffer.length && active < concurrent) {
                  _loop_1();
                }
                checkComplete();
              } catch (err) {
                subscriber.error(err);
              }
            }
          }));
        };
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, outerNext, function() {
          isComplete = true;
          checkComplete();
        }));
        return function() {
          additionalFinalizer === null || additionalFinalizer === void 0 ? void 0 : additionalFinalizer();
        };
      }
      exports.mergeInternals = mergeInternals;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/mergeMap.js
  var require_mergeMap = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/mergeMap.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.mergeMap = void 0;
      var map_1 = require_map();
      var innerFrom_1 = require_innerFrom();
      var lift_1 = require_lift();
      var mergeInternals_1 = require_mergeInternals();
      var isFunction_1 = require_isFunction();
      function mergeMap(project, resultSelector, concurrent) {
        if (concurrent === void 0) {
          concurrent = Infinity;
        }
        if (isFunction_1.isFunction(resultSelector)) {
          return mergeMap(function(a, i) {
            return map_1.map(function(b, ii) {
              return resultSelector(a, b, i, ii);
            })(innerFrom_1.innerFrom(project(a, i)));
          }, concurrent);
        } else if (typeof resultSelector === "number") {
          concurrent = resultSelector;
        }
        return lift_1.operate(function(source, subscriber) {
          return mergeInternals_1.mergeInternals(source, subscriber, project, concurrent);
        });
      }
      exports.mergeMap = mergeMap;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/mergeAll.js
  var require_mergeAll = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/mergeAll.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.mergeAll = void 0;
      var mergeMap_1 = require_mergeMap();
      var identity_1 = require_identity();
      function mergeAll(concurrent) {
        if (concurrent === void 0) {
          concurrent = Infinity;
        }
        return mergeMap_1.mergeMap(identity_1.identity, concurrent);
      }
      exports.mergeAll = mergeAll;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/concatAll.js
  var require_concatAll = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/concatAll.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.concatAll = void 0;
      var mergeAll_1 = require_mergeAll();
      function concatAll() {
        return mergeAll_1.mergeAll(1);
      }
      exports.concatAll = concatAll;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/observable/concat.js
  var require_concat = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/observable/concat.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.concat = void 0;
      var concatAll_1 = require_concatAll();
      var args_1 = require_args();
      var from_1 = require_from();
      function concat() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        return concatAll_1.concatAll()(from_1.from(args, args_1.popScheduler(args)));
      }
      exports.concat = concat;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/observable/defer.js
  var require_defer = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/observable/defer.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.defer = void 0;
      var Observable_1 = require_Observable();
      var innerFrom_1 = require_innerFrom();
      function defer(observableFactory) {
        return new Observable_1.Observable(function(subscriber) {
          innerFrom_1.innerFrom(observableFactory()).subscribe(subscriber);
        });
      }
      exports.defer = defer;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/observable/connectable.js
  var require_connectable = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/observable/connectable.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.connectable = void 0;
      var Subject_1 = require_Subject();
      var Observable_1 = require_Observable();
      var defer_1 = require_defer();
      var DEFAULT_CONFIG = {
        connector: function() {
          return new Subject_1.Subject();
        },
        resetOnDisconnect: true
      };
      function connectable(source, config) {
        if (config === void 0) {
          config = DEFAULT_CONFIG;
        }
        var connection = null;
        var connector = config.connector, _a = config.resetOnDisconnect, resetOnDisconnect = _a === void 0 ? true : _a;
        var subject = connector();
        var result = new Observable_1.Observable(function(subscriber) {
          return subject.subscribe(subscriber);
        });
        result.connect = function() {
          if (!connection || connection.closed) {
            connection = defer_1.defer(function() {
              return source;
            }).subscribe(subject);
            if (resetOnDisconnect) {
              connection.add(function() {
                return subject = connector();
              });
            }
          }
          return connection;
        };
        return result;
      }
      exports.connectable = connectable;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/observable/forkJoin.js
  var require_forkJoin = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/observable/forkJoin.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.forkJoin = void 0;
      var Observable_1 = require_Observable();
      var argsArgArrayOrObject_1 = require_argsArgArrayOrObject();
      var innerFrom_1 = require_innerFrom();
      var args_1 = require_args();
      var OperatorSubscriber_1 = require_OperatorSubscriber();
      var mapOneOrManyArgs_1 = require_mapOneOrManyArgs();
      var createObject_1 = require_createObject();
      function forkJoin() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        var resultSelector = args_1.popResultSelector(args);
        var _a = argsArgArrayOrObject_1.argsArgArrayOrObject(args), sources = _a.args, keys = _a.keys;
        var result = new Observable_1.Observable(function(subscriber) {
          var length = sources.length;
          if (!length) {
            subscriber.complete();
            return;
          }
          var values = new Array(length);
          var remainingCompletions = length;
          var remainingEmissions = length;
          var _loop_1 = function(sourceIndex2) {
            var hasValue = false;
            innerFrom_1.innerFrom(sources[sourceIndex2]).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
              if (!hasValue) {
                hasValue = true;
                remainingEmissions--;
              }
              values[sourceIndex2] = value;
            }, function() {
              return remainingCompletions--;
            }, void 0, function() {
              if (!remainingCompletions || !hasValue) {
                if (!remainingEmissions) {
                  subscriber.next(keys ? createObject_1.createObject(keys, values) : values);
                }
                subscriber.complete();
              }
            }));
          };
          for (var sourceIndex = 0; sourceIndex < length; sourceIndex++) {
            _loop_1(sourceIndex);
          }
        });
        return resultSelector ? result.pipe(mapOneOrManyArgs_1.mapOneOrManyArgs(resultSelector)) : result;
      }
      exports.forkJoin = forkJoin;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/observable/fromEvent.js
  var require_fromEvent = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/observable/fromEvent.js"(exports) {
      "use strict";
      var __read = exports && exports.__read || function(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
          while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        } catch (error) {
          e = { error };
        } finally {
          try {
            if (r && !r.done && (m = i["return"])) m.call(i);
          } finally {
            if (e) throw e.error;
          }
        }
        return ar;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.fromEvent = void 0;
      var innerFrom_1 = require_innerFrom();
      var Observable_1 = require_Observable();
      var mergeMap_1 = require_mergeMap();
      var isArrayLike_1 = require_isArrayLike();
      var isFunction_1 = require_isFunction();
      var mapOneOrManyArgs_1 = require_mapOneOrManyArgs();
      var nodeEventEmitterMethods = ["addListener", "removeListener"];
      var eventTargetMethods = ["addEventListener", "removeEventListener"];
      var jqueryMethods = ["on", "off"];
      function fromEvent(target, eventName, options, resultSelector) {
        if (isFunction_1.isFunction(options)) {
          resultSelector = options;
          options = void 0;
        }
        if (resultSelector) {
          return fromEvent(target, eventName, options).pipe(mapOneOrManyArgs_1.mapOneOrManyArgs(resultSelector));
        }
        var _a = __read(isEventTarget(target) ? eventTargetMethods.map(function(methodName) {
          return function(handler) {
            return target[methodName](eventName, handler, options);
          };
        }) : isNodeStyleEventEmitter(target) ? nodeEventEmitterMethods.map(toCommonHandlerRegistry(target, eventName)) : isJQueryStyleEventEmitter(target) ? jqueryMethods.map(toCommonHandlerRegistry(target, eventName)) : [], 2), add = _a[0], remove = _a[1];
        if (!add) {
          if (isArrayLike_1.isArrayLike(target)) {
            return mergeMap_1.mergeMap(function(subTarget) {
              return fromEvent(subTarget, eventName, options);
            })(innerFrom_1.innerFrom(target));
          }
        }
        if (!add) {
          throw new TypeError("Invalid event target");
        }
        return new Observable_1.Observable(function(subscriber) {
          var handler = function() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i];
            }
            return subscriber.next(1 < args.length ? args : args[0]);
          };
          add(handler);
          return function() {
            return remove(handler);
          };
        });
      }
      exports.fromEvent = fromEvent;
      function toCommonHandlerRegistry(target, eventName) {
        return function(methodName) {
          return function(handler) {
            return target[methodName](eventName, handler);
          };
        };
      }
      function isNodeStyleEventEmitter(target) {
        return isFunction_1.isFunction(target.addListener) && isFunction_1.isFunction(target.removeListener);
      }
      function isJQueryStyleEventEmitter(target) {
        return isFunction_1.isFunction(target.on) && isFunction_1.isFunction(target.off);
      }
      function isEventTarget(target) {
        return isFunction_1.isFunction(target.addEventListener) && isFunction_1.isFunction(target.removeEventListener);
      }
    }
  });

  // node_modules/rxjs/dist/cjs/internal/observable/fromEventPattern.js
  var require_fromEventPattern = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/observable/fromEventPattern.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.fromEventPattern = void 0;
      var Observable_1 = require_Observable();
      var isFunction_1 = require_isFunction();
      var mapOneOrManyArgs_1 = require_mapOneOrManyArgs();
      function fromEventPattern(addHandler, removeHandler, resultSelector) {
        if (resultSelector) {
          return fromEventPattern(addHandler, removeHandler).pipe(mapOneOrManyArgs_1.mapOneOrManyArgs(resultSelector));
        }
        return new Observable_1.Observable(function(subscriber) {
          var handler = function() {
            var e = [];
            for (var _i = 0; _i < arguments.length; _i++) {
              e[_i] = arguments[_i];
            }
            return subscriber.next(e.length === 1 ? e[0] : e);
          };
          var retValue = addHandler(handler);
          return isFunction_1.isFunction(removeHandler) ? function() {
            return removeHandler(handler, retValue);
          } : void 0;
        });
      }
      exports.fromEventPattern = fromEventPattern;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/observable/generate.js
  var require_generate = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/observable/generate.js"(exports) {
      "use strict";
      var __generator = exports && exports.__generator || function(thisArg, body) {
        var _ = { label: 0, sent: function() {
          if (t[0] & 1) throw t[1];
          return t[1];
        }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
          return this;
        }), g;
        function verb(n) {
          return function(v) {
            return step([n, v]);
          };
        }
        function step(op) {
          if (f) throw new TypeError("Generator is already executing.");
          while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
              case 0:
              case 1:
                t = op;
                break;
              case 4:
                _.label++;
                return { value: op[1], done: false };
              case 5:
                _.label++;
                y = op[1];
                op = [0];
                continue;
              case 7:
                op = _.ops.pop();
                _.trys.pop();
                continue;
              default:
                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                  _ = 0;
                  continue;
                }
                if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                  _.label = op[1];
                  break;
                }
                if (op[0] === 6 && _.label < t[1]) {
                  _.label = t[1];
                  t = op;
                  break;
                }
                if (t && _.label < t[2]) {
                  _.label = t[2];
                  _.ops.push(op);
                  break;
                }
                if (t[2]) _.ops.pop();
                _.trys.pop();
                continue;
            }
            op = body.call(thisArg, _);
          } catch (e) {
            op = [6, e];
            y = 0;
          } finally {
            f = t = 0;
          }
          if (op[0] & 5) throw op[1];
          return { value: op[0] ? op[1] : void 0, done: true };
        }
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.generate = void 0;
      var identity_1 = require_identity();
      var isScheduler_1 = require_isScheduler();
      var defer_1 = require_defer();
      var scheduleIterable_1 = require_scheduleIterable();
      function generate(initialStateOrOptions, condition, iterate, resultSelectorOrScheduler, scheduler) {
        var _a, _b;
        var resultSelector;
        var initialState;
        if (arguments.length === 1) {
          _a = initialStateOrOptions, initialState = _a.initialState, condition = _a.condition, iterate = _a.iterate, _b = _a.resultSelector, resultSelector = _b === void 0 ? identity_1.identity : _b, scheduler = _a.scheduler;
        } else {
          initialState = initialStateOrOptions;
          if (!resultSelectorOrScheduler || isScheduler_1.isScheduler(resultSelectorOrScheduler)) {
            resultSelector = identity_1.identity;
            scheduler = resultSelectorOrScheduler;
          } else {
            resultSelector = resultSelectorOrScheduler;
          }
        }
        function gen() {
          var state;
          return __generator(this, function(_a2) {
            switch (_a2.label) {
              case 0:
                state = initialState;
                _a2.label = 1;
              case 1:
                if (!(!condition || condition(state))) return [3, 4];
                return [4, resultSelector(state)];
              case 2:
                _a2.sent();
                _a2.label = 3;
              case 3:
                state = iterate(state);
                return [3, 1];
              case 4:
                return [2];
            }
          });
        }
        return defer_1.defer(scheduler ? function() {
          return scheduleIterable_1.scheduleIterable(gen(), scheduler);
        } : gen);
      }
      exports.generate = generate;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/observable/iif.js
  var require_iif = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/observable/iif.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.iif = void 0;
      var defer_1 = require_defer();
      function iif(condition, trueResult, falseResult) {
        return defer_1.defer(function() {
          return condition() ? trueResult : falseResult;
        });
      }
      exports.iif = iif;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/observable/timer.js
  var require_timer = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/observable/timer.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.timer = void 0;
      var Observable_1 = require_Observable();
      var async_1 = require_async();
      var isScheduler_1 = require_isScheduler();
      var isDate_1 = require_isDate();
      function timer2(dueTime, intervalOrScheduler, scheduler) {
        if (dueTime === void 0) {
          dueTime = 0;
        }
        if (scheduler === void 0) {
          scheduler = async_1.async;
        }
        var intervalDuration = -1;
        if (intervalOrScheduler != null) {
          if (isScheduler_1.isScheduler(intervalOrScheduler)) {
            scheduler = intervalOrScheduler;
          } else {
            intervalDuration = intervalOrScheduler;
          }
        }
        return new Observable_1.Observable(function(subscriber) {
          var due = isDate_1.isValidDate(dueTime) ? +dueTime - scheduler.now() : dueTime;
          if (due < 0) {
            due = 0;
          }
          var n = 0;
          return scheduler.schedule(function() {
            if (!subscriber.closed) {
              subscriber.next(n++);
              if (0 <= intervalDuration) {
                this.schedule(void 0, intervalDuration);
              } else {
                subscriber.complete();
              }
            }
          }, due);
        });
      }
      exports.timer = timer2;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/observable/interval.js
  var require_interval = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/observable/interval.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.interval = void 0;
      var async_1 = require_async();
      var timer_1 = require_timer();
      function interval(period, scheduler) {
        if (period === void 0) {
          period = 0;
        }
        if (scheduler === void 0) {
          scheduler = async_1.asyncScheduler;
        }
        if (period < 0) {
          period = 0;
        }
        return timer_1.timer(period, period, scheduler);
      }
      exports.interval = interval;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/observable/merge.js
  var require_merge = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/observable/merge.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.merge = void 0;
      var mergeAll_1 = require_mergeAll();
      var innerFrom_1 = require_innerFrom();
      var empty_1 = require_empty();
      var args_1 = require_args();
      var from_1 = require_from();
      function merge() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        var scheduler = args_1.popScheduler(args);
        var concurrent = args_1.popNumber(args, Infinity);
        var sources = args;
        return !sources.length ? empty_1.EMPTY : sources.length === 1 ? innerFrom_1.innerFrom(sources[0]) : mergeAll_1.mergeAll(concurrent)(from_1.from(sources, scheduler));
      }
      exports.merge = merge;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/observable/never.js
  var require_never = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/observable/never.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.never = exports.NEVER = void 0;
      var Observable_1 = require_Observable();
      var noop_1 = require_noop();
      exports.NEVER = new Observable_1.Observable(noop_1.noop);
      function never() {
        return exports.NEVER;
      }
      exports.never = never;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/util/argsOrArgArray.js
  var require_argsOrArgArray = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/util/argsOrArgArray.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.argsOrArgArray = void 0;
      var isArray = Array.isArray;
      function argsOrArgArray(args) {
        return args.length === 1 && isArray(args[0]) ? args[0] : args;
      }
      exports.argsOrArgArray = argsOrArgArray;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/observable/onErrorResumeNext.js
  var require_onErrorResumeNext = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/observable/onErrorResumeNext.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.onErrorResumeNext = void 0;
      var Observable_1 = require_Observable();
      var argsOrArgArray_1 = require_argsOrArgArray();
      var OperatorSubscriber_1 = require_OperatorSubscriber();
      var noop_1 = require_noop();
      var innerFrom_1 = require_innerFrom();
      function onErrorResumeNext() {
        var sources = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          sources[_i] = arguments[_i];
        }
        var nextSources = argsOrArgArray_1.argsOrArgArray(sources);
        return new Observable_1.Observable(function(subscriber) {
          var sourceIndex = 0;
          var subscribeNext = function() {
            if (sourceIndex < nextSources.length) {
              var nextSource = void 0;
              try {
                nextSource = innerFrom_1.innerFrom(nextSources[sourceIndex++]);
              } catch (err) {
                subscribeNext();
                return;
              }
              var innerSubscriber = new OperatorSubscriber_1.OperatorSubscriber(subscriber, void 0, noop_1.noop, noop_1.noop);
              nextSource.subscribe(innerSubscriber);
              innerSubscriber.add(subscribeNext);
            } else {
              subscriber.complete();
            }
          };
          subscribeNext();
        });
      }
      exports.onErrorResumeNext = onErrorResumeNext;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/observable/pairs.js
  var require_pairs = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/observable/pairs.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.pairs = void 0;
      var from_1 = require_from();
      function pairs(obj, scheduler) {
        return from_1.from(Object.entries(obj), scheduler);
      }
      exports.pairs = pairs;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/util/not.js
  var require_not = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/util/not.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.not = void 0;
      function not(pred, thisArg) {
        return function(value, index) {
          return !pred.call(thisArg, value, index);
        };
      }
      exports.not = not;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/filter.js
  var require_filter = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/filter.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.filter = void 0;
      var lift_1 = require_lift();
      var OperatorSubscriber_1 = require_OperatorSubscriber();
      function filter(predicate, thisArg) {
        return lift_1.operate(function(source, subscriber) {
          var index = 0;
          source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
            return predicate.call(thisArg, value, index++) && subscriber.next(value);
          }));
        });
      }
      exports.filter = filter;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/observable/partition.js
  var require_partition = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/observable/partition.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.partition = void 0;
      var not_1 = require_not();
      var filter_1 = require_filter();
      var innerFrom_1 = require_innerFrom();
      function partition(source, predicate, thisArg) {
        return [filter_1.filter(predicate, thisArg)(innerFrom_1.innerFrom(source)), filter_1.filter(not_1.not(predicate, thisArg))(innerFrom_1.innerFrom(source))];
      }
      exports.partition = partition;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/observable/race.js
  var require_race = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/observable/race.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.raceInit = exports.race = void 0;
      var Observable_1 = require_Observable();
      var innerFrom_1 = require_innerFrom();
      var argsOrArgArray_1 = require_argsOrArgArray();
      var OperatorSubscriber_1 = require_OperatorSubscriber();
      function race() {
        var sources = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          sources[_i] = arguments[_i];
        }
        sources = argsOrArgArray_1.argsOrArgArray(sources);
        return sources.length === 1 ? innerFrom_1.innerFrom(sources[0]) : new Observable_1.Observable(raceInit(sources));
      }
      exports.race = race;
      function raceInit(sources) {
        return function(subscriber) {
          var subscriptions = [];
          var _loop_1 = function(i2) {
            subscriptions.push(innerFrom_1.innerFrom(sources[i2]).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
              if (subscriptions) {
                for (var s = 0; s < subscriptions.length; s++) {
                  s !== i2 && subscriptions[s].unsubscribe();
                }
                subscriptions = null;
              }
              subscriber.next(value);
            })));
          };
          for (var i = 0; subscriptions && !subscriber.closed && i < sources.length; i++) {
            _loop_1(i);
          }
        };
      }
      exports.raceInit = raceInit;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/observable/range.js
  var require_range = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/observable/range.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.range = void 0;
      var Observable_1 = require_Observable();
      var empty_1 = require_empty();
      function range(start, count, scheduler) {
        if (count == null) {
          count = start;
          start = 0;
        }
        if (count <= 0) {
          return empty_1.EMPTY;
        }
        var end = count + start;
        return new Observable_1.Observable(scheduler ? function(subscriber) {
          var n = start;
          return scheduler.schedule(function() {
            if (n < end) {
              subscriber.next(n++);
              this.schedule();
            } else {
              subscriber.complete();
            }
          });
        } : function(subscriber) {
          var n = start;
          while (n < end && !subscriber.closed) {
            subscriber.next(n++);
          }
          subscriber.complete();
        });
      }
      exports.range = range;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/observable/using.js
  var require_using = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/observable/using.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.using = void 0;
      var Observable_1 = require_Observable();
      var innerFrom_1 = require_innerFrom();
      var empty_1 = require_empty();
      function using(resourceFactory, observableFactory) {
        return new Observable_1.Observable(function(subscriber) {
          var resource = resourceFactory();
          var result = observableFactory(resource);
          var source = result ? innerFrom_1.innerFrom(result) : empty_1.EMPTY;
          source.subscribe(subscriber);
          return function() {
            if (resource) {
              resource.unsubscribe();
            }
          };
        });
      }
      exports.using = using;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/observable/zip.js
  var require_zip = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/observable/zip.js"(exports) {
      "use strict";
      var __read = exports && exports.__read || function(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
          while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        } catch (error) {
          e = { error };
        } finally {
          try {
            if (r && !r.done && (m = i["return"])) m.call(i);
          } finally {
            if (e) throw e.error;
          }
        }
        return ar;
      };
      var __spreadArray = exports && exports.__spreadArray || function(to, from) {
        for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
          to[j] = from[i];
        return to;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.zip = void 0;
      var Observable_1 = require_Observable();
      var innerFrom_1 = require_innerFrom();
      var argsOrArgArray_1 = require_argsOrArgArray();
      var empty_1 = require_empty();
      var OperatorSubscriber_1 = require_OperatorSubscriber();
      var args_1 = require_args();
      function zip() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        var resultSelector = args_1.popResultSelector(args);
        var sources = argsOrArgArray_1.argsOrArgArray(args);
        return sources.length ? new Observable_1.Observable(function(subscriber) {
          var buffers = sources.map(function() {
            return [];
          });
          var completed = sources.map(function() {
            return false;
          });
          subscriber.add(function() {
            buffers = completed = null;
          });
          var _loop_1 = function(sourceIndex2) {
            innerFrom_1.innerFrom(sources[sourceIndex2]).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
              buffers[sourceIndex2].push(value);
              if (buffers.every(function(buffer) {
                return buffer.length;
              })) {
                var result = buffers.map(function(buffer) {
                  return buffer.shift();
                });
                subscriber.next(resultSelector ? resultSelector.apply(void 0, __spreadArray([], __read(result))) : result);
                if (buffers.some(function(buffer, i) {
                  return !buffer.length && completed[i];
                })) {
                  subscriber.complete();
                }
              }
            }, function() {
              completed[sourceIndex2] = true;
              !buffers[sourceIndex2].length && subscriber.complete();
            }));
          };
          for (var sourceIndex = 0; !subscriber.closed && sourceIndex < sources.length; sourceIndex++) {
            _loop_1(sourceIndex);
          }
          return function() {
            buffers = completed = null;
          };
        }) : empty_1.EMPTY;
      }
      exports.zip = zip;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/types.js
  var require_types = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/types.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/audit.js
  var require_audit = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/audit.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.audit = void 0;
      var lift_1 = require_lift();
      var innerFrom_1 = require_innerFrom();
      var OperatorSubscriber_1 = require_OperatorSubscriber();
      function audit(durationSelector) {
        return lift_1.operate(function(source, subscriber) {
          var hasValue = false;
          var lastValue = null;
          var durationSubscriber = null;
          var isComplete = false;
          var endDuration = function() {
            durationSubscriber === null || durationSubscriber === void 0 ? void 0 : durationSubscriber.unsubscribe();
            durationSubscriber = null;
            if (hasValue) {
              hasValue = false;
              var value = lastValue;
              lastValue = null;
              subscriber.next(value);
            }
            isComplete && subscriber.complete();
          };
          var cleanupDuration = function() {
            durationSubscriber = null;
            isComplete && subscriber.complete();
          };
          source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
            hasValue = true;
            lastValue = value;
            if (!durationSubscriber) {
              innerFrom_1.innerFrom(durationSelector(value)).subscribe(durationSubscriber = OperatorSubscriber_1.createOperatorSubscriber(subscriber, endDuration, cleanupDuration));
            }
          }, function() {
            isComplete = true;
            (!hasValue || !durationSubscriber || durationSubscriber.closed) && subscriber.complete();
          }));
        });
      }
      exports.audit = audit;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/auditTime.js
  var require_auditTime = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/auditTime.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.auditTime = void 0;
      var async_1 = require_async();
      var audit_1 = require_audit();
      var timer_1 = require_timer();
      function auditTime(duration, scheduler) {
        if (scheduler === void 0) {
          scheduler = async_1.asyncScheduler;
        }
        return audit_1.audit(function() {
          return timer_1.timer(duration, scheduler);
        });
      }
      exports.auditTime = auditTime;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/buffer.js
  var require_buffer = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/buffer.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.buffer = void 0;
      var lift_1 = require_lift();
      var noop_1 = require_noop();
      var OperatorSubscriber_1 = require_OperatorSubscriber();
      var innerFrom_1 = require_innerFrom();
      function buffer(closingNotifier) {
        return lift_1.operate(function(source, subscriber) {
          var currentBuffer = [];
          source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
            return currentBuffer.push(value);
          }, function() {
            subscriber.next(currentBuffer);
            subscriber.complete();
          }));
          innerFrom_1.innerFrom(closingNotifier).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function() {
            var b = currentBuffer;
            currentBuffer = [];
            subscriber.next(b);
          }, noop_1.noop));
          return function() {
            currentBuffer = null;
          };
        });
      }
      exports.buffer = buffer;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/bufferCount.js
  var require_bufferCount = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/bufferCount.js"(exports) {
      "use strict";
      var __values = exports && exports.__values || function(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
          next: function() {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
          }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.bufferCount = void 0;
      var lift_1 = require_lift();
      var OperatorSubscriber_1 = require_OperatorSubscriber();
      var arrRemove_1 = require_arrRemove();
      function bufferCount(bufferSize, startBufferEvery) {
        if (startBufferEvery === void 0) {
          startBufferEvery = null;
        }
        startBufferEvery = startBufferEvery !== null && startBufferEvery !== void 0 ? startBufferEvery : bufferSize;
        return lift_1.operate(function(source, subscriber) {
          var buffers = [];
          var count = 0;
          source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
            var e_1, _a, e_2, _b;
            var toEmit = null;
            if (count++ % startBufferEvery === 0) {
              buffers.push([]);
            }
            try {
              for (var buffers_1 = __values(buffers), buffers_1_1 = buffers_1.next(); !buffers_1_1.done; buffers_1_1 = buffers_1.next()) {
                var buffer = buffers_1_1.value;
                buffer.push(value);
                if (bufferSize <= buffer.length) {
                  toEmit = toEmit !== null && toEmit !== void 0 ? toEmit : [];
                  toEmit.push(buffer);
                }
              }
            } catch (e_1_1) {
              e_1 = { error: e_1_1 };
            } finally {
              try {
                if (buffers_1_1 && !buffers_1_1.done && (_a = buffers_1.return)) _a.call(buffers_1);
              } finally {
                if (e_1) throw e_1.error;
              }
            }
            if (toEmit) {
              try {
                for (var toEmit_1 = __values(toEmit), toEmit_1_1 = toEmit_1.next(); !toEmit_1_1.done; toEmit_1_1 = toEmit_1.next()) {
                  var buffer = toEmit_1_1.value;
                  arrRemove_1.arrRemove(buffers, buffer);
                  subscriber.next(buffer);
                }
              } catch (e_2_1) {
                e_2 = { error: e_2_1 };
              } finally {
                try {
                  if (toEmit_1_1 && !toEmit_1_1.done && (_b = toEmit_1.return)) _b.call(toEmit_1);
                } finally {
                  if (e_2) throw e_2.error;
                }
              }
            }
          }, function() {
            var e_3, _a;
            try {
              for (var buffers_2 = __values(buffers), buffers_2_1 = buffers_2.next(); !buffers_2_1.done; buffers_2_1 = buffers_2.next()) {
                var buffer = buffers_2_1.value;
                subscriber.next(buffer);
              }
            } catch (e_3_1) {
              e_3 = { error: e_3_1 };
            } finally {
              try {
                if (buffers_2_1 && !buffers_2_1.done && (_a = buffers_2.return)) _a.call(buffers_2);
              } finally {
                if (e_3) throw e_3.error;
              }
            }
            subscriber.complete();
          }, void 0, function() {
            buffers = null;
          }));
        });
      }
      exports.bufferCount = bufferCount;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/bufferTime.js
  var require_bufferTime = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/bufferTime.js"(exports) {
      "use strict";
      var __values = exports && exports.__values || function(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
          next: function() {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
          }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.bufferTime = void 0;
      var Subscription_1 = require_Subscription();
      var lift_1 = require_lift();
      var OperatorSubscriber_1 = require_OperatorSubscriber();
      var arrRemove_1 = require_arrRemove();
      var async_1 = require_async();
      var args_1 = require_args();
      var executeSchedule_1 = require_executeSchedule();
      function bufferTime(bufferTimeSpan) {
        var _a, _b;
        var otherArgs = [];
        for (var _i = 1; _i < arguments.length; _i++) {
          otherArgs[_i - 1] = arguments[_i];
        }
        var scheduler = (_a = args_1.popScheduler(otherArgs)) !== null && _a !== void 0 ? _a : async_1.asyncScheduler;
        var bufferCreationInterval = (_b = otherArgs[0]) !== null && _b !== void 0 ? _b : null;
        var maxBufferSize = otherArgs[1] || Infinity;
        return lift_1.operate(function(source, subscriber) {
          var bufferRecords = [];
          var restartOnEmit = false;
          var emit = function(record) {
            var buffer = record.buffer, subs = record.subs;
            subs.unsubscribe();
            arrRemove_1.arrRemove(bufferRecords, record);
            subscriber.next(buffer);
            restartOnEmit && startBuffer();
          };
          var startBuffer = function() {
            if (bufferRecords) {
              var subs = new Subscription_1.Subscription();
              subscriber.add(subs);
              var buffer = [];
              var record_1 = {
                buffer,
                subs
              };
              bufferRecords.push(record_1);
              executeSchedule_1.executeSchedule(subs, scheduler, function() {
                return emit(record_1);
              }, bufferTimeSpan);
            }
          };
          if (bufferCreationInterval !== null && bufferCreationInterval >= 0) {
            executeSchedule_1.executeSchedule(subscriber, scheduler, startBuffer, bufferCreationInterval, true);
          } else {
            restartOnEmit = true;
          }
          startBuffer();
          var bufferTimeSubscriber = OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
            var e_1, _a2;
            var recordsCopy = bufferRecords.slice();
            try {
              for (var recordsCopy_1 = __values(recordsCopy), recordsCopy_1_1 = recordsCopy_1.next(); !recordsCopy_1_1.done; recordsCopy_1_1 = recordsCopy_1.next()) {
                var record = recordsCopy_1_1.value;
                var buffer = record.buffer;
                buffer.push(value);
                maxBufferSize <= buffer.length && emit(record);
              }
            } catch (e_1_1) {
              e_1 = { error: e_1_1 };
            } finally {
              try {
                if (recordsCopy_1_1 && !recordsCopy_1_1.done && (_a2 = recordsCopy_1.return)) _a2.call(recordsCopy_1);
              } finally {
                if (e_1) throw e_1.error;
              }
            }
          }, function() {
            while (bufferRecords === null || bufferRecords === void 0 ? void 0 : bufferRecords.length) {
              subscriber.next(bufferRecords.shift().buffer);
            }
            bufferTimeSubscriber === null || bufferTimeSubscriber === void 0 ? void 0 : bufferTimeSubscriber.unsubscribe();
            subscriber.complete();
            subscriber.unsubscribe();
          }, void 0, function() {
            return bufferRecords = null;
          });
          source.subscribe(bufferTimeSubscriber);
        });
      }
      exports.bufferTime = bufferTime;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/bufferToggle.js
  var require_bufferToggle = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/bufferToggle.js"(exports) {
      "use strict";
      var __values = exports && exports.__values || function(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
          next: function() {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
          }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.bufferToggle = void 0;
      var Subscription_1 = require_Subscription();
      var lift_1 = require_lift();
      var innerFrom_1 = require_innerFrom();
      var OperatorSubscriber_1 = require_OperatorSubscriber();
      var noop_1 = require_noop();
      var arrRemove_1 = require_arrRemove();
      function bufferToggle(openings, closingSelector) {
        return lift_1.operate(function(source, subscriber) {
          var buffers = [];
          innerFrom_1.innerFrom(openings).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(openValue) {
            var buffer = [];
            buffers.push(buffer);
            var closingSubscription = new Subscription_1.Subscription();
            var emitBuffer = function() {
              arrRemove_1.arrRemove(buffers, buffer);
              subscriber.next(buffer);
              closingSubscription.unsubscribe();
            };
            closingSubscription.add(innerFrom_1.innerFrom(closingSelector(openValue)).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, emitBuffer, noop_1.noop)));
          }, noop_1.noop));
          source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
            var e_1, _a;
            try {
              for (var buffers_1 = __values(buffers), buffers_1_1 = buffers_1.next(); !buffers_1_1.done; buffers_1_1 = buffers_1.next()) {
                var buffer = buffers_1_1.value;
                buffer.push(value);
              }
            } catch (e_1_1) {
              e_1 = { error: e_1_1 };
            } finally {
              try {
                if (buffers_1_1 && !buffers_1_1.done && (_a = buffers_1.return)) _a.call(buffers_1);
              } finally {
                if (e_1) throw e_1.error;
              }
            }
          }, function() {
            while (buffers.length > 0) {
              subscriber.next(buffers.shift());
            }
            subscriber.complete();
          }));
        });
      }
      exports.bufferToggle = bufferToggle;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/bufferWhen.js
  var require_bufferWhen = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/bufferWhen.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.bufferWhen = void 0;
      var lift_1 = require_lift();
      var noop_1 = require_noop();
      var OperatorSubscriber_1 = require_OperatorSubscriber();
      var innerFrom_1 = require_innerFrom();
      function bufferWhen(closingSelector) {
        return lift_1.operate(function(source, subscriber) {
          var buffer = null;
          var closingSubscriber = null;
          var openBuffer = function() {
            closingSubscriber === null || closingSubscriber === void 0 ? void 0 : closingSubscriber.unsubscribe();
            var b = buffer;
            buffer = [];
            b && subscriber.next(b);
            innerFrom_1.innerFrom(closingSelector()).subscribe(closingSubscriber = OperatorSubscriber_1.createOperatorSubscriber(subscriber, openBuffer, noop_1.noop));
          };
          openBuffer();
          source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
            return buffer === null || buffer === void 0 ? void 0 : buffer.push(value);
          }, function() {
            buffer && subscriber.next(buffer);
            subscriber.complete();
          }, void 0, function() {
            return buffer = closingSubscriber = null;
          }));
        });
      }
      exports.bufferWhen = bufferWhen;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/catchError.js
  var require_catchError = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/catchError.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.catchError = void 0;
      var innerFrom_1 = require_innerFrom();
      var OperatorSubscriber_1 = require_OperatorSubscriber();
      var lift_1 = require_lift();
      function catchError(selector) {
        return lift_1.operate(function(source, subscriber) {
          var innerSub = null;
          var syncUnsub = false;
          var handledResult;
          innerSub = source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, void 0, void 0, function(err) {
            handledResult = innerFrom_1.innerFrom(selector(err, catchError(selector)(source)));
            if (innerSub) {
              innerSub.unsubscribe();
              innerSub = null;
              handledResult.subscribe(subscriber);
            } else {
              syncUnsub = true;
            }
          }));
          if (syncUnsub) {
            innerSub.unsubscribe();
            innerSub = null;
            handledResult.subscribe(subscriber);
          }
        });
      }
      exports.catchError = catchError;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/scanInternals.js
  var require_scanInternals = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/scanInternals.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.scanInternals = void 0;
      var OperatorSubscriber_1 = require_OperatorSubscriber();
      function scanInternals(accumulator, seed, hasSeed, emitOnNext, emitBeforeComplete) {
        return function(source, subscriber) {
          var hasState = hasSeed;
          var state = seed;
          var index = 0;
          source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
            var i = index++;
            state = hasState ? accumulator(state, value, i) : (hasState = true, value);
            emitOnNext && subscriber.next(state);
          }, emitBeforeComplete && function() {
            hasState && subscriber.next(state);
            subscriber.complete();
          }));
        };
      }
      exports.scanInternals = scanInternals;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/reduce.js
  var require_reduce = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/reduce.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.reduce = void 0;
      var scanInternals_1 = require_scanInternals();
      var lift_1 = require_lift();
      function reduce(accumulator, seed) {
        return lift_1.operate(scanInternals_1.scanInternals(accumulator, seed, arguments.length >= 2, false, true));
      }
      exports.reduce = reduce;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/toArray.js
  var require_toArray = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/toArray.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.toArray = void 0;
      var reduce_1 = require_reduce();
      var lift_1 = require_lift();
      var arrReducer = function(arr, value) {
        return arr.push(value), arr;
      };
      function toArray() {
        return lift_1.operate(function(source, subscriber) {
          reduce_1.reduce(arrReducer, [])(source).subscribe(subscriber);
        });
      }
      exports.toArray = toArray;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/joinAllInternals.js
  var require_joinAllInternals = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/joinAllInternals.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.joinAllInternals = void 0;
      var identity_1 = require_identity();
      var mapOneOrManyArgs_1 = require_mapOneOrManyArgs();
      var pipe_1 = require_pipe();
      var mergeMap_1 = require_mergeMap();
      var toArray_1 = require_toArray();
      function joinAllInternals(joinFn, project) {
        return pipe_1.pipe(toArray_1.toArray(), mergeMap_1.mergeMap(function(sources) {
          return joinFn(sources);
        }), project ? mapOneOrManyArgs_1.mapOneOrManyArgs(project) : identity_1.identity);
      }
      exports.joinAllInternals = joinAllInternals;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/combineLatestAll.js
  var require_combineLatestAll = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/combineLatestAll.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.combineLatestAll = void 0;
      var combineLatest_1 = require_combineLatest();
      var joinAllInternals_1 = require_joinAllInternals();
      function combineLatestAll(project) {
        return joinAllInternals_1.joinAllInternals(combineLatest_1.combineLatest, project);
      }
      exports.combineLatestAll = combineLatestAll;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/combineAll.js
  var require_combineAll = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/combineAll.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.combineAll = void 0;
      var combineLatestAll_1 = require_combineLatestAll();
      exports.combineAll = combineLatestAll_1.combineLatestAll;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/combineLatest.js
  var require_combineLatest2 = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/combineLatest.js"(exports) {
      "use strict";
      var __read = exports && exports.__read || function(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
          while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        } catch (error) {
          e = { error };
        } finally {
          try {
            if (r && !r.done && (m = i["return"])) m.call(i);
          } finally {
            if (e) throw e.error;
          }
        }
        return ar;
      };
      var __spreadArray = exports && exports.__spreadArray || function(to, from) {
        for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
          to[j] = from[i];
        return to;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.combineLatest = void 0;
      var combineLatest_1 = require_combineLatest();
      var lift_1 = require_lift();
      var argsOrArgArray_1 = require_argsOrArgArray();
      var mapOneOrManyArgs_1 = require_mapOneOrManyArgs();
      var pipe_1 = require_pipe();
      var args_1 = require_args();
      function combineLatest() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        var resultSelector = args_1.popResultSelector(args);
        return resultSelector ? pipe_1.pipe(combineLatest.apply(void 0, __spreadArray([], __read(args))), mapOneOrManyArgs_1.mapOneOrManyArgs(resultSelector)) : lift_1.operate(function(source, subscriber) {
          combineLatest_1.combineLatestInit(__spreadArray([source], __read(argsOrArgArray_1.argsOrArgArray(args))))(subscriber);
        });
      }
      exports.combineLatest = combineLatest;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/combineLatestWith.js
  var require_combineLatestWith = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/combineLatestWith.js"(exports) {
      "use strict";
      var __read = exports && exports.__read || function(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
          while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        } catch (error) {
          e = { error };
        } finally {
          try {
            if (r && !r.done && (m = i["return"])) m.call(i);
          } finally {
            if (e) throw e.error;
          }
        }
        return ar;
      };
      var __spreadArray = exports && exports.__spreadArray || function(to, from) {
        for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
          to[j] = from[i];
        return to;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.combineLatestWith = void 0;
      var combineLatest_1 = require_combineLatest2();
      function combineLatestWith() {
        var otherSources = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          otherSources[_i] = arguments[_i];
        }
        return combineLatest_1.combineLatest.apply(void 0, __spreadArray([], __read(otherSources)));
      }
      exports.combineLatestWith = combineLatestWith;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/concatMap.js
  var require_concatMap = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/concatMap.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.concatMap = void 0;
      var mergeMap_1 = require_mergeMap();
      var isFunction_1 = require_isFunction();
      function concatMap(project, resultSelector) {
        return isFunction_1.isFunction(resultSelector) ? mergeMap_1.mergeMap(project, resultSelector, 1) : mergeMap_1.mergeMap(project, 1);
      }
      exports.concatMap = concatMap;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/concatMapTo.js
  var require_concatMapTo = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/concatMapTo.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.concatMapTo = void 0;
      var concatMap_1 = require_concatMap();
      var isFunction_1 = require_isFunction();
      function concatMapTo(innerObservable, resultSelector) {
        return isFunction_1.isFunction(resultSelector) ? concatMap_1.concatMap(function() {
          return innerObservable;
        }, resultSelector) : concatMap_1.concatMap(function() {
          return innerObservable;
        });
      }
      exports.concatMapTo = concatMapTo;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/concat.js
  var require_concat2 = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/concat.js"(exports) {
      "use strict";
      var __read = exports && exports.__read || function(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
          while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        } catch (error) {
          e = { error };
        } finally {
          try {
            if (r && !r.done && (m = i["return"])) m.call(i);
          } finally {
            if (e) throw e.error;
          }
        }
        return ar;
      };
      var __spreadArray = exports && exports.__spreadArray || function(to, from) {
        for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
          to[j] = from[i];
        return to;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.concat = void 0;
      var lift_1 = require_lift();
      var concatAll_1 = require_concatAll();
      var args_1 = require_args();
      var from_1 = require_from();
      function concat() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        var scheduler = args_1.popScheduler(args);
        return lift_1.operate(function(source, subscriber) {
          concatAll_1.concatAll()(from_1.from(__spreadArray([source], __read(args)), scheduler)).subscribe(subscriber);
        });
      }
      exports.concat = concat;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/concatWith.js
  var require_concatWith = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/concatWith.js"(exports) {
      "use strict";
      var __read = exports && exports.__read || function(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
          while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        } catch (error) {
          e = { error };
        } finally {
          try {
            if (r && !r.done && (m = i["return"])) m.call(i);
          } finally {
            if (e) throw e.error;
          }
        }
        return ar;
      };
      var __spreadArray = exports && exports.__spreadArray || function(to, from) {
        for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
          to[j] = from[i];
        return to;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.concatWith = void 0;
      var concat_1 = require_concat2();
      function concatWith() {
        var otherSources = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          otherSources[_i] = arguments[_i];
        }
        return concat_1.concat.apply(void 0, __spreadArray([], __read(otherSources)));
      }
      exports.concatWith = concatWith;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/observable/fromSubscribable.js
  var require_fromSubscribable = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/observable/fromSubscribable.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.fromSubscribable = void 0;
      var Observable_1 = require_Observable();
      function fromSubscribable(subscribable) {
        return new Observable_1.Observable(function(subscriber) {
          return subscribable.subscribe(subscriber);
        });
      }
      exports.fromSubscribable = fromSubscribable;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/connect.js
  var require_connect = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/connect.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.connect = void 0;
      var Subject_1 = require_Subject();
      var innerFrom_1 = require_innerFrom();
      var lift_1 = require_lift();
      var fromSubscribable_1 = require_fromSubscribable();
      var DEFAULT_CONFIG = {
        connector: function() {
          return new Subject_1.Subject();
        }
      };
      function connect(selector, config) {
        if (config === void 0) {
          config = DEFAULT_CONFIG;
        }
        var connector = config.connector;
        return lift_1.operate(function(source, subscriber) {
          var subject = connector();
          innerFrom_1.innerFrom(selector(fromSubscribable_1.fromSubscribable(subject))).subscribe(subscriber);
          subscriber.add(source.subscribe(subject));
        });
      }
      exports.connect = connect;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/count.js
  var require_count = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/count.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.count = void 0;
      var reduce_1 = require_reduce();
      function count(predicate) {
        return reduce_1.reduce(function(total, value, i) {
          return !predicate || predicate(value, i) ? total + 1 : total;
        }, 0);
      }
      exports.count = count;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/debounce.js
  var require_debounce = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/debounce.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.debounce = void 0;
      var lift_1 = require_lift();
      var noop_1 = require_noop();
      var OperatorSubscriber_1 = require_OperatorSubscriber();
      var innerFrom_1 = require_innerFrom();
      function debounce(durationSelector) {
        return lift_1.operate(function(source, subscriber) {
          var hasValue = false;
          var lastValue = null;
          var durationSubscriber = null;
          var emit = function() {
            durationSubscriber === null || durationSubscriber === void 0 ? void 0 : durationSubscriber.unsubscribe();
            durationSubscriber = null;
            if (hasValue) {
              hasValue = false;
              var value = lastValue;
              lastValue = null;
              subscriber.next(value);
            }
          };
          source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
            durationSubscriber === null || durationSubscriber === void 0 ? void 0 : durationSubscriber.unsubscribe();
            hasValue = true;
            lastValue = value;
            durationSubscriber = OperatorSubscriber_1.createOperatorSubscriber(subscriber, emit, noop_1.noop);
            innerFrom_1.innerFrom(durationSelector(value)).subscribe(durationSubscriber);
          }, function() {
            emit();
            subscriber.complete();
          }, void 0, function() {
            lastValue = durationSubscriber = null;
          }));
        });
      }
      exports.debounce = debounce;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/debounceTime.js
  var require_debounceTime = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/debounceTime.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.debounceTime = void 0;
      var async_1 = require_async();
      var lift_1 = require_lift();
      var OperatorSubscriber_1 = require_OperatorSubscriber();
      function debounceTime(dueTime, scheduler) {
        if (scheduler === void 0) {
          scheduler = async_1.asyncScheduler;
        }
        return lift_1.operate(function(source, subscriber) {
          var activeTask = null;
          var lastValue = null;
          var lastTime = null;
          var emit = function() {
            if (activeTask) {
              activeTask.unsubscribe();
              activeTask = null;
              var value = lastValue;
              lastValue = null;
              subscriber.next(value);
            }
          };
          function emitWhenIdle() {
            var targetTime = lastTime + dueTime;
            var now = scheduler.now();
            if (now < targetTime) {
              activeTask = this.schedule(void 0, targetTime - now);
              subscriber.add(activeTask);
              return;
            }
            emit();
          }
          source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
            lastValue = value;
            lastTime = scheduler.now();
            if (!activeTask) {
              activeTask = scheduler.schedule(emitWhenIdle, dueTime);
              subscriber.add(activeTask);
            }
          }, function() {
            emit();
            subscriber.complete();
          }, void 0, function() {
            lastValue = activeTask = null;
          }));
        });
      }
      exports.debounceTime = debounceTime;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/defaultIfEmpty.js
  var require_defaultIfEmpty = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/defaultIfEmpty.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.defaultIfEmpty = void 0;
      var lift_1 = require_lift();
      var OperatorSubscriber_1 = require_OperatorSubscriber();
      function defaultIfEmpty(defaultValue) {
        return lift_1.operate(function(source, subscriber) {
          var hasValue = false;
          source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
            hasValue = true;
            subscriber.next(value);
          }, function() {
            if (!hasValue) {
              subscriber.next(defaultValue);
            }
            subscriber.complete();
          }));
        });
      }
      exports.defaultIfEmpty = defaultIfEmpty;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/take.js
  var require_take = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/take.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.take = void 0;
      var empty_1 = require_empty();
      var lift_1 = require_lift();
      var OperatorSubscriber_1 = require_OperatorSubscriber();
      function take(count) {
        return count <= 0 ? function() {
          return empty_1.EMPTY;
        } : lift_1.operate(function(source, subscriber) {
          var seen = 0;
          source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
            if (++seen <= count) {
              subscriber.next(value);
              if (count <= seen) {
                subscriber.complete();
              }
            }
          }));
        });
      }
      exports.take = take;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/ignoreElements.js
  var require_ignoreElements = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/ignoreElements.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ignoreElements = void 0;
      var lift_1 = require_lift();
      var OperatorSubscriber_1 = require_OperatorSubscriber();
      var noop_1 = require_noop();
      function ignoreElements() {
        return lift_1.operate(function(source, subscriber) {
          source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, noop_1.noop));
        });
      }
      exports.ignoreElements = ignoreElements;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/mapTo.js
  var require_mapTo = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/mapTo.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.mapTo = void 0;
      var map_1 = require_map();
      function mapTo(value) {
        return map_1.map(function() {
          return value;
        });
      }
      exports.mapTo = mapTo;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/delayWhen.js
  var require_delayWhen = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/delayWhen.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.delayWhen = void 0;
      var concat_1 = require_concat();
      var take_1 = require_take();
      var ignoreElements_1 = require_ignoreElements();
      var mapTo_1 = require_mapTo();
      var mergeMap_1 = require_mergeMap();
      var innerFrom_1 = require_innerFrom();
      function delayWhen(delayDurationSelector, subscriptionDelay) {
        if (subscriptionDelay) {
          return function(source) {
            return concat_1.concat(subscriptionDelay.pipe(take_1.take(1), ignoreElements_1.ignoreElements()), source.pipe(delayWhen(delayDurationSelector)));
          };
        }
        return mergeMap_1.mergeMap(function(value, index) {
          return innerFrom_1.innerFrom(delayDurationSelector(value, index)).pipe(take_1.take(1), mapTo_1.mapTo(value));
        });
      }
      exports.delayWhen = delayWhen;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/delay.js
  var require_delay = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/delay.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.delay = void 0;
      var async_1 = require_async();
      var delayWhen_1 = require_delayWhen();
      var timer_1 = require_timer();
      function delay(due, scheduler) {
        if (scheduler === void 0) {
          scheduler = async_1.asyncScheduler;
        }
        var duration = timer_1.timer(due, scheduler);
        return delayWhen_1.delayWhen(function() {
          return duration;
        });
      }
      exports.delay = delay;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/dematerialize.js
  var require_dematerialize = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/dematerialize.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.dematerialize = void 0;
      var Notification_1 = require_Notification();
      var lift_1 = require_lift();
      var OperatorSubscriber_1 = require_OperatorSubscriber();
      function dematerialize() {
        return lift_1.operate(function(source, subscriber) {
          source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(notification) {
            return Notification_1.observeNotification(notification, subscriber);
          }));
        });
      }
      exports.dematerialize = dematerialize;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/distinct.js
  var require_distinct = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/distinct.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.distinct = void 0;
      var lift_1 = require_lift();
      var OperatorSubscriber_1 = require_OperatorSubscriber();
      var noop_1 = require_noop();
      var innerFrom_1 = require_innerFrom();
      function distinct(keySelector, flushes) {
        return lift_1.operate(function(source, subscriber) {
          var distinctKeys = /* @__PURE__ */ new Set();
          source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
            var key = keySelector ? keySelector(value) : value;
            if (!distinctKeys.has(key)) {
              distinctKeys.add(key);
              subscriber.next(value);
            }
          }));
          flushes && innerFrom_1.innerFrom(flushes).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function() {
            return distinctKeys.clear();
          }, noop_1.noop));
        });
      }
      exports.distinct = distinct;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/distinctUntilChanged.js
  var require_distinctUntilChanged = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/distinctUntilChanged.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.distinctUntilChanged = void 0;
      var identity_1 = require_identity();
      var lift_1 = require_lift();
      var OperatorSubscriber_1 = require_OperatorSubscriber();
      function distinctUntilChanged(comparator, keySelector) {
        if (keySelector === void 0) {
          keySelector = identity_1.identity;
        }
        comparator = comparator !== null && comparator !== void 0 ? comparator : defaultCompare;
        return lift_1.operate(function(source, subscriber) {
          var previousKey;
          var first = true;
          source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
            var currentKey = keySelector(value);
            if (first || !comparator(previousKey, currentKey)) {
              first = false;
              previousKey = currentKey;
              subscriber.next(value);
            }
          }));
        });
      }
      exports.distinctUntilChanged = distinctUntilChanged;
      function defaultCompare(a, b) {
        return a === b;
      }
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/distinctUntilKeyChanged.js
  var require_distinctUntilKeyChanged = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/distinctUntilKeyChanged.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.distinctUntilKeyChanged = void 0;
      var distinctUntilChanged_1 = require_distinctUntilChanged();
      function distinctUntilKeyChanged(key, compare) {
        return distinctUntilChanged_1.distinctUntilChanged(function(x, y) {
          return compare ? compare(x[key], y[key]) : x[key] === y[key];
        });
      }
      exports.distinctUntilKeyChanged = distinctUntilKeyChanged;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/throwIfEmpty.js
  var require_throwIfEmpty = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/throwIfEmpty.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.throwIfEmpty = void 0;
      var EmptyError_1 = require_EmptyError();
      var lift_1 = require_lift();
      var OperatorSubscriber_1 = require_OperatorSubscriber();
      function throwIfEmpty(errorFactory) {
        if (errorFactory === void 0) {
          errorFactory = defaultErrorFactory;
        }
        return lift_1.operate(function(source, subscriber) {
          var hasValue = false;
          source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
            hasValue = true;
            subscriber.next(value);
          }, function() {
            return hasValue ? subscriber.complete() : subscriber.error(errorFactory());
          }));
        });
      }
      exports.throwIfEmpty = throwIfEmpty;
      function defaultErrorFactory() {
        return new EmptyError_1.EmptyError();
      }
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/elementAt.js
  var require_elementAt = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/elementAt.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.elementAt = void 0;
      var ArgumentOutOfRangeError_1 = require_ArgumentOutOfRangeError();
      var filter_1 = require_filter();
      var throwIfEmpty_1 = require_throwIfEmpty();
      var defaultIfEmpty_1 = require_defaultIfEmpty();
      var take_1 = require_take();
      function elementAt(index, defaultValue) {
        if (index < 0) {
          throw new ArgumentOutOfRangeError_1.ArgumentOutOfRangeError();
        }
        var hasDefaultValue = arguments.length >= 2;
        return function(source) {
          return source.pipe(filter_1.filter(function(v, i) {
            return i === index;
          }), take_1.take(1), hasDefaultValue ? defaultIfEmpty_1.defaultIfEmpty(defaultValue) : throwIfEmpty_1.throwIfEmpty(function() {
            return new ArgumentOutOfRangeError_1.ArgumentOutOfRangeError();
          }));
        };
      }
      exports.elementAt = elementAt;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/endWith.js
  var require_endWith = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/endWith.js"(exports) {
      "use strict";
      var __read = exports && exports.__read || function(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
          while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        } catch (error) {
          e = { error };
        } finally {
          try {
            if (r && !r.done && (m = i["return"])) m.call(i);
          } finally {
            if (e) throw e.error;
          }
        }
        return ar;
      };
      var __spreadArray = exports && exports.__spreadArray || function(to, from) {
        for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
          to[j] = from[i];
        return to;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.endWith = void 0;
      var concat_1 = require_concat();
      var of_1 = require_of();
      function endWith() {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          values[_i] = arguments[_i];
        }
        return function(source) {
          return concat_1.concat(source, of_1.of.apply(void 0, __spreadArray([], __read(values))));
        };
      }
      exports.endWith = endWith;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/every.js
  var require_every = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/every.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.every = void 0;
      var lift_1 = require_lift();
      var OperatorSubscriber_1 = require_OperatorSubscriber();
      function every(predicate, thisArg) {
        return lift_1.operate(function(source, subscriber) {
          var index = 0;
          source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
            if (!predicate.call(thisArg, value, index++, source)) {
              subscriber.next(false);
              subscriber.complete();
            }
          }, function() {
            subscriber.next(true);
            subscriber.complete();
          }));
        });
      }
      exports.every = every;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/exhaustMap.js
  var require_exhaustMap = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/exhaustMap.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.exhaustMap = void 0;
      var map_1 = require_map();
      var innerFrom_1 = require_innerFrom();
      var lift_1 = require_lift();
      var OperatorSubscriber_1 = require_OperatorSubscriber();
      function exhaustMap(project, resultSelector) {
        if (resultSelector) {
          return function(source) {
            return source.pipe(exhaustMap(function(a, i) {
              return innerFrom_1.innerFrom(project(a, i)).pipe(map_1.map(function(b, ii) {
                return resultSelector(a, b, i, ii);
              }));
            }));
          };
        }
        return lift_1.operate(function(source, subscriber) {
          var index = 0;
          var innerSub = null;
          var isComplete = false;
          source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(outerValue) {
            if (!innerSub) {
              innerSub = OperatorSubscriber_1.createOperatorSubscriber(subscriber, void 0, function() {
                innerSub = null;
                isComplete && subscriber.complete();
              });
              innerFrom_1.innerFrom(project(outerValue, index++)).subscribe(innerSub);
            }
          }, function() {
            isComplete = true;
            !innerSub && subscriber.complete();
          }));
        });
      }
      exports.exhaustMap = exhaustMap;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/exhaustAll.js
  var require_exhaustAll = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/exhaustAll.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.exhaustAll = void 0;
      var exhaustMap_1 = require_exhaustMap();
      var identity_1 = require_identity();
      function exhaustAll() {
        return exhaustMap_1.exhaustMap(identity_1.identity);
      }
      exports.exhaustAll = exhaustAll;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/exhaust.js
  var require_exhaust = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/exhaust.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.exhaust = void 0;
      var exhaustAll_1 = require_exhaustAll();
      exports.exhaust = exhaustAll_1.exhaustAll;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/expand.js
  var require_expand = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/expand.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.expand = void 0;
      var lift_1 = require_lift();
      var mergeInternals_1 = require_mergeInternals();
      function expand(project, concurrent, scheduler) {
        if (concurrent === void 0) {
          concurrent = Infinity;
        }
        concurrent = (concurrent || 0) < 1 ? Infinity : concurrent;
        return lift_1.operate(function(source, subscriber) {
          return mergeInternals_1.mergeInternals(source, subscriber, project, concurrent, void 0, true, scheduler);
        });
      }
      exports.expand = expand;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/finalize.js
  var require_finalize = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/finalize.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.finalize = void 0;
      var lift_1 = require_lift();
      function finalize(callback) {
        return lift_1.operate(function(source, subscriber) {
          try {
            source.subscribe(subscriber);
          } finally {
            subscriber.add(callback);
          }
        });
      }
      exports.finalize = finalize;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/find.js
  var require_find = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/find.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.createFind = exports.find = void 0;
      var lift_1 = require_lift();
      var OperatorSubscriber_1 = require_OperatorSubscriber();
      function find(predicate, thisArg) {
        return lift_1.operate(createFind(predicate, thisArg, "value"));
      }
      exports.find = find;
      function createFind(predicate, thisArg, emit) {
        var findIndex = emit === "index";
        return function(source, subscriber) {
          var index = 0;
          source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
            var i = index++;
            if (predicate.call(thisArg, value, i, source)) {
              subscriber.next(findIndex ? i : value);
              subscriber.complete();
            }
          }, function() {
            subscriber.next(findIndex ? -1 : void 0);
            subscriber.complete();
          }));
        };
      }
      exports.createFind = createFind;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/findIndex.js
  var require_findIndex = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/findIndex.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.findIndex = void 0;
      var lift_1 = require_lift();
      var find_1 = require_find();
      function findIndex(predicate, thisArg) {
        return lift_1.operate(find_1.createFind(predicate, thisArg, "index"));
      }
      exports.findIndex = findIndex;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/first.js
  var require_first = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/first.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.first = void 0;
      var EmptyError_1 = require_EmptyError();
      var filter_1 = require_filter();
      var take_1 = require_take();
      var defaultIfEmpty_1 = require_defaultIfEmpty();
      var throwIfEmpty_1 = require_throwIfEmpty();
      var identity_1 = require_identity();
      function first(predicate, defaultValue) {
        var hasDefaultValue = arguments.length >= 2;
        return function(source) {
          return source.pipe(predicate ? filter_1.filter(function(v, i) {
            return predicate(v, i, source);
          }) : identity_1.identity, take_1.take(1), hasDefaultValue ? defaultIfEmpty_1.defaultIfEmpty(defaultValue) : throwIfEmpty_1.throwIfEmpty(function() {
            return new EmptyError_1.EmptyError();
          }));
        };
      }
      exports.first = first;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/groupBy.js
  var require_groupBy = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/groupBy.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.groupBy = void 0;
      var Observable_1 = require_Observable();
      var innerFrom_1 = require_innerFrom();
      var Subject_1 = require_Subject();
      var lift_1 = require_lift();
      var OperatorSubscriber_1 = require_OperatorSubscriber();
      function groupBy(keySelector, elementOrOptions, duration, connector) {
        return lift_1.operate(function(source, subscriber) {
          var element;
          if (!elementOrOptions || typeof elementOrOptions === "function") {
            element = elementOrOptions;
          } else {
            duration = elementOrOptions.duration, element = elementOrOptions.element, connector = elementOrOptions.connector;
          }
          var groups = /* @__PURE__ */ new Map();
          var notify = function(cb) {
            groups.forEach(cb);
            cb(subscriber);
          };
          var handleError = function(err) {
            return notify(function(consumer) {
              return consumer.error(err);
            });
          };
          var activeGroups = 0;
          var teardownAttempted = false;
          var groupBySourceSubscriber = new OperatorSubscriber_1.OperatorSubscriber(subscriber, function(value) {
            try {
              var key_1 = keySelector(value);
              var group_1 = groups.get(key_1);
              if (!group_1) {
                groups.set(key_1, group_1 = connector ? connector() : new Subject_1.Subject());
                var grouped = createGroupedObservable(key_1, group_1);
                subscriber.next(grouped);
                if (duration) {
                  var durationSubscriber_1 = OperatorSubscriber_1.createOperatorSubscriber(group_1, function() {
                    group_1.complete();
                    durationSubscriber_1 === null || durationSubscriber_1 === void 0 ? void 0 : durationSubscriber_1.unsubscribe();
                  }, void 0, void 0, function() {
                    return groups.delete(key_1);
                  });
                  groupBySourceSubscriber.add(innerFrom_1.innerFrom(duration(grouped)).subscribe(durationSubscriber_1));
                }
              }
              group_1.next(element ? element(value) : value);
            } catch (err) {
              handleError(err);
            }
          }, function() {
            return notify(function(consumer) {
              return consumer.complete();
            });
          }, handleError, function() {
            return groups.clear();
          }, function() {
            teardownAttempted = true;
            return activeGroups === 0;
          });
          source.subscribe(groupBySourceSubscriber);
          function createGroupedObservable(key, groupSubject) {
            var result = new Observable_1.Observable(function(groupSubscriber) {
              activeGroups++;
              var innerSub = groupSubject.subscribe(groupSubscriber);
              return function() {
                innerSub.unsubscribe();
                --activeGroups === 0 && teardownAttempted && groupBySourceSubscriber.unsubscribe();
              };
            });
            result.key = key;
            return result;
          }
        });
      }
      exports.groupBy = groupBy;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/isEmpty.js
  var require_isEmpty = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/isEmpty.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.isEmpty = void 0;
      var lift_1 = require_lift();
      var OperatorSubscriber_1 = require_OperatorSubscriber();
      function isEmpty() {
        return lift_1.operate(function(source, subscriber) {
          source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function() {
            subscriber.next(false);
            subscriber.complete();
          }, function() {
            subscriber.next(true);
            subscriber.complete();
          }));
        });
      }
      exports.isEmpty = isEmpty;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/takeLast.js
  var require_takeLast = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/takeLast.js"(exports) {
      "use strict";
      var __values = exports && exports.__values || function(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
          next: function() {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
          }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.takeLast = void 0;
      var empty_1 = require_empty();
      var lift_1 = require_lift();
      var OperatorSubscriber_1 = require_OperatorSubscriber();
      function takeLast(count) {
        return count <= 0 ? function() {
          return empty_1.EMPTY;
        } : lift_1.operate(function(source, subscriber) {
          var buffer = [];
          source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
            buffer.push(value);
            count < buffer.length && buffer.shift();
          }, function() {
            var e_1, _a;
            try {
              for (var buffer_1 = __values(buffer), buffer_1_1 = buffer_1.next(); !buffer_1_1.done; buffer_1_1 = buffer_1.next()) {
                var value = buffer_1_1.value;
                subscriber.next(value);
              }
            } catch (e_1_1) {
              e_1 = { error: e_1_1 };
            } finally {
              try {
                if (buffer_1_1 && !buffer_1_1.done && (_a = buffer_1.return)) _a.call(buffer_1);
              } finally {
                if (e_1) throw e_1.error;
              }
            }
            subscriber.complete();
          }, void 0, function() {
            buffer = null;
          }));
        });
      }
      exports.takeLast = takeLast;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/last.js
  var require_last = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/last.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.last = void 0;
      var EmptyError_1 = require_EmptyError();
      var filter_1 = require_filter();
      var takeLast_1 = require_takeLast();
      var throwIfEmpty_1 = require_throwIfEmpty();
      var defaultIfEmpty_1 = require_defaultIfEmpty();
      var identity_1 = require_identity();
      function last(predicate, defaultValue) {
        var hasDefaultValue = arguments.length >= 2;
        return function(source) {
          return source.pipe(predicate ? filter_1.filter(function(v, i) {
            return predicate(v, i, source);
          }) : identity_1.identity, takeLast_1.takeLast(1), hasDefaultValue ? defaultIfEmpty_1.defaultIfEmpty(defaultValue) : throwIfEmpty_1.throwIfEmpty(function() {
            return new EmptyError_1.EmptyError();
          }));
        };
      }
      exports.last = last;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/materialize.js
  var require_materialize = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/materialize.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.materialize = void 0;
      var Notification_1 = require_Notification();
      var lift_1 = require_lift();
      var OperatorSubscriber_1 = require_OperatorSubscriber();
      function materialize() {
        return lift_1.operate(function(source, subscriber) {
          source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
            subscriber.next(Notification_1.Notification.createNext(value));
          }, function() {
            subscriber.next(Notification_1.Notification.createComplete());
            subscriber.complete();
          }, function(err) {
            subscriber.next(Notification_1.Notification.createError(err));
            subscriber.complete();
          }));
        });
      }
      exports.materialize = materialize;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/max.js
  var require_max = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/max.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.max = void 0;
      var reduce_1 = require_reduce();
      var isFunction_1 = require_isFunction();
      function max(comparer) {
        return reduce_1.reduce(isFunction_1.isFunction(comparer) ? function(x, y) {
          return comparer(x, y) > 0 ? x : y;
        } : function(x, y) {
          return x > y ? x : y;
        });
      }
      exports.max = max;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/flatMap.js
  var require_flatMap = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/flatMap.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.flatMap = void 0;
      var mergeMap_1 = require_mergeMap();
      exports.flatMap = mergeMap_1.mergeMap;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/mergeMapTo.js
  var require_mergeMapTo = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/mergeMapTo.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.mergeMapTo = void 0;
      var mergeMap_1 = require_mergeMap();
      var isFunction_1 = require_isFunction();
      function mergeMapTo(innerObservable, resultSelector, concurrent) {
        if (concurrent === void 0) {
          concurrent = Infinity;
        }
        if (isFunction_1.isFunction(resultSelector)) {
          return mergeMap_1.mergeMap(function() {
            return innerObservable;
          }, resultSelector, concurrent);
        }
        if (typeof resultSelector === "number") {
          concurrent = resultSelector;
        }
        return mergeMap_1.mergeMap(function() {
          return innerObservable;
        }, concurrent);
      }
      exports.mergeMapTo = mergeMapTo;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/mergeScan.js
  var require_mergeScan = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/mergeScan.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.mergeScan = void 0;
      var lift_1 = require_lift();
      var mergeInternals_1 = require_mergeInternals();
      function mergeScan(accumulator, seed, concurrent) {
        if (concurrent === void 0) {
          concurrent = Infinity;
        }
        return lift_1.operate(function(source, subscriber) {
          var state = seed;
          return mergeInternals_1.mergeInternals(source, subscriber, function(value, index) {
            return accumulator(state, value, index);
          }, concurrent, function(value) {
            state = value;
          }, false, void 0, function() {
            return state = null;
          });
        });
      }
      exports.mergeScan = mergeScan;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/merge.js
  var require_merge2 = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/merge.js"(exports) {
      "use strict";
      var __read = exports && exports.__read || function(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
          while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        } catch (error) {
          e = { error };
        } finally {
          try {
            if (r && !r.done && (m = i["return"])) m.call(i);
          } finally {
            if (e) throw e.error;
          }
        }
        return ar;
      };
      var __spreadArray = exports && exports.__spreadArray || function(to, from) {
        for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
          to[j] = from[i];
        return to;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.merge = void 0;
      var lift_1 = require_lift();
      var argsOrArgArray_1 = require_argsOrArgArray();
      var mergeAll_1 = require_mergeAll();
      var args_1 = require_args();
      var from_1 = require_from();
      function merge() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        var scheduler = args_1.popScheduler(args);
        var concurrent = args_1.popNumber(args, Infinity);
        args = argsOrArgArray_1.argsOrArgArray(args);
        return lift_1.operate(function(source, subscriber) {
          mergeAll_1.mergeAll(concurrent)(from_1.from(__spreadArray([source], __read(args)), scheduler)).subscribe(subscriber);
        });
      }
      exports.merge = merge;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/mergeWith.js
  var require_mergeWith = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/mergeWith.js"(exports) {
      "use strict";
      var __read = exports && exports.__read || function(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
          while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        } catch (error) {
          e = { error };
        } finally {
          try {
            if (r && !r.done && (m = i["return"])) m.call(i);
          } finally {
            if (e) throw e.error;
          }
        }
        return ar;
      };
      var __spreadArray = exports && exports.__spreadArray || function(to, from) {
        for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
          to[j] = from[i];
        return to;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.mergeWith = void 0;
      var merge_1 = require_merge2();
      function mergeWith() {
        var otherSources = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          otherSources[_i] = arguments[_i];
        }
        return merge_1.merge.apply(void 0, __spreadArray([], __read(otherSources)));
      }
      exports.mergeWith = mergeWith;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/min.js
  var require_min = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/min.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.min = void 0;
      var reduce_1 = require_reduce();
      var isFunction_1 = require_isFunction();
      function min(comparer) {
        return reduce_1.reduce(isFunction_1.isFunction(comparer) ? function(x, y) {
          return comparer(x, y) < 0 ? x : y;
        } : function(x, y) {
          return x < y ? x : y;
        });
      }
      exports.min = min;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/multicast.js
  var require_multicast = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/multicast.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.multicast = void 0;
      var ConnectableObservable_1 = require_ConnectableObservable();
      var isFunction_1 = require_isFunction();
      var connect_1 = require_connect();
      function multicast(subjectOrSubjectFactory, selector) {
        var subjectFactory = isFunction_1.isFunction(subjectOrSubjectFactory) ? subjectOrSubjectFactory : function() {
          return subjectOrSubjectFactory;
        };
        if (isFunction_1.isFunction(selector)) {
          return connect_1.connect(selector, {
            connector: subjectFactory
          });
        }
        return function(source) {
          return new ConnectableObservable_1.ConnectableObservable(source, subjectFactory);
        };
      }
      exports.multicast = multicast;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/onErrorResumeNextWith.js
  var require_onErrorResumeNextWith = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/onErrorResumeNextWith.js"(exports) {
      "use strict";
      var __read = exports && exports.__read || function(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
          while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        } catch (error) {
          e = { error };
        } finally {
          try {
            if (r && !r.done && (m = i["return"])) m.call(i);
          } finally {
            if (e) throw e.error;
          }
        }
        return ar;
      };
      var __spreadArray = exports && exports.__spreadArray || function(to, from) {
        for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
          to[j] = from[i];
        return to;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.onErrorResumeNext = exports.onErrorResumeNextWith = void 0;
      var argsOrArgArray_1 = require_argsOrArgArray();
      var onErrorResumeNext_1 = require_onErrorResumeNext();
      function onErrorResumeNextWith() {
        var sources = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          sources[_i] = arguments[_i];
        }
        var nextSources = argsOrArgArray_1.argsOrArgArray(sources);
        return function(source) {
          return onErrorResumeNext_1.onErrorResumeNext.apply(void 0, __spreadArray([source], __read(nextSources)));
        };
      }
      exports.onErrorResumeNextWith = onErrorResumeNextWith;
      exports.onErrorResumeNext = onErrorResumeNextWith;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/pairwise.js
  var require_pairwise = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/pairwise.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.pairwise = void 0;
      var lift_1 = require_lift();
      var OperatorSubscriber_1 = require_OperatorSubscriber();
      function pairwise() {
        return lift_1.operate(function(source, subscriber) {
          var prev;
          var hasPrev = false;
          source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
            var p = prev;
            prev = value;
            hasPrev && subscriber.next([p, value]);
            hasPrev = true;
          }));
        });
      }
      exports.pairwise = pairwise;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/pluck.js
  var require_pluck = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/pluck.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.pluck = void 0;
      var map_1 = require_map();
      function pluck() {
        var properties = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          properties[_i] = arguments[_i];
        }
        var length = properties.length;
        if (length === 0) {
          throw new Error("list of properties cannot be empty.");
        }
        return map_1.map(function(x) {
          var currentProp = x;
          for (var i = 0; i < length; i++) {
            var p = currentProp === null || currentProp === void 0 ? void 0 : currentProp[properties[i]];
            if (typeof p !== "undefined") {
              currentProp = p;
            } else {
              return void 0;
            }
          }
          return currentProp;
        });
      }
      exports.pluck = pluck;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/publish.js
  var require_publish = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/publish.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.publish = void 0;
      var Subject_1 = require_Subject();
      var multicast_1 = require_multicast();
      var connect_1 = require_connect();
      function publish(selector) {
        return selector ? function(source) {
          return connect_1.connect(selector)(source);
        } : function(source) {
          return multicast_1.multicast(new Subject_1.Subject())(source);
        };
      }
      exports.publish = publish;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/publishBehavior.js
  var require_publishBehavior = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/publishBehavior.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.publishBehavior = void 0;
      var BehaviorSubject_1 = require_BehaviorSubject();
      var ConnectableObservable_1 = require_ConnectableObservable();
      function publishBehavior(initialValue) {
        return function(source) {
          var subject = new BehaviorSubject_1.BehaviorSubject(initialValue);
          return new ConnectableObservable_1.ConnectableObservable(source, function() {
            return subject;
          });
        };
      }
      exports.publishBehavior = publishBehavior;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/publishLast.js
  var require_publishLast = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/publishLast.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.publishLast = void 0;
      var AsyncSubject_1 = require_AsyncSubject();
      var ConnectableObservable_1 = require_ConnectableObservable();
      function publishLast() {
        return function(source) {
          var subject = new AsyncSubject_1.AsyncSubject();
          return new ConnectableObservable_1.ConnectableObservable(source, function() {
            return subject;
          });
        };
      }
      exports.publishLast = publishLast;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/publishReplay.js
  var require_publishReplay = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/publishReplay.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.publishReplay = void 0;
      var ReplaySubject_1 = require_ReplaySubject();
      var multicast_1 = require_multicast();
      var isFunction_1 = require_isFunction();
      function publishReplay(bufferSize, windowTime, selectorOrScheduler, timestampProvider) {
        if (selectorOrScheduler && !isFunction_1.isFunction(selectorOrScheduler)) {
          timestampProvider = selectorOrScheduler;
        }
        var selector = isFunction_1.isFunction(selectorOrScheduler) ? selectorOrScheduler : void 0;
        return function(source) {
          return multicast_1.multicast(new ReplaySubject_1.ReplaySubject(bufferSize, windowTime, timestampProvider), selector)(source);
        };
      }
      exports.publishReplay = publishReplay;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/raceWith.js
  var require_raceWith = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/raceWith.js"(exports) {
      "use strict";
      var __read = exports && exports.__read || function(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
          while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        } catch (error) {
          e = { error };
        } finally {
          try {
            if (r && !r.done && (m = i["return"])) m.call(i);
          } finally {
            if (e) throw e.error;
          }
        }
        return ar;
      };
      var __spreadArray = exports && exports.__spreadArray || function(to, from) {
        for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
          to[j] = from[i];
        return to;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.raceWith = void 0;
      var race_1 = require_race();
      var lift_1 = require_lift();
      var identity_1 = require_identity();
      function raceWith() {
        var otherSources = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          otherSources[_i] = arguments[_i];
        }
        return !otherSources.length ? identity_1.identity : lift_1.operate(function(source, subscriber) {
          race_1.raceInit(__spreadArray([source], __read(otherSources)))(subscriber);
        });
      }
      exports.raceWith = raceWith;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/repeat.js
  var require_repeat = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/repeat.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.repeat = void 0;
      var empty_1 = require_empty();
      var lift_1 = require_lift();
      var OperatorSubscriber_1 = require_OperatorSubscriber();
      var innerFrom_1 = require_innerFrom();
      var timer_1 = require_timer();
      function repeat(countOrConfig) {
        var _a;
        var count = Infinity;
        var delay;
        if (countOrConfig != null) {
          if (typeof countOrConfig === "object") {
            _a = countOrConfig.count, count = _a === void 0 ? Infinity : _a, delay = countOrConfig.delay;
          } else {
            count = countOrConfig;
          }
        }
        return count <= 0 ? function() {
          return empty_1.EMPTY;
        } : lift_1.operate(function(source, subscriber) {
          var soFar = 0;
          var sourceSub;
          var resubscribe = function() {
            sourceSub === null || sourceSub === void 0 ? void 0 : sourceSub.unsubscribe();
            sourceSub = null;
            if (delay != null) {
              var notifier = typeof delay === "number" ? timer_1.timer(delay) : innerFrom_1.innerFrom(delay(soFar));
              var notifierSubscriber_1 = OperatorSubscriber_1.createOperatorSubscriber(subscriber, function() {
                notifierSubscriber_1.unsubscribe();
                subscribeToSource();
              });
              notifier.subscribe(notifierSubscriber_1);
            } else {
              subscribeToSource();
            }
          };
          var subscribeToSource = function() {
            var syncUnsub = false;
            sourceSub = source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, void 0, function() {
              if (++soFar < count) {
                if (sourceSub) {
                  resubscribe();
                } else {
                  syncUnsub = true;
                }
              } else {
                subscriber.complete();
              }
            }));
            if (syncUnsub) {
              resubscribe();
            }
          };
          subscribeToSource();
        });
      }
      exports.repeat = repeat;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/repeatWhen.js
  var require_repeatWhen = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/repeatWhen.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.repeatWhen = void 0;
      var innerFrom_1 = require_innerFrom();
      var Subject_1 = require_Subject();
      var lift_1 = require_lift();
      var OperatorSubscriber_1 = require_OperatorSubscriber();
      function repeatWhen(notifier) {
        return lift_1.operate(function(source, subscriber) {
          var innerSub;
          var syncResub = false;
          var completions$;
          var isNotifierComplete = false;
          var isMainComplete = false;
          var checkComplete = function() {
            return isMainComplete && isNotifierComplete && (subscriber.complete(), true);
          };
          var getCompletionSubject = function() {
            if (!completions$) {
              completions$ = new Subject_1.Subject();
              innerFrom_1.innerFrom(notifier(completions$)).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function() {
                if (innerSub) {
                  subscribeForRepeatWhen();
                } else {
                  syncResub = true;
                }
              }, function() {
                isNotifierComplete = true;
                checkComplete();
              }));
            }
            return completions$;
          };
          var subscribeForRepeatWhen = function() {
            isMainComplete = false;
            innerSub = source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, void 0, function() {
              isMainComplete = true;
              !checkComplete() && getCompletionSubject().next();
            }));
            if (syncResub) {
              innerSub.unsubscribe();
              innerSub = null;
              syncResub = false;
              subscribeForRepeatWhen();
            }
          };
          subscribeForRepeatWhen();
        });
      }
      exports.repeatWhen = repeatWhen;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/retry.js
  var require_retry = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/retry.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.retry = void 0;
      var lift_1 = require_lift();
      var OperatorSubscriber_1 = require_OperatorSubscriber();
      var identity_1 = require_identity();
      var timer_1 = require_timer();
      var innerFrom_1 = require_innerFrom();
      function retry(configOrCount) {
        if (configOrCount === void 0) {
          configOrCount = Infinity;
        }
        var config;
        if (configOrCount && typeof configOrCount === "object") {
          config = configOrCount;
        } else {
          config = {
            count: configOrCount
          };
        }
        var _a = config.count, count = _a === void 0 ? Infinity : _a, delay = config.delay, _b = config.resetOnSuccess, resetOnSuccess = _b === void 0 ? false : _b;
        return count <= 0 ? identity_1.identity : lift_1.operate(function(source, subscriber) {
          var soFar = 0;
          var innerSub;
          var subscribeForRetry = function() {
            var syncUnsub = false;
            innerSub = source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
              if (resetOnSuccess) {
                soFar = 0;
              }
              subscriber.next(value);
            }, void 0, function(err) {
              if (soFar++ < count) {
                var resub_1 = function() {
                  if (innerSub) {
                    innerSub.unsubscribe();
                    innerSub = null;
                    subscribeForRetry();
                  } else {
                    syncUnsub = true;
                  }
                };
                if (delay != null) {
                  var notifier = typeof delay === "number" ? timer_1.timer(delay) : innerFrom_1.innerFrom(delay(err, soFar));
                  var notifierSubscriber_1 = OperatorSubscriber_1.createOperatorSubscriber(subscriber, function() {
                    notifierSubscriber_1.unsubscribe();
                    resub_1();
                  }, function() {
                    subscriber.complete();
                  });
                  notifier.subscribe(notifierSubscriber_1);
                } else {
                  resub_1();
                }
              } else {
                subscriber.error(err);
              }
            }));
            if (syncUnsub) {
              innerSub.unsubscribe();
              innerSub = null;
              subscribeForRetry();
            }
          };
          subscribeForRetry();
        });
      }
      exports.retry = retry;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/retryWhen.js
  var require_retryWhen = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/retryWhen.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.retryWhen = void 0;
      var innerFrom_1 = require_innerFrom();
      var Subject_1 = require_Subject();
      var lift_1 = require_lift();
      var OperatorSubscriber_1 = require_OperatorSubscriber();
      function retryWhen(notifier) {
        return lift_1.operate(function(source, subscriber) {
          var innerSub;
          var syncResub = false;
          var errors$;
          var subscribeForRetryWhen = function() {
            innerSub = source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, void 0, void 0, function(err) {
              if (!errors$) {
                errors$ = new Subject_1.Subject();
                innerFrom_1.innerFrom(notifier(errors$)).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function() {
                  return innerSub ? subscribeForRetryWhen() : syncResub = true;
                }));
              }
              if (errors$) {
                errors$.next(err);
              }
            }));
            if (syncResub) {
              innerSub.unsubscribe();
              innerSub = null;
              syncResub = false;
              subscribeForRetryWhen();
            }
          };
          subscribeForRetryWhen();
        });
      }
      exports.retryWhen = retryWhen;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/sample.js
  var require_sample = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/sample.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.sample = void 0;
      var innerFrom_1 = require_innerFrom();
      var lift_1 = require_lift();
      var noop_1 = require_noop();
      var OperatorSubscriber_1 = require_OperatorSubscriber();
      function sample(notifier) {
        return lift_1.operate(function(source, subscriber) {
          var hasValue = false;
          var lastValue = null;
          source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
            hasValue = true;
            lastValue = value;
          }));
          innerFrom_1.innerFrom(notifier).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function() {
            if (hasValue) {
              hasValue = false;
              var value = lastValue;
              lastValue = null;
              subscriber.next(value);
            }
          }, noop_1.noop));
        });
      }
      exports.sample = sample;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/sampleTime.js
  var require_sampleTime = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/sampleTime.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.sampleTime = void 0;
      var async_1 = require_async();
      var sample_1 = require_sample();
      var interval_1 = require_interval();
      function sampleTime(period, scheduler) {
        if (scheduler === void 0) {
          scheduler = async_1.asyncScheduler;
        }
        return sample_1.sample(interval_1.interval(period, scheduler));
      }
      exports.sampleTime = sampleTime;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/scan.js
  var require_scan = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/scan.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.scan = void 0;
      var lift_1 = require_lift();
      var scanInternals_1 = require_scanInternals();
      function scan(accumulator, seed) {
        return lift_1.operate(scanInternals_1.scanInternals(accumulator, seed, arguments.length >= 2, true));
      }
      exports.scan = scan;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/sequenceEqual.js
  var require_sequenceEqual = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/sequenceEqual.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.sequenceEqual = void 0;
      var lift_1 = require_lift();
      var OperatorSubscriber_1 = require_OperatorSubscriber();
      var innerFrom_1 = require_innerFrom();
      function sequenceEqual(compareTo, comparator) {
        if (comparator === void 0) {
          comparator = function(a, b) {
            return a === b;
          };
        }
        return lift_1.operate(function(source, subscriber) {
          var aState = createState();
          var bState = createState();
          var emit = function(isEqual) {
            subscriber.next(isEqual);
            subscriber.complete();
          };
          var createSubscriber = function(selfState, otherState) {
            var sequenceEqualSubscriber = OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(a) {
              var buffer = otherState.buffer, complete = otherState.complete;
              if (buffer.length === 0) {
                complete ? emit(false) : selfState.buffer.push(a);
              } else {
                !comparator(a, buffer.shift()) && emit(false);
              }
            }, function() {
              selfState.complete = true;
              var complete = otherState.complete, buffer = otherState.buffer;
              complete && emit(buffer.length === 0);
              sequenceEqualSubscriber === null || sequenceEqualSubscriber === void 0 ? void 0 : sequenceEqualSubscriber.unsubscribe();
            });
            return sequenceEqualSubscriber;
          };
          source.subscribe(createSubscriber(aState, bState));
          innerFrom_1.innerFrom(compareTo).subscribe(createSubscriber(bState, aState));
        });
      }
      exports.sequenceEqual = sequenceEqual;
      function createState() {
        return {
          buffer: [],
          complete: false
        };
      }
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/share.js
  var require_share = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/share.js"(exports) {
      "use strict";
      var __read = exports && exports.__read || function(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
          while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        } catch (error) {
          e = { error };
        } finally {
          try {
            if (r && !r.done && (m = i["return"])) m.call(i);
          } finally {
            if (e) throw e.error;
          }
        }
        return ar;
      };
      var __spreadArray = exports && exports.__spreadArray || function(to, from) {
        for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
          to[j] = from[i];
        return to;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.share = void 0;
      var innerFrom_1 = require_innerFrom();
      var Subject_1 = require_Subject();
      var Subscriber_1 = require_Subscriber();
      var lift_1 = require_lift();
      function share(options) {
        if (options === void 0) {
          options = {};
        }
        var _a = options.connector, connector = _a === void 0 ? function() {
          return new Subject_1.Subject();
        } : _a, _b = options.resetOnError, resetOnError = _b === void 0 ? true : _b, _c = options.resetOnComplete, resetOnComplete = _c === void 0 ? true : _c, _d = options.resetOnRefCountZero, resetOnRefCountZero = _d === void 0 ? true : _d;
        return function(wrapperSource) {
          var connection;
          var resetConnection;
          var subject;
          var refCount = 0;
          var hasCompleted = false;
          var hasErrored = false;
          var cancelReset = function() {
            resetConnection === null || resetConnection === void 0 ? void 0 : resetConnection.unsubscribe();
            resetConnection = void 0;
          };
          var reset = function() {
            cancelReset();
            connection = subject = void 0;
            hasCompleted = hasErrored = false;
          };
          var resetAndUnsubscribe = function() {
            var conn = connection;
            reset();
            conn === null || conn === void 0 ? void 0 : conn.unsubscribe();
          };
          return lift_1.operate(function(source, subscriber) {
            refCount++;
            if (!hasErrored && !hasCompleted) {
              cancelReset();
            }
            var dest = subject = subject !== null && subject !== void 0 ? subject : connector();
            subscriber.add(function() {
              refCount--;
              if (refCount === 0 && !hasErrored && !hasCompleted) {
                resetConnection = handleReset(resetAndUnsubscribe, resetOnRefCountZero);
              }
            });
            dest.subscribe(subscriber);
            if (!connection && refCount > 0) {
              connection = new Subscriber_1.SafeSubscriber({
                next: function(value) {
                  return dest.next(value);
                },
                error: function(err) {
                  hasErrored = true;
                  cancelReset();
                  resetConnection = handleReset(reset, resetOnError, err);
                  dest.error(err);
                },
                complete: function() {
                  hasCompleted = true;
                  cancelReset();
                  resetConnection = handleReset(reset, resetOnComplete);
                  dest.complete();
                }
              });
              innerFrom_1.innerFrom(source).subscribe(connection);
            }
          })(wrapperSource);
        };
      }
      exports.share = share;
      function handleReset(reset, on) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
          args[_i - 2] = arguments[_i];
        }
        if (on === true) {
          reset();
          return;
        }
        if (on === false) {
          return;
        }
        var onSubscriber = new Subscriber_1.SafeSubscriber({
          next: function() {
            onSubscriber.unsubscribe();
            reset();
          }
        });
        return innerFrom_1.innerFrom(on.apply(void 0, __spreadArray([], __read(args)))).subscribe(onSubscriber);
      }
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/shareReplay.js
  var require_shareReplay = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/shareReplay.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.shareReplay = void 0;
      var ReplaySubject_1 = require_ReplaySubject();
      var share_1 = require_share();
      function shareReplay(configOrBufferSize, windowTime, scheduler) {
        var _a, _b, _c;
        var bufferSize;
        var refCount = false;
        if (configOrBufferSize && typeof configOrBufferSize === "object") {
          _a = configOrBufferSize.bufferSize, bufferSize = _a === void 0 ? Infinity : _a, _b = configOrBufferSize.windowTime, windowTime = _b === void 0 ? Infinity : _b, _c = configOrBufferSize.refCount, refCount = _c === void 0 ? false : _c, scheduler = configOrBufferSize.scheduler;
        } else {
          bufferSize = configOrBufferSize !== null && configOrBufferSize !== void 0 ? configOrBufferSize : Infinity;
        }
        return share_1.share({
          connector: function() {
            return new ReplaySubject_1.ReplaySubject(bufferSize, windowTime, scheduler);
          },
          resetOnError: true,
          resetOnComplete: false,
          resetOnRefCountZero: refCount
        });
      }
      exports.shareReplay = shareReplay;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/single.js
  var require_single = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/single.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.single = void 0;
      var EmptyError_1 = require_EmptyError();
      var SequenceError_1 = require_SequenceError();
      var NotFoundError_1 = require_NotFoundError();
      var lift_1 = require_lift();
      var OperatorSubscriber_1 = require_OperatorSubscriber();
      function single(predicate) {
        return lift_1.operate(function(source, subscriber) {
          var hasValue = false;
          var singleValue;
          var seenValue = false;
          var index = 0;
          source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
            seenValue = true;
            if (!predicate || predicate(value, index++, source)) {
              hasValue && subscriber.error(new SequenceError_1.SequenceError("Too many matching values"));
              hasValue = true;
              singleValue = value;
            }
          }, function() {
            if (hasValue) {
              subscriber.next(singleValue);
              subscriber.complete();
            } else {
              subscriber.error(seenValue ? new NotFoundError_1.NotFoundError("No matching values") : new EmptyError_1.EmptyError());
            }
          }));
        });
      }
      exports.single = single;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/skip.js
  var require_skip = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/skip.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.skip = void 0;
      var filter_1 = require_filter();
      function skip(count) {
        return filter_1.filter(function(_, index) {
          return count <= index;
        });
      }
      exports.skip = skip;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/skipLast.js
  var require_skipLast = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/skipLast.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.skipLast = void 0;
      var identity_1 = require_identity();
      var lift_1 = require_lift();
      var OperatorSubscriber_1 = require_OperatorSubscriber();
      function skipLast(skipCount) {
        return skipCount <= 0 ? identity_1.identity : lift_1.operate(function(source, subscriber) {
          var ring = new Array(skipCount);
          var seen = 0;
          source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
            var valueIndex = seen++;
            if (valueIndex < skipCount) {
              ring[valueIndex] = value;
            } else {
              var index = valueIndex % skipCount;
              var oldValue = ring[index];
              ring[index] = value;
              subscriber.next(oldValue);
            }
          }));
          return function() {
            ring = null;
          };
        });
      }
      exports.skipLast = skipLast;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/skipUntil.js
  var require_skipUntil = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/skipUntil.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.skipUntil = void 0;
      var lift_1 = require_lift();
      var OperatorSubscriber_1 = require_OperatorSubscriber();
      var innerFrom_1 = require_innerFrom();
      var noop_1 = require_noop();
      function skipUntil(notifier) {
        return lift_1.operate(function(source, subscriber) {
          var taking = false;
          var skipSubscriber = OperatorSubscriber_1.createOperatorSubscriber(subscriber, function() {
            skipSubscriber === null || skipSubscriber === void 0 ? void 0 : skipSubscriber.unsubscribe();
            taking = true;
          }, noop_1.noop);
          innerFrom_1.innerFrom(notifier).subscribe(skipSubscriber);
          source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
            return taking && subscriber.next(value);
          }));
        });
      }
      exports.skipUntil = skipUntil;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/skipWhile.js
  var require_skipWhile = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/skipWhile.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.skipWhile = void 0;
      var lift_1 = require_lift();
      var OperatorSubscriber_1 = require_OperatorSubscriber();
      function skipWhile(predicate) {
        return lift_1.operate(function(source, subscriber) {
          var taking = false;
          var index = 0;
          source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
            return (taking || (taking = !predicate(value, index++))) && subscriber.next(value);
          }));
        });
      }
      exports.skipWhile = skipWhile;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/startWith.js
  var require_startWith = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/startWith.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.startWith = void 0;
      var concat_1 = require_concat();
      var args_1 = require_args();
      var lift_1 = require_lift();
      function startWith() {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          values[_i] = arguments[_i];
        }
        var scheduler = args_1.popScheduler(values);
        return lift_1.operate(function(source, subscriber) {
          (scheduler ? concat_1.concat(values, source, scheduler) : concat_1.concat(values, source)).subscribe(subscriber);
        });
      }
      exports.startWith = startWith;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/switchMap.js
  var require_switchMap = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/switchMap.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.switchMap = void 0;
      var innerFrom_1 = require_innerFrom();
      var lift_1 = require_lift();
      var OperatorSubscriber_1 = require_OperatorSubscriber();
      function switchMap(project, resultSelector) {
        return lift_1.operate(function(source, subscriber) {
          var innerSubscriber = null;
          var index = 0;
          var isComplete = false;
          var checkComplete = function() {
            return isComplete && !innerSubscriber && subscriber.complete();
          };
          source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
            innerSubscriber === null || innerSubscriber === void 0 ? void 0 : innerSubscriber.unsubscribe();
            var innerIndex = 0;
            var outerIndex = index++;
            innerFrom_1.innerFrom(project(value, outerIndex)).subscribe(innerSubscriber = OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(innerValue) {
              return subscriber.next(resultSelector ? resultSelector(value, innerValue, outerIndex, innerIndex++) : innerValue);
            }, function() {
              innerSubscriber = null;
              checkComplete();
            }));
          }, function() {
            isComplete = true;
            checkComplete();
          }));
        });
      }
      exports.switchMap = switchMap;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/switchAll.js
  var require_switchAll = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/switchAll.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.switchAll = void 0;
      var switchMap_1 = require_switchMap();
      var identity_1 = require_identity();
      function switchAll() {
        return switchMap_1.switchMap(identity_1.identity);
      }
      exports.switchAll = switchAll;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/switchMapTo.js
  var require_switchMapTo = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/switchMapTo.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.switchMapTo = void 0;
      var switchMap_1 = require_switchMap();
      var isFunction_1 = require_isFunction();
      function switchMapTo(innerObservable, resultSelector) {
        return isFunction_1.isFunction(resultSelector) ? switchMap_1.switchMap(function() {
          return innerObservable;
        }, resultSelector) : switchMap_1.switchMap(function() {
          return innerObservable;
        });
      }
      exports.switchMapTo = switchMapTo;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/switchScan.js
  var require_switchScan = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/switchScan.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.switchScan = void 0;
      var switchMap_1 = require_switchMap();
      var lift_1 = require_lift();
      function switchScan(accumulator, seed) {
        return lift_1.operate(function(source, subscriber) {
          var state = seed;
          switchMap_1.switchMap(function(value, index) {
            return accumulator(state, value, index);
          }, function(_, innerValue) {
            return state = innerValue, innerValue;
          })(source).subscribe(subscriber);
          return function() {
            state = null;
          };
        });
      }
      exports.switchScan = switchScan;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/takeUntil.js
  var require_takeUntil = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/takeUntil.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.takeUntil = void 0;
      var lift_1 = require_lift();
      var OperatorSubscriber_1 = require_OperatorSubscriber();
      var innerFrom_1 = require_innerFrom();
      var noop_1 = require_noop();
      function takeUntil(notifier) {
        return lift_1.operate(function(source, subscriber) {
          innerFrom_1.innerFrom(notifier).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function() {
            return subscriber.complete();
          }, noop_1.noop));
          !subscriber.closed && source.subscribe(subscriber);
        });
      }
      exports.takeUntil = takeUntil;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/takeWhile.js
  var require_takeWhile = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/takeWhile.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.takeWhile = void 0;
      var lift_1 = require_lift();
      var OperatorSubscriber_1 = require_OperatorSubscriber();
      function takeWhile(predicate, inclusive) {
        if (inclusive === void 0) {
          inclusive = false;
        }
        return lift_1.operate(function(source, subscriber) {
          var index = 0;
          source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
            var result = predicate(value, index++);
            (result || inclusive) && subscriber.next(value);
            !result && subscriber.complete();
          }));
        });
      }
      exports.takeWhile = takeWhile;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/tap.js
  var require_tap = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/tap.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.tap = void 0;
      var isFunction_1 = require_isFunction();
      var lift_1 = require_lift();
      var OperatorSubscriber_1 = require_OperatorSubscriber();
      var identity_1 = require_identity();
      function tap(observerOrNext, error, complete) {
        var tapObserver = isFunction_1.isFunction(observerOrNext) || error || complete ? { next: observerOrNext, error, complete } : observerOrNext;
        return tapObserver ? lift_1.operate(function(source, subscriber) {
          var _a;
          (_a = tapObserver.subscribe) === null || _a === void 0 ? void 0 : _a.call(tapObserver);
          var isUnsub = true;
          source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
            var _a2;
            (_a2 = tapObserver.next) === null || _a2 === void 0 ? void 0 : _a2.call(tapObserver, value);
            subscriber.next(value);
          }, function() {
            var _a2;
            isUnsub = false;
            (_a2 = tapObserver.complete) === null || _a2 === void 0 ? void 0 : _a2.call(tapObserver);
            subscriber.complete();
          }, function(err) {
            var _a2;
            isUnsub = false;
            (_a2 = tapObserver.error) === null || _a2 === void 0 ? void 0 : _a2.call(tapObserver, err);
            subscriber.error(err);
          }, function() {
            var _a2, _b;
            if (isUnsub) {
              (_a2 = tapObserver.unsubscribe) === null || _a2 === void 0 ? void 0 : _a2.call(tapObserver);
            }
            (_b = tapObserver.finalize) === null || _b === void 0 ? void 0 : _b.call(tapObserver);
          }));
        }) : identity_1.identity;
      }
      exports.tap = tap;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/throttle.js
  var require_throttle = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/throttle.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.throttle = void 0;
      var lift_1 = require_lift();
      var OperatorSubscriber_1 = require_OperatorSubscriber();
      var innerFrom_1 = require_innerFrom();
      function throttle(durationSelector, config) {
        return lift_1.operate(function(source, subscriber) {
          var _a = config !== null && config !== void 0 ? config : {}, _b = _a.leading, leading = _b === void 0 ? true : _b, _c = _a.trailing, trailing = _c === void 0 ? false : _c;
          var hasValue = false;
          var sendValue = null;
          var throttled = null;
          var isComplete = false;
          var endThrottling = function() {
            throttled === null || throttled === void 0 ? void 0 : throttled.unsubscribe();
            throttled = null;
            if (trailing) {
              send();
              isComplete && subscriber.complete();
            }
          };
          var cleanupThrottling = function() {
            throttled = null;
            isComplete && subscriber.complete();
          };
          var startThrottle = function(value) {
            return throttled = innerFrom_1.innerFrom(durationSelector(value)).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, endThrottling, cleanupThrottling));
          };
          var send = function() {
            if (hasValue) {
              hasValue = false;
              var value = sendValue;
              sendValue = null;
              subscriber.next(value);
              !isComplete && startThrottle(value);
            }
          };
          source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
            hasValue = true;
            sendValue = value;
            !(throttled && !throttled.closed) && (leading ? send() : startThrottle(value));
          }, function() {
            isComplete = true;
            !(trailing && hasValue && throttled && !throttled.closed) && subscriber.complete();
          }));
        });
      }
      exports.throttle = throttle;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/throttleTime.js
  var require_throttleTime = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/throttleTime.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.throttleTime = void 0;
      var async_1 = require_async();
      var throttle_1 = require_throttle();
      var timer_1 = require_timer();
      function throttleTime(duration, scheduler, config) {
        if (scheduler === void 0) {
          scheduler = async_1.asyncScheduler;
        }
        var duration$ = timer_1.timer(duration, scheduler);
        return throttle_1.throttle(function() {
          return duration$;
        }, config);
      }
      exports.throttleTime = throttleTime;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/timeInterval.js
  var require_timeInterval = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/timeInterval.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.TimeInterval = exports.timeInterval = void 0;
      var async_1 = require_async();
      var lift_1 = require_lift();
      var OperatorSubscriber_1 = require_OperatorSubscriber();
      function timeInterval(scheduler) {
        if (scheduler === void 0) {
          scheduler = async_1.asyncScheduler;
        }
        return lift_1.operate(function(source, subscriber) {
          var last = scheduler.now();
          source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
            var now = scheduler.now();
            var interval = now - last;
            last = now;
            subscriber.next(new TimeInterval(value, interval));
          }));
        });
      }
      exports.timeInterval = timeInterval;
      var TimeInterval = /* @__PURE__ */ function() {
        function TimeInterval2(value, interval) {
          this.value = value;
          this.interval = interval;
        }
        return TimeInterval2;
      }();
      exports.TimeInterval = TimeInterval;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/timeoutWith.js
  var require_timeoutWith = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/timeoutWith.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.timeoutWith = void 0;
      var async_1 = require_async();
      var isDate_1 = require_isDate();
      var timeout_1 = require_timeout();
      function timeoutWith(due, withObservable, scheduler) {
        var first;
        var each;
        var _with;
        scheduler = scheduler !== null && scheduler !== void 0 ? scheduler : async_1.async;
        if (isDate_1.isValidDate(due)) {
          first = due;
        } else if (typeof due === "number") {
          each = due;
        }
        if (withObservable) {
          _with = function() {
            return withObservable;
          };
        } else {
          throw new TypeError("No observable provided to switch to");
        }
        if (first == null && each == null) {
          throw new TypeError("No timeout provided.");
        }
        return timeout_1.timeout({
          first,
          each,
          scheduler,
          with: _with
        });
      }
      exports.timeoutWith = timeoutWith;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/timestamp.js
  var require_timestamp = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/timestamp.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.timestamp = void 0;
      var dateTimestampProvider_1 = require_dateTimestampProvider();
      var map_1 = require_map();
      function timestamp(timestampProvider) {
        if (timestampProvider === void 0) {
          timestampProvider = dateTimestampProvider_1.dateTimestampProvider;
        }
        return map_1.map(function(value) {
          return { value, timestamp: timestampProvider.now() };
        });
      }
      exports.timestamp = timestamp;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/window.js
  var require_window = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/window.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.window = void 0;
      var Subject_1 = require_Subject();
      var lift_1 = require_lift();
      var OperatorSubscriber_1 = require_OperatorSubscriber();
      var noop_1 = require_noop();
      var innerFrom_1 = require_innerFrom();
      function window2(windowBoundaries) {
        return lift_1.operate(function(source, subscriber) {
          var windowSubject = new Subject_1.Subject();
          subscriber.next(windowSubject.asObservable());
          var errorHandler = function(err) {
            windowSubject.error(err);
            subscriber.error(err);
          };
          source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
            return windowSubject === null || windowSubject === void 0 ? void 0 : windowSubject.next(value);
          }, function() {
            windowSubject.complete();
            subscriber.complete();
          }, errorHandler));
          innerFrom_1.innerFrom(windowBoundaries).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function() {
            windowSubject.complete();
            subscriber.next(windowSubject = new Subject_1.Subject());
          }, noop_1.noop, errorHandler));
          return function() {
            windowSubject === null || windowSubject === void 0 ? void 0 : windowSubject.unsubscribe();
            windowSubject = null;
          };
        });
      }
      exports.window = window2;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/windowCount.js
  var require_windowCount = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/windowCount.js"(exports) {
      "use strict";
      var __values = exports && exports.__values || function(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
          next: function() {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
          }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.windowCount = void 0;
      var Subject_1 = require_Subject();
      var lift_1 = require_lift();
      var OperatorSubscriber_1 = require_OperatorSubscriber();
      function windowCount(windowSize, startWindowEvery) {
        if (startWindowEvery === void 0) {
          startWindowEvery = 0;
        }
        var startEvery = startWindowEvery > 0 ? startWindowEvery : windowSize;
        return lift_1.operate(function(source, subscriber) {
          var windows = [new Subject_1.Subject()];
          var starts = [];
          var count = 0;
          subscriber.next(windows[0].asObservable());
          source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
            var e_1, _a;
            try {
              for (var windows_1 = __values(windows), windows_1_1 = windows_1.next(); !windows_1_1.done; windows_1_1 = windows_1.next()) {
                var window_1 = windows_1_1.value;
                window_1.next(value);
              }
            } catch (e_1_1) {
              e_1 = { error: e_1_1 };
            } finally {
              try {
                if (windows_1_1 && !windows_1_1.done && (_a = windows_1.return)) _a.call(windows_1);
              } finally {
                if (e_1) throw e_1.error;
              }
            }
            var c = count - windowSize + 1;
            if (c >= 0 && c % startEvery === 0) {
              windows.shift().complete();
            }
            if (++count % startEvery === 0) {
              var window_2 = new Subject_1.Subject();
              windows.push(window_2);
              subscriber.next(window_2.asObservable());
            }
          }, function() {
            while (windows.length > 0) {
              windows.shift().complete();
            }
            subscriber.complete();
          }, function(err) {
            while (windows.length > 0) {
              windows.shift().error(err);
            }
            subscriber.error(err);
          }, function() {
            starts = null;
            windows = null;
          }));
        });
      }
      exports.windowCount = windowCount;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/windowTime.js
  var require_windowTime = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/windowTime.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.windowTime = void 0;
      var Subject_1 = require_Subject();
      var async_1 = require_async();
      var Subscription_1 = require_Subscription();
      var lift_1 = require_lift();
      var OperatorSubscriber_1 = require_OperatorSubscriber();
      var arrRemove_1 = require_arrRemove();
      var args_1 = require_args();
      var executeSchedule_1 = require_executeSchedule();
      function windowTime(windowTimeSpan) {
        var _a, _b;
        var otherArgs = [];
        for (var _i = 1; _i < arguments.length; _i++) {
          otherArgs[_i - 1] = arguments[_i];
        }
        var scheduler = (_a = args_1.popScheduler(otherArgs)) !== null && _a !== void 0 ? _a : async_1.asyncScheduler;
        var windowCreationInterval = (_b = otherArgs[0]) !== null && _b !== void 0 ? _b : null;
        var maxWindowSize = otherArgs[1] || Infinity;
        return lift_1.operate(function(source, subscriber) {
          var windowRecords = [];
          var restartOnClose = false;
          var closeWindow = function(record) {
            var window2 = record.window, subs = record.subs;
            window2.complete();
            subs.unsubscribe();
            arrRemove_1.arrRemove(windowRecords, record);
            restartOnClose && startWindow();
          };
          var startWindow = function() {
            if (windowRecords) {
              var subs = new Subscription_1.Subscription();
              subscriber.add(subs);
              var window_1 = new Subject_1.Subject();
              var record_1 = {
                window: window_1,
                subs,
                seen: 0
              };
              windowRecords.push(record_1);
              subscriber.next(window_1.asObservable());
              executeSchedule_1.executeSchedule(subs, scheduler, function() {
                return closeWindow(record_1);
              }, windowTimeSpan);
            }
          };
          if (windowCreationInterval !== null && windowCreationInterval >= 0) {
            executeSchedule_1.executeSchedule(subscriber, scheduler, startWindow, windowCreationInterval, true);
          } else {
            restartOnClose = true;
          }
          startWindow();
          var loop = function(cb) {
            return windowRecords.slice().forEach(cb);
          };
          var terminate = function(cb) {
            loop(function(_a2) {
              var window2 = _a2.window;
              return cb(window2);
            });
            cb(subscriber);
            subscriber.unsubscribe();
          };
          source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
            loop(function(record) {
              record.window.next(value);
              maxWindowSize <= ++record.seen && closeWindow(record);
            });
          }, function() {
            return terminate(function(consumer) {
              return consumer.complete();
            });
          }, function(err) {
            return terminate(function(consumer) {
              return consumer.error(err);
            });
          }));
          return function() {
            windowRecords = null;
          };
        });
      }
      exports.windowTime = windowTime;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/windowToggle.js
  var require_windowToggle = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/windowToggle.js"(exports) {
      "use strict";
      var __values = exports && exports.__values || function(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
          next: function() {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
          }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.windowToggle = void 0;
      var Subject_1 = require_Subject();
      var Subscription_1 = require_Subscription();
      var lift_1 = require_lift();
      var innerFrom_1 = require_innerFrom();
      var OperatorSubscriber_1 = require_OperatorSubscriber();
      var noop_1 = require_noop();
      var arrRemove_1 = require_arrRemove();
      function windowToggle(openings, closingSelector) {
        return lift_1.operate(function(source, subscriber) {
          var windows = [];
          var handleError = function(err) {
            while (0 < windows.length) {
              windows.shift().error(err);
            }
            subscriber.error(err);
          };
          innerFrom_1.innerFrom(openings).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(openValue) {
            var window2 = new Subject_1.Subject();
            windows.push(window2);
            var closingSubscription = new Subscription_1.Subscription();
            var closeWindow = function() {
              arrRemove_1.arrRemove(windows, window2);
              window2.complete();
              closingSubscription.unsubscribe();
            };
            var closingNotifier;
            try {
              closingNotifier = innerFrom_1.innerFrom(closingSelector(openValue));
            } catch (err) {
              handleError(err);
              return;
            }
            subscriber.next(window2.asObservable());
            closingSubscription.add(closingNotifier.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, closeWindow, noop_1.noop, handleError)));
          }, noop_1.noop));
          source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
            var e_1, _a;
            var windowsCopy = windows.slice();
            try {
              for (var windowsCopy_1 = __values(windowsCopy), windowsCopy_1_1 = windowsCopy_1.next(); !windowsCopy_1_1.done; windowsCopy_1_1 = windowsCopy_1.next()) {
                var window_1 = windowsCopy_1_1.value;
                window_1.next(value);
              }
            } catch (e_1_1) {
              e_1 = { error: e_1_1 };
            } finally {
              try {
                if (windowsCopy_1_1 && !windowsCopy_1_1.done && (_a = windowsCopy_1.return)) _a.call(windowsCopy_1);
              } finally {
                if (e_1) throw e_1.error;
              }
            }
          }, function() {
            while (0 < windows.length) {
              windows.shift().complete();
            }
            subscriber.complete();
          }, handleError, function() {
            while (0 < windows.length) {
              windows.shift().unsubscribe();
            }
          }));
        });
      }
      exports.windowToggle = windowToggle;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/windowWhen.js
  var require_windowWhen = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/windowWhen.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.windowWhen = void 0;
      var Subject_1 = require_Subject();
      var lift_1 = require_lift();
      var OperatorSubscriber_1 = require_OperatorSubscriber();
      var innerFrom_1 = require_innerFrom();
      function windowWhen(closingSelector) {
        return lift_1.operate(function(source, subscriber) {
          var window2;
          var closingSubscriber;
          var handleError = function(err) {
            window2.error(err);
            subscriber.error(err);
          };
          var openWindow = function() {
            closingSubscriber === null || closingSubscriber === void 0 ? void 0 : closingSubscriber.unsubscribe();
            window2 === null || window2 === void 0 ? void 0 : window2.complete();
            window2 = new Subject_1.Subject();
            subscriber.next(window2.asObservable());
            var closingNotifier;
            try {
              closingNotifier = innerFrom_1.innerFrom(closingSelector());
            } catch (err) {
              handleError(err);
              return;
            }
            closingNotifier.subscribe(closingSubscriber = OperatorSubscriber_1.createOperatorSubscriber(subscriber, openWindow, openWindow, handleError));
          };
          openWindow();
          source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
            return window2.next(value);
          }, function() {
            window2.complete();
            subscriber.complete();
          }, handleError, function() {
            closingSubscriber === null || closingSubscriber === void 0 ? void 0 : closingSubscriber.unsubscribe();
            window2 = null;
          }));
        });
      }
      exports.windowWhen = windowWhen;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/withLatestFrom.js
  var require_withLatestFrom = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/withLatestFrom.js"(exports) {
      "use strict";
      var __read = exports && exports.__read || function(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
          while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        } catch (error) {
          e = { error };
        } finally {
          try {
            if (r && !r.done && (m = i["return"])) m.call(i);
          } finally {
            if (e) throw e.error;
          }
        }
        return ar;
      };
      var __spreadArray = exports && exports.__spreadArray || function(to, from) {
        for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
          to[j] = from[i];
        return to;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.withLatestFrom = void 0;
      var lift_1 = require_lift();
      var OperatorSubscriber_1 = require_OperatorSubscriber();
      var innerFrom_1 = require_innerFrom();
      var identity_1 = require_identity();
      var noop_1 = require_noop();
      var args_1 = require_args();
      function withLatestFrom3() {
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          inputs[_i] = arguments[_i];
        }
        var project = args_1.popResultSelector(inputs);
        return lift_1.operate(function(source, subscriber) {
          var len = inputs.length;
          var otherValues = new Array(len);
          var hasValue = inputs.map(function() {
            return false;
          });
          var ready = false;
          var _loop_1 = function(i2) {
            innerFrom_1.innerFrom(inputs[i2]).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
              otherValues[i2] = value;
              if (!ready && !hasValue[i2]) {
                hasValue[i2] = true;
                (ready = hasValue.every(identity_1.identity)) && (hasValue = null);
              }
            }, noop_1.noop));
          };
          for (var i = 0; i < len; i++) {
            _loop_1(i);
          }
          source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
            if (ready) {
              var values = __spreadArray([value], __read(otherValues));
              subscriber.next(project ? project.apply(void 0, __spreadArray([], __read(values))) : values);
            }
          }));
        });
      }
      exports.withLatestFrom = withLatestFrom3;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/zipAll.js
  var require_zipAll = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/zipAll.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.zipAll = void 0;
      var zip_1 = require_zip();
      var joinAllInternals_1 = require_joinAllInternals();
      function zipAll(project) {
        return joinAllInternals_1.joinAllInternals(zip_1.zip, project);
      }
      exports.zipAll = zipAll;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/zip.js
  var require_zip2 = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/zip.js"(exports) {
      "use strict";
      var __read = exports && exports.__read || function(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
          while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        } catch (error) {
          e = { error };
        } finally {
          try {
            if (r && !r.done && (m = i["return"])) m.call(i);
          } finally {
            if (e) throw e.error;
          }
        }
        return ar;
      };
      var __spreadArray = exports && exports.__spreadArray || function(to, from) {
        for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
          to[j] = from[i];
        return to;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.zip = void 0;
      var zip_1 = require_zip();
      var lift_1 = require_lift();
      function zip() {
        var sources = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          sources[_i] = arguments[_i];
        }
        return lift_1.operate(function(source, subscriber) {
          zip_1.zip.apply(void 0, __spreadArray([source], __read(sources))).subscribe(subscriber);
        });
      }
      exports.zip = zip;
    }
  });

  // node_modules/rxjs/dist/cjs/internal/operators/zipWith.js
  var require_zipWith = __commonJS({
    "node_modules/rxjs/dist/cjs/internal/operators/zipWith.js"(exports) {
      "use strict";
      var __read = exports && exports.__read || function(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
          while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        } catch (error) {
          e = { error };
        } finally {
          try {
            if (r && !r.done && (m = i["return"])) m.call(i);
          } finally {
            if (e) throw e.error;
          }
        }
        return ar;
      };
      var __spreadArray = exports && exports.__spreadArray || function(to, from) {
        for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
          to[j] = from[i];
        return to;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.zipWith = void 0;
      var zip_1 = require_zip2();
      function zipWith() {
        var otherInputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          otherInputs[_i] = arguments[_i];
        }
        return zip_1.zip.apply(void 0, __spreadArray([], __read(otherInputs)));
      }
      exports.zipWith = zipWith;
    }
  });

  // node_modules/rxjs/dist/cjs/index.js
  var require_cjs = __commonJS({
    "node_modules/rxjs/dist/cjs/index.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function() {
          return m[k];
        } });
      } : function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      });
      var __exportStar = exports && exports.__exportStar || function(m, exports2) {
        for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.interval = exports.iif = exports.generate = exports.fromEventPattern = exports.fromEvent = exports.from = exports.forkJoin = exports.empty = exports.defer = exports.connectable = exports.concat = exports.combineLatest = exports.bindNodeCallback = exports.bindCallback = exports.UnsubscriptionError = exports.TimeoutError = exports.SequenceError = exports.ObjectUnsubscribedError = exports.NotFoundError = exports.EmptyError = exports.ArgumentOutOfRangeError = exports.firstValueFrom = exports.lastValueFrom = exports.isObservable = exports.identity = exports.noop = exports.pipe = exports.NotificationKind = exports.Notification = exports.Subscriber = exports.Subscription = exports.Scheduler = exports.VirtualAction = exports.VirtualTimeScheduler = exports.animationFrameScheduler = exports.animationFrame = exports.queueScheduler = exports.queue = exports.asyncScheduler = exports.async = exports.asapScheduler = exports.asap = exports.AsyncSubject = exports.ReplaySubject = exports.BehaviorSubject = exports.Subject = exports.animationFrames = exports.observable = exports.ConnectableObservable = exports.Observable = void 0;
      exports.filter = exports.expand = exports.exhaustMap = exports.exhaustAll = exports.exhaust = exports.every = exports.endWith = exports.elementAt = exports.distinctUntilKeyChanged = exports.distinctUntilChanged = exports.distinct = exports.dematerialize = exports.delayWhen = exports.delay = exports.defaultIfEmpty = exports.debounceTime = exports.debounce = exports.count = exports.connect = exports.concatWith = exports.concatMapTo = exports.concatMap = exports.concatAll = exports.combineLatestWith = exports.combineLatestAll = exports.combineAll = exports.catchError = exports.bufferWhen = exports.bufferToggle = exports.bufferTime = exports.bufferCount = exports.buffer = exports.auditTime = exports.audit = exports.config = exports.NEVER = exports.EMPTY = exports.scheduled = exports.zip = exports.using = exports.timer = exports.throwError = exports.range = exports.race = exports.partition = exports.pairs = exports.onErrorResumeNext = exports.of = exports.never = exports.merge = void 0;
      exports.switchMap = exports.switchAll = exports.subscribeOn = exports.startWith = exports.skipWhile = exports.skipUntil = exports.skipLast = exports.skip = exports.single = exports.shareReplay = exports.share = exports.sequenceEqual = exports.scan = exports.sampleTime = exports.sample = exports.refCount = exports.retryWhen = exports.retry = exports.repeatWhen = exports.repeat = exports.reduce = exports.raceWith = exports.publishReplay = exports.publishLast = exports.publishBehavior = exports.publish = exports.pluck = exports.pairwise = exports.onErrorResumeNextWith = exports.observeOn = exports.multicast = exports.min = exports.mergeWith = exports.mergeScan = exports.mergeMapTo = exports.mergeMap = exports.flatMap = exports.mergeAll = exports.max = exports.materialize = exports.mapTo = exports.map = exports.last = exports.isEmpty = exports.ignoreElements = exports.groupBy = exports.first = exports.findIndex = exports.find = exports.finalize = void 0;
      exports.zipWith = exports.zipAll = exports.withLatestFrom = exports.windowWhen = exports.windowToggle = exports.windowTime = exports.windowCount = exports.window = exports.toArray = exports.timestamp = exports.timeoutWith = exports.timeout = exports.timeInterval = exports.throwIfEmpty = exports.throttleTime = exports.throttle = exports.tap = exports.takeWhile = exports.takeUntil = exports.takeLast = exports.take = exports.switchScan = exports.switchMapTo = void 0;
      var Observable_1 = require_Observable();
      Object.defineProperty(exports, "Observable", { enumerable: true, get: function() {
        return Observable_1.Observable;
      } });
      var ConnectableObservable_1 = require_ConnectableObservable();
      Object.defineProperty(exports, "ConnectableObservable", { enumerable: true, get: function() {
        return ConnectableObservable_1.ConnectableObservable;
      } });
      var observable_1 = require_observable();
      Object.defineProperty(exports, "observable", { enumerable: true, get: function() {
        return observable_1.observable;
      } });
      var animationFrames_1 = require_animationFrames();
      Object.defineProperty(exports, "animationFrames", { enumerable: true, get: function() {
        return animationFrames_1.animationFrames;
      } });
      var Subject_1 = require_Subject();
      Object.defineProperty(exports, "Subject", { enumerable: true, get: function() {
        return Subject_1.Subject;
      } });
      var BehaviorSubject_1 = require_BehaviorSubject();
      Object.defineProperty(exports, "BehaviorSubject", { enumerable: true, get: function() {
        return BehaviorSubject_1.BehaviorSubject;
      } });
      var ReplaySubject_1 = require_ReplaySubject();
      Object.defineProperty(exports, "ReplaySubject", { enumerable: true, get: function() {
        return ReplaySubject_1.ReplaySubject;
      } });
      var AsyncSubject_1 = require_AsyncSubject();
      Object.defineProperty(exports, "AsyncSubject", { enumerable: true, get: function() {
        return AsyncSubject_1.AsyncSubject;
      } });
      var asap_1 = require_asap();
      Object.defineProperty(exports, "asap", { enumerable: true, get: function() {
        return asap_1.asap;
      } });
      Object.defineProperty(exports, "asapScheduler", { enumerable: true, get: function() {
        return asap_1.asapScheduler;
      } });
      var async_1 = require_async();
      Object.defineProperty(exports, "async", { enumerable: true, get: function() {
        return async_1.async;
      } });
      Object.defineProperty(exports, "asyncScheduler", { enumerable: true, get: function() {
        return async_1.asyncScheduler;
      } });
      var queue_1 = require_queue();
      Object.defineProperty(exports, "queue", { enumerable: true, get: function() {
        return queue_1.queue;
      } });
      Object.defineProperty(exports, "queueScheduler", { enumerable: true, get: function() {
        return queue_1.queueScheduler;
      } });
      var animationFrame_1 = require_animationFrame();
      Object.defineProperty(exports, "animationFrame", { enumerable: true, get: function() {
        return animationFrame_1.animationFrame;
      } });
      Object.defineProperty(exports, "animationFrameScheduler", { enumerable: true, get: function() {
        return animationFrame_1.animationFrameScheduler;
      } });
      var VirtualTimeScheduler_1 = require_VirtualTimeScheduler();
      Object.defineProperty(exports, "VirtualTimeScheduler", { enumerable: true, get: function() {
        return VirtualTimeScheduler_1.VirtualTimeScheduler;
      } });
      Object.defineProperty(exports, "VirtualAction", { enumerable: true, get: function() {
        return VirtualTimeScheduler_1.VirtualAction;
      } });
      var Scheduler_1 = require_Scheduler();
      Object.defineProperty(exports, "Scheduler", { enumerable: true, get: function() {
        return Scheduler_1.Scheduler;
      } });
      var Subscription_1 = require_Subscription();
      Object.defineProperty(exports, "Subscription", { enumerable: true, get: function() {
        return Subscription_1.Subscription;
      } });
      var Subscriber_1 = require_Subscriber();
      Object.defineProperty(exports, "Subscriber", { enumerable: true, get: function() {
        return Subscriber_1.Subscriber;
      } });
      var Notification_1 = require_Notification();
      Object.defineProperty(exports, "Notification", { enumerable: true, get: function() {
        return Notification_1.Notification;
      } });
      Object.defineProperty(exports, "NotificationKind", { enumerable: true, get: function() {
        return Notification_1.NotificationKind;
      } });
      var pipe_1 = require_pipe();
      Object.defineProperty(exports, "pipe", { enumerable: true, get: function() {
        return pipe_1.pipe;
      } });
      var noop_1 = require_noop();
      Object.defineProperty(exports, "noop", { enumerable: true, get: function() {
        return noop_1.noop;
      } });
      var identity_1 = require_identity();
      Object.defineProperty(exports, "identity", { enumerable: true, get: function() {
        return identity_1.identity;
      } });
      var isObservable_1 = require_isObservable();
      Object.defineProperty(exports, "isObservable", { enumerable: true, get: function() {
        return isObservable_1.isObservable;
      } });
      var lastValueFrom_1 = require_lastValueFrom();
      Object.defineProperty(exports, "lastValueFrom", { enumerable: true, get: function() {
        return lastValueFrom_1.lastValueFrom;
      } });
      var firstValueFrom_1 = require_firstValueFrom();
      Object.defineProperty(exports, "firstValueFrom", { enumerable: true, get: function() {
        return firstValueFrom_1.firstValueFrom;
      } });
      var ArgumentOutOfRangeError_1 = require_ArgumentOutOfRangeError();
      Object.defineProperty(exports, "ArgumentOutOfRangeError", { enumerable: true, get: function() {
        return ArgumentOutOfRangeError_1.ArgumentOutOfRangeError;
      } });
      var EmptyError_1 = require_EmptyError();
      Object.defineProperty(exports, "EmptyError", { enumerable: true, get: function() {
        return EmptyError_1.EmptyError;
      } });
      var NotFoundError_1 = require_NotFoundError();
      Object.defineProperty(exports, "NotFoundError", { enumerable: true, get: function() {
        return NotFoundError_1.NotFoundError;
      } });
      var ObjectUnsubscribedError_1 = require_ObjectUnsubscribedError();
      Object.defineProperty(exports, "ObjectUnsubscribedError", { enumerable: true, get: function() {
        return ObjectUnsubscribedError_1.ObjectUnsubscribedError;
      } });
      var SequenceError_1 = require_SequenceError();
      Object.defineProperty(exports, "SequenceError", { enumerable: true, get: function() {
        return SequenceError_1.SequenceError;
      } });
      var timeout_1 = require_timeout();
      Object.defineProperty(exports, "TimeoutError", { enumerable: true, get: function() {
        return timeout_1.TimeoutError;
      } });
      var UnsubscriptionError_1 = require_UnsubscriptionError();
      Object.defineProperty(exports, "UnsubscriptionError", { enumerable: true, get: function() {
        return UnsubscriptionError_1.UnsubscriptionError;
      } });
      var bindCallback_1 = require_bindCallback();
      Object.defineProperty(exports, "bindCallback", { enumerable: true, get: function() {
        return bindCallback_1.bindCallback;
      } });
      var bindNodeCallback_1 = require_bindNodeCallback();
      Object.defineProperty(exports, "bindNodeCallback", { enumerable: true, get: function() {
        return bindNodeCallback_1.bindNodeCallback;
      } });
      var combineLatest_1 = require_combineLatest();
      Object.defineProperty(exports, "combineLatest", { enumerable: true, get: function() {
        return combineLatest_1.combineLatest;
      } });
      var concat_1 = require_concat();
      Object.defineProperty(exports, "concat", { enumerable: true, get: function() {
        return concat_1.concat;
      } });
      var connectable_1 = require_connectable();
      Object.defineProperty(exports, "connectable", { enumerable: true, get: function() {
        return connectable_1.connectable;
      } });
      var defer_1 = require_defer();
      Object.defineProperty(exports, "defer", { enumerable: true, get: function() {
        return defer_1.defer;
      } });
      var empty_1 = require_empty();
      Object.defineProperty(exports, "empty", { enumerable: true, get: function() {
        return empty_1.empty;
      } });
      var forkJoin_1 = require_forkJoin();
      Object.defineProperty(exports, "forkJoin", { enumerable: true, get: function() {
        return forkJoin_1.forkJoin;
      } });
      var from_1 = require_from();
      Object.defineProperty(exports, "from", { enumerable: true, get: function() {
        return from_1.from;
      } });
      var fromEvent_1 = require_fromEvent();
      Object.defineProperty(exports, "fromEvent", { enumerable: true, get: function() {
        return fromEvent_1.fromEvent;
      } });
      var fromEventPattern_1 = require_fromEventPattern();
      Object.defineProperty(exports, "fromEventPattern", { enumerable: true, get: function() {
        return fromEventPattern_1.fromEventPattern;
      } });
      var generate_1 = require_generate();
      Object.defineProperty(exports, "generate", { enumerable: true, get: function() {
        return generate_1.generate;
      } });
      var iif_1 = require_iif();
      Object.defineProperty(exports, "iif", { enumerable: true, get: function() {
        return iif_1.iif;
      } });
      var interval_1 = require_interval();
      Object.defineProperty(exports, "interval", { enumerable: true, get: function() {
        return interval_1.interval;
      } });
      var merge_1 = require_merge();
      Object.defineProperty(exports, "merge", { enumerable: true, get: function() {
        return merge_1.merge;
      } });
      var never_1 = require_never();
      Object.defineProperty(exports, "never", { enumerable: true, get: function() {
        return never_1.never;
      } });
      var of_1 = require_of();
      Object.defineProperty(exports, "of", { enumerable: true, get: function() {
        return of_1.of;
      } });
      var onErrorResumeNext_1 = require_onErrorResumeNext();
      Object.defineProperty(exports, "onErrorResumeNext", { enumerable: true, get: function() {
        return onErrorResumeNext_1.onErrorResumeNext;
      } });
      var pairs_1 = require_pairs();
      Object.defineProperty(exports, "pairs", { enumerable: true, get: function() {
        return pairs_1.pairs;
      } });
      var partition_1 = require_partition();
      Object.defineProperty(exports, "partition", { enumerable: true, get: function() {
        return partition_1.partition;
      } });
      var race_1 = require_race();
      Object.defineProperty(exports, "race", { enumerable: true, get: function() {
        return race_1.race;
      } });
      var range_1 = require_range();
      Object.defineProperty(exports, "range", { enumerable: true, get: function() {
        return range_1.range;
      } });
      var throwError_1 = require_throwError();
      Object.defineProperty(exports, "throwError", { enumerable: true, get: function() {
        return throwError_1.throwError;
      } });
      var timer_1 = require_timer();
      Object.defineProperty(exports, "timer", { enumerable: true, get: function() {
        return timer_1.timer;
      } });
      var using_1 = require_using();
      Object.defineProperty(exports, "using", { enumerable: true, get: function() {
        return using_1.using;
      } });
      var zip_1 = require_zip();
      Object.defineProperty(exports, "zip", { enumerable: true, get: function() {
        return zip_1.zip;
      } });
      var scheduled_1 = require_scheduled();
      Object.defineProperty(exports, "scheduled", { enumerable: true, get: function() {
        return scheduled_1.scheduled;
      } });
      var empty_2 = require_empty();
      Object.defineProperty(exports, "EMPTY", { enumerable: true, get: function() {
        return empty_2.EMPTY;
      } });
      var never_2 = require_never();
      Object.defineProperty(exports, "NEVER", { enumerable: true, get: function() {
        return never_2.NEVER;
      } });
      __exportStar(require_types(), exports);
      var config_1 = require_config();
      Object.defineProperty(exports, "config", { enumerable: true, get: function() {
        return config_1.config;
      } });
      var audit_1 = require_audit();
      Object.defineProperty(exports, "audit", { enumerable: true, get: function() {
        return audit_1.audit;
      } });
      var auditTime_1 = require_auditTime();
      Object.defineProperty(exports, "auditTime", { enumerable: true, get: function() {
        return auditTime_1.auditTime;
      } });
      var buffer_1 = require_buffer();
      Object.defineProperty(exports, "buffer", { enumerable: true, get: function() {
        return buffer_1.buffer;
      } });
      var bufferCount_1 = require_bufferCount();
      Object.defineProperty(exports, "bufferCount", { enumerable: true, get: function() {
        return bufferCount_1.bufferCount;
      } });
      var bufferTime_1 = require_bufferTime();
      Object.defineProperty(exports, "bufferTime", { enumerable: true, get: function() {
        return bufferTime_1.bufferTime;
      } });
      var bufferToggle_1 = require_bufferToggle();
      Object.defineProperty(exports, "bufferToggle", { enumerable: true, get: function() {
        return bufferToggle_1.bufferToggle;
      } });
      var bufferWhen_1 = require_bufferWhen();
      Object.defineProperty(exports, "bufferWhen", { enumerable: true, get: function() {
        return bufferWhen_1.bufferWhen;
      } });
      var catchError_1 = require_catchError();
      Object.defineProperty(exports, "catchError", { enumerable: true, get: function() {
        return catchError_1.catchError;
      } });
      var combineAll_1 = require_combineAll();
      Object.defineProperty(exports, "combineAll", { enumerable: true, get: function() {
        return combineAll_1.combineAll;
      } });
      var combineLatestAll_1 = require_combineLatestAll();
      Object.defineProperty(exports, "combineLatestAll", { enumerable: true, get: function() {
        return combineLatestAll_1.combineLatestAll;
      } });
      var combineLatestWith_1 = require_combineLatestWith();
      Object.defineProperty(exports, "combineLatestWith", { enumerable: true, get: function() {
        return combineLatestWith_1.combineLatestWith;
      } });
      var concatAll_1 = require_concatAll();
      Object.defineProperty(exports, "concatAll", { enumerable: true, get: function() {
        return concatAll_1.concatAll;
      } });
      var concatMap_1 = require_concatMap();
      Object.defineProperty(exports, "concatMap", { enumerable: true, get: function() {
        return concatMap_1.concatMap;
      } });
      var concatMapTo_1 = require_concatMapTo();
      Object.defineProperty(exports, "concatMapTo", { enumerable: true, get: function() {
        return concatMapTo_1.concatMapTo;
      } });
      var concatWith_1 = require_concatWith();
      Object.defineProperty(exports, "concatWith", { enumerable: true, get: function() {
        return concatWith_1.concatWith;
      } });
      var connect_1 = require_connect();
      Object.defineProperty(exports, "connect", { enumerable: true, get: function() {
        return connect_1.connect;
      } });
      var count_1 = require_count();
      Object.defineProperty(exports, "count", { enumerable: true, get: function() {
        return count_1.count;
      } });
      var debounce_1 = require_debounce();
      Object.defineProperty(exports, "debounce", { enumerable: true, get: function() {
        return debounce_1.debounce;
      } });
      var debounceTime_1 = require_debounceTime();
      Object.defineProperty(exports, "debounceTime", { enumerable: true, get: function() {
        return debounceTime_1.debounceTime;
      } });
      var defaultIfEmpty_1 = require_defaultIfEmpty();
      Object.defineProperty(exports, "defaultIfEmpty", { enumerable: true, get: function() {
        return defaultIfEmpty_1.defaultIfEmpty;
      } });
      var delay_1 = require_delay();
      Object.defineProperty(exports, "delay", { enumerable: true, get: function() {
        return delay_1.delay;
      } });
      var delayWhen_1 = require_delayWhen();
      Object.defineProperty(exports, "delayWhen", { enumerable: true, get: function() {
        return delayWhen_1.delayWhen;
      } });
      var dematerialize_1 = require_dematerialize();
      Object.defineProperty(exports, "dematerialize", { enumerable: true, get: function() {
        return dematerialize_1.dematerialize;
      } });
      var distinct_1 = require_distinct();
      Object.defineProperty(exports, "distinct", { enumerable: true, get: function() {
        return distinct_1.distinct;
      } });
      var distinctUntilChanged_1 = require_distinctUntilChanged();
      Object.defineProperty(exports, "distinctUntilChanged", { enumerable: true, get: function() {
        return distinctUntilChanged_1.distinctUntilChanged;
      } });
      var distinctUntilKeyChanged_1 = require_distinctUntilKeyChanged();
      Object.defineProperty(exports, "distinctUntilKeyChanged", { enumerable: true, get: function() {
        return distinctUntilKeyChanged_1.distinctUntilKeyChanged;
      } });
      var elementAt_1 = require_elementAt();
      Object.defineProperty(exports, "elementAt", { enumerable: true, get: function() {
        return elementAt_1.elementAt;
      } });
      var endWith_1 = require_endWith();
      Object.defineProperty(exports, "endWith", { enumerable: true, get: function() {
        return endWith_1.endWith;
      } });
      var every_1 = require_every();
      Object.defineProperty(exports, "every", { enumerable: true, get: function() {
        return every_1.every;
      } });
      var exhaust_1 = require_exhaust();
      Object.defineProperty(exports, "exhaust", { enumerable: true, get: function() {
        return exhaust_1.exhaust;
      } });
      var exhaustAll_1 = require_exhaustAll();
      Object.defineProperty(exports, "exhaustAll", { enumerable: true, get: function() {
        return exhaustAll_1.exhaustAll;
      } });
      var exhaustMap_1 = require_exhaustMap();
      Object.defineProperty(exports, "exhaustMap", { enumerable: true, get: function() {
        return exhaustMap_1.exhaustMap;
      } });
      var expand_1 = require_expand();
      Object.defineProperty(exports, "expand", { enumerable: true, get: function() {
        return expand_1.expand;
      } });
      var filter_1 = require_filter();
      Object.defineProperty(exports, "filter", { enumerable: true, get: function() {
        return filter_1.filter;
      } });
      var finalize_1 = require_finalize();
      Object.defineProperty(exports, "finalize", { enumerable: true, get: function() {
        return finalize_1.finalize;
      } });
      var find_1 = require_find();
      Object.defineProperty(exports, "find", { enumerable: true, get: function() {
        return find_1.find;
      } });
      var findIndex_1 = require_findIndex();
      Object.defineProperty(exports, "findIndex", { enumerable: true, get: function() {
        return findIndex_1.findIndex;
      } });
      var first_1 = require_first();
      Object.defineProperty(exports, "first", { enumerable: true, get: function() {
        return first_1.first;
      } });
      var groupBy_1 = require_groupBy();
      Object.defineProperty(exports, "groupBy", { enumerable: true, get: function() {
        return groupBy_1.groupBy;
      } });
      var ignoreElements_1 = require_ignoreElements();
      Object.defineProperty(exports, "ignoreElements", { enumerable: true, get: function() {
        return ignoreElements_1.ignoreElements;
      } });
      var isEmpty_1 = require_isEmpty();
      Object.defineProperty(exports, "isEmpty", { enumerable: true, get: function() {
        return isEmpty_1.isEmpty;
      } });
      var last_1 = require_last();
      Object.defineProperty(exports, "last", { enumerable: true, get: function() {
        return last_1.last;
      } });
      var map_1 = require_map();
      Object.defineProperty(exports, "map", { enumerable: true, get: function() {
        return map_1.map;
      } });
      var mapTo_1 = require_mapTo();
      Object.defineProperty(exports, "mapTo", { enumerable: true, get: function() {
        return mapTo_1.mapTo;
      } });
      var materialize_1 = require_materialize();
      Object.defineProperty(exports, "materialize", { enumerable: true, get: function() {
        return materialize_1.materialize;
      } });
      var max_1 = require_max();
      Object.defineProperty(exports, "max", { enumerable: true, get: function() {
        return max_1.max;
      } });
      var mergeAll_1 = require_mergeAll();
      Object.defineProperty(exports, "mergeAll", { enumerable: true, get: function() {
        return mergeAll_1.mergeAll;
      } });
      var flatMap_1 = require_flatMap();
      Object.defineProperty(exports, "flatMap", { enumerable: true, get: function() {
        return flatMap_1.flatMap;
      } });
      var mergeMap_1 = require_mergeMap();
      Object.defineProperty(exports, "mergeMap", { enumerable: true, get: function() {
        return mergeMap_1.mergeMap;
      } });
      var mergeMapTo_1 = require_mergeMapTo();
      Object.defineProperty(exports, "mergeMapTo", { enumerable: true, get: function() {
        return mergeMapTo_1.mergeMapTo;
      } });
      var mergeScan_1 = require_mergeScan();
      Object.defineProperty(exports, "mergeScan", { enumerable: true, get: function() {
        return mergeScan_1.mergeScan;
      } });
      var mergeWith_1 = require_mergeWith();
      Object.defineProperty(exports, "mergeWith", { enumerable: true, get: function() {
        return mergeWith_1.mergeWith;
      } });
      var min_1 = require_min();
      Object.defineProperty(exports, "min", { enumerable: true, get: function() {
        return min_1.min;
      } });
      var multicast_1 = require_multicast();
      Object.defineProperty(exports, "multicast", { enumerable: true, get: function() {
        return multicast_1.multicast;
      } });
      var observeOn_1 = require_observeOn();
      Object.defineProperty(exports, "observeOn", { enumerable: true, get: function() {
        return observeOn_1.observeOn;
      } });
      var onErrorResumeNextWith_1 = require_onErrorResumeNextWith();
      Object.defineProperty(exports, "onErrorResumeNextWith", { enumerable: true, get: function() {
        return onErrorResumeNextWith_1.onErrorResumeNextWith;
      } });
      var pairwise_1 = require_pairwise();
      Object.defineProperty(exports, "pairwise", { enumerable: true, get: function() {
        return pairwise_1.pairwise;
      } });
      var pluck_1 = require_pluck();
      Object.defineProperty(exports, "pluck", { enumerable: true, get: function() {
        return pluck_1.pluck;
      } });
      var publish_1 = require_publish();
      Object.defineProperty(exports, "publish", { enumerable: true, get: function() {
        return publish_1.publish;
      } });
      var publishBehavior_1 = require_publishBehavior();
      Object.defineProperty(exports, "publishBehavior", { enumerable: true, get: function() {
        return publishBehavior_1.publishBehavior;
      } });
      var publishLast_1 = require_publishLast();
      Object.defineProperty(exports, "publishLast", { enumerable: true, get: function() {
        return publishLast_1.publishLast;
      } });
      var publishReplay_1 = require_publishReplay();
      Object.defineProperty(exports, "publishReplay", { enumerable: true, get: function() {
        return publishReplay_1.publishReplay;
      } });
      var raceWith_1 = require_raceWith();
      Object.defineProperty(exports, "raceWith", { enumerable: true, get: function() {
        return raceWith_1.raceWith;
      } });
      var reduce_1 = require_reduce();
      Object.defineProperty(exports, "reduce", { enumerable: true, get: function() {
        return reduce_1.reduce;
      } });
      var repeat_1 = require_repeat();
      Object.defineProperty(exports, "repeat", { enumerable: true, get: function() {
        return repeat_1.repeat;
      } });
      var repeatWhen_1 = require_repeatWhen();
      Object.defineProperty(exports, "repeatWhen", { enumerable: true, get: function() {
        return repeatWhen_1.repeatWhen;
      } });
      var retry_1 = require_retry();
      Object.defineProperty(exports, "retry", { enumerable: true, get: function() {
        return retry_1.retry;
      } });
      var retryWhen_1 = require_retryWhen();
      Object.defineProperty(exports, "retryWhen", { enumerable: true, get: function() {
        return retryWhen_1.retryWhen;
      } });
      var refCount_1 = require_refCount();
      Object.defineProperty(exports, "refCount", { enumerable: true, get: function() {
        return refCount_1.refCount;
      } });
      var sample_1 = require_sample();
      Object.defineProperty(exports, "sample", { enumerable: true, get: function() {
        return sample_1.sample;
      } });
      var sampleTime_1 = require_sampleTime();
      Object.defineProperty(exports, "sampleTime", { enumerable: true, get: function() {
        return sampleTime_1.sampleTime;
      } });
      var scan_1 = require_scan();
      Object.defineProperty(exports, "scan", { enumerable: true, get: function() {
        return scan_1.scan;
      } });
      var sequenceEqual_1 = require_sequenceEqual();
      Object.defineProperty(exports, "sequenceEqual", { enumerable: true, get: function() {
        return sequenceEqual_1.sequenceEqual;
      } });
      var share_1 = require_share();
      Object.defineProperty(exports, "share", { enumerable: true, get: function() {
        return share_1.share;
      } });
      var shareReplay_1 = require_shareReplay();
      Object.defineProperty(exports, "shareReplay", { enumerable: true, get: function() {
        return shareReplay_1.shareReplay;
      } });
      var single_1 = require_single();
      Object.defineProperty(exports, "single", { enumerable: true, get: function() {
        return single_1.single;
      } });
      var skip_1 = require_skip();
      Object.defineProperty(exports, "skip", { enumerable: true, get: function() {
        return skip_1.skip;
      } });
      var skipLast_1 = require_skipLast();
      Object.defineProperty(exports, "skipLast", { enumerable: true, get: function() {
        return skipLast_1.skipLast;
      } });
      var skipUntil_1 = require_skipUntil();
      Object.defineProperty(exports, "skipUntil", { enumerable: true, get: function() {
        return skipUntil_1.skipUntil;
      } });
      var skipWhile_1 = require_skipWhile();
      Object.defineProperty(exports, "skipWhile", { enumerable: true, get: function() {
        return skipWhile_1.skipWhile;
      } });
      var startWith_1 = require_startWith();
      Object.defineProperty(exports, "startWith", { enumerable: true, get: function() {
        return startWith_1.startWith;
      } });
      var subscribeOn_1 = require_subscribeOn();
      Object.defineProperty(exports, "subscribeOn", { enumerable: true, get: function() {
        return subscribeOn_1.subscribeOn;
      } });
      var switchAll_1 = require_switchAll();
      Object.defineProperty(exports, "switchAll", { enumerable: true, get: function() {
        return switchAll_1.switchAll;
      } });
      var switchMap_1 = require_switchMap();
      Object.defineProperty(exports, "switchMap", { enumerable: true, get: function() {
        return switchMap_1.switchMap;
      } });
      var switchMapTo_1 = require_switchMapTo();
      Object.defineProperty(exports, "switchMapTo", { enumerable: true, get: function() {
        return switchMapTo_1.switchMapTo;
      } });
      var switchScan_1 = require_switchScan();
      Object.defineProperty(exports, "switchScan", { enumerable: true, get: function() {
        return switchScan_1.switchScan;
      } });
      var take_1 = require_take();
      Object.defineProperty(exports, "take", { enumerable: true, get: function() {
        return take_1.take;
      } });
      var takeLast_1 = require_takeLast();
      Object.defineProperty(exports, "takeLast", { enumerable: true, get: function() {
        return takeLast_1.takeLast;
      } });
      var takeUntil_1 = require_takeUntil();
      Object.defineProperty(exports, "takeUntil", { enumerable: true, get: function() {
        return takeUntil_1.takeUntil;
      } });
      var takeWhile_1 = require_takeWhile();
      Object.defineProperty(exports, "takeWhile", { enumerable: true, get: function() {
        return takeWhile_1.takeWhile;
      } });
      var tap_1 = require_tap();
      Object.defineProperty(exports, "tap", { enumerable: true, get: function() {
        return tap_1.tap;
      } });
      var throttle_1 = require_throttle();
      Object.defineProperty(exports, "throttle", { enumerable: true, get: function() {
        return throttle_1.throttle;
      } });
      var throttleTime_1 = require_throttleTime();
      Object.defineProperty(exports, "throttleTime", { enumerable: true, get: function() {
        return throttleTime_1.throttleTime;
      } });
      var throwIfEmpty_1 = require_throwIfEmpty();
      Object.defineProperty(exports, "throwIfEmpty", { enumerable: true, get: function() {
        return throwIfEmpty_1.throwIfEmpty;
      } });
      var timeInterval_1 = require_timeInterval();
      Object.defineProperty(exports, "timeInterval", { enumerable: true, get: function() {
        return timeInterval_1.timeInterval;
      } });
      var timeout_2 = require_timeout();
      Object.defineProperty(exports, "timeout", { enumerable: true, get: function() {
        return timeout_2.timeout;
      } });
      var timeoutWith_1 = require_timeoutWith();
      Object.defineProperty(exports, "timeoutWith", { enumerable: true, get: function() {
        return timeoutWith_1.timeoutWith;
      } });
      var timestamp_1 = require_timestamp();
      Object.defineProperty(exports, "timestamp", { enumerable: true, get: function() {
        return timestamp_1.timestamp;
      } });
      var toArray_1 = require_toArray();
      Object.defineProperty(exports, "toArray", { enumerable: true, get: function() {
        return toArray_1.toArray;
      } });
      var window_1 = require_window();
      Object.defineProperty(exports, "window", { enumerable: true, get: function() {
        return window_1.window;
      } });
      var windowCount_1 = require_windowCount();
      Object.defineProperty(exports, "windowCount", { enumerable: true, get: function() {
        return windowCount_1.windowCount;
      } });
      var windowTime_1 = require_windowTime();
      Object.defineProperty(exports, "windowTime", { enumerable: true, get: function() {
        return windowTime_1.windowTime;
      } });
      var windowToggle_1 = require_windowToggle();
      Object.defineProperty(exports, "windowToggle", { enumerable: true, get: function() {
        return windowToggle_1.windowToggle;
      } });
      var windowWhen_1 = require_windowWhen();
      Object.defineProperty(exports, "windowWhen", { enumerable: true, get: function() {
        return windowWhen_1.windowWhen;
      } });
      var withLatestFrom_1 = require_withLatestFrom();
      Object.defineProperty(exports, "withLatestFrom", { enumerable: true, get: function() {
        return withLatestFrom_1.withLatestFrom;
      } });
      var zipAll_1 = require_zipAll();
      Object.defineProperty(exports, "zipAll", { enumerable: true, get: function() {
        return zipAll_1.zipAll;
      } });
      var zipWith_1 = require_zipWith();
      Object.defineProperty(exports, "zipWith", { enumerable: true, get: function() {
        return zipWith_1.zipWith;
      } });
    }
  });

  // demo/calculator.ts
  var calculator_exports = {};
  __export(calculator_exports, {
    initializeCalculator: () => initializeCalculator
  });

  // src/concepts/round8/model/terminology.ts
  var Round8Cases = /* @__PURE__ */ ((Round8Cases2) => {
    Round8Cases2[Round8Cases2["ZERO_CASE"] = 0] = "ZERO_CASE";
    Round8Cases2[Round8Cases2["POSITIVE_TWIST_CASE"] = 1] = "POSITIVE_TWIST_CASE";
    Round8Cases2[Round8Cases2["NEGATIVE_TWIST_CASE"] = 2] = "NEGATIVE_TWIST_CASE";
    return Round8Cases2;
  })(Round8Cases || {});
  var Round8CasesArray = [
    BigInt(0) * 64n,
    BigInt(1) * 64n,
    BigInt(2) * 64n
  ];
  var getSignBit = (buffer) => {
    return (buffer & MaskStore.SIGN) === 1n ? 1 : 0;
  };
  var clearSignBit = (buffer) => {
    return buffer & ClearMaskStore.SIGN;
  };
  var setSignBit = (buffer) => {
    return buffer | MaskStore.SIGN;
  };
  var flipSignBit = (buffer) => {
    return buffer ^ MaskStore.SIGN;
  };
  var createBuffer = () => {
    return 0n;
  };
  var Round8CaseStore = (() => {
    let store = 0n;
    const zeroCase = 0n;
    const positiveTwistCase = 0x1fffffffffffffffn;
    const negativeTwistCase = 0x0n;
    store |= zeroCase;
    store |= positiveTwistCase << 64n;
    store |= negativeTwistCase << 128n;
    return store;
  })();
  var Round8Numerals = Uint8Array.from([
    1,
    // [0] Marquee: Displays as 1
    0,
    // [1] Round8 1: Regular value 0
    1,
    // [2] Round8 2: Regular value 1
    2,
    // [3] Round8 3: Regular value 2
    3,
    // [4] Round8 4: Regular value 3
    4,
    // [5] Round8 5: Regular value 4
    5,
    // [6] Round8 6: Regular value 5
    6,
    // [7] Round8 7: Regular value 6
    7
    // [8] Round8 8: Regular value 7
  ]);
  var WorkingBigIntBucket = { content: 0n };
  var getRound8Case = (caseType) => {
    const offset = Round8CasesArray[caseType];
    return Round8CaseStore >> offset & (1n << 64n) - 1n;
  };
  var MaskStore = {
    SIGN: 1n << 0n,
    // Sign bit: bit 0 (ORIGIN ANCHOR - NEVER MOVES)
    P1: 0b111n << 1n,
    // Position 1: bits 1-3
    P2: 0b111n << 4n,
    // Position 2: bits 4-6
    P3: 0b111n << 7n,
    // Position 3: bits 7-9
    P4: 0b111n << 10n,
    // Position 4: bits 10-12
    P5: 0b111n << 13n,
    // Position 5: bits 13-15
    P6: 0b111n << 16n,
    // Position 6: bits 16-18
    P7: 0b111n << 19n,
    // Position 7: bits 19-21
    P8: 0b111n << 22n,
    // Position 8: bits 22-24
    P9: 0b111n << 25n,
    // Position 9: bits 25-27
    P10: 0b111n << 28n,
    // Position 10: bits 28-30
    P11: 0b111n << 31n,
    // Position 11: bits 31-33
    P12: 0b111n << 34n,
    // Position 12: bits 34-36
    P13: 0b111n << 37n,
    // Position 13: bits 37-39
    P14: 0b111n << 40n,
    // Position 14: bits 40-42
    P15: 0b111n << 43n,
    // Position 15: bits 43-45
    P16: 0b111n << 46n,
    // Position 16: bits 46-48
    P17: 0b111n << 49n,
    // Position 17: bits 49-51
    P18: 0b111n << 52n,
    // Position 18: bits 52-54
    P19: 0b111n << 55n,
    // Position 19: bits 55-57
    P20: 0b111n << 58n,
    // Position 20: bits 58-60
    P21: 0b111n << 61n
    // Position 21: bits 61-63 (64-bit boundary)
    // EXPANSION READY - Positions 22+ continue upward infinitely
  };
  var ClearMaskStore = {
    SIGN: ~(1n << 0n),
    // Clear sign bit
    P1: ~(0b111n << 1n),
    // Clear position 1
    P2: ~(0b111n << 4n),
    // Clear position 2
    P3: ~(0b111n << 7n),
    // Clear position 3
    P4: ~(0b111n << 10n),
    // Clear position 4
    P5: ~(0b111n << 13n),
    // Clear position 5
    P6: ~(0b111n << 16n),
    // Clear position 6
    P7: ~(0b111n << 19n),
    // Clear position 7
    P8: ~(0b111n << 22n),
    // Clear position 8
    P9: ~(0b111n << 25n),
    // Clear position 9
    P10: ~(0b111n << 28n),
    // Clear position 10
    P11: ~(0b111n << 31n),
    // Clear position 11
    P12: ~(0b111n << 34n),
    // Clear position 12
    P13: ~(0b111n << 37n),
    // Clear position 13
    P14: ~(0b111n << 40n),
    // Clear position 14
    P15: ~(0b111n << 43n),
    // Clear position 15
    P16: ~(0b111n << 46n),
    // Clear position 16
    P17: ~(0b111n << 49n),
    // Clear position 17
    P18: ~(0b111n << 52n),
    // Clear position 18
    P19: ~(0b111n << 55n),
    // Clear position 19
    P20: ~(0b111n << 58n),
    // Clear position 20
    P21: ~(0b111n << 61n)
    // Clear position 21
  };
  var BitOffsetStore = {
    P1: 1n,
    // Position 1 starts at bit 1
    P2: 4n,
    // Position 2 starts at bit 4
    P3: 7n,
    // Position 3 starts at bit 7
    P4: 10n,
    // Position 4 starts at bit 10
    P5: 13n,
    // Position 5 starts at bit 13
    P6: 16n,
    // Position 6 starts at bit 16
    P7: 19n,
    // Position 7 starts at bit 19
    P8: 22n,
    // Position 8 starts at bit 22
    P9: 25n,
    // Position 9 starts at bit 25
    P10: 28n,
    // Position 10 starts at bit 28
    P11: 31n,
    // Position 11 starts at bit 31
    P12: 34n,
    // Position 12 starts at bit 34
    P13: 37n,
    // Position 13 starts at bit 37
    P14: 40n,
    // Position 14 starts at bit 40
    P15: 43n,
    // Position 15 starts at bit 43
    P16: 46n,
    // Position 16 starts at bit 46
    P17: 49n,
    // Position 17 starts at bit 49
    P18: 52n,
    // Position 18 starts at bit 52
    P19: 55n,
    // Position 19 starts at bit 55
    P20: 58n,
    // Position 20 starts at bit 58
    P21: 61n
    // Position 21 starts at bit 61
  };
  var getBitOffsetForPosition = (position) => {
    switch (position) {
      case 1:
        return BitOffsetStore.P1;
      case 2:
        return BitOffsetStore.P2;
      case 3:
        return BitOffsetStore.P3;
      case 4:
        return BitOffsetStore.P4;
      case 5:
        return BitOffsetStore.P5;
      case 6:
        return BitOffsetStore.P6;
      case 7:
        return BitOffsetStore.P7;
      case 8:
        return BitOffsetStore.P8;
      case 9:
        return BitOffsetStore.P9;
      case 10:
        return BitOffsetStore.P10;
      case 11:
        return BitOffsetStore.P11;
      case 12:
        return BitOffsetStore.P12;
      case 13:
        return BitOffsetStore.P13;
      case 14:
        return BitOffsetStore.P14;
      case 15:
        return BitOffsetStore.P15;
      case 16:
        return BitOffsetStore.P16;
      case 17:
        return BitOffsetStore.P17;
      case 18:
        return BitOffsetStore.P18;
      case 19:
        return BitOffsetStore.P19;
      case 20:
        return BitOffsetStore.P20;
      case 21:
        return BitOffsetStore.P21;
      default:
        return BitOffsetStore.P1;
    }
  };
  var getBitWiseMaskForPosition = (position) => {
    switch (position) {
      case 1:
        return MaskStore.P1;
      case 2:
        return MaskStore.P2;
      case 3:
        return MaskStore.P3;
      case 4:
        return MaskStore.P4;
      case 5:
        return MaskStore.P5;
      case 6:
        return MaskStore.P6;
      case 7:
        return MaskStore.P7;
      case 8:
        return MaskStore.P8;
      case 9:
        return MaskStore.P9;
      case 10:
        return MaskStore.P10;
      case 11:
        return MaskStore.P11;
      case 12:
        return MaskStore.P12;
      case 13:
        return MaskStore.P13;
      case 14:
        return MaskStore.P14;
      case 15:
        return MaskStore.P15;
      case 16:
        return MaskStore.P16;
      case 17:
        return MaskStore.P17;
      case 18:
        return MaskStore.P18;
      case 19:
        return MaskStore.P19;
      case 20:
        return MaskStore.P20;
      case 21:
        return MaskStore.P21;
      default:
        return MaskStore.P1;
    }
  };
  var extractBitTuple = (buffer, position) => {
    const mask = getBitWiseMaskForPosition(position);
    const bitOffset = getBitOffsetForPosition(position);
    const threeBits = Number((buffer & mask) >> bitOffset);
    return [
      threeBits & 1,
      // Bit 0 (LSB of 3-bit group)
      threeBits >> 1 & 1,
      // Bit 1
      threeBits >> 2 & 1
      // Bit 2 (MSB of 3-bit group)
    ];
  };
  var getClearMaskForPosition = (position) => {
    switch (position) {
      case 1:
        return ClearMaskStore.P1;
      case 2:
        return ClearMaskStore.P2;
      case 3:
        return ClearMaskStore.P3;
      case 4:
        return ClearMaskStore.P4;
      case 5:
        return ClearMaskStore.P5;
      case 6:
        return ClearMaskStore.P6;
      case 7:
        return ClearMaskStore.P7;
      case 8:
        return ClearMaskStore.P8;
      case 9:
        return ClearMaskStore.P9;
      case 10:
        return ClearMaskStore.P10;
      case 11:
        return ClearMaskStore.P11;
      case 12:
        return ClearMaskStore.P12;
      case 13:
        return ClearMaskStore.P13;
      case 14:
        return ClearMaskStore.P14;
      case 15:
        return ClearMaskStore.P15;
      case 16:
        return ClearMaskStore.P16;
      case 17:
        return ClearMaskStore.P17;
      case 18:
        return ClearMaskStore.P18;
      case 19:
        return ClearMaskStore.P19;
      case 20:
        return ClearMaskStore.P20;
      case 21:
        return ClearMaskStore.P21;
      default:
        return ~0n;
    }
  };
  var setNumeralProperty = (number) => {
    switch (number) {
      case 0:
        return 0n;
      case 1:
        return 1n;
      case 2:
        return 2n;
      case 3:
        return 3n;
      case 4:
        return 4n;
      case 5:
        return 5n;
      case 6:
        return 6n;
      case 7:
        return 7n;
      default: {
        throw "CRITICAL RANGE SET NUMBER ERROR";
      }
    }
  };
  var extractValueTuple = (value) => {
    const bits = Number(value & 0b111n);
    return [
      bits & 1,
      // Bit 0 (LSB)
      bits >> 1 & 1,
      // Bit 1
      bits >> 2 & 1
      // Bit 2 (MSB)
    ];
  };
  var MARQUEE_TUPLE = extractValueTuple(setNumeralProperty(1));
  var NumeralStore = {
    One: setNumeralProperty(Round8Numerals[1]),
    Two: setNumeralProperty(Round8Numerals[2]),
    Three: setNumeralProperty(Round8Numerals[3]),
    Four: setNumeralProperty(Round8Numerals[4]),
    Five: setNumeralProperty(Round8Numerals[5]),
    Six: setNumeralProperty(Round8Numerals[6]),
    Seven: setNumeralProperty(Round8Numerals[7]),
    Eight: setNumeralProperty(Round8Numerals[8])
  };
  var ShiftedNumeralStore = {
    One: setNumeralProperty(Round8Numerals[3]),
    Two: setNumeralProperty(Round8Numerals[4]),
    Three: setNumeralProperty(Round8Numerals[5]),
    Four: setNumeralProperty(Round8Numerals[6]),
    Five: setNumeralProperty(Round8Numerals[7]),
    Six: setNumeralProperty(Round8Numerals[8]),
    Seven: setNumeralProperty(Round8Numerals[1]),
    // Should Invalidate to Full Twist in Shifted Position
    Eight: setNumeralProperty(Round8Numerals[2])
  };
  var NumeralSeries = [
    extractValueTuple(NumeralStore.One),
    // Binary 0n → [0,0,0]
    extractValueTuple(NumeralStore.Two),
    // Binary 1n → [1,0,0]
    extractValueTuple(NumeralStore.Three),
    // Binary 2n → [0,1,0]
    extractValueTuple(NumeralStore.Four),
    // Binary 3n → [1,1,0]
    extractValueTuple(NumeralStore.Five),
    // Binary 4n → [0,0,1]
    extractValueTuple(NumeralStore.Six),
    // Binary 5n → [1,0,1]
    extractValueTuple(NumeralStore.Seven),
    // Binary 6n → [0,1,1]
    extractValueTuple(NumeralStore.Eight)
    // Binary 7n → [1,1,1]
  ];
  var ShiftedNumeralSeries = [
    extractValueTuple(ShiftedNumeralStore.Eight),
    extractValueTuple(ShiftedNumeralStore.One),
    extractValueTuple(ShiftedNumeralStore.Two),
    extractValueTuple(ShiftedNumeralStore.Three),
    extractValueTuple(ShiftedNumeralStore.Four),
    extractValueTuple(ShiftedNumeralStore.Five),
    extractValueTuple(ShiftedNumeralStore.Six),
    extractValueTuple(ShiftedNumeralStore.Seven),
    extractValueTuple(ShiftedNumeralStore.Eight)
  ];
  var Numerals = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8
  ];
  var ShiftedNumerals = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8
  ];
  var StringNumerals = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8"
  ];
  var ShiftedStringNumerals = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "0"
    // Marquee Position and Error as Logic Should Guard Against this Case
  ];
  var initializeSpooledWrung = () => {
    const arr = [];
    for (let i = 0; i < 2; i++) {
      arr[i] = [];
      for (let j = 0; j < 2; j++) {
        arr[i][j] = [];
      }
    }
    return arr;
  };
  var spooledNumerals = initializeSpooledWrung();
  var spooledShiftedNumerals = initializeSpooledWrung();
  var spooledStringNumerals = initializeSpooledWrung();
  var spooledShiftedStringNumerals = initializeSpooledWrung();
  var spooledRegularShiftedBridge = initializeSpooledWrung();
  var spool = (informativeSeries, baseSeries, spooled) => {
    informativeSeries.forEach((informative, i) => {
      const one = informative[0];
      const two = informative[1];
      const three = informative[2];
      const value = baseSeries[i];
      spooled[one][two][three] = value;
    });
  };
  spool(NumeralSeries, Numerals, spooledNumerals);
  spool(ShiftedNumeralSeries, ShiftedNumerals, spooledShiftedNumerals);
  spool(NumeralSeries, StringNumerals, spooledStringNumerals);
  spool(ShiftedNumeralSeries, ShiftedStringNumerals, spooledShiftedStringNumerals);
  spool(NumeralSeries, ShiftedNumeralSeries, spooledRegularShiftedBridge);
  var getRegularBitRotation = (position) => {
    return NumeralSeries[position - 1];
  };
  var getRegularRotation = (position) => {
    return Round8Numerals[position];
  };
  var getShiftedBitRotation = (position) => {
    return ShiftedNumeralSeries[position];
  };
  var getShiftedRotation = (position) => {
    switch (position - 1) {
      case 1: {
        return Round8Numerals[3];
      }
      case 2: {
        return Round8Numerals[4];
      }
      case 3: {
        return Round8Numerals[5];
      }
      case 4: {
        return Round8Numerals[6];
      }
      case 5: {
        return Round8Numerals[7];
      }
      case 6: {
        return Round8Numerals[8];
      }
      case 7: {
        return Round8Numerals[1];
      }
      case 8: {
        return Round8Numerals[2];
      }
      default: {
        return Round8Numerals[0];
      }
    }
  };
  var getMarqueeBitRotation = () => {
    return extractValueTuple(NumeralStore.Two);
  };
  var MarqueeRotation = Round8Numerals[0];
  var getRotationValue = (buffer, position) => {
    const [b0, b1, b2] = extractBitTuple(buffer, position);
    if (position === 21) {
      return spooledShiftedNumerals[b0][b1][b2];
    }
    return spooledNumerals[b0][b1][b2];
  };
  var getRotationString = (buffer, position) => {
    const [b0, b1, b2] = extractBitTuple(buffer, position);
    return spooledStringNumerals[b0][b1][b2];
  };
  var getShiftedRotationString = (buffer, position) => {
    const [b0, b1, b2] = extractBitTuple(buffer, position);
    return spooledShiftedStringNumerals[b0][b1][b2];
  };
  var applyNumeralRotation = (value, buffer, position) => {
    let finalValue;
    switch (value) {
      case 0: {
        finalValue = NumeralStore.One;
        break;
      }
      case 1: {
        finalValue = NumeralStore.Two;
        break;
      }
      case 2: {
        finalValue = NumeralStore.Three;
        break;
      }
      case 3: {
        finalValue = NumeralStore.Four;
        break;
      }
      case 4: {
        finalValue = NumeralStore.Five;
        break;
      }
      case 5: {
        finalValue = NumeralStore.Six;
        break;
      }
      case 6: {
        finalValue = NumeralStore.Seven;
        break;
      }
      case 7: {
        finalValue = NumeralStore.Eight;
        break;
      }
      default: {
        throw "CRITICAL";
      }
    }
    WorkingBigIntBucket.content = finalValue;
    const clearMask = getClearMaskForPosition(position);
    const bitOffset = getBitOffsetForPosition(position);
    WorkingBigIntBucket.content <<= bitOffset;
    return buffer & clearMask | WorkingBigIntBucket.content;
  };
  var applyShiftedNumeralRotation = (value, buffer, position) => {
    let finalValue;
    switch (value) {
      case 0: {
        finalValue = ShiftedNumeralStore.Eight;
        break;
      }
      case 1: {
        finalValue = ShiftedNumeralStore.One;
        break;
      }
      case 2: {
        finalValue = ShiftedNumeralStore.Two;
        break;
      }
      case 3: {
        finalValue = ShiftedNumeralStore.Three;
        break;
      }
      case 4: {
        finalValue = ShiftedNumeralStore.Four;
        break;
      }
      case 5: {
        finalValue = ShiftedNumeralStore.Five;
        break;
      }
      case 6: {
        finalValue = ShiftedNumeralStore.Six;
        break;
      }
      case 7: {
        finalValue = ShiftedNumeralStore.Seven;
        break;
      }
      default: {
        throw "CRITICAL Apply Shifted Value " + value;
      }
    }
    WorkingBigIntBucket.content = finalValue;
    const clearMask = getClearMaskForPosition(position);
    const bitOffset = getBitOffsetForPosition(position);
    WorkingBigIntBucket.content <<= bitOffset;
    return buffer & clearMask | WorkingBigIntBucket.content;
  };
  var applyMarqueeAtPosition = (buffer, position, useShifted = false) => {
    const marqueeValue = useShifted ? ShiftedNumeralStore.Eight : NumeralStore.Two;
    WorkingBigIntBucket.content = marqueeValue;
    const clearMask = getClearMaskForPosition(position);
    const bitOffset = getBitOffsetForPosition(position);
    WorkingBigIntBucket.content <<= bitOffset;
    const result = buffer & clearMask | WorkingBigIntBucket.content;
    WorkingBigIntBucket.content = 0n;
    return result;
  };
  var createResultMuxity = (resultSign = 1) => ({
    positions: [],
    // Empty array, push sequentially
    consecutiveEightsFromStart: 0,
    pendingPropagation: false,
    resultSign
  });
  var scanUpward = (wrung, callback, position = 1) => {
    const shouldContinue = callback(wrung, position);
    if (!shouldContinue) {
      return position;
    }
    if (position === 21) {
      return 0;
    }
    return scanUpward(wrung, callback, position + 1);
  };
  var scanUpwards = (wrungA, wrungB, callback, position = 1) => {
    const shouldContinue = callback(wrungA, wrungB, position);
    if (!shouldContinue) {
      return position;
    }
    if (position === 21) {
      return 0;
    }
    return scanUpwards(wrungA, wrungB, callback, position + 1);
  };
  var scanDownward = (wrung, callback, position = 21) => {
    const shouldContinue = callback(wrung, position);
    if (!shouldContinue) {
      return position;
    }
    if (position === 1) {
      return 0;
    }
    return scanDownward(wrung, callback, position - 1);
  };
  var scanDownwards = (wrungA, wrungB, callback, position = 21) => {
    const shouldContinue = callback(wrungA, wrungB, position);
    if (!shouldContinue) {
      return position;
    }
    if (position === 1) {
      return 0;
    }
    return scanDownwards(wrungA, wrungB, callback, position - 1);
  };

  // src/concepts/round8/model/bidirectional.ts
  var NEGATIVE_ONE_STRIKE_SWEEP = [
    21,
    // Strike 1: Highest position (expansion bound, most variation)
    20,
    1,
    // Strike 2: Lowest position (near origin)
    11,
    // Strike 3: Middle bisection
    12,
    10,
    // Strikes 4-5: Alternating outward from middle
    13,
    9,
    // Strikes 6-7
    14,
    8,
    // Strikes 8-9
    15,
    7,
    // Strikes 10-11
    16,
    6,
    // Strikes 12-13
    17,
    5,
    // Strikes 14-15
    18,
    4,
    // Strikes 16-17
    19,
    3,
    // Strikes 18-19
    2
    // Strikes 20-21
  ];
  var zeroAnorOne = (buffer) => {
    const signBit = getSignBit(buffer);
    let between = false;
    let same = false;
    let aim = -1;
    const composition = [
      {
        order: [],
        congruent: false
      },
      {
        order: [],
        congruent: false
      },
      {
        order: [],
        congruent: false
      }
    ];
    NEGATIVE_ONE_STRIKE_SWEEP.forEach((position, i) => {
      if (between) {
        return;
      }
      const [b0, b1, b2] = extractBitTuple(buffer, position);
      if (b0 === 0 && b1 === 0 && b2 === 0) {
        if (!same) {
          composition[0].order.push(position);
          composition[0].congruent = true;
          same = true;
          aim = 0;
        } else if (same && aim !== 0) {
          composition[0].congruent = false;
          composition[1].congruent = false;
          between = true;
          return;
        } else if (same) {
          composition[0].order.push(position);
        }
      } else if (b0 === 1 && b1 === 1 && b2 === 1) {
        if (!same) {
          composition[1].order.push(position);
          composition[1].congruent = true;
          aim = 1;
        } else if (same && aim !== 1) {
          composition[0].congruent = false;
          composition[1].order.push(position);
          composition[1].congruent = false;
          between = true;
          composition[2].order = [...NEGATIVE_ONE_STRIKE_SWEEP].splice(i + 1);
          return;
        } else if (same) {
          composition[1].order.push(position);
        }
      }
    });
    return [
      signBit === 0,
      composition[0].order.length === 21 && signBit === 0,
      composition
    ];
  };
  var BidirectionalConference = (buffer) => {
    const [m0, m1, m2] = MARQUEE_TUPLE;
    const [isNegative, isOrigin, composition] = zeroAnorOne(buffer);
    if (isOrigin) {
      return {
        wrung: buffer,
        isAbsoluteZero: true,
        firstValidRotation: 1
      };
    }
    let marqueePosition;
    let firstValidPosition = -1;
    const startTwist = composition[0].order[0] === 21;
    if (startTwist && composition[1].order.length >= 1) {
      composition[2].order.forEach((position) => {
        const [b0, b1, b2] = extractBitTuple(buffer, position);
        if (!(b0 === 1 && b1 === 1 && b2 === 1)) {
          composition[1].congruent = false;
          return;
        } else {
          composition[1].congruent = true;
          composition[1].order.push(position);
        }
      });
    }
    const isFinalTwist = composition[0].congruent === false && composition[1].congruent && composition[1].order.length === 20 && composition[0].order.length === 1;
    if (isFinalTwist) {
      return {
        wrung: buffer,
        isNegative,
        isFinalTwist,
        marqueeRotation: 22,
        firstValidRotation: 21
      };
    }
    scanDownward(buffer, (buf, pos) => {
      const [b0, b1, b2] = extractBitTuple(buf, pos);
      if (pos === 21) {
        if (b0 === m0 && b1 === m1 && b2 === m2) {
          marqueePosition = 21;
          firstValidPosition = 20;
          return false;
        } else if (spooledShiftedNumerals[b0][b1][b2] !== 7 && spooledShiftedNumerals[b0][b1][b2] !== 8) {
          marqueePosition = 22;
          firstValidPosition = 21;
          return false;
        }
      } else if (b0 === m0 && b1 === m1 && b2 === m2) {
        marqueePosition = pos;
        firstValidPosition = pos - 1;
        return false;
      }
      return true;
    });
    return {
      wrung: buffer,
      isNegative,
      firstValidRotation: firstValidPosition === -1 || firstValidPosition === 0 ? 1 : firstValidPosition,
      marqueeRotation: marqueePosition,
      isFinalTwist
    };
  };

  // src/concepts/round8/model/conference.ts
  var getWrungStringRepresentation = (buffer) => {
    const marqueeState = BidirectionalConference(buffer);
    if (marqueeState.isAbsoluteZero) {
      return "0";
    }
    if (marqueeState.isFinalTwist) {
      if (marqueeState.isNegative) {
        return "-711111111111111111111";
      } else {
        return "711111111111111111111";
      }
    }
    const firstValid = marqueeState.firstValidRotation ?? 1;
    let result = "";
    scanUpward(buffer, (buf, pos) => {
      if (pos > firstValid) {
        return false;
      }
      if (pos !== 21) {
        const rotationString = getRotationString(buf, pos);
        result += rotationString;
      } else {
        const rotationString = getShiftedRotationString(buf, pos);
        result += rotationString;
      }
      return true;
    });
    return (marqueeState.isNegative ? "-" : "") + result.split("").reverse().join("");
  };
  var getFormattedColumnarWrungRepresentation = (buffer) => {
    const beforeString = getWrungStringRepresentation(buffer);
    if (beforeString.length === 0) {
      return "0";
    }
    if (beforeString.length === 1) {
      return beforeString;
    }
    const isNegative = beforeString.charAt(0) === "-";
    const afterString = isNegative ? beforeString.slice(1) : beforeString;
    const columns = [];
    const isOdd = afterString.length % 2 === 1;
    let startIndex = 0;
    if (isOdd) {
      columns.push(afterString[0]);
      startIndex = 1;
    }
    for (let i = startIndex; i < afterString.length; i += 2) {
      const column = afterString.slice(i, i + 2);
      columns.push(column);
    }
    const result = columns.join(",");
    return (isNegative ? "-" : "") + result;
  };
  var createFormattedRound8BinaryString = (buffer) => {
    const signBit = getSignBit(buffer);
    const positionStrings = [];
    for (let pos = 21; pos >= 1; pos--) {
      const [b0, b1, b2] = extractBitTuple(buffer, pos);
      const binaryString = `${b2}${b1}${b0}`;
      positionStrings.push(binaryString);
    }
    return `${positionStrings.join(" | ")} | ${signBit} S`;
  };
  var isValidRound8Numeral = (char) => {
    return /^[1-8]$/.test(char);
  };
  var round8NumeralToRotation = (numeral) => {
    const symbolValue = parseInt(numeral, 10);
    if (symbolValue < 1 || symbolValue > 8) {
      return void 0;
    }
    return symbolValue - 1;
  };
  var round8NumeralToShiftedRotation = (numeral) => {
    const symbolValue = parseInt(numeral, 10);
    if (symbolValue < 1 || symbolValue > 7) {
      return void 0;
    }
    return symbolValue;
  };
  var handleLengthOne = (preparedString, isNegative) => {
    const numeral = preparedString[0];
    if (!isValidRound8Numeral(numeral)) {
      return void 0;
    }
    let buffer = 0n;
    buffer = isNegative ? clearSignBit(buffer) : setSignBit(buffer);
    const rotationValue = round8NumeralToRotation(numeral);
    if (rotationValue === void 0) {
      return void 0;
    }
    buffer = applyNumeralRotation(rotationValue, buffer, 1);
    buffer = applyMarqueeAtPosition(buffer, 2);
    return buffer;
  };
  var handleLengthTwoToTwenty = (preparedString, isNegative) => {
    let buffer = 0n;
    const length = preparedString.length;
    buffer = isNegative ? clearSignBit(buffer) : setSignBit(buffer);
    for (let i = 0; i < length; i++) {
      const numeral = preparedString[i];
      if (!isValidRound8Numeral(numeral)) {
        return void 0;
      }
      const rotation = round8NumeralToRotation(numeral);
      if (rotation === void 0) {
        return void 0;
      }
      const position = i + 1;
      buffer = applyNumeralRotation(rotation, buffer, position);
    }
    const marqueePosition = length + 1;
    buffer = applyMarqueeAtPosition(buffer, marqueePosition);
    return buffer;
  };
  var handleLengthTwentyOne = (preparedString, isNegative) => {
    let buffer = 0n;
    buffer = isNegative ? clearSignBit(buffer) : setSignBit(buffer);
    for (let i = 0; i < 20; i++) {
      const numeral = preparedString[i];
      if (!isValidRound8Numeral(numeral)) {
        return void 0;
      }
      const rotation = round8NumeralToRotation(numeral);
      if (rotation === void 0) {
        return void 0;
      }
      const position = i + 1;
      buffer = applyNumeralRotation(rotation, buffer, position);
    }
    const position21Numeral = preparedString[20];
    if (position21Numeral === "8") {
      return void 0;
    }
    const rotation21 = round8NumeralToShiftedRotation(position21Numeral);
    if (rotation21 === void 0) {
      return void 0;
    }
    buffer = applyShiftedNumeralRotation(rotation21, buffer, 21);
    return buffer;
  };
  var parseStringToRound8 = (input) => {
    if (input === "0") {
      return getRound8Case(0 /* ZERO_CASE */);
    }
    let preparedString = input;
    let isNegative = false;
    if (preparedString.includes(",")) {
      const parts = preparedString.split(",");
      preparedString = parts.join("");
    }
    if (preparedString.startsWith("-")) {
      isNegative = true;
      preparedString = preparedString.slice(1);
    }
    if (preparedString === "711111111111111111111") {
      return getRound8Case(
        isNegative ? 2 /* NEGATIVE_TWIST_CASE */ : 1 /* POSITIVE_TWIST_CASE */
      );
    } else if (preparedString.length === 21 && preparedString.charAt(0) === "7") {
      return getRound8Case(
        isNegative ? 2 /* NEGATIVE_TWIST_CASE */ : 1 /* POSITIVE_TWIST_CASE */
      );
    }
    if (preparedString.length === 0) {
      return void 0;
    }
    for (let i = 0; i < preparedString.length; i++) {
      const char = preparedString[i];
      if (char === "0") {
        return void 0;
      }
      if (!isValidRound8Numeral(char)) {
        return void 0;
      }
    }
    const length = preparedString.length;
    if (length === 21 && preparedString[0] === "8") {
      if (isNegative) {
        return getRound8Case(2 /* NEGATIVE_TWIST_CASE */);
      } else {
        return getRound8Case(1 /* POSITIVE_TWIST_CASE */);
      }
    }
    if (length > 21) {
      if (isNegative) {
        return getRound8Case(2 /* NEGATIVE_TWIST_CASE */);
      } else {
        return getRound8Case(1 /* POSITIVE_TWIST_CASE */);
      }
    }
    preparedString = preparedString.split("").reverse().join("");
    if (length === 1) {
      return handleLengthOne(preparedString, isNegative);
    } else if (length >= 2 && length <= 20) {
      return handleLengthTwoToTwenty(preparedString, isNegative);
    } else if (length === 21) {
      return handleLengthTwentyOne(preparedString, isNegative);
    }
    return void 0;
  };

  // src/concepts/round8/model/series/sum.cases.ts
  var SumSeries = {
    // 1 + N (N = 1-8)
    SumOfOneAndOne: (() => {
      const x = getRegularBitRotation(1);
      const y = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(2)]];
    })(),
    SumOfOneAndTwo: (() => {
      const x = getRegularBitRotation(1);
      const y = getRegularBitRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(3)]];
    })(),
    SumOfOneAndThree: (() => {
      const x = getRegularBitRotation(1);
      const y = getRegularBitRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(4)]];
    })(),
    SumOfOneAndFour: (() => {
      const x = getRegularBitRotation(1);
      const y = getRegularBitRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(5)]];
    })(),
    SumOfOneAndFive: (() => {
      const x = getRegularBitRotation(1);
      const y = getRegularBitRotation(5);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(6)]];
    })(),
    SumOfOneAndSix: (() => {
      const x = getRegularBitRotation(1);
      const y = getRegularBitRotation(6);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(7)]];
    })(),
    SumOfOneAndSeven: (() => {
      const x = getRegularBitRotation(1);
      const y = getRegularBitRotation(7);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(8)]];
    })(),
    SumOfOneAndEight: (() => {
      const x = getRegularBitRotation(1);
      const y = getRegularBitRotation(8);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(1), getRegularBitRotation(1)]];
    })(),
    // 2 + N (N = 1-8)
    SumOfTwoAndOne: (() => {
      const x = getRegularBitRotation(2);
      const y = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(3)]];
    })(),
    SumOfTwoAndTwo: (() => {
      const x = getRegularBitRotation(2);
      const y = getRegularBitRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(4)]];
    })(),
    SumOfTwoAndThree: (() => {
      const x = getRegularBitRotation(2);
      const y = getRegularBitRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(5)]];
    })(),
    SumOfTwoAndFour: (() => {
      const x = getRegularBitRotation(2);
      const y = getRegularBitRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(6)]];
    })(),
    SumOfTwoAndFive: (() => {
      const x = getRegularBitRotation(2);
      const y = getRegularBitRotation(5);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(7)]];
    })(),
    SumOfTwoAndSix: (() => {
      const x = getRegularBitRotation(2);
      const y = getRegularBitRotation(6);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(8)]];
    })(),
    SumOfTwoAndSeven: (() => {
      const x = getRegularBitRotation(2);
      const y = getRegularBitRotation(7);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(1), getRegularBitRotation(1)]];
    })(),
    SumOfTwoAndEight: (() => {
      const x = getRegularBitRotation(2);
      const y = getRegularBitRotation(8);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(2), getRegularBitRotation(1)]];
    })(),
    // 3 + N (N = 1-8)
    SumOfThreeAndOne: (() => {
      const x = getRegularBitRotation(3);
      const y = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(4)]];
    })(),
    SumOfThreeAndTwo: (() => {
      const x = getRegularBitRotation(3);
      const y = getRegularBitRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(5)]];
    })(),
    SumOfThreeAndThree: (() => {
      const x = getRegularBitRotation(3);
      const y = getRegularBitRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(6)]];
    })(),
    SumOfThreeAndFour: (() => {
      const x = getRegularBitRotation(3);
      const y = getRegularBitRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(7)]];
    })(),
    SumOfThreeAndFive: (() => {
      const x = getRegularBitRotation(3);
      const y = getRegularBitRotation(5);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(8)]];
    })(),
    SumOfThreeAndSix: (() => {
      const x = getRegularBitRotation(3);
      const y = getRegularBitRotation(6);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(1), getRegularBitRotation(1)]];
    })(),
    SumOfThreeAndSeven: (() => {
      const x = getRegularBitRotation(3);
      const y = getRegularBitRotation(7);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(2), getRegularBitRotation(1)]];
    })(),
    SumOfThreeAndEight: (() => {
      const x = getRegularBitRotation(3);
      const y = getRegularBitRotation(8);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(3), getRegularBitRotation(1)]];
    })(),
    // 4 + N (N = 1-8)
    SumOfFourAndOne: (() => {
      const x = getRegularBitRotation(4);
      const y = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(5)]];
    })(),
    SumOfFourAndTwo: (() => {
      const x = getRegularBitRotation(4);
      const y = getRegularBitRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(6)]];
    })(),
    SumOfFourAndThree: (() => {
      const x = getRegularBitRotation(4);
      const y = getRegularBitRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(7)]];
    })(),
    SumOfFourAndFour: (() => {
      const x = getRegularBitRotation(4);
      const y = getRegularBitRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(8)]];
    })(),
    SumOfFourAndFive: (() => {
      const x = getRegularBitRotation(4);
      const y = getRegularBitRotation(5);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(1), getRegularBitRotation(1)]];
    })(),
    SumOfFourAndSix: (() => {
      const x = getRegularBitRotation(4);
      const y = getRegularBitRotation(6);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(2), getRegularBitRotation(1)]];
    })(),
    SumOfFourAndSeven: (() => {
      const x = getRegularBitRotation(4);
      const y = getRegularBitRotation(7);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(3), getRegularBitRotation(1)]];
    })(),
    SumOfFourAndEight: (() => {
      const x = getRegularBitRotation(4);
      const y = getRegularBitRotation(8);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(4), getRegularBitRotation(1)]];
    })(),
    // 5 + N (N = 1-8)
    SumOfFiveAndOne: (() => {
      const x = getRegularBitRotation(5);
      const y = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(6)]];
    })(),
    SumOfFiveAndTwo: (() => {
      const x = getRegularBitRotation(5);
      const y = getRegularBitRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(7)]];
    })(),
    SumOfFiveAndThree: (() => {
      const x = getRegularBitRotation(5);
      const y = getRegularBitRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(8)]];
    })(),
    SumOfFiveAndFour: (() => {
      const x = getRegularBitRotation(5);
      const y = getRegularBitRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(1), getRegularBitRotation(1)]];
    })(),
    SumOfFiveAndFive: (() => {
      const x = getRegularBitRotation(5);
      const y = getRegularBitRotation(5);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(2), getRegularBitRotation(1)]];
    })(),
    SumOfFiveAndSix: (() => {
      const x = getRegularBitRotation(5);
      const y = getRegularBitRotation(6);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(3), getRegularBitRotation(1)]];
    })(),
    SumOfFiveAndSeven: (() => {
      const x = getRegularBitRotation(5);
      const y = getRegularBitRotation(7);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(4), getRegularBitRotation(1)]];
    })(),
    SumOfFiveAndEight: (() => {
      const x = getRegularBitRotation(5);
      const y = getRegularBitRotation(8);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(5), getRegularBitRotation(1)]];
    })(),
    // 6 + N (N = 1-8)
    SumOfSixAndOne: (() => {
      const x = getRegularBitRotation(6);
      const y = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(7)]];
    })(),
    SumOfSixAndTwo: (() => {
      const x = getRegularBitRotation(6);
      const y = getRegularBitRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(8)]];
    })(),
    SumOfSixAndThree: (() => {
      const x = getRegularBitRotation(6);
      const y = getRegularBitRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(1), getRegularBitRotation(1)]];
    })(),
    SumOfSixAndFour: (() => {
      const x = getRegularBitRotation(6);
      const y = getRegularBitRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(2), getRegularBitRotation(1)]];
    })(),
    SumOfSixAndFive: (() => {
      const x = getRegularBitRotation(6);
      const y = getRegularBitRotation(5);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(3), getRegularBitRotation(1)]];
    })(),
    SumOfSixAndSix: (() => {
      const x = getRegularBitRotation(6);
      const y = getRegularBitRotation(6);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(4), getRegularBitRotation(1)]];
    })(),
    SumOfSixAndSeven: (() => {
      const x = getRegularBitRotation(6);
      const y = getRegularBitRotation(7);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(5), getRegularBitRotation(1)]];
    })(),
    SumOfSixAndEight: (() => {
      const x = getRegularBitRotation(6);
      const y = getRegularBitRotation(8);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(6), getRegularBitRotation(1)]];
    })(),
    // 7 + N (N = 1-8)
    SumOfSevenAndOne: (() => {
      const x = getRegularBitRotation(7);
      const y = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(8)]];
    })(),
    SumOfSevenAndTwo: (() => {
      const x = getRegularBitRotation(7);
      const y = getRegularBitRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(1), getRegularBitRotation(1)]];
    })(),
    SumOfSevenAndThree: (() => {
      const x = getRegularBitRotation(7);
      const y = getRegularBitRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(2), getRegularBitRotation(1)]];
    })(),
    SumOfSevenAndFour: (() => {
      const x = getRegularBitRotation(7);
      const y = getRegularBitRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(3), getRegularBitRotation(1)]];
    })(),
    SumOfSevenAndFive: (() => {
      const x = getRegularBitRotation(7);
      const y = getRegularBitRotation(5);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(4), getRegularBitRotation(1)]];
    })(),
    SumOfSevenAndSix: (() => {
      const x = getRegularBitRotation(7);
      const y = getRegularBitRotation(6);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(5), getRegularBitRotation(1)]];
    })(),
    SumOfSevenAndSeven: (() => {
      const x = getRegularBitRotation(7);
      const y = getRegularBitRotation(7);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(6), getRegularBitRotation(1)]];
    })(),
    SumOfSevenAndEight: (() => {
      const x = getRegularBitRotation(7);
      const y = getRegularBitRotation(8);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(7), getRegularBitRotation(1)]];
    })(),
    // 8 + N (N = 1-8)
    SumOfEightAndOne: (() => {
      const x = getRegularBitRotation(8);
      const y = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(1), getRegularBitRotation(1)]];
    })(),
    SumOfEightAndTwo: (() => {
      const x = getRegularBitRotation(8);
      const y = getRegularBitRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(2), getRegularBitRotation(1)]];
    })(),
    SumOfEightAndThree: (() => {
      const x = getRegularBitRotation(8);
      const y = getRegularBitRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(3), getRegularBitRotation(1)]];
    })(),
    SumOfEightAndFour: (() => {
      const x = getRegularBitRotation(8);
      const y = getRegularBitRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(4), getRegularBitRotation(1)]];
    })(),
    SumOfEightAndFive: (() => {
      const x = getRegularBitRotation(8);
      const y = getRegularBitRotation(5);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(5), getRegularBitRotation(1)]];
    })(),
    SumOfEightAndSix: (() => {
      const x = getRegularBitRotation(8);
      const y = getRegularBitRotation(6);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(6), getRegularBitRotation(1)]];
    })(),
    SumOfEightAndSeven: (() => {
      const x = getRegularBitRotation(8);
      const y = getRegularBitRotation(7);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(7), getRegularBitRotation(1)]];
    })(),
    SumOfEightAndEight: (() => {
      const x = getRegularBitRotation(8);
      const y = getRegularBitRotation(8);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(8), getRegularBitRotation(1)]];
    })()
  };

  // src/concepts/round8/model/series/shiftedSum.cases.ts
  var ShiftedSumSeries = {
    // EXTERNAL CARRY OPERAND A CASES: [0,0,0] arriving from column 1
    // [0,0,0] = External carry from column 1 (position 7 in 7-position system)
    // Represents carry propagating leftward into Column 0 shifted manifold
    // System has 6 counting positions (Display 1-6) + marquee [0,0,1] + placeholder [0,0,0]
    // Maximum value: 7,88,88,88,88,88,88,88,88,88,88 (position 7 at column 0, position 8 at columns 1-20)
    // Display 1 [0,1,0] + N
    ShiftedSumOfOneAndOne: (() => {
      const x = getShiftedBitRotation(1);
      const y = getShiftedBitRotation(1);
      const result = getShiftedRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedSumOfOneAndTwo: (() => {
      const x = getShiftedBitRotation(1);
      const y = getShiftedBitRotation(2);
      const result = getShiftedRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedSumOfOneAndThree: (() => {
      const x = getShiftedBitRotation(1);
      const y = getShiftedBitRotation(3);
      const result = getShiftedRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedSumOfOneAndFour: (() => {
      const x = getShiftedBitRotation(1);
      const y = getShiftedBitRotation(4);
      const result = getShiftedRotation(5);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedSumOfOneAndFive: (() => {
      const x = getShiftedBitRotation(1);
      const y = getShiftedBitRotation(5);
      const result = getShiftedRotation(6);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedSumOfOneAndSix: (() => {
      const x = getShiftedBitRotation(1);
      const y = getShiftedBitRotation(6);
      const result = getShiftedRotation(7);
      const carry = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
    })(),
    ShiftedSumOfOneAndSeven: (() => {
      const x = getShiftedBitRotation(1);
      const y = getShiftedBitRotation(7);
      const result = getShiftedRotation(7);
      const carry = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
    })(),
    ShiftedSumOfOneAndMarqueeAsCarry: (() => {
      const x = getShiftedBitRotation(1);
      const y = getShiftedBitRotation(8);
      const result = getShiftedRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedSumOfTwoAndOne: (() => {
      const x = getShiftedBitRotation(2);
      const y = getShiftedBitRotation(1);
      const result = getShiftedRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedSumOfTwoAndTwo: (() => {
      const x = getShiftedBitRotation(2);
      const y = getShiftedBitRotation(2);
      const result = getShiftedRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedSumOfTwoAndThree: (() => {
      const x = getShiftedBitRotation(2);
      const y = getShiftedBitRotation(3);
      const result = getShiftedRotation(5);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedSumOfTwoAndFour: (() => {
      const x = getShiftedBitRotation(2);
      const y = getShiftedBitRotation(4);
      const result = getShiftedRotation(6);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedSumOfTwoAndFive: (() => {
      const x = getShiftedBitRotation(2);
      const y = getShiftedBitRotation(5);
      const result = getShiftedRotation(7);
      const carry = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
    })(),
    ShiftedSumOfTwoAndSix: (() => {
      const x = getShiftedBitRotation(2);
      const y = getShiftedBitRotation(6);
      const result = getShiftedRotation(7);
      const carry = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
    })(),
    ShiftedSumOfTwoAndSeven: (() => {
      const x = getShiftedBitRotation(2);
      const y = getShiftedBitRotation(7);
      const result = getShiftedRotation(7);
      const carry = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
    })(),
    ShiftedSumOfTwoAndMarqueeAsCarry: (() => {
      const x = getShiftedBitRotation(2);
      const y = getShiftedBitRotation(8);
      const result = getShiftedRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedSumOfThreeAndOne: (() => {
      const x = getShiftedBitRotation(3);
      const y = getShiftedBitRotation(1);
      const result = getShiftedRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedSumOfThreeAndTwo: (() => {
      const x = getShiftedBitRotation(3);
      const y = getShiftedBitRotation(2);
      const result = getShiftedRotation(5);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedSumOfThreeAndThree: (() => {
      const x = getShiftedBitRotation(3);
      const y = getShiftedBitRotation(3);
      const result = getShiftedRotation(6);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedSumOfThreeAndFour: (() => {
      const x = getShiftedBitRotation(3);
      const y = getShiftedBitRotation(4);
      const result = getShiftedRotation(7);
      const carry = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
    })(),
    ShiftedSumOfThreeAndFive: (() => {
      const x = getShiftedBitRotation(3);
      const y = getShiftedBitRotation(5);
      const result = getShiftedRotation(7);
      const carry = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
    })(),
    ShiftedSumOfThreeAndSix: (() => {
      const x = getShiftedBitRotation(3);
      const y = getShiftedBitRotation(6);
      const result = getShiftedRotation(7);
      const carry = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
    })(),
    ShiftedSumOfThreeAndSeven: (() => {
      const x = getShiftedBitRotation(3);
      const y = getShiftedBitRotation(7);
      const result = getShiftedRotation(7);
      const carry = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
    })(),
    ShiftedSumOfThreeAndMarqueeAsCarry: (() => {
      const x = getShiftedBitRotation(3);
      const y = getShiftedBitRotation(8);
      const result = getShiftedRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedSumOfFourAndOne: (() => {
      const x = getShiftedBitRotation(4);
      const y = getShiftedBitRotation(1);
      const result = getShiftedRotation(5);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedSumOfFourAndTwo: (() => {
      const x = getShiftedBitRotation(4);
      const y = getShiftedBitRotation(2);
      const result = getShiftedRotation(6);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedSumOfFourAndThree: (() => {
      const x = getShiftedBitRotation(4);
      const y = getShiftedBitRotation(3);
      const result = getShiftedRotation(7);
      const carry = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
    })(),
    ShiftedSumOfFourAndFour: (() => {
      const x = getShiftedBitRotation(4);
      const y = getShiftedBitRotation(4);
      const result = getShiftedRotation(7);
      const carry = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
    })(),
    ShiftedSumOfFourAndFive: (() => {
      const x = getShiftedBitRotation(4);
      const y = getShiftedBitRotation(5);
      const result = getShiftedRotation(7);
      const carry = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
    })(),
    ShiftedSumOfFourAndSix: (() => {
      const x = getShiftedBitRotation(4);
      const y = getShiftedBitRotation(6);
      const result = getShiftedRotation(7);
      const carry = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
    })(),
    ShiftedSumOfFourAndSeven: (() => {
      const x = getShiftedBitRotation(4);
      const y = getShiftedBitRotation(7);
      const result = getShiftedRotation(7);
      const carry = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
    })(),
    ShiftedSumOfFiveAndOne: (() => {
      const x = getShiftedBitRotation(5);
      const y = getShiftedBitRotation(1);
      const result = getShiftedRotation(6);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedSumOfFiveAndTwo: (() => {
      const x = getShiftedBitRotation(5);
      const y = getShiftedBitRotation(2);
      const result = getShiftedRotation(7);
      const carry = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
    })(),
    ShiftedSumOfFiveAndThree: (() => {
      const x = getShiftedBitRotation(5);
      const y = getShiftedBitRotation(3);
      const result = getShiftedRotation(7);
      const carry = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
    })(),
    ShiftedSumOfFiveAndFour: (() => {
      const x = getShiftedBitRotation(5);
      const y = getShiftedBitRotation(4);
      const result = getShiftedRotation(7);
      const carry = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
    })(),
    ShiftedSumOfFiveAndFive: (() => {
      const x = getShiftedBitRotation(5);
      const y = getShiftedBitRotation(5);
      const result = getShiftedRotation(7);
      const carry = getShiftedRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
    })(),
    ShiftedSumOfFiveAndSix: (() => {
      const x = getShiftedBitRotation(5);
      const y = getShiftedBitRotation(6);
      const result = getShiftedRotation(7);
      const carry = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
    })(),
    ShiftedSumOfFiveAndSeven: (() => {
      const x = getShiftedBitRotation(5);
      const y = getShiftedBitRotation(7);
      const result = getShiftedRotation(7);
      const carry = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
    })(),
    ShiftedSumOfFourAndMarqueeAsCarry: (() => {
      const x = getShiftedBitRotation(4);
      const y = getShiftedBitRotation(8);
      const result = getShiftedRotation(5);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    // Display 6 [1,1,1] + N (maximum position before wrap)
    ShiftedSumOfSixAndOne: (() => {
      const x = getShiftedBitRotation(6);
      const y = getShiftedBitRotation(1);
      const result = getShiftedRotation(7);
      const carry = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
    })(),
    ShiftedSumOfSixAndTwo: (() => {
      const x = getShiftedBitRotation(6);
      const y = getShiftedBitRotation(2);
      const result = getShiftedRotation(7);
      const carry = getShiftedRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
    })(),
    ShiftedSumOfSixAndThree: (() => {
      const x = getShiftedBitRotation(6);
      const y = getShiftedBitRotation(3);
      const result = getShiftedRotation(7);
      const carry = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
    })(),
    ShiftedSumOfSixAndFour: (() => {
      const x = getShiftedBitRotation(6);
      const y = getShiftedBitRotation(4);
      const result = getShiftedRotation(7);
      const carry = getShiftedRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
    })(),
    ShiftedSumOfSixAndFive: (() => {
      const x = getShiftedBitRotation(6);
      const y = getShiftedBitRotation(5);
      const result = getShiftedRotation(7);
      const carry = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
    })(),
    ShiftedSumOfSixAndSix: (() => {
      const x = getShiftedBitRotation(6);
      const y = getShiftedBitRotation(6);
      const result = getShiftedRotation(7);
      const carry = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
    })(),
    ShiftedSumOfSixAndSeven: (() => {
      const x = getShiftedBitRotation(6);
      const y = getShiftedBitRotation(7);
      const result = getShiftedRotation(7);
      const carry = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
    })(),
    ShiftedSumOfSixAndMarqueeAsCarry: (() => {
      const x = getShiftedBitRotation(6);
      const y = getShiftedBitRotation(8);
      const result = getShiftedRotation(7);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedSumOfSevenAndOne: (() => {
      const x = getShiftedBitRotation(7);
      const y = getShiftedBitRotation(1);
      const result = getShiftedRotation(7);
      const carry = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
    })(),
    ShiftedSumOfSevenAndTwo: (() => {
      const x = getShiftedBitRotation(7);
      const y = getShiftedBitRotation(2);
      const result = getShiftedRotation(7);
      const carry = getShiftedRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
    })(),
    ShiftedSumOfSevenAndThree: (() => {
      const x = getShiftedBitRotation(7);
      const y = getShiftedBitRotation(3);
      const result = getShiftedRotation(7);
      const carry = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
    })(),
    ShiftedSumOfSevenAndFour: (() => {
      const x = getShiftedBitRotation(7);
      const y = getShiftedBitRotation(4);
      const result = getShiftedRotation(7);
      const carry = getShiftedRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
    })(),
    ShiftedSumOfSevenAndFive: (() => {
      const x = getShiftedBitRotation(7);
      const y = getShiftedBitRotation(5);
      const result = getShiftedRotation(7);
      const carry = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
    })(),
    ShiftedSumOfSevenAndSix: (() => {
      const x = getShiftedBitRotation(7);
      const y = getShiftedBitRotation(6);
      const result = getShiftedRotation(7);
      const carry = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
    })(),
    ShiftedSumOfSevenAndSeven: (() => {
      const x = getShiftedBitRotation(7);
      const y = getShiftedBitRotation(7);
      const result = getShiftedRotation(7);
      const carry = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
    })(),
    ShiftedSumOfSevenAndMarqueeAsCarry: (() => {
      const x = getShiftedBitRotation(7);
      const y = getShiftedBitRotation(8);
      const result = getShiftedRotation(7);
      const carry = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
    })(),
    ShiftedSumOfMarqueeAsCarryAndOne: (() => {
      const x = getShiftedBitRotation(8);
      const y = getShiftedBitRotation(1);
      const result = getShiftedRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedSumOfMarqueeAsCarryAndTwo: (() => {
      const x = getShiftedBitRotation(8);
      const y = getShiftedBitRotation(2);
      const result = getShiftedRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedSumOfMarqueeAsCarryAndThree: (() => {
      const x = getShiftedBitRotation(8);
      const y = getShiftedBitRotation(3);
      const result = getShiftedRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedSumOfMarqueeAsCarryAndFour: (() => {
      const x = getShiftedBitRotation(8);
      const y = getShiftedBitRotation(4);
      const result = getShiftedRotation(5);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedSumOfMarqueeAsCarryAndFive: (() => {
      const x = getShiftedBitRotation(8);
      const y = getShiftedBitRotation(5);
      const result = getShiftedRotation(6);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedSumOfMarqueeAsCarryAndSix: (() => {
      const x = getShiftedBitRotation(8);
      const y = getShiftedBitRotation(6);
      const result = getShiftedRotation(7);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedSumOfMarqueeAsCarryAndSeven: (() => {
      const x = getShiftedBitRotation(8);
      const y = getShiftedBitRotation(7);
      const result = getShiftedRotation(7);
      const carry = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
    })()
  };

  // src/concepts/round8/model/series/difference.cases.ts
  var DifferenceSeries = {
    // Display 1 - N (N = 1-8)
    DifferenceOfOneAndOne: (() => {
      const x = getRegularBitRotation(1);
      const y = getRegularBitRotation(1);
      const result = getRegularRotation(8);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    DifferenceOfOneAndTwo: (() => {
      const x = getRegularBitRotation(1);
      const y = getRegularBitRotation(2);
      const result = getRegularRotation(7);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    DifferenceOfOneAndThree: (() => {
      const x = getRegularBitRotation(1);
      const y = getRegularBitRotation(3);
      const result = getRegularRotation(6);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    DifferenceOfOneAndFour: (() => {
      const x = getRegularBitRotation(1);
      const y = getRegularBitRotation(4);
      const result = getRegularRotation(5);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    DifferenceOfOneAndFive: (() => {
      const x = getRegularBitRotation(1);
      const y = getRegularBitRotation(5);
      const result = getRegularRotation(4);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    DifferenceOfOneAndSix: (() => {
      const x = getRegularBitRotation(1);
      const y = getRegularBitRotation(6);
      const result = getRegularRotation(3);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    DifferenceOfOneAndSeven: (() => {
      const x = getRegularBitRotation(1);
      const y = getRegularBitRotation(7);
      const result = getRegularRotation(2);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    DifferenceOfOneAndEight: (() => {
      const x = getRegularBitRotation(1);
      const y = getRegularBitRotation(8);
      const result = getRegularRotation(1);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    // Display 2 - N (N = 1-8)
    DifferenceOfTwoAndOne: (() => {
      const x = getRegularBitRotation(2);
      const y = getRegularBitRotation(1);
      const result = getRegularRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    DifferenceOfTwoAndTwo: (() => {
      const x = getRegularBitRotation(2);
      const y = getRegularBitRotation(2);
      const result = getRegularRotation(8);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    DifferenceOfTwoAndThree: (() => {
      const x = getRegularBitRotation(2);
      const y = getRegularBitRotation(3);
      const result = getRegularRotation(7);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    DifferenceOfTwoAndFour: (() => {
      const x = getRegularBitRotation(2);
      const y = getRegularBitRotation(4);
      const result = getRegularRotation(6);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    DifferenceOfTwoAndFive: (() => {
      const x = getRegularBitRotation(2);
      const y = getRegularBitRotation(5);
      const result = getRegularRotation(5);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    DifferenceOfTwoAndSix: (() => {
      const x = getRegularBitRotation(2);
      const y = getRegularBitRotation(6);
      const result = getRegularRotation(4);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    DifferenceOfTwoAndSeven: (() => {
      const x = getRegularBitRotation(2);
      const y = getRegularBitRotation(7);
      const result = getRegularRotation(3);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    DifferenceOfTwoAndEight: (() => {
      const x = getRegularBitRotation(2);
      const y = getRegularBitRotation(8);
      const result = getRegularRotation(2);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    // Display 3 - N (N = 1-8)
    DifferenceOfThreeAndOne: (() => {
      const x = getRegularBitRotation(3);
      const y = getRegularBitRotation(1);
      const result = getRegularRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    DifferenceOfThreeAndTwo: (() => {
      const x = getRegularBitRotation(3);
      const y = getRegularBitRotation(2);
      const result = getRegularRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    DifferenceOfThreeAndThree: (() => {
      const x = getRegularBitRotation(3);
      const y = getRegularBitRotation(3);
      const result = getRegularRotation(8);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    DifferenceOfThreeAndFour: (() => {
      const x = getRegularBitRotation(3);
      const y = getRegularBitRotation(4);
      const result = getRegularRotation(7);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    DifferenceOfThreeAndFive: (() => {
      const x = getRegularBitRotation(3);
      const y = getRegularBitRotation(5);
      const result = getRegularRotation(6);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    DifferenceOfThreeAndSix: (() => {
      const x = getRegularBitRotation(3);
      const y = getRegularBitRotation(6);
      const result = getRegularRotation(5);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    DifferenceOfThreeAndSeven: (() => {
      const x = getRegularBitRotation(3);
      const y = getRegularBitRotation(7);
      const result = getRegularRotation(4);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    DifferenceOfThreeAndEight: (() => {
      const x = getRegularBitRotation(3);
      const y = getRegularBitRotation(8);
      const result = getRegularRotation(3);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    // Display 4 - N (N = 1-8)
    DifferenceOfFourAndOne: (() => {
      const x = getRegularBitRotation(4);
      const y = getRegularBitRotation(1);
      const result = getRegularRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    DifferenceOfFourAndTwo: (() => {
      const x = getRegularBitRotation(4);
      const y = getRegularBitRotation(2);
      const result = getRegularRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    DifferenceOfFourAndThree: (() => {
      const x = getRegularBitRotation(4);
      const y = getRegularBitRotation(3);
      const result = getRegularRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    DifferenceOfFourAndFour: (() => {
      const x = getRegularBitRotation(4);
      const y = getRegularBitRotation(4);
      const result = getRegularRotation(8);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    DifferenceOfFourAndFive: (() => {
      const x = getRegularBitRotation(4);
      const y = getRegularBitRotation(5);
      const result = getRegularRotation(7);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    DifferenceOfFourAndSix: (() => {
      const x = getRegularBitRotation(4);
      const y = getRegularBitRotation(6);
      const result = getRegularRotation(6);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    DifferenceOfFourAndSeven: (() => {
      const x = getRegularBitRotation(4);
      const y = getRegularBitRotation(7);
      const result = getRegularRotation(5);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    DifferenceOfFourAndEight: (() => {
      const x = getRegularBitRotation(4);
      const y = getRegularBitRotation(8);
      const result = getRegularRotation(4);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    // Display 5 - N (N = 1-8)
    DifferenceOfFiveAndOne: (() => {
      const x = getRegularBitRotation(5);
      const y = getRegularBitRotation(1);
      const result = getRegularRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    DifferenceOfFiveAndTwo: (() => {
      const x = getRegularBitRotation(5);
      const y = getRegularBitRotation(2);
      const result = getRegularRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    DifferenceOfFiveAndThree: (() => {
      const x = getRegularBitRotation(5);
      const y = getRegularBitRotation(3);
      const result = getRegularRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    DifferenceOfFiveAndFour: (() => {
      const x = getRegularBitRotation(5);
      const y = getRegularBitRotation(4);
      const result = getRegularRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    DifferenceOfFiveAndFive: (() => {
      const x = getRegularBitRotation(5);
      const y = getRegularBitRotation(5);
      const result = getRegularRotation(8);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    DifferenceOfFiveAndSix: (() => {
      const x = getRegularBitRotation(5);
      const y = getRegularBitRotation(6);
      const result = getRegularRotation(7);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    DifferenceOfFiveAndSeven: (() => {
      const x = getRegularBitRotation(5);
      const y = getRegularBitRotation(7);
      const result = getRegularRotation(6);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    DifferenceOfFiveAndEight: (() => {
      const x = getRegularBitRotation(5);
      const y = getRegularBitRotation(8);
      const result = getRegularRotation(5);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    // Display 6 - N (N = 1-8)
    DifferenceOfSixAndOne: (() => {
      const x = getRegularBitRotation(6);
      const y = getRegularBitRotation(1);
      const result = getRegularRotation(5);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    DifferenceOfSixAndTwo: (() => {
      const x = getRegularBitRotation(6);
      const y = getRegularBitRotation(2);
      const result = getRegularRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    DifferenceOfSixAndThree: (() => {
      const x = getRegularBitRotation(6);
      const y = getRegularBitRotation(3);
      const result = getRegularRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    DifferenceOfSixAndFour: (() => {
      const x = getRegularBitRotation(6);
      const y = getRegularBitRotation(4);
      const result = getRegularRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    DifferenceOfSixAndFive: (() => {
      const x = getRegularBitRotation(6);
      const y = getRegularBitRotation(5);
      const result = getRegularRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    DifferenceOfSixAndSix: (() => {
      const x = getRegularBitRotation(6);
      const y = getRegularBitRotation(6);
      const result = getRegularRotation(8);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    DifferenceOfSixAndSeven: (() => {
      const x = getRegularBitRotation(6);
      const y = getRegularBitRotation(7);
      const result = getRegularRotation(7);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    DifferenceOfSixAndEight: (() => {
      const x = getRegularBitRotation(6);
      const y = getRegularBitRotation(8);
      const result = getRegularRotation(6);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    // Display 7 - N (N = 1-8)
    DifferenceOfSevenAndOne: (() => {
      const x = getRegularBitRotation(7);
      const y = getRegularBitRotation(1);
      const result = getRegularRotation(6);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    DifferenceOfSevenAndTwo: (() => {
      const x = getRegularBitRotation(7);
      const y = getRegularBitRotation(2);
      const result = getRegularRotation(5);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    DifferenceOfSevenAndThree: (() => {
      const x = getRegularBitRotation(7);
      const y = getRegularBitRotation(3);
      const result = getRegularRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    DifferenceOfSevenAndFour: (() => {
      const x = getRegularBitRotation(7);
      const y = getRegularBitRotation(4);
      const result = getRegularRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    DifferenceOfSevenAndFive: (() => {
      const x = getRegularBitRotation(7);
      const y = getRegularBitRotation(5);
      const result = getRegularRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    DifferenceOfSevenAndSix: (() => {
      const x = getRegularBitRotation(7);
      const y = getRegularBitRotation(6);
      const result = getRegularRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    DifferenceOfSevenAndSeven: (() => {
      const x = getRegularBitRotation(7);
      const y = getRegularBitRotation(7);
      const result = getRegularRotation(8);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    DifferenceOfSevenAndEight: (() => {
      const x = getRegularBitRotation(7);
      const y = getRegularBitRotation(8);
      const result = getRegularRotation(7);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    // Display 8 - N (N = 1-8)
    DifferenceOfEightAndOne: (() => {
      const x = getRegularBitRotation(8);
      const y = getRegularBitRotation(1);
      const result = getRegularRotation(7);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    DifferenceOfEightAndTwo: (() => {
      const x = getRegularBitRotation(8);
      const y = getRegularBitRotation(2);
      const result = getRegularRotation(6);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    DifferenceOfEightAndThree: (() => {
      const x = getRegularBitRotation(8);
      const y = getRegularBitRotation(3);
      const result = getRegularRotation(5);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    DifferenceOfEightAndFour: (() => {
      const x = getRegularBitRotation(8);
      const y = getRegularBitRotation(4);
      const result = getRegularRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    DifferenceOfEightAndFive: (() => {
      const x = getRegularBitRotation(8);
      const y = getRegularBitRotation(5);
      const result = getRegularRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    DifferenceOfEightAndSix: (() => {
      const x = getRegularBitRotation(8);
      const y = getRegularBitRotation(6);
      const result = getRegularRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    DifferenceOfEightAndSeven: (() => {
      const x = getRegularBitRotation(8);
      const y = getRegularBitRotation(7);
      const result = getRegularRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    DifferenceOfEightAndEight: (() => {
      const x = getRegularBitRotation(8);
      const y = getRegularBitRotation(8);
      const result = getRegularRotation(8);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })()
  };

  // src/concepts/round8/model/series/greaterThan.cases.ts
  var GreaterThanSeries = {
    // Display 1 > N (N = 1-8)
    // 1 is smallest, so 1 > X is always False except 1 == 1
    GreaterThanOneAndOne: (() => {
      const x = getRegularBitRotation(1);
      const y = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    GreaterThanOneAndTwo: (() => {
      const x = getRegularBitRotation(1);
      const y = getRegularBitRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    GreaterThanOneAndThree: (() => {
      const x = getRegularBitRotation(1);
      const y = getRegularBitRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    GreaterThanOneAndFour: (() => {
      const x = getRegularBitRotation(1);
      const y = getRegularBitRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    GreaterThanOneAndFive: (() => {
      const x = getRegularBitRotation(1);
      const y = getRegularBitRotation(5);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    GreaterThanOneAndSix: (() => {
      const x = getRegularBitRotation(1);
      const y = getRegularBitRotation(6);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    GreaterThanOneAndSeven: (() => {
      const x = getRegularBitRotation(1);
      const y = getRegularBitRotation(7);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    GreaterThanOneAndEight: (() => {
      const x = getRegularBitRotation(1);
      const y = getRegularBitRotation(8);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    // Display 2 > N (N = 1-8)
    GreaterThanTwoAndOne: (() => {
      const x = getRegularBitRotation(2);
      const y = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    GreaterThanTwoAndTwo: (() => {
      const x = getRegularBitRotation(2);
      const y = getRegularBitRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    GreaterThanTwoAndThree: (() => {
      const x = getRegularBitRotation(2);
      const y = getRegularBitRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    GreaterThanTwoAndFour: (() => {
      const x = getRegularBitRotation(2);
      const y = getRegularBitRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    GreaterThanTwoAndFive: (() => {
      const x = getRegularBitRotation(2);
      const y = getRegularBitRotation(5);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    GreaterThanTwoAndSix: (() => {
      const x = getRegularBitRotation(2);
      const y = getRegularBitRotation(6);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    GreaterThanTwoAndSeven: (() => {
      const x = getRegularBitRotation(2);
      const y = getRegularBitRotation(7);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    GreaterThanTwoAndEight: (() => {
      const x = getRegularBitRotation(2);
      const y = getRegularBitRotation(8);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    // Display 3 > N (N = 1-8)
    GreaterThanThreeAndOne: (() => {
      const x = getRegularBitRotation(3);
      const y = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    GreaterThanThreeAndTwo: (() => {
      const x = getRegularBitRotation(3);
      const y = getRegularBitRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    GreaterThanThreeAndThree: (() => {
      const x = getRegularBitRotation(3);
      const y = getRegularBitRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    GreaterThanThreeAndFour: (() => {
      const x = getRegularBitRotation(3);
      const y = getRegularBitRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    GreaterThanThreeAndFive: (() => {
      const x = getRegularBitRotation(3);
      const y = getRegularBitRotation(5);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    GreaterThanThreeAndSix: (() => {
      const x = getRegularBitRotation(3);
      const y = getRegularBitRotation(6);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    GreaterThanThreeAndSeven: (() => {
      const x = getRegularBitRotation(3);
      const y = getRegularBitRotation(7);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    GreaterThanThreeAndEight: (() => {
      const x = getRegularBitRotation(3);
      const y = getRegularBitRotation(8);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    // Display 4 > N (N = 1-8)
    GreaterThanFourAndOne: (() => {
      const x = getRegularBitRotation(4);
      const y = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    GreaterThanFourAndTwo: (() => {
      const x = getRegularBitRotation(4);
      const y = getRegularBitRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    GreaterThanFourAndThree: (() => {
      const x = getRegularBitRotation(4);
      const y = getRegularBitRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    GreaterThanFourAndFour: (() => {
      const x = getRegularBitRotation(4);
      const y = getRegularBitRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    GreaterThanFourAndFive: (() => {
      const x = getRegularBitRotation(4);
      const y = getRegularBitRotation(5);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    GreaterThanFourAndSix: (() => {
      const x = getRegularBitRotation(4);
      const y = getRegularBitRotation(6);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    GreaterThanFourAndSeven: (() => {
      const x = getRegularBitRotation(4);
      const y = getRegularBitRotation(7);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    GreaterThanFourAndEight: (() => {
      const x = getRegularBitRotation(4);
      const y = getRegularBitRotation(8);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    // Display 5 > N (N = 1-8)
    GreaterThanFiveAndOne: (() => {
      const x = getRegularBitRotation(5);
      const y = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    GreaterThanFiveAndTwo: (() => {
      const x = getRegularBitRotation(5);
      const y = getRegularBitRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    GreaterThanFiveAndThree: (() => {
      const x = getRegularBitRotation(5);
      const y = getRegularBitRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    GreaterThanFiveAndFour: (() => {
      const x = getRegularBitRotation(5);
      const y = getRegularBitRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    GreaterThanFiveAndFive: (() => {
      const x = getRegularBitRotation(5);
      const y = getRegularBitRotation(5);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    GreaterThanFiveAndSix: (() => {
      const x = getRegularBitRotation(5);
      const y = getRegularBitRotation(6);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    GreaterThanFiveAndSeven: (() => {
      const x = getRegularBitRotation(5);
      const y = getRegularBitRotation(7);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    GreaterThanFiveAndEight: (() => {
      const x = getRegularBitRotation(5);
      const y = getRegularBitRotation(8);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    // Display 6 > N (N = 1-8)
    GreaterThanSixAndOne: (() => {
      const x = getRegularBitRotation(6);
      const y = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    GreaterThanSixAndTwo: (() => {
      const x = getRegularBitRotation(6);
      const y = getRegularBitRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    GreaterThanSixAndThree: (() => {
      const x = getRegularBitRotation(6);
      const y = getRegularBitRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    GreaterThanSixAndFour: (() => {
      const x = getRegularBitRotation(6);
      const y = getRegularBitRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    GreaterThanSixAndFive: (() => {
      const x = getRegularBitRotation(6);
      const y = getRegularBitRotation(5);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    GreaterThanSixAndSix: (() => {
      const x = getRegularBitRotation(6);
      const y = getRegularBitRotation(6);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    GreaterThanSixAndSeven: (() => {
      const x = getRegularBitRotation(6);
      const y = getRegularBitRotation(7);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    GreaterThanSixAndEight: (() => {
      const x = getRegularBitRotation(6);
      const y = getRegularBitRotation(8);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    // Display 7 > N (N = 1-8)
    GreaterThanSevenAndOne: (() => {
      const x = getRegularBitRotation(7);
      const y = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    GreaterThanSevenAndTwo: (() => {
      const x = getRegularBitRotation(7);
      const y = getRegularBitRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    GreaterThanSevenAndThree: (() => {
      const x = getRegularBitRotation(7);
      const y = getRegularBitRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    GreaterThanSevenAndFour: (() => {
      const x = getRegularBitRotation(7);
      const y = getRegularBitRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    GreaterThanSevenAndFive: (() => {
      const x = getRegularBitRotation(7);
      const y = getRegularBitRotation(5);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    GreaterThanSevenAndSix: (() => {
      const x = getRegularBitRotation(7);
      const y = getRegularBitRotation(6);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    GreaterThanSevenAndSeven: (() => {
      const x = getRegularBitRotation(7);
      const y = getRegularBitRotation(7);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    GreaterThanSevenAndEight: (() => {
      const x = getRegularBitRotation(7);
      const y = getRegularBitRotation(8);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    // Display 8 > N (N = 1-8)
    // 8 is largest, so 8 > X is True except when X = 8
    GreaterThanEightAndOne: (() => {
      const x = getRegularBitRotation(8);
      const y = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    GreaterThanEightAndTwo: (() => {
      const x = getRegularBitRotation(8);
      const y = getRegularBitRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    GreaterThanEightAndThree: (() => {
      const x = getRegularBitRotation(8);
      const y = getRegularBitRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    GreaterThanEightAndFour: (() => {
      const x = getRegularBitRotation(8);
      const y = getRegularBitRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    GreaterThanEightAndFive: (() => {
      const x = getRegularBitRotation(8);
      const y = getRegularBitRotation(5);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    GreaterThanEightAndSix: (() => {
      const x = getRegularBitRotation(8);
      const y = getRegularBitRotation(6);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    GreaterThanEightAndSeven: (() => {
      const x = getRegularBitRotation(8);
      const y = getRegularBitRotation(7);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    GreaterThanEightAndEight: (() => {
      const x = getRegularBitRotation(8);
      const y = getRegularBitRotation(8);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })()
  };

  // src/concepts/round8/model/series/lessThan.cases.ts
  var LessThanSeries = {
    // Display 1 < N (N = 1-8)
    // 1 is smallest, so 1 < X is True for X > 1
    LessThanOneAndOne: (() => {
      const x = getRegularBitRotation(1);
      const y = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    LessThanOneAndTwo: (() => {
      const x = getRegularBitRotation(1);
      const y = getRegularBitRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    LessThanOneAndThree: (() => {
      const x = getRegularBitRotation(1);
      const y = getRegularBitRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    LessThanOneAndFour: (() => {
      const x = getRegularBitRotation(1);
      const y = getRegularBitRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    LessThanOneAndFive: (() => {
      const x = getRegularBitRotation(1);
      const y = getRegularBitRotation(5);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    LessThanOneAndSix: (() => {
      const x = getRegularBitRotation(1);
      const y = getRegularBitRotation(6);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    LessThanOneAndSeven: (() => {
      const x = getRegularBitRotation(1);
      const y = getRegularBitRotation(7);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    LessThanOneAndEight: (() => {
      const x = getRegularBitRotation(1);
      const y = getRegularBitRotation(8);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    // Display 2 < N (N = 1-8)
    LessThanTwoAndOne: (() => {
      const x = getRegularBitRotation(2);
      const y = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    LessThanTwoAndTwo: (() => {
      const x = getRegularBitRotation(2);
      const y = getRegularBitRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    LessThanTwoAndThree: (() => {
      const x = getRegularBitRotation(2);
      const y = getRegularBitRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    LessThanTwoAndFour: (() => {
      const x = getRegularBitRotation(2);
      const y = getRegularBitRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    LessThanTwoAndFive: (() => {
      const x = getRegularBitRotation(2);
      const y = getRegularBitRotation(5);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    LessThanTwoAndSix: (() => {
      const x = getRegularBitRotation(2);
      const y = getRegularBitRotation(6);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    LessThanTwoAndSeven: (() => {
      const x = getRegularBitRotation(2);
      const y = getRegularBitRotation(7);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    LessThanTwoAndEight: (() => {
      const x = getRegularBitRotation(2);
      const y = getRegularBitRotation(8);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    // Display 3 < N (N = 1-8)
    LessThanThreeAndOne: (() => {
      const x = getRegularBitRotation(3);
      const y = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    LessThanThreeAndTwo: (() => {
      const x = getRegularBitRotation(3);
      const y = getRegularBitRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    LessThanThreeAndThree: (() => {
      const x = getRegularBitRotation(3);
      const y = getRegularBitRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    LessThanThreeAndFour: (() => {
      const x = getRegularBitRotation(3);
      const y = getRegularBitRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    LessThanThreeAndFive: (() => {
      const x = getRegularBitRotation(3);
      const y = getRegularBitRotation(5);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    LessThanThreeAndSix: (() => {
      const x = getRegularBitRotation(3);
      const y = getRegularBitRotation(6);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    LessThanThreeAndSeven: (() => {
      const x = getRegularBitRotation(3);
      const y = getRegularBitRotation(7);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    LessThanThreeAndEight: (() => {
      const x = getRegularBitRotation(3);
      const y = getRegularBitRotation(8);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    // Display 4 < N (N = 1-8)
    LessThanFourAndOne: (() => {
      const x = getRegularBitRotation(4);
      const y = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    LessThanFourAndTwo: (() => {
      const x = getRegularBitRotation(4);
      const y = getRegularBitRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    LessThanFourAndThree: (() => {
      const x = getRegularBitRotation(4);
      const y = getRegularBitRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    LessThanFourAndFour: (() => {
      const x = getRegularBitRotation(4);
      const y = getRegularBitRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    LessThanFourAndFive: (() => {
      const x = getRegularBitRotation(4);
      const y = getRegularBitRotation(5);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    LessThanFourAndSix: (() => {
      const x = getRegularBitRotation(4);
      const y = getRegularBitRotation(6);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    LessThanFourAndSeven: (() => {
      const x = getRegularBitRotation(4);
      const y = getRegularBitRotation(7);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    LessThanFourAndEight: (() => {
      const x = getRegularBitRotation(4);
      const y = getRegularBitRotation(8);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    // Display 5 < N (N = 1-8)
    LessThanFiveAndOne: (() => {
      const x = getRegularBitRotation(5);
      const y = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    LessThanFiveAndTwo: (() => {
      const x = getRegularBitRotation(5);
      const y = getRegularBitRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    LessThanFiveAndThree: (() => {
      const x = getRegularBitRotation(5);
      const y = getRegularBitRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    LessThanFiveAndFour: (() => {
      const x = getRegularBitRotation(5);
      const y = getRegularBitRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    LessThanFiveAndFive: (() => {
      const x = getRegularBitRotation(5);
      const y = getRegularBitRotation(5);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    LessThanFiveAndSix: (() => {
      const x = getRegularBitRotation(5);
      const y = getRegularBitRotation(6);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    LessThanFiveAndSeven: (() => {
      const x = getRegularBitRotation(5);
      const y = getRegularBitRotation(7);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    LessThanFiveAndEight: (() => {
      const x = getRegularBitRotation(5);
      const y = getRegularBitRotation(8);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    // Display 6 < N (N = 1-8)
    LessThanSixAndOne: (() => {
      const x = getRegularBitRotation(6);
      const y = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    LessThanSixAndTwo: (() => {
      const x = getRegularBitRotation(6);
      const y = getRegularBitRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    LessThanSixAndThree: (() => {
      const x = getRegularBitRotation(6);
      const y = getRegularBitRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    LessThanSixAndFour: (() => {
      const x = getRegularBitRotation(6);
      const y = getRegularBitRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    LessThanSixAndFive: (() => {
      const x = getRegularBitRotation(6);
      const y = getRegularBitRotation(5);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    LessThanSixAndSix: (() => {
      const x = getRegularBitRotation(6);
      const y = getRegularBitRotation(6);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    LessThanSixAndSeven: (() => {
      const x = getRegularBitRotation(6);
      const y = getRegularBitRotation(7);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    LessThanSixAndEight: (() => {
      const x = getRegularBitRotation(6);
      const y = getRegularBitRotation(8);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    // Display 7 < N (N = 1-8)
    LessThanSevenAndOne: (() => {
      const x = getRegularBitRotation(7);
      const y = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    LessThanSevenAndTwo: (() => {
      const x = getRegularBitRotation(7);
      const y = getRegularBitRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    LessThanSevenAndThree: (() => {
      const x = getRegularBitRotation(7);
      const y = getRegularBitRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    LessThanSevenAndFour: (() => {
      const x = getRegularBitRotation(7);
      const y = getRegularBitRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    LessThanSevenAndFive: (() => {
      const x = getRegularBitRotation(7);
      const y = getRegularBitRotation(5);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    LessThanSevenAndSix: (() => {
      const x = getRegularBitRotation(7);
      const y = getRegularBitRotation(6);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    LessThanSevenAndSeven: (() => {
      const x = getRegularBitRotation(7);
      const y = getRegularBitRotation(7);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    LessThanSevenAndEight: (() => {
      const x = getRegularBitRotation(7);
      const y = getRegularBitRotation(8);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    // Display 8 < N (N = 1-8)
    // 8 is largest, so 8 < X is always False
    LessThanEightAndOne: (() => {
      const x = getRegularBitRotation(8);
      const y = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    LessThanEightAndTwo: (() => {
      const x = getRegularBitRotation(8);
      const y = getRegularBitRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    LessThanEightAndThree: (() => {
      const x = getRegularBitRotation(8);
      const y = getRegularBitRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    LessThanEightAndFour: (() => {
      const x = getRegularBitRotation(8);
      const y = getRegularBitRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    LessThanEightAndFive: (() => {
      const x = getRegularBitRotation(8);
      const y = getRegularBitRotation(5);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    LessThanEightAndSix: (() => {
      const x = getRegularBitRotation(8);
      const y = getRegularBitRotation(6);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    LessThanEightAndSeven: (() => {
      const x = getRegularBitRotation(8);
      const y = getRegularBitRotation(7);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    LessThanEightAndEight: (() => {
      const x = getRegularBitRotation(8);
      const y = getRegularBitRotation(8);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })()
  };

  // src/concepts/round8/model/series/shiftedGreaterThan.cases.ts
  var ShiftedGreaterThanSeries = {
    // Display 0 [0,0,1] > N (N = 0-7)
    // Display 0 is MINIMUM (Marquee), so 0 > X is always False
    ShiftedGreaterThanZeroAndZero: (() => {
      const x = getShiftedBitRotation(8);
      const y = getShiftedBitRotation(8);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    ShiftedGreaterThanZeroAndOne: (() => {
      const x = getShiftedBitRotation(8);
      const y = getShiftedBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    ShiftedGreaterThanZeroAndTwo: (() => {
      const x = getShiftedBitRotation(8);
      const y = getShiftedBitRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    ShiftedGreaterThanZeroAndThree: (() => {
      const x = getShiftedBitRotation(8);
      const y = getShiftedBitRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    ShiftedGreaterThanZeroAndFour: (() => {
      const x = getShiftedBitRotation(8);
      const y = getShiftedBitRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    ShiftedGreaterThanZeroAndFive: (() => {
      const x = getShiftedBitRotation(8);
      const y = getShiftedBitRotation(5);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    ShiftedGreaterThanZeroAndSix: (() => {
      const x = getShiftedBitRotation(8);
      const y = getShiftedBitRotation(6);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    ShiftedGreaterThanZeroAndSeven: (() => {
      const x = getShiftedBitRotation(8);
      const y = getShiftedBitRotation(7);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    // Display 1 [0,1,0] > N (N = 0-7)
    ShiftedGreaterThanOneAndZero: (() => {
      const x = getShiftedBitRotation(1);
      const y = getShiftedBitRotation(8);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    ShiftedGreaterThanOneAndOne: (() => {
      const x = getShiftedBitRotation(1);
      const y = getShiftedBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    ShiftedGreaterThanOneAndTwo: (() => {
      const x = getShiftedBitRotation(1);
      const y = getShiftedBitRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    ShiftedGreaterThanOneAndThree: (() => {
      const x = getShiftedBitRotation(1);
      const y = getShiftedBitRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    ShiftedGreaterThanOneAndFour: (() => {
      const x = getShiftedBitRotation(1);
      const y = getShiftedBitRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    ShiftedGreaterThanOneAndFive: (() => {
      const x = getShiftedBitRotation(1);
      const y = getShiftedBitRotation(5);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    ShiftedGreaterThanOneAndSix: (() => {
      const x = getShiftedBitRotation(1);
      const y = getShiftedBitRotation(6);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    ShiftedGreaterThanOneAndSeven: (() => {
      const x = getShiftedBitRotation(1);
      const y = getShiftedBitRotation(7);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    // Display 2 [0,1,1] > N (N = 0-7)
    ShiftedGreaterThanTwoAndZero: (() => {
      const x = getShiftedBitRotation(2);
      const y = getShiftedBitRotation(8);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    ShiftedGreaterThanTwoAndOne: (() => {
      const x = getShiftedBitRotation(2);
      const y = getShiftedBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    ShiftedGreaterThanTwoAndTwo: (() => {
      const x = getShiftedBitRotation(2);
      const y = getShiftedBitRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    ShiftedGreaterThanTwoAndThree: (() => {
      const x = getShiftedBitRotation(2);
      const y = getShiftedBitRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    ShiftedGreaterThanTwoAndFour: (() => {
      const x = getShiftedBitRotation(2);
      const y = getShiftedBitRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    ShiftedGreaterThanTwoAndFive: (() => {
      const x = getShiftedBitRotation(2);
      const y = getShiftedBitRotation(5);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    ShiftedGreaterThanTwoAndSix: (() => {
      const x = getShiftedBitRotation(2);
      const y = getShiftedBitRotation(6);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    ShiftedGreaterThanTwoAndSeven: (() => {
      const x = getShiftedBitRotation(2);
      const y = getShiftedBitRotation(7);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    // Display 3 [1,0,0] > N (N = 0-7)
    ShiftedGreaterThanThreeAndZero: (() => {
      const x = getShiftedBitRotation(3);
      const y = getShiftedBitRotation(8);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    ShiftedGreaterThanThreeAndOne: (() => {
      const x = getShiftedBitRotation(3);
      const y = getShiftedBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    ShiftedGreaterThanThreeAndTwo: (() => {
      const x = getShiftedBitRotation(3);
      const y = getShiftedBitRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    ShiftedGreaterThanThreeAndThree: (() => {
      const x = getShiftedBitRotation(3);
      const y = getShiftedBitRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    ShiftedGreaterThanThreeAndFour: (() => {
      const x = getShiftedBitRotation(3);
      const y = getShiftedBitRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    ShiftedGreaterThanThreeAndFive: (() => {
      const x = getShiftedBitRotation(3);
      const y = getShiftedBitRotation(5);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    ShiftedGreaterThanThreeAndSix: (() => {
      const x = getShiftedBitRotation(3);
      const y = getShiftedBitRotation(6);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    ShiftedGreaterThanThreeAndSeven: (() => {
      const x = getShiftedBitRotation(3);
      const y = getShiftedBitRotation(7);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    // Display 4 [1,0,1] > N (N = 0-7)
    ShiftedGreaterThanFourAndZero: (() => {
      const x = getShiftedBitRotation(4);
      const y = getShiftedBitRotation(8);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    ShiftedGreaterThanFourAndOne: (() => {
      const x = getShiftedBitRotation(4);
      const y = getShiftedBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    ShiftedGreaterThanFourAndTwo: (() => {
      const x = getShiftedBitRotation(4);
      const y = getShiftedBitRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    ShiftedGreaterThanFourAndThree: (() => {
      const x = getShiftedBitRotation(4);
      const y = getShiftedBitRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    ShiftedGreaterThanFourAndFour: (() => {
      const x = getShiftedBitRotation(4);
      const y = getShiftedBitRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    ShiftedGreaterThanFourAndFive: (() => {
      const x = getShiftedBitRotation(4);
      const y = getShiftedBitRotation(5);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    ShiftedGreaterThanFourAndSix: (() => {
      const x = getShiftedBitRotation(4);
      const y = getShiftedBitRotation(6);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    ShiftedGreaterThanFourAndSeven: (() => {
      const x = getShiftedBitRotation(4);
      const y = getShiftedBitRotation(7);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    // Display 5 [1,1,0] > N (N = 0-7)
    ShiftedGreaterThanFiveAndZero: (() => {
      const x = getShiftedBitRotation(5);
      const y = getShiftedBitRotation(8);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    ShiftedGreaterThanFiveAndOne: (() => {
      const x = getShiftedBitRotation(5);
      const y = getShiftedBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    ShiftedGreaterThanFiveAndTwo: (() => {
      const x = getShiftedBitRotation(5);
      const y = getShiftedBitRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    ShiftedGreaterThanFiveAndThree: (() => {
      const x = getShiftedBitRotation(5);
      const y = getShiftedBitRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    ShiftedGreaterThanFiveAndFour: (() => {
      const x = getShiftedBitRotation(5);
      const y = getShiftedBitRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    ShiftedGreaterThanFiveAndFive: (() => {
      const x = getShiftedBitRotation(5);
      const y = getShiftedBitRotation(5);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    ShiftedGreaterThanFiveAndSix: (() => {
      const x = getShiftedBitRotation(5);
      const y = getShiftedBitRotation(6);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    ShiftedGreaterThanFiveAndSeven: (() => {
      const x = getShiftedBitRotation(5);
      const y = getShiftedBitRotation(7);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    // Display 6 [1,1,1] > N (N = 0-7)
    ShiftedGreaterThanSixAndZero: (() => {
      const x = getShiftedBitRotation(6);
      const y = getShiftedBitRotation(8);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    ShiftedGreaterThanSixAndOne: (() => {
      const x = getShiftedBitRotation(6);
      const y = getShiftedBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    ShiftedGreaterThanSixAndTwo: (() => {
      const x = getShiftedBitRotation(6);
      const y = getShiftedBitRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    ShiftedGreaterThanSixAndThree: (() => {
      const x = getShiftedBitRotation(6);
      const y = getShiftedBitRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    ShiftedGreaterThanSixAndFour: (() => {
      const x = getShiftedBitRotation(6);
      const y = getShiftedBitRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    ShiftedGreaterThanSixAndFive: (() => {
      const x = getShiftedBitRotation(6);
      const y = getShiftedBitRotation(5);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    ShiftedGreaterThanSixAndSix: (() => {
      const x = getShiftedBitRotation(6);
      const y = getShiftedBitRotation(6);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    ShiftedGreaterThanSixAndSeven: (() => {
      const x = getShiftedBitRotation(6);
      const y = getShiftedBitRotation(7);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    // Display 7 [0,0,0] > N (N = 0-7)
    // Display 7 is MAXIMUM (Full Twist), so 7 > X is True except when X = 7
    ShiftedGreaterThanSevenAndZero: (() => {
      const x = getShiftedBitRotation(7);
      const y = getShiftedBitRotation(8);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    ShiftedGreaterThanSevenAndOne: (() => {
      const x = getShiftedBitRotation(7);
      const y = getShiftedBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    ShiftedGreaterThanSevenAndTwo: (() => {
      const x = getShiftedBitRotation(7);
      const y = getShiftedBitRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    ShiftedGreaterThanSevenAndThree: (() => {
      const x = getShiftedBitRotation(7);
      const y = getShiftedBitRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    ShiftedGreaterThanSevenAndFour: (() => {
      const x = getShiftedBitRotation(7);
      const y = getShiftedBitRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    ShiftedGreaterThanSevenAndFive: (() => {
      const x = getShiftedBitRotation(7);
      const y = getShiftedBitRotation(5);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    ShiftedGreaterThanSevenAndSix: (() => {
      const x = getShiftedBitRotation(7);
      const y = getShiftedBitRotation(6);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    ShiftedGreaterThanSevenAndSeven: (() => {
      const x = getShiftedBitRotation(7);
      const y = getShiftedBitRotation(7);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })()
  };

  // src/concepts/round8/model/series/shiftedDifference.cases.ts
  var ShiftedDifferenceSeries = {
    // This would be 8, but instead Truncates the Rotation
    ShiftedDifferenceOfOneAndOne: (() => {
      const x = getShiftedBitRotation(1);
      const y = getShiftedBitRotation(1);
      const result = getShiftedRotation(8);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    ShiftedDifferenceOfOneAndTwo: (() => {
      const x = getShiftedBitRotation(1);
      const y = getShiftedBitRotation(2);
      const result = getShiftedRotation(7);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    ShiftedDifferenceOfOneAndThree: (() => {
      const x = getShiftedBitRotation(1);
      const y = getShiftedBitRotation(3);
      const result = getShiftedRotation(6);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    ShiftedDifferenceOfOneAndFour: (() => {
      const x = getShiftedBitRotation(1);
      const y = getShiftedBitRotation(4);
      const result = getShiftedRotation(5);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    ShiftedDifferenceOfOneAndFive: (() => {
      const x = getShiftedBitRotation(1);
      const y = getShiftedBitRotation(5);
      const result = getShiftedRotation(4);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    ShiftedDifferenceOfOneAndSix: (() => {
      const x = getShiftedBitRotation(1);
      const y = getShiftedBitRotation(6);
      const result = getShiftedRotation(3);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    ShiftedDifferenceOfOneAndSeven: (() => {
      const x = getShiftedBitRotation(1);
      const y = getShiftedBitRotation(7);
      const result = getShiftedRotation(2);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    ShiftedDifferenceOfOneAndMarqueeAsBorrow: (() => {
      const x = getShiftedBitRotation(1);
      const y = getShiftedBitRotation(8);
      const result = getShiftedRotation(7);
      const carry = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
    })(),
    ShiftedDifferenceOfTwoAndOne: (() => {
      const x = getShiftedBitRotation(2);
      const y = getShiftedBitRotation(1);
      const result = getShiftedRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    // Would be 8, Truncates Position
    ShiftedDifferenceOfTwoAndTwo: (() => {
      const x = getShiftedBitRotation(2);
      const y = getShiftedBitRotation(2);
      const result = getShiftedRotation(8);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    ShiftedDifferenceOfTwoAndThree: (() => {
      const x = getShiftedBitRotation(2);
      const y = getShiftedBitRotation(3);
      const result = getShiftedRotation(7);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    ShiftedDifferenceOfTwoAndFour: (() => {
      const x = getShiftedBitRotation(2);
      const y = getShiftedBitRotation(4);
      const result = getShiftedRotation(6);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    ShiftedDifferenceOfTwoAndFive: (() => {
      const x = getShiftedBitRotation(2);
      const y = getShiftedBitRotation(5);
      const result = getShiftedRotation(5);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    ShiftedDifferenceOfTwoAndSix: (() => {
      const x = getShiftedBitRotation(2);
      const y = getShiftedBitRotation(6);
      const result = getShiftedRotation(4);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    ShiftedDifferenceOfTwoAndSeven: (() => {
      const x = getShiftedBitRotation(2);
      const y = getShiftedBitRotation(7);
      const result = getShiftedRotation(3);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    ShiftedDifferenceOfTwoAndMarqueeAsBorrow: (() => {
      const x = getShiftedBitRotation(2);
      const y = getShiftedBitRotation(8);
      const result = getShiftedRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedDifferenceOfThreeAndOne: (() => {
      const x = getShiftedBitRotation(3);
      const y = getShiftedBitRotation(1);
      const result = getShiftedRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedDifferenceOfThreeAndTwo: (() => {
      const x = getShiftedBitRotation(3);
      const y = getShiftedBitRotation(2);
      const result = getShiftedRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedDifferenceOfThreeAndThree: (() => {
      const x = getShiftedBitRotation(3);
      const y = getShiftedBitRotation(3);
      const result = getShiftedRotation(8);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    ShiftedDifferenceOfThreeAndFour: (() => {
      const x = getShiftedBitRotation(3);
      const y = getShiftedBitRotation(4);
      const result = getShiftedRotation(7);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    ShiftedDifferenceOfThreeAndFive: (() => {
      const x = getShiftedBitRotation(3);
      const y = getShiftedBitRotation(5);
      const result = getShiftedRotation(6);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    ShiftedDifferenceOfThreeAndSix: (() => {
      const x = getShiftedBitRotation(3);
      const y = getShiftedBitRotation(6);
      const result = getShiftedRotation(5);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    ShiftedDifferenceOfThreeAndSeven: (() => {
      const x = getShiftedBitRotation(3);
      const y = getShiftedBitRotation(7);
      const result = getShiftedRotation(4);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    ShiftedDifferenceOfThreeAndMarqueeAsBorrow: (() => {
      const x = getShiftedBitRotation(3);
      const y = getShiftedBitRotation(8);
      const result = getShiftedRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedDifferenceOfFourAndOne: (() => {
      const x = getShiftedBitRotation(4);
      const y = getShiftedBitRotation(1);
      const result = getShiftedRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedDifferenceOfFourAndTwo: (() => {
      const x = getShiftedBitRotation(4);
      const y = getShiftedBitRotation(2);
      const result = getShiftedRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedDifferenceOfFourAndThree: (() => {
      const x = getShiftedBitRotation(4);
      const y = getShiftedBitRotation(3);
      const result = getShiftedRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedDifferenceOfFourAndFour: (() => {
      const x = getShiftedBitRotation(4);
      const y = getShiftedBitRotation(4);
      const result = getShiftedRotation(8);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    ShiftedDifferenceOfFourAndFive: (() => {
      const x = getShiftedBitRotation(4);
      const y = getShiftedBitRotation(5);
      const result = getShiftedRotation(7);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    ShiftedDifferenceOfFourAndSix: (() => {
      const x = getShiftedBitRotation(4);
      const y = getShiftedBitRotation(6);
      const result = getShiftedRotation(6);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    ShiftedDifferenceOfFourAndSeven: (() => {
      const x = getShiftedBitRotation(4);
      const y = getShiftedBitRotation(7);
      const result = getShiftedRotation(5);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    ShiftedDifferenceOfFourAndMarqueeAsBorrow: (() => {
      const x = getShiftedBitRotation(4);
      const y = getShiftedBitRotation(8);
      const result = getShiftedRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedDifferenceOfFiveAndOne: (() => {
      const x = getShiftedBitRotation(5);
      const y = getShiftedBitRotation(1);
      const result = getShiftedRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedDifferenceOfFiveAndTwo: (() => {
      const x = getShiftedBitRotation(5);
      const y = getShiftedBitRotation(2);
      const result = getShiftedRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedDifferenceOfFiveAndThree: (() => {
      const x = getShiftedBitRotation(5);
      const y = getShiftedBitRotation(3);
      const result = getShiftedRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedDifferenceOfFiveAndFour: (() => {
      const x = getShiftedBitRotation(5);
      const y = getShiftedBitRotation(4);
      const result = getShiftedRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedDifferenceOfFiveAndFive: (() => {
      const x = getShiftedBitRotation(5);
      const y = getShiftedBitRotation(5);
      const result = getShiftedRotation(8);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    ShiftedDifferenceOfFiveAndSix: (() => {
      const x = getShiftedBitRotation(5);
      const y = getShiftedBitRotation(6);
      const result = getShiftedRotation(7);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    ShiftedDifferenceOfFiveAndSeven: (() => {
      const x = getShiftedBitRotation(5);
      const y = getShiftedBitRotation(7);
      const result = getShiftedRotation(6);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    ShiftedDifferenceOfFiveAndMarqueeAsBorrow: (() => {
      const x = getShiftedBitRotation(5);
      const y = getShiftedBitRotation(8);
      const result = getShiftedRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedDifferenceOfSixAndOne: (() => {
      const x = getShiftedBitRotation(6);
      const y = getShiftedBitRotation(1);
      const result = getShiftedRotation(5 + 1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedDifferenceOfSixAndTwo: (() => {
      const x = getShiftedBitRotation(6);
      const y = getShiftedBitRotation(2);
      const result = getShiftedRotation(4 + 1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedDifferenceOfSixAndThree: (() => {
      const x = getShiftedBitRotation(6);
      const y = getShiftedBitRotation(3);
      const result = getShiftedRotation(3 + 1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedDifferenceOfSixAndFour: (() => {
      const x = getShiftedBitRotation(6);
      const y = getShiftedBitRotation(4);
      const result = getShiftedRotation(2 + 1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedDifferenceOfSixAndFive: (() => {
      const x = getShiftedBitRotation(6);
      const y = getShiftedBitRotation(5);
      const result = getShiftedRotation(1 + 1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedDifferenceOfSixAndSix: (() => {
      const x = getShiftedBitRotation(6);
      const y = getShiftedBitRotation(6);
      const result = getShiftedRotation(7);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    ShiftedDifferenceOfSixAndSeven: (() => {
      const x = getShiftedBitRotation(6);
      const y = getShiftedBitRotation(7);
      const result = getShiftedRotation(7 + 1);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    ShiftedDifferenceOfSixAndMarqueeAsBorrow: (() => {
      const x = getShiftedBitRotation(6);
      const y = getShiftedBitRotation(8);
      const result = getShiftedRotation(5);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedDifferenceOfSevenAndOne: (() => {
      const x = getShiftedBitRotation(7);
      const y = getShiftedBitRotation(1);
      const result = getShiftedRotation(6);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedDifferenceOfSevenAndTwo: (() => {
      const x = getShiftedBitRotation(7);
      const y = getShiftedBitRotation(2);
      const result = getShiftedRotation(5);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedDifferenceOfSevenAndThree: (() => {
      const x = getShiftedBitRotation(7);
      const y = getShiftedBitRotation(3);
      const result = getShiftedRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedDifferenceOfSevenAndFour: (() => {
      const x = getShiftedBitRotation(7);
      const y = getShiftedBitRotation(4);
      const result = getShiftedRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedDifferenceOfSevenAndFive: (() => {
      const x = getShiftedBitRotation(7);
      const y = getShiftedBitRotation(5);
      const result = getShiftedRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedDifferenceOfSevenAndSix: (() => {
      const x = getShiftedBitRotation(7);
      const y = getShiftedBitRotation(6);
      const result = getShiftedRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedDifferenceOfSevenAndSeven: (() => {
      const x = getShiftedBitRotation(7);
      const y = getShiftedBitRotation(7);
      const result = getShiftedRotation(8);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    ShiftedDifferenceOfSevenAndMarqueeAsBorrow: (() => {
      const x = getShiftedBitRotation(7);
      const y = getShiftedBitRotation(8);
      const result = getShiftedRotation(6);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedDifferenceOfMarqueeAsBorrowAndOne: (() => {
      const x = getShiftedBitRotation(8);
      const y = getShiftedBitRotation(1);
      const result = getShiftedRotation(7);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    ShiftedDifferenceOfMarqueeAsBorrowAndTwo: (() => {
      const x = getShiftedBitRotation(8);
      const y = getShiftedBitRotation(2);
      const result = getShiftedRotation(7);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    ShiftedDifferenceOfMarqueeAsBorrowAndThree: (() => {
      const x = getShiftedBitRotation(8);
      const y = getShiftedBitRotation(3);
      const result = getShiftedRotation(6);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    ShiftedDifferenceOfMarqueeAsBorrowAndFour: (() => {
      const x = getShiftedBitRotation(8);
      const y = getShiftedBitRotation(4);
      const result = getShiftedRotation(5);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    ShiftedDifferenceOfMarqueeAsBorrowAndFive: (() => {
      const x = getShiftedBitRotation(8);
      const y = getShiftedBitRotation(5);
      const result = getShiftedRotation(4);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    ShiftedDifferenceOfMarqueeAsBorrowAndSix: (() => {
      const x = getShiftedBitRotation(8);
      const y = getShiftedBitRotation(6);
      const result = getShiftedRotation(3);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    ShiftedDifferenceOfMarqueeAsBorrowAndSeven: (() => {
      const x = getShiftedBitRotation(8);
      const y = getShiftedBitRotation(7);
      const result = getShiftedRotation(2);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    ShiftedDifferenceOfMarqueeAsBorrowAndMarqueeAsBorrow: (() => {
      const x = getShiftedBitRotation(8);
      const y = getShiftedBitRotation(8);
      const result = getShiftedRotation(1);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })()
  };

  // src/concepts/round8/model/cases.ts
  var initializeSpooledWrung2 = () => {
    const arr = [];
    for (let i = 0; i < 2; i++) {
      arr[i] = [];
      for (let j = 0; j < 2; j++) {
        arr[i][j] = [];
        for (let k = 0; k < 2; k++) {
          arr[i][j][k] = [];
          for (let l = 0; l < 2; l++) {
            arr[i][j][k][l] = [];
            for (let m = 0; m < 2; m++) {
              arr[i][j][k][l][m] = [];
            }
          }
        }
      }
    }
    return arr;
  };
  var SpooledSumSeries = initializeSpooledWrung2();
  var ShiftedSpooledSumSeries = initializeSpooledWrung2();
  var SpooledDifferenceSeries = initializeSpooledWrung2();
  var SpooledShiftedDifferenceSeries = initializeSpooledWrung2();
  var SpooledGreaterThanSeries = initializeSpooledWrung2();
  var SpooledLessThanSeries = initializeSpooledWrung2();
  var SpooledShiftedGreaterThanSeries = initializeSpooledWrung2();
  var spool2 = (someSeries, spooled) => {
    Object.keys(someSeries).forEach((sum) => {
      const caseArray = someSeries[sum];
      const one = caseArray[0];
      const two = caseArray[1];
      const three = caseArray[2];
      const four = caseArray[3];
      const five = caseArray[4];
      const tuple = caseArray[5];
      const six = tuple[0];
      const sixValue = tuple.slice(1);
      spooled[one][two][three][four][five][six] = sixValue;
    });
  };
  spool2(SumSeries, SpooledSumSeries);
  spool2(ShiftedSumSeries, ShiftedSpooledSumSeries);
  spool2(DifferenceSeries, SpooledDifferenceSeries);
  spool2(ShiftedDifferenceSeries, SpooledShiftedDifferenceSeries);
  spool2(GreaterThanSeries, SpooledGreaterThanSeries);
  spool2(LessThanSeries, SpooledLessThanSeries);
  spool2(ShiftedGreaterThanSeries, SpooledShiftedGreaterThanSeries);
  var greaterThan = (rotationA, rotationB) => {
    const result = SpooledGreaterThanSeries[rotationA[0]][rotationA[1]][rotationA[2]][rotationB[0]][rotationB[1]][rotationB[2]];
    return result[0];
  };
  var lessThan = (rotationA, rotationB) => {
    const result = SpooledLessThanSeries[rotationA[0]][rotationA[1]][rotationA[2]][rotationB[0]][rotationB[1]][rotationB[2]];
    return result[0];
  };
  var equals = (rotationA, rotationB) => {
    return rotationA[0] === rotationB[0] && rotationA[1] === rotationB[1] && rotationA[2] === rotationB[2] ? 1 : 0;
  };
  var greaterThanOrEqual = (rotationA, rotationB) => {
    return equals(rotationA, rotationB) === 1 || greaterThan(rotationA, rotationB) === 1 ? 1 : 0;
  };
  var lessThanOrEqual = (rotationA, rotationB) => {
    return equals(rotationA, rotationB) === 1 || lessThan(rotationA, rotationB) === 1 ? 1 : 0;
  };
  var notEquals = (rotationA, rotationB) => {
    return equals(rotationA, rotationB) === 1 ? 0 : 1;
  };
  var shiftedGreaterThan = (rotationA, rotationB) => {
    const result = SpooledShiftedGreaterThanSeries[rotationA[0]][rotationA[1]][rotationA[2]][rotationB[0]][rotationB[1]][rotationB[2]];
    return result[0];
  };
  var createOrientableRotation = (indices, sourceRotations) => {
    const orientable = indices;
    orientable.orientate = function() {
      return this.map((idx) => sourceRotations[idx]);
    };
    return orientable;
  };
  var createOrientableWrung = (indices, sourceWrungs) => {
    const orientable = indices;
    orientable.orientate = function() {
      return this.map((idx) => sourceWrungs[idx]);
    };
    return orientable;
  };
  var compareMagnitude = (wrungA, wrungB, marqueeStateA, marqueeStateB) => {
    if (marqueeStateA.isAbsoluteZero && marqueeStateB.isAbsoluteZero) {
      return null;
    }
    if (marqueeStateA.isFinalTwist && marqueeStateB.isFinalTwist) {
      return null;
    }
    if (marqueeStateA.isAbsoluteZero) {
      return 0;
    }
    if (marqueeStateB.isAbsoluteZero) {
      return 1;
    }
    if (marqueeStateA.isFinalTwist) {
      return 1;
    }
    if (marqueeStateB.isFinalTwist) {
      return 0;
    }
    const signA = getSignBit(wrungA);
    const signB = getSignBit(wrungB);
    let greater = null;
    const marqueeAPosition = marqueeStateA.firstValidRotation ?? 21;
    const marqueeBPosition = marqueeStateB.firstValidRotation ?? 21;
    if (marqueeAPosition > marqueeBPosition) {
      return 1;
    }
    if (marqueeBPosition > marqueeAPosition) {
      return 0;
    }
    const startPosition = marqueeAPosition;
    if (startPosition > 21 || startPosition < 1) {
      return null;
    }
    scanDownwards(wrungA, wrungB, (rotationsA, rotationsB, pos) => {
      const tupleA = extractBitTuple(rotationsA, pos);
      const tupleB = extractBitTuple(rotationsB, pos);
      const areEqual = equals(tupleA, tupleB);
      if (areEqual) {
        return true;
      }
      const greaterThanSpool = pos === 21 ? shiftedGreaterThan : greaterThan;
      greater = greaterThanSpool(tupleA, tupleB) ? 1 : 0;
      if (greater === 1) {
        return false;
      }
      return false;
    }, startPosition);
    return greater;
  };
  var anor = (rotationA, rotationB, rotations) => {
    if (rotations.length === 0) {
      return null;
    }
    const [lower, upper] = greaterThan(rotationA, rotationB) === 1 ? [rotationB, rotationA] : [rotationA, rotationB];
    const inRangeIndices = [];
    rotations.forEach((rot, idx) => {
      const isGreaterOrEqualLower = greaterThanOrEqual(rot, lower) === 1;
      const isLessOrEqualUpper = lessThanOrEqual(rot, upper) === 1;
      if (isGreaterOrEqualLower && isLessOrEqualUpper) {
        inRangeIndices.push(idx);
      }
    });
    if (inRangeIndices.length === 0) {
      return null;
    }
    const states = [];
    rotations.forEach((rot, idx) => {
      const isInRange = inRangeIndices.includes(idx);
      if (!isInRange) {
        states.push({
          rotation: rot,
          anor: false,
          equal: null,
          greater: null,
          lesser: null
        });
      } else {
        const equalIndices = [];
        const greaterIndices = [];
        const lesserIndices = [];
        inRangeIndices.forEach((otherIdx) => {
          if (idx === otherIdx) {
            return;
          }
          const otherRot = rotations[otherIdx];
          const isEqual = equals(rot, otherRot) === 1;
          if (isEqual) {
            equalIndices.push(otherIdx);
          } else {
            const isGreater = greaterThan(otherRot, rot) === 1;
            if (isGreater) {
              greaterIndices.push(otherIdx);
            } else {
              lesserIndices.push(otherIdx);
            }
          }
        });
        states.push({
          rotation: rot,
          anor: true,
          equal: createOrientableRotation(equalIndices, rotations),
          greater: createOrientableRotation(greaterIndices, rotations),
          lesser: createOrientableRotation(lesserIndices, rotations)
        });
      }
    });
    return states;
  };
  var anorWrung = (wrungA, wrungB, wrungs, _marqueeStateA, _marqueeStateB, wrungWrungMuxitys) => {
    if (wrungs.length === 0) {
      return null;
    }
    const marqueeStateA = _marqueeStateA ?? BidirectionalConference(wrungA);
    const marqueeStateB = _marqueeStateB ?? BidirectionalConference(wrungB);
    const resolvedWrungWrungMuxitys = wrungWrungMuxitys ? wrungWrungMuxitys : wrungs.map((wrung) => BidirectionalConference(wrung));
    const aGreaterThanB = compareMagnitude(wrungA, wrungB, marqueeStateA, marqueeStateB);
    const [lower, upper, lowerWrungMuxity, upperWrungMuxity] = aGreaterThanB === 1 ? [wrungB, wrungA, marqueeStateB, marqueeStateA] : [wrungA, wrungB, marqueeStateA, marqueeStateB];
    const inRangeIndices = [];
    wrungs.forEach((wrung, idx) => {
      const wrungWrungMuxity = resolvedWrungWrungMuxitys[idx];
      const lowerComparison = compareMagnitude(wrung, lower, wrungWrungMuxity, lowerWrungMuxity);
      const upperComparison = compareMagnitude(wrung, upper, wrungWrungMuxity, upperWrungMuxity);
      const isGreaterOrEqualLower = lowerComparison === 1 || lowerComparison === null;
      const isLessOrEqualUpper = upperComparison === 0 || upperComparison === null;
      if (isGreaterOrEqualLower && isLessOrEqualUpper) {
        inRangeIndices.push(idx);
      }
    });
    if (inRangeIndices.length === 0) {
      return null;
    }
    const states = [];
    wrungs.forEach((wrung, idx) => {
      const isInRange = inRangeIndices.includes(idx);
      const wrungWrungMuxity = resolvedWrungWrungMuxitys[idx];
      if (!isInRange) {
        states.push({
          wrung,
          marqueeState: wrungWrungMuxity,
          anor: false,
          equal: null,
          greater: null,
          lesser: null
        });
      } else {
        const equalIndices = [];
        const greaterIndices = [];
        const lesserIndices = [];
        inRangeIndices.forEach((otherIdx) => {
          if (idx === otherIdx) {
            return;
          }
          const otherWrung = wrungs[otherIdx];
          const otherWrungMuxity = resolvedWrungWrungMuxitys[otherIdx];
          const comparison = compareMagnitude(otherWrung, wrung, otherWrungMuxity, wrungWrungMuxity);
          if (comparison === null) {
            equalIndices.push(otherIdx);
          } else if (comparison === 1) {
            greaterIndices.push(otherIdx);
          } else {
            lesserIndices.push(otherIdx);
          }
        });
        states.push({
          wrung,
          marqueeState: wrungWrungMuxity,
          anor: true,
          equal: createOrientableWrung(equalIndices, wrungs),
          greater: createOrientableWrung(greaterIndices, wrungs),
          lesser: createOrientableWrung(lesserIndices, wrungs)
        });
      }
    });
    return states;
  };

  // src/concepts/round8/model/operations.ts
  var determineEffectiveOperation = (operation, signA, signB, wrungA, wrungB, wrungMuxityA, wrungMuxityB) => {
    if (operation === "+") {
      if (signA === 1 && signB === 1) {
        return {
          effectiveOp: "sum",
          anchorWrung: wrungA,
          anchorWrungWas: "A",
          modulatorWrung: wrungB,
          resultSign: 1
        };
      }
      if (signA === 0 && signB === 0) {
        return {
          effectiveOp: "sum",
          anchorWrung: wrungA,
          anchorWrungWas: "A",
          modulatorWrung: wrungB,
          resultSign: 0
        };
      }
      if (signA === 1 && signB === 0) {
        const magnitudeComparison = compareMagnitude(wrungA, wrungB, wrungMuxityA, wrungMuxityB);
        if (magnitudeComparison === null) {
          return {
            effectiveOp: "difference",
            anchorWrung: wrungA,
            anchorWrungWas: "A",
            modulatorWrung: wrungB,
            resultSign: 1,
            // Positive zero
            isEqualMagnitude: true
          };
        }
        return {
          effectiveOp: "difference",
          anchorWrung: magnitudeComparison === 1 ? wrungA : wrungB,
          anchorWrungWas: magnitudeComparison === 1 ? "A" : "B",
          modulatorWrung: magnitudeComparison === 1 ? wrungB : wrungA,
          resultSign: magnitudeComparison === 1 ? 1 : 0,
          isEqualMagnitude: false
        };
      }
      if (signA === 0 && signB === 1) {
        const magnitudeComparison = compareMagnitude(wrungB, wrungA, wrungMuxityB, wrungMuxityA);
        if (magnitudeComparison === null) {
          return {
            effectiveOp: "difference",
            anchorWrung: wrungB,
            anchorWrungWas: "B",
            modulatorWrung: wrungA,
            resultSign: 1,
            // Positive zero
            isEqualMagnitude: true
          };
        }
        return {
          effectiveOp: "difference",
          anchorWrung: magnitudeComparison === 1 ? wrungB : wrungA,
          anchorWrungWas: magnitudeComparison === 1 ? "B" : "A",
          modulatorWrung: magnitudeComparison === 1 ? wrungA : wrungB,
          resultSign: magnitudeComparison === 1 ? 1 : 0,
          isEqualMagnitude: false
        };
      }
    }
    if (operation === "-") {
      if (signA === 1 && signB === 1) {
        const magnitudeComparison = compareMagnitude(wrungA, wrungB, wrungMuxityA, wrungMuxityB);
        if (magnitudeComparison === null) {
          return {
            effectiveOp: "difference",
            anchorWrung: wrungA,
            anchorWrungWas: "A",
            modulatorWrung: wrungB,
            resultSign: 1,
            // Positive zero
            isEqualMagnitude: true
          };
        }
        return {
          effectiveOp: "difference",
          anchorWrung: magnitudeComparison === 1 ? wrungA : wrungB,
          anchorWrungWas: magnitudeComparison === 1 ? "A" : "B",
          modulatorWrung: magnitudeComparison === 1 ? wrungB : wrungA,
          resultSign: magnitudeComparison === 1 ? 1 : 0,
          isEqualMagnitude: false
        };
      }
      if (signA === 0 && signB === 0) {
        const magnitudeComparison = compareMagnitude(wrungA, wrungB, wrungMuxityA, wrungMuxityB);
        if (magnitudeComparison === null) {
          return {
            effectiveOp: "difference",
            anchorWrung: wrungA,
            anchorWrungWas: "A",
            modulatorWrung: wrungB,
            resultSign: 1,
            // Positive zero (sign doesn't matter for zero)
            isEqualMagnitude: true
          };
        }
        return {
          effectiveOp: "difference",
          anchorWrung: magnitudeComparison === 1 ? wrungA : wrungB,
          anchorWrungWas: magnitudeComparison === 1 ? "A" : "B",
          modulatorWrung: magnitudeComparison === 1 ? wrungB : wrungA,
          resultSign: magnitudeComparison === 1 ? 0 : 1,
          isEqualMagnitude: false
        };
      }
      if (signA === 1 && signB === 0) {
        return {
          effectiveOp: "sum",
          anchorWrung: wrungA,
          anchorWrungWas: "A",
          modulatorWrung: wrungB,
          resultSign: 1
        };
      }
      if (signA === 0 && signB === 1) {
        return {
          effectiveOp: "sum",
          anchorWrung: wrungA,
          anchorWrungWas: "A",
          modulatorWrung: wrungB,
          resultSign: 0
        };
      }
    }
    throw new Error(
      `determineEffectiveOperation: Unhandled combination - operation=${operation}, signA=${signA}, signB=${signB}`
    );
  };
  var assembleBufferFromResultMuxity = (muxity, isFinalTwistDetected, operation, wasFinalTwist) => {
    if (isFinalTwistDetected) {
      return muxity.resultSign === 1 ? getRound8Case(1 /* POSITIVE_TWIST_CASE */) : getRound8Case(2 /* NEGATIVE_TWIST_CASE */);
    }
    if (muxity.pendingPropagation && operation === "sum") {
      if (muxity.positions.length < 21) {
        muxity.positions.push(0);
      } else {
        return muxity.resultSign === 1 ? getRound8Case(1 /* POSITIVE_TWIST_CASE */) : getRound8Case(2 /* NEGATIVE_TWIST_CASE */);
      }
    }
    let buffer = createBuffer();
    if (muxity.resultSign === 1) {
      buffer = setSignBit(buffer);
    }
    if (wasFinalTwist && muxity.positions.length === 1 && muxity.positions[0] === 7 && muxity.pendingPropagation) {
      buffer = applyNumeralRotation(0, buffer, 1);
      buffer = applyMarqueeAtPosition(buffer, 2);
    } else {
      muxity.positions.forEach((resultIndex, index) => {
        const pos = index + 1;
        if (pos === 21) {
          if (resultIndex === 0) {
            buffer = applyShiftedNumeralRotation(resultIndex + 1, buffer, pos);
          } else {
            buffer = applyShiftedNumeralRotation(resultIndex, buffer, pos);
          }
        } else {
          buffer = applyNumeralRotation(resultIndex, buffer, pos);
        }
      });
      if (muxity.positions.length < 21) {
        const marqueePosition = muxity.positions.length + 1;
        if (marqueePosition <= 21) {
          buffer = applyMarqueeAtPosition(buffer, marqueePosition);
        }
      }
      if (wasFinalTwist) {
        return muxifyWrung("+", buffer, parseStringToRound8("1"), true);
      }
    }
    return buffer;
  };
  var sumWrung = (routing, wrungMuxityA, wrungMuxityB, wasRan = false) => {
    const result = createResultMuxity(routing.resultSign);
    const lengthA = wrungMuxityA.marqueeRotation ? wrungMuxityA.marqueeRotation - 1 : 21;
    const lengthB = wrungMuxityB.marqueeRotation ? wrungMuxityB.marqueeRotation - 1 : 21;
    const maxPosition = Math.max(lengthA, lengthB);
    const minPosition = Math.min(lengthA, lengthB);
    const longerWrung = lengthA > lengthB ? routing.anchorWrung : routing.modulatorWrung;
    let isFinalTwistDetected = false;
    const carries = [];
    scanUpwards(routing.anchorWrung, routing.modulatorWrung, (a, b, pos) => {
      if (pos > maxPosition) {
        return false;
      }
      const chosenSpool = pos === 21 ? ShiftedSpooledSumSeries : SpooledSumSeries;
      const carry = carries.pop();
      let resultIndex = 0;
      if (pos > minPosition && lengthA !== lengthB) {
        const [b0, b1, b2] = extractBitTuple(longerWrung, pos);
        if (carry) {
          const [c0, c1, c2] = carry;
          const tuple = chosenSpool[b0][b1][b2][c0][c1][c2];
          if (pos === 21 && tuple.length > 1) {
            isFinalTwistDetected = true;
            return false;
          } else if (tuple.length > 1) {
            carries.push(tuple[1]);
          }
          resultIndex += tuple[0];
        } else {
          const diff = wasRan ? 1 : 0;
          resultIndex += pos === 21 ? spooledShiftedNumerals[b0][b1][b2] - diff : spooledNumerals[b0][b1][b2] - 1;
        }
      } else {
        const [rtA0, rtA1, rtA2] = extractBitTuple(a, pos);
        const [rtB0, rtB1, rtB2] = extractBitTuple(b, pos);
        if (carry) {
          const [c0, c1, c2] = carry;
          const tuple = chosenSpool[rtA0][rtA1][rtA2][c0][c1][c2];
          if (pos === 21 && tuple.length > 1) {
            isFinalTwistDetected = true;
            return false;
          } else if (tuple.length > 1) {
            carries.push(tuple[1]);
          }
          const [i0, i1, i2] = pos === 21 ? getShiftedBitRotation(tuple[0] + 1) : getRegularBitRotation(tuple[0] + 1);
          const nextTuple = chosenSpool[i0][i1][i2][rtB0][rtB1][rtB2];
          if (nextTuple.length > 1) {
            carries.push(nextTuple[1]);
          }
          resultIndex += nextTuple[0];
        } else {
          const spoolResult = pos === 21 ? ShiftedSpooledSumSeries[rtA0][rtA1][rtA2][rtB0][rtB1][rtB2] : SpooledSumSeries[rtA0][rtA1][rtA2][rtB0][rtB1][rtB2];
          if (pos === 21 && spoolResult.length > 1) {
            isFinalTwistDetected = true;
            return false;
          } else if (spoolResult.length > 1) {
            carries.push(spoolResult[1]);
          }
          resultIndex = spoolResult[0];
        }
      }
      result.positions.push(resultIndex);
      return true;
    });
    if (carries.length > 0) {
      const carry = carries.pop();
      const carryAsNumeral = spooledNumerals[carry[0]][carry[1]][carry[2]];
      result.positions.push(carryAsNumeral - 1);
    }
    if (result.positions.length === 21 && carries.length === 1) {
      result.positions[0] += 1;
    }
    return assembleBufferFromResultMuxity(result, isFinalTwistDetected, "sum");
  };
  var differenceWrung = (routing, muxityA, muxityB) => {
    const result = createResultMuxity(routing.resultSign);
    let wrungMuxityA = muxityA;
    let wrungMuxityB = muxityB;
    let wasFullTwist = false;
    if (wrungMuxityA.isFinalTwist) {
      if (wrungMuxityB.isFinalTwist === false) {
        if (getWrungStringRepresentation(wrungMuxityB.wrung) === "688888888888888888888") {
          result.positions.push(0);
          return assembleBufferFromResultMuxity(result, false, "difference", false);
        }
      }
      wasFullTwist = true;
      wrungMuxityA = BidirectionalConference(parseStringToRound8("688888888888888888888"));
    } else if (wrungMuxityB.isFinalTwist) {
      wrungMuxityB = BidirectionalConference(parseStringToRound8("688888888888888888888"));
      wasFullTwist = true;
    }
    const anchorMuxity = routing.anchorWrungWas === "A" ? wrungMuxityA : wrungMuxityB;
    const modulatorMuxity = routing.anchorWrungWas === "B" ? wrungMuxityA : wrungMuxityB;
    const lengthAnchor = anchorMuxity.marqueeRotation ? anchorMuxity.marqueeRotation - 1 : 21;
    const lengthModulator = modulatorMuxity.marqueeRotation ? modulatorMuxity.marqueeRotation - 1 : 21;
    const maxPosition = lengthAnchor;
    const minPosition = lengthModulator;
    const borrows = [];
    scanUpwards(routing.anchorWrung, routing.modulatorWrung, (a, b, pos) => {
      if (pos > maxPosition) {
        return false;
      }
      const chosenSpool = pos === 21 ? SpooledShiftedDifferenceSeries : SpooledDifferenceSeries;
      let resultIndex = -1;
      if (pos > minPosition) {
        const [b0, b1, b2] = extractBitTuple(a, pos);
        if (borrows.length > 0) {
          const borrowMuxity = borrows.pop();
          if (borrowMuxity && pos === 21) {
            const borrow = borrowMuxity.tuple;
            const someNumber = spooledNumerals[borrow[0]][borrow[1]][borrow[2]];
            const [t0, t1, t2] = getShiftedBitRotation(someNumber);
            const borrowTuple = spooledRegularShiftedBridge[t0][t1][t2];
            const spoolResult = chosenSpool[b0][b1][b2][borrowTuple[0]][borrowTuple[1]][borrowTuple[2]];
            if (spoolResult) {
              resultIndex = spoolResult[0];
              if (spoolResult.length > 1) {
                borrows.unshift({ tuple: spoolResult[1], position: pos });
                return false;
              }
            }
          } else if (borrowMuxity !== void 0) {
            const borrow = borrowMuxity.tuple;
            const spoolResult = chosenSpool[b0][b1][b2][borrow[0]][borrow[1]][borrow[2]];
            resultIndex = spoolResult[0];
            if (spoolResult.length > 1) {
              borrows.unshift({ tuple: spoolResult[1], position: pos });
            }
          }
        } else {
          const some = pos === 21 ? spooledShiftedNumerals[b0][b1][b2] : spooledNumerals[b0][b1][b2] - 1;
          resultIndex = some;
        }
      } else {
        const [rtA0, rtA1, rtA2] = extractBitTuple(a, pos);
        const [rtB0, rtB1, rtB2] = extractBitTuple(b, pos);
        if (borrows.length > 0) {
          const borrowMuxity = borrows.pop();
          if (borrowMuxity && pos === 21) {
            const borrow = borrowMuxity.tuple;
            const borrowTuple = spooledRegularShiftedBridge[borrow[0]][borrow[1]][borrow[2]];
            const spoolResult = chosenSpool[rtA0][rtA1][rtA2][borrowTuple[0]][borrowTuple[1]][borrowTuple[2]];
            resultIndex = spoolResult[0];
            if (spoolResult.length > 1) {
              borrows.unshift({ tuple: spoolResult[1], position: pos });
            }
            const [i0, i1, i2] = getShiftedBitRotation(resultIndex);
            const nextResult = chosenSpool[i0][i1][i2][rtB0][rtB1][rtB2];
            resultIndex = nextResult[0];
            if (nextResult.length > 1) {
              borrows.unshift({ tuple: nextResult[1], position: pos });
            }
          } else if (borrowMuxity) {
            const borrowTuple = borrowMuxity.tuple;
            const spoolResult = chosenSpool[rtA0][rtA1][rtA2][borrowTuple[0]][borrowTuple[1]][borrowTuple[2]];
            resultIndex = spoolResult[0];
            if (spoolResult.length > 1) {
              borrows.unshift({ tuple: spoolResult[1], position: pos });
            }
            const [i0, i1, i2] = getRegularBitRotation(resultIndex + 1);
            const nextResult = chosenSpool[i0][i1][i2][rtB0][rtB1][rtB2];
            resultIndex = nextResult[0];
            if (nextResult.length > 1) {
              borrows.unshift({ tuple: nextResult[1], position: pos });
            }
          }
        } else {
          const spoolResult = chosenSpool[rtA0][rtA1][rtA2][rtB0][rtB1][rtB2];
          resultIndex = spoolResult[0];
          if (pos === 21 && spoolResult.length > 1) {
            borrows.unshift({ tuple: spoolResult[1], position: pos });
          } else if (spoolResult.length > 1) {
            borrows.unshift({ tuple: spoolResult[1], position: pos });
          }
        }
      }
      if (resultIndex >= 0) {
        result.positions.push(resultIndex);
      }
      return true;
    });
    if (borrows.length > 0) {
      if (borrows.length === 1 && borrows[0].position === result.positions.length) {
        let newPositions = [];
        let bounce = false;
        if (result.positions[result.positions.length - 1] === 7) {
          let prior = false;
          result.positions.reverse().forEach((rt, i) => {
            if (!bounce) {
              if (i === 0 && rt === 7) {
              } else if (rt === 6) {
                prior = true;
              } else {
                newPositions = result.positions.slice(i);
                if (prior) {
                  if (rt === 7) {
                    if (result.positions[i] && result.positions[i] === 7 && result.positions[i + 1] && result.positions[i + 1] === 6) {
                      if (newPositions.length === 2) {
                        newPositions.shift();
                      } else if (newPositions.length === 1) {
                      } else {
                        newPositions[0] = 0;
                      }
                    } else {
                      newPositions.shift();
                    }
                  } else {
                  }
                }
                bounce = true;
              }
            }
          });
          if (newPositions.length === 0) {
            result.positions.shift();
          } else {
            newPositions.reverse();
            result.positions = newPositions;
          }
        } else if (result.positions[result.positions.length - 1] === 6) {
          result.positions.forEach((rt, i) => {
            if (!bounce) {
              if (i === 0) {
              } else if (rt === 6) {
                bounce = true;
                newPositions = result.positions.slice(0, i - 1);
              }
            }
          });
          result.positions = newPositions;
        }
      } else if (borrows.length < result.positions.length) {
        if (borrows.length === 1 && result.positions[result.positions.length - 1] === 7) {
          result.positions.pop();
        } else if (borrows.length === 2 && result.positions[result.positions.length - 1] === 7 && result.positions[result.positions.length - 2] === 7) {
          result.positions.pop();
          result.positions.pop();
        } else if (borrows.length === 2 && result.positions[result.positions.length - 1] === 6 && result.positions[result.positions.length - 2] === 7) {
          result.positions.pop();
          result.positions.pop();
        }
      } else if (borrows[0].position === result.positions.length) {
        if (result.positions[result.positions.length - 1] === 7) {
          if (result.positions[result.positions.length - 2] && result.positions[result.positions.length - 2] === 7 && result.positions.length !== 2) {
            result.positions.pop();
            result.positions.pop();
          } else {
            result.positions.pop();
          }
        } else if (result.positions[result.positions.length - 1] === 6) {
          result.positions.push(0);
        }
      } else if (borrows.length > result.positions.length) {
        result.positions = [0];
      }
    }
    return assembleBufferFromResultMuxity(result, false, "difference", wasFullTwist);
  };
  var muxifyWrung = (operation, wrungA, wrungB, wasRan = false) => {
    const signA = getSignBit(wrungA);
    const signB = getSignBit(wrungB);
    const wrungMuxityA = BidirectionalConference(wrungA);
    const wrungMuxityB = BidirectionalConference(wrungB);
    if (wrungMuxityA.isAbsoluteZero && wrungMuxityB.isAbsoluteZero) {
      return createBuffer();
    }
    if (wrungMuxityA.isAbsoluteZero) {
      if (operation === "+") {
        return wrungB;
      } else {
        return signB === 1 ? wrungB & ~1n : setSignBit(wrungB);
      }
    }
    if (wrungMuxityB.isAbsoluteZero) {
      return wrungA;
    }
    const effectiveOperation = determineEffectiveOperation(
      operation,
      signA,
      signB,
      wrungA,
      wrungB,
      wrungMuxityA,
      wrungMuxityB
    );
    if (effectiveOperation.isEqualMagnitude && effectiveOperation.effectiveOp === "difference") {
      return createBuffer();
    }
    if (effectiveOperation.effectiveOp === "sum") {
      if (wrungMuxityA.isFinalTwist || wrungMuxityB.isFinalTwist) {
        return effectiveOperation.resultSign === 1 ? getRound8Case(1 /* POSITIVE_TWIST_CASE */) : getRound8Case(2 /* NEGATIVE_TWIST_CASE */);
      }
    }
    if (effectiveOperation.effectiveOp === "sum") {
      return sumWrung(effectiveOperation, wrungMuxityA, wrungMuxityB, wasRan);
    } else {
      return differenceWrung(effectiveOperation, wrungMuxityA, wrungMuxityB);
    }
  };

  // src/concepts/round8/model/r8.ts
  var r8_ = {
    // ============================================================
    // Conference - Display Formatting & Parsing
    // ============================================================
    createRoundDisplay: getFormattedColumnarWrungRepresentation,
    createRoundString: getWrungStringRepresentation,
    parseStringToBuffer: parseStringToRound8,
    createBufferDisplay: createFormattedRound8BinaryString,
    // ============================================================
    // Operations - Arithmetic (Orchestration Layer)
    // ============================================================
    operations: {
      muxifyWrung,
      // Convenience wrappers - composing functions orchestrating muxifyWrung
      add: (a, b) => muxifyWrung("+", a, b),
      subtract: (a, b) => muxifyWrung("-", a, b),
      increment: (value) => {
        const one = parseStringToRound8("1");
        return one ? muxifyWrung("+", value, one) : value;
      },
      decrement: (value) => {
        const one = parseStringToRound8("1");
        return one ? muxifyWrung("-", value, one) : value;
      }
    },
    // ============================================================
    // Logical - Comparison Operators
    // ============================================================
    logical: {
      equals,
      notEquals,
      greaterThan,
      lessThan,
      greaterThanOrEqual,
      lessThanOrEqual
    },
    // ============================================================
    // ANOR - Magnitude Analysis & Operation Routing
    // ============================================================
    anor: {
      anor,
      anorWrung,
      compareMagnitude,
      determineEffectiveOperation,
      BidirectionalConference
    },
    // ============================================================
    // Terminology - Low-Level Primitives
    // ============================================================
    terminology: {
      getSignBit,
      clearSignBit,
      setSignBit,
      flipSignBit,
      createBuffer,
      getRound8Case,
      Round8Cases,
      MaskStore,
      ClearMaskStore,
      BitOffsetStore,
      getBitOffsetForPosition,
      getBitWiseMaskForPosition,
      extractBitTuple,
      getClearMaskForPosition,
      MARQUEE_TUPLE,
      getRegularBitRotation,
      getShiftedBitRotation,
      getRegularRotation,
      getShiftedRotation,
      getMarqueeBitRotation,
      getRotationValue,
      getRotationString,
      applyNumeralRotation,
      scanDownward,
      scanUpward
    }
  };

  // src/concepts/round8/model/calculator.ts
  function createCalculator() {
    const state = {
      input1: {
        value: "",
        buffer: 0n,
        binary: ""
      },
      input2: {
        value: "",
        buffer: 0n,
        binary: ""
      },
      output: {
        value: "",
        buffer: 0n,
        binary: ""
      },
      operation: null,
      activeInput: "input1",
      darkMode: true
    };
    function handleDigitEntry(digit) {
      const inputState = state[state.activeInput];
      const currentSequence = inputState.value;
      const isZeroState = !currentSequence || currentSequence === "0" || currentSequence === "" || currentSequence === "-0";
      const newSequence = isZeroState ? `${digit}` : `${currentSequence}${digit}`;
      const buffer = r8_.parseStringToBuffer(newSequence);
      if (buffer) {
        const binary = r8_.createBufferDisplay(buffer);
        const displayValue = r8_.createRoundDisplay(buffer);
        inputState.buffer = buffer;
        inputState.binary = binary;
        inputState.value = displayValue;
      }
    }
    function handleBackspace() {
      const inputState = state[state.activeInput];
      const currentSequence = inputState.value;
      if (!currentSequence) {
        return;
      }
      const newSequence = currentSequence.slice(0, -1);
      if (newSequence === "") {
        inputState.value = "0";
        inputState.buffer = 0n;
        inputState.binary = r8_.createBufferDisplay(0n);
      } else {
        const buffer = r8_.parseStringToBuffer(newSequence);
        const binary = buffer ? r8_.createBufferDisplay(buffer) : r8_.createBufferDisplay(0n);
        inputState.buffer = buffer ? buffer : 0n;
        const displayValue = r8_.createRoundDisplay(inputState.buffer);
        inputState.value = displayValue ? displayValue : "0";
        inputState.binary = binary ? binary : r8_.createBufferDisplay(0n);
      }
    }
    function handleZero() {
      const inputState = state[state.activeInput];
      inputState.value = r8_.createRoundDisplay(0n);
      inputState.buffer = 0n;
      inputState.binary = r8_.createBufferDisplay(0n);
    }
    function handleOperation(operation) {
      if (operation === null) {
        return;
      }
      state.operation = operation;
    }
    function handleCalculate() {
      const buffer1 = state.input1.buffer;
      const buffer2 = state.input2.buffer;
      const operation = state.operation;
      if (!operation) {
        console.warn("Round8 Calculator: No operation selected");
        return;
      }
      let result = 0n;
      if (operation === "+") {
        result = r8_.operations.add(buffer1, buffer2);
      } else if (operation === "-") {
        result = r8_.operations.subtract(buffer1, buffer2);
      } else if (operation === ">") {
        result = buffer1 > buffer2 ? 1n : 0n;
      } else if (operation === "<") {
        result = buffer1 < buffer2 ? 1n : 0n;
      } else if (operation === ">=") {
        result = buffer1 >= buffer2 ? 1n : 0n;
      } else if (operation === "<=") {
        result = buffer1 <= buffer2 ? 1n : 0n;
      } else if (operation === "==") {
        result = buffer1 === buffer2 ? 1n : 0n;
      } else if (operation === "!=") {
        result = buffer1 !== buffer2 ? 1n : 0n;
      } else {
        console.warn(`Round8 Calculator: Operation not yet implemented: ${operation}`);
        return;
      }
      state.output.buffer = result;
      state.output.binary = r8_.createBufferDisplay(result);
      state.output.value = r8_.createRoundDisplay(result);
    }
    function handleClear() {
      state.input1.value = "0";
      state.input1.buffer = 0n;
      state.input1.binary = r8_.createBufferDisplay(0n);
      state.input2.value = "0";
      state.input2.buffer = 0n;
      state.input2.binary = r8_.createBufferDisplay(0n);
      state.output.value = "0";
      state.output.buffer = 0n;
      state.output.binary = r8_.createBufferDisplay(0n);
      state.operation = null;
      state.activeInput = "input1";
    }
    function handleInputSwitch() {
      state.activeInput = state.activeInput === "input1" ? "input2" : "input1";
    }
    function handleSigned() {
      const inputState = state[state.activeInput];
      const flipped = r8_.terminology.flipSignBit(inputState.buffer);
      inputState.buffer = flipped;
      inputState.binary = r8_.createBufferDisplay(flipped);
      inputState.value = r8_.createRoundDisplay(flipped);
    }
    function handleIncrement() {
      const inputState = state[state.activeInput];
      const incremented = r8_.operations.increment(inputState.buffer);
      inputState.buffer = incremented;
      inputState.binary = r8_.createBufferDisplay(incremented);
      inputState.value = r8_.createRoundDisplay(incremented);
    }
    function handleDecrement() {
      const inputState = state[state.activeInput];
      const decremented = r8_.operations.decrement(inputState.buffer);
      inputState.buffer = decremented;
      inputState.binary = r8_.createBufferDisplay(decremented);
      inputState.value = r8_.createRoundDisplay(decremented);
    }
    return {
      // State access
      state,
      // Calculator operations
      handleDigitEntry,
      handleBackspace,
      handleZero,
      handleOperation,
      handleCalculate,
      handleSigned,
      handleIncrement,
      handleDecrement,
      handleClear,
      handleInputSwitch
    };
  }
  var r8Calculator = createCalculator;

  // node_modules/stratimux/dist/index.mjs
  var import_rxjs = __toESM(require_cjs(), 1);
  var import_rxjs2 = __toESM(require_cjs(), 1);
  var import_rxjs3 = __toESM(require_cjs(), 1);
  var import_rxjs4 = __toESM(require_cjs(), 1);
  var import_rxjs5 = __toESM(require_cjs(), 1);
  var __defProp2 = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp2 = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp2.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var forEachConcept = (concepts, each) => {
    const conceptKeys = Object.keys(concepts);
    for (const i of conceptKeys) {
      const index = Number(i);
      each(concepts[index], index);
    }
  };
  var nullActionType = "null";
  var muxiumConcludeType = "Muxium Conclude";
  var muxiumBadActionType = "Muxium Bad Action";
  var muxiumSetBlockingModeType = "Muxium Set Blocking Mode";
  function getSpecialSemaphore(type) {
    switch (type) {
      case muxiumBadActionType: {
        return 1;
      }
      case nullActionType: {
        return 2;
      }
      case muxiumConcludeType: {
        return 3;
      }
      case muxiumSetBlockingModeType: {
        return 4;
      }
      // case muxiumOpenType: {
      //   return 5;
      // }
      default: {
        return 0;
      }
    }
  }
  function createAction(type, options) {
    const special = getSpecialSemaphore(type);
    const semaphore = (options == null ? void 0 : options.semaphore) !== void 0 ? options.semaphore : [0, 0, -1, special];
    if (options) {
      const {
        payload,
        keyedSelectors,
        agreement,
        conceptSemaphore,
        priority,
        origin
      } = options;
      return {
        type,
        identity: options.identity ? options.identity : generateQualityIdentity(),
        semaphore: options.semaphore ? options.semaphore : semaphore,
        payload: payload ? payload : {},
        keyedSelectors,
        agreement,
        expiration: Date.now() + (agreement !== void 0 ? agreement : 5e3),
        conceptSemaphore,
        priority,
        origin
      };
    } else {
      return {
        type,
        identity: generateQualityIdentity(),
        semaphore,
        expiration: Date.now() + 5e3,
        payload: {}
      };
    }
  }
  function prepareActionCreator(actionType, actionSemaphoreBucket, identity) {
    return (options) => {
      if (options) {
        return createAction(
          actionType,
          __spreadProps(__spreadValues({}, options), {
            semaphore: actionSemaphoreBucket[0] ? actionSemaphoreBucket[0] : [-1, -1, -1, -1]
          })
        );
      }
      return createAction(
        actionType,
        {
          semaphore: actionSemaphoreBucket[0] ? actionSemaphoreBucket[0] : [-1, -1, -1, -1],
          identity
        }
      );
    };
  }
  function prepareActionWithPayloadCreator(actionType, actionSemaphoreBucket, identity) {
    return (payload, options) => {
      const opt = __spreadProps(__spreadValues({}, options), {
        payload
      });
      return createAction(
        actionType,
        __spreadProps(__spreadValues({}, opt), {
          semaphore: actionSemaphoreBucket[0] ? actionSemaphoreBucket[0] : [-1, -1, -1, -1],
          identity
        })
      );
    };
  }
  var nullActionType2 = "null";
  var muxiumConcludeType2 = "Muxium Conclude";
  var muxiumBadActionType3 = "Muxium Bad Action";
  var muxiumSetBlockingModeType2 = "Muxium Set Blocking Mode";
  function getSpecialSemaphore2(type) {
    switch (type) {
      case muxiumBadActionType3: {
        return 1;
      }
      case nullActionType2: {
        return 2;
      }
      case muxiumConcludeType2: {
        return 3;
      }
      case muxiumSetBlockingModeType2: {
        return 4;
      }
      // case muxiumOpenType: {
      //   return 5;
      // }
      default: {
        return 0;
      }
    }
  }
  function generateQualityIdentity2() {
    const randomNumber = Math.floor(Math.random() * 999999) + 1;
    const timestampInMilliseconds = Date.now();
    return timestampInMilliseconds * 1e6 + randomNumber;
  }
  function createAction2(type, options) {
    const special = getSpecialSemaphore2(type);
    const semaphore = (options == null ? void 0 : options.semaphore) !== void 0 ? options.semaphore : [0, 0, -1, special];
    if (options) {
      const {
        payload,
        keyedSelectors,
        agreement,
        conceptSemaphore,
        priority,
        origin
      } = options;
      return {
        type,
        identity: options.identity ? options.identity : generateQualityIdentity2(),
        semaphore: options.semaphore ? options.semaphore : semaphore,
        payload: payload ? payload : {},
        keyedSelectors,
        agreement,
        expiration: Date.now() + (agreement !== void 0 ? agreement : 5e3),
        conceptSemaphore,
        priority,
        origin
      };
    } else {
      return {
        type,
        identity: generateQualityIdentity2(),
        semaphore,
        expiration: Date.now() + 5e3,
        payload: {}
      };
    }
  }
  function muxiumPrepareActionCreator(actionType, actionSemaphoreBucket) {
    return (options) => {
      if (options) {
        return createAction2(
          actionType,
          __spreadProps(__spreadValues({}, options), {
            semaphore: actionSemaphoreBucket[0] ? actionSemaphoreBucket[0] : [-1, -1, -1, -1]
          })
        );
      }
      return createAction2(
        actionType,
        {
          semaphore: actionSemaphoreBucket[0] ? actionSemaphoreBucket[0] : [-1, -1, -1, -1]
        }
      );
    };
  }
  var muxiumConclude = muxiumPrepareActionCreator(
    muxiumConcludeType2,
    [[-1, -1, -1, getSpecialSemaphore2(muxiumConcludeType2)]]
  );
  function isNotPunctuated(str) {
    const punctuatedList = [".", ",", "?", "!", ";"];
    let notPunctuated = true;
    for (const punctuated of punctuatedList) {
      if (str.charAt(0) === punctuated) {
        notPunctuated = false;
        break;
      }
    }
    return notPunctuated;
  }
  function createSentence(actionNode, actionNotes) {
    const preposition = (actionNotes == null ? void 0 : actionNotes.preposition) !== void 0 ? `${actionNotes.preposition} ` : "";
    const body = `${actionNode.actionType}`;
    let denoter = ".";
    if ((actionNotes == null ? void 0 : actionNotes.denoter) !== void 0) {
      if (isNotPunctuated(actionNotes.denoter)) {
        denoter = ` ${actionNotes.denoter}`;
      } else {
        denoter = actionNotes.denoter;
      }
    }
    return preposition + body + denoter;
  }
  var mergeKeyedSelectors = (currentSelectors, nextSelectors) => {
    if (!currentSelectors && !nextSelectors) {
      return void 0;
    }
    if (!currentSelectors) {
      return nextSelectors;
    }
    if (!nextSelectors) {
      return currentSelectors;
    }
    const combined = [...currentSelectors, ...nextSelectors];
    const seenKeys = {};
    const uniqueSelectors = [];
    for (const selector of combined) {
      const key = selector.keys;
      if (!seenKeys[key]) {
        seenKeys[key] = 1;
        uniqueSelectors.push(selector);
      } else {
        seenKeys[key]++;
      }
    }
    return uniqueSelectors;
  };
  var strategyBegin = (strategy, data) => {
    const currentNode = strategy.currentNode;
    let priority;
    if (currentNode.priority) {
      priority = currentNode.priority;
    } else if (strategy.priority) {
      priority = strategy.priority;
    }
    strategy.currentNode.action = createAction(
      currentNode.actionType,
      {
        payload: currentNode.payload,
        keyedSelectors: currentNode.keyedSelectors,
        agreement: currentNode.agreement,
        semaphore: currentNode.semaphore,
        conceptSemaphore: currentNode.conceptSemaphore,
        priority
      }
    );
    strategy.currentNode.action.strategy = __spreadProps(__spreadValues({}, strategy), {
      topic: strategy.topic,
      data: data ? data : strategy.data,
      currentNode: strategy.currentNode,
      actionList: strategy.actionList,
      priority: strategy.priority,
      step: strategy.step ? strategy.step + 1 : 1
    });
    if (strategy.currentNode.action !== null) {
      return strategy.currentNode.action;
    } else {
      return muxiumConclude();
    }
  };
  var strategyConsumer = (_strategy, nextNode, defaultPreposition, notes, data) => {
    var _a, _b, _c, _d, _e, _f;
    const strategy = __spreadValues({}, _strategy);
    let nextAction;
    const actionListEntry = createSentence(
      strategy.currentNode,
      notes !== void 0 ? notes : { preposition: defaultPreposition }
    );
    if (nextNode !== null) {
      const origin = (_a = strategy.currentNode.action) == null ? void 0 : _a.origin;
      let priority;
      if (nextNode.priority) {
        priority = nextNode.priority;
      } else if (strategy.priority) {
        priority = strategy.priority;
      }
      const keyedSelectors = mergeKeyedSelectors(
        (_b = strategy.currentNode.action) == null ? void 0 : _b.keyedSelectors,
        nextNode.keyedSelectors
      );
      nextAction = createAction(
        nextNode.actionType,
        {
          payload: nextNode.payload,
          keyedSelectors,
          agreement: nextNode.agreement,
          semaphore: nextNode.semaphore,
          conceptSemaphore: nextNode.conceptSemaphore,
          priority,
          origin
        }
      );
      nextNode.action = nextAction;
      nextNode.lastActionNode = strategy.currentNode;
      nextAction.strategy = __spreadProps(__spreadValues({}, strategy), {
        topic: strategy.topic,
        data: data ? data : strategy.data,
        currentNode: nextNode,
        actionList: [...strategy.actionList, actionListEntry],
        step: strategy.step ? strategy.step + 1 : 1
      });
      return nextAction;
    } else {
      strategy.actionList = [...strategy.actionList, actionListEntry, "\n"];
      if (strategy.puntedStrategy !== void 0 && ((_c = strategy.puntedStrategy) == null ? void 0 : _c.length) !== 0) {
        const nextStrategy = strategy.puntedStrategy.shift();
        nextStrategy.puntedStrategy = strategy.puntedStrategy;
        const nextEntry = `${nextStrategy.topic}.`;
        nextStrategy.actionList = [
          ...strategy.actionList,
          nextEntry
        ];
        nextStrategy.stubs = strategy.stubs;
        nextStrategy.currentNode.lastActionNode = strategy.currentNode;
        const act2 = strategyBegin(nextStrategy);
        const keyedSelectors = mergeKeyedSelectors(
          (_d = strategy.currentNode.action) == null ? void 0 : _d.keyedSelectors,
          act2.keyedSelectors
        );
        act2.keyedSelectors = keyedSelectors;
        act2.origin = (_e = strategy.currentNode.action) == null ? void 0 : _e.origin;
        return act2;
      }
      const origin = (_f = strategy.currentNode.action) == null ? void 0 : _f.origin;
      const conclude = {
        actionType: muxiumConcludeType2,
        successNode: null,
        failureNode: null,
        lastActionNode: strategy.currentNode,
        priority: strategy.priority
      };
      conclude.action = createAction(conclude.actionType, {
        origin
      });
      conclude.action.priority = strategy.priority;
      conclude.action.strategy = __spreadProps(__spreadValues({}, strategy), {
        currentNode: conclude,
        data: data ? data : strategy.data,
        step: strategy.step ? strategy.step + 1 : 1
      });
      return conclude.action;
    }
  };
  var strategySuccess = (_strategy, data) => {
    return strategyConsumer(
      _strategy,
      _strategy.currentNode.successNode,
      "Success with",
      _strategy.currentNode.successNotes,
      data
    );
  };
  function generateQualityIdentity() {
    const randomNumber = Math.floor(Math.random() * 999999) + 1;
    const timestampInMilliseconds = Date.now();
    return timestampInMilliseconds * 1e6 + randomNumber;
  }
  function createQuality(actionType, actionSemaphoreBucket, actionCreator, bufferedActionCreator, reducer, methodCreator, keyedSelectors, meta, analytics) {
    return {
      actionType,
      actionCreator,
      qualityIdentity: generateQualityIdentity(),
      bufferedActionCreator,
      actionSemaphoreBucket,
      reducer,
      methodCreator,
      keyedSelectors,
      meta,
      analytics
    };
  }
  function defaultReducer(state, _) {
    return state;
  }
  defaultReducer.toString = () => "Default Reducer";
  function nullReducer(_, __) {
    return null;
  }
  nullReducer.toString = () => "Null Reducer";
  var defaultMethodCreator = () => (_concepts$, _semaphore) => {
    const defaultSubject = new import_rxjs.Subject();
    const defaultMethod = defaultSubject.pipe(
      (0, import_rxjs.map)((act2) => {
        if (act2.action.strategy) {
          return [strategySuccess(act2.action.strategy), false];
        }
        return [__spreadProps(__spreadValues({}, act2.action), {
          type: muxiumConcludeType2
        }), false];
      })
    );
    defaultMethod.toString = () => "Default Method";
    return [defaultMethod, defaultSubject];
  };
  function createQualityCard(q) {
    const bucket = [[-1, -Infinity, -1, -1]];
    const qualityIdentity = generateQualityIdentity();
    const actionCreator = prepareActionCreator(q.type, bucket, qualityIdentity);
    if (q.methodCreator) {
      return createQuality(
        q.type,
        bucket,
        actionCreator,
        (semaphoreBucket, identity) => prepareActionCreator(q.type, semaphoreBucket, identity),
        q.reducer,
        q.methodCreator,
        q.keyedSelectors,
        q.meta,
        q.analytics
      );
    }
    return createQuality(
      q.type,
      bucket,
      actionCreator,
      (semaphoreBucket, identity) => prepareActionCreator(q.type, semaphoreBucket, identity),
      q.reducer,
      q.methodCreator,
      q.keyedSelectors,
      q.meta,
      q.analytics
    );
  }
  function createQualityCardWithPayload(q) {
    const bucket = [[-1, -1, -1, -1]];
    const qualityIdentity = generateQualityIdentity();
    const actionCreatorWithPayload = prepareActionWithPayloadCreator(q.type, bucket, qualityIdentity);
    if (q.methodCreator) {
      return createQuality(
        q.type,
        bucket,
        actionCreatorWithPayload,
        (semaphoreBucket, identity) => prepareActionWithPayloadCreator(q.type, semaphoreBucket, identity),
        q.reducer,
        q.methodCreator,
        q.keyedSelectors,
        q.meta,
        q.analytics
      );
    }
    return createQuality(
      q.type,
      bucket,
      actionCreatorWithPayload,
      (semaphoreBucket, identity) => prepareActionWithPayloadCreator(q.type, semaphoreBucket, identity),
      q.reducer,
      q.methodCreator,
      q.keyedSelectors,
      q.meta,
      q.analytics
    );
  }
  var muxiumOpen = createQualityCardWithPayload({
    type: "Muxium Open",
    reducer: (_, action) => {
      const { open } = action.payload;
      return {
        open
      };
    },
    methodCreator: defaultMethodCreator
  });
  var muxiumBadAction = createQualityCardWithPayload({
    type: "Muxium Bad Action",
    reducer: (state, action) => {
      const payload = action.payload.badActions;
      if (state.logging) {
        console.log("Muxium Received a Bad Action: ", action, payload);
      }
      return {
        badActions: [
          ...state.badActions,
          ...payload
        ]
      };
    }
  });
  var muxiumClose = createQualityCardWithPayload({
    type: "Muxium Close",
    reducer: (state, action) => {
      const { exit } = action.payload;
      state.generalSubscribers.forEach((named) => named.subscription.unsubscribe());
      state.methodSubscribers.forEach((named) => named.subscription.unsubscribe());
      state.stagePlanners.forEach((named) => named.conclude());
      state.action$.complete();
      state.concepts$.complete();
      state.actionConcepts$.complete();
      if (exit) {
        process.exit();
      }
      return {
        methodSubscribers: [],
        generalSubscribers: [],
        stagePlanners: []
      };
    }
  });
  var recordReturn = (key, previous) => {
    return (obj) => {
      if (obj[key] !== void 0) {
        return previous(obj[key]);
      } else {
        return void 0;
      }
    };
  };
  var finalReturn = (key) => {
    return (obj) => {
      if (obj[key] !== void 0) {
        return obj[key];
      } else {
        return void 0;
      }
    };
  };
  var tupleReturn = (key, previous) => {
    return (obj) => {
      if (obj[key] !== void 0) {
        const previousSet = previous(obj);
        if (previousSet) {
          return [obj[key], ...previous(obj)];
        }
        return [obj[key]];
      } else {
        return void 0;
      }
    };
  };
  var finalTupleReturn = (key) => {
    return (obj) => {
      if (obj[key] !== void 0) {
        return [obj[key]];
      } else {
        return void 0;
      }
    };
  };
  var creation = (keys, index, length, prev) => {
    let previous = prev;
    let i = index;
    if (index === length - 1) {
      previous = finalReturn(keys[i]);
      i--;
    }
    if (i !== 0 && previous) {
      previous = recordReturn(keys[i], previous);
      return creation(keys, i - 1, length, previous);
    } else if (previous) {
      return previous;
    } else {
      return void 0;
    }
  };
  var setCreation = (keys, index, length, prev) => {
    let previous = prev;
    let i = index;
    if (index === length - 1) {
      previous = finalTupleReturn(keys[i]);
      i--;
    }
    if (i !== -1 && previous) {
      previous = tupleReturn(keys[i], previous);
      return setCreation(keys, i - 1, length, previous);
    } else if (previous) {
      return previous;
    } else {
      return void 0;
    }
  };
  var createConceptKeyedSelector = (conceptName, keys, setKeys) => {
    const selectorBase = [conceptName, ...keys.split(".")];
    if (setKeys) {
      return {
        conceptName,
        conceptSemaphore: -1,
        keys: conceptName + "." + keys,
        select: () => void 0,
        _selector: creation(selectorBase, selectorBase.length - 1, selectorBase.length),
        setKeys,
        setSelector: setCreation(setKeys, setKeys.length - 1, setKeys.length)
      };
    }
    return {
      conceptName,
      conceptSemaphore: -1,
      keys: conceptName + "." + keys,
      select: () => void 0,
      _selector: creation(selectorBase, selectorBase.length - 1, selectorBase.length),
      setKeys
    };
  };
  function selectPayload(action) {
    return action.payload;
  }
  var muxiumConclude2 = () => {
    return createAction("Muxium Conclude");
  };
  var createMethod = (method2) => () => {
    const defaultSubject = new import_rxjs2.Subject();
    const defaultMethod = defaultSubject.pipe(
      (0, import_rxjs2.map)(({ action, deck, self }) => {
        defaultMethod.toString = () => "Method: " + action.type;
        const methodAction = method2({ action, deck, self });
        if (methodAction.strategy) {
          return [methodAction, false];
        }
        const conclude = muxiumConclude2();
        return [__spreadValues(__spreadValues({}, action), conclude), false];
      })
    );
    defaultMethod.toString = () => "Method";
    return [defaultMethod, defaultSubject];
  };
  var createMethodWithConcepts = (methodWithConcepts) => (concepts$, semaphore) => {
    const defaultSubject = new import_rxjs2.Subject();
    const defaultMethod = defaultSubject.pipe(
      (0, import_rxjs2.withLatestFrom)(concepts$),
      (0, import_rxjs2.map)(([act2, concepts]) => {
        const { action, deck, self } = act2;
        defaultMethod.toString = () => "Method with Concepts: " + action.type;
        const methodAction = methodWithConcepts({ action, concepts_: concepts, deck, self, semaphore });
        if (methodAction.strategy) {
          return [methodAction, false];
        }
        const conclude = muxiumConclude2();
        return [__spreadValues(__spreadValues({}, act2), conclude), false];
      })
    );
    defaultMethod.toString = () => "Method with Concepts";
    return [defaultMethod, defaultSubject];
  };
  var muxiumLog = createQualityCard({
    type: "Muxium Log",
    reducer: nullReducer,
    methodCreator: () => createMethod(({ action }) => {
      console.log("Logging: ", action);
      if (action.strategy) {
        return strategySuccess(action.strategy);
      } else {
        return action;
      }
    })
  });
  var muxiumRegisterSubscriber = createQualityCardWithPayload({
    type: "Muxium Register Subscriber",
    reducer: (state, action) => {
      const payload = action.payload;
      const generalSubscribers = state.generalSubscribers;
      const subscription = payload.subscription;
      const name = payload.name;
      generalSubscribers.push({ name, subscription });
      return {
        generalSubscribers
      };
    },
    methodCreator: defaultMethodCreator
  });
  function createPrinciple$(principleFunc, concepts_, plan, subscribe, nextC, nextA, conceptSemaphore, d_, e_, c_, k_) {
    return new import_rxjs3.Observable(function(obs) {
      principleFunc({
        observer: obs,
        concepts_,
        plan,
        subscribe,
        nextC,
        nextA,
        d_,
        e_,
        c_,
        k_,
        conceptSemaphore
      });
    });
  }
  var tailWhip = (muxiumState) => {
    if (muxiumState.tailTimer.length === 0) {
      muxiumState.tailTimer.push(setTimeout(() => {
        muxiumState.action$.next(createAction("Muxium Kick"));
      }, 3));
    }
  };
  var createOrigin = ({ conceptName, originType, specificType }) => {
    let origin = conceptName + "+" + originType;
    if (specificType) {
      origin += "+" + specificType;
    }
    return origin;
  };
  var getMuxiumState = (concepts) => concepts[0].state;
  var accessMuxium = (concepts) => getMuxiumState(concepts).deck.d.muxium;
  var muxiumInitializePrinciples = createQualityCardWithPayload({
    type: "Muxium Initialize Principles",
    reducer: (state, act2) => {
      const payload = act2.payload;
      const concepts = payload.concepts;
      let conceptCounter = state.conceptCounter;
      const action$ = state.action$;
      const concepts$ = state.concepts$;
      const principleSubscribers = state.generalSubscribers;
      forEachConcept(concepts, (concept2, semaphore) => {
        if (concept2.name === muxiumName && concept2.principles) {
          concept2.principles.forEach((principle2, i) => {
            const observable2 = createPrinciple$(
              principle2,
              concepts,
              state.concepts$.innerPlan.bind(concepts$),
              state.concepts$.subscribe.bind(concepts$),
              state.concepts$.next.bind(concepts$),
              (action) => {
                action.origin = createOrigin({
                  conceptName: concept2.name,
                  originType: "principle-" + concept2.semaphore + "-" + i
                });
                state.action$.next(action);
              },
              semaphore,
              // concept.deck as unknown as Deck<unknown>,
              state.deck.d[concept2.name].d,
              concept2.actions,
              concept2.comparators,
              state.deck.d[concept2.name].k
            );
            principleSubscribers.push({
              name: concept2.name,
              subscription: observable2.subscribe((action) => action$.next(action))
            });
          });
          conceptCounter += 1;
        } else if (concept2.principles) {
          concept2.principles.forEach((principle2, i) => {
            const observable2 = createPrinciple$(
              principle2,
              concepts,
              concepts$.plan(concept2.semaphore).bind(concepts$),
              concepts$.subscribe.bind(concepts$),
              concepts$.next.bind(concepts$),
              (action) => {
                action.origin = createOrigin({
                  conceptName: concept2.name,
                  originType: "principle-" + concept2.semaphore + "-" + i
                });
                state.action$.next(action);
              },
              semaphore,
              state.deck.d[concept2.name].d,
              concept2.actions,
              concept2.comparators,
              state.deck.d[concept2.name].k
            );
            principleSubscribers.push({
              name: concept2.name,
              subscription: observable2.subscribe((action) => action$.next(action))
            });
          });
          conceptCounter += 1;
        }
      });
      return {
        principleSubscribers,
        conceptCounter
      };
    },
    methodCreator: defaultMethodCreator
  });
  var fillBucket = (body, bucket, action, _added = false) => {
    let added = _added;
    const drop = body.shift();
    if (drop) {
      if (drop.priority && action.priority) {
        if (drop.priority && drop.priority < action.priority && !added) {
          bucket.push(action);
          bucket.push(drop);
          added = true;
        } else {
          bucket.push(drop);
        }
      } else if (drop.priority === void 0 && !added) {
        bucket.push(action);
        bucket.push(drop);
        added = true;
      } else {
        bucket.push(drop);
      }
      fillBucket(body, bucket, action, added);
    } else if (!added) {
      bucket.push(action);
    }
  };
  var emptyBucket = (body, bucket) => {
    const drop = bucket.shift();
    if (drop) {
      body.push(drop);
      emptyBucket(body, bucket);
    }
  };
  var handlePriority = (muxiumState, action) => {
    const body = muxiumState.body;
    if (body[0] && body[0].priority !== void 0) {
      const bucket = [];
      fillBucket(body, bucket, action);
      emptyBucket(body, bucket);
    } else if (body[0]) {
      body.unshift(action);
    } else {
      body.push(action);
    }
  };
  var isPriorityValid = (action) => action.priority !== void 0 && action.priority !== 0;
  var handleTimedRun = (muxiumState, func, timed) => {
    func.forEach((f) => {
      const action = f();
      if (action.type !== "Conclude") {
        if (isPriorityValid(action)) {
          handlePriority(muxiumState, action);
        } else {
          muxiumState.tail.push(action);
        }
      }
    });
    muxiumState.timer.shift();
    muxiumState.timerLedger.delete(timed);
    const timerKeys = [];
    muxiumState.timerLedger.forEach((_, key) => {
      timerKeys.push(key);
    });
    if (timerKeys.length > 0) {
      const timerList = timerKeys.sort((a, b) => a - b);
      const slot = muxiumState.timerLedger.get(timerList[0]);
      if (slot) {
        const someTime = timerList[0] - Date.now();
        muxiumState.timer.push(setTimeout(() => handleTimedRun(muxiumState, slot, timerList[0]), someTime >= 0 ? someTime : 0));
      }
    }
    tailWhip(muxiumState);
  };
  var muxiumTimeOut = (concepts, func, timeOut) => {
    const timed = Date.now() + timeOut;
    const muxiumState = getMuxiumState(concepts);
    const ledger = muxiumState.timerLedger;
    const timer2 = muxiumState.timer.length > 0 ? muxiumState.timer[0] : void 0;
    if (timer2) {
      const timerKeys = [];
      muxiumState.timerLedger.forEach((_, key) => {
        timerKeys.push(key);
      });
      const timerList = timerKeys.sort((a, b) => a - b);
      if (timerList[0] > timed) {
        clearTimeout(timer2);
        muxiumState.timer.shift();
        const slot = muxiumState.timerLedger.get(timed);
        if (slot) {
          slot.push(func);
          muxiumState.timer.push(setTimeout(() => {
            handleTimedRun(muxiumState, slot, timed);
          }, timeOut));
        } else {
          ledger.set(timed, [func]);
          const slotted = ledger.get(timed);
          muxiumState.timer.push(setTimeout(() => {
            handleTimedRun(muxiumState, slotted, timed);
          }, timeOut));
        }
      } else {
        const slot = muxiumState.timerLedger.get(timed);
        if (slot) {
          slot.push(func);
          ledger.set(timed, slot);
        } else {
          ledger.set(timed, [func]);
        }
      }
    } else {
      ledger.set(timed, [func]);
      const slotted = ledger.get(timed);
      muxiumState.timer.push(setTimeout(() => {
        handleTimedRun(muxiumState, slotted, timed);
      }, timeOut));
    }
  };
  var blockingMethodSubscription = (concepts, tail, action) => {
    if (action.strategy && // Logical Determination: muxiumConcludeType
    action.semaphore[3] === 3) {
      const appendToDialog = accessMuxium(concepts).e.muxiumAppendActionListToDialog({
        actionList: action.strategy.actionList,
        strategyTopic: action.strategy.topic,
        strategyData: action.strategy.data
      });
      if (isPriorityValid(action)) {
        appendToDialog.priority = action.priority;
        const state = getMuxiumState(concepts);
        handlePriority(state, action);
        handlePriority(state, appendToDialog);
      } else {
        action.origin = "strategyTail";
        tail.push(action);
        tail.push(appendToDialog);
      }
    } else if (action.strategy && // Logical Determination: muxiumBadType
    action.semaphore[3] !== 1) {
      if (isPriorityValid(action)) {
        handlePriority(getMuxiumState(concepts), action);
      } else {
        tail.push(action);
      }
    }
  };
  var defaultMethodSubscription = (concepts, tail, action$, action, async) => {
    const muxiumState = getMuxiumState(concepts);
    if (action.strategy && // Logical Determination: muxiumConcludeType
    action.semaphore[3] === 3) {
      const appendToDialog = accessMuxium(concepts).e.muxiumAppendActionListToDialog({
        actionList: action.strategy.actionList,
        strategyTopic: action.strategy.topic,
        strategyData: action.strategy.data
      });
      if (isPriorityValid(action)) {
        const state = muxiumState;
        handlePriority(state, action);
        appendToDialog.priority = action.priority;
        handlePriority(state, appendToDialog);
      } else {
        tail.push(action);
        tail.push(appendToDialog);
      }
      if (async) {
        muxiumTimeOut(concepts, () => {
          return accessMuxium(concepts).e.muxiumKick();
        }, 0);
      } else {
        tailWhip(muxiumState);
      }
    } else if (action.strategy && // Logical Determination: muxiumBadType
    action.semaphore[3] !== 1) {
      if (isPriorityValid(action)) {
        handlePriority(muxiumState, action);
      } else {
        tail.push(action);
      }
      if (async) {
        muxiumTimeOut(concepts, () => {
          return accessMuxium(concepts).e.muxiumKick();
        }, 0);
      } else {
        tailWhip(muxiumState);
      }
    }
  };
  var muxiumSetBlockingMode = createQualityCardWithPayload({
    type: "Muxium Set Blocking Mode",
    reducer: (state, _action) => {
      let methodSubscribers = state.methodSubscribers;
      methodSubscribers.forEach((named) => named.subscription.unsubscribe());
      methodSubscribers = [];
      const payload = _action.payload;
      const concepts = payload.concepts;
      forEachConcept(concepts, (concept2) => {
        concept2.qualities.forEach((quality2) => {
          if (quality2.method) {
            const sub = quality2.method.subscribe(([action, _]) => {
              const tail = state.tail;
              blockingMethodSubscription(concepts, tail, action);
            });
            methodSubscribers.push({
              name: concept2.name,
              subscription: sub
            });
          }
        });
      });
      return {
        modeIndex: 0,
        methodSubscribers,
        open: false
      };
    },
    methodCreator: defaultMethodCreator
  });
  var muxiumSetDefaultMode = createQualityCardWithPayload({
    type: "Muxium Set Default Mode",
    reducer: (state, _action) => {
      let methodSubscribers = state.methodSubscribers;
      methodSubscribers.forEach((named) => named.subscription.unsubscribe());
      methodSubscribers = [];
      const payload = _action.payload;
      const concepts = payload.concepts;
      forEachConcept(concepts, (concept2) => {
        concept2.qualities.forEach((quality2) => {
          if (quality2.method) {
            const sub = quality2.method.subscribe(([action, async]) => {
              const tail = state.tail;
              defaultMethodSubscription(payload.concepts, tail, getMuxiumState(concepts).action$, action, async);
            });
            methodSubscribers.push({
              name: concept2.name,
              subscription: sub
            });
          }
        });
      });
      return {
        modeIndex: state.defaultModeIndex,
        methodSubscribers
      };
    },
    methodCreator: defaultMethodCreator
  });
  var muxiumAddConceptsFromQue = createQualityCard({
    type: "Muxium Add Concepts From Que",
    reducer: () => {
      return {
        addConceptQue: {}
      };
    },
    methodCreator: defaultMethodCreator
  });
  var muxiumAppendConceptsToAddQue = createQualityCardWithPayload({
    type: "Muxium Append Concepts To Add Que",
    reducer: (state, action) => {
      const payload = action.payload;
      const addConceptQue = __spreadValues(__spreadValues({}, state.addConceptQue), payload.concepts);
      return {
        addConceptQue
      };
    },
    methodCreator: defaultMethodCreator
  });
  var muxiumAppendConceptsToRemoveQue = createQualityCardWithPayload({
    type: "Muxium Append Concepts To Remove Que",
    reducer: (state, action) => {
      const payload = action.payload;
      let removeQue = state.removeConceptQue;
      removeQue = __spreadValues(__spreadValues({}, removeQue), payload.concepts);
      return {
        removeConceptQue: removeQue
      };
    },
    methodCreator: defaultMethodCreator
  });
  var muxiumRemoveConceptsViaQue = createQualityCard({
    type: "Muxium Remove Concepts Via Que",
    reducer: (state) => {
      const principleSubscribers = state.methodSubscribers;
      const newPrincipleSubscribers = [];
      const generalSubscribers = state.methodSubscribers;
      const newGeneralSubscribers = [];
      const stagePlanners = state.stagePlanners;
      const newStagePlanners = [];
      const removeConceptQue = state.removeConceptQue;
      const removeKeys = Object.keys(removeConceptQue);
      principleSubscribers.forEach((named) => {
        let exists = false;
        removeKeys.forEach((key) => {
          if (removeConceptQue[key].name === named.name) {
            exists = true;
          }
        });
        if (!exists) {
          newPrincipleSubscribers.push(named);
        } else {
          named.subscription.unsubscribe();
        }
      });
      generalSubscribers.forEach((named) => {
        let exists = false;
        removeKeys.forEach((key) => {
          if (removeConceptQue[key].name === named.name) {
            exists = true;
          }
        });
        if (!exists) {
          newGeneralSubscribers.push(named);
        } else {
          named.subscription.unsubscribe();
        }
      });
      stagePlanners.forEach((named) => {
        let exists = false;
        removeKeys.forEach((key) => {
          if (removeConceptQue[key].name === named.name) {
            exists = true;
          }
        });
        if (!exists) {
          newStagePlanners.push(named);
        } else {
          named.conclude();
        }
      });
      return {
        generalSubscribers: newGeneralSubscribers,
        stagePlanners: newStagePlanners,
        removeConceptQue: {}
      };
    },
    methodCreator: defaultMethodCreator
  });
  var muxiumAppendActionListToDialog = createQualityCardWithPayload({
    type: "Muxium Append Action List To Dialog",
    reducer: (state, action) => {
      const payload = action.payload;
      let newDialog = "";
      if (state.storeDialog) {
        payload.actionList.forEach((str) => {
          newDialog += str + " ";
        });
        if (state.logging) {
          console.log(newDialog);
        }
        return {
          dialog: state.dialog + newDialog,
          lastStrategy: payload.strategyTopic,
          lastStrategyActionList: payload.actionList,
          lastStrategyData: payload.strategyData,
          lastStrategyDialog: newDialog
        };
      }
      return {
        lastStrategy: payload.strategyTopic,
        lastStrategyActionList: payload.actionList,
        lastStrategyData: payload.strategyData
      };
    }
  });
  var muxiumSetMode = createQualityCardWithPayload({
    type: "Muxium Set Mode",
    reducer: (_, action) => {
      const payload = action.payload;
      return {
        modeIndex: payload.modeIndex
      };
    },
    methodCreator: () => createMethod(({ action }) => {
      const payload = action.payload;
      if (action.strategy) {
        action.strategy.currentNode.successNotes = {
          denoter: `to ${payload.modeName}.`
        };
        return strategySuccess(action.strategy);
      }
      return action;
    })
  });
  var muxiumSetDefaultModeIndex = createQualityCardWithPayload({
    type: "Muxium Set Default Mode Index",
    reducer: (_, action) => {
      const payload = action.payload;
      return {
        defaultModeIndex: payload.index
      };
    },
    methodCreator: defaultMethodCreator
  });
  var muxiumClearDialog = createQualityCard({
    type: "Muxium Clear Dialog",
    reducer: () => {
      return {
        dialog: ""
      };
    },
    methodCreator: defaultMethodCreator
  });
  var muxiumClearBadActionTypeFromBadActionList = createQualityCardWithPayload({
    type: "Muxium Clear Bad Action Type From Bad Action List",
    reducer: (state, action) => {
      const { actionType } = action.payload;
      return {
        badActions: state.badActions.filter((act2) => act2.type !== actionType)
      };
    },
    methodCreator: defaultMethodCreator
  });
  var muxiumClearBadStrategyTopicFromBadActionList = createQualityCardWithPayload({
    type: "Muxium Clear Bad Strategy Topic From Bad Action List",
    reducer: (state, action) => {
      const { topic } = action.payload;
      const badActions = state.badActions.filter((act2) => {
        if (act2.strategy && act2.strategy.topic !== topic) {
          return true;
        } else {
          return false;
        }
      });
      return {
        badActions
      };
    },
    methodCreator: defaultMethodCreator
  });
  var muxiumClearBadPlanFromBadPlanList = createQualityCardWithPayload({
    type: "Muxium Clear Bad Plan From Bad Plan List",
    reducer: (state, action) => {
      const { title } = action.payload;
      return {
        badPlans: state.badPlans.filter((act2) => act2.title !== title)
      };
    },
    methodCreator: defaultMethodCreator
  });
  var muxiumRegisterStagePlanner = createQualityCardWithPayload({
    type: "Muxium Register Stage Planner",
    reducer: (state, action) => {
      const payload = action.payload;
      const stagePlanners = state.stagePlanners;
      const stagePlanner = payload.stagePlanner;
      const name = payload.conceptName;
      stagePlanners.push(__spreadValues({ name }, stagePlanner));
      return {
        stagePlanners
      };
    },
    methodCreator: defaultMethodCreator
  });
  var muxiumUnregisterStagePlanner = createQualityCardWithPayload({
    type: "Muxium Unregister Stage Planner",
    reducer: (state, action) => {
      const { conceptName, title } = action.payload;
      return {
        stagePlanners: state.stagePlanners.filter(
          (planner) => !(planner.name === conceptName && planner.title === title)
        )
      };
    },
    methodCreator: defaultMethodCreator
  });
  var muxiumKick = createQualityCard({
    type: "Muxium Kick",
    reducer: defaultReducer,
    methodCreator: defaultMethodCreator
  });
  var muxiumPreClose = createQualityCardWithPayload({
    type: "Muxium Pre Close",
    reducer: (state, action) => ({
      prepareClose: true,
      exit: action.payload.exit
    })
  });
  var muxiumStitch = createQualityCard({
    type: "Muxium Stitch",
    reducer: defaultReducer,
    methodCreator: () => createMethod(({ action }) => {
      if (action.strategy) {
        const nextStrategy = strategySuccess(action.strategy);
        if (nextStrategy.strategy) {
          const actionList = nextStrategy.strategy.actionList;
          const newList = [];
          for (let i = 0; i < actionList.length - 1; i++) {
            newList.push(actionList[i]);
          }
          nextStrategy.strategy.actionList = newList;
        }
        return nextStrategy;
      } else {
        return action;
      }
    })
  });
  var muxiumRegisterTimeOut = createQualityCardWithPayload({
    type: "Muxium Register Time Out",
    reducer: defaultReducer,
    methodCreator: () => createMethodWithConcepts(({ action, concepts_ }) => {
      const {
        act: act2,
        timeOut
      } = action.payload;
      muxiumTimeOut(concepts_, () => act2, timeOut);
      if (action.strategy) {
        return strategySuccess(action.strategy);
      } else {
        return action;
      }
    })
  });
  var nullActionType3 = "null";
  var muxiumSelectOpen = createConceptKeyedSelector("muxium", "open");
  var muxiumSelectPrepareClose = createConceptKeyedSelector("muxium", "prepareClose");
  var muxiumSelectAddConceptQue = createConceptKeyedSelector("muxium", "addConceptQue");
  var muxiumSelectRemoveConceptQue = createConceptKeyedSelector("muxium", "removeConceptQue");
  var muxiumSelectLastStrategy = createConceptKeyedSelector("muxium", "lastStrategy");
  var muxiumSelectLastStrategyData = createConceptKeyedSelector("muxium", "lastStrategyData");
  var muxiumSelectLastStrategyDialog = createConceptKeyedSelector("muxium", "lastStrategyDialog");
  var muxiumSelectBadPlans = createConceptKeyedSelector("muxium", "badPlans");
  var muxiumSelectBadActions = createConceptKeyedSelector("muxium", "badActions");
  var strategyBackTrack = (_strategy) => {
    var _a, _b, _c, _d, _e;
    const strategy = _strategy;
    if (((_a = strategy.currentNode.lastActionNode) == null ? void 0 : _a.actionType) !== nullActionType3) {
      const newNode = strategy.currentNode.lastActionNode;
      if ((_c = (_b = newNode.action) == null ? void 0 : _b.strategy) == null ? void 0 : _c.actionList) {
        newNode.action.strategy.actionList = [
          ...newNode.action.strategy.actionList,
          strategy.actionList[strategy.actionList.length - 1]
        ];
        strategy.step = strategy.step ? strategy.step + 1 : 1;
      }
      const backTrackAction = __spreadValues({}, newNode.action);
      backTrackAction.keyedSelectors = mergeKeyedSelectors(
        backTrackAction.keyedSelectors,
        (_d = strategy.currentNode.action) == null ? void 0 : _d.keyedSelectors
      );
      return backTrackAction;
    } else {
      return muxiumConclude({ origin: (_e = _strategy.currentNode.action) == null ? void 0 : _e.origin });
    }
  };
  var createOwnershipLedger = () => /* @__PURE__ */ new Map();
  var ownershipInitializeOwnership = createQualityCard({
    type: "Ownership Initialize Ownership",
    reducer: () => ({ initialized: true }),
    methodCreator: defaultMethodCreator
  });
  var ownershipBackTrack = createQualityCard({
    type: "Ownership Back Track",
    reducer: nullReducer,
    methodCreator: () => createMethod(({ action }) => {
      if (action.strategy) {
        const newAction = strategyBackTrack(action.strategy);
        return newAction;
      } else {
        return action;
      }
    })
  });
  var ownershipClearPayloadStubs = createQualityCardWithPayload({
    type: "Ownership Clear Payload Stubs",
    reducer: (state, action) => {
      const stubs = selectPayload(action).stubs;
      const ownershipLedger = state.ownershipLedger;
      stubs.forEach((ticketStub) => {
        const line = ownershipLedger.get(ticketStub.key);
        if (line) {
          const newLine = [];
          for (const stub of line) {
            if (stub.ticket !== ticketStub.ticket) {
              newLine.push(stub);
            }
          }
          if (newLine.length === 0) {
            ownershipLedger.delete(ticketStub.key);
          } else {
            ownershipLedger.set(ticketStub.key, newLine);
          }
        }
      });
      return {
        ownershipLedger
      };
    },
    methodCreator: defaultMethodCreator
  });
  function hasLift(source) {
    return typeof (source == null ? void 0 : source.lift) === "function";
  }
  var observable = (() => typeof Symbol === "function" && Symbol.observable || "@@observable")();
  function operate(init) {
    return (source) => {
      if (hasLift(source)) {
        return source.lift(function(liftedSource) {
          try {
            return init(liftedSource, this);
          } catch (err) {
            this.error(err);
          }
        });
      }
      throw new TypeError("Unable to lift unknown Observable type");
    };
  }
  var OperatorSubscriber = class extends import_rxjs5.Subscriber {
    constructor(destination, onNext, onComplete, onError, onFinalize, shouldUnsubscribe) {
      super(destination);
      this.onFinalize = onFinalize;
      this.shouldUnsubscribe = shouldUnsubscribe;
      this._next = onNext ? function(value) {
        try {
          onNext(value);
        } catch (err) {
          destination.error(err);
        }
      } : super._next;
      this._error = onError ? function(err) {
        try {
          onError(err);
        } catch (error) {
          destination.error(error);
        } finally {
          this.unsubscribe();
        }
      } : super._error;
      this._complete = onComplete ? function() {
        try {
          onComplete();
        } catch (err) {
          destination.error(err);
        } finally {
          this.unsubscribe();
        }
      } : super._complete;
    }
    unsubscribe() {
      var _a;
      if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
        const { closed } = this;
        super.unsubscribe();
        !closed && ((_a = this.onFinalize) == null ? void 0 : _a.call(this));
      }
    }
  };
  function createOperatorSubscriber(destination, onNext, onComplete, onError, onFinalize) {
    return new OperatorSubscriber(destination, onNext, onComplete, onError, onFinalize);
  }
  function debounceAction(dueTime, scheduler = import_rxjs5.asyncScheduler) {
    return operate((source, subscriber) => {
      let activeTask = null;
      let lastValue = null;
      let lastTime = null;
      const emit = () => {
        if (activeTask) {
          activeTask.unsubscribe();
          activeTask = null;
          const value = lastValue;
          lastValue = null;
          subscriber.next(value);
        }
      };
      function emitWhenIdle() {
        const targetTime = lastTime + dueTime;
        const now = scheduler.now();
        if (now < targetTime) {
          activeTask = this.schedule(void 0, targetTime - now);
          subscriber.add(activeTask);
          return;
        }
        emit();
      }
      source.subscribe(
        createOperatorSubscriber(
          subscriber,
          (value) => {
            lastValue = value;
            lastTime = scheduler.now();
            if (!activeTask) {
              activeTask = scheduler.schedule(emitWhenIdle, dueTime);
              subscriber.add(activeTask);
            } else {
              const conclude = __spreadValues(__spreadValues({}, value), muxiumConclude());
              subscriber.next({
                action: conclude,
                deck: value.deck,
                self: value.self
              });
            }
          },
          () => {
            emit();
            subscriber.complete();
          },
          void 0,
          () => {
            lastValue = activeTask = null;
          }
        )
      );
    });
  }
  var muxiumConclude3 = () => {
    return createAction("Muxium Conclude");
  };
  var createMethodDebounce = (method2, duration) => (_concepts$, _semaphore) => {
    const defaultSubject = new import_rxjs4.Subject();
    const defaultMethod = defaultSubject.pipe(
      debounceAction(duration),
      (0, import_rxjs4.map)((act2) => {
        if (act2.action.semaphore[3] !== 3) {
          defaultMethod.toString = () => "Debounce Method: " + act2.action.type;
          const methodAction = method2(act2);
          if (methodAction.strategy) {
            return [methodAction, true];
          }
          const conclude = muxiumConclude3();
          return [__spreadValues(__spreadValues({}, act2.action), conclude), false];
        } else {
          return [act2.action, true];
        }
      })
    );
    defaultMethod.toString = () => "Debounce Method";
    return [defaultMethod, defaultSubject];
  };
  var ownershipClearStrategyStubsFromLedgerAndSelf = createQualityCard({
    type: "Ownership Clear Strategy Stubs From Ledger And Self",
    reducer: (state, action) => {
      var _a;
      const stubs = (_a = action == null ? void 0 : action.strategy) == null ? void 0 : _a.stubs;
      const ownershipLedger = state.ownershipLedger;
      if (action.strategy && stubs) {
        stubs.forEach((ticketStub) => {
          const line = ownershipLedger.get(ticketStub.key);
          if (line) {
            const newLine = [];
            for (const stub of line) {
              if (stub.ticket !== ticketStub.ticket) {
                newLine.push(stub);
              }
            }
            if (newLine.length === 0) {
              ownershipLedger.delete(ticketStub.key);
            } else {
              ownershipLedger.set(ticketStub.key, newLine);
            }
          }
        });
      }
      return {
        ownershipLedger
      };
    },
    methodCreator: () => createMethodDebounce(({ action }) => {
      if (action.strategy) {
        action.strategy.stubs = void 0;
        return strategySuccess(action.strategy);
      }
      return action;
    }, 10)
  });
  var ownershipClearPendingActions = createQualityCard({
    type: "Ownership Clear Pending Actions",
    reducer: () => ({ pendingActions: [] }),
    methodCreator: defaultMethodCreator
  });
  var ownershipClearPendingActionsOfStrategy = createQualityCardWithPayload({
    type: "Ownership Clear Pending Actions Of Strategy",
    reducer: (state, action) => {
      var _a;
      const { topic } = selectPayload(action);
      const newPendingActions = [];
      for (const act2 of state.pendingActions) {
        if ((_a = act2.strategy) == null ? void 0 : _a.topic) {
          if (act2.strategy.topic !== topic) {
            newPendingActions.push(act2);
          }
        }
      }
      return {
        pendingActions: newPendingActions
      };
    }
  });
  var ownershipResetOwnershipLedger = createQualityCard({
    type: "Ownership Reset Ownership Ledger",
    reducer: () => ({ ownershipLedger: createOwnershipLedger() }),
    methodCreator: defaultMethodCreator
  });
  var muxiumName = "muxium";
  var counterSelectCount = createConceptKeyedSelector("counter", "count");
  var counterAdd = createQualityCard({
    type: "Counter Add",
    reducer: (state) => {
      return {
        count: state.count + 1
      };
    },
    methodCreator: defaultMethodCreator,
    keyedSelectors: [counterSelectCount]
  });
  var counterSubtract = createQualityCard({
    type: "Counter Subtract",
    reducer: (state) => {
      return {
        count: state.count - 1
      };
    },
    methodCreator: defaultMethodCreator,
    keyedSelectors: [counterSelectCount]
  });
  var counterSetCount = createQualityCardWithPayload({
    type: "Counter Set Count",
    reducer: (state, { payload }) => {
      const { newCount } = payload;
      return {
        count: newCount
      };
    },
    methodCreator: defaultMethodCreator,
    keyedSelectors: [counterSelectCount]
  });
  var counterMultiply = createQualityCardWithPayload({
    type: "Counter Multiply",
    reducer: (state, { payload }) => {
      const { by } = payload;
      return {
        count: state.count * by
      };
    },
    methodCreator: defaultMethodCreator,
    keyedSelectors: [counterSelectCount]
  });
  var chainEnd = createQualityCard({
    type: "Chain End",
    reducer: (state) => {
      return {
        end: true
      };
    }
  });
  var chainPrepareChain = createQualityCardWithPayload({
    type: "Chain Prepare Chain",
    reducer: (state, { payload }) => {
      return {
        actionQue: [
          ...state.actionQue,
          ...payload.actions
        ]
      };
    }
  });
  var ownershipSelectLedger = createConceptKeyedSelector("ownership", "ownershipLedger");
  var ownershipSelectInitialized = createConceptKeyedSelector("ownership", "initialized");
  var experimentCheckInStrategy = createQualityCard({
    type: "Experiment Check In Strategy",
    reducer: (state, action) => {
      if (action.strategy) {
        const nextAction = strategySuccess(action.strategy);
        if (nextAction.type !== muxiumConcludeType2) {
          return {
            actionQue: [...state.actionQue, nextAction]
          };
        }
      }
      return {};
    }
  });

  // src/concepts/round8/qualities/createCalculator.quality.ts
  var round8CreateCalculator = createQualityCardWithPayload({
    type: "Round8 Create Calculator",
    // Verbose split naming convention
    reducer: (state, action) => {
      const { name = `Calculator ${state.calculators.length + 1}` } = action.payload;
      const id = `calc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const zeroBuffer = r8_.terminology.createBuffer();
      const zeroBinary = r8_.createBufferDisplay(zeroBuffer);
      const zeroDisplay = r8_.createRoundDisplay(zeroBuffer);
      const newCalculator = {
        id,
        name,
        input1: {
          value: zeroDisplay,
          buffer: zeroBuffer,
          binary: zeroBinary
        },
        input2: {
          value: zeroDisplay,
          buffer: zeroBuffer,
          binary: zeroBinary
        },
        output: {
          value: zeroDisplay,
          buffer: zeroBuffer,
          binary: zeroBinary
        },
        operation: null,
        activeInput: "input1",
        darkMode: state.globalDarkMode,
        history: []
      };
      return {
        calculators: [...state.calculators, newCalculator]
      };
    },
    methodCreator: defaultMethodCreator
  });

  // src/concepts/round8/qualities/inputDigit.quality.ts
  var round8InputDigit = createQualityCardWithPayload({
    type: "Round8 Input Digit",
    // Verbose split naming convention
    reducer: (state, action) => {
      const { calculatorId, digit } = action.payload;
      const calcIndex = state.calculators.findIndex((c) => c.id === calculatorId);
      if (calcIndex === -1) {
        return {};
      }
      const calculator = state.calculators[calcIndex];
      const inputState = calculator[calculator.activeInput];
      const currentSequence = inputState.value;
      const isZeroState = !currentSequence || currentSequence === "0" || currentSequence === "" || currentSequence === "-0";
      const newSequence = isZeroState ? `${digit}` : `${currentSequence}${digit}`;
      const buffer = r8_.parseStringToBuffer(newSequence);
      if (!buffer) {
        return {};
      }
      const binary = r8_.createBufferDisplay(buffer);
      const displayValue = r8_.createRoundDisplay(buffer);
      const updatedCalculator = {
        ...calculator,
        [calculator.activeInput]: {
          value: displayValue,
          buffer,
          binary
        }
      };
      return {
        calculators: [
          ...state.calculators.slice(0, calcIndex),
          updatedCalculator,
          ...state.calculators.slice(calcIndex + 1)
        ]
      };
    },
    methodCreator: defaultMethodCreator
  });

  // src/concepts/round8/qualities/setOperation.quality.ts
  var round8SetOperation = createQualityCardWithPayload({
    type: "Round8 Set Operation",
    // Verbose split naming convention
    reducer: (state, action) => {
      const { calculatorId, operation } = action.payload;
      const calcIndex = state.calculators.findIndex((c) => c.id === calculatorId);
      if (calcIndex === -1) {
        return {};
      }
      const calculator = state.calculators[calcIndex];
      const updatedCalculator = {
        ...calculator,
        operation
      };
      return {
        calculators: [
          ...state.calculators.slice(0, calcIndex),
          updatedCalculator,
          ...state.calculators.slice(calcIndex + 1)
        ]
      };
    },
    methodCreator: defaultMethodCreator
  });

  // src/concepts/round8/qualities/calculate.quality.ts
  var round8Calculate = createQualityCardWithPayload({
    type: "Round8 Calculate",
    // Verbose split naming convention
    reducer: (state, action) => {
      const { calculatorId } = action.payload;
      const calcIndex = state.calculators.findIndex((c) => c.id === calculatorId);
      if (calcIndex === -1) {
        return {};
      }
      const calculator = state.calculators[calcIndex];
      if (!calculator.operation) {
        console.warn("Round8 Calculator: No operation selected");
        return {};
      }
      const buffer1 = calculator.input1.buffer;
      const buffer2 = calculator.input2.buffer;
      const operation = calculator.operation;
      let result = 0n;
      if (operation === "+") {
        result = r8_.operations.add(buffer1, buffer2);
      } else if (operation === "-") {
        result = r8_.operations.subtract(buffer1, buffer2);
      } else if (operation === ">") {
        result = buffer1 > buffer2 ? 1n : 0n;
      } else if (operation === "<") {
        result = buffer1 < buffer2 ? 1n : 0n;
      } else if (operation === ">=") {
        result = buffer1 >= buffer2 ? 1n : 0n;
      } else if (operation === "<=") {
        result = buffer1 <= buffer2 ? 1n : 0n;
      } else if (operation === "==") {
        result = buffer1 === buffer2 ? 1n : 0n;
      } else if (operation === "!=") {
        result = buffer1 !== buffer2 ? 1n : 0n;
      } else {
        console.warn(`Round8 Calculator: Operation not yet implemented: ${operation}`);
        return {};
      }
      const historyEntry = {
        timestamp: Date.now(),
        operation,
        input1: calculator.input1.value,
        input2: calculator.input2.value,
        result: r8_.createRoundDisplay(result)
      };
      const updatedCalculator = {
        ...calculator,
        output: {
          buffer: result,
          binary: r8_.createBufferDisplay(result),
          value: r8_.createRoundDisplay(result)
        },
        history: [...calculator.history, historyEntry]
      };
      return {
        calculators: [
          ...state.calculators.slice(0, calcIndex),
          updatedCalculator,
          ...state.calculators.slice(calcIndex + 1)
        ]
      };
    },
    methodCreator: defaultMethodCreator
  });

  // src/concepts/round8/qualities/clear.quality.ts
  var round8Clear = createQualityCardWithPayload({
    type: "Round8 Clear",
    // Verbose split naming convention
    reducer: (state, action) => {
      const { calculatorId } = action.payload;
      const calcIndex = state.calculators.findIndex((c) => c.id === calculatorId);
      if (calcIndex === -1) {
        return {};
      }
      const calculator = state.calculators[calcIndex];
      const zeroBuffer = r8_.terminology.createBuffer();
      const zeroBinary = r8_.createBufferDisplay(zeroBuffer);
      const zeroDisplay = r8_.createRoundDisplay(zeroBuffer);
      const updatedCalculator = {
        ...calculator,
        input1: {
          value: zeroDisplay,
          buffer: zeroBuffer,
          binary: zeroBinary
        },
        input2: {
          value: zeroDisplay,
          buffer: zeroBuffer,
          binary: zeroBinary
        },
        output: {
          value: zeroDisplay,
          buffer: zeroBuffer,
          binary: zeroBinary
        },
        operation: null,
        activeInput: "input1"
      };
      return {
        calculators: [
          ...state.calculators.slice(0, calcIndex),
          updatedCalculator,
          ...state.calculators.slice(calcIndex + 1)
        ]
      };
    },
    methodCreator: defaultMethodCreator
  });

  // src/concepts/round8/qualities/switchInput.quality.ts
  var round8SwitchInput = createQualityCardWithPayload({
    type: "Round8 Switch Input",
    // Verbose split naming convention
    reducer: (state, action) => {
      const { calculatorId } = action.payload;
      const calcIndex = state.calculators.findIndex((c) => c.id === calculatorId);
      if (calcIndex === -1) {
        return {};
      }
      const calculator = state.calculators[calcIndex];
      const updatedCalculator = {
        ...calculator,
        activeInput: calculator.activeInput === "input1" ? "input2" : "input1"
      };
      return {
        calculators: [
          ...state.calculators.slice(0, calcIndex),
          updatedCalculator,
          ...state.calculators.slice(calcIndex + 1)
        ]
      };
    },
    methodCreator: defaultMethodCreator
  });

  // src/concepts/round8/qualities/toggleSign.quality.ts
  var round8ToggleSign = createQualityCardWithPayload({
    type: "Round8 Toggle Sign",
    // Verbose split naming convention
    reducer: (state, action) => {
      const { calculatorId } = action.payload;
      const calcIndex = state.calculators.findIndex((c) => c.id === calculatorId);
      if (calcIndex === -1) {
        return {};
      }
      const calculator = state.calculators[calcIndex];
      const inputState = calculator[calculator.activeInput];
      const flipped = r8_.terminology.flipSignBit(inputState.buffer);
      const binary = r8_.createBufferDisplay(flipped);
      const displayValue = r8_.createRoundDisplay(flipped);
      const updatedCalculator = {
        ...calculator,
        [calculator.activeInput]: {
          value: displayValue,
          buffer: flipped,
          binary
        }
      };
      return {
        calculators: [
          ...state.calculators.slice(0, calcIndex),
          updatedCalculator,
          ...state.calculators.slice(calcIndex + 1)
        ]
      };
    },
    methodCreator: defaultMethodCreator
  });

  // src/concepts/round8/qualities/increment.quality.ts
  var round8Increment = createQualityCardWithPayload({
    type: "Round8 Increment",
    // Verbose split naming convention
    reducer: (state, action) => {
      const { calculatorId } = action.payload;
      const calcIndex = state.calculators.findIndex((c) => c.id === calculatorId);
      if (calcIndex === -1) {
        return {};
      }
      const calculator = state.calculators[calcIndex];
      const inputState = calculator[calculator.activeInput];
      const incremented = r8_.operations.increment(inputState.buffer);
      const binary = r8_.createBufferDisplay(incremented);
      const displayValue = r8_.createRoundDisplay(incremented);
      const updatedCalculator = {
        ...calculator,
        [calculator.activeInput]: {
          value: displayValue,
          buffer: incremented,
          binary
        }
      };
      return {
        calculators: [
          ...state.calculators.slice(0, calcIndex),
          updatedCalculator,
          ...state.calculators.slice(calcIndex + 1)
        ]
      };
    },
    methodCreator: defaultMethodCreator
  });

  // src/concepts/round8/qualities/decrement.quality.ts
  var round8Decrement = createQualityCardWithPayload({
    type: "Round8 Decrement",
    // Verbose split naming convention
    reducer: (state, action) => {
      const { calculatorId } = action.payload;
      const calcIndex = state.calculators.findIndex((c) => c.id === calculatorId);
      if (calcIndex === -1) {
        return {};
      }
      const calculator = state.calculators[calcIndex];
      const inputState = calculator[calculator.activeInput];
      const decremented = r8_.operations.decrement(inputState.buffer);
      const binary = r8_.createBufferDisplay(decremented);
      const displayValue = r8_.createRoundDisplay(decremented);
      const updatedCalculator = {
        ...calculator,
        [calculator.activeInput]: {
          value: displayValue,
          buffer: decremented,
          binary
        }
      };
      return {
        calculators: [
          ...state.calculators.slice(0, calcIndex),
          updatedCalculator,
          ...state.calculators.slice(calcIndex + 1)
        ]
      };
    },
    methodCreator: defaultMethodCreator
  });

  // src/concepts/round8/qualities/deleteCalculator.quality.ts
  var round8DeleteCalculator = createQualityCardWithPayload({
    type: "Round8 Delete Calculator",
    // Verbose split naming convention
    reducer: (state, action) => {
      const { calculatorId } = action.payload;
      const calcIndex = state.calculators.findIndex((c) => c.id === calculatorId);
      if (calcIndex === -1) {
        return {};
      }
      const updatedCalculators = [
        ...state.calculators.slice(0, calcIndex),
        ...state.calculators.slice(calcIndex + 1)
      ];
      return {
        calculators: updatedCalculators
      };
    },
    methodCreator: defaultMethodCreator
  });

  // src/concepts/round8/qualities/backspace.quality.ts
  var round8Backspace = createQualityCardWithPayload({
    type: "Round8 Backspace",
    // Verbose split naming convention
    reducer: (state, action) => {
      const { calculatorId } = action.payload;
      const calcIndex = state.calculators.findIndex((c) => c.id === calculatorId);
      if (calcIndex === -1) {
        return {};
      }
      const calculator = state.calculators[calcIndex];
      const inputState = calculator[calculator.activeInput];
      const currentSequence = inputState.value;
      if (!currentSequence) {
        return {};
      }
      const newSequence = currentSequence.slice(0, -1);
      let buffer;
      let binary;
      let displayValue;
      if (newSequence === "" || newSequence === "-") {
        buffer = r8_.terminology.createBuffer();
        binary = r8_.createBufferDisplay(buffer);
        displayValue = r8_.createRoundDisplay(buffer);
      } else {
        const parsedBuffer = r8_.parseStringToBuffer(newSequence);
        buffer = parsedBuffer || r8_.terminology.createBuffer();
        binary = r8_.createBufferDisplay(buffer);
        displayValue = r8_.createRoundDisplay(buffer);
      }
      const updatedCalculator = {
        ...calculator,
        [calculator.activeInput]: {
          value: displayValue,
          buffer,
          binary
        }
      };
      return {
        calculators: [
          ...state.calculators.slice(0, calcIndex),
          updatedCalculator,
          ...state.calculators.slice(calcIndex + 1)
        ]
      };
    },
    methodCreator: defaultMethodCreator
  });

  // src/index.ts
  var r8_2 = {
    ...r8_,
    createCalculator: r8Calculator
  };

  // demo/calculator.ts
  function updateInputDisplay(calc, inputNumber) {
    const inputState = inputNumber === 1 ? calc.state.input1 : calc.state.input2;
    const valueElement = document.getElementById(`input${inputNumber}Value`);
    if (valueElement) {
      valueElement.textContent = inputState.value || "";
    }
    const binaryElement = document.getElementById(`input${inputNumber}Binary`);
    if (binaryElement) {
      binaryElement.textContent = inputState.binary || "";
    }
  }
  function updateOutputDisplay(calc) {
    const outputState = calc.state.output;
    const valueElement = document.getElementById("outputValue");
    if (valueElement) {
      valueElement.textContent = outputState.value || "";
    }
    const binaryElement = document.getElementById("outputBinary");
    if (binaryElement) {
      binaryElement.textContent = outputState.binary || "";
    }
  }
  function updateOperationDisplay(calc) {
    const operation = calc.state.operation;
    const symbolElement = document.getElementById("operandSymbol");
    const buttonElement = document.getElementById("operandButton");
    const operandRow = document.getElementById("operandRow");
    if (!operation) {
      if (symbolElement) {
        symbolElement.textContent = "\u25CB";
      }
      if (buttonElement) {
        buttonElement.className = "hifi-btn-obsidian";
        buttonElement.setAttribute("disabled", "true");
        buttonElement.setAttribute("title", "Suite 0: Obsidian - Foundational State");
      }
      if (operandRow) {
        operandRow.removeAttribute("data-operation");
      }
      return;
    }
    const operationMap = {
      "+": { symbol: "+", btnClass: "hifi-btn-add", title: "Addition - Rust: Prospection" },
      "-": { symbol: "\u2212", btnClass: "hifi-btn-subtract", title: "Subtraction - Rose: Healing" },
      ">": { symbol: ">", btnClass: "hifi-btn-compare", title: "Greater Than - Amethyst: Operations" },
      "<": { symbol: "<", btnClass: "hifi-btn-compare", title: "Less Than - Amethyst: Operations" },
      ">=": { symbol: "\u2265", btnClass: "hifi-btn-compare", title: "Greater or Equal - Amethyst: Operations" },
      "<=": { symbol: "\u2264", btnClass: "hifi-btn-compare", title: "Less or Equal - Amethyst: Operations" },
      "==": { symbol: "=", btnClass: "hifi-btn-compare", title: "Equals - Amethyst: Operations" },
      "!=": { symbol: "\u2260", btnClass: "hifi-btn-compare", title: "Not Equal - Amethyst: Operations" }
    };
    const display = operationMap[operation];
    if (symbolElement) {
      symbolElement.textContent = display.symbol;
    }
    if (buttonElement) {
      buttonElement.className = display.btnClass;
      buttonElement.removeAttribute("disabled");
      buttonElement.setAttribute("title", display.title);
    }
    if (operandRow) {
      operandRow.setAttribute("data-operation", operation);
    }
  }
  function updateActiveInputHighlight(calc) {
    document.querySelectorAll(".input-row").forEach((row) => {
      row.classList.remove("input-row-active");
      const cursor = row.querySelector(".input-cursor");
      if (cursor) {
        cursor.style.opacity = "0";
      }
    });
    const activeRow = document.querySelector(`[data-input="${calc.state.activeInput}"]`);
    if (activeRow) {
      activeRow.classList.add("input-row-active");
      const cursor = activeRow.querySelector(".input-cursor");
      if (cursor) {
        cursor.style.opacity = "1";
      }
    }
  }
  function bindRotationButton(buttonId, handler, updateDisplay) {
    const button = document.getElementById(buttonId);
    if (button) {
      button.addEventListener("click", () => {
        handler();
        updateDisplay();
      });
    }
  }
  function initializeCalculator() {
    const calc = r8_2.createCalculator();
    if (typeof window !== "undefined") {
      if (!window.r8) {
        window.r8 = r8_2;
        console.log("\u{1F527} Round8 Breadboard API exposed to console");
        console.log("   Access via: window.r8");
        console.log("   Example: window.r8.operations.add(5n, 3n)");
      } else {
        console.warn("\u26A0\uFE0F  window.r8 already exists - skipping Round8 API exposure");
      }
      if (!window.calculator) {
        window.calculator = calc;
        console.log("\u{1F4CA} Calculator Instance exposed to console");
        console.log("   Access via: window.calculator");
        console.log("   Example: window.calculator.state.input1.buffer");
      } else {
        console.warn("\u26A0\uFE0F  window.calculator already exists - skipping calculator exposure");
      }
    }
    for (let i = 1; i <= 8; i++) {
      const button = document.querySelector(`[data-position="${i}"]`);
      if (button) {
        button.addEventListener("click", () => {
          calc.handleDigitEntry(i);
          const inputNum = calc.state.activeInput === "input1" ? 1 : 2;
          updateInputDisplay(calc, inputNum);
        });
      }
    }
    const backspaceBtn = document.getElementById("backspaceBtn");
    if (backspaceBtn) {
      backspaceBtn.addEventListener("click", () => {
        calc.handleBackspace();
        const inputNum = calc.state.activeInput === "input1" ? 1 : 2;
        updateInputDisplay(calc, inputNum);
      });
    }
    const zeroBtn = document.getElementById("zeroBtn");
    if (zeroBtn) {
      zeroBtn.addEventListener("click", () => {
        calc.handleZero();
        const inputNum = calc.state.activeInput === "input1" ? 1 : 2;
        updateInputDisplay(calc, inputNum);
      });
    }
    const signedBtn = document.getElementById("signedBtn");
    if (signedBtn) {
      signedBtn.addEventListener("click", () => {
        calc.handleSigned();
        const inputNum = calc.state.activeInput === "input1" ? 1 : 2;
        updateInputDisplay(calc, inputNum);
      });
    }
    bindRotationButton(
      "incrementInput1Btn",
      () => {
        calc.state.activeInput = "input1";
        calc.handleIncrement();
      },
      () => updateInputDisplay(calc, 1)
    );
    bindRotationButton(
      "decrementInput1Btn",
      () => {
        calc.state.activeInput = "input1";
        calc.handleDecrement();
      },
      () => updateInputDisplay(calc, 1)
    );
    bindRotationButton(
      "incrementInput2Btn",
      () => {
        calc.state.activeInput = "input2";
        calc.handleIncrement();
      },
      () => updateInputDisplay(calc, 2)
    );
    bindRotationButton(
      "decrementInput2Btn",
      () => {
        calc.state.activeInput = "input2";
        calc.handleDecrement();
      },
      () => updateInputDisplay(calc, 2)
    );
    const addBtn = document.getElementById("addBtn");
    if (addBtn) {
      addBtn.addEventListener("click", () => {
        calc.handleOperation("+");
        updateOperationDisplay(calc);
      });
    }
    const subtractBtn = document.getElementById("subtractBtn");
    if (subtractBtn) {
      subtractBtn.addEventListener("click", () => {
        calc.handleOperation("-");
        updateOperationDisplay(calc);
      });
    }
    const greaterBtn = document.getElementById("greaterBtn");
    if (greaterBtn) {
      greaterBtn.addEventListener("click", () => {
        calc.handleOperation(">");
        updateOperationDisplay(calc);
      });
    }
    const greaterEqualBtn = document.getElementById("greaterEqualBtn");
    if (greaterEqualBtn) {
      greaterEqualBtn.addEventListener("click", () => {
        calc.handleOperation(">=");
        updateOperationDisplay(calc);
      });
    }
    const lessBtn = document.getElementById("lessBtn");
    if (lessBtn) {
      lessBtn.addEventListener("click", () => {
        calc.handleOperation("<");
        updateOperationDisplay(calc);
      });
    }
    const lessEqualBtn = document.getElementById("lessEqualBtn");
    if (lessEqualBtn) {
      lessEqualBtn.addEventListener("click", () => {
        calc.handleOperation("<=");
        updateOperationDisplay(calc);
      });
    }
    const equalsBtn = document.getElementById("equalsBtn");
    if (equalsBtn) {
      equalsBtn.addEventListener("click", () => {
        calc.handleOperation("==");
        updateOperationDisplay(calc);
      });
    }
    const calculateBtn = document.getElementById("calculateBtn");
    if (calculateBtn) {
      calculateBtn.addEventListener("click", () => {
        calc.handleCalculate();
        updateOutputDisplay(calc);
        const outputRow = document.getElementById("outputRow");
        if (outputRow) {
          outputRow.classList.add("output-row-active");
        }
      });
    }
    const clearBtn = document.getElementById("clearBtn");
    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        calc.handleClear();
        updateInputDisplay(calc, 1);
        updateInputDisplay(calc, 2);
        updateOutputDisplay(calc);
        updateOperationDisplay(calc);
        const outputRow = document.getElementById("outputRow");
        if (outputRow) {
          outputRow.classList.remove("output-row-active");
        }
      });
    }
    const flipBtn = document.getElementById("flipBtn");
    if (flipBtn) {
      flipBtn.addEventListener("click", () => {
        calc.handleInputSwitch();
        updateActiveInputHighlight(calc);
      });
    }
    const input1Row = document.getElementById("input1Row");
    if (input1Row) {
      input1Row.addEventListener("click", () => {
        if (calc.state.activeInput !== "input1") {
          calc.handleInputSwitch();
          updateActiveInputHighlight(calc);
        }
      });
    }
    const input2Row = document.getElementById("input2Row");
    if (input2Row) {
      input2Row.addEventListener("click", () => {
        if (calc.state.activeInput !== "input2") {
          calc.handleInputSwitch();
          updateActiveInputHighlight(calc);
        }
      });
    }
    updateActiveInputHighlight(calc);
    calc.state.activeInput = "input1";
    calc.handleZero();
    updateInputDisplay(calc, 1);
    calc.state.activeInput = "input2";
    calc.handleZero();
    updateInputDisplay(calc, 2);
    calc.state.output.value = "0";
    calc.state.output.buffer = 0n;
    calc.state.output.binary = r8_2.createBufferDisplay(0n);
    updateOutputDisplay(calc);
    calc.state.activeInput = "input1";
    updateActiveInputHighlight(calc);
    console.log("Calculator UI bindings initialized");
    console.log("Round8 Calculator v0.0.14 - Display reactivity enabled");
  }
  if (typeof window !== "undefined") {
    if (document.readyState === "complete" || document.readyState === "interactive") {
      initializeCalculator();
    } else {
      document.addEventListener("DOMContentLoaded", initializeCalculator);
    }
  }
  return __toCommonJS(calculator_exports);
})();
/**
 * Round8 v0.0.15 - Stratimux Concept Integration
 *
 * Pure binary operations using spool-based indexed lookups.
 * NO binary operand calculations (shifts/OR/AND).
 * Dual display: Round8 string + Binary representation.
 *
 * New in v0.0.15:
 * - Stratimux Concept for muxified state management
 * - Flat array calculator architecture (unlimited instances)
 * - Calculator routing via unique ID system
 * - All qualities traverse shared r8_ manifold
 *
 * Previous v0.0.14:
 * - Increment/Decrement operations (composing functions)
 * - Organized API: operations, logical, anor, conference, terminology
 * - Critical developer types exported (BitRotationTuple, WrungMuxity, ResultMuxity)
 *
 * @module round8
 * @version 0.0.15
 * @license GPL-3.0
 */
