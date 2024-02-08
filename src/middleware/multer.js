import multer from "multer"

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/temp')
  },
  filename: function (req, file, cb) {
    console.log("I want to see the file when upload image", file)
    cb(null, file.originalname)
  }
})

export const upload = multer({ storage: storage })

