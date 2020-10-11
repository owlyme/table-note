import React from "react";
import Yuan from "../yuan";
import dayjs from "dayjs";
import "./index.less";

const BuyCard = ({ data = {} }) => {
  return (
    <div className="card">
      <div className="statistcs-time">
        {dayjs(data.dealTime).format("YYYY年MM月份统计")}
      </div>
      <div className="body">
        <div className="total-output">
          <div>总支出</div>
          <Yuan title="" type="output" money={100}></Yuan>
        </div>
        <div className="total-input">
          <div>总收入</div>
          <Yuan title="" type="input" money={100}></Yuan>
        </div>
        <div className="total-profit">
          <div>净利润</div>
          <Yuan title="" type="output" money={100}></Yuan>
        </div>
      </div>
    </div>
  );
};

export default BuyCard;
