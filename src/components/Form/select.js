import React from "react";

const Select = (props) => {
  const { label, name, selecteList, value } = props;

  const onChange = (e, index) => {
    props.onChange(e.target.value);
  };

  return (
    <div>
      <label>{label}</label>
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
