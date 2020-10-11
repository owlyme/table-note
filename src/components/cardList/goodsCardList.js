import React, { useState, useEffect } from "react";
import { Card } from "antd-mobile";
import { getSelldGoodsList } from "../../api";

// 商品型号 售出数量 所得利润
const CardSell = ({ data = {} }) => {
  return (
    <Card full>
      <Card.Header title={data.model} />
      <Card.Body>
        <div>售出数量:{data.sellNum}</div>
        <div>所得利润:¥{(data.selledPrice - data.price) * data.selledNum}</div>
      </Card.Body>
      <Card.Footer extra={data.dealTime} />
    </Card>
  );
};

const CardList = () => {
  let [data, setData] = useState([]);

  useEffect(() => {
    getSelldGoodsList().then(({ data }) => {
      setData(data.data);
    });
  }, []);

  return (
    <div>
      {data.map((i, index) => (
        <CardSell key={i.id} data={i}></CardSell>
      ))}
    </div>
  );
};

export default CardList;
