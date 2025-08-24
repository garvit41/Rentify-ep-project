// src/services/UserService.js
import axios from "axios";

const BASE_URL = "http://localhost:3001";
const api = axios.create({ baseURL: BASE_URL });

// Get user's trips
export const getUserTrips = async (userId) => {
	try {
		const res = await api.get(`/users/${userId}/trips`);
		return res.data;
	} catch (err) {
		console.error("UserService getUserTrips Error:", err.message);
		throw err;
	}
};
