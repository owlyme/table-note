import React, { useState, useEffect } from "react";
import "./index.less";

import PageTemplate from "../../layout/pageTemplate";
import Cell from "../../components/Cell";
import XForm from "../../components/Form/form";
import XInput from "../../components/Input";
import XSelect from "../../components/Select";
import InputSelect from "../../components/InputSelect";
import Alert from "../../components/Alert";
import Button from "../../components/Button";

import { getGoodsModel, getGoodsNames, addSelledGoods } from "../../api";

let initFormData = {
  name: "",
  model: "L",
  price: 10,
  number: 1,
  type: "sell",
};

const Form = () => {
  let [model, setModel] = useState([]);
  useEffect(() => {
    getGoodsModel().then((res) => {
      setModel(res);
    });
  }, []);

  let [goodList, setGoodList] = useState([]);
  useEffect(() => {
    getGoodsNames().then((res) => {
      setGoodList(res);
    });
  }, []);

  let [formData, setFormData] = useState(initFormData);

  const onChange = (type, value) => setFormData({ ...formData, [type]: value });

  const onSubmit = () => {
    addSelledGoods(formData).then((res) => {
      if (res.code === 1) {
        Alert.success(res.message || "保存成功");
      } else {
        Alert.error("保存失败");
      }
    });
  };

  return (
    <XForm onSubmit={onSubmit}>
      <Cell title="商品名">
        <InputSelect
          placeholder="请输入商品名"
          value={formData.name}
          onChange={(val) => onChange("name", val)}
          selecteList={goodList}
        ></InputSelect>
      </Cell>

      <Cell title="型号">
        <XSelect
          name="model"
          value={formData.model}
          selecteList={model}
          onChange={(val) => onChange("model", val)}
        ></XSelect>
      </Cell>

      <Cell title="单价">
        <XInput
          value={formData.price}
          name="price"
          type="number"
          onChange={(val) => onChange("price", val)}
        ></XInput>
      </Cell>

      <Cell title="数量">
        <XInput
          value={formData.number}
          name="number"
          type="number"
          onChange={(val) => onChange("number", val)}
        ></XInput>
      </Cell>

      <Cell title="总价">
        <div className="text-v-center"> {formData.price * formData.number}</div>
      </Cell>

      <div style={{ marginTop: 20 }}>
        <Button>提交记录</Button>
      </div>
    </XForm>
  );
};

export default () => {
  return (
    <PageTemplate>
      <h2>出货商品账单</h2>
      <Form></Form>
    </PageTemplate>
  );
};
