
import { s3, uploadFileOnS3 } from "../utils/s3.js";


const s3FileUpload = async (req, res) => {
  try {
    const fileLocalPath = req?.file?.path
    const uploadResponse = await uploadFileOnS3(fileLocalPath, req?.file?.originalname);
    console.log("Upload Response:", uploadResponse);
    res.status(201).json({ url: uploadResponse.Location, success: true })

  } catch (error) {
    console.log("Error occurred while file is uploding:", error)
  }
}

const getAllUploadFiles = async (req, res) => {
  try {
    const files = await s3.listObjectsV2({ Bucket: process.env.AWS_BUCKET }).promise()
    res.status(201).json({ files: files.Contents, success: true })
  } catch (error) {

  }
}

export { s3FileUpload, getAllUploadFiles }