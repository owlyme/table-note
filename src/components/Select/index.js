import React, { useState, useEffect } from "react";
import "./index.less";

const Select = (props) => {
  const { name, selecteList = [], value } = props;
  let [selectName, setSelectName] = useState("");

  useEffect(() => {
    setSelectName((selecteList.find((i) => i.value === value) || {}).title);
  }, [selecteList, value]);

  const onChange = (e, index) => {
    props.onChange(e.target.value);

    setSelectName(
      selecteList.filter((i) => i.value === e.target.value)[0].title
    );
  };

  return (
    <div className="select-default">
      <div className="selected-item">{selectName}</div>
      <select value={value} name={name} onChange={onChange}>
        {selecteList.map((i, index) => (
          <option key={index} value={i.value}>
            {i.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
