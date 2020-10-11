import React from "react";
import {
  HashRouter,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";
import NavList from "../pages/navList";

import Login from "../pages/login";
import Stock from "../pages/stock/router";
import Order from "../pages/order/router";
import Member from "../pages/member/router";

import './index.less'
function App() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" exact component={NavList}></Route>
        <Route path="/login" component={withRouter(Login)}></Route>
        <Route path="/stock" component={Stock}></Route>
        <Route path="/order" component={Order}></Route>
        <Route path="/member" component={Member}></Route>
      </Switch>
    </HashRouter>
  );
}

export default App;
