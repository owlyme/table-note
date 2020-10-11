import React, { useState, useEffect } from "react";
import { getTotalStatistics, getDepot } from "../../api";
import PageTemplate from "../../layout/pageTemplate";
import "./index.less";

const TotoalBillInfo = ({ data = [], totalMoney = 0 }) => {
  let style = { width: "25%" };

  return (
    <div className="total-bill">
      <div
        className="t-b-header"
        style={{
          display: "flex",
        }}
      >
        <div style={style}>名称</div>
        <div style={style}>型号</div>
        <div style={style}>金额(¥)</div>
        <div style={style}>数量</div>
      </div>
      <ul
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {data.map((i, index) => (
          <li
            key={index}
            style={{
              order: -1 * i.totalNumber,
              display: "flex",
            }}
          >
            <div style={style}>{i.name}</div>
            <div style={style}>{i.model}</div>
            <div style={style}>{i.totalPrice}</div>
            <div style={style}>{i.totalNumber}</div>
          </li>
        ))}
        <li style={{ display: "flex" }}>
          <div style={style}>累计金额：</div>
          <div style={style}></div>
          <div style={style}>{totalMoney}元</div>
          <div style={style}></div>
        </li>
      </ul>
    </div>
  );
};

const Depot = ({ data = [] }) => {
  let style = { width: "33.33%" };
  return (
    <div className="depot-detail">
      <div
        className="t-b-header"
        style={{
          display: "flex",
        }}
      >
        <div style={style}>名称</div>
        <div style={style}>型号</div>
        <div style={style}>库存</div>
      </div>
      <ul
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {data.map((i, index) => (
          <li
            key={index}
            style={{
              order: i.totalNumber,
              display: "flex",
            }}
          >
            <div style={style}>{i.name}</div>
            <div style={style}>{i.model}</div>
            <div style={style}>{i.totalNumber}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const GoodsStatics = () => {
  const [goodsListTotal, setGoodsListTotal] = useState({});
  useEffect(() => {
    getTotalStatistics().then((res) => {
      if (res.code === 1) {
        setGoodsListTotal(res.data);
      }
    });
  }, []);

  const [goodsDepot, setGoodsDepot] = useState([]);
  useEffect(() => {
    getDepot().then((res) => {
      if (res.code === 1) {
        setGoodsDepot(res.data || []);
      }
    });
  }, []);

  return (
    <PageTemplate>
      <div className="depot">
        <h4>累计出售</h4>
        <TotoalBillInfo
          data={goodsListTotal.sell || []}
          totalMoney={goodsListTotal.sellTotalMoney}
        />
        <h4>累计进货</h4>
        <TotoalBillInfo
          data={goodsListTotal.buyIn || []}
          totalMoney={goodsListTotal.buyInTotalMoney}
        />
        <h4>商品库存</h4>
        <Depot data={goodsDepot} />
      </div>
    </PageTemplate>
  );
};

export default GoodsStatics;
