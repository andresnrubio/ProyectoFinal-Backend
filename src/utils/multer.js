import multer from "multer"


let storage = multer.diskStorage({
    destination: (req, _file, cb) => {
      cb(null,'src/public/img/')
    },
    filename: (req, file, cb) =>{
      cb(null, `${Date.now()}-${file.originalname}`)
    }
  });
  let upload = multer({ storage });

  export default upload