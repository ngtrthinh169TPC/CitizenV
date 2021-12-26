import React, { useContext, useEffect, useState } from "react";

import "./topnav.css";

import { Link } from "react-router-dom";

import Dropdown from "../dropdown/Dropdown";

// import ThemeMenu from "../thememenu/ThemeMenu";

import notifications from "../../assets/JsonData/notification.json";

import user_menu from "../../assets/JsonData/user_menus.json";

import { UserContext } from "../../UserContext";

import { useCookies } from "react-cookie";

const renderNotificationItem = (item, index) => (
  <div className="notification-item" key={index}>
    <i className={item.icon}></i>
    <span>{item.content}</span>
  </div>
);

const renderUserToggle = (user) => (
  <div className="topnav__right-user">
    <div className="topnav__right-user__image">
      <i className="bx bx-user-circle"></i>
    </div>
    <div className="topnav__right-user__name">{user}</div>
  </div>
);

// const Logout = () => {
//   console.log("Logout");
// };

const renderUserMenu = (item, index, logoutFunction) => (
  <Link to={item.path} key={index} onClick={logoutFunction}>
    <div className="notification-item">
      <i className={item.icon}></i>
      <span>{item.content}</span>
    </div>
  </Link>
);

const Topnav = () => {
  const { user } = useContext(UserContext);
  const [token, setToken, removeToken] = useCookies(["account-token"]);
  const { setUser } = useContext(UserContext);

  const logOut = () => {
    removeToken("account-token");
    setUser(0);
  };

  const [infoUser, setInfoUser] = useState("");

  useEffect(() => {
    console.log(user, "adminv123");
    let info = user.classification + " " + user.name_of_unit;
    setInfoUser(info);
  });

  return (
    <div className="topnav">
      <div className="topnav__search">
        <input type="text" placeholder="Search here..." />
        <i className="bx bx-search"></i>
      </div>
      <div className="topnav__right">
        <div className="topnav__right-item">
          {/* dropdown here */}
          <Dropdown
            customToggle={() => renderUserToggle(infoUser)}
            contentData={user_menu}
            renderItems={(item, index) => renderUserMenu(item, index, logOut)}
          />
        </div>
        {/* <div className="topnav__right-item">
          <Dropdown
            icon="bx bx-bell"
            badge="12"
            contentData={notifications}
            renderItems={(item, index) => renderNotificationItem(item, index)}
            renderFooter={() => <Link to="/">View All</Link>}
          /> */}
        {/* dropdown here */}
        {/* </div> */}
        {/* <div className="topnav__right-item">
          <ThemeMenu />
        </div> */}
      </div>
    </div>
  );
};

export default Topnav;
