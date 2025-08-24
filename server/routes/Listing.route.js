const router = require("express").Router();
const multer = require("multer");
const { createListing, getListings, searchListings, getListingById } = require("../controllers/listingController");
const upload = require("../utils/multerConfig");

/* Routes */
router.post("/create", upload.array("listingPhotos"), createListing);
router.get("/", getListings);
router.get("/search/:search", searchListings);
router.get("/:listingId", getListingById);

module.exports = router;
