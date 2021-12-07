import React from "react";
import Sidebar from "./Sidebar";
import { Routes, Switch } from "react-router";
import RouteWithSubRoutes from "./RouteWithSubRoutes";

function AppPage({ routes }) {
  return (
    <div>
      <Sidebar />
      <Switch>
        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </Switch>
    </div>
  );
}

export default AppPage;
