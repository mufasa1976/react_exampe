import { Backdrop } from "@material-ui/core";
import React, { Suspense } from "react";
import { Link, Route, Switch } from "react-router-dom";
import "./App.css";
import DeadLink from "./DeadLink";
import Detail from "./Detail";
import logo from "./logo.svg";
import Site from "./Site";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Site counter={123} />
        <Link to="/">Root</Link>
        <Link to="/detail/123">123</Link>
        <Link to="/detail/456">456</Link>
        <Link to="/detail/789">789</Link>
        <Suspense fallback={<Backdrop open={true} />}>
          <Switch>
            <Route path="/detail/:id" component={Detail} />
            <Route path="/not-found" component={DeadLink} />
          </Switch>
        </Suspense>
      </header>
    </div>
  );
};

export default App;
