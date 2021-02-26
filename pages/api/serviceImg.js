import { User } from "../../app/models/User";
import { Service } from "../../app/models/Service";
import { authToken, runMiddleware } from "../../app/utils/middlewares";
import dbConnect from "./../../app/utils/dbConnect";

import nc from "next-connect";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";

const upload = multer({ dest: "/tmp" });
const handler = nc();

const {
  hostname: cloud_name,
  username: api_key,
  password: api_secret,
} = new URL(process.env.CLOUDINARY_URL);

cloudinary.config({
  cloud_name,
  api_key,
  api_secret,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

handler.patch(upload.single("media"), async (req, res) => {
  await dbConnect();

  const { result, error } = await runMiddleware(req, res, authToken);
  if (error) {
    return res.status(400).json({ error, message: "Authentication failed" });
  }

  let profilePicture;
  const { serviceId } = req.body;

  if (req.file) {
    const image = await cloudinary.uploader.upload(req.file.path, {
      width: 540,
      height: 304,
      crop: "fill",
    });
    profilePicture = image.secure_url;
  }

  const service = await Service.findById(serviceId);
  let public_id, splittedFileUrlByDot, splittedFileUrlBySlash;
  if (service.photo) {
    const oldUrl = service.photo;
    splittedFileUrlByDot = oldUrl.split(".");
    splittedFileUrlBySlash = splittedFileUrlByDot[
      splittedFileUrlByDot.length - 2
    ].split("/");
    public_id = splittedFileUrlBySlash[splittedFileUrlBySlash.length - 1];

    await cloudinary.uploader.destroy(public_id);
  } else {
    const owner = await User.findById(result._id);
    if (!owner) {
      return res.status(400).json({
        success: false,
        message: "There's a problem with your authentication",
      });
    }

    owner.completed = 2;
    await owner.save();
  }

  service["photo"] = profilePicture;
  await service.save();

  res.status(200).json({
    success: true,
    data: profilePicture,
  });
});

export default handler;
