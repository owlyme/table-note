import React, { useState, useEffect } from "react";
import "./index.less";

import { modalHelper } from "../../../utils/util";
let modal = null;
const Select = ({
  show,
  selecteList = [],
  value,
  onChange = (f) => f,
  onHidden = (f) => f,
}) => {
  let [list, setList] = useState(selecteList);
  useEffect(() => {
    setList(
      value
        ? selecteList.filter((i) =>
            String(i.value)
              .toLocaleUpperCase()
              .includes(String(value).toLocaleUpperCase())
          )
        : selecteList
    );
  }, [selecteList, value]);

  useEffect(() => {
    if (show && !modal) {
      modal = modalHelper("modal_open");
      modal.afterOpen();
    } else if (!show && modal) {
      modal.beforeClose();
      modal = null;
    }
  }, [show]);

  const onClick = (value) => {
    onChange(value);
    onHidden(false);
  };

  return (
    <div
      className={
        "select-ui-container " +
        (show && list.length > 0 ? "visible" : "hidden")
      }
    >
      <ul className="select-ui">
        {list.map((i, index) => (
          <li
            className="selected-ui-item"
            key={i.value}
            value={i.value}
            onClick={() => onClick(i.value)}
          >
            {i.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Select;
