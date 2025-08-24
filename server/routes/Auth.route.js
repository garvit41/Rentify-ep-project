const router = require("express").Router();
const multer = require("multer");
const { register, login } = require("../controllers/authController");
const upload = require("../utils/multerConfig");

/* Routes */
router.post("/register", upload.single("profileImage"), register);
router.post("/login", login);

module.exports = router;
