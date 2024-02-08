
import { uploadFileOnS3 } from "../utils/s3.js";


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

export { s3FileUpload }