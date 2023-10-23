import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { applyMiddleware, compose } from 'redux';
import { legacy_createStore as createStore } from 'redux';
import { AuthContextProvider,PostContextProvider } from "./context/authContext";
import { DarkModeContextProvider } from "./context/darkModeContext";
import thunk from 'redux-thunk';
import dispatch from "./context/dispatch.js"

const root = ReactDOM.createRoot(document.getElementById("root"));

const store = createStore(dispatch, compose(applyMiddleware(thunk)))

root.render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <AuthContextProvider>
        <PostContextProvider>
          <Provider store={store}>
            <App />
          </Provider>,
        </PostContextProvider>
      </AuthContextProvider>
    </DarkModeContextProvider>
  </React.StrictMode>
);
