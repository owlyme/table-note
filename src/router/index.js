import React from "react";
import {
  HashRouter,
  Switch,
  Route,
  withRouter,
  Redirect,
} from "react-router-dom";
import Index from "../pages/Index";
import BuyGoods from "../pages/BuyGoods";
import GoodsStatics from "../pages/GoodsStatics";
import SelledGoods from "../pages/SelledGoods";
import Login from "../pages/login";
import Manager from "../pages/manager/route";
import billInfo from "../pages/billInfo";
import GoodsList from "../pages/goodsList";
import ShoppingCart from "../pages/shoppingCart";

import "./index.less";

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/goodsList" render={() => <Redirect to="/" />}></Route>
        <Route path="/" exact component={GoodsList}></Route>
        <Route path="/shoppingCart" component={ShoppingCart}></Route>
        <Route path="/buyGoods" component={BuyGoods}></Route>
        <Route path="/sellGoods" component={SelledGoods}></Route>
        <Route path="/goodsStatics" component={GoodsStatics}></Route>
        <Route path="/manager" component={withRouter(Manager)}></Route>
        <Route path="/login" component={withRouter(Login)}></Route>
        <Route path="/billList" component={Index}></Route>
        <Route path="/billInfo/:id" component={billInfo}></Route>
      </Switch>
    </HashRouter>
  );
}

export default App;
