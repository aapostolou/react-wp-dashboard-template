import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

function configStore(rootReducer, initialState, middlewares) {
  return createStore(
    rootReducer,
    initialState,
    !process.env.NODE_ENV || process.env.NODE_ENV === "development"
      ? composeWithDevTools(applyMiddleware(...middlewares))
      : applyMiddleware(...middlewares)
  );
}

export default configStore;
