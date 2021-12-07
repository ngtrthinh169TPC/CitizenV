import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";

function Home() {
  const [token, setToken] = useCookies(["account-token"]);
  //   const { setUser } = useContext(UserContext);
  const history = useHistory();
  useEffect(() => {
    if (!token["account-token"]) {
      history.push("/");
    }
  }, [token, history]);
  return <div>Đây là màn hình Home :v</div>;
}

export default Home;
