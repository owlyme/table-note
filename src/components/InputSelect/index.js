import React, { useState } from "react";

import XInput from "../Input";
import SelectUI from "../Select/SelectUI";

const IS = (props) => {
  const {
    value,
    selecteList = [],
    onChange = (f) => f,
    onFocus = (f) => f,
    onBlur = (f) => f,
    ...other
  } = props;

  let [showSelectedUI, setShowSelectedUI] = useState(false);

  const _onFocus = (bool) => {
    setShowSelectedUI(bool);
    onFocus();
  };

  const _onBlur = () => {
    setTimeout(() => {
      _onFocus(false);
      onBlur();
    }, 50);
  };

  return (
    <div>
      <XInput
        {...other}
        value={value}
        onChange={(val) => onChange(val)}
        onFocus={() => _onFocus(true)}
        onBlur={_onBlur}
      ></XInput>
      <SelectUI
        value={value}
        show={showSelectedUI}
        selecteList={selecteList}
        onChange={(val) => onChange(val)}
        onHidden={() => setShowSelectedUI(false)}
      ></SelectUI>
    </div>
  );
};

export default IS;
