import { useContext } from "react";
import { AuthContext } from "./AuthProvider";

import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...restProps }) => {
  const { user } = useContext(AuthContext);
  return (
    <Route
      {...restProps}
      render={(...props) => {
        return user ? <Component {...props} /> : <Redirect to="./Login" />;
      }}
    />
  );
};

export default ProtectedRoute;
