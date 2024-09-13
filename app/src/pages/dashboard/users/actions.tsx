import axios from "axios";
import { API_BASEURL } from "@/lib/constants";
import { IUser } from "@/types";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
};

export async function _getAllUsers() {
  try {
    const response = await axios.get(`${API_BASEURL}/Admin/users`, {
      headers: getAuthHeader(),
    });

    return response;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

export async function _getUserById(id: string) {
  try {
    const response = await axios.get(`${API_BASEURL}/Admin/users/${id}`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

export async function _updateUser(id: string, updatedUser: IUser) {
  try {
    const response = await axios.put(
      `${API_BASEURL}/Admin/users/${id}`,
      updatedUser,
      {
        headers: {
          ...getAuthHeader(),
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

export async function _deleteUser(id: string) {
  try {
    const response = await axios.delete(`${API_BASEURL}/Admin/users/${id}`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
