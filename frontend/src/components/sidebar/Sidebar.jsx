import React, { useContext } from "react";

import "./sidebar.css";

import logo from "../../assets/images/logo.png";

import sidebar_item from "../../assets/JsonData/sidebar_routes.json";
import { UserContext } from "../../UserContext";
import { Link } from "react-router-dom";

const SidebarItem = (props) => {
  const active = props.active ? "active" : "";

  return (
    <div className="sidebar__item">
      <div className={`sidebar__item-inner ${active}`}>
        <i className={props.icon}></i>
        <span>{props.title}</span>
      </div>
    </div>
  );
};

const Sidebar = (props) => {
  const activeItem = sidebar_item.findIndex(
    (item) => item.route === props.location.pathname
  );
  const { user } = useContext(UserContext);
  const permission = user.permission;

  const checkSidebar = (item) => {
    if (item.id.indexOf(permission) != -1) {
      if (
        item.display_name == "Báo cáo tiến độ" ||
        (item.display_name == "Quản lý tài khoản" && permission != "A1") ||
        item.display_name == "In phiếu khảo sát" ||
        item.display_name == "Nhập dữ liệu"
      ) {
        if (user.entry_permit) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    }
    return false;
  };
  return (
    <div className="sidebar">
      <div className="sidebar_logo">
        <img src={logo} alt="company logo" />
      </div>
      {sidebar_item.map((item, index) => {
        if (checkSidebar(item) == true) {
          return (
            <Link to={item.route} key={index}>
              <SidebarItem
                title={item.display_name}
                icon={item.icon}
                active={index === activeItem}
              />
            </Link>
          );
        }
      })}
    </div>
  );
};

export default Sidebar;
