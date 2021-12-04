import { Routes, Route, BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { UserProvider } from "./UserContext";

import { Login } from "./AccountPages/Login";
import { Register } from "./AccountPages/Register";

function App() {
	return (
		<UserProvider>
			<CookiesProvider>
				<BrowserRouter>
					<Routes>
						<Route path='/' element={<Login />}></Route>
						<Route path='/login' element={<Login />}></Route>
						<Route path='/register' element={<Register />}></Route>
					</Routes>
				</BrowserRouter>
			</CookiesProvider>
		</UserProvider>
	);
}

export default App;
