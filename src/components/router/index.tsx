// Represents Application router
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginScreen from "../../pages/login/index";
import ProtectedRoute from "./protectedroute";
import PageNotFound from "../pagenotfound";
import Feeds from "../../pages/feed/index";

function Navigation() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LoginScreen} />
        <ProtectedRoute exact path="/feeds" component={Feeds} />
        <Route component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default Navigation;
