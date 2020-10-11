import React from "react";
// import WordPic from "../wordPic";
import "./index.less";

const BillCard = ({ data = {} }) => {
  return (
    <div className="card ">
      <div className="body good-body">
        <div className="pic">
          {/* <WordPic word={data.name}></WordPic> */}
          {data.name}
        </div>
        <div>单价：{data.price} 元</div>
      </div>
    </div>
  );
};

export default BillCard;
