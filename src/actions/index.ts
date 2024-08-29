"use server";

import { API_BASEURL } from "../lib/constants";
import { IGeometry } from "../types";

export async function _getAll() {
  try {
    const response = await fetch(`${API_BASEURL}/Geometry`);
    if (!response.ok) {
      return response;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

export async function _getById(id: number) {
  try {
    const response = await fetch(`${API_BASEURL}/Geometry/${id}`);
    if (!response.ok) {
      return response;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

export async function _create(geometry: IGeometry) {
  try {
    const response = await fetch(`${API_BASEURL}/Geometry`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(geometry),
    });

    if (!response.ok) {
      return response;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

export async function _update(id: number, updatedGeometry: IGeometry) {
  try {
    const response = await fetch(`${API_BASEURL}/Geometry/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedGeometry),
    });
    if (!response.ok) {
      return response;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

export async function _delete(id: number) {
    try {
        const response = await fetch(`${API_BASEURL}/Geometry/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            return response;
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}
