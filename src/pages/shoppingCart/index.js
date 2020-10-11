import React, { useState, useEffect } from "react";
import "./index.less";

import PageTemplate from "../../layout/pageTemplate";
import GoodsCard from "../../components/card/GoodsCard";
import localStorage from "../../utils/localStorage";
import Alert from "../../components/Alert";
import Cell from "../../components/Cell";
import XInput from "../../components/Input";
import XSelect from "../../components/Select";
import Button from "../../components/Button";
import CartCard from "../../components/card/CartCard";

import { addBuyInGoods, addSelledGoods } from "../../api";

const addAction = (Component) => {
  return ({ data, seletected = false, actions = (f) => f }) => {
    let modelList = data.model.split(/，|,/).map((i) => ({
      value: i,
      title: i,
    }));

    let [orderInfo, setOrderInfo] = useState({
      goodsId: data._id,
      name: data.name,
      model: modelList[0].value,
      number: 1,
      price: data.price,
    });

    useEffect(() => {
      actions(orderInfo);
    }, [actions, orderInfo]);

    function onChange(type, value) {
      let data = {
        ...orderInfo,
        [type]: value,
      };
      setOrderInfo(data);
      actions(data);
    }
    return (
      <div className={`goods-card-action ${seletected && "goods-seletected"}`}>
        <CartCard>
          <div>商品：{orderInfo.name}</div>
          <div>
            <Cell title="单价">
              <XInput
                value={orderInfo.price}
                type="number"
                onChange={(val) => onChange("price", Number(val))}
              ></XInput>
            </Cell>
            <Cell title="数量">
              <XInput
                value={orderInfo.number}
                type="number"
                onChange={(val) => onChange("number", Number(val))}
              ></XInput>
            </Cell>
            <Cell title="型号">
              <XSelect
                value={orderInfo.model}
                selecteList={modelList}
                onChange={(val) => onChange("model", val)}
              ></XSelect>
            </Cell>
          </div>
        </CartCard>
      </div>
    );
  };
};

const GoodsCardAction = addAction(GoodsCard);

let _shopingCartList = [];
// 保存和获取选中的商品
const LocalSelecetedGoodsList = {
  get() {
    return localStorage.getLocalStorage("selecetedGoodsList") || [];
  },
  set(data) {
    localStorage.setLocalStorage("selecetedGoodsList", data);
  },
};
// 页面组件
export default (props) => {
  let [shopingCartList, setShopingCartList] = useState([]);
  function getShopingCartList() {
    let list = LocalSelecetedGoodsList.get();

    if (!list.length) {
      Alert.info("尚未选择产品");
      props.history.push("/goodsList");
    }
    _shopingCartList = list || [];
    setShopingCartList(list || []);
  }

  useEffect(() => {
    getShopingCartList();
  }, [getShopingCartList]);

  function onAction(data, index) {
    _shopingCartList.splice(index, 1, data);
  }
  // 卖出商品
  function sellOut() {
    let orderData = {
      type: "sell",
      order: _shopingCartList,
    };
    addSelledGoods(orderData).then((res) => {
      if (res.code === 1) {
        Alert.success(res.message || "购买成功");
        LocalSelecetedGoodsList.set([]);
        props.history.push("/goodsList");
      } else {
        Alert.error("购买失败");
      }
    });
  }
  // 买入商品
  function buyIn() {
    let orderData = {
      type: "buyIn",
      order: _shopingCartList,
    };
    addBuyInGoods(orderData).then((res) => {
      if (res.code === 1) {
        Alert.success(res.message || "购买成功");
        LocalSelecetedGoodsList.set([]);
        props.history.push("/goodsList");
      } else {
        Alert.error("购买失败");
      }
    });
  }

  return (
    <PageTemplate>
      <h4>填写商品的价格，数量，型号</h4>

      {shopingCartList.map((i, index) => (
        <div key={i._id}>
          <GoodsCardAction data={i} actions={(data) => onAction(data, index)} />
        </div>
      ))}

      <Button onClick={sellOut}>卖出</Button>
      <Button onClick={buyIn}>买入</Button>
    </PageTemplate>
  );
};
