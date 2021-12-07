import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
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

  useEffect(() => {
    if (token["account-token"]) {
      history.push("/");
    }
  }, [token, history]);

  // useEffect(() => {
  // 	window.addEventListener("keypress", handleKeyDown);
  // 	return () => {
  // 		window.removeEventListener("keypress", handleKeyDown);
  // 	};
  // });

  // const handleKeyDown = (event) => {
  // 	// if ENTER pressed
  // 	if (event.keyCode === 13) {
  // 		if (form.username !== "" && form.password !== "") {
  // 			performLogin();
  // 		}
  // 	}
  // };

  const performLogin = () => {
    console.log("form", form);
    axios
      .post("/api-token-auth/", form)
      .then((response) => {
        setToken("account-token", response.data.token);
        setUser(response.data.user_id);
        console.log(response.data);
        history.push("/");
      })
      .catch(function (error) {
        console.log(error.response);
      });
  };

  return (
    // <div>
    // 	<div>
    // 		<h2>Login</h2>
    // 		<div>
    // 			<label>Username</label>
    // 			<input
    // 				type='text'
    // 				placeholder='Username'
    // 				value={form.username}
    // 				onChange={(event) =>
    // 					setForm({ ...form, username: event.target.value })
    // 				}></input>
    // 		</div>
    // 		<div>
    // 			<label>Password</label>
    // 			<input
    // 				type='password'
    // 				placeholder='Password'
    // 				value={form.password}
    // 				onChange={(event) =>
    // 					setForm({ ...form, password: event.target.value })
    // 				}></input>
    // 		</div>
    // 		<div>
    // 			<button onClick={performLogin}>Login</button>
    // 		</div>
    // 		<div>
    // 			<p>If you don't have an account, ask your boss lol</p>
    // 		</div>
    // 	</div>
    // </div>
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

          <button id="login-btn" onClick={performLogin}>
            Đăng nhập
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
