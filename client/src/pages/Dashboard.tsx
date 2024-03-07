import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { varifyUser } from "../utils/auth";

const Dashboard = () => {
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    varifyUser(navigate);
  }, [navigate]);

  return <h2>dashboard authorized</h2>;
};

export default Dashboard;
