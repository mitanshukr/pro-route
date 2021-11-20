import { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { authContext } from "../context/context-store";

const AuthRoute = (props) => {
  const authStatus = useContext(authContext);
  const { children, ...rest } = props;

  return (
    <Route
      {...rest}
      render={({ location }) =>
        authStatus.isAuth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: {
                from: location,
                isAuthRoute: true,
                isLogout: location?.state?.isLogout,
              },
            }}
          />
        )
      }
    />
  );
};

export default AuthRoute;
