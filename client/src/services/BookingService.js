// src/services/BookingService.js
import axios from "axios";

const BASE_URL = "http://localhost:3001";

const api = axios.create({ baseURL: BASE_URL });

export const createBooking = async (bookingData) => {
	try {
		const res = await api.post("/bookings/create", bookingData);
		return res.data;
	} catch (err) {
		console.error("BookingService createBooking Error:", err.message);
		throw err;
	}
};
