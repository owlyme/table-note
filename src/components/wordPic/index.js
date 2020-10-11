import React from "react";
import "./index.less";

// type: input output
const WordPic = ({ word }) => {
  return (
    <div className="word-pic">{(word || "C").replace(/^(.)(.*)$/, "$1")}</div>
  );
};

export default WordPic;
