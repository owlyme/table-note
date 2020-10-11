import React from "react";

// require("./iconfont.js"); //将下载文件中的iconfont.js引入

export default function Icon(props) {
  return (
    <svg className="icon" aria-hidden="true">
      <use xlinkHref={`#${props.type}`} />
    </svg>
  );
}
