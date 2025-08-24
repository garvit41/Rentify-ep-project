const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const cors = require("cors");
const connectDB = require("./dbConfig/dbConfig");

/* ROUTES */
const authRoutes = require("./routes/Auth.route");
const listingRoutes = require("./routes/Listing.route");
const bookingRoutes = require("./routes/Booking.route");
const userRoutes = require("./routes/User.route");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/auth", authRoutes);
app.use("/properties", listingRoutes);
app.use("/bookings", bookingRoutes);
app.use("/users", userRoutes);

/* CONNECT DB & START SERVER */
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
	app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
