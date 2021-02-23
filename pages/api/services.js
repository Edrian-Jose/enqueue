import { Service, validateService } from "../../app/models/Service";
import { encryptData, jwtSign } from "../../app/utils/apiAuth";
import dbConnect from "./../../app/utils/dbConnect";
import Joi from "joi";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();
  if (method == "GET") {
    const { keyword } = req.body;
    if (!keyword)
      return res
        .status(400)
        .json({ success: false, message: "Invalid search" });

    const matches = await Service.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { serviceType: { $regex: keyword, $options: "i" } },
        { address: { $regex: keyword, $options: "i" } },
        { opentime: { $regex: keyword, $options: "i" } },
        { ownerName: { $regex: keyword, $options: "i" } },
      ],
    });

    return res.status(201).json({ success: true, data: matches });
  }

  if (method == "POST") {
    const serviceReq = req.body;
    const { error } = validateService(serviceReq);
    if (error)
      return res.status(400).json({ success: false, message: error.message });
    //TODO: test for owner doesn't exists
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
      return res.status(201).json({ success: true, data: service });
    } catch (error) {
      return res.status(400).json({ success: false, error });
    }
  }
}
