import React from "react";
import { NavLink } from "react-router-dom";
import Icon from "../../components/Icon";
import "./index.less";

const Temp = (props) => {
  return (
    <div>
      <div className="main-container">{props.children}</div>
      <div className="nav-link">
        <div className="nav-link-item">
          <NavLink to="/">
            <Icon className="nav-icon" type="iconjiantou"></Icon>
            <div>商品</div>
          </NavLink>
        </div>
        <div className="nav-link-item">
          <NavLink to="/shoppingCart">
            <Icon className="nav-icon" type="iconjiantou"></Icon>
            <div>购物车</div>
          </NavLink>
        </div>

        <div className="nav-link-item">
          <NavLink to="/goodsStatics">
            <Icon className="nav-icon" type="icontongji1"></Icon>
            <div>统计</div>
          </NavLink>
        </div>
        <div className="nav-link-item">
          <NavLink to="/manager">
            <Icon className="nav-icon" type="iconwode"></Icon>
            <div>我的</div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Temp;
