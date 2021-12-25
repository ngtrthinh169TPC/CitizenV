import axios from "axios";
import { createContext, useState, useCallback, useEffect } from "react";
import { useCookies } from "react-cookie";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [token] = useCookies(["account-token"]);

  // Utilities
  const getConfigs = useCallback(() => {
    return {
      headers: {
        authorization: `Token ${token["account-token"]}`,
      },
    };
  }, [token]);

  useEffect(() => {
    if (token["account-token"]) {
      axios
        .get("/whoami/", getConfigs())
        .then((response) => {
          console.log("response", response.data[0]);
          setUser(response.data[0]);
        })
        .catch(function (error) {
          console.log(error.response);
        });
    } else {
      setUser({});
    }
  }, [token, getConfigs]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
