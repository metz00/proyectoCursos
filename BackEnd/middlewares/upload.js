const multer = require('multer');
const { storage } = require('../libs/cloudinary');

const MAX_FILE_SIZE = 200 * 1024; // 200 KB como maximo para la img de clou

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Solo se permiten imágenes'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: MAX_FILE_SIZE },
});

module.exports = upload;
