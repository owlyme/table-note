import React, { useState, useEffect } from "react";
import "./index.less";

import PageTemplate from "../../layout/pageTemplate";
import GoodsCard from "../../components/card/GoodsCard";
import localStorage from "../../utils/localStorage";
import { getGoodsNames } from "../../api";

const addAction = (Component) => {
  return ({ data, seletected = false, actions = (f) => f }) => (
    <div className={`goods-card-action ${seletected && "goods-seletected"}`}>
      <Component data={data} />
    </div>
  );
};

const GoodsCardAction = addAction(GoodsCard);

let _selecetedGoodsList = [];
// 保存和获取选中的商品
const LocalSelecetedGoodsList = {
  get() {
    return localStorage.getLocalStorage("selecetedGoodsList") || [];
  },
  set(data) {
    localStorage.setLocalStorage("selecetedGoodsList", data);
  },
};

export default () => {
  let [goodList, setGoodList] = useState([]);
  function getGoodsNamesFn() {
    getGoodsNames().then((res) => {
      setGoodList(res.data || []);
    });
  }

  useEffect(() => {
    getGoodsNamesFn();
    _selecetedGoodsList = LocalSelecetedGoodsList.get();
    setSelecetedGoodsList(_selecetedGoodsList.map((i) => i._id));
    return () => {};
  }, []);

  let [selecetedGoodsList, setSelecetedGoodsList] = useState([]);

  function onSelectedGoods(goods) {
    let index = _selecetedGoodsList.findIndex((item) => item._id === goods._id);
    if (index === -1) {
      _selecetedGoodsList.push(goods);
    } else {
      _selecetedGoodsList.splice(index, 1);
    }
    setSelecetedGoodsList(_selecetedGoodsList.map((i) => i._id));
    LocalSelecetedGoodsList.set(_selecetedGoodsList);
  }

  return (
    <PageTemplate>
      <h4>选择需要交易的商品</h4>

      {goodList.map((i, index) => (
        <div key={i._id} onClick={() => onSelectedGoods(i)}>
          <GoodsCardAction
            data={i}
            seletected={selecetedGoodsList.some((item) => item === i._id)}
          />
        </div>
      ))}
    </PageTemplate>
  );
};
