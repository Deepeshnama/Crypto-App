import axios from "axios";

// const API_URL = "/api/user";

// Register Service

const register = async (formData) => {
  const response = await axios.post("https://authentication-2-qgze.onrender.com/api/user/register", formData);
  localStorage.setItem("user", JSON.stringify(response.data));
  return response.data;
};


// Login Service

const login = async (formData) => {
  const response = await axios.post("https://authentication-2-qgze.onrender.com/api/user/login" , formData)
  localStorage.setItem("user", JSON.stringify(response.data));
  return response.data;
}

const authService = {
  register,
  login ,
};

export default authService;
