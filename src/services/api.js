import axios from "axios";

const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8085/api";
export const API_BASE_URL = configuredBaseUrl.replace(/\/+$/, "");

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const logApiError = (operation, error) => {
  console.error(`AssetSync API ${operation} failed:`, error.response?.data || error.message || error);
};

/**
 * Fetch resources from the Spring Boot API.
 * @param {string|null} type Resource type filter (LOCATION or EQUIPMENT).
 */
export const fetchResources = async (type = null) => {
  try {
    const params = type && type !== "ALL" ? { type } : {};
    const response = await api.get("/resources", { params });
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    logApiError("fetchResources", error);
    throw error;
  }
};

/**
 * Submit an equipment booking. Preserve structured 409 conflict suggestions.
 */
export const bookEquipment = async (payload) => {
  try {
    const response = await api.post("/equipment/book", payload);
    return response.data;
  } catch (error) {
    if (error.response?.status === 409) {
      return { ...error.response.data, httpStatus: 409 };
    }
    logApiError("bookEquipment", error);
    throw error;
  }
};

/**
 * Submit a location request, optionally targeting a selected alternative room.
 */
export const submitLocationRequest = async (payload) => {
  try {
    const response = await api.post("/locations/request", payload);
    return response.data;
  } catch (error) {
    logApiError("submitLocationRequest", error);
    throw error;
  }
};

export const triggerBatchProcess = async () => {
  try {
    const response = await api.post("/locations/process-batch");
    return response.data;
  } catch (error) {
    logApiError("triggerBatchProcess", error);
    throw error;
  }
};

export const fetchCalendarEvents = async () => {
  try {
    const response = await api.get("/calendar/events");
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    logApiError("fetchCalendarEvents", error);
    throw error;
  }
};
