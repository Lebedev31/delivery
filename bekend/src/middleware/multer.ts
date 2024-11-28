import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "dist/img");
  },

  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    callback(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

export default upload;
