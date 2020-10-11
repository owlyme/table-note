import React from "react";
import MountComponent from "../../utils/mountComponent";
import Button from "../Button";

import "./index.less";
let zIndex = 50;
let body = document.body;
const limitBody = (bool = true) => {
  if (bool) {
    limitBody.__className = body.className;
    body.className = limitBody.__className + " limit-body";
  } else {
    body.className = limitBody.__className;
  }
};

const Modal = ({
  title,
  content,
  onClose = (f) => f,
  onSubmit = (f) => f,
  type = "confirm",
  children,
  visible,
  destory = (f) => f,
  mask = true,
  onText = "确认",
  cancelText = "取消",
  customClass = "",
}) => {
  if (visible) {
    limitBody();
  }

  const close = () => {
    onClose(false);
    limitBody(false);
    // 注销
    destory();
  };
  const submit = () => {
    onSubmit(true);
    // 注销
    destory();
  };

  return (
    <>
      {mask && (
        <div
          onClick={close}
          className={`modal-mask modal-mask-${visible ? "visible" : "hidden"}`}
          style={{
            zIndex: zIndex++,
          }}
        ></div>
      )}

      <div
        className={`modal-container ${customClass} modal-container-${
          visible ? "visible" : "hidden"
        }`}
        style={{
          zIndex: zIndex++,
        }}
      >
        <div className="modal-title">{title}</div>
        <div className="modal-content">{children ? children : content}</div>
        <div className="modal-btns">
          <Button type="info" onClick={submit}>
            {onText}
          </Button>
          <Button type="warnning" onClick={close}>
            {cancelText}
          </Button>
        </div>
      </div>
    </>
  );
};

const modal = new MountComponent({
  component: Modal,
  conatinerTag: "DIV",
  containerClassName: "xModal-container",
});

const createProps = (props = {}, type = "info") => {
  let formatedProps = {
    title: "操作提示",
    content: "你确定执行此项操作？",
    onSubmit: (f) => f,
    onClose: (f) => f,
    type: "confirm",
    visible: true,
    mask: true,
  };
  if (typeof props !== "object") {
    console.error("请传入适当的参数");
  } else {
    formatedProps = {
      ...formatedProps,
      ...props,
    };
  }

  formatedProps.type = type;

  return formatedProps;
};

Modal.comfirm = (props) => {
  modal.mounted(createProps(props, "comfirm"));
};

Modal.alert = (props) => {
  modal.mounted(createProps(props, "info"));
};

Modal.poptip = (props) => {
  modal.mounted(createProps(props, "warnning"));
};

export default Modal;
