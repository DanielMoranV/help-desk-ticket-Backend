import multer from "multer";
import path from "path";

const imageStorage = multer.diskStorage({
  destination: path.join(__dirname, "../public/uploads/imgtickets"),
  filename: (req, files, cb) => {
    const ticketId = Number(req.params.ticketId);
    const customFilename = `ticket_${ticketId}_${Date.now()}`;
    const extension = path.extname(files.originalname);
    cb(null, `${customFilename}${extension}`);
  },
});

const imageFilter = (req: any, files: any, cb: any) => {
  // Verifica si el archivo es una imagen (mime types que deseas permitir)
  if (files.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("El archivo debe ser una imagen válida."), false);
  }
};

const uploadImage = multer({
  storage: imageStorage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  fileFilter: imageFilter,
}).array("ticketPhotos", 500);


export { uploadImage };
