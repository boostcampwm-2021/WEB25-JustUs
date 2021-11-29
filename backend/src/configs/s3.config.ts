import * as AWS from "aws-sdk";
import * as multerS3 from "multer-s3-transform";
import * as sharp from "sharp";

const s3 = new AWS.S3({
  endpoint: process.env.NCP_OBJECT_STORAGE_ENDPOINT,
  region: process.env.NCP_OBJECT_STORAGE_REGIN,
  credentials: {
    accessKeyId: process.env.NCP_ACCESSKEY_ID,
    secretAccessKey: process.env.NCP_SECRET_ACCESSKEY,
  },
});

export const multerOption = {
  storage: multerS3({
    s3: s3,
    bucket: process.env.NCP_OBJECT_STORAGE_BUCKET,
    shouldTransform: true,
    transforms: [
      {
        id: "origin",
        key: function (request, file, callback) {
          const { groupId } = request.body;
          const url = `${process.env.NCP_OBJECT_STORAGE_PATH}/${groupId}/${encodeURI(Date.now().toString())} - ${
            file.originalname
          }`;
          callback(null, url);
        },
        transform: async function (request, file, callback) {
          callback(null, sharp().webp({ quality: 80 }));
        },
      },
    ],
    acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
  }),
};
