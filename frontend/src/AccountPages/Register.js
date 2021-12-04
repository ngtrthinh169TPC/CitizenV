import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { UserContext } from "../UserContext";

export const Register = () => {
	const [form, setForm] = useState({
		username: "",
		password: "",
		confirmPassword: "",
	});
	const [token, setToken] = useCookies(["account-token"]);
	const { setUser } = useContext(UserContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (token["account-token"]) {
			navigate("/");
		}
	});

	const performRegister = () => {
		if (form.password === form.confirmPassword) {
			axios
				.post("/user/", form)
				.then((response) => {
					console.log(response.data);
					setToken("account-token", response.data.token);
					setUser(response.data.user_id);
					console.log(response.data);
				})
				.catch(function (error) {
					console.log(error.response);
				});
		} else {
			console.log(
				"Confirm Password is not right. You should recheck your password"
			);
		}
	};

	return (
		<div>
			<div>
				<h2>Register</h2>
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
					<input
						type='password'
						placeholder='Confirm Password'
						value={form.confirmPassword}
						onChange={(event) =>
							setForm({ ...form, confirmPassword: event.target.value })
						}></input>
				</div>
				<div>
					<button onClick={performRegister}>Register</button>
				</div>
				<div>
					<p>
						If you have an account, go to <Link to='/login'>Login</Link>.
					</p>
				</div>
			</div>
		</div>
	);
};
