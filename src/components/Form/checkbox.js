import React, { useState } from "react";

const CheckBox = props => {
  const { label, name, value, checkList } = props;
  let [list, setList] = useState(
    checkList.map(i => ({ value: i, checked: !!value.includes(i) }))
  );

  const onChange = (e, index) => {
    let newList = list.map((i, _index) => ({
      value: i.value,
      checked: _index !== index ? i.checked : !i.checked
    }));

    setList(newList);
    props.onChange(newList.filter(i => i.checked).map(i => i.value));
  };

  return (
    <div>
      <label>{label}</label>
      {list.map((i, index) => (
        <label key={index}>
          <input
            type="checkbox"
            name={name}
            value={i.value}
            checked={i.checked}
            onChange={e => onChange(e, index)}
          />
          {i.value}
        </label>
      ))}
    </div>
  );
};

export default CheckBox;
