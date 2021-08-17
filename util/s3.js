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

// POST RECIPE
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

// GET RECIPE
export const getRecipeImage = async (fileKey, req, res) => {
  console.log("fileKey: ", fileKey);
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName,
  };

  return (
    s3
      .getObject(downloadParams)
      // .then((response) => {
      //   console.log("s3Response: ", response);
      // })
      .on("response", (response) => {
        // console.log("s3Response: ", response);
        // console.log("s3Response: ", Object.keys(response.httpResponse));
        // console.log("s3Response: ", response.httpResponse.headers);
        // res.setHeader(
        //   "Content-Length",
        //   response.httpResponse.headers["content-length"]
        // );
        // res.setHeader(
        //   "Content-Type",
        //   response.httpResponse.headers["content-type"]
        // );
      })
      // .on("",  (response) => {
      // })
      .createReadStream()
      .on("data", (...props) => {
        // console.log("PROPS:", props);
      })
  );
};
