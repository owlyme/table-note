import React, { useState } from "react";
import "./index.less";

import Cell from "../../components/Cell";
import XForm from "../../components/Form/form";
import XInput from "../../components/Input";
import Alert from "../../components/Alert";
import Button from "../../components/Button";

import { register, userLogin } from "../../api";
import Cookie from "../../utils/cookieJs";

let initFormData = {
  name: "",
  password: "",
};

const Form = ({ history }) => {
  let [formData, setFormData] = useState(initFormData);

  const onChange = (type, value) => setFormData({ ...formData, [type]: value });

  const login = () => {
    userLogin(formData).then((res) => {
      if (res.code === 1) {
        Alert.success(res.message || "登录成功");
        // Cookie.set("userId", res.data.userId);
        history.push("/");
      } else {
        Alert.error("登录失败");
      }
    });
  };

  const registerAccount = () => {
    register(formData).then((res) => {
      if (res.code === 1) {
        Alert.success(res.message || "注册成功");
        Cookie.set("userId", res.data.userId);
        history.push("/");
      } else {
        Alert.warnning(res.message || "注册失败");
      }
    });
  };

  return (
    <div className="form-container">
      <XForm>
        <Cell title="名称">
          <XInput
            placeholder="请输入用户名"
            value={formData.name}
            name="name"
            onChange={(val) => onChange("name", val)}
          ></XInput>
        </Cell>

        <Cell title="密码">
          <XInput
            placeholder="请输入密码"
            value={formData.password}
            name="password"
            type="password"
            onChange={(val) => onChange("password", val)}
          ></XInput>
        </Cell>
      </XForm>

      <div className="btns">
        <div className="forgot-pw">忘记密码</div>
        <Button onClick={login}>登录</Button>

        <Button type="text" onClick={registerAccount}>
          注册
        </Button>
      </div>
    </div>
  );
};

export default (props) => {
  console.log(props);
  // this.props.history.push('/pathname')

  return (
    <div className="login-form">
      <Form history={props.history}></Form>
    </div>
  );
};
