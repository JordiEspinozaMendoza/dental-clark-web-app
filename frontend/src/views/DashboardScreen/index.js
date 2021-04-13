import { useEffect } from "react";
import { useSelector } from "react-redux";

import Dashboard from "../../components/Dashboard";

export default function DashboardScreen({ history }) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    !userInfo && history.push("/");
  }, [userInfo, history]);
  return <Dashboard></Dashboard>;
}
