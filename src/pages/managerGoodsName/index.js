import React, { useState, useEffect } from "react";
import "./index.less";

import Cell from "../../components/Cell";
import PageTemplate from "../../layout/pageTemplate";
import Alert from "../../components/Alert";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import XForm from "../../components/Form/form";
import XInput from "../../components/Input";

import {
  getGoodsNames,
  saveGoodsName,
  updateGoodsName,
  deleteGoodsName,
} from "../../api";

let initFormData = {
  name: "尿不湿",
  model: "SM,S,M,L,XL,XXL",
  price: 10,
};

const Form = (props) => {
  let [formData, setFormData] = useState(props.info || initFormData);
  useEffect(() => {
    setFormData(props.info);
  }, [props.info]);
  const onChange = (type, value) => {
    let data = { ...formData, [type]: value };
    setFormData(data);
    props.onFormChange && props.onFormChange(data);
  };

  return (
    <XForm>
      <Cell title="商品名">
        <XInput
          value={formData.name}
          name="name"
          onChange={(val) => onChange("name", val)}
        ></XInput>
      </Cell>

      <Cell title="型号">
        <XInput
          value={formData.model}
          name="model"
          onChange={(val) => onChange("model", val)}
        ></XInput>
      </Cell>

      <Cell title="单价">
        <XInput
          value={formData.price}
          name="price"
          type="number"
          onChange={(val) => onChange("price", Number(val))}
        ></XInput>
      </Cell>
    </XForm>
  );
};
let newGoodsName = initFormData;
export default (props) => {
  let [showModal, setShowModal] = useState(false);
  let [formInfo, setFormInfo] = useState(initFormData);

  let [goodList, setGoodList] = useState([]);
  function getGoodsNamesFn() {
    getGoodsNames().then((res) => {
      setGoodList(res.data || []);
    });
  }
  useEffect(() => {
    getGoodsNamesFn();
  }, []);

  function onModifyGoodsName(data) {
    setShowModal(true);
    setFormInfo(data);
  }
  function onRemoveGoodsName(data, index) {
    let list = goodList.filter((i, _index) => index !== _index);

    deleteGoodsName({ id: data._id }).then((res) => {
      if (res.code === 1) {
        setGoodList(list);
        Alert.success("删除成功");
      } else {
        Alert.error("删除失败");
      }
    });
  }

  function onFormChange(data) {
    console.log(data);
    newGoodsName = data;
  }

  async function onSaveGoodsName(data) {
    console.log(data);
    let res = null;
    if (newGoodsName._id) {
      res = await updateGoodsName(newGoodsName);
    } else {
      res = await saveGoodsName(newGoodsName);
    }

    if (res.code === 1) {
      setShowModal(false);
      getGoodsNamesFn();
      Alert.success("操作成功");
    } else {
      Alert.error("操作失败");
    }
  }

  return (
    <PageTemplate>
      <h2>商品名管理</h2>
      {goodList.map((i, index) => (
        <Cell
          key={i._id}
          title={i.name}
          IconComp={() => (
            <div>
              <span onClick={() => onModifyGoodsName(i)}>修改</span> |{" "}
              <span onClick={() => onRemoveGoodsName(i, index)}>移除</span>
            </div>
          )}
        ></Cell>
      ))}
      <Button type="text" onClick={() => setShowModal(true)}>
        添加商品
      </Button>
      <Button>保存商品列表</Button>

      <Modal
        title="添加商品名"
        visible={showModal}
        onSubmit={onSaveGoodsName}
        onClose={() => setShowModal(false)}
        onText="保存"
        customClass="add-goods-name"
      >
        <Form info={formInfo} onFormChange={(data) => onFormChange(data)} />
      </Modal>
    </PageTemplate>
  );
};
