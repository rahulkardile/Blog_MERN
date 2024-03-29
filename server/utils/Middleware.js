import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        return cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}-ok_${file.originalname}`);
    }
})

const upload = multer({ storage }).single("cover");

export default upload