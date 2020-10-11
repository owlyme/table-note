import React from "react";
import "./index.less";
import Cell from "../../components/Cell";
import PageTemplate from "../../layout/pageTemplate";

export default (props) => {
  let base = props.match.path;
  return (
    <PageTemplate>
      <h4>个人管理中心</h4>
      <Cell title="商品名列表" type="nav" url={`${base}/goodsName`}></Cell>
      <Cell title="订单管理" type="nav" url="/billList"></Cell>
      <Cell title="库存查看" type="nav" url={`${base}/depot`}></Cell>
      {/* <Cell title="商品型号管理" type="nav" url={`${base}/goodsModel`}></Cell> */}
    </PageTemplate>
  );
};
