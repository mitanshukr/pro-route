import { useContext, useEffect, useRef, useState } from "react";
import { Redirect, useHistory, useLocation } from "react-router";
import { authContext } from "../context/context-store";

const Login = () => {
  const history = useHistory();
  const location = useLocation();
  const authStatus = useContext(authContext);
  const [isBtnClicked, setBtnStatus] = useState(false);
  let from = useRef(location?.state?.from || { pathname: "/" });

  useEffect(() => {
    console.log(history.location);
    console.log(location);
    if (location?.state?.isLogout) {
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
    }, 5000);
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
