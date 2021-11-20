import { Route } from "react-router";
import { authContext } from "./context/context-store";

import HomePage from "./components/HomePage";
import Layout from "./components/Layout";
import Login from "./components/Login";
import Logout from "./components/Logout";
import PrivatePage from "./components/PrivatePage";
import PublicPage from "./components/PublicPage";
import { useContext, useEffect } from "react";
import AuthRoute from "./hoc/AuthRoute";

function App() {
  const authStatus = useContext(authContext);

  useEffect(() => {
    if (global.localStorage.getItem("user-auth-status") === "true") {
      authStatus.login();
    }
  });

  return (
    <Layout>
      <Route path="/" exact component={HomePage} />
      <Route path="/public-page" exact component={PublicPage} />
      <AuthRoute path="/private-page" exact>
        <PrivatePage />
      </AuthRoute>
      <Route path="/login" exact component={Login} />
      <Route path="/logout" exact component={Logout} />
    </Layout>
  );
}

export default App;
