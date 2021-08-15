import colors from "colors";
import Cookies from "cookies";
import nc from "next-connect";
import { connectDB } from "../../../../util/connectDB";
import multer from "multer";
// // import entire SDK
// import AWS from 'aws-sdk';
// // import AWS object without services
// import AWS from 'aws-sdk/global';
// // import individual service
// import S3 from 'aws-sdk/clients/s3';

const upload = multer({
  storage: multer.diskStorage({
    destination: "./recipeImagesUploading",
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
});

// const runMiddleware = (req, res, fn) => {
//   return new Promise((resolve, reject) => {
//     fn(req, res, (result) => {
//       if (result instanceof Error) {
//         return reject(result);
//       }

//       console.log("result: ", result);
//       return resolve(result);
//     });
//   });
// };

// TODO add auth middleware back in to all protected routes
// TODO add check for cookies and adapt to 'remember me' state stored in cookies, and sign jwt in cookies as well.
const handler = nc();
const uploadMiddleware = upload.single("recipeImage");

handler.use(uploadMiddleware);

handler.post(async (req, res) => {
  try {
    // await runMiddleware(req, res, upload.single("recipeImage"));

    // Multer();
    // const multer = Multer(req, res);
    //   let upload = multer.single(fieldName)
    //   const upload = multer({ dest: "recipeImagesUploading/" });

    // const storage = multer.single("recipeImage");

    console.log(colors.bgBlue("Did run in route with...", req.file));
    const cookies = new Cookies(req, res);
    res.json(req.file);
    // res.json({ wait: "Hold on" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "There was an error logging in." });
  }
});

export default connectDB(handler);

export const config = {
  api: {
    // bodyParser: {
    //   sizeLimit: "5mb",
    // },
    bodyParser: false,
  },
};
