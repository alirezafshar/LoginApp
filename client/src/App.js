import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Authen from "./components/Authen/Authen";
import "./App.css"

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={"/"} component={Login} />
        <Route path={"/signup"} component={Signup} />
        <Route path={"/authen"} component={Authen} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
