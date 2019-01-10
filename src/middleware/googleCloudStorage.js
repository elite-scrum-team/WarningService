const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, './uploads/');
    },
    filename: (req, file, cb) =>{
        cb(null, Date.now() + file.originalname);
    }
});

const fileFilter = (req, file, cb)=>{
    if(file.mimeType ==='image/jpeg' || ile.mimeType ==='image/png'){
        cb(null, true);
    }else{
        cb(null,false);
    }
};

const upload = multer({storage: storage, limits: {
        fileSize: 1024*1024*5
    }});

module.exports = upload.single('articleImage');
