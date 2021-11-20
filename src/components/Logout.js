import { useContext, useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import { authContext } from "../context/context-store";

const Logout = () => {
  const history = useHistory();
  const location = useLocation();
  const authStatus = useContext(authContext);

  useEffect(() => {
    setTimeout(() => {
      let prevLocation = null;
      if (location?.state?.from) {
        prevLocation = {
          ...location?.state?.from,
          state: { isLogout: true },
        };
      }
      history.replace(prevLocation || "/");
    }, 1000);
    return () => {
      authStatus.logout();
    };
  }, [authStatus, history, location]);

  return (
    <div className="page">
      <p>Logging you out...please wait!</p>
    </div>
  );
};

export default Logout;
