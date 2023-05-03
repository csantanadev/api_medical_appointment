import multer from "multer";
import { resolve } from "path";
import { randomBytes } from "crypto";

const folderTmp = resolve(__dirname, "..", "..", "tmp");

export default {
  storage: multer.diskStorage({
    destination: folderTmp,
    filename: (request, file, cb) => {
      const fileHash = randomBytes(16).toString("hex");
      const filename = `${fileHash}-${file.originalname}`;
      request.body = { ...request.body, filename };
      return cb(null, filename);
    },
  }),
};
