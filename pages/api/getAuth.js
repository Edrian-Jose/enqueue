import { User } from "../../app/models/User";
import { authToken, runMiddleware } from "../../app/utils/middlewares";
import dbConnect from "../../app/utils/dbConnect";

export default async (req, res) => {
  try {
    await dbConnect();
    const { result, error } = await runMiddleware(req, res, authToken);
    if (error) {
      return res
        .status(400)
        .json({ success: false, error, message: "Authentication failed" });
    }

    const user = await User.findById(result._id);
    const token = await user.generateAuthToken();

    return res.status(200).json({ success: true, data: token });
  } catch (error) {
    return res.status(400).json({ error });
  }
};
