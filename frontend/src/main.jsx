import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { Toaster } from "sonner";
import store from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import {persistStore} from "redux-persist";
import React from "react";

let persisitor = persistStore(store)

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persisitor}>
        <App />
        <Toaster />
      </PersistGate>
    </Provider>
  </StrictMode>
);