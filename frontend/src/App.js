import { Routes, Route, BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { UserProvider } from "./UserContext";

import { Login } from "./AccountPages/Login";

function App() {
	return (
		<UserProvider>
			<CookiesProvider>
				<BrowserRouter>
					<Routes>
						<Route path='/' element={<Login />}></Route>
						<Route path='/login' element={<Login />}></Route>
					</Routes>
				</BrowserRouter>
			</CookiesProvider>
		</UserProvider>
	);
}

export default App;
