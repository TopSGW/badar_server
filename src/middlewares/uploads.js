const multer = require("multer");

const storage = multer.diskStorage({
  destination: function(request, file, callback) {
    callback(null, 'uploads/');
  },
  filename: function(request, file, callback) {
    callback(null, Date.now().toString() + file.originalname);
  }
});

module.exports = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 500
  },
});