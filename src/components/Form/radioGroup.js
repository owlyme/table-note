import React, { useState, Component } from "react";
import PropTypes from "prop-types";

export const Radio = (props, { parent, value }) => {
  let [checked, setChecked] = useState(false);
  const _onChange = (e) => {
    let value = e.target.value;

    if (parent) {
      parent.onChange(value);
    } else {
      setChecked(!checked);
    }

    if (props.onChange) {
      props.onChange(value);
    }
  };

  return (
    <label>
      <input
        type="radio"
        checked={parent ? props.value == value : checked}
        value={props.value}
        onChange={_onChange}
      ></input>
      {props.children}
    </label>
  );
};

Radio.contextTypes = {
  parent: PropTypes.object,
  value: PropTypes.any,
};

export class RadioGroup extends Component {
  constructor(props) {
    super(props);
  }

  // 声明Context对象属性
  static childContextTypes = {
    parent: PropTypes.object,
    value: PropTypes.any,
  };

  // 返回Context对象，方法名是约定好的
  getChildContext() {
    return {
      parent: this,
      value: this.props.value,
    };
  }

  componentDidMount() {
    console.log(this.props.children);
  }

  onChange = (val) => {
    console.log(val);
    this.props.onChange(val);
  };

  render() {
    return <div>{this.props.children}</div>;
  }
}
