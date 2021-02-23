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
  }

  if (method == "POST") {
  }
}
