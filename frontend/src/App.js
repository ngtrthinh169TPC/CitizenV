import { BrowserRouter as Router, Switch } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { UserProvider } from "./UserContext";

import { Login } from "./AccountPages/Login";
import AppPage from "./components/AppPage";
import RouteWithSubRoutes from "./components/RouteWithSubRoutes";
import Home from "./Home/Home";
import Error from "./AnotherPages/Error";
import ManagePage from "./managepage/ManagePage";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const routes = [
    {
      path: "/Login",
      exact: true,
      component: Login,
    },
    {
      path: "/",
      component: AppPage,
      routes: [
        {
          path: "/",
          exact: true,
          component: Home,
        },
        {
          path: "/accounts",
          exact: true,
          component: ManagePage,
        },
        {
          path: "/:somestring",
          component: Error,
        },
      ],
    },
  ];

  return (
    <UserProvider>
      <CookiesProvider>
        <Router>
          <Switch>
            {/* <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route> */}
            {routes.map((route, i) => (
              <RouteWithSubRoutes key={i} {...route} />
            ))}
          </Switch>
        </Router>
      </CookiesProvider>
    </UserProvider>
  );
}

export default App;
