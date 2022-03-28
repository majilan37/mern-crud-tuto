import axios from "axios";
import { UserData } from "../../types";

const API_URL = "/api/users";

async function register(userData: UserData) {
  const response = await axios.post(`${API_URL}/register`, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
}

async function login(userData: Pick<UserData, "email" | "password">) {
  const response = await axios.post(`${API_URL}/login`, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
}

async function logout() {
  await localStorage.removeItem("user");
}

export const authService = {
  register,
  logout,
  login,
};
