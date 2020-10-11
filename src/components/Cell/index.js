import React from "react";
import { NavLink } from "react-router-dom";
import Icon from "../Icon";

import "./index.less";

const Cell = ({ title, children, type = "icon", url, IconComp = () => "" }) => {
  return (
    <div className="cell-default">
      <label className="cell-title">{title}</label>
      <div className="cell-container">{children}</div>
      <div className="nav-link-icon">
        {type === "nav" ? (
          url ? (
            <NavLink to={url}>
              {IconComp() || <Icon type="iconright" />}
            </NavLink>
          ) : (
            ""
          )
        ) : type === "icon" ? (
          IconComp()
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Cell;
