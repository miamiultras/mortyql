import { Route, Switch } from "react-router-dom";

import { App, Characters, Episodes, Locations, PageNotFound } from "./scenes";

export default (
  <App>
    <Switch>
      <Route exact path="/" component={Characters} />
      <Route path="/episodes" component={Episodes} />
      <Route path="/locations" component={Locations} />
      <Route path="*" component={PageNotFound} />
    </Switch>
  </App>
);
