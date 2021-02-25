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

  const { error } = await runMiddleware(req, res, authToken);
  if (error) {
    return res.status(400).json({ error, message: "Authentication failed" });
  }

  if (method == "GET") {
    const { q } = req.query;
    if (!q)
      return res
        .status(400)
        .json({ success: false, message: "Invalid search" });

    const matches = await Service.find({
      $or: [
        { name: { $regex: q, $options: "i" } },
        { serviceType: { $regex: q, $options: "i" } },
        { address: { $regex: q, $options: "i" } },
        { opentime: { $regex: q, $options: "i" } },
        { ownerName: { $regex: q, $options: "i" } },
      ],
    });

    return res.status(201).json({ success: true, data: matches });
  }

  if (method == "POST") {
    const serviceReq = req.body;
    const { error } = validateService(serviceReq);
    if (error)
      return res.status(400).json({ success: false, message: error.message });

    const owner = await User.findById(serviceReq.ownerId);
    if (!owner) {
      return res.status(400).json({
        success: false,
        message: "There's a problem with your authentication",
      });
    }

    const serviceWithSameOwner = await Service.findOne({
      ownerId: serviceReq.ownerId,
    });

    if (serviceWithSameOwner)
      return res.status(400).json({
        success: false,
        message: "One service per account only",
      });

    try {
      const service = await Service.create(serviceReq);
      owner.completed = 1;
      await owner.save();
      return res.status(201).json({ success: true, data: service });
    } catch (error) {
      return res
        .status(400)
        .json({ success: false, error, message: "Error occured" });
    }
  }
}
