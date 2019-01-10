const multer = require('multer')
const multerGoogleCloudStorage = require('@igorivaniuk/multer-google-storage')

const upload = multer({
    storage: new multerGoogleCloudStorage.storageEngine(),

    fileFilter: (req, file, cb) => {
        // reject a file
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(null, false);
        }
    },

    filename: (req, file, cb) => {
        let datenow = Date.now().toString();
        cb(null, datenow + file.getOriginalFilename())
    },

    limits: {
        fileSize: 1024 * 1024 * 5
    },
})

module.exports = upload
