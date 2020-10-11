import React, { useState, useEffect, useCallback } from "react";
import MountComponent from "../../utils/mountComponent";
import "./index.less";

let msgList = [];

const Alert = (props) => {
  let [message, setMessage] = useState([]);

  useEffect(() => {
    msgList = [{ ...props, id: Date.now() }, ...msgList];
    setMessage(msgList);

    let timer = setTimeout(() => {
      close(msgList.length - 1);
    }, props.duration);

    return () => {
      console.log("alert unmounted");
      // clearTimeout(timer);
    };
  }, [close, props]);

  const close = useCallback((index) => {
    if (msgList.length > 1) {
      msgList = [...msgList.filter((i, idx) => idx !== index)];
      setMessage(msgList);
    } else {
      msgList = [];
      setMessage([]);
      // 注销
      props.destory && props.destory();
    }
  });

  return (
    <ul>
      {message.map((i, index) => (
        <li
          onClick={() => close(index)}
          key={i.id}
          className={`xalert-default ${i.customClass} xalert-${
            i.type || "info"
          }`}
        >
          <span>{i.content}</span>
        </li>
      ))}
    </ul>
  );
};

const alert = new MountComponent({
  component: Alert,
  conatinerTag: "DIV",
  containerClassName: "xalert-container",
});

const createMessageBody = (props, type = "info") => {
  let formatedProps = {
    content: null,
    duration: 2000,
    type,
  };
  if (typeof props !== "object") {
    formatedProps.content = props;
  } else {
    formatedProps = {
      ...formatedProps,
      ...props,
    };
  }

  return formatedProps;
};

Alert.info = (props) => {
  alert.mounted(createMessageBody(props, "info"));
};

Alert.success = (props) => {
  alert.mounted(createMessageBody(props, "success"));
};

Alert.warnning = (props) => {
  alert.mounted(createMessageBody(props, "warnning"));
};

Alert.error = (props) => {
  alert.mounted(createMessageBody(props, "error"));
};

export default Alert;
