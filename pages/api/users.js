import { User, validateUser } from "../../app/models/User";
import { encryptData, jwtSign } from "../../app/utils/apiAuth";
import dbConnect from "./../../app/utils/dbConnect";
import Joi from "joi";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();
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
      userREQ["completed"] = userREQ.userType == "customer";
      const user = await User.create(userREQ);

      return res
        .status(201)
        .json({ success: true, data: user.generateAuthToken() });
    } catch (error) {
      return res.status(400).json({ success: false, error });
    }
  }
}
