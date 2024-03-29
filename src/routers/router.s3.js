import expres from "express"
import { upload } from "../middleware/multer.js"
import { deleteFile, downloadFile, getAllUploadFiles, s3FileUpload } from "../controllers/controller.s3.js"

const router = expres.Router()

router.route('/upload').post(upload.single("file"), s3FileUpload)
router.route('/').get(getAllUploadFiles)
router.route('/download/:filename').get(downloadFile)
router.route('/delete/:filename').delete(deleteFile)

export default router