import React from "react";
import {
  Switch,
  Route
} from "react-router-dom";

import Index from "./index";
import Create from "./create";
import Detail from "./detail";

function WH({history, location, match}) {

  let { path, url } = match;
  console.log( path, url)
  return (
    <div>
      <Switch>
        <Route path={`${path}`} exact component={Index}></Route>
        <Route path={`${path}/create`} component={Create}></Route>
        <Route path={`${path}/detail`} component={Detail}></Route>
      </Switch>
    </div>
  );
}

export default WH;