const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'cursos',
    allowed_formats: ['jpg', 'jpeg', 'png'],
    transformation: [
      {
        width: 1200,
        height: 1200,
        crop: 'scale',
        quality: "auto:best",
        fetch_format: 'auto'
      }
    ],
    resource_type: 'image',
  }
});

module.exports = { cloudinary, storage };
