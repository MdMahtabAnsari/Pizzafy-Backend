const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDir = process.cwd() + '/uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    }
});



const uploader = multer({
    storage: storage,
});

module.exports = uploader;