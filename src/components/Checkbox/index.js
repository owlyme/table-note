import React, { useState } from "react";
import "./index.less";

const CheckboxStyle = ({ checked, disabled }) => {
  // checked unchecked disable
  let className = () => {
    let className = "shape-round ";
    if (disabled) {
      className = "shape-round disabled ";
    }
    return className + (checked ? "checked" : "unchecked");
  };
  return (
    <div className={className()}>
      <div className="shape-round-point"></div>
    </div>
  );
};

const CheckBox = (props) => {
  const { name, value, checkList } = props;
  let [list, setList] = useState(
    checkList.map((i) => ({ ...i, checked: !!value.includes(i.value) }))
  );

  const onChange = (e, index) => {
    let newList = list.map((i, _index) => ({
      ...i,
      checked: _index !== index ? i.checked : !i.checked,
    }));

    setList(newList);
    props.onChange(newList.filter((i) => i.checked).map((i) => i.value));
  };

  return (
    <div className="checkbox-list">
      {list.map((i, index) => (
        <label key={index}>
          <CheckboxStyle
            checked={i.checked}
            disabled={i.disabled}
          ></CheckboxStyle>
          <input
            type="checkbox"
            name={name}
            value={i.value}
            checked={i.checked}
            onChange={(e) => onChange(e, index)}
            checked={i.checked}
            disabled={i.disabled}
          />
          {i.title}
        </label>
      ))}
    </div>
  );
};
/* <XCheckBox
  name="check"
  value={formData.check}
  checkList={[
    { value: 1, title: "check-a" },
    { value: 2, title: "check-b" },
    { value: 3, title: "check-c" },
  ]}
  onChange={(val) => onChange("check", val)}
></XCheckBox>; */

export default CheckBox;
