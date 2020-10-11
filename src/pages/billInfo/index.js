import React, { useState, useEffect } from "react";

import "./index.less";

import { getBillInfo } from "../../api";

export default (props) => {
  let { match } = props;
  let id = match.params.id;

  console.log(props);
  let [info, setInfo] = useState({});
  useEffect(() => {
    getBillInfo({ ...match.params }).then((res) => {
      if (res.code) {
        setInfo(res.data);
      }
    });
  }, []);
  return (
    <section>
      {id}
      <div>{JSON.stringify(info, 2)}</div>
    </section>
  );
};
