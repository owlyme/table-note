import { $get, $post } from "../utils/_axios";
import { sleep } from "../utils/util";
import localStorage from "../utils/localStorage";
import PATH from "./path";
const setGoodsListToStorage = (params) => {
  localStorage.setLocalStorage("goodList", (pre) => {
    if (!pre) {
      return [{ title: params.name, useCount: 0 }];
    } else if (pre.find((i) => i.title === params.name)) {
      return pre
        .map((i) => ({
          ...i,
          useCount: i.title === params.name ? i.useCount + 1 : i.useCount,
        }))
        .sort((a, b) => b.useCount - a.useCount);
    } else {
      return [{ title: params.name, useCount: 0 }, ...pre];
    }
  });
};

export async function register(params) {
  return $post(PATH.register, params, true);
}

export async function userLogin(params) {
  return $post(PATH.login, params, true);
}

export async function addSelledGoods(params) {
  return $post(PATH.addSelledGoods, params);
}

export async function getSelldGoodsList(params) {
  return $get(PATH.getSelldGoodsList, params);
}

// 进货是添加商品
export async function addBuyInGoods(params) {
  return $post(PATH.addBuyInGoods, params);
}
// 进货的商品列表
export async function getOrderList(params) {
  return $get(PATH.getOrderList, params);
}

export async function getTotalStatics(params) {
  return $get(PATH.getTotalStatics, params);
}

export async function getGoodsModel(params) {
  // return $get(PATH.getGoodsModel, params);
  return sleep().then((res) => {
    res = [
      { value: "SL", title: "SL" },
      { value: "ML", title: "ML" },
      { value: "L", title: "L" },
      { value: "LL", title: "LL" },
      { value: "XL", title: "XL" },
    ];
    return res;
  });
}

export async function saveGoodsName(param) {
  return $post(PATH.saveGoodsName, param);
}

export async function getGoodsNames(params) {
  return $get(PATH.getGoodsNames, params);
  // .then((res) => {
  //   if (res.code === 1) {
  //     localStorage.setLocalStorage("goodList", res.data || []);
  //     return res.data || [];
  //   } else {
  //     return [];
  //   }
  // });
}

export async function getGoodsNamesByLocalStorage(params) {
  let goodList = (localStorage.getLocalStorage("goodList") || []).map((i) => ({
    ...i,
    value: i.title,
  }));
  return sleep(100).then((res) => {
    res = goodList;
    return res;
  });
}

//
export async function saveSelledGoods(params) {
  // return $get(PATH.getGoodsModel, params);
  setGoodsListToStorage(params);
  return sleep().then((res) => {
    res = [];
    return res;
  });
}

export async function deleteBill(params) {
  return $post(PATH.deletebill, params);
}

export async function getUserConfig() {
  this.getGoodsNames();
}

// 获取账单详情
export async function getBillInfo(params) {
  return $get(PATH.getBillInfo, params);
}

export async function saveOrderName(params) {
  return $post(PATH.saveOrderName, params);
}

export async function updateGoodsName(params) {
  return $post(PATH.updateGoodsName, params);
}

export async function deleteGoodsName(params) {
  return $post(PATH.deleteGoodsName, params);
}

export async function getLast7DaysStatistics(params) {
  return $get(PATH.getLast7DaysStatistics, params);
}

export async function findInOneMonth(params) {
  return $get(PATH.findInOneMonth, params);
}

export async function getTotalStatistics(params) {
  return $get(PATH.getTotalStatistics, params);
}

export async function getDepot(params) {
  return $get(PATH.getDepot, params);
}
