import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import GlobalStyles from './styles/global';
import 'bootstrap/dist/css/bootstrap.css';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <GlobalStyles />
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </React.StrictMode>
);
