const multer = require('multer');
import MulterGoogleCloudStorage from '@igorivaniuk/multer-google-storage';

const storage = multer({
    storage: new MulterGoogleCloudStorage(),

    fileFilter: function fileFilter(req, file, cb) {
        // reject a file
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(null, false);
        }
    },

    filename: function fileName(req, file, cb){
        let datenow = Date.now().toString();
        cb(null, datenow + file.toString())
    },

    limits: {
        fileSize: 1024 * 1024 * 5
    },
});

const upload = multer({
    storage: storage,
});

module.exports = upload.single('WarningImage');
