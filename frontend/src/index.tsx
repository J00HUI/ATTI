import React from "react";
import ReactDOM, { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import HeaderNav from "./components/HeaderNav";
import GlobalStyle from "./styles/Font/GlobalStyle";

// const rootElement  = ReactDOM.createRoot(
//   document.getElementById("root") as HTMLElement
// );
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");
const root = createRoot(rootElement);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <GlobalStyle />
      <div style={{fontFamily: `"GunggiLight", sans-serif, Arial`}}>
        <App />
      </div>
    </Provider>
  </BrowserRouter>
);
