// src/services/ListingsService.js
import axios from "axios";

const BASE_URL = "http://localhost:3001";

// Axios instance (optional but useful for global headers / interceptors)
const api = axios.create({
	baseURL: BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

// Get listings by category
export const getListingsByCategory = async (category) => {
	try {
		const response = await api.get(`/properties${category !== "All" ? `?category=${category}` : ""}`);
		return response.data;
	} catch (err) {
		console.error("ListingsService Error:", err.message);
		throw err;
	}
};

// create a new listing
export const createListing = async (formData) => {
	try {
		const res = await api.post("/properties/create", formData);
		return res.data;
	} catch (err) {
		console.error("ListingsService createListing error:", err.message);
		throw err;
	}
};

// Get listing by ID
export const getListingById = async (listingId) => {
	try {
		const res = await api.get(`/properties/${listingId}`);
		return res.data;
	} catch (err) {
		console.error("ListingsService getListingById Error:", err.message);
		throw err;
	}
};

// Get listings by search
export const getListingsBySearch = async (searchTerm) => {
	try {
		const res = await api.get(`/properties/search/${searchTerm}`);
		return res.data;
	} catch (err) {
		console.error("ListingsService getListingsBySearch Error:", err.message);
		throw err;
	}
};
