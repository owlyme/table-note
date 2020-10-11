import React from "react";

const Input = props => {
  const { label, onChange, ...other } = props;
  const _onChange = e => {
    onChange(e.target.value);
  };
  return (
    <div>
      <label>{label}</label>
      <input {...other} onChange={_onChange}></input>
    </div>
  );
};

export default Input;
