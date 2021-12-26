import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Spinner, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
// Import contexts
import { UserContext } from "../UserContext";
import "../styles/Login.scss";

export const Login = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [token, setToken] = useCookies(["account-token"]);
  const { setUser } = useContext(UserContext);
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (token["account-token"]) {
      history.push("/");
    }
  }, [token, history]);

  const performLogin = async () => {
    setLoading(true);
    setError("");
    let data = {
      username: form.username,
      password: form.password,
    };
    try {
      let response = await fetch(
        "https://citizenv-backend-03.herokuapp.com/api-token-auth/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      let resJson = await response.json();
      if (response.status == 200) {
        setToken("account-token", resJson.token);
        let user = {
          account_id: resJson.account_id,
          permission: resJson.permission,
          name_of_unit: resJson.name_of_unit,
          classification: resJson.classification,
          entry_permit: resJson.entry_permit,
          progress: resJson.progress,
        };
        setUser(user);
        history.push("/");
      } else {
        setError("Thông tin tài khoản hoặc mật khẩu không chính xác!");
      }
      console.log(resJson);
    } catch (error) {
      console.log("abcd");
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div id="login-container">
      <div id="login">
        <div id="title">
          <h2>Đăng nhập</h2>
        </div>
        <div id="content">
          <label className="lable">Tài khoản:</label>
          <input
            placeholder="Vui lòng nhập tài khoản"
            type="text"
            value={form.username}
            className="input"
            onChange={(event) =>
              setForm({ ...form, username: event.target.value })
            }
          />
          <label className="lable">Mật khẩu:</label>
          <input
            placeholder="Vui lòng nhập mật khẩu"
            type="password"
            value={form.password}
            className="input"
            onChange={(event) =>
              setForm({ ...form, password: event.target.value })
            }
          />
          {error ? <h5>{error}</h5> : null}
          <button id="login-btn" onClick={performLogin}>
            Đăng nhập
            {loading ? <Spinner animation="border" /> : null}
          </button>
        </div>
        <div id="footer">
          <p>
            Tài khoản được cấp bởi Tổng cục Dân số và các cơ quan có thẩm quyền
          </p>
        </div>
      </div>
    </div>
  );
};
