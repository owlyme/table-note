import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import Index from "./index";
import GoodsName from "../managerGoodsName/index";
import Depot from "../Depot/index";
import "./index.less";

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/manager" exact component={Index}></Route>
        <Route path="/manager/goodsName" component={GoodsName}></Route>
        <Route path="/manager/depot" component={Depot}></Route>
      </Switch>
    </HashRouter>
  );
}

export default App;
