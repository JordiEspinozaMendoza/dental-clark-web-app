import { HashRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./views/HomeScreen";
import LoginScreen from "./views/LoginScreen";
import RegisterScreen from "./views/RegisterScreen";
import ListUsersScreen from "./views/ListUsersScreen";
import EditUserScreen from "./views/EditUserScreen";
import ProfileScreen from "./views/ProfileScreen";
import DashboardScreen from "./views/DashboardScreen";
import ServicesScreen from "./views/ServicesScreen";
import EditServiceScreen from "./views/EditServiceScreen";
import AllServicesScreen from "./views/AllServicesScreen";
function App() {
  return (
    <Router>
      <Header />
      <Route path="/" component={HomeScreen} exact></Route>
      <Route path="/treatments" component={AllServicesScreen} exact></Route>
      <Route path="/login" component={LoginScreen} exact></Route>
      <Route path="/admin/register" component={RegisterScreen} exact></Route>
      <Route path="/admin/userlist" component={ListUsersScreen} exact></Route>
      <Route path="/profile" component={ProfileScreen} exact></Route>
      <Route path="/dashboard" component={DashboardScreen} exact></Route>
      <Route
        path="/admin/user/:id/edit"
        component={EditUserScreen}
        exact
      ></Route>

      <Route path="/services" component={ServicesScreen} exact></Route>
      <Route
        path="/services/:id/edit"
        component={EditServiceScreen}
        exact
      ></Route>

      <Footer />
    </Router>
  );
}

export default App;
