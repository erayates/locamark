import axios from "axios";
import { API_BASEURL } from "@/lib/constants";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
};

export async function _getAllUsersGeometries() {
  try {
    const response = await axios.get(`${API_BASEURL}/Admin/geometries`, {
      headers: getAuthHeader(),
    });

    return response;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

export async function _getGeometryById(id: number) {
  try {
    const response = await axios.get(`${API_BASEURL}/Admin/geometries/${id}`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

export async function _deleteGeometryById(id: number) {
    try {
      const response = await axios.delete(`${API_BASEURL}/Admin/geometries/${id}`, {
        headers: getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  }
  

// export async function _create(geometry: IGeometry) {
//   console.log(geometry);
//   try {
//     const response = await axios.post(`${API_BASEURL}/Geometry`, geometry, {
//       headers: {
//         ...getAuthHeader(),
//         "Content-Type": "application/json",
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Fetch error:", error);
//     throw error;
//   }
// }

// export async function _update(id: number, updatedGeometry: IGeometry) {
//   try {
//     const response = await axios.put(
//       `${API_BASEURL}/Geometry/${id}`,
//       updatedGeometry,
//       {
//         headers: {
//           ...getAuthHeader(),
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Fetch error:", error);
//     throw error;
//   }
// }

