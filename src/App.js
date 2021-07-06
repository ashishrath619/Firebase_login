import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import ProtectedRoute from "./Components/Authentucation/ProtectedRoute";
export default function App() {
  return (
    <div>
      <Switch>
        <ProtectedRoute exact path="/" component={Dashboard} />
        <Route exact path="/SignUp" component={SignUp} />
        <Route exact path="/Login" component={Login} />
      </Switch>
    </div>
  );
}
