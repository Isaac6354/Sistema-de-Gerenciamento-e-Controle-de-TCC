import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import MainPage from "./pages/Main-Page";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import CadastroPage from './pages/Cadastro-page'
import ConsultaUsuarioPages from './pages/ConsultaUsuarioPages'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path="/">
          <MainPage />
        </Route>
        <Route path="/criarconta">
          <CadastroPage />
        </Route>
        <Route path="/consultaUsuario">
          <ConsultaUsuarioPages />
        </Route>
        <Route path="/home">
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can chane
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
