import axios from "axios";
import { NavigateFunction } from "react-router-dom";

export const varifyUser = async (navigate: NavigateFunction) => {
  try {
    const response = await axios.get("http://localhost:3001/dashboard");

    if (response.data.valid) {
      navigate("/dashboard");
    }
  } catch (error) {
    console.log(error);
  }
};
