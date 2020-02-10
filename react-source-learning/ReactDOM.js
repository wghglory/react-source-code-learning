// https://github.com/facebook/react/blob/master/packages/react-dom/src/client/ReactDOM.js

/* 最核⼼的api：

- React.createElement：创建虚拟DOM
- React.Component：实现⾃定义组件
- ReactDOM.render：渲染真实DOM */

const ReactDOM: Object = {
  createPortal,

  // Legacy
  findDOMNode,
  hydrate,
  render,
  unmountComponentAtNode,

  unstable_batchedUpdates: batchedUpdates,

  flushSync: flushSync,

  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
    // Keep in sync with ReactDOMUnstableNativeDependencies.js
    // ReactTestUtils.js, and ReactTestUtilsAct.js. This is an array for better minification.
    Events: [
      getInstanceFromNode,
      getNodeFromInstance,
      getFiberCurrentPropsFromNode,
      EventPluginHubInjection.injectEventPluginsByName,
      eventNameDispatchConfigs,
      accumulateTwoPhaseDispatches,
      accumulateDirectDispatches,
      enqueueStateRestore,
      restoreStateIfNeeded,
      dispatchEvent,
      runEventsInBatch,
      flushPassiveEffects,
      IsThisRendererActing
    ]
  },

  version: ReactVersion
};

// ...
