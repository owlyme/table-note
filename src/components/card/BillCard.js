import React from "react";
import Yuan from "../yuan";
import dayjs from "dayjs";
import "./index.less";

const BillCard = ({ data = {} }) => {
  let typeSell = data.type === "sell";
  return (
    <div className="card">
      <div className="time">
        订单时间：{dayjs(Number(data.createTime)).format("YYYY-MM-DD HH:mm")}
      </div>
      <div className="body order-body">
        <div className="order-type">{typeSell ? "卖出 =>" : "买入 <="} </div>
        <div className="container">
          {/* {data.order.map((i) => i.name).join(",")} */}
        </div>
        <div className="order-price">
          <Yuan title="" type={typeSell} money={data.totalPrice}></Yuan>
        </div>
      </div>
    </div>
  );
};

export default BillCard;
