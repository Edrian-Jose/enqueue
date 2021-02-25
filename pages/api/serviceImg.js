const fs = require("fs");
const formidable = require("formidable-serverless");
const path = require("path");
import { User } from "../../app/models/User";
import { authToken, runMiddleware } from "../../app/utils/middlewares";
import dbConnect from "./../../app/utils/dbConnect";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  await dbConnect();

  const { result, error } = await runMiddleware(req, res, authToken);
  if (error) {
    return res.status(400).json({ error, message: "Authentication failed" });
  }

  try {
    const data = await new Promise((resolve, reject) => {
      const directory = "./public/serviceImages";

      const form = new formidable({
        uploadDir: directory,
      });
      form.keepExtensions = true;
      form.keepFileName = true;
      // form.parse(req);

      form.on("fileBegin", function (name, file) {
        file.path = path.join(directory, file.name);
      });

      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    });

    const owner = await User.findById(data.fields._id);
    if (!owner) {
      return res.status(400).json({
        success: false,
        message: "There's a problem with your authentication",
      });
    }
    owner.completed = 2;
    await owner.save();

    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, error, message: "Error occured" });
  }
};
