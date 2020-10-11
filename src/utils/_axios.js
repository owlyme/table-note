import axios from "axios";
import Cookie from "./cookieJs";
import { sleep } from "./util";
import history from "./spaHistory";

const Instance = axios.create({
  baseURL: "/api",
  timeout: 2000,
});

Instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    // console.log(config);
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

Instance.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    let { data } = response;
    return data;
  },
  function (error) {
    // 对响应错误做点什么
    return error;
  }
);

function beforeRequest(unauth) {
  let uid = Cookie.get("userId");
  if (unauth || uid) {
    return true;
  } else {
    history.push("/login");
    return false;
  }
}

export const $get = function (api, params = {}, unauth) {
  if (beforeRequest(unauth)) {
    return Instance.get(api, {
      params: {
        ...params,
      },
    });
  } else {
    return sleep({ code: 120 });
  }
};

export const $post = function (api, params = {}, unauth) {
  if (beforeRequest(unauth)) {
    return Instance.post(api, params);
  } else {
    return sleep({ code: 120 });
  }
};

export default {
  $get,
  $post,
};
