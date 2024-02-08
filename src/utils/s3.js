import AWS from 'aws-sdk';
import fs from 'fs';

export const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRECT_KEY,
  region: process.env.AWS_REGION,
});


const uploadFileOnS3 = async (localFilePath, originalname) => {
  try {
    if (!localFilePath) return null;

    const fileContent = fs.readFileSync(localFilePath);
    console.log(fileContent)

    const params = {
      Bucket: process.env.AWS_BUCKET,
      acl: "public-read",
      Key: `${Math.floor(Math.random() * 1000)}_${originalname}`,
      Body: fileContent
    };

    const response = await s3.upload(params).promise();
    fs.unlinkSync(localFilePath);
    const publicUrl = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${response.Key}`;

    return { ...response, Location: publicUrl };
  } catch (error) {
    console.log(error);
    fs.unlinkSync(localFilePath);
    return null;
  }
};

export { uploadFileOnS3 }