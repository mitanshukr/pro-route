import { createContext, useState } from "react";

const authContext = createContext({
  //optional: default value
  isAuth: false,
  login: () => {},
  logout: () => {},
});

const ContextProvider = (props) => {
  const [isAuth, setAuth] = useState(false);

  const loginHandler = () => {
    setAuth(true);
    global.localStorage.setItem("user-auth-status", true);
  };

  const logoutHandler = () => {
    setAuth(false);
    global.localStorage.setItem("user-auth-status", false);
  };

  const contextValue = {
    isAuth: isAuth,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <authContext.Provider value={contextValue}>
      {props.children}
    </authContext.Provider>
  );
};

export { authContext, ContextProvider };
