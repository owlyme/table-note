import React, { useState } from "react";
import "./index.less";
const RadioStyle = ({ checked, disabled }) => {
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

const Radio = (props) => {
  const { name, radioList, value } = props;
  let [list, setList] = useState(
    radioList.map((i) => ({ ...i, checked: i.value === value }))
  );
  const onChange = (e, index) => {
    let newList = radioList.map((i, _index) => ({
      ...i,
      checked: _index === index,
    }));
    setList(newList);
    if (props.onChange) {
      props.onChange(newList.filter((i) => i.checked)[0].value);
    }
  };

  return (
    <div class="radio-list">
      {list.map((i, index) => (
        <label key={index}>
          <RadioStyle checked={i.checked} disabled={i.disabled}></RadioStyle>
          <input
            type="radio"
            name={name}
            value={i.value}
            checked={i.checked}
            onChange={(e) => onChange(e, index)}
            disabled={i.disabled ? "disabled" : ""}
          />
          {i.title}
        </label>
      ))}
    </div>
  );
};

// <XRadio
//           name="radio"
//           value={formData.radio}
//           radioList={[
//             { value: 1, title: "radio-a" },
//             { value: 2, title: "radio-b" },
//             { value: 3, title: "radio-c" },
//           ]}
//           onChange={(val) => onChange("radio", val)}
//         ></XRadio>

export default Radio;
