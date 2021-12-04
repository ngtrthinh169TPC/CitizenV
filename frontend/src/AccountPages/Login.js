import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
// Import contexts
import { UserContext } from "../UserContext";

export const Login = () => {
	const [form, setForm] = useState({
		username: "",
		password: "",
	});
	const [token, setToken] = useCookies(["account-token"]);
	const { setUser } = useContext(UserContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (token["account-token"]) {
			navigate("/");
		}
	}, [token, navigate]);

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
		axios
			.post("/api-token-auth/", form)
			.then((response) => {
				setToken("account-token", response.data.token);
				setUser(response.data.user_id);
				console.log(response.data);
			})
			.catch(function (error) {
				console.log(error.response);
			});
	};

	return (
		<div>
			<div>
				<h2>Login</h2>
				<div>
					<label>Username</label>
					<input
						type='text'
						placeholder='Username'
						value={form.username}
						onChange={(event) =>
							setForm({ ...form, username: event.target.value })
						}></input>
				</div>
				<div>
					<label>Password</label>
					<input
						type='password'
						placeholder='Password'
						value={form.password}
						onChange={(event) =>
							setForm({ ...form, password: event.target.value })
						}></input>
				</div>
				<div>
					<button onClick={performLogin}>Login</button>
				</div>
				<div>
					<p>
						If you don't have an account, go to{" "}
						<Link to='/register'>Register</Link>.
					</p>
				</div>
			</div>
		</div>
	);
};
