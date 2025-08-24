// src/services/ReservationService.js
import axios from "axios";

const BASE_URL = "http://localhost:3001";
const api = axios.create({ baseURL: BASE_URL });

// Get reservations for a user
export const getReservationsByUser = async (userId) => {
	try {
		const res = await api.get(`/users/${userId}/reservations`);
		return res.data;
	} catch (err) {
		console.error("ReservationService getReservationsByUser Error:", err.message);
		throw err;
	}
};
