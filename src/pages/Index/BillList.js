import React, { useState, useEffect, useRef } from "react";
import StatisticsCard from "../../components/card/StatisticsCard";
import BillCard from "../../components/card/BillCard";
import Button from "../../components/Button";
import Alert from "../../components/Alert";
import { getOrderList, deleteBill } from "../../api";
import Modal from "../../components/Modal";
import history from "../../../utils/spaHistory";

const addAction = (Component) => {
  return ({ data, actions = (f) => f }) => (
    <div>
      <div onClick={() => actions("delete")}> x </div>
      <div onClick={() => actions("info")}> info </div>

      <Component data={data} />
    </div>
  );
};

const BillCardAction = addAction(BillCard);

const CardList = () => {
  const pageInfo = useRef({
    page: 1,
    size: 10,
    total: 0,
  });

  let [hasMore, setHasMore] = useState(true);
  let [goodsList, setGoodsList] = useState([]);

  let getBillData = async () => {
    let { page, size } = pageInfo.current;
    let { code, data, message } = await getOrderList({
      page,
      size,
      // type: null
    });
    if (code === 1) {
      pageInfo.current.total = data.total;
      pageInfo.current.page = page + 1;
      setHasMore(page * size < data.total);
      setGoodsList([...goodsList, ...(data.records || [])]);
    } else {
      Alert.error(message);
    }
  };

  useEffect(() => {
    getBillData();
  }, []);

  let [totalList, setTotalList] = useState([]);

  useEffect(() => {
    setTotalList([
      { createTime: "2020-03-27 00:24", _id: Date.now() },
      ...goodsList,
    ]);
  }, [goodsList]);

  let getMoreData = async () => {
    await getBillData();
  };

  let onAction = (type, data, index) => {
    console.log(type, data, index);
    if (type === "delete") {
      Modal.comfirm({
        title: "操作提示",
        content: "你确定删除当前账单吗？",
        onSubmit: () => {
          deleteBill({
            id: data._id,
          }).then(({ code, message }) => {
            if (code === 1) {
              Alert.success("删除成功");

              setTotalList(totalList.filter((i, _index) => index !== _index));
            } else {
              Alert.error(message);
            }
          });
        },
      });
    } else if (type === "info") {
      history.push(`/billInfo/${data._id}`);
    }
  };

  return (
    <div>
      {totalList.map((i, index) => (
        <div key={i._id}>
          {i.type ? (
            <BillCardAction
              data={i}
              actions={(type) => onAction(type, i, index)}
            />
          ) : (
            <StatisticsCard data={i} />
          )}
        </div>
      ))}

      {hasMore && (
        <div>
          <Button type="text" onClick={getMoreData}>
            加载更多
          </Button>
        </div>
      )}
    </div>
  );
};

export default CardList;
