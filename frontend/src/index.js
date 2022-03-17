import "@fontsource/roboto";

import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";

import App from "./App";
import WebSocketProvider from "./components/websocket/WebSocket";
import rootReducer from "./reducers/rootReducer";

import "./index.css";
import "./i18n";

const store = createStore(rootReducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <WebSocketProvider>
        <App />
      </WebSocketProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
