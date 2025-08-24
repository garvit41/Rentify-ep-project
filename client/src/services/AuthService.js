// src/services/AuthService.js
import axios from "axios";

const BASE_URL = "http://localhost:3001";
const api = axios.create({ baseURL: BASE_URL });

// Register user
export const registerUser = async (formData) => {
	try {
		const res = await api.post("/auth/register", formData);
		return res.data;
	} catch (err) {
		console.error("AuthService registerUser Error:", err.message);
		throw err;
	}
};

// Login user
export const loginUser = async (email, password) => {
	try {
		const res = await api.post("/auth/login", { email, password });
		return res.data;
	} catch (err) {
		console.error("AuthService loginUser Error:", err.message);
		throw err;
	}
};
