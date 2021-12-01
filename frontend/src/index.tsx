import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import rootReducer from "@src/reducer";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";
import WebFont from "webfontloader";

const sagaMiddleware = createSagaMiddleware();
const enhancer = compose(applyMiddleware(sagaMiddleware));
const store = createStore(rootReducer, enhancer);

sagaMiddleware.run(rootSaga);
WebFont.load({
  custom: {
    families: ["NanumDaCaeSaRang"],
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root"),
);
