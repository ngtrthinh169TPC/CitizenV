import React from "react";
import Sidebar from "./sidebar/Sidebar";
import Topnav from "./topnav/Topnav";
import { Route, Switch } from "react-router";
import RouteWithSubRoutes from "./RouteWithSubRoutes";

import "../styles/apppage.css";

function AppPage({ routes }) {
  return (
    <Route
      render={(props) => (
        <div className="layout">
          <Sidebar {...props} />
          <div className="layout__content">
            <Topnav />
            <div className="layout__content-main">
              <Switch>
                {routes.map((route, i) => (
                  <RouteWithSubRoutes key={i} {...route} />
                ))}
              </Switch>
            </div>
          </div>
        </div>
      )}
    />
  );
}

export default AppPage;
