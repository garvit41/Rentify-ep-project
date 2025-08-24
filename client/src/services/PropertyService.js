// src/services/PropertyService.js
import axios from "axios";

const BASE_URL = "http://localhost:3001";
const api = axios.create({ baseURL: BASE_URL });

// Get all properties of a specific user
export const getUserProperties = async (userId) => {
	try {
		const res = await api.get(`/users/${userId}/properties`);
		return res.data; // array of properties
	} catch (err) {
		console.error("PropertyService getUserProperties Error:", err.message);
		throw err;
	}
};
