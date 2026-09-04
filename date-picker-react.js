(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: !0 });
  }, __copyProps = (to, from, except, desc) => {
    if (from && typeof from == "object" || typeof from == "function")
      for (let key of __getOwnPropNames(from))
        !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: !0 }) : target,
    mod
  ));

  // node_modules/react/cjs/react.production.js
  var require_react_production = __commonJS({
    "node_modules/react/cjs/react.production.js"(exports) {
      "use strict";
      var REACT_ELEMENT_TYPE = /* @__PURE__ */ Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = /* @__PURE__ */ Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = /* @__PURE__ */ Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = /* @__PURE__ */ Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = /* @__PURE__ */ Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = /* @__PURE__ */ Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = /* @__PURE__ */ Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = /* @__PURE__ */ Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = /* @__PURE__ */ Symbol.for("react.suspense"), REACT_MEMO_TYPE = /* @__PURE__ */ Symbol.for("react.memo"), REACT_LAZY_TYPE = /* @__PURE__ */ Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = /* @__PURE__ */ Symbol.for("react.activity"), MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
      function getIteratorFn(maybeIterable) {
        return maybeIterable === null || typeof maybeIterable != "object" ? null : (maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"], typeof maybeIterable == "function" ? maybeIterable : null);
      }
      var ReactNoopUpdateQueue = {
        isMounted: function() {
          return !1;
        },
        enqueueForceUpdate: function() {
        },
        enqueueReplaceState: function() {
        },
        enqueueSetState: function() {
        }
      }, assign = Object.assign, emptyObject = {};
      function Component(props, context, updater) {
        this.props = props, this.context = context, this.refs = emptyObject, this.updater = updater || ReactNoopUpdateQueue;
      }
      Component.prototype.isReactComponent = {};
      Component.prototype.setState = function(partialState, callback) {
        if (typeof partialState != "object" && typeof partialState != "function" && partialState != null)
          throw Error(
            "takes an object of state variables to update or a function which returns an object of state variables."
          );
        this.updater.enqueueSetState(this, partialState, callback, "setState");
      };
      Component.prototype.forceUpdate = function(callback) {
        this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
      };
      function ComponentDummy() {
      }
      ComponentDummy.prototype = Component.prototype;
      function PureComponent(props, context, updater) {
        this.props = props, this.context = context, this.refs = emptyObject, this.updater = updater || ReactNoopUpdateQueue;
      }
      var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
      pureComponentPrototype.constructor = PureComponent;
      assign(pureComponentPrototype, Component.prototype);
      pureComponentPrototype.isPureReactComponent = !0;
      var isArrayImpl = Array.isArray;
      function noop() {
      }
      var ReactSharedInternals = { H: null, A: null, T: null, S: null }, hasOwnProperty = Object.prototype.hasOwnProperty;
      function ReactElement(type, key, props) {
        var refProp = props.ref;
        return {
          $$typeof: REACT_ELEMENT_TYPE,
          type,
          key,
          ref: refProp !== void 0 ? refProp : null,
          props
        };
      }
      function cloneAndReplaceKey(oldElement, newKey) {
        return ReactElement(oldElement.type, newKey, oldElement.props);
      }
      function isValidElement(object) {
        return typeof object == "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
      }
      function escape(key) {
        var escaperLookup = { "=": "=0", ":": "=2" };
        return "$" + key.replace(/[=:]/g, function(match3) {
          return escaperLookup[match3];
        });
      }
      var userProvidedKeyEscapeRegex = /\/+/g;
      function getElementKey(element, index) {
        return typeof element == "object" && element !== null && element.key != null ? escape("" + element.key) : index.toString(36);
      }
      function resolveThenable(thenable) {
        switch (thenable.status) {
          case "fulfilled":
            return thenable.value;
          case "rejected":
            throw thenable.reason;
          default:
            switch (typeof thenable.status == "string" ? thenable.then(noop, noop) : (thenable.status = "pending", thenable.then(
              function(fulfilledValue) {
                thenable.status === "pending" && (thenable.status = "fulfilled", thenable.value = fulfilledValue);
              },
              function(error) {
                thenable.status === "pending" && (thenable.status = "rejected", thenable.reason = error);
              }
            )), thenable.status) {
              case "fulfilled":
                return thenable.value;
              case "rejected":
                throw thenable.reason;
            }
        }
        throw thenable;
      }
      function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
        var type = typeof children;
        (type === "undefined" || type === "boolean") && (children = null);
        var invokeCallback = !1;
        if (children === null) invokeCallback = !0;
        else
          switch (type) {
            case "bigint":
            case "string":
            case "number":
              invokeCallback = !0;
              break;
            case "object":
              switch (children.$$typeof) {
                case REACT_ELEMENT_TYPE:
                case REACT_PORTAL_TYPE:
                  invokeCallback = !0;
                  break;
                case REACT_LAZY_TYPE:
                  return invokeCallback = children._init, mapIntoArray(
                    invokeCallback(children._payload),
                    array,
                    escapedPrefix,
                    nameSoFar,
                    callback
                  );
              }
          }
        if (invokeCallback)
          return callback = callback(children), invokeCallback = nameSoFar === "" ? "." + getElementKey(children, 0) : nameSoFar, isArrayImpl(callback) ? (escapedPrefix = "", invokeCallback != null && (escapedPrefix = invokeCallback.replace(userProvidedKeyEscapeRegex, "$&/") + "/"), mapIntoArray(callback, array, escapedPrefix, "", function(c) {
            return c;
          })) : callback != null && (isValidElement(callback) && (callback = cloneAndReplaceKey(
            callback,
            escapedPrefix + (callback.key == null || children && children.key === callback.key ? "" : ("" + callback.key).replace(
              userProvidedKeyEscapeRegex,
              "$&/"
            ) + "/") + invokeCallback
          )), array.push(callback)), 1;
        invokeCallback = 0;
        var nextNamePrefix = nameSoFar === "" ? "." : nameSoFar + ":";
        if (isArrayImpl(children))
          for (var i = 0; i < children.length; i++)
            nameSoFar = children[i], type = nextNamePrefix + getElementKey(nameSoFar, i), invokeCallback += mapIntoArray(
              nameSoFar,
              array,
              escapedPrefix,
              type,
              callback
            );
        else if (i = getIteratorFn(children), typeof i == "function")
          for (children = i.call(children), i = 0; !(nameSoFar = children.next()).done; )
            nameSoFar = nameSoFar.value, type = nextNamePrefix + getElementKey(nameSoFar, i++), invokeCallback += mapIntoArray(
              nameSoFar,
              array,
              escapedPrefix,
              type,
              callback
            );
        else if (type === "object") {
          if (typeof children.then == "function")
            return mapIntoArray(
              resolveThenable(children),
              array,
              escapedPrefix,
              nameSoFar,
              callback
            );
          throw array = String(children), Error(
            "Objects are not valid as a React child (found: " + (array === "[object Object]" ? "object with keys {" + Object.keys(children).join(", ") + "}" : array) + "). If you meant to render a collection of children, use an array instead."
          );
        }
        return invokeCallback;
      }
      function mapChildren(children, func, context) {
        if (children == null) return children;
        var result = [], count = 0;
        return mapIntoArray(children, result, "", "", function(child) {
          return func.call(context, child, count++);
        }), result;
      }
      function lazyInitializer(payload) {
        if (payload._status === -1) {
          var ctor = payload._result;
          ctor = ctor(), ctor.then(
            function(moduleObject) {
              (payload._status === 0 || payload._status === -1) && (payload._status = 1, payload._result = moduleObject);
            },
            function(error) {
              (payload._status === 0 || payload._status === -1) && (payload._status = 2, payload._result = error);
            }
          ), payload._status === -1 && (payload._status = 0, payload._result = ctor);
        }
        if (payload._status === 1) return payload._result.default;
        throw payload._result;
      }
      var reportGlobalError = typeof reportError == "function" ? reportError : function(error) {
        if (typeof window == "object" && typeof window.ErrorEvent == "function") {
          var event = new window.ErrorEvent("error", {
            bubbles: !0,
            cancelable: !0,
            message: typeof error == "object" && error !== null && typeof error.message == "string" ? String(error.message) : String(error),
            error
          });
          if (!window.dispatchEvent(event)) return;
        } else if (typeof process == "object" && typeof process.emit == "function") {
          process.emit("uncaughtException", error);
          return;
        }
        console.error(error);
      }, Children = {
        map: mapChildren,
        forEach: function(children, forEachFunc, forEachContext) {
          mapChildren(
            children,
            function() {
              forEachFunc.apply(this, arguments);
            },
            forEachContext
          );
        },
        count: function(children) {
          var n = 0;
          return mapChildren(children, function() {
            n++;
          }), n;
        },
        toArray: function(children) {
          return mapChildren(children, function(child) {
            return child;
          }) || [];
        },
        only: function(children) {
          if (!isValidElement(children))
            throw Error(
              "React.Children.only expected to receive a single React element child."
            );
          return children;
        }
      };
      exports.Activity = REACT_ACTIVITY_TYPE;
      exports.Children = Children;
      exports.Component = Component;
      exports.Fragment = REACT_FRAGMENT_TYPE;
      exports.Profiler = REACT_PROFILER_TYPE;
      exports.PureComponent = PureComponent;
      exports.StrictMode = REACT_STRICT_MODE_TYPE;
      exports.Suspense = REACT_SUSPENSE_TYPE;
      exports.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ReactSharedInternals;
      exports.__COMPILER_RUNTIME = {
        __proto__: null,
        c: function(size) {
          return ReactSharedInternals.H.useMemoCache(size);
        }
      };
      exports.cache = function(fn) {
        return function() {
          return fn.apply(null, arguments);
        };
      };
      exports.cacheSignal = function() {
        return null;
      };
      exports.cloneElement = function(element, config, children) {
        if (element == null)
          throw Error(
            "The argument must be a React element, but you passed " + element + "."
          );
        var props = assign({}, element.props), key = element.key;
        if (config != null)
          for (propName in config.key !== void 0 && (key = "" + config.key), config)
            !hasOwnProperty.call(config, propName) || propName === "key" || propName === "__self" || propName === "__source" || propName === "ref" && config.ref === void 0 || (props[propName] = config[propName]);
        var propName = arguments.length - 2;
        if (propName === 1) props.children = children;
        else if (1 < propName) {
          for (var childArray = Array(propName), i = 0; i < propName; i++)
            childArray[i] = arguments[i + 2];
          props.children = childArray;
        }
        return ReactElement(element.type, key, props);
      };
      exports.createContext = function(defaultValue) {
        return defaultValue = {
          $$typeof: REACT_CONTEXT_TYPE,
          _currentValue: defaultValue,
          _currentValue2: defaultValue,
          _threadCount: 0,
          Provider: null,
          Consumer: null
        }, defaultValue.Provider = defaultValue, defaultValue.Consumer = {
          $$typeof: REACT_CONSUMER_TYPE,
          _context: defaultValue
        }, defaultValue;
      };
      exports.createElement = function(type, config, children) {
        var propName, props = {}, key = null;
        if (config != null)
          for (propName in config.key !== void 0 && (key = "" + config.key), config)
            hasOwnProperty.call(config, propName) && propName !== "key" && propName !== "__self" && propName !== "__source" && (props[propName] = config[propName]);
        var childrenLength = arguments.length - 2;
        if (childrenLength === 1) props.children = children;
        else if (1 < childrenLength) {
          for (var childArray = Array(childrenLength), i = 0; i < childrenLength; i++)
            childArray[i] = arguments[i + 2];
          props.children = childArray;
        }
        if (type && type.defaultProps)
          for (propName in childrenLength = type.defaultProps, childrenLength)
            props[propName] === void 0 && (props[propName] = childrenLength[propName]);
        return ReactElement(type, key, props);
      };
      exports.createRef = function() {
        return { current: null };
      };
      exports.forwardRef = function(render) {
        return { $$typeof: REACT_FORWARD_REF_TYPE, render };
      };
      exports.isValidElement = isValidElement;
      exports.lazy = function(ctor) {
        return {
          $$typeof: REACT_LAZY_TYPE,
          _payload: { _status: -1, _result: ctor },
          _init: lazyInitializer
        };
      };
      exports.memo = function(type, compare) {
        return {
          $$typeof: REACT_MEMO_TYPE,
          type,
          compare: compare === void 0 ? null : compare
        };
      };
      exports.startTransition = function(scope) {
        var prevTransition = ReactSharedInternals.T, currentTransition = {};
        ReactSharedInternals.T = currentTransition;
        try {
          var returnValue = scope(), onStartTransitionFinish = ReactSharedInternals.S;
          onStartTransitionFinish !== null && onStartTransitionFinish(currentTransition, returnValue), typeof returnValue == "object" && returnValue !== null && typeof returnValue.then == "function" && returnValue.then(noop, reportGlobalError);
        } catch (error) {
          reportGlobalError(error);
        } finally {
          prevTransition !== null && currentTransition.types !== null && (prevTransition.types = currentTransition.types), ReactSharedInternals.T = prevTransition;
        }
      };
      exports.unstable_useCacheRefresh = function() {
        return ReactSharedInternals.H.useCacheRefresh();
      };
      exports.use = function(usable) {
        return ReactSharedInternals.H.use(usable);
      };
      exports.useActionState = function(action, initialState, permalink) {
        return ReactSharedInternals.H.useActionState(action, initialState, permalink);
      };
      exports.useCallback = function(callback, deps) {
        return ReactSharedInternals.H.useCallback(callback, deps);
      };
      exports.useContext = function(Context) {
        return ReactSharedInternals.H.useContext(Context);
      };
      exports.useDebugValue = function() {
      };
      exports.useDeferredValue = function(value, initialValue) {
        return ReactSharedInternals.H.useDeferredValue(value, initialValue);
      };
      exports.useEffect = function(create, deps) {
        return ReactSharedInternals.H.useEffect(create, deps);
      };
      exports.useEffectEvent = function(callback) {
        return ReactSharedInternals.H.useEffectEvent(callback);
      };
      exports.useId = function() {
        return ReactSharedInternals.H.useId();
      };
      exports.useImperativeHandle = function(ref, create, deps) {
        return ReactSharedInternals.H.useImperativeHandle(ref, create, deps);
      };
      exports.useInsertionEffect = function(create, deps) {
        return ReactSharedInternals.H.useInsertionEffect(create, deps);
      };
      exports.useLayoutEffect = function(create, deps) {
        return ReactSharedInternals.H.useLayoutEffect(create, deps);
      };
      exports.useMemo = function(create, deps) {
        return ReactSharedInternals.H.useMemo(create, deps);
      };
      exports.useOptimistic = function(passthrough, reducer) {
        return ReactSharedInternals.H.useOptimistic(passthrough, reducer);
      };
      exports.useReducer = function(reducer, initialArg, init) {
        return ReactSharedInternals.H.useReducer(reducer, initialArg, init);
      };
      exports.useRef = function(initialValue) {
        return ReactSharedInternals.H.useRef(initialValue);
      };
      exports.useState = function(initialState) {
        return ReactSharedInternals.H.useState(initialState);
      };
      exports.useSyncExternalStore = function(subscribe, getSnapshot, getServerSnapshot) {
        return ReactSharedInternals.H.useSyncExternalStore(
          subscribe,
          getSnapshot,
          getServerSnapshot
        );
      };
      exports.useTransition = function() {
        return ReactSharedInternals.H.useTransition();
      };
      exports.version = "19.2.8";
    }
  });

  // node_modules/react/index.js
  var require_react = __commonJS({
    "node_modules/react/index.js"(exports, module) {
      "use strict";
      module.exports = require_react_production();
    }
  });

  // node_modules/scheduler/cjs/scheduler.production.js
  var require_scheduler_production = __commonJS({
    "node_modules/scheduler/cjs/scheduler.production.js"(exports) {
      "use strict";
      function push(heap, node) {
        var index = heap.length;
        heap.push(node);
        a: for (; 0 < index; ) {
          var parentIndex = index - 1 >>> 1, parent = heap[parentIndex];
          if (0 < compare(parent, node))
            heap[parentIndex] = node, heap[index] = parent, index = parentIndex;
          else break a;
        }
      }
      function peek(heap) {
        return heap.length === 0 ? null : heap[0];
      }
      function pop(heap) {
        if (heap.length === 0) return null;
        var first = heap[0], last = heap.pop();
        if (last !== first) {
          heap[0] = last;
          a: for (var index = 0, length = heap.length, halfLength = length >>> 1; index < halfLength; ) {
            var leftIndex = 2 * (index + 1) - 1, left = heap[leftIndex], rightIndex = leftIndex + 1, right = heap[rightIndex];
            if (0 > compare(left, last))
              rightIndex < length && 0 > compare(right, left) ? (heap[index] = right, heap[rightIndex] = last, index = rightIndex) : (heap[index] = left, heap[leftIndex] = last, index = leftIndex);
            else if (rightIndex < length && 0 > compare(right, last))
              heap[index] = right, heap[rightIndex] = last, index = rightIndex;
            else break a;
          }
        }
        return first;
      }
      function compare(a, b) {
        var diff = a.sortIndex - b.sortIndex;
        return diff !== 0 ? diff : a.id - b.id;
      }
      exports.unstable_now = void 0;
      typeof performance == "object" && typeof performance.now == "function" ? (localPerformance = performance, exports.unstable_now = function() {
        return localPerformance.now();
      }) : (localDate = Date, initialTime = localDate.now(), exports.unstable_now = function() {
        return localDate.now() - initialTime;
      });
      var localPerformance, localDate, initialTime, taskQueue = [], timerQueue = [], taskIdCounter = 1, currentTask = null, currentPriorityLevel = 3, isPerformingWork = !1, isHostCallbackScheduled = !1, isHostTimeoutScheduled = !1, needsPaint = !1, localSetTimeout = typeof setTimeout == "function" ? setTimeout : null, localClearTimeout = typeof clearTimeout == "function" ? clearTimeout : null, localSetImmediate = typeof setImmediate < "u" ? setImmediate : null;
      function advanceTimers(currentTime) {
        for (var timer = peek(timerQueue); timer !== null; ) {
          if (timer.callback === null) pop(timerQueue);
          else if (timer.startTime <= currentTime)
            pop(timerQueue), timer.sortIndex = timer.expirationTime, push(taskQueue, timer);
          else break;
          timer = peek(timerQueue);
        }
      }
      function handleTimeout(currentTime) {
        if (isHostTimeoutScheduled = !1, advanceTimers(currentTime), !isHostCallbackScheduled)
          if (peek(taskQueue) !== null)
            isHostCallbackScheduled = !0, isMessageLoopRunning || (isMessageLoopRunning = !0, schedulePerformWorkUntilDeadline());
          else {
            var firstTimer = peek(timerQueue);
            firstTimer !== null && requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
          }
      }
      var isMessageLoopRunning = !1, taskTimeoutID = -1, frameInterval = 5, startTime = -1;
      function shouldYieldToHost() {
        return needsPaint ? !0 : !(exports.unstable_now() - startTime < frameInterval);
      }
      function performWorkUntilDeadline() {
        if (needsPaint = !1, isMessageLoopRunning) {
          var currentTime = exports.unstable_now();
          startTime = currentTime;
          var hasMoreWork = !0;
          try {
            a: {
              isHostCallbackScheduled = !1, isHostTimeoutScheduled && (isHostTimeoutScheduled = !1, localClearTimeout(taskTimeoutID), taskTimeoutID = -1), isPerformingWork = !0;
              var previousPriorityLevel = currentPriorityLevel;
              try {
                b: {
                  for (advanceTimers(currentTime), currentTask = peek(taskQueue); currentTask !== null && !(currentTask.expirationTime > currentTime && shouldYieldToHost()); ) {
                    var callback = currentTask.callback;
                    if (typeof callback == "function") {
                      currentTask.callback = null, currentPriorityLevel = currentTask.priorityLevel;
                      var continuationCallback = callback(
                        currentTask.expirationTime <= currentTime
                      );
                      if (currentTime = exports.unstable_now(), typeof continuationCallback == "function") {
                        currentTask.callback = continuationCallback, advanceTimers(currentTime), hasMoreWork = !0;
                        break b;
                      }
                      currentTask === peek(taskQueue) && pop(taskQueue), advanceTimers(currentTime);
                    } else pop(taskQueue);
                    currentTask = peek(taskQueue);
                  }
                  if (currentTask !== null) hasMoreWork = !0;
                  else {
                    var firstTimer = peek(timerQueue);
                    firstTimer !== null && requestHostTimeout(
                      handleTimeout,
                      firstTimer.startTime - currentTime
                    ), hasMoreWork = !1;
                  }
                }
                break a;
              } finally {
                currentTask = null, currentPriorityLevel = previousPriorityLevel, isPerformingWork = !1;
              }
              hasMoreWork = void 0;
            }
          } finally {
            hasMoreWork ? schedulePerformWorkUntilDeadline() : isMessageLoopRunning = !1;
          }
        }
      }
      var schedulePerformWorkUntilDeadline;
      typeof localSetImmediate == "function" ? schedulePerformWorkUntilDeadline = function() {
        localSetImmediate(performWorkUntilDeadline);
      } : typeof MessageChannel < "u" ? (channel = new MessageChannel(), port = channel.port2, channel.port1.onmessage = performWorkUntilDeadline, schedulePerformWorkUntilDeadline = function() {
        port.postMessage(null);
      }) : schedulePerformWorkUntilDeadline = function() {
        localSetTimeout(performWorkUntilDeadline, 0);
      };
      var channel, port;
      function requestHostTimeout(callback, ms) {
        taskTimeoutID = localSetTimeout(function() {
          callback(exports.unstable_now());
        }, ms);
      }
      exports.unstable_IdlePriority = 5;
      exports.unstable_ImmediatePriority = 1;
      exports.unstable_LowPriority = 4;
      exports.unstable_NormalPriority = 3;
      exports.unstable_Profiling = null;
      exports.unstable_UserBlockingPriority = 2;
      exports.unstable_cancelCallback = function(task) {
        task.callback = null;
      };
      exports.unstable_forceFrameRate = function(fps) {
        0 > fps || 125 < fps ? console.error(
          "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
        ) : frameInterval = 0 < fps ? Math.floor(1e3 / fps) : 5;
      };
      exports.unstable_getCurrentPriorityLevel = function() {
        return currentPriorityLevel;
      };
      exports.unstable_next = function(eventHandler) {
        switch (currentPriorityLevel) {
          case 1:
          case 2:
          case 3:
            var priorityLevel = 3;
            break;
          default:
            priorityLevel = currentPriorityLevel;
        }
        var previousPriorityLevel = currentPriorityLevel;
        currentPriorityLevel = priorityLevel;
        try {
          return eventHandler();
        } finally {
          currentPriorityLevel = previousPriorityLevel;
        }
      };
      exports.unstable_requestPaint = function() {
        needsPaint = !0;
      };
      exports.unstable_runWithPriority = function(priorityLevel, eventHandler) {
        switch (priorityLevel) {
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
            break;
          default:
            priorityLevel = 3;
        }
        var previousPriorityLevel = currentPriorityLevel;
        currentPriorityLevel = priorityLevel;
        try {
          return eventHandler();
        } finally {
          currentPriorityLevel = previousPriorityLevel;
        }
      };
      exports.unstable_scheduleCallback = function(priorityLevel, callback, options) {
        var currentTime = exports.unstable_now();
        switch (typeof options == "object" && options !== null ? (options = options.delay, options = typeof options == "number" && 0 < options ? currentTime + options : currentTime) : options = currentTime, priorityLevel) {
          case 1:
            var timeout = -1;
            break;
          case 2:
            timeout = 250;
            break;
          case 5:
            timeout = 1073741823;
            break;
          case 4:
            timeout = 1e4;
            break;
          default:
            timeout = 5e3;
        }
        return timeout = options + timeout, priorityLevel = {
          id: taskIdCounter++,
          callback,
          priorityLevel,
          startTime: options,
          expirationTime: timeout,
          sortIndex: -1
        }, options > currentTime ? (priorityLevel.sortIndex = options, push(timerQueue, priorityLevel), peek(taskQueue) === null && priorityLevel === peek(timerQueue) && (isHostTimeoutScheduled ? (localClearTimeout(taskTimeoutID), taskTimeoutID = -1) : isHostTimeoutScheduled = !0, requestHostTimeout(handleTimeout, options - currentTime))) : (priorityLevel.sortIndex = timeout, push(taskQueue, priorityLevel), isHostCallbackScheduled || isPerformingWork || (isHostCallbackScheduled = !0, isMessageLoopRunning || (isMessageLoopRunning = !0, schedulePerformWorkUntilDeadline()))), priorityLevel;
      };
      exports.unstable_shouldYield = shouldYieldToHost;
      exports.unstable_wrapCallback = function(callback) {
        var parentPriorityLevel = currentPriorityLevel;
        return function() {
          var previousPriorityLevel = currentPriorityLevel;
          currentPriorityLevel = parentPriorityLevel;
          try {
            return callback.apply(this, arguments);
          } finally {
            currentPriorityLevel = previousPriorityLevel;
          }
        };
      };
    }
  });

  // node_modules/scheduler/index.js
  var require_scheduler = __commonJS({
    "node_modules/scheduler/index.js"(exports, module) {
      "use strict";
      module.exports = require_scheduler_production();
    }
  });

  // node_modules/react-dom/cjs/react-dom.production.js
  var require_react_dom_production = __commonJS({
    "node_modules/react-dom/cjs/react-dom.production.js"(exports) {
      "use strict";
      var React28 = require_react();
      function formatProdErrorMessage(code) {
        var url = "https://react.dev/errors/" + code;
        if (1 < arguments.length) {
          url += "?args[]=" + encodeURIComponent(arguments[1]);
          for (var i = 2; i < arguments.length; i++)
            url += "&args[]=" + encodeURIComponent(arguments[i]);
        }
        return "Minified React error #" + code + "; visit " + url + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
      }
      function noop() {
      }
      var Internals = {
        d: {
          f: noop,
          r: function() {
            throw Error(formatProdErrorMessage(522));
          },
          D: noop,
          C: noop,
          L: noop,
          m: noop,
          X: noop,
          S: noop,
          M: noop
        },
        p: 0,
        findDOMNode: null
      }, REACT_PORTAL_TYPE = /* @__PURE__ */ Symbol.for("react.portal");
      function createPortal$1(children, containerInfo, implementation) {
        var key = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
        return {
          $$typeof: REACT_PORTAL_TYPE,
          key: key == null ? null : "" + key,
          children,
          containerInfo,
          implementation
        };
      }
      var ReactSharedInternals = React28.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
      function getCrossOriginStringAs(as, input) {
        if (as === "font") return "";
        if (typeof input == "string")
          return input === "use-credentials" ? input : "";
      }
      exports.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Internals;
      exports.createPortal = function(children, container) {
        var key = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
        if (!container || container.nodeType !== 1 && container.nodeType !== 9 && container.nodeType !== 11)
          throw Error(formatProdErrorMessage(299));
        return createPortal$1(children, container, null, key);
      };
      exports.flushSync = function(fn) {
        var previousTransition = ReactSharedInternals.T, previousUpdatePriority = Internals.p;
        try {
          if (ReactSharedInternals.T = null, Internals.p = 2, fn) return fn();
        } finally {
          ReactSharedInternals.T = previousTransition, Internals.p = previousUpdatePriority, Internals.d.f();
        }
      };
      exports.preconnect = function(href, options) {
        typeof href == "string" && (options ? (options = options.crossOrigin, options = typeof options == "string" ? options === "use-credentials" ? options : "" : void 0) : options = null, Internals.d.C(href, options));
      };
      exports.prefetchDNS = function(href) {
        typeof href == "string" && Internals.d.D(href);
      };
      exports.preinit = function(href, options) {
        if (typeof href == "string" && options && typeof options.as == "string") {
          var as = options.as, crossOrigin = getCrossOriginStringAs(as, options.crossOrigin), integrity = typeof options.integrity == "string" ? options.integrity : void 0, fetchPriority = typeof options.fetchPriority == "string" ? options.fetchPriority : void 0;
          as === "style" ? Internals.d.S(
            href,
            typeof options.precedence == "string" ? options.precedence : void 0,
            {
              crossOrigin,
              integrity,
              fetchPriority
            }
          ) : as === "script" && Internals.d.X(href, {
            crossOrigin,
            integrity,
            fetchPriority,
            nonce: typeof options.nonce == "string" ? options.nonce : void 0
          });
        }
      };
      exports.preinitModule = function(href, options) {
        if (typeof href == "string")
          if (typeof options == "object" && options !== null) {
            if (options.as == null || options.as === "script") {
              var crossOrigin = getCrossOriginStringAs(
                options.as,
                options.crossOrigin
              );
              Internals.d.M(href, {
                crossOrigin,
                integrity: typeof options.integrity == "string" ? options.integrity : void 0,
                nonce: typeof options.nonce == "string" ? options.nonce : void 0
              });
            }
          } else options == null && Internals.d.M(href);
      };
      exports.preload = function(href, options) {
        if (typeof href == "string" && typeof options == "object" && options !== null && typeof options.as == "string") {
          var as = options.as, crossOrigin = getCrossOriginStringAs(as, options.crossOrigin);
          Internals.d.L(href, as, {
            crossOrigin,
            integrity: typeof options.integrity == "string" ? options.integrity : void 0,
            nonce: typeof options.nonce == "string" ? options.nonce : void 0,
            type: typeof options.type == "string" ? options.type : void 0,
            fetchPriority: typeof options.fetchPriority == "string" ? options.fetchPriority : void 0,
            referrerPolicy: typeof options.referrerPolicy == "string" ? options.referrerPolicy : void 0,
            imageSrcSet: typeof options.imageSrcSet == "string" ? options.imageSrcSet : void 0,
            imageSizes: typeof options.imageSizes == "string" ? options.imageSizes : void 0,
            media: typeof options.media == "string" ? options.media : void 0
          });
        }
      };
      exports.preloadModule = function(href, options) {
        if (typeof href == "string")
          if (options) {
            var crossOrigin = getCrossOriginStringAs(options.as, options.crossOrigin);
            Internals.d.m(href, {
              as: typeof options.as == "string" && options.as !== "script" ? options.as : void 0,
              crossOrigin,
              integrity: typeof options.integrity == "string" ? options.integrity : void 0
            });
          } else Internals.d.m(href);
      };
      exports.requestFormReset = function(form) {
        Internals.d.r(form);
      };
      exports.unstable_batchedUpdates = function(fn, a) {
        return fn(a);
      };
      exports.useFormState = function(action, initialState, permalink) {
        return ReactSharedInternals.H.useFormState(action, initialState, permalink);
      };
      exports.useFormStatus = function() {
        return ReactSharedInternals.H.useHostTransitionStatus();
      };
      exports.version = "19.2.8";
    }
  });

  // node_modules/react-dom/index.js
  var require_react_dom = __commonJS({
    "node_modules/react-dom/index.js"(exports, module) {
      "use strict";
      function checkDCE() {
        if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
          try {
            __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
          } catch (err) {
            console.error(err);
          }
      }
      checkDCE(), module.exports = require_react_dom_production();
    }
  });

  // node_modules/react-dom/cjs/react-dom-client.production.js
  var require_react_dom_client_production = __commonJS({
    "node_modules/react-dom/cjs/react-dom-client.production.js"(exports) {
      "use strict";
      var Scheduler = require_scheduler(), React28 = require_react(), ReactDOM = require_react_dom();
      function formatProdErrorMessage(code) {
        var url = "https://react.dev/errors/" + code;
        if (1 < arguments.length) {
          url += "?args[]=" + encodeURIComponent(arguments[1]);
          for (var i = 2; i < arguments.length; i++)
            url += "&args[]=" + encodeURIComponent(arguments[i]);
        }
        return "Minified React error #" + code + "; visit " + url + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
      }
      function isValidContainer(node) {
        return !(!node || node.nodeType !== 1 && node.nodeType !== 9 && node.nodeType !== 11);
      }
      function getNearestMountedFiber(fiber) {
        var node = fiber, nearestMounted = fiber;
        if (fiber.alternate) for (; node.return; ) node = node.return;
        else {
          fiber = node;
          do
            node = fiber, (node.flags & 4098) !== 0 && (nearestMounted = node.return), fiber = node.return;
          while (fiber);
        }
        return node.tag === 3 ? nearestMounted : null;
      }
      function getSuspenseInstanceFromFiber(fiber) {
        if (fiber.tag === 13) {
          var suspenseState = fiber.memoizedState;
          if (suspenseState === null && (fiber = fiber.alternate, fiber !== null && (suspenseState = fiber.memoizedState)), suspenseState !== null) return suspenseState.dehydrated;
        }
        return null;
      }
      function getActivityInstanceFromFiber(fiber) {
        if (fiber.tag === 31) {
          var activityState = fiber.memoizedState;
          if (activityState === null && (fiber = fiber.alternate, fiber !== null && (activityState = fiber.memoizedState)), activityState !== null) return activityState.dehydrated;
        }
        return null;
      }
      function assertIsMounted(fiber) {
        if (getNearestMountedFiber(fiber) !== fiber)
          throw Error(formatProdErrorMessage(188));
      }
      function findCurrentFiberUsingSlowPath(fiber) {
        var alternate = fiber.alternate;
        if (!alternate) {
          if (alternate = getNearestMountedFiber(fiber), alternate === null) throw Error(formatProdErrorMessage(188));
          return alternate !== fiber ? null : fiber;
        }
        for (var a = fiber, b = alternate; ; ) {
          var parentA = a.return;
          if (parentA === null) break;
          var parentB = parentA.alternate;
          if (parentB === null) {
            if (b = parentA.return, b !== null) {
              a = b;
              continue;
            }
            break;
          }
          if (parentA.child === parentB.child) {
            for (parentB = parentA.child; parentB; ) {
              if (parentB === a) return assertIsMounted(parentA), fiber;
              if (parentB === b) return assertIsMounted(parentA), alternate;
              parentB = parentB.sibling;
            }
            throw Error(formatProdErrorMessage(188));
          }
          if (a.return !== b.return) a = parentA, b = parentB;
          else {
            for (var didFindChild = !1, child$0 = parentA.child; child$0; ) {
              if (child$0 === a) {
                didFindChild = !0, a = parentA, b = parentB;
                break;
              }
              if (child$0 === b) {
                didFindChild = !0, b = parentA, a = parentB;
                break;
              }
              child$0 = child$0.sibling;
            }
            if (!didFindChild) {
              for (child$0 = parentB.child; child$0; ) {
                if (child$0 === a) {
                  didFindChild = !0, a = parentB, b = parentA;
                  break;
                }
                if (child$0 === b) {
                  didFindChild = !0, b = parentB, a = parentA;
                  break;
                }
                child$0 = child$0.sibling;
              }
              if (!didFindChild) throw Error(formatProdErrorMessage(189));
            }
          }
          if (a.alternate !== b) throw Error(formatProdErrorMessage(190));
        }
        if (a.tag !== 3) throw Error(formatProdErrorMessage(188));
        return a.stateNode.current === a ? fiber : alternate;
      }
      function findCurrentHostFiberImpl(node) {
        var tag = node.tag;
        if (tag === 5 || tag === 26 || tag === 27 || tag === 6) return node;
        for (node = node.child; node !== null; ) {
          if (tag = findCurrentHostFiberImpl(node), tag !== null) return tag;
          node = node.sibling;
        }
        return null;
      }
      var assign = Object.assign, REACT_LEGACY_ELEMENT_TYPE = /* @__PURE__ */ Symbol.for("react.element"), REACT_ELEMENT_TYPE = /* @__PURE__ */ Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = /* @__PURE__ */ Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = /* @__PURE__ */ Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = /* @__PURE__ */ Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = /* @__PURE__ */ Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = /* @__PURE__ */ Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = /* @__PURE__ */ Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = /* @__PURE__ */ Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = /* @__PURE__ */ Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = /* @__PURE__ */ Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = /* @__PURE__ */ Symbol.for("react.memo"), REACT_LAZY_TYPE = /* @__PURE__ */ Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = /* @__PURE__ */ Symbol.for("react.activity"), REACT_MEMO_CACHE_SENTINEL = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel"), MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
      function getIteratorFn(maybeIterable) {
        return maybeIterable === null || typeof maybeIterable != "object" ? null : (maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"], typeof maybeIterable == "function" ? maybeIterable : null);
      }
      var REACT_CLIENT_REFERENCE = /* @__PURE__ */ Symbol.for("react.client.reference");
      function getComponentNameFromType(type) {
        if (type == null) return null;
        if (typeof type == "function")
          return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if (typeof type == "string") return type;
        switch (type) {
          case REACT_FRAGMENT_TYPE:
            return "Fragment";
          case REACT_PROFILER_TYPE:
            return "Profiler";
          case REACT_STRICT_MODE_TYPE:
            return "StrictMode";
          case REACT_SUSPENSE_TYPE:
            return "Suspense";
          case REACT_SUSPENSE_LIST_TYPE:
            return "SuspenseList";
          case REACT_ACTIVITY_TYPE:
            return "Activity";
        }
        if (typeof type == "object")
          switch (type.$$typeof) {
            case REACT_PORTAL_TYPE:
              return "Portal";
            case REACT_CONTEXT_TYPE:
              return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
              return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
              var innerType = type.render;
              return type = type.displayName, type || (type = innerType.displayName || innerType.name || "", type = type !== "" ? "ForwardRef(" + type + ")" : "ForwardRef"), type;
            case REACT_MEMO_TYPE:
              return innerType = type.displayName || null, innerType !== null ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
              innerType = type._payload, type = type._init;
              try {
                return getComponentNameFromType(type(innerType));
              } catch {
              }
          }
        return null;
      }
      var isArrayImpl = Array.isArray, ReactSharedInternals = React28.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ReactDOMSharedInternals = ReactDOM.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, sharedNotPendingObject = {
        pending: !1,
        data: null,
        method: null,
        action: null
      }, valueStack = [], index = -1;
      function createCursor(defaultValue) {
        return { current: defaultValue };
      }
      function pop(cursor) {
        0 > index || (cursor.current = valueStack[index], valueStack[index] = null, index--);
      }
      function push(cursor, value) {
        index++, valueStack[index] = cursor.current, cursor.current = value;
      }
      var contextStackCursor = createCursor(null), contextFiberStackCursor = createCursor(null), rootInstanceStackCursor = createCursor(null), hostTransitionProviderCursor = createCursor(null);
      function pushHostContainer(fiber, nextRootInstance) {
        switch (push(rootInstanceStackCursor, nextRootInstance), push(contextFiberStackCursor, fiber), push(contextStackCursor, null), nextRootInstance.nodeType) {
          case 9:
          case 11:
            fiber = (fiber = nextRootInstance.documentElement) && (fiber = fiber.namespaceURI) ? getOwnHostContext(fiber) : 0;
            break;
          default:
            if (fiber = nextRootInstance.tagName, nextRootInstance = nextRootInstance.namespaceURI)
              nextRootInstance = getOwnHostContext(nextRootInstance), fiber = getChildHostContextProd(nextRootInstance, fiber);
            else
              switch (fiber) {
                case "svg":
                  fiber = 1;
                  break;
                case "math":
                  fiber = 2;
                  break;
                default:
                  fiber = 0;
              }
        }
        pop(contextStackCursor), push(contextStackCursor, fiber);
      }
      function popHostContainer() {
        pop(contextStackCursor), pop(contextFiberStackCursor), pop(rootInstanceStackCursor);
      }
      function pushHostContext(fiber) {
        fiber.memoizedState !== null && push(hostTransitionProviderCursor, fiber);
        var context = contextStackCursor.current, JSCompiler_inline_result = getChildHostContextProd(context, fiber.type);
        context !== JSCompiler_inline_result && (push(contextFiberStackCursor, fiber), push(contextStackCursor, JSCompiler_inline_result));
      }
      function popHostContext(fiber) {
        contextFiberStackCursor.current === fiber && (pop(contextStackCursor), pop(contextFiberStackCursor)), hostTransitionProviderCursor.current === fiber && (pop(hostTransitionProviderCursor), HostTransitionContext._currentValue = sharedNotPendingObject);
      }
      var prefix, suffix;
      function describeBuiltInComponentFrame(name) {
        if (prefix === void 0)
          try {
            throw Error();
          } catch (x) {
            var match3 = x.stack.trim().match(/\n( *(at )?)/);
            prefix = match3 && match3[1] || "", suffix = -1 < x.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < x.stack.indexOf("@") ? "@unknown:0:0" : "";
          }
        return `
` + prefix + name + suffix;
      }
      var reentry = !1;
      function describeNativeComponentFrame(fn, construct) {
        if (!fn || reentry) return "";
        reentry = !0;
        var previousPrepareStackTrace = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        try {
          var RunInRootFrame = {
            DetermineComponentFrameRoot: function() {
              try {
                if (construct) {
                  var Fake = function() {
                    throw Error();
                  };
                  if (Object.defineProperty(Fake.prototype, "props", {
                    set: function() {
                      throw Error();
                    }
                  }), typeof Reflect == "object" && Reflect.construct) {
                    try {
                      Reflect.construct(Fake, []);
                    } catch (x) {
                      var control = x;
                    }
                    Reflect.construct(fn, [], Fake);
                  } else {
                    try {
                      Fake.call();
                    } catch (x$1) {
                      control = x$1;
                    }
                    fn.call(Fake.prototype);
                  }
                } else {
                  try {
                    throw Error();
                  } catch (x$2) {
                    control = x$2;
                  }
                  (Fake = fn()) && typeof Fake.catch == "function" && Fake.catch(function() {
                  });
                }
              } catch (sample) {
                if (sample && control && typeof sample.stack == "string")
                  return [sample.stack, control.stack];
              }
              return [null, null];
            }
          };
          RunInRootFrame.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
          var namePropDescriptor = Object.getOwnPropertyDescriptor(
            RunInRootFrame.DetermineComponentFrameRoot,
            "name"
          );
          namePropDescriptor && namePropDescriptor.configurable && Object.defineProperty(
            RunInRootFrame.DetermineComponentFrameRoot,
            "name",
            { value: "DetermineComponentFrameRoot" }
          );
          var _RunInRootFrame$Deter = RunInRootFrame.DetermineComponentFrameRoot(), sampleStack = _RunInRootFrame$Deter[0], controlStack = _RunInRootFrame$Deter[1];
          if (sampleStack && controlStack) {
            var sampleLines = sampleStack.split(`
`), controlLines = controlStack.split(`
`);
            for (namePropDescriptor = RunInRootFrame = 0; RunInRootFrame < sampleLines.length && !sampleLines[RunInRootFrame].includes("DetermineComponentFrameRoot"); )
              RunInRootFrame++;
            for (; namePropDescriptor < controlLines.length && !controlLines[namePropDescriptor].includes(
              "DetermineComponentFrameRoot"
            ); )
              namePropDescriptor++;
            if (RunInRootFrame === sampleLines.length || namePropDescriptor === controlLines.length)
              for (RunInRootFrame = sampleLines.length - 1, namePropDescriptor = controlLines.length - 1; 1 <= RunInRootFrame && 0 <= namePropDescriptor && sampleLines[RunInRootFrame] !== controlLines[namePropDescriptor]; )
                namePropDescriptor--;
            for (; 1 <= RunInRootFrame && 0 <= namePropDescriptor; RunInRootFrame--, namePropDescriptor--)
              if (sampleLines[RunInRootFrame] !== controlLines[namePropDescriptor]) {
                if (RunInRootFrame !== 1 || namePropDescriptor !== 1)
                  do
                    if (RunInRootFrame--, namePropDescriptor--, 0 > namePropDescriptor || sampleLines[RunInRootFrame] !== controlLines[namePropDescriptor]) {
                      var frame = `
` + sampleLines[RunInRootFrame].replace(" at new ", " at ");
                      return fn.displayName && frame.includes("<anonymous>") && (frame = frame.replace("<anonymous>", fn.displayName)), frame;
                    }
                  while (1 <= RunInRootFrame && 0 <= namePropDescriptor);
                break;
              }
          }
        } finally {
          reentry = !1, Error.prepareStackTrace = previousPrepareStackTrace;
        }
        return (previousPrepareStackTrace = fn ? fn.displayName || fn.name : "") ? describeBuiltInComponentFrame(previousPrepareStackTrace) : "";
      }
      function describeFiber(fiber, childFiber) {
        switch (fiber.tag) {
          case 26:
          case 27:
          case 5:
            return describeBuiltInComponentFrame(fiber.type);
          case 16:
            return describeBuiltInComponentFrame("Lazy");
          case 13:
            return fiber.child !== childFiber && childFiber !== null ? describeBuiltInComponentFrame("Suspense Fallback") : describeBuiltInComponentFrame("Suspense");
          case 19:
            return describeBuiltInComponentFrame("SuspenseList");
          case 0:
          case 15:
            return describeNativeComponentFrame(fiber.type, !1);
          case 11:
            return describeNativeComponentFrame(fiber.type.render, !1);
          case 1:
            return describeNativeComponentFrame(fiber.type, !0);
          case 31:
            return describeBuiltInComponentFrame("Activity");
          default:
            return "";
        }
      }
      function getStackByFiberInDevAndProd(workInProgress2) {
        try {
          var info = "", previous = null;
          do
            info += describeFiber(workInProgress2, previous), previous = workInProgress2, workInProgress2 = workInProgress2.return;
          while (workInProgress2);
          return info;
        } catch (x) {
          return `
Error generating stack: ` + x.message + `
` + x.stack;
        }
      }
      var hasOwnProperty = Object.prototype.hasOwnProperty, scheduleCallback$3 = Scheduler.unstable_scheduleCallback, cancelCallback$1 = Scheduler.unstable_cancelCallback, shouldYield = Scheduler.unstable_shouldYield, requestPaint = Scheduler.unstable_requestPaint, now = Scheduler.unstable_now, getCurrentPriorityLevel = Scheduler.unstable_getCurrentPriorityLevel, ImmediatePriority = Scheduler.unstable_ImmediatePriority, UserBlockingPriority = Scheduler.unstable_UserBlockingPriority, NormalPriority$1 = Scheduler.unstable_NormalPriority, LowPriority = Scheduler.unstable_LowPriority, IdlePriority = Scheduler.unstable_IdlePriority, log$1 = Scheduler.log, unstable_setDisableYieldValue = Scheduler.unstable_setDisableYieldValue, rendererID = null, injectedHook = null;
      function setIsStrictModeForDevtools(newIsStrictMode) {
        if (typeof log$1 == "function" && unstable_setDisableYieldValue(newIsStrictMode), injectedHook && typeof injectedHook.setStrictMode == "function")
          try {
            injectedHook.setStrictMode(rendererID, newIsStrictMode);
          } catch {
          }
      }
      var clz32 = Math.clz32 ? Math.clz32 : clz32Fallback, log = Math.log, LN2 = Math.LN2;
      function clz32Fallback(x) {
        return x >>>= 0, x === 0 ? 32 : 31 - (log(x) / LN2 | 0) | 0;
      }
      var nextTransitionUpdateLane = 256, nextTransitionDeferredLane = 262144, nextRetryLane = 4194304;
      function getHighestPriorityLanes(lanes) {
        var pendingSyncLanes = lanes & 42;
        if (pendingSyncLanes !== 0) return pendingSyncLanes;
        switch (lanes & -lanes) {
          case 1:
            return 1;
          case 2:
            return 2;
          case 4:
            return 4;
          case 8:
            return 8;
          case 16:
            return 16;
          case 32:
            return 32;
          case 64:
            return 64;
          case 128:
            return 128;
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
            return lanes & 261888;
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
            return lanes & 3932160;
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
            return lanes & 62914560;
          case 67108864:
            return 67108864;
          case 134217728:
            return 134217728;
          case 268435456:
            return 268435456;
          case 536870912:
            return 536870912;
          case 1073741824:
            return 0;
          default:
            return lanes;
        }
      }
      function getNextLanes(root2, wipLanes, rootHasPendingCommit) {
        var pendingLanes = root2.pendingLanes;
        if (pendingLanes === 0) return 0;
        var nextLanes = 0, suspendedLanes = root2.suspendedLanes, pingedLanes = root2.pingedLanes;
        root2 = root2.warmLanes;
        var nonIdlePendingLanes = pendingLanes & 134217727;
        return nonIdlePendingLanes !== 0 ? (pendingLanes = nonIdlePendingLanes & ~suspendedLanes, pendingLanes !== 0 ? nextLanes = getHighestPriorityLanes(pendingLanes) : (pingedLanes &= nonIdlePendingLanes, pingedLanes !== 0 ? nextLanes = getHighestPriorityLanes(pingedLanes) : rootHasPendingCommit || (rootHasPendingCommit = nonIdlePendingLanes & ~root2, rootHasPendingCommit !== 0 && (nextLanes = getHighestPriorityLanes(rootHasPendingCommit))))) : (nonIdlePendingLanes = pendingLanes & ~suspendedLanes, nonIdlePendingLanes !== 0 ? nextLanes = getHighestPriorityLanes(nonIdlePendingLanes) : pingedLanes !== 0 ? nextLanes = getHighestPriorityLanes(pingedLanes) : rootHasPendingCommit || (rootHasPendingCommit = pendingLanes & ~root2, rootHasPendingCommit !== 0 && (nextLanes = getHighestPriorityLanes(rootHasPendingCommit)))), nextLanes === 0 ? 0 : wipLanes !== 0 && wipLanes !== nextLanes && (wipLanes & suspendedLanes) === 0 && (suspendedLanes = nextLanes & -nextLanes, rootHasPendingCommit = wipLanes & -wipLanes, suspendedLanes >= rootHasPendingCommit || suspendedLanes === 32 && (rootHasPendingCommit & 4194048) !== 0) ? wipLanes : nextLanes;
      }
      function checkIfRootIsPrerendering(root2, renderLanes2) {
        return (root2.pendingLanes & ~(root2.suspendedLanes & ~root2.pingedLanes) & renderLanes2) === 0;
      }
      function computeExpirationTime(lane, currentTime) {
        switch (lane) {
          case 1:
          case 2:
          case 4:
          case 8:
          case 64:
            return currentTime + 250;
          case 16:
          case 32:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
            return currentTime + 5e3;
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
            return -1;
          case 67108864:
          case 134217728:
          case 268435456:
          case 536870912:
          case 1073741824:
            return -1;
          default:
            return -1;
        }
      }
      function claimNextRetryLane() {
        var lane = nextRetryLane;
        return nextRetryLane <<= 1, (nextRetryLane & 62914560) === 0 && (nextRetryLane = 4194304), lane;
      }
      function createLaneMap(initial) {
        for (var laneMap = [], i = 0; 31 > i; i++) laneMap.push(initial);
        return laneMap;
      }
      function markRootUpdated$1(root2, updateLane) {
        root2.pendingLanes |= updateLane, updateLane !== 268435456 && (root2.suspendedLanes = 0, root2.pingedLanes = 0, root2.warmLanes = 0);
      }
      function markRootFinished(root2, finishedLanes, remainingLanes, spawnedLane, updatedLanes, suspendedRetryLanes) {
        var previouslyPendingLanes = root2.pendingLanes;
        root2.pendingLanes = remainingLanes, root2.suspendedLanes = 0, root2.pingedLanes = 0, root2.warmLanes = 0, root2.expiredLanes &= remainingLanes, root2.entangledLanes &= remainingLanes, root2.errorRecoveryDisabledLanes &= remainingLanes, root2.shellSuspendCounter = 0;
        var entanglements = root2.entanglements, expirationTimes = root2.expirationTimes, hiddenUpdates = root2.hiddenUpdates;
        for (remainingLanes = previouslyPendingLanes & ~remainingLanes; 0 < remainingLanes; ) {
          var index$7 = 31 - clz32(remainingLanes), lane = 1 << index$7;
          entanglements[index$7] = 0, expirationTimes[index$7] = -1;
          var hiddenUpdatesForLane = hiddenUpdates[index$7];
          if (hiddenUpdatesForLane !== null)
            for (hiddenUpdates[index$7] = null, index$7 = 0; index$7 < hiddenUpdatesForLane.length; index$7++) {
              var update = hiddenUpdatesForLane[index$7];
              update !== null && (update.lane &= -536870913);
            }
          remainingLanes &= ~lane;
        }
        spawnedLane !== 0 && markSpawnedDeferredLane(root2, spawnedLane, 0), suspendedRetryLanes !== 0 && updatedLanes === 0 && root2.tag !== 0 && (root2.suspendedLanes |= suspendedRetryLanes & ~(previouslyPendingLanes & ~finishedLanes));
      }
      function markSpawnedDeferredLane(root2, spawnedLane, entangledLanes) {
        root2.pendingLanes |= spawnedLane, root2.suspendedLanes &= ~spawnedLane;
        var spawnedLaneIndex = 31 - clz32(spawnedLane);
        root2.entangledLanes |= spawnedLane, root2.entanglements[spawnedLaneIndex] = root2.entanglements[spawnedLaneIndex] | 1073741824 | entangledLanes & 261930;
      }
      function markRootEntangled(root2, entangledLanes) {
        var rootEntangledLanes = root2.entangledLanes |= entangledLanes;
        for (root2 = root2.entanglements; rootEntangledLanes; ) {
          var index$8 = 31 - clz32(rootEntangledLanes), lane = 1 << index$8;
          lane & entangledLanes | root2[index$8] & entangledLanes && (root2[index$8] |= entangledLanes), rootEntangledLanes &= ~lane;
        }
      }
      function getBumpedLaneForHydration(root2, renderLanes2) {
        var renderLane = renderLanes2 & -renderLanes2;
        return renderLane = (renderLane & 42) !== 0 ? 1 : getBumpedLaneForHydrationByLane(renderLane), (renderLane & (root2.suspendedLanes | renderLanes2)) !== 0 ? 0 : renderLane;
      }
      function getBumpedLaneForHydrationByLane(lane) {
        switch (lane) {
          case 2:
            lane = 1;
            break;
          case 8:
            lane = 4;
            break;
          case 32:
            lane = 16;
            break;
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
            lane = 128;
            break;
          case 268435456:
            lane = 134217728;
            break;
          default:
            lane = 0;
        }
        return lane;
      }
      function lanesToEventPriority(lanes) {
        return lanes &= -lanes, 2 < lanes ? 8 < lanes ? (lanes & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
      }
      function resolveUpdatePriority() {
        var updatePriority = ReactDOMSharedInternals.p;
        return updatePriority !== 0 ? updatePriority : (updatePriority = window.event, updatePriority === void 0 ? 32 : getEventPriority(updatePriority.type));
      }
      function runWithPriority(priority, fn) {
        var previousPriority = ReactDOMSharedInternals.p;
        try {
          return ReactDOMSharedInternals.p = priority, fn();
        } finally {
          ReactDOMSharedInternals.p = previousPriority;
        }
      }
      var randomKey = Math.random().toString(36).slice(2), internalInstanceKey = "__reactFiber$" + randomKey, internalPropsKey = "__reactProps$" + randomKey, internalContainerInstanceKey = "__reactContainer$" + randomKey, internalEventHandlersKey = "__reactEvents$" + randomKey, internalEventHandlerListenersKey = "__reactListeners$" + randomKey, internalEventHandlesSetKey = "__reactHandles$" + randomKey, internalRootNodeResourcesKey = "__reactResources$" + randomKey, internalHoistableMarker = "__reactMarker$" + randomKey;
      function detachDeletedInstance(node) {
        delete node[internalInstanceKey], delete node[internalPropsKey], delete node[internalEventHandlersKey], delete node[internalEventHandlerListenersKey], delete node[internalEventHandlesSetKey];
      }
      function getClosestInstanceFromNode(targetNode) {
        var targetInst = targetNode[internalInstanceKey];
        if (targetInst) return targetInst;
        for (var parentNode = targetNode.parentNode; parentNode; ) {
          if (targetInst = parentNode[internalContainerInstanceKey] || parentNode[internalInstanceKey]) {
            if (parentNode = targetInst.alternate, targetInst.child !== null || parentNode !== null && parentNode.child !== null)
              for (targetNode = getParentHydrationBoundary(targetNode); targetNode !== null; ) {
                if (parentNode = targetNode[internalInstanceKey]) return parentNode;
                targetNode = getParentHydrationBoundary(targetNode);
              }
            return targetInst;
          }
          targetNode = parentNode, parentNode = targetNode.parentNode;
        }
        return null;
      }
      function getInstanceFromNode(node) {
        if (node = node[internalInstanceKey] || node[internalContainerInstanceKey]) {
          var tag = node.tag;
          if (tag === 5 || tag === 6 || tag === 13 || tag === 31 || tag === 26 || tag === 27 || tag === 3)
            return node;
        }
        return null;
      }
      function getNodeFromInstance(inst) {
        var tag = inst.tag;
        if (tag === 5 || tag === 26 || tag === 27 || tag === 6) return inst.stateNode;
        throw Error(formatProdErrorMessage(33));
      }
      function getResourcesFromRoot(root2) {
        var resources = root2[internalRootNodeResourcesKey];
        return resources || (resources = root2[internalRootNodeResourcesKey] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), resources;
      }
      function markNodeAsHoistable(node) {
        node[internalHoistableMarker] = !0;
      }
      var allNativeEvents = /* @__PURE__ */ new Set(), registrationNameDependencies = {};
      function registerTwoPhaseEvent(registrationName, dependencies) {
        registerDirectEvent(registrationName, dependencies), registerDirectEvent(registrationName + "Capture", dependencies);
      }
      function registerDirectEvent(registrationName, dependencies) {
        for (registrationNameDependencies[registrationName] = dependencies, registrationName = 0; registrationName < dependencies.length; registrationName++)
          allNativeEvents.add(dependencies[registrationName]);
      }
      var VALID_ATTRIBUTE_NAME_REGEX = RegExp(
        "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
      ), illegalAttributeNameCache = {}, validatedAttributeNameCache = {};
      function isAttributeNameSafe(attributeName) {
        return hasOwnProperty.call(validatedAttributeNameCache, attributeName) ? !0 : hasOwnProperty.call(illegalAttributeNameCache, attributeName) ? !1 : VALID_ATTRIBUTE_NAME_REGEX.test(attributeName) ? validatedAttributeNameCache[attributeName] = !0 : (illegalAttributeNameCache[attributeName] = !0, !1);
      }
      function setValueForAttribute(node, name, value) {
        if (isAttributeNameSafe(name))
          if (value === null) node.removeAttribute(name);
          else {
            switch (typeof value) {
              case "undefined":
              case "function":
              case "symbol":
                node.removeAttribute(name);
                return;
              case "boolean":
                var prefix$10 = name.toLowerCase().slice(0, 5);
                if (prefix$10 !== "data-" && prefix$10 !== "aria-") {
                  node.removeAttribute(name);
                  return;
                }
            }
            node.setAttribute(name, "" + value);
          }
      }
      function setValueForKnownAttribute(node, name, value) {
        if (value === null) node.removeAttribute(name);
        else {
          switch (typeof value) {
            case "undefined":
            case "function":
            case "symbol":
            case "boolean":
              node.removeAttribute(name);
              return;
          }
          node.setAttribute(name, "" + value);
        }
      }
      function setValueForNamespacedAttribute(node, namespace, name, value) {
        if (value === null) node.removeAttribute(name);
        else {
          switch (typeof value) {
            case "undefined":
            case "function":
            case "symbol":
            case "boolean":
              node.removeAttribute(name);
              return;
          }
          node.setAttributeNS(namespace, name, "" + value);
        }
      }
      function getToStringValue(value) {
        switch (typeof value) {
          case "bigint":
          case "boolean":
          case "number":
          case "string":
          case "undefined":
            return value;
          case "object":
            return value;
          default:
            return "";
        }
      }
      function isCheckable(elem) {
        var type = elem.type;
        return (elem = elem.nodeName) && elem.toLowerCase() === "input" && (type === "checkbox" || type === "radio");
      }
      function trackValueOnNode(node, valueField, currentValue) {
        var descriptor = Object.getOwnPropertyDescriptor(
          node.constructor.prototype,
          valueField
        );
        if (!node.hasOwnProperty(valueField) && typeof descriptor < "u" && typeof descriptor.get == "function" && typeof descriptor.set == "function") {
          var get = descriptor.get, set = descriptor.set;
          return Object.defineProperty(node, valueField, {
            configurable: !0,
            get: function() {
              return get.call(this);
            },
            set: function(value) {
              currentValue = "" + value, set.call(this, value);
            }
          }), Object.defineProperty(node, valueField, {
            enumerable: descriptor.enumerable
          }), {
            getValue: function() {
              return currentValue;
            },
            setValue: function(value) {
              currentValue = "" + value;
            },
            stopTracking: function() {
              node._valueTracker = null, delete node[valueField];
            }
          };
        }
      }
      function track(node) {
        if (!node._valueTracker) {
          var valueField = isCheckable(node) ? "checked" : "value";
          node._valueTracker = trackValueOnNode(
            node,
            valueField,
            "" + node[valueField]
          );
        }
      }
      function updateValueIfChanged(node) {
        if (!node) return !1;
        var tracker = node._valueTracker;
        if (!tracker) return !0;
        var lastValue = tracker.getValue(), value = "";
        return node && (value = isCheckable(node) ? node.checked ? "true" : "false" : node.value), node = value, node !== lastValue ? (tracker.setValue(node), !0) : !1;
      }
      function getActiveElement(doc) {
        if (doc = doc || (typeof document < "u" ? document : void 0), typeof doc > "u") return null;
        try {
          return doc.activeElement || doc.body;
        } catch {
          return doc.body;
        }
      }
      var escapeSelectorAttributeValueInsideDoubleQuotesRegex = /[\n"\\]/g;
      function escapeSelectorAttributeValueInsideDoubleQuotes(value) {
        return value.replace(
          escapeSelectorAttributeValueInsideDoubleQuotesRegex,
          function(ch) {
            return "\\" + ch.charCodeAt(0).toString(16) + " ";
          }
        );
      }
      function updateInput(element, value, defaultValue, lastDefaultValue, checked, defaultChecked, type, name) {
        element.name = "", type != null && typeof type != "function" && typeof type != "symbol" && typeof type != "boolean" ? element.type = type : element.removeAttribute("type"), value != null ? type === "number" ? (value === 0 && element.value === "" || element.value != value) && (element.value = "" + getToStringValue(value)) : element.value !== "" + getToStringValue(value) && (element.value = "" + getToStringValue(value)) : type !== "submit" && type !== "reset" || element.removeAttribute("value"), value != null ? setDefaultValue(element, type, getToStringValue(value)) : defaultValue != null ? setDefaultValue(element, type, getToStringValue(defaultValue)) : lastDefaultValue != null && element.removeAttribute("value"), checked == null && defaultChecked != null && (element.defaultChecked = !!defaultChecked), checked != null && (element.checked = checked && typeof checked != "function" && typeof checked != "symbol"), name != null && typeof name != "function" && typeof name != "symbol" && typeof name != "boolean" ? element.name = "" + getToStringValue(name) : element.removeAttribute("name");
      }
      function initInput(element, value, defaultValue, checked, defaultChecked, type, name, isHydrating2) {
        if (type != null && typeof type != "function" && typeof type != "symbol" && typeof type != "boolean" && (element.type = type), value != null || defaultValue != null) {
          if (!(type !== "submit" && type !== "reset" || value != null)) {
            track(element);
            return;
          }
          defaultValue = defaultValue != null ? "" + getToStringValue(defaultValue) : "", value = value != null ? "" + getToStringValue(value) : defaultValue, isHydrating2 || value === element.value || (element.value = value), element.defaultValue = value;
        }
        checked = checked ?? defaultChecked, checked = typeof checked != "function" && typeof checked != "symbol" && !!checked, element.checked = isHydrating2 ? element.checked : !!checked, element.defaultChecked = !!checked, name != null && typeof name != "function" && typeof name != "symbol" && typeof name != "boolean" && (element.name = name), track(element);
      }
      function setDefaultValue(node, type, value) {
        type === "number" && getActiveElement(node.ownerDocument) === node || node.defaultValue === "" + value || (node.defaultValue = "" + value);
      }
      function updateOptions(node, multiple, propValue, setDefaultSelected) {
        if (node = node.options, multiple) {
          multiple = {};
          for (var i = 0; i < propValue.length; i++)
            multiple["$" + propValue[i]] = !0;
          for (propValue = 0; propValue < node.length; propValue++)
            i = multiple.hasOwnProperty("$" + node[propValue].value), node[propValue].selected !== i && (node[propValue].selected = i), i && setDefaultSelected && (node[propValue].defaultSelected = !0);
        } else {
          for (propValue = "" + getToStringValue(propValue), multiple = null, i = 0; i < node.length; i++) {
            if (node[i].value === propValue) {
              node[i].selected = !0, setDefaultSelected && (node[i].defaultSelected = !0);
              return;
            }
            multiple !== null || node[i].disabled || (multiple = node[i]);
          }
          multiple !== null && (multiple.selected = !0);
        }
      }
      function updateTextarea(element, value, defaultValue) {
        if (value != null && (value = "" + getToStringValue(value), value !== element.value && (element.value = value), defaultValue == null)) {
          element.defaultValue !== value && (element.defaultValue = value);
          return;
        }
        element.defaultValue = defaultValue != null ? "" + getToStringValue(defaultValue) : "";
      }
      function initTextarea(element, value, defaultValue, children) {
        if (value == null) {
          if (children != null) {
            if (defaultValue != null) throw Error(formatProdErrorMessage(92));
            if (isArrayImpl(children)) {
              if (1 < children.length) throw Error(formatProdErrorMessage(93));
              children = children[0];
            }
            defaultValue = children;
          }
          defaultValue == null && (defaultValue = ""), value = defaultValue;
        }
        defaultValue = getToStringValue(value), element.defaultValue = defaultValue, children = element.textContent, children === defaultValue && children !== "" && children !== null && (element.value = children), track(element);
      }
      function setTextContent(node, text) {
        if (text) {
          var firstChild = node.firstChild;
          if (firstChild && firstChild === node.lastChild && firstChild.nodeType === 3) {
            firstChild.nodeValue = text;
            return;
          }
        }
        node.textContent = text;
      }
      var unitlessNumbers = new Set(
        "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
          " "
        )
      );
      function setValueForStyle(style2, styleName, value) {
        var isCustomProperty = styleName.indexOf("--") === 0;
        value == null || typeof value == "boolean" || value === "" ? isCustomProperty ? style2.setProperty(styleName, "") : styleName === "float" ? style2.cssFloat = "" : style2[styleName] = "" : isCustomProperty ? style2.setProperty(styleName, value) : typeof value != "number" || value === 0 || unitlessNumbers.has(styleName) ? styleName === "float" ? style2.cssFloat = value : style2[styleName] = ("" + value).trim() : style2[styleName] = value + "px";
      }
      function setValueForStyles(node, styles, prevStyles) {
        if (styles != null && typeof styles != "object")
          throw Error(formatProdErrorMessage(62));
        if (node = node.style, prevStyles != null) {
          for (var styleName in prevStyles)
            !prevStyles.hasOwnProperty(styleName) || styles != null && styles.hasOwnProperty(styleName) || (styleName.indexOf("--") === 0 ? node.setProperty(styleName, "") : styleName === "float" ? node.cssFloat = "" : node[styleName] = "");
          for (var styleName$16 in styles)
            styleName = styles[styleName$16], styles.hasOwnProperty(styleName$16) && prevStyles[styleName$16] !== styleName && setValueForStyle(node, styleName$16, styleName);
        } else
          for (var styleName$17 in styles)
            styles.hasOwnProperty(styleName$17) && setValueForStyle(node, styleName$17, styles[styleName$17]);
      }
      function isCustomElement(tagName) {
        if (tagName.indexOf("-") === -1) return !1;
        switch (tagName) {
          case "annotation-xml":
          case "color-profile":
          case "font-face":
          case "font-face-src":
          case "font-face-uri":
          case "font-face-format":
          case "font-face-name":
          case "missing-glyph":
            return !1;
          default:
            return !0;
        }
      }
      var aliases = /* @__PURE__ */ new Map([
        ["acceptCharset", "accept-charset"],
        ["htmlFor", "for"],
        ["httpEquiv", "http-equiv"],
        ["crossOrigin", "crossorigin"],
        ["accentHeight", "accent-height"],
        ["alignmentBaseline", "alignment-baseline"],
        ["arabicForm", "arabic-form"],
        ["baselineShift", "baseline-shift"],
        ["capHeight", "cap-height"],
        ["clipPath", "clip-path"],
        ["clipRule", "clip-rule"],
        ["colorInterpolation", "color-interpolation"],
        ["colorInterpolationFilters", "color-interpolation-filters"],
        ["colorProfile", "color-profile"],
        ["colorRendering", "color-rendering"],
        ["dominantBaseline", "dominant-baseline"],
        ["enableBackground", "enable-background"],
        ["fillOpacity", "fill-opacity"],
        ["fillRule", "fill-rule"],
        ["floodColor", "flood-color"],
        ["floodOpacity", "flood-opacity"],
        ["fontFamily", "font-family"],
        ["fontSize", "font-size"],
        ["fontSizeAdjust", "font-size-adjust"],
        ["fontStretch", "font-stretch"],
        ["fontStyle", "font-style"],
        ["fontVariant", "font-variant"],
        ["fontWeight", "font-weight"],
        ["glyphName", "glyph-name"],
        ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
        ["glyphOrientationVertical", "glyph-orientation-vertical"],
        ["horizAdvX", "horiz-adv-x"],
        ["horizOriginX", "horiz-origin-x"],
        ["imageRendering", "image-rendering"],
        ["letterSpacing", "letter-spacing"],
        ["lightingColor", "lighting-color"],
        ["markerEnd", "marker-end"],
        ["markerMid", "marker-mid"],
        ["markerStart", "marker-start"],
        ["overlinePosition", "overline-position"],
        ["overlineThickness", "overline-thickness"],
        ["paintOrder", "paint-order"],
        ["panose-1", "panose-1"],
        ["pointerEvents", "pointer-events"],
        ["renderingIntent", "rendering-intent"],
        ["shapeRendering", "shape-rendering"],
        ["stopColor", "stop-color"],
        ["stopOpacity", "stop-opacity"],
        ["strikethroughPosition", "strikethrough-position"],
        ["strikethroughThickness", "strikethrough-thickness"],
        ["strokeDasharray", "stroke-dasharray"],
        ["strokeDashoffset", "stroke-dashoffset"],
        ["strokeLinecap", "stroke-linecap"],
        ["strokeLinejoin", "stroke-linejoin"],
        ["strokeMiterlimit", "stroke-miterlimit"],
        ["strokeOpacity", "stroke-opacity"],
        ["strokeWidth", "stroke-width"],
        ["textAnchor", "text-anchor"],
        ["textDecoration", "text-decoration"],
        ["textRendering", "text-rendering"],
        ["transformOrigin", "transform-origin"],
        ["underlinePosition", "underline-position"],
        ["underlineThickness", "underline-thickness"],
        ["unicodeBidi", "unicode-bidi"],
        ["unicodeRange", "unicode-range"],
        ["unitsPerEm", "units-per-em"],
        ["vAlphabetic", "v-alphabetic"],
        ["vHanging", "v-hanging"],
        ["vIdeographic", "v-ideographic"],
        ["vMathematical", "v-mathematical"],
        ["vectorEffect", "vector-effect"],
        ["vertAdvY", "vert-adv-y"],
        ["vertOriginX", "vert-origin-x"],
        ["vertOriginY", "vert-origin-y"],
        ["wordSpacing", "word-spacing"],
        ["writingMode", "writing-mode"],
        ["xmlnsXlink", "xmlns:xlink"],
        ["xHeight", "x-height"]
      ]), isJavaScriptProtocol = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
      function sanitizeURL(url) {
        return isJavaScriptProtocol.test("" + url) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : url;
      }
      function noop$1() {
      }
      var currentReplayingEvent = null;
      function getEventTarget(nativeEvent) {
        return nativeEvent = nativeEvent.target || nativeEvent.srcElement || window, nativeEvent.correspondingUseElement && (nativeEvent = nativeEvent.correspondingUseElement), nativeEvent.nodeType === 3 ? nativeEvent.parentNode : nativeEvent;
      }
      var restoreTarget = null, restoreQueue = null;
      function restoreStateOfTarget(target) {
        var internalInstance = getInstanceFromNode(target);
        if (internalInstance && (target = internalInstance.stateNode)) {
          var props = target[internalPropsKey] || null;
          a: switch (target = internalInstance.stateNode, internalInstance.type) {
            case "input":
              if (updateInput(
                target,
                props.value,
                props.defaultValue,
                props.defaultValue,
                props.checked,
                props.defaultChecked,
                props.type,
                props.name
              ), internalInstance = props.name, props.type === "radio" && internalInstance != null) {
                for (props = target; props.parentNode; ) props = props.parentNode;
                for (props = props.querySelectorAll(
                  'input[name="' + escapeSelectorAttributeValueInsideDoubleQuotes(
                    "" + internalInstance
                  ) + '"][type="radio"]'
                ), internalInstance = 0; internalInstance < props.length; internalInstance++) {
                  var otherNode = props[internalInstance];
                  if (otherNode !== target && otherNode.form === target.form) {
                    var otherProps = otherNode[internalPropsKey] || null;
                    if (!otherProps) throw Error(formatProdErrorMessage(90));
                    updateInput(
                      otherNode,
                      otherProps.value,
                      otherProps.defaultValue,
                      otherProps.defaultValue,
                      otherProps.checked,
                      otherProps.defaultChecked,
                      otherProps.type,
                      otherProps.name
                    );
                  }
                }
                for (internalInstance = 0; internalInstance < props.length; internalInstance++)
                  otherNode = props[internalInstance], otherNode.form === target.form && updateValueIfChanged(otherNode);
              }
              break a;
            case "textarea":
              updateTextarea(target, props.value, props.defaultValue);
              break a;
            case "select":
              internalInstance = props.value, internalInstance != null && updateOptions(target, !!props.multiple, internalInstance, !1);
          }
        }
      }
      var isInsideEventHandler = !1;
      function batchedUpdates$1(fn, a, b) {
        if (isInsideEventHandler) return fn(a, b);
        isInsideEventHandler = !0;
        try {
          var JSCompiler_inline_result = fn(a);
          return JSCompiler_inline_result;
        } finally {
          if (isInsideEventHandler = !1, (restoreTarget !== null || restoreQueue !== null) && (flushSyncWork$1(), restoreTarget && (a = restoreTarget, fn = restoreQueue, restoreQueue = restoreTarget = null, restoreStateOfTarget(a), fn)))
            for (a = 0; a < fn.length; a++) restoreStateOfTarget(fn[a]);
        }
      }
      function getListener(inst, registrationName) {
        var stateNode = inst.stateNode;
        if (stateNode === null) return null;
        var props = stateNode[internalPropsKey] || null;
        if (props === null) return null;
        stateNode = props[registrationName];
        a: switch (registrationName) {
          case "onClick":
          case "onClickCapture":
          case "onDoubleClick":
          case "onDoubleClickCapture":
          case "onMouseDown":
          case "onMouseDownCapture":
          case "onMouseMove":
          case "onMouseMoveCapture":
          case "onMouseUp":
          case "onMouseUpCapture":
          case "onMouseEnter":
            (props = !props.disabled) || (inst = inst.type, props = !(inst === "button" || inst === "input" || inst === "select" || inst === "textarea")), inst = !props;
            break a;
          default:
            inst = !1;
        }
        if (inst) return null;
        if (stateNode && typeof stateNode != "function")
          throw Error(
            formatProdErrorMessage(231, registrationName, typeof stateNode)
          );
        return stateNode;
      }
      var canUseDOM = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), passiveBrowserEventsSupported = !1;
      if (canUseDOM)
        try {
          options = {}, Object.defineProperty(options, "passive", {
            get: function() {
              passiveBrowserEventsSupported = !0;
            }
          }), window.addEventListener("test", options, options), window.removeEventListener("test", options, options);
        } catch {
          passiveBrowserEventsSupported = !1;
        }
      var options, root = null, startText = null, fallbackText = null;
      function getData() {
        if (fallbackText) return fallbackText;
        var start, startValue = startText, startLength = startValue.length, end, endValue = "value" in root ? root.value : root.textContent, endLength = endValue.length;
        for (start = 0; start < startLength && startValue[start] === endValue[start]; start++) ;
        var minEnd = startLength - start;
        for (end = 1; end <= minEnd && startValue[startLength - end] === endValue[endLength - end]; end++) ;
        return fallbackText = endValue.slice(start, 1 < end ? 1 - end : void 0);
      }
      function getEventCharCode(nativeEvent) {
        var keyCode = nativeEvent.keyCode;
        return "charCode" in nativeEvent ? (nativeEvent = nativeEvent.charCode, nativeEvent === 0 && keyCode === 13 && (nativeEvent = 13)) : nativeEvent = keyCode, nativeEvent === 10 && (nativeEvent = 13), 32 <= nativeEvent || nativeEvent === 13 ? nativeEvent : 0;
      }
      function functionThatReturnsTrue() {
        return !0;
      }
      function functionThatReturnsFalse() {
        return !1;
      }
      function createSyntheticEvent(Interface) {
        function SyntheticBaseEvent(reactName, reactEventType, targetInst, nativeEvent, nativeEventTarget) {
          this._reactName = reactName, this._targetInst = targetInst, this.type = reactEventType, this.nativeEvent = nativeEvent, this.target = nativeEventTarget, this.currentTarget = null;
          for (var propName in Interface)
            Interface.hasOwnProperty(propName) && (reactName = Interface[propName], this[propName] = reactName ? reactName(nativeEvent) : nativeEvent[propName]);
          return this.isDefaultPrevented = (nativeEvent.defaultPrevented != null ? nativeEvent.defaultPrevented : nativeEvent.returnValue === !1) ? functionThatReturnsTrue : functionThatReturnsFalse, this.isPropagationStopped = functionThatReturnsFalse, this;
        }
        return assign(SyntheticBaseEvent.prototype, {
          preventDefault: function() {
            this.defaultPrevented = !0;
            var event = this.nativeEvent;
            event && (event.preventDefault ? event.preventDefault() : typeof event.returnValue != "unknown" && (event.returnValue = !1), this.isDefaultPrevented = functionThatReturnsTrue);
          },
          stopPropagation: function() {
            var event = this.nativeEvent;
            event && (event.stopPropagation ? event.stopPropagation() : typeof event.cancelBubble != "unknown" && (event.cancelBubble = !0), this.isPropagationStopped = functionThatReturnsTrue);
          },
          persist: function() {
          },
          isPersistent: functionThatReturnsTrue
        }), SyntheticBaseEvent;
      }
      var EventInterface = {
        eventPhase: 0,
        bubbles: 0,
        cancelable: 0,
        timeStamp: function(event) {
          return event.timeStamp || Date.now();
        },
        defaultPrevented: 0,
        isTrusted: 0
      }, SyntheticEvent = createSyntheticEvent(EventInterface), UIEventInterface = assign({}, EventInterface, { view: 0, detail: 0 }), SyntheticUIEvent = createSyntheticEvent(UIEventInterface), lastMovementX, lastMovementY, lastMouseEvent, MouseEventInterface = assign({}, UIEventInterface, {
        screenX: 0,
        screenY: 0,
        clientX: 0,
        clientY: 0,
        pageX: 0,
        pageY: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        getModifierState: getEventModifierState,
        button: 0,
        buttons: 0,
        relatedTarget: function(event) {
          return event.relatedTarget === void 0 ? event.fromElement === event.srcElement ? event.toElement : event.fromElement : event.relatedTarget;
        },
        movementX: function(event) {
          return "movementX" in event ? event.movementX : (event !== lastMouseEvent && (lastMouseEvent && event.type === "mousemove" ? (lastMovementX = event.screenX - lastMouseEvent.screenX, lastMovementY = event.screenY - lastMouseEvent.screenY) : lastMovementY = lastMovementX = 0, lastMouseEvent = event), lastMovementX);
        },
        movementY: function(event) {
          return "movementY" in event ? event.movementY : lastMovementY;
        }
      }), SyntheticMouseEvent = createSyntheticEvent(MouseEventInterface), DragEventInterface = assign({}, MouseEventInterface, { dataTransfer: 0 }), SyntheticDragEvent = createSyntheticEvent(DragEventInterface), FocusEventInterface = assign({}, UIEventInterface, { relatedTarget: 0 }), SyntheticFocusEvent = createSyntheticEvent(FocusEventInterface), AnimationEventInterface = assign({}, EventInterface, {
        animationName: 0,
        elapsedTime: 0,
        pseudoElement: 0
      }), SyntheticAnimationEvent = createSyntheticEvent(AnimationEventInterface), ClipboardEventInterface = assign({}, EventInterface, {
        clipboardData: function(event) {
          return "clipboardData" in event ? event.clipboardData : window.clipboardData;
        }
      }), SyntheticClipboardEvent = createSyntheticEvent(ClipboardEventInterface), CompositionEventInterface = assign({}, EventInterface, { data: 0 }), SyntheticCompositionEvent = createSyntheticEvent(CompositionEventInterface), normalizeKey = {
        Esc: "Escape",
        Spacebar: " ",
        Left: "ArrowLeft",
        Up: "ArrowUp",
        Right: "ArrowRight",
        Down: "ArrowDown",
        Del: "Delete",
        Win: "OS",
        Menu: "ContextMenu",
        Apps: "ContextMenu",
        Scroll: "ScrollLock",
        MozPrintableKey: "Unidentified"
      }, translateToKey = {
        8: "Backspace",
        9: "Tab",
        12: "Clear",
        13: "Enter",
        16: "Shift",
        17: "Control",
        18: "Alt",
        19: "Pause",
        20: "CapsLock",
        27: "Escape",
        32: " ",
        33: "PageUp",
        34: "PageDown",
        35: "End",
        36: "Home",
        37: "ArrowLeft",
        38: "ArrowUp",
        39: "ArrowRight",
        40: "ArrowDown",
        45: "Insert",
        46: "Delete",
        112: "F1",
        113: "F2",
        114: "F3",
        115: "F4",
        116: "F5",
        117: "F6",
        118: "F7",
        119: "F8",
        120: "F9",
        121: "F10",
        122: "F11",
        123: "F12",
        144: "NumLock",
        145: "ScrollLock",
        224: "Meta"
      }, modifierKeyToProp = {
        Alt: "altKey",
        Control: "ctrlKey",
        Meta: "metaKey",
        Shift: "shiftKey"
      };
      function modifierStateGetter(keyArg) {
        var nativeEvent = this.nativeEvent;
        return nativeEvent.getModifierState ? nativeEvent.getModifierState(keyArg) : (keyArg = modifierKeyToProp[keyArg]) ? !!nativeEvent[keyArg] : !1;
      }
      function getEventModifierState() {
        return modifierStateGetter;
      }
      var KeyboardEventInterface = assign({}, UIEventInterface, {
        key: function(nativeEvent) {
          if (nativeEvent.key) {
            var key = normalizeKey[nativeEvent.key] || nativeEvent.key;
            if (key !== "Unidentified") return key;
          }
          return nativeEvent.type === "keypress" ? (nativeEvent = getEventCharCode(nativeEvent), nativeEvent === 13 ? "Enter" : String.fromCharCode(nativeEvent)) : nativeEvent.type === "keydown" || nativeEvent.type === "keyup" ? translateToKey[nativeEvent.keyCode] || "Unidentified" : "";
        },
        code: 0,
        location: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        repeat: 0,
        locale: 0,
        getModifierState: getEventModifierState,
        charCode: function(event) {
          return event.type === "keypress" ? getEventCharCode(event) : 0;
        },
        keyCode: function(event) {
          return event.type === "keydown" || event.type === "keyup" ? event.keyCode : 0;
        },
        which: function(event) {
          return event.type === "keypress" ? getEventCharCode(event) : event.type === "keydown" || event.type === "keyup" ? event.keyCode : 0;
        }
      }), SyntheticKeyboardEvent = createSyntheticEvent(KeyboardEventInterface), PointerEventInterface = assign({}, MouseEventInterface, {
        pointerId: 0,
        width: 0,
        height: 0,
        pressure: 0,
        tangentialPressure: 0,
        tiltX: 0,
        tiltY: 0,
        twist: 0,
        pointerType: 0,
        isPrimary: 0
      }), SyntheticPointerEvent = createSyntheticEvent(PointerEventInterface), TouchEventInterface = assign({}, UIEventInterface, {
        touches: 0,
        targetTouches: 0,
        changedTouches: 0,
        altKey: 0,
        metaKey: 0,
        ctrlKey: 0,
        shiftKey: 0,
        getModifierState: getEventModifierState
      }), SyntheticTouchEvent = createSyntheticEvent(TouchEventInterface), TransitionEventInterface = assign({}, EventInterface, {
        propertyName: 0,
        elapsedTime: 0,
        pseudoElement: 0
      }), SyntheticTransitionEvent = createSyntheticEvent(TransitionEventInterface), WheelEventInterface = assign({}, MouseEventInterface, {
        deltaX: function(event) {
          return "deltaX" in event ? event.deltaX : "wheelDeltaX" in event ? -event.wheelDeltaX : 0;
        },
        deltaY: function(event) {
          return "deltaY" in event ? event.deltaY : "wheelDeltaY" in event ? -event.wheelDeltaY : "wheelDelta" in event ? -event.wheelDelta : 0;
        },
        deltaZ: 0,
        deltaMode: 0
      }), SyntheticWheelEvent = createSyntheticEvent(WheelEventInterface), ToggleEventInterface = assign({}, EventInterface, {
        newState: 0,
        oldState: 0
      }), SyntheticToggleEvent = createSyntheticEvent(ToggleEventInterface), END_KEYCODES = [9, 13, 27, 32], canUseCompositionEvent = canUseDOM && "CompositionEvent" in window, documentMode = null;
      canUseDOM && "documentMode" in document && (documentMode = document.documentMode);
      var canUseTextInputEvent = canUseDOM && "TextEvent" in window && !documentMode, useFallbackCompositionData = canUseDOM && (!canUseCompositionEvent || documentMode && 8 < documentMode && 11 >= documentMode), SPACEBAR_CHAR = " ", hasSpaceKeypress = !1;
      function isFallbackCompositionEnd(domEventName, nativeEvent) {
        switch (domEventName) {
          case "keyup":
            return END_KEYCODES.indexOf(nativeEvent.keyCode) !== -1;
          case "keydown":
            return nativeEvent.keyCode !== 229;
          case "keypress":
          case "mousedown":
          case "focusout":
            return !0;
          default:
            return !1;
        }
      }
      function getDataFromCustomEvent(nativeEvent) {
        return nativeEvent = nativeEvent.detail, typeof nativeEvent == "object" && "data" in nativeEvent ? nativeEvent.data : null;
      }
      var isComposing = !1;
      function getNativeBeforeInputChars(domEventName, nativeEvent) {
        switch (domEventName) {
          case "compositionend":
            return getDataFromCustomEvent(nativeEvent);
          case "keypress":
            return nativeEvent.which !== 32 ? null : (hasSpaceKeypress = !0, SPACEBAR_CHAR);
          case "textInput":
            return domEventName = nativeEvent.data, domEventName === SPACEBAR_CHAR && hasSpaceKeypress ? null : domEventName;
          default:
            return null;
        }
      }
      function getFallbackBeforeInputChars(domEventName, nativeEvent) {
        if (isComposing)
          return domEventName === "compositionend" || !canUseCompositionEvent && isFallbackCompositionEnd(domEventName, nativeEvent) ? (domEventName = getData(), fallbackText = startText = root = null, isComposing = !1, domEventName) : null;
        switch (domEventName) {
          case "paste":
            return null;
          case "keypress":
            if (!(nativeEvent.ctrlKey || nativeEvent.altKey || nativeEvent.metaKey) || nativeEvent.ctrlKey && nativeEvent.altKey) {
              if (nativeEvent.char && 1 < nativeEvent.char.length)
                return nativeEvent.char;
              if (nativeEvent.which) return String.fromCharCode(nativeEvent.which);
            }
            return null;
          case "compositionend":
            return useFallbackCompositionData && nativeEvent.locale !== "ko" ? null : nativeEvent.data;
          default:
            return null;
        }
      }
      var supportedInputTypes = {
        color: !0,
        date: !0,
        datetime: !0,
        "datetime-local": !0,
        email: !0,
        month: !0,
        number: !0,
        password: !0,
        range: !0,
        search: !0,
        tel: !0,
        text: !0,
        time: !0,
        url: !0,
        week: !0
      };
      function isTextInputElement(elem) {
        var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();
        return nodeName === "input" ? !!supportedInputTypes[elem.type] : nodeName === "textarea";
      }
      function createAndAccumulateChangeEvent(dispatchQueue, inst, nativeEvent, target) {
        restoreTarget ? restoreQueue ? restoreQueue.push(target) : restoreQueue = [target] : restoreTarget = target, inst = accumulateTwoPhaseListeners(inst, "onChange"), 0 < inst.length && (nativeEvent = new SyntheticEvent(
          "onChange",
          "change",
          null,
          nativeEvent,
          target
        ), dispatchQueue.push({ event: nativeEvent, listeners: inst }));
      }
      var activeElement$1 = null, activeElementInst$1 = null;
      function runEventInBatch(dispatchQueue) {
        processDispatchQueue(dispatchQueue, 0);
      }
      function getInstIfValueChanged(targetInst) {
        var targetNode = getNodeFromInstance(targetInst);
        if (updateValueIfChanged(targetNode)) return targetInst;
      }
      function getTargetInstForChangeEvent(domEventName, targetInst) {
        if (domEventName === "change") return targetInst;
      }
      var isInputEventSupported = !1;
      canUseDOM && (canUseDOM ? (isSupported$jscomp$inline_427 = "oninput" in document, isSupported$jscomp$inline_427 || (element$jscomp$inline_428 = document.createElement("div"), element$jscomp$inline_428.setAttribute("oninput", "return;"), isSupported$jscomp$inline_427 = typeof element$jscomp$inline_428.oninput == "function"), JSCompiler_inline_result$jscomp$286 = isSupported$jscomp$inline_427) : JSCompiler_inline_result$jscomp$286 = !1, isInputEventSupported = JSCompiler_inline_result$jscomp$286 && (!document.documentMode || 9 < document.documentMode));
      var JSCompiler_inline_result$jscomp$286, isSupported$jscomp$inline_427, element$jscomp$inline_428;
      function stopWatchingForValueChange() {
        activeElement$1 && (activeElement$1.detachEvent("onpropertychange", handlePropertyChange), activeElementInst$1 = activeElement$1 = null);
      }
      function handlePropertyChange(nativeEvent) {
        if (nativeEvent.propertyName === "value" && getInstIfValueChanged(activeElementInst$1)) {
          var dispatchQueue = [];
          createAndAccumulateChangeEvent(
            dispatchQueue,
            activeElementInst$1,
            nativeEvent,
            getEventTarget(nativeEvent)
          ), batchedUpdates$1(runEventInBatch, dispatchQueue);
        }
      }
      function handleEventsForInputEventPolyfill(domEventName, target, targetInst) {
        domEventName === "focusin" ? (stopWatchingForValueChange(), activeElement$1 = target, activeElementInst$1 = targetInst, activeElement$1.attachEvent("onpropertychange", handlePropertyChange)) : domEventName === "focusout" && stopWatchingForValueChange();
      }
      function getTargetInstForInputEventPolyfill(domEventName) {
        if (domEventName === "selectionchange" || domEventName === "keyup" || domEventName === "keydown")
          return getInstIfValueChanged(activeElementInst$1);
      }
      function getTargetInstForClickEvent(domEventName, targetInst) {
        if (domEventName === "click") return getInstIfValueChanged(targetInst);
      }
      function getTargetInstForInputOrChangeEvent(domEventName, targetInst) {
        if (domEventName === "input" || domEventName === "change")
          return getInstIfValueChanged(targetInst);
      }
      function is(x, y) {
        return x === y && (x !== 0 || 1 / x === 1 / y) || x !== x && y !== y;
      }
      var objectIs = typeof Object.is == "function" ? Object.is : is;
      function shallowEqual(objA, objB) {
        if (objectIs(objA, objB)) return !0;
        if (typeof objA != "object" || objA === null || typeof objB != "object" || objB === null)
          return !1;
        var keysA = Object.keys(objA), keysB = Object.keys(objB);
        if (keysA.length !== keysB.length) return !1;
        for (keysB = 0; keysB < keysA.length; keysB++) {
          var currentKey = keysA[keysB];
          if (!hasOwnProperty.call(objB, currentKey) || !objectIs(objA[currentKey], objB[currentKey]))
            return !1;
        }
        return !0;
      }
      function getLeafNode(node) {
        for (; node && node.firstChild; ) node = node.firstChild;
        return node;
      }
      function getNodeForCharacterOffset(root2, offset) {
        var node = getLeafNode(root2);
        root2 = 0;
        for (var nodeEnd; node; ) {
          if (node.nodeType === 3) {
            if (nodeEnd = root2 + node.textContent.length, root2 <= offset && nodeEnd >= offset)
              return { node, offset: offset - root2 };
            root2 = nodeEnd;
          }
          a: {
            for (; node; ) {
              if (node.nextSibling) {
                node = node.nextSibling;
                break a;
              }
              node = node.parentNode;
            }
            node = void 0;
          }
          node = getLeafNode(node);
        }
      }
      function containsNode(outerNode, innerNode) {
        return outerNode && innerNode ? outerNode === innerNode ? !0 : outerNode && outerNode.nodeType === 3 ? !1 : innerNode && innerNode.nodeType === 3 ? containsNode(outerNode, innerNode.parentNode) : "contains" in outerNode ? outerNode.contains(innerNode) : outerNode.compareDocumentPosition ? !!(outerNode.compareDocumentPosition(innerNode) & 16) : !1 : !1;
      }
      function getActiveElementDeep(containerInfo) {
        containerInfo = containerInfo != null && containerInfo.ownerDocument != null && containerInfo.ownerDocument.defaultView != null ? containerInfo.ownerDocument.defaultView : window;
        for (var element = getActiveElement(containerInfo.document); element instanceof containerInfo.HTMLIFrameElement; ) {
          try {
            var JSCompiler_inline_result = typeof element.contentWindow.location.href == "string";
          } catch {
            JSCompiler_inline_result = !1;
          }
          if (JSCompiler_inline_result) containerInfo = element.contentWindow;
          else break;
          element = getActiveElement(containerInfo.document);
        }
        return element;
      }
      function hasSelectionCapabilities(elem) {
        var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();
        return nodeName && (nodeName === "input" && (elem.type === "text" || elem.type === "search" || elem.type === "tel" || elem.type === "url" || elem.type === "password") || nodeName === "textarea" || elem.contentEditable === "true");
      }
      var skipSelectionChangeEvent = canUseDOM && "documentMode" in document && 11 >= document.documentMode, activeElement = null, activeElementInst = null, lastSelection = null, mouseDown = !1;
      function constructSelectEvent(dispatchQueue, nativeEvent, nativeEventTarget) {
        var doc = nativeEventTarget.window === nativeEventTarget ? nativeEventTarget.document : nativeEventTarget.nodeType === 9 ? nativeEventTarget : nativeEventTarget.ownerDocument;
        mouseDown || activeElement == null || activeElement !== getActiveElement(doc) || (doc = activeElement, "selectionStart" in doc && hasSelectionCapabilities(doc) ? doc = { start: doc.selectionStart, end: doc.selectionEnd } : (doc = (doc.ownerDocument && doc.ownerDocument.defaultView || window).getSelection(), doc = {
          anchorNode: doc.anchorNode,
          anchorOffset: doc.anchorOffset,
          focusNode: doc.focusNode,
          focusOffset: doc.focusOffset
        }), lastSelection && shallowEqual(lastSelection, doc) || (lastSelection = doc, doc = accumulateTwoPhaseListeners(activeElementInst, "onSelect"), 0 < doc.length && (nativeEvent = new SyntheticEvent(
          "onSelect",
          "select",
          null,
          nativeEvent,
          nativeEventTarget
        ), dispatchQueue.push({ event: nativeEvent, listeners: doc }), nativeEvent.target = activeElement)));
      }
      function makePrefixMap(styleProp, eventName) {
        var prefixes = {};
        return prefixes[styleProp.toLowerCase()] = eventName.toLowerCase(), prefixes["Webkit" + styleProp] = "webkit" + eventName, prefixes["Moz" + styleProp] = "moz" + eventName, prefixes;
      }
      var vendorPrefixes = {
        animationend: makePrefixMap("Animation", "AnimationEnd"),
        animationiteration: makePrefixMap("Animation", "AnimationIteration"),
        animationstart: makePrefixMap("Animation", "AnimationStart"),
        transitionrun: makePrefixMap("Transition", "TransitionRun"),
        transitionstart: makePrefixMap("Transition", "TransitionStart"),
        transitioncancel: makePrefixMap("Transition", "TransitionCancel"),
        transitionend: makePrefixMap("Transition", "TransitionEnd")
      }, prefixedEventNames = {}, style = {};
      canUseDOM && (style = document.createElement("div").style, "AnimationEvent" in window || (delete vendorPrefixes.animationend.animation, delete vendorPrefixes.animationiteration.animation, delete vendorPrefixes.animationstart.animation), "TransitionEvent" in window || delete vendorPrefixes.transitionend.transition);
      function getVendorPrefixedEventName(eventName) {
        if (prefixedEventNames[eventName]) return prefixedEventNames[eventName];
        if (!vendorPrefixes[eventName]) return eventName;
        var prefixMap = vendorPrefixes[eventName], styleProp;
        for (styleProp in prefixMap)
          if (prefixMap.hasOwnProperty(styleProp) && styleProp in style)
            return prefixedEventNames[eventName] = prefixMap[styleProp];
        return eventName;
      }
      var ANIMATION_END = getVendorPrefixedEventName("animationend"), ANIMATION_ITERATION = getVendorPrefixedEventName("animationiteration"), ANIMATION_START = getVendorPrefixedEventName("animationstart"), TRANSITION_RUN = getVendorPrefixedEventName("transitionrun"), TRANSITION_START = getVendorPrefixedEventName("transitionstart"), TRANSITION_CANCEL = getVendorPrefixedEventName("transitioncancel"), TRANSITION_END = getVendorPrefixedEventName("transitionend"), topLevelEventsToReactNames = /* @__PURE__ */ new Map(), simpleEventPluginEvents = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
        " "
      );
      simpleEventPluginEvents.push("scrollEnd");
      function registerSimpleEvent(domEventName, reactName) {
        topLevelEventsToReactNames.set(domEventName, reactName), registerTwoPhaseEvent(reactName, [domEventName]);
      }
      var reportGlobalError = typeof reportError == "function" ? reportError : function(error) {
        if (typeof window == "object" && typeof window.ErrorEvent == "function") {
          var event = new window.ErrorEvent("error", {
            bubbles: !0,
            cancelable: !0,
            message: typeof error == "object" && error !== null && typeof error.message == "string" ? String(error.message) : String(error),
            error
          });
          if (!window.dispatchEvent(event)) return;
        } else if (typeof process == "object" && typeof process.emit == "function") {
          process.emit("uncaughtException", error);
          return;
        }
        console.error(error);
      }, concurrentQueues = [], concurrentQueuesIndex = 0, concurrentlyUpdatedLanes = 0;
      function finishQueueingConcurrentUpdates() {
        for (var endIndex = concurrentQueuesIndex, i = concurrentlyUpdatedLanes = concurrentQueuesIndex = 0; i < endIndex; ) {
          var fiber = concurrentQueues[i];
          concurrentQueues[i++] = null;
          var queue = concurrentQueues[i];
          concurrentQueues[i++] = null;
          var update = concurrentQueues[i];
          concurrentQueues[i++] = null;
          var lane = concurrentQueues[i];
          if (concurrentQueues[i++] = null, queue !== null && update !== null) {
            var pending = queue.pending;
            pending === null ? update.next = update : (update.next = pending.next, pending.next = update), queue.pending = update;
          }
          lane !== 0 && markUpdateLaneFromFiberToRoot(fiber, update, lane);
        }
      }
      function enqueueUpdate$1(fiber, queue, update, lane) {
        concurrentQueues[concurrentQueuesIndex++] = fiber, concurrentQueues[concurrentQueuesIndex++] = queue, concurrentQueues[concurrentQueuesIndex++] = update, concurrentQueues[concurrentQueuesIndex++] = lane, concurrentlyUpdatedLanes |= lane, fiber.lanes |= lane, fiber = fiber.alternate, fiber !== null && (fiber.lanes |= lane);
      }
      function enqueueConcurrentHookUpdate(fiber, queue, update, lane) {
        return enqueueUpdate$1(fiber, queue, update, lane), getRootForUpdatedFiber(fiber);
      }
      function enqueueConcurrentRenderForLane(fiber, lane) {
        return enqueueUpdate$1(fiber, null, null, lane), getRootForUpdatedFiber(fiber);
      }
      function markUpdateLaneFromFiberToRoot(sourceFiber, update, lane) {
        sourceFiber.lanes |= lane;
        var alternate = sourceFiber.alternate;
        alternate !== null && (alternate.lanes |= lane);
        for (var isHidden = !1, parent = sourceFiber.return; parent !== null; )
          parent.childLanes |= lane, alternate = parent.alternate, alternate !== null && (alternate.childLanes |= lane), parent.tag === 22 && (sourceFiber = parent.stateNode, sourceFiber === null || sourceFiber._visibility & 1 || (isHidden = !0)), sourceFiber = parent, parent = parent.return;
        return sourceFiber.tag === 3 ? (parent = sourceFiber.stateNode, isHidden && update !== null && (isHidden = 31 - clz32(lane), sourceFiber = parent.hiddenUpdates, alternate = sourceFiber[isHidden], alternate === null ? sourceFiber[isHidden] = [update] : alternate.push(update), update.lane = lane | 536870912), parent) : null;
      }
      function getRootForUpdatedFiber(sourceFiber) {
        if (50 < nestedUpdateCount)
          throw nestedUpdateCount = 0, rootWithNestedUpdates = null, Error(formatProdErrorMessage(185));
        for (var parent = sourceFiber.return; parent !== null; )
          sourceFiber = parent, parent = sourceFiber.return;
        return sourceFiber.tag === 3 ? sourceFiber.stateNode : null;
      }
      var emptyContextObject = {};
      function FiberNode(tag, pendingProps, key, mode) {
        this.tag = tag, this.key = key, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = pendingProps, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = mode, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
      }
      function createFiberImplClass(tag, pendingProps, key, mode) {
        return new FiberNode(tag, pendingProps, key, mode);
      }
      function shouldConstruct(Component) {
        return Component = Component.prototype, !(!Component || !Component.isReactComponent);
      }
      function createWorkInProgress(current, pendingProps) {
        var workInProgress2 = current.alternate;
        return workInProgress2 === null ? (workInProgress2 = createFiberImplClass(
          current.tag,
          pendingProps,
          current.key,
          current.mode
        ), workInProgress2.elementType = current.elementType, workInProgress2.type = current.type, workInProgress2.stateNode = current.stateNode, workInProgress2.alternate = current, current.alternate = workInProgress2) : (workInProgress2.pendingProps = pendingProps, workInProgress2.type = current.type, workInProgress2.flags = 0, workInProgress2.subtreeFlags = 0, workInProgress2.deletions = null), workInProgress2.flags = current.flags & 65011712, workInProgress2.childLanes = current.childLanes, workInProgress2.lanes = current.lanes, workInProgress2.child = current.child, workInProgress2.memoizedProps = current.memoizedProps, workInProgress2.memoizedState = current.memoizedState, workInProgress2.updateQueue = current.updateQueue, pendingProps = current.dependencies, workInProgress2.dependencies = pendingProps === null ? null : { lanes: pendingProps.lanes, firstContext: pendingProps.firstContext }, workInProgress2.sibling = current.sibling, workInProgress2.index = current.index, workInProgress2.ref = current.ref, workInProgress2.refCleanup = current.refCleanup, workInProgress2;
      }
      function resetWorkInProgress(workInProgress2, renderLanes2) {
        workInProgress2.flags &= 65011714;
        var current = workInProgress2.alternate;
        return current === null ? (workInProgress2.childLanes = 0, workInProgress2.lanes = renderLanes2, workInProgress2.child = null, workInProgress2.subtreeFlags = 0, workInProgress2.memoizedProps = null, workInProgress2.memoizedState = null, workInProgress2.updateQueue = null, workInProgress2.dependencies = null, workInProgress2.stateNode = null) : (workInProgress2.childLanes = current.childLanes, workInProgress2.lanes = current.lanes, workInProgress2.child = current.child, workInProgress2.subtreeFlags = 0, workInProgress2.deletions = null, workInProgress2.memoizedProps = current.memoizedProps, workInProgress2.memoizedState = current.memoizedState, workInProgress2.updateQueue = current.updateQueue, workInProgress2.type = current.type, renderLanes2 = current.dependencies, workInProgress2.dependencies = renderLanes2 === null ? null : {
          lanes: renderLanes2.lanes,
          firstContext: renderLanes2.firstContext
        }), workInProgress2;
      }
      function createFiberFromTypeAndProps(type, key, pendingProps, owner, mode, lanes) {
        var fiberTag = 0;
        if (owner = type, typeof type == "function") shouldConstruct(type) && (fiberTag = 1);
        else if (typeof type == "string")
          fiberTag = isHostHoistableType(
            type,
            pendingProps,
            contextStackCursor.current
          ) ? 26 : type === "html" || type === "head" || type === "body" ? 27 : 5;
        else
          a: switch (type) {
            case REACT_ACTIVITY_TYPE:
              return type = createFiberImplClass(31, pendingProps, key, mode), type.elementType = REACT_ACTIVITY_TYPE, type.lanes = lanes, type;
            case REACT_FRAGMENT_TYPE:
              return createFiberFromFragment(pendingProps.children, mode, lanes, key);
            case REACT_STRICT_MODE_TYPE:
              fiberTag = 8, mode |= 24;
              break;
            case REACT_PROFILER_TYPE:
              return type = createFiberImplClass(12, pendingProps, key, mode | 2), type.elementType = REACT_PROFILER_TYPE, type.lanes = lanes, type;
            case REACT_SUSPENSE_TYPE:
              return type = createFiberImplClass(13, pendingProps, key, mode), type.elementType = REACT_SUSPENSE_TYPE, type.lanes = lanes, type;
            case REACT_SUSPENSE_LIST_TYPE:
              return type = createFiberImplClass(19, pendingProps, key, mode), type.elementType = REACT_SUSPENSE_LIST_TYPE, type.lanes = lanes, type;
            default:
              if (typeof type == "object" && type !== null)
                switch (type.$$typeof) {
                  case REACT_CONTEXT_TYPE:
                    fiberTag = 10;
                    break a;
                  case REACT_CONSUMER_TYPE:
                    fiberTag = 9;
                    break a;
                  case REACT_FORWARD_REF_TYPE:
                    fiberTag = 11;
                    break a;
                  case REACT_MEMO_TYPE:
                    fiberTag = 14;
                    break a;
                  case REACT_LAZY_TYPE:
                    fiberTag = 16, owner = null;
                    break a;
                }
              fiberTag = 29, pendingProps = Error(
                formatProdErrorMessage(130, type === null ? "null" : typeof type, "")
              ), owner = null;
          }
        return key = createFiberImplClass(fiberTag, pendingProps, key, mode), key.elementType = type, key.type = owner, key.lanes = lanes, key;
      }
      function createFiberFromFragment(elements, mode, lanes, key) {
        return elements = createFiberImplClass(7, elements, key, mode), elements.lanes = lanes, elements;
      }
      function createFiberFromText(content, mode, lanes) {
        return content = createFiberImplClass(6, content, null, mode), content.lanes = lanes, content;
      }
      function createFiberFromDehydratedFragment(dehydratedNode) {
        var fiber = createFiberImplClass(18, null, null, 0);
        return fiber.stateNode = dehydratedNode, fiber;
      }
      function createFiberFromPortal(portal, mode, lanes) {
        return mode = createFiberImplClass(
          4,
          portal.children !== null ? portal.children : [],
          portal.key,
          mode
        ), mode.lanes = lanes, mode.stateNode = {
          containerInfo: portal.containerInfo,
          pendingChildren: null,
          implementation: portal.implementation
        }, mode;
      }
      var CapturedStacks = /* @__PURE__ */ new WeakMap();
      function createCapturedValueAtFiber(value, source) {
        if (typeof value == "object" && value !== null) {
          var existing = CapturedStacks.get(value);
          return existing !== void 0 ? existing : (source = {
            value,
            source,
            stack: getStackByFiberInDevAndProd(source)
          }, CapturedStacks.set(value, source), source);
        }
        return {
          value,
          source,
          stack: getStackByFiberInDevAndProd(source)
        };
      }
      var forkStack = [], forkStackIndex = 0, treeForkProvider = null, treeForkCount = 0, idStack = [], idStackIndex = 0, treeContextProvider = null, treeContextId = 1, treeContextOverflow = "";
      function pushTreeFork(workInProgress2, totalChildren) {
        forkStack[forkStackIndex++] = treeForkCount, forkStack[forkStackIndex++] = treeForkProvider, treeForkProvider = workInProgress2, treeForkCount = totalChildren;
      }
      function pushTreeId(workInProgress2, totalChildren, index2) {
        idStack[idStackIndex++] = treeContextId, idStack[idStackIndex++] = treeContextOverflow, idStack[idStackIndex++] = treeContextProvider, treeContextProvider = workInProgress2;
        var baseIdWithLeadingBit = treeContextId;
        workInProgress2 = treeContextOverflow;
        var baseLength = 32 - clz32(baseIdWithLeadingBit) - 1;
        baseIdWithLeadingBit &= ~(1 << baseLength), index2 += 1;
        var length = 32 - clz32(totalChildren) + baseLength;
        if (30 < length) {
          var numberOfOverflowBits = baseLength - baseLength % 5;
          length = (baseIdWithLeadingBit & (1 << numberOfOverflowBits) - 1).toString(32), baseIdWithLeadingBit >>= numberOfOverflowBits, baseLength -= numberOfOverflowBits, treeContextId = 1 << 32 - clz32(totalChildren) + baseLength | index2 << baseLength | baseIdWithLeadingBit, treeContextOverflow = length + workInProgress2;
        } else
          treeContextId = 1 << length | index2 << baseLength | baseIdWithLeadingBit, treeContextOverflow = workInProgress2;
      }
      function pushMaterializedTreeId(workInProgress2) {
        workInProgress2.return !== null && (pushTreeFork(workInProgress2, 1), pushTreeId(workInProgress2, 1, 0));
      }
      function popTreeContext(workInProgress2) {
        for (; workInProgress2 === treeForkProvider; )
          treeForkProvider = forkStack[--forkStackIndex], forkStack[forkStackIndex] = null, treeForkCount = forkStack[--forkStackIndex], forkStack[forkStackIndex] = null;
        for (; workInProgress2 === treeContextProvider; )
          treeContextProvider = idStack[--idStackIndex], idStack[idStackIndex] = null, treeContextOverflow = idStack[--idStackIndex], idStack[idStackIndex] = null, treeContextId = idStack[--idStackIndex], idStack[idStackIndex] = null;
      }
      function restoreSuspendedTreeContext(workInProgress2, suspendedContext) {
        idStack[idStackIndex++] = treeContextId, idStack[idStackIndex++] = treeContextOverflow, idStack[idStackIndex++] = treeContextProvider, treeContextId = suspendedContext.id, treeContextOverflow = suspendedContext.overflow, treeContextProvider = workInProgress2;
      }
      var hydrationParentFiber = null, nextHydratableInstance = null, isHydrating = !1, hydrationErrors = null, rootOrSingletonContext = !1, HydrationMismatchException = Error(formatProdErrorMessage(519));
      function throwOnHydrationMismatch(fiber) {
        var error = Error(
          formatProdErrorMessage(
            418,
            1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
            ""
          )
        );
        throw queueHydrationError(createCapturedValueAtFiber(error, fiber)), HydrationMismatchException;
      }
      function prepareToHydrateHostInstance(fiber) {
        var instance = fiber.stateNode, type = fiber.type, props = fiber.memoizedProps;
        switch (instance[internalInstanceKey] = fiber, instance[internalPropsKey] = props, type) {
          case "dialog":
            listenToNonDelegatedEvent("cancel", instance), listenToNonDelegatedEvent("close", instance);
            break;
          case "iframe":
          case "object":
          case "embed":
            listenToNonDelegatedEvent("load", instance);
            break;
          case "video":
          case "audio":
            for (type = 0; type < mediaEventTypes.length; type++)
              listenToNonDelegatedEvent(mediaEventTypes[type], instance);
            break;
          case "source":
            listenToNonDelegatedEvent("error", instance);
            break;
          case "img":
          case "image":
          case "link":
            listenToNonDelegatedEvent("error", instance), listenToNonDelegatedEvent("load", instance);
            break;
          case "details":
            listenToNonDelegatedEvent("toggle", instance);
            break;
          case "input":
            listenToNonDelegatedEvent("invalid", instance), initInput(
              instance,
              props.value,
              props.defaultValue,
              props.checked,
              props.defaultChecked,
              props.type,
              props.name,
              !0
            );
            break;
          case "select":
            listenToNonDelegatedEvent("invalid", instance);
            break;
          case "textarea":
            listenToNonDelegatedEvent("invalid", instance), initTextarea(instance, props.value, props.defaultValue, props.children);
        }
        type = props.children, typeof type != "string" && typeof type != "number" && typeof type != "bigint" || instance.textContent === "" + type || props.suppressHydrationWarning === !0 || checkForUnmatchedText(instance.textContent, type) ? (props.popover != null && (listenToNonDelegatedEvent("beforetoggle", instance), listenToNonDelegatedEvent("toggle", instance)), props.onScroll != null && listenToNonDelegatedEvent("scroll", instance), props.onScrollEnd != null && listenToNonDelegatedEvent("scrollend", instance), props.onClick != null && (instance.onclick = noop$1), instance = !0) : instance = !1, instance || throwOnHydrationMismatch(fiber, !0);
      }
      function popToNextHostParent(fiber) {
        for (hydrationParentFiber = fiber.return; hydrationParentFiber; )
          switch (hydrationParentFiber.tag) {
            case 5:
            case 31:
            case 13:
              rootOrSingletonContext = !1;
              return;
            case 27:
            case 3:
              rootOrSingletonContext = !0;
              return;
            default:
              hydrationParentFiber = hydrationParentFiber.return;
          }
      }
      function popHydrationState(fiber) {
        if (fiber !== hydrationParentFiber) return !1;
        if (!isHydrating) return popToNextHostParent(fiber), isHydrating = !0, !1;
        var tag = fiber.tag, JSCompiler_temp;
        if ((JSCompiler_temp = tag !== 3 && tag !== 27) && ((JSCompiler_temp = tag === 5) && (JSCompiler_temp = fiber.type, JSCompiler_temp = !(JSCompiler_temp !== "form" && JSCompiler_temp !== "button") || shouldSetTextContent(fiber.type, fiber.memoizedProps)), JSCompiler_temp = !JSCompiler_temp), JSCompiler_temp && nextHydratableInstance && throwOnHydrationMismatch(fiber), popToNextHostParent(fiber), tag === 13) {
          if (fiber = fiber.memoizedState, fiber = fiber !== null ? fiber.dehydrated : null, !fiber) throw Error(formatProdErrorMessage(317));
          nextHydratableInstance = getNextHydratableInstanceAfterHydrationBoundary(fiber);
        } else if (tag === 31) {
          if (fiber = fiber.memoizedState, fiber = fiber !== null ? fiber.dehydrated : null, !fiber) throw Error(formatProdErrorMessage(317));
          nextHydratableInstance = getNextHydratableInstanceAfterHydrationBoundary(fiber);
        } else
          tag === 27 ? (tag = nextHydratableInstance, isSingletonScope(fiber.type) ? (fiber = previousHydratableOnEnteringScopedSingleton, previousHydratableOnEnteringScopedSingleton = null, nextHydratableInstance = fiber) : nextHydratableInstance = tag) : nextHydratableInstance = hydrationParentFiber ? getNextHydratable(fiber.stateNode.nextSibling) : null;
        return !0;
      }
      function resetHydrationState() {
        nextHydratableInstance = hydrationParentFiber = null, isHydrating = !1;
      }
      function upgradeHydrationErrorsToRecoverable() {
        var queuedErrors = hydrationErrors;
        return queuedErrors !== null && (workInProgressRootRecoverableErrors === null ? workInProgressRootRecoverableErrors = queuedErrors : workInProgressRootRecoverableErrors.push.apply(
          workInProgressRootRecoverableErrors,
          queuedErrors
        ), hydrationErrors = null), queuedErrors;
      }
      function queueHydrationError(error) {
        hydrationErrors === null ? hydrationErrors = [error] : hydrationErrors.push(error);
      }
      var valueCursor = createCursor(null), currentlyRenderingFiber$1 = null, lastContextDependency = null;
      function pushProvider(providerFiber, context, nextValue) {
        push(valueCursor, context._currentValue), context._currentValue = nextValue;
      }
      function popProvider(context) {
        context._currentValue = valueCursor.current, pop(valueCursor);
      }
      function scheduleContextWorkOnParentPath(parent, renderLanes2, propagationRoot) {
        for (; parent !== null; ) {
          var alternate = parent.alternate;
          if ((parent.childLanes & renderLanes2) !== renderLanes2 ? (parent.childLanes |= renderLanes2, alternate !== null && (alternate.childLanes |= renderLanes2)) : alternate !== null && (alternate.childLanes & renderLanes2) !== renderLanes2 && (alternate.childLanes |= renderLanes2), parent === propagationRoot) break;
          parent = parent.return;
        }
      }
      function propagateContextChanges(workInProgress2, contexts, renderLanes2, forcePropagateEntireTree) {
        var fiber = workInProgress2.child;
        for (fiber !== null && (fiber.return = workInProgress2); fiber !== null; ) {
          var list = fiber.dependencies;
          if (list !== null) {
            var nextFiber = fiber.child;
            list = list.firstContext;
            a: for (; list !== null; ) {
              var dependency = list;
              list = fiber;
              for (var i = 0; i < contexts.length; i++)
                if (dependency.context === contexts[i]) {
                  list.lanes |= renderLanes2, dependency = list.alternate, dependency !== null && (dependency.lanes |= renderLanes2), scheduleContextWorkOnParentPath(
                    list.return,
                    renderLanes2,
                    workInProgress2
                  ), forcePropagateEntireTree || (nextFiber = null);
                  break a;
                }
              list = dependency.next;
            }
          } else if (fiber.tag === 18) {
            if (nextFiber = fiber.return, nextFiber === null) throw Error(formatProdErrorMessage(341));
            nextFiber.lanes |= renderLanes2, list = nextFiber.alternate, list !== null && (list.lanes |= renderLanes2), scheduleContextWorkOnParentPath(nextFiber, renderLanes2, workInProgress2), nextFiber = null;
          } else nextFiber = fiber.child;
          if (nextFiber !== null) nextFiber.return = fiber;
          else
            for (nextFiber = fiber; nextFiber !== null; ) {
              if (nextFiber === workInProgress2) {
                nextFiber = null;
                break;
              }
              if (fiber = nextFiber.sibling, fiber !== null) {
                fiber.return = nextFiber.return, nextFiber = fiber;
                break;
              }
              nextFiber = nextFiber.return;
            }
          fiber = nextFiber;
        }
      }
      function propagateParentContextChanges(current, workInProgress2, renderLanes2, forcePropagateEntireTree) {
        current = null;
        for (var parent = workInProgress2, isInsidePropagationBailout = !1; parent !== null; ) {
          if (!isInsidePropagationBailout) {
            if ((parent.flags & 524288) !== 0) isInsidePropagationBailout = !0;
            else if ((parent.flags & 262144) !== 0) break;
          }
          if (parent.tag === 10) {
            var currentParent = parent.alternate;
            if (currentParent === null) throw Error(formatProdErrorMessage(387));
            if (currentParent = currentParent.memoizedProps, currentParent !== null) {
              var context = parent.type;
              objectIs(parent.pendingProps.value, currentParent.value) || (current !== null ? current.push(context) : current = [context]);
            }
          } else if (parent === hostTransitionProviderCursor.current) {
            if (currentParent = parent.alternate, currentParent === null) throw Error(formatProdErrorMessage(387));
            currentParent.memoizedState.memoizedState !== parent.memoizedState.memoizedState && (current !== null ? current.push(HostTransitionContext) : current = [HostTransitionContext]);
          }
          parent = parent.return;
        }
        current !== null && propagateContextChanges(
          workInProgress2,
          current,
          renderLanes2,
          forcePropagateEntireTree
        ), workInProgress2.flags |= 262144;
      }
      function checkIfContextChanged(currentDependencies) {
        for (currentDependencies = currentDependencies.firstContext; currentDependencies !== null; ) {
          if (!objectIs(
            currentDependencies.context._currentValue,
            currentDependencies.memoizedValue
          ))
            return !0;
          currentDependencies = currentDependencies.next;
        }
        return !1;
      }
      function prepareToReadContext(workInProgress2) {
        currentlyRenderingFiber$1 = workInProgress2, lastContextDependency = null, workInProgress2 = workInProgress2.dependencies, workInProgress2 !== null && (workInProgress2.firstContext = null);
      }
      function readContext(context) {
        return readContextForConsumer(currentlyRenderingFiber$1, context);
      }
      function readContextDuringReconciliation(consumer, context) {
        return currentlyRenderingFiber$1 === null && prepareToReadContext(consumer), readContextForConsumer(consumer, context);
      }
      function readContextForConsumer(consumer, context) {
        var value = context._currentValue;
        if (context = { context, memoizedValue: value, next: null }, lastContextDependency === null) {
          if (consumer === null) throw Error(formatProdErrorMessage(308));
          lastContextDependency = context, consumer.dependencies = { lanes: 0, firstContext: context }, consumer.flags |= 524288;
        } else lastContextDependency = lastContextDependency.next = context;
        return value;
      }
      var AbortControllerLocal = typeof AbortController < "u" ? AbortController : function() {
        var listeners = [], signal = this.signal = {
          aborted: !1,
          addEventListener: function(type, listener) {
            listeners.push(listener);
          }
        };
        this.abort = function() {
          signal.aborted = !0, listeners.forEach(function(listener) {
            return listener();
          });
        };
      }, scheduleCallback$2 = Scheduler.unstable_scheduleCallback, NormalPriority = Scheduler.unstable_NormalPriority, CacheContext = {
        $$typeof: REACT_CONTEXT_TYPE,
        Consumer: null,
        Provider: null,
        _currentValue: null,
        _currentValue2: null,
        _threadCount: 0
      };
      function createCache() {
        return {
          controller: new AbortControllerLocal(),
          data: /* @__PURE__ */ new Map(),
          refCount: 0
        };
      }
      function releaseCache(cache) {
        cache.refCount--, cache.refCount === 0 && scheduleCallback$2(NormalPriority, function() {
          cache.controller.abort();
        });
      }
      var currentEntangledListeners = null, currentEntangledPendingCount = 0, currentEntangledLane = 0, currentEntangledActionThenable = null;
      function entangleAsyncAction(transition, thenable) {
        if (currentEntangledListeners === null) {
          var entangledListeners = currentEntangledListeners = [];
          currentEntangledPendingCount = 0, currentEntangledLane = requestTransitionLane(), currentEntangledActionThenable = {
            status: "pending",
            value: void 0,
            then: function(resolve) {
              entangledListeners.push(resolve);
            }
          };
        }
        return currentEntangledPendingCount++, thenable.then(pingEngtangledActionScope, pingEngtangledActionScope), thenable;
      }
      function pingEngtangledActionScope() {
        if (--currentEntangledPendingCount === 0 && currentEntangledListeners !== null) {
          currentEntangledActionThenable !== null && (currentEntangledActionThenable.status = "fulfilled");
          var listeners = currentEntangledListeners;
          currentEntangledListeners = null, currentEntangledLane = 0, currentEntangledActionThenable = null;
          for (var i = 0; i < listeners.length; i++) (0, listeners[i])();
        }
      }
      function chainThenableValue(thenable, result) {
        var listeners = [], thenableWithOverride = {
          status: "pending",
          value: null,
          reason: null,
          then: function(resolve) {
            listeners.push(resolve);
          }
        };
        return thenable.then(
          function() {
            thenableWithOverride.status = "fulfilled", thenableWithOverride.value = result;
            for (var i = 0; i < listeners.length; i++) (0, listeners[i])(result);
          },
          function(error) {
            for (thenableWithOverride.status = "rejected", thenableWithOverride.reason = error, error = 0; error < listeners.length; error++)
              (0, listeners[error])(void 0);
          }
        ), thenableWithOverride;
      }
      var prevOnStartTransitionFinish = ReactSharedInternals.S;
      ReactSharedInternals.S = function(transition, returnValue) {
        globalMostRecentTransitionTime = now(), typeof returnValue == "object" && returnValue !== null && typeof returnValue.then == "function" && entangleAsyncAction(transition, returnValue), prevOnStartTransitionFinish !== null && prevOnStartTransitionFinish(transition, returnValue);
      };
      var resumedCache = createCursor(null);
      function peekCacheFromPool() {
        var cacheResumedFromPreviousRender = resumedCache.current;
        return cacheResumedFromPreviousRender !== null ? cacheResumedFromPreviousRender : workInProgressRoot.pooledCache;
      }
      function pushTransition(offscreenWorkInProgress, prevCachePool) {
        prevCachePool === null ? push(resumedCache, resumedCache.current) : push(resumedCache, prevCachePool.pool);
      }
      function getSuspendedCache() {
        var cacheFromPool = peekCacheFromPool();
        return cacheFromPool === null ? null : { parent: CacheContext._currentValue, pool: cacheFromPool };
      }
      var SuspenseException = Error(formatProdErrorMessage(460)), SuspenseyCommitException = Error(formatProdErrorMessage(474)), SuspenseActionException = Error(formatProdErrorMessage(542)), noopSuspenseyCommitThenable = { then: function() {
      } };
      function isThenableResolved(thenable) {
        return thenable = thenable.status, thenable === "fulfilled" || thenable === "rejected";
      }
      function trackUsedThenable(thenableState2, thenable, index2) {
        switch (index2 = thenableState2[index2], index2 === void 0 ? thenableState2.push(thenable) : index2 !== thenable && (thenable.then(noop$1, noop$1), thenable = index2), thenable.status) {
          case "fulfilled":
            return thenable.value;
          case "rejected":
            throw thenableState2 = thenable.reason, checkIfUseWrappedInAsyncCatch(thenableState2), thenableState2;
          default:
            if (typeof thenable.status == "string") thenable.then(noop$1, noop$1);
            else {
              if (thenableState2 = workInProgressRoot, thenableState2 !== null && 100 < thenableState2.shellSuspendCounter)
                throw Error(formatProdErrorMessage(482));
              thenableState2 = thenable, thenableState2.status = "pending", thenableState2.then(
                function(fulfilledValue) {
                  if (thenable.status === "pending") {
                    var fulfilledThenable = thenable;
                    fulfilledThenable.status = "fulfilled", fulfilledThenable.value = fulfilledValue;
                  }
                },
                function(error) {
                  if (thenable.status === "pending") {
                    var rejectedThenable = thenable;
                    rejectedThenable.status = "rejected", rejectedThenable.reason = error;
                  }
                }
              );
            }
            switch (thenable.status) {
              case "fulfilled":
                return thenable.value;
              case "rejected":
                throw thenableState2 = thenable.reason, checkIfUseWrappedInAsyncCatch(thenableState2), thenableState2;
            }
            throw suspendedThenable = thenable, SuspenseException;
        }
      }
      function resolveLazy(lazyType) {
        try {
          var init = lazyType._init;
          return init(lazyType._payload);
        } catch (x) {
          throw x !== null && typeof x == "object" && typeof x.then == "function" ? (suspendedThenable = x, SuspenseException) : x;
        }
      }
      var suspendedThenable = null;
      function getSuspendedThenable() {
        if (suspendedThenable === null) throw Error(formatProdErrorMessage(459));
        var thenable = suspendedThenable;
        return suspendedThenable = null, thenable;
      }
      function checkIfUseWrappedInAsyncCatch(rejectedReason) {
        if (rejectedReason === SuspenseException || rejectedReason === SuspenseActionException)
          throw Error(formatProdErrorMessage(483));
      }
      var thenableState$1 = null, thenableIndexCounter$1 = 0;
      function unwrapThenable(thenable) {
        var index2 = thenableIndexCounter$1;
        return thenableIndexCounter$1 += 1, thenableState$1 === null && (thenableState$1 = []), trackUsedThenable(thenableState$1, thenable, index2);
      }
      function coerceRef(workInProgress2, element) {
        element = element.props.ref, workInProgress2.ref = element !== void 0 ? element : null;
      }
      function throwOnInvalidObjectTypeImpl(returnFiber, newChild) {
        throw newChild.$$typeof === REACT_LEGACY_ELEMENT_TYPE ? Error(formatProdErrorMessage(525)) : (returnFiber = Object.prototype.toString.call(newChild), Error(
          formatProdErrorMessage(
            31,
            returnFiber === "[object Object]" ? "object with keys {" + Object.keys(newChild).join(", ") + "}" : returnFiber
          )
        ));
      }
      function createChildReconciler(shouldTrackSideEffects) {
        function deleteChild(returnFiber, childToDelete) {
          if (shouldTrackSideEffects) {
            var deletions = returnFiber.deletions;
            deletions === null ? (returnFiber.deletions = [childToDelete], returnFiber.flags |= 16) : deletions.push(childToDelete);
          }
        }
        function deleteRemainingChildren(returnFiber, currentFirstChild) {
          if (!shouldTrackSideEffects) return null;
          for (; currentFirstChild !== null; )
            deleteChild(returnFiber, currentFirstChild), currentFirstChild = currentFirstChild.sibling;
          return null;
        }
        function mapRemainingChildren(currentFirstChild) {
          for (var existingChildren = /* @__PURE__ */ new Map(); currentFirstChild !== null; )
            currentFirstChild.key !== null ? existingChildren.set(currentFirstChild.key, currentFirstChild) : existingChildren.set(currentFirstChild.index, currentFirstChild), currentFirstChild = currentFirstChild.sibling;
          return existingChildren;
        }
        function useFiber(fiber, pendingProps) {
          return fiber = createWorkInProgress(fiber, pendingProps), fiber.index = 0, fiber.sibling = null, fiber;
        }
        function placeChild(newFiber, lastPlacedIndex, newIndex) {
          return newFiber.index = newIndex, shouldTrackSideEffects ? (newIndex = newFiber.alternate, newIndex !== null ? (newIndex = newIndex.index, newIndex < lastPlacedIndex ? (newFiber.flags |= 67108866, lastPlacedIndex) : newIndex) : (newFiber.flags |= 67108866, lastPlacedIndex)) : (newFiber.flags |= 1048576, lastPlacedIndex);
        }
        function placeSingleChild(newFiber) {
          return shouldTrackSideEffects && newFiber.alternate === null && (newFiber.flags |= 67108866), newFiber;
        }
        function updateTextNode(returnFiber, current, textContent, lanes) {
          return current === null || current.tag !== 6 ? (current = createFiberFromText(textContent, returnFiber.mode, lanes), current.return = returnFiber, current) : (current = useFiber(current, textContent), current.return = returnFiber, current);
        }
        function updateElement(returnFiber, current, element, lanes) {
          var elementType = element.type;
          return elementType === REACT_FRAGMENT_TYPE ? updateFragment(
            returnFiber,
            current,
            element.props.children,
            lanes,
            element.key
          ) : current !== null && (current.elementType === elementType || typeof elementType == "object" && elementType !== null && elementType.$$typeof === REACT_LAZY_TYPE && resolveLazy(elementType) === current.type) ? (current = useFiber(current, element.props), coerceRef(current, element), current.return = returnFiber, current) : (current = createFiberFromTypeAndProps(
            element.type,
            element.key,
            element.props,
            null,
            returnFiber.mode,
            lanes
          ), coerceRef(current, element), current.return = returnFiber, current);
        }
        function updatePortal(returnFiber, current, portal, lanes) {
          return current === null || current.tag !== 4 || current.stateNode.containerInfo !== portal.containerInfo || current.stateNode.implementation !== portal.implementation ? (current = createFiberFromPortal(portal, returnFiber.mode, lanes), current.return = returnFiber, current) : (current = useFiber(current, portal.children || []), current.return = returnFiber, current);
        }
        function updateFragment(returnFiber, current, fragment, lanes, key) {
          return current === null || current.tag !== 7 ? (current = createFiberFromFragment(
            fragment,
            returnFiber.mode,
            lanes,
            key
          ), current.return = returnFiber, current) : (current = useFiber(current, fragment), current.return = returnFiber, current);
        }
        function createChild(returnFiber, newChild, lanes) {
          if (typeof newChild == "string" && newChild !== "" || typeof newChild == "number" || typeof newChild == "bigint")
            return newChild = createFiberFromText(
              "" + newChild,
              returnFiber.mode,
              lanes
            ), newChild.return = returnFiber, newChild;
          if (typeof newChild == "object" && newChild !== null) {
            switch (newChild.$$typeof) {
              case REACT_ELEMENT_TYPE:
                return lanes = createFiberFromTypeAndProps(
                  newChild.type,
                  newChild.key,
                  newChild.props,
                  null,
                  returnFiber.mode,
                  lanes
                ), coerceRef(lanes, newChild), lanes.return = returnFiber, lanes;
              case REACT_PORTAL_TYPE:
                return newChild = createFiberFromPortal(
                  newChild,
                  returnFiber.mode,
                  lanes
                ), newChild.return = returnFiber, newChild;
              case REACT_LAZY_TYPE:
                return newChild = resolveLazy(newChild), createChild(returnFiber, newChild, lanes);
            }
            if (isArrayImpl(newChild) || getIteratorFn(newChild))
              return newChild = createFiberFromFragment(
                newChild,
                returnFiber.mode,
                lanes,
                null
              ), newChild.return = returnFiber, newChild;
            if (typeof newChild.then == "function")
              return createChild(returnFiber, unwrapThenable(newChild), lanes);
            if (newChild.$$typeof === REACT_CONTEXT_TYPE)
              return createChild(
                returnFiber,
                readContextDuringReconciliation(returnFiber, newChild),
                lanes
              );
            throwOnInvalidObjectTypeImpl(returnFiber, newChild);
          }
          return null;
        }
        function updateSlot(returnFiber, oldFiber, newChild, lanes) {
          var key = oldFiber !== null ? oldFiber.key : null;
          if (typeof newChild == "string" && newChild !== "" || typeof newChild == "number" || typeof newChild == "bigint")
            return key !== null ? null : updateTextNode(returnFiber, oldFiber, "" + newChild, lanes);
          if (typeof newChild == "object" && newChild !== null) {
            switch (newChild.$$typeof) {
              case REACT_ELEMENT_TYPE:
                return newChild.key === key ? updateElement(returnFiber, oldFiber, newChild, lanes) : null;
              case REACT_PORTAL_TYPE:
                return newChild.key === key ? updatePortal(returnFiber, oldFiber, newChild, lanes) : null;
              case REACT_LAZY_TYPE:
                return newChild = resolveLazy(newChild), updateSlot(returnFiber, oldFiber, newChild, lanes);
            }
            if (isArrayImpl(newChild) || getIteratorFn(newChild))
              return key !== null ? null : updateFragment(returnFiber, oldFiber, newChild, lanes, null);
            if (typeof newChild.then == "function")
              return updateSlot(
                returnFiber,
                oldFiber,
                unwrapThenable(newChild),
                lanes
              );
            if (newChild.$$typeof === REACT_CONTEXT_TYPE)
              return updateSlot(
                returnFiber,
                oldFiber,
                readContextDuringReconciliation(returnFiber, newChild),
                lanes
              );
            throwOnInvalidObjectTypeImpl(returnFiber, newChild);
          }
          return null;
        }
        function updateFromMap(existingChildren, returnFiber, newIdx, newChild, lanes) {
          if (typeof newChild == "string" && newChild !== "" || typeof newChild == "number" || typeof newChild == "bigint")
            return existingChildren = existingChildren.get(newIdx) || null, updateTextNode(returnFiber, existingChildren, "" + newChild, lanes);
          if (typeof newChild == "object" && newChild !== null) {
            switch (newChild.$$typeof) {
              case REACT_ELEMENT_TYPE:
                return existingChildren = existingChildren.get(
                  newChild.key === null ? newIdx : newChild.key
                ) || null, updateElement(returnFiber, existingChildren, newChild, lanes);
              case REACT_PORTAL_TYPE:
                return existingChildren = existingChildren.get(
                  newChild.key === null ? newIdx : newChild.key
                ) || null, updatePortal(returnFiber, existingChildren, newChild, lanes);
              case REACT_LAZY_TYPE:
                return newChild = resolveLazy(newChild), updateFromMap(
                  existingChildren,
                  returnFiber,
                  newIdx,
                  newChild,
                  lanes
                );
            }
            if (isArrayImpl(newChild) || getIteratorFn(newChild))
              return existingChildren = existingChildren.get(newIdx) || null, updateFragment(returnFiber, existingChildren, newChild, lanes, null);
            if (typeof newChild.then == "function")
              return updateFromMap(
                existingChildren,
                returnFiber,
                newIdx,
                unwrapThenable(newChild),
                lanes
              );
            if (newChild.$$typeof === REACT_CONTEXT_TYPE)
              return updateFromMap(
                existingChildren,
                returnFiber,
                newIdx,
                readContextDuringReconciliation(returnFiber, newChild),
                lanes
              );
            throwOnInvalidObjectTypeImpl(returnFiber, newChild);
          }
          return null;
        }
        function reconcileChildrenArray(returnFiber, currentFirstChild, newChildren, lanes) {
          for (var resultingFirstChild = null, previousNewFiber = null, oldFiber = currentFirstChild, newIdx = currentFirstChild = 0, nextOldFiber = null; oldFiber !== null && newIdx < newChildren.length; newIdx++) {
            oldFiber.index > newIdx ? (nextOldFiber = oldFiber, oldFiber = null) : nextOldFiber = oldFiber.sibling;
            var newFiber = updateSlot(
              returnFiber,
              oldFiber,
              newChildren[newIdx],
              lanes
            );
            if (newFiber === null) {
              oldFiber === null && (oldFiber = nextOldFiber);
              break;
            }
            shouldTrackSideEffects && oldFiber && newFiber.alternate === null && deleteChild(returnFiber, oldFiber), currentFirstChild = placeChild(newFiber, currentFirstChild, newIdx), previousNewFiber === null ? resultingFirstChild = newFiber : previousNewFiber.sibling = newFiber, previousNewFiber = newFiber, oldFiber = nextOldFiber;
          }
          if (newIdx === newChildren.length)
            return deleteRemainingChildren(returnFiber, oldFiber), isHydrating && pushTreeFork(returnFiber, newIdx), resultingFirstChild;
          if (oldFiber === null) {
            for (; newIdx < newChildren.length; newIdx++)
              oldFiber = createChild(returnFiber, newChildren[newIdx], lanes), oldFiber !== null && (currentFirstChild = placeChild(
                oldFiber,
                currentFirstChild,
                newIdx
              ), previousNewFiber === null ? resultingFirstChild = oldFiber : previousNewFiber.sibling = oldFiber, previousNewFiber = oldFiber);
            return isHydrating && pushTreeFork(returnFiber, newIdx), resultingFirstChild;
          }
          for (oldFiber = mapRemainingChildren(oldFiber); newIdx < newChildren.length; newIdx++)
            nextOldFiber = updateFromMap(
              oldFiber,
              returnFiber,
              newIdx,
              newChildren[newIdx],
              lanes
            ), nextOldFiber !== null && (shouldTrackSideEffects && nextOldFiber.alternate !== null && oldFiber.delete(
              nextOldFiber.key === null ? newIdx : nextOldFiber.key
            ), currentFirstChild = placeChild(
              nextOldFiber,
              currentFirstChild,
              newIdx
            ), previousNewFiber === null ? resultingFirstChild = nextOldFiber : previousNewFiber.sibling = nextOldFiber, previousNewFiber = nextOldFiber);
          return shouldTrackSideEffects && oldFiber.forEach(function(child) {
            return deleteChild(returnFiber, child);
          }), isHydrating && pushTreeFork(returnFiber, newIdx), resultingFirstChild;
        }
        function reconcileChildrenIterator(returnFiber, currentFirstChild, newChildren, lanes) {
          if (newChildren == null) throw Error(formatProdErrorMessage(151));
          for (var resultingFirstChild = null, previousNewFiber = null, oldFiber = currentFirstChild, newIdx = currentFirstChild = 0, nextOldFiber = null, step = newChildren.next(); oldFiber !== null && !step.done; newIdx++, step = newChildren.next()) {
            oldFiber.index > newIdx ? (nextOldFiber = oldFiber, oldFiber = null) : nextOldFiber = oldFiber.sibling;
            var newFiber = updateSlot(returnFiber, oldFiber, step.value, lanes);
            if (newFiber === null) {
              oldFiber === null && (oldFiber = nextOldFiber);
              break;
            }
            shouldTrackSideEffects && oldFiber && newFiber.alternate === null && deleteChild(returnFiber, oldFiber), currentFirstChild = placeChild(newFiber, currentFirstChild, newIdx), previousNewFiber === null ? resultingFirstChild = newFiber : previousNewFiber.sibling = newFiber, previousNewFiber = newFiber, oldFiber = nextOldFiber;
          }
          if (step.done)
            return deleteRemainingChildren(returnFiber, oldFiber), isHydrating && pushTreeFork(returnFiber, newIdx), resultingFirstChild;
          if (oldFiber === null) {
            for (; !step.done; newIdx++, step = newChildren.next())
              step = createChild(returnFiber, step.value, lanes), step !== null && (currentFirstChild = placeChild(step, currentFirstChild, newIdx), previousNewFiber === null ? resultingFirstChild = step : previousNewFiber.sibling = step, previousNewFiber = step);
            return isHydrating && pushTreeFork(returnFiber, newIdx), resultingFirstChild;
          }
          for (oldFiber = mapRemainingChildren(oldFiber); !step.done; newIdx++, step = newChildren.next())
            step = updateFromMap(oldFiber, returnFiber, newIdx, step.value, lanes), step !== null && (shouldTrackSideEffects && step.alternate !== null && oldFiber.delete(step.key === null ? newIdx : step.key), currentFirstChild = placeChild(step, currentFirstChild, newIdx), previousNewFiber === null ? resultingFirstChild = step : previousNewFiber.sibling = step, previousNewFiber = step);
          return shouldTrackSideEffects && oldFiber.forEach(function(child) {
            return deleteChild(returnFiber, child);
          }), isHydrating && pushTreeFork(returnFiber, newIdx), resultingFirstChild;
        }
        function reconcileChildFibersImpl(returnFiber, currentFirstChild, newChild, lanes) {
          if (typeof newChild == "object" && newChild !== null && newChild.type === REACT_FRAGMENT_TYPE && newChild.key === null && (newChild = newChild.props.children), typeof newChild == "object" && newChild !== null) {
            switch (newChild.$$typeof) {
              case REACT_ELEMENT_TYPE:
                a: {
                  for (var key = newChild.key; currentFirstChild !== null; ) {
                    if (currentFirstChild.key === key) {
                      if (key = newChild.type, key === REACT_FRAGMENT_TYPE) {
                        if (currentFirstChild.tag === 7) {
                          deleteRemainingChildren(
                            returnFiber,
                            currentFirstChild.sibling
                          ), lanes = useFiber(
                            currentFirstChild,
                            newChild.props.children
                          ), lanes.return = returnFiber, returnFiber = lanes;
                          break a;
                        }
                      } else if (currentFirstChild.elementType === key || typeof key == "object" && key !== null && key.$$typeof === REACT_LAZY_TYPE && resolveLazy(key) === currentFirstChild.type) {
                        deleteRemainingChildren(
                          returnFiber,
                          currentFirstChild.sibling
                        ), lanes = useFiber(currentFirstChild, newChild.props), coerceRef(lanes, newChild), lanes.return = returnFiber, returnFiber = lanes;
                        break a;
                      }
                      deleteRemainingChildren(returnFiber, currentFirstChild);
                      break;
                    } else deleteChild(returnFiber, currentFirstChild);
                    currentFirstChild = currentFirstChild.sibling;
                  }
                  newChild.type === REACT_FRAGMENT_TYPE ? (lanes = createFiberFromFragment(
                    newChild.props.children,
                    returnFiber.mode,
                    lanes,
                    newChild.key
                  ), lanes.return = returnFiber, returnFiber = lanes) : (lanes = createFiberFromTypeAndProps(
                    newChild.type,
                    newChild.key,
                    newChild.props,
                    null,
                    returnFiber.mode,
                    lanes
                  ), coerceRef(lanes, newChild), lanes.return = returnFiber, returnFiber = lanes);
                }
                return placeSingleChild(returnFiber);
              case REACT_PORTAL_TYPE:
                a: {
                  for (key = newChild.key; currentFirstChild !== null; ) {
                    if (currentFirstChild.key === key)
                      if (currentFirstChild.tag === 4 && currentFirstChild.stateNode.containerInfo === newChild.containerInfo && currentFirstChild.stateNode.implementation === newChild.implementation) {
                        deleteRemainingChildren(
                          returnFiber,
                          currentFirstChild.sibling
                        ), lanes = useFiber(currentFirstChild, newChild.children || []), lanes.return = returnFiber, returnFiber = lanes;
                        break a;
                      } else {
                        deleteRemainingChildren(returnFiber, currentFirstChild);
                        break;
                      }
                    else deleteChild(returnFiber, currentFirstChild);
                    currentFirstChild = currentFirstChild.sibling;
                  }
                  lanes = createFiberFromPortal(newChild, returnFiber.mode, lanes), lanes.return = returnFiber, returnFiber = lanes;
                }
                return placeSingleChild(returnFiber);
              case REACT_LAZY_TYPE:
                return newChild = resolveLazy(newChild), reconcileChildFibersImpl(
                  returnFiber,
                  currentFirstChild,
                  newChild,
                  lanes
                );
            }
            if (isArrayImpl(newChild))
              return reconcileChildrenArray(
                returnFiber,
                currentFirstChild,
                newChild,
                lanes
              );
            if (getIteratorFn(newChild)) {
              if (key = getIteratorFn(newChild), typeof key != "function") throw Error(formatProdErrorMessage(150));
              return newChild = key.call(newChild), reconcileChildrenIterator(
                returnFiber,
                currentFirstChild,
                newChild,
                lanes
              );
            }
            if (typeof newChild.then == "function")
              return reconcileChildFibersImpl(
                returnFiber,
                currentFirstChild,
                unwrapThenable(newChild),
                lanes
              );
            if (newChild.$$typeof === REACT_CONTEXT_TYPE)
              return reconcileChildFibersImpl(
                returnFiber,
                currentFirstChild,
                readContextDuringReconciliation(returnFiber, newChild),
                lanes
              );
            throwOnInvalidObjectTypeImpl(returnFiber, newChild);
          }
          return typeof newChild == "string" && newChild !== "" || typeof newChild == "number" || typeof newChild == "bigint" ? (newChild = "" + newChild, currentFirstChild !== null && currentFirstChild.tag === 6 ? (deleteRemainingChildren(returnFiber, currentFirstChild.sibling), lanes = useFiber(currentFirstChild, newChild), lanes.return = returnFiber, returnFiber = lanes) : (deleteRemainingChildren(returnFiber, currentFirstChild), lanes = createFiberFromText(newChild, returnFiber.mode, lanes), lanes.return = returnFiber, returnFiber = lanes), placeSingleChild(returnFiber)) : deleteRemainingChildren(returnFiber, currentFirstChild);
        }
        return function(returnFiber, currentFirstChild, newChild, lanes) {
          try {
            thenableIndexCounter$1 = 0;
            var firstChildFiber = reconcileChildFibersImpl(
              returnFiber,
              currentFirstChild,
              newChild,
              lanes
            );
            return thenableState$1 = null, firstChildFiber;
          } catch (x) {
            if (x === SuspenseException || x === SuspenseActionException) throw x;
            var fiber = createFiberImplClass(29, x, null, returnFiber.mode);
            return fiber.lanes = lanes, fiber.return = returnFiber, fiber;
          }
        };
      }
      var reconcileChildFibers = createChildReconciler(!0), mountChildFibers = createChildReconciler(!1), hasForceUpdate = !1;
      function initializeUpdateQueue(fiber) {
        fiber.updateQueue = {
          baseState: fiber.memoizedState,
          firstBaseUpdate: null,
          lastBaseUpdate: null,
          shared: { pending: null, lanes: 0, hiddenCallbacks: null },
          callbacks: null
        };
      }
      function cloneUpdateQueue(current, workInProgress2) {
        current = current.updateQueue, workInProgress2.updateQueue === current && (workInProgress2.updateQueue = {
          baseState: current.baseState,
          firstBaseUpdate: current.firstBaseUpdate,
          lastBaseUpdate: current.lastBaseUpdate,
          shared: current.shared,
          callbacks: null
        });
      }
      function createUpdate(lane) {
        return { lane, tag: 0, payload: null, callback: null, next: null };
      }
      function enqueueUpdate(fiber, update, lane) {
        var updateQueue = fiber.updateQueue;
        if (updateQueue === null) return null;
        if (updateQueue = updateQueue.shared, (executionContext & 2) !== 0) {
          var pending = updateQueue.pending;
          return pending === null ? update.next = update : (update.next = pending.next, pending.next = update), updateQueue.pending = update, update = getRootForUpdatedFiber(fiber), markUpdateLaneFromFiberToRoot(fiber, null, lane), update;
        }
        return enqueueUpdate$1(fiber, updateQueue, update, lane), getRootForUpdatedFiber(fiber);
      }
      function entangleTransitions(root2, fiber, lane) {
        if (fiber = fiber.updateQueue, fiber !== null && (fiber = fiber.shared, (lane & 4194048) !== 0)) {
          var queueLanes = fiber.lanes;
          queueLanes &= root2.pendingLanes, lane |= queueLanes, fiber.lanes = lane, markRootEntangled(root2, lane);
        }
      }
      function enqueueCapturedUpdate(workInProgress2, capturedUpdate) {
        var queue = workInProgress2.updateQueue, current = workInProgress2.alternate;
        if (current !== null && (current = current.updateQueue, queue === current)) {
          var newFirst = null, newLast = null;
          if (queue = queue.firstBaseUpdate, queue !== null) {
            do {
              var clone = {
                lane: queue.lane,
                tag: queue.tag,
                payload: queue.payload,
                callback: null,
                next: null
              };
              newLast === null ? newFirst = newLast = clone : newLast = newLast.next = clone, queue = queue.next;
            } while (queue !== null);
            newLast === null ? newFirst = newLast = capturedUpdate : newLast = newLast.next = capturedUpdate;
          } else newFirst = newLast = capturedUpdate;
          queue = {
            baseState: current.baseState,
            firstBaseUpdate: newFirst,
            lastBaseUpdate: newLast,
            shared: current.shared,
            callbacks: current.callbacks
          }, workInProgress2.updateQueue = queue;
          return;
        }
        workInProgress2 = queue.lastBaseUpdate, workInProgress2 === null ? queue.firstBaseUpdate = capturedUpdate : workInProgress2.next = capturedUpdate, queue.lastBaseUpdate = capturedUpdate;
      }
      var didReadFromEntangledAsyncAction = !1;
      function suspendIfUpdateReadFromEntangledAsyncAction() {
        if (didReadFromEntangledAsyncAction) {
          var entangledActionThenable = currentEntangledActionThenable;
          if (entangledActionThenable !== null) throw entangledActionThenable;
        }
      }
      function processUpdateQueue(workInProgress$jscomp$0, props, instance$jscomp$0, renderLanes2) {
        didReadFromEntangledAsyncAction = !1;
        var queue = workInProgress$jscomp$0.updateQueue;
        hasForceUpdate = !1;
        var firstBaseUpdate = queue.firstBaseUpdate, lastBaseUpdate = queue.lastBaseUpdate, pendingQueue = queue.shared.pending;
        if (pendingQueue !== null) {
          queue.shared.pending = null;
          var lastPendingUpdate = pendingQueue, firstPendingUpdate = lastPendingUpdate.next;
          lastPendingUpdate.next = null, lastBaseUpdate === null ? firstBaseUpdate = firstPendingUpdate : lastBaseUpdate.next = firstPendingUpdate, lastBaseUpdate = lastPendingUpdate;
          var current = workInProgress$jscomp$0.alternate;
          current !== null && (current = current.updateQueue, pendingQueue = current.lastBaseUpdate, pendingQueue !== lastBaseUpdate && (pendingQueue === null ? current.firstBaseUpdate = firstPendingUpdate : pendingQueue.next = firstPendingUpdate, current.lastBaseUpdate = lastPendingUpdate));
        }
        if (firstBaseUpdate !== null) {
          var newState = queue.baseState;
          lastBaseUpdate = 0, current = firstPendingUpdate = lastPendingUpdate = null, pendingQueue = firstBaseUpdate;
          do {
            var updateLane = pendingQueue.lane & -536870913, isHiddenUpdate = updateLane !== pendingQueue.lane;
            if (isHiddenUpdate ? (workInProgressRootRenderLanes & updateLane) === updateLane : (renderLanes2 & updateLane) === updateLane) {
              updateLane !== 0 && updateLane === currentEntangledLane && (didReadFromEntangledAsyncAction = !0), current !== null && (current = current.next = {
                lane: 0,
                tag: pendingQueue.tag,
                payload: pendingQueue.payload,
                callback: null,
                next: null
              });
              a: {
                var workInProgress2 = workInProgress$jscomp$0, update = pendingQueue;
                updateLane = props;
                var instance = instance$jscomp$0;
                switch (update.tag) {
                  case 1:
                    if (workInProgress2 = update.payload, typeof workInProgress2 == "function") {
                      newState = workInProgress2.call(instance, newState, updateLane);
                      break a;
                    }
                    newState = workInProgress2;
                    break a;
                  case 3:
                    workInProgress2.flags = workInProgress2.flags & -65537 | 128;
                  case 0:
                    if (workInProgress2 = update.payload, updateLane = typeof workInProgress2 == "function" ? workInProgress2.call(instance, newState, updateLane) : workInProgress2, updateLane == null) break a;
                    newState = assign({}, newState, updateLane);
                    break a;
                  case 2:
                    hasForceUpdate = !0;
                }
              }
              updateLane = pendingQueue.callback, updateLane !== null && (workInProgress$jscomp$0.flags |= 64, isHiddenUpdate && (workInProgress$jscomp$0.flags |= 8192), isHiddenUpdate = queue.callbacks, isHiddenUpdate === null ? queue.callbacks = [updateLane] : isHiddenUpdate.push(updateLane));
            } else
              isHiddenUpdate = {
                lane: updateLane,
                tag: pendingQueue.tag,
                payload: pendingQueue.payload,
                callback: pendingQueue.callback,
                next: null
              }, current === null ? (firstPendingUpdate = current = isHiddenUpdate, lastPendingUpdate = newState) : current = current.next = isHiddenUpdate, lastBaseUpdate |= updateLane;
            if (pendingQueue = pendingQueue.next, pendingQueue === null) {
              if (pendingQueue = queue.shared.pending, pendingQueue === null)
                break;
              isHiddenUpdate = pendingQueue, pendingQueue = isHiddenUpdate.next, isHiddenUpdate.next = null, queue.lastBaseUpdate = isHiddenUpdate, queue.shared.pending = null;
            }
          } while (!0);
          current === null && (lastPendingUpdate = newState), queue.baseState = lastPendingUpdate, queue.firstBaseUpdate = firstPendingUpdate, queue.lastBaseUpdate = current, firstBaseUpdate === null && (queue.shared.lanes = 0), workInProgressRootSkippedLanes |= lastBaseUpdate, workInProgress$jscomp$0.lanes = lastBaseUpdate, workInProgress$jscomp$0.memoizedState = newState;
        }
      }
      function callCallback(callback, context) {
        if (typeof callback != "function")
          throw Error(formatProdErrorMessage(191, callback));
        callback.call(context);
      }
      function commitCallbacks(updateQueue, context) {
        var callbacks = updateQueue.callbacks;
        if (callbacks !== null)
          for (updateQueue.callbacks = null, updateQueue = 0; updateQueue < callbacks.length; updateQueue++)
            callCallback(callbacks[updateQueue], context);
      }
      var currentTreeHiddenStackCursor = createCursor(null), prevEntangledRenderLanesCursor = createCursor(0);
      function pushHiddenContext(fiber, context) {
        fiber = entangledRenderLanes, push(prevEntangledRenderLanesCursor, fiber), push(currentTreeHiddenStackCursor, context), entangledRenderLanes = fiber | context.baseLanes;
      }
      function reuseHiddenContextOnStack() {
        push(prevEntangledRenderLanesCursor, entangledRenderLanes), push(currentTreeHiddenStackCursor, currentTreeHiddenStackCursor.current);
      }
      function popHiddenContext() {
        entangledRenderLanes = prevEntangledRenderLanesCursor.current, pop(currentTreeHiddenStackCursor), pop(prevEntangledRenderLanesCursor);
      }
      var suspenseHandlerStackCursor = createCursor(null), shellBoundary = null;
      function pushPrimaryTreeSuspenseHandler(handler) {
        var current = handler.alternate;
        push(suspenseStackCursor, suspenseStackCursor.current & 1), push(suspenseHandlerStackCursor, handler), shellBoundary === null && (current === null || currentTreeHiddenStackCursor.current !== null || current.memoizedState !== null) && (shellBoundary = handler);
      }
      function pushDehydratedActivitySuspenseHandler(fiber) {
        push(suspenseStackCursor, suspenseStackCursor.current), push(suspenseHandlerStackCursor, fiber), shellBoundary === null && (shellBoundary = fiber);
      }
      function pushOffscreenSuspenseHandler(fiber) {
        fiber.tag === 22 ? (push(suspenseStackCursor, suspenseStackCursor.current), push(suspenseHandlerStackCursor, fiber), shellBoundary === null && (shellBoundary = fiber)) : reuseSuspenseHandlerOnStack(fiber);
      }
      function reuseSuspenseHandlerOnStack() {
        push(suspenseStackCursor, suspenseStackCursor.current), push(suspenseHandlerStackCursor, suspenseHandlerStackCursor.current);
      }
      function popSuspenseHandler(fiber) {
        pop(suspenseHandlerStackCursor), shellBoundary === fiber && (shellBoundary = null), pop(suspenseStackCursor);
      }
      var suspenseStackCursor = createCursor(0);
      function findFirstSuspended(row) {
        for (var node = row; node !== null; ) {
          if (node.tag === 13) {
            var state = node.memoizedState;
            if (state !== null && (state = state.dehydrated, state === null || isSuspenseInstancePending(state) || isSuspenseInstanceFallback(state)))
              return node;
          } else if (node.tag === 19 && (node.memoizedProps.revealOrder === "forwards" || node.memoizedProps.revealOrder === "backwards" || node.memoizedProps.revealOrder === "unstable_legacy-backwards" || node.memoizedProps.revealOrder === "together")) {
            if ((node.flags & 128) !== 0) return node;
          } else if (node.child !== null) {
            node.child.return = node, node = node.child;
            continue;
          }
          if (node === row) break;
          for (; node.sibling === null; ) {
            if (node.return === null || node.return === row) return null;
            node = node.return;
          }
          node.sibling.return = node.return, node = node.sibling;
        }
        return null;
      }
      var renderLanes = 0, currentlyRenderingFiber = null, currentHook = null, workInProgressHook = null, didScheduleRenderPhaseUpdate = !1, didScheduleRenderPhaseUpdateDuringThisPass = !1, shouldDoubleInvokeUserFnsInHooksDEV = !1, localIdCounter = 0, thenableIndexCounter = 0, thenableState = null, globalClientIdCounter = 0;
      function throwInvalidHookError() {
        throw Error(formatProdErrorMessage(321));
      }
      function areHookInputsEqual(nextDeps, prevDeps) {
        if (prevDeps === null) return !1;
        for (var i = 0; i < prevDeps.length && i < nextDeps.length; i++)
          if (!objectIs(nextDeps[i], prevDeps[i])) return !1;
        return !0;
      }
      function renderWithHooks(current, workInProgress2, Component, props, secondArg, nextRenderLanes) {
        return renderLanes = nextRenderLanes, currentlyRenderingFiber = workInProgress2, workInProgress2.memoizedState = null, workInProgress2.updateQueue = null, workInProgress2.lanes = 0, ReactSharedInternals.H = current === null || current.memoizedState === null ? HooksDispatcherOnMount : HooksDispatcherOnUpdate, shouldDoubleInvokeUserFnsInHooksDEV = !1, nextRenderLanes = Component(props, secondArg), shouldDoubleInvokeUserFnsInHooksDEV = !1, didScheduleRenderPhaseUpdateDuringThisPass && (nextRenderLanes = renderWithHooksAgain(
          workInProgress2,
          Component,
          props,
          secondArg
        )), finishRenderingHooks(current), nextRenderLanes;
      }
      function finishRenderingHooks(current) {
        ReactSharedInternals.H = ContextOnlyDispatcher;
        var didRenderTooFewHooks = currentHook !== null && currentHook.next !== null;
        if (renderLanes = 0, workInProgressHook = currentHook = currentlyRenderingFiber = null, didScheduleRenderPhaseUpdate = !1, thenableIndexCounter = 0, thenableState = null, didRenderTooFewHooks) throw Error(formatProdErrorMessage(300));
        current === null || didReceiveUpdate || (current = current.dependencies, current !== null && checkIfContextChanged(current) && (didReceiveUpdate = !0));
      }
      function renderWithHooksAgain(workInProgress2, Component, props, secondArg) {
        currentlyRenderingFiber = workInProgress2;
        var numberOfReRenders = 0;
        do {
          if (didScheduleRenderPhaseUpdateDuringThisPass && (thenableState = null), thenableIndexCounter = 0, didScheduleRenderPhaseUpdateDuringThisPass = !1, 25 <= numberOfReRenders) throw Error(formatProdErrorMessage(301));
          if (numberOfReRenders += 1, workInProgressHook = currentHook = null, workInProgress2.updateQueue != null) {
            var children = workInProgress2.updateQueue;
            children.lastEffect = null, children.events = null, children.stores = null, children.memoCache != null && (children.memoCache.index = 0);
          }
          ReactSharedInternals.H = HooksDispatcherOnRerender, children = Component(props, secondArg);
        } while (didScheduleRenderPhaseUpdateDuringThisPass);
        return children;
      }
      function TransitionAwareHostComponent() {
        var dispatcher = ReactSharedInternals.H, maybeThenable = dispatcher.useState()[0];
        return maybeThenable = typeof maybeThenable.then == "function" ? useThenable(maybeThenable) : maybeThenable, dispatcher = dispatcher.useState()[0], (currentHook !== null ? currentHook.memoizedState : null) !== dispatcher && (currentlyRenderingFiber.flags |= 1024), maybeThenable;
      }
      function checkDidRenderIdHook() {
        var didRenderIdHook = localIdCounter !== 0;
        return localIdCounter = 0, didRenderIdHook;
      }
      function bailoutHooks(current, workInProgress2, lanes) {
        workInProgress2.updateQueue = current.updateQueue, workInProgress2.flags &= -2053, current.lanes &= ~lanes;
      }
      function resetHooksOnUnwind(workInProgress2) {
        if (didScheduleRenderPhaseUpdate) {
          for (workInProgress2 = workInProgress2.memoizedState; workInProgress2 !== null; ) {
            var queue = workInProgress2.queue;
            queue !== null && (queue.pending = null), workInProgress2 = workInProgress2.next;
          }
          didScheduleRenderPhaseUpdate = !1;
        }
        renderLanes = 0, workInProgressHook = currentHook = currentlyRenderingFiber = null, didScheduleRenderPhaseUpdateDuringThisPass = !1, thenableIndexCounter = localIdCounter = 0, thenableState = null;
      }
      function mountWorkInProgressHook() {
        var hook = {
          memoizedState: null,
          baseState: null,
          baseQueue: null,
          queue: null,
          next: null
        };
        return workInProgressHook === null ? currentlyRenderingFiber.memoizedState = workInProgressHook = hook : workInProgressHook = workInProgressHook.next = hook, workInProgressHook;
      }
      function updateWorkInProgressHook() {
        if (currentHook === null) {
          var nextCurrentHook = currentlyRenderingFiber.alternate;
          nextCurrentHook = nextCurrentHook !== null ? nextCurrentHook.memoizedState : null;
        } else nextCurrentHook = currentHook.next;
        var nextWorkInProgressHook = workInProgressHook === null ? currentlyRenderingFiber.memoizedState : workInProgressHook.next;
        if (nextWorkInProgressHook !== null)
          workInProgressHook = nextWorkInProgressHook, currentHook = nextCurrentHook;
        else {
          if (nextCurrentHook === null)
            throw currentlyRenderingFiber.alternate === null ? Error(formatProdErrorMessage(467)) : Error(formatProdErrorMessage(310));
          currentHook = nextCurrentHook, nextCurrentHook = {
            memoizedState: currentHook.memoizedState,
            baseState: currentHook.baseState,
            baseQueue: currentHook.baseQueue,
            queue: currentHook.queue,
            next: null
          }, workInProgressHook === null ? currentlyRenderingFiber.memoizedState = workInProgressHook = nextCurrentHook : workInProgressHook = workInProgressHook.next = nextCurrentHook;
        }
        return workInProgressHook;
      }
      function createFunctionComponentUpdateQueue() {
        return { lastEffect: null, events: null, stores: null, memoCache: null };
      }
      function useThenable(thenable) {
        var index2 = thenableIndexCounter;
        return thenableIndexCounter += 1, thenableState === null && (thenableState = []), thenable = trackUsedThenable(thenableState, thenable, index2), index2 = currentlyRenderingFiber, (workInProgressHook === null ? index2.memoizedState : workInProgressHook.next) === null && (index2 = index2.alternate, ReactSharedInternals.H = index2 === null || index2.memoizedState === null ? HooksDispatcherOnMount : HooksDispatcherOnUpdate), thenable;
      }
      function use(usable) {
        if (usable !== null && typeof usable == "object") {
          if (typeof usable.then == "function") return useThenable(usable);
          if (usable.$$typeof === REACT_CONTEXT_TYPE) return readContext(usable);
        }
        throw Error(formatProdErrorMessage(438, String(usable)));
      }
      function useMemoCache(size) {
        var memoCache = null, updateQueue = currentlyRenderingFiber.updateQueue;
        if (updateQueue !== null && (memoCache = updateQueue.memoCache), memoCache == null) {
          var current = currentlyRenderingFiber.alternate;
          current !== null && (current = current.updateQueue, current !== null && (current = current.memoCache, current != null && (memoCache = {
            data: current.data.map(function(array) {
              return array.slice();
            }),
            index: 0
          })));
        }
        if (memoCache == null && (memoCache = { data: [], index: 0 }), updateQueue === null && (updateQueue = createFunctionComponentUpdateQueue(), currentlyRenderingFiber.updateQueue = updateQueue), updateQueue.memoCache = memoCache, updateQueue = memoCache.data[memoCache.index], updateQueue === void 0)
          for (updateQueue = memoCache.data[memoCache.index] = Array(size), current = 0; current < size; current++)
            updateQueue[current] = REACT_MEMO_CACHE_SENTINEL;
        return memoCache.index++, updateQueue;
      }
      function basicStateReducer(state, action) {
        return typeof action == "function" ? action(state) : action;
      }
      function updateReducer(reducer) {
        var hook = updateWorkInProgressHook();
        return updateReducerImpl(hook, currentHook, reducer);
      }
      function updateReducerImpl(hook, current, reducer) {
        var queue = hook.queue;
        if (queue === null) throw Error(formatProdErrorMessage(311));
        queue.lastRenderedReducer = reducer;
        var baseQueue = hook.baseQueue, pendingQueue = queue.pending;
        if (pendingQueue !== null) {
          if (baseQueue !== null) {
            var baseFirst = baseQueue.next;
            baseQueue.next = pendingQueue.next, pendingQueue.next = baseFirst;
          }
          current.baseQueue = baseQueue = pendingQueue, queue.pending = null;
        }
        if (pendingQueue = hook.baseState, baseQueue === null) hook.memoizedState = pendingQueue;
        else {
          current = baseQueue.next;
          var newBaseQueueFirst = baseFirst = null, newBaseQueueLast = null, update = current, didReadFromEntangledAsyncAction$60 = !1;
          do {
            var updateLane = update.lane & -536870913;
            if (updateLane !== update.lane ? (workInProgressRootRenderLanes & updateLane) === updateLane : (renderLanes & updateLane) === updateLane) {
              var revertLane = update.revertLane;
              if (revertLane === 0)
                newBaseQueueLast !== null && (newBaseQueueLast = newBaseQueueLast.next = {
                  lane: 0,
                  revertLane: 0,
                  gesture: null,
                  action: update.action,
                  hasEagerState: update.hasEagerState,
                  eagerState: update.eagerState,
                  next: null
                }), updateLane === currentEntangledLane && (didReadFromEntangledAsyncAction$60 = !0);
              else if ((renderLanes & revertLane) === revertLane) {
                update = update.next, revertLane === currentEntangledLane && (didReadFromEntangledAsyncAction$60 = !0);
                continue;
              } else
                updateLane = {
                  lane: 0,
                  revertLane: update.revertLane,
                  gesture: null,
                  action: update.action,
                  hasEagerState: update.hasEagerState,
                  eagerState: update.eagerState,
                  next: null
                }, newBaseQueueLast === null ? (newBaseQueueFirst = newBaseQueueLast = updateLane, baseFirst = pendingQueue) : newBaseQueueLast = newBaseQueueLast.next = updateLane, currentlyRenderingFiber.lanes |= revertLane, workInProgressRootSkippedLanes |= revertLane;
              updateLane = update.action, shouldDoubleInvokeUserFnsInHooksDEV && reducer(pendingQueue, updateLane), pendingQueue = update.hasEagerState ? update.eagerState : reducer(pendingQueue, updateLane);
            } else
              revertLane = {
                lane: updateLane,
                revertLane: update.revertLane,
                gesture: update.gesture,
                action: update.action,
                hasEagerState: update.hasEagerState,
                eagerState: update.eagerState,
                next: null
              }, newBaseQueueLast === null ? (newBaseQueueFirst = newBaseQueueLast = revertLane, baseFirst = pendingQueue) : newBaseQueueLast = newBaseQueueLast.next = revertLane, currentlyRenderingFiber.lanes |= updateLane, workInProgressRootSkippedLanes |= updateLane;
            update = update.next;
          } while (update !== null && update !== current);
          if (newBaseQueueLast === null ? baseFirst = pendingQueue : newBaseQueueLast.next = newBaseQueueFirst, !objectIs(pendingQueue, hook.memoizedState) && (didReceiveUpdate = !0, didReadFromEntangledAsyncAction$60 && (reducer = currentEntangledActionThenable, reducer !== null)))
            throw reducer;
          hook.memoizedState = pendingQueue, hook.baseState = baseFirst, hook.baseQueue = newBaseQueueLast, queue.lastRenderedState = pendingQueue;
        }
        return baseQueue === null && (queue.lanes = 0), [hook.memoizedState, queue.dispatch];
      }
      function rerenderReducer(reducer) {
        var hook = updateWorkInProgressHook(), queue = hook.queue;
        if (queue === null) throw Error(formatProdErrorMessage(311));
        queue.lastRenderedReducer = reducer;
        var dispatch = queue.dispatch, lastRenderPhaseUpdate = queue.pending, newState = hook.memoizedState;
        if (lastRenderPhaseUpdate !== null) {
          queue.pending = null;
          var update = lastRenderPhaseUpdate = lastRenderPhaseUpdate.next;
          do
            newState = reducer(newState, update.action), update = update.next;
          while (update !== lastRenderPhaseUpdate);
          objectIs(newState, hook.memoizedState) || (didReceiveUpdate = !0), hook.memoizedState = newState, hook.baseQueue === null && (hook.baseState = newState), queue.lastRenderedState = newState;
        }
        return [newState, dispatch];
      }
      function updateSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) {
        var fiber = currentlyRenderingFiber, hook = updateWorkInProgressHook(), isHydrating$jscomp$0 = isHydrating;
        if (isHydrating$jscomp$0) {
          if (getServerSnapshot === void 0) throw Error(formatProdErrorMessage(407));
          getServerSnapshot = getServerSnapshot();
        } else getServerSnapshot = getSnapshot();
        var snapshotChanged = !objectIs(
          (currentHook || hook).memoizedState,
          getServerSnapshot
        );
        if (snapshotChanged && (hook.memoizedState = getServerSnapshot, didReceiveUpdate = !0), hook = hook.queue, updateEffect(subscribeToStore.bind(null, fiber, hook, subscribe), [
          subscribe
        ]), hook.getSnapshot !== getSnapshot || snapshotChanged || workInProgressHook !== null && workInProgressHook.memoizedState.tag & 1) {
          if (fiber.flags |= 2048, pushSimpleEffect(
            9,
            { destroy: void 0 },
            updateStoreInstance.bind(
              null,
              fiber,
              hook,
              getServerSnapshot,
              getSnapshot
            ),
            null
          ), workInProgressRoot === null) throw Error(formatProdErrorMessage(349));
          isHydrating$jscomp$0 || (renderLanes & 127) !== 0 || pushStoreConsistencyCheck(fiber, getSnapshot, getServerSnapshot);
        }
        return getServerSnapshot;
      }
      function pushStoreConsistencyCheck(fiber, getSnapshot, renderedSnapshot) {
        fiber.flags |= 16384, fiber = { getSnapshot, value: renderedSnapshot }, getSnapshot = currentlyRenderingFiber.updateQueue, getSnapshot === null ? (getSnapshot = createFunctionComponentUpdateQueue(), currentlyRenderingFiber.updateQueue = getSnapshot, getSnapshot.stores = [fiber]) : (renderedSnapshot = getSnapshot.stores, renderedSnapshot === null ? getSnapshot.stores = [fiber] : renderedSnapshot.push(fiber));
      }
      function updateStoreInstance(fiber, inst, nextSnapshot, getSnapshot) {
        inst.value = nextSnapshot, inst.getSnapshot = getSnapshot, checkIfSnapshotChanged(inst) && forceStoreRerender(fiber);
      }
      function subscribeToStore(fiber, inst, subscribe) {
        return subscribe(function() {
          checkIfSnapshotChanged(inst) && forceStoreRerender(fiber);
        });
      }
      function checkIfSnapshotChanged(inst) {
        var latestGetSnapshot = inst.getSnapshot;
        inst = inst.value;
        try {
          var nextValue = latestGetSnapshot();
          return !objectIs(inst, nextValue);
        } catch {
          return !0;
        }
      }
      function forceStoreRerender(fiber) {
        var root2 = enqueueConcurrentRenderForLane(fiber, 2);
        root2 !== null && scheduleUpdateOnFiber(root2, fiber, 2);
      }
      function mountStateImpl(initialState) {
        var hook = mountWorkInProgressHook();
        if (typeof initialState == "function") {
          var initialStateInitializer = initialState;
          if (initialState = initialStateInitializer(), shouldDoubleInvokeUserFnsInHooksDEV) {
            setIsStrictModeForDevtools(!0);
            try {
              initialStateInitializer();
            } finally {
              setIsStrictModeForDevtools(!1);
            }
          }
        }
        return hook.memoizedState = hook.baseState = initialState, hook.queue = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: basicStateReducer,
          lastRenderedState: initialState
        }, hook;
      }
      function updateOptimisticImpl(hook, current, passthrough, reducer) {
        return hook.baseState = passthrough, updateReducerImpl(
          hook,
          currentHook,
          typeof reducer == "function" ? reducer : basicStateReducer
        );
      }
      function dispatchActionState(fiber, actionQueue, setPendingState, setState, payload) {
        if (isRenderPhaseUpdate(fiber)) throw Error(formatProdErrorMessage(485));
        if (fiber = actionQueue.action, fiber !== null) {
          var actionNode = {
            payload,
            action: fiber,
            next: null,
            isTransition: !0,
            status: "pending",
            value: null,
            reason: null,
            listeners: [],
            then: function(listener) {
              actionNode.listeners.push(listener);
            }
          };
          ReactSharedInternals.T !== null ? setPendingState(!0) : actionNode.isTransition = !1, setState(actionNode), setPendingState = actionQueue.pending, setPendingState === null ? (actionNode.next = actionQueue.pending = actionNode, runActionStateAction(actionQueue, actionNode)) : (actionNode.next = setPendingState.next, actionQueue.pending = setPendingState.next = actionNode);
        }
      }
      function runActionStateAction(actionQueue, node) {
        var action = node.action, payload = node.payload, prevState = actionQueue.state;
        if (node.isTransition) {
          var prevTransition = ReactSharedInternals.T, currentTransition = {};
          ReactSharedInternals.T = currentTransition;
          try {
            var returnValue = action(prevState, payload), onStartTransitionFinish = ReactSharedInternals.S;
            onStartTransitionFinish !== null && onStartTransitionFinish(currentTransition, returnValue), handleActionReturnValue(actionQueue, node, returnValue);
          } catch (error) {
            onActionError(actionQueue, node, error);
          } finally {
            prevTransition !== null && currentTransition.types !== null && (prevTransition.types = currentTransition.types), ReactSharedInternals.T = prevTransition;
          }
        } else
          try {
            prevTransition = action(prevState, payload), handleActionReturnValue(actionQueue, node, prevTransition);
          } catch (error$66) {
            onActionError(actionQueue, node, error$66);
          }
      }
      function handleActionReturnValue(actionQueue, node, returnValue) {
        returnValue !== null && typeof returnValue == "object" && typeof returnValue.then == "function" ? returnValue.then(
          function(nextState) {
            onActionSuccess(actionQueue, node, nextState);
          },
          function(error) {
            return onActionError(actionQueue, node, error);
          }
        ) : onActionSuccess(actionQueue, node, returnValue);
      }
      function onActionSuccess(actionQueue, actionNode, nextState) {
        actionNode.status = "fulfilled", actionNode.value = nextState, notifyActionListeners(actionNode), actionQueue.state = nextState, actionNode = actionQueue.pending, actionNode !== null && (nextState = actionNode.next, nextState === actionNode ? actionQueue.pending = null : (nextState = nextState.next, actionNode.next = nextState, runActionStateAction(actionQueue, nextState)));
      }
      function onActionError(actionQueue, actionNode, error) {
        var last = actionQueue.pending;
        if (actionQueue.pending = null, last !== null) {
          last = last.next;
          do
            actionNode.status = "rejected", actionNode.reason = error, notifyActionListeners(actionNode), actionNode = actionNode.next;
          while (actionNode !== last);
        }
        actionQueue.action = null;
      }
      function notifyActionListeners(actionNode) {
        actionNode = actionNode.listeners;
        for (var i = 0; i < actionNode.length; i++) (0, actionNode[i])();
      }
      function actionStateReducer(oldState, newState) {
        return newState;
      }
      function mountActionState(action, initialStateProp) {
        if (isHydrating) {
          var ssrFormState = workInProgressRoot.formState;
          if (ssrFormState !== null) {
            a: {
              var JSCompiler_inline_result = currentlyRenderingFiber;
              if (isHydrating) {
                if (nextHydratableInstance) {
                  b: {
                    for (var JSCompiler_inline_result$jscomp$0 = nextHydratableInstance, inRootOrSingleton = rootOrSingletonContext; JSCompiler_inline_result$jscomp$0.nodeType !== 8; ) {
                      if (!inRootOrSingleton) {
                        JSCompiler_inline_result$jscomp$0 = null;
                        break b;
                      }
                      if (JSCompiler_inline_result$jscomp$0 = getNextHydratable(
                        JSCompiler_inline_result$jscomp$0.nextSibling
                      ), JSCompiler_inline_result$jscomp$0 === null) {
                        JSCompiler_inline_result$jscomp$0 = null;
                        break b;
                      }
                    }
                    inRootOrSingleton = JSCompiler_inline_result$jscomp$0.data, JSCompiler_inline_result$jscomp$0 = inRootOrSingleton === "F!" || inRootOrSingleton === "F" ? JSCompiler_inline_result$jscomp$0 : null;
                  }
                  if (JSCompiler_inline_result$jscomp$0) {
                    nextHydratableInstance = getNextHydratable(
                      JSCompiler_inline_result$jscomp$0.nextSibling
                    ), JSCompiler_inline_result = JSCompiler_inline_result$jscomp$0.data === "F!";
                    break a;
                  }
                }
                throwOnHydrationMismatch(JSCompiler_inline_result);
              }
              JSCompiler_inline_result = !1;
            }
            JSCompiler_inline_result && (initialStateProp = ssrFormState[0]);
          }
        }
        return ssrFormState = mountWorkInProgressHook(), ssrFormState.memoizedState = ssrFormState.baseState = initialStateProp, JSCompiler_inline_result = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: actionStateReducer,
          lastRenderedState: initialStateProp
        }, ssrFormState.queue = JSCompiler_inline_result, ssrFormState = dispatchSetState.bind(
          null,
          currentlyRenderingFiber,
          JSCompiler_inline_result
        ), JSCompiler_inline_result.dispatch = ssrFormState, JSCompiler_inline_result = mountStateImpl(!1), inRootOrSingleton = dispatchOptimisticSetState.bind(
          null,
          currentlyRenderingFiber,
          !1,
          JSCompiler_inline_result.queue
        ), JSCompiler_inline_result = mountWorkInProgressHook(), JSCompiler_inline_result$jscomp$0 = {
          state: initialStateProp,
          dispatch: null,
          action,
          pending: null
        }, JSCompiler_inline_result.queue = JSCompiler_inline_result$jscomp$0, ssrFormState = dispatchActionState.bind(
          null,
          currentlyRenderingFiber,
          JSCompiler_inline_result$jscomp$0,
          inRootOrSingleton,
          ssrFormState
        ), JSCompiler_inline_result$jscomp$0.dispatch = ssrFormState, JSCompiler_inline_result.memoizedState = action, [initialStateProp, ssrFormState, !1];
      }
      function updateActionState(action) {
        var stateHook = updateWorkInProgressHook();
        return updateActionStateImpl(stateHook, currentHook, action);
      }
      function updateActionStateImpl(stateHook, currentStateHook, action) {
        if (currentStateHook = updateReducerImpl(
          stateHook,
          currentStateHook,
          actionStateReducer
        )[0], stateHook = updateReducer(basicStateReducer)[0], typeof currentStateHook == "object" && currentStateHook !== null && typeof currentStateHook.then == "function")
          try {
            var state = useThenable(currentStateHook);
          } catch (x) {
            throw x === SuspenseException ? SuspenseActionException : x;
          }
        else state = currentStateHook;
        currentStateHook = updateWorkInProgressHook();
        var actionQueue = currentStateHook.queue, dispatch = actionQueue.dispatch;
        return action !== currentStateHook.memoizedState && (currentlyRenderingFiber.flags |= 2048, pushSimpleEffect(
          9,
          { destroy: void 0 },
          actionStateActionEffect.bind(null, actionQueue, action),
          null
        )), [state, dispatch, stateHook];
      }
      function actionStateActionEffect(actionQueue, action) {
        actionQueue.action = action;
      }
      function rerenderActionState(action) {
        var stateHook = updateWorkInProgressHook(), currentStateHook = currentHook;
        if (currentStateHook !== null)
          return updateActionStateImpl(stateHook, currentStateHook, action);
        updateWorkInProgressHook(), stateHook = stateHook.memoizedState, currentStateHook = updateWorkInProgressHook();
        var dispatch = currentStateHook.queue.dispatch;
        return currentStateHook.memoizedState = action, [stateHook, dispatch, !1];
      }
      function pushSimpleEffect(tag, inst, create, deps) {
        return tag = { tag, create, deps, inst, next: null }, inst = currentlyRenderingFiber.updateQueue, inst === null && (inst = createFunctionComponentUpdateQueue(), currentlyRenderingFiber.updateQueue = inst), create = inst.lastEffect, create === null ? inst.lastEffect = tag.next = tag : (deps = create.next, create.next = tag, tag.next = deps, inst.lastEffect = tag), tag;
      }
      function updateRef() {
        return updateWorkInProgressHook().memoizedState;
      }
      function mountEffectImpl(fiberFlags, hookFlags, create, deps) {
        var hook = mountWorkInProgressHook();
        currentlyRenderingFiber.flags |= fiberFlags, hook.memoizedState = pushSimpleEffect(
          1 | hookFlags,
          { destroy: void 0 },
          create,
          deps === void 0 ? null : deps
        );
      }
      function updateEffectImpl(fiberFlags, hookFlags, create, deps) {
        var hook = updateWorkInProgressHook();
        deps = deps === void 0 ? null : deps;
        var inst = hook.memoizedState.inst;
        currentHook !== null && deps !== null && areHookInputsEqual(deps, currentHook.memoizedState.deps) ? hook.memoizedState = pushSimpleEffect(hookFlags, inst, create, deps) : (currentlyRenderingFiber.flags |= fiberFlags, hook.memoizedState = pushSimpleEffect(
          1 | hookFlags,
          inst,
          create,
          deps
        ));
      }
      function mountEffect(create, deps) {
        mountEffectImpl(8390656, 8, create, deps);
      }
      function updateEffect(create, deps) {
        updateEffectImpl(2048, 8, create, deps);
      }
      function useEffectEventImpl(payload) {
        currentlyRenderingFiber.flags |= 4;
        var componentUpdateQueue = currentlyRenderingFiber.updateQueue;
        if (componentUpdateQueue === null)
          componentUpdateQueue = createFunctionComponentUpdateQueue(), currentlyRenderingFiber.updateQueue = componentUpdateQueue, componentUpdateQueue.events = [payload];
        else {
          var events = componentUpdateQueue.events;
          events === null ? componentUpdateQueue.events = [payload] : events.push(payload);
        }
      }
      function updateEvent(callback) {
        var ref = updateWorkInProgressHook().memoizedState;
        return useEffectEventImpl({ ref, nextImpl: callback }), function() {
          if ((executionContext & 2) !== 0) throw Error(formatProdErrorMessage(440));
          return ref.impl.apply(void 0, arguments);
        };
      }
      function updateInsertionEffect(create, deps) {
        return updateEffectImpl(4, 2, create, deps);
      }
      function updateLayoutEffect(create, deps) {
        return updateEffectImpl(4, 4, create, deps);
      }
      function imperativeHandleEffect(create, ref) {
        if (typeof ref == "function") {
          create = create();
          var refCleanup = ref(create);
          return function() {
            typeof refCleanup == "function" ? refCleanup() : ref(null);
          };
        }
        if (ref != null)
          return create = create(), ref.current = create, function() {
            ref.current = null;
          };
      }
      function updateImperativeHandle(ref, create, deps) {
        deps = deps != null ? deps.concat([ref]) : null, updateEffectImpl(4, 4, imperativeHandleEffect.bind(null, create, ref), deps);
      }
      function mountDebugValue() {
      }
      function updateCallback(callback, deps) {
        var hook = updateWorkInProgressHook();
        deps = deps === void 0 ? null : deps;
        var prevState = hook.memoizedState;
        return deps !== null && areHookInputsEqual(deps, prevState[1]) ? prevState[0] : (hook.memoizedState = [callback, deps], callback);
      }
      function updateMemo(nextCreate, deps) {
        var hook = updateWorkInProgressHook();
        deps = deps === void 0 ? null : deps;
        var prevState = hook.memoizedState;
        if (deps !== null && areHookInputsEqual(deps, prevState[1]))
          return prevState[0];
        if (prevState = nextCreate(), shouldDoubleInvokeUserFnsInHooksDEV) {
          setIsStrictModeForDevtools(!0);
          try {
            nextCreate();
          } finally {
            setIsStrictModeForDevtools(!1);
          }
        }
        return hook.memoizedState = [prevState, deps], prevState;
      }
      function mountDeferredValueImpl(hook, value, initialValue) {
        return initialValue === void 0 || (renderLanes & 1073741824) !== 0 && (workInProgressRootRenderLanes & 261930) === 0 ? hook.memoizedState = value : (hook.memoizedState = initialValue, hook = requestDeferredLane(), currentlyRenderingFiber.lanes |= hook, workInProgressRootSkippedLanes |= hook, initialValue);
      }
      function updateDeferredValueImpl(hook, prevValue, value, initialValue) {
        return objectIs(value, prevValue) ? value : currentTreeHiddenStackCursor.current !== null ? (hook = mountDeferredValueImpl(hook, value, initialValue), objectIs(hook, prevValue) || (didReceiveUpdate = !0), hook) : (renderLanes & 42) === 0 || (renderLanes & 1073741824) !== 0 && (workInProgressRootRenderLanes & 261930) === 0 ? (didReceiveUpdate = !0, hook.memoizedState = value) : (hook = requestDeferredLane(), currentlyRenderingFiber.lanes |= hook, workInProgressRootSkippedLanes |= hook, prevValue);
      }
      function startTransition(fiber, queue, pendingState, finishedState, callback) {
        var previousPriority = ReactDOMSharedInternals.p;
        ReactDOMSharedInternals.p = previousPriority !== 0 && 8 > previousPriority ? previousPriority : 8;
        var prevTransition = ReactSharedInternals.T, currentTransition = {};
        ReactSharedInternals.T = currentTransition, dispatchOptimisticSetState(fiber, !1, queue, pendingState);
        try {
          var returnValue = callback(), onStartTransitionFinish = ReactSharedInternals.S;
          if (onStartTransitionFinish !== null && onStartTransitionFinish(currentTransition, returnValue), returnValue !== null && typeof returnValue == "object" && typeof returnValue.then == "function") {
            var thenableForFinishedState = chainThenableValue(
              returnValue,
              finishedState
            );
            dispatchSetStateInternal(
              fiber,
              queue,
              thenableForFinishedState,
              requestUpdateLane(fiber)
            );
          } else
            dispatchSetStateInternal(
              fiber,
              queue,
              finishedState,
              requestUpdateLane(fiber)
            );
        } catch (error) {
          dispatchSetStateInternal(
            fiber,
            queue,
            { then: function() {
            }, status: "rejected", reason: error },
            requestUpdateLane()
          );
        } finally {
          ReactDOMSharedInternals.p = previousPriority, prevTransition !== null && currentTransition.types !== null && (prevTransition.types = currentTransition.types), ReactSharedInternals.T = prevTransition;
        }
      }
      function noop() {
      }
      function startHostTransition(formFiber, pendingState, action, formData) {
        if (formFiber.tag !== 5) throw Error(formatProdErrorMessage(476));
        var queue = ensureFormComponentIsStateful(formFiber).queue;
        startTransition(
          formFiber,
          queue,
          pendingState,
          sharedNotPendingObject,
          action === null ? noop : function() {
            return requestFormReset$1(formFiber), action(formData);
          }
        );
      }
      function ensureFormComponentIsStateful(formFiber) {
        var existingStateHook = formFiber.memoizedState;
        if (existingStateHook !== null) return existingStateHook;
        existingStateHook = {
          memoizedState: sharedNotPendingObject,
          baseState: sharedNotPendingObject,
          baseQueue: null,
          queue: {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: basicStateReducer,
            lastRenderedState: sharedNotPendingObject
          },
          next: null
        };
        var initialResetState = {};
        return existingStateHook.next = {
          memoizedState: initialResetState,
          baseState: initialResetState,
          baseQueue: null,
          queue: {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: basicStateReducer,
            lastRenderedState: initialResetState
          },
          next: null
        }, formFiber.memoizedState = existingStateHook, formFiber = formFiber.alternate, formFiber !== null && (formFiber.memoizedState = existingStateHook), existingStateHook;
      }
      function requestFormReset$1(formFiber) {
        var stateHook = ensureFormComponentIsStateful(formFiber);
        stateHook.next === null && (stateHook = formFiber.alternate.memoizedState), dispatchSetStateInternal(
          formFiber,
          stateHook.next.queue,
          {},
          requestUpdateLane()
        );
      }
      function useHostTransitionStatus() {
        return readContext(HostTransitionContext);
      }
      function updateId() {
        return updateWorkInProgressHook().memoizedState;
      }
      function updateRefresh() {
        return updateWorkInProgressHook().memoizedState;
      }
      function refreshCache(fiber) {
        for (var provider = fiber.return; provider !== null; ) {
          switch (provider.tag) {
            case 24:
            case 3:
              var lane = requestUpdateLane();
              fiber = createUpdate(lane);
              var root$69 = enqueueUpdate(provider, fiber, lane);
              root$69 !== null && (scheduleUpdateOnFiber(root$69, provider, lane), entangleTransitions(root$69, provider, lane)), provider = { cache: createCache() }, fiber.payload = provider;
              return;
          }
          provider = provider.return;
        }
      }
      function dispatchReducerAction(fiber, queue, action) {
        var lane = requestUpdateLane();
        action = {
          lane,
          revertLane: 0,
          gesture: null,
          action,
          hasEagerState: !1,
          eagerState: null,
          next: null
        }, isRenderPhaseUpdate(fiber) ? enqueueRenderPhaseUpdate(queue, action) : (action = enqueueConcurrentHookUpdate(fiber, queue, action, lane), action !== null && (scheduleUpdateOnFiber(action, fiber, lane), entangleTransitionUpdate(action, queue, lane)));
      }
      function dispatchSetState(fiber, queue, action) {
        var lane = requestUpdateLane();
        dispatchSetStateInternal(fiber, queue, action, lane);
      }
      function dispatchSetStateInternal(fiber, queue, action, lane) {
        var update = {
          lane,
          revertLane: 0,
          gesture: null,
          action,
          hasEagerState: !1,
          eagerState: null,
          next: null
        };
        if (isRenderPhaseUpdate(fiber)) enqueueRenderPhaseUpdate(queue, update);
        else {
          var alternate = fiber.alternate;
          if (fiber.lanes === 0 && (alternate === null || alternate.lanes === 0) && (alternate = queue.lastRenderedReducer, alternate !== null))
            try {
              var currentState = queue.lastRenderedState, eagerState = alternate(currentState, action);
              if (update.hasEagerState = !0, update.eagerState = eagerState, objectIs(eagerState, currentState))
                return enqueueUpdate$1(fiber, queue, update, 0), workInProgressRoot === null && finishQueueingConcurrentUpdates(), !1;
            } catch {
            }
          if (action = enqueueConcurrentHookUpdate(fiber, queue, update, lane), action !== null)
            return scheduleUpdateOnFiber(action, fiber, lane), entangleTransitionUpdate(action, queue, lane), !0;
        }
        return !1;
      }
      function dispatchOptimisticSetState(fiber, throwIfDuringRender, queue, action) {
        if (action = {
          lane: 2,
          revertLane: requestTransitionLane(),
          gesture: null,
          action,
          hasEagerState: !1,
          eagerState: null,
          next: null
        }, isRenderPhaseUpdate(fiber)) {
          if (throwIfDuringRender) throw Error(formatProdErrorMessage(479));
        } else
          throwIfDuringRender = enqueueConcurrentHookUpdate(
            fiber,
            queue,
            action,
            2
          ), throwIfDuringRender !== null && scheduleUpdateOnFiber(throwIfDuringRender, fiber, 2);
      }
      function isRenderPhaseUpdate(fiber) {
        var alternate = fiber.alternate;
        return fiber === currentlyRenderingFiber || alternate !== null && alternate === currentlyRenderingFiber;
      }
      function enqueueRenderPhaseUpdate(queue, update) {
        didScheduleRenderPhaseUpdateDuringThisPass = didScheduleRenderPhaseUpdate = !0;
        var pending = queue.pending;
        pending === null ? update.next = update : (update.next = pending.next, pending.next = update), queue.pending = update;
      }
      function entangleTransitionUpdate(root2, queue, lane) {
        if ((lane & 4194048) !== 0) {
          var queueLanes = queue.lanes;
          queueLanes &= root2.pendingLanes, lane |= queueLanes, queue.lanes = lane, markRootEntangled(root2, lane);
        }
      }
      var ContextOnlyDispatcher = {
        readContext,
        use,
        useCallback: throwInvalidHookError,
        useContext: throwInvalidHookError,
        useEffect: throwInvalidHookError,
        useImperativeHandle: throwInvalidHookError,
        useLayoutEffect: throwInvalidHookError,
        useInsertionEffect: throwInvalidHookError,
        useMemo: throwInvalidHookError,
        useReducer: throwInvalidHookError,
        useRef: throwInvalidHookError,
        useState: throwInvalidHookError,
        useDebugValue: throwInvalidHookError,
        useDeferredValue: throwInvalidHookError,
        useTransition: throwInvalidHookError,
        useSyncExternalStore: throwInvalidHookError,
        useId: throwInvalidHookError,
        useHostTransitionStatus: throwInvalidHookError,
        useFormState: throwInvalidHookError,
        useActionState: throwInvalidHookError,
        useOptimistic: throwInvalidHookError,
        useMemoCache: throwInvalidHookError,
        useCacheRefresh: throwInvalidHookError
      };
      ContextOnlyDispatcher.useEffectEvent = throwInvalidHookError;
      var HooksDispatcherOnMount = {
        readContext,
        use,
        useCallback: function(callback, deps) {
          return mountWorkInProgressHook().memoizedState = [
            callback,
            deps === void 0 ? null : deps
          ], callback;
        },
        useContext: readContext,
        useEffect: mountEffect,
        useImperativeHandle: function(ref, create, deps) {
          deps = deps != null ? deps.concat([ref]) : null, mountEffectImpl(
            4194308,
            4,
            imperativeHandleEffect.bind(null, create, ref),
            deps
          );
        },
        useLayoutEffect: function(create, deps) {
          return mountEffectImpl(4194308, 4, create, deps);
        },
        useInsertionEffect: function(create, deps) {
          mountEffectImpl(4, 2, create, deps);
        },
        useMemo: function(nextCreate, deps) {
          var hook = mountWorkInProgressHook();
          deps = deps === void 0 ? null : deps;
          var nextValue = nextCreate();
          if (shouldDoubleInvokeUserFnsInHooksDEV) {
            setIsStrictModeForDevtools(!0);
            try {
              nextCreate();
            } finally {
              setIsStrictModeForDevtools(!1);
            }
          }
          return hook.memoizedState = [nextValue, deps], nextValue;
        },
        useReducer: function(reducer, initialArg, init) {
          var hook = mountWorkInProgressHook();
          if (init !== void 0) {
            var initialState = init(initialArg);
            if (shouldDoubleInvokeUserFnsInHooksDEV) {
              setIsStrictModeForDevtools(!0);
              try {
                init(initialArg);
              } finally {
                setIsStrictModeForDevtools(!1);
              }
            }
          } else initialState = initialArg;
          return hook.memoizedState = hook.baseState = initialState, reducer = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: reducer,
            lastRenderedState: initialState
          }, hook.queue = reducer, reducer = reducer.dispatch = dispatchReducerAction.bind(
            null,
            currentlyRenderingFiber,
            reducer
          ), [hook.memoizedState, reducer];
        },
        useRef: function(initialValue) {
          var hook = mountWorkInProgressHook();
          return initialValue = { current: initialValue }, hook.memoizedState = initialValue;
        },
        useState: function(initialState) {
          initialState = mountStateImpl(initialState);
          var queue = initialState.queue, dispatch = dispatchSetState.bind(null, currentlyRenderingFiber, queue);
          return queue.dispatch = dispatch, [initialState.memoizedState, dispatch];
        },
        useDebugValue: mountDebugValue,
        useDeferredValue: function(value, initialValue) {
          var hook = mountWorkInProgressHook();
          return mountDeferredValueImpl(hook, value, initialValue);
        },
        useTransition: function() {
          var stateHook = mountStateImpl(!1);
          return stateHook = startTransition.bind(
            null,
            currentlyRenderingFiber,
            stateHook.queue,
            !0,
            !1
          ), mountWorkInProgressHook().memoizedState = stateHook, [!1, stateHook];
        },
        useSyncExternalStore: function(subscribe, getSnapshot, getServerSnapshot) {
          var fiber = currentlyRenderingFiber, hook = mountWorkInProgressHook();
          if (isHydrating) {
            if (getServerSnapshot === void 0)
              throw Error(formatProdErrorMessage(407));
            getServerSnapshot = getServerSnapshot();
          } else {
            if (getServerSnapshot = getSnapshot(), workInProgressRoot === null)
              throw Error(formatProdErrorMessage(349));
            (workInProgressRootRenderLanes & 127) !== 0 || pushStoreConsistencyCheck(fiber, getSnapshot, getServerSnapshot);
          }
          hook.memoizedState = getServerSnapshot;
          var inst = { value: getServerSnapshot, getSnapshot };
          return hook.queue = inst, mountEffect(subscribeToStore.bind(null, fiber, inst, subscribe), [
            subscribe
          ]), fiber.flags |= 2048, pushSimpleEffect(
            9,
            { destroy: void 0 },
            updateStoreInstance.bind(
              null,
              fiber,
              inst,
              getServerSnapshot,
              getSnapshot
            ),
            null
          ), getServerSnapshot;
        },
        useId: function() {
          var hook = mountWorkInProgressHook(), identifierPrefix = workInProgressRoot.identifierPrefix;
          if (isHydrating) {
            var JSCompiler_inline_result = treeContextOverflow, idWithLeadingBit = treeContextId;
            JSCompiler_inline_result = (idWithLeadingBit & ~(1 << 32 - clz32(idWithLeadingBit) - 1)).toString(32) + JSCompiler_inline_result, identifierPrefix = "_" + identifierPrefix + "R_" + JSCompiler_inline_result, JSCompiler_inline_result = localIdCounter++, 0 < JSCompiler_inline_result && (identifierPrefix += "H" + JSCompiler_inline_result.toString(32)), identifierPrefix += "_";
          } else
            JSCompiler_inline_result = globalClientIdCounter++, identifierPrefix = "_" + identifierPrefix + "r_" + JSCompiler_inline_result.toString(32) + "_";
          return hook.memoizedState = identifierPrefix;
        },
        useHostTransitionStatus,
        useFormState: mountActionState,
        useActionState: mountActionState,
        useOptimistic: function(passthrough) {
          var hook = mountWorkInProgressHook();
          hook.memoizedState = hook.baseState = passthrough;
          var queue = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: null,
            lastRenderedState: null
          };
          return hook.queue = queue, hook = dispatchOptimisticSetState.bind(
            null,
            currentlyRenderingFiber,
            !0,
            queue
          ), queue.dispatch = hook, [passthrough, hook];
        },
        useMemoCache,
        useCacheRefresh: function() {
          return mountWorkInProgressHook().memoizedState = refreshCache.bind(
            null,
            currentlyRenderingFiber
          );
        },
        useEffectEvent: function(callback) {
          var hook = mountWorkInProgressHook(), ref = { impl: callback };
          return hook.memoizedState = ref, function() {
            if ((executionContext & 2) !== 0)
              throw Error(formatProdErrorMessage(440));
            return ref.impl.apply(void 0, arguments);
          };
        }
      }, HooksDispatcherOnUpdate = {
        readContext,
        use,
        useCallback: updateCallback,
        useContext: readContext,
        useEffect: updateEffect,
        useImperativeHandle: updateImperativeHandle,
        useInsertionEffect: updateInsertionEffect,
        useLayoutEffect: updateLayoutEffect,
        useMemo: updateMemo,
        useReducer: updateReducer,
        useRef: updateRef,
        useState: function() {
          return updateReducer(basicStateReducer);
        },
        useDebugValue: mountDebugValue,
        useDeferredValue: function(value, initialValue) {
          var hook = updateWorkInProgressHook();
          return updateDeferredValueImpl(
            hook,
            currentHook.memoizedState,
            value,
            initialValue
          );
        },
        useTransition: function() {
          var booleanOrThenable = updateReducer(basicStateReducer)[0], start = updateWorkInProgressHook().memoizedState;
          return [
            typeof booleanOrThenable == "boolean" ? booleanOrThenable : useThenable(booleanOrThenable),
            start
          ];
        },
        useSyncExternalStore: updateSyncExternalStore,
        useId: updateId,
        useHostTransitionStatus,
        useFormState: updateActionState,
        useActionState: updateActionState,
        useOptimistic: function(passthrough, reducer) {
          var hook = updateWorkInProgressHook();
          return updateOptimisticImpl(hook, currentHook, passthrough, reducer);
        },
        useMemoCache,
        useCacheRefresh: updateRefresh
      };
      HooksDispatcherOnUpdate.useEffectEvent = updateEvent;
      var HooksDispatcherOnRerender = {
        readContext,
        use,
        useCallback: updateCallback,
        useContext: readContext,
        useEffect: updateEffect,
        useImperativeHandle: updateImperativeHandle,
        useInsertionEffect: updateInsertionEffect,
        useLayoutEffect: updateLayoutEffect,
        useMemo: updateMemo,
        useReducer: rerenderReducer,
        useRef: updateRef,
        useState: function() {
          return rerenderReducer(basicStateReducer);
        },
        useDebugValue: mountDebugValue,
        useDeferredValue: function(value, initialValue) {
          var hook = updateWorkInProgressHook();
          return currentHook === null ? mountDeferredValueImpl(hook, value, initialValue) : updateDeferredValueImpl(
            hook,
            currentHook.memoizedState,
            value,
            initialValue
          );
        },
        useTransition: function() {
          var booleanOrThenable = rerenderReducer(basicStateReducer)[0], start = updateWorkInProgressHook().memoizedState;
          return [
            typeof booleanOrThenable == "boolean" ? booleanOrThenable : useThenable(booleanOrThenable),
            start
          ];
        },
        useSyncExternalStore: updateSyncExternalStore,
        useId: updateId,
        useHostTransitionStatus,
        useFormState: rerenderActionState,
        useActionState: rerenderActionState,
        useOptimistic: function(passthrough, reducer) {
          var hook = updateWorkInProgressHook();
          return currentHook !== null ? updateOptimisticImpl(hook, currentHook, passthrough, reducer) : (hook.baseState = passthrough, [passthrough, hook.queue.dispatch]);
        },
        useMemoCache,
        useCacheRefresh: updateRefresh
      };
      HooksDispatcherOnRerender.useEffectEvent = updateEvent;
      function applyDerivedStateFromProps(workInProgress2, ctor, getDerivedStateFromProps, nextProps) {
        ctor = workInProgress2.memoizedState, getDerivedStateFromProps = getDerivedStateFromProps(nextProps, ctor), getDerivedStateFromProps = getDerivedStateFromProps == null ? ctor : assign({}, ctor, getDerivedStateFromProps), workInProgress2.memoizedState = getDerivedStateFromProps, workInProgress2.lanes === 0 && (workInProgress2.updateQueue.baseState = getDerivedStateFromProps);
      }
      var classComponentUpdater = {
        enqueueSetState: function(inst, payload, callback) {
          inst = inst._reactInternals;
          var lane = requestUpdateLane(), update = createUpdate(lane);
          update.payload = payload, callback != null && (update.callback = callback), payload = enqueueUpdate(inst, update, lane), payload !== null && (scheduleUpdateOnFiber(payload, inst, lane), entangleTransitions(payload, inst, lane));
        },
        enqueueReplaceState: function(inst, payload, callback) {
          inst = inst._reactInternals;
          var lane = requestUpdateLane(), update = createUpdate(lane);
          update.tag = 1, update.payload = payload, callback != null && (update.callback = callback), payload = enqueueUpdate(inst, update, lane), payload !== null && (scheduleUpdateOnFiber(payload, inst, lane), entangleTransitions(payload, inst, lane));
        },
        enqueueForceUpdate: function(inst, callback) {
          inst = inst._reactInternals;
          var lane = requestUpdateLane(), update = createUpdate(lane);
          update.tag = 2, callback != null && (update.callback = callback), callback = enqueueUpdate(inst, update, lane), callback !== null && (scheduleUpdateOnFiber(callback, inst, lane), entangleTransitions(callback, inst, lane));
        }
      };
      function checkShouldComponentUpdate(workInProgress2, ctor, oldProps, newProps, oldState, newState, nextContext) {
        return workInProgress2 = workInProgress2.stateNode, typeof workInProgress2.shouldComponentUpdate == "function" ? workInProgress2.shouldComponentUpdate(newProps, newState, nextContext) : ctor.prototype && ctor.prototype.isPureReactComponent ? !shallowEqual(oldProps, newProps) || !shallowEqual(oldState, newState) : !0;
      }
      function callComponentWillReceiveProps(workInProgress2, instance, newProps, nextContext) {
        workInProgress2 = instance.state, typeof instance.componentWillReceiveProps == "function" && instance.componentWillReceiveProps(newProps, nextContext), typeof instance.UNSAFE_componentWillReceiveProps == "function" && instance.UNSAFE_componentWillReceiveProps(newProps, nextContext), instance.state !== workInProgress2 && classComponentUpdater.enqueueReplaceState(instance, instance.state, null);
      }
      function resolveClassComponentProps(Component, baseProps) {
        var newProps = baseProps;
        if ("ref" in baseProps) {
          newProps = {};
          for (var propName in baseProps)
            propName !== "ref" && (newProps[propName] = baseProps[propName]);
        }
        if (Component = Component.defaultProps) {
          newProps === baseProps && (newProps = assign({}, newProps));
          for (var propName$73 in Component)
            newProps[propName$73] === void 0 && (newProps[propName$73] = Component[propName$73]);
        }
        return newProps;
      }
      function defaultOnUncaughtError(error) {
        reportGlobalError(error);
      }
      function defaultOnCaughtError(error) {
        console.error(error);
      }
      function defaultOnRecoverableError(error) {
        reportGlobalError(error);
      }
      function logUncaughtError(root2, errorInfo) {
        try {
          var onUncaughtError = root2.onUncaughtError;
          onUncaughtError(errorInfo.value, { componentStack: errorInfo.stack });
        } catch (e$74) {
          setTimeout(function() {
            throw e$74;
          });
        }
      }
      function logCaughtError(root2, boundary, errorInfo) {
        try {
          var onCaughtError = root2.onCaughtError;
          onCaughtError(errorInfo.value, {
            componentStack: errorInfo.stack,
            errorBoundary: boundary.tag === 1 ? boundary.stateNode : null
          });
        } catch (e$75) {
          setTimeout(function() {
            throw e$75;
          });
        }
      }
      function createRootErrorUpdate(root2, errorInfo, lane) {
        return lane = createUpdate(lane), lane.tag = 3, lane.payload = { element: null }, lane.callback = function() {
          logUncaughtError(root2, errorInfo);
        }, lane;
      }
      function createClassErrorUpdate(lane) {
        return lane = createUpdate(lane), lane.tag = 3, lane;
      }
      function initializeClassErrorUpdate(update, root2, fiber, errorInfo) {
        var getDerivedStateFromError = fiber.type.getDerivedStateFromError;
        if (typeof getDerivedStateFromError == "function") {
          var error = errorInfo.value;
          update.payload = function() {
            return getDerivedStateFromError(error);
          }, update.callback = function() {
            logCaughtError(root2, fiber, errorInfo);
          };
        }
        var inst = fiber.stateNode;
        inst !== null && typeof inst.componentDidCatch == "function" && (update.callback = function() {
          logCaughtError(root2, fiber, errorInfo), typeof getDerivedStateFromError != "function" && (legacyErrorBoundariesThatAlreadyFailed === null ? legacyErrorBoundariesThatAlreadyFailed = /* @__PURE__ */ new Set([this]) : legacyErrorBoundariesThatAlreadyFailed.add(this));
          var stack = errorInfo.stack;
          this.componentDidCatch(errorInfo.value, {
            componentStack: stack !== null ? stack : ""
          });
        });
      }
      function throwException(root2, returnFiber, sourceFiber, value, rootRenderLanes) {
        if (sourceFiber.flags |= 32768, value !== null && typeof value == "object" && typeof value.then == "function") {
          if (returnFiber = sourceFiber.alternate, returnFiber !== null && propagateParentContextChanges(
            returnFiber,
            sourceFiber,
            rootRenderLanes,
            !0
          ), sourceFiber = suspenseHandlerStackCursor.current, sourceFiber !== null) {
            switch (sourceFiber.tag) {
              case 31:
              case 13:
                return shellBoundary === null ? renderDidSuspendDelayIfPossible() : sourceFiber.alternate === null && workInProgressRootExitStatus === 0 && (workInProgressRootExitStatus = 3), sourceFiber.flags &= -257, sourceFiber.flags |= 65536, sourceFiber.lanes = rootRenderLanes, value === noopSuspenseyCommitThenable ? sourceFiber.flags |= 16384 : (returnFiber = sourceFiber.updateQueue, returnFiber === null ? sourceFiber.updateQueue = /* @__PURE__ */ new Set([value]) : returnFiber.add(value), attachPingListener(root2, value, rootRenderLanes)), !1;
              case 22:
                return sourceFiber.flags |= 65536, value === noopSuspenseyCommitThenable ? sourceFiber.flags |= 16384 : (returnFiber = sourceFiber.updateQueue, returnFiber === null ? (returnFiber = {
                  transitions: null,
                  markerInstances: null,
                  retryQueue: /* @__PURE__ */ new Set([value])
                }, sourceFiber.updateQueue = returnFiber) : (sourceFiber = returnFiber.retryQueue, sourceFiber === null ? returnFiber.retryQueue = /* @__PURE__ */ new Set([value]) : sourceFiber.add(value)), attachPingListener(root2, value, rootRenderLanes)), !1;
            }
            throw Error(formatProdErrorMessage(435, sourceFiber.tag));
          }
          return attachPingListener(root2, value, rootRenderLanes), renderDidSuspendDelayIfPossible(), !1;
        }
        if (isHydrating)
          return returnFiber = suspenseHandlerStackCursor.current, returnFiber !== null ? ((returnFiber.flags & 65536) === 0 && (returnFiber.flags |= 256), returnFiber.flags |= 65536, returnFiber.lanes = rootRenderLanes, value !== HydrationMismatchException && (root2 = Error(formatProdErrorMessage(422), { cause: value }), queueHydrationError(createCapturedValueAtFiber(root2, sourceFiber)))) : (value !== HydrationMismatchException && (returnFiber = Error(formatProdErrorMessage(423), {
            cause: value
          }), queueHydrationError(
            createCapturedValueAtFiber(returnFiber, sourceFiber)
          )), root2 = root2.current.alternate, root2.flags |= 65536, rootRenderLanes &= -rootRenderLanes, root2.lanes |= rootRenderLanes, value = createCapturedValueAtFiber(value, sourceFiber), rootRenderLanes = createRootErrorUpdate(
            root2.stateNode,
            value,
            rootRenderLanes
          ), enqueueCapturedUpdate(root2, rootRenderLanes), workInProgressRootExitStatus !== 4 && (workInProgressRootExitStatus = 2)), !1;
        var wrapperError = Error(formatProdErrorMessage(520), { cause: value });
        if (wrapperError = createCapturedValueAtFiber(wrapperError, sourceFiber), workInProgressRootConcurrentErrors === null ? workInProgressRootConcurrentErrors = [wrapperError] : workInProgressRootConcurrentErrors.push(wrapperError), workInProgressRootExitStatus !== 4 && (workInProgressRootExitStatus = 2), returnFiber === null) return !0;
        value = createCapturedValueAtFiber(value, sourceFiber), sourceFiber = returnFiber;
        do {
          switch (sourceFiber.tag) {
            case 3:
              return sourceFiber.flags |= 65536, root2 = rootRenderLanes & -rootRenderLanes, sourceFiber.lanes |= root2, root2 = createRootErrorUpdate(sourceFiber.stateNode, value, root2), enqueueCapturedUpdate(sourceFiber, root2), !1;
            case 1:
              if (returnFiber = sourceFiber.type, wrapperError = sourceFiber.stateNode, (sourceFiber.flags & 128) === 0 && (typeof returnFiber.getDerivedStateFromError == "function" || wrapperError !== null && typeof wrapperError.componentDidCatch == "function" && (legacyErrorBoundariesThatAlreadyFailed === null || !legacyErrorBoundariesThatAlreadyFailed.has(wrapperError))))
                return sourceFiber.flags |= 65536, rootRenderLanes &= -rootRenderLanes, sourceFiber.lanes |= rootRenderLanes, rootRenderLanes = createClassErrorUpdate(rootRenderLanes), initializeClassErrorUpdate(
                  rootRenderLanes,
                  root2,
                  sourceFiber,
                  value
                ), enqueueCapturedUpdate(sourceFiber, rootRenderLanes), !1;
          }
          sourceFiber = sourceFiber.return;
        } while (sourceFiber !== null);
        return !1;
      }
      var SelectiveHydrationException = Error(formatProdErrorMessage(461)), didReceiveUpdate = !1;
      function reconcileChildren(current, workInProgress2, nextChildren, renderLanes2) {
        workInProgress2.child = current === null ? mountChildFibers(workInProgress2, null, nextChildren, renderLanes2) : reconcileChildFibers(
          workInProgress2,
          current.child,
          nextChildren,
          renderLanes2
        );
      }
      function updateForwardRef(current, workInProgress2, Component, nextProps, renderLanes2) {
        Component = Component.render;
        var ref = workInProgress2.ref;
        if ("ref" in nextProps) {
          var propsWithoutRef = {};
          for (var key in nextProps)
            key !== "ref" && (propsWithoutRef[key] = nextProps[key]);
        } else propsWithoutRef = nextProps;
        return prepareToReadContext(workInProgress2), nextProps = renderWithHooks(
          current,
          workInProgress2,
          Component,
          propsWithoutRef,
          ref,
          renderLanes2
        ), key = checkDidRenderIdHook(), current !== null && !didReceiveUpdate ? (bailoutHooks(current, workInProgress2, renderLanes2), bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2)) : (isHydrating && key && pushMaterializedTreeId(workInProgress2), workInProgress2.flags |= 1, reconcileChildren(current, workInProgress2, nextProps, renderLanes2), workInProgress2.child);
      }
      function updateMemoComponent(current, workInProgress2, Component, nextProps, renderLanes2) {
        if (current === null) {
          var type = Component.type;
          return typeof type == "function" && !shouldConstruct(type) && type.defaultProps === void 0 && Component.compare === null ? (workInProgress2.tag = 15, workInProgress2.type = type, updateSimpleMemoComponent(
            current,
            workInProgress2,
            type,
            nextProps,
            renderLanes2
          )) : (current = createFiberFromTypeAndProps(
            Component.type,
            null,
            nextProps,
            workInProgress2,
            workInProgress2.mode,
            renderLanes2
          ), current.ref = workInProgress2.ref, current.return = workInProgress2, workInProgress2.child = current);
        }
        if (type = current.child, !checkScheduledUpdateOrContext(current, renderLanes2)) {
          var prevProps = type.memoizedProps;
          if (Component = Component.compare, Component = Component !== null ? Component : shallowEqual, Component(prevProps, nextProps) && current.ref === workInProgress2.ref)
            return bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2);
        }
        return workInProgress2.flags |= 1, current = createWorkInProgress(type, nextProps), current.ref = workInProgress2.ref, current.return = workInProgress2, workInProgress2.child = current;
      }
      function updateSimpleMemoComponent(current, workInProgress2, Component, nextProps, renderLanes2) {
        if (current !== null) {
          var prevProps = current.memoizedProps;
          if (shallowEqual(prevProps, nextProps) && current.ref === workInProgress2.ref)
            if (didReceiveUpdate = !1, workInProgress2.pendingProps = nextProps = prevProps, checkScheduledUpdateOrContext(current, renderLanes2))
              (current.flags & 131072) !== 0 && (didReceiveUpdate = !0);
            else
              return workInProgress2.lanes = current.lanes, bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2);
        }
        return updateFunctionComponent(
          current,
          workInProgress2,
          Component,
          nextProps,
          renderLanes2
        );
      }
      function updateOffscreenComponent(current, workInProgress2, renderLanes2, nextProps) {
        var nextChildren = nextProps.children, prevState = current !== null ? current.memoizedState : null;
        if (current === null && workInProgress2.stateNode === null && (workInProgress2.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null
        }), nextProps.mode === "hidden") {
          if ((workInProgress2.flags & 128) !== 0) {
            if (prevState = prevState !== null ? prevState.baseLanes | renderLanes2 : renderLanes2, current !== null) {
              for (nextProps = workInProgress2.child = current.child, nextChildren = 0; nextProps !== null; )
                nextChildren = nextChildren | nextProps.lanes | nextProps.childLanes, nextProps = nextProps.sibling;
              nextProps = nextChildren & ~prevState;
            } else nextProps = 0, workInProgress2.child = null;
            return deferHiddenOffscreenComponent(
              current,
              workInProgress2,
              prevState,
              renderLanes2,
              nextProps
            );
          }
          if ((renderLanes2 & 536870912) !== 0)
            workInProgress2.memoizedState = { baseLanes: 0, cachePool: null }, current !== null && pushTransition(
              workInProgress2,
              prevState !== null ? prevState.cachePool : null
            ), prevState !== null ? pushHiddenContext(workInProgress2, prevState) : reuseHiddenContextOnStack(), pushOffscreenSuspenseHandler(workInProgress2);
          else
            return nextProps = workInProgress2.lanes = 536870912, deferHiddenOffscreenComponent(
              current,
              workInProgress2,
              prevState !== null ? prevState.baseLanes | renderLanes2 : renderLanes2,
              renderLanes2,
              nextProps
            );
        } else
          prevState !== null ? (pushTransition(workInProgress2, prevState.cachePool), pushHiddenContext(workInProgress2, prevState), reuseSuspenseHandlerOnStack(workInProgress2), workInProgress2.memoizedState = null) : (current !== null && pushTransition(workInProgress2, null), reuseHiddenContextOnStack(), reuseSuspenseHandlerOnStack(workInProgress2));
        return reconcileChildren(current, workInProgress2, nextChildren, renderLanes2), workInProgress2.child;
      }
      function bailoutOffscreenComponent(current, workInProgress2) {
        return current !== null && current.tag === 22 || workInProgress2.stateNode !== null || (workInProgress2.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null
        }), workInProgress2.sibling;
      }
      function deferHiddenOffscreenComponent(current, workInProgress2, nextBaseLanes, renderLanes2, remainingChildLanes) {
        var JSCompiler_inline_result = peekCacheFromPool();
        return JSCompiler_inline_result = JSCompiler_inline_result === null ? null : { parent: CacheContext._currentValue, pool: JSCompiler_inline_result }, workInProgress2.memoizedState = {
          baseLanes: nextBaseLanes,
          cachePool: JSCompiler_inline_result
        }, current !== null && pushTransition(workInProgress2, null), reuseHiddenContextOnStack(), pushOffscreenSuspenseHandler(workInProgress2), current !== null && propagateParentContextChanges(current, workInProgress2, renderLanes2, !0), workInProgress2.childLanes = remainingChildLanes, null;
      }
      function mountActivityChildren(workInProgress2, nextProps) {
        return nextProps = mountWorkInProgressOffscreenFiber(
          { mode: nextProps.mode, children: nextProps.children },
          workInProgress2.mode
        ), nextProps.ref = workInProgress2.ref, workInProgress2.child = nextProps, nextProps.return = workInProgress2, nextProps;
      }
      function retryActivityComponentWithoutHydrating(current, workInProgress2, renderLanes2) {
        return reconcileChildFibers(workInProgress2, current.child, null, renderLanes2), current = mountActivityChildren(workInProgress2, workInProgress2.pendingProps), current.flags |= 2, popSuspenseHandler(workInProgress2), workInProgress2.memoizedState = null, current;
      }
      function updateActivityComponent(current, workInProgress2, renderLanes2) {
        var nextProps = workInProgress2.pendingProps, didSuspend = (workInProgress2.flags & 128) !== 0;
        if (workInProgress2.flags &= -129, current === null) {
          if (isHydrating) {
            if (nextProps.mode === "hidden")
              return current = mountActivityChildren(workInProgress2, nextProps), workInProgress2.lanes = 536870912, bailoutOffscreenComponent(null, current);
            if (pushDehydratedActivitySuspenseHandler(workInProgress2), (current = nextHydratableInstance) ? (current = canHydrateHydrationBoundary(
              current,
              rootOrSingletonContext
            ), current = current !== null && current.data === "&" ? current : null, current !== null && (workInProgress2.memoizedState = {
              dehydrated: current,
              treeContext: treeContextProvider !== null ? { id: treeContextId, overflow: treeContextOverflow } : null,
              retryLane: 536870912,
              hydrationErrors: null
            }, renderLanes2 = createFiberFromDehydratedFragment(current), renderLanes2.return = workInProgress2, workInProgress2.child = renderLanes2, hydrationParentFiber = workInProgress2, nextHydratableInstance = null)) : current = null, current === null) throw throwOnHydrationMismatch(workInProgress2);
            return workInProgress2.lanes = 536870912, null;
          }
          return mountActivityChildren(workInProgress2, nextProps);
        }
        var prevState = current.memoizedState;
        if (prevState !== null) {
          var dehydrated = prevState.dehydrated;
          if (pushDehydratedActivitySuspenseHandler(workInProgress2), didSuspend)
            if (workInProgress2.flags & 256)
              workInProgress2.flags &= -257, workInProgress2 = retryActivityComponentWithoutHydrating(
                current,
                workInProgress2,
                renderLanes2
              );
            else if (workInProgress2.memoizedState !== null)
              workInProgress2.child = current.child, workInProgress2.flags |= 128, workInProgress2 = null;
            else throw Error(formatProdErrorMessage(558));
          else if (didReceiveUpdate || propagateParentContextChanges(current, workInProgress2, renderLanes2, !1), didSuspend = (renderLanes2 & current.childLanes) !== 0, didReceiveUpdate || didSuspend) {
            if (nextProps = workInProgressRoot, nextProps !== null && (dehydrated = getBumpedLaneForHydration(nextProps, renderLanes2), dehydrated !== 0 && dehydrated !== prevState.retryLane))
              throw prevState.retryLane = dehydrated, enqueueConcurrentRenderForLane(current, dehydrated), scheduleUpdateOnFiber(nextProps, current, dehydrated), SelectiveHydrationException;
            renderDidSuspendDelayIfPossible(), workInProgress2 = retryActivityComponentWithoutHydrating(
              current,
              workInProgress2,
              renderLanes2
            );
          } else
            current = prevState.treeContext, nextHydratableInstance = getNextHydratable(dehydrated.nextSibling), hydrationParentFiber = workInProgress2, isHydrating = !0, hydrationErrors = null, rootOrSingletonContext = !1, current !== null && restoreSuspendedTreeContext(workInProgress2, current), workInProgress2 = mountActivityChildren(workInProgress2, nextProps), workInProgress2.flags |= 4096;
          return workInProgress2;
        }
        return current = createWorkInProgress(current.child, {
          mode: nextProps.mode,
          children: nextProps.children
        }), current.ref = workInProgress2.ref, workInProgress2.child = current, current.return = workInProgress2, current;
      }
      function markRef(current, workInProgress2) {
        var ref = workInProgress2.ref;
        if (ref === null)
          current !== null && current.ref !== null && (workInProgress2.flags |= 4194816);
        else {
          if (typeof ref != "function" && typeof ref != "object")
            throw Error(formatProdErrorMessage(284));
          (current === null || current.ref !== ref) && (workInProgress2.flags |= 4194816);
        }
      }
      function updateFunctionComponent(current, workInProgress2, Component, nextProps, renderLanes2) {
        return prepareToReadContext(workInProgress2), Component = renderWithHooks(
          current,
          workInProgress2,
          Component,
          nextProps,
          void 0,
          renderLanes2
        ), nextProps = checkDidRenderIdHook(), current !== null && !didReceiveUpdate ? (bailoutHooks(current, workInProgress2, renderLanes2), bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2)) : (isHydrating && nextProps && pushMaterializedTreeId(workInProgress2), workInProgress2.flags |= 1, reconcileChildren(current, workInProgress2, Component, renderLanes2), workInProgress2.child);
      }
      function replayFunctionComponent(current, workInProgress2, nextProps, Component, secondArg, renderLanes2) {
        return prepareToReadContext(workInProgress2), workInProgress2.updateQueue = null, nextProps = renderWithHooksAgain(
          workInProgress2,
          Component,
          nextProps,
          secondArg
        ), finishRenderingHooks(current), Component = checkDidRenderIdHook(), current !== null && !didReceiveUpdate ? (bailoutHooks(current, workInProgress2, renderLanes2), bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2)) : (isHydrating && Component && pushMaterializedTreeId(workInProgress2), workInProgress2.flags |= 1, reconcileChildren(current, workInProgress2, nextProps, renderLanes2), workInProgress2.child);
      }
      function updateClassComponent(current, workInProgress2, Component, nextProps, renderLanes2) {
        if (prepareToReadContext(workInProgress2), workInProgress2.stateNode === null) {
          var context = emptyContextObject, contextType = Component.contextType;
          typeof contextType == "object" && contextType !== null && (context = readContext(contextType)), context = new Component(nextProps, context), workInProgress2.memoizedState = context.state !== null && context.state !== void 0 ? context.state : null, context.updater = classComponentUpdater, workInProgress2.stateNode = context, context._reactInternals = workInProgress2, context = workInProgress2.stateNode, context.props = nextProps, context.state = workInProgress2.memoizedState, context.refs = {}, initializeUpdateQueue(workInProgress2), contextType = Component.contextType, context.context = typeof contextType == "object" && contextType !== null ? readContext(contextType) : emptyContextObject, context.state = workInProgress2.memoizedState, contextType = Component.getDerivedStateFromProps, typeof contextType == "function" && (applyDerivedStateFromProps(
            workInProgress2,
            Component,
            contextType,
            nextProps
          ), context.state = workInProgress2.memoizedState), typeof Component.getDerivedStateFromProps == "function" || typeof context.getSnapshotBeforeUpdate == "function" || typeof context.UNSAFE_componentWillMount != "function" && typeof context.componentWillMount != "function" || (contextType = context.state, typeof context.componentWillMount == "function" && context.componentWillMount(), typeof context.UNSAFE_componentWillMount == "function" && context.UNSAFE_componentWillMount(), contextType !== context.state && classComponentUpdater.enqueueReplaceState(context, context.state, null), processUpdateQueue(workInProgress2, nextProps, context, renderLanes2), suspendIfUpdateReadFromEntangledAsyncAction(), context.state = workInProgress2.memoizedState), typeof context.componentDidMount == "function" && (workInProgress2.flags |= 4194308), nextProps = !0;
        } else if (current === null) {
          context = workInProgress2.stateNode;
          var unresolvedOldProps = workInProgress2.memoizedProps, oldProps = resolveClassComponentProps(Component, unresolvedOldProps);
          context.props = oldProps;
          var oldContext = context.context, contextType$jscomp$0 = Component.contextType;
          contextType = emptyContextObject, typeof contextType$jscomp$0 == "object" && contextType$jscomp$0 !== null && (contextType = readContext(contextType$jscomp$0));
          var getDerivedStateFromProps = Component.getDerivedStateFromProps;
          contextType$jscomp$0 = typeof getDerivedStateFromProps == "function" || typeof context.getSnapshotBeforeUpdate == "function", unresolvedOldProps = workInProgress2.pendingProps !== unresolvedOldProps, contextType$jscomp$0 || typeof context.UNSAFE_componentWillReceiveProps != "function" && typeof context.componentWillReceiveProps != "function" || (unresolvedOldProps || oldContext !== contextType) && callComponentWillReceiveProps(
            workInProgress2,
            context,
            nextProps,
            contextType
          ), hasForceUpdate = !1;
          var oldState = workInProgress2.memoizedState;
          context.state = oldState, processUpdateQueue(workInProgress2, nextProps, context, renderLanes2), suspendIfUpdateReadFromEntangledAsyncAction(), oldContext = workInProgress2.memoizedState, unresolvedOldProps || oldState !== oldContext || hasForceUpdate ? (typeof getDerivedStateFromProps == "function" && (applyDerivedStateFromProps(
            workInProgress2,
            Component,
            getDerivedStateFromProps,
            nextProps
          ), oldContext = workInProgress2.memoizedState), (oldProps = hasForceUpdate || checkShouldComponentUpdate(
            workInProgress2,
            Component,
            oldProps,
            nextProps,
            oldState,
            oldContext,
            contextType
          )) ? (contextType$jscomp$0 || typeof context.UNSAFE_componentWillMount != "function" && typeof context.componentWillMount != "function" || (typeof context.componentWillMount == "function" && context.componentWillMount(), typeof context.UNSAFE_componentWillMount == "function" && context.UNSAFE_componentWillMount()), typeof context.componentDidMount == "function" && (workInProgress2.flags |= 4194308)) : (typeof context.componentDidMount == "function" && (workInProgress2.flags |= 4194308), workInProgress2.memoizedProps = nextProps, workInProgress2.memoizedState = oldContext), context.props = nextProps, context.state = oldContext, context.context = contextType, nextProps = oldProps) : (typeof context.componentDidMount == "function" && (workInProgress2.flags |= 4194308), nextProps = !1);
        } else {
          context = workInProgress2.stateNode, cloneUpdateQueue(current, workInProgress2), contextType = workInProgress2.memoizedProps, contextType$jscomp$0 = resolveClassComponentProps(Component, contextType), context.props = contextType$jscomp$0, getDerivedStateFromProps = workInProgress2.pendingProps, oldState = context.context, oldContext = Component.contextType, oldProps = emptyContextObject, typeof oldContext == "object" && oldContext !== null && (oldProps = readContext(oldContext)), unresolvedOldProps = Component.getDerivedStateFromProps, (oldContext = typeof unresolvedOldProps == "function" || typeof context.getSnapshotBeforeUpdate == "function") || typeof context.UNSAFE_componentWillReceiveProps != "function" && typeof context.componentWillReceiveProps != "function" || (contextType !== getDerivedStateFromProps || oldState !== oldProps) && callComponentWillReceiveProps(
            workInProgress2,
            context,
            nextProps,
            oldProps
          ), hasForceUpdate = !1, oldState = workInProgress2.memoizedState, context.state = oldState, processUpdateQueue(workInProgress2, nextProps, context, renderLanes2), suspendIfUpdateReadFromEntangledAsyncAction();
          var newState = workInProgress2.memoizedState;
          contextType !== getDerivedStateFromProps || oldState !== newState || hasForceUpdate || current !== null && current.dependencies !== null && checkIfContextChanged(current.dependencies) ? (typeof unresolvedOldProps == "function" && (applyDerivedStateFromProps(
            workInProgress2,
            Component,
            unresolvedOldProps,
            nextProps
          ), newState = workInProgress2.memoizedState), (contextType$jscomp$0 = hasForceUpdate || checkShouldComponentUpdate(
            workInProgress2,
            Component,
            contextType$jscomp$0,
            nextProps,
            oldState,
            newState,
            oldProps
          ) || current !== null && current.dependencies !== null && checkIfContextChanged(current.dependencies)) ? (oldContext || typeof context.UNSAFE_componentWillUpdate != "function" && typeof context.componentWillUpdate != "function" || (typeof context.componentWillUpdate == "function" && context.componentWillUpdate(nextProps, newState, oldProps), typeof context.UNSAFE_componentWillUpdate == "function" && context.UNSAFE_componentWillUpdate(
            nextProps,
            newState,
            oldProps
          )), typeof context.componentDidUpdate == "function" && (workInProgress2.flags |= 4), typeof context.getSnapshotBeforeUpdate == "function" && (workInProgress2.flags |= 1024)) : (typeof context.componentDidUpdate != "function" || contextType === current.memoizedProps && oldState === current.memoizedState || (workInProgress2.flags |= 4), typeof context.getSnapshotBeforeUpdate != "function" || contextType === current.memoizedProps && oldState === current.memoizedState || (workInProgress2.flags |= 1024), workInProgress2.memoizedProps = nextProps, workInProgress2.memoizedState = newState), context.props = nextProps, context.state = newState, context.context = oldProps, nextProps = contextType$jscomp$0) : (typeof context.componentDidUpdate != "function" || contextType === current.memoizedProps && oldState === current.memoizedState || (workInProgress2.flags |= 4), typeof context.getSnapshotBeforeUpdate != "function" || contextType === current.memoizedProps && oldState === current.memoizedState || (workInProgress2.flags |= 1024), nextProps = !1);
        }
        return context = nextProps, markRef(current, workInProgress2), nextProps = (workInProgress2.flags & 128) !== 0, context || nextProps ? (context = workInProgress2.stateNode, Component = nextProps && typeof Component.getDerivedStateFromError != "function" ? null : context.render(), workInProgress2.flags |= 1, current !== null && nextProps ? (workInProgress2.child = reconcileChildFibers(
          workInProgress2,
          current.child,
          null,
          renderLanes2
        ), workInProgress2.child = reconcileChildFibers(
          workInProgress2,
          null,
          Component,
          renderLanes2
        )) : reconcileChildren(current, workInProgress2, Component, renderLanes2), workInProgress2.memoizedState = context.state, current = workInProgress2.child) : current = bailoutOnAlreadyFinishedWork(
          current,
          workInProgress2,
          renderLanes2
        ), current;
      }
      function mountHostRootWithoutHydrating(current, workInProgress2, nextChildren, renderLanes2) {
        return resetHydrationState(), workInProgress2.flags |= 256, reconcileChildren(current, workInProgress2, nextChildren, renderLanes2), workInProgress2.child;
      }
      var SUSPENDED_MARKER = {
        dehydrated: null,
        treeContext: null,
        retryLane: 0,
        hydrationErrors: null
      };
      function mountSuspenseOffscreenState(renderLanes2) {
        return { baseLanes: renderLanes2, cachePool: getSuspendedCache() };
      }
      function getRemainingWorkInPrimaryTree(current, primaryTreeDidDefer, renderLanes2) {
        return current = current !== null ? current.childLanes & ~renderLanes2 : 0, primaryTreeDidDefer && (current |= workInProgressDeferredLane), current;
      }
      function updateSuspenseComponent(current, workInProgress2, renderLanes2) {
        var nextProps = workInProgress2.pendingProps, showFallback = !1, didSuspend = (workInProgress2.flags & 128) !== 0, JSCompiler_temp;
        if ((JSCompiler_temp = didSuspend) || (JSCompiler_temp = current !== null && current.memoizedState === null ? !1 : (suspenseStackCursor.current & 2) !== 0), JSCompiler_temp && (showFallback = !0, workInProgress2.flags &= -129), JSCompiler_temp = (workInProgress2.flags & 32) !== 0, workInProgress2.flags &= -33, current === null) {
          if (isHydrating) {
            if (showFallback ? pushPrimaryTreeSuspenseHandler(workInProgress2) : reuseSuspenseHandlerOnStack(workInProgress2), (current = nextHydratableInstance) ? (current = canHydrateHydrationBoundary(
              current,
              rootOrSingletonContext
            ), current = current !== null && current.data !== "&" ? current : null, current !== null && (workInProgress2.memoizedState = {
              dehydrated: current,
              treeContext: treeContextProvider !== null ? { id: treeContextId, overflow: treeContextOverflow } : null,
              retryLane: 536870912,
              hydrationErrors: null
            }, renderLanes2 = createFiberFromDehydratedFragment(current), renderLanes2.return = workInProgress2, workInProgress2.child = renderLanes2, hydrationParentFiber = workInProgress2, nextHydratableInstance = null)) : current = null, current === null) throw throwOnHydrationMismatch(workInProgress2);
            return isSuspenseInstanceFallback(current) ? workInProgress2.lanes = 32 : workInProgress2.lanes = 536870912, null;
          }
          var nextPrimaryChildren = nextProps.children;
          return nextProps = nextProps.fallback, showFallback ? (reuseSuspenseHandlerOnStack(workInProgress2), showFallback = workInProgress2.mode, nextPrimaryChildren = mountWorkInProgressOffscreenFiber(
            { mode: "hidden", children: nextPrimaryChildren },
            showFallback
          ), nextProps = createFiberFromFragment(
            nextProps,
            showFallback,
            renderLanes2,
            null
          ), nextPrimaryChildren.return = workInProgress2, nextProps.return = workInProgress2, nextPrimaryChildren.sibling = nextProps, workInProgress2.child = nextPrimaryChildren, nextProps = workInProgress2.child, nextProps.memoizedState = mountSuspenseOffscreenState(renderLanes2), nextProps.childLanes = getRemainingWorkInPrimaryTree(
            current,
            JSCompiler_temp,
            renderLanes2
          ), workInProgress2.memoizedState = SUSPENDED_MARKER, bailoutOffscreenComponent(null, nextProps)) : (pushPrimaryTreeSuspenseHandler(workInProgress2), mountSuspensePrimaryChildren(workInProgress2, nextPrimaryChildren));
        }
        var prevState = current.memoizedState;
        if (prevState !== null && (nextPrimaryChildren = prevState.dehydrated, nextPrimaryChildren !== null)) {
          if (didSuspend)
            workInProgress2.flags & 256 ? (pushPrimaryTreeSuspenseHandler(workInProgress2), workInProgress2.flags &= -257, workInProgress2 = retrySuspenseComponentWithoutHydrating(
              current,
              workInProgress2,
              renderLanes2
            )) : workInProgress2.memoizedState !== null ? (reuseSuspenseHandlerOnStack(workInProgress2), workInProgress2.child = current.child, workInProgress2.flags |= 128, workInProgress2 = null) : (reuseSuspenseHandlerOnStack(workInProgress2), nextPrimaryChildren = nextProps.fallback, showFallback = workInProgress2.mode, nextProps = mountWorkInProgressOffscreenFiber(
              { mode: "visible", children: nextProps.children },
              showFallback
            ), nextPrimaryChildren = createFiberFromFragment(
              nextPrimaryChildren,
              showFallback,
              renderLanes2,
              null
            ), nextPrimaryChildren.flags |= 2, nextProps.return = workInProgress2, nextPrimaryChildren.return = workInProgress2, nextProps.sibling = nextPrimaryChildren, workInProgress2.child = nextProps, reconcileChildFibers(
              workInProgress2,
              current.child,
              null,
              renderLanes2
            ), nextProps = workInProgress2.child, nextProps.memoizedState = mountSuspenseOffscreenState(renderLanes2), nextProps.childLanes = getRemainingWorkInPrimaryTree(
              current,
              JSCompiler_temp,
              renderLanes2
            ), workInProgress2.memoizedState = SUSPENDED_MARKER, workInProgress2 = bailoutOffscreenComponent(null, nextProps));
          else if (pushPrimaryTreeSuspenseHandler(workInProgress2), isSuspenseInstanceFallback(nextPrimaryChildren)) {
            if (JSCompiler_temp = nextPrimaryChildren.nextSibling && nextPrimaryChildren.nextSibling.dataset, JSCompiler_temp) var digest = JSCompiler_temp.dgst;
            JSCompiler_temp = digest, nextProps = Error(formatProdErrorMessage(419)), nextProps.stack = "", nextProps.digest = JSCompiler_temp, queueHydrationError({ value: nextProps, source: null, stack: null }), workInProgress2 = retrySuspenseComponentWithoutHydrating(
              current,
              workInProgress2,
              renderLanes2
            );
          } else if (didReceiveUpdate || propagateParentContextChanges(current, workInProgress2, renderLanes2, !1), JSCompiler_temp = (renderLanes2 & current.childLanes) !== 0, didReceiveUpdate || JSCompiler_temp) {
            if (JSCompiler_temp = workInProgressRoot, JSCompiler_temp !== null && (nextProps = getBumpedLaneForHydration(JSCompiler_temp, renderLanes2), nextProps !== 0 && nextProps !== prevState.retryLane))
              throw prevState.retryLane = nextProps, enqueueConcurrentRenderForLane(current, nextProps), scheduleUpdateOnFiber(JSCompiler_temp, current, nextProps), SelectiveHydrationException;
            isSuspenseInstancePending(nextPrimaryChildren) || renderDidSuspendDelayIfPossible(), workInProgress2 = retrySuspenseComponentWithoutHydrating(
              current,
              workInProgress2,
              renderLanes2
            );
          } else
            isSuspenseInstancePending(nextPrimaryChildren) ? (workInProgress2.flags |= 192, workInProgress2.child = current.child, workInProgress2 = null) : (current = prevState.treeContext, nextHydratableInstance = getNextHydratable(
              nextPrimaryChildren.nextSibling
            ), hydrationParentFiber = workInProgress2, isHydrating = !0, hydrationErrors = null, rootOrSingletonContext = !1, current !== null && restoreSuspendedTreeContext(workInProgress2, current), workInProgress2 = mountSuspensePrimaryChildren(
              workInProgress2,
              nextProps.children
            ), workInProgress2.flags |= 4096);
          return workInProgress2;
        }
        return showFallback ? (reuseSuspenseHandlerOnStack(workInProgress2), nextPrimaryChildren = nextProps.fallback, showFallback = workInProgress2.mode, prevState = current.child, digest = prevState.sibling, nextProps = createWorkInProgress(prevState, {
          mode: "hidden",
          children: nextProps.children
        }), nextProps.subtreeFlags = prevState.subtreeFlags & 65011712, digest !== null ? nextPrimaryChildren = createWorkInProgress(
          digest,
          nextPrimaryChildren
        ) : (nextPrimaryChildren = createFiberFromFragment(
          nextPrimaryChildren,
          showFallback,
          renderLanes2,
          null
        ), nextPrimaryChildren.flags |= 2), nextPrimaryChildren.return = workInProgress2, nextProps.return = workInProgress2, nextProps.sibling = nextPrimaryChildren, workInProgress2.child = nextProps, bailoutOffscreenComponent(null, nextProps), nextProps = workInProgress2.child, nextPrimaryChildren = current.child.memoizedState, nextPrimaryChildren === null ? nextPrimaryChildren = mountSuspenseOffscreenState(renderLanes2) : (showFallback = nextPrimaryChildren.cachePool, showFallback !== null ? (prevState = CacheContext._currentValue, showFallback = showFallback.parent !== prevState ? { parent: prevState, pool: prevState } : showFallback) : showFallback = getSuspendedCache(), nextPrimaryChildren = {
          baseLanes: nextPrimaryChildren.baseLanes | renderLanes2,
          cachePool: showFallback
        }), nextProps.memoizedState = nextPrimaryChildren, nextProps.childLanes = getRemainingWorkInPrimaryTree(
          current,
          JSCompiler_temp,
          renderLanes2
        ), workInProgress2.memoizedState = SUSPENDED_MARKER, bailoutOffscreenComponent(current.child, nextProps)) : (pushPrimaryTreeSuspenseHandler(workInProgress2), renderLanes2 = current.child, current = renderLanes2.sibling, renderLanes2 = createWorkInProgress(renderLanes2, {
          mode: "visible",
          children: nextProps.children
        }), renderLanes2.return = workInProgress2, renderLanes2.sibling = null, current !== null && (JSCompiler_temp = workInProgress2.deletions, JSCompiler_temp === null ? (workInProgress2.deletions = [current], workInProgress2.flags |= 16) : JSCompiler_temp.push(current)), workInProgress2.child = renderLanes2, workInProgress2.memoizedState = null, renderLanes2);
      }
      function mountSuspensePrimaryChildren(workInProgress2, primaryChildren) {
        return primaryChildren = mountWorkInProgressOffscreenFiber(
          { mode: "visible", children: primaryChildren },
          workInProgress2.mode
        ), primaryChildren.return = workInProgress2, workInProgress2.child = primaryChildren;
      }
      function mountWorkInProgressOffscreenFiber(offscreenProps, mode) {
        return offscreenProps = createFiberImplClass(22, offscreenProps, null, mode), offscreenProps.lanes = 0, offscreenProps;
      }
      function retrySuspenseComponentWithoutHydrating(current, workInProgress2, renderLanes2) {
        return reconcileChildFibers(workInProgress2, current.child, null, renderLanes2), current = mountSuspensePrimaryChildren(
          workInProgress2,
          workInProgress2.pendingProps.children
        ), current.flags |= 2, workInProgress2.memoizedState = null, current;
      }
      function scheduleSuspenseWorkOnFiber(fiber, renderLanes2, propagationRoot) {
        fiber.lanes |= renderLanes2;
        var alternate = fiber.alternate;
        alternate !== null && (alternate.lanes |= renderLanes2), scheduleContextWorkOnParentPath(fiber.return, renderLanes2, propagationRoot);
      }
      function initSuspenseListRenderState(workInProgress2, isBackwards, tail, lastContentRow, tailMode, treeForkCount2) {
        var renderState = workInProgress2.memoizedState;
        renderState === null ? workInProgress2.memoizedState = {
          isBackwards,
          rendering: null,
          renderingStartTime: 0,
          last: lastContentRow,
          tail,
          tailMode,
          treeForkCount: treeForkCount2
        } : (renderState.isBackwards = isBackwards, renderState.rendering = null, renderState.renderingStartTime = 0, renderState.last = lastContentRow, renderState.tail = tail, renderState.tailMode = tailMode, renderState.treeForkCount = treeForkCount2);
      }
      function updateSuspenseListComponent(current, workInProgress2, renderLanes2) {
        var nextProps = workInProgress2.pendingProps, revealOrder = nextProps.revealOrder, tailMode = nextProps.tail;
        nextProps = nextProps.children;
        var suspenseContext = suspenseStackCursor.current, shouldForceFallback = (suspenseContext & 2) !== 0;
        if (shouldForceFallback ? (suspenseContext = suspenseContext & 1 | 2, workInProgress2.flags |= 128) : suspenseContext &= 1, push(suspenseStackCursor, suspenseContext), reconcileChildren(current, workInProgress2, nextProps, renderLanes2), nextProps = isHydrating ? treeForkCount : 0, !shouldForceFallback && current !== null && (current.flags & 128) !== 0)
          a: for (current = workInProgress2.child; current !== null; ) {
            if (current.tag === 13)
              current.memoizedState !== null && scheduleSuspenseWorkOnFiber(current, renderLanes2, workInProgress2);
            else if (current.tag === 19)
              scheduleSuspenseWorkOnFiber(current, renderLanes2, workInProgress2);
            else if (current.child !== null) {
              current.child.return = current, current = current.child;
              continue;
            }
            if (current === workInProgress2) break a;
            for (; current.sibling === null; ) {
              if (current.return === null || current.return === workInProgress2)
                break a;
              current = current.return;
            }
            current.sibling.return = current.return, current = current.sibling;
          }
        switch (revealOrder) {
          case "forwards":
            for (renderLanes2 = workInProgress2.child, revealOrder = null; renderLanes2 !== null; )
              current = renderLanes2.alternate, current !== null && findFirstSuspended(current) === null && (revealOrder = renderLanes2), renderLanes2 = renderLanes2.sibling;
            renderLanes2 = revealOrder, renderLanes2 === null ? (revealOrder = workInProgress2.child, workInProgress2.child = null) : (revealOrder = renderLanes2.sibling, renderLanes2.sibling = null), initSuspenseListRenderState(
              workInProgress2,
              !1,
              revealOrder,
              renderLanes2,
              tailMode,
              nextProps
            );
            break;
          case "backwards":
          case "unstable_legacy-backwards":
            for (renderLanes2 = null, revealOrder = workInProgress2.child, workInProgress2.child = null; revealOrder !== null; ) {
              if (current = revealOrder.alternate, current !== null && findFirstSuspended(current) === null) {
                workInProgress2.child = revealOrder;
                break;
              }
              current = revealOrder.sibling, revealOrder.sibling = renderLanes2, renderLanes2 = revealOrder, revealOrder = current;
            }
            initSuspenseListRenderState(
              workInProgress2,
              !0,
              renderLanes2,
              null,
              tailMode,
              nextProps
            );
            break;
          case "together":
            initSuspenseListRenderState(
              workInProgress2,
              !1,
              null,
              null,
              void 0,
              nextProps
            );
            break;
          default:
            workInProgress2.memoizedState = null;
        }
        return workInProgress2.child;
      }
      function bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2) {
        if (current !== null && (workInProgress2.dependencies = current.dependencies), workInProgressRootSkippedLanes |= workInProgress2.lanes, (renderLanes2 & workInProgress2.childLanes) === 0)
          if (current !== null) {
            if (propagateParentContextChanges(
              current,
              workInProgress2,
              renderLanes2,
              !1
            ), (renderLanes2 & workInProgress2.childLanes) === 0)
              return null;
          } else return null;
        if (current !== null && workInProgress2.child !== current.child)
          throw Error(formatProdErrorMessage(153));
        if (workInProgress2.child !== null) {
          for (current = workInProgress2.child, renderLanes2 = createWorkInProgress(current, current.pendingProps), workInProgress2.child = renderLanes2, renderLanes2.return = workInProgress2; current.sibling !== null; )
            current = current.sibling, renderLanes2 = renderLanes2.sibling = createWorkInProgress(current, current.pendingProps), renderLanes2.return = workInProgress2;
          renderLanes2.sibling = null;
        }
        return workInProgress2.child;
      }
      function checkScheduledUpdateOrContext(current, renderLanes2) {
        return (current.lanes & renderLanes2) !== 0 ? !0 : (current = current.dependencies, !!(current !== null && checkIfContextChanged(current)));
      }
      function attemptEarlyBailoutIfNoScheduledUpdate(current, workInProgress2, renderLanes2) {
        switch (workInProgress2.tag) {
          case 3:
            pushHostContainer(workInProgress2, workInProgress2.stateNode.containerInfo), pushProvider(workInProgress2, CacheContext, current.memoizedState.cache), resetHydrationState();
            break;
          case 27:
          case 5:
            pushHostContext(workInProgress2);
            break;
          case 4:
            pushHostContainer(workInProgress2, workInProgress2.stateNode.containerInfo);
            break;
          case 10:
            pushProvider(
              workInProgress2,
              workInProgress2.type,
              workInProgress2.memoizedProps.value
            );
            break;
          case 31:
            if (workInProgress2.memoizedState !== null)
              return workInProgress2.flags |= 128, pushDehydratedActivitySuspenseHandler(workInProgress2), null;
            break;
          case 13:
            var state$102 = workInProgress2.memoizedState;
            if (state$102 !== null)
              return state$102.dehydrated !== null ? (pushPrimaryTreeSuspenseHandler(workInProgress2), workInProgress2.flags |= 128, null) : (renderLanes2 & workInProgress2.child.childLanes) !== 0 ? updateSuspenseComponent(current, workInProgress2, renderLanes2) : (pushPrimaryTreeSuspenseHandler(workInProgress2), current = bailoutOnAlreadyFinishedWork(
                current,
                workInProgress2,
                renderLanes2
              ), current !== null ? current.sibling : null);
            pushPrimaryTreeSuspenseHandler(workInProgress2);
            break;
          case 19:
            var didSuspendBefore = (current.flags & 128) !== 0;
            if (state$102 = (renderLanes2 & workInProgress2.childLanes) !== 0, state$102 || (propagateParentContextChanges(
              current,
              workInProgress2,
              renderLanes2,
              !1
            ), state$102 = (renderLanes2 & workInProgress2.childLanes) !== 0), didSuspendBefore) {
              if (state$102)
                return updateSuspenseListComponent(
                  current,
                  workInProgress2,
                  renderLanes2
                );
              workInProgress2.flags |= 128;
            }
            if (didSuspendBefore = workInProgress2.memoizedState, didSuspendBefore !== null && (didSuspendBefore.rendering = null, didSuspendBefore.tail = null, didSuspendBefore.lastEffect = null), push(suspenseStackCursor, suspenseStackCursor.current), state$102) break;
            return null;
          case 22:
            return workInProgress2.lanes = 0, updateOffscreenComponent(
              current,
              workInProgress2,
              renderLanes2,
              workInProgress2.pendingProps
            );
          case 24:
            pushProvider(workInProgress2, CacheContext, current.memoizedState.cache);
        }
        return bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2);
      }
      function beginWork(current, workInProgress2, renderLanes2) {
        if (current !== null)
          if (current.memoizedProps !== workInProgress2.pendingProps)
            didReceiveUpdate = !0;
          else {
            if (!checkScheduledUpdateOrContext(current, renderLanes2) && (workInProgress2.flags & 128) === 0)
              return didReceiveUpdate = !1, attemptEarlyBailoutIfNoScheduledUpdate(
                current,
                workInProgress2,
                renderLanes2
              );
            didReceiveUpdate = (current.flags & 131072) !== 0;
          }
        else
          didReceiveUpdate = !1, isHydrating && (workInProgress2.flags & 1048576) !== 0 && pushTreeId(workInProgress2, treeForkCount, workInProgress2.index);
        switch (workInProgress2.lanes = 0, workInProgress2.tag) {
          case 16:
            a: {
              var props = workInProgress2.pendingProps;
              if (current = resolveLazy(workInProgress2.elementType), workInProgress2.type = current, typeof current == "function")
                shouldConstruct(current) ? (props = resolveClassComponentProps(current, props), workInProgress2.tag = 1, workInProgress2 = updateClassComponent(
                  null,
                  workInProgress2,
                  current,
                  props,
                  renderLanes2
                )) : (workInProgress2.tag = 0, workInProgress2 = updateFunctionComponent(
                  null,
                  workInProgress2,
                  current,
                  props,
                  renderLanes2
                ));
              else {
                if (current != null) {
                  var $$typeof = current.$$typeof;
                  if ($$typeof === REACT_FORWARD_REF_TYPE) {
                    workInProgress2.tag = 11, workInProgress2 = updateForwardRef(
                      null,
                      workInProgress2,
                      current,
                      props,
                      renderLanes2
                    );
                    break a;
                  } else if ($$typeof === REACT_MEMO_TYPE) {
                    workInProgress2.tag = 14, workInProgress2 = updateMemoComponent(
                      null,
                      workInProgress2,
                      current,
                      props,
                      renderLanes2
                    );
                    break a;
                  }
                }
                throw workInProgress2 = getComponentNameFromType(current) || current, Error(formatProdErrorMessage(306, workInProgress2, ""));
              }
            }
            return workInProgress2;
          case 0:
            return updateFunctionComponent(
              current,
              workInProgress2,
              workInProgress2.type,
              workInProgress2.pendingProps,
              renderLanes2
            );
          case 1:
            return props = workInProgress2.type, $$typeof = resolveClassComponentProps(
              props,
              workInProgress2.pendingProps
            ), updateClassComponent(
              current,
              workInProgress2,
              props,
              $$typeof,
              renderLanes2
            );
          case 3:
            a: {
              if (pushHostContainer(
                workInProgress2,
                workInProgress2.stateNode.containerInfo
              ), current === null) throw Error(formatProdErrorMessage(387));
              props = workInProgress2.pendingProps;
              var prevState = workInProgress2.memoizedState;
              $$typeof = prevState.element, cloneUpdateQueue(current, workInProgress2), processUpdateQueue(workInProgress2, props, null, renderLanes2);
              var nextState = workInProgress2.memoizedState;
              if (props = nextState.cache, pushProvider(workInProgress2, CacheContext, props), props !== prevState.cache && propagateContextChanges(
                workInProgress2,
                [CacheContext],
                renderLanes2,
                !0
              ), suspendIfUpdateReadFromEntangledAsyncAction(), props = nextState.element, prevState.isDehydrated)
                if (prevState = {
                  element: props,
                  isDehydrated: !1,
                  cache: nextState.cache
                }, workInProgress2.updateQueue.baseState = prevState, workInProgress2.memoizedState = prevState, workInProgress2.flags & 256) {
                  workInProgress2 = mountHostRootWithoutHydrating(
                    current,
                    workInProgress2,
                    props,
                    renderLanes2
                  );
                  break a;
                } else if (props !== $$typeof) {
                  $$typeof = createCapturedValueAtFiber(
                    Error(formatProdErrorMessage(424)),
                    workInProgress2
                  ), queueHydrationError($$typeof), workInProgress2 = mountHostRootWithoutHydrating(
                    current,
                    workInProgress2,
                    props,
                    renderLanes2
                  );
                  break a;
                } else
                  for (current = workInProgress2.stateNode.containerInfo, current.nodeType === 9 ? current = current.body : current = current.nodeName === "HTML" ? current.ownerDocument.body : current, nextHydratableInstance = getNextHydratable(current.firstChild), hydrationParentFiber = workInProgress2, isHydrating = !0, hydrationErrors = null, rootOrSingletonContext = !0, renderLanes2 = mountChildFibers(
                    workInProgress2,
                    null,
                    props,
                    renderLanes2
                  ), workInProgress2.child = renderLanes2; renderLanes2; )
                    renderLanes2.flags = renderLanes2.flags & -3 | 4096, renderLanes2 = renderLanes2.sibling;
              else {
                if (resetHydrationState(), props === $$typeof) {
                  workInProgress2 = bailoutOnAlreadyFinishedWork(
                    current,
                    workInProgress2,
                    renderLanes2
                  );
                  break a;
                }
                reconcileChildren(current, workInProgress2, props, renderLanes2);
              }
              workInProgress2 = workInProgress2.child;
            }
            return workInProgress2;
          case 26:
            return markRef(current, workInProgress2), current === null ? (renderLanes2 = getResource(
              workInProgress2.type,
              null,
              workInProgress2.pendingProps,
              null
            )) ? workInProgress2.memoizedState = renderLanes2 : isHydrating || (renderLanes2 = workInProgress2.type, current = workInProgress2.pendingProps, props = getOwnerDocumentFromRootContainer(
              rootInstanceStackCursor.current
            ).createElement(renderLanes2), props[internalInstanceKey] = workInProgress2, props[internalPropsKey] = current, setInitialProperties(props, renderLanes2, current), markNodeAsHoistable(props), workInProgress2.stateNode = props) : workInProgress2.memoizedState = getResource(
              workInProgress2.type,
              current.memoizedProps,
              workInProgress2.pendingProps,
              current.memoizedState
            ), null;
          case 27:
            return pushHostContext(workInProgress2), current === null && isHydrating && (props = workInProgress2.stateNode = resolveSingletonInstance(
              workInProgress2.type,
              workInProgress2.pendingProps,
              rootInstanceStackCursor.current
            ), hydrationParentFiber = workInProgress2, rootOrSingletonContext = !0, $$typeof = nextHydratableInstance, isSingletonScope(workInProgress2.type) ? (previousHydratableOnEnteringScopedSingleton = $$typeof, nextHydratableInstance = getNextHydratable(props.firstChild)) : nextHydratableInstance = $$typeof), reconcileChildren(
              current,
              workInProgress2,
              workInProgress2.pendingProps.children,
              renderLanes2
            ), markRef(current, workInProgress2), current === null && (workInProgress2.flags |= 4194304), workInProgress2.child;
          case 5:
            return current === null && isHydrating && (($$typeof = props = nextHydratableInstance) && (props = canHydrateInstance(
              props,
              workInProgress2.type,
              workInProgress2.pendingProps,
              rootOrSingletonContext
            ), props !== null ? (workInProgress2.stateNode = props, hydrationParentFiber = workInProgress2, nextHydratableInstance = getNextHydratable(props.firstChild), rootOrSingletonContext = !1, $$typeof = !0) : $$typeof = !1), $$typeof || throwOnHydrationMismatch(workInProgress2)), pushHostContext(workInProgress2), $$typeof = workInProgress2.type, prevState = workInProgress2.pendingProps, nextState = current !== null ? current.memoizedProps : null, props = prevState.children, shouldSetTextContent($$typeof, prevState) ? props = null : nextState !== null && shouldSetTextContent($$typeof, nextState) && (workInProgress2.flags |= 32), workInProgress2.memoizedState !== null && ($$typeof = renderWithHooks(
              current,
              workInProgress2,
              TransitionAwareHostComponent,
              null,
              null,
              renderLanes2
            ), HostTransitionContext._currentValue = $$typeof), markRef(current, workInProgress2), reconcileChildren(current, workInProgress2, props, renderLanes2), workInProgress2.child;
          case 6:
            return current === null && isHydrating && ((current = renderLanes2 = nextHydratableInstance) && (renderLanes2 = canHydrateTextInstance(
              renderLanes2,
              workInProgress2.pendingProps,
              rootOrSingletonContext
            ), renderLanes2 !== null ? (workInProgress2.stateNode = renderLanes2, hydrationParentFiber = workInProgress2, nextHydratableInstance = null, current = !0) : current = !1), current || throwOnHydrationMismatch(workInProgress2)), null;
          case 13:
            return updateSuspenseComponent(current, workInProgress2, renderLanes2);
          case 4:
            return pushHostContainer(
              workInProgress2,
              workInProgress2.stateNode.containerInfo
            ), props = workInProgress2.pendingProps, current === null ? workInProgress2.child = reconcileChildFibers(
              workInProgress2,
              null,
              props,
              renderLanes2
            ) : reconcileChildren(current, workInProgress2, props, renderLanes2), workInProgress2.child;
          case 11:
            return updateForwardRef(
              current,
              workInProgress2,
              workInProgress2.type,
              workInProgress2.pendingProps,
              renderLanes2
            );
          case 7:
            return reconcileChildren(
              current,
              workInProgress2,
              workInProgress2.pendingProps,
              renderLanes2
            ), workInProgress2.child;
          case 8:
            return reconcileChildren(
              current,
              workInProgress2,
              workInProgress2.pendingProps.children,
              renderLanes2
            ), workInProgress2.child;
          case 12:
            return reconcileChildren(
              current,
              workInProgress2,
              workInProgress2.pendingProps.children,
              renderLanes2
            ), workInProgress2.child;
          case 10:
            return props = workInProgress2.pendingProps, pushProvider(workInProgress2, workInProgress2.type, props.value), reconcileChildren(current, workInProgress2, props.children, renderLanes2), workInProgress2.child;
          case 9:
            return $$typeof = workInProgress2.type._context, props = workInProgress2.pendingProps.children, prepareToReadContext(workInProgress2), $$typeof = readContext($$typeof), props = props($$typeof), workInProgress2.flags |= 1, reconcileChildren(current, workInProgress2, props, renderLanes2), workInProgress2.child;
          case 14:
            return updateMemoComponent(
              current,
              workInProgress2,
              workInProgress2.type,
              workInProgress2.pendingProps,
              renderLanes2
            );
          case 15:
            return updateSimpleMemoComponent(
              current,
              workInProgress2,
              workInProgress2.type,
              workInProgress2.pendingProps,
              renderLanes2
            );
          case 19:
            return updateSuspenseListComponent(current, workInProgress2, renderLanes2);
          case 31:
            return updateActivityComponent(current, workInProgress2, renderLanes2);
          case 22:
            return updateOffscreenComponent(
              current,
              workInProgress2,
              renderLanes2,
              workInProgress2.pendingProps
            );
          case 24:
            return prepareToReadContext(workInProgress2), props = readContext(CacheContext), current === null ? ($$typeof = peekCacheFromPool(), $$typeof === null && ($$typeof = workInProgressRoot, prevState = createCache(), $$typeof.pooledCache = prevState, prevState.refCount++, prevState !== null && ($$typeof.pooledCacheLanes |= renderLanes2), $$typeof = prevState), workInProgress2.memoizedState = { parent: props, cache: $$typeof }, initializeUpdateQueue(workInProgress2), pushProvider(workInProgress2, CacheContext, $$typeof)) : ((current.lanes & renderLanes2) !== 0 && (cloneUpdateQueue(current, workInProgress2), processUpdateQueue(workInProgress2, null, null, renderLanes2), suspendIfUpdateReadFromEntangledAsyncAction()), $$typeof = current.memoizedState, prevState = workInProgress2.memoizedState, $$typeof.parent !== props ? ($$typeof = { parent: props, cache: props }, workInProgress2.memoizedState = $$typeof, workInProgress2.lanes === 0 && (workInProgress2.memoizedState = workInProgress2.updateQueue.baseState = $$typeof), pushProvider(workInProgress2, CacheContext, props)) : (props = prevState.cache, pushProvider(workInProgress2, CacheContext, props), props !== $$typeof.cache && propagateContextChanges(
              workInProgress2,
              [CacheContext],
              renderLanes2,
              !0
            ))), reconcileChildren(
              current,
              workInProgress2,
              workInProgress2.pendingProps.children,
              renderLanes2
            ), workInProgress2.child;
          case 29:
            throw workInProgress2.pendingProps;
        }
        throw Error(formatProdErrorMessage(156, workInProgress2.tag));
      }
      function markUpdate(workInProgress2) {
        workInProgress2.flags |= 4;
      }
      function preloadInstanceAndSuspendIfNeeded(workInProgress2, type, oldProps, newProps, renderLanes2) {
        if ((type = (workInProgress2.mode & 32) !== 0) && (type = !1), type) {
          if (workInProgress2.flags |= 16777216, (renderLanes2 & 335544128) === renderLanes2)
            if (workInProgress2.stateNode.complete) workInProgress2.flags |= 8192;
            else if (shouldRemainOnPreviousScreen()) workInProgress2.flags |= 8192;
            else
              throw suspendedThenable = noopSuspenseyCommitThenable, SuspenseyCommitException;
        } else workInProgress2.flags &= -16777217;
      }
      function preloadResourceAndSuspendIfNeeded(workInProgress2, resource) {
        if (resource.type !== "stylesheet" || (resource.state.loading & 4) !== 0)
          workInProgress2.flags &= -16777217;
        else if (workInProgress2.flags |= 16777216, !preloadResource(resource))
          if (shouldRemainOnPreviousScreen()) workInProgress2.flags |= 8192;
          else
            throw suspendedThenable = noopSuspenseyCommitThenable, SuspenseyCommitException;
      }
      function scheduleRetryEffect(workInProgress2, retryQueue) {
        retryQueue !== null && (workInProgress2.flags |= 4), workInProgress2.flags & 16384 && (retryQueue = workInProgress2.tag !== 22 ? claimNextRetryLane() : 536870912, workInProgress2.lanes |= retryQueue, workInProgressSuspendedRetryLanes |= retryQueue);
      }
      function cutOffTailIfNeeded(renderState, hasRenderedATailFallback) {
        if (!isHydrating)
          switch (renderState.tailMode) {
            case "hidden":
              hasRenderedATailFallback = renderState.tail;
              for (var lastTailNode = null; hasRenderedATailFallback !== null; )
                hasRenderedATailFallback.alternate !== null && (lastTailNode = hasRenderedATailFallback), hasRenderedATailFallback = hasRenderedATailFallback.sibling;
              lastTailNode === null ? renderState.tail = null : lastTailNode.sibling = null;
              break;
            case "collapsed":
              lastTailNode = renderState.tail;
              for (var lastTailNode$106 = null; lastTailNode !== null; )
                lastTailNode.alternate !== null && (lastTailNode$106 = lastTailNode), lastTailNode = lastTailNode.sibling;
              lastTailNode$106 === null ? hasRenderedATailFallback || renderState.tail === null ? renderState.tail = null : renderState.tail.sibling = null : lastTailNode$106.sibling = null;
          }
      }
      function bubbleProperties(completedWork) {
        var didBailout = completedWork.alternate !== null && completedWork.alternate.child === completedWork.child, newChildLanes = 0, subtreeFlags = 0;
        if (didBailout)
          for (var child$107 = completedWork.child; child$107 !== null; )
            newChildLanes |= child$107.lanes | child$107.childLanes, subtreeFlags |= child$107.subtreeFlags & 65011712, subtreeFlags |= child$107.flags & 65011712, child$107.return = completedWork, child$107 = child$107.sibling;
        else
          for (child$107 = completedWork.child; child$107 !== null; )
            newChildLanes |= child$107.lanes | child$107.childLanes, subtreeFlags |= child$107.subtreeFlags, subtreeFlags |= child$107.flags, child$107.return = completedWork, child$107 = child$107.sibling;
        return completedWork.subtreeFlags |= subtreeFlags, completedWork.childLanes = newChildLanes, didBailout;
      }
      function completeWork(current, workInProgress2, renderLanes2) {
        var newProps = workInProgress2.pendingProps;
        switch (popTreeContext(workInProgress2), workInProgress2.tag) {
          case 16:
          case 15:
          case 0:
          case 11:
          case 7:
          case 8:
          case 12:
          case 9:
          case 14:
            return bubbleProperties(workInProgress2), null;
          case 1:
            return bubbleProperties(workInProgress2), null;
          case 3:
            return renderLanes2 = workInProgress2.stateNode, newProps = null, current !== null && (newProps = current.memoizedState.cache), workInProgress2.memoizedState.cache !== newProps && (workInProgress2.flags |= 2048), popProvider(CacheContext), popHostContainer(), renderLanes2.pendingContext && (renderLanes2.context = renderLanes2.pendingContext, renderLanes2.pendingContext = null), (current === null || current.child === null) && (popHydrationState(workInProgress2) ? markUpdate(workInProgress2) : current === null || current.memoizedState.isDehydrated && (workInProgress2.flags & 256) === 0 || (workInProgress2.flags |= 1024, upgradeHydrationErrorsToRecoverable())), bubbleProperties(workInProgress2), null;
          case 26:
            var type = workInProgress2.type, nextResource = workInProgress2.memoizedState;
            return current === null ? (markUpdate(workInProgress2), nextResource !== null ? (bubbleProperties(workInProgress2), preloadResourceAndSuspendIfNeeded(workInProgress2, nextResource)) : (bubbleProperties(workInProgress2), preloadInstanceAndSuspendIfNeeded(
              workInProgress2,
              type,
              null,
              newProps,
              renderLanes2
            ))) : nextResource ? nextResource !== current.memoizedState ? (markUpdate(workInProgress2), bubbleProperties(workInProgress2), preloadResourceAndSuspendIfNeeded(workInProgress2, nextResource)) : (bubbleProperties(workInProgress2), workInProgress2.flags &= -16777217) : (current = current.memoizedProps, current !== newProps && markUpdate(workInProgress2), bubbleProperties(workInProgress2), preloadInstanceAndSuspendIfNeeded(
              workInProgress2,
              type,
              current,
              newProps,
              renderLanes2
            )), null;
          case 27:
            if (popHostContext(workInProgress2), renderLanes2 = rootInstanceStackCursor.current, type = workInProgress2.type, current !== null && workInProgress2.stateNode != null)
              current.memoizedProps !== newProps && markUpdate(workInProgress2);
            else {
              if (!newProps) {
                if (workInProgress2.stateNode === null)
                  throw Error(formatProdErrorMessage(166));
                return bubbleProperties(workInProgress2), null;
              }
              current = contextStackCursor.current, popHydrationState(workInProgress2) ? prepareToHydrateHostInstance(workInProgress2, current) : (current = resolveSingletonInstance(type, newProps, renderLanes2), workInProgress2.stateNode = current, markUpdate(workInProgress2));
            }
            return bubbleProperties(workInProgress2), null;
          case 5:
            if (popHostContext(workInProgress2), type = workInProgress2.type, current !== null && workInProgress2.stateNode != null)
              current.memoizedProps !== newProps && markUpdate(workInProgress2);
            else {
              if (!newProps) {
                if (workInProgress2.stateNode === null)
                  throw Error(formatProdErrorMessage(166));
                return bubbleProperties(workInProgress2), null;
              }
              if (nextResource = contextStackCursor.current, popHydrationState(workInProgress2))
                prepareToHydrateHostInstance(workInProgress2, nextResource);
              else {
                var ownerDocument = getOwnerDocumentFromRootContainer(
                  rootInstanceStackCursor.current
                );
                switch (nextResource) {
                  case 1:
                    nextResource = ownerDocument.createElementNS(
                      "http://www.w3.org/2000/svg",
                      type
                    );
                    break;
                  case 2:
                    nextResource = ownerDocument.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      type
                    );
                    break;
                  default:
                    switch (type) {
                      case "svg":
                        nextResource = ownerDocument.createElementNS(
                          "http://www.w3.org/2000/svg",
                          type
                        );
                        break;
                      case "math":
                        nextResource = ownerDocument.createElementNS(
                          "http://www.w3.org/1998/Math/MathML",
                          type
                        );
                        break;
                      case "script":
                        nextResource = ownerDocument.createElement("div"), nextResource.innerHTML = "<script><\/script>", nextResource = nextResource.removeChild(
                          nextResource.firstChild
                        );
                        break;
                      case "select":
                        nextResource = typeof newProps.is == "string" ? ownerDocument.createElement("select", {
                          is: newProps.is
                        }) : ownerDocument.createElement("select"), newProps.multiple ? nextResource.multiple = !0 : newProps.size && (nextResource.size = newProps.size);
                        break;
                      default:
                        nextResource = typeof newProps.is == "string" ? ownerDocument.createElement(type, { is: newProps.is }) : ownerDocument.createElement(type);
                    }
                }
                nextResource[internalInstanceKey] = workInProgress2, nextResource[internalPropsKey] = newProps;
                a: for (ownerDocument = workInProgress2.child; ownerDocument !== null; ) {
                  if (ownerDocument.tag === 5 || ownerDocument.tag === 6)
                    nextResource.appendChild(ownerDocument.stateNode);
                  else if (ownerDocument.tag !== 4 && ownerDocument.tag !== 27 && ownerDocument.child !== null) {
                    ownerDocument.child.return = ownerDocument, ownerDocument = ownerDocument.child;
                    continue;
                  }
                  if (ownerDocument === workInProgress2) break a;
                  for (; ownerDocument.sibling === null; ) {
                    if (ownerDocument.return === null || ownerDocument.return === workInProgress2)
                      break a;
                    ownerDocument = ownerDocument.return;
                  }
                  ownerDocument.sibling.return = ownerDocument.return, ownerDocument = ownerDocument.sibling;
                }
                workInProgress2.stateNode = nextResource;
                a: switch (setInitialProperties(nextResource, type, newProps), type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    newProps = !!newProps.autoFocus;
                    break a;
                  case "img":
                    newProps = !0;
                    break a;
                  default:
                    newProps = !1;
                }
                newProps && markUpdate(workInProgress2);
              }
            }
            return bubbleProperties(workInProgress2), preloadInstanceAndSuspendIfNeeded(
              workInProgress2,
              workInProgress2.type,
              current === null ? null : current.memoizedProps,
              workInProgress2.pendingProps,
              renderLanes2
            ), null;
          case 6:
            if (current && workInProgress2.stateNode != null)
              current.memoizedProps !== newProps && markUpdate(workInProgress2);
            else {
              if (typeof newProps != "string" && workInProgress2.stateNode === null)
                throw Error(formatProdErrorMessage(166));
              if (current = rootInstanceStackCursor.current, popHydrationState(workInProgress2)) {
                if (current = workInProgress2.stateNode, renderLanes2 = workInProgress2.memoizedProps, newProps = null, type = hydrationParentFiber, type !== null)
                  switch (type.tag) {
                    case 27:
                    case 5:
                      newProps = type.memoizedProps;
                  }
                current[internalInstanceKey] = workInProgress2, current = !!(current.nodeValue === renderLanes2 || newProps !== null && newProps.suppressHydrationWarning === !0 || checkForUnmatchedText(current.nodeValue, renderLanes2)), current || throwOnHydrationMismatch(workInProgress2, !0);
              } else
                current = getOwnerDocumentFromRootContainer(current).createTextNode(
                  newProps
                ), current[internalInstanceKey] = workInProgress2, workInProgress2.stateNode = current;
            }
            return bubbleProperties(workInProgress2), null;
          case 31:
            if (renderLanes2 = workInProgress2.memoizedState, current === null || current.memoizedState !== null) {
              if (newProps = popHydrationState(workInProgress2), renderLanes2 !== null) {
                if (current === null) {
                  if (!newProps) throw Error(formatProdErrorMessage(318));
                  if (current = workInProgress2.memoizedState, current = current !== null ? current.dehydrated : null, !current) throw Error(formatProdErrorMessage(557));
                  current[internalInstanceKey] = workInProgress2;
                } else
                  resetHydrationState(), (workInProgress2.flags & 128) === 0 && (workInProgress2.memoizedState = null), workInProgress2.flags |= 4;
                bubbleProperties(workInProgress2), current = !1;
              } else
                renderLanes2 = upgradeHydrationErrorsToRecoverable(), current !== null && current.memoizedState !== null && (current.memoizedState.hydrationErrors = renderLanes2), current = !0;
              if (!current)
                return workInProgress2.flags & 256 ? (popSuspenseHandler(workInProgress2), workInProgress2) : (popSuspenseHandler(workInProgress2), null);
              if ((workInProgress2.flags & 128) !== 0)
                throw Error(formatProdErrorMessage(558));
            }
            return bubbleProperties(workInProgress2), null;
          case 13:
            if (newProps = workInProgress2.memoizedState, current === null || current.memoizedState !== null && current.memoizedState.dehydrated !== null) {
              if (type = popHydrationState(workInProgress2), newProps !== null && newProps.dehydrated !== null) {
                if (current === null) {
                  if (!type) throw Error(formatProdErrorMessage(318));
                  if (type = workInProgress2.memoizedState, type = type !== null ? type.dehydrated : null, !type) throw Error(formatProdErrorMessage(317));
                  type[internalInstanceKey] = workInProgress2;
                } else
                  resetHydrationState(), (workInProgress2.flags & 128) === 0 && (workInProgress2.memoizedState = null), workInProgress2.flags |= 4;
                bubbleProperties(workInProgress2), type = !1;
              } else
                type = upgradeHydrationErrorsToRecoverable(), current !== null && current.memoizedState !== null && (current.memoizedState.hydrationErrors = type), type = !0;
              if (!type)
                return workInProgress2.flags & 256 ? (popSuspenseHandler(workInProgress2), workInProgress2) : (popSuspenseHandler(workInProgress2), null);
            }
            return popSuspenseHandler(workInProgress2), (workInProgress2.flags & 128) !== 0 ? (workInProgress2.lanes = renderLanes2, workInProgress2) : (renderLanes2 = newProps !== null, current = current !== null && current.memoizedState !== null, renderLanes2 && (newProps = workInProgress2.child, type = null, newProps.alternate !== null && newProps.alternate.memoizedState !== null && newProps.alternate.memoizedState.cachePool !== null && (type = newProps.alternate.memoizedState.cachePool.pool), nextResource = null, newProps.memoizedState !== null && newProps.memoizedState.cachePool !== null && (nextResource = newProps.memoizedState.cachePool.pool), nextResource !== type && (newProps.flags |= 2048)), renderLanes2 !== current && renderLanes2 && (workInProgress2.child.flags |= 8192), scheduleRetryEffect(workInProgress2, workInProgress2.updateQueue), bubbleProperties(workInProgress2), null);
          case 4:
            return popHostContainer(), current === null && listenToAllSupportedEvents(workInProgress2.stateNode.containerInfo), bubbleProperties(workInProgress2), null;
          case 10:
            return popProvider(workInProgress2.type), bubbleProperties(workInProgress2), null;
          case 19:
            if (pop(suspenseStackCursor), newProps = workInProgress2.memoizedState, newProps === null) return bubbleProperties(workInProgress2), null;
            if (type = (workInProgress2.flags & 128) !== 0, nextResource = newProps.rendering, nextResource === null)
              if (type) cutOffTailIfNeeded(newProps, !1);
              else {
                if (workInProgressRootExitStatus !== 0 || current !== null && (current.flags & 128) !== 0)
                  for (current = workInProgress2.child; current !== null; ) {
                    if (nextResource = findFirstSuspended(current), nextResource !== null) {
                      for (workInProgress2.flags |= 128, cutOffTailIfNeeded(newProps, !1), current = nextResource.updateQueue, workInProgress2.updateQueue = current, scheduleRetryEffect(workInProgress2, current), workInProgress2.subtreeFlags = 0, current = renderLanes2, renderLanes2 = workInProgress2.child; renderLanes2 !== null; )
                        resetWorkInProgress(renderLanes2, current), renderLanes2 = renderLanes2.sibling;
                      return push(
                        suspenseStackCursor,
                        suspenseStackCursor.current & 1 | 2
                      ), isHydrating && pushTreeFork(workInProgress2, newProps.treeForkCount), workInProgress2.child;
                    }
                    current = current.sibling;
                  }
                newProps.tail !== null && now() > workInProgressRootRenderTargetTime && (workInProgress2.flags |= 128, type = !0, cutOffTailIfNeeded(newProps, !1), workInProgress2.lanes = 4194304);
              }
            else {
              if (!type)
                if (current = findFirstSuspended(nextResource), current !== null) {
                  if (workInProgress2.flags |= 128, type = !0, current = current.updateQueue, workInProgress2.updateQueue = current, scheduleRetryEffect(workInProgress2, current), cutOffTailIfNeeded(newProps, !0), newProps.tail === null && newProps.tailMode === "hidden" && !nextResource.alternate && !isHydrating)
                    return bubbleProperties(workInProgress2), null;
                } else
                  2 * now() - newProps.renderingStartTime > workInProgressRootRenderTargetTime && renderLanes2 !== 536870912 && (workInProgress2.flags |= 128, type = !0, cutOffTailIfNeeded(newProps, !1), workInProgress2.lanes = 4194304);
              newProps.isBackwards ? (nextResource.sibling = workInProgress2.child, workInProgress2.child = nextResource) : (current = newProps.last, current !== null ? current.sibling = nextResource : workInProgress2.child = nextResource, newProps.last = nextResource);
            }
            return newProps.tail !== null ? (current = newProps.tail, newProps.rendering = current, newProps.tail = current.sibling, newProps.renderingStartTime = now(), current.sibling = null, renderLanes2 = suspenseStackCursor.current, push(
              suspenseStackCursor,
              type ? renderLanes2 & 1 | 2 : renderLanes2 & 1
            ), isHydrating && pushTreeFork(workInProgress2, newProps.treeForkCount), current) : (bubbleProperties(workInProgress2), null);
          case 22:
          case 23:
            return popSuspenseHandler(workInProgress2), popHiddenContext(), newProps = workInProgress2.memoizedState !== null, current !== null ? current.memoizedState !== null !== newProps && (workInProgress2.flags |= 8192) : newProps && (workInProgress2.flags |= 8192), newProps ? (renderLanes2 & 536870912) !== 0 && (workInProgress2.flags & 128) === 0 && (bubbleProperties(workInProgress2), workInProgress2.subtreeFlags & 6 && (workInProgress2.flags |= 8192)) : bubbleProperties(workInProgress2), renderLanes2 = workInProgress2.updateQueue, renderLanes2 !== null && scheduleRetryEffect(workInProgress2, renderLanes2.retryQueue), renderLanes2 = null, current !== null && current.memoizedState !== null && current.memoizedState.cachePool !== null && (renderLanes2 = current.memoizedState.cachePool.pool), newProps = null, workInProgress2.memoizedState !== null && workInProgress2.memoizedState.cachePool !== null && (newProps = workInProgress2.memoizedState.cachePool.pool), newProps !== renderLanes2 && (workInProgress2.flags |= 2048), current !== null && pop(resumedCache), null;
          case 24:
            return renderLanes2 = null, current !== null && (renderLanes2 = current.memoizedState.cache), workInProgress2.memoizedState.cache !== renderLanes2 && (workInProgress2.flags |= 2048), popProvider(CacheContext), bubbleProperties(workInProgress2), null;
          case 25:
            return null;
          case 30:
            return null;
        }
        throw Error(formatProdErrorMessage(156, workInProgress2.tag));
      }
      function unwindWork(current, workInProgress2) {
        switch (popTreeContext(workInProgress2), workInProgress2.tag) {
          case 1:
            return current = workInProgress2.flags, current & 65536 ? (workInProgress2.flags = current & -65537 | 128, workInProgress2) : null;
          case 3:
            return popProvider(CacheContext), popHostContainer(), current = workInProgress2.flags, (current & 65536) !== 0 && (current & 128) === 0 ? (workInProgress2.flags = current & -65537 | 128, workInProgress2) : null;
          case 26:
          case 27:
          case 5:
            return popHostContext(workInProgress2), null;
          case 31:
            if (workInProgress2.memoizedState !== null) {
              if (popSuspenseHandler(workInProgress2), workInProgress2.alternate === null)
                throw Error(formatProdErrorMessage(340));
              resetHydrationState();
            }
            return current = workInProgress2.flags, current & 65536 ? (workInProgress2.flags = current & -65537 | 128, workInProgress2) : null;
          case 13:
            if (popSuspenseHandler(workInProgress2), current = workInProgress2.memoizedState, current !== null && current.dehydrated !== null) {
              if (workInProgress2.alternate === null)
                throw Error(formatProdErrorMessage(340));
              resetHydrationState();
            }
            return current = workInProgress2.flags, current & 65536 ? (workInProgress2.flags = current & -65537 | 128, workInProgress2) : null;
          case 19:
            return pop(suspenseStackCursor), null;
          case 4:
            return popHostContainer(), null;
          case 10:
            return popProvider(workInProgress2.type), null;
          case 22:
          case 23:
            return popSuspenseHandler(workInProgress2), popHiddenContext(), current !== null && pop(resumedCache), current = workInProgress2.flags, current & 65536 ? (workInProgress2.flags = current & -65537 | 128, workInProgress2) : null;
          case 24:
            return popProvider(CacheContext), null;
          case 25:
            return null;
          default:
            return null;
        }
      }
      function unwindInterruptedWork(current, interruptedWork) {
        switch (popTreeContext(interruptedWork), interruptedWork.tag) {
          case 3:
            popProvider(CacheContext), popHostContainer();
            break;
          case 26:
          case 27:
          case 5:
            popHostContext(interruptedWork);
            break;
          case 4:
            popHostContainer();
            break;
          case 31:
            interruptedWork.memoizedState !== null && popSuspenseHandler(interruptedWork);
            break;
          case 13:
            popSuspenseHandler(interruptedWork);
            break;
          case 19:
            pop(suspenseStackCursor);
            break;
          case 10:
            popProvider(interruptedWork.type);
            break;
          case 22:
          case 23:
            popSuspenseHandler(interruptedWork), popHiddenContext(), current !== null && pop(resumedCache);
            break;
          case 24:
            popProvider(CacheContext);
        }
      }
      function commitHookEffectListMount(flags, finishedWork) {
        try {
          var updateQueue = finishedWork.updateQueue, lastEffect = updateQueue !== null ? updateQueue.lastEffect : null;
          if (lastEffect !== null) {
            var firstEffect = lastEffect.next;
            updateQueue = firstEffect;
            do {
              if ((updateQueue.tag & flags) === flags) {
                lastEffect = void 0;
                var create = updateQueue.create, inst = updateQueue.inst;
                lastEffect = create(), inst.destroy = lastEffect;
              }
              updateQueue = updateQueue.next;
            } while (updateQueue !== firstEffect);
          }
        } catch (error) {
          captureCommitPhaseError(finishedWork, finishedWork.return, error);
        }
      }
      function commitHookEffectListUnmount(flags, finishedWork, nearestMountedAncestor$jscomp$0) {
        try {
          var updateQueue = finishedWork.updateQueue, lastEffect = updateQueue !== null ? updateQueue.lastEffect : null;
          if (lastEffect !== null) {
            var firstEffect = lastEffect.next;
            updateQueue = firstEffect;
            do {
              if ((updateQueue.tag & flags) === flags) {
                var inst = updateQueue.inst, destroy = inst.destroy;
                if (destroy !== void 0) {
                  inst.destroy = void 0, lastEffect = finishedWork;
                  var nearestMountedAncestor = nearestMountedAncestor$jscomp$0, destroy_ = destroy;
                  try {
                    destroy_();
                  } catch (error) {
                    captureCommitPhaseError(
                      lastEffect,
                      nearestMountedAncestor,
                      error
                    );
                  }
                }
              }
              updateQueue = updateQueue.next;
            } while (updateQueue !== firstEffect);
          }
        } catch (error) {
          captureCommitPhaseError(finishedWork, finishedWork.return, error);
        }
      }
      function commitClassCallbacks(finishedWork) {
        var updateQueue = finishedWork.updateQueue;
        if (updateQueue !== null) {
          var instance = finishedWork.stateNode;
          try {
            commitCallbacks(updateQueue, instance);
          } catch (error) {
            captureCommitPhaseError(finishedWork, finishedWork.return, error);
          }
        }
      }
      function safelyCallComponentWillUnmount(current, nearestMountedAncestor, instance) {
        instance.props = resolveClassComponentProps(
          current.type,
          current.memoizedProps
        ), instance.state = current.memoizedState;
        try {
          instance.componentWillUnmount();
        } catch (error) {
          captureCommitPhaseError(current, nearestMountedAncestor, error);
        }
      }
      function safelyAttachRef(current, nearestMountedAncestor) {
        try {
          var ref = current.ref;
          if (ref !== null) {
            switch (current.tag) {
              case 26:
              case 27:
              case 5:
                var instanceToUse = current.stateNode;
                break;
              case 30:
                instanceToUse = current.stateNode;
                break;
              default:
                instanceToUse = current.stateNode;
            }
            typeof ref == "function" ? current.refCleanup = ref(instanceToUse) : ref.current = instanceToUse;
          }
        } catch (error) {
          captureCommitPhaseError(current, nearestMountedAncestor, error);
        }
      }
      function safelyDetachRef(current, nearestMountedAncestor) {
        var ref = current.ref, refCleanup = current.refCleanup;
        if (ref !== null)
          if (typeof refCleanup == "function")
            try {
              refCleanup();
            } catch (error) {
              captureCommitPhaseError(current, nearestMountedAncestor, error);
            } finally {
              current.refCleanup = null, current = current.alternate, current != null && (current.refCleanup = null);
            }
          else if (typeof ref == "function")
            try {
              ref(null);
            } catch (error$140) {
              captureCommitPhaseError(current, nearestMountedAncestor, error$140);
            }
          else ref.current = null;
      }
      function commitHostMount(finishedWork) {
        var type = finishedWork.type, props = finishedWork.memoizedProps, instance = finishedWork.stateNode;
        try {
          a: switch (type) {
            case "button":
            case "input":
            case "select":
            case "textarea":
              props.autoFocus && instance.focus();
              break a;
            case "img":
              props.src ? instance.src = props.src : props.srcSet && (instance.srcset = props.srcSet);
          }
        } catch (error) {
          captureCommitPhaseError(finishedWork, finishedWork.return, error);
        }
      }
      function commitHostUpdate(finishedWork, newProps, oldProps) {
        try {
          var domElement = finishedWork.stateNode;
          updateProperties(domElement, finishedWork.type, oldProps, newProps), domElement[internalPropsKey] = newProps;
        } catch (error) {
          captureCommitPhaseError(finishedWork, finishedWork.return, error);
        }
      }
      function isHostParent(fiber) {
        return fiber.tag === 5 || fiber.tag === 3 || fiber.tag === 26 || fiber.tag === 27 && isSingletonScope(fiber.type) || fiber.tag === 4;
      }
      function getHostSibling(fiber) {
        a: for (; ; ) {
          for (; fiber.sibling === null; ) {
            if (fiber.return === null || isHostParent(fiber.return)) return null;
            fiber = fiber.return;
          }
          for (fiber.sibling.return = fiber.return, fiber = fiber.sibling; fiber.tag !== 5 && fiber.tag !== 6 && fiber.tag !== 18; ) {
            if (fiber.tag === 27 && isSingletonScope(fiber.type) || fiber.flags & 2 || fiber.child === null || fiber.tag === 4) continue a;
            fiber.child.return = fiber, fiber = fiber.child;
          }
          if (!(fiber.flags & 2)) return fiber.stateNode;
        }
      }
      function insertOrAppendPlacementNodeIntoContainer(node, before, parent) {
        var tag = node.tag;
        if (tag === 5 || tag === 6)
          node = node.stateNode, before ? (parent.nodeType === 9 ? parent.body : parent.nodeName === "HTML" ? parent.ownerDocument.body : parent).insertBefore(node, before) : (before = parent.nodeType === 9 ? parent.body : parent.nodeName === "HTML" ? parent.ownerDocument.body : parent, before.appendChild(node), parent = parent._reactRootContainer, parent != null || before.onclick !== null || (before.onclick = noop$1));
        else if (tag !== 4 && (tag === 27 && isSingletonScope(node.type) && (parent = node.stateNode, before = null), node = node.child, node !== null))
          for (insertOrAppendPlacementNodeIntoContainer(node, before, parent), node = node.sibling; node !== null; )
            insertOrAppendPlacementNodeIntoContainer(node, before, parent), node = node.sibling;
      }
      function insertOrAppendPlacementNode(node, before, parent) {
        var tag = node.tag;
        if (tag === 5 || tag === 6)
          node = node.stateNode, before ? parent.insertBefore(node, before) : parent.appendChild(node);
        else if (tag !== 4 && (tag === 27 && isSingletonScope(node.type) && (parent = node.stateNode), node = node.child, node !== null))
          for (insertOrAppendPlacementNode(node, before, parent), node = node.sibling; node !== null; )
            insertOrAppendPlacementNode(node, before, parent), node = node.sibling;
      }
      function commitHostSingletonAcquisition(finishedWork) {
        var singleton = finishedWork.stateNode, props = finishedWork.memoizedProps;
        try {
          for (var type = finishedWork.type, attributes = singleton.attributes; attributes.length; )
            singleton.removeAttributeNode(attributes[0]);
          setInitialProperties(singleton, type, props), singleton[internalInstanceKey] = finishedWork, singleton[internalPropsKey] = props;
        } catch (error) {
          captureCommitPhaseError(finishedWork, finishedWork.return, error);
        }
      }
      var offscreenSubtreeIsHidden = !1, offscreenSubtreeWasHidden = !1, needsFormReset = !1, PossiblyWeakSet = typeof WeakSet == "function" ? WeakSet : Set, nextEffect = null;
      function commitBeforeMutationEffects(root2, firstChild) {
        if (root2 = root2.containerInfo, eventsEnabled = _enabled, root2 = getActiveElementDeep(root2), hasSelectionCapabilities(root2)) {
          if ("selectionStart" in root2)
            var JSCompiler_temp = {
              start: root2.selectionStart,
              end: root2.selectionEnd
            };
          else
            a: {
              JSCompiler_temp = (JSCompiler_temp = root2.ownerDocument) && JSCompiler_temp.defaultView || window;
              var selection = JSCompiler_temp.getSelection && JSCompiler_temp.getSelection();
              if (selection && selection.rangeCount !== 0) {
                JSCompiler_temp = selection.anchorNode;
                var anchorOffset = selection.anchorOffset, focusNode = selection.focusNode;
                selection = selection.focusOffset;
                try {
                  JSCompiler_temp.nodeType, focusNode.nodeType;
                } catch {
                  JSCompiler_temp = null;
                  break a;
                }
                var length = 0, start = -1, end = -1, indexWithinAnchor = 0, indexWithinFocus = 0, node = root2, parentNode = null;
                b: for (; ; ) {
                  for (var next; node !== JSCompiler_temp || anchorOffset !== 0 && node.nodeType !== 3 || (start = length + anchorOffset), node !== focusNode || selection !== 0 && node.nodeType !== 3 || (end = length + selection), node.nodeType === 3 && (length += node.nodeValue.length), (next = node.firstChild) !== null; )
                    parentNode = node, node = next;
                  for (; ; ) {
                    if (node === root2) break b;
                    if (parentNode === JSCompiler_temp && ++indexWithinAnchor === anchorOffset && (start = length), parentNode === focusNode && ++indexWithinFocus === selection && (end = length), (next = node.nextSibling) !== null) break;
                    node = parentNode, parentNode = node.parentNode;
                  }
                  node = next;
                }
                JSCompiler_temp = start === -1 || end === -1 ? null : { start, end };
              } else JSCompiler_temp = null;
            }
          JSCompiler_temp = JSCompiler_temp || { start: 0, end: 0 };
        } else JSCompiler_temp = null;
        for (selectionInformation = { focusedElem: root2, selectionRange: JSCompiler_temp }, _enabled = !1, nextEffect = firstChild; nextEffect !== null; )
          if (firstChild = nextEffect, root2 = firstChild.child, (firstChild.subtreeFlags & 1028) !== 0 && root2 !== null)
            root2.return = firstChild, nextEffect = root2;
          else
            for (; nextEffect !== null; ) {
              switch (firstChild = nextEffect, focusNode = firstChild.alternate, root2 = firstChild.flags, firstChild.tag) {
                case 0:
                  if ((root2 & 4) !== 0 && (root2 = firstChild.updateQueue, root2 = root2 !== null ? root2.events : null, root2 !== null))
                    for (JSCompiler_temp = 0; JSCompiler_temp < root2.length; JSCompiler_temp++)
                      anchorOffset = root2[JSCompiler_temp], anchorOffset.ref.impl = anchorOffset.nextImpl;
                  break;
                case 11:
                case 15:
                  break;
                case 1:
                  if ((root2 & 1024) !== 0 && focusNode !== null) {
                    root2 = void 0, JSCompiler_temp = firstChild, anchorOffset = focusNode.memoizedProps, focusNode = focusNode.memoizedState, selection = JSCompiler_temp.stateNode;
                    try {
                      var resolvedPrevProps = resolveClassComponentProps(
                        JSCompiler_temp.type,
                        anchorOffset
                      );
                      root2 = selection.getSnapshotBeforeUpdate(
                        resolvedPrevProps,
                        focusNode
                      ), selection.__reactInternalSnapshotBeforeUpdate = root2;
                    } catch (error) {
                      captureCommitPhaseError(
                        JSCompiler_temp,
                        JSCompiler_temp.return,
                        error
                      );
                    }
                  }
                  break;
                case 3:
                  if ((root2 & 1024) !== 0) {
                    if (root2 = firstChild.stateNode.containerInfo, JSCompiler_temp = root2.nodeType, JSCompiler_temp === 9)
                      clearContainerSparingly(root2);
                    else if (JSCompiler_temp === 1)
                      switch (root2.nodeName) {
                        case "HEAD":
                        case "HTML":
                        case "BODY":
                          clearContainerSparingly(root2);
                          break;
                        default:
                          root2.textContent = "";
                      }
                  }
                  break;
                case 5:
                case 26:
                case 27:
                case 6:
                case 4:
                case 17:
                  break;
                default:
                  if ((root2 & 1024) !== 0) throw Error(formatProdErrorMessage(163));
              }
              if (root2 = firstChild.sibling, root2 !== null) {
                root2.return = firstChild.return, nextEffect = root2;
                break;
              }
              nextEffect = firstChild.return;
            }
      }
      function commitLayoutEffectOnFiber(finishedRoot, current, finishedWork) {
        var flags = finishedWork.flags;
        switch (finishedWork.tag) {
          case 0:
          case 11:
          case 15:
            recursivelyTraverseLayoutEffects(finishedRoot, finishedWork), flags & 4 && commitHookEffectListMount(5, finishedWork);
            break;
          case 1:
            if (recursivelyTraverseLayoutEffects(finishedRoot, finishedWork), flags & 4)
              if (finishedRoot = finishedWork.stateNode, current === null)
                try {
                  finishedRoot.componentDidMount();
                } catch (error) {
                  captureCommitPhaseError(finishedWork, finishedWork.return, error);
                }
              else {
                var prevProps = resolveClassComponentProps(
                  finishedWork.type,
                  current.memoizedProps
                );
                current = current.memoizedState;
                try {
                  finishedRoot.componentDidUpdate(
                    prevProps,
                    current,
                    finishedRoot.__reactInternalSnapshotBeforeUpdate
                  );
                } catch (error$139) {
                  captureCommitPhaseError(
                    finishedWork,
                    finishedWork.return,
                    error$139
                  );
                }
              }
            flags & 64 && commitClassCallbacks(finishedWork), flags & 512 && safelyAttachRef(finishedWork, finishedWork.return);
            break;
          case 3:
            if (recursivelyTraverseLayoutEffects(finishedRoot, finishedWork), flags & 64 && (finishedRoot = finishedWork.updateQueue, finishedRoot !== null)) {
              if (current = null, finishedWork.child !== null)
                switch (finishedWork.child.tag) {
                  case 27:
                  case 5:
                    current = finishedWork.child.stateNode;
                    break;
                  case 1:
                    current = finishedWork.child.stateNode;
                }
              try {
                commitCallbacks(finishedRoot, current);
              } catch (error) {
                captureCommitPhaseError(finishedWork, finishedWork.return, error);
              }
            }
            break;
          case 27:
            current === null && flags & 4 && commitHostSingletonAcquisition(finishedWork);
          case 26:
          case 5:
            recursivelyTraverseLayoutEffects(finishedRoot, finishedWork), current === null && flags & 4 && commitHostMount(finishedWork), flags & 512 && safelyAttachRef(finishedWork, finishedWork.return);
            break;
          case 12:
            recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
            break;
          case 31:
            recursivelyTraverseLayoutEffects(finishedRoot, finishedWork), flags & 4 && commitActivityHydrationCallbacks(finishedRoot, finishedWork);
            break;
          case 13:
            recursivelyTraverseLayoutEffects(finishedRoot, finishedWork), flags & 4 && commitSuspenseHydrationCallbacks(finishedRoot, finishedWork), flags & 64 && (finishedRoot = finishedWork.memoizedState, finishedRoot !== null && (finishedRoot = finishedRoot.dehydrated, finishedRoot !== null && (finishedWork = retryDehydratedSuspenseBoundary.bind(
              null,
              finishedWork
            ), registerSuspenseInstanceRetry(finishedRoot, finishedWork))));
            break;
          case 22:
            if (flags = finishedWork.memoizedState !== null || offscreenSubtreeIsHidden, !flags) {
              current = current !== null && current.memoizedState !== null || offscreenSubtreeWasHidden, prevProps = offscreenSubtreeIsHidden;
              var prevOffscreenSubtreeWasHidden = offscreenSubtreeWasHidden;
              offscreenSubtreeIsHidden = flags, (offscreenSubtreeWasHidden = current) && !prevOffscreenSubtreeWasHidden ? recursivelyTraverseReappearLayoutEffects(
                finishedRoot,
                finishedWork,
                (finishedWork.subtreeFlags & 8772) !== 0
              ) : recursivelyTraverseLayoutEffects(finishedRoot, finishedWork), offscreenSubtreeIsHidden = prevProps, offscreenSubtreeWasHidden = prevOffscreenSubtreeWasHidden;
            }
            break;
          case 30:
            break;
          default:
            recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
        }
      }
      function detachFiberAfterEffects(fiber) {
        var alternate = fiber.alternate;
        alternate !== null && (fiber.alternate = null, detachFiberAfterEffects(alternate)), fiber.child = null, fiber.deletions = null, fiber.sibling = null, fiber.tag === 5 && (alternate = fiber.stateNode, alternate !== null && detachDeletedInstance(alternate)), fiber.stateNode = null, fiber.return = null, fiber.dependencies = null, fiber.memoizedProps = null, fiber.memoizedState = null, fiber.pendingProps = null, fiber.stateNode = null, fiber.updateQueue = null;
      }
      var hostParent = null, hostParentIsContainer = !1;
      function recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, parent) {
        for (parent = parent.child; parent !== null; )
          commitDeletionEffectsOnFiber(finishedRoot, nearestMountedAncestor, parent), parent = parent.sibling;
      }
      function commitDeletionEffectsOnFiber(finishedRoot, nearestMountedAncestor, deletedFiber) {
        if (injectedHook && typeof injectedHook.onCommitFiberUnmount == "function")
          try {
            injectedHook.onCommitFiberUnmount(rendererID, deletedFiber);
          } catch {
          }
        switch (deletedFiber.tag) {
          case 26:
            offscreenSubtreeWasHidden || safelyDetachRef(deletedFiber, nearestMountedAncestor), recursivelyTraverseDeletionEffects(
              finishedRoot,
              nearestMountedAncestor,
              deletedFiber
            ), deletedFiber.memoizedState ? deletedFiber.memoizedState.count-- : deletedFiber.stateNode && (deletedFiber = deletedFiber.stateNode, deletedFiber.parentNode.removeChild(deletedFiber));
            break;
          case 27:
            offscreenSubtreeWasHidden || safelyDetachRef(deletedFiber, nearestMountedAncestor);
            var prevHostParent = hostParent, prevHostParentIsContainer = hostParentIsContainer;
            isSingletonScope(deletedFiber.type) && (hostParent = deletedFiber.stateNode, hostParentIsContainer = !1), recursivelyTraverseDeletionEffects(
              finishedRoot,
              nearestMountedAncestor,
              deletedFiber
            ), releaseSingletonInstance(deletedFiber.stateNode), hostParent = prevHostParent, hostParentIsContainer = prevHostParentIsContainer;
            break;
          case 5:
            offscreenSubtreeWasHidden || safelyDetachRef(deletedFiber, nearestMountedAncestor);
          case 6:
            if (prevHostParent = hostParent, prevHostParentIsContainer = hostParentIsContainer, hostParent = null, recursivelyTraverseDeletionEffects(
              finishedRoot,
              nearestMountedAncestor,
              deletedFiber
            ), hostParent = prevHostParent, hostParentIsContainer = prevHostParentIsContainer, hostParent !== null)
              if (hostParentIsContainer)
                try {
                  (hostParent.nodeType === 9 ? hostParent.body : hostParent.nodeName === "HTML" ? hostParent.ownerDocument.body : hostParent).removeChild(deletedFiber.stateNode);
                } catch (error) {
                  captureCommitPhaseError(
                    deletedFiber,
                    nearestMountedAncestor,
                    error
                  );
                }
              else
                try {
                  hostParent.removeChild(deletedFiber.stateNode);
                } catch (error) {
                  captureCommitPhaseError(
                    deletedFiber,
                    nearestMountedAncestor,
                    error
                  );
                }
            break;
          case 18:
            hostParent !== null && (hostParentIsContainer ? (finishedRoot = hostParent, clearHydrationBoundary(
              finishedRoot.nodeType === 9 ? finishedRoot.body : finishedRoot.nodeName === "HTML" ? finishedRoot.ownerDocument.body : finishedRoot,
              deletedFiber.stateNode
            ), retryIfBlockedOn(finishedRoot)) : clearHydrationBoundary(hostParent, deletedFiber.stateNode));
            break;
          case 4:
            prevHostParent = hostParent, prevHostParentIsContainer = hostParentIsContainer, hostParent = deletedFiber.stateNode.containerInfo, hostParentIsContainer = !0, recursivelyTraverseDeletionEffects(
              finishedRoot,
              nearestMountedAncestor,
              deletedFiber
            ), hostParent = prevHostParent, hostParentIsContainer = prevHostParentIsContainer;
            break;
          case 0:
          case 11:
          case 14:
          case 15:
            commitHookEffectListUnmount(2, deletedFiber, nearestMountedAncestor), offscreenSubtreeWasHidden || commitHookEffectListUnmount(4, deletedFiber, nearestMountedAncestor), recursivelyTraverseDeletionEffects(
              finishedRoot,
              nearestMountedAncestor,
              deletedFiber
            );
            break;
          case 1:
            offscreenSubtreeWasHidden || (safelyDetachRef(deletedFiber, nearestMountedAncestor), prevHostParent = deletedFiber.stateNode, typeof prevHostParent.componentWillUnmount == "function" && safelyCallComponentWillUnmount(
              deletedFiber,
              nearestMountedAncestor,
              prevHostParent
            )), recursivelyTraverseDeletionEffects(
              finishedRoot,
              nearestMountedAncestor,
              deletedFiber
            );
            break;
          case 21:
            recursivelyTraverseDeletionEffects(
              finishedRoot,
              nearestMountedAncestor,
              deletedFiber
            );
            break;
          case 22:
            offscreenSubtreeWasHidden = (prevHostParent = offscreenSubtreeWasHidden) || deletedFiber.memoizedState !== null, recursivelyTraverseDeletionEffects(
              finishedRoot,
              nearestMountedAncestor,
              deletedFiber
            ), offscreenSubtreeWasHidden = prevHostParent;
            break;
          default:
            recursivelyTraverseDeletionEffects(
              finishedRoot,
              nearestMountedAncestor,
              deletedFiber
            );
        }
      }
      function commitActivityHydrationCallbacks(finishedRoot, finishedWork) {
        if (finishedWork.memoizedState === null && (finishedRoot = finishedWork.alternate, finishedRoot !== null && (finishedRoot = finishedRoot.memoizedState, finishedRoot !== null))) {
          finishedRoot = finishedRoot.dehydrated;
          try {
            retryIfBlockedOn(finishedRoot);
          } catch (error) {
            captureCommitPhaseError(finishedWork, finishedWork.return, error);
          }
        }
      }
      function commitSuspenseHydrationCallbacks(finishedRoot, finishedWork) {
        if (finishedWork.memoizedState === null && (finishedRoot = finishedWork.alternate, finishedRoot !== null && (finishedRoot = finishedRoot.memoizedState, finishedRoot !== null && (finishedRoot = finishedRoot.dehydrated, finishedRoot !== null))))
          try {
            retryIfBlockedOn(finishedRoot);
          } catch (error) {
            captureCommitPhaseError(finishedWork, finishedWork.return, error);
          }
      }
      function getRetryCache(finishedWork) {
        switch (finishedWork.tag) {
          case 31:
          case 13:
          case 19:
            var retryCache = finishedWork.stateNode;
            return retryCache === null && (retryCache = finishedWork.stateNode = new PossiblyWeakSet()), retryCache;
          case 22:
            return finishedWork = finishedWork.stateNode, retryCache = finishedWork._retryCache, retryCache === null && (retryCache = finishedWork._retryCache = new PossiblyWeakSet()), retryCache;
          default:
            throw Error(formatProdErrorMessage(435, finishedWork.tag));
        }
      }
      function attachSuspenseRetryListeners(finishedWork, wakeables) {
        var retryCache = getRetryCache(finishedWork);
        wakeables.forEach(function(wakeable) {
          if (!retryCache.has(wakeable)) {
            retryCache.add(wakeable);
            var retry = resolveRetryWakeable.bind(null, finishedWork, wakeable);
            wakeable.then(retry, retry);
          }
        });
      }
      function recursivelyTraverseMutationEffects(root$jscomp$0, parentFiber) {
        var deletions = parentFiber.deletions;
        if (deletions !== null)
          for (var i = 0; i < deletions.length; i++) {
            var childToDelete = deletions[i], root2 = root$jscomp$0, returnFiber = parentFiber, parent = returnFiber;
            a: for (; parent !== null; ) {
              switch (parent.tag) {
                case 27:
                  if (isSingletonScope(parent.type)) {
                    hostParent = parent.stateNode, hostParentIsContainer = !1;
                    break a;
                  }
                  break;
                case 5:
                  hostParent = parent.stateNode, hostParentIsContainer = !1;
                  break a;
                case 3:
                case 4:
                  hostParent = parent.stateNode.containerInfo, hostParentIsContainer = !0;
                  break a;
              }
              parent = parent.return;
            }
            if (hostParent === null) throw Error(formatProdErrorMessage(160));
            commitDeletionEffectsOnFiber(root2, returnFiber, childToDelete), hostParent = null, hostParentIsContainer = !1, root2 = childToDelete.alternate, root2 !== null && (root2.return = null), childToDelete.return = null;
          }
        if (parentFiber.subtreeFlags & 13886)
          for (parentFiber = parentFiber.child; parentFiber !== null; )
            commitMutationEffectsOnFiber(parentFiber, root$jscomp$0), parentFiber = parentFiber.sibling;
      }
      var currentHoistableRoot = null;
      function commitMutationEffectsOnFiber(finishedWork, root2) {
        var current = finishedWork.alternate, flags = finishedWork.flags;
        switch (finishedWork.tag) {
          case 0:
          case 11:
          case 14:
          case 15:
            recursivelyTraverseMutationEffects(root2, finishedWork), commitReconciliationEffects(finishedWork), flags & 4 && (commitHookEffectListUnmount(3, finishedWork, finishedWork.return), commitHookEffectListMount(3, finishedWork), commitHookEffectListUnmount(5, finishedWork, finishedWork.return));
            break;
          case 1:
            recursivelyTraverseMutationEffects(root2, finishedWork), commitReconciliationEffects(finishedWork), flags & 512 && (offscreenSubtreeWasHidden || current === null || safelyDetachRef(current, current.return)), flags & 64 && offscreenSubtreeIsHidden && (finishedWork = finishedWork.updateQueue, finishedWork !== null && (flags = finishedWork.callbacks, flags !== null && (current = finishedWork.shared.hiddenCallbacks, finishedWork.shared.hiddenCallbacks = current === null ? flags : current.concat(flags))));
            break;
          case 26:
            var hoistableRoot = currentHoistableRoot;
            if (recursivelyTraverseMutationEffects(root2, finishedWork), commitReconciliationEffects(finishedWork), flags & 512 && (offscreenSubtreeWasHidden || current === null || safelyDetachRef(current, current.return)), flags & 4) {
              var currentResource = current !== null ? current.memoizedState : null;
              if (flags = finishedWork.memoizedState, current === null)
                if (flags === null)
                  if (finishedWork.stateNode === null) {
                    a: {
                      flags = finishedWork.type, current = finishedWork.memoizedProps, hoistableRoot = hoistableRoot.ownerDocument || hoistableRoot;
                      b: switch (flags) {
                        case "title":
                          currentResource = hoistableRoot.getElementsByTagName("title")[0], (!currentResource || currentResource[internalHoistableMarker] || currentResource[internalInstanceKey] || currentResource.namespaceURI === "http://www.w3.org/2000/svg" || currentResource.hasAttribute("itemprop")) && (currentResource = hoistableRoot.createElement(flags), hoistableRoot.head.insertBefore(
                            currentResource,
                            hoistableRoot.querySelector("head > title")
                          )), setInitialProperties(currentResource, flags, current), currentResource[internalInstanceKey] = finishedWork, markNodeAsHoistable(currentResource), flags = currentResource;
                          break a;
                        case "link":
                          var maybeNodes = getHydratableHoistableCache(
                            "link",
                            "href",
                            hoistableRoot
                          ).get(flags + (current.href || ""));
                          if (maybeNodes) {
                            for (var i = 0; i < maybeNodes.length; i++)
                              if (currentResource = maybeNodes[i], currentResource.getAttribute("href") === (current.href == null || current.href === "" ? null : current.href) && currentResource.getAttribute("rel") === (current.rel == null ? null : current.rel) && currentResource.getAttribute("title") === (current.title == null ? null : current.title) && currentResource.getAttribute("crossorigin") === (current.crossOrigin == null ? null : current.crossOrigin)) {
                                maybeNodes.splice(i, 1);
                                break b;
                              }
                          }
                          currentResource = hoistableRoot.createElement(flags), setInitialProperties(currentResource, flags, current), hoistableRoot.head.appendChild(currentResource);
                          break;
                        case "meta":
                          if (maybeNodes = getHydratableHoistableCache(
                            "meta",
                            "content",
                            hoistableRoot
                          ).get(flags + (current.content || ""))) {
                            for (i = 0; i < maybeNodes.length; i++)
                              if (currentResource = maybeNodes[i], currentResource.getAttribute("content") === (current.content == null ? null : "" + current.content) && currentResource.getAttribute("name") === (current.name == null ? null : current.name) && currentResource.getAttribute("property") === (current.property == null ? null : current.property) && currentResource.getAttribute("http-equiv") === (current.httpEquiv == null ? null : current.httpEquiv) && currentResource.getAttribute("charset") === (current.charSet == null ? null : current.charSet)) {
                                maybeNodes.splice(i, 1);
                                break b;
                              }
                          }
                          currentResource = hoistableRoot.createElement(flags), setInitialProperties(currentResource, flags, current), hoistableRoot.head.appendChild(currentResource);
                          break;
                        default:
                          throw Error(formatProdErrorMessage(468, flags));
                      }
                      currentResource[internalInstanceKey] = finishedWork, markNodeAsHoistable(currentResource), flags = currentResource;
                    }
                    finishedWork.stateNode = flags;
                  } else
                    mountHoistable(
                      hoistableRoot,
                      finishedWork.type,
                      finishedWork.stateNode
                    );
                else
                  finishedWork.stateNode = acquireResource(
                    hoistableRoot,
                    flags,
                    finishedWork.memoizedProps
                  );
              else
                currentResource !== flags ? (currentResource === null ? current.stateNode !== null && (current = current.stateNode, current.parentNode.removeChild(current)) : currentResource.count--, flags === null ? mountHoistable(
                  hoistableRoot,
                  finishedWork.type,
                  finishedWork.stateNode
                ) : acquireResource(
                  hoistableRoot,
                  flags,
                  finishedWork.memoizedProps
                )) : flags === null && finishedWork.stateNode !== null && commitHostUpdate(
                  finishedWork,
                  finishedWork.memoizedProps,
                  current.memoizedProps
                );
            }
            break;
          case 27:
            recursivelyTraverseMutationEffects(root2, finishedWork), commitReconciliationEffects(finishedWork), flags & 512 && (offscreenSubtreeWasHidden || current === null || safelyDetachRef(current, current.return)), current !== null && flags & 4 && commitHostUpdate(
              finishedWork,
              finishedWork.memoizedProps,
              current.memoizedProps
            );
            break;
          case 5:
            if (recursivelyTraverseMutationEffects(root2, finishedWork), commitReconciliationEffects(finishedWork), flags & 512 && (offscreenSubtreeWasHidden || current === null || safelyDetachRef(current, current.return)), finishedWork.flags & 32) {
              hoistableRoot = finishedWork.stateNode;
              try {
                setTextContent(hoistableRoot, "");
              } catch (error) {
                captureCommitPhaseError(finishedWork, finishedWork.return, error);
              }
            }
            flags & 4 && finishedWork.stateNode != null && (hoistableRoot = finishedWork.memoizedProps, commitHostUpdate(
              finishedWork,
              hoistableRoot,
              current !== null ? current.memoizedProps : hoistableRoot
            )), flags & 1024 && (needsFormReset = !0);
            break;
          case 6:
            if (recursivelyTraverseMutationEffects(root2, finishedWork), commitReconciliationEffects(finishedWork), flags & 4) {
              if (finishedWork.stateNode === null)
                throw Error(formatProdErrorMessage(162));
              flags = finishedWork.memoizedProps, current = finishedWork.stateNode;
              try {
                current.nodeValue = flags;
              } catch (error) {
                captureCommitPhaseError(finishedWork, finishedWork.return, error);
              }
            }
            break;
          case 3:
            if (tagCaches = null, hoistableRoot = currentHoistableRoot, currentHoistableRoot = getHoistableRoot(root2.containerInfo), recursivelyTraverseMutationEffects(root2, finishedWork), currentHoistableRoot = hoistableRoot, commitReconciliationEffects(finishedWork), flags & 4 && current !== null && current.memoizedState.isDehydrated)
              try {
                retryIfBlockedOn(root2.containerInfo);
              } catch (error) {
                captureCommitPhaseError(finishedWork, finishedWork.return, error);
              }
            needsFormReset && (needsFormReset = !1, recursivelyResetForms(finishedWork));
            break;
          case 4:
            flags = currentHoistableRoot, currentHoistableRoot = getHoistableRoot(
              finishedWork.stateNode.containerInfo
            ), recursivelyTraverseMutationEffects(root2, finishedWork), commitReconciliationEffects(finishedWork), currentHoistableRoot = flags;
            break;
          case 12:
            recursivelyTraverseMutationEffects(root2, finishedWork), commitReconciliationEffects(finishedWork);
            break;
          case 31:
            recursivelyTraverseMutationEffects(root2, finishedWork), commitReconciliationEffects(finishedWork), flags & 4 && (flags = finishedWork.updateQueue, flags !== null && (finishedWork.updateQueue = null, attachSuspenseRetryListeners(finishedWork, flags)));
            break;
          case 13:
            recursivelyTraverseMutationEffects(root2, finishedWork), commitReconciliationEffects(finishedWork), finishedWork.child.flags & 8192 && finishedWork.memoizedState !== null != (current !== null && current.memoizedState !== null) && (globalMostRecentFallbackTime = now()), flags & 4 && (flags = finishedWork.updateQueue, flags !== null && (finishedWork.updateQueue = null, attachSuspenseRetryListeners(finishedWork, flags)));
            break;
          case 22:
            hoistableRoot = finishedWork.memoizedState !== null;
            var wasHidden = current !== null && current.memoizedState !== null, prevOffscreenSubtreeIsHidden = offscreenSubtreeIsHidden, prevOffscreenSubtreeWasHidden = offscreenSubtreeWasHidden;
            if (offscreenSubtreeIsHidden = prevOffscreenSubtreeIsHidden || hoistableRoot, offscreenSubtreeWasHidden = prevOffscreenSubtreeWasHidden || wasHidden, recursivelyTraverseMutationEffects(root2, finishedWork), offscreenSubtreeWasHidden = prevOffscreenSubtreeWasHidden, offscreenSubtreeIsHidden = prevOffscreenSubtreeIsHidden, commitReconciliationEffects(finishedWork), flags & 8192)
              a: for (root2 = finishedWork.stateNode, root2._visibility = hoistableRoot ? root2._visibility & -2 : root2._visibility | 1, hoistableRoot && (current === null || wasHidden || offscreenSubtreeIsHidden || offscreenSubtreeWasHidden || recursivelyTraverseDisappearLayoutEffects(finishedWork)), current = null, root2 = finishedWork; ; ) {
                if (root2.tag === 5 || root2.tag === 26) {
                  if (current === null) {
                    wasHidden = current = root2;
                    try {
                      if (currentResource = wasHidden.stateNode, hoistableRoot)
                        maybeNodes = currentResource.style, typeof maybeNodes.setProperty == "function" ? maybeNodes.setProperty("display", "none", "important") : maybeNodes.display = "none";
                      else {
                        i = wasHidden.stateNode;
                        var styleProp = wasHidden.memoizedProps.style, display = styleProp != null && styleProp.hasOwnProperty("display") ? styleProp.display : null;
                        i.style.display = display == null || typeof display == "boolean" ? "" : ("" + display).trim();
                      }
                    } catch (error) {
                      captureCommitPhaseError(wasHidden, wasHidden.return, error);
                    }
                  }
                } else if (root2.tag === 6) {
                  if (current === null) {
                    wasHidden = root2;
                    try {
                      wasHidden.stateNode.nodeValue = hoistableRoot ? "" : wasHidden.memoizedProps;
                    } catch (error) {
                      captureCommitPhaseError(wasHidden, wasHidden.return, error);
                    }
                  }
                } else if (root2.tag === 18) {
                  if (current === null) {
                    wasHidden = root2;
                    try {
                      var instance = wasHidden.stateNode;
                      hoistableRoot ? hideOrUnhideDehydratedBoundary(instance, !0) : hideOrUnhideDehydratedBoundary(wasHidden.stateNode, !1);
                    } catch (error) {
                      captureCommitPhaseError(wasHidden, wasHidden.return, error);
                    }
                  }
                } else if ((root2.tag !== 22 && root2.tag !== 23 || root2.memoizedState === null || root2 === finishedWork) && root2.child !== null) {
                  root2.child.return = root2, root2 = root2.child;
                  continue;
                }
                if (root2 === finishedWork) break a;
                for (; root2.sibling === null; ) {
                  if (root2.return === null || root2.return === finishedWork) break a;
                  current === root2 && (current = null), root2 = root2.return;
                }
                current === root2 && (current = null), root2.sibling.return = root2.return, root2 = root2.sibling;
              }
            flags & 4 && (flags = finishedWork.updateQueue, flags !== null && (current = flags.retryQueue, current !== null && (flags.retryQueue = null, attachSuspenseRetryListeners(finishedWork, current))));
            break;
          case 19:
            recursivelyTraverseMutationEffects(root2, finishedWork), commitReconciliationEffects(finishedWork), flags & 4 && (flags = finishedWork.updateQueue, flags !== null && (finishedWork.updateQueue = null, attachSuspenseRetryListeners(finishedWork, flags)));
            break;
          case 30:
            break;
          case 21:
            break;
          default:
            recursivelyTraverseMutationEffects(root2, finishedWork), commitReconciliationEffects(finishedWork);
        }
      }
      function commitReconciliationEffects(finishedWork) {
        var flags = finishedWork.flags;
        if (flags & 2) {
          try {
            for (var hostParentFiber, parentFiber = finishedWork.return; parentFiber !== null; ) {
              if (isHostParent(parentFiber)) {
                hostParentFiber = parentFiber;
                break;
              }
              parentFiber = parentFiber.return;
            }
            if (hostParentFiber == null) throw Error(formatProdErrorMessage(160));
            switch (hostParentFiber.tag) {
              case 27:
                var parent = hostParentFiber.stateNode, before = getHostSibling(finishedWork);
                insertOrAppendPlacementNode(finishedWork, before, parent);
                break;
              case 5:
                var parent$141 = hostParentFiber.stateNode;
                hostParentFiber.flags & 32 && (setTextContent(parent$141, ""), hostParentFiber.flags &= -33);
                var before$142 = getHostSibling(finishedWork);
                insertOrAppendPlacementNode(finishedWork, before$142, parent$141);
                break;
              case 3:
              case 4:
                var parent$143 = hostParentFiber.stateNode.containerInfo, before$144 = getHostSibling(finishedWork);
                insertOrAppendPlacementNodeIntoContainer(
                  finishedWork,
                  before$144,
                  parent$143
                );
                break;
              default:
                throw Error(formatProdErrorMessage(161));
            }
          } catch (error) {
            captureCommitPhaseError(finishedWork, finishedWork.return, error);
          }
          finishedWork.flags &= -3;
        }
        flags & 4096 && (finishedWork.flags &= -4097);
      }
      function recursivelyResetForms(parentFiber) {
        if (parentFiber.subtreeFlags & 1024)
          for (parentFiber = parentFiber.child; parentFiber !== null; ) {
            var fiber = parentFiber;
            recursivelyResetForms(fiber), fiber.tag === 5 && fiber.flags & 1024 && fiber.stateNode.reset(), parentFiber = parentFiber.sibling;
          }
      }
      function recursivelyTraverseLayoutEffects(root2, parentFiber) {
        if (parentFiber.subtreeFlags & 8772)
          for (parentFiber = parentFiber.child; parentFiber !== null; )
            commitLayoutEffectOnFiber(root2, parentFiber.alternate, parentFiber), parentFiber = parentFiber.sibling;
      }
      function recursivelyTraverseDisappearLayoutEffects(parentFiber) {
        for (parentFiber = parentFiber.child; parentFiber !== null; ) {
          var finishedWork = parentFiber;
          switch (finishedWork.tag) {
            case 0:
            case 11:
            case 14:
            case 15:
              commitHookEffectListUnmount(4, finishedWork, finishedWork.return), recursivelyTraverseDisappearLayoutEffects(finishedWork);
              break;
            case 1:
              safelyDetachRef(finishedWork, finishedWork.return);
              var instance = finishedWork.stateNode;
              typeof instance.componentWillUnmount == "function" && safelyCallComponentWillUnmount(
                finishedWork,
                finishedWork.return,
                instance
              ), recursivelyTraverseDisappearLayoutEffects(finishedWork);
              break;
            case 27:
              releaseSingletonInstance(finishedWork.stateNode);
            case 26:
            case 5:
              safelyDetachRef(finishedWork, finishedWork.return), recursivelyTraverseDisappearLayoutEffects(finishedWork);
              break;
            case 22:
              finishedWork.memoizedState === null && recursivelyTraverseDisappearLayoutEffects(finishedWork);
              break;
            case 30:
              recursivelyTraverseDisappearLayoutEffects(finishedWork);
              break;
            default:
              recursivelyTraverseDisappearLayoutEffects(finishedWork);
          }
          parentFiber = parentFiber.sibling;
        }
      }
      function recursivelyTraverseReappearLayoutEffects(finishedRoot$jscomp$0, parentFiber, includeWorkInProgressEffects) {
        for (includeWorkInProgressEffects = includeWorkInProgressEffects && (parentFiber.subtreeFlags & 8772) !== 0, parentFiber = parentFiber.child; parentFiber !== null; ) {
          var current = parentFiber.alternate, finishedRoot = finishedRoot$jscomp$0, finishedWork = parentFiber, flags = finishedWork.flags;
          switch (finishedWork.tag) {
            case 0:
            case 11:
            case 15:
              recursivelyTraverseReappearLayoutEffects(
                finishedRoot,
                finishedWork,
                includeWorkInProgressEffects
              ), commitHookEffectListMount(4, finishedWork);
              break;
            case 1:
              if (recursivelyTraverseReappearLayoutEffects(
                finishedRoot,
                finishedWork,
                includeWorkInProgressEffects
              ), current = finishedWork, finishedRoot = current.stateNode, typeof finishedRoot.componentDidMount == "function")
                try {
                  finishedRoot.componentDidMount();
                } catch (error) {
                  captureCommitPhaseError(current, current.return, error);
                }
              if (current = finishedWork, finishedRoot = current.updateQueue, finishedRoot !== null) {
                var instance = current.stateNode;
                try {
                  var hiddenCallbacks = finishedRoot.shared.hiddenCallbacks;
                  if (hiddenCallbacks !== null)
                    for (finishedRoot.shared.hiddenCallbacks = null, finishedRoot = 0; finishedRoot < hiddenCallbacks.length; finishedRoot++)
                      callCallback(hiddenCallbacks[finishedRoot], instance);
                } catch (error) {
                  captureCommitPhaseError(current, current.return, error);
                }
              }
              includeWorkInProgressEffects && flags & 64 && commitClassCallbacks(finishedWork), safelyAttachRef(finishedWork, finishedWork.return);
              break;
            case 27:
              commitHostSingletonAcquisition(finishedWork);
            case 26:
            case 5:
              recursivelyTraverseReappearLayoutEffects(
                finishedRoot,
                finishedWork,
                includeWorkInProgressEffects
              ), includeWorkInProgressEffects && current === null && flags & 4 && commitHostMount(finishedWork), safelyAttachRef(finishedWork, finishedWork.return);
              break;
            case 12:
              recursivelyTraverseReappearLayoutEffects(
                finishedRoot,
                finishedWork,
                includeWorkInProgressEffects
              );
              break;
            case 31:
              recursivelyTraverseReappearLayoutEffects(
                finishedRoot,
                finishedWork,
                includeWorkInProgressEffects
              ), includeWorkInProgressEffects && flags & 4 && commitActivityHydrationCallbacks(finishedRoot, finishedWork);
              break;
            case 13:
              recursivelyTraverseReappearLayoutEffects(
                finishedRoot,
                finishedWork,
                includeWorkInProgressEffects
              ), includeWorkInProgressEffects && flags & 4 && commitSuspenseHydrationCallbacks(finishedRoot, finishedWork);
              break;
            case 22:
              finishedWork.memoizedState === null && recursivelyTraverseReappearLayoutEffects(
                finishedRoot,
                finishedWork,
                includeWorkInProgressEffects
              ), safelyAttachRef(finishedWork, finishedWork.return);
              break;
            case 30:
              break;
            default:
              recursivelyTraverseReappearLayoutEffects(
                finishedRoot,
                finishedWork,
                includeWorkInProgressEffects
              );
          }
          parentFiber = parentFiber.sibling;
        }
      }
      function commitOffscreenPassiveMountEffects(current, finishedWork) {
        var previousCache = null;
        current !== null && current.memoizedState !== null && current.memoizedState.cachePool !== null && (previousCache = current.memoizedState.cachePool.pool), current = null, finishedWork.memoizedState !== null && finishedWork.memoizedState.cachePool !== null && (current = finishedWork.memoizedState.cachePool.pool), current !== previousCache && (current != null && current.refCount++, previousCache != null && releaseCache(previousCache));
      }
      function commitCachePassiveMountEffect(current, finishedWork) {
        current = null, finishedWork.alternate !== null && (current = finishedWork.alternate.memoizedState.cache), finishedWork = finishedWork.memoizedState.cache, finishedWork !== current && (finishedWork.refCount++, current != null && releaseCache(current));
      }
      function recursivelyTraversePassiveMountEffects(root2, parentFiber, committedLanes, committedTransitions) {
        if (parentFiber.subtreeFlags & 10256)
          for (parentFiber = parentFiber.child; parentFiber !== null; )
            commitPassiveMountOnFiber(
              root2,
              parentFiber,
              committedLanes,
              committedTransitions
            ), parentFiber = parentFiber.sibling;
      }
      function commitPassiveMountOnFiber(finishedRoot, finishedWork, committedLanes, committedTransitions) {
        var flags = finishedWork.flags;
        switch (finishedWork.tag) {
          case 0:
          case 11:
          case 15:
            recursivelyTraversePassiveMountEffects(
              finishedRoot,
              finishedWork,
              committedLanes,
              committedTransitions
            ), flags & 2048 && commitHookEffectListMount(9, finishedWork);
            break;
          case 1:
            recursivelyTraversePassiveMountEffects(
              finishedRoot,
              finishedWork,
              committedLanes,
              committedTransitions
            );
            break;
          case 3:
            recursivelyTraversePassiveMountEffects(
              finishedRoot,
              finishedWork,
              committedLanes,
              committedTransitions
            ), flags & 2048 && (finishedRoot = null, finishedWork.alternate !== null && (finishedRoot = finishedWork.alternate.memoizedState.cache), finishedWork = finishedWork.memoizedState.cache, finishedWork !== finishedRoot && (finishedWork.refCount++, finishedRoot != null && releaseCache(finishedRoot)));
            break;
          case 12:
            if (flags & 2048) {
              recursivelyTraversePassiveMountEffects(
                finishedRoot,
                finishedWork,
                committedLanes,
                committedTransitions
              ), finishedRoot = finishedWork.stateNode;
              try {
                var _finishedWork$memoize2 = finishedWork.memoizedProps, id = _finishedWork$memoize2.id, onPostCommit = _finishedWork$memoize2.onPostCommit;
                typeof onPostCommit == "function" && onPostCommit(
                  id,
                  finishedWork.alternate === null ? "mount" : "update",
                  finishedRoot.passiveEffectDuration,
                  -0
                );
              } catch (error) {
                captureCommitPhaseError(finishedWork, finishedWork.return, error);
              }
            } else
              recursivelyTraversePassiveMountEffects(
                finishedRoot,
                finishedWork,
                committedLanes,
                committedTransitions
              );
            break;
          case 31:
            recursivelyTraversePassiveMountEffects(
              finishedRoot,
              finishedWork,
              committedLanes,
              committedTransitions
            );
            break;
          case 13:
            recursivelyTraversePassiveMountEffects(
              finishedRoot,
              finishedWork,
              committedLanes,
              committedTransitions
            );
            break;
          case 23:
            break;
          case 22:
            _finishedWork$memoize2 = finishedWork.stateNode, id = finishedWork.alternate, finishedWork.memoizedState !== null ? _finishedWork$memoize2._visibility & 2 ? recursivelyTraversePassiveMountEffects(
              finishedRoot,
              finishedWork,
              committedLanes,
              committedTransitions
            ) : recursivelyTraverseAtomicPassiveEffects(finishedRoot, finishedWork) : _finishedWork$memoize2._visibility & 2 ? recursivelyTraversePassiveMountEffects(
              finishedRoot,
              finishedWork,
              committedLanes,
              committedTransitions
            ) : (_finishedWork$memoize2._visibility |= 2, recursivelyTraverseReconnectPassiveEffects(
              finishedRoot,
              finishedWork,
              committedLanes,
              committedTransitions,
              (finishedWork.subtreeFlags & 10256) !== 0 || !1
            )), flags & 2048 && commitOffscreenPassiveMountEffects(id, finishedWork);
            break;
          case 24:
            recursivelyTraversePassiveMountEffects(
              finishedRoot,
              finishedWork,
              committedLanes,
              committedTransitions
            ), flags & 2048 && commitCachePassiveMountEffect(finishedWork.alternate, finishedWork);
            break;
          default:
            recursivelyTraversePassiveMountEffects(
              finishedRoot,
              finishedWork,
              committedLanes,
              committedTransitions
            );
        }
      }
      function recursivelyTraverseReconnectPassiveEffects(finishedRoot$jscomp$0, parentFiber, committedLanes$jscomp$0, committedTransitions$jscomp$0, includeWorkInProgressEffects) {
        for (includeWorkInProgressEffects = includeWorkInProgressEffects && ((parentFiber.subtreeFlags & 10256) !== 0 || !1), parentFiber = parentFiber.child; parentFiber !== null; ) {
          var finishedRoot = finishedRoot$jscomp$0, finishedWork = parentFiber, committedLanes = committedLanes$jscomp$0, committedTransitions = committedTransitions$jscomp$0, flags = finishedWork.flags;
          switch (finishedWork.tag) {
            case 0:
            case 11:
            case 15:
              recursivelyTraverseReconnectPassiveEffects(
                finishedRoot,
                finishedWork,
                committedLanes,
                committedTransitions,
                includeWorkInProgressEffects
              ), commitHookEffectListMount(8, finishedWork);
              break;
            case 23:
              break;
            case 22:
              var instance = finishedWork.stateNode;
              finishedWork.memoizedState !== null ? instance._visibility & 2 ? recursivelyTraverseReconnectPassiveEffects(
                finishedRoot,
                finishedWork,
                committedLanes,
                committedTransitions,
                includeWorkInProgressEffects
              ) : recursivelyTraverseAtomicPassiveEffects(
                finishedRoot,
                finishedWork
              ) : (instance._visibility |= 2, recursivelyTraverseReconnectPassiveEffects(
                finishedRoot,
                finishedWork,
                committedLanes,
                committedTransitions,
                includeWorkInProgressEffects
              )), includeWorkInProgressEffects && flags & 2048 && commitOffscreenPassiveMountEffects(
                finishedWork.alternate,
                finishedWork
              );
              break;
            case 24:
              recursivelyTraverseReconnectPassiveEffects(
                finishedRoot,
                finishedWork,
                committedLanes,
                committedTransitions,
                includeWorkInProgressEffects
              ), includeWorkInProgressEffects && flags & 2048 && commitCachePassiveMountEffect(finishedWork.alternate, finishedWork);
              break;
            default:
              recursivelyTraverseReconnectPassiveEffects(
                finishedRoot,
                finishedWork,
                committedLanes,
                committedTransitions,
                includeWorkInProgressEffects
              );
          }
          parentFiber = parentFiber.sibling;
        }
      }
      function recursivelyTraverseAtomicPassiveEffects(finishedRoot$jscomp$0, parentFiber) {
        if (parentFiber.subtreeFlags & 10256)
          for (parentFiber = parentFiber.child; parentFiber !== null; ) {
            var finishedRoot = finishedRoot$jscomp$0, finishedWork = parentFiber, flags = finishedWork.flags;
            switch (finishedWork.tag) {
              case 22:
                recursivelyTraverseAtomicPassiveEffects(finishedRoot, finishedWork), flags & 2048 && commitOffscreenPassiveMountEffects(
                  finishedWork.alternate,
                  finishedWork
                );
                break;
              case 24:
                recursivelyTraverseAtomicPassiveEffects(finishedRoot, finishedWork), flags & 2048 && commitCachePassiveMountEffect(finishedWork.alternate, finishedWork);
                break;
              default:
                recursivelyTraverseAtomicPassiveEffects(finishedRoot, finishedWork);
            }
            parentFiber = parentFiber.sibling;
          }
      }
      var suspenseyCommitFlag = 8192;
      function recursivelyAccumulateSuspenseyCommit(parentFiber, committedLanes, suspendedState) {
        if (parentFiber.subtreeFlags & suspenseyCommitFlag)
          for (parentFiber = parentFiber.child; parentFiber !== null; )
            accumulateSuspenseyCommitOnFiber(
              parentFiber,
              committedLanes,
              suspendedState
            ), parentFiber = parentFiber.sibling;
      }
      function accumulateSuspenseyCommitOnFiber(fiber, committedLanes, suspendedState) {
        switch (fiber.tag) {
          case 26:
            recursivelyAccumulateSuspenseyCommit(
              fiber,
              committedLanes,
              suspendedState
            ), fiber.flags & suspenseyCommitFlag && fiber.memoizedState !== null && suspendResource(
              suspendedState,
              currentHoistableRoot,
              fiber.memoizedState,
              fiber.memoizedProps
            );
            break;
          case 5:
            recursivelyAccumulateSuspenseyCommit(
              fiber,
              committedLanes,
              suspendedState
            );
            break;
          case 3:
          case 4:
            var previousHoistableRoot = currentHoistableRoot;
            currentHoistableRoot = getHoistableRoot(fiber.stateNode.containerInfo), recursivelyAccumulateSuspenseyCommit(
              fiber,
              committedLanes,
              suspendedState
            ), currentHoistableRoot = previousHoistableRoot;
            break;
          case 22:
            fiber.memoizedState === null && (previousHoistableRoot = fiber.alternate, previousHoistableRoot !== null && previousHoistableRoot.memoizedState !== null ? (previousHoistableRoot = suspenseyCommitFlag, suspenseyCommitFlag = 16777216, recursivelyAccumulateSuspenseyCommit(
              fiber,
              committedLanes,
              suspendedState
            ), suspenseyCommitFlag = previousHoistableRoot) : recursivelyAccumulateSuspenseyCommit(
              fiber,
              committedLanes,
              suspendedState
            ));
            break;
          default:
            recursivelyAccumulateSuspenseyCommit(
              fiber,
              committedLanes,
              suspendedState
            );
        }
      }
      function detachAlternateSiblings(parentFiber) {
        var previousFiber = parentFiber.alternate;
        if (previousFiber !== null && (parentFiber = previousFiber.child, parentFiber !== null)) {
          previousFiber.child = null;
          do
            previousFiber = parentFiber.sibling, parentFiber.sibling = null, parentFiber = previousFiber;
          while (parentFiber !== null);
        }
      }
      function recursivelyTraversePassiveUnmountEffects(parentFiber) {
        var deletions = parentFiber.deletions;
        if ((parentFiber.flags & 16) !== 0) {
          if (deletions !== null)
            for (var i = 0; i < deletions.length; i++) {
              var childToDelete = deletions[i];
              nextEffect = childToDelete, commitPassiveUnmountEffectsInsideOfDeletedTree_begin(
                childToDelete,
                parentFiber
              );
            }
          detachAlternateSiblings(parentFiber);
        }
        if (parentFiber.subtreeFlags & 10256)
          for (parentFiber = parentFiber.child; parentFiber !== null; )
            commitPassiveUnmountOnFiber(parentFiber), parentFiber = parentFiber.sibling;
      }
      function commitPassiveUnmountOnFiber(finishedWork) {
        switch (finishedWork.tag) {
          case 0:
          case 11:
          case 15:
            recursivelyTraversePassiveUnmountEffects(finishedWork), finishedWork.flags & 2048 && commitHookEffectListUnmount(9, finishedWork, finishedWork.return);
            break;
          case 3:
            recursivelyTraversePassiveUnmountEffects(finishedWork);
            break;
          case 12:
            recursivelyTraversePassiveUnmountEffects(finishedWork);
            break;
          case 22:
            var instance = finishedWork.stateNode;
            finishedWork.memoizedState !== null && instance._visibility & 2 && (finishedWork.return === null || finishedWork.return.tag !== 13) ? (instance._visibility &= -3, recursivelyTraverseDisconnectPassiveEffects(finishedWork)) : recursivelyTraversePassiveUnmountEffects(finishedWork);
            break;
          default:
            recursivelyTraversePassiveUnmountEffects(finishedWork);
        }
      }
      function recursivelyTraverseDisconnectPassiveEffects(parentFiber) {
        var deletions = parentFiber.deletions;
        if ((parentFiber.flags & 16) !== 0) {
          if (deletions !== null)
            for (var i = 0; i < deletions.length; i++) {
              var childToDelete = deletions[i];
              nextEffect = childToDelete, commitPassiveUnmountEffectsInsideOfDeletedTree_begin(
                childToDelete,
                parentFiber
              );
            }
          detachAlternateSiblings(parentFiber);
        }
        for (parentFiber = parentFiber.child; parentFiber !== null; ) {
          switch (deletions = parentFiber, deletions.tag) {
            case 0:
            case 11:
            case 15:
              commitHookEffectListUnmount(8, deletions, deletions.return), recursivelyTraverseDisconnectPassiveEffects(deletions);
              break;
            case 22:
              i = deletions.stateNode, i._visibility & 2 && (i._visibility &= -3, recursivelyTraverseDisconnectPassiveEffects(deletions));
              break;
            default:
              recursivelyTraverseDisconnectPassiveEffects(deletions);
          }
          parentFiber = parentFiber.sibling;
        }
      }
      function commitPassiveUnmountEffectsInsideOfDeletedTree_begin(deletedSubtreeRoot, nearestMountedAncestor) {
        for (; nextEffect !== null; ) {
          var fiber = nextEffect;
          switch (fiber.tag) {
            case 0:
            case 11:
            case 15:
              commitHookEffectListUnmount(8, fiber, nearestMountedAncestor);
              break;
            case 23:
            case 22:
              if (fiber.memoizedState !== null && fiber.memoizedState.cachePool !== null) {
                var cache = fiber.memoizedState.cachePool.pool;
                cache != null && cache.refCount++;
              }
              break;
            case 24:
              releaseCache(fiber.memoizedState.cache);
          }
          if (cache = fiber.child, cache !== null) cache.return = fiber, nextEffect = cache;
          else
            a: for (fiber = deletedSubtreeRoot; nextEffect !== null; ) {
              cache = nextEffect;
              var sibling = cache.sibling, returnFiber = cache.return;
              if (detachFiberAfterEffects(cache), cache === fiber) {
                nextEffect = null;
                break a;
              }
              if (sibling !== null) {
                sibling.return = returnFiber, nextEffect = sibling;
                break a;
              }
              nextEffect = returnFiber;
            }
        }
      }
      var DefaultAsyncDispatcher = {
        getCacheForType: function(resourceType) {
          var cache = readContext(CacheContext), cacheForType = cache.data.get(resourceType);
          return cacheForType === void 0 && (cacheForType = resourceType(), cache.data.set(resourceType, cacheForType)), cacheForType;
        },
        cacheSignal: function() {
          return readContext(CacheContext).controller.signal;
        }
      }, PossiblyWeakMap = typeof WeakMap == "function" ? WeakMap : Map, executionContext = 0, workInProgressRoot = null, workInProgress = null, workInProgressRootRenderLanes = 0, workInProgressSuspendedReason = 0, workInProgressThrownValue = null, workInProgressRootDidSkipSuspendedSiblings = !1, workInProgressRootIsPrerendering = !1, workInProgressRootDidAttachPingListener = !1, entangledRenderLanes = 0, workInProgressRootExitStatus = 0, workInProgressRootSkippedLanes = 0, workInProgressRootInterleavedUpdatedLanes = 0, workInProgressRootPingedLanes = 0, workInProgressDeferredLane = 0, workInProgressSuspendedRetryLanes = 0, workInProgressRootConcurrentErrors = null, workInProgressRootRecoverableErrors = null, workInProgressRootDidIncludeRecursiveRenderUpdate = !1, globalMostRecentFallbackTime = 0, globalMostRecentTransitionTime = 0, workInProgressRootRenderTargetTime = 1 / 0, workInProgressTransitions = null, legacyErrorBoundariesThatAlreadyFailed = null, pendingEffectsStatus = 0, pendingEffectsRoot = null, pendingFinishedWork = null, pendingEffectsLanes = 0, pendingEffectsRemainingLanes = 0, pendingPassiveTransitions = null, pendingRecoverableErrors = null, nestedUpdateCount = 0, rootWithNestedUpdates = null;
      function requestUpdateLane() {
        return (executionContext & 2) !== 0 && workInProgressRootRenderLanes !== 0 ? workInProgressRootRenderLanes & -workInProgressRootRenderLanes : ReactSharedInternals.T !== null ? requestTransitionLane() : resolveUpdatePriority();
      }
      function requestDeferredLane() {
        if (workInProgressDeferredLane === 0)
          if ((workInProgressRootRenderLanes & 536870912) === 0 || isHydrating) {
            var lane = nextTransitionDeferredLane;
            nextTransitionDeferredLane <<= 1, (nextTransitionDeferredLane & 3932160) === 0 && (nextTransitionDeferredLane = 262144), workInProgressDeferredLane = lane;
          } else workInProgressDeferredLane = 536870912;
        return lane = suspenseHandlerStackCursor.current, lane !== null && (lane.flags |= 32), workInProgressDeferredLane;
      }
      function scheduleUpdateOnFiber(root2, fiber, lane) {
        (root2 === workInProgressRoot && (workInProgressSuspendedReason === 2 || workInProgressSuspendedReason === 9) || root2.cancelPendingCommit !== null) && (prepareFreshStack(root2, 0), markRootSuspended(
          root2,
          workInProgressRootRenderLanes,
          workInProgressDeferredLane,
          !1
        )), markRootUpdated$1(root2, lane), ((executionContext & 2) === 0 || root2 !== workInProgressRoot) && (root2 === workInProgressRoot && ((executionContext & 2) === 0 && (workInProgressRootInterleavedUpdatedLanes |= lane), workInProgressRootExitStatus === 4 && markRootSuspended(
          root2,
          workInProgressRootRenderLanes,
          workInProgressDeferredLane,
          !1
        )), ensureRootIsScheduled(root2));
      }
      function performWorkOnRoot(root$jscomp$0, lanes, forceSync) {
        if ((executionContext & 6) !== 0) throw Error(formatProdErrorMessage(327));
        var shouldTimeSlice = !forceSync && (lanes & 127) === 0 && (lanes & root$jscomp$0.expiredLanes) === 0 || checkIfRootIsPrerendering(root$jscomp$0, lanes), exitStatus = shouldTimeSlice ? renderRootConcurrent(root$jscomp$0, lanes) : renderRootSync(root$jscomp$0, lanes, !0), renderWasConcurrent = shouldTimeSlice;
        do {
          if (exitStatus === 0) {
            workInProgressRootIsPrerendering && !shouldTimeSlice && markRootSuspended(root$jscomp$0, lanes, 0, !1);
            break;
          } else {
            if (forceSync = root$jscomp$0.current.alternate, renderWasConcurrent && !isRenderConsistentWithExternalStores(forceSync)) {
              exitStatus = renderRootSync(root$jscomp$0, lanes, !1), renderWasConcurrent = !1;
              continue;
            }
            if (exitStatus === 2) {
              if (renderWasConcurrent = lanes, root$jscomp$0.errorRecoveryDisabledLanes & renderWasConcurrent)
                var JSCompiler_inline_result = 0;
              else
                JSCompiler_inline_result = root$jscomp$0.pendingLanes & -536870913, JSCompiler_inline_result = JSCompiler_inline_result !== 0 ? JSCompiler_inline_result : JSCompiler_inline_result & 536870912 ? 536870912 : 0;
              if (JSCompiler_inline_result !== 0) {
                lanes = JSCompiler_inline_result;
                a: {
                  var root2 = root$jscomp$0;
                  exitStatus = workInProgressRootConcurrentErrors;
                  var wasRootDehydrated = root2.current.memoizedState.isDehydrated;
                  if (wasRootDehydrated && (prepareFreshStack(root2, JSCompiler_inline_result).flags |= 256), JSCompiler_inline_result = renderRootSync(
                    root2,
                    JSCompiler_inline_result,
                    !1
                  ), JSCompiler_inline_result !== 2) {
                    if (workInProgressRootDidAttachPingListener && !wasRootDehydrated) {
                      root2.errorRecoveryDisabledLanes |= renderWasConcurrent, workInProgressRootInterleavedUpdatedLanes |= renderWasConcurrent, exitStatus = 4;
                      break a;
                    }
                    renderWasConcurrent = workInProgressRootRecoverableErrors, workInProgressRootRecoverableErrors = exitStatus, renderWasConcurrent !== null && (workInProgressRootRecoverableErrors === null ? workInProgressRootRecoverableErrors = renderWasConcurrent : workInProgressRootRecoverableErrors.push.apply(
                      workInProgressRootRecoverableErrors,
                      renderWasConcurrent
                    ));
                  }
                  exitStatus = JSCompiler_inline_result;
                }
                if (renderWasConcurrent = !1, exitStatus !== 2) continue;
              }
            }
            if (exitStatus === 1) {
              prepareFreshStack(root$jscomp$0, 0), markRootSuspended(root$jscomp$0, lanes, 0, !0);
              break;
            }
            a: {
              switch (shouldTimeSlice = root$jscomp$0, renderWasConcurrent = exitStatus, renderWasConcurrent) {
                case 0:
                case 1:
                  throw Error(formatProdErrorMessage(345));
                case 4:
                  if ((lanes & 4194048) !== lanes) break;
                case 6:
                  markRootSuspended(
                    shouldTimeSlice,
                    lanes,
                    workInProgressDeferredLane,
                    !workInProgressRootDidSkipSuspendedSiblings
                  );
                  break a;
                case 2:
                  workInProgressRootRecoverableErrors = null;
                  break;
                case 3:
                case 5:
                  break;
                default:
                  throw Error(formatProdErrorMessage(329));
              }
              if ((lanes & 62914560) === lanes && (exitStatus = globalMostRecentFallbackTime + 300 - now(), 10 < exitStatus)) {
                if (markRootSuspended(
                  shouldTimeSlice,
                  lanes,
                  workInProgressDeferredLane,
                  !workInProgressRootDidSkipSuspendedSiblings
                ), getNextLanes(shouldTimeSlice, 0, !0) !== 0) break a;
                pendingEffectsLanes = lanes, shouldTimeSlice.timeoutHandle = scheduleTimeout(
                  commitRootWhenReady.bind(
                    null,
                    shouldTimeSlice,
                    forceSync,
                    workInProgressRootRecoverableErrors,
                    workInProgressTransitions,
                    workInProgressRootDidIncludeRecursiveRenderUpdate,
                    lanes,
                    workInProgressDeferredLane,
                    workInProgressRootInterleavedUpdatedLanes,
                    workInProgressSuspendedRetryLanes,
                    workInProgressRootDidSkipSuspendedSiblings,
                    renderWasConcurrent,
                    "Throttled",
                    -0,
                    0
                  ),
                  exitStatus
                );
                break a;
              }
              commitRootWhenReady(
                shouldTimeSlice,
                forceSync,
                workInProgressRootRecoverableErrors,
                workInProgressTransitions,
                workInProgressRootDidIncludeRecursiveRenderUpdate,
                lanes,
                workInProgressDeferredLane,
                workInProgressRootInterleavedUpdatedLanes,
                workInProgressSuspendedRetryLanes,
                workInProgressRootDidSkipSuspendedSiblings,
                renderWasConcurrent,
                null,
                -0,
                0
              );
            }
          }
          break;
        } while (!0);
        ensureRootIsScheduled(root$jscomp$0);
      }
      function commitRootWhenReady(root2, finishedWork, recoverableErrors, transitions, didIncludeRenderPhaseUpdate, lanes, spawnedLane, updatedLanes, suspendedRetryLanes, didSkipSuspendedSiblings, exitStatus, suspendedCommitReason, completedRenderStartTime, completedRenderEndTime) {
        if (root2.timeoutHandle = -1, suspendedCommitReason = finishedWork.subtreeFlags, suspendedCommitReason & 8192 || (suspendedCommitReason & 16785408) === 16785408) {
          suspendedCommitReason = {
            stylesheets: null,
            count: 0,
            imgCount: 0,
            imgBytes: 0,
            suspenseyImages: [],
            waitingForImages: !0,
            waitingForViewTransition: !1,
            unsuspend: noop$1
          }, accumulateSuspenseyCommitOnFiber(
            finishedWork,
            lanes,
            suspendedCommitReason
          );
          var timeoutOffset = (lanes & 62914560) === lanes ? globalMostRecentFallbackTime - now() : (lanes & 4194048) === lanes ? globalMostRecentTransitionTime - now() : 0;
          if (timeoutOffset = waitForCommitToBeReady(
            suspendedCommitReason,
            timeoutOffset
          ), timeoutOffset !== null) {
            pendingEffectsLanes = lanes, root2.cancelPendingCommit = timeoutOffset(
              commitRoot.bind(
                null,
                root2,
                finishedWork,
                lanes,
                recoverableErrors,
                transitions,
                didIncludeRenderPhaseUpdate,
                spawnedLane,
                updatedLanes,
                suspendedRetryLanes,
                exitStatus,
                suspendedCommitReason,
                null,
                completedRenderStartTime,
                completedRenderEndTime
              )
            ), markRootSuspended(root2, lanes, spawnedLane, !didSkipSuspendedSiblings);
            return;
          }
        }
        commitRoot(
          root2,
          finishedWork,
          lanes,
          recoverableErrors,
          transitions,
          didIncludeRenderPhaseUpdate,
          spawnedLane,
          updatedLanes,
          suspendedRetryLanes
        );
      }
      function isRenderConsistentWithExternalStores(finishedWork) {
        for (var node = finishedWork; ; ) {
          var tag = node.tag;
          if ((tag === 0 || tag === 11 || tag === 15) && node.flags & 16384 && (tag = node.updateQueue, tag !== null && (tag = tag.stores, tag !== null)))
            for (var i = 0; i < tag.length; i++) {
              var check = tag[i], getSnapshot = check.getSnapshot;
              check = check.value;
              try {
                if (!objectIs(getSnapshot(), check)) return !1;
              } catch {
                return !1;
              }
            }
          if (tag = node.child, node.subtreeFlags & 16384 && tag !== null)
            tag.return = node, node = tag;
          else {
            if (node === finishedWork) break;
            for (; node.sibling === null; ) {
              if (node.return === null || node.return === finishedWork) return !0;
              node = node.return;
            }
            node.sibling.return = node.return, node = node.sibling;
          }
        }
        return !0;
      }
      function markRootSuspended(root2, suspendedLanes, spawnedLane, didAttemptEntireTree) {
        suspendedLanes &= ~workInProgressRootPingedLanes, suspendedLanes &= ~workInProgressRootInterleavedUpdatedLanes, root2.suspendedLanes |= suspendedLanes, root2.pingedLanes &= ~suspendedLanes, didAttemptEntireTree && (root2.warmLanes |= suspendedLanes), didAttemptEntireTree = root2.expirationTimes;
        for (var lanes = suspendedLanes; 0 < lanes; ) {
          var index$6 = 31 - clz32(lanes), lane = 1 << index$6;
          didAttemptEntireTree[index$6] = -1, lanes &= ~lane;
        }
        spawnedLane !== 0 && markSpawnedDeferredLane(root2, spawnedLane, suspendedLanes);
      }
      function flushSyncWork$1() {
        return (executionContext & 6) === 0 ? (flushSyncWorkAcrossRoots_impl(0, !1), !1) : !0;
      }
      function resetWorkInProgressStack() {
        if (workInProgress !== null) {
          if (workInProgressSuspendedReason === 0)
            var interruptedWork = workInProgress.return;
          else
            interruptedWork = workInProgress, lastContextDependency = currentlyRenderingFiber$1 = null, resetHooksOnUnwind(interruptedWork), thenableState$1 = null, thenableIndexCounter$1 = 0, interruptedWork = workInProgress;
          for (; interruptedWork !== null; )
            unwindInterruptedWork(interruptedWork.alternate, interruptedWork), interruptedWork = interruptedWork.return;
          workInProgress = null;
        }
      }
      function prepareFreshStack(root2, lanes) {
        var timeoutHandle = root2.timeoutHandle;
        timeoutHandle !== -1 && (root2.timeoutHandle = -1, cancelTimeout(timeoutHandle)), timeoutHandle = root2.cancelPendingCommit, timeoutHandle !== null && (root2.cancelPendingCommit = null, timeoutHandle()), pendingEffectsLanes = 0, resetWorkInProgressStack(), workInProgressRoot = root2, workInProgress = timeoutHandle = createWorkInProgress(root2.current, null), workInProgressRootRenderLanes = lanes, workInProgressSuspendedReason = 0, workInProgressThrownValue = null, workInProgressRootDidSkipSuspendedSiblings = !1, workInProgressRootIsPrerendering = checkIfRootIsPrerendering(root2, lanes), workInProgressRootDidAttachPingListener = !1, workInProgressSuspendedRetryLanes = workInProgressDeferredLane = workInProgressRootPingedLanes = workInProgressRootInterleavedUpdatedLanes = workInProgressRootSkippedLanes = workInProgressRootExitStatus = 0, workInProgressRootRecoverableErrors = workInProgressRootConcurrentErrors = null, workInProgressRootDidIncludeRecursiveRenderUpdate = !1, (lanes & 8) !== 0 && (lanes |= lanes & 32);
        var allEntangledLanes = root2.entangledLanes;
        if (allEntangledLanes !== 0)
          for (root2 = root2.entanglements, allEntangledLanes &= lanes; 0 < allEntangledLanes; ) {
            var index$4 = 31 - clz32(allEntangledLanes), lane = 1 << index$4;
            lanes |= root2[index$4], allEntangledLanes &= ~lane;
          }
        return entangledRenderLanes = lanes, finishQueueingConcurrentUpdates(), timeoutHandle;
      }
      function handleThrow(root2, thrownValue) {
        currentlyRenderingFiber = null, ReactSharedInternals.H = ContextOnlyDispatcher, thrownValue === SuspenseException || thrownValue === SuspenseActionException ? (thrownValue = getSuspendedThenable(), workInProgressSuspendedReason = 3) : thrownValue === SuspenseyCommitException ? (thrownValue = getSuspendedThenable(), workInProgressSuspendedReason = 4) : workInProgressSuspendedReason = thrownValue === SelectiveHydrationException ? 8 : thrownValue !== null && typeof thrownValue == "object" && typeof thrownValue.then == "function" ? 6 : 1, workInProgressThrownValue = thrownValue, workInProgress === null && (workInProgressRootExitStatus = 1, logUncaughtError(
          root2,
          createCapturedValueAtFiber(thrownValue, root2.current)
        ));
      }
      function shouldRemainOnPreviousScreen() {
        var handler = suspenseHandlerStackCursor.current;
        return handler === null ? !0 : (workInProgressRootRenderLanes & 4194048) === workInProgressRootRenderLanes ? shellBoundary === null : (workInProgressRootRenderLanes & 62914560) === workInProgressRootRenderLanes || (workInProgressRootRenderLanes & 536870912) !== 0 ? handler === shellBoundary : !1;
      }
      function pushDispatcher() {
        var prevDispatcher = ReactSharedInternals.H;
        return ReactSharedInternals.H = ContextOnlyDispatcher, prevDispatcher === null ? ContextOnlyDispatcher : prevDispatcher;
      }
      function pushAsyncDispatcher() {
        var prevAsyncDispatcher = ReactSharedInternals.A;
        return ReactSharedInternals.A = DefaultAsyncDispatcher, prevAsyncDispatcher;
      }
      function renderDidSuspendDelayIfPossible() {
        workInProgressRootExitStatus = 4, workInProgressRootDidSkipSuspendedSiblings || (workInProgressRootRenderLanes & 4194048) !== workInProgressRootRenderLanes && suspenseHandlerStackCursor.current !== null || (workInProgressRootIsPrerendering = !0), (workInProgressRootSkippedLanes & 134217727) === 0 && (workInProgressRootInterleavedUpdatedLanes & 134217727) === 0 || workInProgressRoot === null || markRootSuspended(
          workInProgressRoot,
          workInProgressRootRenderLanes,
          workInProgressDeferredLane,
          !1
        );
      }
      function renderRootSync(root2, lanes, shouldYieldForPrerendering) {
        var prevExecutionContext = executionContext;
        executionContext |= 2;
        var prevDispatcher = pushDispatcher(), prevAsyncDispatcher = pushAsyncDispatcher();
        (workInProgressRoot !== root2 || workInProgressRootRenderLanes !== lanes) && (workInProgressTransitions = null, prepareFreshStack(root2, lanes)), lanes = !1;
        var exitStatus = workInProgressRootExitStatus;
        a: do
          try {
            if (workInProgressSuspendedReason !== 0 && workInProgress !== null) {
              var unitOfWork = workInProgress, thrownValue = workInProgressThrownValue;
              switch (workInProgressSuspendedReason) {
                case 8:
                  resetWorkInProgressStack(), exitStatus = 6;
                  break a;
                case 3:
                case 2:
                case 9:
                case 6:
                  suspenseHandlerStackCursor.current === null && (lanes = !0);
                  var reason = workInProgressSuspendedReason;
                  if (workInProgressSuspendedReason = 0, workInProgressThrownValue = null, throwAndUnwindWorkLoop(root2, unitOfWork, thrownValue, reason), shouldYieldForPrerendering && workInProgressRootIsPrerendering) {
                    exitStatus = 0;
                    break a;
                  }
                  break;
                default:
                  reason = workInProgressSuspendedReason, workInProgressSuspendedReason = 0, workInProgressThrownValue = null, throwAndUnwindWorkLoop(root2, unitOfWork, thrownValue, reason);
              }
            }
            workLoopSync(), exitStatus = workInProgressRootExitStatus;
            break;
          } catch (thrownValue$165) {
            handleThrow(root2, thrownValue$165);
          }
        while (!0);
        return lanes && root2.shellSuspendCounter++, lastContextDependency = currentlyRenderingFiber$1 = null, executionContext = prevExecutionContext, ReactSharedInternals.H = prevDispatcher, ReactSharedInternals.A = prevAsyncDispatcher, workInProgress === null && (workInProgressRoot = null, workInProgressRootRenderLanes = 0, finishQueueingConcurrentUpdates()), exitStatus;
      }
      function workLoopSync() {
        for (; workInProgress !== null; ) performUnitOfWork(workInProgress);
      }
      function renderRootConcurrent(root2, lanes) {
        var prevExecutionContext = executionContext;
        executionContext |= 2;
        var prevDispatcher = pushDispatcher(), prevAsyncDispatcher = pushAsyncDispatcher();
        workInProgressRoot !== root2 || workInProgressRootRenderLanes !== lanes ? (workInProgressTransitions = null, workInProgressRootRenderTargetTime = now() + 500, prepareFreshStack(root2, lanes)) : workInProgressRootIsPrerendering = checkIfRootIsPrerendering(
          root2,
          lanes
        );
        a: do
          try {
            if (workInProgressSuspendedReason !== 0 && workInProgress !== null) {
              lanes = workInProgress;
              var thrownValue = workInProgressThrownValue;
              b: switch (workInProgressSuspendedReason) {
                case 1:
                  workInProgressSuspendedReason = 0, workInProgressThrownValue = null, throwAndUnwindWorkLoop(root2, lanes, thrownValue, 1);
                  break;
                case 2:
                case 9:
                  if (isThenableResolved(thrownValue)) {
                    workInProgressSuspendedReason = 0, workInProgressThrownValue = null, replaySuspendedUnitOfWork(lanes);
                    break;
                  }
                  lanes = function() {
                    workInProgressSuspendedReason !== 2 && workInProgressSuspendedReason !== 9 || workInProgressRoot !== root2 || (workInProgressSuspendedReason = 7), ensureRootIsScheduled(root2);
                  }, thrownValue.then(lanes, lanes);
                  break a;
                case 3:
                  workInProgressSuspendedReason = 7;
                  break a;
                case 4:
                  workInProgressSuspendedReason = 5;
                  break a;
                case 7:
                  isThenableResolved(thrownValue) ? (workInProgressSuspendedReason = 0, workInProgressThrownValue = null, replaySuspendedUnitOfWork(lanes)) : (workInProgressSuspendedReason = 0, workInProgressThrownValue = null, throwAndUnwindWorkLoop(root2, lanes, thrownValue, 7));
                  break;
                case 5:
                  var resource = null;
                  switch (workInProgress.tag) {
                    case 26:
                      resource = workInProgress.memoizedState;
                    case 5:
                    case 27:
                      var hostFiber = workInProgress;
                      if (resource ? preloadResource(resource) : hostFiber.stateNode.complete) {
                        workInProgressSuspendedReason = 0, workInProgressThrownValue = null;
                        var sibling = hostFiber.sibling;
                        if (sibling !== null) workInProgress = sibling;
                        else {
                          var returnFiber = hostFiber.return;
                          returnFiber !== null ? (workInProgress = returnFiber, completeUnitOfWork(returnFiber)) : workInProgress = null;
                        }
                        break b;
                      }
                  }
                  workInProgressSuspendedReason = 0, workInProgressThrownValue = null, throwAndUnwindWorkLoop(root2, lanes, thrownValue, 5);
                  break;
                case 6:
                  workInProgressSuspendedReason = 0, workInProgressThrownValue = null, throwAndUnwindWorkLoop(root2, lanes, thrownValue, 6);
                  break;
                case 8:
                  resetWorkInProgressStack(), workInProgressRootExitStatus = 6;
                  break a;
                default:
                  throw Error(formatProdErrorMessage(462));
              }
            }
            workLoopConcurrentByScheduler();
            break;
          } catch (thrownValue$167) {
            handleThrow(root2, thrownValue$167);
          }
        while (!0);
        return lastContextDependency = currentlyRenderingFiber$1 = null, ReactSharedInternals.H = prevDispatcher, ReactSharedInternals.A = prevAsyncDispatcher, executionContext = prevExecutionContext, workInProgress !== null ? 0 : (workInProgressRoot = null, workInProgressRootRenderLanes = 0, finishQueueingConcurrentUpdates(), workInProgressRootExitStatus);
      }
      function workLoopConcurrentByScheduler() {
        for (; workInProgress !== null && !shouldYield(); )
          performUnitOfWork(workInProgress);
      }
      function performUnitOfWork(unitOfWork) {
        var next = beginWork(unitOfWork.alternate, unitOfWork, entangledRenderLanes);
        unitOfWork.memoizedProps = unitOfWork.pendingProps, next === null ? completeUnitOfWork(unitOfWork) : workInProgress = next;
      }
      function replaySuspendedUnitOfWork(unitOfWork) {
        var next = unitOfWork, current = next.alternate;
        switch (next.tag) {
          case 15:
          case 0:
            next = replayFunctionComponent(
              current,
              next,
              next.pendingProps,
              next.type,
              void 0,
              workInProgressRootRenderLanes
            );
            break;
          case 11:
            next = replayFunctionComponent(
              current,
              next,
              next.pendingProps,
              next.type.render,
              next.ref,
              workInProgressRootRenderLanes
            );
            break;
          case 5:
            resetHooksOnUnwind(next);
          default:
            unwindInterruptedWork(current, next), next = workInProgress = resetWorkInProgress(next, entangledRenderLanes), next = beginWork(current, next, entangledRenderLanes);
        }
        unitOfWork.memoizedProps = unitOfWork.pendingProps, next === null ? completeUnitOfWork(unitOfWork) : workInProgress = next;
      }
      function throwAndUnwindWorkLoop(root2, unitOfWork, thrownValue, suspendedReason) {
        lastContextDependency = currentlyRenderingFiber$1 = null, resetHooksOnUnwind(unitOfWork), thenableState$1 = null, thenableIndexCounter$1 = 0;
        var returnFiber = unitOfWork.return;
        try {
          if (throwException(
            root2,
            returnFiber,
            unitOfWork,
            thrownValue,
            workInProgressRootRenderLanes
          )) {
            workInProgressRootExitStatus = 1, logUncaughtError(
              root2,
              createCapturedValueAtFiber(thrownValue, root2.current)
            ), workInProgress = null;
            return;
          }
        } catch (error) {
          if (returnFiber !== null) throw workInProgress = returnFiber, error;
          workInProgressRootExitStatus = 1, logUncaughtError(
            root2,
            createCapturedValueAtFiber(thrownValue, root2.current)
          ), workInProgress = null;
          return;
        }
        unitOfWork.flags & 32768 ? (isHydrating || suspendedReason === 1 ? root2 = !0 : workInProgressRootIsPrerendering || (workInProgressRootRenderLanes & 536870912) !== 0 ? root2 = !1 : (workInProgressRootDidSkipSuspendedSiblings = root2 = !0, (suspendedReason === 2 || suspendedReason === 9 || suspendedReason === 3 || suspendedReason === 6) && (suspendedReason = suspenseHandlerStackCursor.current, suspendedReason !== null && suspendedReason.tag === 13 && (suspendedReason.flags |= 16384))), unwindUnitOfWork(unitOfWork, root2)) : completeUnitOfWork(unitOfWork);
      }
      function completeUnitOfWork(unitOfWork) {
        var completedWork = unitOfWork;
        do {
          if ((completedWork.flags & 32768) !== 0) {
            unwindUnitOfWork(
              completedWork,
              workInProgressRootDidSkipSuspendedSiblings
            );
            return;
          }
          unitOfWork = completedWork.return;
          var next = completeWork(
            completedWork.alternate,
            completedWork,
            entangledRenderLanes
          );
          if (next !== null) {
            workInProgress = next;
            return;
          }
          if (completedWork = completedWork.sibling, completedWork !== null) {
            workInProgress = completedWork;
            return;
          }
          workInProgress = completedWork = unitOfWork;
        } while (completedWork !== null);
        workInProgressRootExitStatus === 0 && (workInProgressRootExitStatus = 5);
      }
      function unwindUnitOfWork(unitOfWork, skipSiblings) {
        do {
          var next = unwindWork(unitOfWork.alternate, unitOfWork);
          if (next !== null) {
            next.flags &= 32767, workInProgress = next;
            return;
          }
          if (next = unitOfWork.return, next !== null && (next.flags |= 32768, next.subtreeFlags = 0, next.deletions = null), !skipSiblings && (unitOfWork = unitOfWork.sibling, unitOfWork !== null)) {
            workInProgress = unitOfWork;
            return;
          }
          workInProgress = unitOfWork = next;
        } while (unitOfWork !== null);
        workInProgressRootExitStatus = 6, workInProgress = null;
      }
      function commitRoot(root2, finishedWork, lanes, recoverableErrors, transitions, didIncludeRenderPhaseUpdate, spawnedLane, updatedLanes, suspendedRetryLanes) {
        root2.cancelPendingCommit = null;
        do
          flushPendingEffects();
        while (pendingEffectsStatus !== 0);
        if ((executionContext & 6) !== 0) throw Error(formatProdErrorMessage(327));
        if (finishedWork !== null) {
          if (finishedWork === root2.current) throw Error(formatProdErrorMessage(177));
          if (didIncludeRenderPhaseUpdate = finishedWork.lanes | finishedWork.childLanes, didIncludeRenderPhaseUpdate |= concurrentlyUpdatedLanes, markRootFinished(
            root2,
            lanes,
            didIncludeRenderPhaseUpdate,
            spawnedLane,
            updatedLanes,
            suspendedRetryLanes
          ), root2 === workInProgressRoot && (workInProgress = workInProgressRoot = null, workInProgressRootRenderLanes = 0), pendingFinishedWork = finishedWork, pendingEffectsRoot = root2, pendingEffectsLanes = lanes, pendingEffectsRemainingLanes = didIncludeRenderPhaseUpdate, pendingPassiveTransitions = transitions, pendingRecoverableErrors = recoverableErrors, (finishedWork.subtreeFlags & 10256) !== 0 || (finishedWork.flags & 10256) !== 0 ? (root2.callbackNode = null, root2.callbackPriority = 0, scheduleCallback$1(NormalPriority$1, function() {
            return flushPassiveEffects(), null;
          })) : (root2.callbackNode = null, root2.callbackPriority = 0), recoverableErrors = (finishedWork.flags & 13878) !== 0, (finishedWork.subtreeFlags & 13878) !== 0 || recoverableErrors) {
            recoverableErrors = ReactSharedInternals.T, ReactSharedInternals.T = null, transitions = ReactDOMSharedInternals.p, ReactDOMSharedInternals.p = 2, spawnedLane = executionContext, executionContext |= 4;
            try {
              commitBeforeMutationEffects(root2, finishedWork, lanes);
            } finally {
              executionContext = spawnedLane, ReactDOMSharedInternals.p = transitions, ReactSharedInternals.T = recoverableErrors;
            }
          }
          pendingEffectsStatus = 1, flushMutationEffects(), flushLayoutEffects(), flushSpawnedWork();
        }
      }
      function flushMutationEffects() {
        if (pendingEffectsStatus === 1) {
          pendingEffectsStatus = 0;
          var root2 = pendingEffectsRoot, finishedWork = pendingFinishedWork, rootMutationHasEffect = (finishedWork.flags & 13878) !== 0;
          if ((finishedWork.subtreeFlags & 13878) !== 0 || rootMutationHasEffect) {
            rootMutationHasEffect = ReactSharedInternals.T, ReactSharedInternals.T = null;
            var previousPriority = ReactDOMSharedInternals.p;
            ReactDOMSharedInternals.p = 2;
            var prevExecutionContext = executionContext;
            executionContext |= 4;
            try {
              commitMutationEffectsOnFiber(finishedWork, root2);
              var priorSelectionInformation = selectionInformation, curFocusedElem = getActiveElementDeep(root2.containerInfo), priorFocusedElem = priorSelectionInformation.focusedElem, priorSelectionRange = priorSelectionInformation.selectionRange;
              if (curFocusedElem !== priorFocusedElem && priorFocusedElem && priorFocusedElem.ownerDocument && containsNode(
                priorFocusedElem.ownerDocument.documentElement,
                priorFocusedElem
              )) {
                if (priorSelectionRange !== null && hasSelectionCapabilities(priorFocusedElem)) {
                  var start = priorSelectionRange.start, end = priorSelectionRange.end;
                  if (end === void 0 && (end = start), "selectionStart" in priorFocusedElem)
                    priorFocusedElem.selectionStart = start, priorFocusedElem.selectionEnd = Math.min(
                      end,
                      priorFocusedElem.value.length
                    );
                  else {
                    var doc = priorFocusedElem.ownerDocument || document, win = doc && doc.defaultView || window;
                    if (win.getSelection) {
                      var selection = win.getSelection(), length = priorFocusedElem.textContent.length, start$jscomp$0 = Math.min(priorSelectionRange.start, length), end$jscomp$0 = priorSelectionRange.end === void 0 ? start$jscomp$0 : Math.min(priorSelectionRange.end, length);
                      !selection.extend && start$jscomp$0 > end$jscomp$0 && (curFocusedElem = end$jscomp$0, end$jscomp$0 = start$jscomp$0, start$jscomp$0 = curFocusedElem);
                      var startMarker = getNodeForCharacterOffset(
                        priorFocusedElem,
                        start$jscomp$0
                      ), endMarker = getNodeForCharacterOffset(
                        priorFocusedElem,
                        end$jscomp$0
                      );
                      if (startMarker && endMarker && (selection.rangeCount !== 1 || selection.anchorNode !== startMarker.node || selection.anchorOffset !== startMarker.offset || selection.focusNode !== endMarker.node || selection.focusOffset !== endMarker.offset)) {
                        var range = doc.createRange();
                        range.setStart(startMarker.node, startMarker.offset), selection.removeAllRanges(), start$jscomp$0 > end$jscomp$0 ? (selection.addRange(range), selection.extend(endMarker.node, endMarker.offset)) : (range.setEnd(endMarker.node, endMarker.offset), selection.addRange(range));
                      }
                    }
                  }
                }
                for (doc = [], selection = priorFocusedElem; selection = selection.parentNode; )
                  selection.nodeType === 1 && doc.push({
                    element: selection,
                    left: selection.scrollLeft,
                    top: selection.scrollTop
                  });
                for (typeof priorFocusedElem.focus == "function" && priorFocusedElem.focus(), priorFocusedElem = 0; priorFocusedElem < doc.length; priorFocusedElem++) {
                  var info = doc[priorFocusedElem];
                  info.element.scrollLeft = info.left, info.element.scrollTop = info.top;
                }
              }
              _enabled = !!eventsEnabled, selectionInformation = eventsEnabled = null;
            } finally {
              executionContext = prevExecutionContext, ReactDOMSharedInternals.p = previousPriority, ReactSharedInternals.T = rootMutationHasEffect;
            }
          }
          root2.current = finishedWork, pendingEffectsStatus = 2;
        }
      }
      function flushLayoutEffects() {
        if (pendingEffectsStatus === 2) {
          pendingEffectsStatus = 0;
          var root2 = pendingEffectsRoot, finishedWork = pendingFinishedWork, rootHasLayoutEffect = (finishedWork.flags & 8772) !== 0;
          if ((finishedWork.subtreeFlags & 8772) !== 0 || rootHasLayoutEffect) {
            rootHasLayoutEffect = ReactSharedInternals.T, ReactSharedInternals.T = null;
            var previousPriority = ReactDOMSharedInternals.p;
            ReactDOMSharedInternals.p = 2;
            var prevExecutionContext = executionContext;
            executionContext |= 4;
            try {
              commitLayoutEffectOnFiber(root2, finishedWork.alternate, finishedWork);
            } finally {
              executionContext = prevExecutionContext, ReactDOMSharedInternals.p = previousPriority, ReactSharedInternals.T = rootHasLayoutEffect;
            }
          }
          pendingEffectsStatus = 3;
        }
      }
      function flushSpawnedWork() {
        if (pendingEffectsStatus === 4 || pendingEffectsStatus === 3) {
          pendingEffectsStatus = 0, requestPaint();
          var root2 = pendingEffectsRoot, finishedWork = pendingFinishedWork, lanes = pendingEffectsLanes, recoverableErrors = pendingRecoverableErrors;
          (finishedWork.subtreeFlags & 10256) !== 0 || (finishedWork.flags & 10256) !== 0 ? pendingEffectsStatus = 5 : (pendingEffectsStatus = 0, pendingFinishedWork = pendingEffectsRoot = null, releaseRootPooledCache(root2, root2.pendingLanes));
          var remainingLanes = root2.pendingLanes;
          if (remainingLanes === 0 && (legacyErrorBoundariesThatAlreadyFailed = null), lanesToEventPriority(lanes), finishedWork = finishedWork.stateNode, injectedHook && typeof injectedHook.onCommitFiberRoot == "function")
            try {
              injectedHook.onCommitFiberRoot(
                rendererID,
                finishedWork,
                void 0,
                (finishedWork.current.flags & 128) === 128
              );
            } catch {
            }
          if (recoverableErrors !== null) {
            finishedWork = ReactSharedInternals.T, remainingLanes = ReactDOMSharedInternals.p, ReactDOMSharedInternals.p = 2, ReactSharedInternals.T = null;
            try {
              for (var onRecoverableError = root2.onRecoverableError, i = 0; i < recoverableErrors.length; i++) {
                var recoverableError = recoverableErrors[i];
                onRecoverableError(recoverableError.value, {
                  componentStack: recoverableError.stack
                });
              }
            } finally {
              ReactSharedInternals.T = finishedWork, ReactDOMSharedInternals.p = remainingLanes;
            }
          }
          (pendingEffectsLanes & 3) !== 0 && flushPendingEffects(), ensureRootIsScheduled(root2), remainingLanes = root2.pendingLanes, (lanes & 261930) !== 0 && (remainingLanes & 42) !== 0 ? root2 === rootWithNestedUpdates ? nestedUpdateCount++ : (nestedUpdateCount = 0, rootWithNestedUpdates = root2) : nestedUpdateCount = 0, flushSyncWorkAcrossRoots_impl(0, !1);
        }
      }
      function releaseRootPooledCache(root2, remainingLanes) {
        (root2.pooledCacheLanes &= remainingLanes) === 0 && (remainingLanes = root2.pooledCache, remainingLanes != null && (root2.pooledCache = null, releaseCache(remainingLanes)));
      }
      function flushPendingEffects() {
        return flushMutationEffects(), flushLayoutEffects(), flushSpawnedWork(), flushPassiveEffects();
      }
      function flushPassiveEffects() {
        if (pendingEffectsStatus !== 5) return !1;
        var root2 = pendingEffectsRoot, remainingLanes = pendingEffectsRemainingLanes;
        pendingEffectsRemainingLanes = 0;
        var renderPriority = lanesToEventPriority(pendingEffectsLanes), prevTransition = ReactSharedInternals.T, previousPriority = ReactDOMSharedInternals.p;
        try {
          ReactDOMSharedInternals.p = 32 > renderPriority ? 32 : renderPriority, ReactSharedInternals.T = null, renderPriority = pendingPassiveTransitions, pendingPassiveTransitions = null;
          var root$jscomp$0 = pendingEffectsRoot, lanes = pendingEffectsLanes;
          if (pendingEffectsStatus = 0, pendingFinishedWork = pendingEffectsRoot = null, pendingEffectsLanes = 0, (executionContext & 6) !== 0) throw Error(formatProdErrorMessage(331));
          var prevExecutionContext = executionContext;
          if (executionContext |= 4, commitPassiveUnmountOnFiber(root$jscomp$0.current), commitPassiveMountOnFiber(
            root$jscomp$0,
            root$jscomp$0.current,
            lanes,
            renderPriority
          ), executionContext = prevExecutionContext, flushSyncWorkAcrossRoots_impl(0, !1), injectedHook && typeof injectedHook.onPostCommitFiberRoot == "function")
            try {
              injectedHook.onPostCommitFiberRoot(rendererID, root$jscomp$0);
            } catch {
            }
          return !0;
        } finally {
          ReactDOMSharedInternals.p = previousPriority, ReactSharedInternals.T = prevTransition, releaseRootPooledCache(root2, remainingLanes);
        }
      }
      function captureCommitPhaseErrorOnRoot(rootFiber, sourceFiber, error) {
        sourceFiber = createCapturedValueAtFiber(error, sourceFiber), sourceFiber = createRootErrorUpdate(rootFiber.stateNode, sourceFiber, 2), rootFiber = enqueueUpdate(rootFiber, sourceFiber, 2), rootFiber !== null && (markRootUpdated$1(rootFiber, 2), ensureRootIsScheduled(rootFiber));
      }
      function captureCommitPhaseError(sourceFiber, nearestMountedAncestor, error) {
        if (sourceFiber.tag === 3)
          captureCommitPhaseErrorOnRoot(sourceFiber, sourceFiber, error);
        else
          for (; nearestMountedAncestor !== null; ) {
            if (nearestMountedAncestor.tag === 3) {
              captureCommitPhaseErrorOnRoot(
                nearestMountedAncestor,
                sourceFiber,
                error
              );
              break;
            } else if (nearestMountedAncestor.tag === 1) {
              var instance = nearestMountedAncestor.stateNode;
              if (typeof nearestMountedAncestor.type.getDerivedStateFromError == "function" || typeof instance.componentDidCatch == "function" && (legacyErrorBoundariesThatAlreadyFailed === null || !legacyErrorBoundariesThatAlreadyFailed.has(instance))) {
                sourceFiber = createCapturedValueAtFiber(error, sourceFiber), error = createClassErrorUpdate(2), instance = enqueueUpdate(nearestMountedAncestor, error, 2), instance !== null && (initializeClassErrorUpdate(
                  error,
                  instance,
                  nearestMountedAncestor,
                  sourceFiber
                ), markRootUpdated$1(instance, 2), ensureRootIsScheduled(instance));
                break;
              }
            }
            nearestMountedAncestor = nearestMountedAncestor.return;
          }
      }
      function attachPingListener(root2, wakeable, lanes) {
        var pingCache = root2.pingCache;
        if (pingCache === null) {
          pingCache = root2.pingCache = new PossiblyWeakMap();
          var threadIDs = /* @__PURE__ */ new Set();
          pingCache.set(wakeable, threadIDs);
        } else
          threadIDs = pingCache.get(wakeable), threadIDs === void 0 && (threadIDs = /* @__PURE__ */ new Set(), pingCache.set(wakeable, threadIDs));
        threadIDs.has(lanes) || (workInProgressRootDidAttachPingListener = !0, threadIDs.add(lanes), root2 = pingSuspendedRoot.bind(null, root2, wakeable, lanes), wakeable.then(root2, root2));
      }
      function pingSuspendedRoot(root2, wakeable, pingedLanes) {
        var pingCache = root2.pingCache;
        pingCache !== null && pingCache.delete(wakeable), root2.pingedLanes |= root2.suspendedLanes & pingedLanes, root2.warmLanes &= ~pingedLanes, workInProgressRoot === root2 && (workInProgressRootRenderLanes & pingedLanes) === pingedLanes && (workInProgressRootExitStatus === 4 || workInProgressRootExitStatus === 3 && (workInProgressRootRenderLanes & 62914560) === workInProgressRootRenderLanes && 300 > now() - globalMostRecentFallbackTime ? (executionContext & 2) === 0 && prepareFreshStack(root2, 0) : workInProgressRootPingedLanes |= pingedLanes, workInProgressSuspendedRetryLanes === workInProgressRootRenderLanes && (workInProgressSuspendedRetryLanes = 0)), ensureRootIsScheduled(root2);
      }
      function retryTimedOutBoundary(boundaryFiber, retryLane) {
        retryLane === 0 && (retryLane = claimNextRetryLane()), boundaryFiber = enqueueConcurrentRenderForLane(boundaryFiber, retryLane), boundaryFiber !== null && (markRootUpdated$1(boundaryFiber, retryLane), ensureRootIsScheduled(boundaryFiber));
      }
      function retryDehydratedSuspenseBoundary(boundaryFiber) {
        var suspenseState = boundaryFiber.memoizedState, retryLane = 0;
        suspenseState !== null && (retryLane = suspenseState.retryLane), retryTimedOutBoundary(boundaryFiber, retryLane);
      }
      function resolveRetryWakeable(boundaryFiber, wakeable) {
        var retryLane = 0;
        switch (boundaryFiber.tag) {
          case 31:
          case 13:
            var retryCache = boundaryFiber.stateNode, suspenseState = boundaryFiber.memoizedState;
            suspenseState !== null && (retryLane = suspenseState.retryLane);
            break;
          case 19:
            retryCache = boundaryFiber.stateNode;
            break;
          case 22:
            retryCache = boundaryFiber.stateNode._retryCache;
            break;
          default:
            throw Error(formatProdErrorMessage(314));
        }
        retryCache !== null && retryCache.delete(wakeable), retryTimedOutBoundary(boundaryFiber, retryLane);
      }
      function scheduleCallback$1(priorityLevel, callback) {
        return scheduleCallback$3(priorityLevel, callback);
      }
      var firstScheduledRoot = null, lastScheduledRoot = null, didScheduleMicrotask = !1, mightHavePendingSyncWork = !1, isFlushingWork = !1, currentEventTransitionLane = 0;
      function ensureRootIsScheduled(root2) {
        root2 !== lastScheduledRoot && root2.next === null && (lastScheduledRoot === null ? firstScheduledRoot = lastScheduledRoot = root2 : lastScheduledRoot = lastScheduledRoot.next = root2), mightHavePendingSyncWork = !0, didScheduleMicrotask || (didScheduleMicrotask = !0, scheduleImmediateRootScheduleTask());
      }
      function flushSyncWorkAcrossRoots_impl(syncTransitionLanes, onlyLegacy) {
        if (!isFlushingWork && mightHavePendingSyncWork) {
          isFlushingWork = !0;
          do
            for (var didPerformSomeWork = !1, root$170 = firstScheduledRoot; root$170 !== null; ) {
              if (!onlyLegacy)
                if (syncTransitionLanes !== 0) {
                  var pendingLanes = root$170.pendingLanes;
                  if (pendingLanes === 0) var JSCompiler_inline_result = 0;
                  else {
                    var suspendedLanes = root$170.suspendedLanes, pingedLanes = root$170.pingedLanes;
                    JSCompiler_inline_result = (1 << 31 - clz32(42 | syncTransitionLanes) + 1) - 1, JSCompiler_inline_result &= pendingLanes & ~(suspendedLanes & ~pingedLanes), JSCompiler_inline_result = JSCompiler_inline_result & 201326741 ? JSCompiler_inline_result & 201326741 | 1 : JSCompiler_inline_result ? JSCompiler_inline_result | 2 : 0;
                  }
                  JSCompiler_inline_result !== 0 && (didPerformSomeWork = !0, performSyncWorkOnRoot(root$170, JSCompiler_inline_result));
                } else
                  JSCompiler_inline_result = workInProgressRootRenderLanes, JSCompiler_inline_result = getNextLanes(
                    root$170,
                    root$170 === workInProgressRoot ? JSCompiler_inline_result : 0,
                    root$170.cancelPendingCommit !== null || root$170.timeoutHandle !== -1
                  ), (JSCompiler_inline_result & 3) === 0 || checkIfRootIsPrerendering(root$170, JSCompiler_inline_result) || (didPerformSomeWork = !0, performSyncWorkOnRoot(root$170, JSCompiler_inline_result));
              root$170 = root$170.next;
            }
          while (didPerformSomeWork);
          isFlushingWork = !1;
        }
      }
      function processRootScheduleInImmediateTask() {
        processRootScheduleInMicrotask();
      }
      function processRootScheduleInMicrotask() {
        mightHavePendingSyncWork = didScheduleMicrotask = !1;
        var syncTransitionLanes = 0;
        currentEventTransitionLane !== 0 && shouldAttemptEagerTransition() && (syncTransitionLanes = currentEventTransitionLane);
        for (var currentTime = now(), prev = null, root2 = firstScheduledRoot; root2 !== null; ) {
          var next = root2.next, nextLanes = scheduleTaskForRootDuringMicrotask(root2, currentTime);
          nextLanes === 0 ? (root2.next = null, prev === null ? firstScheduledRoot = next : prev.next = next, next === null && (lastScheduledRoot = prev)) : (prev = root2, (syncTransitionLanes !== 0 || (nextLanes & 3) !== 0) && (mightHavePendingSyncWork = !0)), root2 = next;
        }
        pendingEffectsStatus !== 0 && pendingEffectsStatus !== 5 || flushSyncWorkAcrossRoots_impl(syncTransitionLanes, !1), currentEventTransitionLane !== 0 && (currentEventTransitionLane = 0);
      }
      function scheduleTaskForRootDuringMicrotask(root2, currentTime) {
        for (var suspendedLanes = root2.suspendedLanes, pingedLanes = root2.pingedLanes, expirationTimes = root2.expirationTimes, lanes = root2.pendingLanes & -62914561; 0 < lanes; ) {
          var index$5 = 31 - clz32(lanes), lane = 1 << index$5, expirationTime = expirationTimes[index$5];
          expirationTime === -1 ? ((lane & suspendedLanes) === 0 || (lane & pingedLanes) !== 0) && (expirationTimes[index$5] = computeExpirationTime(lane, currentTime)) : expirationTime <= currentTime && (root2.expiredLanes |= lane), lanes &= ~lane;
        }
        if (currentTime = workInProgressRoot, suspendedLanes = workInProgressRootRenderLanes, suspendedLanes = getNextLanes(
          root2,
          root2 === currentTime ? suspendedLanes : 0,
          root2.cancelPendingCommit !== null || root2.timeoutHandle !== -1
        ), pingedLanes = root2.callbackNode, suspendedLanes === 0 || root2 === currentTime && (workInProgressSuspendedReason === 2 || workInProgressSuspendedReason === 9) || root2.cancelPendingCommit !== null)
          return pingedLanes !== null && pingedLanes !== null && cancelCallback$1(pingedLanes), root2.callbackNode = null, root2.callbackPriority = 0;
        if ((suspendedLanes & 3) === 0 || checkIfRootIsPrerendering(root2, suspendedLanes)) {
          if (currentTime = suspendedLanes & -suspendedLanes, currentTime === root2.callbackPriority) return currentTime;
          switch (pingedLanes !== null && cancelCallback$1(pingedLanes), lanesToEventPriority(suspendedLanes)) {
            case 2:
            case 8:
              suspendedLanes = UserBlockingPriority;
              break;
            case 32:
              suspendedLanes = NormalPriority$1;
              break;
            case 268435456:
              suspendedLanes = IdlePriority;
              break;
            default:
              suspendedLanes = NormalPriority$1;
          }
          return pingedLanes = performWorkOnRootViaSchedulerTask.bind(null, root2), suspendedLanes = scheduleCallback$3(suspendedLanes, pingedLanes), root2.callbackPriority = currentTime, root2.callbackNode = suspendedLanes, currentTime;
        }
        return pingedLanes !== null && pingedLanes !== null && cancelCallback$1(pingedLanes), root2.callbackPriority = 2, root2.callbackNode = null, 2;
      }
      function performWorkOnRootViaSchedulerTask(root2, didTimeout) {
        if (pendingEffectsStatus !== 0 && pendingEffectsStatus !== 5)
          return root2.callbackNode = null, root2.callbackPriority = 0, null;
        var originalCallbackNode = root2.callbackNode;
        if (flushPendingEffects() && root2.callbackNode !== originalCallbackNode)
          return null;
        var workInProgressRootRenderLanes$jscomp$0 = workInProgressRootRenderLanes;
        return workInProgressRootRenderLanes$jscomp$0 = getNextLanes(
          root2,
          root2 === workInProgressRoot ? workInProgressRootRenderLanes$jscomp$0 : 0,
          root2.cancelPendingCommit !== null || root2.timeoutHandle !== -1
        ), workInProgressRootRenderLanes$jscomp$0 === 0 ? null : (performWorkOnRoot(root2, workInProgressRootRenderLanes$jscomp$0, didTimeout), scheduleTaskForRootDuringMicrotask(root2, now()), root2.callbackNode != null && root2.callbackNode === originalCallbackNode ? performWorkOnRootViaSchedulerTask.bind(null, root2) : null);
      }
      function performSyncWorkOnRoot(root2, lanes) {
        if (flushPendingEffects()) return null;
        performWorkOnRoot(root2, lanes, !0);
      }
      function scheduleImmediateRootScheduleTask() {
        scheduleMicrotask(function() {
          (executionContext & 6) !== 0 ? scheduleCallback$3(
            ImmediatePriority,
            processRootScheduleInImmediateTask
          ) : processRootScheduleInMicrotask();
        });
      }
      function requestTransitionLane() {
        if (currentEventTransitionLane === 0) {
          var actionScopeLane = currentEntangledLane;
          actionScopeLane === 0 && (actionScopeLane = nextTransitionUpdateLane, nextTransitionUpdateLane <<= 1, (nextTransitionUpdateLane & 261888) === 0 && (nextTransitionUpdateLane = 256)), currentEventTransitionLane = actionScopeLane;
        }
        return currentEventTransitionLane;
      }
      function coerceFormActionProp(actionProp) {
        return actionProp == null || typeof actionProp == "symbol" || typeof actionProp == "boolean" ? null : typeof actionProp == "function" ? actionProp : sanitizeURL("" + actionProp);
      }
      function createFormDataWithSubmitter(form, submitter) {
        var temp = submitter.ownerDocument.createElement("input");
        return temp.name = submitter.name, temp.value = submitter.value, form.id && temp.setAttribute("form", form.id), submitter.parentNode.insertBefore(temp, submitter), form = new FormData(form), temp.parentNode.removeChild(temp), form;
      }
      function extractEvents$1(dispatchQueue, domEventName, maybeTargetInst, nativeEvent, nativeEventTarget) {
        if (domEventName === "submit" && maybeTargetInst && maybeTargetInst.stateNode === nativeEventTarget) {
          var action = coerceFormActionProp(
            (nativeEventTarget[internalPropsKey] || null).action
          ), submitter = nativeEvent.submitter;
          submitter && (domEventName = (domEventName = submitter[internalPropsKey] || null) ? coerceFormActionProp(domEventName.formAction) : submitter.getAttribute("formAction"), domEventName !== null && (action = domEventName, submitter = null));
          var event = new SyntheticEvent(
            "action",
            "action",
            null,
            nativeEvent,
            nativeEventTarget
          );
          dispatchQueue.push({
            event,
            listeners: [
              {
                instance: null,
                listener: function() {
                  if (nativeEvent.defaultPrevented) {
                    if (currentEventTransitionLane !== 0) {
                      var formData = submitter ? createFormDataWithSubmitter(nativeEventTarget, submitter) : new FormData(nativeEventTarget);
                      startHostTransition(
                        maybeTargetInst,
                        {
                          pending: !0,
                          data: formData,
                          method: nativeEventTarget.method,
                          action
                        },
                        null,
                        formData
                      );
                    }
                  } else
                    typeof action == "function" && (event.preventDefault(), formData = submitter ? createFormDataWithSubmitter(nativeEventTarget, submitter) : new FormData(nativeEventTarget), startHostTransition(
                      maybeTargetInst,
                      {
                        pending: !0,
                        data: formData,
                        method: nativeEventTarget.method,
                        action
                      },
                      action,
                      formData
                    ));
                },
                currentTarget: nativeEventTarget
              }
            ]
          });
        }
      }
      for (i$jscomp$inline_1577 = 0; i$jscomp$inline_1577 < simpleEventPluginEvents.length; i$jscomp$inline_1577++)
        eventName$jscomp$inline_1578 = simpleEventPluginEvents[i$jscomp$inline_1577], domEventName$jscomp$inline_1579 = eventName$jscomp$inline_1578.toLowerCase(), capitalizedEvent$jscomp$inline_1580 = eventName$jscomp$inline_1578[0].toUpperCase() + eventName$jscomp$inline_1578.slice(1), registerSimpleEvent(
          domEventName$jscomp$inline_1579,
          "on" + capitalizedEvent$jscomp$inline_1580
        );
      var eventName$jscomp$inline_1578, domEventName$jscomp$inline_1579, capitalizedEvent$jscomp$inline_1580, i$jscomp$inline_1577;
      registerSimpleEvent(ANIMATION_END, "onAnimationEnd");
      registerSimpleEvent(ANIMATION_ITERATION, "onAnimationIteration");
      registerSimpleEvent(ANIMATION_START, "onAnimationStart");
      registerSimpleEvent("dblclick", "onDoubleClick");
      registerSimpleEvent("focusin", "onFocus");
      registerSimpleEvent("focusout", "onBlur");
      registerSimpleEvent(TRANSITION_RUN, "onTransitionRun");
      registerSimpleEvent(TRANSITION_START, "onTransitionStart");
      registerSimpleEvent(TRANSITION_CANCEL, "onTransitionCancel");
      registerSimpleEvent(TRANSITION_END, "onTransitionEnd");
      registerDirectEvent("onMouseEnter", ["mouseout", "mouseover"]);
      registerDirectEvent("onMouseLeave", ["mouseout", "mouseover"]);
      registerDirectEvent("onPointerEnter", ["pointerout", "pointerover"]);
      registerDirectEvent("onPointerLeave", ["pointerout", "pointerover"]);
      registerTwoPhaseEvent(
        "onChange",
        "change click focusin focusout input keydown keyup selectionchange".split(" ")
      );
      registerTwoPhaseEvent(
        "onSelect",
        "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
          " "
        )
      );
      registerTwoPhaseEvent("onBeforeInput", [
        "compositionend",
        "keypress",
        "textInput",
        "paste"
      ]);
      registerTwoPhaseEvent(
        "onCompositionEnd",
        "compositionend focusout keydown keypress keyup mousedown".split(" ")
      );
      registerTwoPhaseEvent(
        "onCompositionStart",
        "compositionstart focusout keydown keypress keyup mousedown".split(" ")
      );
      registerTwoPhaseEvent(
        "onCompositionUpdate",
        "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
      );
      var mediaEventTypes = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
        " "
      ), nonDelegatedEvents = new Set(
        "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(mediaEventTypes)
      );
      function processDispatchQueue(dispatchQueue, eventSystemFlags) {
        eventSystemFlags = (eventSystemFlags & 4) !== 0;
        for (var i = 0; i < dispatchQueue.length; i++) {
          var _dispatchQueue$i = dispatchQueue[i], event = _dispatchQueue$i.event;
          _dispatchQueue$i = _dispatchQueue$i.listeners;
          a: {
            var previousInstance = void 0;
            if (eventSystemFlags)
              for (var i$jscomp$0 = _dispatchQueue$i.length - 1; 0 <= i$jscomp$0; i$jscomp$0--) {
                var _dispatchListeners$i = _dispatchQueue$i[i$jscomp$0], instance = _dispatchListeners$i.instance, currentTarget = _dispatchListeners$i.currentTarget;
                if (_dispatchListeners$i = _dispatchListeners$i.listener, instance !== previousInstance && event.isPropagationStopped())
                  break a;
                previousInstance = _dispatchListeners$i, event.currentTarget = currentTarget;
                try {
                  previousInstance(event);
                } catch (error) {
                  reportGlobalError(error);
                }
                event.currentTarget = null, previousInstance = instance;
              }
            else
              for (i$jscomp$0 = 0; i$jscomp$0 < _dispatchQueue$i.length; i$jscomp$0++) {
                if (_dispatchListeners$i = _dispatchQueue$i[i$jscomp$0], instance = _dispatchListeners$i.instance, currentTarget = _dispatchListeners$i.currentTarget, _dispatchListeners$i = _dispatchListeners$i.listener, instance !== previousInstance && event.isPropagationStopped())
                  break a;
                previousInstance = _dispatchListeners$i, event.currentTarget = currentTarget;
                try {
                  previousInstance(event);
                } catch (error) {
                  reportGlobalError(error);
                }
                event.currentTarget = null, previousInstance = instance;
              }
          }
        }
      }
      function listenToNonDelegatedEvent(domEventName, targetElement) {
        var JSCompiler_inline_result = targetElement[internalEventHandlersKey];
        JSCompiler_inline_result === void 0 && (JSCompiler_inline_result = targetElement[internalEventHandlersKey] = /* @__PURE__ */ new Set());
        var listenerSetKey = domEventName + "__bubble";
        JSCompiler_inline_result.has(listenerSetKey) || (addTrappedEventListener(targetElement, domEventName, 2, !1), JSCompiler_inline_result.add(listenerSetKey));
      }
      function listenToNativeEvent(domEventName, isCapturePhaseListener, target) {
        var eventSystemFlags = 0;
        isCapturePhaseListener && (eventSystemFlags |= 4), addTrappedEventListener(
          target,
          domEventName,
          eventSystemFlags,
          isCapturePhaseListener
        );
      }
      var listeningMarker = "_reactListening" + Math.random().toString(36).slice(2);
      function listenToAllSupportedEvents(rootContainerElement) {
        if (!rootContainerElement[listeningMarker]) {
          rootContainerElement[listeningMarker] = !0, allNativeEvents.forEach(function(domEventName) {
            domEventName !== "selectionchange" && (nonDelegatedEvents.has(domEventName) || listenToNativeEvent(domEventName, !1, rootContainerElement), listenToNativeEvent(domEventName, !0, rootContainerElement));
          });
          var ownerDocument = rootContainerElement.nodeType === 9 ? rootContainerElement : rootContainerElement.ownerDocument;
          ownerDocument === null || ownerDocument[listeningMarker] || (ownerDocument[listeningMarker] = !0, listenToNativeEvent("selectionchange", !1, ownerDocument));
        }
      }
      function addTrappedEventListener(targetContainer, domEventName, eventSystemFlags, isCapturePhaseListener) {
        switch (getEventPriority(domEventName)) {
          case 2:
            var listenerWrapper = dispatchDiscreteEvent;
            break;
          case 8:
            listenerWrapper = dispatchContinuousEvent;
            break;
          default:
            listenerWrapper = dispatchEvent;
        }
        eventSystemFlags = listenerWrapper.bind(
          null,
          domEventName,
          eventSystemFlags,
          targetContainer
        ), listenerWrapper = void 0, !passiveBrowserEventsSupported || domEventName !== "touchstart" && domEventName !== "touchmove" && domEventName !== "wheel" || (listenerWrapper = !0), isCapturePhaseListener ? listenerWrapper !== void 0 ? targetContainer.addEventListener(domEventName, eventSystemFlags, {
          capture: !0,
          passive: listenerWrapper
        }) : targetContainer.addEventListener(domEventName, eventSystemFlags, !0) : listenerWrapper !== void 0 ? targetContainer.addEventListener(domEventName, eventSystemFlags, {
          passive: listenerWrapper
        }) : targetContainer.addEventListener(domEventName, eventSystemFlags, !1);
      }
      function dispatchEventForPluginEventSystem(domEventName, eventSystemFlags, nativeEvent, targetInst$jscomp$0, targetContainer) {
        var ancestorInst = targetInst$jscomp$0;
        if ((eventSystemFlags & 1) === 0 && (eventSystemFlags & 2) === 0 && targetInst$jscomp$0 !== null)
          a: for (; ; ) {
            if (targetInst$jscomp$0 === null) return;
            var nodeTag = targetInst$jscomp$0.tag;
            if (nodeTag === 3 || nodeTag === 4) {
              var container = targetInst$jscomp$0.stateNode.containerInfo;
              if (container === targetContainer) break;
              if (nodeTag === 4)
                for (nodeTag = targetInst$jscomp$0.return; nodeTag !== null; ) {
                  var grandTag = nodeTag.tag;
                  if ((grandTag === 3 || grandTag === 4) && nodeTag.stateNode.containerInfo === targetContainer)
                    return;
                  nodeTag = nodeTag.return;
                }
              for (; container !== null; ) {
                if (nodeTag = getClosestInstanceFromNode(container), nodeTag === null) return;
                if (grandTag = nodeTag.tag, grandTag === 5 || grandTag === 6 || grandTag === 26 || grandTag === 27) {
                  targetInst$jscomp$0 = ancestorInst = nodeTag;
                  continue a;
                }
                container = container.parentNode;
              }
            }
            targetInst$jscomp$0 = targetInst$jscomp$0.return;
          }
        batchedUpdates$1(function() {
          var targetInst = ancestorInst, nativeEventTarget = getEventTarget(nativeEvent), dispatchQueue = [];
          a: {
            var reactName = topLevelEventsToReactNames.get(domEventName);
            if (reactName !== void 0) {
              var SyntheticEventCtor = SyntheticEvent, reactEventType = domEventName;
              switch (domEventName) {
                case "keypress":
                  if (getEventCharCode(nativeEvent) === 0) break a;
                case "keydown":
                case "keyup":
                  SyntheticEventCtor = SyntheticKeyboardEvent;
                  break;
                case "focusin":
                  reactEventType = "focus", SyntheticEventCtor = SyntheticFocusEvent;
                  break;
                case "focusout":
                  reactEventType = "blur", SyntheticEventCtor = SyntheticFocusEvent;
                  break;
                case "beforeblur":
                case "afterblur":
                  SyntheticEventCtor = SyntheticFocusEvent;
                  break;
                case "click":
                  if (nativeEvent.button === 2) break a;
                case "auxclick":
                case "dblclick":
                case "mousedown":
                case "mousemove":
                case "mouseup":
                case "mouseout":
                case "mouseover":
                case "contextmenu":
                  SyntheticEventCtor = SyntheticMouseEvent;
                  break;
                case "drag":
                case "dragend":
                case "dragenter":
                case "dragexit":
                case "dragleave":
                case "dragover":
                case "dragstart":
                case "drop":
                  SyntheticEventCtor = SyntheticDragEvent;
                  break;
                case "touchcancel":
                case "touchend":
                case "touchmove":
                case "touchstart":
                  SyntheticEventCtor = SyntheticTouchEvent;
                  break;
                case ANIMATION_END:
                case ANIMATION_ITERATION:
                case ANIMATION_START:
                  SyntheticEventCtor = SyntheticAnimationEvent;
                  break;
                case TRANSITION_END:
                  SyntheticEventCtor = SyntheticTransitionEvent;
                  break;
                case "scroll":
                case "scrollend":
                  SyntheticEventCtor = SyntheticUIEvent;
                  break;
                case "wheel":
                  SyntheticEventCtor = SyntheticWheelEvent;
                  break;
                case "copy":
                case "cut":
                case "paste":
                  SyntheticEventCtor = SyntheticClipboardEvent;
                  break;
                case "gotpointercapture":
                case "lostpointercapture":
                case "pointercancel":
                case "pointerdown":
                case "pointermove":
                case "pointerout":
                case "pointerover":
                case "pointerup":
                  SyntheticEventCtor = SyntheticPointerEvent;
                  break;
                case "toggle":
                case "beforetoggle":
                  SyntheticEventCtor = SyntheticToggleEvent;
              }
              var inCapturePhase = (eventSystemFlags & 4) !== 0, accumulateTargetOnly = !inCapturePhase && (domEventName === "scroll" || domEventName === "scrollend"), reactEventName = inCapturePhase ? reactName !== null ? reactName + "Capture" : null : reactName;
              inCapturePhase = [];
              for (var instance = targetInst, lastHostComponent; instance !== null; ) {
                var _instance = instance;
                if (lastHostComponent = _instance.stateNode, _instance = _instance.tag, _instance !== 5 && _instance !== 26 && _instance !== 27 || lastHostComponent === null || reactEventName === null || (_instance = getListener(instance, reactEventName), _instance != null && inCapturePhase.push(
                  createDispatchListener(instance, _instance, lastHostComponent)
                )), accumulateTargetOnly) break;
                instance = instance.return;
              }
              0 < inCapturePhase.length && (reactName = new SyntheticEventCtor(
                reactName,
                reactEventType,
                null,
                nativeEvent,
                nativeEventTarget
              ), dispatchQueue.push({ event: reactName, listeners: inCapturePhase }));
            }
          }
          if ((eventSystemFlags & 7) === 0) {
            a: {
              if (reactName = domEventName === "mouseover" || domEventName === "pointerover", SyntheticEventCtor = domEventName === "mouseout" || domEventName === "pointerout", reactName && nativeEvent !== currentReplayingEvent && (reactEventType = nativeEvent.relatedTarget || nativeEvent.fromElement) && (getClosestInstanceFromNode(reactEventType) || reactEventType[internalContainerInstanceKey]))
                break a;
              if ((SyntheticEventCtor || reactName) && (reactName = nativeEventTarget.window === nativeEventTarget ? nativeEventTarget : (reactName = nativeEventTarget.ownerDocument) ? reactName.defaultView || reactName.parentWindow : window, SyntheticEventCtor ? (reactEventType = nativeEvent.relatedTarget || nativeEvent.toElement, SyntheticEventCtor = targetInst, reactEventType = reactEventType ? getClosestInstanceFromNode(reactEventType) : null, reactEventType !== null && (accumulateTargetOnly = getNearestMountedFiber(reactEventType), inCapturePhase = reactEventType.tag, reactEventType !== accumulateTargetOnly || inCapturePhase !== 5 && inCapturePhase !== 27 && inCapturePhase !== 6) && (reactEventType = null)) : (SyntheticEventCtor = null, reactEventType = targetInst), SyntheticEventCtor !== reactEventType)) {
                if (inCapturePhase = SyntheticMouseEvent, _instance = "onMouseLeave", reactEventName = "onMouseEnter", instance = "mouse", (domEventName === "pointerout" || domEventName === "pointerover") && (inCapturePhase = SyntheticPointerEvent, _instance = "onPointerLeave", reactEventName = "onPointerEnter", instance = "pointer"), accumulateTargetOnly = SyntheticEventCtor == null ? reactName : getNodeFromInstance(SyntheticEventCtor), lastHostComponent = reactEventType == null ? reactName : getNodeFromInstance(reactEventType), reactName = new inCapturePhase(
                  _instance,
                  instance + "leave",
                  SyntheticEventCtor,
                  nativeEvent,
                  nativeEventTarget
                ), reactName.target = accumulateTargetOnly, reactName.relatedTarget = lastHostComponent, _instance = null, getClosestInstanceFromNode(nativeEventTarget) === targetInst && (inCapturePhase = new inCapturePhase(
                  reactEventName,
                  instance + "enter",
                  reactEventType,
                  nativeEvent,
                  nativeEventTarget
                ), inCapturePhase.target = lastHostComponent, inCapturePhase.relatedTarget = accumulateTargetOnly, _instance = inCapturePhase), accumulateTargetOnly = _instance, SyntheticEventCtor && reactEventType)
                  b: {
                    for (inCapturePhase = getParent, reactEventName = SyntheticEventCtor, instance = reactEventType, lastHostComponent = 0, _instance = reactEventName; _instance; _instance = inCapturePhase(_instance))
                      lastHostComponent++;
                    _instance = 0;
                    for (var tempB = instance; tempB; tempB = inCapturePhase(tempB))
                      _instance++;
                    for (; 0 < lastHostComponent - _instance; )
                      reactEventName = inCapturePhase(reactEventName), lastHostComponent--;
                    for (; 0 < _instance - lastHostComponent; )
                      instance = inCapturePhase(instance), _instance--;
                    for (; lastHostComponent--; ) {
                      if (reactEventName === instance || instance !== null && reactEventName === instance.alternate) {
                        inCapturePhase = reactEventName;
                        break b;
                      }
                      reactEventName = inCapturePhase(reactEventName), instance = inCapturePhase(instance);
                    }
                    inCapturePhase = null;
                  }
                else inCapturePhase = null;
                SyntheticEventCtor !== null && accumulateEnterLeaveListenersForEvent(
                  dispatchQueue,
                  reactName,
                  SyntheticEventCtor,
                  inCapturePhase,
                  !1
                ), reactEventType !== null && accumulateTargetOnly !== null && accumulateEnterLeaveListenersForEvent(
                  dispatchQueue,
                  accumulateTargetOnly,
                  reactEventType,
                  inCapturePhase,
                  !0
                );
              }
            }
            a: {
              if (reactName = targetInst ? getNodeFromInstance(targetInst) : window, SyntheticEventCtor = reactName.nodeName && reactName.nodeName.toLowerCase(), SyntheticEventCtor === "select" || SyntheticEventCtor === "input" && reactName.type === "file")
                var getTargetInstFunc = getTargetInstForChangeEvent;
              else if (isTextInputElement(reactName))
                if (isInputEventSupported)
                  getTargetInstFunc = getTargetInstForInputOrChangeEvent;
                else {
                  getTargetInstFunc = getTargetInstForInputEventPolyfill;
                  var handleEventFunc = handleEventsForInputEventPolyfill;
                }
              else
                SyntheticEventCtor = reactName.nodeName, !SyntheticEventCtor || SyntheticEventCtor.toLowerCase() !== "input" || reactName.type !== "checkbox" && reactName.type !== "radio" ? targetInst && isCustomElement(targetInst.elementType) && (getTargetInstFunc = getTargetInstForChangeEvent) : getTargetInstFunc = getTargetInstForClickEvent;
              if (getTargetInstFunc && (getTargetInstFunc = getTargetInstFunc(domEventName, targetInst))) {
                createAndAccumulateChangeEvent(
                  dispatchQueue,
                  getTargetInstFunc,
                  nativeEvent,
                  nativeEventTarget
                );
                break a;
              }
              handleEventFunc && handleEventFunc(domEventName, reactName, targetInst), domEventName === "focusout" && targetInst && reactName.type === "number" && targetInst.memoizedProps.value != null && setDefaultValue(reactName, "number", reactName.value);
            }
            switch (handleEventFunc = targetInst ? getNodeFromInstance(targetInst) : window, domEventName) {
              case "focusin":
                (isTextInputElement(handleEventFunc) || handleEventFunc.contentEditable === "true") && (activeElement = handleEventFunc, activeElementInst = targetInst, lastSelection = null);
                break;
              case "focusout":
                lastSelection = activeElementInst = activeElement = null;
                break;
              case "mousedown":
                mouseDown = !0;
                break;
              case "contextmenu":
              case "mouseup":
              case "dragend":
                mouseDown = !1, constructSelectEvent(dispatchQueue, nativeEvent, nativeEventTarget);
                break;
              case "selectionchange":
                if (skipSelectionChangeEvent) break;
              case "keydown":
              case "keyup":
                constructSelectEvent(dispatchQueue, nativeEvent, nativeEventTarget);
            }
            var fallbackData;
            if (canUseCompositionEvent)
              b: {
                switch (domEventName) {
                  case "compositionstart":
                    var eventType = "onCompositionStart";
                    break b;
                  case "compositionend":
                    eventType = "onCompositionEnd";
                    break b;
                  case "compositionupdate":
                    eventType = "onCompositionUpdate";
                    break b;
                }
                eventType = void 0;
              }
            else
              isComposing ? isFallbackCompositionEnd(domEventName, nativeEvent) && (eventType = "onCompositionEnd") : domEventName === "keydown" && nativeEvent.keyCode === 229 && (eventType = "onCompositionStart");
            eventType && (useFallbackCompositionData && nativeEvent.locale !== "ko" && (isComposing || eventType !== "onCompositionStart" ? eventType === "onCompositionEnd" && isComposing && (fallbackData = getData()) : (root = nativeEventTarget, startText = "value" in root ? root.value : root.textContent, isComposing = !0)), handleEventFunc = accumulateTwoPhaseListeners(targetInst, eventType), 0 < handleEventFunc.length && (eventType = new SyntheticCompositionEvent(
              eventType,
              domEventName,
              null,
              nativeEvent,
              nativeEventTarget
            ), dispatchQueue.push({ event: eventType, listeners: handleEventFunc }), fallbackData ? eventType.data = fallbackData : (fallbackData = getDataFromCustomEvent(nativeEvent), fallbackData !== null && (eventType.data = fallbackData)))), (fallbackData = canUseTextInputEvent ? getNativeBeforeInputChars(domEventName, nativeEvent) : getFallbackBeforeInputChars(domEventName, nativeEvent)) && (eventType = accumulateTwoPhaseListeners(targetInst, "onBeforeInput"), 0 < eventType.length && (handleEventFunc = new SyntheticCompositionEvent(
              "onBeforeInput",
              "beforeinput",
              null,
              nativeEvent,
              nativeEventTarget
            ), dispatchQueue.push({
              event: handleEventFunc,
              listeners: eventType
            }), handleEventFunc.data = fallbackData)), extractEvents$1(
              dispatchQueue,
              domEventName,
              targetInst,
              nativeEvent,
              nativeEventTarget
            );
          }
          processDispatchQueue(dispatchQueue, eventSystemFlags);
        });
      }
      function createDispatchListener(instance, listener, currentTarget) {
        return {
          instance,
          listener,
          currentTarget
        };
      }
      function accumulateTwoPhaseListeners(targetFiber, reactName) {
        for (var captureName = reactName + "Capture", listeners = []; targetFiber !== null; ) {
          var _instance2 = targetFiber, stateNode = _instance2.stateNode;
          if (_instance2 = _instance2.tag, _instance2 !== 5 && _instance2 !== 26 && _instance2 !== 27 || stateNode === null || (_instance2 = getListener(targetFiber, captureName), _instance2 != null && listeners.unshift(
            createDispatchListener(targetFiber, _instance2, stateNode)
          ), _instance2 = getListener(targetFiber, reactName), _instance2 != null && listeners.push(
            createDispatchListener(targetFiber, _instance2, stateNode)
          )), targetFiber.tag === 3) return listeners;
          targetFiber = targetFiber.return;
        }
        return [];
      }
      function getParent(inst) {
        if (inst === null) return null;
        do
          inst = inst.return;
        while (inst && inst.tag !== 5 && inst.tag !== 27);
        return inst || null;
      }
      function accumulateEnterLeaveListenersForEvent(dispatchQueue, event, target, common, inCapturePhase) {
        for (var registrationName = event._reactName, listeners = []; target !== null && target !== common; ) {
          var _instance3 = target, alternate = _instance3.alternate, stateNode = _instance3.stateNode;
          if (_instance3 = _instance3.tag, alternate !== null && alternate === common) break;
          _instance3 !== 5 && _instance3 !== 26 && _instance3 !== 27 || stateNode === null || (alternate = stateNode, inCapturePhase ? (stateNode = getListener(target, registrationName), stateNode != null && listeners.unshift(
            createDispatchListener(target, stateNode, alternate)
          )) : inCapturePhase || (stateNode = getListener(target, registrationName), stateNode != null && listeners.push(
            createDispatchListener(target, stateNode, alternate)
          ))), target = target.return;
        }
        listeners.length !== 0 && dispatchQueue.push({ event, listeners });
      }
      var NORMALIZE_NEWLINES_REGEX = /\r\n?/g, NORMALIZE_NULL_AND_REPLACEMENT_REGEX = /\u0000|\uFFFD/g;
      function normalizeMarkupForTextOrAttribute(markup) {
        return (typeof markup == "string" ? markup : "" + markup).replace(NORMALIZE_NEWLINES_REGEX, `
`).replace(NORMALIZE_NULL_AND_REPLACEMENT_REGEX, "");
      }
      function checkForUnmatchedText(serverText, clientText) {
        return clientText = normalizeMarkupForTextOrAttribute(clientText), normalizeMarkupForTextOrAttribute(serverText) === clientText;
      }
      function setProp(domElement, tag, key, value, props, prevValue) {
        switch (key) {
          case "children":
            typeof value == "string" ? tag === "body" || tag === "textarea" && value === "" || setTextContent(domElement, value) : (typeof value == "number" || typeof value == "bigint") && tag !== "body" && setTextContent(domElement, "" + value);
            break;
          case "className":
            setValueForKnownAttribute(domElement, "class", value);
            break;
          case "tabIndex":
            setValueForKnownAttribute(domElement, "tabindex", value);
            break;
          case "dir":
          case "role":
          case "viewBox":
          case "width":
          case "height":
            setValueForKnownAttribute(domElement, key, value);
            break;
          case "style":
            setValueForStyles(domElement, value, prevValue);
            break;
          case "data":
            if (tag !== "object") {
              setValueForKnownAttribute(domElement, "data", value);
              break;
            }
          case "src":
          case "href":
            if (value === "" && (tag !== "a" || key !== "href")) {
              domElement.removeAttribute(key);
              break;
            }
            if (value == null || typeof value == "function" || typeof value == "symbol" || typeof value == "boolean") {
              domElement.removeAttribute(key);
              break;
            }
            value = sanitizeURL("" + value), domElement.setAttribute(key, value);
            break;
          case "action":
          case "formAction":
            if (typeof value == "function") {
              domElement.setAttribute(
                key,
                "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
              );
              break;
            } else
              typeof prevValue == "function" && (key === "formAction" ? (tag !== "input" && setProp(domElement, tag, "name", props.name, props, null), setProp(
                domElement,
                tag,
                "formEncType",
                props.formEncType,
                props,
                null
              ), setProp(
                domElement,
                tag,
                "formMethod",
                props.formMethod,
                props,
                null
              ), setProp(
                domElement,
                tag,
                "formTarget",
                props.formTarget,
                props,
                null
              )) : (setProp(domElement, tag, "encType", props.encType, props, null), setProp(domElement, tag, "method", props.method, props, null), setProp(domElement, tag, "target", props.target, props, null)));
            if (value == null || typeof value == "symbol" || typeof value == "boolean") {
              domElement.removeAttribute(key);
              break;
            }
            value = sanitizeURL("" + value), domElement.setAttribute(key, value);
            break;
          case "onClick":
            value != null && (domElement.onclick = noop$1);
            break;
          case "onScroll":
            value != null && listenToNonDelegatedEvent("scroll", domElement);
            break;
          case "onScrollEnd":
            value != null && listenToNonDelegatedEvent("scrollend", domElement);
            break;
          case "dangerouslySetInnerHTML":
            if (value != null) {
              if (typeof value != "object" || !("__html" in value))
                throw Error(formatProdErrorMessage(61));
              if (key = value.__html, key != null) {
                if (props.children != null) throw Error(formatProdErrorMessage(60));
                domElement.innerHTML = key;
              }
            }
            break;
          case "multiple":
            domElement.multiple = value && typeof value != "function" && typeof value != "symbol";
            break;
          case "muted":
            domElement.muted = value && typeof value != "function" && typeof value != "symbol";
            break;
          case "suppressContentEditableWarning":
          case "suppressHydrationWarning":
          case "defaultValue":
          case "defaultChecked":
          case "innerHTML":
          case "ref":
            break;
          case "autoFocus":
            break;
          case "xlinkHref":
            if (value == null || typeof value == "function" || typeof value == "boolean" || typeof value == "symbol") {
              domElement.removeAttribute("xlink:href");
              break;
            }
            key = sanitizeURL("" + value), domElement.setAttributeNS(
              "http://www.w3.org/1999/xlink",
              "xlink:href",
              key
            );
            break;
          case "contentEditable":
          case "spellCheck":
          case "draggable":
          case "value":
          case "autoReverse":
          case "externalResourcesRequired":
          case "focusable":
          case "preserveAlpha":
            value != null && typeof value != "function" && typeof value != "symbol" ? domElement.setAttribute(key, "" + value) : domElement.removeAttribute(key);
            break;
          case "inert":
          case "allowFullScreen":
          case "async":
          case "autoPlay":
          case "controls":
          case "default":
          case "defer":
          case "disabled":
          case "disablePictureInPicture":
          case "disableRemotePlayback":
          case "formNoValidate":
          case "hidden":
          case "loop":
          case "noModule":
          case "noValidate":
          case "open":
          case "playsInline":
          case "readOnly":
          case "required":
          case "reversed":
          case "scoped":
          case "seamless":
          case "itemScope":
            value && typeof value != "function" && typeof value != "symbol" ? domElement.setAttribute(key, "") : domElement.removeAttribute(key);
            break;
          case "capture":
          case "download":
            value === !0 ? domElement.setAttribute(key, "") : value !== !1 && value != null && typeof value != "function" && typeof value != "symbol" ? domElement.setAttribute(key, value) : domElement.removeAttribute(key);
            break;
          case "cols":
          case "rows":
          case "size":
          case "span":
            value != null && typeof value != "function" && typeof value != "symbol" && !isNaN(value) && 1 <= value ? domElement.setAttribute(key, value) : domElement.removeAttribute(key);
            break;
          case "rowSpan":
          case "start":
            value == null || typeof value == "function" || typeof value == "symbol" || isNaN(value) ? domElement.removeAttribute(key) : domElement.setAttribute(key, value);
            break;
          case "popover":
            listenToNonDelegatedEvent("beforetoggle", domElement), listenToNonDelegatedEvent("toggle", domElement), setValueForAttribute(domElement, "popover", value);
            break;
          case "xlinkActuate":
            setValueForNamespacedAttribute(
              domElement,
              "http://www.w3.org/1999/xlink",
              "xlink:actuate",
              value
            );
            break;
          case "xlinkArcrole":
            setValueForNamespacedAttribute(
              domElement,
              "http://www.w3.org/1999/xlink",
              "xlink:arcrole",
              value
            );
            break;
          case "xlinkRole":
            setValueForNamespacedAttribute(
              domElement,
              "http://www.w3.org/1999/xlink",
              "xlink:role",
              value
            );
            break;
          case "xlinkShow":
            setValueForNamespacedAttribute(
              domElement,
              "http://www.w3.org/1999/xlink",
              "xlink:show",
              value
            );
            break;
          case "xlinkTitle":
            setValueForNamespacedAttribute(
              domElement,
              "http://www.w3.org/1999/xlink",
              "xlink:title",
              value
            );
            break;
          case "xlinkType":
            setValueForNamespacedAttribute(
              domElement,
              "http://www.w3.org/1999/xlink",
              "xlink:type",
              value
            );
            break;
          case "xmlBase":
            setValueForNamespacedAttribute(
              domElement,
              "http://www.w3.org/XML/1998/namespace",
              "xml:base",
              value
            );
            break;
          case "xmlLang":
            setValueForNamespacedAttribute(
              domElement,
              "http://www.w3.org/XML/1998/namespace",
              "xml:lang",
              value
            );
            break;
          case "xmlSpace":
            setValueForNamespacedAttribute(
              domElement,
              "http://www.w3.org/XML/1998/namespace",
              "xml:space",
              value
            );
            break;
          case "is":
            setValueForAttribute(domElement, "is", value);
            break;
          case "innerText":
          case "textContent":
            break;
          default:
            (!(2 < key.length) || key[0] !== "o" && key[0] !== "O" || key[1] !== "n" && key[1] !== "N") && (key = aliases.get(key) || key, setValueForAttribute(domElement, key, value));
        }
      }
      function setPropOnCustomElement(domElement, tag, key, value, props, prevValue) {
        switch (key) {
          case "style":
            setValueForStyles(domElement, value, prevValue);
            break;
          case "dangerouslySetInnerHTML":
            if (value != null) {
              if (typeof value != "object" || !("__html" in value))
                throw Error(formatProdErrorMessage(61));
              if (key = value.__html, key != null) {
                if (props.children != null) throw Error(formatProdErrorMessage(60));
                domElement.innerHTML = key;
              }
            }
            break;
          case "children":
            typeof value == "string" ? setTextContent(domElement, value) : (typeof value == "number" || typeof value == "bigint") && setTextContent(domElement, "" + value);
            break;
          case "onScroll":
            value != null && listenToNonDelegatedEvent("scroll", domElement);
            break;
          case "onScrollEnd":
            value != null && listenToNonDelegatedEvent("scrollend", domElement);
            break;
          case "onClick":
            value != null && (domElement.onclick = noop$1);
            break;
          case "suppressContentEditableWarning":
          case "suppressHydrationWarning":
          case "innerHTML":
          case "ref":
            break;
          case "innerText":
          case "textContent":
            break;
          default:
            if (!registrationNameDependencies.hasOwnProperty(key))
              a: {
                if (key[0] === "o" && key[1] === "n" && (props = key.endsWith("Capture"), tag = key.slice(2, props ? key.length - 7 : void 0), prevValue = domElement[internalPropsKey] || null, prevValue = prevValue != null ? prevValue[key] : null, typeof prevValue == "function" && domElement.removeEventListener(tag, prevValue, props), typeof value == "function")) {
                  typeof prevValue != "function" && prevValue !== null && (key in domElement ? domElement[key] = null : domElement.hasAttribute(key) && domElement.removeAttribute(key)), domElement.addEventListener(tag, value, props);
                  break a;
                }
                key in domElement ? domElement[key] = value : value === !0 ? domElement.setAttribute(key, "") : setValueForAttribute(domElement, key, value);
              }
        }
      }
      function setInitialProperties(domElement, tag, props) {
        switch (tag) {
          case "div":
          case "span":
          case "svg":
          case "path":
          case "a":
          case "g":
          case "p":
          case "li":
            break;
          case "img":
            listenToNonDelegatedEvent("error", domElement), listenToNonDelegatedEvent("load", domElement);
            var hasSrc = !1, hasSrcSet = !1, propKey;
            for (propKey in props)
              if (props.hasOwnProperty(propKey)) {
                var propValue = props[propKey];
                if (propValue != null)
                  switch (propKey) {
                    case "src":
                      hasSrc = !0;
                      break;
                    case "srcSet":
                      hasSrcSet = !0;
                      break;
                    case "children":
                    case "dangerouslySetInnerHTML":
                      throw Error(formatProdErrorMessage(137, tag));
                    default:
                      setProp(domElement, tag, propKey, propValue, props, null);
                  }
              }
            hasSrcSet && setProp(domElement, tag, "srcSet", props.srcSet, props, null), hasSrc && setProp(domElement, tag, "src", props.src, props, null);
            return;
          case "input":
            listenToNonDelegatedEvent("invalid", domElement);
            var defaultValue = propKey = propValue = hasSrcSet = null, checked = null, defaultChecked = null;
            for (hasSrc in props)
              if (props.hasOwnProperty(hasSrc)) {
                var propValue$184 = props[hasSrc];
                if (propValue$184 != null)
                  switch (hasSrc) {
                    case "name":
                      hasSrcSet = propValue$184;
                      break;
                    case "type":
                      propValue = propValue$184;
                      break;
                    case "checked":
                      checked = propValue$184;
                      break;
                    case "defaultChecked":
                      defaultChecked = propValue$184;
                      break;
                    case "value":
                      propKey = propValue$184;
                      break;
                    case "defaultValue":
                      defaultValue = propValue$184;
                      break;
                    case "children":
                    case "dangerouslySetInnerHTML":
                      if (propValue$184 != null)
                        throw Error(formatProdErrorMessage(137, tag));
                      break;
                    default:
                      setProp(domElement, tag, hasSrc, propValue$184, props, null);
                  }
              }
            initInput(
              domElement,
              propKey,
              defaultValue,
              checked,
              defaultChecked,
              propValue,
              hasSrcSet,
              !1
            );
            return;
          case "select":
            listenToNonDelegatedEvent("invalid", domElement), hasSrc = propValue = propKey = null;
            for (hasSrcSet in props)
              if (props.hasOwnProperty(hasSrcSet) && (defaultValue = props[hasSrcSet], defaultValue != null))
                switch (hasSrcSet) {
                  case "value":
                    propKey = defaultValue;
                    break;
                  case "defaultValue":
                    propValue = defaultValue;
                    break;
                  case "multiple":
                    hasSrc = defaultValue;
                  default:
                    setProp(domElement, tag, hasSrcSet, defaultValue, props, null);
                }
            tag = propKey, props = propValue, domElement.multiple = !!hasSrc, tag != null ? updateOptions(domElement, !!hasSrc, tag, !1) : props != null && updateOptions(domElement, !!hasSrc, props, !0);
            return;
          case "textarea":
            listenToNonDelegatedEvent("invalid", domElement), propKey = hasSrcSet = hasSrc = null;
            for (propValue in props)
              if (props.hasOwnProperty(propValue) && (defaultValue = props[propValue], defaultValue != null))
                switch (propValue) {
                  case "value":
                    hasSrc = defaultValue;
                    break;
                  case "defaultValue":
                    hasSrcSet = defaultValue;
                    break;
                  case "children":
                    propKey = defaultValue;
                    break;
                  case "dangerouslySetInnerHTML":
                    if (defaultValue != null) throw Error(formatProdErrorMessage(91));
                    break;
                  default:
                    setProp(domElement, tag, propValue, defaultValue, props, null);
                }
            initTextarea(domElement, hasSrc, hasSrcSet, propKey);
            return;
          case "option":
            for (checked in props)
              props.hasOwnProperty(checked) && (hasSrc = props[checked], hasSrc != null) && (checked === "selected" ? domElement.selected = hasSrc && typeof hasSrc != "function" && typeof hasSrc != "symbol" : setProp(domElement, tag, checked, hasSrc, props, null));
            return;
          case "dialog":
            listenToNonDelegatedEvent("beforetoggle", domElement), listenToNonDelegatedEvent("toggle", domElement), listenToNonDelegatedEvent("cancel", domElement), listenToNonDelegatedEvent("close", domElement);
            break;
          case "iframe":
          case "object":
            listenToNonDelegatedEvent("load", domElement);
            break;
          case "video":
          case "audio":
            for (hasSrc = 0; hasSrc < mediaEventTypes.length; hasSrc++)
              listenToNonDelegatedEvent(mediaEventTypes[hasSrc], domElement);
            break;
          case "image":
            listenToNonDelegatedEvent("error", domElement), listenToNonDelegatedEvent("load", domElement);
            break;
          case "details":
            listenToNonDelegatedEvent("toggle", domElement);
            break;
          case "embed":
          case "source":
          case "link":
            listenToNonDelegatedEvent("error", domElement), listenToNonDelegatedEvent("load", domElement);
          case "area":
          case "base":
          case "br":
          case "col":
          case "hr":
          case "keygen":
          case "meta":
          case "param":
          case "track":
          case "wbr":
          case "menuitem":
            for (defaultChecked in props)
              if (props.hasOwnProperty(defaultChecked) && (hasSrc = props[defaultChecked], hasSrc != null))
                switch (defaultChecked) {
                  case "children":
                  case "dangerouslySetInnerHTML":
                    throw Error(formatProdErrorMessage(137, tag));
                  default:
                    setProp(domElement, tag, defaultChecked, hasSrc, props, null);
                }
            return;
          default:
            if (isCustomElement(tag)) {
              for (propValue$184 in props)
                props.hasOwnProperty(propValue$184) && (hasSrc = props[propValue$184], hasSrc !== void 0 && setPropOnCustomElement(
                  domElement,
                  tag,
                  propValue$184,
                  hasSrc,
                  props,
                  void 0
                ));
              return;
            }
        }
        for (defaultValue in props)
          props.hasOwnProperty(defaultValue) && (hasSrc = props[defaultValue], hasSrc != null && setProp(domElement, tag, defaultValue, hasSrc, props, null));
      }
      function updateProperties(domElement, tag, lastProps, nextProps) {
        switch (tag) {
          case "div":
          case "span":
          case "svg":
          case "path":
          case "a":
          case "g":
          case "p":
          case "li":
            break;
          case "input":
            var name = null, type = null, value = null, defaultValue = null, lastDefaultValue = null, checked = null, defaultChecked = null;
            for (propKey in lastProps) {
              var lastProp = lastProps[propKey];
              if (lastProps.hasOwnProperty(propKey) && lastProp != null)
                switch (propKey) {
                  case "checked":
                    break;
                  case "value":
                    break;
                  case "defaultValue":
                    lastDefaultValue = lastProp;
                  default:
                    nextProps.hasOwnProperty(propKey) || setProp(domElement, tag, propKey, null, nextProps, lastProp);
                }
            }
            for (var propKey$201 in nextProps) {
              var propKey = nextProps[propKey$201];
              if (lastProp = lastProps[propKey$201], nextProps.hasOwnProperty(propKey$201) && (propKey != null || lastProp != null))
                switch (propKey$201) {
                  case "type":
                    type = propKey;
                    break;
                  case "name":
                    name = propKey;
                    break;
                  case "checked":
                    checked = propKey;
                    break;
                  case "defaultChecked":
                    defaultChecked = propKey;
                    break;
                  case "value":
                    value = propKey;
                    break;
                  case "defaultValue":
                    defaultValue = propKey;
                    break;
                  case "children":
                  case "dangerouslySetInnerHTML":
                    if (propKey != null)
                      throw Error(formatProdErrorMessage(137, tag));
                    break;
                  default:
                    propKey !== lastProp && setProp(
                      domElement,
                      tag,
                      propKey$201,
                      propKey,
                      nextProps,
                      lastProp
                    );
                }
            }
            updateInput(
              domElement,
              value,
              defaultValue,
              lastDefaultValue,
              checked,
              defaultChecked,
              type,
              name
            );
            return;
          case "select":
            propKey = value = defaultValue = propKey$201 = null;
            for (type in lastProps)
              if (lastDefaultValue = lastProps[type], lastProps.hasOwnProperty(type) && lastDefaultValue != null)
                switch (type) {
                  case "value":
                    break;
                  case "multiple":
                    propKey = lastDefaultValue;
                  default:
                    nextProps.hasOwnProperty(type) || setProp(
                      domElement,
                      tag,
                      type,
                      null,
                      nextProps,
                      lastDefaultValue
                    );
                }
            for (name in nextProps)
              if (type = nextProps[name], lastDefaultValue = lastProps[name], nextProps.hasOwnProperty(name) && (type != null || lastDefaultValue != null))
                switch (name) {
                  case "value":
                    propKey$201 = type;
                    break;
                  case "defaultValue":
                    defaultValue = type;
                    break;
                  case "multiple":
                    value = type;
                  default:
                    type !== lastDefaultValue && setProp(
                      domElement,
                      tag,
                      name,
                      type,
                      nextProps,
                      lastDefaultValue
                    );
                }
            tag = defaultValue, lastProps = value, nextProps = propKey, propKey$201 != null ? updateOptions(domElement, !!lastProps, propKey$201, !1) : !!nextProps != !!lastProps && (tag != null ? updateOptions(domElement, !!lastProps, tag, !0) : updateOptions(domElement, !!lastProps, lastProps ? [] : "", !1));
            return;
          case "textarea":
            propKey = propKey$201 = null;
            for (defaultValue in lastProps)
              if (name = lastProps[defaultValue], lastProps.hasOwnProperty(defaultValue) && name != null && !nextProps.hasOwnProperty(defaultValue))
                switch (defaultValue) {
                  case "value":
                    break;
                  case "children":
                    break;
                  default:
                    setProp(domElement, tag, defaultValue, null, nextProps, name);
                }
            for (value in nextProps)
              if (name = nextProps[value], type = lastProps[value], nextProps.hasOwnProperty(value) && (name != null || type != null))
                switch (value) {
                  case "value":
                    propKey$201 = name;
                    break;
                  case "defaultValue":
                    propKey = name;
                    break;
                  case "children":
                    break;
                  case "dangerouslySetInnerHTML":
                    if (name != null) throw Error(formatProdErrorMessage(91));
                    break;
                  default:
                    name !== type && setProp(domElement, tag, value, name, nextProps, type);
                }
            updateTextarea(domElement, propKey$201, propKey);
            return;
          case "option":
            for (var propKey$217 in lastProps)
              propKey$201 = lastProps[propKey$217], lastProps.hasOwnProperty(propKey$217) && propKey$201 != null && !nextProps.hasOwnProperty(propKey$217) && (propKey$217 === "selected" ? domElement.selected = !1 : setProp(
                domElement,
                tag,
                propKey$217,
                null,
                nextProps,
                propKey$201
              ));
            for (lastDefaultValue in nextProps)
              propKey$201 = nextProps[lastDefaultValue], propKey = lastProps[lastDefaultValue], nextProps.hasOwnProperty(lastDefaultValue) && propKey$201 !== propKey && (propKey$201 != null || propKey != null) && (lastDefaultValue === "selected" ? domElement.selected = propKey$201 && typeof propKey$201 != "function" && typeof propKey$201 != "symbol" : setProp(
                domElement,
                tag,
                lastDefaultValue,
                propKey$201,
                nextProps,
                propKey
              ));
            return;
          case "img":
          case "link":
          case "area":
          case "base":
          case "br":
          case "col":
          case "embed":
          case "hr":
          case "keygen":
          case "meta":
          case "param":
          case "source":
          case "track":
          case "wbr":
          case "menuitem":
            for (var propKey$222 in lastProps)
              propKey$201 = lastProps[propKey$222], lastProps.hasOwnProperty(propKey$222) && propKey$201 != null && !nextProps.hasOwnProperty(propKey$222) && setProp(domElement, tag, propKey$222, null, nextProps, propKey$201);
            for (checked in nextProps)
              if (propKey$201 = nextProps[checked], propKey = lastProps[checked], nextProps.hasOwnProperty(checked) && propKey$201 !== propKey && (propKey$201 != null || propKey != null))
                switch (checked) {
                  case "children":
                  case "dangerouslySetInnerHTML":
                    if (propKey$201 != null)
                      throw Error(formatProdErrorMessage(137, tag));
                    break;
                  default:
                    setProp(
                      domElement,
                      tag,
                      checked,
                      propKey$201,
                      nextProps,
                      propKey
                    );
                }
            return;
          default:
            if (isCustomElement(tag)) {
              for (var propKey$227 in lastProps)
                propKey$201 = lastProps[propKey$227], lastProps.hasOwnProperty(propKey$227) && propKey$201 !== void 0 && !nextProps.hasOwnProperty(propKey$227) && setPropOnCustomElement(
                  domElement,
                  tag,
                  propKey$227,
                  void 0,
                  nextProps,
                  propKey$201
                );
              for (defaultChecked in nextProps)
                propKey$201 = nextProps[defaultChecked], propKey = lastProps[defaultChecked], !nextProps.hasOwnProperty(defaultChecked) || propKey$201 === propKey || propKey$201 === void 0 && propKey === void 0 || setPropOnCustomElement(
                  domElement,
                  tag,
                  defaultChecked,
                  propKey$201,
                  nextProps,
                  propKey
                );
              return;
            }
        }
        for (var propKey$232 in lastProps)
          propKey$201 = lastProps[propKey$232], lastProps.hasOwnProperty(propKey$232) && propKey$201 != null && !nextProps.hasOwnProperty(propKey$232) && setProp(domElement, tag, propKey$232, null, nextProps, propKey$201);
        for (lastProp in nextProps)
          propKey$201 = nextProps[lastProp], propKey = lastProps[lastProp], !nextProps.hasOwnProperty(lastProp) || propKey$201 === propKey || propKey$201 == null && propKey == null || setProp(domElement, tag, lastProp, propKey$201, nextProps, propKey);
      }
      function isLikelyStaticResource(initiatorType) {
        switch (initiatorType) {
          case "css":
          case "script":
          case "font":
          case "img":
          case "image":
          case "input":
          case "link":
            return !0;
          default:
            return !1;
        }
      }
      function estimateBandwidth() {
        if (typeof performance.getEntriesByType == "function") {
          for (var count = 0, bits = 0, resourceEntries = performance.getEntriesByType("resource"), i = 0; i < resourceEntries.length; i++) {
            var entry = resourceEntries[i], transferSize = entry.transferSize, initiatorType = entry.initiatorType, duration = entry.duration;
            if (transferSize && duration && isLikelyStaticResource(initiatorType)) {
              for (initiatorType = 0, duration = entry.responseEnd, i += 1; i < resourceEntries.length; i++) {
                var overlapEntry = resourceEntries[i], overlapStartTime = overlapEntry.startTime;
                if (overlapStartTime > duration) break;
                var overlapTransferSize = overlapEntry.transferSize, overlapInitiatorType = overlapEntry.initiatorType;
                overlapTransferSize && isLikelyStaticResource(overlapInitiatorType) && (overlapEntry = overlapEntry.responseEnd, initiatorType += overlapTransferSize * (overlapEntry < duration ? 1 : (duration - overlapStartTime) / (overlapEntry - overlapStartTime)));
              }
              if (--i, bits += 8 * (transferSize + initiatorType) / (entry.duration / 1e3), count++, 10 < count) break;
            }
          }
          if (0 < count) return bits / count / 1e6;
        }
        return navigator.connection && (count = navigator.connection.downlink, typeof count == "number") ? count : 5;
      }
      var eventsEnabled = null, selectionInformation = null;
      function getOwnerDocumentFromRootContainer(rootContainerElement) {
        return rootContainerElement.nodeType === 9 ? rootContainerElement : rootContainerElement.ownerDocument;
      }
      function getOwnHostContext(namespaceURI) {
        switch (namespaceURI) {
          case "http://www.w3.org/2000/svg":
            return 1;
          case "http://www.w3.org/1998/Math/MathML":
            return 2;
          default:
            return 0;
        }
      }
      function getChildHostContextProd(parentNamespace, type) {
        if (parentNamespace === 0)
          switch (type) {
            case "svg":
              return 1;
            case "math":
              return 2;
            default:
              return 0;
          }
        return parentNamespace === 1 && type === "foreignObject" ? 0 : parentNamespace;
      }
      function shouldSetTextContent(type, props) {
        return type === "textarea" || type === "noscript" || typeof props.children == "string" || typeof props.children == "number" || typeof props.children == "bigint" || typeof props.dangerouslySetInnerHTML == "object" && props.dangerouslySetInnerHTML !== null && props.dangerouslySetInnerHTML.__html != null;
      }
      var currentPopstateTransitionEvent = null;
      function shouldAttemptEagerTransition() {
        var event = window.event;
        return event && event.type === "popstate" ? event === currentPopstateTransitionEvent ? !1 : (currentPopstateTransitionEvent = event, !0) : (currentPopstateTransitionEvent = null, !1);
      }
      var scheduleTimeout = typeof setTimeout == "function" ? setTimeout : void 0, cancelTimeout = typeof clearTimeout == "function" ? clearTimeout : void 0, localPromise = typeof Promise == "function" ? Promise : void 0, scheduleMicrotask = typeof queueMicrotask == "function" ? queueMicrotask : typeof localPromise < "u" ? function(callback) {
        return localPromise.resolve(null).then(callback).catch(handleErrorInNextTick);
      } : scheduleTimeout;
      function handleErrorInNextTick(error) {
        setTimeout(function() {
          throw error;
        });
      }
      function isSingletonScope(type) {
        return type === "head";
      }
      function clearHydrationBoundary(parentInstance, hydrationInstance) {
        var node = hydrationInstance, depth = 0;
        do {
          var nextNode = node.nextSibling;
          if (parentInstance.removeChild(node), nextNode && nextNode.nodeType === 8)
            if (node = nextNode.data, node === "/$" || node === "/&") {
              if (depth === 0) {
                parentInstance.removeChild(nextNode), retryIfBlockedOn(hydrationInstance);
                return;
              }
              depth--;
            } else if (node === "$" || node === "$?" || node === "$~" || node === "$!" || node === "&")
              depth++;
            else if (node === "html")
              releaseSingletonInstance(parentInstance.ownerDocument.documentElement);
            else if (node === "head") {
              node = parentInstance.ownerDocument.head, releaseSingletonInstance(node);
              for (var node$jscomp$0 = node.firstChild; node$jscomp$0; ) {
                var nextNode$jscomp$0 = node$jscomp$0.nextSibling, nodeName = node$jscomp$0.nodeName;
                node$jscomp$0[internalHoistableMarker] || nodeName === "SCRIPT" || nodeName === "STYLE" || nodeName === "LINK" && node$jscomp$0.rel.toLowerCase() === "stylesheet" || node.removeChild(node$jscomp$0), node$jscomp$0 = nextNode$jscomp$0;
              }
            } else
              node === "body" && releaseSingletonInstance(parentInstance.ownerDocument.body);
          node = nextNode;
        } while (node);
        retryIfBlockedOn(hydrationInstance);
      }
      function hideOrUnhideDehydratedBoundary(suspenseInstance, isHidden) {
        var node = suspenseInstance;
        suspenseInstance = 0;
        do {
          var nextNode = node.nextSibling;
          if (node.nodeType === 1 ? isHidden ? (node._stashedDisplay = node.style.display, node.style.display = "none") : (node.style.display = node._stashedDisplay || "", node.getAttribute("style") === "" && node.removeAttribute("style")) : node.nodeType === 3 && (isHidden ? (node._stashedText = node.nodeValue, node.nodeValue = "") : node.nodeValue = node._stashedText || ""), nextNode && nextNode.nodeType === 8)
            if (node = nextNode.data, node === "/$") {
              if (suspenseInstance === 0) break;
              suspenseInstance--;
            } else
              node !== "$" && node !== "$?" && node !== "$~" && node !== "$!" || suspenseInstance++;
          node = nextNode;
        } while (node);
      }
      function clearContainerSparingly(container) {
        var nextNode = container.firstChild;
        for (nextNode && nextNode.nodeType === 10 && (nextNode = nextNode.nextSibling); nextNode; ) {
          var node = nextNode;
          switch (nextNode = nextNode.nextSibling, node.nodeName) {
            case "HTML":
            case "HEAD":
            case "BODY":
              clearContainerSparingly(node), detachDeletedInstance(node);
              continue;
            case "SCRIPT":
            case "STYLE":
              continue;
            case "LINK":
              if (node.rel.toLowerCase() === "stylesheet") continue;
          }
          container.removeChild(node);
        }
      }
      function canHydrateInstance(instance, type, props, inRootOrSingleton) {
        for (; instance.nodeType === 1; ) {
          var anyProps = props;
          if (instance.nodeName.toLowerCase() !== type.toLowerCase()) {
            if (!inRootOrSingleton && (instance.nodeName !== "INPUT" || instance.type !== "hidden"))
              break;
          } else if (inRootOrSingleton) {
            if (!instance[internalHoistableMarker])
              switch (type) {
                case "meta":
                  if (!instance.hasAttribute("itemprop")) break;
                  return instance;
                case "link":
                  if (name = instance.getAttribute("rel"), name === "stylesheet" && instance.hasAttribute("data-precedence"))
                    break;
                  if (name !== anyProps.rel || instance.getAttribute("href") !== (anyProps.href == null || anyProps.href === "" ? null : anyProps.href) || instance.getAttribute("crossorigin") !== (anyProps.crossOrigin == null ? null : anyProps.crossOrigin) || instance.getAttribute("title") !== (anyProps.title == null ? null : anyProps.title))
                    break;
                  return instance;
                case "style":
                  if (instance.hasAttribute("data-precedence")) break;
                  return instance;
                case "script":
                  if (name = instance.getAttribute("src"), (name !== (anyProps.src == null ? null : anyProps.src) || instance.getAttribute("type") !== (anyProps.type == null ? null : anyProps.type) || instance.getAttribute("crossorigin") !== (anyProps.crossOrigin == null ? null : anyProps.crossOrigin)) && name && instance.hasAttribute("async") && !instance.hasAttribute("itemprop"))
                    break;
                  return instance;
                default:
                  return instance;
              }
          } else if (type === "input" && instance.type === "hidden") {
            var name = anyProps.name == null ? null : "" + anyProps.name;
            if (anyProps.type === "hidden" && instance.getAttribute("name") === name)
              return instance;
          } else return instance;
          if (instance = getNextHydratable(instance.nextSibling), instance === null) break;
        }
        return null;
      }
      function canHydrateTextInstance(instance, text, inRootOrSingleton) {
        if (text === "") return null;
        for (; instance.nodeType !== 3; )
          if ((instance.nodeType !== 1 || instance.nodeName !== "INPUT" || instance.type !== "hidden") && !inRootOrSingleton || (instance = getNextHydratable(instance.nextSibling), instance === null)) return null;
        return instance;
      }
      function canHydrateHydrationBoundary(instance, inRootOrSingleton) {
        for (; instance.nodeType !== 8; )
          if ((instance.nodeType !== 1 || instance.nodeName !== "INPUT" || instance.type !== "hidden") && !inRootOrSingleton || (instance = getNextHydratable(instance.nextSibling), instance === null)) return null;
        return instance;
      }
      function isSuspenseInstancePending(instance) {
        return instance.data === "$?" || instance.data === "$~";
      }
      function isSuspenseInstanceFallback(instance) {
        return instance.data === "$!" || instance.data === "$?" && instance.ownerDocument.readyState !== "loading";
      }
      function registerSuspenseInstanceRetry(instance, callback) {
        var ownerDocument = instance.ownerDocument;
        if (instance.data === "$~") instance._reactRetry = callback;
        else if (instance.data !== "$?" || ownerDocument.readyState !== "loading")
          callback();
        else {
          var listener = function() {
            callback(), ownerDocument.removeEventListener("DOMContentLoaded", listener);
          };
          ownerDocument.addEventListener("DOMContentLoaded", listener), instance._reactRetry = listener;
        }
      }
      function getNextHydratable(node) {
        for (; node != null; node = node.nextSibling) {
          var nodeType = node.nodeType;
          if (nodeType === 1 || nodeType === 3) break;
          if (nodeType === 8) {
            if (nodeType = node.data, nodeType === "$" || nodeType === "$!" || nodeType === "$?" || nodeType === "$~" || nodeType === "&" || nodeType === "F!" || nodeType === "F")
              break;
            if (nodeType === "/$" || nodeType === "/&") return null;
          }
        }
        return node;
      }
      var previousHydratableOnEnteringScopedSingleton = null;
      function getNextHydratableInstanceAfterHydrationBoundary(hydrationInstance) {
        hydrationInstance = hydrationInstance.nextSibling;
        for (var depth = 0; hydrationInstance; ) {
          if (hydrationInstance.nodeType === 8) {
            var data = hydrationInstance.data;
            if (data === "/$" || data === "/&") {
              if (depth === 0)
                return getNextHydratable(hydrationInstance.nextSibling);
              depth--;
            } else
              data !== "$" && data !== "$!" && data !== "$?" && data !== "$~" && data !== "&" || depth++;
          }
          hydrationInstance = hydrationInstance.nextSibling;
        }
        return null;
      }
      function getParentHydrationBoundary(targetInstance) {
        targetInstance = targetInstance.previousSibling;
        for (var depth = 0; targetInstance; ) {
          if (targetInstance.nodeType === 8) {
            var data = targetInstance.data;
            if (data === "$" || data === "$!" || data === "$?" || data === "$~" || data === "&") {
              if (depth === 0) return targetInstance;
              depth--;
            } else data !== "/$" && data !== "/&" || depth++;
          }
          targetInstance = targetInstance.previousSibling;
        }
        return null;
      }
      function resolveSingletonInstance(type, props, rootContainerInstance) {
        switch (props = getOwnerDocumentFromRootContainer(rootContainerInstance), type) {
          case "html":
            if (type = props.documentElement, !type) throw Error(formatProdErrorMessage(452));
            return type;
          case "head":
            if (type = props.head, !type) throw Error(formatProdErrorMessage(453));
            return type;
          case "body":
            if (type = props.body, !type) throw Error(formatProdErrorMessage(454));
            return type;
          default:
            throw Error(formatProdErrorMessage(451));
        }
      }
      function releaseSingletonInstance(instance) {
        for (var attributes = instance.attributes; attributes.length; )
          instance.removeAttributeNode(attributes[0]);
        detachDeletedInstance(instance);
      }
      var preloadPropsMap = /* @__PURE__ */ new Map(), preconnectsSet = /* @__PURE__ */ new Set();
      function getHoistableRoot(container) {
        return typeof container.getRootNode == "function" ? container.getRootNode() : container.nodeType === 9 ? container : container.ownerDocument;
      }
      var previousDispatcher = ReactDOMSharedInternals.d;
      ReactDOMSharedInternals.d = {
        f: flushSyncWork,
        r: requestFormReset,
        D: prefetchDNS,
        C: preconnect,
        L: preload,
        m: preloadModule,
        X: preinitScript,
        S: preinitStyle,
        M: preinitModuleScript
      };
      function flushSyncWork() {
        var previousWasRendering = previousDispatcher.f(), wasRendering = flushSyncWork$1();
        return previousWasRendering || wasRendering;
      }
      function requestFormReset(form) {
        var formInst = getInstanceFromNode(form);
        formInst !== null && formInst.tag === 5 && formInst.type === "form" ? requestFormReset$1(formInst) : previousDispatcher.r(form);
      }
      var globalDocument = typeof document > "u" ? null : document;
      function preconnectAs(rel, href, crossOrigin) {
        var ownerDocument = globalDocument;
        if (ownerDocument && typeof href == "string" && href) {
          var limitedEscapedHref = escapeSelectorAttributeValueInsideDoubleQuotes(href);
          limitedEscapedHref = 'link[rel="' + rel + '"][href="' + limitedEscapedHref + '"]', typeof crossOrigin == "string" && (limitedEscapedHref += '[crossorigin="' + crossOrigin + '"]'), preconnectsSet.has(limitedEscapedHref) || (preconnectsSet.add(limitedEscapedHref), rel = { rel, crossOrigin, href }, ownerDocument.querySelector(limitedEscapedHref) === null && (href = ownerDocument.createElement("link"), setInitialProperties(href, "link", rel), markNodeAsHoistable(href), ownerDocument.head.appendChild(href)));
        }
      }
      function prefetchDNS(href) {
        previousDispatcher.D(href), preconnectAs("dns-prefetch", href, null);
      }
      function preconnect(href, crossOrigin) {
        previousDispatcher.C(href, crossOrigin), preconnectAs("preconnect", href, crossOrigin);
      }
      function preload(href, as, options2) {
        previousDispatcher.L(href, as, options2);
        var ownerDocument = globalDocument;
        if (ownerDocument && href && as) {
          var preloadSelector = 'link[rel="preload"][as="' + escapeSelectorAttributeValueInsideDoubleQuotes(as) + '"]';
          as === "image" && options2 && options2.imageSrcSet ? (preloadSelector += '[imagesrcset="' + escapeSelectorAttributeValueInsideDoubleQuotes(
            options2.imageSrcSet
          ) + '"]', typeof options2.imageSizes == "string" && (preloadSelector += '[imagesizes="' + escapeSelectorAttributeValueInsideDoubleQuotes(
            options2.imageSizes
          ) + '"]')) : preloadSelector += '[href="' + escapeSelectorAttributeValueInsideDoubleQuotes(href) + '"]';
          var key = preloadSelector;
          switch (as) {
            case "style":
              key = getStyleKey(href);
              break;
            case "script":
              key = getScriptKey(href);
          }
          preloadPropsMap.has(key) || (href = assign(
            {
              rel: "preload",
              href: as === "image" && options2 && options2.imageSrcSet ? void 0 : href,
              as
            },
            options2
          ), preloadPropsMap.set(key, href), ownerDocument.querySelector(preloadSelector) !== null || as === "style" && ownerDocument.querySelector(getStylesheetSelectorFromKey(key)) || as === "script" && ownerDocument.querySelector(getScriptSelectorFromKey(key)) || (as = ownerDocument.createElement("link"), setInitialProperties(as, "link", href), markNodeAsHoistable(as), ownerDocument.head.appendChild(as)));
        }
      }
      function preloadModule(href, options2) {
        previousDispatcher.m(href, options2);
        var ownerDocument = globalDocument;
        if (ownerDocument && href) {
          var as = options2 && typeof options2.as == "string" ? options2.as : "script", preloadSelector = 'link[rel="modulepreload"][as="' + escapeSelectorAttributeValueInsideDoubleQuotes(as) + '"][href="' + escapeSelectorAttributeValueInsideDoubleQuotes(href) + '"]', key = preloadSelector;
          switch (as) {
            case "audioworklet":
            case "paintworklet":
            case "serviceworker":
            case "sharedworker":
            case "worker":
            case "script":
              key = getScriptKey(href);
          }
          if (!preloadPropsMap.has(key) && (href = assign({ rel: "modulepreload", href }, options2), preloadPropsMap.set(key, href), ownerDocument.querySelector(preloadSelector) === null)) {
            switch (as) {
              case "audioworklet":
              case "paintworklet":
              case "serviceworker":
              case "sharedworker":
              case "worker":
              case "script":
                if (ownerDocument.querySelector(getScriptSelectorFromKey(key)))
                  return;
            }
            as = ownerDocument.createElement("link"), setInitialProperties(as, "link", href), markNodeAsHoistable(as), ownerDocument.head.appendChild(as);
          }
        }
      }
      function preinitStyle(href, precedence, options2) {
        previousDispatcher.S(href, precedence, options2);
        var ownerDocument = globalDocument;
        if (ownerDocument && href) {
          var styles = getResourcesFromRoot(ownerDocument).hoistableStyles, key = getStyleKey(href);
          precedence = precedence || "default";
          var resource = styles.get(key);
          if (!resource) {
            var state = { loading: 0, preload: null };
            if (resource = ownerDocument.querySelector(
              getStylesheetSelectorFromKey(key)
            ))
              state.loading = 5;
            else {
              href = assign(
                { rel: "stylesheet", href, "data-precedence": precedence },
                options2
              ), (options2 = preloadPropsMap.get(key)) && adoptPreloadPropsForStylesheet(href, options2);
              var link = resource = ownerDocument.createElement("link");
              markNodeAsHoistable(link), setInitialProperties(link, "link", href), link._p = new Promise(function(resolve, reject) {
                link.onload = resolve, link.onerror = reject;
              }), link.addEventListener("load", function() {
                state.loading |= 1;
              }), link.addEventListener("error", function() {
                state.loading |= 2;
              }), state.loading |= 4, insertStylesheet(resource, precedence, ownerDocument);
            }
            resource = {
              type: "stylesheet",
              instance: resource,
              count: 1,
              state
            }, styles.set(key, resource);
          }
        }
      }
      function preinitScript(src, options2) {
        previousDispatcher.X(src, options2);
        var ownerDocument = globalDocument;
        if (ownerDocument && src) {
          var scripts = getResourcesFromRoot(ownerDocument).hoistableScripts, key = getScriptKey(src), resource = scripts.get(key);
          resource || (resource = ownerDocument.querySelector(getScriptSelectorFromKey(key)), resource || (src = assign({ src, async: !0 }, options2), (options2 = preloadPropsMap.get(key)) && adoptPreloadPropsForScript(src, options2), resource = ownerDocument.createElement("script"), markNodeAsHoistable(resource), setInitialProperties(resource, "link", src), ownerDocument.head.appendChild(resource)), resource = {
            type: "script",
            instance: resource,
            count: 1,
            state: null
          }, scripts.set(key, resource));
        }
      }
      function preinitModuleScript(src, options2) {
        previousDispatcher.M(src, options2);
        var ownerDocument = globalDocument;
        if (ownerDocument && src) {
          var scripts = getResourcesFromRoot(ownerDocument).hoistableScripts, key = getScriptKey(src), resource = scripts.get(key);
          resource || (resource = ownerDocument.querySelector(getScriptSelectorFromKey(key)), resource || (src = assign({ src, async: !0, type: "module" }, options2), (options2 = preloadPropsMap.get(key)) && adoptPreloadPropsForScript(src, options2), resource = ownerDocument.createElement("script"), markNodeAsHoistable(resource), setInitialProperties(resource, "link", src), ownerDocument.head.appendChild(resource)), resource = {
            type: "script",
            instance: resource,
            count: 1,
            state: null
          }, scripts.set(key, resource));
        }
      }
      function getResource(type, currentProps, pendingProps, currentResource) {
        var JSCompiler_inline_result = (JSCompiler_inline_result = rootInstanceStackCursor.current) ? getHoistableRoot(JSCompiler_inline_result) : null;
        if (!JSCompiler_inline_result) throw Error(formatProdErrorMessage(446));
        switch (type) {
          case "meta":
          case "title":
            return null;
          case "style":
            return typeof pendingProps.precedence == "string" && typeof pendingProps.href == "string" ? (currentProps = getStyleKey(pendingProps.href), pendingProps = getResourcesFromRoot(
              JSCompiler_inline_result
            ).hoistableStyles, currentResource = pendingProps.get(currentProps), currentResource || (currentResource = {
              type: "style",
              instance: null,
              count: 0,
              state: null
            }, pendingProps.set(currentProps, currentResource)), currentResource) : { type: "void", instance: null, count: 0, state: null };
          case "link":
            if (pendingProps.rel === "stylesheet" && typeof pendingProps.href == "string" && typeof pendingProps.precedence == "string") {
              type = getStyleKey(pendingProps.href);
              var styles$243 = getResourcesFromRoot(
                JSCompiler_inline_result
              ).hoistableStyles, resource$244 = styles$243.get(type);
              if (resource$244 || (JSCompiler_inline_result = JSCompiler_inline_result.ownerDocument || JSCompiler_inline_result, resource$244 = {
                type: "stylesheet",
                instance: null,
                count: 0,
                state: { loading: 0, preload: null }
              }, styles$243.set(type, resource$244), (styles$243 = JSCompiler_inline_result.querySelector(
                getStylesheetSelectorFromKey(type)
              )) && !styles$243._p && (resource$244.instance = styles$243, resource$244.state.loading = 5), preloadPropsMap.has(type) || (pendingProps = {
                rel: "preload",
                as: "style",
                href: pendingProps.href,
                crossOrigin: pendingProps.crossOrigin,
                integrity: pendingProps.integrity,
                media: pendingProps.media,
                hrefLang: pendingProps.hrefLang,
                referrerPolicy: pendingProps.referrerPolicy
              }, preloadPropsMap.set(type, pendingProps), styles$243 || preloadStylesheet(
                JSCompiler_inline_result,
                type,
                pendingProps,
                resource$244.state
              ))), currentProps && currentResource === null)
                throw Error(formatProdErrorMessage(528, ""));
              return resource$244;
            }
            if (currentProps && currentResource !== null)
              throw Error(formatProdErrorMessage(529, ""));
            return null;
          case "script":
            return currentProps = pendingProps.async, pendingProps = pendingProps.src, typeof pendingProps == "string" && currentProps && typeof currentProps != "function" && typeof currentProps != "symbol" ? (currentProps = getScriptKey(pendingProps), pendingProps = getResourcesFromRoot(
              JSCompiler_inline_result
            ).hoistableScripts, currentResource = pendingProps.get(currentProps), currentResource || (currentResource = {
              type: "script",
              instance: null,
              count: 0,
              state: null
            }, pendingProps.set(currentProps, currentResource)), currentResource) : { type: "void", instance: null, count: 0, state: null };
          default:
            throw Error(formatProdErrorMessage(444, type));
        }
      }
      function getStyleKey(href) {
        return 'href="' + escapeSelectorAttributeValueInsideDoubleQuotes(href) + '"';
      }
      function getStylesheetSelectorFromKey(key) {
        return 'link[rel="stylesheet"][' + key + "]";
      }
      function stylesheetPropsFromRawProps(rawProps) {
        return assign({}, rawProps, {
          "data-precedence": rawProps.precedence,
          precedence: null
        });
      }
      function preloadStylesheet(ownerDocument, key, preloadProps, state) {
        ownerDocument.querySelector('link[rel="preload"][as="style"][' + key + "]") ? state.loading = 1 : (key = ownerDocument.createElement("link"), state.preload = key, key.addEventListener("load", function() {
          return state.loading |= 1;
        }), key.addEventListener("error", function() {
          return state.loading |= 2;
        }), setInitialProperties(key, "link", preloadProps), markNodeAsHoistable(key), ownerDocument.head.appendChild(key));
      }
      function getScriptKey(src) {
        return '[src="' + escapeSelectorAttributeValueInsideDoubleQuotes(src) + '"]';
      }
      function getScriptSelectorFromKey(key) {
        return "script[async]" + key;
      }
      function acquireResource(hoistableRoot, resource, props) {
        if (resource.count++, resource.instance === null)
          switch (resource.type) {
            case "style":
              var instance = hoistableRoot.querySelector(
                'style[data-href~="' + escapeSelectorAttributeValueInsideDoubleQuotes(props.href) + '"]'
              );
              if (instance)
                return resource.instance = instance, markNodeAsHoistable(instance), instance;
              var styleProps = assign({}, props, {
                "data-href": props.href,
                "data-precedence": props.precedence,
                href: null,
                precedence: null
              });
              return instance = (hoistableRoot.ownerDocument || hoistableRoot).createElement(
                "style"
              ), markNodeAsHoistable(instance), setInitialProperties(instance, "style", styleProps), insertStylesheet(instance, props.precedence, hoistableRoot), resource.instance = instance;
            case "stylesheet":
              styleProps = getStyleKey(props.href);
              var instance$249 = hoistableRoot.querySelector(
                getStylesheetSelectorFromKey(styleProps)
              );
              if (instance$249)
                return resource.state.loading |= 4, resource.instance = instance$249, markNodeAsHoistable(instance$249), instance$249;
              instance = stylesheetPropsFromRawProps(props), (styleProps = preloadPropsMap.get(styleProps)) && adoptPreloadPropsForStylesheet(instance, styleProps), instance$249 = (hoistableRoot.ownerDocument || hoistableRoot).createElement("link"), markNodeAsHoistable(instance$249);
              var linkInstance = instance$249;
              return linkInstance._p = new Promise(function(resolve, reject) {
                linkInstance.onload = resolve, linkInstance.onerror = reject;
              }), setInitialProperties(instance$249, "link", instance), resource.state.loading |= 4, insertStylesheet(instance$249, props.precedence, hoistableRoot), resource.instance = instance$249;
            case "script":
              return instance$249 = getScriptKey(props.src), (styleProps = hoistableRoot.querySelector(
                getScriptSelectorFromKey(instance$249)
              )) ? (resource.instance = styleProps, markNodeAsHoistable(styleProps), styleProps) : (instance = props, (styleProps = preloadPropsMap.get(instance$249)) && (instance = assign({}, props), adoptPreloadPropsForScript(instance, styleProps)), hoistableRoot = hoistableRoot.ownerDocument || hoistableRoot, styleProps = hoistableRoot.createElement("script"), markNodeAsHoistable(styleProps), setInitialProperties(styleProps, "link", instance), hoistableRoot.head.appendChild(styleProps), resource.instance = styleProps);
            case "void":
              return null;
            default:
              throw Error(formatProdErrorMessage(443, resource.type));
          }
        else
          resource.type === "stylesheet" && (resource.state.loading & 4) === 0 && (instance = resource.instance, resource.state.loading |= 4, insertStylesheet(instance, props.precedence, hoistableRoot));
        return resource.instance;
      }
      function insertStylesheet(instance, precedence, root2) {
        for (var nodes = root2.querySelectorAll(
          'link[rel="stylesheet"][data-precedence],style[data-precedence]'
        ), last = nodes.length ? nodes[nodes.length - 1] : null, prior = last, i = 0; i < nodes.length; i++) {
          var node = nodes[i];
          if (node.dataset.precedence === precedence) prior = node;
          else if (prior !== last) break;
        }
        prior ? prior.parentNode.insertBefore(instance, prior.nextSibling) : (precedence = root2.nodeType === 9 ? root2.head : root2, precedence.insertBefore(instance, precedence.firstChild));
      }
      function adoptPreloadPropsForStylesheet(stylesheetProps, preloadProps) {
        stylesheetProps.crossOrigin == null && (stylesheetProps.crossOrigin = preloadProps.crossOrigin), stylesheetProps.referrerPolicy == null && (stylesheetProps.referrerPolicy = preloadProps.referrerPolicy), stylesheetProps.title == null && (stylesheetProps.title = preloadProps.title);
      }
      function adoptPreloadPropsForScript(scriptProps, preloadProps) {
        scriptProps.crossOrigin == null && (scriptProps.crossOrigin = preloadProps.crossOrigin), scriptProps.referrerPolicy == null && (scriptProps.referrerPolicy = preloadProps.referrerPolicy), scriptProps.integrity == null && (scriptProps.integrity = preloadProps.integrity);
      }
      var tagCaches = null;
      function getHydratableHoistableCache(type, keyAttribute, ownerDocument) {
        if (tagCaches === null) {
          var cache = /* @__PURE__ */ new Map(), caches = tagCaches = /* @__PURE__ */ new Map();
          caches.set(ownerDocument, cache);
        } else
          caches = tagCaches, cache = caches.get(ownerDocument), cache || (cache = /* @__PURE__ */ new Map(), caches.set(ownerDocument, cache));
        if (cache.has(type)) return cache;
        for (cache.set(type, null), ownerDocument = ownerDocument.getElementsByTagName(type), caches = 0; caches < ownerDocument.length; caches++) {
          var node = ownerDocument[caches];
          if (!(node[internalHoistableMarker] || node[internalInstanceKey] || type === "link" && node.getAttribute("rel") === "stylesheet") && node.namespaceURI !== "http://www.w3.org/2000/svg") {
            var nodeKey = node.getAttribute(keyAttribute) || "";
            nodeKey = type + nodeKey;
            var existing = cache.get(nodeKey);
            existing ? existing.push(node) : cache.set(nodeKey, [node]);
          }
        }
        return cache;
      }
      function mountHoistable(hoistableRoot, type, instance) {
        hoistableRoot = hoistableRoot.ownerDocument || hoistableRoot, hoistableRoot.head.insertBefore(
          instance,
          type === "title" ? hoistableRoot.querySelector("head > title") : null
        );
      }
      function isHostHoistableType(type, props, hostContext) {
        if (hostContext === 1 || props.itemProp != null) return !1;
        switch (type) {
          case "meta":
          case "title":
            return !0;
          case "style":
            if (typeof props.precedence != "string" || typeof props.href != "string" || props.href === "")
              break;
            return !0;
          case "link":
            if (typeof props.rel != "string" || typeof props.href != "string" || props.href === "" || props.onLoad || props.onError)
              break;
            return props.rel === "stylesheet" ? (type = props.disabled, typeof props.precedence == "string" && type == null) : !0;
          case "script":
            if (props.async && typeof props.async != "function" && typeof props.async != "symbol" && !props.onLoad && !props.onError && props.src && typeof props.src == "string")
              return !0;
        }
        return !1;
      }
      function preloadResource(resource) {
        return !(resource.type === "stylesheet" && (resource.state.loading & 3) === 0);
      }
      function suspendResource(state, hoistableRoot, resource, props) {
        if (resource.type === "stylesheet" && (typeof props.media != "string" || matchMedia(props.media).matches !== !1) && (resource.state.loading & 4) === 0) {
          if (resource.instance === null) {
            var key = getStyleKey(props.href), instance = hoistableRoot.querySelector(
              getStylesheetSelectorFromKey(key)
            );
            if (instance) {
              hoistableRoot = instance._p, hoistableRoot !== null && typeof hoistableRoot == "object" && typeof hoistableRoot.then == "function" && (state.count++, state = onUnsuspend.bind(state), hoistableRoot.then(state, state)), resource.state.loading |= 4, resource.instance = instance, markNodeAsHoistable(instance);
              return;
            }
            instance = hoistableRoot.ownerDocument || hoistableRoot, props = stylesheetPropsFromRawProps(props), (key = preloadPropsMap.get(key)) && adoptPreloadPropsForStylesheet(props, key), instance = instance.createElement("link"), markNodeAsHoistable(instance);
            var linkInstance = instance;
            linkInstance._p = new Promise(function(resolve, reject) {
              linkInstance.onload = resolve, linkInstance.onerror = reject;
            }), setInitialProperties(instance, "link", props), resource.instance = instance;
          }
          state.stylesheets === null && (state.stylesheets = /* @__PURE__ */ new Map()), state.stylesheets.set(resource, hoistableRoot), (hoistableRoot = resource.state.preload) && (resource.state.loading & 3) === 0 && (state.count++, resource = onUnsuspend.bind(state), hoistableRoot.addEventListener("load", resource), hoistableRoot.addEventListener("error", resource));
        }
      }
      var estimatedBytesWithinLimit = 0;
      function waitForCommitToBeReady(state, timeoutOffset) {
        return state.stylesheets && state.count === 0 && insertSuspendedStylesheets(state, state.stylesheets), 0 < state.count || 0 < state.imgCount ? function(commit) {
          var stylesheetTimer = setTimeout(function() {
            if (state.stylesheets && insertSuspendedStylesheets(state, state.stylesheets), state.unsuspend) {
              var unsuspend = state.unsuspend;
              state.unsuspend = null, unsuspend();
            }
          }, 6e4 + timeoutOffset);
          0 < state.imgBytes && estimatedBytesWithinLimit === 0 && (estimatedBytesWithinLimit = 62500 * estimateBandwidth());
          var imgTimer = setTimeout(
            function() {
              if (state.waitingForImages = !1, state.count === 0 && (state.stylesheets && insertSuspendedStylesheets(state, state.stylesheets), state.unsuspend)) {
                var unsuspend = state.unsuspend;
                state.unsuspend = null, unsuspend();
              }
            },
            (state.imgBytes > estimatedBytesWithinLimit ? 50 : 800) + timeoutOffset
          );
          return state.unsuspend = commit, function() {
            state.unsuspend = null, clearTimeout(stylesheetTimer), clearTimeout(imgTimer);
          };
        } : null;
      }
      function onUnsuspend() {
        if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
          if (this.stylesheets) insertSuspendedStylesheets(this, this.stylesheets);
          else if (this.unsuspend) {
            var unsuspend = this.unsuspend;
            this.unsuspend = null, unsuspend();
          }
        }
      }
      var precedencesByRoot = null;
      function insertSuspendedStylesheets(state, resources) {
        state.stylesheets = null, state.unsuspend !== null && (state.count++, precedencesByRoot = /* @__PURE__ */ new Map(), resources.forEach(insertStylesheetIntoRoot, state), precedencesByRoot = null, onUnsuspend.call(state));
      }
      function insertStylesheetIntoRoot(root2, resource) {
        if (!(resource.state.loading & 4)) {
          var precedences = precedencesByRoot.get(root2);
          if (precedences) var last = precedences.get(null);
          else {
            precedences = /* @__PURE__ */ new Map(), precedencesByRoot.set(root2, precedences);
            for (var nodes = root2.querySelectorAll(
              "link[data-precedence],style[data-precedence]"
            ), i = 0; i < nodes.length; i++) {
              var node = nodes[i];
              (node.nodeName === "LINK" || node.getAttribute("media") !== "not all") && (precedences.set(node.dataset.precedence, node), last = node);
            }
            last && precedences.set(null, last);
          }
          nodes = resource.instance, node = nodes.getAttribute("data-precedence"), i = precedences.get(node) || last, i === last && precedences.set(null, nodes), precedences.set(node, nodes), this.count++, last = onUnsuspend.bind(this), nodes.addEventListener("load", last), nodes.addEventListener("error", last), i ? i.parentNode.insertBefore(nodes, i.nextSibling) : (root2 = root2.nodeType === 9 ? root2.head : root2, root2.insertBefore(nodes, root2.firstChild)), resource.state.loading |= 4;
        }
      }
      var HostTransitionContext = {
        $$typeof: REACT_CONTEXT_TYPE,
        Provider: null,
        Consumer: null,
        _currentValue: sharedNotPendingObject,
        _currentValue2: sharedNotPendingObject,
        _threadCount: 0
      };
      function FiberRootNode(containerInfo, tag, hydrate, identifierPrefix, onUncaughtError, onCaughtError, onRecoverableError, onDefaultTransitionIndicator, formState) {
        this.tag = 1, this.containerInfo = containerInfo, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = createLaneMap(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = createLaneMap(0), this.hiddenUpdates = createLaneMap(null), this.identifierPrefix = identifierPrefix, this.onUncaughtError = onUncaughtError, this.onCaughtError = onCaughtError, this.onRecoverableError = onRecoverableError, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = formState, this.incompleteTransitions = /* @__PURE__ */ new Map();
      }
      function createFiberRoot(containerInfo, tag, hydrate, initialChildren, hydrationCallbacks, isStrictMode, identifierPrefix, formState, onUncaughtError, onCaughtError, onRecoverableError, onDefaultTransitionIndicator) {
        return containerInfo = new FiberRootNode(
          containerInfo,
          tag,
          hydrate,
          identifierPrefix,
          onUncaughtError,
          onCaughtError,
          onRecoverableError,
          onDefaultTransitionIndicator,
          formState
        ), tag = 1, isStrictMode === !0 && (tag |= 24), isStrictMode = createFiberImplClass(3, null, null, tag), containerInfo.current = isStrictMode, isStrictMode.stateNode = containerInfo, tag = createCache(), tag.refCount++, containerInfo.pooledCache = tag, tag.refCount++, isStrictMode.memoizedState = {
          element: initialChildren,
          isDehydrated: hydrate,
          cache: tag
        }, initializeUpdateQueue(isStrictMode), containerInfo;
      }
      function getContextForSubtree(parentComponent) {
        return parentComponent ? (parentComponent = emptyContextObject, parentComponent) : emptyContextObject;
      }
      function updateContainerImpl(rootFiber, lane, element, container, parentComponent, callback) {
        parentComponent = getContextForSubtree(parentComponent), container.context === null ? container.context = parentComponent : container.pendingContext = parentComponent, container = createUpdate(lane), container.payload = { element }, callback = callback === void 0 ? null : callback, callback !== null && (container.callback = callback), element = enqueueUpdate(rootFiber, container, lane), element !== null && (scheduleUpdateOnFiber(element, rootFiber, lane), entangleTransitions(element, rootFiber, lane));
      }
      function markRetryLaneImpl(fiber, retryLane) {
        if (fiber = fiber.memoizedState, fiber !== null && fiber.dehydrated !== null) {
          var a = fiber.retryLane;
          fiber.retryLane = a !== 0 && a < retryLane ? a : retryLane;
        }
      }
      function markRetryLaneIfNotHydrated(fiber, retryLane) {
        markRetryLaneImpl(fiber, retryLane), (fiber = fiber.alternate) && markRetryLaneImpl(fiber, retryLane);
      }
      function attemptContinuousHydration(fiber) {
        if (fiber.tag === 13 || fiber.tag === 31) {
          var root2 = enqueueConcurrentRenderForLane(fiber, 67108864);
          root2 !== null && scheduleUpdateOnFiber(root2, fiber, 67108864), markRetryLaneIfNotHydrated(fiber, 67108864);
        }
      }
      function attemptHydrationAtCurrentPriority(fiber) {
        if (fiber.tag === 13 || fiber.tag === 31) {
          var lane = requestUpdateLane();
          lane = getBumpedLaneForHydrationByLane(lane);
          var root2 = enqueueConcurrentRenderForLane(fiber, lane);
          root2 !== null && scheduleUpdateOnFiber(root2, fiber, lane), markRetryLaneIfNotHydrated(fiber, lane);
        }
      }
      var _enabled = !0;
      function dispatchDiscreteEvent(domEventName, eventSystemFlags, container, nativeEvent) {
        var prevTransition = ReactSharedInternals.T;
        ReactSharedInternals.T = null;
        var previousPriority = ReactDOMSharedInternals.p;
        try {
          ReactDOMSharedInternals.p = 2, dispatchEvent(domEventName, eventSystemFlags, container, nativeEvent);
        } finally {
          ReactDOMSharedInternals.p = previousPriority, ReactSharedInternals.T = prevTransition;
        }
      }
      function dispatchContinuousEvent(domEventName, eventSystemFlags, container, nativeEvent) {
        var prevTransition = ReactSharedInternals.T;
        ReactSharedInternals.T = null;
        var previousPriority = ReactDOMSharedInternals.p;
        try {
          ReactDOMSharedInternals.p = 8, dispatchEvent(domEventName, eventSystemFlags, container, nativeEvent);
        } finally {
          ReactDOMSharedInternals.p = previousPriority, ReactSharedInternals.T = prevTransition;
        }
      }
      function dispatchEvent(domEventName, eventSystemFlags, targetContainer, nativeEvent) {
        if (_enabled) {
          var blockedOn = findInstanceBlockingEvent(nativeEvent);
          if (blockedOn === null)
            dispatchEventForPluginEventSystem(
              domEventName,
              eventSystemFlags,
              nativeEvent,
              return_targetInst,
              targetContainer
            ), clearIfContinuousEvent(domEventName, nativeEvent);
          else if (queueIfContinuousEvent(
            blockedOn,
            domEventName,
            eventSystemFlags,
            targetContainer,
            nativeEvent
          ))
            nativeEvent.stopPropagation();
          else if (clearIfContinuousEvent(domEventName, nativeEvent), eventSystemFlags & 4 && -1 < discreteReplayableEvents.indexOf(domEventName)) {
            for (; blockedOn !== null; ) {
              var fiber = getInstanceFromNode(blockedOn);
              if (fiber !== null)
                switch (fiber.tag) {
                  case 3:
                    if (fiber = fiber.stateNode, fiber.current.memoizedState.isDehydrated) {
                      var lanes = getHighestPriorityLanes(fiber.pendingLanes);
                      if (lanes !== 0) {
                        var root2 = fiber;
                        for (root2.pendingLanes |= 2, root2.entangledLanes |= 2; lanes; ) {
                          var lane = 1 << 31 - clz32(lanes);
                          root2.entanglements[1] |= lane, lanes &= ~lane;
                        }
                        ensureRootIsScheduled(fiber), (executionContext & 6) === 0 && (workInProgressRootRenderTargetTime = now() + 500, flushSyncWorkAcrossRoots_impl(0, !1));
                      }
                    }
                    break;
                  case 31:
                  case 13:
                    root2 = enqueueConcurrentRenderForLane(fiber, 2), root2 !== null && scheduleUpdateOnFiber(root2, fiber, 2), flushSyncWork$1(), markRetryLaneIfNotHydrated(fiber, 2);
                }
              if (fiber = findInstanceBlockingEvent(nativeEvent), fiber === null && dispatchEventForPluginEventSystem(
                domEventName,
                eventSystemFlags,
                nativeEvent,
                return_targetInst,
                targetContainer
              ), fiber === blockedOn) break;
              blockedOn = fiber;
            }
            blockedOn !== null && nativeEvent.stopPropagation();
          } else
            dispatchEventForPluginEventSystem(
              domEventName,
              eventSystemFlags,
              nativeEvent,
              null,
              targetContainer
            );
        }
      }
      function findInstanceBlockingEvent(nativeEvent) {
        return nativeEvent = getEventTarget(nativeEvent), findInstanceBlockingTarget(nativeEvent);
      }
      var return_targetInst = null;
      function findInstanceBlockingTarget(targetNode) {
        if (return_targetInst = null, targetNode = getClosestInstanceFromNode(targetNode), targetNode !== null) {
          var nearestMounted = getNearestMountedFiber(targetNode);
          if (nearestMounted === null) targetNode = null;
          else {
            var tag = nearestMounted.tag;
            if (tag === 13) {
              if (targetNode = getSuspenseInstanceFromFiber(nearestMounted), targetNode !== null) return targetNode;
              targetNode = null;
            } else if (tag === 31) {
              if (targetNode = getActivityInstanceFromFiber(nearestMounted), targetNode !== null) return targetNode;
              targetNode = null;
            } else if (tag === 3) {
              if (nearestMounted.stateNode.current.memoizedState.isDehydrated)
                return nearestMounted.tag === 3 ? nearestMounted.stateNode.containerInfo : null;
              targetNode = null;
            } else nearestMounted !== targetNode && (targetNode = null);
          }
        }
        return return_targetInst = targetNode, null;
      }
      function getEventPriority(domEventName) {
        switch (domEventName) {
          case "beforetoggle":
          case "cancel":
          case "click":
          case "close":
          case "contextmenu":
          case "copy":
          case "cut":
          case "auxclick":
          case "dblclick":
          case "dragend":
          case "dragstart":
          case "drop":
          case "focusin":
          case "focusout":
          case "input":
          case "invalid":
          case "keydown":
          case "keypress":
          case "keyup":
          case "mousedown":
          case "mouseup":
          case "paste":
          case "pause":
          case "play":
          case "pointercancel":
          case "pointerdown":
          case "pointerup":
          case "ratechange":
          case "reset":
          case "resize":
          case "seeked":
          case "submit":
          case "toggle":
          case "touchcancel":
          case "touchend":
          case "touchstart":
          case "volumechange":
          case "change":
          case "selectionchange":
          case "textInput":
          case "compositionstart":
          case "compositionend":
          case "compositionupdate":
          case "beforeblur":
          case "afterblur":
          case "beforeinput":
          case "blur":
          case "fullscreenchange":
          case "focus":
          case "hashchange":
          case "popstate":
          case "select":
          case "selectstart":
            return 2;
          case "drag":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "mousemove":
          case "mouseout":
          case "mouseover":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "scroll":
          case "touchmove":
          case "wheel":
          case "mouseenter":
          case "mouseleave":
          case "pointerenter":
          case "pointerleave":
            return 8;
          case "message":
            switch (getCurrentPriorityLevel()) {
              case ImmediatePriority:
                return 2;
              case UserBlockingPriority:
                return 8;
              case NormalPriority$1:
              case LowPriority:
                return 32;
              case IdlePriority:
                return 268435456;
              default:
                return 32;
            }
          default:
            return 32;
        }
      }
      var hasScheduledReplayAttempt = !1, queuedFocus = null, queuedDrag = null, queuedMouse = null, queuedPointers = /* @__PURE__ */ new Map(), queuedPointerCaptures = /* @__PURE__ */ new Map(), queuedExplicitHydrationTargets = [], discreteReplayableEvents = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
        " "
      );
      function clearIfContinuousEvent(domEventName, nativeEvent) {
        switch (domEventName) {
          case "focusin":
          case "focusout":
            queuedFocus = null;
            break;
          case "dragenter":
          case "dragleave":
            queuedDrag = null;
            break;
          case "mouseover":
          case "mouseout":
            queuedMouse = null;
            break;
          case "pointerover":
          case "pointerout":
            queuedPointers.delete(nativeEvent.pointerId);
            break;
          case "gotpointercapture":
          case "lostpointercapture":
            queuedPointerCaptures.delete(nativeEvent.pointerId);
        }
      }
      function accumulateOrCreateContinuousQueuedReplayableEvent(existingQueuedEvent, blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent) {
        return existingQueuedEvent === null || existingQueuedEvent.nativeEvent !== nativeEvent ? (existingQueuedEvent = {
          blockedOn,
          domEventName,
          eventSystemFlags,
          nativeEvent,
          targetContainers: [targetContainer]
        }, blockedOn !== null && (blockedOn = getInstanceFromNode(blockedOn), blockedOn !== null && attemptContinuousHydration(blockedOn)), existingQueuedEvent) : (existingQueuedEvent.eventSystemFlags |= eventSystemFlags, blockedOn = existingQueuedEvent.targetContainers, targetContainer !== null && blockedOn.indexOf(targetContainer) === -1 && blockedOn.push(targetContainer), existingQueuedEvent);
      }
      function queueIfContinuousEvent(blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent) {
        switch (domEventName) {
          case "focusin":
            return queuedFocus = accumulateOrCreateContinuousQueuedReplayableEvent(
              queuedFocus,
              blockedOn,
              domEventName,
              eventSystemFlags,
              targetContainer,
              nativeEvent
            ), !0;
          case "dragenter":
            return queuedDrag = accumulateOrCreateContinuousQueuedReplayableEvent(
              queuedDrag,
              blockedOn,
              domEventName,
              eventSystemFlags,
              targetContainer,
              nativeEvent
            ), !0;
          case "mouseover":
            return queuedMouse = accumulateOrCreateContinuousQueuedReplayableEvent(
              queuedMouse,
              blockedOn,
              domEventName,
              eventSystemFlags,
              targetContainer,
              nativeEvent
            ), !0;
          case "pointerover":
            var pointerId = nativeEvent.pointerId;
            return queuedPointers.set(
              pointerId,
              accumulateOrCreateContinuousQueuedReplayableEvent(
                queuedPointers.get(pointerId) || null,
                blockedOn,
                domEventName,
                eventSystemFlags,
                targetContainer,
                nativeEvent
              )
            ), !0;
          case "gotpointercapture":
            return pointerId = nativeEvent.pointerId, queuedPointerCaptures.set(
              pointerId,
              accumulateOrCreateContinuousQueuedReplayableEvent(
                queuedPointerCaptures.get(pointerId) || null,
                blockedOn,
                domEventName,
                eventSystemFlags,
                targetContainer,
                nativeEvent
              )
            ), !0;
        }
        return !1;
      }
      function attemptExplicitHydrationTarget(queuedTarget) {
        var targetInst = getClosestInstanceFromNode(queuedTarget.target);
        if (targetInst !== null) {
          var nearestMounted = getNearestMountedFiber(targetInst);
          if (nearestMounted !== null) {
            if (targetInst = nearestMounted.tag, targetInst === 13) {
              if (targetInst = getSuspenseInstanceFromFiber(nearestMounted), targetInst !== null) {
                queuedTarget.blockedOn = targetInst, runWithPriority(queuedTarget.priority, function() {
                  attemptHydrationAtCurrentPriority(nearestMounted);
                });
                return;
              }
            } else if (targetInst === 31) {
              if (targetInst = getActivityInstanceFromFiber(nearestMounted), targetInst !== null) {
                queuedTarget.blockedOn = targetInst, runWithPriority(queuedTarget.priority, function() {
                  attemptHydrationAtCurrentPriority(nearestMounted);
                });
                return;
              }
            } else if (targetInst === 3 && nearestMounted.stateNode.current.memoizedState.isDehydrated) {
              queuedTarget.blockedOn = nearestMounted.tag === 3 ? nearestMounted.stateNode.containerInfo : null;
              return;
            }
          }
        }
        queuedTarget.blockedOn = null;
      }
      function attemptReplayContinuousQueuedEvent(queuedEvent) {
        if (queuedEvent.blockedOn !== null) return !1;
        for (var targetContainers = queuedEvent.targetContainers; 0 < targetContainers.length; ) {
          var nextBlockedOn = findInstanceBlockingEvent(queuedEvent.nativeEvent);
          if (nextBlockedOn === null) {
            nextBlockedOn = queuedEvent.nativeEvent;
            var nativeEventClone = new nextBlockedOn.constructor(
              nextBlockedOn.type,
              nextBlockedOn
            );
            currentReplayingEvent = nativeEventClone, nextBlockedOn.target.dispatchEvent(nativeEventClone), currentReplayingEvent = null;
          } else
            return targetContainers = getInstanceFromNode(nextBlockedOn), targetContainers !== null && attemptContinuousHydration(targetContainers), queuedEvent.blockedOn = nextBlockedOn, !1;
          targetContainers.shift();
        }
        return !0;
      }
      function attemptReplayContinuousQueuedEventInMap(queuedEvent, key, map) {
        attemptReplayContinuousQueuedEvent(queuedEvent) && map.delete(key);
      }
      function replayUnblockedEvents() {
        hasScheduledReplayAttempt = !1, queuedFocus !== null && attemptReplayContinuousQueuedEvent(queuedFocus) && (queuedFocus = null), queuedDrag !== null && attemptReplayContinuousQueuedEvent(queuedDrag) && (queuedDrag = null), queuedMouse !== null && attemptReplayContinuousQueuedEvent(queuedMouse) && (queuedMouse = null), queuedPointers.forEach(attemptReplayContinuousQueuedEventInMap), queuedPointerCaptures.forEach(attemptReplayContinuousQueuedEventInMap);
      }
      function scheduleCallbackIfUnblocked(queuedEvent, unblocked) {
        queuedEvent.blockedOn === unblocked && (queuedEvent.blockedOn = null, hasScheduledReplayAttempt || (hasScheduledReplayAttempt = !0, Scheduler.unstable_scheduleCallback(
          Scheduler.unstable_NormalPriority,
          replayUnblockedEvents
        )));
      }
      var lastScheduledReplayQueue = null;
      function scheduleReplayQueueIfNeeded(formReplayingQueue) {
        lastScheduledReplayQueue !== formReplayingQueue && (lastScheduledReplayQueue = formReplayingQueue, Scheduler.unstable_scheduleCallback(
          Scheduler.unstable_NormalPriority,
          function() {
            lastScheduledReplayQueue === formReplayingQueue && (lastScheduledReplayQueue = null);
            for (var i = 0; i < formReplayingQueue.length; i += 3) {
              var form = formReplayingQueue[i], submitterOrAction = formReplayingQueue[i + 1], formData = formReplayingQueue[i + 2];
              if (typeof submitterOrAction != "function") {
                if (findInstanceBlockingTarget(submitterOrAction || form) === null)
                  continue;
                break;
              }
              var formInst = getInstanceFromNode(form);
              formInst !== null && (formReplayingQueue.splice(i, 3), i -= 3, startHostTransition(
                formInst,
                {
                  pending: !0,
                  data: formData,
                  method: form.method,
                  action: submitterOrAction
                },
                submitterOrAction,
                formData
              ));
            }
          }
        ));
      }
      function retryIfBlockedOn(unblocked) {
        function unblock(queuedEvent) {
          return scheduleCallbackIfUnblocked(queuedEvent, unblocked);
        }
        queuedFocus !== null && scheduleCallbackIfUnblocked(queuedFocus, unblocked), queuedDrag !== null && scheduleCallbackIfUnblocked(queuedDrag, unblocked), queuedMouse !== null && scheduleCallbackIfUnblocked(queuedMouse, unblocked), queuedPointers.forEach(unblock), queuedPointerCaptures.forEach(unblock);
        for (var i = 0; i < queuedExplicitHydrationTargets.length; i++) {
          var queuedTarget = queuedExplicitHydrationTargets[i];
          queuedTarget.blockedOn === unblocked && (queuedTarget.blockedOn = null);
        }
        for (; 0 < queuedExplicitHydrationTargets.length && (i = queuedExplicitHydrationTargets[0], i.blockedOn === null); )
          attemptExplicitHydrationTarget(i), i.blockedOn === null && queuedExplicitHydrationTargets.shift();
        if (i = (unblocked.ownerDocument || unblocked).$$reactFormReplay, i != null)
          for (queuedTarget = 0; queuedTarget < i.length; queuedTarget += 3) {
            var form = i[queuedTarget], submitterOrAction = i[queuedTarget + 1], formProps = form[internalPropsKey] || null;
            if (typeof submitterOrAction == "function")
              formProps || scheduleReplayQueueIfNeeded(i);
            else if (formProps) {
              var action = null;
              if (submitterOrAction && submitterOrAction.hasAttribute("formAction")) {
                if (form = submitterOrAction, formProps = submitterOrAction[internalPropsKey] || null)
                  action = formProps.formAction;
                else if (findInstanceBlockingTarget(form) !== null) continue;
              } else action = formProps.action;
              typeof action == "function" ? i[queuedTarget + 1] = action : (i.splice(queuedTarget, 3), queuedTarget -= 3), scheduleReplayQueueIfNeeded(i);
            }
          }
      }
      function defaultOnDefaultTransitionIndicator() {
        function handleNavigate(event) {
          event.canIntercept && event.info === "react-transition" && event.intercept({
            handler: function() {
              return new Promise(function(resolve) {
                return pendingResolve = resolve;
              });
            },
            focusReset: "manual",
            scroll: "manual"
          });
        }
        function handleNavigateComplete() {
          pendingResolve !== null && (pendingResolve(), pendingResolve = null), isCancelled || setTimeout(startFakeNavigation, 20);
        }
        function startFakeNavigation() {
          if (!isCancelled && !navigation.transition) {
            var currentEntry = navigation.currentEntry;
            currentEntry && currentEntry.url != null && navigation.navigate(currentEntry.url, {
              state: currentEntry.getState(),
              info: "react-transition",
              history: "replace"
            });
          }
        }
        if (typeof navigation == "object") {
          var isCancelled = !1, pendingResolve = null;
          return navigation.addEventListener("navigate", handleNavigate), navigation.addEventListener("navigatesuccess", handleNavigateComplete), navigation.addEventListener("navigateerror", handleNavigateComplete), setTimeout(startFakeNavigation, 100), function() {
            isCancelled = !0, navigation.removeEventListener("navigate", handleNavigate), navigation.removeEventListener("navigatesuccess", handleNavigateComplete), navigation.removeEventListener("navigateerror", handleNavigateComplete), pendingResolve !== null && (pendingResolve(), pendingResolve = null);
          };
        }
      }
      function ReactDOMRoot(internalRoot) {
        this._internalRoot = internalRoot;
      }
      ReactDOMHydrationRoot.prototype.render = ReactDOMRoot.prototype.render = function(children) {
        var root2 = this._internalRoot;
        if (root2 === null) throw Error(formatProdErrorMessage(409));
        var current = root2.current, lane = requestUpdateLane();
        updateContainerImpl(current, lane, children, root2, null, null);
      };
      ReactDOMHydrationRoot.prototype.unmount = ReactDOMRoot.prototype.unmount = function() {
        var root2 = this._internalRoot;
        if (root2 !== null) {
          this._internalRoot = null;
          var container = root2.containerInfo;
          updateContainerImpl(root2.current, 2, null, root2, null, null), flushSyncWork$1(), container[internalContainerInstanceKey] = null;
        }
      };
      function ReactDOMHydrationRoot(internalRoot) {
        this._internalRoot = internalRoot;
      }
      ReactDOMHydrationRoot.prototype.unstable_scheduleHydration = function(target) {
        if (target) {
          var updatePriority = resolveUpdatePriority();
          target = { blockedOn: null, target, priority: updatePriority };
          for (var i = 0; i < queuedExplicitHydrationTargets.length && updatePriority !== 0 && updatePriority < queuedExplicitHydrationTargets[i].priority; i++) ;
          queuedExplicitHydrationTargets.splice(i, 0, target), i === 0 && attemptExplicitHydrationTarget(target);
        }
      };
      var isomorphicReactPackageVersion$jscomp$inline_1840 = React28.version;
      if (isomorphicReactPackageVersion$jscomp$inline_1840 !== "19.2.8")
        throw Error(
          formatProdErrorMessage(
            527,
            isomorphicReactPackageVersion$jscomp$inline_1840,
            "19.2.8"
          )
        );
      ReactDOMSharedInternals.findDOMNode = function(componentOrElement) {
        var fiber = componentOrElement._reactInternals;
        if (fiber === void 0)
          throw typeof componentOrElement.render == "function" ? Error(formatProdErrorMessage(188)) : (componentOrElement = Object.keys(componentOrElement).join(","), Error(formatProdErrorMessage(268, componentOrElement)));
        return componentOrElement = findCurrentFiberUsingSlowPath(fiber), componentOrElement = componentOrElement !== null ? findCurrentHostFiberImpl(componentOrElement) : null, componentOrElement = componentOrElement === null ? null : componentOrElement.stateNode, componentOrElement;
      };
      var internals$jscomp$inline_2347 = {
        bundleType: 0,
        version: "19.2.8",
        rendererPackageName: "react-dom",
        currentDispatcherRef: ReactSharedInternals,
        reconcilerVersion: "19.2.8"
      };
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && (hook$jscomp$inline_2348 = __REACT_DEVTOOLS_GLOBAL_HOOK__, !hook$jscomp$inline_2348.isDisabled && hook$jscomp$inline_2348.supportsFiber))
        try {
          rendererID = hook$jscomp$inline_2348.inject(
            internals$jscomp$inline_2347
          ), injectedHook = hook$jscomp$inline_2348;
        } catch {
        }
      var hook$jscomp$inline_2348;
      exports.createRoot = function(container, options2) {
        if (!isValidContainer(container)) throw Error(formatProdErrorMessage(299));
        var isStrictMode = !1, identifierPrefix = "", onUncaughtError = defaultOnUncaughtError, onCaughtError = defaultOnCaughtError, onRecoverableError = defaultOnRecoverableError;
        return options2 != null && (options2.unstable_strictMode === !0 && (isStrictMode = !0), options2.identifierPrefix !== void 0 && (identifierPrefix = options2.identifierPrefix), options2.onUncaughtError !== void 0 && (onUncaughtError = options2.onUncaughtError), options2.onCaughtError !== void 0 && (onCaughtError = options2.onCaughtError), options2.onRecoverableError !== void 0 && (onRecoverableError = options2.onRecoverableError)), options2 = createFiberRoot(
          container,
          1,
          !1,
          null,
          null,
          isStrictMode,
          identifierPrefix,
          null,
          onUncaughtError,
          onCaughtError,
          onRecoverableError,
          defaultOnDefaultTransitionIndicator
        ), container[internalContainerInstanceKey] = options2.current, listenToAllSupportedEvents(container), new ReactDOMRoot(options2);
      };
      exports.hydrateRoot = function(container, initialChildren, options2) {
        if (!isValidContainer(container)) throw Error(formatProdErrorMessage(299));
        var isStrictMode = !1, identifierPrefix = "", onUncaughtError = defaultOnUncaughtError, onCaughtError = defaultOnCaughtError, onRecoverableError = defaultOnRecoverableError, formState = null;
        return options2 != null && (options2.unstable_strictMode === !0 && (isStrictMode = !0), options2.identifierPrefix !== void 0 && (identifierPrefix = options2.identifierPrefix), options2.onUncaughtError !== void 0 && (onUncaughtError = options2.onUncaughtError), options2.onCaughtError !== void 0 && (onCaughtError = options2.onCaughtError), options2.onRecoverableError !== void 0 && (onRecoverableError = options2.onRecoverableError), options2.formState !== void 0 && (formState = options2.formState)), initialChildren = createFiberRoot(
          container,
          1,
          !0,
          initialChildren,
          options2 ?? null,
          isStrictMode,
          identifierPrefix,
          formState,
          onUncaughtError,
          onCaughtError,
          onRecoverableError,
          defaultOnDefaultTransitionIndicator
        ), initialChildren.context = getContextForSubtree(null), options2 = initialChildren.current, isStrictMode = requestUpdateLane(), isStrictMode = getBumpedLaneForHydrationByLane(isStrictMode), identifierPrefix = createUpdate(isStrictMode), identifierPrefix.callback = null, enqueueUpdate(options2, identifierPrefix, isStrictMode), options2 = isStrictMode, initialChildren.current.lanes = options2, markRootUpdated$1(initialChildren, options2), ensureRootIsScheduled(initialChildren), container[internalContainerInstanceKey] = initialChildren.current, listenToAllSupportedEvents(container), new ReactDOMHydrationRoot(initialChildren);
      };
      exports.version = "19.2.8";
    }
  });

  // node_modules/react-dom/client.js
  var require_client = __commonJS({
    "node_modules/react-dom/client.js"(exports, module) {
      "use strict";
      function checkDCE() {
        if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
          try {
            __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
          } catch (err) {
            console.error(err);
          }
      }
      checkDCE(), module.exports = require_react_dom_client_production();
    }
  });

  // node_modules/react/cjs/react-jsx-runtime.production.js
  var require_react_jsx_runtime_production = __commonJS({
    "node_modules/react/cjs/react-jsx-runtime.production.js"(exports) {
      "use strict";
      var REACT_ELEMENT_TYPE = /* @__PURE__ */ Symbol.for("react.transitional.element"), REACT_FRAGMENT_TYPE = /* @__PURE__ */ Symbol.for("react.fragment");
      function jsxProd(type, config, maybeKey) {
        var key = null;
        if (maybeKey !== void 0 && (key = "" + maybeKey), config.key !== void 0 && (key = "" + config.key), "key" in config) {
          maybeKey = {};
          for (var propName in config)
            propName !== "key" && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        return config = maybeKey.ref, {
          $$typeof: REACT_ELEMENT_TYPE,
          type,
          key,
          ref: config !== void 0 ? config : null,
          props: maybeKey
        };
      }
      exports.Fragment = REACT_FRAGMENT_TYPE;
      exports.jsx = jsxProd;
      exports.jsxs = jsxProd;
    }
  });

  // node_modules/react/jsx-runtime.js
  var require_jsx_runtime = __commonJS({
    "node_modules/react/jsx-runtime.js"(exports, module) {
      "use strict";
      module.exports = require_react_jsx_runtime_production();
    }
  });

  // scripts/src/picker.jsx
  var React27 = __toESM(require_react()), import_client = __toESM(require_client());

  // node_modules/@date-fns/tz/tzName/index.js
  function tzName(timeZone, date, format2 = "long") {
    return new Intl.DateTimeFormat("en-US", {
      // Enforces engine to render the time. Without the option JavaScriptCore omits it.
      hour: "numeric",
      timeZone,
      timeZoneName: format2
    }).format(date).split(/\s/g).slice(2).join(" ");
  }

  // node_modules/@date-fns/tz/tzOffset/index.js
  var offsetFormatCache = {}, offsetCache = {};
  function tzOffset(timeZone, date) {
    try {
      let offsetStr = (offsetFormatCache[timeZone] ||= new Intl.DateTimeFormat("en-US", {
        timeZone,
        timeZoneName: "longOffset"
      }).format)(date).split("GMT")[1];
      return offsetStr in offsetCache ? offsetCache[offsetStr] : calcOffset(offsetStr, offsetStr.split(":"));
    } catch {
      if (timeZone in offsetCache) return offsetCache[timeZone];
      let captures = timeZone?.match(offsetRe);
      return captures ? calcOffset(timeZone, captures.slice(1)) : NaN;
    }
  }
  var offsetRe = /([+-]\d\d):?(\d\d)?/;
  function calcOffset(cacheStr, values) {
    let hours = +(values[0] || 0), minutes = +(values[1] || 0), seconds = +(values[2] || 0) / 60;
    return offsetCache[cacheStr] = hours * 60 + minutes > 0 ? hours * 60 + minutes + seconds : hours * 60 - minutes - seconds;
  }

  // node_modules/@date-fns/tz/date/mini.js
  var TZDateMini = class _TZDateMini extends Date {
    //#region static
    constructor(...args) {
      super(), args.length > 1 && typeof args[args.length - 1] == "string" && (this.timeZone = args.pop()), this.internal = /* @__PURE__ */ new Date(), isNaN(tzOffset(this.timeZone, this)) ? this.setTime(NaN) : args.length ? typeof args[0] == "number" && (args.length === 1 || args.length === 2 && typeof args[1] != "number") ? this.setTime(args[0]) : typeof args[0] == "string" ? this.setTime(+new Date(args[0])) : args[0] instanceof Date ? this.setTime(+args[0]) : (this.setTime(+new Date(...args)), adjustToSystemTZ(this, args)) : this.setTime(Date.now());
    }
    static tz(tz, ...args) {
      return args.length ? new _TZDateMini(...args, tz) : new _TZDateMini(Date.now(), tz);
    }
    //#endregion
    //#region time zone
    withTimeZone(timeZone) {
      return new _TZDateMini(+this, timeZone);
    }
    getTimezoneOffset() {
      let offset = -tzOffset(this.timeZone, this);
      return offset > 0 ? Math.floor(offset) : Math.ceil(offset);
    }
    //#endregion
    //#region time
    setTime(_time) {
      return Date.prototype.setTime.apply(this, arguments), syncToInternal(this), +this;
    }
    //#endregion
    //#region date-fns integration
    [/* @__PURE__ */ Symbol.for("constructDateFrom")](date) {
      return new _TZDateMini(+new Date(date), this.timeZone);
    }
    //#endregion
  }, re = /^(get|set)(?!UTC)/;
  Object.getOwnPropertyNames(Date.prototype).forEach((method) => {
    if (!re.test(method)) return;
    let utcMethod = method.replace(re, "$1UTC");
    TZDateMini.prototype[utcMethod] && (method.startsWith("get") ? TZDateMini.prototype[method] = function() {
      return this.internal[utcMethod]();
    } : (TZDateMini.prototype[method] = function() {
      return Date.prototype[utcMethod].apply(this.internal, arguments), syncFromInternal(this), +this;
    }, TZDateMini.prototype[utcMethod] = function() {
      return Date.prototype[utcMethod].apply(this, arguments), syncToInternal(this), +this;
    }));
  });
  function syncToInternal(date) {
    date.internal.setTime(+date), date.internal.setUTCSeconds(date.internal.getUTCSeconds() - // Round after converting minutes to seconds to avoid fractional offset
    // precision errors from historical offsets.
    Math.round(-tzOffset(date.timeZone, date) * 60));
  }
  function syncFromInternal(date) {
    Date.prototype.setFullYear.call(date, date.internal.getUTCFullYear(), date.internal.getUTCMonth(), date.internal.getUTCDate()), Date.prototype.setHours.call(date, date.internal.getUTCHours(), date.internal.getUTCMinutes(), date.internal.getUTCSeconds(), date.internal.getUTCMilliseconds()), adjustToSystemTZ(date);
  }
  function adjustToSystemTZ(date, constructorArgs) {
    let expectedInternalTime = Array.isArray(constructorArgs) ? constructorArgsToInternalTime(constructorArgs) : +date.internal, offsetWithSeconds = tzOffset(date.timeZone, date), offset = offsetWithSeconds > 0 ? Math.floor(offsetWithSeconds) : Math.ceil(offsetWithSeconds), prevHour = /* @__PURE__ */ new Date(+date);
    prevHour.setUTCHours(prevHour.getUTCHours() - 1);
    let systemOffset = -(/* @__PURE__ */ new Date(+date)).getTimezoneOffset(), prevHourSystemOffset = -(/* @__PURE__ */ new Date(+prevHour)).getTimezoneOffset(), systemDSTChange = systemOffset - prevHourSystemOffset, systemOffsetForDiff = systemOffset;
    if (systemDSTChange && systemOffset !== offset) {
      let systemHour = Date.prototype.getHours.apply(date), expectedHour = Array.isArray(constructorArgs) ? constructorArgs[3] || 0 : date.internal.getUTCHours();
      if (systemHour !== expectedHour) {
        let testDate = /* @__PURE__ */ new Date(+date), testOffsetDiff = systemOffset - offset;
        testOffsetDiff && testDate.setUTCMinutes(testDate.getUTCMinutes() + testOffsetDiff);
        let testOffsetWithSeconds = tzOffset(date.timeZone, testDate);
        (testOffsetWithSeconds > 0 ? Math.floor(testOffsetWithSeconds) : Math.ceil(testOffsetWithSeconds)) === offset && (systemOffsetForDiff = prevHourSystemOffset);
      }
    }
    let offsetDiff = systemOffsetForDiff - offset;
    offsetDiff && Date.prototype.setUTCMinutes.call(date, Date.prototype.getUTCMinutes.call(date) + offsetDiff);
    let systemDate = /* @__PURE__ */ new Date(+date);
    systemDate.setUTCSeconds(0);
    let systemSecondsOffset = systemOffset > 0 ? systemDate.getSeconds() : (systemDate.getSeconds() - 60) % 60, secondsOffset = Math.round(-(tzOffset(date.timeZone, date) * 60)) % 60;
    (secondsOffset || systemSecondsOffset) && Date.prototype.setUTCSeconds.call(date, Date.prototype.getUTCSeconds.call(date) + secondsOffset + systemSecondsOffset);
    let postOffsetWithSeconds = tzOffset(date.timeZone, date), postOffset = postOffsetWithSeconds > 0 ? Math.floor(postOffsetWithSeconds) : Math.ceil(postOffsetWithSeconds), postOffsetDiff = -(/* @__PURE__ */ new Date(+date)).getTimezoneOffset() - postOffset, offsetChanged = postOffset !== offset, postDiff = postOffsetDiff - offsetDiff, targetDSTShift = postOffset - offset, postOffsetCandidate = expectedInternalTime - postOffset * 60 * 1e3, normalizedTargetDSTGap = targetDSTShift > 0 && targetInternalTime(date) - expectedInternalTime === targetDSTShift * 60 * 1e3 && targetInternalTime(date, postOffsetCandidate) !== expectedInternalTime;
    if (offsetChanged && postDiff && !normalizedTargetDSTGap) {
      Date.prototype.setUTCMinutes.call(date, Date.prototype.getUTCMinutes.call(date) + postDiff);
      let newOffsetWithSeconds = tzOffset(date.timeZone, date), newOffset = newOffsetWithSeconds > 0 ? Math.floor(newOffsetWithSeconds) : Math.ceil(newOffsetWithSeconds), offsetChange = postOffset - newOffset;
      offsetChange && postDiff < 0 && Date.prototype.setUTCMinutes.call(date, Date.prototype.getUTCMinutes.call(date) + offsetChange);
    }
    syncToInternal(date);
    let drift = (constructorArgs ? expectedInternalTime : expectedInternalTime + secondsOffset * 1e3) - +date.internal;
    drift && Math.abs(drift) < 1800 * 1e3 && (Date.prototype.setTime.call(date, +date + drift), syncToInternal(date));
  }
  function constructorArgsToInternalTime(args) {
    return Date.UTC(args[0], args.length > 1 ? args[1] : 0, args.length > 2 ? args[2] : 1, ...args.slice(3));
  }
  function targetInternalTime(date, time) {
    let internal = new Date(time ?? +date);
    return internal.setUTCSeconds(internal.getUTCSeconds() - Math.round(-tzOffset(date.timeZone, internal) * 60)), +internal;
  }

  // node_modules/@date-fns/tz/date/index.js
  var TZDate = class _TZDate extends TZDateMini {
    //#region static
    static tz(tz, ...args) {
      return args.length ? new _TZDate(...args, tz) : new _TZDate(Date.now(), tz);
    }
    //#endregion
    //#region representation
    toISOString() {
      let [sign, hours, minutes] = this.tzComponents(), tz = `${sign}${hours}:${minutes}`;
      return this.internal.toISOString().slice(0, -1) + tz;
    }
    toString() {
      return `${this.toDateString()} ${this.toTimeString()}`;
    }
    toDateString() {
      let [day, date, month, year] = this.internal.toUTCString().split(" ");
      return `${day?.slice(0, -1)} ${month} ${date} ${year}`;
    }
    toTimeString() {
      let time = this.internal.toUTCString().split(" ")[4], [sign, hours, minutes] = this.tzComponents();
      return `${time} GMT${sign}${hours}${minutes} (${tzName(this.timeZone, this)})`;
    }
    toLocaleString(locales, options) {
      return Date.prototype.toLocaleString.call(this, locales, {
        ...options,
        timeZone: options?.timeZone || this.timeZone
      });
    }
    toLocaleDateString(locales, options) {
      return Date.prototype.toLocaleDateString.call(this, locales, {
        ...options,
        timeZone: options?.timeZone || this.timeZone
      });
    }
    toLocaleTimeString(locales, options) {
      return Date.prototype.toLocaleTimeString.call(this, locales, {
        ...options,
        timeZone: options?.timeZone || this.timeZone
      });
    }
    //#endregion
    //#region private
    tzComponents() {
      let offset = this.getTimezoneOffset(), sign = offset > 0 ? "-" : "+", hours = String(Math.floor(Math.abs(offset) / 60)).padStart(2, "0"), minutes = String(Math.abs(offset) % 60).padStart(2, "0");
      return [sign, hours, minutes];
    }
    //#endregion
    withTimeZone(timeZone) {
      return new _TZDate(+this, timeZone);
    }
    //#region date-fns integration
    [/* @__PURE__ */ Symbol.for("constructDateFrom")](date) {
      return new _TZDate(+new Date(date), this.timeZone);
    }
    //#endregion
  };

  // node_modules/date-fns/constants.js
  var maxTime = Math.pow(10, 8) * 24 * 60 * 60 * 1e3, minTime = -maxTime, millisecondsInWeek = 6048e5, millisecondsInDay = 864e5;
  var secondsInHour = 3600;
  var secondsInDay = secondsInHour * 24, secondsInWeek = secondsInDay * 7, secondsInYear = secondsInDay * 365.2425, secondsInMonth = secondsInYear / 12, secondsInQuarter = secondsInMonth * 3, constructFromSymbol = /* @__PURE__ */ Symbol.for("constructDateFrom");

  // node_modules/date-fns/constructFrom.js
  function constructFrom(date, value) {
    return typeof date == "function" ? date(value) : date && typeof date == "object" && constructFromSymbol in date ? date[constructFromSymbol](value) : date instanceof Date ? new date.constructor(value) : new Date(value);
  }

  // node_modules/date-fns/toDate.js
  function toDate(argument, context) {
    return constructFrom(context || argument, argument);
  }

  // node_modules/date-fns/addDays.js
  function addDays(date, amount, options) {
    let _date = toDate(date, options?.in);
    return isNaN(amount) ? constructFrom(options?.in || date, NaN) : (amount && _date.setDate(_date.getDate() + amount), _date);
  }

  // node_modules/date-fns/addMonths.js
  function addMonths(date, amount, options) {
    let _date = toDate(date, options?.in);
    if (isNaN(amount)) return constructFrom(options?.in || date, NaN);
    if (!amount)
      return _date;
    let dayOfMonth = _date.getDate(), endOfDesiredMonth = constructFrom(options?.in || date, _date.getTime());
    endOfDesiredMonth.setMonth(_date.getMonth() + amount + 1, 0);
    let daysInMonth = endOfDesiredMonth.getDate();
    return dayOfMonth >= daysInMonth ? endOfDesiredMonth : (_date.setFullYear(
      endOfDesiredMonth.getFullYear(),
      endOfDesiredMonth.getMonth(),
      dayOfMonth
    ), _date);
  }

  // node_modules/date-fns/_lib/defaultOptions.js
  var defaultOptions = {};
  function getDefaultOptions() {
    return defaultOptions;
  }

  // node_modules/date-fns/startOfWeek.js
  function startOfWeek(date, options) {
    let defaultOptions2 = getDefaultOptions(), weekStartsOn = options?.weekStartsOn ?? options?.locale?.options?.weekStartsOn ?? defaultOptions2.weekStartsOn ?? defaultOptions2.locale?.options?.weekStartsOn ?? 0, _date = toDate(date, options?.in), day = _date.getDay(), diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
    return _date.setDate(_date.getDate() - diff), _date.setHours(0, 0, 0, 0), _date;
  }

  // node_modules/date-fns/startOfISOWeek.js
  function startOfISOWeek(date, options) {
    return startOfWeek(date, { ...options, weekStartsOn: 1 });
  }

  // node_modules/date-fns/getISOWeekYear.js
  function getISOWeekYear(date, options) {
    let _date = toDate(date, options?.in), year = _date.getFullYear(), fourthOfJanuaryOfNextYear = constructFrom(_date, 0);
    fourthOfJanuaryOfNextYear.setFullYear(year + 1, 0, 4), fourthOfJanuaryOfNextYear.setHours(0, 0, 0, 0);
    let startOfNextYear = startOfISOWeek(fourthOfJanuaryOfNextYear), fourthOfJanuaryOfThisYear = constructFrom(_date, 0);
    fourthOfJanuaryOfThisYear.setFullYear(year, 0, 4), fourthOfJanuaryOfThisYear.setHours(0, 0, 0, 0);
    let startOfThisYear = startOfISOWeek(fourthOfJanuaryOfThisYear);
    return _date.getTime() >= startOfNextYear.getTime() ? year + 1 : _date.getTime() >= startOfThisYear.getTime() ? year : year - 1;
  }

  // node_modules/date-fns/_lib/getTimezoneOffsetInMilliseconds.js
  function getTimezoneOffsetInMilliseconds(date) {
    let _date = toDate(date), utcDate = new Date(
      Date.UTC(
        _date.getFullYear(),
        _date.getMonth(),
        _date.getDate(),
        _date.getHours(),
        _date.getMinutes(),
        _date.getSeconds(),
        _date.getMilliseconds()
      )
    );
    return utcDate.setUTCFullYear(_date.getFullYear()), +date - +utcDate;
  }

  // node_modules/date-fns/_lib/normalizeDates.js
  function normalizeDates(context, ...dates) {
    let normalize = constructFrom.bind(
      null,
      context || dates.find((date) => typeof date == "object")
    );
    return dates.map(normalize);
  }

  // node_modules/date-fns/startOfDay.js
  function startOfDay(date, options) {
    let _date = toDate(date, options?.in);
    return _date.setHours(0, 0, 0, 0), _date;
  }

  // node_modules/date-fns/differenceInCalendarDays.js
  function differenceInCalendarDays(laterDate, earlierDate, options) {
    let [laterDate_, earlierDate_] = normalizeDates(
      options?.in,
      laterDate,
      earlierDate
    ), laterStartOfDay = startOfDay(laterDate_), earlierStartOfDay = startOfDay(earlierDate_), laterTimestamp = +laterStartOfDay - getTimezoneOffsetInMilliseconds(laterStartOfDay), earlierTimestamp = +earlierStartOfDay - getTimezoneOffsetInMilliseconds(earlierStartOfDay);
    return Math.round((laterTimestamp - earlierTimestamp) / millisecondsInDay);
  }

  // node_modules/date-fns/startOfISOWeekYear.js
  function startOfISOWeekYear(date, options) {
    let year = getISOWeekYear(date, options), fourthOfJanuary = constructFrom(options?.in || date, 0);
    return fourthOfJanuary.setFullYear(year, 0, 4), fourthOfJanuary.setHours(0, 0, 0, 0), startOfISOWeek(fourthOfJanuary);
  }

  // node_modules/date-fns/addWeeks.js
  function addWeeks(date, amount, options) {
    return addDays(date, amount * 7, options);
  }

  // node_modules/date-fns/addYears.js
  function addYears(date, amount, options) {
    return addMonths(date, amount * 12, options);
  }

  // node_modules/date-fns/max.js
  function max(dates, options) {
    let result, context = options?.in;
    return dates.forEach((date) => {
      !context && typeof date == "object" && (context = constructFrom.bind(null, date));
      let date_ = toDate(date, context);
      (!result || result < date_ || isNaN(+date_)) && (result = date_);
    }), constructFrom(context, result || NaN);
  }

  // node_modules/date-fns/min.js
  function min(dates, options) {
    let result, context = options?.in;
    return dates.forEach((date) => {
      !context && typeof date == "object" && (context = constructFrom.bind(null, date));
      let date_ = toDate(date, context);
      (!result || result > date_ || isNaN(+date_)) && (result = date_);
    }), constructFrom(context, result || NaN);
  }

  // node_modules/date-fns/isSameDay.js
  function isSameDay(laterDate, earlierDate, options) {
    let [dateLeft_, dateRight_] = normalizeDates(
      options?.in,
      laterDate,
      earlierDate
    );
    return +startOfDay(dateLeft_) == +startOfDay(dateRight_);
  }

  // node_modules/date-fns/isDate.js
  function isDate(value) {
    return value instanceof Date || typeof value == "object" && Object.prototype.toString.call(value) === "[object Date]";
  }

  // node_modules/date-fns/isValid.js
  function isValid(date) {
    return !(!isDate(date) && typeof date != "number" || isNaN(+toDate(date)));
  }

  // node_modules/date-fns/differenceInCalendarMonths.js
  function differenceInCalendarMonths(laterDate, earlierDate, options) {
    let [laterDate_, earlierDate_] = normalizeDates(
      options?.in,
      laterDate,
      earlierDate
    ), yearsDiff = laterDate_.getFullYear() - earlierDate_.getFullYear(), monthsDiff = laterDate_.getMonth() - earlierDate_.getMonth();
    return yearsDiff * 12 + monthsDiff;
  }

  // node_modules/date-fns/endOfMonth.js
  function endOfMonth(date, options) {
    let _date = toDate(date, options?.in), month = _date.getMonth();
    return _date.setFullYear(_date.getFullYear(), month + 1, 0), _date.setHours(23, 59, 59, 999), _date;
  }

  // node_modules/date-fns/_lib/normalizeInterval.js
  function normalizeInterval(context, interval) {
    let [start, end] = normalizeDates(context, interval.start, interval.end);
    return { start, end };
  }

  // node_modules/date-fns/eachMonthOfInterval.js
  function eachMonthOfInterval(interval, options) {
    let { start, end } = normalizeInterval(options?.in, interval), reversed = +start > +end, endTime = reversed ? +start : +end, date = reversed ? end : start;
    date.setHours(0, 0, 0, 0), date.setDate(1);
    let step = options?.step ?? 1;
    if (!step) return [];
    step < 0 && (step = -step, reversed = !reversed);
    let dates = [];
    for (; +date <= endTime; )
      dates.push(constructFrom(start, date)), date.setMonth(date.getMonth() + step);
    return reversed ? dates.reverse() : dates;
  }

  // node_modules/date-fns/startOfMonth.js
  function startOfMonth(date, options) {
    let _date = toDate(date, options?.in);
    return _date.setDate(1), _date.setHours(0, 0, 0, 0), _date;
  }

  // node_modules/date-fns/endOfYear.js
  function endOfYear(date, options) {
    let _date = toDate(date, options?.in), year = _date.getFullYear();
    return _date.setFullYear(year + 1, 0, 0), _date.setHours(23, 59, 59, 999), _date;
  }

  // node_modules/date-fns/startOfYear.js
  function startOfYear(date, options) {
    let date_ = toDate(date, options?.in);
    return date_.setFullYear(date_.getFullYear(), 0, 1), date_.setHours(0, 0, 0, 0), date_;
  }

  // node_modules/date-fns/eachYearOfInterval.js
  function eachYearOfInterval(interval, options) {
    let { start, end } = normalizeInterval(options?.in, interval), reversed = +start > +end, endTime = reversed ? +start : +end, date = reversed ? end : start;
    date.setHours(0, 0, 0, 0), date.setMonth(0, 1);
    let step = options?.step ?? 1;
    if (!step) return [];
    step < 0 && (step = -step, reversed = !reversed);
    let dates = [];
    for (; +date <= endTime; )
      dates.push(constructFrom(start, date)), date.setFullYear(date.getFullYear() + step);
    return reversed ? dates.reverse() : dates;
  }

  // node_modules/date-fns/endOfWeek.js
  function endOfWeek(date, options) {
    let defaultOptions2 = getDefaultOptions(), weekStartsOn = options?.weekStartsOn ?? options?.locale?.options?.weekStartsOn ?? defaultOptions2.weekStartsOn ?? defaultOptions2.locale?.options?.weekStartsOn ?? 0, _date = toDate(date, options?.in), day = _date.getDay(), diff = (day < weekStartsOn ? -7 : 0) + 6 - (day - weekStartsOn);
    return _date.setDate(_date.getDate() + diff), _date.setHours(23, 59, 59, 999), _date;
  }

  // node_modules/date-fns/endOfISOWeek.js
  function endOfISOWeek(date, options) {
    return endOfWeek(date, { ...options, weekStartsOn: 1 });
  }

  // node_modules/date-fns/locale/en-US/_lib/formatDistance.js
  var formatDistanceLocale = {
    lessThanXSeconds: {
      one: "less than a second",
      other: "less than {{count}} seconds"
    },
    xSeconds: {
      one: "1 second",
      other: "{{count}} seconds"
    },
    halfAMinute: "half a minute",
    lessThanXMinutes: {
      one: "less than a minute",
      other: "less than {{count}} minutes"
    },
    xMinutes: {
      one: "1 minute",
      other: "{{count}} minutes"
    },
    aboutXHours: {
      one: "about 1 hour",
      other: "about {{count}} hours"
    },
    xHours: {
      one: "1 hour",
      other: "{{count}} hours"
    },
    xDays: {
      one: "1 day",
      other: "{{count}} days"
    },
    aboutXWeeks: {
      one: "about 1 week",
      other: "about {{count}} weeks"
    },
    xWeeks: {
      one: "1 week",
      other: "{{count}} weeks"
    },
    aboutXMonths: {
      one: "about 1 month",
      other: "about {{count}} months"
    },
    xMonths: {
      one: "1 month",
      other: "{{count}} months"
    },
    aboutXYears: {
      one: "about 1 year",
      other: "about {{count}} years"
    },
    xYears: {
      one: "1 year",
      other: "{{count}} years"
    },
    overXYears: {
      one: "over 1 year",
      other: "over {{count}} years"
    },
    almostXYears: {
      one: "almost 1 year",
      other: "almost {{count}} years"
    }
  }, formatDistance = (token, count, options) => {
    let result, tokenValue = formatDistanceLocale[token];
    return typeof tokenValue == "string" ? result = tokenValue : count === 1 ? result = tokenValue.one : result = tokenValue.other.replace("{{count}}", count.toString()), options?.addSuffix ? options.comparison && options.comparison > 0 ? "in " + result : result + " ago" : result;
  };

  // node_modules/date-fns/locale/_lib/buildFormatLongFn.js
  function buildFormatLongFn(args) {
    return (options = {}) => {
      let width = options.width ? String(options.width) : args.defaultWidth;
      return args.formats[width] || args.formats[args.defaultWidth];
    };
  }

  // node_modules/date-fns/locale/en-US/_lib/formatLong.js
  var dateFormats = {
    full: "EEEE, MMMM do, y",
    long: "MMMM do, y",
    medium: "MMM d, y",
    short: "MM/dd/yyyy"
  }, timeFormats = {
    full: "h:mm:ss a zzzz",
    long: "h:mm:ss a z",
    medium: "h:mm:ss a",
    short: "h:mm a"
  }, dateTimeFormats = {
    full: "{{date}} 'at' {{time}}",
    long: "{{date}} 'at' {{time}}",
    medium: "{{date}}, {{time}}",
    short: "{{date}}, {{time}}"
  }, formatLong = {
    date: buildFormatLongFn({
      formats: dateFormats,
      defaultWidth: "full"
    }),
    time: buildFormatLongFn({
      formats: timeFormats,
      defaultWidth: "full"
    }),
    dateTime: buildFormatLongFn({
      formats: dateTimeFormats,
      defaultWidth: "full"
    })
  };

  // node_modules/date-fns/locale/en-US/_lib/formatRelative.js
  var formatRelativeLocale = {
    lastWeek: "'last' eeee 'at' p",
    yesterday: "'yesterday at' p",
    today: "'today at' p",
    tomorrow: "'tomorrow at' p",
    nextWeek: "eeee 'at' p",
    other: "P"
  }, formatRelative = (token, _date, _baseDate, _options) => formatRelativeLocale[token];

  // node_modules/date-fns/locale/_lib/buildLocalizeFn.js
  function buildLocalizeFn(args) {
    return (value, options) => {
      let context = options?.context ? String(options.context) : "standalone", valuesArray;
      if (context === "formatting" && args.formattingValues) {
        let defaultWidth = args.defaultFormattingWidth || args.defaultWidth, width = options?.width ? String(options.width) : defaultWidth;
        valuesArray = args.formattingValues[width] || args.formattingValues[defaultWidth];
      } else {
        let defaultWidth = args.defaultWidth, width = options?.width ? String(options.width) : args.defaultWidth;
        valuesArray = args.values[width] || args.values[defaultWidth];
      }
      let index = args.argumentCallback ? args.argumentCallback(value) : value;
      return valuesArray[index];
    };
  }

  // node_modules/date-fns/locale/en-US/_lib/localize.js
  var eraValues = {
    narrow: ["B", "A"],
    abbreviated: ["BC", "AD"],
    wide: ["Before Christ", "Anno Domini"]
  }, quarterValues = {
    narrow: ["1", "2", "3", "4"],
    abbreviated: ["Q1", "Q2", "Q3", "Q4"],
    wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
  }, monthValues = {
    narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
    abbreviated: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ],
    wide: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ]
  }, dayValues = {
    narrow: ["S", "M", "T", "W", "T", "F", "S"],
    short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    wide: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ]
  }, dayPeriodValues = {
    narrow: {
      am: "a",
      pm: "p",
      midnight: "mi",
      noon: "n",
      morning: "morning",
      afternoon: "afternoon",
      evening: "evening",
      night: "night"
    },
    abbreviated: {
      am: "AM",
      pm: "PM",
      midnight: "midnight",
      noon: "noon",
      morning: "morning",
      afternoon: "afternoon",
      evening: "evening",
      night: "night"
    },
    wide: {
      am: "a.m.",
      pm: "p.m.",
      midnight: "midnight",
      noon: "noon",
      morning: "morning",
      afternoon: "afternoon",
      evening: "evening",
      night: "night"
    }
  }, formattingDayPeriodValues = {
    narrow: {
      am: "a",
      pm: "p",
      midnight: "mi",
      noon: "n",
      morning: "in the morning",
      afternoon: "in the afternoon",
      evening: "in the evening",
      night: "at night"
    },
    abbreviated: {
      am: "AM",
      pm: "PM",
      midnight: "midnight",
      noon: "noon",
      morning: "in the morning",
      afternoon: "in the afternoon",
      evening: "in the evening",
      night: "at night"
    },
    wide: {
      am: "a.m.",
      pm: "p.m.",
      midnight: "midnight",
      noon: "noon",
      morning: "in the morning",
      afternoon: "in the afternoon",
      evening: "in the evening",
      night: "at night"
    }
  }, ordinalNumber = (dirtyNumber, _options) => {
    let number = Number(dirtyNumber), rem100 = number % 100;
    if (rem100 > 20 || rem100 < 10)
      switch (rem100 % 10) {
        case 1:
          return number + "st";
        case 2:
          return number + "nd";
        case 3:
          return number + "rd";
      }
    return number + "th";
  }, localize = {
    ordinalNumber,
    era: buildLocalizeFn({
      values: eraValues,
      defaultWidth: "wide"
    }),
    quarter: buildLocalizeFn({
      values: quarterValues,
      defaultWidth: "wide",
      argumentCallback: (quarter) => quarter - 1
    }),
    month: buildLocalizeFn({
      values: monthValues,
      defaultWidth: "wide"
    }),
    day: buildLocalizeFn({
      values: dayValues,
      defaultWidth: "wide"
    }),
    dayPeriod: buildLocalizeFn({
      values: dayPeriodValues,
      defaultWidth: "wide",
      formattingValues: formattingDayPeriodValues,
      defaultFormattingWidth: "wide"
    })
  };

  // node_modules/date-fns/locale/_lib/buildMatchFn.js
  function buildMatchFn(args) {
    return (string, options = {}) => {
      let width = options.width, matchPattern = width && args.matchPatterns[width] || args.matchPatterns[args.defaultMatchWidth], matchResult = string.match(matchPattern);
      if (!matchResult)
        return null;
      let matchedString = matchResult[0], parsePatterns = width && args.parsePatterns[width] || args.parsePatterns[args.defaultParseWidth], key = Array.isArray(parsePatterns) ? findIndex(parsePatterns, (pattern) => pattern.test(matchedString)) : (
        // [TODO] -- I challenge you to fix the type
        findKey(parsePatterns, (pattern) => pattern.test(matchedString))
      ), value;
      value = args.valueCallback ? args.valueCallback(key) : key, value = options.valueCallback ? (
        // [TODO] -- I challenge you to fix the type
        options.valueCallback(value)
      ) : value;
      let rest = string.slice(matchedString.length);
      return { value, rest };
    };
  }
  function findKey(object, predicate) {
    for (let key in object)
      if (Object.prototype.hasOwnProperty.call(object, key) && predicate(object[key]))
        return key;
  }
  function findIndex(array, predicate) {
    for (let key = 0; key < array.length; key++)
      if (predicate(array[key]))
        return key;
  }

  // node_modules/date-fns/locale/_lib/buildMatchPatternFn.js
  function buildMatchPatternFn(args) {
    return (string, options = {}) => {
      let matchResult = string.match(args.matchPattern);
      if (!matchResult) return null;
      let matchedString = matchResult[0], parseResult = string.match(args.parsePattern);
      if (!parseResult) return null;
      let value = args.valueCallback ? args.valueCallback(parseResult[0]) : parseResult[0];
      value = options.valueCallback ? options.valueCallback(value) : value;
      let rest = string.slice(matchedString.length);
      return { value, rest };
    };
  }

  // node_modules/date-fns/locale/en-US/_lib/match.js
  var matchOrdinalNumberPattern = /^(\d+)(th|st|nd|rd)?/i, parseOrdinalNumberPattern = /\d+/i, matchEraPatterns = {
    narrow: /^(b|a)/i,
    abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
    wide: /^(before christ|before common era|anno domini|common era)/i
  }, parseEraPatterns = {
    any: [/^b/i, /^(a|c)/i]
  }, matchQuarterPatterns = {
    narrow: /^[1234]/i,
    abbreviated: /^q[1234]/i,
    wide: /^[1234](th|st|nd|rd)? quarter/i
  }, parseQuarterPatterns = {
    any: [/1/i, /2/i, /3/i, /4/i]
  }, matchMonthPatterns = {
    narrow: /^[jfmasond]/i,
    abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
    wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
  }, parseMonthPatterns = {
    narrow: [
      /^j/i,
      /^f/i,
      /^m/i,
      /^a/i,
      /^m/i,
      /^j/i,
      /^j/i,
      /^a/i,
      /^s/i,
      /^o/i,
      /^n/i,
      /^d/i
    ],
    any: [
      /^ja/i,
      /^f/i,
      /^mar/i,
      /^ap/i,
      /^may/i,
      /^jun/i,
      /^jul/i,
      /^au/i,
      /^s/i,
      /^o/i,
      /^n/i,
      /^d/i
    ]
  }, matchDayPatterns = {
    narrow: /^[smtwf]/i,
    short: /^(su|mo|tu|we|th|fr|sa)/i,
    abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
    wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
  }, parseDayPatterns = {
    narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
    any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
  }, matchDayPeriodPatterns = {
    narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
    any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
  }, parseDayPeriodPatterns = {
    any: {
      am: /^a/i,
      pm: /^p/i,
      midnight: /^mi/i,
      noon: /^no/i,
      morning: /morning/i,
      afternoon: /afternoon/i,
      evening: /evening/i,
      night: /night/i
    }
  }, match = {
    ordinalNumber: buildMatchPatternFn({
      matchPattern: matchOrdinalNumberPattern,
      parsePattern: parseOrdinalNumberPattern,
      valueCallback: (value) => parseInt(value, 10)
    }),
    era: buildMatchFn({
      matchPatterns: matchEraPatterns,
      defaultMatchWidth: "wide",
      parsePatterns: parseEraPatterns,
      defaultParseWidth: "any"
    }),
    quarter: buildMatchFn({
      matchPatterns: matchQuarterPatterns,
      defaultMatchWidth: "wide",
      parsePatterns: parseQuarterPatterns,
      defaultParseWidth: "any",
      valueCallback: (index) => index + 1
    }),
    month: buildMatchFn({
      matchPatterns: matchMonthPatterns,
      defaultMatchWidth: "wide",
      parsePatterns: parseMonthPatterns,
      defaultParseWidth: "any"
    }),
    day: buildMatchFn({
      matchPatterns: matchDayPatterns,
      defaultMatchWidth: "wide",
      parsePatterns: parseDayPatterns,
      defaultParseWidth: "any"
    }),
    dayPeriod: buildMatchFn({
      matchPatterns: matchDayPeriodPatterns,
      defaultMatchWidth: "any",
      parsePatterns: parseDayPeriodPatterns,
      defaultParseWidth: "any"
    })
  };

  // node_modules/date-fns/locale/en-US.js
  var enUS = {
    code: "en-US",
    formatDistance,
    formatLong,
    formatRelative,
    localize,
    match,
    options: {
      weekStartsOn: 0,
      firstWeekContainsDate: 1
    }
  };

  // node_modules/date-fns/getDayOfYear.js
  function getDayOfYear(date, options) {
    let _date = toDate(date, options?.in);
    return differenceInCalendarDays(_date, startOfYear(_date)) + 1;
  }

  // node_modules/date-fns/getISOWeek.js
  function getISOWeek(date, options) {
    let _date = toDate(date, options?.in), diff = +startOfISOWeek(_date) - +startOfISOWeekYear(_date);
    return Math.round(diff / millisecondsInWeek) + 1;
  }

  // node_modules/date-fns/getWeekYear.js
  function getWeekYear(date, options) {
    let _date = toDate(date, options?.in), year = _date.getFullYear(), defaultOptions2 = getDefaultOptions(), firstWeekContainsDate = options?.firstWeekContainsDate ?? options?.locale?.options?.firstWeekContainsDate ?? defaultOptions2.firstWeekContainsDate ?? defaultOptions2.locale?.options?.firstWeekContainsDate ?? 1, firstWeekOfNextYear = constructFrom(options?.in || date, 0);
    firstWeekOfNextYear.setFullYear(year + 1, 0, firstWeekContainsDate), firstWeekOfNextYear.setHours(0, 0, 0, 0);
    let startOfNextYear = startOfWeek(firstWeekOfNextYear, options), firstWeekOfThisYear = constructFrom(options?.in || date, 0);
    firstWeekOfThisYear.setFullYear(year, 0, firstWeekContainsDate), firstWeekOfThisYear.setHours(0, 0, 0, 0);
    let startOfThisYear = startOfWeek(firstWeekOfThisYear, options);
    return +_date >= +startOfNextYear ? year + 1 : +_date >= +startOfThisYear ? year : year - 1;
  }

  // node_modules/date-fns/startOfWeekYear.js
  function startOfWeekYear(date, options) {
    let defaultOptions2 = getDefaultOptions(), firstWeekContainsDate = options?.firstWeekContainsDate ?? options?.locale?.options?.firstWeekContainsDate ?? defaultOptions2.firstWeekContainsDate ?? defaultOptions2.locale?.options?.firstWeekContainsDate ?? 1, year = getWeekYear(date, options), firstWeek = constructFrom(options?.in || date, 0);
    return firstWeek.setFullYear(year, 0, firstWeekContainsDate), firstWeek.setHours(0, 0, 0, 0), startOfWeek(firstWeek, options);
  }

  // node_modules/date-fns/getWeek.js
  function getWeek(date, options) {
    let _date = toDate(date, options?.in), diff = +startOfWeek(_date, options) - +startOfWeekYear(_date, options);
    return Math.round(diff / millisecondsInWeek) + 1;
  }

  // node_modules/date-fns/_lib/addLeadingZeros.js
  function addLeadingZeros(number, targetLength) {
    let sign = number < 0 ? "-" : "", output = Math.abs(number).toString().padStart(targetLength, "0");
    return sign + output;
  }

  // node_modules/date-fns/_lib/format/lightFormatters.js
  var lightFormatters = {
    // Year
    y(date, token) {
      let signedYear = date.getFullYear(), year = signedYear > 0 ? signedYear : 1 - signedYear;
      return addLeadingZeros(token === "yy" ? year % 100 : year, token.length);
    },
    // Month
    M(date, token) {
      let month = date.getMonth();
      return token === "M" ? String(month + 1) : addLeadingZeros(month + 1, 2);
    },
    // Day of the month
    d(date, token) {
      return addLeadingZeros(date.getDate(), token.length);
    },
    // AM or PM
    a(date, token) {
      let dayPeriodEnumValue = date.getHours() / 12 >= 1 ? "pm" : "am";
      switch (token) {
        case "a":
        case "aa":
          return dayPeriodEnumValue.toUpperCase();
        case "aaa":
          return dayPeriodEnumValue;
        case "aaaaa":
          return dayPeriodEnumValue[0];
        default:
          return dayPeriodEnumValue === "am" ? "a.m." : "p.m.";
      }
    },
    // Hour [1-12]
    h(date, token) {
      return addLeadingZeros(date.getHours() % 12 || 12, token.length);
    },
    // Hour [0-23]
    H(date, token) {
      return addLeadingZeros(date.getHours(), token.length);
    },
    // Minute
    m(date, token) {
      return addLeadingZeros(date.getMinutes(), token.length);
    },
    // Second
    s(date, token) {
      return addLeadingZeros(date.getSeconds(), token.length);
    },
    // Fraction of second
    S(date, token) {
      let numberOfDigits = token.length, milliseconds = date.getMilliseconds(), fractionalSeconds = Math.trunc(
        milliseconds * Math.pow(10, numberOfDigits - 3)
      );
      return addLeadingZeros(fractionalSeconds, token.length);
    }
  };

  // node_modules/date-fns/_lib/format/formatters.js
  var dayPeriodEnum = {
    am: "am",
    pm: "pm",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  }, formatters = {
    // Era
    G: function(date, token, localize3) {
      let era = date.getFullYear() > 0 ? 1 : 0;
      switch (token) {
        // AD, BC
        case "G":
        case "GG":
        case "GGG":
          return localize3.era(era, { width: "abbreviated" });
        // A, B
        case "GGGGG":
          return localize3.era(era, { width: "narrow" });
        default:
          return localize3.era(era, { width: "wide" });
      }
    },
    // Year
    y: function(date, token, localize3) {
      if (token === "yo") {
        let signedYear = date.getFullYear(), year = signedYear > 0 ? signedYear : 1 - signedYear;
        return localize3.ordinalNumber(year, { unit: "year" });
      }
      return lightFormatters.y(date, token);
    },
    // Local week-numbering year
    Y: function(date, token, localize3, options) {
      let signedWeekYear = getWeekYear(date, options), weekYear = signedWeekYear > 0 ? signedWeekYear : 1 - signedWeekYear;
      if (token === "YY") {
        let twoDigitYear = weekYear % 100;
        return addLeadingZeros(twoDigitYear, 2);
      }
      return token === "Yo" ? localize3.ordinalNumber(weekYear, { unit: "year" }) : addLeadingZeros(weekYear, token.length);
    },
    // ISO week-numbering year
    R: function(date, token) {
      let isoWeekYear = getISOWeekYear(date);
      return addLeadingZeros(isoWeekYear, token.length);
    },
    // Extended year. This is a single number designating the year of this calendar system.
    // The main difference between `y` and `u` localizers are B.C. years:
    // | Year | `y` | `u` |
    // |------|-----|-----|
    // | AC 1 |   1 |   1 |
    // | BC 1 |   1 |   0 |
    // | BC 2 |   2 |  -1 |
    // Also `yy` always returns the last two digits of a year,
    // while `uu` pads single digit years to 2 characters and returns other years unchanged.
    u: function(date, token) {
      let year = date.getFullYear();
      return addLeadingZeros(year, token.length);
    },
    // Quarter
    Q: function(date, token, localize3) {
      let quarter = Math.ceil((date.getMonth() + 1) / 3);
      switch (token) {
        // 1, 2, 3, 4
        case "Q":
          return String(quarter);
        // 01, 02, 03, 04
        case "QQ":
          return addLeadingZeros(quarter, 2);
        // 1st, 2nd, 3rd, 4th
        case "Qo":
          return localize3.ordinalNumber(quarter, { unit: "quarter" });
        // Q1, Q2, Q3, Q4
        case "QQQ":
          return localize3.quarter(quarter, {
            width: "abbreviated",
            context: "formatting"
          });
        // 1, 2, 3, 4 (narrow quarter; could be not numerical)
        case "QQQQQ":
          return localize3.quarter(quarter, {
            width: "narrow",
            context: "formatting"
          });
        default:
          return localize3.quarter(quarter, {
            width: "wide",
            context: "formatting"
          });
      }
    },
    // Stand-alone quarter
    q: function(date, token, localize3) {
      let quarter = Math.ceil((date.getMonth() + 1) / 3);
      switch (token) {
        // 1, 2, 3, 4
        case "q":
          return String(quarter);
        // 01, 02, 03, 04
        case "qq":
          return addLeadingZeros(quarter, 2);
        // 1st, 2nd, 3rd, 4th
        case "qo":
          return localize3.ordinalNumber(quarter, { unit: "quarter" });
        // Q1, Q2, Q3, Q4
        case "qqq":
          return localize3.quarter(quarter, {
            width: "abbreviated",
            context: "standalone"
          });
        // 1, 2, 3, 4 (narrow quarter; could be not numerical)
        case "qqqqq":
          return localize3.quarter(quarter, {
            width: "narrow",
            context: "standalone"
          });
        default:
          return localize3.quarter(quarter, {
            width: "wide",
            context: "standalone"
          });
      }
    },
    // Month
    M: function(date, token, localize3) {
      let month = date.getMonth();
      switch (token) {
        case "M":
        case "MM":
          return lightFormatters.M(date, token);
        // 1st, 2nd, ..., 12th
        case "Mo":
          return localize3.ordinalNumber(month + 1, { unit: "month" });
        // Jan, Feb, ..., Dec
        case "MMM":
          return localize3.month(month, {
            width: "abbreviated",
            context: "formatting"
          });
        // J, F, ..., D
        case "MMMMM":
          return localize3.month(month, {
            width: "narrow",
            context: "formatting"
          });
        default:
          return localize3.month(month, { width: "wide", context: "formatting" });
      }
    },
    // Stand-alone month
    L: function(date, token, localize3) {
      let month = date.getMonth();
      switch (token) {
        // 1, 2, ..., 12
        case "L":
          return String(month + 1);
        // 01, 02, ..., 12
        case "LL":
          return addLeadingZeros(month + 1, 2);
        // 1st, 2nd, ..., 12th
        case "Lo":
          return localize3.ordinalNumber(month + 1, { unit: "month" });
        // Jan, Feb, ..., Dec
        case "LLL":
          return localize3.month(month, {
            width: "abbreviated",
            context: "standalone"
          });
        // J, F, ..., D
        case "LLLLL":
          return localize3.month(month, {
            width: "narrow",
            context: "standalone"
          });
        default:
          return localize3.month(month, { width: "wide", context: "standalone" });
      }
    },
    // Local week of year
    w: function(date, token, localize3, options) {
      let week = getWeek(date, options);
      return token === "wo" ? localize3.ordinalNumber(week, { unit: "week" }) : addLeadingZeros(week, token.length);
    },
    // ISO week of year
    I: function(date, token, localize3) {
      let isoWeek = getISOWeek(date);
      return token === "Io" ? localize3.ordinalNumber(isoWeek, { unit: "week" }) : addLeadingZeros(isoWeek, token.length);
    },
    // Day of the month
    d: function(date, token, localize3) {
      return token === "do" ? localize3.ordinalNumber(date.getDate(), { unit: "date" }) : lightFormatters.d(date, token);
    },
    // Day of year
    D: function(date, token, localize3) {
      let dayOfYear = getDayOfYear(date);
      return token === "Do" ? localize3.ordinalNumber(dayOfYear, { unit: "dayOfYear" }) : addLeadingZeros(dayOfYear, token.length);
    },
    // Day of week
    E: function(date, token, localize3) {
      let dayOfWeek = date.getDay();
      switch (token) {
        // Tue
        case "E":
        case "EE":
        case "EEE":
          return localize3.day(dayOfWeek, {
            width: "abbreviated",
            context: "formatting"
          });
        // T
        case "EEEEE":
          return localize3.day(dayOfWeek, {
            width: "narrow",
            context: "formatting"
          });
        // Tu
        case "EEEEEE":
          return localize3.day(dayOfWeek, {
            width: "short",
            context: "formatting"
          });
        default:
          return localize3.day(dayOfWeek, {
            width: "wide",
            context: "formatting"
          });
      }
    },
    // Local day of week
    e: function(date, token, localize3, options) {
      let dayOfWeek = date.getDay(), localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
      switch (token) {
        // Numerical value (Nth day of week with current locale or weekStartsOn)
        case "e":
          return String(localDayOfWeek);
        // Padded numerical value
        case "ee":
          return addLeadingZeros(localDayOfWeek, 2);
        // 1st, 2nd, ..., 7th
        case "eo":
          return localize3.ordinalNumber(localDayOfWeek, { unit: "day" });
        case "eee":
          return localize3.day(dayOfWeek, {
            width: "abbreviated",
            context: "formatting"
          });
        // T
        case "eeeee":
          return localize3.day(dayOfWeek, {
            width: "narrow",
            context: "formatting"
          });
        // Tu
        case "eeeeee":
          return localize3.day(dayOfWeek, {
            width: "short",
            context: "formatting"
          });
        default:
          return localize3.day(dayOfWeek, {
            width: "wide",
            context: "formatting"
          });
      }
    },
    // Stand-alone local day of week
    c: function(date, token, localize3, options) {
      let dayOfWeek = date.getDay(), localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
      switch (token) {
        // Numerical value (same as in `e`)
        case "c":
          return String(localDayOfWeek);
        // Padded numerical value
        case "cc":
          return addLeadingZeros(localDayOfWeek, token.length);
        // 1st, 2nd, ..., 7th
        case "co":
          return localize3.ordinalNumber(localDayOfWeek, { unit: "day" });
        case "ccc":
          return localize3.day(dayOfWeek, {
            width: "abbreviated",
            context: "standalone"
          });
        // T
        case "ccccc":
          return localize3.day(dayOfWeek, {
            width: "narrow",
            context: "standalone"
          });
        // Tu
        case "cccccc":
          return localize3.day(dayOfWeek, {
            width: "short",
            context: "standalone"
          });
        default:
          return localize3.day(dayOfWeek, {
            width: "wide",
            context: "standalone"
          });
      }
    },
    // ISO day of week
    i: function(date, token, localize3) {
      let dayOfWeek = date.getDay(), isoDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
      switch (token) {
        // 2
        case "i":
          return String(isoDayOfWeek);
        // 02
        case "ii":
          return addLeadingZeros(isoDayOfWeek, token.length);
        // 2nd
        case "io":
          return localize3.ordinalNumber(isoDayOfWeek, { unit: "day" });
        // Tue
        case "iii":
          return localize3.day(dayOfWeek, {
            width: "abbreviated",
            context: "formatting"
          });
        // T
        case "iiiii":
          return localize3.day(dayOfWeek, {
            width: "narrow",
            context: "formatting"
          });
        // Tu
        case "iiiiii":
          return localize3.day(dayOfWeek, {
            width: "short",
            context: "formatting"
          });
        default:
          return localize3.day(dayOfWeek, {
            width: "wide",
            context: "formatting"
          });
      }
    },
    // AM or PM
    a: function(date, token, localize3) {
      let dayPeriodEnumValue = date.getHours() / 12 >= 1 ? "pm" : "am";
      switch (token) {
        case "a":
        case "aa":
          return localize3.dayPeriod(dayPeriodEnumValue, {
            width: "abbreviated",
            context: "formatting"
          });
        case "aaa":
          return localize3.dayPeriod(dayPeriodEnumValue, {
            width: "abbreviated",
            context: "formatting"
          }).toLowerCase();
        case "aaaaa":
          return localize3.dayPeriod(dayPeriodEnumValue, {
            width: "narrow",
            context: "formatting"
          });
        default:
          return localize3.dayPeriod(dayPeriodEnumValue, {
            width: "wide",
            context: "formatting"
          });
      }
    },
    // AM, PM, midnight, noon
    b: function(date, token, localize3) {
      let hours = date.getHours(), dayPeriodEnumValue;
      switch (hours === 12 ? dayPeriodEnumValue = dayPeriodEnum.noon : hours === 0 ? dayPeriodEnumValue = dayPeriodEnum.midnight : dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am", token) {
        case "b":
        case "bb":
          return localize3.dayPeriod(dayPeriodEnumValue, {
            width: "abbreviated",
            context: "formatting"
          });
        case "bbb":
          return localize3.dayPeriod(dayPeriodEnumValue, {
            width: "abbreviated",
            context: "formatting"
          }).toLowerCase();
        case "bbbbb":
          return localize3.dayPeriod(dayPeriodEnumValue, {
            width: "narrow",
            context: "formatting"
          });
        default:
          return localize3.dayPeriod(dayPeriodEnumValue, {
            width: "wide",
            context: "formatting"
          });
      }
    },
    // in the morning, in the afternoon, in the evening, at night
    B: function(date, token, localize3) {
      let hours = date.getHours(), dayPeriodEnumValue;
      switch (hours >= 17 ? dayPeriodEnumValue = dayPeriodEnum.evening : hours >= 12 ? dayPeriodEnumValue = dayPeriodEnum.afternoon : hours >= 4 ? dayPeriodEnumValue = dayPeriodEnum.morning : dayPeriodEnumValue = dayPeriodEnum.night, token) {
        case "B":
        case "BB":
        case "BBB":
          return localize3.dayPeriod(dayPeriodEnumValue, {
            width: "abbreviated",
            context: "formatting"
          });
        case "BBBBB":
          return localize3.dayPeriod(dayPeriodEnumValue, {
            width: "narrow",
            context: "formatting"
          });
        default:
          return localize3.dayPeriod(dayPeriodEnumValue, {
            width: "wide",
            context: "formatting"
          });
      }
    },
    // Hour [1-12]
    h: function(date, token, localize3) {
      if (token === "ho") {
        let hours = date.getHours() % 12;
        return hours === 0 && (hours = 12), localize3.ordinalNumber(hours, { unit: "hour" });
      }
      return lightFormatters.h(date, token);
    },
    // Hour [0-23]
    H: function(date, token, localize3) {
      return token === "Ho" ? localize3.ordinalNumber(date.getHours(), { unit: "hour" }) : lightFormatters.H(date, token);
    },
    // Hour [0-11]
    K: function(date, token, localize3) {
      let hours = date.getHours() % 12;
      return token === "Ko" ? localize3.ordinalNumber(hours, { unit: "hour" }) : addLeadingZeros(hours, token.length);
    },
    // Hour [1-24]
    k: function(date, token, localize3) {
      let hours = date.getHours();
      return hours === 0 && (hours = 24), token === "ko" ? localize3.ordinalNumber(hours, { unit: "hour" }) : addLeadingZeros(hours, token.length);
    },
    // Minute
    m: function(date, token, localize3) {
      return token === "mo" ? localize3.ordinalNumber(date.getMinutes(), { unit: "minute" }) : lightFormatters.m(date, token);
    },
    // Second
    s: function(date, token, localize3) {
      return token === "so" ? localize3.ordinalNumber(date.getSeconds(), { unit: "second" }) : lightFormatters.s(date, token);
    },
    // Fraction of second
    S: function(date, token) {
      return lightFormatters.S(date, token);
    },
    // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
    X: function(date, token, _localize) {
      let timezoneOffset = date.getTimezoneOffset();
      if (timezoneOffset === 0)
        return "Z";
      switch (token) {
        // Hours and optional minutes
        case "X":
          return formatTimezoneWithOptionalMinutes(timezoneOffset);
        // Hours, minutes and optional seconds without `:` delimiter
        // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
        // so this token always has the same output as `XX`
        case "XXXX":
        case "XX":
          return formatTimezone(timezoneOffset);
        // Hours and minutes with `:` delimiter
        default:
          return formatTimezone(timezoneOffset, ":");
      }
    },
    // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
    x: function(date, token, _localize) {
      let timezoneOffset = date.getTimezoneOffset();
      switch (token) {
        // Hours and optional minutes
        case "x":
          return formatTimezoneWithOptionalMinutes(timezoneOffset);
        // Hours, minutes and optional seconds without `:` delimiter
        // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
        // so this token always has the same output as `xx`
        case "xxxx":
        case "xx":
          return formatTimezone(timezoneOffset);
        // Hours and minutes with `:` delimiter
        default:
          return formatTimezone(timezoneOffset, ":");
      }
    },
    // Timezone (GMT)
    O: function(date, token, _localize) {
      let timezoneOffset = date.getTimezoneOffset();
      switch (token) {
        // Short
        case "O":
        case "OO":
        case "OOO":
          return "GMT" + formatTimezoneShort(timezoneOffset, ":");
        default:
          return "GMT" + formatTimezone(timezoneOffset, ":");
      }
    },
    // Timezone (specific non-location)
    z: function(date, token, _localize) {
      let timezoneOffset = date.getTimezoneOffset();
      switch (token) {
        // Short
        case "z":
        case "zz":
        case "zzz":
          return "GMT" + formatTimezoneShort(timezoneOffset, ":");
        default:
          return "GMT" + formatTimezone(timezoneOffset, ":");
      }
    },
    // Seconds timestamp
    t: function(date, token, _localize) {
      let timestamp = Math.trunc(+date / 1e3);
      return addLeadingZeros(timestamp, token.length);
    },
    // Milliseconds timestamp
    T: function(date, token, _localize) {
      return addLeadingZeros(+date, token.length);
    }
  };
  function formatTimezoneShort(offset, delimiter = "") {
    let sign = offset > 0 ? "-" : "+", absOffset = Math.abs(offset), hours = Math.trunc(absOffset / 60), minutes = absOffset % 60;
    return minutes === 0 ? sign + String(hours) : sign + String(hours) + delimiter + addLeadingZeros(minutes, 2);
  }
  function formatTimezoneWithOptionalMinutes(offset, delimiter) {
    return offset % 60 === 0 ? (offset > 0 ? "-" : "+") + addLeadingZeros(Math.abs(offset) / 60, 2) : formatTimezone(offset, delimiter);
  }
  function formatTimezone(offset, delimiter = "") {
    let sign = offset > 0 ? "-" : "+", absOffset = Math.abs(offset), hours = addLeadingZeros(Math.trunc(absOffset / 60), 2), minutes = addLeadingZeros(absOffset % 60, 2);
    return sign + hours + delimiter + minutes;
  }

  // node_modules/date-fns/_lib/format/longFormatters.js
  var dateLongFormatter = (pattern, formatLong3) => {
    switch (pattern) {
      case "P":
        return formatLong3.date({ width: "short" });
      case "PP":
        return formatLong3.date({ width: "medium" });
      case "PPP":
        return formatLong3.date({ width: "long" });
      default:
        return formatLong3.date({ width: "full" });
    }
  }, timeLongFormatter = (pattern, formatLong3) => {
    switch (pattern) {
      case "p":
        return formatLong3.time({ width: "short" });
      case "pp":
        return formatLong3.time({ width: "medium" });
      case "ppp":
        return formatLong3.time({ width: "long" });
      default:
        return formatLong3.time({ width: "full" });
    }
  }, dateTimeLongFormatter = (pattern, formatLong3) => {
    let matchResult = pattern.match(/(P+)(p+)?/) || [], datePattern = matchResult[1], timePattern = matchResult[2];
    if (!timePattern)
      return dateLongFormatter(pattern, formatLong3);
    let dateTimeFormat;
    switch (datePattern) {
      case "P":
        dateTimeFormat = formatLong3.dateTime({ width: "short" });
        break;
      case "PP":
        dateTimeFormat = formatLong3.dateTime({ width: "medium" });
        break;
      case "PPP":
        dateTimeFormat = formatLong3.dateTime({ width: "long" });
        break;
      default:
        dateTimeFormat = formatLong3.dateTime({ width: "full" });
        break;
    }
    return dateTimeFormat.replace("{{date}}", dateLongFormatter(datePattern, formatLong3)).replace("{{time}}", timeLongFormatter(timePattern, formatLong3));
  }, longFormatters = {
    p: timeLongFormatter,
    P: dateTimeLongFormatter
  };

  // node_modules/date-fns/_lib/protectedTokens.js
  var dayOfYearTokenRE = /^D+$/, weekYearTokenRE = /^Y+$/, throwTokens = ["D", "DD", "YY", "YYYY"];
  function isProtectedDayOfYearToken(token) {
    return dayOfYearTokenRE.test(token);
  }
  function isProtectedWeekYearToken(token) {
    return weekYearTokenRE.test(token);
  }
  function warnOrThrowProtectedError(token, format2, input) {
    let _message = message(token, format2, input);
    if (console.warn(_message), throwTokens.includes(token)) throw new RangeError(_message);
  }
  function message(token, format2, input) {
    let subject = token[0] === "Y" ? "years" : "days of the month";
    return `Use \`${token.toLowerCase()}\` instead of \`${token}\` (in \`${format2}\`) for formatting ${subject} to the input \`${input}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
  }

  // node_modules/date-fns/format.js
  var formattingTokensRegExp = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, escapedStringRegExp = /^'([^]*?)'?$/, doubleQuoteRegExp = /''/g, unescapedLatinCharacterRegExp = /[a-zA-Z]/;
  function format(date, formatStr, options) {
    let defaultOptions2 = getDefaultOptions(), locale = options?.locale ?? defaultOptions2.locale ?? enUS, firstWeekContainsDate = options?.firstWeekContainsDate ?? options?.locale?.options?.firstWeekContainsDate ?? defaultOptions2.firstWeekContainsDate ?? defaultOptions2.locale?.options?.firstWeekContainsDate ?? 1, weekStartsOn = options?.weekStartsOn ?? options?.locale?.options?.weekStartsOn ?? defaultOptions2.weekStartsOn ?? defaultOptions2.locale?.options?.weekStartsOn ?? 0, originalDate = toDate(date, options?.in);
    if (!isValid(originalDate))
      throw new RangeError("Invalid time value");
    let parts = formatStr.match(longFormattingTokensRegExp).map((substring) => {
      let firstCharacter = substring[0];
      if (firstCharacter === "p" || firstCharacter === "P") {
        let longFormatter = longFormatters[firstCharacter];
        return longFormatter(substring, locale.formatLong);
      }
      return substring;
    }).join("").match(formattingTokensRegExp).map((substring) => {
      if (substring === "''")
        return { isToken: !1, value: "'" };
      let firstCharacter = substring[0];
      if (firstCharacter === "'")
        return { isToken: !1, value: cleanEscapedString(substring) };
      if (formatters[firstCharacter])
        return { isToken: !0, value: substring };
      if (firstCharacter.match(unescapedLatinCharacterRegExp))
        throw new RangeError(
          "Format string contains an unescaped latin alphabet character `" + firstCharacter + "`"
        );
      return { isToken: !1, value: substring };
    });
    locale.localize.preprocessor && (parts = locale.localize.preprocessor(originalDate, parts));
    let formatterOptions = {
      firstWeekContainsDate,
      weekStartsOn,
      locale
    };
    return parts.map((part) => {
      if (!part.isToken) return part.value;
      let token = part.value;
      (!options?.useAdditionalWeekYearTokens && isProtectedWeekYearToken(token) || !options?.useAdditionalDayOfYearTokens && isProtectedDayOfYearToken(token)) && warnOrThrowProtectedError(token, formatStr, String(date));
      let formatter = formatters[token[0]];
      return formatter(originalDate, token, locale.localize, formatterOptions);
    }).join("");
  }
  function cleanEscapedString(input) {
    let matched = input.match(escapedStringRegExp);
    return matched ? matched[1].replace(doubleQuoteRegExp, "'") : input;
  }

  // node_modules/date-fns/getDaysInMonth.js
  function getDaysInMonth(date, options) {
    let _date = toDate(date, options?.in), year = _date.getFullYear(), monthIndex = _date.getMonth(), lastDayOfMonth = constructFrom(_date, 0);
    return lastDayOfMonth.setFullYear(year, monthIndex + 1, 0), lastDayOfMonth.setHours(0, 0, 0, 0), lastDayOfMonth.getDate();
  }

  // node_modules/date-fns/getMonth.js
  function getMonth(date, options) {
    return toDate(date, options?.in).getMonth();
  }

  // node_modules/date-fns/getYear.js
  function getYear(date, options) {
    return toDate(date, options?.in).getFullYear();
  }

  // node_modules/date-fns/isAfter.js
  function isAfter(date, dateToCompare) {
    return +toDate(date) > +toDate(dateToCompare);
  }

  // node_modules/date-fns/isBefore.js
  function isBefore(date, dateToCompare) {
    return +toDate(date) < +toDate(dateToCompare);
  }

  // node_modules/date-fns/isSameWeek.js
  function isSameWeek(laterDate, earlierDate, options) {
    let [laterDate_, earlierDate_] = normalizeDates(
      options?.in,
      laterDate,
      earlierDate
    );
    return +startOfWeek(laterDate_, options) == +startOfWeek(earlierDate_, options);
  }

  // node_modules/date-fns/isSameMonth.js
  function isSameMonth(laterDate, earlierDate, options) {
    let [laterDate_, earlierDate_] = normalizeDates(
      options?.in,
      laterDate,
      earlierDate
    );
    return laterDate_.getFullYear() === earlierDate_.getFullYear() && laterDate_.getMonth() === earlierDate_.getMonth();
  }

  // node_modules/date-fns/isSameYear.js
  function isSameYear(laterDate, earlierDate, options) {
    let [laterDate_, earlierDate_] = normalizeDates(
      options?.in,
      laterDate,
      earlierDate
    );
    return laterDate_.getFullYear() === earlierDate_.getFullYear();
  }

  // node_modules/date-fns/setMonth.js
  function setMonth(date, month, options) {
    let _date = toDate(date, options?.in), year = _date.getFullYear(), day = _date.getDate(), midMonth = constructFrom(options?.in || date, 0);
    midMonth.setFullYear(year, month, 15), midMonth.setHours(0, 0, 0, 0);
    let daysInMonth = getDaysInMonth(midMonth);
    return _date.setMonth(month, Math.min(day, daysInMonth)), _date;
  }

  // node_modules/date-fns/setYear.js
  function setYear(date, year, options) {
    let date_ = toDate(date, options?.in);
    return isNaN(+date_) ? constructFrom(options?.in || date, NaN) : (date_.setFullYear(year), date_);
  }

  // node_modules/react-day-picker/dist/esm/helpers/getBroadcastWeeksInMonth.js
  function getBroadcastWeeksInMonth(month, dateLib) {
    let firstDayOfMonth = dateLib.startOfMonth(month), firstDayOfWeek = firstDayOfMonth.getDay() > 0 ? firstDayOfMonth.getDay() : 7, broadcastStartDate = dateLib.addDays(month, -firstDayOfWeek + 1), lastDateOfLastWeek = dateLib.addDays(broadcastStartDate, 34);
    return dateLib.getMonth(month) === dateLib.getMonth(lastDateOfLastWeek) ? 5 : 4;
  }

  // node_modules/react-day-picker/dist/esm/helpers/startOfBroadcastWeek.js
  function startOfBroadcastWeek(date, dateLib) {
    let firstOfMonth = dateLib.startOfMonth(date), dayOfWeek = firstOfMonth.getDay();
    return dayOfWeek === 1 ? firstOfMonth : dayOfWeek === 0 ? dateLib.addDays(firstOfMonth, -6) : dateLib.addDays(firstOfMonth, -1 * (dayOfWeek - 1));
  }

  // node_modules/react-day-picker/dist/esm/helpers/endOfBroadcastWeek.js
  function endOfBroadcastWeek(date, dateLib) {
    let startDate = startOfBroadcastWeek(date, dateLib), numberOfWeeks = getBroadcastWeeksInMonth(date, dateLib);
    return dateLib.addDays(startDate, numberOfWeeks * 7 - 1);
  }

  // node_modules/date-fns/locale/zh-CN/_lib/formatDistance.js
  var formatDistanceLocale2 = {
    lessThanXSeconds: {
      one: "\u4E0D\u5230 1 \u79D2",
      other: "\u4E0D\u5230 {{count}} \u79D2"
    },
    xSeconds: {
      one: "1 \u79D2",
      other: "{{count}} \u79D2"
    },
    halfAMinute: "\u534A\u5206\u949F",
    lessThanXMinutes: {
      one: "\u4E0D\u5230 1 \u5206\u949F",
      other: "\u4E0D\u5230 {{count}} \u5206\u949F"
    },
    xMinutes: {
      one: "1 \u5206\u949F",
      other: "{{count}} \u5206\u949F"
    },
    xHours: {
      one: "1 \u5C0F\u65F6",
      other: "{{count}} \u5C0F\u65F6"
    },
    aboutXHours: {
      one: "\u5927\u7EA6 1 \u5C0F\u65F6",
      other: "\u5927\u7EA6 {{count}} \u5C0F\u65F6"
    },
    xDays: {
      one: "1 \u5929",
      other: "{{count}} \u5929"
    },
    aboutXWeeks: {
      one: "\u5927\u7EA6 1 \u4E2A\u661F\u671F",
      other: "\u5927\u7EA6 {{count}} \u4E2A\u661F\u671F"
    },
    xWeeks: {
      one: "1 \u4E2A\u661F\u671F",
      other: "{{count}} \u4E2A\u661F\u671F"
    },
    aboutXMonths: {
      one: "\u5927\u7EA6 1 \u4E2A\u6708",
      other: "\u5927\u7EA6 {{count}} \u4E2A\u6708"
    },
    xMonths: {
      one: "1 \u4E2A\u6708",
      other: "{{count}} \u4E2A\u6708"
    },
    aboutXYears: {
      one: "\u5927\u7EA6 1 \u5E74",
      other: "\u5927\u7EA6 {{count}} \u5E74"
    },
    xYears: {
      one: "1 \u5E74",
      other: "{{count}} \u5E74"
    },
    overXYears: {
      one: "\u8D85\u8FC7 1 \u5E74",
      other: "\u8D85\u8FC7 {{count}} \u5E74"
    },
    almostXYears: {
      one: "\u5C06\u8FD1 1 \u5E74",
      other: "\u5C06\u8FD1 {{count}} \u5E74"
    }
  }, formatDistance2 = (token, count, options) => {
    let result, tokenValue = formatDistanceLocale2[token];
    return typeof tokenValue == "string" ? result = tokenValue : count === 1 ? result = tokenValue.one : result = tokenValue.other.replace("{{count}}", String(count)), options?.addSuffix ? options.comparison && options.comparison > 0 ? result + "\u5185" : result + "\u524D" : result;
  };

  // node_modules/date-fns/locale/zh-CN/_lib/formatLong.js
  var dateFormats2 = {
    full: "y'\u5E74'M'\u6708'd'\u65E5' EEEE",
    long: "y'\u5E74'M'\u6708'd'\u65E5'",
    medium: "yyyy-MM-dd",
    short: "yy-MM-dd"
  }, timeFormats2 = {
    full: "zzzz a h:mm:ss",
    long: "z a h:mm:ss",
    medium: "a h:mm:ss",
    short: "a h:mm"
  }, dateTimeFormats2 = {
    full: "{{date}} {{time}}",
    long: "{{date}} {{time}}",
    medium: "{{date}} {{time}}",
    short: "{{date}} {{time}}"
  }, formatLong2 = {
    date: buildFormatLongFn({
      formats: dateFormats2,
      defaultWidth: "full"
    }),
    time: buildFormatLongFn({
      formats: timeFormats2,
      defaultWidth: "full"
    }),
    dateTime: buildFormatLongFn({
      formats: dateTimeFormats2,
      defaultWidth: "full"
    })
  };

  // node_modules/date-fns/locale/zh-CN/_lib/formatRelative.js
  function checkWeek(date, baseDate, options) {
    let baseFormat = "eeee p";
    return isSameWeek(date, baseDate, options) ? baseFormat : date.getTime() > baseDate.getTime() ? "'\u4E0B\u4E2A'" + baseFormat : "'\u4E0A\u4E2A'" + baseFormat;
  }
  var formatRelativeLocale2 = {
    lastWeek: checkWeek,
    // days before yesterday, maybe in this week or last week
    yesterday: "'\u6628\u5929' p",
    today: "'\u4ECA\u5929' p",
    tomorrow: "'\u660E\u5929' p",
    nextWeek: checkWeek,
    // days after tomorrow, maybe in this week or next week
    other: "PP p"
  }, formatRelative2 = (token, date, baseDate, options) => {
    let format2 = formatRelativeLocale2[token];
    return typeof format2 == "function" ? format2(date, baseDate, options) : format2;
  };

  // node_modules/date-fns/locale/zh-CN/_lib/localize.js
  var eraValues2 = {
    narrow: ["\u524D", "\u516C\u5143"],
    abbreviated: ["\u524D", "\u516C\u5143"],
    wide: ["\u516C\u5143\u524D", "\u516C\u5143"]
  }, quarterValues2 = {
    narrow: ["1", "2", "3", "4"],
    abbreviated: ["\u7B2C\u4E00\u5B63", "\u7B2C\u4E8C\u5B63", "\u7B2C\u4E09\u5B63", "\u7B2C\u56DB\u5B63"],
    wide: ["\u7B2C\u4E00\u5B63\u5EA6", "\u7B2C\u4E8C\u5B63\u5EA6", "\u7B2C\u4E09\u5B63\u5EA6", "\u7B2C\u56DB\u5B63\u5EA6"]
  }, monthValues2 = {
    narrow: [
      "\u4E00",
      "\u4E8C",
      "\u4E09",
      "\u56DB",
      "\u4E94",
      "\u516D",
      "\u4E03",
      "\u516B",
      "\u4E5D",
      "\u5341",
      "\u5341\u4E00",
      "\u5341\u4E8C"
    ],
    abbreviated: [
      "1\u6708",
      "2\u6708",
      "3\u6708",
      "4\u6708",
      "5\u6708",
      "6\u6708",
      "7\u6708",
      "8\u6708",
      "9\u6708",
      "10\u6708",
      "11\u6708",
      "12\u6708"
    ],
    wide: [
      "\u4E00\u6708",
      "\u4E8C\u6708",
      "\u4E09\u6708",
      "\u56DB\u6708",
      "\u4E94\u6708",
      "\u516D\u6708",
      "\u4E03\u6708",
      "\u516B\u6708",
      "\u4E5D\u6708",
      "\u5341\u6708",
      "\u5341\u4E00\u6708",
      "\u5341\u4E8C\u6708"
    ]
  }, dayValues2 = {
    narrow: ["\u65E5", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D"],
    short: ["\u65E5", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D"],
    abbreviated: ["\u5468\u65E5", "\u5468\u4E00", "\u5468\u4E8C", "\u5468\u4E09", "\u5468\u56DB", "\u5468\u4E94", "\u5468\u516D"],
    wide: ["\u661F\u671F\u65E5", "\u661F\u671F\u4E00", "\u661F\u671F\u4E8C", "\u661F\u671F\u4E09", "\u661F\u671F\u56DB", "\u661F\u671F\u4E94", "\u661F\u671F\u516D"]
  }, dayPeriodValues2 = {
    narrow: {
      am: "\u4E0A",
      pm: "\u4E0B",
      midnight: "\u51CC\u6668",
      noon: "\u5348",
      morning: "\u65E9",
      afternoon: "\u4E0B\u5348",
      evening: "\u665A",
      night: "\u591C"
    },
    abbreviated: {
      am: "\u4E0A\u5348",
      pm: "\u4E0B\u5348",
      midnight: "\u51CC\u6668",
      noon: "\u4E2D\u5348",
      morning: "\u65E9\u6668",
      afternoon: "\u4E2D\u5348",
      evening: "\u665A\u4E0A",
      night: "\u591C\u95F4"
    },
    wide: {
      am: "\u4E0A\u5348",
      pm: "\u4E0B\u5348",
      midnight: "\u51CC\u6668",
      noon: "\u4E2D\u5348",
      morning: "\u65E9\u6668",
      afternoon: "\u4E2D\u5348",
      evening: "\u665A\u4E0A",
      night: "\u591C\u95F4"
    }
  }, formattingDayPeriodValues2 = {
    narrow: {
      am: "\u4E0A",
      pm: "\u4E0B",
      midnight: "\u51CC\u6668",
      noon: "\u5348",
      morning: "\u65E9",
      afternoon: "\u4E0B\u5348",
      evening: "\u665A",
      night: "\u591C"
    },
    abbreviated: {
      am: "\u4E0A\u5348",
      pm: "\u4E0B\u5348",
      midnight: "\u51CC\u6668",
      noon: "\u4E2D\u5348",
      morning: "\u65E9\u6668",
      afternoon: "\u4E2D\u5348",
      evening: "\u665A\u4E0A",
      night: "\u591C\u95F4"
    },
    wide: {
      am: "\u4E0A\u5348",
      pm: "\u4E0B\u5348",
      midnight: "\u51CC\u6668",
      noon: "\u4E2D\u5348",
      morning: "\u65E9\u6668",
      afternoon: "\u4E2D\u5348",
      evening: "\u665A\u4E0A",
      night: "\u591C\u95F4"
    }
  }, ordinalNumber2 = (dirtyNumber, options) => {
    let number = Number(dirtyNumber);
    switch (options?.unit) {
      case "date":
        return number.toString() + "\u65E5";
      case "hour":
        return number.toString() + "\u65F6";
      case "minute":
        return number.toString() + "\u5206";
      case "second":
        return number.toString() + "\u79D2";
      default:
        return "\u7B2C " + number.toString();
    }
  }, localize2 = {
    ordinalNumber: ordinalNumber2,
    era: buildLocalizeFn({
      values: eraValues2,
      defaultWidth: "wide"
    }),
    quarter: buildLocalizeFn({
      values: quarterValues2,
      defaultWidth: "wide",
      argumentCallback: (quarter) => quarter - 1
    }),
    month: buildLocalizeFn({
      values: monthValues2,
      defaultWidth: "wide"
    }),
    day: buildLocalizeFn({
      values: dayValues2,
      defaultWidth: "wide"
    }),
    dayPeriod: buildLocalizeFn({
      values: dayPeriodValues2,
      defaultWidth: "wide",
      formattingValues: formattingDayPeriodValues2,
      defaultFormattingWidth: "wide"
    })
  };

  // node_modules/date-fns/locale/zh-CN/_lib/match.js
  var matchOrdinalNumberPattern2 = /^(第\s*)?\d+(日|时|分|秒)?/i, parseOrdinalNumberPattern2 = /\d+/i, matchEraPatterns2 = {
    narrow: /^(前)/i,
    abbreviated: /^(前)/i,
    wide: /^(公元前|公元)/i
  }, parseEraPatterns2 = {
    any: [/^(前)/i, /^(公元)/i]
  }, matchQuarterPatterns2 = {
    narrow: /^[1234]/i,
    abbreviated: /^第[一二三四]刻/i,
    wide: /^第[一二三四]刻钟/i
  }, parseQuarterPatterns2 = {
    any: [/(1|一)/i, /(2|二)/i, /(3|三)/i, /(4|四)/i]
  }, matchMonthPatterns2 = {
    narrow: /^(一|二|三|四|五|六|七|八|九|十[二一]?)/i,
    abbreviated: /^(一|二|三|四|五|六|七|八|九|十[二一]?|\d|1[0-2])月/i,
    wide: /^(一|二|三|四|五|六|七|八|九|十[二一]?)月/i
  }, parseMonthPatterns2 = {
    narrow: [
      /^一/i,
      /^二/i,
      /^三/i,
      /^四/i,
      /^五/i,
      /^六/i,
      /^七/i,
      /^八/i,
      /^九/i,
      /^十(?!(一|二))/i,
      /^十一/i,
      /^十二/i
    ],
    any: [
      /^(一|1(?!\d))/i,
      /^(二|2)/i,
      /^(三|3)/i,
      /^(四|4)/i,
      /^(五|5)/i,
      /^(六|6)/i,
      /^(七|7)/i,
      /^(八|8)/i,
      /^(九|9)/i,
      /^(十(?!(一|二))|10)/i,
      /^(十一|11)/i,
      /^(十二|12)/i
    ]
  }, matchDayPatterns2 = {
    narrow: /^[一二三四五六日]/i,
    short: /^[一二三四五六日]/i,
    abbreviated: /^周[一二三四五六日]/i,
    wide: /^星期[一二三四五六日]/i
  }, parseDayPatterns2 = {
    any: [/日/i, /一/i, /二/i, /三/i, /四/i, /五/i, /六/i]
  }, matchDayPeriodPatterns2 = {
    any: /^(上午?|下午?|午夜|[中正]午|早上?|下午|晚上?|凌晨|)/i
  }, parseDayPeriodPatterns2 = {
    any: {
      am: /^上午?/i,
      pm: /^下午?/i,
      midnight: /^午夜/i,
      noon: /^[中正]午/i,
      morning: /^早上/i,
      afternoon: /^下午/i,
      evening: /^晚上?/i,
      night: /^凌晨/i
    }
  }, match2 = {
    ordinalNumber: buildMatchPatternFn({
      matchPattern: matchOrdinalNumberPattern2,
      parsePattern: parseOrdinalNumberPattern2,
      valueCallback: (value) => parseInt(value, 10)
    }),
    era: buildMatchFn({
      matchPatterns: matchEraPatterns2,
      defaultMatchWidth: "wide",
      parsePatterns: parseEraPatterns2,
      defaultParseWidth: "any"
    }),
    quarter: buildMatchFn({
      matchPatterns: matchQuarterPatterns2,
      defaultMatchWidth: "wide",
      parsePatterns: parseQuarterPatterns2,
      defaultParseWidth: "any",
      valueCallback: (index) => index + 1
    }),
    month: buildMatchFn({
      matchPatterns: matchMonthPatterns2,
      defaultMatchWidth: "wide",
      parsePatterns: parseMonthPatterns2,
      defaultParseWidth: "any"
    }),
    day: buildMatchFn({
      matchPatterns: matchDayPatterns2,
      defaultMatchWidth: "wide",
      parsePatterns: parseDayPatterns2,
      defaultParseWidth: "any"
    }),
    dayPeriod: buildMatchFn({
      matchPatterns: matchDayPeriodPatterns2,
      defaultMatchWidth: "any",
      parsePatterns: parseDayPeriodPatterns2,
      defaultParseWidth: "any"
    })
  };

  // node_modules/date-fns/locale/zh-CN.js
  var zhCN = {
    code: "zh-CN",
    formatDistance: formatDistance2,
    formatLong: formatLong2,
    formatRelative: formatRelative2,
    localize: localize2,
    match: match2,
    options: {
      weekStartsOn: 1,
      firstWeekContainsDate: 4
    }
  };

  // node_modules/react-day-picker/dist/esm/locale/en-US.js
  var enUS2 = {
    ...enUS,
    labels: {
      labelDayButton: (date, modifiers, options, dateLib) => {
        let formatDate;
        dateLib && typeof dateLib.format == "function" ? formatDate = dateLib.format.bind(dateLib) : formatDate = (d, pattern) => format(d, pattern, { locale: enUS, ...options });
        let label = formatDate(date, "PPPP");
        return modifiers.today && (label = `Today, ${label}`), modifiers.selected && (label = `${label}, selected`), label;
      },
      labelMonthDropdown: "Choose the Month",
      labelNext: "Go to the Next Month",
      labelPrevious: "Go to the Previous Month",
      labelWeekNumber: (weekNumber) => `Week ${weekNumber}`,
      labelYearDropdown: "Choose the Year",
      labelGrid: (date, options, dateLib) => {
        let formatDate;
        return dateLib && typeof dateLib.format == "function" ? formatDate = dateLib.format.bind(dateLib) : formatDate = (d, pattern) => format(d, pattern, { locale: enUS, ...options }), formatDate(date, "LLLL yyyy");
      },
      labelGridcell: (date, modifiers, options, dateLib) => {
        let formatDate;
        dateLib && typeof dateLib.format == "function" ? formatDate = dateLib.format.bind(dateLib) : formatDate = (d, pattern) => format(d, pattern, { locale: enUS, ...options });
        let label = formatDate(date, "PPPP");
        return modifiers?.today && (label = `Today, ${label}`), label;
      },
      labelNav: "Navigation bar",
      labelWeekNumberHeader: "Week Number",
      labelWeekday: (date, options, dateLib) => {
        let formatDate;
        return dateLib && typeof dateLib.format == "function" ? formatDate = dateLib.format.bind(dateLib) : formatDate = (d, pattern) => format(d, pattern, { locale: enUS, ...options }), formatDate(date, "cccc");
      }
    }
  };

  // node_modules/react-day-picker/dist/esm/classes/DateLib.js
  var DateLib = class _DateLib {
    /**
     * Creates an instance of `DateLib`.
     *
     * @param options Configuration options for the date library.
     * @param overrides Custom overrides for the date library functions.
     */
    constructor(options, overrides) {
      this.today = () => {
        if (this.overrides?.today)
          return this.overrides.today();
        if (this.options.timeZone)
          return TZDate.tz(this.options.timeZone);
        let DateCtor = this.options.Date ?? Date;
        return new DateCtor();
      }, this.newDate = (year, monthIndex, date) => this.overrides?.newDate ? this.overrides.newDate(year, monthIndex, date) : this.options.timeZone ? new TZDate(year, monthIndex, date, this.options.timeZone) : new Date(year, monthIndex, date), this.addDays = (date, amount) => this.overrides?.addDays ? this.overrides.addDays(date, amount) : addDays(date, amount), this.addMonths = (date, amount) => this.overrides?.addMonths ? this.overrides.addMonths(date, amount) : addMonths(date, amount), this.addWeeks = (date, amount) => this.overrides?.addWeeks ? this.overrides.addWeeks(date, amount) : addWeeks(date, amount), this.addYears = (date, amount) => this.overrides?.addYears ? this.overrides.addYears(date, amount) : addYears(date, amount), this.differenceInCalendarDays = (dateLeft, dateRight) => this.overrides?.differenceInCalendarDays ? this.overrides.differenceInCalendarDays(dateLeft, dateRight) : differenceInCalendarDays(dateLeft, dateRight), this.differenceInCalendarMonths = (dateLeft, dateRight) => this.overrides?.differenceInCalendarMonths ? this.overrides.differenceInCalendarMonths(dateLeft, dateRight) : differenceInCalendarMonths(dateLeft, dateRight), this.eachMonthOfInterval = (interval) => this.overrides?.eachMonthOfInterval ? this.overrides.eachMonthOfInterval(interval) : eachMonthOfInterval(interval), this.eachYearOfInterval = (interval) => {
        let years = this.overrides?.eachYearOfInterval ? this.overrides.eachYearOfInterval(interval) : eachYearOfInterval(interval), uniqueYears = new Set(years.map((d) => this.getYear(d)));
        if (uniqueYears.size === years.length)
          return years;
        let yearsArray = [];
        return uniqueYears.forEach((y) => {
          yearsArray.push(new Date(y, 0, 1));
        }), yearsArray;
      }, this.endOfBroadcastWeek = (date) => this.overrides?.endOfBroadcastWeek ? this.overrides.endOfBroadcastWeek(date) : endOfBroadcastWeek(date, this), this.endOfISOWeek = (date) => this.overrides?.endOfISOWeek ? this.overrides.endOfISOWeek(date) : endOfISOWeek(date), this.endOfMonth = (date) => this.overrides?.endOfMonth ? this.overrides.endOfMonth(date) : endOfMonth(date), this.endOfWeek = (date, options2) => this.overrides?.endOfWeek ? this.overrides.endOfWeek(date, options2) : endOfWeek(date, this.options), this.endOfYear = (date) => this.overrides?.endOfYear ? this.overrides.endOfYear(date) : endOfYear(date), this.format = (date, formatStr, _options) => {
        let formatted = this.overrides?.format ? this.overrides.format(date, formatStr, this.options) : format(date, formatStr, this.options);
        return this.options.numerals && this.options.numerals !== "latn" ? this.replaceDigits(formatted) : formatted;
      }, this.getISOWeek = (date) => this.overrides?.getISOWeek ? this.overrides.getISOWeek(date) : getISOWeek(date), this.getMonth = (date, _options) => this.overrides?.getMonth ? this.overrides.getMonth(date, this.options) : getMonth(date, this.options), this.getYear = (date, _options) => this.overrides?.getYear ? this.overrides.getYear(date, this.options) : getYear(date, this.options), this.getWeek = (date, _options) => this.overrides?.getWeek ? this.overrides.getWeek(date, this.options) : getWeek(date, this.options), this.isAfter = (date, dateToCompare) => this.overrides?.isAfter ? this.overrides.isAfter(date, dateToCompare) : isAfter(date, dateToCompare), this.isBefore = (date, dateToCompare) => this.overrides?.isBefore ? this.overrides.isBefore(date, dateToCompare) : isBefore(date, dateToCompare), this.isDate = (value) => this.overrides?.isDate ? this.overrides.isDate(value) : isDate(value), this.isSameDay = (dateLeft, dateRight) => this.overrides?.isSameDay ? this.overrides.isSameDay(dateLeft, dateRight) : isSameDay(dateLeft, dateRight), this.isSameMonth = (dateLeft, dateRight) => this.overrides?.isSameMonth ? this.overrides.isSameMonth(dateLeft, dateRight) : isSameMonth(dateLeft, dateRight), this.isSameYear = (dateLeft, dateRight) => this.overrides?.isSameYear ? this.overrides.isSameYear(dateLeft, dateRight) : isSameYear(dateLeft, dateRight), this.max = (dates) => this.overrides?.max ? this.overrides.max(dates) : max(dates), this.min = (dates) => this.overrides?.min ? this.overrides.min(dates) : min(dates), this.setMonth = (date, month) => this.overrides?.setMonth ? this.overrides.setMonth(date, month) : setMonth(date, month), this.setYear = (date, year) => this.overrides?.setYear ? this.overrides.setYear(date, year) : setYear(date, year), this.startOfBroadcastWeek = (date, _dateLib) => this.overrides?.startOfBroadcastWeek ? this.overrides.startOfBroadcastWeek(date, this) : startOfBroadcastWeek(date, this), this.startOfDay = (date) => this.overrides?.startOfDay ? this.overrides.startOfDay(date) : startOfDay(date), this.startOfISOWeek = (date) => this.overrides?.startOfISOWeek ? this.overrides.startOfISOWeek(date) : startOfISOWeek(date), this.startOfMonth = (date) => this.overrides?.startOfMonth ? this.overrides.startOfMonth(date) : startOfMonth(date), this.startOfWeek = (date, _options) => this.overrides?.startOfWeek ? this.overrides.startOfWeek(date, this.options) : startOfWeek(date, this.options), this.startOfYear = (date) => this.overrides?.startOfYear ? this.overrides.startOfYear(date) : startOfYear(date), this.options = { locale: enUS2, ...options }, this.overrides = overrides;
    }
    /**
     * Generates a mapping of Arabic digits (0-9) to the target numbering system
     * digits.
     *
     * @since 9.5.0
     * @returns A record mapping Arabic digits to the target numerals.
     */
    getDigitMap() {
      let { numerals = "latn" } = this.options, formatter = new Intl.NumberFormat("en-US", {
        numberingSystem: numerals
      }), digitMap = {};
      for (let i = 0; i < 10; i++)
        digitMap[i.toString()] = formatter.format(i);
      return digitMap;
    }
    /**
     * Replaces Arabic digits in a string with the target numbering system digits.
     *
     * @since 9.5.0
     * @param input The string containing Arabic digits.
     * @returns The string with digits replaced.
     */
    replaceDigits(input) {
      let digitMap = this.getDigitMap();
      return input.replace(/\d/g, (digit) => digitMap[digit] || digit);
    }
    /**
     * Formats a number using the configured numbering system.
     *
     * @since 9.5.0
     * @param value The number to format.
     * @returns The formatted number as a string.
     */
    formatNumber(value) {
      return this.replaceDigits(value.toString());
    }
    /**
     * Returns the preferred ordering for month and year labels for the current
     * locale.
     */
    getMonthYearOrder() {
      let code = this.options.locale?.code;
      return code && _DateLib.yearFirstLocales.has(code) ? "year-first" : "month-first";
    }
    /**
     * Formats the month/year pair respecting locale conventions.
     *
     * @since 9.11.0
     */
    formatMonthYear(date) {
      let { locale, timeZone, numerals } = this.options, localeCode = locale?.code;
      if (localeCode && _DateLib.yearFirstLocales.has(localeCode))
        try {
          return new Intl.DateTimeFormat(localeCode, {
            month: "long",
            year: "numeric",
            timeZone,
            numberingSystem: numerals
          }).format(date);
        } catch {
        }
      let pattern = this.getMonthYearOrder() === "year-first" ? "y LLLL" : "LLLL y";
      return this.format(date, pattern);
    }
  };
  DateLib.yearFirstLocales = /* @__PURE__ */ new Set([
    "eu",
    "hu",
    "ja",
    "ja-Hira",
    "ja-JP",
    "ko",
    "ko-KR",
    "lt",
    "lt-LT",
    "lv",
    "lv-LV",
    "mn",
    "mn-MN",
    "zh",
    "zh-CN",
    "zh-HK",
    "zh-TW"
  ]);
  var defaultDateLib = new DateLib();

  // node_modules/react-day-picker/dist/esm/classes/CalendarDay.js
  var CalendarDay = class {
    constructor(date, displayMonth, dateLib = defaultDateLib) {
      this.date = date, this.displayMonth = displayMonth, this.outside = !!(displayMonth && !dateLib.isSameMonth(date, displayMonth)), this.dateLib = dateLib, this.isoDate = dateLib.format(date, "yyyy-MM-dd"), this.displayMonthId = dateLib.format(displayMonth, "yyyy-MM"), this.dateMonthId = dateLib.format(date, "yyyy-MM");
    }
    /**
     * Checks if this day is equal to another `CalendarDay`, considering both the
     * date and the displayed month.
     *
     * @param day The `CalendarDay` to compare with.
     * @returns `true` if the days are equal, otherwise `false`.
     */
    isEqualTo(day) {
      return this.dateLib.isSameDay(day.date, this.date) && this.dateLib.isSameMonth(day.displayMonth, this.displayMonth);
    }
  };

  // node_modules/react-day-picker/dist/esm/classes/CalendarMonth.js
  var CalendarMonth = class {
    constructor(month, weeks) {
      this.date = month, this.weeks = weeks;
    }
  };

  // node_modules/react-day-picker/dist/esm/classes/CalendarWeek.js
  var CalendarWeek = class {
    constructor(weekNumber, days) {
      this.days = days, this.weekNumber = weekNumber;
    }
  };

  // node_modules/react-day-picker/dist/esm/components/custom-components.js
  var custom_components_exports = {};
  __export(custom_components_exports, {
    CaptionLabel: () => CaptionLabel,
    Chevron: () => Chevron,
    Day: () => Day,
    DayButton: () => DayButton,
    Dropdown: () => Dropdown,
    DropdownNav: () => DropdownNav,
    Footer: () => Footer,
    Month: () => Month,
    MonthCaption: () => MonthCaption,
    MonthGrid: () => MonthGrid,
    Months: () => Months,
    MonthsDropdown: () => MonthsDropdown,
    Nav: () => Nav,
    NextMonthButton: () => NextMonthButton,
    Option: () => Option,
    PreviousMonthButton: () => PreviousMonthButton,
    Root: () => Root,
    Select: () => Select,
    Week: () => Week,
    WeekNumber: () => WeekNumber,
    WeekNumberHeader: () => WeekNumberHeader,
    Weekday: () => Weekday,
    Weekdays: () => Weekdays,
    Weeks: () => Weeks,
    YearsDropdown: () => YearsDropdown
  });

  // node_modules/react-day-picker/dist/esm/components/CaptionLabel.js
  var import_react = __toESM(require_react(), 1);
  function CaptionLabel(props) {
    return import_react.default.createElement("span", { ...props });
  }

  // node_modules/react-day-picker/dist/esm/components/Chevron.js
  var import_react2 = __toESM(require_react(), 1);
  function Chevron(props) {
    let { size = 24, orientation = "left", className, style } = props;
    return import_react2.default.createElement(
      "svg",
      { className, style, width: size, height: size, viewBox: "0 0 24 24" },
      orientation === "up" && import_react2.default.createElement("polygon", { points: "6.77 17 12.5 11.43 18.24 17 20 15.28 12.5 8 5 15.28" }),
      orientation === "down" && import_react2.default.createElement("polygon", { points: "6.77 8 12.5 13.57 18.24 8 20 9.72 12.5 17 5 9.72" }),
      orientation === "left" && import_react2.default.createElement("polygon", { points: "16 18.112 9.81111111 12 16 5.87733333 14.0888889 4 6 12 14.0888889 20" }),
      orientation === "right" && import_react2.default.createElement("polygon", { points: "8 18.112 14.18888889 12 8 5.87733333 9.91111111 4 18 12 9.91111111 20" })
    );
  }

  // node_modules/react-day-picker/dist/esm/components/Day.js
  var import_react3 = __toESM(require_react(), 1);
  function Day(props) {
    let { day, modifiers, ...tdProps } = props;
    return import_react3.default.createElement("td", { ...tdProps });
  }

  // node_modules/react-day-picker/dist/esm/components/DayButton.js
  var import_react4 = __toESM(require_react(), 1);
  function DayButton(props) {
    let { day, modifiers, ...buttonProps } = props, ref = import_react4.default.useRef(null);
    return import_react4.default.useEffect(() => {
      modifiers.focused && ref.current?.focus();
    }, [modifiers.focused]), import_react4.default.createElement("button", { ref, ...buttonProps });
  }

  // node_modules/react-day-picker/dist/esm/components/Dropdown.js
  var import_react6 = __toESM(require_react(), 1);

  // node_modules/react-day-picker/dist/esm/UI.js
  var UI;
  (function(UI2) {
    UI2.Root = "root", UI2.Chevron = "chevron", UI2.Day = "day", UI2.DayButton = "day_button", UI2.CaptionLabel = "caption_label", UI2.Dropdowns = "dropdowns", UI2.Dropdown = "dropdown", UI2.DropdownRoot = "dropdown_root", UI2.Footer = "footer", UI2.MonthGrid = "month_grid", UI2.MonthCaption = "month_caption", UI2.MonthsDropdown = "months_dropdown", UI2.Month = "month", UI2.Months = "months", UI2.Nav = "nav", UI2.NextMonthButton = "button_next", UI2.PreviousMonthButton = "button_previous", UI2.Week = "week", UI2.Weeks = "weeks", UI2.Weekday = "weekday", UI2.Weekdays = "weekdays", UI2.WeekNumber = "week_number", UI2.WeekNumberHeader = "week_number_header", UI2.YearsDropdown = "years_dropdown";
  })(UI || (UI = {}));
  var DayFlag;
  (function(DayFlag2) {
    DayFlag2.disabled = "disabled", DayFlag2.hidden = "hidden", DayFlag2.outside = "outside", DayFlag2.focused = "focused", DayFlag2.today = "today";
  })(DayFlag || (DayFlag = {}));
  var SelectionState;
  (function(SelectionState2) {
    SelectionState2.range_end = "range_end", SelectionState2.range_middle = "range_middle", SelectionState2.range_start = "range_start", SelectionState2.selected = "selected";
  })(SelectionState || (SelectionState = {}));
  var Animation;
  (function(Animation2) {
    Animation2.weeks_before_enter = "weeks_before_enter", Animation2.weeks_before_exit = "weeks_before_exit", Animation2.weeks_after_enter = "weeks_after_enter", Animation2.weeks_after_exit = "weeks_after_exit", Animation2.caption_after_enter = "caption_after_enter", Animation2.caption_after_exit = "caption_after_exit", Animation2.caption_before_enter = "caption_before_enter", Animation2.caption_before_exit = "caption_before_exit";
  })(Animation || (Animation = {}));

  // node_modules/react-day-picker/dist/esm/useDayPicker.js
  var import_react5 = __toESM(require_react(), 1), dayPickerContext = (0, import_react5.createContext)(void 0);
  function useDayPicker() {
    let context = (0, import_react5.useContext)(dayPickerContext);
    if (context === void 0)
      throw new Error("useDayPicker() must be used within a custom component.");
    return context;
  }

  // node_modules/react-day-picker/dist/esm/components/Dropdown.js
  function Dropdown(props) {
    let { options, className, ...selectProps } = props, { classNames, components, styles } = useDayPicker(), cssClassSelect = [classNames[UI.Dropdown], className].join(" "), selectedOption = options?.find(({ value }) => value === selectProps.value);
    return import_react6.default.createElement(
      "span",
      { "data-disabled": selectProps.disabled, className: classNames[UI.DropdownRoot], style: styles?.[UI.DropdownRoot] },
      import_react6.default.createElement(components.Select, { className: cssClassSelect, ...selectProps }, options?.map(({ value, label, disabled }) => import_react6.default.createElement(components.Option, { key: value, value, disabled }, label))),
      import_react6.default.createElement(
        "span",
        { className: classNames[UI.CaptionLabel], style: styles?.[UI.CaptionLabel], "aria-hidden": !0 },
        selectedOption?.label,
        import_react6.default.createElement(components.Chevron, { orientation: "down", size: 18, className: classNames[UI.Chevron], style: styles?.[UI.Chevron] })
      )
    );
  }

  // node_modules/react-day-picker/dist/esm/components/DropdownNav.js
  var import_react7 = __toESM(require_react(), 1);
  function DropdownNav(props) {
    return import_react7.default.createElement("div", { ...props });
  }

  // node_modules/react-day-picker/dist/esm/components/Footer.js
  var import_react8 = __toESM(require_react(), 1);
  function Footer(props) {
    return import_react8.default.createElement("div", { ...props });
  }

  // node_modules/react-day-picker/dist/esm/components/Month.js
  var import_react9 = __toESM(require_react(), 1);
  function Month(props) {
    let { calendarMonth, displayIndex, ...divProps } = props;
    return import_react9.default.createElement("div", { ...divProps }, props.children);
  }

  // node_modules/react-day-picker/dist/esm/components/MonthCaption.js
  var import_react10 = __toESM(require_react(), 1);
  function MonthCaption(props) {
    let { calendarMonth, displayIndex, ...divProps } = props;
    return import_react10.default.createElement("div", { ...divProps });
  }

  // node_modules/react-day-picker/dist/esm/components/MonthGrid.js
  var import_react11 = __toESM(require_react(), 1);
  function MonthGrid(props) {
    return import_react11.default.createElement("table", { ...props });
  }

  // node_modules/react-day-picker/dist/esm/components/Months.js
  var import_react12 = __toESM(require_react(), 1);
  function Months(props) {
    return import_react12.default.createElement("div", { ...props });
  }

  // node_modules/react-day-picker/dist/esm/components/MonthsDropdown.js
  var import_react13 = __toESM(require_react(), 1);
  function MonthsDropdown(props) {
    let { components } = useDayPicker();
    return import_react13.default.createElement(components.Dropdown, { ...props });
  }

  // node_modules/react-day-picker/dist/esm/components/Nav.js
  var import_react14 = __toESM(require_react(), 1);
  function Nav(props) {
    let { onPreviousClick, onNextClick, previousMonth, nextMonth, ...navProps } = props, { components, classNames, styles, labels: { labelPrevious: labelPrevious2, labelNext: labelNext2 } } = useDayPicker(), handleNextClick = (0, import_react14.useCallback)((e) => {
      nextMonth && onNextClick?.(e);
    }, [nextMonth, onNextClick]), handlePreviousClick = (0, import_react14.useCallback)((e) => {
      previousMonth && onPreviousClick?.(e);
    }, [previousMonth, onPreviousClick]);
    return import_react14.default.createElement(
      "nav",
      { ...navProps },
      import_react14.default.createElement(
        components.PreviousMonthButton,
        { type: "button", className: classNames[UI.PreviousMonthButton], style: styles?.[UI.PreviousMonthButton], tabIndex: previousMonth ? void 0 : -1, "aria-disabled": previousMonth ? void 0 : !0, "aria-label": labelPrevious2(previousMonth), onClick: handlePreviousClick },
        import_react14.default.createElement(components.Chevron, { disabled: previousMonth ? void 0 : !0, className: classNames[UI.Chevron], style: styles?.[UI.Chevron], orientation: "left" })
      ),
      import_react14.default.createElement(
        components.NextMonthButton,
        { type: "button", className: classNames[UI.NextMonthButton], style: styles?.[UI.NextMonthButton], tabIndex: nextMonth ? void 0 : -1, "aria-disabled": nextMonth ? void 0 : !0, "aria-label": labelNext2(nextMonth), onClick: handleNextClick },
        import_react14.default.createElement(components.Chevron, { disabled: nextMonth ? void 0 : !0, orientation: "right", className: classNames[UI.Chevron], style: styles?.[UI.Chevron] })
      )
    );
  }

  // node_modules/react-day-picker/dist/esm/components/NextMonthButton.js
  var import_react15 = __toESM(require_react(), 1);
  function NextMonthButton(props) {
    return import_react15.default.createElement("button", { ...props });
  }

  // node_modules/react-day-picker/dist/esm/components/Option.js
  var import_react16 = __toESM(require_react(), 1);
  function Option(props) {
    return import_react16.default.createElement("option", { ...props });
  }

  // node_modules/react-day-picker/dist/esm/components/PreviousMonthButton.js
  var import_react17 = __toESM(require_react(), 1);
  function PreviousMonthButton(props) {
    return import_react17.default.createElement("button", { ...props });
  }

  // node_modules/react-day-picker/dist/esm/components/Root.js
  var import_react18 = __toESM(require_react(), 1);
  function Root(props) {
    let { rootRef, ...rest } = props;
    return import_react18.default.createElement("div", { ...rest, ref: rootRef });
  }

  // node_modules/react-day-picker/dist/esm/components/Select.js
  var import_react19 = __toESM(require_react(), 1);
  function Select(props) {
    return import_react19.default.createElement("select", { ...props });
  }

  // node_modules/react-day-picker/dist/esm/components/Week.js
  var import_react20 = __toESM(require_react(), 1);
  function Week(props) {
    let { week, ...trProps } = props;
    return import_react20.default.createElement("tr", { ...trProps });
  }

  // node_modules/react-day-picker/dist/esm/components/Weekday.js
  var import_react21 = __toESM(require_react(), 1);
  function Weekday(props) {
    return import_react21.default.createElement("th", { ...props });
  }

  // node_modules/react-day-picker/dist/esm/components/Weekdays.js
  var import_react22 = __toESM(require_react(), 1);
  function Weekdays(props) {
    return import_react22.default.createElement(
      "thead",
      { "aria-hidden": !0 },
      import_react22.default.createElement("tr", { ...props })
    );
  }

  // node_modules/react-day-picker/dist/esm/components/WeekNumber.js
  var import_react23 = __toESM(require_react(), 1);
  function WeekNumber(props) {
    let { week, ...thProps } = props;
    return import_react23.default.createElement("th", { ...thProps });
  }

  // node_modules/react-day-picker/dist/esm/components/WeekNumberHeader.js
  var import_react24 = __toESM(require_react(), 1);
  function WeekNumberHeader(props) {
    return import_react24.default.createElement("th", { ...props });
  }

  // node_modules/react-day-picker/dist/esm/components/Weeks.js
  var import_react25 = __toESM(require_react(), 1);
  function Weeks(props) {
    return import_react25.default.createElement("tbody", { ...props });
  }

  // node_modules/react-day-picker/dist/esm/components/YearsDropdown.js
  var import_react26 = __toESM(require_react(), 1);
  function YearsDropdown(props) {
    let { components } = useDayPicker();
    return import_react26.default.createElement(components.Dropdown, { ...props });
  }

  // node_modules/react-day-picker/dist/esm/DayPicker.js
  var import_react31 = __toESM(require_react(), 1);

  // node_modules/react-day-picker/dist/esm/utils/rangeIncludesDate.js
  function rangeIncludesDate(range, date, excludeEnds = !1, dateLib = defaultDateLib) {
    let { from, to } = range, { differenceInCalendarDays: differenceInCalendarDays2, isSameDay: isSameDay2 } = dateLib;
    return from && to ? (differenceInCalendarDays2(to, from) < 0 && ([from, to] = [to, from]), differenceInCalendarDays2(date, from) >= (excludeEnds ? 1 : 0) && differenceInCalendarDays2(to, date) >= (excludeEnds ? 1 : 0)) : !excludeEnds && to ? isSameDay2(to, date) : !excludeEnds && from ? isSameDay2(from, date) : !1;
  }

  // node_modules/react-day-picker/dist/esm/utils/typeguards.js
  function isDateInterval(matcher) {
    return !!(matcher && typeof matcher == "object" && "before" in matcher && "after" in matcher);
  }
  function isDateRange(value) {
    return !!(value && typeof value == "object" && "from" in value);
  }
  function isDateAfterType(value) {
    return !!(value && typeof value == "object" && "after" in value);
  }
  function isDateBeforeType(value) {
    return !!(value && typeof value == "object" && "before" in value);
  }
  function isDayOfWeekType(value) {
    return !!(value && typeof value == "object" && "dayOfWeek" in value);
  }
  function isDatesArray(value, dateLib) {
    return Array.isArray(value) && value.every(dateLib.isDate);
  }

  // node_modules/react-day-picker/dist/esm/utils/dateMatchModifiers.js
  function dateMatchModifiers(date, matchers, dateLib = defaultDateLib) {
    let matchersArr = Array.isArray(matchers) ? matchers : [matchers], { isSameDay: isSameDay2, differenceInCalendarDays: differenceInCalendarDays2, isAfter: isAfter2 } = dateLib;
    return matchersArr.some((matcher) => {
      if (typeof matcher == "boolean")
        return matcher;
      if (dateLib.isDate(matcher))
        return isSameDay2(date, matcher);
      if (isDatesArray(matcher, dateLib))
        return matcher.some((matcherDate) => isSameDay2(date, matcherDate));
      if (isDateRange(matcher))
        return rangeIncludesDate(matcher, date, !1, dateLib);
      if (isDayOfWeekType(matcher))
        return Array.isArray(matcher.dayOfWeek) ? matcher.dayOfWeek.includes(date.getDay()) : matcher.dayOfWeek === date.getDay();
      if (isDateInterval(matcher)) {
        let diffBefore = differenceInCalendarDays2(matcher.before, date), diffAfter = differenceInCalendarDays2(matcher.after, date), isDayBefore = diffBefore > 0, isDayAfter = diffAfter < 0;
        return isAfter2(matcher.before, matcher.after) ? isDayAfter && isDayBefore : isDayBefore || isDayAfter;
      }
      return isDateAfterType(matcher) ? differenceInCalendarDays2(date, matcher.after) > 0 : isDateBeforeType(matcher) ? differenceInCalendarDays2(matcher.before, date) > 0 : typeof matcher == "function" ? matcher(date) : !1;
    });
  }

  // node_modules/react-day-picker/dist/esm/helpers/createGetModifiers.js
  function createGetModifiers(days, props, navStart, navEnd, dateLib) {
    let { disabled, hidden, modifiers, showOutsideDays, broadcastCalendar, today = dateLib.today() } = props, { isSameDay: isSameDay2, isSameMonth: isSameMonth2, startOfMonth: startOfMonth2, isBefore: isBefore2, endOfMonth: endOfMonth2, isAfter: isAfter2 } = dateLib, computedNavStart = navStart && startOfMonth2(navStart), computedNavEnd = navEnd && endOfMonth2(navEnd), internalModifiersMap = {
      [DayFlag.focused]: [],
      [DayFlag.outside]: [],
      [DayFlag.disabled]: [],
      [DayFlag.hidden]: [],
      [DayFlag.today]: []
    }, customModifiersMap = {};
    for (let day of days) {
      let { date, displayMonth } = day, isOutside = !!(displayMonth && !isSameMonth2(date, displayMonth)), isBeforeNavStart = !!(computedNavStart && isBefore2(date, computedNavStart)), isAfterNavEnd = !!(computedNavEnd && isAfter2(date, computedNavEnd)), isDisabled = !!(disabled && dateMatchModifiers(date, disabled, dateLib)), isHidden = !!(hidden && dateMatchModifiers(date, hidden, dateLib)) || isBeforeNavStart || isAfterNavEnd || // Broadcast calendar will show outside days as default
      !broadcastCalendar && !showOutsideDays && isOutside || broadcastCalendar && showOutsideDays === !1 && isOutside, isToday = isSameDay2(date, today);
      isOutside && internalModifiersMap.outside.push(day), isDisabled && internalModifiersMap.disabled.push(day), isHidden && internalModifiersMap.hidden.push(day), isToday && internalModifiersMap.today.push(day), modifiers && Object.keys(modifiers).forEach((name) => {
        let modifierValue = modifiers?.[name];
        modifierValue && dateMatchModifiers(date, modifierValue, dateLib) && (customModifiersMap[name] ? customModifiersMap[name].push(day) : customModifiersMap[name] = [day]);
      });
    }
    return (day) => {
      let dayFlags = {
        [DayFlag.focused]: !1,
        [DayFlag.disabled]: !1,
        [DayFlag.hidden]: !1,
        [DayFlag.outside]: !1,
        [DayFlag.today]: !1
      }, customModifiers = {};
      for (let name in internalModifiersMap) {
        let days2 = internalModifiersMap[name];
        dayFlags[name] = days2.some((d) => d === day);
      }
      for (let name in customModifiersMap)
        customModifiers[name] = customModifiersMap[name].some((d) => d === day);
      return {
        ...dayFlags,
        // custom modifiers should override all the previous ones
        ...customModifiers
      };
    };
  }

  // node_modules/react-day-picker/dist/esm/helpers/getClassNamesForModifiers.js
  function getClassNamesForModifiers(modifiers, classNames, modifiersClassNames = {}) {
    return Object.entries(modifiers).filter(([, active]) => active === !0).reduce((previousValue, [key]) => (modifiersClassNames[key] ? previousValue.push(modifiersClassNames[key]) : classNames[DayFlag[key]] ? previousValue.push(classNames[DayFlag[key]]) : classNames[SelectionState[key]] && previousValue.push(classNames[SelectionState[key]]), previousValue), [classNames[UI.Day]]);
  }

  // node_modules/react-day-picker/dist/esm/helpers/getComponents.js
  function getComponents(customComponents) {
    return {
      ...custom_components_exports,
      ...customComponents
    };
  }

  // node_modules/react-day-picker/dist/esm/helpers/getDataAttributes.js
  function getDataAttributes(props) {
    let dataAttributes = {
      "data-mode": props.mode ?? void 0,
      "data-required": "required" in props ? props.required : void 0,
      "data-multiple-months": props.numberOfMonths && props.numberOfMonths > 1 || void 0,
      "data-week-numbers": props.showWeekNumber || void 0,
      "data-broadcast-calendar": props.broadcastCalendar || void 0,
      "data-nav-layout": props.navLayout || void 0
    };
    return Object.entries(props).forEach(([key, val]) => {
      key.startsWith("data-") && (dataAttributes[key] = val);
    }), dataAttributes;
  }

  // node_modules/react-day-picker/dist/esm/helpers/getDefaultClassNames.js
  function getDefaultClassNames() {
    let classNames = {};
    for (let key in UI)
      classNames[UI[key]] = `rdp-${UI[key]}`;
    for (let key in DayFlag)
      classNames[DayFlag[key]] = `rdp-${DayFlag[key]}`;
    for (let key in SelectionState)
      classNames[SelectionState[key]] = `rdp-${SelectionState[key]}`;
    for (let key in Animation)
      classNames[Animation[key]] = `rdp-${Animation[key]}`;
    return classNames;
  }

  // node_modules/react-day-picker/dist/esm/formatters/index.js
  var formatters_exports = {};
  __export(formatters_exports, {
    formatCaption: () => formatCaption,
    formatDay: () => formatDay,
    formatMonthDropdown: () => formatMonthDropdown,
    formatWeekNumber: () => formatWeekNumber,
    formatWeekNumberHeader: () => formatWeekNumberHeader,
    formatWeekdayName: () => formatWeekdayName,
    formatYearDropdown: () => formatYearDropdown
  });

  // node_modules/react-day-picker/dist/esm/formatters/formatCaption.js
  function formatCaption(month, options, dateLib) {
    return (dateLib ?? new DateLib(options)).formatMonthYear(month);
  }

  // node_modules/react-day-picker/dist/esm/formatters/formatDay.js
  function formatDay(date, options, dateLib) {
    return (dateLib ?? new DateLib(options)).format(date, "d");
  }

  // node_modules/react-day-picker/dist/esm/formatters/formatMonthDropdown.js
  function formatMonthDropdown(month, dateLib = defaultDateLib) {
    return dateLib.format(month, "LLLL");
  }

  // node_modules/react-day-picker/dist/esm/formatters/formatWeekdayName.js
  function formatWeekdayName(weekday, options, dateLib) {
    return (dateLib ?? new DateLib(options)).format(weekday, "cccccc");
  }

  // node_modules/react-day-picker/dist/esm/formatters/formatWeekNumber.js
  function formatWeekNumber(weekNumber, dateLib = defaultDateLib) {
    return weekNumber < 10 ? dateLib.formatNumber(`0${weekNumber.toLocaleString()}`) : dateLib.formatNumber(`${weekNumber.toLocaleString()}`);
  }

  // node_modules/react-day-picker/dist/esm/formatters/formatWeekNumberHeader.js
  function formatWeekNumberHeader() {
    return "";
  }

  // node_modules/react-day-picker/dist/esm/formatters/formatYearDropdown.js
  function formatYearDropdown(year, dateLib = defaultDateLib) {
    return dateLib.format(year, "yyyy");
  }

  // node_modules/react-day-picker/dist/esm/helpers/getFormatters.js
  function getFormatters(customFormatters) {
    return {
      ...formatters_exports,
      ...customFormatters
    };
  }

  // node_modules/react-day-picker/dist/esm/labels/index.js
  var labels_exports = {};
  __export(labels_exports, {
    labelDayButton: () => labelDayButton,
    labelGrid: () => labelGrid,
    labelGridcell: () => labelGridcell,
    labelMonthDropdown: () => labelMonthDropdown,
    labelNav: () => labelNav,
    labelNext: () => labelNext,
    labelPrevious: () => labelPrevious,
    labelWeekNumber: () => labelWeekNumber,
    labelWeekNumberHeader: () => labelWeekNumberHeader,
    labelWeekday: () => labelWeekday,
    labelYearDropdown: () => labelYearDropdown
  });

  // node_modules/react-day-picker/dist/esm/labels/labelDayButton.js
  function labelDayButton(date, modifiers, options, dateLib) {
    let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
    return modifiers.today && (label = `Today, ${label}`), modifiers.selected && (label = `${label}, selected`), label;
  }

  // node_modules/react-day-picker/dist/esm/labels/labelGrid.js
  function labelGrid(date, options, dateLib) {
    return (dateLib ?? new DateLib(options)).formatMonthYear(date);
  }

  // node_modules/react-day-picker/dist/esm/labels/labelGridcell.js
  function labelGridcell(date, modifiers, options, dateLib) {
    let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
    return modifiers?.today && (label = `Today, ${label}`), label;
  }

  // node_modules/react-day-picker/dist/esm/labels/labelMonthDropdown.js
  function labelMonthDropdown(_options) {
    return "Choose the Month";
  }

  // node_modules/react-day-picker/dist/esm/labels/labelNav.js
  function labelNav() {
    return "";
  }

  // node_modules/react-day-picker/dist/esm/labels/labelNext.js
  var defaultLabel = "Go to the Next Month";
  function labelNext(_month, _options) {
    return defaultLabel;
  }

  // node_modules/react-day-picker/dist/esm/labels/labelPrevious.js
  function labelPrevious(_month) {
    return "Go to the Previous Month";
  }

  // node_modules/react-day-picker/dist/esm/labels/labelWeekday.js
  function labelWeekday(date, options, dateLib) {
    return (dateLib ?? new DateLib(options)).format(date, "cccc");
  }

  // node_modules/react-day-picker/dist/esm/labels/labelWeekNumber.js
  function labelWeekNumber(weekNumber, _options) {
    return `Week ${weekNumber}`;
  }

  // node_modules/react-day-picker/dist/esm/labels/labelWeekNumberHeader.js
  function labelWeekNumberHeader(_options) {
    return "Week Number";
  }

  // node_modules/react-day-picker/dist/esm/labels/labelYearDropdown.js
  function labelYearDropdown(_options) {
    return "Choose the Year";
  }

  // node_modules/react-day-picker/dist/esm/helpers/getLabels.js
  var resolveLabel = (defaultLabel2, customLabel, localeLabel) => customLabel || (localeLabel ? typeof localeLabel == "function" ? localeLabel : (..._args) => localeLabel : defaultLabel2);
  function getLabels(customLabels, options) {
    let localeLabels = options.locale?.labels ?? {};
    return {
      ...labels_exports,
      ...customLabels ?? {},
      labelDayButton: resolveLabel(labelDayButton, customLabels?.labelDayButton, localeLabels.labelDayButton),
      labelMonthDropdown: resolveLabel(labelMonthDropdown, customLabels?.labelMonthDropdown, localeLabels.labelMonthDropdown),
      labelNext: resolveLabel(labelNext, customLabels?.labelNext, localeLabels.labelNext),
      labelPrevious: resolveLabel(labelPrevious, customLabels?.labelPrevious, localeLabels.labelPrevious),
      labelWeekNumber: resolveLabel(labelWeekNumber, customLabels?.labelWeekNumber, localeLabels.labelWeekNumber),
      labelYearDropdown: resolveLabel(labelYearDropdown, customLabels?.labelYearDropdown, localeLabels.labelYearDropdown),
      labelGrid: resolveLabel(labelGrid, customLabels?.labelGrid, localeLabels.labelGrid),
      labelGridcell: resolveLabel(labelGridcell, customLabels?.labelGridcell, localeLabels.labelGridcell),
      labelNav: resolveLabel(labelNav, customLabels?.labelNav, localeLabels.labelNav),
      labelWeekNumberHeader: resolveLabel(labelWeekNumberHeader, customLabels?.labelWeekNumberHeader, localeLabels.labelWeekNumberHeader),
      labelWeekday: resolveLabel(labelWeekday, customLabels?.labelWeekday, localeLabels.labelWeekday)
    };
  }

  // node_modules/react-day-picker/dist/esm/helpers/getMonthOptions.js
  function getMonthOptions(displayMonth, navStart, navEnd, formatters2, dateLib) {
    let { startOfMonth: startOfMonth2, startOfYear: startOfYear2, endOfYear: endOfYear2, eachMonthOfInterval: eachMonthOfInterval2, getMonth: getMonth2 } = dateLib;
    return eachMonthOfInterval2({
      start: startOfYear2(displayMonth),
      end: endOfYear2(displayMonth)
    }).map((month) => {
      let label = formatters2.formatMonthDropdown(month, dateLib), value = getMonth2(month), disabled = navStart && month < startOfMonth2(navStart) || navEnd && month > startOfMonth2(navEnd) || !1;
      return { value, label, disabled };
    });
  }

  // node_modules/react-day-picker/dist/esm/helpers/getStyleForModifiers.js
  function getStyleForModifiers(dayModifiers, styles = {}, modifiersStyles = {}) {
    let style = { ...styles?.[UI.Day] };
    return Object.entries(dayModifiers).filter(([, active]) => active === !0).forEach(([modifier]) => {
      style = {
        ...style,
        ...modifiersStyles?.[modifier]
      };
    }), style;
  }

  // node_modules/react-day-picker/dist/esm/helpers/getWeekdays.js
  function getWeekdays(dateLib, ISOWeek, broadcastCalendar, today) {
    let referenceToday = today ?? dateLib.today(), start = broadcastCalendar ? dateLib.startOfBroadcastWeek(referenceToday, dateLib) : ISOWeek ? dateLib.startOfISOWeek(referenceToday) : dateLib.startOfWeek(referenceToday), days = [];
    for (let i = 0; i < 7; i++) {
      let day = dateLib.addDays(start, i);
      days.push(day);
    }
    return days;
  }

  // node_modules/react-day-picker/dist/esm/helpers/getYearOptions.js
  function getYearOptions(navStart, navEnd, formatters2, dateLib, reverse = !1) {
    if (!navStart || !navEnd)
      return;
    let { startOfYear: startOfYear2, endOfYear: endOfYear2, eachYearOfInterval: eachYearOfInterval2, getYear: getYear2 } = dateLib, firstNavYear = startOfYear2(navStart), lastNavYear = endOfYear2(navEnd), years = eachYearOfInterval2({ start: firstNavYear, end: lastNavYear });
    return reverse && years.reverse(), years.map((year) => {
      let label = formatters2.formatYearDropdown(year, dateLib);
      return {
        value: getYear2(year),
        label,
        disabled: !1
      };
    });
  }

  // node_modules/react-day-picker/dist/esm/noonDateLib.js
  function createNoonOverrides(timeZone, options = {}) {
    let { weekStartsOn, locale } = options, fallbackWeekStartsOn = weekStartsOn ?? locale?.options?.weekStartsOn ?? 0, toNoonTZDate = (date) => {
      let normalizedDate = typeof date == "number" || typeof date == "string" ? new Date(date) : date;
      return new TZDate(normalizedDate.getFullYear(), normalizedDate.getMonth(), normalizedDate.getDate(), 12, 0, 0, timeZone);
    }, toCalendarDate = (date) => {
      let zoned = toNoonTZDate(date);
      return new Date(zoned.getFullYear(), zoned.getMonth(), zoned.getDate(), 0, 0, 0, 0);
    };
    return {
      today: () => toNoonTZDate(TZDate.tz(timeZone)),
      newDate: (year, monthIndex, date) => new TZDate(year, monthIndex, date, 12, 0, 0, timeZone),
      startOfDay: (date) => toNoonTZDate(date),
      startOfWeek: (date, options2) => {
        let base = toNoonTZDate(date), weekStartsOnValue = options2?.weekStartsOn ?? fallbackWeekStartsOn, diff = (base.getDay() - weekStartsOnValue + 7) % 7;
        return base.setDate(base.getDate() - diff), base;
      },
      startOfISOWeek: (date) => {
        let base = toNoonTZDate(date), diff = (base.getDay() - 1 + 7) % 7;
        return base.setDate(base.getDate() - diff), base;
      },
      startOfMonth: (date) => {
        let base = toNoonTZDate(date);
        return base.setDate(1), base;
      },
      startOfYear: (date) => {
        let base = toNoonTZDate(date);
        return base.setMonth(0, 1), base;
      },
      endOfWeek: (date, options2) => {
        let base = toNoonTZDate(date), diff = (((options2?.weekStartsOn ?? fallbackWeekStartsOn) + 6) % 7 - base.getDay() + 7) % 7;
        return base.setDate(base.getDate() + diff), base;
      },
      endOfISOWeek: (date) => {
        let base = toNoonTZDate(date), diff = (7 - base.getDay()) % 7;
        return base.setDate(base.getDate() + diff), base;
      },
      endOfMonth: (date) => {
        let base = toNoonTZDate(date);
        return base.setMonth(base.getMonth() + 1, 0), base;
      },
      endOfYear: (date) => {
        let base = toNoonTZDate(date);
        return base.setMonth(11, 31), base;
      },
      eachMonthOfInterval: (interval) => {
        let start = toNoonTZDate(interval.start), end = toNoonTZDate(interval.end), result = [], cursor = new TZDate(start.getFullYear(), start.getMonth(), 1, 12, 0, 0, timeZone), endKey = end.getFullYear() * 12 + end.getMonth();
        for (; cursor.getFullYear() * 12 + cursor.getMonth() <= endKey; )
          result.push(new TZDate(cursor, timeZone)), cursor.setMonth(cursor.getMonth() + 1, 1);
        return result;
      },
      // Normalize to noon once before arithmetic (avoid DST/midnight edge cases),
      // mutate the same TZDate, and return it.
      addDays: (date, amount) => {
        let base = toNoonTZDate(date);
        return base.setDate(base.getDate() + amount), base;
      },
      addWeeks: (date, amount) => {
        let base = toNoonTZDate(date);
        return base.setDate(base.getDate() + amount * 7), base;
      },
      addMonths: (date, amount) => {
        let base = toNoonTZDate(date);
        return base.setMonth(base.getMonth() + amount), base;
      },
      addYears: (date, amount) => {
        let base = toNoonTZDate(date);
        return base.setFullYear(base.getFullYear() + amount), base;
      },
      eachYearOfInterval: (interval) => {
        let start = toNoonTZDate(interval.start), end = toNoonTZDate(interval.end), years = [], cursor = new TZDate(start.getFullYear(), 0, 1, 12, 0, 0, timeZone);
        for (; cursor.getFullYear() <= end.getFullYear(); )
          years.push(new TZDate(cursor, timeZone)), cursor.setFullYear(cursor.getFullYear() + 1, 0, 1);
        return years;
      },
      getWeek: (date, options2) => {
        let base = toCalendarDate(date);
        return getWeek(base, {
          weekStartsOn: options2?.weekStartsOn ?? fallbackWeekStartsOn,
          firstWeekContainsDate: options2?.firstWeekContainsDate ?? locale?.options?.firstWeekContainsDate ?? 1
        });
      },
      getISOWeek: (date) => {
        let base = toCalendarDate(date);
        return getISOWeek(base);
      },
      differenceInCalendarDays: (dateLeft, dateRight) => {
        let left = toCalendarDate(dateLeft), right = toCalendarDate(dateRight);
        return differenceInCalendarDays(left, right);
      },
      differenceInCalendarMonths: (dateLeft, dateRight) => {
        let left = toCalendarDate(dateLeft), right = toCalendarDate(dateRight);
        return differenceInCalendarMonths(left, right);
      }
    };
  }

  // node_modules/react-day-picker/dist/esm/useAnimation.js
  var import_react27 = __toESM(require_react(), 1);
  var asHtmlElement = (element) => element instanceof HTMLElement ? element : null, queryMonthEls = (element) => [
    ...element.querySelectorAll("[data-animated-month]") ?? []
  ], queryMonthEl = (element) => asHtmlElement(element.querySelector("[data-animated-month]")), queryCaptionEl = (element) => asHtmlElement(element.querySelector("[data-animated-caption]")), queryWeeksEl = (element) => asHtmlElement(element.querySelector("[data-animated-weeks]")), queryNavEl = (element) => asHtmlElement(element.querySelector("[data-animated-nav]")), queryWeekdaysEl = (element) => asHtmlElement(element.querySelector("[data-animated-weekdays]"));
  function useAnimation(rootElRef, enabled, { classNames, months, focused, dateLib }) {
    let previousRootElSnapshotRef = (0, import_react27.useRef)(null), previousMonthsRef = (0, import_react27.useRef)(months), animatingRef = (0, import_react27.useRef)(!1);
    (0, import_react27.useLayoutEffect)(() => {
      let previousMonths = previousMonthsRef.current;
      if (previousMonthsRef.current = months, !enabled || !rootElRef.current || // safety check because the ref can be set to anything by consumers
      !(rootElRef.current instanceof HTMLElement) || // validation required for the animation to work as expected
      months.length === 0 || previousMonths.length === 0 || months.length !== previousMonths.length)
        return;
      let isSameMonth2 = dateLib.isSameMonth(months[0].date, previousMonths[0].date), isAfterPreviousMonth = dateLib.isAfter(months[0].date, previousMonths[0].date), captionAnimationClass = isAfterPreviousMonth ? classNames[Animation.caption_after_enter] : classNames[Animation.caption_before_enter], weeksAnimationClass = isAfterPreviousMonth ? classNames[Animation.weeks_after_enter] : classNames[Animation.weeks_before_enter], previousRootElSnapshot = previousRootElSnapshotRef.current, rootElSnapshot = rootElRef.current.cloneNode(!0);
      if (rootElSnapshot instanceof HTMLElement ? (queryMonthEls(rootElSnapshot).forEach((currentMonthElSnapshot) => {
        if (!(currentMonthElSnapshot instanceof HTMLElement))
          return;
        let previousMonthElSnapshot = queryMonthEl(currentMonthElSnapshot);
        previousMonthElSnapshot && currentMonthElSnapshot.contains(previousMonthElSnapshot) && currentMonthElSnapshot.removeChild(previousMonthElSnapshot);
        let captionEl = queryCaptionEl(currentMonthElSnapshot);
        captionEl && captionEl.classList.remove(captionAnimationClass);
        let weeksEl = queryWeeksEl(currentMonthElSnapshot);
        weeksEl && weeksEl.classList.remove(weeksAnimationClass);
      }), previousRootElSnapshotRef.current = rootElSnapshot) : previousRootElSnapshotRef.current = null, animatingRef.current || isSameMonth2 || // skip animation if a day is focused because it can cause issues to the animation and is better for a11y
      focused)
        return;
      let previousMonthEls = previousRootElSnapshot instanceof HTMLElement ? queryMonthEls(previousRootElSnapshot) : [], currentMonthEls = queryMonthEls(rootElRef.current);
      if (currentMonthEls?.every((el) => el instanceof HTMLElement) && previousMonthEls?.every((el) => el instanceof HTMLElement)) {
        animatingRef.current = !0;
        let cleanUpFunctions = [];
        rootElRef.current.style.isolation = "isolate";
        let navEl = queryNavEl(rootElRef.current);
        navEl && (navEl.style.zIndex = "1"), currentMonthEls.forEach((currentMonthEl, index) => {
          let previousMonthEl = previousMonthEls[index];
          if (!previousMonthEl)
            return;
          currentMonthEl.style.position = "relative", currentMonthEl.style.overflow = "hidden";
          let captionEl = queryCaptionEl(currentMonthEl);
          captionEl && captionEl.classList.add(captionAnimationClass);
          let weeksEl = queryWeeksEl(currentMonthEl);
          weeksEl && weeksEl.classList.add(weeksAnimationClass);
          let cleanUp = () => {
            animatingRef.current = !1, rootElRef.current && (rootElRef.current.style.isolation = ""), navEl && (navEl.style.zIndex = ""), captionEl && captionEl.classList.remove(captionAnimationClass), weeksEl && weeksEl.classList.remove(weeksAnimationClass), currentMonthEl.style.position = "", currentMonthEl.style.overflow = "", currentMonthEl.contains(previousMonthEl) && currentMonthEl.removeChild(previousMonthEl);
          };
          cleanUpFunctions.push(cleanUp), previousMonthEl.style.pointerEvents = "none", previousMonthEl.style.position = "absolute", previousMonthEl.style.overflow = "hidden", previousMonthEl.setAttribute("aria-hidden", "true");
          let previousWeekdaysEl = queryWeekdaysEl(previousMonthEl);
          previousWeekdaysEl && (previousWeekdaysEl.style.opacity = "0");
          let previousCaptionEl = queryCaptionEl(previousMonthEl);
          previousCaptionEl && (previousCaptionEl.classList.add(isAfterPreviousMonth ? classNames[Animation.caption_before_exit] : classNames[Animation.caption_after_exit]), previousCaptionEl.addEventListener("animationend", cleanUp));
          let previousWeeksEl = queryWeeksEl(previousMonthEl);
          previousWeeksEl && previousWeeksEl.classList.add(isAfterPreviousMonth ? classNames[Animation.weeks_before_exit] : classNames[Animation.weeks_after_exit]), currentMonthEl.insertBefore(previousMonthEl, currentMonthEl.firstChild);
        });
      }
    });
  }

  // node_modules/react-day-picker/dist/esm/useCalendar.js
  var import_react29 = __toESM(require_react(), 1);

  // node_modules/react-day-picker/dist/esm/helpers/getDates.js
  function getDates(displayMonths, maxDate, props, dateLib) {
    let firstMonth = displayMonths[0], lastMonth = displayMonths[displayMonths.length - 1], { ISOWeek, fixedWeeks, broadcastCalendar } = props ?? {}, { addDays: addDays2, differenceInCalendarDays: differenceInCalendarDays2, differenceInCalendarMonths: differenceInCalendarMonths2, endOfBroadcastWeek: endOfBroadcastWeek2, endOfISOWeek: endOfISOWeek2, endOfMonth: endOfMonth2, endOfWeek: endOfWeek2, isAfter: isAfter2, startOfBroadcastWeek: startOfBroadcastWeek2, startOfISOWeek: startOfISOWeek2, startOfWeek: startOfWeek2 } = dateLib, startWeekFirstDate = broadcastCalendar ? startOfBroadcastWeek2(firstMonth, dateLib) : ISOWeek ? startOfISOWeek2(firstMonth) : startOfWeek2(firstMonth), displayMonthsWeekEnd = broadcastCalendar ? endOfBroadcastWeek2(lastMonth) : ISOWeek ? endOfISOWeek2(endOfMonth2(lastMonth)) : endOfWeek2(endOfMonth2(lastMonth)), constraintWeekEnd = maxDate && (broadcastCalendar ? endOfBroadcastWeek2(maxDate) : ISOWeek ? endOfISOWeek2(maxDate) : endOfWeek2(maxDate)), gridEndDate = constraintWeekEnd && isAfter2(displayMonthsWeekEnd, constraintWeekEnd) ? constraintWeekEnd : displayMonthsWeekEnd, nOfDays = differenceInCalendarDays2(gridEndDate, startWeekFirstDate), nOfMonths = differenceInCalendarMonths2(lastMonth, firstMonth) + 1, dates = [];
    for (let i = 0; i <= nOfDays; i++) {
      let date = addDays2(startWeekFirstDate, i);
      dates.push(date);
    }
    let extraDates = (broadcastCalendar ? 35 : 42) * nOfMonths;
    if (fixedWeeks && dates.length < extraDates) {
      let daysToAdd = extraDates - dates.length;
      for (let i = 0; i < daysToAdd; i++) {
        let date = addDays2(dates[dates.length - 1], 1);
        dates.push(date);
      }
    }
    return dates;
  }

  // node_modules/react-day-picker/dist/esm/helpers/getDays.js
  function getDays(calendarMonths) {
    let initialDays = [];
    return calendarMonths.reduce((days, month) => {
      let weekDays = month.weeks.reduce((weekDays2, week) => weekDays2.concat(week.days.slice()), initialDays.slice());
      return days.concat(weekDays.slice());
    }, initialDays.slice());
  }

  // node_modules/react-day-picker/dist/esm/helpers/getDisplayMonths.js
  function getDisplayMonths(firstDisplayedMonth, calendarEndMonth, props, dateLib) {
    let { numberOfMonths = 1 } = props, months = [];
    for (let i = 0; i < numberOfMonths; i++) {
      let month = dateLib.addMonths(firstDisplayedMonth, i);
      if (calendarEndMonth && month > calendarEndMonth)
        break;
      months.push(month);
    }
    return months;
  }

  // node_modules/react-day-picker/dist/esm/helpers/getInitialMonth.js
  function getInitialMonth(props, navStart, navEnd, dateLib) {
    let { month, defaultMonth, today = dateLib.today(), numberOfMonths = 1 } = props, initialMonth = month || defaultMonth || today, { differenceInCalendarMonths: differenceInCalendarMonths2, addMonths: addMonths2, startOfMonth: startOfMonth2 } = dateLib;
    if (navEnd && differenceInCalendarMonths2(navEnd, initialMonth) < numberOfMonths - 1) {
      let offset = -1 * (numberOfMonths - 1);
      initialMonth = addMonths2(navEnd, offset);
    }
    return navStart && differenceInCalendarMonths2(initialMonth, navStart) < 0 && (initialMonth = navStart), startOfMonth2(initialMonth);
  }

  // node_modules/react-day-picker/dist/esm/helpers/getMonths.js
  function getMonths(displayMonths, dates, props, dateLib) {
    let { addDays: addDays2, endOfBroadcastWeek: endOfBroadcastWeek2, endOfISOWeek: endOfISOWeek2, endOfMonth: endOfMonth2, endOfWeek: endOfWeek2, getISOWeek: getISOWeek2, getWeek: getWeek2, startOfBroadcastWeek: startOfBroadcastWeek2, startOfISOWeek: startOfISOWeek2, startOfWeek: startOfWeek2 } = dateLib, dayPickerMonths = displayMonths.reduce((months, month) => {
      let firstDateOfFirstWeek = props.broadcastCalendar ? startOfBroadcastWeek2(month, dateLib) : props.ISOWeek ? startOfISOWeek2(month) : startOfWeek2(month), lastDateOfLastWeek = props.broadcastCalendar ? endOfBroadcastWeek2(month) : props.ISOWeek ? endOfISOWeek2(endOfMonth2(month)) : endOfWeek2(endOfMonth2(month)), monthDates = dates.filter((date) => date >= firstDateOfFirstWeek && date <= lastDateOfLastWeek), nrOfDaysWithFixedWeeks = props.broadcastCalendar ? 35 : 42;
      if (props.fixedWeeks && monthDates.length < nrOfDaysWithFixedWeeks) {
        let extraDates = dates.filter((date) => {
          let daysToAdd = nrOfDaysWithFixedWeeks - monthDates.length;
          return date > lastDateOfLastWeek && date <= addDays2(lastDateOfLastWeek, daysToAdd);
        });
        monthDates.push(...extraDates);
      }
      let weeks = monthDates.reduce((weeks2, date) => {
        let weekNumber = props.ISOWeek ? getISOWeek2(date) : getWeek2(date), week = weeks2.find((week2) => week2.weekNumber === weekNumber), day = new CalendarDay(date, month, dateLib);
        return week ? week.days.push(day) : weeks2.push(new CalendarWeek(weekNumber, [day])), weeks2;
      }, []), dayPickerMonth = new CalendarMonth(month, weeks);
      return months.push(dayPickerMonth), months;
    }, []);
    return props.reverseMonths ? dayPickerMonths.reverse() : dayPickerMonths;
  }

  // node_modules/react-day-picker/dist/esm/helpers/getNavMonth.js
  function getNavMonths(props, dateLib) {
    let { startMonth, endMonth } = props, { startOfYear: startOfYear2, startOfDay: startOfDay2, startOfMonth: startOfMonth2, endOfMonth: endOfMonth2, addYears: addYears2, endOfYear: endOfYear2, today } = dateLib, hasYearDropdown = props.captionLayout === "dropdown" || props.captionLayout === "dropdown-years";
    return startMonth ? startMonth = startOfMonth2(startMonth) : !startMonth && hasYearDropdown && (startMonth = startOfYear2(addYears2(props.today ?? today(), -100))), endMonth ? endMonth = endOfMonth2(endMonth) : !endMonth && hasYearDropdown && (endMonth = endOfYear2(props.today ?? today())), [
      startMonth && startOfDay2(startMonth),
      endMonth && startOfDay2(endMonth)
    ];
  }

  // node_modules/react-day-picker/dist/esm/helpers/getNextMonth.js
  function getNextMonth(firstDisplayedMonth, calendarEndMonth, options, dateLib) {
    if (options.disableNavigation)
      return;
    let { pagedNavigation, numberOfMonths = 1 } = options, { startOfMonth: startOfMonth2, addMonths: addMonths2, differenceInCalendarMonths: differenceInCalendarMonths2 } = dateLib, offset = pagedNavigation ? numberOfMonths : 1, month = startOfMonth2(firstDisplayedMonth);
    if (!calendarEndMonth)
      return addMonths2(month, offset);
    if (!(differenceInCalendarMonths2(calendarEndMonth, firstDisplayedMonth) < numberOfMonths))
      return addMonths2(month, offset);
  }

  // node_modules/react-day-picker/dist/esm/helpers/getPreviousMonth.js
  function getPreviousMonth(firstDisplayedMonth, calendarStartMonth, options, dateLib) {
    if (options.disableNavigation)
      return;
    let { pagedNavigation, numberOfMonths } = options, { startOfMonth: startOfMonth2, addMonths: addMonths2, differenceInCalendarMonths: differenceInCalendarMonths2 } = dateLib, offset = pagedNavigation ? numberOfMonths ?? 1 : 1, month = startOfMonth2(firstDisplayedMonth);
    if (!calendarStartMonth)
      return addMonths2(month, -offset);
    if (!(differenceInCalendarMonths2(month, calendarStartMonth) <= 0))
      return addMonths2(month, -offset);
  }

  // node_modules/react-day-picker/dist/esm/helpers/getWeeks.js
  function getWeeks(months) {
    let initialWeeks = [];
    return months.reduce((weeks, month) => weeks.concat(month.weeks.slice()), initialWeeks.slice());
  }

  // node_modules/react-day-picker/dist/esm/helpers/useControlledValue.js
  var import_react28 = __toESM(require_react(), 1);
  function useControlledValue(defaultValue, controlledValue) {
    let [uncontrolledValue, setValue] = (0, import_react28.useState)(defaultValue);
    return [controlledValue === void 0 ? uncontrolledValue : controlledValue, setValue];
  }

  // node_modules/react-day-picker/dist/esm/useCalendar.js
  function useCalendar(props, dateLib) {
    let [navStart, navEnd] = getNavMonths(props, dateLib), { startOfMonth: startOfMonth2, endOfMonth: endOfMonth2 } = dateLib, initialMonth = getInitialMonth(props, navStart, navEnd, dateLib), [firstMonth, setFirstMonth] = useControlledValue(
      initialMonth,
      // initialMonth is always computed from props.month if provided
      props.month ? initialMonth : void 0
    );
    (0, import_react29.useEffect)(() => {
      let newInitialMonth = getInitialMonth(props, navStart, navEnd, dateLib);
      setFirstMonth(newInitialMonth);
    }, [props.timeZone]);
    let { months, weeks, days, previousMonth, nextMonth } = (0, import_react29.useMemo)(() => {
      let displayMonths = getDisplayMonths(firstMonth, navEnd, { numberOfMonths: props.numberOfMonths }, dateLib), dates = getDates(displayMonths, props.endMonth ? endOfMonth2(props.endMonth) : void 0, {
        ISOWeek: props.ISOWeek,
        fixedWeeks: props.fixedWeeks,
        broadcastCalendar: props.broadcastCalendar
      }, dateLib), months2 = getMonths(displayMonths, dates, {
        broadcastCalendar: props.broadcastCalendar,
        fixedWeeks: props.fixedWeeks,
        ISOWeek: props.ISOWeek,
        reverseMonths: props.reverseMonths
      }, dateLib), weeks2 = getWeeks(months2), days2 = getDays(months2), previousMonth2 = getPreviousMonth(firstMonth, navStart, props, dateLib), nextMonth2 = getNextMonth(firstMonth, navEnd, props, dateLib);
      return {
        months: months2,
        weeks: weeks2,
        days: days2,
        previousMonth: previousMonth2,
        nextMonth: nextMonth2
      };
    }, [
      dateLib,
      firstMonth.getTime(),
      navEnd?.getTime(),
      navStart?.getTime(),
      props.disableNavigation,
      props.broadcastCalendar,
      props.endMonth?.getTime(),
      props.fixedWeeks,
      props.ISOWeek,
      props.numberOfMonths,
      props.pagedNavigation,
      props.reverseMonths
    ]), { disableNavigation, onMonthChange } = props, isDayInCalendar = (day) => weeks.some((week) => week.days.some((d) => d.isEqualTo(day))), goToMonth = (date) => {
      if (disableNavigation)
        return;
      let newMonth = startOfMonth2(date);
      navStart && newMonth < startOfMonth2(navStart) && (newMonth = startOfMonth2(navStart)), navEnd && newMonth > startOfMonth2(navEnd) && (newMonth = startOfMonth2(navEnd)), setFirstMonth(newMonth), onMonthChange?.(newMonth);
    };
    return {
      months,
      weeks,
      days,
      navStart,
      navEnd,
      previousMonth,
      nextMonth,
      goToMonth,
      goToDay: (day) => {
        isDayInCalendar(day) || goToMonth(day.date);
      }
    };
  }

  // node_modules/react-day-picker/dist/esm/useFocus.js
  var import_react30 = __toESM(require_react(), 1);

  // node_modules/react-day-picker/dist/esm/helpers/calculateFocusTarget.js
  var FocusTargetPriority;
  (function(FocusTargetPriority2) {
    FocusTargetPriority2[FocusTargetPriority2.Today = 0] = "Today", FocusTargetPriority2[FocusTargetPriority2.Selected = 1] = "Selected", FocusTargetPriority2[FocusTargetPriority2.LastFocused = 2] = "LastFocused", FocusTargetPriority2[FocusTargetPriority2.FocusedModifier = 3] = "FocusedModifier";
  })(FocusTargetPriority || (FocusTargetPriority = {}));
  function isFocusableDay(modifiers) {
    return !modifiers[DayFlag.disabled] && !modifiers[DayFlag.hidden] && !modifiers[DayFlag.outside];
  }
  function calculateFocusTarget(days, getModifiers, isSelected, lastFocused) {
    let focusTarget, foundFocusTargetPriority = -1;
    for (let day of days) {
      let modifiers = getModifiers(day);
      isFocusableDay(modifiers) && (modifiers[DayFlag.focused] && foundFocusTargetPriority < FocusTargetPriority.FocusedModifier ? (focusTarget = day, foundFocusTargetPriority = FocusTargetPriority.FocusedModifier) : lastFocused?.isEqualTo(day) && foundFocusTargetPriority < FocusTargetPriority.LastFocused ? (focusTarget = day, foundFocusTargetPriority = FocusTargetPriority.LastFocused) : isSelected(day.date) && foundFocusTargetPriority < FocusTargetPriority.Selected ? (focusTarget = day, foundFocusTargetPriority = FocusTargetPriority.Selected) : modifiers[DayFlag.today] && foundFocusTargetPriority < FocusTargetPriority.Today && (focusTarget = day, foundFocusTargetPriority = FocusTargetPriority.Today));
    }
    return focusTarget || (focusTarget = days.find((day) => isFocusableDay(getModifiers(day)))), focusTarget;
  }

  // node_modules/react-day-picker/dist/esm/helpers/getFocusableDate.js
  function getFocusableDate(moveBy, moveDir, refDate, navStart, navEnd, props, dateLib) {
    let { ISOWeek, broadcastCalendar } = props, { addDays: addDays2, addMonths: addMonths2, addWeeks: addWeeks2, addYears: addYears2, endOfBroadcastWeek: endOfBroadcastWeek2, endOfISOWeek: endOfISOWeek2, endOfWeek: endOfWeek2, max: max2, min: min2, startOfBroadcastWeek: startOfBroadcastWeek2, startOfISOWeek: startOfISOWeek2, startOfWeek: startOfWeek2 } = dateLib, focusableDate = {
      day: addDays2,
      week: addWeeks2,
      month: addMonths2,
      year: addYears2,
      startOfWeek: (date) => broadcastCalendar ? startOfBroadcastWeek2(date, dateLib) : ISOWeek ? startOfISOWeek2(date) : startOfWeek2(date),
      endOfWeek: (date) => broadcastCalendar ? endOfBroadcastWeek2(date) : ISOWeek ? endOfISOWeek2(date) : endOfWeek2(date)
    }[moveBy](refDate, moveDir === "after" ? 1 : -1);
    return moveDir === "before" && navStart ? focusableDate = max2([navStart, focusableDate]) : moveDir === "after" && navEnd && (focusableDate = min2([navEnd, focusableDate])), focusableDate;
  }

  // node_modules/react-day-picker/dist/esm/helpers/getNextFocus.js
  function getNextFocus(moveBy, moveDir, refDay, calendarStartMonth, calendarEndMonth, props, dateLib, attempt = 0) {
    if (attempt > 365)
      return;
    let focusableDate = getFocusableDate(moveBy, moveDir, refDay.date, calendarStartMonth, calendarEndMonth, props, dateLib), isDisabled = !!(props.disabled && dateMatchModifiers(focusableDate, props.disabled, dateLib)), isHidden = !!(props.hidden && dateMatchModifiers(focusableDate, props.hidden, dateLib)), targetMonth = focusableDate, focusDay = new CalendarDay(focusableDate, targetMonth, dateLib);
    return !isDisabled && !isHidden ? focusDay : getNextFocus(moveBy, moveDir, focusDay, calendarStartMonth, calendarEndMonth, props, dateLib, attempt + 1);
  }

  // node_modules/react-day-picker/dist/esm/useFocus.js
  function useFocus(props, calendar, getModifiers, isSelected, dateLib) {
    let { autoFocus } = props, [lastFocused, setLastFocused] = (0, import_react30.useState)(), focusTarget = calculateFocusTarget(calendar.days, getModifiers, isSelected || (() => !1), lastFocused), [focusedDay, setFocused] = (0, import_react30.useState)(autoFocus ? focusTarget : void 0);
    return {
      isFocusTarget: (day) => !!focusTarget?.isEqualTo(day),
      setFocused,
      focused: focusedDay,
      blur: () => {
        setLastFocused(focusedDay), setFocused(void 0);
      },
      moveFocus: (moveBy, moveDir) => {
        if (!focusedDay)
          return;
        let nextFocus = getNextFocus(moveBy, moveDir, focusedDay, calendar.navStart, calendar.navEnd, props, dateLib);
        nextFocus && (props.disableNavigation && !calendar.days.some((day) => day.isEqualTo(nextFocus)) || (calendar.goToDay(nextFocus), setFocused(nextFocus)));
      }
    };
  }

  // node_modules/react-day-picker/dist/esm/selection/useMulti.js
  function useMulti(props, dateLib) {
    let { selected: initiallySelected, required, onSelect } = props, [internallySelected, setSelected] = useControlledValue(initiallySelected, onSelect ? initiallySelected : void 0), selected = onSelect ? initiallySelected : internallySelected, { isSameDay: isSameDay2 } = dateLib, isSelected = (date) => selected?.some((d) => isSameDay2(d, date)) ?? !1, { min: min2, max: max2 } = props;
    return {
      selected,
      select: (triggerDate, modifiers, e) => {
        let newDates = [...selected ?? []];
        if (isSelected(triggerDate)) {
          if (selected?.length === min2 || required && selected?.length === 1)
            return;
          newDates = selected?.filter((d) => !isSameDay2(d, triggerDate));
        } else
          selected?.length === max2 ? newDates = [triggerDate] : newDates = [...newDates, triggerDate];
        return onSelect || setSelected(newDates), onSelect?.(newDates, triggerDate, modifiers, e), newDates;
      },
      isSelected
    };
  }

  // node_modules/react-day-picker/dist/esm/utils/addToRange.js
  function addToRange(date, initialRange, min2 = 0, max2 = 0, required = !1, dateLib = defaultDateLib) {
    let { from, to } = initialRange || {}, { isSameDay: isSameDay2, isAfter: isAfter2, isBefore: isBefore2 } = dateLib, range;
    if (!from && !to)
      range = { from: date, to: min2 > 0 ? void 0 : date };
    else if (from && !to)
      isSameDay2(from, date) ? min2 === 0 ? range = { from, to: date } : required ? range = { from, to: void 0 } : range = void 0 : isBefore2(date, from) ? range = { from: date, to: from } : range = { from, to: date };
    else if (from && to)
      if (isSameDay2(from, date) && isSameDay2(to, date))
        required ? range = { from, to } : range = void 0;
      else if (isSameDay2(from, date))
        range = { from, to: min2 > 0 ? void 0 : date };
      else if (isSameDay2(to, date))
        range = { from: date, to: min2 > 0 ? void 0 : date };
      else if (isBefore2(date, from))
        range = { from: date, to };
      else if (isAfter2(date, from))
        range = { from, to: date };
      else if (isAfter2(date, to))
        range = { from, to: date };
      else
        throw new Error("Invalid range");
    if (range?.from && range?.to) {
      let diff = dateLib.differenceInCalendarDays(range.to, range.from);
      max2 > 0 && diff > max2 ? range = { from: date, to: void 0 } : min2 > 1 && diff < min2 && (range = { from: date, to: void 0 });
    }
    return range;
  }

  // node_modules/react-day-picker/dist/esm/utils/rangeContainsDayOfWeek.js
  function rangeContainsDayOfWeek(range, dayOfWeek, dateLib = defaultDateLib) {
    let dayOfWeekArr = Array.isArray(dayOfWeek) ? dayOfWeek : [dayOfWeek], date = range.from, totalDays = dateLib.differenceInCalendarDays(range.to, range.from), totalDaysLimit = Math.min(totalDays, 6);
    for (let i = 0; i <= totalDaysLimit; i++) {
      if (dayOfWeekArr.includes(date.getDay()))
        return !0;
      date = dateLib.addDays(date, 1);
    }
    return !1;
  }

  // node_modules/react-day-picker/dist/esm/utils/rangeOverlaps.js
  function rangeOverlaps(rangeLeft, rangeRight, dateLib = defaultDateLib) {
    return rangeIncludesDate(rangeLeft, rangeRight.from, !1, dateLib) || rangeIncludesDate(rangeLeft, rangeRight.to, !1, dateLib) || rangeIncludesDate(rangeRight, rangeLeft.from, !1, dateLib) || rangeIncludesDate(rangeRight, rangeLeft.to, !1, dateLib);
  }

  // node_modules/react-day-picker/dist/esm/utils/rangeContainsModifiers.js
  function rangeContainsModifiers(range, modifiers, dateLib = defaultDateLib) {
    let matchers = Array.isArray(modifiers) ? modifiers : [modifiers];
    if (matchers.filter((matcher) => typeof matcher != "function").some((matcher) => typeof matcher == "boolean" ? matcher : dateLib.isDate(matcher) ? rangeIncludesDate(range, matcher, !1, dateLib) : isDatesArray(matcher, dateLib) ? matcher.some((date) => rangeIncludesDate(range, date, !1, dateLib)) : isDateRange(matcher) ? matcher.from && matcher.to ? rangeOverlaps(range, { from: matcher.from, to: matcher.to }, dateLib) : !1 : isDayOfWeekType(matcher) ? rangeContainsDayOfWeek(range, matcher.dayOfWeek, dateLib) : isDateInterval(matcher) ? dateLib.isAfter(matcher.before, matcher.after) ? rangeOverlaps(range, {
      from: dateLib.addDays(matcher.after, 1),
      to: dateLib.addDays(matcher.before, -1)
    }, dateLib) : dateMatchModifiers(range.from, matcher, dateLib) || dateMatchModifiers(range.to, matcher, dateLib) : isDateAfterType(matcher) || isDateBeforeType(matcher) ? dateMatchModifiers(range.from, matcher, dateLib) || dateMatchModifiers(range.to, matcher, dateLib) : !1))
      return !0;
    let functionMatchers = matchers.filter((matcher) => typeof matcher == "function");
    if (functionMatchers.length) {
      let date = range.from, totalDays = dateLib.differenceInCalendarDays(range.to, range.from);
      for (let i = 0; i <= totalDays; i++) {
        if (functionMatchers.some((matcher) => matcher(date)))
          return !0;
        date = dateLib.addDays(date, 1);
      }
    }
    return !1;
  }

  // node_modules/react-day-picker/dist/esm/selection/useRange.js
  function useRange(props, dateLib) {
    let { disabled, excludeDisabled, resetOnSelect, selected: initiallySelected, required, onSelect } = props, [internallySelected, setSelected] = useControlledValue(initiallySelected, onSelect ? initiallySelected : void 0), selected = onSelect ? initiallySelected : internallySelected;
    return {
      selected,
      select: (triggerDate, modifiers, e) => {
        let { min: min2, max: max2 } = props, newRange;
        if (triggerDate) {
          let selectedFrom = selected?.from, selectedTo = selected?.to, hasFullRange = !!selectedFrom && !!selectedTo, isClickingSingleDayRange = !!selectedFrom && !!selectedTo && dateLib.isSameDay(selectedFrom, selectedTo) && dateLib.isSameDay(triggerDate, selectedFrom);
          resetOnSelect && (hasFullRange || !selected?.from) ? !required && isClickingSingleDayRange ? newRange = void 0 : newRange = { from: triggerDate, to: void 0 } : newRange = addToRange(triggerDate, selected, min2, max2, required, dateLib);
        }
        return excludeDisabled && disabled && newRange?.from && newRange.to && rangeContainsModifiers({ from: newRange.from, to: newRange.to }, disabled, dateLib) && (newRange.from = triggerDate, newRange.to = void 0), onSelect || setSelected(newRange), onSelect?.(newRange, triggerDate, modifiers, e), newRange;
      },
      isSelected: (date) => selected && rangeIncludesDate(selected, date, !1, dateLib)
    };
  }

  // node_modules/react-day-picker/dist/esm/selection/useSingle.js
  function useSingle(props, dateLib) {
    let { selected: initiallySelected, required, onSelect } = props, [internallySelected, setSelected] = useControlledValue(initiallySelected, onSelect ? initiallySelected : void 0), selected = onSelect ? initiallySelected : internallySelected, { isSameDay: isSameDay2 } = dateLib;
    return {
      selected,
      select: (triggerDate, modifiers, e) => {
        let newDate = triggerDate;
        return !required && selected && selected && isSameDay2(triggerDate, selected) && (newDate = void 0), onSelect || setSelected(newDate), onSelect?.(newDate, triggerDate, modifiers, e), newDate;
      },
      isSelected: (compareDate) => selected ? isSameDay2(selected, compareDate) : !1
    };
  }

  // node_modules/react-day-picker/dist/esm/useSelection.js
  function useSelection(props, dateLib) {
    let single = useSingle(props, dateLib), multi = useMulti(props, dateLib), range = useRange(props, dateLib);
    switch (props.mode) {
      case "single":
        return single;
      case "multiple":
        return multi;
      case "range":
        return range;
      default:
        return;
    }
  }

  // node_modules/react-day-picker/dist/esm/utils/toTimeZone.js
  function toTimeZone(date, timeZone) {
    return date instanceof TZDate && date.timeZone === timeZone ? date : new TZDate(date, timeZone);
  }

  // node_modules/react-day-picker/dist/esm/utils/convertMatchersToTimeZone.js
  function toZoneNoon(date, timeZone, noonSafe) {
    if (!noonSafe)
      return toTimeZone(date, timeZone);
    let zoned = toTimeZone(date, timeZone), noonZoned = new TZDate(zoned.getFullYear(), zoned.getMonth(), zoned.getDate(), 12, 0, 0, timeZone);
    return new Date(noonZoned.getTime());
  }
  function convertMatcher(matcher, timeZone, noonSafe) {
    return typeof matcher == "boolean" || typeof matcher == "function" ? matcher : matcher instanceof Date ? toZoneNoon(matcher, timeZone, noonSafe) : Array.isArray(matcher) ? matcher.map((value) => value instanceof Date ? toZoneNoon(value, timeZone, noonSafe) : value) : isDateRange(matcher) ? {
      ...matcher,
      from: matcher.from ? toTimeZone(matcher.from, timeZone) : matcher.from,
      to: matcher.to ? toTimeZone(matcher.to, timeZone) : matcher.to
    } : isDateInterval(matcher) ? {
      before: toZoneNoon(matcher.before, timeZone, noonSafe),
      after: toZoneNoon(matcher.after, timeZone, noonSafe)
    } : isDateAfterType(matcher) ? {
      after: toZoneNoon(matcher.after, timeZone, noonSafe)
    } : isDateBeforeType(matcher) ? {
      before: toZoneNoon(matcher.before, timeZone, noonSafe)
    } : matcher;
  }
  function convertMatchersToTimeZone(matchers, timeZone, noonSafe) {
    return matchers && (Array.isArray(matchers) ? matchers.map((matcher) => convertMatcher(matcher, timeZone, noonSafe)) : convertMatcher(matchers, timeZone, noonSafe));
  }

  // node_modules/react-day-picker/dist/esm/DayPicker.js
  function DayPicker(initialProps) {
    let props = initialProps, timeZone = props.timeZone;
    if (timeZone && (props = {
      ...initialProps,
      timeZone
    }, props.today && (props.today = toTimeZone(props.today, timeZone)), props.month && (props.month = toTimeZone(props.month, timeZone)), props.defaultMonth && (props.defaultMonth = toTimeZone(props.defaultMonth, timeZone)), props.startMonth && (props.startMonth = toTimeZone(props.startMonth, timeZone)), props.endMonth && (props.endMonth = toTimeZone(props.endMonth, timeZone)), props.mode === "single" && props.selected ? props.selected = toTimeZone(props.selected, timeZone) : props.mode === "multiple" && props.selected ? props.selected = props.selected?.map((date) => toTimeZone(date, timeZone)) : props.mode === "range" && props.selected && (props.selected = {
      from: props.selected.from ? toTimeZone(props.selected.from, timeZone) : props.selected.from,
      to: props.selected.to ? toTimeZone(props.selected.to, timeZone) : props.selected.to
    }), props.disabled !== void 0 && (props.disabled = convertMatchersToTimeZone(props.disabled, timeZone)), props.hidden !== void 0 && (props.hidden = convertMatchersToTimeZone(props.hidden, timeZone)), props.modifiers)) {
      let nextModifiers = {};
      Object.keys(props.modifiers).forEach((key) => {
        nextModifiers[key] = convertMatchersToTimeZone(props.modifiers?.[key], timeZone);
      }), props.modifiers = nextModifiers;
    }
    let { components, formatters: formatters2, labels, dateLib, locale, classNames } = (0, import_react31.useMemo)(() => {
      let locale2 = { ...enUS2, ...props.locale }, weekStartsOn = props.broadcastCalendar ? 1 : props.weekStartsOn, noonOverrides = props.noonSafe && props.timeZone ? createNoonOverrides(props.timeZone, {
        weekStartsOn,
        locale: locale2
      }) : void 0, overrides = props.dateLib && noonOverrides ? { ...noonOverrides, ...props.dateLib } : props.dateLib ?? noonOverrides, dateLib2 = new DateLib({
        locale: locale2,
        weekStartsOn,
        firstWeekContainsDate: props.firstWeekContainsDate,
        useAdditionalWeekYearTokens: props.useAdditionalWeekYearTokens,
        useAdditionalDayOfYearTokens: props.useAdditionalDayOfYearTokens,
        timeZone: props.timeZone,
        numerals: props.numerals
      }, overrides);
      return {
        dateLib: dateLib2,
        components: getComponents(props.components),
        formatters: getFormatters(props.formatters),
        labels: getLabels(props.labels, dateLib2.options),
        locale: locale2,
        classNames: { ...getDefaultClassNames(), ...props.classNames }
      };
    }, [
      props.locale,
      props.broadcastCalendar,
      props.weekStartsOn,
      props.firstWeekContainsDate,
      props.useAdditionalWeekYearTokens,
      props.useAdditionalDayOfYearTokens,
      props.timeZone,
      props.numerals,
      props.dateLib,
      props.noonSafe,
      props.components,
      props.formatters,
      props.labels,
      props.classNames
    ]);
    props.today || (props = { ...props, today: dateLib.today() });
    let { captionLayout, mode, navLayout, numberOfMonths = 1, onDayBlur, onDayClick, onDayFocus, onDayKeyDown, onDayMouseEnter, onDayMouseLeave, onNextClick, onPrevClick, showWeekNumber, styles } = props, { formatCaption: formatCaption2, formatDay: formatDay2, formatMonthDropdown: formatMonthDropdown2, formatWeekNumber: formatWeekNumber2, formatWeekNumberHeader: formatWeekNumberHeader2, formatWeekdayName: formatWeekdayName2, formatYearDropdown: formatYearDropdown2 } = formatters2, calendar = useCalendar(props, dateLib), { days, months, navStart, navEnd, previousMonth, nextMonth, goToMonth } = calendar, getModifiers = createGetModifiers(days, props, navStart, navEnd, dateLib), { isSelected, select, selected: selectedValue } = useSelection(props, dateLib) ?? {}, { blur, focused, isFocusTarget, moveFocus, setFocused } = useFocus(props, calendar, getModifiers, isSelected ?? (() => !1), dateLib), { labelDayButton: labelDayButton2, labelGridcell: labelGridcell2, labelGrid: labelGrid2, labelMonthDropdown: labelMonthDropdown2, labelNav: labelNav2, labelPrevious: labelPrevious2, labelNext: labelNext2, labelWeekday: labelWeekday2, labelWeekNumber: labelWeekNumber2, labelWeekNumberHeader: labelWeekNumberHeader2, labelYearDropdown: labelYearDropdown2 } = labels, weekdays = (0, import_react31.useMemo)(() => getWeekdays(dateLib, props.ISOWeek, props.broadcastCalendar, props.today), [dateLib, props.ISOWeek, props.broadcastCalendar, props.today]), isInteractive = mode !== void 0 || onDayClick !== void 0, handlePreviousClick = (0, import_react31.useCallback)(() => {
      previousMonth && (goToMonth(previousMonth), onPrevClick?.(previousMonth));
    }, [previousMonth, goToMonth, onPrevClick]), handleNextClick = (0, import_react31.useCallback)(() => {
      nextMonth && (goToMonth(nextMonth), onNextClick?.(nextMonth));
    }, [goToMonth, nextMonth, onNextClick]), handleDayClick = (0, import_react31.useCallback)((day, m) => (e) => {
      e.preventDefault(), e.stopPropagation(), setFocused(day), !m.disabled && (select?.(day.date, m, e), onDayClick?.(day.date, m, e));
    }, [select, onDayClick, setFocused]), handleDayFocus = (0, import_react31.useCallback)((day, m) => (e) => {
      setFocused(day), onDayFocus?.(day.date, m, e);
    }, [onDayFocus, setFocused]), handleDayBlur = (0, import_react31.useCallback)((day, m) => (e) => {
      blur(), onDayBlur?.(day.date, m, e);
    }, [blur, onDayBlur]), handleDayKeyDown = (0, import_react31.useCallback)((day, modifiers) => (e) => {
      let keyMap = {
        ArrowLeft: [
          e.shiftKey ? "month" : "day",
          props.dir === "rtl" ? "after" : "before"
        ],
        ArrowRight: [
          e.shiftKey ? "month" : "day",
          props.dir === "rtl" ? "before" : "after"
        ],
        ArrowDown: [e.shiftKey ? "year" : "week", "after"],
        ArrowUp: [e.shiftKey ? "year" : "week", "before"],
        PageUp: [e.shiftKey ? "year" : "month", "before"],
        PageDown: [e.shiftKey ? "year" : "month", "after"],
        Home: ["startOfWeek", "before"],
        End: ["endOfWeek", "after"]
      };
      if (keyMap[e.key]) {
        e.preventDefault(), e.stopPropagation();
        let [moveBy, moveDir] = keyMap[e.key];
        moveFocus(moveBy, moveDir);
      }
      onDayKeyDown?.(day.date, modifiers, e);
    }, [moveFocus, onDayKeyDown, props.dir]), handleDayMouseEnter = (0, import_react31.useCallback)((day, modifiers) => (e) => {
      onDayMouseEnter?.(day.date, modifiers, e);
    }, [onDayMouseEnter]), handleDayMouseLeave = (0, import_react31.useCallback)((day, modifiers) => (e) => {
      onDayMouseLeave?.(day.date, modifiers, e);
    }, [onDayMouseLeave]), handleMonthChange = (0, import_react31.useCallback)((date, monthOffset) => (e) => {
      let selectedMonth = Number(e.target.value), month = dateLib.setMonth(dateLib.startOfMonth(date), selectedMonth);
      goToMonth(dateLib.addMonths(month, -monthOffset));
    }, [dateLib, goToMonth]), handleYearChange = (0, import_react31.useCallback)((date, monthOffset) => (e) => {
      let selectedYear = Number(e.target.value), month = dateLib.setYear(dateLib.startOfMonth(date), selectedYear);
      goToMonth(dateLib.addMonths(month, -monthOffset));
    }, [dateLib, goToMonth]), { className, style } = (0, import_react31.useMemo)(() => ({
      className: [classNames[UI.Root], props.className].filter(Boolean).join(" "),
      style: { ...styles?.[UI.Root], ...props.style }
    }), [classNames, props.className, props.style, styles]), dataAttributes = getDataAttributes(props), getDropdownStyle = (dropdown) => {
      let dropdownStyle = styles?.[UI.Dropdown], specificDropdownStyle = styles?.[dropdown];
      if (!(!dropdownStyle && !specificDropdownStyle))
        return {
          ...dropdownStyle,
          ...specificDropdownStyle
        };
    }, rootElRef = (0, import_react31.useRef)(null);
    useAnimation(rootElRef, !!props.animate, {
      classNames,
      months,
      focused,
      dateLib
    });
    let contextValue = {
      dayPickerProps: props,
      selected: selectedValue,
      select,
      isSelected,
      months,
      nextMonth,
      previousMonth,
      goToMonth,
      getModifiers,
      components,
      classNames,
      styles,
      labels,
      formatters: formatters2
    };
    return import_react31.default.createElement(
      dayPickerContext.Provider,
      { value: contextValue },
      import_react31.default.createElement(
        components.Root,
        { rootRef: props.animate ? rootElRef : void 0, className, style, dir: props.dir, id: props.id, lang: props.lang ?? locale.code, nonce: props.nonce, title: props.title, role: props.role, "aria-label": props["aria-label"], "aria-labelledby": props["aria-labelledby"], ...dataAttributes },
        import_react31.default.createElement(
          components.Months,
          { className: classNames[UI.Months], style: styles?.[UI.Months] },
          !props.hideNavigation && !navLayout && import_react31.default.createElement(components.Nav, { "data-animated-nav": props.animate ? "true" : void 0, className: classNames[UI.Nav], style: styles?.[UI.Nav], "aria-label": labelNav2(), onPreviousClick: handlePreviousClick, onNextClick: handleNextClick, previousMonth, nextMonth }),
          months.map((calendarMonth, displayIndex) => {
            let monthOffset = props.reverseMonths ? months.length - 1 - displayIndex : displayIndex;
            return import_react31.default.createElement(
              components.Month,
              {
                "data-animated-month": props.animate ? "true" : void 0,
                className: classNames[UI.Month],
                style: styles?.[UI.Month],
                // biome-ignore lint/suspicious/noArrayIndexKey: breaks animation
                key: displayIndex,
                displayIndex,
                calendarMonth
              },
              navLayout === "around" && !props.hideNavigation && displayIndex === 0 && import_react31.default.createElement(
                components.PreviousMonthButton,
                { type: "button", className: classNames[UI.PreviousMonthButton], style: styles?.[UI.PreviousMonthButton], tabIndex: previousMonth ? void 0 : -1, "aria-disabled": previousMonth ? void 0 : !0, "aria-label": labelPrevious2(previousMonth), onClick: handlePreviousClick, "data-animated-button": props.animate ? "true" : void 0 },
                import_react31.default.createElement(components.Chevron, { disabled: previousMonth ? void 0 : !0, className: classNames[UI.Chevron], style: styles?.[UI.Chevron], orientation: props.dir === "rtl" ? "right" : "left" })
              ),
              import_react31.default.createElement(components.MonthCaption, { "data-animated-caption": props.animate ? "true" : void 0, className: classNames[UI.MonthCaption], style: styles?.[UI.MonthCaption], calendarMonth, displayIndex }, captionLayout?.startsWith("dropdown") ? import_react31.default.createElement(
                components.DropdownNav,
                { className: classNames[UI.Dropdowns], style: styles?.[UI.Dropdowns] },
                (() => {
                  let monthControl = captionLayout === "dropdown" || captionLayout === "dropdown-months" ? import_react31.default.createElement(components.MonthsDropdown, { key: "month", className: classNames[UI.MonthsDropdown], "aria-label": labelMonthDropdown2(), disabled: !!props.disableNavigation, onChange: handleMonthChange(calendarMonth.date, monthOffset), options: getMonthOptions(calendarMonth.date, navStart, navEnd, formatters2, dateLib), style: getDropdownStyle(UI.MonthsDropdown), value: dateLib.getMonth(calendarMonth.date) }) : import_react31.default.createElement("span", { key: "month" }, formatMonthDropdown2(calendarMonth.date, dateLib)), yearControl = captionLayout === "dropdown" || captionLayout === "dropdown-years" ? import_react31.default.createElement(components.YearsDropdown, { key: "year", className: classNames[UI.YearsDropdown], "aria-label": labelYearDropdown2(dateLib.options), disabled: !!props.disableNavigation, onChange: handleYearChange(calendarMonth.date, monthOffset), options: getYearOptions(navStart, navEnd, formatters2, dateLib, !!props.reverseYears), style: getDropdownStyle(UI.YearsDropdown), value: dateLib.getYear(calendarMonth.date) }) : import_react31.default.createElement("span", { key: "year" }, formatYearDropdown2(calendarMonth.date, dateLib));
                  return dateLib.getMonthYearOrder() === "year-first" ? [yearControl, monthControl] : [monthControl, yearControl];
                })(),
                import_react31.default.createElement("span", { role: "status", "aria-live": "polite", style: {
                  border: 0,
                  clip: "rect(0 0 0 0)",
                  height: "1px",
                  margin: "-1px",
                  overflow: "hidden",
                  padding: 0,
                  position: "absolute",
                  width: "1px",
                  whiteSpace: "nowrap",
                  wordWrap: "normal"
                } }, formatCaption2(calendarMonth.date, dateLib.options, dateLib))
              ) : import_react31.default.createElement(components.CaptionLabel, { className: classNames[UI.CaptionLabel], style: styles?.[UI.CaptionLabel], role: "status", "aria-live": "polite" }, formatCaption2(calendarMonth.date, dateLib.options, dateLib))),
              navLayout === "around" && !props.hideNavigation && displayIndex === numberOfMonths - 1 && import_react31.default.createElement(
                components.NextMonthButton,
                { type: "button", className: classNames[UI.NextMonthButton], style: styles?.[UI.NextMonthButton], tabIndex: nextMonth ? void 0 : -1, "aria-disabled": nextMonth ? void 0 : !0, "aria-label": labelNext2(nextMonth), onClick: handleNextClick, "data-animated-button": props.animate ? "true" : void 0 },
                import_react31.default.createElement(components.Chevron, { disabled: nextMonth ? void 0 : !0, className: classNames[UI.Chevron], style: styles?.[UI.Chevron], orientation: props.dir === "rtl" ? "left" : "right" })
              ),
              displayIndex === numberOfMonths - 1 && navLayout === "after" && !props.hideNavigation && import_react31.default.createElement(components.Nav, { "data-animated-nav": props.animate ? "true" : void 0, className: classNames[UI.Nav], style: styles?.[UI.Nav], "aria-label": labelNav2(), onPreviousClick: handlePreviousClick, onNextClick: handleNextClick, previousMonth, nextMonth }),
              import_react31.default.createElement(
                components.MonthGrid,
                { role: "grid", "aria-multiselectable": mode === "multiple" || mode === "range", "aria-label": labelGrid2(calendarMonth.date, dateLib.options, dateLib) || void 0, className: classNames[UI.MonthGrid], style: styles?.[UI.MonthGrid] },
                !props.hideWeekdays && import_react31.default.createElement(
                  components.Weekdays,
                  { "data-animated-weekdays": props.animate ? "true" : void 0, className: classNames[UI.Weekdays], style: styles?.[UI.Weekdays] },
                  showWeekNumber && import_react31.default.createElement(components.WeekNumberHeader, { "aria-label": labelWeekNumberHeader2(dateLib.options), className: classNames[UI.WeekNumberHeader], style: styles?.[UI.WeekNumberHeader], scope: "col" }, formatWeekNumberHeader2()),
                  weekdays.map((weekday) => import_react31.default.createElement(components.Weekday, { "aria-label": labelWeekday2(weekday, dateLib.options, dateLib), className: classNames[UI.Weekday], key: String(weekday), style: styles?.[UI.Weekday], scope: "col" }, formatWeekdayName2(weekday, dateLib.options, dateLib)))
                ),
                import_react31.default.createElement(components.Weeks, { "data-animated-weeks": props.animate ? "true" : void 0, className: classNames[UI.Weeks], style: styles?.[UI.Weeks] }, calendarMonth.weeks.map((week) => import_react31.default.createElement(
                  components.Week,
                  { className: classNames[UI.Week], key: week.weekNumber, style: styles?.[UI.Week], week },
                  showWeekNumber && import_react31.default.createElement(components.WeekNumber, { week, style: styles?.[UI.WeekNumber], "aria-label": labelWeekNumber2(week.weekNumber, {
                    locale
                  }), className: classNames[UI.WeekNumber], scope: "row", role: "rowheader" }, formatWeekNumber2(week.weekNumber, dateLib)),
                  week.days.map((day) => {
                    let { date } = day, modifiers = getModifiers(day);
                    if (modifiers[DayFlag.focused] = !modifiers.hidden && !!focused?.isEqualTo(day), modifiers[SelectionState.selected] = isSelected?.(date) || modifiers.selected, isDateRange(selectedValue)) {
                      let { from, to } = selectedValue;
                      modifiers[SelectionState.range_start] = !!(from && to && dateLib.isSameDay(date, from)), modifiers[SelectionState.range_end] = !!(from && to && dateLib.isSameDay(date, to)), modifiers[SelectionState.range_middle] = rangeIncludesDate(selectedValue, date, !0, dateLib);
                    }
                    let style2 = getStyleForModifiers(modifiers, styles, props.modifiersStyles), className2 = getClassNamesForModifiers(modifiers, classNames, props.modifiersClassNames), ariaLabel = !isInteractive && !modifiers.hidden ? labelGridcell2(date, modifiers, dateLib.options, dateLib) : void 0;
                    return import_react31.default.createElement(components.Day, { key: `${day.isoDate}_${day.displayMonthId}`, day, modifiers, className: className2.join(" "), style: style2, role: "gridcell", "aria-selected": modifiers.selected || void 0, "aria-label": ariaLabel, "data-day": day.isoDate, "data-month": day.outside ? day.dateMonthId : void 0, "data-selected": modifiers.selected || void 0, "data-disabled": modifiers.disabled || void 0, "data-hidden": modifiers.hidden || void 0, "data-outside": day.outside || void 0, "data-focused": modifiers.focused || void 0, "data-today": modifiers.today || void 0 }, !modifiers.hidden && isInteractive ? import_react31.default.createElement(components.DayButton, { className: classNames[UI.DayButton], style: styles?.[UI.DayButton], type: "button", day, modifiers, disabled: !modifiers.focused && modifiers.disabled || void 0, "aria-disabled": modifiers.focused && modifiers.disabled || void 0, tabIndex: isFocusTarget(day) ? 0 : -1, "aria-label": labelDayButton2(date, modifiers, dateLib.options, dateLib), onClick: handleDayClick(day, modifiers), onBlur: handleDayBlur(day, modifiers), onFocus: handleDayFocus(day, modifiers), onKeyDown: handleDayKeyDown(day, modifiers), onMouseEnter: handleDayMouseEnter(day, modifiers), onMouseLeave: handleDayMouseLeave(day, modifiers) }, formatDay2(date, dateLib.options, dateLib)) : !modifiers.hidden && formatDay2(day.date, dateLib.options, dateLib));
                  })
                )))
              )
            );
          })
        ),
        props.footer && import_react31.default.createElement(components.Footer, { className: classNames[UI.Footer], style: styles?.[UI.Footer], role: "status", "aria-live": "polite" }, props.footer)
      )
    );
  }

  // scripts/src/picker.jsx
  var import_jsx_runtime = __toESM(require_jsx_runtime()), pad = (n) => String(n).padStart(2, "0");
  function parseCivil(iso) {
    if (!iso || typeof iso != "string") return;
    let m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
    if (!m) return;
    let [, y, mo, d] = m;
    return new Date(Number(y), Number(mo) - 1, Number(d), 12, 0, 0, 0);
  }
  function toCivil(d) {
    if (!(!d || isNaN(d.getTime())))
      return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  }
  function CalendarRoot({ value, mode = "single", onSelect, minDate }) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      DayPicker,
      {
        mode,
        selected: value,
        onSelect,
        locale: zhCN,
        weekStartsOn: 1,
        defaultMonth: value && value.from ? value.from : value || void 0,
        autoFocus: !0,
        showOutsideDays: !0,
        disabled: minDate ? { before: minDate } : void 0,
        fixedWeeks: !1
      }
    );
  }
  function PickerPanel(props) {
    let {
      value,
      // 单日：iso 字符串；区间：{from,to}
      onChange,
      // 收到完整选择就通知外层（iso / {from,to}，均为 undefined 表示清空）
      minDate,
      // 可选 yyyy-mm-dd，早于它的日期禁用
      mode = "single"
    } = props, handleSelect = React27.useCallback(
      (sel) => {
        if (mode === "single")
          onChange(sel ? toCivil(sel) : void 0);
        else {
          let r = sel && sel.from ? { from: toCivil(sel.from), to: sel.to ? toCivil(sel.to) : void 0 } : void 0;
          onChange(r);
        }
      },
      [mode, onChange]
    ), selected = React27.useMemo(() => {
      if (mode === "single") return parseCivil(value);
      let r = value && (value.from || value.to) ? value : void 0;
      return r && r.from ? { from: parseCivil(r.from), to: r.to ? parseCivil(r.to) : void 0 } : void 0;
    }, [mode, value]);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "nsdp-cal", "data-mode": mode, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      CalendarRoot,
      {
        value: selected,
        mode,
        onSelect: handleSelect,
        minDate: minDate ? parseCivil(minDate) : void 0
      }
    ) });
  }
  var roots = /* @__PURE__ */ new Map();
  function renderPicker(container, config) {
    let root = roots.get(container);
    return root || (root = (0, import_client.createRoot)(container), roots.set(container, root)), root.render(
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        PickerPanel,
        {
          mode: config.mode || "single",
          value: config.value,
          minDate: config.minDate,
          onChange: (v) => {
            config.onChange && config.onChange(v);
          }
        }
      )
    ), () => {
      let r = roots.get(container);
      r && (r.unmount(), roots.delete(container));
    };
  }

  // scripts/src/entry.jsx
  globalThis.NSDatePickerReact = { renderPicker };
})();
/*! Bundled license information:

react/cjs/react.production.js:
  (**
   * @license React
   * react.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

scheduler/cjs/scheduler.production.js:
  (**
   * @license React
   * scheduler.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom.production.js:
  (**
   * @license React
   * react-dom.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom-client.production.js:
  (**
   * @license React
   * react-dom-client.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react-jsx-runtime.production.js:
  (**
   * @license React
   * react-jsx-runtime.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
