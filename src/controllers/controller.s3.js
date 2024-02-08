
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
    console.log("Error while get all the files", error)
  }
}

const downloadFile = async (req, res) => {
  const filename = req.params.filename
  try {
    const response = await s3.getObject({ Bucket: process.env.AWS_BUCKET, Key: filename }).promise()
    res.status(201).json({ file: response.Body, success: true })
  } catch (error) {
    console.log("Error while download the file", error)
  }
}

const deleteFile = async (req, res) => {
  const filename = req.params.filename
  try {
    await s3.deleteObjectTagging({ Bucket: process.env.AWS_BUCKET, Key: filename }).promise()
    res.status(201).json({ message: "File deleted" })
  } catch (error) {
    console.log("Error while delete the file", error)
  }
}

export { s3FileUpload, getAllUploadFiles, downloadFile, deleteFile }