import { Service, validateService } from "../../app/models/Service";
import { User } from "../../app/models/User";
import { encryptData, jwtSign } from "../../app/utils/apiAuth";
import dbConnect from "./../../app/utils/dbConnect";
import Joi from "joi";
import bcrypt from "bcrypt";
import { authToken, runMiddleware } from "../../app/utils/middlewares";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  const { result, error } = await runMiddleware(req, res, authToken);
  if (error) {
    return res.status(400).json({ error, message: "Authentication failed" });
  }

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

  if (method == "PUT") {
    const serviceReq = req.body;
    const id = serviceReq._id;
    delete serviceReq._id;

    if (!id)
      return res
        .status(400)
        .json({ success: false, message: "Invalid request" });

    try {
      const service = await Service.findByIdAndUpdate(id, serviceReq, {
        new: true,
      });
      return res.status(200).json({
        success: true,
        data: service,
      });
    } catch (error) {
      return res
        .status(400)
        .json({ success: false, error, message: "Error occured" });
    }
  }
}
