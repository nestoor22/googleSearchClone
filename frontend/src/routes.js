import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { SearchPage, IndexPage } from 'pages';

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/index" component={IndexPage} />
        <Route exact path="/search" component={SearchPage} />
      </Switch>
    </Router>
  );
}

export default Routes;