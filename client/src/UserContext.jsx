import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext({});

// eslint-disable-next-line react/prop-types
export function UserContextProvider({ children }) {
  const [userinfo, setuserinfo] = useState(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!userinfo) {
      axios
        .get("/profile", {
          withCredentials: true,
        })
        .then(({ data }) => {
          setuserinfo(data);
          setReady(true);
        });
    }
  }, []);
  return (
    <UserContext.Provider value={{userinfo,setuserinfo,ready}}>
      {children}
    </UserContext.Provider>
  );
}
