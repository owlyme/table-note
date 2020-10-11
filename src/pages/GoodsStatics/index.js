import React, { useState, useEffect } from "react";
import PageTemplate from "../../layout/pageTemplate";
import { findInOneMonth } from "../../api";

const StatsticsBars = ({ data = [] }) => {
  let [total, setTotal] = useState({ sell: 0, buy: 0 });
  useEffect(() => {
    let totalBuy = 0;
    let totalSell = 0;
    data.forEach((i) => {
      totalBuy += i.totalPriceBuyIn;
      totalSell += i.totalPriceSell;
    });

    setTotal({
      sell: totalSell,
      buy: totalBuy,
    });
  }, [data]);

  return (
    <>
      累计: 收入{total.sell}，支出{total.buy}，净收入{total.sell + total.buy}
      {data.map((i) => (
        <div key={i._id}>
          {i.label}: 收入{i.totalPriceSell}，支出{i.totalPriceBuyIn}
        </div>
      ))}
    </>
  );
};

const GoodsStatics = () => {
  const [goodsList30, setGoodsList30] = useState([]);
  useEffect(() => {
    findInOneMonth().then((res) => {
      if (res.code === 1) {
        setGoodsList30(
          res.data.map((i) => ({
            ...i,
            label: `${i.year}-${i.month}-${i._id}`,
          }))
        );
      }
    });
  }, []);

  return (
    <PageTemplate>
      <h4>当前月</h4>
      <StatsticsBars data={goodsList30} />
    </PageTemplate>
  );
};

export default GoodsStatics;
