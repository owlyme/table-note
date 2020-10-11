import React from "react";
import "./index.less";

const Input = (props) => {
  const { onChange, ...other } = props;
  const _onChange = (e) => {
    let value = e.target.value;
    if (other.type === "number") {
      let pattern = new RegExp("[^\\d\\.]", "g");
      value = value.replace(pattern, "");
    }
    onChange(value);
  };
  return (
    <input className="input-default" {...other} onChange={_onChange}></input>
  );
};

export default Input;
