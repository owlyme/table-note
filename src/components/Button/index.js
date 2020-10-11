import React from "react";
import "./index.less";

const Button = ({ onClick = (f) => f, children, customClass = "", type }) => (
  <button
    className={`button-default button-${type} ${customClass}`}
    onClick={onClick}
  >
    <span>{children}</span>
  </button>
);

export default Button;
