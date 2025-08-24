const router = require("express").Router();
const { getTrips, toggleWishList, getProperties, getReservations } = require("../controllers/userController");

/* Routes */
router.get("/:userId/trips", getTrips);
router.patch("/:userId/:listingId", toggleWishList);
router.get("/:userId/properties", getProperties);
router.get("/:userId/reservations", getReservations);

module.exports = router;
