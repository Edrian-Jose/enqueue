import { User, validateUser } from "../../app/models/User";
import { encryptData, jwtSign } from "../../app/utils/apiAuth";
import dbConnect from "./../../app/utils/dbConnect";
import Joi from "joi";
import bcrypt from "bcrypt";
import { authToken, runMiddleware } from "../../app/utils/middlewares";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  if (method == "GET") {
    const { error } = await runMiddleware(req, res, authToken);
    if (error) {
      return res.status(400).json({ error, message: "Authentication failed" });
    }

    const { id } = req.query;
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid request" });
    }

    try {
      const user = await User.findById(id);
      return res.status(201).json({ success: true, data: user });
    } catch (error) {
      return res
        .status(400)
        .json({ success: false, error, message: "Error occured" });
    }
  }

  if (method == "POST") {
    const userREQ = req.body;
    const { error } = validateUser(userREQ);
    if (error)
      return res.status(400).json({ success: false, message: error.message });
    const userWithSameEmail = await User.findOne({ email: userREQ.email });
    if (userWithSameEmail)
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });

    try {
      userREQ.password = await encryptData(userREQ.password);
      userREQ["completed"] = userREQ.userType == "customer" ? 2 : 0;
      const user = await User.create(userREQ);
      const token = await user.generateAuthToken();
      return res.status(201).json({ success: true, data: token });
    } catch (error) {
      return res
        .status(400)
        .json({ success: false, error, message: "Error occured" });
    }
  }

  if (method == "PUT") {
    const { error } = await runMiddleware(req, res, authToken);
    if (error) {
      return res.status(400).json({ error, message: "Authentication failed" });
    }

    const userReq = req.body;
    const id = userReq._id;
    delete userReq._id;
    if (!id)
      return res
        .status(403)
        .json({ success: false, message: "Invalid request" });

    if (userReq.name && (!userReq.name.first || !userReq.name.last)) {
      return res
        .status(401)
        .json({ success: false, message: "Name is incomplete" });
    }

    if (userReq.password) {
      userReq.password = await encryptData(userReq.password);
    }

    try {
      const user = await User.findByIdAndUpdate(id, userReq, {
        new: true,
      });
      return res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      return res
        .status(402)
        .json({ success: false, error, message: "Error occured" });
    }
  }
}
