import { Service, validateService } from "../../app/models/Service";
import { User } from "../../app/models/User";
import { encryptData, jwtSign } from "../../app/utils/apiAuth";
import dbConnect from "./../../app/utils/dbConnect";
import Joi from "joi";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();
  if (method == "GET") {
    const { id, type } = req.query;
    if (!id)
      return res
        .status(400)
        .json({ success: false, message: "Invalid request" });

    let service = null;
    if (type == "provider") {
      service = await Service.findOne({ ownerId: id });
    } else {
      service = await Service.findById(id);
    }

    if (!service) {
      return res
        .status(400)
        .json({ success: false, message: "Service cannot found" });
    }
    return res.status(201).json({ success: true, data: service });
  }

  if (method == "POST") {
  }
}
