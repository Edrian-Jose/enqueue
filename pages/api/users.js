import { User, validateUser } from "../../app/models/User";
import { encryptData, jwtSign } from "../../app/utils/apiAuth";
import dbConnect from "./../../app/utils/dbConnect";
import Joi from "joi";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();
  if (method == "GET") {
    const loginInfo = req.body;
    const loginSchema = Joi.object({
      email: Joi.string().trim().required().label("Email"),
      password: Joi.string().min(7).trim().required().label("Password"),
    });

    const { error } = loginSchema.validate(loginInfo);
    if (error)
      return res.status(400).json({ success: false, message: error.message });

    const user = await User.findOne({ email: loginInfo.email });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Unregistered email address" });

    const validPassword = await bcrypt.compare(
      loginInfo.password,
      user.password
    );
    if (!validPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Password" });
    }

    return res
      .status(400)
      .json({ success: true, data: user.generateAuthToken() });
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
      const user = await User.create(userREQ);
      return res
        .status(201)
        .json({ success: true, data: user.generateAuthToken() });
    } catch (error) {
      return res.status(400).json({ success: false, error });
    }
  }
}
