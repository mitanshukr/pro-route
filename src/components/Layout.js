import { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { authContext } from "../context/context-store";
import "./Layout.css";
import "./style.css";

const Layout = (props) => {
  const authStatus = useContext(authContext);
  const location = useLocation();

  return (
    <div className="Layout">
      <header className="Layout-header">
        <h1>Logo</h1>
        <nav>
          <ul>
            <li>
              <NavLink to="/" exact>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/public-page">Public Page</NavLink>
            </li>
            {authStatus.isAuth ? (
              <>
                <li>
                  <NavLink to="/private-page">Private Page</NavLink>
                </li>
                <li>
                  <NavLink
                    to={{
                      pathname: "/logout",
                      state: { from: location },
                    }}
                  >
                    Logout
                  </NavLink>
                </li>
              </>
            ) : (
              <li>
                <NavLink
                  to={{
                    pathname: "/login",
                    state: { from: location },
                  }}
                >
                  Login
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
      </header>
      {props.children}
    </div>
  );
};

export default Layout;
