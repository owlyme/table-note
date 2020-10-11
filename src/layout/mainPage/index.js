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
          <NavLink to="/stock">
            <Icon className="nav-icon" type="iconjiantou"></Icon>
            <div>仓库</div>
          </NavLink>
        </div>
        <div className="nav-link-item">
          <NavLink to="/order">
            <Icon className="nav-icon" type="iconjiantou"></Icon>
            <div>订单</div>
          </NavLink>
        </div>

        <div className="nav-link-item">
          <NavLink to="/member">
            <Icon className="nav-icon" type="icontongji1"></Icon>
            <div>会员</div>
          </NavLink>
        </div>
        {/* <div className="nav-link-item">
          <NavLink to="/manager">
            <Icon className="nav-icon" type="iconwode"></Icon>
            <div>我的</div>
          </NavLink>
        </div> */}
      </div>
    </div>
  );
};

export default Temp;
