import S3 from "aws-sdk/clients/s3";

import fs from "fs";

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

// TODO add function here to lower resolution before upload.

export const uploadImage = (file, fileName) => {
  const fileStream = fs.createReadStream(file.path);
  console.log("bucketName: ", bucketName, region, accessKeyId, secretAccessKey);
  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: fileName,
  };
  return s3.upload(uploadParams).promise();
};

export const getRecipeImage = (fileKey) => {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName,
  };

  return s3.getObject(downloadParams).createReadStream();
};
