import { Service, validateService } from "../../../app/models/Service";
import { User } from "../../../app/models/User";
import { encryptData, jwtSign } from "../../../app/utils/apiAuth";
import dbConnect from "../../../app/utils/dbConnect";
import Joi from "joi";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();
  if (method == "GET") {
    const { id } = req.query;
    if (!id)
      return res
        .status(400)
        .json({ success: false, message: "Invalid request" });

    const service = await Service.findById(id);
    if (!service) {
      return res
        .status(400)
        .json({ success: false, message: "Service cannot found" });
    }
  }

  if (method == "POST") {
  }
}
