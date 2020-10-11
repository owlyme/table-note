import React, { useState } from "react";

const Radio = (props) => {
  const { name, radioList, value } = props;
  let [list, setList] = useState(
    radioList.map((i) => ({ value: i, checked: i === value }))
  );
  const onChange = (e, index) => {
    let newList = radioList.map((i, _index) => ({
      value: i,
      checked: _index === index,
    }));
    setList(newList);
    if (props.onChange) {
      props.onChange(newList.filter((i) => i.checked)[0].value);
    }
  };

  return (
    <div>
      {list.map((i, index) => (
        <label key={index}>
          <RadioStyle checked={i.checked}></RadioStyle>
          <input
            type="radio"
            name={name}
            value={i.value}
            checked={i.checked}
            onChange={(e) => onChange(e, index)}
          />
          {i.value}
        </label>
      ))}
    </div>
  );
};

export default Radio;
