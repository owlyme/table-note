import React from "react";
import "./index.less";

function addComma(num) {
  return num;
}
// type: input output
const Yuan = ({ type, money, title = "人民币" }) => {
  return (
    <span className="money">
      {title} ¥
      <span
        style={{
          color: type ? "red" : "green",
        }}
      >
        {(type ? "+" : "-") + addComma(money)}
      </span>
      元
    </span>
  );
};

export default Yuan;
