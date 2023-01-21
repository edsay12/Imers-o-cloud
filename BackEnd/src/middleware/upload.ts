import multer from "multer";
import path from "path";

var upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/upload");
    },
    filename: (req, file, cb) => {
      const imageNewName = `${Date.now().toString()}${file.originalname}`;
      cb(null, imageNewName);
    },
  }),

  fileFilter: (req, file, cb) => {
    return cb(null, true); // Se isso retornar true que ele coloca o item na pasta
  },
});

export = upload;
