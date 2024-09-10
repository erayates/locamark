import { API_BASEURL } from "@/lib/constants";

import axios from "axios";

import { UserProfileToken } from "@/types/auth";

export const _login = async (username: string, password: string) => {
  try {
    const data = await axios.post<UserProfileToken>(
      `${API_BASEURL}/Account/login`,
      {
        username: username,
        password: password,
      }
    );

    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

export const _register = async (
  username: string,
  email: string,
  password: string
) => {
  try {
    const data = await axios.post<UserProfileToken>(
      `${API_BASEURL}/Account/register`,
      {
        username: username,
        email: email,
        password: password,
      }
    );

    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};
