const multer = require("multer");
const path = require("path");

/* Multer storage configuration */
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, "../public/uploads/")); // Upload folder
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		const ext = path.extname(file.originalname);
		cb(null, file.fieldname + "-" + uniqueSuffix + ext); // Unique file name
	},
});

/* Multer upload instance */
const upload = multer({ storage });

module.exports = upload;
