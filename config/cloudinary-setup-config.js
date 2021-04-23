const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.cloudName,
  api_key: process.env.cloudKey,
  api_secret: process.env.cloudSecret,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: { folder: 'blocob-gallery', resource_type: 'image' }, 
  // filename: function (req, res, cb) {
  //   cb(null, res.originalname); // The file on cloudinary would have the same name as the original file name
  // }
});

module.exports = multer({ storage });
