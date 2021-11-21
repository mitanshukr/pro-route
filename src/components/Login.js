import { useContext, useEffect, useRef, useState } from "react";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import { authContext } from "../context/context-store";

const Login = () => {
  const history = useHistory();
  const location = useLocation();
  const authStatus = useContext(authContext);
  const [isBtnClicked, setBtnStatus] = useState(false);
  // Here, we can trace the previous location from  the **location?.state?.from**
  let from = useRef(location?.state?.from || { pathname: "/" });

  useEffect(() => {
    if (location?.state?.isLogout) {
      // If TRUE, then this means the Logout prevLocation
      // was a Protected Page, resulting to land in <AuthRoute/>;
      // which anyway redirects to Login Page if the user is not logged-In;
      // but with extra **isLogout:true** Flag.
      // We use this flag to track and navigate the user
      // to Homepage in such scenario.
      history.replace("/");
    }
  });

  let timer = null;
  const loginSubmitHandler = () => {
    if (isBtnClicked) return;
    setBtnStatus(true);
    timer = setTimeout(() => {
      authStatus.login();
      history.replace(from.current);
    }, 3000);
  };

  useEffect(() => {
    return () => {
      setBtnStatus(false);
      clearTimeout(timer);
    };
  }, [timer]);

  return (
    <>
      {authStatus.isAuth ? (
        <Redirect to={from.current} />
      ) : (
        <div className="page">
          <h2>Login Page</h2>
          {location?.state?.isAuthRoute ? (
            <p>Please login to Continue...</p>
          ) : (
            <p>Click the below button to Login...</p>
          )}
          <button
            onClick={loginSubmitHandler}
            disabled={authStatus.isAuth || isBtnClicked}
          >
            {authStatus.isAuth
              ? "Already Logged In"
              : isBtnClicked
              ? "Logging In..wait"
              : "Click Me to Login"}
          </button>
        </div>
      )}
    </>
  );
};

export default Login;
